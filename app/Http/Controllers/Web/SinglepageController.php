<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Services\CommonTools;
use App\Services\AuthService;
use DB;
use Carbon\Carbon;
// 錯誤代碼  #120000
class SinglepageController extends Controller
{
    /**
     * 取得專案所有的資料
     */
    public function getProjectData(){
        $searchdata = Request::all();
        $url_r = new \App\Repositories\UserReminderListRepository;
        $pt_r = new \App\Repositories\ProjectTaskRepository;
        $pst_r = new \App\Repositories\ProjectSubTaskRepository;
        $pss_r = new \App\Repositories\ProjectSubSortRepository;
        $pi_r = new \App\Repositories\ProjectInformationRepository;
        $pr_r = new \App\Repositories\ProjectRecordRepository;
        $trm_r = new \App\Repositories\TagRightsManagementRepository;
        try {
            if($searchdata['type'] == 'pt'){
                //project
                if(!$project = $pt_r->getDataById($searchdata['id'])){
                    $arraydata['project'] = [];
                }else{
                    if(count($project) == 1){
                        $arraydata['project'] = $project[0];
                    }else{
                        $arraydata['project'] = [];
                    }
                }
                

                //project_id
                $arraydata['project_id'] = $arraydata['project']['pt_id'];

                //single_title
                if(!$data1 = $pt_r->getDataById($searchdata['id'])){
                    $arraydata['single_title'] = [];
                }else{
                    $data1 = $data1[0];
                    $arraydata['single_title'] = $data1;
                }

                //single_title_sub
                if(!$data2 = $pst_r->getDataByPtId($searchdata['id'])){
                    $arraydata['single_title_sub'] = [];
                }else{
                    //根據排序列表重新排序資料
                    $arrdata = [];
                    if($sortData = $pss_r->getAllData()){
                        for($i=0;$i<count($sortData);$i++){
                            $ss = json_decode($sortData[$i]['pss_sort']);
                            for ($j=0; $j < count($ss); $j++) {
                                for ($k=0; $k < count($data2); $k++) {
                                    if($ss[$j] == $data2[$k]['pst_id']){
                                        array_push($arrdata,$data2[$k]);
                                    }
                                }
                            }
                        }
                    }
                    $arraydata['single_title_sub'] = $arrdata;
                }
                
                //project_infors
                $p_array['pt_id'] = $arraydata['project']['pt_id'];
                if(!$project_infors = $pi_r->getDataByPtIdPstId($p_array)){
                    $arraydata['project_infors'] = [];
                }else{
                    $arraydata['project_infors'] = $project_infors;
                }

                //project_records
                if(!$project_records = $pr_r->getDataByPtIdPstId($p_array)){
                    $arraydata['project_records'] = [];
                }else{
                    $arraydata['project_records'] = $project_records;
                }

                //user_tags
                $t_array['ug_id'] = $arraydata['project']['ug_id'];
                $t_array['ud_id'] = AuthService::userId();
                if(!$user_tags = $trm_r->getDataByUgIdUdId($t_array)){
                    $arraydata['user_tags'] = [];
                }else{
                    $arraydata['user_tags'] = $user_tags;
                }
            }else if($searchdata['type'] == 'pst'){
                //project
                if(!$project = $pst_r->getDataById($searchdata['id'])){
                    $arraydata['project'] = [];
                }else{
                    if(count($project) == 1){
                        $arraydata['project'] = $project[0];
                    }else{
                        $arraydata['project'] = [];
                    }
                }
                

                //project_id
                $arraydata['project_id'] = $arraydata['project']['pst_id'];

                //single_title
                if(!$data1 = $pt_r->getDataById($arraydata['project']['pt_id'])){
                    $arraydata['single_title'] = [];
                }else{
                    $data1 = $data1[0];
                    $arraydata['single_title'] = $data1;
                }

                //single_title_sub
                if(!$data2 = $pst_r->getDataByPtId($arraydata['project']['pt_id'])){
                    $arraydata['single_title_sub'] = [];
                }else{
                    //根據排序列表重新排序資料
                    $arrdata = [];
                    if($sortData = $pss_r->getAllData()){
                        for($i=0;$i<count($sortData);$i++){
                            $ss = json_decode($sortData[$i]['pss_sort']);
                            for ($j=0; $j < count($ss); $j++) {
                                for ($k=0; $k < count($data2); $k++) {
                                    if($ss[$j] == $data2[$k]['pst_id']){
                                        array_push($arrdata,$data2[$k]);
                                    }
                                }
                            }
                        }
                    }
                    $arraydata['single_title_sub'] = $arrdata;
                }

                //project_infors
                $p_array['pt_id'] = $arraydata['project']['pt_id'];
                $p_array['pst_id'] = $arraydata['project']['pst_id'];
                if(!$project_infors = $pi_r->getDataByPtIdPstId($p_array)){
                    $arraydata['project_infors'] = [];
                }else{
                    $arraydata['project_infors'] = $project_infors;
                }

                //project_records
                if(!$project_records = $pr_r->getDataByPtIdPstId($p_array)){
                    $arraydata['project_records'] = [];
                }else{
                    $arraydata['project_records'] = $project_records;
                }

                //user_reminderdate
                $u_array['ud_id'] = AuthService::userId();
                $u_array['ut_id'] = AuthService::userType();
                $u_array['pst_id'] = $searchdata['id'];
                if(!$user_reminderdate = $url_r->getDataByUdIdPstId($u_array)){
					$arraydata['user_reminderdate'] = [];
				}else{
					if(count($user_reminderdate) == 1){
						$arraydata['user_reminderdate'] = $user_reminderdate[0];
					}else{
                        $arraydata['user_reminderdate'] = [];
                    }
				}
            }

            return response()->json($arraydata);
        } catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#120101',null,null);
		}
    }

    /**
     * 取得公告所有的資料
     */
    public function getAnnouncementData(){
        $searchdata = Request::all();
        $ai_r = new \App\Repositories\AnnouncementInformationRepository;
        $am_r = new \App\Repositories\AnnouncementMessageRepository;
        $url_r = new \App\Repositories\UserReminderListRepository;
        try {
            //project_ann
            if(!$project_ann = $ai_r->getDataById($searchdata['id'])){
				$arraydata['project_ann'] = [];
			}else{
                if(count($project_ann) == 1){
                    $arraydata['project_ann'] = $project_ann[0];
                }else{
                    $arraydata['project_ann'] = [];
                }
            }

            //project_ann_id
            $arraydata['project_ann_id'] = $arraydata['project_ann']['ai_id'];

            //project_ann_messages
            if(!$project_ann_messages = $am_r->getDataByAiId($arraydata['project_ann']['ai_id'])){
				$arraydata['project_ann_messages'] = [];
			}else{
                $arraydata['project_ann_messages'] = $project_ann_messages;
            }

            //user_reminderdate
            $u_array['ud_id'] = AuthService::userId();
            $u_array['ut_id'] = AuthService::userType();
            $u_array['ai_id'] = $searchdata['id'];
            if(!$user_reminderdate = $url_r->getDataByUdIdAiId($u_array)){
                $arraydata['user_reminderdate'] = [];
            }else{
                if(count($user_reminderdate) == 1){
                    $arraydata['user_reminderdate'] = $user_reminderdate[0];
                }else{
                    $arraydata['user_reminderdate'] = [];
                }
            }

            return response()->json($arraydata);
        } catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#120102',null,null);
        }
    }

    /**
     * 取得使用者所有的資料
     */
    public function getUserData(){
        $searchdata = Request::all();
        $ud_r = new \App\Repositories\UserDataRepository;
        try {
            //user_data
            if(!$user_data = $ud_r->getDataById($searchdata['id'])){
				$arraydata['user_data'] = [];
			}else{
                if(count($user_data) == 1){
                    $arraydata['user_data'] = $user_data[0];
                }else{
                    $arraydata['user_data'] = [];
                }
            }
            
            //user_id
            $arraydata['user_id'] = $arraydata['user_data']['ud_id'];

            //imageurl
            $arraydata['imageurl'] = $arraydata['user_data']['ud_icon'];

            return response()->json($arraydata);
        } catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#120103',null,null);
        }
    }

    /**
     * 取得權限所有的資料
     */
    public function getAuthorityData(){
        $searchdata = Request::all();
        $al_r = new \App\Repositories\AuthorityLevelRepository;
        try {
            //auth_level
			if(!$auth_level = $al_r->getDataById($searchdata['id'])){
				$arraydata['auth_level'] = [];
			}else{	
				if(count($auth_level) == 1){
					$arraydata['auth_level'] = $auth_level[0];
				}else{
                    $arraydata['auth_level'] = [];
                }
			}
			
			//auth_id
			$arraydata['auth_id'] = $arraydata['auth_level']['al_id'];

            return response()->json($arraydata);
        } catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#120105',null,null);
        }
    }

    /**
     * 取得書籍所有的資料
     */
    public function getBookData(){
        $searchdata = Request::all();
        $bi_r = new \App\Repositories\BookInformationRepository;
        try {
            //book_data
            if(!$book_data = $bi_r->getDataById($searchdata['id'])){
				$arraydata['book_data'] = [];
			}else{
                if(count($book_data) == 1){
                    $arraydata['book_data'] = $book_data[0];
                }else{
                    $arraydata['book_data'] = [];
                }
            }
   
            //book_id
            $arraydata['book_id'] = $arraydata['book_data']['bi_id'];

            //imageurl
            $arraydata['imageurl'] = $arraydata['book_data']['bi_fileurl'];

            return response()->json($arraydata);
        } catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#120104',null,null);
        }
    }

    
    
    /**
     * 取得所以分類資料
     */
    public function getCateData(){
        $searchdata = Request::all();
        $ud_r = new \App\Repositories\UserDataRepository;
        $al_r = new \App\Repositories\AuthorityLevelRepository;
        $ut_r = new \App\Repositories\UserTypeRepository;
        $ug_r = new \App\Repositories\UserGroupRepository;
        $bs_r = new \App\Repositories\BookSortRepository;
        $bsc_r = new \App\Repositories\BookStatusCateRepository;
        $pss_r = new \App\Repositories\ProjectSubSortRepository;
        $peic_r = new \App\Repositories\CateProjectExecuteItemRepository;
        $pmc_r = new \App\Repositories\CateProjectMilestoneRepository;
        $prsc_r = new \App\Repositories\CateProjectRequireSortRepository;
        $ppc_r = new \App\Repositories\CateProjectPriorityRepository;
        $psc_r = new \App\Repositories\CateProjectStatusRepository;
        try {
            if($searchdata['cate'] == 1 || $searchdata['cate'] == 2){
                //subprojectsort_cate
                if(!$subprojectsort_cate = $pss_r->getAllData()){
                    $arraydata['subprojectsort_cate'] = [];
                }else{
                    $arraydata['subprojectsort_cate'] = $subprojectsort_cate;
                }

                //executeitem_cate
                if(!$executeitem_cate = $peic_r->getAllData()){
                    $arraydata['executeitem_cate'] = [];
                }else{
                    $arraydata['executeitem_cate'] = $executeitem_cate;
                }

                //milestone_cate
                if(!$milestone_cate = $pmc_r->getAllData()){
                    $araydata['milestone_cate'] = [];
                }else{
                    $arraydata['milestone_cate'] = $milestone_cate;
                }

                //requiresort_cate
                if(!$requiresort_cate = $prsc_r->getAllData()){
                    $arraydata['requiresort_cate'] = [];
                }else{
                    $arraydata['requiresort_cate'] = $requiresort_cate;
                }

                //priority_cate
                if(!$priority_cate = $ppc_r->getAllData()){
                    $arraydata['priority_cate'] = [];
                }else{
                    $arraydata['priority_cate'] = $priority_cate;
                }

                //status_cate
                if(!$status_cate = $psc_r->getAllData()){
                    $arraydata['status_cate'] = [];
                }else{
                    $arraydata['status_cate'] = $status_cate;
                }

                //user_cate
                if(!$user_cate = $ud_r->getAllData($searchdata)){
                    $arraydata['user_cate'] = [];
                }else{
                    $arraydata['user_cate'] = $user_cate;
                }
            }else if($searchdata['cate'] == 4 || $searchdata['cate'] == 5){
                //auths
                if(!$auths = $al_r->getAllData($searchdata)){
                    $arraydata['auths'] = [];
                }else{
                    $arraydata['auths'] = $auths;
                }

                //type_cate
                if(!$type_cate = $ut_r->getAllData()){
                    $arraydata['type_cate'] = [];
                }else{
                    $arraydata['type_cate'] = $type_cate;
                }

                //group_cate
                if(!$group_cate = $ug_r->getAllData()){
                    $arraydata['group_cate'] = [];
                }else{
                    $arraydata['group_cate'] = $group_cate;
                }
            }else if($searchdata['cate'] == 6){
                //book_sort
                if(!$book_sort = $bs_r->getAllData()){
                    $arraydata['book_sort'] = [];
                }else{
                    $arraydata['book_sort'] = $book_sort;
                }

                //book_status
                if(!$book_status = $bsc_r->getAllData()){
                    $arraydata['book_status'] = [];
                }else{
                    $arraydata['book_status'] = $book_status;
                }

                //user_cate
                if(!$user_cate = $ud_r->getAllData($searchdata)){
                    $arraydata['user_cate'] = [];
                }else{
                    $arraydata['user_cate'] = $user_cate;
                }
            }

            return response()->json($arraydata);
        } catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData(false,'#120106',null,null);
        }
    }
}