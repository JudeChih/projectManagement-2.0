<?php
/**
 * table name 使用者組別
 */
namespace App\Repositories;

use App\Models\SystemUrl;
use App\Services\CommonTools;
use DB;

class SystemUrlRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return SystemUrl::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($su_id){
		return SystemUrl::where('su_id',$su_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($su_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return SystemUrl::where('su_id',$su_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'su_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['su_name'] = $arraydata['su_name'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return SystemUrl::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'su_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'su_name')){
				$savedata['su_name'] = $arraydata['su_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return SystemUrl::where("su_id","=",$arraydata['su_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
