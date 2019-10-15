<?php
/**
 * table name 書籍分類
 */
namespace App\Repositories;

use App\Models\BookSort;
use App\Services\CommonTools;
use DB;

class BookSortRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return BookSort::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($bs_id){
		return BookSort::where('bs_id',$bs_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($bs_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return BookSort::where('bs_id',$bs_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'bs_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['bs_name'] = $arraydata['bs_name'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return BookSort::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'bs_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'bs_name')){
				$savedata['bs_name'] = $arraydata['bs_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return BookSort::where("bs_id","=",$arraydata['bs_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
