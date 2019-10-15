<?php
/**
 * table name 異動紀錄
 */
namespace App\Repositories;

use App\Models\TransactionRecord;
use App\Services\CommonTools;
use DB;

class TransactionRecordRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return TransactionRecord::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($tm_id){
		return TransactionRecord::where('tm_id',$tm_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($tm_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return TransactionRecord::where('tm_id',$tm_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'goal_id') & !CommonTools::checkArrayValue($arraydata,'tr_action') & !CommonTools::checkArrayValue($arraydata,'tr_goal')){
				return false;
			}
			// 填入必傳欄位
			$savedata['goal_id'] = $arraydata['goal_id'];
			$savedata['tr_action'] = $arraydata['tr_action'];
			$savedata['ud_id'] = \App\Services\AuthService::userId();
			$savedata['tr_goal'] = $arraydata['tr_goal'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return TransactionRecord::insertGetId($savedata);
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
			if(CommonTools::checkArrayValue($arraydata,'goal_id')){
				$savedata['goal_id'] = $arraydata['goal_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'tr_action')){
				$savedata['tr_action'] = $arraydata['tr_action'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_id')){
				$savedata['ud_id'] = $arraydata['ud_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'tr_goal')){
				$savedata['tr_goal'] = $arraydata['tr_goal'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return TransactionRecord::where("tm_id","=",$arraydata['tm_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
