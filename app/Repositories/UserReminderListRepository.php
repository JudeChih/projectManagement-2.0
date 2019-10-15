<?php
/**
 * table name 使用者負責專案
 */
namespace App\Repositories;

use App\Models\UserReminderList;
use App\Services\CommonTools;
use DB;

class UserReminderListRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return UserReminderList::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($url_id){
		return UserReminderList::where('url_id',$url_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUdId($ud_id){
		return UserReminderList::where('ud_id',$ud_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUdIdPstId($arraydata){
		return UserReminderList::where('ud_id',$arraydata['ud_id'])->where('pst_id',$arraydata['pst_id'])->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUdIdAiId($arraydata){
		return UserReminderList::where('ud_id',$arraydata['ud_id'])->where('ai_id',$arraydata['ai_id'])->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUdIdAi($ud_id){
		return UserReminderList::where('ud_id',$ud_id)->where('ai_id','!=',null)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUdIdNowDate($arraydaya){
		return UserReminderList::leftjoin('pm_announcementinformation','pm_userreminderlist.ai_id','pm_announcementinformation.ai_id')->leftjoin('pm_projectsubtask','pm_userreminderlist.pst_id','pm_projectsubtask.pst_id')->where('pm_userreminderlist.ud_id',$arraydaya['ud_id'])->where('pm_userreminderlist.url_reminderdate','<=',\Carbon\Carbon::now())->where('pm_userreminderlist.isflag',1)->select('pm_announcementinformation.ai_title','pm_projectsubtask.pst_name','pm_userreminderlist.*')->get();
	}

	/**
	 * 刪除
	 */
	public function delete($url_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return UserReminderList::where('url_id',$url_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ud_id') && !CommonTools::checkArrayValue($arraydata,'url_reminderdate')){
				return false;
			}
			// 填入必傳欄位
			$savedata['ud_id'] = $arraydata['ud_id'];
			$savedata['url_reminderdate'] = $arraydata['url_reminderdate'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pst_id')){
				$savedata['pst_id'] = $arraydata['pst_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ut_id')){
				$savedata['ut_id'] = $arraydata['ut_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ai_id')){
				$savedata['ai_id'] = $arraydata['ai_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'url_message')){
				$savedata['url_message'] = $arraydata['url_message'];
			}

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return UserReminderList::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'url_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pst_id')){
				$savedata['pst_id'] = $arraydata['pst_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ut_id')){
				$savedata['ut_id'] = $arraydata['ut_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ai_id')){
				$savedata['ai_id'] = $arraydata['ai_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ud_id')){
				$savedata['ud_id'] = $arraydata['ud_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'url_reminderdate')){
				$savedata['url_reminderdate'] = $arraydata['url_reminderdate'];
			}
			if(CommonTools::checkArrayValue($arraydata,'url_message')){
				$savedata['url_message'] = $arraydata['url_message'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return UserReminderList::where("url_id","=",$arraydata['url_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
