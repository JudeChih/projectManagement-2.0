<?php
/**
 * table name 使用者資料
 */
namespace App\Repositories;

use App\Models\UserData;
use App\Services\CommonTools;
use DB;

class UserDataRepository {

	/**
	 * 取得所有
	 */
	public function getAllData($arraydata){
		$string = UserData::leftjoin('pm_usergroup','pm_userdata.ug_id','pm_usergroup.ug_id')->leftjoin('pm_authoritylevel','pm_userdata.al_id','pm_authoritylevel.al_id')->leftjoin('pm_usertype','pm_userdata.ut_id','pm_usertype.ut_id')->where('pm_userdata.isflag',1);
		if(CommonTools::checkArrayValue($arraydata,'group')){
			$string->where('pm_userdata.ug_id',$arraydata['group']);
		}
		if(CommonTools::checkArrayValue($arraydata,'order') && CommonTools::checkArrayValue($arraydata,'sort')){
			$string->orderBy($arraydata['order'],$arraydata['sort']);
		}
		return $string->get();
	}

	// /**
	//  * 取得符合
	//  */
	// public function getProjectAllData(){
	// 	return UserData::leftjoin('pm_usergroup','pm_userdata.ug_id','pm_usergroup.ug_id')->leftjoin('pm_authoritylevel','pm_userdata.al_id','pm_authoritylevel.al_id')->leftjoin('pm_usertype','pm_userdata.ut_id','pm_usertype.ut_id')->where('pm_userdata.ut_id',1)->where('pm_userdata.isflag',1)->get();
	// }

	/**
	 * 取得單一
	 */
	public function getDataById($ud_id){
		return UserData::leftjoin('pm_usergroup','pm_userdata.ug_id','pm_usergroup.ug_id')->leftjoin('pm_authoritylevel','pm_userdata.al_id','pm_authoritylevel.al_id')->leftjoin('pm_usertype','pm_userdata.ut_id','pm_usertype.ut_id')->where('pm_userdata.ud_id',$ud_id)->where('pm_userdata.isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUdAdmin($ud_admin){
		return UserData::where('ud_admin',$ud_admin)->where('isflag',1)->get();
	}

	/**
	 * 透過帳號密碼取得符合的使用者資料
	 * @param  [string] $ud_account  [使用者帳號]
	 * @param  [string] $ud_password [使用者密碼]
	 */
	public function getDataByAccountPwd($ud_account,$ud_password){
		return UserData::leftjoin('pm_authoritylevel','pm_userdata.al_id','pm_authoritylevel.al_id')->where("ud_account","=",$ud_account)->where("ud_password","=",$ud_password)->where('ud_status','=',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUdNameTmId($arraydata){
		return UserData::leftjoin('pm_tagrightsmanagement','pm_userdata.ud_id','pm_tagrightsmanagement.ud_id')->where('pm_tagrightsmanagement.tm_id','!=',$arraydata['tm_id'])->orWhere('pm_tagrightsmanagement.tm_id',null)->where('pm_userdata.ud_name','like','%'.$arraydata['ud_name'].'%')->where('pm_tagrightsmanagement.isflag',1)->where('pm_userdata.isflag',1)->get();
	}

	/**
	 * 取得數量
	 */
	public function getDataByName($arraydata){
		return UserData::where('ud_account',$arraydata['ud_account'])->where('isflag',1)->count();
	}

	/**
	 * 取得數量
	 */
	public function getDataByIdName($arraydata){
		return UserData::where('ud_name',$arraydata['ud_name'])->where('ud_id','!=',$arraydata['ud_id'])->where('isflag',1)->count();
	}

	/**
	 * 刪除
	 */
	public function delete($ud_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return UserData::where('ud_id',$ud_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ud_name') && !CommonTools::checkArrayValue($arraydata,'ug_id') && !CommonTools::checkArrayValue($arraydata,'ut_id') && !CommonTools::checkArrayValue($arraydata,'ud_account') && !CommonTools::checkArrayValue($arraydata,'ud_password')){
				return false;
			}
			// 填入必傳欄位
			$savedata['ud_name'] = $arraydata['ud_name'];
			$savedata['ut_id'] = $arraydata['ut_id'];
			$savedata['ug_id'] = $arraydata['ug_id'];
			$savedata['ud_account'] = $arraydata['ud_account'];
			$savedata['ud_password'] = $arraydata['ud_password'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'ud_status')){
				$savedata['ud_status'] = $arraydata['ud_status'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_admin')){
				$savedata['ud_admin'] = $arraydata['ud_admin'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_last_login')){
				$savedata['ud_last_login'] = $arraydata['ud_last_login'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_icon')){
				$savedata['ud_icon'] = $arraydata['ud_icon'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_tel')){
				$savedata['ud_tel'] = $arraydata['ud_tel'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_mobile')){
				$savedata['ud_mobile'] = $arraydata['ud_mobile'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_emercontactname')){
				$savedata['ud_emercontactname'] = $arraydata['ud_emercontactname'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_emercontactphone')){
				$savedata['ud_emercontactphone'] = $arraydata['ud_emercontactphone'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_mail')){
				$savedata['ud_mail'] = $arraydata['ud_mail'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_code')){
				$savedata['ud_code'] = $arraydata['ud_code'];
			}
			if(CommonTools::checkArrayValue($arraydata,'al_id')){
				$savedata['al_id'] = $arraydata['al_id'];
			}

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return UserData::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ud_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'ud_name')){
				$savedata['ud_name'] = $arraydata['ud_name'];
			}
			if(array_key_exists('ud_status', $arraydata)){
				$savedata['ud_status'] = $arraydata['ud_status'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_admin')){
				$savedata['ud_admin'] = $arraydata['ud_admin'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ug_id')){
				$savedata['ug_id'] = $arraydata['ug_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ut_id')){
				$savedata['ut_id'] = $arraydata['ut_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_account')){
				$savedata['ud_account'] = $arraydata['ud_account'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_password')){
				$savedata['ud_password'] = $arraydata['ud_password'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_last_login')){
				$savedata['ud_last_login'] = $arraydata['ud_last_login'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_icon')){
				$savedata['ud_icon'] = $arraydata['ud_icon'];
			}
			if(array_key_exists('ud_tel', $arraydata)){
				$savedata['ud_tel'] = $arraydata['ud_tel'];
			}
			if(array_key_exists('ud_mobile', $arraydata)){
				$savedata['ud_mobile'] = $arraydata['ud_mobile'];
			}
			if(array_key_exists('ud_emercontactname', $arraydata)){
				$savedata['ud_emercontactname'] = $arraydata['ud_emercontactname'];
			}
			if(array_key_exists('ud_emercontactphone', $arraydata)){
				$savedata['ud_emercontactphone'] = $arraydata['ud_emercontactphone'];
			}
			if(array_key_exists('ud_mail', $arraydata)){
				$savedata['ud_mail'] = $arraydata['ud_mail'];
			}
			if(array_key_exists('ud_code', $arraydata)){
				$savedata['ud_code'] = $arraydata['ud_code'];
			}
			if(CommonTools::checkArrayValue($arraydata,'al_id')){
				$savedata['al_id'] = $arraydata['al_id'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return UserData::where("ud_id","=",$arraydata['ud_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
