<?php
/**
 * table name 使用者部門
 */
namespace App\Repositories;

use App\Models\UserType;
use App\Services\CommonTools;
use DB;

class UserTypeRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return UserType::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($ut_id){
		return UserType::where('ut_id',$ut_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($ut_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return UserType::where('ut_id',$ut_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ut_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['ut_name'] = $arraydata['ut_name'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return UserType::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ut_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'ut_name')){
				$savedata['ut_name'] = $arraydata['ut_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return UserType::where("ut_id","=",$arraydata['ut_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
