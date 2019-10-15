<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Services\CommonTools;
use App\Services\AuthService;
use DB;
use Carbon\Carbon;
// 錯誤代碼  #030000
class ProjectController extends Controller
{
	/**
	 * 取得初始化所有的資料
	 */
	public function getAllProjectData(){
		$ug_r = new \App\Repositories\UserGroupRepository;
		$ud_r = new \App\Repositories\UserDataRepository;
		$url_r = new \App\Repositories\UserReminderListRepository;
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		$pss_r = new \App\Repositories\ProjectSubSortRepository;
		$peic_r = new \App\Repositories\CateProjectExecuteItemRepository;
		$psc_r = new \App\Repositories\CateProjectStatusRepository;
		$pt_r = new \App\Repositories\ProjectTaskRepository;
		$trm_r = new \App\Repositories\TagRightsManagementRepository;
		$uf_r = new \App\Repositories\UserFavoriteRepository;
		$searchdata = Request::all();
		try {
			$arraydata['user_status'] = AuthService::userAllData();
			// if(!$reminder_data = $url_r->getDataByUdIdAi($arraydata['user_status']['ud_id'])){
			// 	$arraydata['reminder_data'] = [];
			// }else{
			// 	$arraydata['reminder_data'] = $reminder_data;
			// }
			$searchdata['ud_id'] = $arraydata['user_status']['ud_id'];
			if(!$user_tags = $trm_r->getDataByUgIdUdId($searchdata)){
				$arraydata['user_tags'] = [];
			}else{
				$arraydata['user_tags'] = $user_tags;
			}
			if(!$user_favorites = $uf_r->getDataByUdId($arraydata['user_status']['ud_id'])){
				$arraydata['user_favorites'] = [];
			}else{
				$arraydata['user_favorites'] = $user_favorites;
			}
			if(!$projects = $pt_r->getAllData()){
				$arraydata['projects'] = [];
			}else{
				$arraydata['projects'] = $projects;
			}
			if(!$data = $pst_r->getAllData()){
				$arraydata['sub_projects'] = [];
			}else{
				//根據排序列表重新排序資料
				$ardata = [];
				if($sortData = $pss_r->getAllData()){
					for($i=0;$i<count($sortData);$i++){
						$ss = json_decode($sortData[$i]['pss_sort']);
						for ($j=0; $j < count($ss); $j++) {
							for ($k=0; $k < count($data); $k++) {
								if($ss[$j] == $data[$k]['pst_id']){
									array_push($ardata,$data[$k]);
								}
							}
						}
					}
					$arraydata['sub_projects'] = $ardata;
				}else{
					$arraydata['sub_projects'] = $data;
				}
			}
			if(!$subprojectsort_cate = $pss_r->getAllData()){
				$arraydata['subprojectsort_cate'] = [];
			}else{
				$arraydata['subprojectsort_cate'] = $subprojectsort_cate;
			}
			if(!$executeitem_cate = $peic_r->getAllData()){
				$arraydata['executeitem_cate'] = [];
			}else{
				$arraydata['executeitem_cate'] = $executeitem_cate;
			}
			if(!$status_cate = $psc_r->getAllData()){
				$arraydata['status_cate'] = [];
			}else{
				$arraydata['status_cate'] = $status_cate;
			}
			return response()->json($arraydata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030101',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getProjects(){
		$pt_r = new \App\Repositories\ProjectTaskRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $pt_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030102',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getSubProjects(){
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		$pss_r = new \App\Repositories\ProjectSubSortRepository;
		try {
			if(!$data = $pst_r->getAllData()){
				return false;
			}
			//根據排序列表重新排序資料
			$arraydata = [];
			if($sortData = $pss_r->getAllData()){
				for($i=0;$i<count($sortData);$i++){
					$ss = json_decode($sortData[$i]['pss_sort']);
					for ($j=0; $j < count($ss); $j++) {
						for ($k=0; $k < count($data); $k++) {
							if($ss[$j] == $data[$k]['pst_id']){
								array_push($arraydata,$data[$k]);
							}
						}
					}
				}
				return response()->json($arraydata);
			}else{
				return response()->json($data);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030103',null,null);
		}
	}

	/**
	 * 取得資料
	 */
	public function getSubProjectsOfProject(){
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $pst_r->getDataByPtIdForList($searchdata['pt_id'])){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030104',null,null);
		}
	}

	/**
	 * 取得某年某月資料
	 */
	public function getOneMonthProject(){
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		$searchdata = Request::all();
		try {
			if(!CommonTools::checkArrayValue($searchdata,'year')){
				return CommonTools::returnData(false,'未傳入年分',null,null);
			}
			if(!CommonTools::checkArrayValue($searchdata,'month')){
				return CommonTools::returnData(false,'未傳入月份',null,null);
			}
			//第一天
			$first = Carbon::createFromDate($searchdata['year'],$searchdata['month']+1,1);
			//最後一天
			$last = Carbon::createFromDate($searchdata['year'],$searchdata['month']+2,1)->subDays(1);
			if(!$data = $pst_r->getDataByCompletiondate($first,$last)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030105',null,null);
		}
	}

	/**
	 * 取得全部符合的子任務資料
	 */
	public function getAllUserSubProject(){
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		try {
			$today = Carbon::now()->toDateString();
			if(!$data = $pst_r->getAllDataForIndex($today)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030106',null,null);
		}
	}

	/**
	 * 取得某筆資料
	 */
	public function getProject($id){
		$pt_r = new \App\Repositories\ProjectTaskRepository;
		try {
			if(!$data = $pt_r->getDataById($id)){
				return false;
			}
			if(count($data) == 1){
				$data = $data[0];
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030108',null,null);
		}
	}

	/**
	 * 取得某筆資料
	 */
	public function getSubProject($id){
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		try {
			if(!$data = $pst_r->getDataById($id)){
				return false;
			}
			if(count($data) == 1){
				$data = $data[0];
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030109',null,null);
		}
	}

	/**
	 * 取得某專案的專案訊息
	 */
	public function getProjectInfors(){
		$pi_r = new \App\Repositories\ProjectInformationRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $pi_r->getDataByPtIdPstId($searchdata)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030110',null,null);
		}
	}

	/**
	 * 取得某專案的專案紀錄
	 */
	public function getProjectRecords(){
		$pr_r = new \App\Repositories\ProjectRecordRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $pr_r->getDataByPtIdPstId($searchdata)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030111',null,null);
		}
	}

	/**
	 * 取得某專案的備份資訊
	 */
	public function getProjectBackup(){
		$pt_r = new \App\Repositories\ProjectTaskRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $pt_r->getDataById($searchdata['pt_id'])){
				return false;
			}else{
				$data = $data[0];
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030112',null,null);
		}
	}

	/**
	 * 取得單一專案任務頁面左側title
	 */
	public function getSingleTitle($id){
		$pt_r = new \App\Repositories\ProjectTaskRepository;
		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
		$pss_r = new \App\Repositories\ProjectSubSortRepository;
		try {
			if(!$data1 = $pt_r->getDataById($id)){
				return false;
			}else{
				$data1 = $data1[0];
			}
			if(!$data2 = $pst_r->getDataByPtId($id)){
				return false;
			}
			$data = [];
			$data['project'] = $data1;
			//根據排序列表重新排序資料
			$arraydata = [];
			if($sortData = $pss_r->getAllData()){
				for($i=0;$i<count($sortData);$i++){
					$ss = json_decode($sortData[$i]['pss_sort']);
					for ($j=0; $j < count($ss); $j++) {
						for ($k=0; $k < count($data2); $k++) {
							if($ss[$j] == $data2[$k]['pst_id']){
								array_push($arraydata,$data2[$k]);
							}
						}
					}
				}
			}
			$data['projectsub'] = $arraydata;
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030113',null,null);
		}
	}

	/**
	 * 取得所有子任務排序
	 */
	public function getSubprojectSortCate(){
		$pss_r = new \App\Repositories\ProjectSubSortRepository;
		try {
			if(!$data = $pss_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030114',null,null);
		}
	}

	/**
	 * 取得所有執行項目
	 */
	public function getExecuteItemCate(){
		$peic_r = new \App\Repositories\CateProjectExecuteItemRepository;
		try {
			if(!$data = $peic_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030115',null,null);
		}
	}

	/**
	 * 取得所有里程碑
	 */
	public function getMilestoneCate(){
		$pmc_r = new \App\Repositories\CateProjectMilestoneRepository;
		try {
			if(!$data = $pmc_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030116',null,null);
		}
	}

	/**
	 * 取得所有需求類別
	 */
	public function getRequireSortCate(){
		$prsc_r = new \App\Repositories\CateProjectRequireSortRepository;
		try {
			if(!$data = $prsc_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030117',null,null);
		}
	}

	/**
	 * 取得所有優先權
	 */
	public function getPriorityCate(){
		$ppc_r = new \App\Repositories\CateProjectPriorityRepository;
		try {
			if(!$data = $ppc_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030118',null,null);
		}
	}

	/**
	 * 取得所有狀態
	 */
	public function getStatusCate(){
		$psc_r = new \App\Repositories\CateProjectStatusRepository;
		try {
			if(!$data = $psc_r->getAllData()){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030119',null,null);
		}
	}

	/**
	 * 取得某標籤的成員資料
	 */
	public function getUserInThisTag(){
		$trm_r = new \App\Repositories\TagRightsManagementRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $trm_r->getDataByTmId($searchdata['tm_id'])){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030120',null,null);
		}
	}

	/**
	 * 取得某標籤成員以外的使用者
	 */
	public function getUserNotInThisTag(){
		$trm_r = new \App\Repositories\TagRightsManagementRepository;
		$ud_r = new \App\Repositories\UserDataRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $ud_r->getDataByUdNameTmId($searchdata)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030121',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Create////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionCreate($pro_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 1; //異動動作：新增
		try {
			if($pro_type == 1){ //專案任務
				$recorddata['tr_goal'] = 1; //異動目標：專案任務
				return $this->createProject($searchdata,$recorddata);
			}
			if($pro_type == 2){ //專案子任務
				$recorddata['tr_goal'] = 2; //異動目標：專案子任務
				return $this->createSubProject($searchdata,$recorddata);
			}
			if($pro_type == 3){ //專案訊息
				$recorddata['tr_goal'] = 3; //異動目標：專案訊息
				return $this->createProjectInformation($searchdata,$recorddata);
			}
			if($pro_type == 4){ //專案紀錄
				$recorddata['tr_goal'] = 4; //異動目標：專案紀錄
				return $this->createProjectRecord($searchdata,$recorddata);
			}
			if($pro_type == 5){ //標籤
				$recorddata['tr_goal'] = 5; //異動目標：標籤
				return $this->createTag($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030201',null,null);
		}
	}

	/**
	 * 新增主專任
	 */
	protected function createProject($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pt_r = new \App\Repositories\ProjectTaskRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pt_name')){
				DB::rollBack();
				return CommonTools::returnData(false,'專案名稱尚未傳入',null,null);
			}
			if(!$id = $pt_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：pt_id
			}

			// 新增此主專案任務的子任務排序列表 一開始為空陣列存入
			$pss_r = new \App\Repositories\ProjectSubSortRepository;
			$arraydata['pt_id'] = $id;
			$arraydata['pss_sort'] = json_encode([]);
			if(!$pss_r->create($arraydata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}

			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',$id,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030202',null,null);
		}
	}

	/**
	 * 新增子專任
	 */
	protected function createSubProject($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pst_r = new \App\Repositories\ProjectSubTaskRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pst_name')){
				DB::rollBack();
				return CommonTools::returnData(false,'子專案名稱尚未傳入',null,null);
			}
			if(!$id = $pst_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：pst_id
			}

			// 取出該專案任務的排序列表並新增新的子任務進去
			$pss_r = new \App\Repositories\ProjectSubSortRepository;
			if(!$data = $pss_r->getDataByPtId($searchdata['pt_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}
			$data = $data[0];
			$subData = json_decode($data['pss_sort']);
			array_push($subData,$id);
			$arraydata['pss_sort'] = json_encode($subData);
			$arraydata['pss_id'] = $data['pss_id'];
			if(!$pss_r->update($arraydata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}

			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',$id,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030203',null,null);
		}
	}

	/**
	 * 新增專案訊息
	 */
	protected function createProjectInformation($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pi_r = new \App\Repositories\ProjectInformationRepository;
			if(!$id = $pi_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：pi_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			// 回傳新資訊回前端
			$data = $pi_r->getDataByPtIdPstId($searchdata);
			return CommonTools::returnData(true,'新增成功',$id,$data);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030204',null,null);
		}
	}

	/**
	 * 新增專案紀錄
	 */
	protected function createProjectRecord($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pr_r = new \App\Repositories\ProjectRecordRepository;
			if(!$id = $pr_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：pr_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			// 回傳新資訊回前端
			$data = $pr_r->getDataByPtIdPstId($searchdata);
			return CommonTools::returnData(true,'新增成功',null,$data);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030205',null,null);
		}
	}

	/**
	 * 新增標籤
	 */
	protected function createTag($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$tm_r = new \App\Repositories\TagManagementRepository;
			if($searchdata['tm_name']){
				if($tm_r->getDataByUgIdName($searchdata)){
					DB::rollBack();
					return CommonTools::returnData(false,'此標籤名稱重複',null,null);
				}
			}else{
				DB::rollBack();
				return CommonTools::returnData(false,'標籤名稱尚未傳入',null,null);
			}
			if(!$id = $tm_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：tm_id
				$searchdata['tm_id'] = $id;
				$searchdata['trm_owner'] = 1;
			}
			$trm_r = new \App\Repositories\TagRightsManagementRepository;
			if(!$trm_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}else{
				$recorddata['goal_id'] = $id; //目標編號：tm_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030206',null,null);
		}
	}

	/**
	 * 將使用者加入該標籤
	 */
	public function actionCreateUserToTag(){
		$searchdata = Request::all();
		$trm_r = new \App\Repositories\TagRightsManagementRepository;
		try {
			DB::beginTransaction();
			if(!$trm_r->create($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'新增失敗',null,null);
			}
			DB::commit();
			return CommonTools::returnData(true,'新增成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030207',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Modify////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionModify($pro_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 2; //異動動作：修改
		try {
			if($pro_type == 1){ //專案任務
				$recorddata['tr_goal'] = 1; //異動目標：專案任務
				return $this->modifyProject($searchdata,$recorddata);
			}
			if($pro_type == 2){ //專案子任務
				$recorddata['tr_goal'] = 2; //異動目標：專案子任務
				return $this->modifySubProject($searchdata,$recorddata);
			}
			if($pro_type == 3){ //專案訊息
				$recorddata['tr_goal'] = 3; //異動目標：專案訊息
				return $this->modifyProjectInformation($searchdata,$recorddata);
			}
			if($pro_type == 4){ //專案紀錄
				$recorddata['tr_goal'] = 4; //異動目標：專案紀錄
				return $this->modifyProjectRecord($searchdata,$recorddata);
			}
			if($pro_type == 5){ //標籤
				$recorddata['tr_goal'] = 5; //異動目標：標籤
				return $this->modifyTag($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030301',null,null);
		}
	}

	/**
	 * 修改主專任
	 */
	protected function modifyProject($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pt_r = new \App\Repositories\ProjectTaskRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pt_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入專案編號',null,null);
			}
          	if(array_key_exists('pt_requiredate', $searchdata)){
          		$pst_r = new \App\Repositories\ProjectSubTaskRepository;
          		$re_date = Carbon::parse($searchdata['pt_requiredate']);
				$data = $pst_r->getDataByPtId($searchdata['pt_id']);
				if(count($data) > 0){
					foreach ($data as $key) {
						if($key['pst_executiondate']){
							$ex_date = Carbon::parse($key['pst_executiondate']);
							if($re_date->gt($ex_date)){
								DB::rollBack();
								return CommonTools::returnData(false,'需求日不能大於子任務的執行日',null,null);
							}
						}
						if($key['pst_completiondate']){
							$ex_date = Carbon::parse($key['pst_completiondate']);
							if($re_date->gt($ex_date)){
								DB::rollBack();
								return CommonTools::returnData(false,'需求日不能大於子任務的完成日',null,null);
							}
						}
						if($key['pst_requiredate']){
							$ex_date = Carbon::parse($key['pst_requiredate']);
							if($re_date->gt($ex_date)){
								DB::rollBack();
								return CommonTools::returnData(false,'需求日不能大於子任務的完成日',null,null);
							}
						}
					}
				}
			}
			if(!$pt_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pt_id']; //目標編號：pt_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030302',null,null);
		}
	}

	/**
	 * 修改子專任
	 */
	protected function modifySubProject($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pst_r = new \App\Repositories\ProjectSubTaskRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pst_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入專案子編號',null,null);
			}
			//檢查傳入的是不是包含執行日期或是完成日期或是確認日期，並檢查有無大小問題(執行日不能大於完成日不能大於確認日)
			if(array_key_exists('pst_executiondate', $searchdata) || array_key_exists('pst_completiondate', $searchdata) || array_key_exists('pst_requiredate', $searchdata)){
				$pt_r = new \App\Repositories\ProjectTaskRepository;
				$data = $pst_r->getDataById($searchdata['pst_id']);
				$data = $data[0];
				$pt_data = $pt_r->getDataById($data['pt_id']);
				$pt_data = $pt_data[0];
				if(array_key_exists('pst_executiondate', $searchdata)){
					$ex_date = Carbon::parse($searchdata['pst_executiondate']);
					if($data['pst_completiondate']){
						$co_date = Carbon::parse($data['pst_completiondate']);
						if($ex_date->gt($co_date)){
							DB::rollBack();
							return CommonTools::returnData(false,'執行日不能大於完成日',null,null);
						}
					}
					if($data['pst_requiredate']){
						$re_date = Carbon::parse($data['pst_requiredate']);
						if($ex_date->gt($re_date)){
							DB::rollBack();
							return CommonTools::returnData(false,'執行日不能大於確認日',null,null);
						}
					}
					if($pt_data['pt_requiredate']){
						$pt_re_date = Carbon::parse($pt_data['pt_requiredate']);
						if($pt_re_date->gt($ex_date)){
							DB::rollBack();
							return CommonTools::returnData(false,'執行日不能小於需求日',null,null);
						}
					}
				}elseif(array_key_exists('pst_completiondate', $searchdata)){
					$co_date = Carbon::parse($searchdata['pst_completiondate']);
					if($data['pst_executiondate']){
						$ex_date = Carbon::parse($data['pst_executiondate']);
						if($ex_date->gt($co_date)){
							DB::rollBack();
							return CommonTools::returnData(false,'執行日不能大於完成日',null,null);
						}
					}
					if($data['pst_requiredate']){
						$re_date = Carbon::parse($data['pst_requiredate']);
						if($co_date->gt($re_date)){
							DB::rollBack();
							return CommonTools::returnData(false,'完成日不能大於確認日',null,null);
						}
					}
					if($pt_data['pt_requiredate']){
						$pt_re_date = Carbon::parse($pt_data['pt_requiredate']);
						if($pt_re_date->gt($co_date)){
							DB::rollBack();
							return CommonTools::returnData(false,'完成日不能小於需求日',null,null);
						}
					}
				}elseif(array_key_exists('pst_requiredate', $searchdata)){
					$re_date = Carbon::parse($searchdata['pst_requiredate']);
					if($data['pst_executiondate']){
						$ex_date = Carbon::parse($data['pst_executiondate']);
						if($ex_date->gt($re_date)){
							DB::rollBack();
							return CommonTools::returnData(false,'執行日不能大於確認日',null,null);
						}
					}
					if($data['pst_completiondate']){
						$co_date = Carbon::parse($data['pst_completiondate']);
						if($co_date->gt($re_date)){
							DB::rollBack();
							return CommonTools::returnData(false,'完成日不能大於確認日',null,null);
						}
					}
					if($pt_data['pt_requiredate']){
						$pt_re_date = Carbon::parse($pt_data['pt_requiredate']);
						if($pt_re_date->gt($re_date)){
							DB::rollBack();
							return CommonTools::returnData(false,'確認日不能小於需求日',null,null);
						}
					}
				}
			}
			if(!$pst_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pst_id']; //目標編號：pst_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030303',null,null);
		}
	}

	/**
	 * 修改專案訊息
	 */
	protected function modifyProjectInformation($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pi_r = new \App\Repositories\ProjectInformationRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pi_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入訊息編號',null,null);
			}
			if(!$pi_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pi_id']; //目標編號：pi_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			// 回傳新資訊回前端
			$data = $pi_r->getDataByPtIdPstId($searchdata);
			return CommonTools::returnData(true,'修改成功',null,$data);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030304',null,null);
		}
	}

	/**
	 * 修改專案紀錄
	 */
	protected function modifyProjectRecord($searchdata,$recorddata){
		try {
			$recorddata['tr_goal'] = 4; //異動目標：專案紀錄
			DB::beginTransaction();
			$pr_r = new \App\Repositories\ProjectRecordRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pr_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入紀錄編號',null,null);
			}
			if(!$pr_r->update($searchdata)){
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
			return CommonTools::returnData(false,'#030305',null,null);
		}
	}

	/**
	 * 修改標籤
	 */
	protected function modifyTag($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$tm_r = new \App\Repositories\TagManagementRepository;
			if(!CommonTools::checkArrayValue($searchdata,'tm_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入標籤編號',null,null);
			}
			if(CommonTools::checkArrayValue($searchdata,'tm_name')){
				if($tm_r->getDataByIdUgIdName($searchdata)){
					DB::rollBack();
					return CommonTools::returnData(false,'此標籤名稱重複',null,null);
				}
			}else{
				DB::rollBack();
				return CommonTools::returnData(false,'標籤名稱尚未傳入',null,null);
			}
			if(!$tm_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['tm_id']; //目標編號：tm_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030306',null,null);
		}
	}

	/**
	 * 將專案設定為待排程或是全部任務
	 */
	public function actionModifyProjectShow(){
		try {
			$searchdata = Request::all();
			DB::beginTransaction();
			$pt_r = new \App\Repositories\ProjectTaskRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pt_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入專案編號',null,null);
			}
			if(!$pt_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}
			DB::commit();
			// 回傳
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030307',null,null);
		}
	}

	/**
	 * 修改子任務排序
	 */
	public function actionModifyProjectSort(){
		try {
			$searchdata = Request::all();
			DB::beginTransaction();
			$pss_r = new \App\Repositories\ProjectSubSortRepository;
			if(!$pss_r->update($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}
			DB::commit();
			// 回傳
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030308',null,null);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Action Delete////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
	public function actionDelete($pro_type){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 3; //異動動作：刪除
		try {
			if($pro_type == 1){ //專案任務
				$recorddata['tr_goal'] = 1; //異動目標：專案任務
				return $this->deleteProject($searchdata,$recorddata);
			}
			if($pro_type == 2){ //專案子任務
				$recorddata['tr_goal'] = 2; //異動目標：專案子任務
				return $this->deleteSubProject($searchdata,$recorddata);
			}
			if($pro_type == 3){ //專案訊息
				$recorddata['tr_goal'] = 3; //異動目標：專案訊息
				return $this->deleteProjectInformation($searchdata,$recorddata);
			}
			if($pro_type == 4){ //專案紀錄
				$recorddata['tr_goal'] = 4; //異動目標：專案紀錄
				return $this->deleteProjectRecord($searchdata,$recorddata);
			}
			if($pro_type == 5){ //標籤
				$recorddata['tr_goal'] = 5; //異動目標：標籤
				return $this->deleteTag($searchdata,$recorddata);
			}
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030401',null,null);
		}
	}

	/**
	 * 刪除主專任
	 */
	protected function deleteProject($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pt_r = new \App\Repositories\ProjectTaskRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pt_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入專案編號',null,null);
			}
			if(!$pt_r->delete($searchdata['pt_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pt_id']; //目標編號：pt_id
			}
			// 刪除該專案任務底下所有的子任務
			$pst_r = new \App\Repositories\ProjectSubTaskRepository;
			$pst_r->deleteByPtId($searchdata['pt_id']);
			// 刪除該專案任務的子任務排序列表
			$pss_r = new \App\Repositories\ProjectSubSortRepository;
			if(!$data = $pss_r->getDataByPtId($searchdata['pt_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}
			$data = $data[0];
			if(!$pss_r->delete($data['pss_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030402',null,null);
		}
	}

	/**
	 * 刪除子專任
	 */
	protected function deleteSubProject($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pst_r = new \App\Repositories\ProjectSubTaskRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pst_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入專案子編號',null,null);
			}
			if(!$data = $pst_r->getDataById($searchdata['pst_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}
			$data = $data[0];
			if(!$pst_r->delete($searchdata['pst_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pst_id']; //目標編號：pst_id
			}
			// 刪除該子任務在主任務排序列表裡的排序
			$pss_r = new \App\Repositories\ProjectSubSortRepository;
			if(!$data2 = $pss_r->getDataByPtId($data['pt_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}
			$data2 = $data2[0];
			$subData = json_decode($data2['pss_sort']);
			$newData = [];
			for($i=0;$i<count($subData);$i++){
				if($subData[$i] != $searchdata['pst_id']){
					array_push($newData,$subData[$i]);
				}
			}
			$arraydata['pss_sort'] = json_encode($newData);
			$arraydata['pss_id'] = $data2['pss_id'];
			if(!$pss_r->update($arraydata)){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030403',null,null);
		}
	}

	/**
	 * 刪除專案訊息
	 */
	protected function deleteProjectInformation($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pi_r = new \App\Repositories\ProjectInformationRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pi_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入訊息編號',null,null);
			}
			if(!$pi_r->delete($searchdata['pi_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pi_id']; //目標編號：pi_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030404',null,null);
		}
	}

	/**
	 * 刪除專案紀錄
	 */
	protected function deleteProjectRecord($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$pr_r = new \App\Repositories\ProjectRecordRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pr_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入紀錄編號',null,null);
			}
			if(!$pr_r->delete($searchdata['pr_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pr_id']; //目標編號：pr_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030405',null,null);
		}
	}

	/**
	 * 刪除標籤
	 */
	protected function deleteTag($searchdata,$recorddata){
		try {
			DB::beginTransaction();
			$tm_r = new \App\Repositories\TagManagementRepository;
			if(!CommonTools::checkArrayValue($searchdata,'tm_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入標籤編號',null,null);
			}
			if(!$tm_r->delete($searchdata['tm_id'])){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['tm_id']; //目標編號：tm_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030406',null,null);
		}
	}

	/**
	 * 將該使用者從此標籤移除
	 */
	public function actionDeleteUserFromTag(){
		$searchdata = Request::all();
		$trm_r = new \App\Repositories\TagRightsManagementRepository;
		try {
			DB::beginTransaction();
			if(!$trm_r->delete($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'刪除失敗',null,null);
			}
			DB::commit();
			return CommonTools::returnData(true,'刪除成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030407',null,null);
		}
	}

	public function actionDeleteProjectTag(){
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 3; //異動動作：刪除
		$recorddata['tr_goal'] = 1; //異動目標：專案任務
		try {
			DB::beginTransaction();
			$recorddata['tr_goal'] = 1; //異動目標：專案任務
			$pt_r = new \App\Repositories\ProjectTaskRepository;
			if(!CommonTools::checkArrayValue($searchdata,'pt_id')){
				DB::rollBack();
				return CommonTools::returnData(false,'未傳入專案編號',null,null);
			}
			if(!$pt_r->updateProjectTag($searchdata)){
				DB::rollBack();
				return CommonTools::returnData(false,'修改失敗',null,null);
			}else{
				$recorddata['goal_id'] = $searchdata['pt_id']; //目標編號：pt_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			DB::commit();
			return CommonTools::returnData(true,'修改成功',null,null);
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#030408',null,null);
		}
	}
}