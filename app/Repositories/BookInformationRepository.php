<?php
/**
 * table name 書籍資訊
 */
namespace App\Repositories;

use App\Models\BookInformation;
use App\Services\CommonTools;
use DB;

class BookInformationRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return BookInformation::leftjoin('pm_booksort','pm_bookinformation.bs_id','pm_booksort.bs_id')->leftjoin('pm_userdata','pm_bookinformation.ud_id','pm_userdata.ud_id')->leftjoin('pm_bookstatuscate','pm_bookinformation.bsc_id','pm_bookstatuscate.bsc_id')->where('pm_bookinformation.isflag',1)->select('pm_bookinformation.*','pm_bookstatuscate.bsc_id','pm_bookstatuscate.bsc_name','pm_userdata.ud_name','pm_booksort.bs_name')->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($bi_id){
		return BookInformation::leftjoin('pm_booksort','pm_bookinformation.bs_id','pm_booksort.bs_id')->leftjoin('pm_userdata','pm_bookinformation.ud_id','pm_userdata.ud_id')->leftjoin('pm_bookstatuscate','pm_bookinformation.bsc_id','pm_bookstatuscate.bsc_id')->where('pm_bookinformation.bi_id',$bi_id)->where('pm_bookinformation.isflag',1)->select('pm_bookinformation.*','pm_bookstatuscate.bsc_id','pm_bookstatuscate.bsc_name','pm_userdata.ud_name','pm_booksort.bs_name')->get();
	}

	/**
	 * 刪除
	 */
	public function delete($bi_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return BookInformation::where('bi_id',$bi_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'bi_name') & !CommonTools::checkArrayValue($arraydata,'bs_id') & !CommonTools::checkArrayValue($arraydata,'bi_message') & !CommonTools::checkArrayValue($arraydata,'bi_purchasedate') & !CommonTools::checkArrayValue($arraydata,'ud_id') & !CommonTools::checkArrayValue($arraydata,'bsc_id') & !CommonTools::checkArrayValue($arraydata,'bi_fileurl')){
				return false;
			}
			// 填入必傳欄位
			$savedata['bi_name'] = $arraydata['bi_name'];
			$savedata['bs_id'] = $arraydata['bs_id'];
			$savedata['bi_message'] = $arraydata['bi_message'];
			$savedata['bi_purchasedate'] = $arraydata['bi_purchasedate'];
			$savedata['ud_id'] = $arraydata['ud_id'];
			$savedata['bsc_id'] = $arraydata['bsc_id'];
			$savedata['bi_fileurl'] = $arraydata['bi_fileurl'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return BookInformation::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'bi_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'bi_name')){
				$savedata['bi_name'] = $arraydata['bi_name'];
			}
			if(CommonTools::checkArrayValue($arraydata,'bs_id')){
				$savedata['bs_id'] = $arraydata['bs_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'bi_message')){
				$savedata['bi_message'] = $arraydata['bi_message'];
			}
			if(CommonTools::checkArrayValue($arraydata,'bi_purchasedate')){
				$savedata['bi_purchasedate'] = $arraydata['bi_purchasedate'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_id')){
				$savedata['ud_id'] = $arraydata['ud_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'bsc_id')){
				$savedata['bsc_id'] = $arraydata['bsc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'bi_fileurl')){
				$savedata['bi_fileurl'] = $arraydata['bi_fileurl'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return BookInformation::where("bi_id","=",$arraydata['bi_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
