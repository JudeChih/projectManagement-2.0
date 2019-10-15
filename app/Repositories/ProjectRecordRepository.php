<?php
/**
 * table name 專案紀錄
 */
namespace App\Repositories;

use App\Models\ProjectRecord;
use App\Services\CommonTools;
use DB;

class ProjectRecordRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return ProjectRecord::orderBy('last_update_date','DESC')->where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($pr_id){
		return ProjectRecord::where('pr_id',$pr_id)->orderBy('last_update_date','DESC')->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByPtIdPstId($arraydata){
		$string = ProjectRecord::where('pt_id',$arraydata['pt_id']);
		if(CommonTools::checkArrayValue($arraydata,'pst_id')){
			$string->where('pst_id',$arraydata['pst_id']);
		}else{
			$string->where('pst_id',null);
		}
		return $string->orderBy('last_update_date','DESC')->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($pr_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return ProjectRecord::where('pr_id',$pr_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pt_id') & !CommonTools::checkArrayValue($arraydata,'pr_message')){
				return false;
			}
			// 填入必傳欄位
			$savedata['pt_id'] = $arraydata['pt_id'];
			$savedata['pr_message'] = $arraydata['pr_message'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pst_id')){
				$savedata['pst_id'] = $arraydata['pst_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pr_fileurl')){
				$savedata['pr_fileurl'] = $arraydata['pr_fileurl'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pr_recorder')){
				$savedata['pr_recorder'] = $arraydata['pr_recorder'];
			}else{
				$savedata['pr_recorder'] = \App\Services\AuthService::userData()->ud_account;
			}

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return ProjectRecord::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pr_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pt_id')){
				$savedata['pt_id'] = $arraydata['pt_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pst_id')){
				$savedata['pst_id'] = $arraydata['pst_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pr_message')){
				$savedata['pr_message'] = $arraydata['pr_message'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pr_fileurl')){
				$savedata['pr_fileurl'] = $arraydata['pr_fileurl'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pr_recorder')){
				$savedata['pr_recorder'] = $arraydata['pr_recorder'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return ProjectRecord::where("pr_id","=",$arraydata['pr_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
