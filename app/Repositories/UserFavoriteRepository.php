<?php
/**
 * table name 使用者資料
 */
namespace App\Repositories;

use App\Models\UserFavorite;
use App\Services\CommonTools;
use DB;

class UserFavoriteRepository {

	/**
	 * 取得所有
	 */
	public function getAllData(){
		return UserFavorite::where('isflag',1)->get();
	}

	/**
	 * 取得單一
	 */
	public function getDataById($uf_id){
		return UserFavorite::where('uf_id',$uf_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUdId($ud_id){
		return UserFavorite::where('ud_id',$ud_id)->where('isflag',1)->get();
	}

	/**
	 * 取得符合
	 */
	public function getDataByUdIdPtId($arraydata){
		return UserFavorite::where('ud_id',$arraydata['ud_id'])->where('pt_id',$arraydata['pt_id'])->where('isflag',1)->get();
	}

	/**
	 * 刪除
	 */
	public function delete($arraydata){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->uf_account;
    		$savedata['isflag'] = 0;

    		// 執行刪除
    		return UserFavorite::where('pt_id',$arraydata['pt_id'])->where('ud_id',$arraydata['ud_id'])->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'ud_id') & !CommonTools::checkArrayValue($arraydata,'pt_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['ud_id'] = $arraydata['ud_id'];
			$savedata['pt_id'] = $arraydata['pt_id'];

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->uf_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->uf_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行新增
			return UserFavorite::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'uf_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'ud_id')){
				$savedata['ud_id'] = $arraydata['ud_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'pt_id')){
				$savedata['pt_id'] = $arraydata['pt_id'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->uf_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 執行修改
			return UserFavorite::where("uf_id","=",$arraydata['uf_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
