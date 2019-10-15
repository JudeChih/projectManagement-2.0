<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Services\CommonTools;
use App\Services\AuthService;
use DB;
use Carbon\Carbon;
// 錯誤代碼  #100000
class AnnouncementController extends Controller
{
	/**
	 * 取得初始化所有的資料
	 */
	public function getAllAnnouncementData(){
		$url_r = new \App\Repositories\UserReminderListRepository;
		$ai_r = new \App\Repositories\AnnouncementInformationRepository;
		try {
			$arraydata['user_status'] = AuthService::userAllData();
			if(!$reminder_data = $url_r->getDataByUdIdAi($arraydata['user_status']['ud_id'])){
				$arraydata['reminder_data'] = [];
			}else{
				$arraydata['reminder_data'] = $reminder_data;
			}
			if(!$data_anns = $ai_r->getAllData()){
				$arraydata['data_anns'] = [];
			}else{
				$arraydata['data_anns'] = $data_anns;
			}


			return response()->json($arraydata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100101',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getAnnouncements($id){
		$ai_r = new \App\Repositories\AnnouncementInformationRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $ai_r->getDataByUgId($id)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100102',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getCompanyAnns($id){
		$ai_r = new \App\Repositories\AnnouncementInformationRepository;
		try {
			if($id == 0){
				if(!$data = $ai_r->getDataByCate(2)){
					return false;
				}
			}else{
				if(!$data = $ai_r->getDataByCateUgid(1,$id)){
					return false;
				}
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100103',null,null);
		}
	}


	/**
	 * 取得某筆資料
	 */
	public function getAnnouncement($id){
		$ai_r = new \App\Repositories\AnnouncementInformationRepository;
		try {
			if(!$data = $ai_r->getDataById($id)){
				return false;
			}
			if(count($data) == 1){
				$data = $data[0];
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100104',null,null);
		}
	}

	/**
	 * 取得某筆專案公告的訊息
	 */
	public function getAnnouncementMessages(){
		$am_r = new \App\Repositories\AnnouncementMessageRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $am_r->getDataByAiId($searchdata['ai_id'])){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100105',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Create////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionCreate($ann_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 1; //異動動作：新增
		try {
			if($ann_type == 1){ //公告資訊
				$recorddata['tr_goal'] = 21; //異動目標：公告資訊
				return $this->createAnnInformation($searchdata,$recorddata);
			}else if($ann_type == 2){ //公告訊息
				$recorddata['tr_goal'] = 22; //異動目標：公告訊息
				return $this->createAnnMessage($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100201',null,null);
		}
	}

	/**
	 * 新增公告資訊
	 */
	protected function createAnnInformation($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$ai_r = new \App\Repositories\AnnouncementInformationRepository;
			if($searchdata['ai_title']){
				if($ai_r->getDataByName($searchdata)){
					DB::rollBack();
					return CommonTools::returnData(false,'此公告標題重複',null,null);
				}
			}else{
				DB::rollBack();
				return CommonTools::returnData(false,'公告標題尚未傳入',null,null);
			}
			if(!$id = $ai_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：ai_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',$id,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100202',null,null);
		}
	}

	/**
	 * 新增公告訊息
	 */
	protected function createAnnMessage($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$am_r = new \App\Repositories\AnnouncementMessageRepository;
			if(!$id = $am_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：am_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',$id,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100203',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Modify////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionModify($ann_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 2; //異動動作：修改
		try {
			if($ann_type == 1){ //公告資訊
				$recorddata['tr_goal'] = 21; //異動目標：公告資訊
				return $this->modifyAnnInformation($searchdata,$recorddata);
			}else if($ann_type == 2){ //公告訊息
				$recorddata['tr_goal'] = 22; //異動目標：公告訊息
				return $this->modifyAnnMessage($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100301',null,null);
		}
	}

	/**
	 * 修改公告資訊
	 */
	protected function modifyAnnInformation($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$ai_r = new \App\Repositories\AnnouncementInformationRepository;
			if(!CommonTools::checkArrayValue($searchdata,'ai_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入公告編號',null,null);
			}
			if(!$ai_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['ai_id']; //目標編號：ai_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100302',null,null);
		}
	}

	/**
	 * 修改公告訊息
	 */
	protected function modifyAnnMessage($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$am_r = new \App\Repositories\AnnouncementMessageRepository;
			if(!CommonTools::checkArrayValue($searchdata,'am_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入訊息編號',null,null);
			}
			if(!$am_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['am_id']; //目標編號：am_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100303',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Delete////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionDelete($ann_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 3; //異動動作：刪除
		try {
			if($ann_type == 1){ //公告資訊
				$recorddata['tr_goal'] = 21; //異動目標：公告資訊
				return $this->deleteAnnInformation($searchdata,$recorddata);
			}else if($ann_type == 2){ //公告訊息
				$recorddata['tr_goal'] = 22; //異動目標：公告訊息
				return $this->deleteAnnMessage($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100401',null,null);
		}
	}

	/**
	 * 刪除公告資訊
	 */
	protected function deleteAnnInformation($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$ai_r = new \App\Repositories\AnnouncementInformationRepository;
			if(!CommonTools::checkArrayValue($searchdata,'ai_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入公告編號',null,null);
			}
			if(!$ai_r->delete($searchdata['ai_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['ai_id']; //目標編號：ai_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100402',null,null);
		}
	}

	/**
	 * 刪除公告訊息
	 */
	protected function deleteAnnMessage($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$am_r = new \App\Repositories\AnnouncementMessageRepository;
			if(!CommonTools::checkArrayValue($searchdata,'am_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入訊息編號',null,null);
			}
			if(!$am_r->delete($searchdata['am_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['am_id']; //目標編號：am_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#100403',null,null);
		}
	}
}