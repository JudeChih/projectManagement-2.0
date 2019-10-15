<?php
/**
 * table name 書籍狀態分類
 */
namespace App\Repositories;

use App\Models\BookStatusCate;
use App\Services\CommonTools;
use DB;

class BookStatusCateRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return BookStatusCate::where('isflag',1)->select('bsc_id','bsc_name')->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($bsc_id){
		return BookStatusCate::where('bsc_id',$bsc_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($bsc_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return BookStatusCate::where('bsc_id',$bsc_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'bsc_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['bsc_name'] = $arraydata['bsc_name'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return BookStatusCate::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'bsc_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'bsc_name')){
				$savedata['bsc_name'] = $arraydata['bsc_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return BookStatusCate::where("bsc_id","=",$arraydata['bsc_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}