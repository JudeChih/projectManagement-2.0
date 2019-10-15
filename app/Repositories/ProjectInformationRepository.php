<?php
/**
 * table name 專案訊息
 */
namespace App\Repositories;

use App\Models\ProjectInformation;
use App\Services\CommonTools;
use DB;

class ProjectInformationRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return ProjectInformation::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($pi_id){
		return ProjectInformation::where('pi_id',$pi_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByPtIdPstId($arraydata){
		$string = ProjectInformation::where('pt_id',$arraydata['pt_id']);
		if(CommonTools::checkArrayValue($arraydata,'pst_id')){
			$string->where('pst_id',$arraydata['pst_id']);
		}else{
			$string->where('pst_id',null);
		}
		return $string->orderBy('last_update_date','DESC')->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($pi_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return ProjectInformation::where('pi_id',$pi_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pt_id') & !CommonTools::checkArrayValue($arraydata,'pi_message') & !CommonTools::checkArrayValue($arraydata,'pi_title')){
				return false;
			}
			// 填入必傳欄位
			$savedata['pt_id'] = $arraydata['pt_id'];
			$savedata['pi_message'] = $arraydata['pi_message'];
			$savedata['pi_title'] = $arraydata['pi_title'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pst_id')){
				$savedata['pst_id'] = $arraydata['pst_id'];
			}
			if (array_key_exists('pi_fileurl', $arraydata)) {
				$savedata['pi_fileurl'] = $arraydata['pi_fileurl'];
            }

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return ProjectInformation::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pi_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pt_id')){
				$savedata['pt_id'] = $arraydata['pt_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pst_id')){
				$savedata['pst_id'] = $arraydata['pst_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pi_message')){
				$savedata['pi_message'] = $arraydata['pi_message'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pi_title')){
				$savedata['pi_title'] = $arraydata['pi_title'];
			}
			if (array_key_exists('pi_fileurl', $arraydata)) {
				$savedata['pi_fileurl'] = $arraydata['pi_fileurl'];
            }

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return ProjectInformation::where("pi_id","=",$arraydata['pi_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
