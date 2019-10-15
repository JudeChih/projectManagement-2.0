<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Services\CommonTools;
use DB;
use Carbon\Carbon;
use Storage;
// 錯誤代碼  #110000
class UploadFileController extends Controller
{
    //公告相關
    ////上傳檔案
    public function uploadAnnFile(Request $request){
        $all = Request::all();
        try {
            if(Request::hasFile('file')){
                for($i = 0 ; $i < count(Request::file('file')) ; $i++){
                    if (Request::file('file')[$i]->isValid()) {
                        $name = Request::file('file')[$i]->getClientOriginalName().Request::file('file')[$i]->getClientOriginalExtension();
                        Storage::putFileAs("ann/{$all['am_id']}",Request::file('file')[$i],$name);
                        // $path = Request::file('file')[$i]->storeAs(storage_path("app/ann/{$all['am_id']}"),$name);
                    }
                }
            }
            
            $am_r = new \App\Repositories\AnnouncementMessageRepository;
            $arraydata['am_id'] = $all['am_id'];
            $arraydata['am_fileurl'] = $all['nowdata'];
            $am_r->update($arraydata);
            return CommonTools::returnData(true,'成功',null,null);
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData(false,'#110101',null,null);
        }
    }
    ////下載檔案
    public function downloadAnnFile(){
        $all = Request::all();
        try {
            return response()->download(storage_path("app/ann/{$all['am_id']}/{$all['name']}"));
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData(false,'#110102',null,null);
        }
    }

    //專案相關
    ////上傳檔案
    public function uploadProFile(Request $request){
        $all = Request::all();
        try {
            if(Request::hasFile('file')){
                for($i = 0 ; $i < count(Request::file('file')) ; $i++){
                    if (Request::file('file')[$i]->isValid()) {
                        $name = Request::file('file')[$i]->getClientOriginalName().Request::file('file')[$i]->getClientOriginalExtension();
                        Storage::putFileAs("{$all['type']}/{$all['pi_id']}",Request::file('file')[$i],$name);
                        // $path = Request::file('file')[$i]->storeAs($all['type'].'/'.$all['pi_id'],$name);
                    }
                }
            }
            
            
            $pi_r = new \App\Repositories\ProjectInformationRepository;
                
            $arraydata['pi_id'] = $all['pi_id'];
            $arraydata['pi_fileurl'] = $all['nowdata'];
            $pi_r->update($arraydata);
            return CommonTools::returnData(true,'成功',null,null);
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData(false,'#110103',null,null);
        }
    }
    ////下載檔案
    public function downloadProFile(){
        $all = Request::all();
        try {
            return response()->download(storage_path("app/".$all['type']."/{$all['pi_id']}/{$all['name']}"));
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData(false,'#110104',null,null);
        }
    }


}