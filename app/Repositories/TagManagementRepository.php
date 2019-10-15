<?php
/**
 * table name 標籤管理
 */
namespace App\Repositories;

use App\Models\TagManagement;
use App\Services\CommonTools;
use DB;

class TagManagementRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return TagManagement::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($tm_id){
		return TagManagement::where('tm_id',$tm_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUgId($ug_id){
		return TagManagement::where('ug_id',$ug_id)->where('isflag',1)->get();
	}

	/**
	 * 取得數量
	 */
	public function getDataByIdUgIdName($arraydata){
		return TagManagement::where('tm_id','!=',$arraydata['tm_id'])->where('ug_id',$arraydata['ug_id'])->where('tm_name',$arraydata['tm_name'])->where('isflag',1)->count();
	}

	/**
	 * 取得數量
	 */
	public function getDataByUgIdName($arraydata){
		return TagManagement::where('ug_id',$arraydata['ug_id'])->where('tm_name',$arraydata['tm_name'])->where('isflag',1)->count();
	}

	/**
	 * 刪除
	 */
	public function delete($tm_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return TagManagement::where('tm_id',$tm_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'tm_name') & !CommonTools::checkArrayValue($arraydata,'tm_url') & !CommonTools::checkArrayValue($arraydata,'ug_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['tm_name'] = $arraydata['tm_name'];
			$savedata['tm_url'] = $arraydata['tm_url'];
			$savedata['ug_id'] = $arraydata['ug_id'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return TagManagement::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'tm_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'tm_name')){
				$savedata['tm_name'] = $arraydata['tm_name'];
			}
			if(CommonTools::checkArrayValue($arraydata,'tm_url')){
				$savedata['tm_url'] = $arraydata['tm_url'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ug_id')){
				$savedata['ug_id'] = $arraydata['ug_id'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return TagManagement::where("tm_id","=",$arraydata['tm_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
