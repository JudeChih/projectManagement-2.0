<?php

Route::get('/login', 'Web\LoginController@loginview');
Route::post('/login', 'Web\LoginController@login');
Route::get('/logout', [
    'as' => 'logout',
    'uses' => 'Web\LoginController@logout'
]);


Route::group(['middleware' => 'userdata'],function(){
	
	// 首頁
	Route::get('/',function(){return View::make('pages.index');});
	Route::get('/index',function(){return redirect('/');});

	//// 取得初始化所有的資料
	Route::post('/getAllIndexData','Web\IndexController@getAllIndexData');

	////// 取得首頁相關資料
	Route::post('/onemonthproject','Web\ProjectController@getOneMonthProject');
	// Route::post('/oneweekproject','Web\ProjectController@getOneWeekProject');
	Route::post('/onemonthproject','Web\IndexController@getOneMonthProject');
	Route::post('/oneweekproject','Web\IndexController@getOneWeekProject');
	Route::get('/allusersubproject','Web\IndexController@getAllUserSubProject');


	// 專案相關
	//// 取得初始化所有的資料
	Route::post('/getAllProjectData','Web\ProjectController@getAllProjectData');

	////// 取得相關資料
	Route::get('/projects/{id}','Web\ProjectController@getProjects');
	Route::post('/projects','Web\ProjectController@getProjects');
	Route::get('/project/{id}','Web\ProjectController@getProject');
	Route::get('/subprojects','Web\ProjectController@getSubProjects');
	Route::get('/subproject/{id}','Web\ProjectController@getSubProject');
	Route::get('/allusersubproject','Web\ProjectController@getAllUserSubProject');
	Route::get('/singletitle/{id}','Web\ProjectController@getSingleTitle');
	Route::post('/userinthistag','Web\ProjectController@getUserInThisTag');
	Route::post('/usernotinthistag','Web\ProjectController@getUserNotInThisTag');
	Route::post('/getsubprojectsofproject','Web\ProjectController@getSubProjectsOfProject');
	////// 取得分類
	Route::get('/milestonecate','Web\ProjectController@getMilestoneCate');
	Route::get('/requiresortcate','Web\ProjectController@getRequireSortCate');
	Route::get('/prioritycate','Web\ProjectController@getPriorityCate');
	Route::get('/statuscate','Web\ProjectController@getStatusCate');
	// Route::get('/usercate','Web\UserController@getUserCate');
	Route::get('/executeitemcate','Web\ProjectController@getExecuteItemCate');
	Route::get('/subprojectsortcate','Web\ProjectController@getSubprojectSortCate');

		// 寫入動作
		//// 寫入BBIN相關資料
		Route::post('/project-modify/{pro_type}','Web\ProjectController@actionModify');
		Route::post('/project-create/{pro_type}','Web\ProjectController@actionCreate');
		Route::post('/project-delete/{pro_type}','Web\ProjectController@actionDelete');
		Route::post('/project-tag-delete','Web\ProjectController@actionDeleteProjectTag');
		Route::post('/project-show-modify','Web\ProjectController@actionModifyProjectShow');
		Route::post('/project-sort-modify','Web\ProjectController@actionModifyProjectSort');
		Route::post('/user-to-tag-create','Web\ProjectController@actionCreateUserToTag');
		Route::post('/user-from-tag-delete','Web\ProjectController@actionDeleteUserFromTag');
		
		
	// 取得單一專案訊息
	//// 取得初始化所有的資料
	Route::post('/getSingleProjectData','Web\SinglepageController@getProjectData');
	Route::post('/getSingleAnnouncementData','Web\SinglepageController@getAnnouncementData');
	Route::post('/getSingleUserData','Web\SinglepageController@getUserData');
	Route::post('/getSingleBookData','Web\SinglepageController@getBookData');
	Route::post('/getSingleAuthorityData','Web\SinglepageController@getAuthorityData');
	Route::post('/getSingleCateData','Web\SinglepageController@getCateData');
	
	////// 取得相關資料
	Route::post('/projectinfors','Web\ProjectController@getProjectInfors');
	Route::post('/projectrecords','Web\ProjectController@getProjectRecords');
	Route::post('/projectbackup','Web\ProjectController@getProjectBackup');
	

	// 公告相關
	//// 取得初始化所有的資料
	Route::post('/getAllAnnouncementData','Web\AnnouncementController@getAllAnnouncementData');

	////// 取得公告相關資料
	Route::get('/announcements/{id}','Web\AnnouncementController@getAnnouncements');
	Route::post('/announcements','Web\AnnouncementController@getAnnouncements');
	Route::get('/announcement/{id}','Web\AnnouncementController@getAnnouncement');
	Route::post('/announcementmessages','Web\AnnouncementController@getAnnouncementMessages');
	Route::get('/companyanns/{id}','Web\AnnouncementController@getCompanyAnns');

		// 寫入動作
		Route::post('/announcement-modify/{ann_type}','Web\AnnouncementController@actionModify');
		Route::post('/announcement-create/{ann_type}','Web\AnnouncementController@actionCreate');
		Route::post('/announcement-delete/{ann_type}','Web\AnnouncementController@actionDelete');


	// 資產管理
	//// 取得初始化所有的資料
	Route::post('/getAllPropertyData','Web\PropertyController@getAllPropertyData');
	Route::get('/propertys','Web\PropertyController@getPropertys');

		// 寫入動作
		Route::post('/property-modify/{ann_type}','Web\PropertyController@actionModify');
		Route::post('/property-create/{ann_type}','Web\PropertyController@actionCreate');
		Route::post('/property-delete/{ann_type}','Web\PropertyController@actionDelete');


	// 書籍借閱
	//// 取得初始化所有的資料
	Route::post('/getAllBookData','Web\BookController@getAllBookData');

	////// 取得書籍相關資料
	Route::get('/books','Web\BookController@getBooks');
	Route::get('/book/{id}','Web\BookController@getBook');
	Route::get('/borrowing/{id}','Web\BookController@getBorrowing');
	Route::get('/booksort','Web\BookController@getBookSort');
	Route::get('/bookstatuscate','Web\BookController@getBookStatusCate');

		// 有寫入動作
		Route::post('/book-modify/{ann_type}','Web\BookController@actionModify');
		Route::post('/book-create/{ann_type}','Web\BookController@actionCreate');
		Route::post('/book-delete/{ann_type}','Web\BookController@actionDelete');


	// 使用者相關
	// Route::get('/user-list',function(){return View::make('pages.userlist');});
	//// 取得使用者相關資料
	Route::get('/users','Web\UserController@getUsers');
	Route::post('/users','Web\UserController@getUsers');
	Route::get('/user/{id}','Web\UserController@getUser');
	Route::post('/usertags','Web\UserController@getUserTags');
	Route::post('/userfavorites','Web\UserController@getUserFavorites');
	Route::get('/usergroups','Web\UserController@getUserGroups');
	Route::get('/usertype','Web\UserController@getUserType');
	Route::post('/userreminderdate','Web\UserController@getUserReminderdate');
	Route::post('/userallreminderdata','Web\UserController@getUserAllReminderdata');
	Route::post('/adminallreminderdata','Web\UserController@getAdminAllReminderdata');
	Route::post('/reminderdataaboutann','Web\UserController@getUserReminderdataAboutAnn');
	Route::get('/sessionStatus', function() {
		return ['ud_id' => Session::get('id'),'ud_admin' => Session::get('admin'),'ug_id' => Session::get('group'),'udc_id' => Session::get('department'),'ud_name' => Session::get('user_name'),'auth' => Session::get('userdata')];
    });

		//// 有寫入動作
		Route::post('/user-modify/{user_type}','Web\UserController@actionModify');
		Route::post('/user-create/{user_type}','Web\UserController@actionCreate');
		Route::post('/user-delete/{user_type}','Web\UserController@actionDelete');
		Route::post('/reminderdate-modify','Web\UserController@actionModifyReminderDate');


	// 帳號管理相關
	Route::get('/account-list',function(){return View::make('pages.accountlist');});

	//// 取得初始化所有的資料
	Route::post('/getAllAccountData','Web\AuthorityController@getAllAccountData');

	////// 取得帳號管理相關資料
	Route::get('/authority/{id}','Web\AuthorityController@getAuth');
	Route::post('/auths','Web\AuthorityController@getAuths');
	Route::get('/authoritylevelcate','Web\AuthorityController@getAuthorityLevelCate');
	Route::get('/urls','Web\AuthorityController@getUrls');

		// 寫入動作
		Route::post('/auth-modify/{auth_type}','Web\AuthorityController@actionModify');
		Route::post('/auth-create/{auth_type}','Web\AuthorityController@actionCreate');
		Route::post('/auth-delete/{auth_type}','Web\AuthorityController@actionDelete');

	
	// 上傳檔案
	Route::post('/uploadannfile','Web\UploadFileController@uploadAnnFile');
	Route::get('/downloadannfile','Web\UploadFileController@downloadAnnfile');
	Route::post('/uploadprofile','Web\UploadFileController@uploadProFile');
	Route::get('/downloadprofile','Web\UploadFileController@downloadProfile');

		
	// 異動紀錄相關
	// Route::get('/transaction-list',function(){return View::make('pages.transactionlist');});
	// Route::get('/transactions','Web\TransactionRecordController@getTransactions');
});
