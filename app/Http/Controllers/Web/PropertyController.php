<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Services\CommonTools;
use App\Services\AuthService;
use DB;
use Carbon\Carbon;

// 錯誤代碼  #020000
class PropertyController extends Controller
{
	/**
	 * 取得初始化所有的資料
	 */
	public function getAllPropertyData(){
		$pm_r = new \App\Repositories\PropertyManagementRepository;
		try {
			if(!$data_propertys = $pm_r->getAllData()){
				$arraydata['data_propertys'] = [];
			}else{
				$arraydata['data_propertys'] = $data_propertys;
			}

			return response()->json($arraydata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#020101',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getPropertys(){
		$pm_r = new \App\Repositories\PropertyManagementRepository;
		try {
			if(!$data = $pm_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#020102',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Create////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionCreate($ann_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 1; //異動動作：新增
		try {
			if($ann_type == 6){ //資產管理
				$recorddata['tr_goal'] = 6; //異動目標：資產管理
				return $this->createProperty($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#020201',null,null);
		}
	}


	/**
	 * 新增資產
	 */
	protected function createProperty($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pm_r = new \App\Repositories\PropertyManagementRepository;
			if($pm_r->getCountByUdId($searchdata['ud_id']) > 0){
				DB::rollBack();
				return CommonTools::returnData(false,'該使用者已建檔',null,null);
			}
			if(!$id = $pm_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：pm_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#020202',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Modify////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionModify($ann_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 2; //異動動作：修改
		try {
			if($ann_type == 6){ //資產管理
				$recorddata['tr_goal'] = 6; //異動目標：資產管理
				return $this->modifyProperty($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#020301',null,null);
		}
	}


	/**
	 * 修改資產
	 */
	protected function modifyProperty($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pm_r = new \App\Repositories\PropertyManagementRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pm_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入資產編號',null,null);
			}
			if(CommonTools::checkArrayValue($searchdata,'ud_id')){
				if($pm_r->getCountByIdUdId($searchdata) > 0){
					DB::rollBack();
					return CommonTools::returnData(false,'該使用者已建檔',null,null);
				}
			}
			if(!$pm_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pm_id']; //目標編號：pm_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#020302',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Delete////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionDelete($ann_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 3; //異動動作：刪除
		try {
			if($ann_type == 6){ //資產管理
				$recorddata['tr_goal'] = 6; //異動目標：資產管理
				return $this->deleteProperty($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#020401',null,null);
		}
	}


	/**
	 * 刪除資產
	 */
	protected function deleteProperty($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pm_r = new \App\Repositories\PropertyManagementRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pm_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入資產編號',null,null);
			}
			if(!$pm_r->delete($searchdata['pm_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pm_id']; //目標編號：pm_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#020402',null,null);
		}
	}
}