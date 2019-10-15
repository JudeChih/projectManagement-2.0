<?php
/**
 * table name 權限等級
 */
namespace App\Repositories;

use App\Models\AuthorityLevel;
use App\Services\CommonTools;
use DB;

class AuthorityLevelRepository {

	/**
	 * 取得所有
	 */
	public function getAllData($arraydata){
		$string = AuthorityLevel::where('isflag',1);
		if(CommonTools::checkArrayValue($arraydata,'order') && CommonTools::checkArrayValue($arraydata,'sort')){
			$string->orderBy($arraydata['order'],$arraydata['sort']);
		}
		return $string->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($al_id){
		return AuthorityLevel::where('al_id',$al_id)->where('isflag',1)->get();
	}

	/**
	 * 取得數量
	 */
	public function getDataByName($arraydata){
		return AuthorityLevel::where('al_name',$arraydata['al_name'])->where('isflag',1)->count();
	}

	/**
	 * 取得數量
	 */
	public function getDataByIdName($arraydata){
		return AuthorityLevel::where('al_name',$arraydata['al_name'])->where('al_id','!=',$arraydata['al_id'])->where('isflag',1)->count();
	}

	/**
	 * 刪除
	 */
	public function delete($al_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return AuthorityLevel::where('al_id',$al_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'al_name')){
				return false;
			}

			// 填入必傳欄位
			$savedata['al_name'] = $arraydata['al_name'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'al_remark')){
				$savedata['al_remark'] = $arraydata['al_remark'];
			}
			if(array_key_exists('pt_admin', $arraydata)){
				$savedata['pt_admin'] = $arraydata['pt_admin'];
			}
			if(array_key_exists('ai_admin', $arraydata)){
				$savedata['ai_admin'] = $arraydata['ai_admin'];
			}
			if(array_key_exists('bi_admin', $arraydata)){
				$savedata['bi_admin'] = $arraydata['bi_admin'];
			}
			if(array_key_exists('pm_admin', $arraydata)){
				$savedata['pm_admin'] = $arraydata['pm_admin'];
			}

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return AuthorityLevel::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'al_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'al_name')){
				$savedata['al_name'] = $arraydata['al_name'];
			}
			if(array_key_exists('al_remark', $arraydata)){
				$savedata['al_remark'] = $arraydata['al_remark'];
			}
			if(array_key_exists('pt_admin', $arraydata)){
				$savedata['pt_admin'] = $arraydata['pt_admin'];
			}
			if(array_key_exists('ai_admin', $arraydata)){
				$savedata['ai_admin'] = $arraydata['ai_admin'];
			}
			if(array_key_exists('bi_admin', $arraydata)){
				$savedata['bi_admin'] = $arraydata['bi_admin'];
			}
			if(array_key_exists('pm_admin', $arraydata)){
				$savedata['pm_admin'] = $arraydata['pm_admin'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return AuthorityLevel::where("al_id","=",$arraydata['al_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
