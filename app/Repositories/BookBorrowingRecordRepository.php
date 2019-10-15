<?php
/**
 * table name 書籍借閱紀錄
 */
namespace App\Repositories;

use App\Models\BookBorrowingRecord;
use App\Services\CommonTools;
use DB;

class BookBorrowingRecordRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return BookBorrowingRecord::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($bbr_id){
		return BookBorrowingRecord::where('bbr_id',$bbr_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByBiId($bi_id){
		return BookBorrowingRecord::leftjoin('pm_userdata','pm_bookborrowingrecord.ud_id','pm_userdata.ud_id')->where('pm_bookborrowingrecord.bi_id',$bi_id)->where('pm_bookborrowingrecord.isflag',1)->select('pm_bookborrowingrecord.*','pm_userdata.ud_name')->get();
	}

	/**
	 * 刪除
	 */
	public function delete($bbr_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return BookBorrowingRecord::where('bbr_id',$bbr_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ud_id') & !CommonTools::checkArrayValue($arraydata,'bbr_borrowingdate') & !CommonTools::checkArrayValue($arraydata,'bi_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['ud_id'] = $arraydata['ud_id'];
			$savedata['bbr_borrowingdate'] = $arraydata['bbr_borrowingdate'];
			$savedata['bi_id'] = $arraydata['bi_id'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'bbr_returndate')){
				$savedata['bbr_returndate'] = $arraydata['bbr_returndate'];
			}

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return BookBorrowingRecord::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'bbr_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'ud_id')){
				$savedata['ud_id'] = $arraydata['ud_id'];
			}
			// if(CommonTools::checkArrayValue($arraydata,'bbr_borrowingdate')){
			// 	$savedata['bbr_borrowingdate'] = $arraydata['bbr_borrowingdate'];
			// }
			if(CommonTools::checkArrayValue($arraydata,'bbr_returndate')){
				$savedata['bbr_returndate'] = $arraydata['bbr_returndate'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return BookBorrowingRecord::where("bbr_id","=",$arraydata['bbr_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
