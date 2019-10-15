<?php
/**
 * table name 資產管理
 */
namespace App\Repositories;

use App\Models\PropertyManagement;
use App\Services\CommonTools;
use DB;

class PropertyManagementRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return PropertyManagement::leftjoin('pm_userdata','pm_propertymanagement.ud_id','pm_userdata.ud_id')->where('pm_propertymanagement.isflag',1)->select('pm_propertymanagement.*','pm_userdata.ud_name')->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($pm_id){
		return PropertyManagement::where('pm_id',$pm_id)->where('isflag',1)->get();
	}

	/**
	 * 取得數量
	 */
	public function getCountByUdId($ud_id){
		return PropertyManagement::where('ud_id',$ud_id)->where('isflag',1)->count();
	}

	/**
	 * 取得數量
	 */
	public function getCountByIdUdId($arraydata){
		return PropertyManagement::where('ud_id',$arraydata['ud_id'])->where('pm_id','!=',$arraydata['pm_id'])->where('isflag',1)->count();
	}

	/**
	 * 刪除
	 */
	public function delete($pm_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return PropertyManagement::where('pm_id',$pm_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ud_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['ud_id'] = $arraydata['ud_id'];

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'pm_host')){
				$savedata['pm_host'] = $arraydata['pm_host'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pm_screenone')){
				$savedata['pm_screenone'] = $arraydata['pm_screenone'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pm_screentwo')){
				$savedata['pm_screentwo'] = $arraydata['pm_screentwo'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pm_screenthree')){
				$savedata['pm_screenthree'] = $arraydata['pm_screenthree'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pm_telephone')){
				$savedata['pm_telephone'] = $arraydata['pm_telephone'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pm_canvas')){
				$savedata['pm_canvas'] = $arraydata['pm_canvas'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pm_adobe')){
				$savedata['pm_adobe'] = $arraydata['pm_adobe'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pm_other')){
				$savedata['pm_other'] = $arraydata['pm_other'];
			}

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return PropertyManagement::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'pm_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'ud_id')){
				$savedata['ud_id'] = $arraydata['ud_id'];
			}
			if (array_key_exists('pm_host', $arraydata)) {
				$savedata['pm_host'] = $arraydata['pm_host'];
            }
			if (array_key_exists('pm_screenone', $arraydata)) {
				$savedata['pm_screenone'] = $arraydata['pm_screenone'];
            }
			if (array_key_exists('pm_screentwo', $arraydata)) {
				$savedata['pm_screentwo'] = $arraydata['pm_screentwo'];
            }
			if (array_key_exists('pm_screenthree', $arraydata)) {
				$savedata['pm_screenthree'] = $arraydata['pm_screenthree'];
            }
			if (array_key_exists('pm_telephone', $arraydata)) {
				$savedata['pm_telephone'] = $arraydata['pm_telephone'];
            }
			if (array_key_exists('pm_canvas', $arraydata)) {
				$savedata['pm_canvas'] = $arraydata['pm_canvas'];
            }
			if (array_key_exists('pm_adobe', $arraydata)) {
				$savedata['pm_adobe'] = $arraydata['pm_adobe'];
            }
			if (array_key_exists('pm_other', $arraydata)) {
				$savedata['pm_other'] = $arraydata['pm_other'];
            }

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return PropertyManagement::where("pm_id","=",$arraydata['pm_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
