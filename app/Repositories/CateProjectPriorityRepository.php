<?php
/**
 * table name 專案優先權分類
 */
namespace App\Repositories;

use App\Models\CateProjectPriority;
use App\Services\CommonTools;
use DB;

class CateProjectPriorityRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return CateProjectPriority::where('isflag',1)->select('ppc_id','ppc_name')->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($ppc_id){
		return CateProjectPriority::where('ppc_id',$ppc_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($ppc_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return CateProjectPriority::where('ppc_id',$ppc_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ppc_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['ppc_name'] = $arraydata['ppc_name'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return CateProjectPriority::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ppc_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'ppc_name')){
				$savedata['ppc_name'] = $arraydata['ppc_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return CateProjectPriority::where("ppc_id","=",$arraydata['ppc_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
