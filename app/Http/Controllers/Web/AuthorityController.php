<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Services\CommonTools;
use App\Services\AuthService;
use DB;
use Carbon\Carbon;
// 錯誤代碼  #010000
class AuthorityController extends Controller
{
	/**
	 * 取得初始化所有的資料
	 */
	public function getAllAccountData(){
		$ud_r = new \App\Repositories\UserDataRepository;
		$al_r = new \App\Repositories\AuthorityLevelRepository;
		$searchdata = Request::all();
		try {
			$user['order'] = $searchdata['user_order'];
			$user['sort'] = $searchdata['user_sort'];
			if(!$users = $ud_r->getAllData($user)){
				$arraydata['users'] = [];
			}else{
				$arraydata['users'] = $users;
			}

			$auth['order'] = $searchdata['auth_order'];
			$auth['sort'] = $searchdata['auth_sort'];
			if(!$auths = $al_r->getAllData($auth)){
				$arraydata['auths'] = [];
			}else{
				$arraydata['auths'] = $auths;
			}

			return response()->json($arraydata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010101',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getAuths(){
		$al_r = new \App\Repositories\AuthorityLevelRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $al_r->getAllData($searchdata)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010102',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getAuth($id){
		$al_r = new \App\Repositories\AuthorityLevelRepository;
		try {
			if(!$data = $al_r->getDataById($id)){
				return false;
			}
			if(count($data) == 1){
				$data = $data[0];
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010103',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getUrls(){
		$su_r = new \App\Repositories\SystemUrlRepository;
		try {
			if(!$data = $su_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010104',null,null);
		}
	}

	/**
	 * 取得所有權限等級
	 */
	public function getAuthorityLevelCate(){
		$al_r = new \App\Repositories\AuthorityLevelRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $al_r->getAllData($searchdata)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010105',null,null);
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
			if($ann_type == 7){ //權限等級資料
				$recorddata['tr_goal'] = 31; //異動目標：權限等級資料
				return $this->createAuthorityLevel($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010201',null,null);
		}
	}

	/**
	 * 新增權限等級
	 */
	protected function createAuthorityLevel($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$al_r = new \App\Repositories\AuthorityLevelRepository;
			if($al_r->getDataByName($searchdata) > 0){
				DB::rollBack();
				return CommonTools::returnData(false,'此權限名稱已存在',null,null);
			}
			if(!$id = $al_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：al_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010202',null,null);
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
			if($ann_type == 7){ //權限等級資料
				$recorddata['tr_goal'] = 31; //異動目標：權限等級資料
				return $this->modifyAuthorityLevel($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010301',null,null);
		}
	}

	/**
	 * 修改權限等級
	 */
	protected function modifyAuthorityLevel($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$al_r = new \App\Repositories\AuthorityLevelRepository;
			if(!CommonTools::checkArrayValue($searchdata,'al_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入使用者編號',null,null);
			}
			if($al_r->getDataByIdName($searchdata) > 0){
				DB::rollBack();
				return CommonTools::returnData(false,'此權限名稱已存在',null,null);
			}
			if(!$al_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['al_id']; //目標編號：al_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010302',null,null);
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
			if($ann_type == 7){ //權限等級資料
				$recorddata['tr_goal'] = 31; //異動目標：權限等級資料
				return $this->deleteAuthorityLevel($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010401',null,null);
		}
	}

	/**
	 * 刪除權限等級
	 */
	protected function deleteAuthorityLevel($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$al_r = new \App\Repositories\AuthorityLevelRepository;
			if(!CommonTools::checkArrayValue($searchdata,'al_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入權限編號',null,null);
			}
			if(!$al_r->delete($searchdata['al_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['al_id']; //目標編號：al_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#010402',null,null);
		}
	}
}