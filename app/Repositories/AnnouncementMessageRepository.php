<?php
/**
 * table name 公告訊息
 */
namespace App\Repositories;

use App\Models\AnnouncementMessage;
use App\Services\CommonTools;
use DB;

class AnnouncementMessageRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return AnnouncementMessage::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($am_id){
		return AnnouncementMessage::where('am_id',$am_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByAiId($ai_id){
		return AnnouncementMessage::where('ai_id',$ai_id)->where('isflag',1)->orderBy('last_update_date','DESC')->get();
	}

	/**
	 * 刪除
	 */
	public function delete($am_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return AnnouncementMessage::where('am_id',$am_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ai_id') & !CommonTools::checkArrayValue($arraydata,'am_title') & !CommonTools::checkArrayValue($arraydata,'am_message')){
				return false;
			}
			// 填入必傳欄位
			$savedata['ai_id'] = $arraydata['ai_id'];
			$savedata['am_title'] = $arraydata['am_title'];
			$savedata['am_message'] = $arraydata['am_message'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'am_fileurl')){
				$savedata['am_fileurl'] = $arraydata['am_fileurl'];
			}

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return AnnouncementMessage::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'am_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'ai_id')){
				$savedata['ai_id'] = $arraydata['ai_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'am_title')){
				$savedata['am_title'] = $arraydata['am_title'];
			}
			if(CommonTools::checkArrayValue($arraydata,'am_message')){
				$savedata['am_message'] = $arraydata['am_message'];
			}
			if (array_key_exists('am_fileurl', $arraydata)) {
				$savedata['am_fileurl'] = $arraydata['am_fileurl'];
            }

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return AnnouncementMessage::where("am_id","=",$arraydata['am_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
