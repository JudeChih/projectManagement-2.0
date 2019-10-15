<?php
/**
 * table name 專案需求類別分類
 */
namespace App\Repositories;

use App\Models\CateProjectRequireSort;
use App\Services\CommonTools;
use DB;

class CateProjectRequireSortRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return CateProjectRequireSort::where('isflag',1)->select('prsc_id','prsc_name')->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($prsc_id){
		return CateProjectRequireSort::where('prsc_id',$prsc_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($prsc_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return CateProjectRequireSort::where('prsc_id',$prsc_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'prsc_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['prsc_name'] = $arraydata['prsc_name'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return CateProjectRequireSort::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'prsc_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'prsc_name')){
				$savedata['prsc_name'] = $arraydata['prsc_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return CateProjectRequireSort::where("prsc_id","=",$arraydata['prsc_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
