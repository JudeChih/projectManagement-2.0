<?php
/**
 * table name 使用者組別
 */
namespace App\Repositories;

use App\Models\UserGroup;
use App\Services\CommonTools;
use DB;

class UserGroupRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return UserGroup::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($ug_id){
		return UserGroup::where('ug_id',$ug_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($ug_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return UserGroup::where('ug_id',$ug_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ug_name') || !CommonTools::checkArrayValue($arraydata,'ug_name_forshort')){
				return false;
			}
			// 填入必傳欄位
			$savedata['ug_name'] = $arraydata['ug_name'];
			$savedata['ug_name_forshort'] = $arraydata['ug_name_forshort'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return UserGroup::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ug_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'ug_name')){
				$savedata['ug_name'] = $arraydata['ug_name'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ug_name_forshort')){
				$savedata['ug_name_forshort'] = $arraydata['ug_name_forshort'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return UserGroup::where("ug_id","=",$arraydata['ug_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
