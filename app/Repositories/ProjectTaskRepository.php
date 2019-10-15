<?php
/**
 * table name 專案任務
 */
namespace App\Repositories;

use App\Models\ProjectTask;
use App\Services\CommonTools;
use DB;

class ProjectTaskRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return ProjectTask::leftjoin('pm_cate_projectmilestone','pm_projecttask.pmc_id','pm_cate_projectmilestone.pmc_id')->leftjoin('pm_cate_projectpriority','pm_projecttask.ppc_id','pm_cate_projectpriority.ppc_id')->leftjoin('pm_cate_projectrequiresort','pm_projecttask.prsc_id','pm_cate_projectrequiresort.prsc_id')->select('pm_projecttask.*','pm_cate_projectmilestone.pmc_id','pm_cate_projectmilestone.pmc_name','pm_cate_projectpriority.ppc_id','pm_cate_projectpriority.ppc_name','pm_cate_projectrequiresort.prsc_id','pm_cate_projectrequiresort.prsc_name')->where('pm_projecttask.isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($pt_id){
		return ProjectTask::leftjoin('pm_cate_projectmilestone','pm_projecttask.pmc_id','pm_cate_projectmilestone.pmc_id')->leftjoin('pm_cate_projectpriority','pm_projecttask.ppc_id','pm_cate_projectpriority.ppc_id')->leftjoin('pm_cate_projectrequiresort','pm_projecttask.prsc_id','pm_cate_projectrequiresort.prsc_id')->leftjoin('pm_tagmanagement','pm_projecttask.tm_id','pm_tagmanagement.tm_id')->select('pm_projecttask.*','pm_tagmanagement.tm_name','pm_cate_projectmilestone.pmc_id','pm_cate_projectmilestone.pmc_name','pm_cate_projectpriority.ppc_id','pm_cate_projectpriority.ppc_name','pm_cate_projectrequiresort.prsc_id','pm_cate_projectrequiresort.prsc_name')->where('pm_projecttask.pt_id',$pt_id)->where('pm_projecttask.isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataByUgId($ug_id){
		return ProjectTask::leftjoin('pm_cate_projectmilestone','pm_projecttask.pmc_id','pm_cate_projectmilestone.pmc_id')->leftjoin('pm_cate_projectpriority','pm_projecttask.ppc_id','pm_cate_projectpriority.ppc_id')->leftjoin('pm_cate_projectrequiresort','pm_projecttask.prsc_id','pm_cate_projectrequiresort.prsc_id')->select('pm_projecttask.*','pm_cate_projectmilestone.pmc_id','pm_cate_projectmilestone.pmc_name','pm_cate_projectpriority.ppc_id','pm_cate_projectpriority.ppc_name','pm_cate_projectrequiresort.prsc_id','pm_cate_projectrequiresort.prsc_name')->where('pm_projecttask.ug_id',$ug_id)->where('pm_projecttask.isflag',1)->get();
	}

	/**
	 * 取得數量
	 */
	public function getDataByName($arraydata){
		return ProjectTask::where('pt_name',$arraydata['pt_name'])->where('ug_id',$arraydata['ug_id'])->where('isflag',1)->count();
	}

	/**
	 * 取得數量
	 */
	public function getDataByIdName($arraydata){
		return ProjectTask::where('pt_name',$arraydata['pt_name'])->where('pt_id','!=',$arraydata['pt_id'])->where('ug_id',$arraydata['ug_id'])->where('isflag',1)->count();
	}

	/**
	 * 刪除
	 */
	public function delete($pt_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return ProjectTask::where('pt_id',$pt_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pt_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['pt_name'] = $arraydata['pt_name'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pmc_id')){
				$savedata['pmc_id'] = $arraydata['pmc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'prsc_id')){
				$savedata['prsc_id'] = $arraydata['prsc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pst_requiredate')){
				$savedata['pt_requiredate'] = $arraydata['pst_requiredate'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ppc_id')){
				$savedata['ppc_id'] = $arraydata['ppc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pt_backup')){
				$savedata['pt_backup'] = $arraydata['pt_backup'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pt_backupurl')){
				$savedata['pt_backupurl'] = $arraydata['pt_backupurl'];
				$savedata['pt_backupdate'] = \Carbon\Carbon::now();
			}
			if(CommonTools::checkArrayValue($arraydata,'ug_id')){
				$savedata['ug_id'] = $arraydata['ug_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ut_id')){
				$savedata['ut_id'] = $arraydata['ut_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'tm_id')){
				$savedata['tm_id'] = $arraydata['tm_id'];
			}

			if (array_key_exists('is_show', $arraydata)) {
				$savedata['is_show'] = $arraydata['is_show'];
            }
			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return ProjectTask::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pt_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pt_name')){
				$savedata['pt_name'] = $arraydata['pt_name'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pmc_id')){
				$savedata['pmc_id'] = $arraydata['pmc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'prsc_id')){
				$savedata['prsc_id'] = $arraydata['prsc_id'];
			}
			if (array_key_exists('pt_requiredate', $arraydata)) {
				$savedata['pt_requiredate'] = $arraydata['pt_requiredate'];
            }
			if(CommonTools::checkArrayValue($arraydata,'ppc_id')){
				$savedata['ppc_id'] = $arraydata['ppc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pt_backup')){
				$savedata['pt_backup'] = $arraydata['pt_backup'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pt_backupurl')){
				$savedata['pt_backupurl'] = $arraydata['pt_backupurl'];
				$savedata['pt_backupdate'] = \Carbon\Carbon::now();
			}
			if(CommonTools::checkArrayValue($arraydata,'ug_id')){
				$savedata['ug_id'] = $arraydata['ug_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ut_id')){
				$savedata['ut_id'] = $arraydata['ut_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'tm_id')){
				$savedata['tm_id'] = $arraydata['tm_id'];
			}
			if (array_key_exists('is_show', $arraydata)) {
				$savedata['is_show'] = $arraydata['is_show'];
            }

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return ProjectTask::where("pt_id","=",$arraydata['pt_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	public function updateProjectTag($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'pt_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			$savedata['tm_id'] = null;

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return ProjectTask::where("pt_id","=",$arraydata['pt_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
