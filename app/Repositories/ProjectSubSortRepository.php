<?php
/**
 * table name 專案子任務排序
 */
namespace App\Repositories;

use App\Models\ProjectSubSort;
use App\Services\CommonTools;
use DB;

class ProjectSubSortRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return ProjectSubSort::where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByPtId($pt_id){
		return ProjectSubSort::where('pt_id',$pt_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($pss_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return ProjectSubSort::where('pss_id',$pss_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pt_id') && !CommonTools::checkArrayValue($arraydata,'pss_sort')){
				return false;
			}
			// 填入必傳欄位
			$savedata['pt_id'] = $arraydata['pt_id'];
			$savedata['pss_sort'] = $arraydata['pss_sort'];

			// 檢查非必傳欄位並填入
			

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return ProjectSubSort::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pss_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pss_sort')){
				$savedata['pss_sort'] = $arraydata['pss_sort'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return ProjectSubSort::where("pss_id","=",$arraydata['pss_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
