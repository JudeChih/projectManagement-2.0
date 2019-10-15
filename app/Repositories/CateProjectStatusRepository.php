<?php
/**
 * table name 專案狀態分類
 */
namespace App\Repositories;

use App\Models\CateProjectStatus;
use App\Services\CommonTools;
use DB;

class CateProjectStatusRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return CateProjectStatus::where('isflag',1)->select('psc_id','psc_name')->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($psc_id){
		return CateProjectStatus::where('psc_id',$psc_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($psc_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return CateProjectStatus::where('psc_id',$psc_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'psc_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['psc_name'] = $arraydata['psc_name'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return CateProjectStatus::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'psc_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'psc_name')){
				$savedata['psc_name'] = $arraydata['psc_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return CateProjectStatus::where("psc_id","=",$arraydata['psc_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
