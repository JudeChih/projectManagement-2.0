<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Services\CommonTools;
use App\Services\AuthService;
use DB;
use Carbon\Carbon;
// 錯誤代碼  #070000
class IndexController extends Controller
{
	/**
	 * 取得初始化所有的資料
	 */
	public function getAllIndexData(){
		$ug_r = new \App\Repositories\UserGroupRepository;
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		$searchdata = Request::all();
		try {
			if(!CommonTools::checkArrayValue($searchdata,'firstday')){
				return CommonTools::returnData(false,'未傳入當週第一天日期',null,null);
			}
			if(!CommonTools::checkArrayValue($searchdata,'lastday')){
				return CommonTools::returnData(false,'未傳入當週最後一天日期',null,null);
			}

			if(!$ug_data = $ug_r->getAllData()){
				return false;
			}
			$arraydata['user_group'] = $ug_data;
			$arraydata['user_status'] = AuthService::userAllData();
			//第一天
			$array['first'] = Carbon::parse($searchdata['firstday']);
			//最後一天
			$array['last'] = Carbon::parse($searchdata['lastday']);
				
			if(!$pst_data1 = $pst_r->getAllDataForIndex()){
				$arraydata['sub_projects_all'] = [];
			}else{
				$arraydata['sub_projects_all'] = $pst_data1;
			}
			if(!$pst_data2 = $pst_r->getDataByCompletiondate($array)){
				$arraydata['sub_projects_week'] = [];
			}else{
				$arraydata['sub_projects_week'] = $pst_data2;
			}
			
			return response()->json($arraydata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#070101',null,null);
		}
	}

	/**
	 * 取得某年某月某週資料
	 */
	public function getOneWeekProject(){
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		$searchdata = Request::all();
		$data = array();
		try {
			if(!CommonTools::checkArrayValue($searchdata,'firstday')){
				return CommonTools::returnData(false,'未傳入當週第一天日期',null,null);
			}
			if(!CommonTools::checkArrayValue($searchdata,'lastday')){
				return CommonTools::returnData(false,'未傳入當週最後一天日期',null,null);
			}
			//第一天
			$array['first'] = Carbon::parse($searchdata['firstday']);
			//最後一天
			$array['last'] = Carbon::parse($searchdata['lastday']);

			if(!$data = $pst_r->getDataByCompletiondate($array)){
				return false;
			}


			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#070102',null,null);
		}
	}

	/**
	 * 取得某年某月資料
	 */
	public function getOneMonthProject(){
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		$searchdata = Request::all();
		$data = array();
		try {
			if(!CommonTools::checkArrayValue($searchdata,'year')){
				return CommonTools::returnData(false,'未傳入年分',null,null);
			}
			if(!CommonTools::checkArrayValue($searchdata,'month')){
				return CommonTools::returnData(false,'未傳入月份',null,null);
			}
			//第一天
			$array['first'] = Carbon::createFromDate($searchdata['year'],$searchdata['month']+1,1);
			//最後一天
			$array['last'] = Carbon::createFromDate($searchdata['year'],$searchdata['month']+2,1)->subDays(1);
			if(!$data = $pst_r->getDataByCompletiondate($array)){
				return false;
			}

			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#070103',null,null);
		}
	}

	/**
	 * 取得全部符合的子任務資料
	 */
	public function getAllUserSubProject(){
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		$data = array();
		try {
			if(!$data1 = $pst_r->getAllDataForIndex()){
				return false;
			}

			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#070104',null,null);
		}
	}
}