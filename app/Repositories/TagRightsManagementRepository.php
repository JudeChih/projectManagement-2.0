<?php
/**
 * table name 標籤權限管理
 */
namespace App\Repositories;

use App\Models\TagRightsManagement;
use App\Services\CommonTools;
use DB;

class TagRightsManagementRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return TagRightsManagement::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($trm_id){
		return TagRightsManagement::where('trm_id',$trm_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByTmId($tm_id){
		return TagRightsManagement::leftjoin('pm_userdata','pm_tagrightsmanagement.ud_id','pm_userdata.ud_id')->where('tm_id',$tm_id)->where('pm_tagrightsmanagement.isflag',1)->select('pm_tagrightsmanagement.*','pm_userdata.ud_name','pm_userdata.ud_icon')->orderBy('trm_owner','DESC')->get();
	}

	public function getDataByUgIdUdId($arraydata){
		return TagRightsManagement::leftjoin('pm_tagmanagement','pm_tagrightsmanagement.tm_id','pm_tagmanagement.tm_id')->where('pm_tagrightsmanagement.ud_id',$arraydata['ud_id'])->select('pm_tagmanagement.*')->where('pm_tagrightsmanagement.isflag',1)->where('pm_tagmanagement.isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($trm_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return TagRightsManagement::where('trm_id',$trm_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'tm_id') && !CommonTools::checkArrayValue($arraydata,'ud_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['tm_id'] = $arraydata['tm_id'];
			$savedata['ud_id'] = $arraydata['ud_id'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'trm_owner')){
				$savedata['trm_owner'] = $arraydata['trm_owner'];
			}

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return TagRightsManagement::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'trm_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'tm_id')){
				$savedata['tm_id'] = $arraydata['tm_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_id')){
				$savedata['ud_id'] = $arraydata['ud_id'];
			}
			if(array_key_exists('trm_owner', $arraydata)){
				$savedata['trm_owner'] = $arraydata['trm_owner'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return TagRightsManagement::where("trm_id","=",$arraydata['trm_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
