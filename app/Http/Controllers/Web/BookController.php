<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Services\CommonTools;
use App\Services\AuthService;
use DB;
use Carbon\Carbon;
// 錯誤代碼  #060000
class BookController extends Controller
{
	/**
	 * 取得初始化所有的資料
	 */
	public function getAllBookData(){
		$ud_r = new \App\Repositories\UserDataRepository;
		$bi_r = new \App\Repositories\BookInformationRepository;
		$bs_r = new \App\Repositories\BookSortRepository;
		$bsc_r = new \App\Repositories\BookStatusCateRepository;
		$bbr_r = new \App\Repositories\BookBorrowingRecordRepository;
		try {
			if(!$data_books = $bi_r->getAllData()){
				$arraydata['data_books'] = [];
			}else{
				$arraydata['data_books'] = $data_books;
			}
			if(count($data_books) > 0){
				if(!$data_bookborrows = $bbr_r->getDataByBiId($data_books[0]['bi_id'])){
					$arraydata['data_bookborrows'] = [];
				}else{
					if(count($data_bookborrows) > 0){
						$arraydata['data_bookborrows'] = $data_bookborrows;
					}else{
						$arraydata['data_bookborrows'] = [];
					}
				}
			}else{
				$arraydata['data_bookborrows'] = [];
			}
			if(!$data_booksorts = $bs_r->getAllData()){
				$arraydata['data_booksorts'] = [];
			}else{
				$arraydata['data_booksorts'] = $data_booksorts;
			}
			if(!$cate_bookstatus = $bsc_r->getAllData()){
				$arraydata['cate_bookstatus'] = [];
			}else{
				$arraydata['cate_bookstatus'] = $cate_bookstatus;
			}
			$array = [];
			if(!$user_cate = $ud_r->getAllData($array)){
				$arraydata['user_cate'] = [];
			}else{
				$arraydata['user_cate'] = $user_cate;
			}
			
			return response()->json($arraydata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060101',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getBook($id){
		$bi_r = new \App\Repositories\BookInformationRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $bi_r->getDataById($id)){
				return false;
			}
			if(count($data) == 1){
				$data = $data[0];
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060102',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getBooks(){
		$bi_r = new \App\Repositories\BookInformationRepository;
		try {
			if(!$data = $bi_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060103',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getBorrowing($id){
		$bbr_r = new \App\Repositories\BookBorrowingRecordRepository;
		try {
			if(!$data = $bbr_r->getDataByBiId($id)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060104',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getBookSort(){
		$bs_r = new \App\Repositories\BookSortRepository;
		try {
			if(!$data = $bs_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060105',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getBookStatusCate(){
		$bsc_r = new \App\Repositories\BookStatusCateRepository;
		try {
			if(!$data = $bsc_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060106',null,null);
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
			if($ann_type == 3){ //書籍借閱
				$recorddata['tr_goal'] = 23; //異動目標：書籍借閱
				return $this->createBookBorrowing($searchdata,$recorddata);
			}else if($ann_type == 4){ //書籍資訊
				$recorddata['tr_goal'] = 24; //異動目標：書籍資訊
				return $this->createBookInformation($searchdata,$recorddata);
			}else if($ann_type == 5){ //書籍分類
				$recorddata['tr_goal'] = 25; //異動目標：書籍分類
				return $this->createBookSort($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060201',null,null);
		}
	}

	/**
	 * 新增書籍借閱紀錄
	 */
	protected function createBookBorrowing($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$bbr_r = new \App\Repositories\BookBorrowingRecordRepository;
			if(CommonTools::checkArrayValue($searchdata,'bbr_returndate') && CommonTools::checkArrayValue($searchdata,'bbr_borrowingdate')){
				$ex_date = Carbon::parse($searchdata['bbr_borrowingdate']);
				$co_date = Carbon::parse($searchdata['bbr_returndate']);
				if($ex_date->gt($co_date)){
					DB::rollBack();
					return CommonTools::returnData(false,'歸還日不能小於借閱日',null,null);
				}
			}
			if(!$id = $bbr_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：bbr_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060202',null,null);
		}
	}

	/**
	 * 新增書籍資訊
	 */
	protected function createBookInformation($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$bi_r = new \App\Repositories\BookInformationRepository;
			if(!$id = $bi_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：bi_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060203',null,null);
		}
	}

	/**
	 * 新增書籍分類
	 */
	protected function createBookSort($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$bs_r = new \App\Repositories\BookSortRepository;
			if(!$id = $bs_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：bs_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060204',null,null);
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
			if($ann_type == 3){ //書籍借閱
				$recorddata['tr_goal'] = 23; //異動目標：書籍借閱
				return $this->modifyBookBorrowing($searchdata,$recorddata);
			}else if($ann_type == 4){ //書籍資訊
				$recorddata['tr_goal'] = 24; //異動目標：書籍資訊
				return $this->modifyBookInformation($searchdata,$recorddata);
			}else if($ann_type == 5){ //書籍分類
				$recorddata['tr_goal'] = 25; //異動目標：書籍分類
				return $this->modifyBookSort($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060301',null,null);
		}
	}

	/**
	 * 修改書籍借閱紀錄
	 */
	protected function modifyBookBorrowing($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$bbr_r = new \App\Repositories\BookBorrowingRecordRepository;
			if(!CommonTools::checkArrayValue($searchdata,'bbr_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入紀錄編號',null,null);
			}
			if(CommonTools::checkArrayValue($searchdata,'bbr_returndate')){
				if($data = $bbr_r->getDataById($searchdata['bbr_id'])){
					$data = $data[0];
				}
				$ex_date = Carbon::parse($data['bbr_borrowingdate']);
				$co_date = Carbon::parse($searchdata['bbr_returndate']);
				if($ex_date->gt($co_date)){
					DB::rollBack();
					return CommonTools::returnData(false,'歸還日不能小於借閱日',null,null);
				}
			}
			if(!$bbr_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['bbr_id']; //目標編號：bbr_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060302',null,null);
		}
	}

	/**
	 * 修改書籍資訊
	 */
	protected function modifyBookInformation($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$bi_r = new \App\Repositories\BookInformationRepository;
			if(!CommonTools::checkArrayValue($searchdata,'bi_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入資訊編號',null,null);
			}
			if(!$bi_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['bi_id']; //目標編號：bi_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060303',null,null);
		}
	}

	/**
	 * 修改書籍分類
	 */
	protected function modifyBookSort($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$bs_r = new \App\Repositories\BookSortRepository;
			if(!CommonTools::checkArrayValue($searchdata,'bs_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入分類編號',null,null);
			}
			if(!$bs_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['bs_id']; //目標編號：bs_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060304',null,null);
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
			if($ann_type == 3){ //書籍借閱
				$recorddata['tr_goal'] = 23; //異動目標：書籍借閱
				return $this->deleteBookBorrowing($searchdata,$recorddata);
			}else if($ann_type == 4){ //書籍資訊
				$recorddata['tr_goal'] = 24; //異動目標：書籍資訊
				return $this->deleteBookInformation($searchdata,$recorddata);
			}else if($ann_type == 5){ //書籍分類
				$recorddata['tr_goal'] = 25; //異動目標：書籍分類
				return $this->deleteBookSort($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060401',null,null);
		}
	}

	/**
	 * 刪除書籍借閱紀錄
	 */
	protected function deleteBookBorrowing($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$bbr_r = new \App\Repositories\BookBorrowingRecordRepository;
			if(!CommonTools::checkArrayValue($searchdata,'bbr_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入紀錄編號',null,null);
			}
			if(!$bbr_r->delete($searchdata['bbr_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['bbr_id']; //目標編號：bbr_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060402',null,null);
		}
	}

	/**
	 * 刪除書籍資訊
	 */
	protected function deleteBookInformation($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$bi_r = new \App\Repositories\BookInformationRepository;
			if(!CommonTools::checkArrayValue($searchdata,'bi_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入資訊編號',null,null);
			}
			if(!$bi_r->delete($searchdata['bi_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['bi_id']; //目標編號：bi_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060403',null,null);
		}
	}

	/**
	 * 刪除書籍分類
	 */
	protected function deleteBookSort($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$bs_r = new \App\Repositories\BookSortRepository;
			if(!CommonTools::checkArrayValue($searchdata,'bs_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入分類編號',null,null);
			}
			if(!$bs_r->delete($searchdata['bs_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['bs_id']; //目標編號：bs_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#060404',null,null);
		}
	}
}