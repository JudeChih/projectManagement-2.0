<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Services\CommonTools;
use DB;
use Session;
// 錯誤代碼  #090000
class UserController extends Controller
{
	/**
	 * 取得資料
	 */
	public function getUsers(){
		$ud_r = new \App\Repositories\UserDataRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $ud_r->getAllData($searchdata)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090101',null,null);
		}
	}

	/**
	 * 取得某筆資料
	 */
	public function getUser($id){
		$ud_r = new \App\Repositories\UserDataRepository;
		try {
			if(!$data = $ud_r->getDataById($id)){
				return false;
			}
			if(count($data) == 1){
				$data = $data[0];
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090104',null,null);
		}
	}

	/**
	 * 取得使用者的標籤
	 */
	public function getUserTags(){
		$trm_r = new \App\Repositories\TagRightsManagementRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $trm_r->getDataByUgIdUdId($searchdata)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090105',null,null);
		}
	}

	/**
	 * 取得使用者的最愛專案
	 */
	public function getUserFavorites(){
		$uf_r = new \App\Repositories\UserFavoriteRepository;
		try {
			if(!$data = $uf_r->getDataByUdId(Session::get('id'))){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090107',null,null);
		}
	}

	/**
	 * 取得使用者的需提醒專案資料
	 */
	public function getUserReminderdate(){
		$url_r = new \App\Repositories\UserReminderListRepository;
		$searchdata = Request::all();
		try {
			if (array_key_exists('ai_id', $searchdata)) {
				if(!$data = $url_r->getDataByUdIdAiId($searchdata)){
					return false;
				}else{
					if(count($data) == 1){
						$data = $data[0];
					}
				}
			}elseif(array_key_exists('pst_id', $searchdata)){
				if(!$data = $url_r->getDataByUdIdPstId($searchdata)){
					return false;
				}else{
					if(count($data) == 1){
						$data = $data[0];
					}
				}
            }
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090109',null,null);
		}
	}

	public function getUserReminderdataAboutAnn(){
		$url_r = new \App\Repositories\UserReminderListRepository;
		try {
			if(!$data = $url_r->getDataByUdIdAi(Session::get('id'))){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090111',null,null);
		}
	}

	/**
	 * 取得使用者群組
	 */
	public function getUserGroups(){
		$ug_r = new \App\Repositories\UserGroupRepository;
		try {
			if(!$data = $ug_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090113',null,null);
		}
	}

	/**
	 * 取得使用者部門
	 */
	public function getUserType(){
		$ut_r = new \App\Repositories\UserTypeRepository;
		try {
			if(!$data = $ut_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090114',null,null);
		}
	}

	public function getUserAllReminderdata(){
		$searchdata = Request::all();
		$url_r = new \App\Repositories\UserReminderListRepository;
		try {
			if(!$data = $url_r->getDataByUdIdNowDate($searchdata)){
				return false;
			}
			if(count($data) > 0){
				foreach ($data as $key) {
					$url_r->delete($key['url_id']);
				}
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090116',null,null);
		}
	}

	public function getAdminAllReminderdata(){
		$searchdata = Request::all();
		$url_r = new \App\Repositories\UserReminderListRepository;
		try {
			if(!$data = $url_r->getDataByUdIdNowDate($searchdata)){
				return false;
			}
			if(count($data) > 0){
				foreach ($data as $key) {
					$url_r->delete($key['url_id']);
				}
			}

			if(count($data) > 0){
				$data = $data;
			}else{
				$data = array();
			}

			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090117',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Create////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionCreate($user_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 1; //異動動作：新增
		try {
			if($user_type == 1){ //使用者資料
				$recorddata['tr_goal'] = 26; //異動目標：使用者資料
				return $this->createUserData($searchdata,$recorddata);
			}else if($user_type == 2){ //使用者最愛
				$recorddata['tr_goal'] = 27; //異動目標：使用者最愛
				return $this->createUserFavorite($searchdata,$recorddata);
			}else if($user_type == 3){ //使用者組別
				$recorddata['tr_goal'] = 28; //異動目標：使用者組別
				return $this->createUserGroup($searchdata,$recorddata);
			}else if($user_type == 4){ //使用者負責專案
				$recorddata['tr_goal'] = 29; //異動目標：使用者負責專案
				return $this->createUserProject($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090201',null,null);
		}
	}

	/**
	 * 新增使用者資料
	 */
	protected function createUserData($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$ud_r = new \App\Repositories\UserDataRepository;
			if($ud_r->getDataByName($searchdata) > 0){
				DB::rollBack();
				return CommonTools::returnData(false,'此帳號已存在',null,null);
			}
			if(!$id = $ud_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：ud_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090202',null,null);
		}
	}

	/**
	 * 新增使用者最愛
	 */
	protected function createUserFavorite($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$uf_r = new \App\Repositories\UserFavoriteRepository;
			if(count($data = $uf_r->getDataByUdIdPtId($searchdata)) > 0){
				return CommonTools::returnData(true,'新增成功',null,null);
			}
			if(!$id = $uf_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：uf_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090203',null,null);
		}
	}

	/**
	 * 新增使用者組別
	 */
	protected function createUserGroup($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$ug_r = new \App\Repositories\UserGroupRepository;
			if(!$id = $ug_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：ug_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090205',null,null);
		}
	}

	/**
	 * 新增使用者負責專案
	 */
	protected function createUserProject($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$up_r = new \App\Repositories\UserProjectRepository;
			if(!$id = $up_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：pr_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090206',null,null);
		}
	}
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Modify////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionModify($user_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 2; //異動動作：修改
		try {
			if($user_type == 1){ //使用者資料
				$recorddata['tr_goal'] = 26; //異動目標：使用者資料
				return $this->modifyUserData($searchdata,$recorddata);
			}else if($user_type == 3){ //使用者組別
				$recorddata['tr_goal'] = 28; //異動目標：使用者組別
				return $this->modifyUserData($searchdata,$recorddata);
			}else if($user_type == 4){ //使用者負責專案
				$recorddata['tr_goal'] = 29; //異動目標：使用者負責專案
				return $this->modifyUserData($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090301',null,null);
		}
	}

	/**
	 * 修改使用者資料
	 */
	protected function modifyUserData($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$ud_r = new \App\Repositories\UserDataRepository;
			if(!CommonTools::checkArrayValue($searchdata,'ud_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入使用者編號',null,null);
			}
			if(!$ud_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['ud_id']; //目標編號：ud_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090302',null,null);
		}
	}

	/**
	 * 修改使用者組別
	 */
	protected function modifyUserGroup($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$ug_r = new \App\Repositories\UserGroupRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pi_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入組別編號',null,null);
			}
			if(!$ug_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['ug_id']; //目標編號：ug_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090304',null,null);
		}
	}

	/**
	 * 修改使用者負責專案
	 */
	protected function modifyUserProject($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$up_r = new \App\Repositories\UserProjectRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pr_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入負責專案編號',null,null);
			}
			if(!$up_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pr_id']; //目標編號：pr_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090305',null,null);
		}
	}

	/**
	 * 修改或新增使用者提醒列表
	 */
	public function actionModifyReminderDate(){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 2; //異動動作：修改
		try {
			$url_r = new \App\Repositories\UserReminderListRepository;
			DB::beginTransaction();
			if(!CommonTools::checkArrayValue($searchdata,'url_reminderdate')){
				if(CommonTools::checkArrayValue($searchdata,'url_id')){
					if(!$url_r->delete($searchdata['url_id'])){
						DB::rollBack();
						return CommonTools::returnData(false,'刪除失敗',null,null);
					}else{
						$recorddata['goal_id'] = $searchdata['url_id']; //目標編號：url_id
					}
				}
				DB::commit();
				return CommonTools::returnData(true,'刪除成功',null,null);
			}else{
				if(!CommonTools::checkArrayValue($searchdata,'url_id')){
					if(CommonTools::checkArrayValue($searchdata,'pst_id') || CommonTools::checkArrayValue($searchdata,'ai_id')){
						if(!$id = $url_r->create($searchdata)){
							DB::rollBack();
							return CommonTools::returnData(false,'新增失敗',null,null);
						}else{
							$recorddata['goal_id'] = $id; //目標編號：url_id
						}
					}elseif(CommonTools::checkArrayValue($searchdata,'url_message')){
						$ud_r = new \App\Repositories\UserDataRepository;
						$data = $ud_r->getDataByUdAdmin(1);
						foreach ($data as $key) {
							$searchdata['ud_id'] = $key['ud_id'];
							if(!$id = $url_r->create($searchdata)){
								DB::rollBack();
								return CommonTools::returnData(false,'新增失敗',null,null);
							}
						}
					}
					DB::commit();
					return CommonTools::returnData(true,'修改成功',null,null);
				}else{
					if(!$url_r->update($searchdata)){
						DB::rollBack();
						return CommonTools::returnData(false,'修改失敗',null,null);
					}else{
						$recorddata['goal_id'] = $searchdata['url_id']; //目標編號：url_id
					}
					DB::commit();
					return CommonTools::returnData(true,'修改成功',$recorddata['goal_id'],null);
				}
			}
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090306',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Delete////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionDelete($user_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 3; //異動動作：刪除
		try {
			if($user_type == 1){ //使用者資料
				$recorddata['tr_goal'] = 26; //異動目標：使用者資料
				return $this->deleteUserData($searchdata,$recorddata);
			}else if($user_type == 2){ //使用者最愛
				$recorddata['tr_goal'] = 27; //異動目標：使用者最愛
				return $this->deleteUserFavorite($searchdata,$recorddata);
			}else if($user_type == 3){ //使用者組別
				$recorddata['tr_goal'] = 28; //異動目標：使用者組別
				return $this->deleteUserGroup($searchdata,$recorddata);
			}else if($user_type == 4){ //使用者負責專案
				$recorddata['tr_goal'] = 29; //異動目標：使用者負責專案
				return $this->deleteUserProject($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090401',null,null);
		}
	}

	/**
	 * 刪除使用者資料
	 */
	protected function deleteUserData($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$ud_r = new \App\Repositories\UserDataRepository;
			if(!CommonTools::checkArrayValue($searchdata,'ud_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入使用者編號',null,null);
			}
			if(!$ud_r->delete($searchdata['ud_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['ud_id']; //目標編號：ud_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090402',null,null);
		}
	}

	/**
	 * 刪除使用者最愛
	 */
	protected function deleteUserFavorite($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$uf_r = new \App\Repositories\UserFavoriteRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pt_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入專案編號',null,null);
			}
			if(!CommonTools::checkArrayValue($searchdata,'ud_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入使用者編號',null,null);
			}
			$data = $uf_r->getDataByUdIdPtId($searchdata);
			$data = $data[0];
			$uf_id = $data['uf_id'];
			if(!$uf_r->delete($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{

				$recorddata['goal_id'] = $uf_id; //目標編號：uf_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090403',null,null);
		}
	}

	/**
	 * 刪除使用者組別
	 */
	protected function deleteUserGroup($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$ug_r = new \App\Repositories\UserGroupRepository;
			if(!CommonTools::checkArrayValue($searchdata,'ug_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入訊息編號',null,null);
			}
			if(!$ug_r->delete($searchdata['ug_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['ug_id']; //目標編號：ug_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090404',null,null);
		}
	}

	/**
	 * 刪除使用者負責專案
	 */
	protected function deleteUserProject($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$up_r = new \App\Repositories\UserProjectRepository;
			if(!CommonTools::checkArrayValue($searchdata,'up_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入紀錄編號',null,null);
			}
			if(!$up_r->delete($searchdata['up_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['up_id']; //目標編號：up_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#090405',null,null);
		}
	}
}