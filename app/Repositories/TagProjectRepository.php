<?php
/**
 * table name 標籤包含專案
 */
namespace App\Repositories;

use App\Models\TagProject;
use App\Services\CommonTools;
use DB;

class TagProjectRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return TagProject::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($tp_id){
		return TagProject::where('tp_id',$tp_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByPtId($pt_id){
		return TagProject::where('pt_id',$pt_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByPtIdTmId($arraydata){
		return TagProject::where('pt_id',$arraydata['pt_id'])->where('tm_id',$arraydata['tm_id'])->where('isflag',1)->count();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUgId($ug_id){
		return TagProject::where('ug_id',$ug_id)->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($tp_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return TagProject::where('tp_id',$tp_id)->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 刪除
	 */
	public function deleteThis($arraydata){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return TagProject::where('tm_id',$arraydata['tm_id'])->where('pt_id',$arraydata['pt_id'])->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'tm_id') & !CommonTools::checkArrayValue($arraydata,'pt_id') & !CommonTools::checkArrayValue($arraydata,'ug_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['tm_id'] = $arraydata['tm_id'];
			$savedata['pt_id'] = $arraydata['pt_id'];
			$savedata['ug_id'] = $arraydata['ug_id'];

			// 檢查非必傳欄位並填入

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return TagProject::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'tp_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'tm_id')){
				$savedata['tm_id'] = $arraydata['tm_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pt_id')){
				$savedata['pt_id'] = $arraydata['pt_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ug_id')){
				$savedata['ug_id'] = $arraydata['ug_id'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return TagProject::where("tp_id","=",$arraydata['tp_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
