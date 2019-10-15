<?php
/**
 * table name 專案執行項目分類
 */
namespace App\Repositories;

use App\Models\CateProjectExecuteItem;
use App\Services\CommonTools;
use DB;

class CateProjectExecuteItemRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return CateProjectExecuteItem::where('isflag',1)->select('peic_id','peic_name')->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($peic_id){
		return CateProjectExecuteItem::where('peic_id',$peic_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($peic_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return CateProjectExecuteItem::where('peic_id',$peic_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'peic_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['peic_name'] = $arraydata['peic_name'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return CateProjectExecuteItem::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'peic_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'peic_name')){
				$savedata['peic_name'] = $arraydata['peic_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return CateProjectExecuteItem::where("peic_id","=",$arraydata['peic_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
