<?php
/**
 * table name 公告資訊
 */
namespace App\Repositories;

use App\Models\AnnouncementInformation;
use App\Services\CommonTools;
use DB;

class AnnouncementInformationRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return AnnouncementInformation::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($ai_id){
		return AnnouncementInformation::where('ai_id',$ai_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUgId($ug_id){
		return AnnouncementInformation::where('ug_id',$ug_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByCate($ai_cate){
		return AnnouncementInformation::where('ai_cate',$ai_cate)->where('isflag',1)->get();
	}

	public function getDataByCateUgid($ai_cate,$ug_id){
		return AnnouncementInformation::where('ai_cate',$ai_cate)->where('ug_id',$ug_id)->where('isflag',1)->get();
	}

	/**
	 * 取得數量
	 */
	public function getDataByName($arraydata){
		return AnnouncementInformation::where('ai_title',$arraydata['ai_title'])->where('ug_id',$arraydata['ug_id'])->where('isflag',1)->count();
	}

	/**
	 * 刪除
	 */
	public function delete($ai_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return AnnouncementInformation::where('ai_id',$ai_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ai_cate') || !CommonTools::checkArrayValue($arraydata,'ai_title')){
				return false;
			}

			// 填入必傳欄位
			$savedata['ai_cate'] = $arraydata['ai_cate'];
			$savedata['ai_title'] = $arraydata['ai_title'];

			// 檢查非必傳欄位並填入
			if (array_key_exists('ug_id', $arraydata)) {
				$savedata['ug_id'] = $arraydata['ug_id'];
            }
			if(CommonTools::checkArrayValue($arraydata,'ai_expirydate')){
				$savedata['ai_expirydate'] = $arraydata['ai_expirydate'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ai_topping')){
				$savedata['ai_topping'] = $arraydata['ai_topping'];
			}

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return AnnouncementInformation::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ai_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'ai_title')){
				$savedata['ai_title'] = $arraydata['ai_title'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ai_cate')){
				$savedata['ai_cate'] = $arraydata['ai_cate'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ug_id')){
				$savedata['ug_id'] = $arraydata['ug_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ai_expirydate')){
				$savedata['ai_expirydate'] = $arraydata['ai_expirydate'];
			}
			if(CommonTools::checkArrayValue($arraydata,'ai_topping')){
				$savedata['ai_topping'] = $arraydata['ai_topping'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return AnnouncementInformation::where("ai_id","=",$arraydata['ai_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
