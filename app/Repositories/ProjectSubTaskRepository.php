<?php
/**
 * table name 專案子任務
 */
namespace App\Repositories;

use App\Models\ProjectSubTask;
use App\Services\CommonTools;
use App\Services\AuthService;
use DB;

class ProjectSubTaskRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		$string = ProjectSubTask::
					leftjoin('pm_cate_projectmilestone','pm_projectsubtask.pmc_id','pm_cate_projectmilestone.pmc_id')->
					leftjoin('pm_cate_projectpriority','pm_projectsubtask.ppc_id','pm_cate_projectpriority.ppc_id')->
					leftjoin('pm_cate_projectrequiresort','pm_projectsubtask.prsc_id','pm_cate_projectrequiresort.prsc_id')->
					leftjoin('pm_cate_projectstatus','pm_projectsubtask.psc_id','pm_cate_projectstatus.psc_id')->
					leftjoin('pm_cate_projectexecuteitem','pm_projectsubtask.peic_id','pm_cate_projectexecuteitem.peic_id')->
					leftjoin('pm_userdata','pm_projectsubtask.ud_id','pm_userdata.ud_id')->
					select('pm_projectsubtask.*','pm_cate_projectmilestone.pmc_id','pm_cate_projectmilestone.pmc_name','pm_cate_projectpriority.ppc_id','pm_cate_projectpriority.ppc_name','pm_cate_projectrequiresort.prsc_id','pm_cate_projectrequiresort.prsc_name','pm_cate_projectstatus.psc_id','pm_cate_projectstatus.psc_name','pm_cate_projectexecuteitem.peic_id','pm_cate_projectexecuteitem.peic_name','pm_userdata.ud_id','pm_userdata.ud_name');
		$auth = AuthService::userData();
		$auth = $auth['pt_admin'];
		if(!AuthService::userAdmin() && !$auth){
			$string->where('pm_projectsubtask.ud_id',AuthService::userId());
		}
		return  $string->where('pm_projectsubtask.isflag',1)->get();
	}

	/**
	 * 取得所有
	 */
	public function getAllDataForIndex(){
		$string = ProjectSubTask::
					leftjoin('pm_projecttask','pm_projectsubtask.pt_id','pm_projecttask.pt_id')->
					leftjoin('pm_cate_projectmilestone','pm_projectsubtask.pmc_id','pm_cate_projectmilestone.pmc_id')->
					leftjoin('pm_cate_projectrequiresort','pm_projectsubtask.prsc_id','pm_cate_projectrequiresort.prsc_id')->
					leftjoin('pm_cate_projectstatus','pm_projectsubtask.psc_id','pm_cate_projectstatus.psc_id')->
					leftjoin('pm_cate_projectexecuteitem','pm_projectsubtask.peic_id','pm_cate_projectexecuteitem.peic_id')->
					select('pm_projecttask.ug_id','pm_projectsubtask.pst_id','pm_projecttask.pt_id','pm_projectsubtask.pst_name','pm_projectsubtask.pst_completiondate','pm_cate_projectmilestone.pmc_name','pm_cate_projectrequiresort.prsc_name','pm_cate_projectstatus.psc_name','pm_cate_projectstatus.psc_id','pm_cate_projectexecuteitem.peic_name');
		// $auth = AuthService::userData();
		// $auth = $auth['pt_admin'];
		// if(!AuthService::userAdmin() || !$auth){
			// $string->where('pm_projecttask.ut_id',$auth['ut_id']);
			$string->where('pm_projectsubtask.ud_id',AuthService::userId());
		// }
		return  $string->where('pm_projectsubtask.isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($pst_id){
		$string = ProjectSubTask::
					leftjoin('pm_cate_projectmilestone','pm_projectsubtask.pmc_id','pm_cate_projectmilestone.pmc_id')->
					leftjoin('pm_cate_projectpriority','pm_projectsubtask.ppc_id','pm_cate_projectpriority.ppc_id')->
					leftjoin('pm_cate_projectrequiresort','pm_projectsubtask.prsc_id','pm_cate_projectrequiresort.prsc_id')->
					leftjoin('pm_cate_projectstatus','pm_projectsubtask.psc_id','pm_cate_projectstatus.psc_id')->
					leftjoin('pm_cate_projectexecuteitem','pm_projectsubtask.peic_id','pm_cate_projectexecuteitem.peic_id')->
					leftjoin('pm_userdata','pm_projectsubtask.ud_id','pm_userdata.ud_id')->
					select('pm_projectsubtask.*','pm_cate_projectmilestone.pmc_id','pm_cate_projectmilestone.pmc_name','pm_cate_projectpriority.ppc_id','pm_cate_projectpriority.ppc_name','pm_cate_projectrequiresort.prsc_id','pm_cate_projectrequiresort.prsc_name','pm_cate_projectstatus.psc_id','pm_cate_projectstatus.psc_name','pm_cate_projectexecuteitem.peic_id','pm_cate_projectexecuteitem.peic_name','pm_userdata.ud_id','pm_userdata.ud_name');
		$auth = AuthService::userData();
		$auth = $auth['pt_admin'];
		if(!AuthService::userAdmin() && !$auth){
			$string->where('pm_projectsubtask.ud_id',AuthService::userId());
		}
		return $string->where('pm_projectsubtask.pst_id',$pst_id)->where('pm_projectsubtask.isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByPtIdForList($pt_id){
		$string = ProjectSubTask::
					leftjoin('pm_cate_projectmilestone','pm_projectsubtask.pmc_id','pm_cate_projectmilestone.pmc_id')->
					leftjoin('pm_cate_projectpriority','pm_projectsubtask.ppc_id','pm_cate_projectpriority.ppc_id')->
					leftjoin('pm_cate_projectrequiresort','pm_projectsubtask.prsc_id','pm_cate_projectrequiresort.prsc_id')->
					leftjoin('pm_cate_projectstatus','pm_projectsubtask.psc_id','pm_cate_projectstatus.psc_id')->
					leftjoin('pm_cate_projectexecuteitem','pm_projectsubtask.peic_id','pm_cate_projectexecuteitem.peic_id')->
					leftjoin('pm_userdata','pm_projectsubtask.ud_id','pm_userdata.ud_id')->
					select('pm_projectsubtask.*','pm_cate_projectmilestone.pmc_id','pm_cate_projectmilestone.pmc_name','pm_cate_projectpriority.ppc_id','pm_cate_projectpriority.ppc_name','pm_cate_projectrequiresort.prsc_id','pm_cate_projectrequiresort.prsc_name','pm_cate_projectstatus.psc_id','pm_cate_projectstatus.psc_name','pm_cate_projectexecuteitem.peic_id','pm_cate_projectexecuteitem.peic_name','pm_userdata.ud_id','pm_userdata.ud_name');
		return  $string->where('pm_projectsubtask.pt_id',$pt_id)->where('pm_projectsubtask.isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByPtId($pt_id){
		$string = ProjectSubTask::
					leftjoin('pm_cate_projectmilestone','pm_projectsubtask.pmc_id','pm_cate_projectmilestone.pmc_id')->
					leftjoin('pm_cate_projectpriority','pm_projectsubtask.ppc_id','pm_cate_projectpriority.ppc_id')->
					leftjoin('pm_cate_projectrequiresort','pm_projectsubtask.prsc_id','pm_cate_projectrequiresort.prsc_id')->
					leftjoin('pm_cate_projectstatus','pm_projectsubtask.psc_id','pm_cate_projectstatus.psc_id')->
					leftjoin('pm_cate_projectexecuteitem','pm_projectsubtask.peic_id','pm_cate_projectexecuteitem.peic_id')->
					leftjoin('pm_userdata','pm_projectsubtask.ud_id','pm_userdata.ud_id')->
					select('pm_projectsubtask.*','pm_cate_projectmilestone.pmc_id','pm_cate_projectmilestone.pmc_name','pm_cate_projectpriority.ppc_id','pm_cate_projectpriority.ppc_name','pm_cate_projectrequiresort.prsc_id','pm_cate_projectrequiresort.prsc_name','pm_cate_projectstatus.psc_id','pm_cate_projectstatus.psc_name','pm_cate_projectexecuteitem.peic_id','pm_cate_projectexecuteitem.peic_name','pm_userdata.ud_id','pm_userdata.ud_name');
		$auth = AuthService::userData();
		$auth = $auth['pt_admin'];
		if(!AuthService::userAdmin() && !$auth){
			$string->where('pm_projectsubtask.ud_id',AuthService::userId());
		}
		return  $string->where('pm_projectsubtask.pt_id',$pt_id)->where('pm_projectsubtask.isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByCompletiondate($array){
		$string = ProjectSubTask::leftjoin('pm_projecttask','pm_projectsubtask.pt_id','pm_projecttask.pt_id')->leftjoin('pm_userdata','pm_projectsubtask.ud_id','pm_userdata.ud_id')->where('pm_projectsubtask.isflag',1);
		// $auth = AuthService::userData();
		// $auth = $auth['pt_admin'];
		// if(!AuthService::userAdmin() && !$auth){
			$string->where('pm_projectsubtask.ud_id',AuthService::userId());
		// }
		$string->whereBetween('pm_projectsubtask.pst_completiondate',array($array['first'],$array['last']));
		return  $string->select('pm_userdata.ud_name','pm_projecttask.ug_id','pm_projectsubtask.pt_id','pm_projectsubtask.pst_id','pm_projectsubtask.pst_name','pm_projecttask.pt_name','pm_projectsubtask.pst_executiondate','pm_projectsubtask.pst_completiondate')->get();
	}

	/**
	 * 取得數量
	 */
	public function getDataByPtIdName($arraydata){
		return ProjectSubTask::where('pt_id',$arraydata['pt_id'])->where('pst_name',$arraydata['pst_name'])->where('isflag',1)->count();
	}

	/**
	 * 取得數量
	 */
	public function getDataByIdName($arraydata){
		return ProjectSubTask::where('pt_id',$arraydata['pt_id'])->where('pst_id','!=',$arraydata['pst_id'])->where('pst_name',$arraydata['pst_name'])->where('isflag',1)->count();
	}

	/**
	 * 刪除
	 */
	public function deleteByPtId($pt_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return ProjectSubTask::where('pt_id',$pt_id)->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 刪除
	 */
	public function delete($pst_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return ProjectSubTask::where('pst_id',$pst_id)->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 新增
	 */
	public function create($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'pt_id') & !CommonTools::checkArrayValue($arraydata,'pst_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['pt_id'] = $arraydata['pt_id'];
			$savedata['pst_name'] = $arraydata['pst_name'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pmc_id')){
				$savedata['pmc_id'] = $arraydata['pmc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'prsc_id')){
				$savedata['prsc_id'] = $arraydata['prsc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'peic_id')){
				$savedata['peic_id'] = $arraydata['peic_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pst_requiredate')){
				$savedata['pst_requiredate'] = $arraydata['pst_requiredate'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ppc_id')){
				$savedata['ppc_id'] = $arraydata['ppc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'psc_id')){
				$savedata['psc_id'] = $arraydata['psc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pst_executiondate')){
				$savedata['pst_executiondate'] = $arraydata['pst_executiondate'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pst_completiondate')){
				$savedata['pst_completiondate'] = $arraydata['pst_completiondate'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_id')){
				$savedata['ud_id'] = $arraydata['ud_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pst_spendtime')){
				$savedata['pst_spendtime'] = $arraydata['pst_spendtime'];
			}

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return ProjectSubTask::insertGetId($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 修改
	 */
	public function update($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'pst_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pt_id')){
				$savedata['pt_id'] = $arraydata['pt_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pst_name')){
				$savedata['pst_name'] = $arraydata['pst_name'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pmc_id')){
				$savedata['pmc_id'] = $arraydata['pmc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'prsc_id')){
				$savedata['prsc_id'] = $arraydata['prsc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'peic_id')){
				$savedata['peic_id'] = $arraydata['peic_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ppc_id')){
				$savedata['ppc_id'] = $arraydata['ppc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'psc_id')){
				$savedata['psc_id'] = $arraydata['psc_id'];
			}
			if (array_key_exists('pst_executiondate', $arraydata)) {
				$savedata['pst_executiondate'] = $arraydata['pst_executiondate'];
            }
            if (array_key_exists('pst_completiondate', $arraydata)) {
				$savedata['pst_completiondate'] = $arraydata['pst_completiondate'];
            }
			if(CommonTools::checkArrayValue($arraydata,'ud_id')){
				$savedata['ud_id'] = $arraydata['ud_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pst_spendtime')){
				$savedata['pst_spendtime'] = $arraydata['pst_spendtime'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pst_requiredate')){
				$savedata['pst_requiredate'] = $arraydata['pst_requiredate'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return ProjectSubTask::where("pst_id","=",$arraydata['pst_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
