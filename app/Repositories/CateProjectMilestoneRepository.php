<?php
/**
 * table name 專案里程碑分類
 */
namespace App\Repositories;

use App\Models\CateProjectMilestone;
use App\Services\CommonTools;
use DB;

class CateProjectMilestoneRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return CateProjectMilestone::where('isflag',1)->select('pmc_id','pmc_name')->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($pmc_id){
		return CateProjectMilestone::where('pmc_id',$pmc_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($pmc_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return CateProjectMilestone::where('pmc_id',$pmc_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pmc_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['pmc_name'] = $arraydata['pmc_name'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return CateProjectMilestone::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pmc_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pmc_name')){
				$savedata['pmc_name'] = $arraydata['pmc_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return CateProjectMilestone::where("pmc_id","=",$arraydata['pmc_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
