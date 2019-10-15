<style scoped></style>
<template>
    <div class="page_list" @click="colseIfClickOutside($event)">
        <div id="page-header">
            <div class="header-wrapper">
                <a href="/index" class="logo_wrap"></a>
                <div class="mainnav_wrap">
                    <ul class="mainnav_content" v-if="user_status && user_status.ud_admin">
                        <li class="nav_item" v-bind:class="url_show_block == 'index' ? 'current' : false">
                            <a class="nav_a" href="javascript:void(0)" @click="changePage('index')">個人主頁</a>
                        </li>
                        <li class="nav_item" v-for="group in user_group" v-bind:class="url_show_block == group.ug_id ? 'current' : false">
                            <a class="nav_a" href="javascript:void(0)" @click="changePage(group.ug_id),project.project_ug_id = group.ug_id">{{group.ug_name_forshort}}</a>
                        </li>
                        <li class="nav_item" v-bind:class="url_show_block == 'announcement-list' ? 'current' : false">
                            <a class="nav_a" href="javascript:void(0)" @click="changePage('announcement-list')">公告資訊</a>
                        </li>
                        <li class="nav_item" v-bind:class="url_show_block == 'property-list' ? 'current' : false">
                            <a class="nav_a" href="javascript:void(0)" @click="changePage('property-list')">資產管理</a>
                        </li>
                        <li class="nav_item" v-bind:class="url_show_block == 'book-list' ? 'current' : false">
                            <a class="nav_a" href="javascript:void(0)" @click="changePage('book-list')">書籍借閱</a>
                        </li>
                        <!-- <li class="nav_item">
                            <a class="nav_a" href="javascript:void(0)">系統連結</a>
                        </li> -->
                    </ul>
                    <ul class="mainnav_content" v-else>
                        <li class="nav_item" v-bind:class="url_show_block == 'index' ? 'current' : false">
                            <a class="nav_a" href="javascript:void(0)" @click="changePage('index')">個人主頁</a>
                        </li>
                        <li class="nav_item nav_hover" v-for="group in user_group" v-if="user_status.ug_id == group.ug_id" v-bind:class="url_show_block == group.ug_id ? 'current' : false">
                            <a class="nav_a" href="javascript:void(0)" @click="changePage(group.ug_id),project.project_ug_id = group.ug_id">{{group.ug_name_forshort}}</a>
                        </li>
                        <li class="nav_item" v-bind:class="url_show_block == 'announcement-list' ? 'current' : false">
                            <a class="nav_a" href="javascript:void(0)" @click="changePage('announcement-list')">公告資訊</a>
                        </li>
                        <li class="nav_item" v-bind:class="url_show_block == 'book-list' ? 'current' : false">
                            <a class="nav_a" href="javascript:void(0)" @click="changePage('book-list')">書籍借閱</a>
                        </li>
                        <!-- <li class="nav_item">
                            <a class="nav_a" href="javascript:void(0)">系統連結</a>
                        </li> -->
                    </ul>
                </div>
                <div class="user_wrap">
                    <ul class="">
                        <li v-bind:class="{'search_open':search_show}" v-if="url_show_block != 'index'">
                            <i v-if="!search_show" class="fas fa-search" @click="search_show=true"></i>
                            <i v-else class="fas fa-times btn_close" @click="search_show=false,clearSearchCondition()"></i>
                            <input type="text" v-if="search_show && url_show_block == 'book-list'" class="search_input" placeholder="輸入關鍵字查詢" name="search_content" @input="search()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=search_condition.book_content v-bind:class="{ 'notFound': new_data.length == 0}">
                            <input type="text" v-if="search_show && url_show_block == 'announcement-list'" class="search_input" placeholder="輸入關鍵字查詢" name="search_content" @input="search()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=search_condition.ann_content v-bind:class="{ 'notFound': new_data.length == 0}">
                            <input type="text" v-if="search_show && url_show_block == 'account-list' && account.sub_nav == 'account_management'" class="search_input" placeholder="輸入關鍵字查詢" name="search_content" @input="search()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=search_condition.user_content v-bind:class="{ 'notFound': new_users.length == 0}">
                            <input type="text" v-else-if="search_show && url_show_block == 'account-list' && account.sub_nav == 'authority_level'" class="search_input" placeholder="輸入關鍵字查詢" name="search_content" @input="search()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=search_condition.auth_content v-bind:class="{ 'notFound': new_auths.length == 0}">
                            <input type="text" v-if="search_show && !isNaN(url_show_block)" class="search_input" placeholder="輸入關鍵字查詢" name="search_content" @input="search()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=search_condition.pro_content v-bind:class="{ 'notFound': new_projects.length == 0}">
                        </li>
                        <li>
                            <i class="far fa-bell"></i>
                        </li>
                        <a href="javascript:void(0)"  @click="changePage('account-list')" v-if="user_status.ud_admin">
                            <li>
                                <i class="fas fa-cog"></i>
                            </li>
                        </a>
                        <li @click="openSinglePage(user_status,'ud',user_status.ud_id,4)">
                            <i class="far fa-user-circle"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="page-container" class="index" v-if="url_show_block == 'index'">
            <div class="container-wrapper index-week" v-if="!index.read_more">
                <div class="title-wrapper">
                    <p class="title">您好，{{user_status.ud_name}}</p>
                    <p class="now-datetime"><span class="date">{{index.date}}</span><span class="time">{{index.time}}</span></p>
                </div>
                <div class="weekly-calendar-wrapper">
                    <div class="title">
                        <h2>我的日曆</h2>
                        <p>在這裡查看本週安排的活動</p>
                        <div class="read_more cursor" @click="openCalendar()">查看更多</div>
                    </div>
                    <div class="one_week">
                        <div class="week-header">
                            <div v-for="ww in index.one_week" class="item">
                                <span class="month">{{ww.month}}</span><span class="day">{{ww.day}}</span>
                                <span class="week">{{ww.week}}</span>
                            </div>
                        </div>
                        <div class="week-container">
                            <div v-for="ww in data_for_week" class="item">
                                <div v-for="w in ww" class="pro-item" @click="openSinglePage(user_status,'pst',w.pst_id,2,w.ug_id)"><!-- v-on:mouseleave="closeHover()" -->
                                    <span class="pt_name" v-on:mouseover="openHover(w.pt_name,w.pst_name,w.pst_executiondate,w.ud_name,$event)"   v-on:mouseleave="closeHover()">{{w.pst_name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="project-wrapper">
                    <div class="title">
                        <h2>我的任務列表</h2>
                        <p>關注您的所有專案列表</p>
                    </div>
                    <div class="project-list">
                        <div class="list-title project-item">
                            <div class="table-item pt_name">任務</div>
                            <div class="table-item pmc_name">里程碑</div>
                            <div class="table-item prsc_name">需求類別</div>
                            <div class="table-item peic_name">執行項目</div>
                            <div class="table-item pst_completiondate">完成日期</div>
                            <div class="table-item psc_name">狀態</div>
                        </div>
                        <div v-for="ww in index.sub_projects_all" class="project-item cursor" @click="openSinglePage(user_status,'pst',ww.pst_id,2,ww.ug_id)">
                            <div class="table-item pt_name">{{ww.pst_name}}</div>
                            <div class="table-item pmc_name" v-if="ww.pmc_name">{{ww.pmc_name}}</div>
                            <div class="table-item pmc_name" v-else>未設定</div>
                            <div class="table-item prsc_name" v-if="ww.prsc_name">{{ww.prsc_name}}</div>
                            <div class="table-item prsc_name" v-else>未設定</div>
                            <div class="table-item peic_name" v-if="ww.peic_name">{{ww.peic_name}}</div>
                            <div class="table-item peic_name" v-else>未設定</div>
                            <div class="table-item pst_completiondate">{{ww.pst_completiondate}}</div>
                            <div class="table-item psc_name">
                                <p v-if="ww.psc_name" v-bind:class="{'color1':ww.psc_id == 1,'color2':ww.psc_id == 2,'color3':ww.psc_id == 3,'color4':ww.psc_id == 4 || ww.psc_id == 5,'color5':ww.psc_id == 6||ww.psc_id == 7||ww.psc_id == 8,'color6':ww.psc_id == 9}">{{ww.psc_name}}</p>
                                <p v-else class="color1">-</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="container-wrapper index-month" v-else>
                <div class="title-wrapper">
                    <p class="title cursor" @click="index.read_more = false"><i class="fas fa-arrow-left"></i><span class="year-and-month">{{index.now_page_year}}/{{index.now_page_month+1}}</span></p>
                    <div class="change_month">
                        <div class="pre_one cursor" @click="changeMonth('pre')"><i class="fas fa-chevron-left"></i></div>
                        <div class="today cursor" @click="changeMonth('today')">今日</div>
                        <div class="next_one cursor" @click="changeMonth('next')"><i class="fas fa-chevron-right"></i></div>
                    </div>
                </div>
                <div class="monthly-calendar-wrapper">
                    <div class="one_month">
                        <div class="month-header">
                            <div v-for="ww in index.week_cn" class="item">
                                <span class="week">{{ww}}</span>
                            </div>
                        </div>
                        <div class="month-container">
                            <div v-for="ww in data_for_month" class="item" v-bind:class="{'weekend':ww.week == 0 || ww.week == 6,'weekday':ww.week != 0 && ww.week != 6}">
                                <span class="day" v-bind:class="{'today':ww.day == index.today.day && ww.month == index.today.month && ww.year == index.today.year}">{{ww.day}}</span>
                                <div class="pro-item">
                                    <div v-for="sub in ww.sub_projects_month" 
                                        class="pst_name" 
                                        @click="openSinglePage(user_status,'pst',sub.pst_id,2,sub.ug_id)" 
                                        v-on:mouseover="openHover(sub.pt_name,sub.pst_name,sub.pst_executiondate,sub.ud_name,$event)"   
                                        v-on:mouseleave="closeHover()">
                                        <p>{{sub.pst_name}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="page-container" class="project" v-if="!isNaN(url_show_block)">
            <div class="left">
                <ul class="tags_wrap">
                    <li v-if="project.sub_nav == 'all'" v-bind:class="{ 'current': project.sub_nav == 'all'}" @click="project.sub_nav = 'all',closeAllDropdownMenu(),closeProjectInput(),showAllSubprojectsOrNot(true),project.subprojects_show=true" @drop="changeProjectItem('all')" @dragover='allowDrop($event)' draggable='false'>
                        <div class="tag_item">
                            <img src="/image/desktop-solid_hover.png">
                            <p>全部任務</p>
                        </div>
                    </li>
                    <li v-else v-bind:class="{ 'current': project.sub_nav == 'all'}" @click="project.sub_nav = 'all',closeAllDropdownMenu(),closeProjectInput(),showAllSubprojectsOrNot(true),project.subprojects_show=true" onmouseover="$(this).find('img').attr('src','/image/desktop-solid_hover.png')" onmouseout="$(this).find('img').attr('src','/image/desktop-solid.png')" @drop="changeProjectItem('all')" @dragover='allowDrop($event)' draggable='false'>
                        <div class="tag_item">
                            <img src="/image/desktop-solid.png">
                            <p>全部任務</p>
                        </div>
                    </li>
                    <li v-if="(user_status.ud_admin || user_auth.pt_admin) && project.sub_nav == 'wait'" v-bind:class="{ 'current': project.sub_nav == 'wait'}" @click="project.sub_nav = 'wait',closeAllDropdownMenu(),closeProjectInput(),showAllSubprojectsOrNot(true),project.subprojects_show=true" @drop="changeProjectItem('wait')" @dragover='allowDrop($event)' draggable='false'>
                        <div class="tag_item">
                            <img src="/image/clipboard-regular_hover.png">
                            <p>待排程</p>
                        </div>
                    </li>
                    <li v-else-if="(user_status.ud_admin || user_auth.pt_admin) && project.sub_nav != 'wait'" v-bind:class="{ 'current': project.sub_nav == 'wait'}" @click="project.sub_nav = 'wait',closeAllDropdownMenu(),closeProjectInput(),showAllSubprojectsOrNot(true),project.subprojects_show=true" onmouseover="$(this).find('img').attr('src','/image/clipboard-regular_hover.png')" onmouseout="$(this).find('img').attr('src','/image/clipboard-regular.png')" @drop="changeProjectItem('wait')" @dragover='allowDrop($event)' draggable='false'>
                        <div class="tag_item">
                            <img src="/image/clipboard-regular.png">
                            <p>待排程</p>
                        </div>
                    </li>
                    <li v-if="project.sub_nav == 'finish'" v-bind:class="{ 'current': project.sub_nav == 'finish'}" @click="project.sub_nav = 'finish',closeAllDropdownMenu(),closeProjectInput(),showAllSubprojectsOrNot(true),project.subprojects_show=true">
                        <div class="tag_item">
                            <img src="/image/clipboard-check-solid_hover.png">
                            <p>完成任務</p>
                        </div>
                    </li>
                    <li v-else v-bind:class="{ 'current': project.sub_nav == 'finish'}" @click="project.sub_nav = 'finish',closeAllDropdownMenu(),closeProjectInput(),showAllSubprojectsOrNot(true),project.subprojects_show=true" onmouseover="$(this).find('img').attr('src','/image/clipboard-check-solid_hover.png')" onmouseout="$(this).find('img').attr('src','/image/clipboard-check-solid.png')">
                        <div class="tag_item">
                            <img src="/image/clipboard-check-solid.png">
                            <p>完成任務</p>
                        </div>
                    </li>
                    <li v-if="tag.ug_id == project.project_ug_id" v-for="tag in project.user_tags" v-bind:class="{ 'current': project.sub_nav == tag.tm_id}" @click="project.sub_nav = tag.tm_id,closeAllDropdownMenu(),closeProjectInput(),showAllSubprojectsOrNot(true),project.subprojects_show=true" @drop='drop(tag.tm_id)' @dragover='allowDrop($event)' draggable='false' v-rightMenu = "user_status.ud_admin || user_auth.pt_admin ?project.menudata : false" @mouseup.right="updateTagData(tag.tm_id,tag.tm_url,tag.tm_name)">
                        <div class="tag_item">
                            <img :src="tag.tm_url" alt="" draggable='false'>
                            <p draggable='false'>{{tag.tm_name}}</p>
                        </div>
                    </li>
                    <li v-if="user_status.ud_admin || user_auth.pt_admin" class="add_tag" @click="project.create_tag_open = true,closeAllDropdownMenu(),closeProjectInput(),project.tag_type = 'create',showAllSubprojectsOrNot(true),project.subprojects_show=true">
                        <div class="tag_item">
                            <i class="fas fa-folder-plus"></i>
                            <p>自訂標籤</p>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 專案任務列表頁 -->
            <div class="right">
                <div class="right_wrap">
                    <div class="header_wrap">
                        <div class="project_status" v-if="project.sub_nav == 'all'">
                            <div class="project_title dropdown_item" @click="openDropdownMenu('project','show',2,$event)">
                                <span class="dropdown_item">{{project.project_status}}</span><i v-if="checkToOpenDropDown('project','show',2)" class="fas fa-chevron-up dropdown_item"></i><i v-else="checkToOpenDropDown('project','show',2)" class="fas fa-chevron-down dropdown_item"></i>
                            </div>
                            <ul v-if="checkToOpenDropDown('project','show',2)" class="project_content dd_wrap">
                                <li class="dd_wrap" v-bind:class="{ 'current': project.project_status == '全部任務'}" @click="project.project_status = '全部任務',closeDateTimePicker(true)">全部任務</li>
                                <li class="dd_wrap" v-bind:class="{ 'current': project.project_status == '最愛'}" @click="project.project_status = '最愛',closeDateTimePicker(true)">最愛</li>
                                <li class="dd_wrap" v-bind:class="{ 'current': project.project_status == '待排程'}" @click="project.project_status = '待排程',closeDateTimePicker(true)">待排程</li>
                                <li class="dd_wrap" v-bind:class="{ 'current': project.project_status == '待確認'}" @click="project.project_status = '待確認',closeDateTimePicker(true)">待確認</li>
                                <li class="dd_wrap" v-bind:class="{ 'current': project.project_status == '進行中'}" @click="project.project_status = '進行中',closeDateTimePicker(true)">進行中</li>
                            </ul>
                        </div>
                        <div class="btn_create" v-if="(user_status.ud_admin || user_auth.pt_admin) && project.sub_nav != 'finish'" @click="project.create_project_status ? project.create_project_status=false : project.create_project_status=true">新增任務</div>
                    </div>
                    <div class="create_project" v-if="project.create_project_status">
                        <input type="text" name="pt_name" placeholder="輸入新任務名稱"><i class="far fa-times-circle close" @click="project.create_project_status=false"></i><i class="far fa-check-circle check" @click="createProject(),project.create_project_status=false"></i>
                    </div>
                    <div class="container_wrap table">
                        <div class="head_wrap row">
                            <div class="head_text cell ellipsis">
                                <i class="fas fa-list-ul dropdown_item" @click="openDropdownMenu('list','show',1,$event)"></i>
                                <ul class="title_list dd_wrap" v-if="checkToOpenDropDown('list','show',1)">
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pmc_name" :checked="project.list_field_show_or_not.all.pmc_name" v-model="project.list_field_show_or_not.all.pmc_name"/>
                                            <label class="dd_wrap" for="pmc_name" >里程碑</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="prsc_name" :checked="project.list_field_show_or_not.all.prsc_name" v-model="project.list_field_show_or_not.all.prsc_name"/>
                                            <label class="dd_wrap" for="prsc_name" >需求類別</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="peic_name" :checked="project.list_field_show_or_not.all.peic_name" v-model="project.list_field_show_or_not.all.peic_name"/>
                                            <label class="dd_wrap" for="peic_name" >執行項目</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pst_requiredate" :checked="project.list_field_show_or_not.all.pst_requiredate" v-model="project.list_field_show_or_not.all.pst_requiredate"/>
                                            <label class="dd_wrap" for="pst_requiredate" >需求/確認日期</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pst_executiondate" :checked="project.list_field_show_or_not.all.pst_executiondate" v-model="project.list_field_show_or_not.all.pst_executiondate"/>
                                            <label class="dd_wrap" for="pst_executiondate" >執行日期</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pst_completiondate" :checked="project.list_field_show_or_not.all.pst_completiondate" v-model="project.list_field_show_or_not.all.pst_completiondate"/>
                                            <label class="dd_wrap" for="pst_completiondate" >完成日期</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="ud_name" :checked="project.list_field_show_or_not.all.ud_name" v-model="project.list_field_show_or_not.all.ud_name"/>
                                            <label class="dd_wrap" for="ud_name" >執行者</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="psc_name" :checked="project.list_field_show_or_not.all.psc_name" v-model="project.list_field_show_or_not.all.psc_name"/>
                                            <label class="dd_wrap" for="psc_name" >狀態</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="ppc_name" :checked="project.list_field_show_or_not.all.ppc_name" v-model="project.list_field_show_or_not.all.ppc_name"/>
                                            <label class="dd_wrap" for="ppc_name" >優先權</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pst_spendtime" :checked="project.list_field_show_or_not.all.pst_spendtime" v-model="project.list_field_show_or_not.all.pst_spendtime"/>
                                            <label class="dd_wrap" for="pst_spendtime" >時間</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pt_backup" :checked="project.list_field_show_or_not.all.pt_backup" v-model="project.list_field_show_or_not.all.pt_backup"/>
                                            <label class="dd_wrap" for="pt_backup" >備份</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="head_text cell star">
                            </div>
                            <div class="head_text cell pt_name">任務
                                <i v-if="!project.subprojects_show" @click="showAllSubprojectsOrNot(true),project.subprojects_show=true" class="fas fa-chevron-circle-down cursor"></i>
                                <i v-else @click="showAllSubprojectsOrNot(false),project.subprojects_show=false" class="fas fa-chevron-circle-up cursor"></i>
                            </div>
                            <div class="head_text cell pmc_name" v-if="project.list_field_show_or_not.all.pmc_name">里程碑</div>
                            <div class="head_text cell prsc_name" v-if="project.list_field_show_or_not.all.prsc_name">需求類別</div>
                            <div class="head_text cell peic_name" v-if="project.list_field_show_or_not.all.peic_name">執行項目</div>
                            <div class="head_text cell pst_requiredate" v-if="project.list_field_show_or_not.all.pst_requiredate">需求/確認日期</div>
                            <div class="head_text cell pst_executiondate" v-if="project.list_field_show_or_not.all.pst_executiondate">執行日期</div>
                            <div class="head_text cell pst_completiondate" v-if="project.list_field_show_or_not.all.pst_completiondate">完成日期</div>
                            <div class="head_text cell ud_name" v-if="project.list_field_show_or_not.all.ud_name">執行者</div>
                            <div class="head_text cell psc_name" v-if="project.list_field_show_or_not.all.psc_name">狀態</div>
                            <div class="head_text cell ppc_name" v-if="project.list_field_show_or_not.all.ppc_name">優先權</div>
                            <div class="head_text cell pst_spendtime" v-if="project.list_field_show_or_not.all.pst_spendtime">時間</div>
                            <div class="head_text cell pt_backup" v-if="project.list_field_show_or_not.all.pt_backup">備份</div>
                        </div>
                        <div v-for="pro in new_projects" class="content_wrap row_group" v-bind:class="'list'+pro.pt_id">
                            <div class="main_project row" @click="showSubProject($event,pro.pt_id)">
                                <div v-if="user_status.ud_admin || user_auth.pt_admin" class="content_text cell ellipsis cursor" draggable='true' @dragstart='drag("pt_id",pro.pt_id)' @dragend="dragend()">
                                    <i class="fas fa-ellipsis-v"></i>
                                </div>
                                <div v-else class="content_text cell ellipsis">
                                </div>
                                <div class="content_text cell star">
                                    <i class="fas fa-star" v-if="showFavoriteFirst(pro.pt_id)" @click="user_status.ud_admin || user_auth.pt_admin ?deleteFavorite(pro.pt_id) : false"></i>
                                    <i class="far fa-star" v-else @click="user_status.ud_admin || user_auth.pt_admin ? createFavorite(pro.pt_id) : false"></i>
                                </div>
                                <div class="content_text cell pt_name"><span class="overover cursor" @click="openSinglePage(user_status,'pt',pro.pt_id,1,pro.ug_id)" v-highlight="{keyword: search_condition.pro_content,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{pro.pt_name}}</span></div>
                                <div class="content_text cell pmc_name" v-bind:class="{'none':!project.list_field_show_or_not.all.pmc_name == true}" >
                                    <span v-if="pro.pmc_name">{{pro.pmc_name}}</span>
                                    <span v-else>-</span>
                                </div>
                                <div class="content_text cell prsc_name" v-bind:class="{'none':!project.list_field_show_or_not.all.prsc_name == true}">
                                    <span v-if="pro.prsc_name">{{pro.prsc_name}}</span>
                                    <span v-else>-</span>
                                </div>
                                <div class="content_text cell peic_name" v-bind:class="{'none':!project.list_field_show_or_not.all.peic_name == true}"><span>-</span></div>
                                <div class="content_text cell pst_requiredate" v-bind:class="{'none':!project.list_field_show_or_not.all.pst_requiredate == true,'cursor':user_status.ud_admin || user_auth.pt_admin,'dropdown_item':user_status.ud_admin || user_auth.pt_admin}" @click="user_status.ud_admin || user_auth.pt_admin ? openDropdownMenu('pt_requiredate','pt_id',pro.pt_id,$event) : false">
                                    <span class="dropdown_item" v-if="pro.pt_requiredate">{{pro.pt_requiredate}}</span>
                                    <span class="dropdown_item" v-else>-</span>
                                    <datetimepicker v-if="checkToOpenDropDown('pt_requiredate','pt_id',pro.pt_id)" :id="pro.pt_id" type="pt_id" :date="pro.pt_requiredate" :position="dropdown.position" @get-close="closeDateTimePicker" @get-newdate="changeRequireDate"></datetimepicker>
                                </div>
                                <div class="content_text cell pst_executiondate" v-bind:class="{'none':!project.list_field_show_or_not.all.pst_executiondate == true}"><span>-</span></div>
                                <div class="content_text cell pst_completiondate" v-bind:class="{'none':!project.list_field_show_or_not.all.pst_completiondate == true}"><span>-</span></div>
                                <div class="content_text cell ud_name" v-bind:class="{'none':!project.list_field_show_or_not.all.ud_name == true}"><span>-</span></div>
                                <div class="content_text cell psc_name" v-bind:class="{'none':!project.list_field_show_or_not.all.psc_name == true}"><p class="color1">-</p></div>
                                <div class="content_text cell ppc_name" v-bind:class="{'none':!project.list_field_show_or_not.all.ppc_name == true}">
                                    <p v-if="pro.ppc_name" v-bind:class="{'red':pro.ppc_id == 3}">{{pro.ppc_name}}</p>
                                    <span v-else>-</span>
                                </div>
                                <div class="content_text cell pst_spendtime" v-bind:class="{'none':!project.list_field_show_or_not.all.pst_spendtime == true}"><span>-</span></div>
                                <div class="content_text cell pt_backup" v-bind:class="{'none':!project.list_field_show_or_not.all.pt_backup == true}">
                                    <i v-if="pro.pt_backup == 0" class="far fa-square icon_backup"></i>
                                    <i v-else-if="pro.pt_backup == 1" class="fas fa-check-square icon_backup"></i>
                                </div>
                            </div>
                            <div v-for="sub in pro.sub_projects" class="sub_project row sub_item"
                                draggable='true'
                                @dragstart='user_status.ud_admin || user_auth.pt_admin ? dragToChangeProjectSort("start",pro.pt_id,sub.pst_id) : false'
                                @dragend='user_status.ud_admin || user_auth.pt_admin ? dragToChangeProjectSort("end",pro.pt_id,sub.pst_id) : false'
                                @drop='user_status.ud_admin || user_auth.pt_admin ? dragToChangeProjectSort("drop",pro.pt_id,sub.pst_id) : false'
                                @dragover='user_status.ud_admin || user_auth.pt_admin ? allowDrop($event) : false'
                                @dragenter="comingsoon(sub.pst_id)"
                                v-bind:class="{'changeColor':project.drag_pt_id == pro.pt_id && project.drag_over_pst_id == sub.pst_id,'dropTarget':project.drag_pt_id == pro.pt_id && project.drag_pst_id == sub.pst_id}">
                                <div v-if="user_status.ud_admin || user_auth.pt_admin" class="content_text cell ellipsis cursor">
                                    <i class="fas fa-sort"></i>
                                </div>
                                <div v-else class="content_text cell ellipsis">
                                </div>
                                <div class="content_text cell star">
                                </div>
                                <div class="content_text cell pt_name"><span class="overover" @click="user_status.ud_admin || user_auth.pt_admin || user_status.ud_id == sub.ud_id ? openSinglePage(user_status,'pst',sub.pst_id,1,pro.ug_id) : false" v-bind:class="{'cursor':user_status.ud_admin || user_auth.pt_admin || user_status.ud_id == sub.ud_id}" v-highlight="{keyword: search_condition.pro_content,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{sub.pst_name}}</span></div>
                                <div class="content_text cell pmc_name" v-bind:class="{'none':!project.list_field_show_or_not.all.pmc_name == true}">
                                    <span v-if="pro.pmc_name">{{pro.pmc_name}}</span>
                                    <span v-else>-</span>
                                </div>
                                <div class="content_text cell prsc_name" v-bind:class="{'none':!project.list_field_show_or_not.all.prsc_name == true}">
                                    <span v-if="pro.prsc_name">{{pro.prsc_name}}</span>
                                    <span v-else>-</span>
                                </div>
                                <div class="content_text cell peic_name dropdown_item" v-bind:class="{'none':!project.list_field_show_or_not.all.peic_name == true,'cursor':user_status.ud_admin || user_auth.pt_admin}" @click="user_status.ud_admin || user_auth.pt_admin ? openDropdownMenu('peic_name','pst_id',sub.pst_id,$event) : false">
                                    <span class="dropdown_item" v-if="sub.peic_name">{{sub.peic_name}}</span>
                                    <span class="dropdown_item" v-else>-</span>
                                    <div class="drop_down_wrap dd_wrap" v-bind:class="{'top':top_or_bottom,'bottom':!top_or_bottom}" v-if="checkToOpenDropDown('peic_name','pst_id',sub.pst_id)">
                                        <ul class="infor_ul dd_wrap">
                                            <li class="infor_li dd_wrap" v-for="item in project.executeitem_cate" @click="changeExecuteItem(sub.pst_id,item.peic_id)" v-bind:class="{'current':sub.peic_id == item.peic_id}">{{item.peic_name}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="content_text cell pst_requiredate" v-bind:class="{'none':!project.list_field_show_or_not.all.pst_requiredate == true,'cursor':user_status.ud_admin || user_auth.pt_admin,'dropdown_item':user_status.ud_admin || user_auth.pt_admin}" @click="user_status.ud_admin || user_auth.pt_admin ? openDropdownMenu('pst_requiredate','pst_id',sub.pst_id,$event) : false">
                                    <span class="dropdown_item" v-if="sub.pst_requiredate">{{sub.pst_requiredate}}</span>
                                    <span class="dropdown_item" v-else>-</span>
                                    <datetimepicker v-if="checkToOpenDropDown('pst_requiredate','pst_id',sub.pst_id)" :id="sub.pst_id" type="pst_id" :date="sub.pst_requiredate" :position="dropdown.position" @get-close="closeDateTimePicker" @get-newdate="changeRequireDate"></datetimepicker>
                                </div>
                                <div class="content_text cell pst_executiondate" v-bind:class="{'none':!project.list_field_show_or_not.all.pst_executiondate == true,'cursor':user_status.ud_admin || user_auth.pt_admin,'dropdown_item':user_status.ud_admin || user_auth.pt_admin}" @click="user_status.ud_admin || user_auth.pt_admin ? openDropdownMenu('pst_executiondate','pst_id',sub.pst_id,$event) : false">
                                    <span class="dropdown_item" v-if="sub.pst_executiondate">{{sub.pst_executiondate}}</span>
                                    <span class="dropdown_item" v-else>-</span>
                                    <datetimepicker v-if="checkToOpenDropDown('pst_executiondate','pst_id',sub.pst_id)" :id="sub.pst_id" type="pst_id" :date="sub.pst_executiondate" :position="dropdown.position" @get-close="closeDateTimePicker" @get-newdate="changeExecutiondate"></datetimepicker>
                                </div>
                                <div class="content_text cell pst_completiondate" v-bind:class="{'none':!project.list_field_show_or_not.all.pst_completiondate == true,'cursor':user_status.ud_admin || user_auth.pt_admin,'dropdown_item':user_status.ud_admin || user_auth.pt_admin}" @click="user_status.ud_admin || user_auth.pt_admin ? openDropdownMenu('pst_completiondate','pst_id',sub.pst_id,$event) : false">
                                    <span class="dropdown_item" v-if="sub.pst_completiondate">{{sub.pst_completiondate}}</span>
                                    <span class="dropdown_item" v-else>-</span>
                                    <datetimepicker v-if="checkToOpenDropDown('pst_completiondate','pst_id',sub.pst_id)" :id="sub.pst_id" type="pst_id" :date="sub.pst_completiondate" :position="dropdown.position" @get-close="closeDateTimePicker" @get-newdate="changeCompletiondate"></datetimepicker>
                                </div>
                                <div class="content_text cell ud_name" v-bind:class="{'none':!project.list_field_show_or_not.all.ud_name == true,'cursor':user_status.ud_admin || user_auth.pt_admin,'dropdown_item':user_status.ud_admin || user_auth.pt_admin}" @click="user_status.ud_admin || user_auth.pt_admin ? openDropdownMenu('ud_name','pst_id',sub.pst_id,$event):false">
                                    <span class="dropdown_item" v-if="sub.ud_name">{{sub.ud_name}}</span>
                                    <span class="dropdown_item" v-else>-</span>
                                    <div class="drop_down_wrap user dd_wrap" v-bind:class="{'top':top_or_bottom,'bottom':!top_or_bottom}" v-if="checkToOpenDropDown('ud_name','pst_id',sub.pst_id)">
                                        <ul class="infor_ul dd_wrap">
                                            <li class="infor_li dd_wrap" v-for="user in usercate_for_group" @click="changeUser(sub.pst_id,user.ud_id)" v-bind:class="{'current':sub.ud_id == user.ud_id}">
                                                <img class="dd_wrap" v-if="user.ud_icon" :src="user.ud_icon" alt="">
                                                <img class="dd_wrap" v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=" alt="">
                                                {{user.ud_name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="content_text cell psc_name" v-bind:class="{'none':!project.list_field_show_or_not.all.psc_name == true,'cursor':user_status.ud_admin || user_auth.pt_admin,'dropdown_item':user_status.ud_admin || user_auth.pt_admin}" @click="user_status.ud_admin || user_auth.pt_admin ? openDropdownMenu('psc_name','pst_id',sub.pst_id,$event):false">
                                    <p v-if="sub.psc_name" class="dropdown_item" v-bind:class="{'color1':sub.psc_id == 1,'color2':sub.psc_id == 2,'color3':sub.psc_id == 3,'color4':sub.psc_id == 4 || sub.psc_id == 5,'color5':sub.psc_id == 6||sub.psc_id == 7||sub.psc_id == 8,'color6':sub.psc_id == 9}">{{sub.psc_name}}</p>
                                    <p v-else class="color1 dropdown_item">-</p>
                                    <div class="drop_down_wrap status dd_wrap" v-bind:class="{'top':top_or_bottom,'bottom':!top_or_bottom}" v-if="checkToOpenDropDown('psc_name','pst_id',sub.pst_id)">
                                        <ul class="infor_ul dd_wrap">
                                            <li class="infor_li dd_wrap" v-for="status in project.status_cate" @click="changeStatus(sub.pst_id,status.psc_id)" v-bind:class="{'current':sub.psc_id == status.psc_id}"><span class="dd_wrap" v-bind:class="{'color1':status.psc_id == 1,'color2':status.psc_id == 2,'color3':status.psc_id == 3,'color4':status.psc_id == 4 || status.psc_id == 5,'color5':status.psc_id == 6||status.psc_id == 7||status.psc_id == 8,'color6':status.psc_id == 9}"></span>{{status.psc_name}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="content_text cell ppc_name" v-bind:class="{'none':!project.list_field_show_or_not.all.ppc_name == true}">
                                    <p v-if="sub.ppc_name" v-bind:class="{'red':sub.ppc_id == 3}">{{sub.ppc_name}}</p>
                                    <span v-else>-</span>
                                </div>
                                <div class="content_text cell pst_spendtime" v-bind:class="{'none':!project.list_field_show_or_not.all.pst_spendtime == true}">
                                    <span v-if="sub.pst_spendtime">{{sub.pst_spendtime}}h</span>
                                    <span v-else>-</span>
                                </div>
                                <div class="content_text cell pt_backup" v-bind:class="{'none':!project.list_field_show_or_not.all.pt_backup == true}"></div>
                            </div>
                            <div class="row add_sub_project">
                                <div class="cell"></div>
                                <div class="cell margin_a_little"></div>
                                <div class="cell add_sub_item sub_item" v-if="(user_status.ud_admin || user_auth.pt_admin)">
                                    <span v-if="!project.create_subproject_status || project.open_project_id != pro.pt_id" @click="project.create_subproject_status = true,project.open_project_id = pro.pt_id">添加子任務</span>
                                    <div class="create_subproject" v-if="project.create_subproject_status && project.open_project_id == pro.pt_id">
                                        <input type="text" name="pst_name" placeholder="輸入新子任務名稱"><i class="far fa-times-circle close" @click="project.create_subproject_status=false"></i><i class="far fa-check-circle check" @click="project.create_subproject_status = false,createSubProject(pro.pt_id)"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="new_projects.length == 0 && search_condition.pro_content != ''" class="found_nothing_wrap">查無任務</div>
                    <div v-else-if="new_projects.length == 0 && search_condition.pro_content == ''" class="found_nothing_wrap">暫無任務</div>
                </div>
            </div>
        </div>
        <div id="page-container" class="announcement" v-if="url_show_block == 'announcement-list'">
            <div class="left">
                <ul class="tags_wrap">
                    <li v-bind:class="{ 'current': announcement.sub_nav == 0}" 
                        v-on:click="announcement.sub_nav = 0,closeAll()"
                        v-on:mouseover="announcement.tabHover = 0" 
                        v-on:mouseleave="announcement.tabHover = -1">
                        <div class="tag_item">
                            <img v-if="announcement.sub_nav == 0 || announcement.tabHover == 0" src="/image/coffee-solid_hover.png">
                            <img v-else src="/image/coffee-solid.png">
                            <p>部級公告</p>
                        </div>
                    </li>
                    <li v-for="group in user_group"
                        v-bind:class="{ 'current': announcement.sub_nav == group.ug_id}" 
                        v-on:click="announcement.sub_nav = group.ug_id,closeAll()" 
                        v-on:mouseover="announcement.tabHover = group.ug_id" 
                        v-on:mouseleave="announcement.tabHover = -1">
                        <div class="tag_item">
                            <img v-if="announcement.sub_nav == group.ug_id || announcement.tabHover == group.ug_id" src="/image/coffee-solid_hover.png">
                            <img v-else src="/image/coffee-solid.png">
                            <p>{{group.ug_name_forshort}} 公告</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="right ann">
                <div class="right_wrap">
                    <div class="header_wrap">
                        <div class="btn_create dd_wrap" v-if="user_status.ud_admin || user_auth.ai_admin" @click="announcement.create_ann_open ? announcement.create_ann_open=false : announcement.create_ann_open=true">新增公告</div>
                    </div>
                    <div class="create_project dd_wrap" v-if="announcement.create_ann_open">
                        <input type="text" class="dd_wrap" name="ai_title" placeholder="輸入新公告標題"><i class="far fa-times-circle close dd_wrap" @click="announcement.create_ann_open=false"></i><i class="far fa-check-circle check dd_wrap" @click="createAnn()"></i>
                    </div>
                    <div class="container_wrap table" v-if="new_data.length > 0">
                        <div class="head_wrap row">
                            <div class="head_text cell star">
                            </div>
                            <div class="head_text cell ai_title"></div>
                            <div class="head_text cell ai_expirydate">到期日</div>
                            <div class="head_text cell ai_reminderdate">提醒</div>
                            <div class="head_text cell btn_delete" v-if="user_status.ud_admin || user_auth.ai_admin"></div>
                        </div>
                        <div v-for="ann in new_data" class="content_wrap row_group">
                            <div class="main_project row">
                                <div class="content_text cell star">
                                    <i v-if="ann.ai_topping == 1" class="fas fa-star" v-bind:class="{'cursor':user_status.ud_admin || user_auth.ai_admin}" @click="user_status.ud_admin || user_auth.ai_admin ? changeAnnTopping(ann.ai_id,false) : false"></i>
                                    <i v-else class="far fa-star" v-bind:class="{'cursor':user_status.ud_admin || user_auth.ai_admin}" @click="user_status.ud_admin || user_auth.ai_admin ? changeAnnTopping(ann.ai_id,true) : false"></i>
                                </div>
                                <div class="content_text cell ai_title"><span @click="openSinglePage(user_status,'ai',ann.ai_id,3)" v-highlight="{keyword: search_condition.ann_content,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{ann.ai_title}}</span></div>
                                <div class="content_text cell ai_expirydate" v-if="ann.ai_expirydate">{{ann.ai_expirydate}}</div>
                                <div class="content_text cell ai_expirydate" v-else>-</div>
                                <div class="content_text cell ai_reminderdate" v-if="ann.url_reminderdate">{{removeSecond(ann.url_reminderdate)}}</div>
                                <div class="content_text cell ai_reminderdate" v-else>-</div>
                                <div class="content_text cell btn_delete" v-if="user_status.ud_admin || user_auth.ai_admin">
                                    <i class="far fa-trash-alt" @click="openDeletePromptBox(ann.ai_id,1)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="new_data.length == 0 && search_condition.ann_content != '' " class="found_nothing_wrap">查無公告</div>
                    <div v-else-if="new_data.length == 0 && search_condition.ann_content == ''" class="found_nothing_wrap">暫無公告</div>
                </div>
            </div>
        </div>
        <div id="page-container" class="property" v-if="url_show_block == 'property-list'">
            <div class="right asset">
                <div class="right_wrap">
                    <div class="header_wrap">
                        <div class="account_title">資產管理</div>
                        <div class="btn_create dd_wrap" v-if="user_status.ud_admin || user_auth.pm_admin" @click="property.create_property_open ? closeAll() : property.create_property_open=true">新增資產</div>
                    </div>
                    <div class="container_wrap table">
                        <div class="head_wrap row">
                            <div class="head_text cell ellipsis">
                                <i class="fas fa-list-ul dropdown_item cursor" @click="openDropdownMenu('list','show',1,$event)"></i>
                                <ul class="title_list dd_wrap" v-if="checkToOpenDropDown('list','show',1)">
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="ud_name" :checked="property.property_field_show_or_not.ud_name" v-model="property.property_field_show_or_not.ud_name"/>
                                            <label class="dd_wrap" for="ud_name" >人員</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pm_host" :checked="property.property_field_show_or_not.pm_host" v-model="property.property_field_show_or_not.pm_host"/>
                                            <label class="dd_wrap" for="pm_host" >主機</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pm_screenone" :checked="property.property_field_show_or_not.pm_screenone" v-model="property.property_field_show_or_not.pm_screenone"/>
                                            <label class="dd_wrap" for="pm_screenone" >螢幕1</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pm_screentwo" :checked="property.property_field_show_or_not.pm_screentwo" v-model="property.property_field_show_or_not.pm_screentwo"/>
                                            <label class="dd_wrap" for="pm_screentwo" >螢幕2</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pm_telephone" :checked="property.property_field_show_or_not.pm_telephone" v-model="property.property_field_show_or_not.pm_telephone"/>
                                            <label class="dd_wrap" for="pm_telephone" >話機</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pm_canvas" :checked="property.property_field_show_or_not.pm_canvas" v-model="property.property_field_show_or_not.pm_canvas"/>
                                            <label class="dd_wrap" for="pm_canvas" >繪圖板</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pm_other" :checked="property.property_field_show_or_not.pm_other" v-model="property.property_field_show_or_not.pm_other"/>
                                            <label class="dd_wrap" for="pm_other" >其他</label>
                                        </div>
                                    </li>
                                    <li class="title_item dd_wrap">
                                        <div class="list-item dd_wrap">
                                            <input class="dd_wrap" type="checkbox" id="pm_adobe" :checked="property.property_field_show_or_not.pm_adobe" v-model="property.property_field_show_or_not.pm_adobe"/>
                                            <label class="dd_wrap" for="pm_adobe" >adobe</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="head_text cell ud_name" v-if="property.property_field_show_or_not.ud_name">人員
                            </div>
                            <div class="head_text cell pm_host" v-if="property.property_field_show_or_not.pm_host">主機</div>
                            <div class="head_text cell pm_screenone" v-if="property.property_field_show_or_not.pm_screenone">螢幕1</div>
                            <div class="head_text cell pm_screentwo" v-if="property.property_field_show_or_not.pm_screentwo">螢幕2</div>
                            <div class="head_text cell pm_telephone" v-if="property.property_field_show_or_not.pm_telephone">話機</div>
                            <div class="head_text cell pm_canvas" v-if="property.property_field_show_or_not.pm_canvas">繪圖板</div>
                            <div class="head_text cell pm_other" v-if="property.property_field_show_or_not.pm_other">其他</div>
                            <div class="head_text cell pm_adobe" v-if="property.property_field_show_or_not.pm_adobe">adobe</div>
                            <div class="head_text cell btn_delete" v-if="user_status.ud_admin || user_auth.pm_admin"></div>
                        </div>
                        <div class="content_wrap row_group dd_wrap new_asset" v-if="property.create_property_open">
                            <div class="sub_project row dd_wrap">
                                <div class="content_text cell ellipsis dd_wrap"></div>
                                <div class="content_text cell ud_name dropdown_item cursor" @click="openDropdownMenu('ud_name','pm_id','create',$event)">
                                    <span class="dropdown_item" v-if="property.create_property_data.ud_name">{{property.create_property_data.ud_name}}</span>
                                    <span class="dropdown_item" v-else>請選擇</span>
                                    <div class="drop_down_wrap user dd_wrap" v-bind:class="{'top':top_or_bottom,'bottom':!top_or_bottom}" v-if="checkToOpenDropDown('ud_name','pm_id','create')">
                                        <ul class="infor_ul dd_wrap">
                                            <li class="infor_li dd_wrap" v-for="user in user_cate" @click="property.create_property_data.ud_name = user.ud_name,property.create_property_data.ud_id = user.ud_id,closeAllDropdownMenu()" v-bind:class="{'current':property.create_property_data.ud_id == user.ud_id}">
                                                <img class="dd_wrap" v-if="user.ud_icon" :src="user.ud_icon" alt="">
                                                <img class="dd_wrap" v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=" alt="">
                                                {{user.ud_name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="content_text cell pm_host dd_wrap">
                                    <input type="text" name="pm_host" class="dd_wrap" placeholder="待填入">
                                </div>
                                <div class="content_text cell pm_screenone dd_wrap">
                                    <input type="text" name="pm_screenone" class="dd_wrap" placeholder="待填入">
                                </div>
                                <div class="content_text cell pm_screentwo dd_wrap">
                                    <input type="text" name="pm_screentwo" class="dd_wrap" placeholder="待填入">
                                </div>
                                <div class="content_text cell pm_telephone dd_wrap">
                                    <input type="text" name="pm_telephone" class="dd_wrap" placeholder="待填入">
                                </div>
                                <div class="content_text cell pm_canvas dd_wrap">
                                    <input type="text" name="pm_canvas" class="dd_wrap" placeholder="待填入">
                                </div>
                                <div class="content_text cell pm_other dd_wrap">
                                    <input type="text" name="pm_other" class="dd_wrap" placeholder="待填入">
                                </div>
                                <div class="content_text cell pm_adobe dd_wrap">
                                    <input type="text" name="pm_adobe" class="dd_wrap" placeholder="待填入">
                                </div>
                                <div class="content_text cell btn_create dd_wrap">
                                    <i class="far fa-times-circle close dd_wrap" @click="closeAll()"></i>
                                    <i class="far fa-check-circle check dd_wrap" @click="createProperty()"></i>
                                </div>
                            </div>
                        </div>
                        <div v-for="pro in new_data" class="content_wrap row_group" v-bind:class="'list'+pro.pm_id">
                            <div class="sub_project row">
                                <div class="content_text cell ellipsis"></div>
                                <div class="content_text cell ud_name dropdown_item" @click="user_status.ud_admin || user_auth.pm_admin ? openDropdownMenu('ud_name','pm_id',pro.pm_id,$event):false" v-bind:class="{'none':!property.property_field_show_or_not.ud_name == true,'cursor':user_status.ud_admin || user_auth.pm_admin,'dropdown_item':user_status.ud_admin || user_auth.pm_admin}">
                                    <span class="overover dropdown_item" v-bind:class="{'cursor':user_status.ud_admin || user_auth.pm_admin}" v-highlight="{keyword: search_condition.property_content,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{pro.ud_name}}</span>
                                    <div class="drop_down_wrap user dd_wrap" v-bind:class="{'top':top_or_bottom,'bottom':!top_or_bottom}" v-if="checkToOpenDropDown('ud_name','pm_id',pro.pm_id)">
                                        <ul class="infor_ul dd_wrap">
                                            <li class="infor_li dd_wrap" v-for="user in user_cate" @click="changePropertyUser(pro.pm_id,user.ud_id)" v-bind:class="{'current':pro.ud_id == user.ud_id}">
                                                <img class="dd_wrap" v-if="user.ud_icon" :src="user.ud_icon" alt="">
                                                <img class="dd_wrap" v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=" alt="">
                                                {{user.ud_name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="content_text cell pm_host dd_wrap" v-bind:class="{'none':!property.property_field_show_or_not.pm_host == true}" @click="user_status.ud_admin || user_auth.pm_admin ? showThisFieldInput('pm_host',pro.pm_id) : false">
                                    <span class="dd_wrap" v-if="pro.pm_host">{{pro.pm_host}}</span>
                                    <span class="dd_wrap" v-else>-</span>
                                    <input class="none dd_wrap" type="text" name="pm_host" :value="pro.pm_host" @change="changePropertyThisField('pm_host',pro.pm_id)">
                                </div>
                                <div class="content_text cell pm_screenone dd_wrap" v-bind:class="{'none':!property.property_field_show_or_not.pm_screenone == true}" @click="user_status.ud_admin || user_auth.pm_admin ? showThisFieldInput('pm_screenone',pro.pm_id) : false">
                                    <span class="dd_wrap" v-if="pro.pm_screenone">{{pro.pm_screenone}}</span>
                                    <span class="dd_wrap" v-else>-</span>
                                    <input class="none dd_wrap" type="text" name="pm_screenone" :value="pro.pm_screenone" @change="changePropertyThisField('pm_screenone',pro.pm_id)">
                                </div>
                                <div class="content_text cell pm_screentwo dd_wrap" v-bind:class="{'none':!property.property_field_show_or_not.pm_screentwo == true}" @click="user_status.ud_admin || user_auth.pm_admin ? showThisFieldInput('pm_screentwo',pro.pm_id) : false">
                                    <span class="dd_wrap" v-if="pro.pm_screentwo">{{pro.pm_screentwo}}</span>
                                    <span class="dd_wrap" v-else>-</span>
                                    <input class="none dd_wrap" type="text" name="pm_screentwo" :value="pro.pm_screentwo" @change="changePropertyThisField('pm_screentwo',pro.pm_id)">
                                </div>
                                <div class="content_text cell pm_telephone dd_wrap" v-bind:class="{'none':!property.property_field_show_or_not.pm_telephone == true}" @click="user_status.ud_admin || user_auth.pm_admin ? showThisFieldInput('pm_telephone',pro.pm_id) : false">
                                    <span class="dd_wrap" v-if="pro.pm_telephone">{{pro.pm_telephone}}</span>
                                    <span class="dd_wrap" v-else>-</span>
                                    <input class="none dd_wrap" type="text" name="pm_telephone" :value="pro.pm_telephone" @change="changePropertyThisField('pm_telephone',pro.pm_id)">
                                </div>
                                <div class="content_text cell pm_canvas dd_wrap" v-bind:class="{'none':!property.property_field_show_or_not.pm_canvas == true}" @click="user_status.ud_admin || user_auth.pm_admin ? showThisFieldInput('pm_canvas',pro.pm_id) : false">
                                    <span class="dd_wrap" v-if="pro.pm_canvas">{{pro.pm_canvas}}</span>
                                    <span class="dd_wrap" v-else>-</span>
                                    <input class="none dd_wrap" type="text" name="pm_canvas" :value="pro.pm_canvas" @change="changePropertyThisField('pm_canvas',pro.pm_id)">
                                </div>
                                <div class="content_text cell pm_other dd_wrap" v-bind:class="{'none':!property.property_field_show_or_not.pm_other == true}" @click="user_status.ud_admin || user_auth.pm_admin ? showThisFieldInput('pm_other',pro.pm_id) : false">
                                    <span class="dd_wrap" v-if="pro.pm_other">{{pro.pm_other}}</span>
                                    <span class="dd_wrap" v-else>-</span>
                                    <input class="none dd_wrap" type="text" name="pm_other" :value="pro.pm_other" @change="changePropertyThisField('pm_other',pro.pm_id)">
                                </div>
                                <div class="content_text cell pm_adobe dd_wrap" v-bind:class="{'none':!property.property_field_show_or_not.pm_adobe == true}" @click="user_status.ud_admin || user_auth.pm_admin ? showThisFieldInput('pm_adobe',pro.pm_id) : false">
                                    <span class="dd_wrap" v-if="pro.pm_adobe">{{pro.pm_adobe}}</span>
                                    <span class="dd_wrap" v-else>-</span>
                                    <input class="none dd_wrap" type="text" name="pm_adobe" :value="pro.pm_adobe" @change="changePropertyThisField('pm_adobe',pro.pm_id)">
                                </div>
                                <div class="content_text cell btn_delete" v-if="user_status.ud_admin || user_auth.pm_admin">
                                    <i class="far fa-trash-alt" @click="openDeletePromptBox(pro.pm_id,6)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="new_data.length == 0 && search_condition.property_content != '' " class="found_nothing_wrap">查無資產</div>
                    <div v-else-if="new_data.length == 0 && search_condition.property_content == ''" class="found_nothing_wrap">暫無資產</div>
                </div>
            </div>
        </div>
        <div id="page-container" class="book" v-if="url_show_block == 'book-list'">
            <div class="right book">
                <div class="book_wrap">
                    <div class="header_wrap">
                        <div class="header_top">
                            <div class="book_sort cursor dropdown_item" @click="book.book_infor ? openDropdownMenu('bs_name','bs_id',book.book_infor.bs_id,$event) : false">
                                <span class="dropdown_item" v-if="book.book_infor && book.book_infor.bs_name">{{book.book_infor.bs_name}}</span>
                                <span class="dropdown_item" v-else>請先新增書籍</span>
                                <i class="fas fa-chevron-up dropdown_item" v-if="book.book_infor && checkToOpenDropDown('bs_name','bs_id',book.book_infor.bs_id)"></i>
                                <i class="fas fa-chevron-down dropdown_item" v-else></i>
                                <div class="drop_down_wrap dd_wrap" v-if="book.book_infor && checkToOpenDropDown('bs_name','bs_id',book.book_infor.bs_id)">
                                    <ul class="infor_ul dd_wrap">
                                        <li v-if="book.data_booksorts.length < 1" class="infor_li dd_wrap">請先新增書籍</li>
                                        <li class="infor_li dd_wrap" v-for="sort in book.data_booksorts" @click="changeBookSort(sort.bs_id,sort.bs_name)" v-bind:class="{'current':book.book_infor.bs_id == sort.bs_id}">{{sort.bs_name}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="book_name cursor dropdown_item" @click="book.book_infor ? openDropdownMenu('bi_name','bi_id',book.book_infor.bi_id,$event) : false">
                                <span class="dropdown_item" v-if="book.book_infor && book.book_infor.bi_name">{{book.book_infor.bi_name}}</span>
                                <span class="dropdown_item" v-else-if="books.length < 1">請先新增書籍</span>
                                <span class="dropdown_item" v-else>請選擇</span>
                                <i v-if="book.book_infor && checkToOpenDropDown('bi_name','bi_id',book.book_infor.bi_id)" class="fas fa-chevron-up dropdown_item"></i>
                                <i v-else class="fas fa-chevron-down dropdown_item"></i>
                                <div class="drop_down_wrap dd_wrap" v-if="book.book_infor && checkToOpenDropDown('bi_name','bi_id',book.book_infor.bi_id)">
                                    <ul class="infor_ul dd_wrap">
                                        <li v-if="books.length < 1" class="infor_li dd_wrap">此分類無書籍</li>
                                        <li class="infor_li dd_wrap" v-for="infor in books" @click="selectThisBook(infor.bi_id,infor.bi_name)" v-bind:class="{'current':book.book_infor && book.book_infor.bi_id == infor.bi_id}">{{infor.bi_name}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="btn_create dd_wrap" v-if="user_status.ud_admin || user_auth.bi_admin" @click="openSinglePage(user_status,'bi',null,6)">新增書籍</div>
                            <div class="btn_modify dd_wrap" v-if="book.book_infor && (user_status.ud_admin || user_auth.bi_admin) && book.book_infor.bi_id" @click="openSinglePage(user_status,'bi',book.book_infor.bi_id,6)">修改書籍</div>
                        </div>
                        <div class="header_bottom">
                            <div class="image_wrap">
                                <img v-if="book.book_infor && book.book_infor.bi_fileurl" :src="book.book_infor.bi_fileurl" alt="書籍圖片">
                                <img v-else src="image/book.png" alt="書籍圖片">
                            </div>
                            <p class="title" v-if="book.book_infor && book.book_infor.bi_name">{{book.book_infor.bi_name}}</p>
                            <p class="date" v-if="book.book_infor && book.book_infor.bi_purchasedate">進貨日期： {{book.book_infor.bi_purchasedate}}</p>
                            <p class="user" v-if="book.book_infor && book.book_infor.ud_name">資產： {{book.book_infor.ud_name}}</p>
                            <p class="status" v-if="book.book_infor && book.book_infor.bsc_name">狀態： {{book.book_infor.bsc_name}}</p>
                            <textarea v-if="book.book_infor && book.book_infor.bi_message" name="" id="" cols="30" rows="10" :value="book.book_infor.bi_message" disabled></textarea>

                        </div>
                    </div>
                    <div class="container_wrap table">
                        <div class="container_top row">
                            <div class="top_item cell">借閱人</div>
                            <div class="top_item cell">借閱日期</div>
                            <div class="top_item cell">歸還日期</div>
                            <div class="top_item cell btn_delete">
                                <div class="btn_create dd_wrap" v-if="book.book_infor && (user_status.ud_admin || user_auth.bi_admin) && book.book_infor.bi_id" @click="book.create_book_open ? closeAll() : book.create_book_open=true">新增借閱</div>
                            </div>
                        </div>
                        <div class="margin_top"></div>
                        <div class="container_bottom row_group">
                            <div class="bottom_item row new_book" v-if="book.create_book_open">
                                <div class="content_text cell ud_name dropdown_item cursor" @click="openDropdownMenu('ud_name','bbr_id','create',$event)">
                                    <span class="dropdown_item" v-if="book.create_book_data.ud_name">{{book.create_book_data.ud_name}}</span>
                                    <span class="dropdown_item" v-else>請選擇</span>
                                    <div class="drop_down_wrap user dd_wrap" v-bind:class="{'top':top_or_bottom,'bottom':!top_or_bottom}" v-if="checkToOpenDropDown('ud_name','bbr_id','create')">
                                        <ul class="infor_ul dd_wrap">
                                            <li class="infor_li dd_wrap" v-for="user in user_cate" @click="book.create_book_data.ud_name = user.ud_name,book.create_book_data.ud_id = user.ud_id,closeAllDropdownMenu()" v-bind:class="{'current':book.create_book_data.ud_id == user.ud_id}">
                                                <img class="dd_wrap" v-if="user.ud_icon" :src="user.ud_icon" alt="">
                                                <img class="dd_wrap" v-else="user.ud_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=" alt="">
                                                {{user.ud_name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="content_text cell" v-bind:class="{'cursor':user_status.ud_admin || user_auth.bi_admin,'dropdown_item':user_status.ud_admin || user_auth.bi_admin}" @click="user_status.ud_admin || user_auth.bi_admin ? openDropdownMenu('bbr_borrowingdate','bbr_id','create',$event) : false">
                                    <span class="dropdown_item" v-if="book.create_book_data.bbr_borrowingdate">{{book.create_book_data.bbr_borrowingdate}}</span>
                                    <span class="dropdown_item" v-else>-</span>
                                    <datetimepicker v-if="checkToOpenDropDown('bbr_borrowingdate','bbr_id','create')" :id="book.create_book_data.bbr_id" type="bbr_id" :date="book.create_book_data.bbr_borrowingdate" :position="dropdown.position" @get-close="closeDateTimePicker" @get-newdate="createBorrowingDate"></datetimepicker>
                                </div>
                                <div class="content_text cell" v-bind:class="{'cursor':user_status.ud_admin || user_auth.bi_admin,'dropdown_item':user_status.ud_admin || user_auth.bi_admin}" @click="user_status.ud_admin || user_auth.bi_admin ? openDropdownMenu('bbr_returndate','bbr_id','create',$event) : false">
                                    <span class="dropdown_item" v-if="book.create_book_data.bbr_returndate">{{book.create_book_data.bbr_returndate}}</span>
                                    <span class="dropdown_item" v-else>-</span>
                                    <datetimepicker v-if="checkToOpenDropDown('bbr_returndate','bbr_id','create')" :id="book.create_book_data.bbr_id" type="bbr_id" :date="book.create_book_data.bbr_returndate" :position="dropdown.position" @get-close="closeDateTimePicker" @get-newdate="createReturnDate"></datetimepicker>
                                </div>
                                <div class="content_text cell create_wrap dd_wrap">
                                    <i class="far fa-times-circle close dd_wrap" @click="closeAll()"></i>
                                    <i class="far fa-check-circle check dd_wrap" @click="createBorrowing()"></i>
                                </div>
                            </div>
                            <div class="bottom_item row" v-for="bo in new_data">
                                <div class="content_text cell">
                                    <span v-if="bo.ud_name" v-highlight="{keyword: search_condition.book_content,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{bo.ud_name}}</span>
                                    <span v-else>-</span>
                                </div>
                                <div class="content_text cell">
                                    <span v-if="bo.bbr_borrowingdate">{{bo.bbr_borrowingdate}}</span>
                                    <span v-else>-</span>
                                </div>
                                <div class="content_text cell" v-bind:class="{'cursor':user_status.ud_admin || user_auth.bi_admin,'dropdown_item':user_status.ud_admin || user_auth.bi_admin}" @click="user_status.ud_admin || user_auth.bi_admin ? openDropdownMenu('bbr_returndate','bbr_id',bo.bbr_id,$event) : false">
                                    <span class="dropdown_item" v-if="bo.bbr_returndate">{{bo.bbr_returndate}}</span>
                                    <span class="dropdown_item" v-else>-</span>
                                    <datetimepicker v-if="checkToOpenDropDown('bbr_returndate','bbr_id',bo.bbr_id)" :id="bo.bbr_id" type="bbr_id" :date="bo.bbr_returndate" :position="dropdown.position" @get-close="closeDateTimePicker" @get-newdate="changeReturnDate"></datetimepicker>
                                </div>
                                <div class="content_text cell btn_delete" v-if="user_status.ud_admin || user_auth.bi_admin">
                                    <i class="far fa-trash-alt" @click="openDeletePromptBox(bo.bbr_id,3)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="not_found" v-if="new_data.length < 1">
                        <img src="/image/nobody.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div id="page-container" class="account" v-if="url_show_block == 'account-list'">
            <div class="left">
                <ul class="tags_wrap">
                    <li v-if="account.sub_nav == 'account_management'" v-bind:class="{ 'current': account.sub_nav == 'account_management'}" @click="account.sub_nav = 'account_management'">
                        <div class="tag_item">
                            <img src="/image/users-solid_hover.png">
                            <p>帳號管理</p>
                        </div>
                    </li>
                    <li v-else v-bind:class="{ 'current': account.sub_nav == 'account_management'}" @click="account.sub_nav = 'account_management'" onmouseover="$(this).find('img').attr('src','/image/users-solid_hover.png')" onmouseout="$(this).find('img').attr('src','/image/users-solid.png')">
                        <div class="tag_item">
                            <img src="/image/users-solid.png">
                            <p>帳號管理</p>
                        </div>
                    </li>
                    <li v-if="account.sub_nav == 'authority_level'" v-bind:class="{ 'current': account.sub_nav == 'authority_level'}" @click="account.sub_nav = 'authority_level'">
                        <div class="tag_item">
                            <img src="/image/door-open-solid_hover.png">
                            <p>權限管理</p>
                        </div>
                    </li>
                    <li v-else v-bind:class="{ 'current': account.sub_nav == 'authority_level'}" @click="account.sub_nav = 'authority_level'" onmouseover="$(this).find('img').attr('src','/image/door-open-solid_hover.png')" onmouseout="$(this).find('img').attr('src','/image/door-open-solid.png')">
                        <div class="tag_item">
                            <img src="/image/door-open-solid.png">
                            <p>權限管理</p>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 使用者帳號列表頁 -->
            <div class="right" v-if="account.sub_nav == 'account_management'">
                <div class="right_wrap">
                    <div class="header_wrap">
                        <div class="btn_create" @click="openSinglePage(user_status,'ud',null,4)">新增帳號</div>
                    </div>
                    <div class="container_wrap table" v-if="new_users.length > 0">
                        <div class="head_wrap row">
                            <div class="head_text cell ud_code cursor" @click="changeUserSort('ud_code')">
                                員工代號
                                <i v-if="account.user_order == 'ud_code' && account.user_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.user_order == 'ud_code' && account.user_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i>
                            </div>
                            <div class="head_text cell ud_account cursor" @click="changeUserSort('ud_account')">
                                帳號
                                <i v-if="account.user_order == 'ud_account' && account.user_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.user_order == 'ud_account' && account.user_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i>
                            </div>
                            <div class="head_text cell ud_name cursor" @click="changeUserSort('ud_name')">
                                暱稱
                                <i v-if="account.user_order == 'ud_name' && account.user_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.user_order == 'ud_name' && account.user_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i>
                            </div>
                            <!-- <div class="head_text cell ut_name cursor" @click="changeUserSort('ut_name')">
                                部門
                                <i v-if="account.user_order == 'ut_name' && account.user_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.user_order == 'ut_name' && account.user_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i>
                            </div> -->
                            <div class="head_text cell ug_name cursor" @click="changeUserSort('ug_name')">
                                組別
                                <i v-if="account.user_order == 'ug_name' && account.user_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.user_order == 'ug_name' && account.user_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i>
                            </div>
                            <div class="head_text cell al_id">權限等級</div>
                            <div class="head_text cell ud_status">啟/停用</div>
                        </div>
                        <div v-for="user in new_users" class="content_wrap row_group">
                            <div class="main_project row">
                                <div class="content_text cell ud_code">{{user.ud_code}}</div>
                                <div class="content_text cell ud_account"><span class="cursor" @click="openSinglePage(user_status,'ud',user.ud_id,4)" v-highlight="{keyword: search_condition.user_content,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{user.ud_account}}</span></div>
                                <div class="content_text cell ud_name"><span v-highlight="{keyword: search_condition.user_content,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{user.ud_name}}</span></div>
                                <!-- <div class="content_text cell ut_name">{{user.ut_name}}</div> -->
                                <div class="content_text cell ug_name">{{user.ug_name}}</div>
                                <div class="content_text cell al_id">{{user.al_name}}</div>
                                <div class="content_text cell ud_status">
                                    <span v-if="user.ud_status == 1" class="btn green cursor" @click="changeUserStatus(user.ud_id,user.ud_status)">啟用中</span>
                                    <span v-else-if="user.ud_status == 0" class="btn red cursor" @click="changeUserStatus(user.ud_id,user.ud_status)">停用中</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="new_users.length == 0 && search_condition.user_content != '' " class="found_nothing_wrap">查無使用者</div>
                    <div v-else-if="new_users.length == 0 && search_condition.user_content == ''" class="found_nothing_wrap">暫無使用者</div>
                </div>
            </div>
            <!-- 權限設定頁 -->
            <div class="right" v-if="account.sub_nav == 'authority_level'">
                <div class="right_wrap">
                    <div class="header_wrap">
                        <div class="btn_create" @click="openSinglePage(user_status,'al',null,5)">新增權限等級</div>
                    </div>
                    <div class="container_wrap table" v-if="new_auths.length > 0">
                        <div class="head_wrap row">
                            <div class="head_text cell al_name cursor" @click="changeAuthSort('al_name')">
                                層級名稱<i v-if="account.auth_order == 'al_name' && account.auth_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.auth_order == 'al_name' && account.auth_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i></div>
                            <div class="head_text cell pt_admin cursor" @click="changeAuthSort('pt_admin')">
                                專案<i v-if="account.auth_order == 'pt_admin' && account.auth_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.auth_order == 'pt_admin' && account.auth_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i></div>
                            <div class="head_text cell ai_admin cursor" @click="changeAuthSort('ai_admin')">
                                公告<i v-if="account.auth_order == 'ai_admin' && account.auth_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.auth_order == 'ai_admin' && account.auth_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i></div>
                            <div class="head_text cell pm_admin cursor" @click="changeAuthSort('pm_admin')">
                                資產<i v-if="account.auth_order == 'pm_admin' && account.auth_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.auth_order == 'pm_admin' && account.auth_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i></div>
                            <div class="head_text cell bi_admin cursor" @click="changeAuthSort('bi_admin')">
                                書籍<i v-if="account.auth_order == 'bi_admin' && account.auth_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.auth_order == 'bi_admin' && account.auth_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i></div>
                            <div class="head_text cell al_remark cursor" @click="changeAuthSort('al_remark')">
                                備註<i v-if="account.auth_order == 'al_remark' && account.auth_sort == 'DESC'" class="fas fa-sort-amount-down"></i>
                                <i v-else-if="account.auth_order == 'al_remark' && account.auth_sort == 'ASC'" class="fas fa-sort-amount-down-alt"></i></div>
                            <div class="head_text cell delete">功能</div>
                        </div>
                        <div v-for="auth in new_auths" class="content_wrap row_group">
                            <div class="main_project row">
                                <div class="content_text cell al_name cursor"><span @click="openSinglePage(user_status,'al',auth.al_id,5)" v-highlight="{keyword: search_condition.auth_content,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{auth.al_name}}</span></div>
                                <div class="content_text cell pt_admin" v-if="auth.pt_admin">可編輯</div>
                                <div class="content_text cell pt_admin" v-else>僅查看</div>
                                <div class="content_text cell ai_admin" v-if="auth.ai_admin">可編輯</div>
                                <div class="content_text cell ai_admin" v-else>僅查看</div>
                                <div class="content_text cell pm_admin" v-if="auth.pm_admin">可編輯</div>
                                <div class="content_text cell pm_admin" v-else>僅查看</div>
                                <div class="content_text cell bi_admin" v-if="auth.bi_admin">可編輯</div>
                                <div class="content_text cell bi_admin" v-else>僅查看</div>
                                <div class="content_text cell al_remark">{{auth.al_remark ? auth.al_remark : ''}}</div>
                                <div class="content_text cell btn_delete">
                                    <i class="far fa-trash-alt" @click="openDeletePromptBox(auth.al_id,7)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="new_auths.length == 0 && search_condition.auth_content != '' " class="found_nothing_wrap">查無權限等級</div>
                    <div v-else-if="new_auths.length == 0 && search_condition.auth_content == ''" class="found_nothing_wrap">暫無權限等級</div>
                </div>
            </div>
        </div>

        <!-- 彈窗 -->
        <hoverwrap v-if="checkToOpenHover()" :title="hoverwrap.title" :subtitle="hoverwrap.subtitle" :date="hoverwrap.date" :user="hoverwrap.user" :position="hoverwrap.position"></hoverwrap>
        <!-- 彈窗 end -->
        <!-- 新增標籤頁面 -->
        <div class="create_tag_wrap" v-if="project.create_tag_open">
            <div class="tag_box">
                <div class="tag_content">
                    <div class="tag_title">
                        <h2 v-if="project.tag_type == 'create'">新增標籤</h2>
                        <h2 v-else-if="project.tag_type == 'modify'">修改標籤</h2>
                    </div>
                    <div class="tag_name">
                        <label for="tm_name">標籤名稱</label>
                        <input type="text" name="tm_name" v-model="project.tag_data.tm_name">
                    </div>
                    <el-upload action='' :on-change="getFile" :auto-upload="false" :show-file-list="false">
                        <!-- <el-button size="small" type="primary">选择图片上传,最多上传一张图片</el-button> -->
                        <img v-if="image_url" :src="image_url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="tag_btn_group">
                    <div class="btn_cancel" @click="closeTagWrap()">取消</div>
                    <div class="btn_submit" v-if="project.tag_type == 'create'" @click="createTag()">確認</div>
                    <div class="btn_submit" v-else-if="project.tag_type == 'modify'" @click="changeTagStyle()">確認</div>
                </div>
            </div>
        </div>
        <!-- 新增標籤頁面 end -->
        <!-- 新增使用者到標籤頁面 -->
        <div class="add_user_tag_wrap" v-if="project.add_user_tag_open" @click="colseUserTagWrap($event)">
            <div class="user_tag_box user_tag_item">
                <div class="user_tag_header user_tag_item">
                    <div class="tag_title user_tag_item">
                        <h2 class="user_tag_item">編輯人員</h2>
                    </div>
                    <div class="tag_input user_tag_item">
                        <label for="ud_name" class="user_tag_item"><i class="far fa-user-plus user_tag_item"></i></label>
                        <input class="user_tag_item" type="text" name="ud_name" @input="searchUser()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" placeholder="輸入使用者名稱">
                        <ul class="search_result user_tag_item" v-if="search_user_data.length">
                            <li class="user_tag_item" v-for="user in search_user_data" @click="addUserToThisTag(user.ud_id)">
                                <div class="user_icon user_tag_item">
                                    <img :src="user.ud_icon" alt="" class="user_tag_item">
                                </div>
                                <div class="user_name user_tag_item">{{user.ud_name}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="user_tag_container user_tag_item" v-if="project.tag_user_data.length">
                    <div class="user_data user_tag_item" v-for="user in project.tag_user_data">
                        <div class="user_icon user_tag_item">
                            <img :src="user.ud_icon" alt="" class="user_tag_item">
                        </div>
                        <div class="user_name user_tag_item">{{user.ud_name}}</div>
                        <div class="owner user_tag_item" v-if="user.trm_owner">擁有者</div>
                        <div class="remove_user user_tag_item" v-if="!user.trm_owner && user_status.ud_admin && user_status.ud_id == project.tag_owner_id" @click="deleteUserFromThisTag(user.trm_id)">踢除</div>
                    </div>
                </div>
                <div class="user_tag_footer user_tag_item">
                    <div class="btn_submit">完成</div>
                </div>
            </div>
        </div>
        <!-- 新增使用者到標籤頁面 end -->
        <!-- 單一框 -->
        <singlepage v-if="checkToOpenSingle()" :userdata="single.userdata" :type="single.type" :id="single.id" :cate="single.cate" :group="single.group" @get-close="closeSinglePage"></singlepage>
        <!-- 單一框 end -->
        <!-- 提醒框 -->
        <reminderwrap :id="user_status.ud_id" :admin="user_status.ud_admin ? true : false"></reminderwrap>
        <!-- 提醒框 end -->
        <!-- 提示框 -->
        <div class="prompt_wrap" v-show="prompt_box_open">
            <div class="prompt_box">
                <div class="prompt_content">
                    <div class="prompt_icon">
                        <i class="fas"></i>
                    </div>
                    <div class="prompt_title">
                        <h2></h2>
                    </div>
                </div>
                <div class="prompt_btn_group">
                    <div class="btn_cancel" @click="closePrompt()">取消</div>
                    <div class="btn_submit" v-if="show_submit_btn" @click="deleteData()">確認</div>
                    <div class="btn_submit" v-else>確認</div>
                    <p><span></span>s 後自動關閉</p>
                </div>
            </div>
        </div>
        <!-- 提示框 end -->
        <!-- 加載框 -->
        <div class="loading_block" v-if="loading">
            <img src="/image/loading.svg" alt="">
        </div>
        <!-- 加載框 end -->
        <!-- 推播框 -->
        <div class="notification_wrap"></div>
        <!-- 推播框 end -->
    </div>
</template>
<script>
import singlepage from '../components/Singlepage.vue';
import hoverwrap from '../components/Hoverwrap.vue';
import reminderwrap from '../components/Reminderwrap.vue';
import datetimepicker from '../components/Datetimepicker.vue'
export default {
    components:{
        singlepage,
        hoverwrap,
        reminderwrap,
        datetimepicker
    },
	data() {
        return {
            url_show_block:'index', //分頁根據
            loading:false,//加載框 顯示與否
            user_status:[],//使用者的基本資料
            user_auth:[],//使用者權限
            user_group:[],//使用者所屬群組
            user_cate:[],//所有使用者
            //單一頁面所需的值
            single:{'userdata':'','type':'','id':'','cate':'','group':''},
            //用於判斷要開啟哪個下拉選單
            dropdown:{'item':'','type':'','id':'','position':''}, 
            //hover專案會談出的小框所需要的資訊
            hoverwrap:{'title':'','subtitle':'','date':'','position':{'x':'','y':''}},
            //查詢功能設定
            search_show:false,//搜尋框 顯示與否
            composing:true,//監聽搜尋框輸入
            search_condition: {//搜尋關鍵字
                book_content: '',
                ann_content: '',
                user_content: '',
                auth_content: '',
                property_content: '',
                pro_content:''
            },
            prompt_box_open:false,//提示框 顯示與否
            show_submit_btn:true,//送出按鈕功能 顯示與否
            //下拉選單設定
            top_or_bottom:false,// true = top , false = bottom 下拉選單會在目標的上方還是下方
            //上傳圖片
            image_url:'',//上傳標籤的預覽圖
            delete_id:'',//要刪除的資料的編號
            ann_type:'',
            index:{
                //所有會用到的資料
                system_urls:[],//系統連結資料
                sub_projects_month:[],//當月子任務資料
                sub_projects_week:[],//當週子任務資料
                sub_projects_all:[],//全部子任務資料
                read_more:false,//顯示月曆與否
                firstday:'',
                lastday:'',
                //時鐘相關
                date:'',//日期
                time:'',//時間
                one_week:'',
                month_en:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                week_cn:['週日','週一','週二','週三','週四','週五','週六'],
                //月曆相關
                now_page_year:'',//當頁年份
                now_page_month:'',//當頁月份
                today:{'year':'','month':'','day':''},//當天年月日
                month_olympic:[31,29,31,30,31,30,31,31,30,31,30,31],//閏年每月天數
                month_normal:[31,28,31,30,31,30,31,31,30,31,30,31],//正常年每月天數
            },
            book:{
                //所有會用到的資料
                data_books:[],//書籍列表資料
                data_bookborrows:[],//書籍借閱資料
                data_booksorts:[],//書籍分類
                book_infor:{'bs_id':'','bs_name':'','bi_id':'','bi_name':''},//現在所瀏覽的書籍的資訊
                cate_bookstatus:[],//書籍狀態
                create_book_data:{},//新增借閱紀錄暫存資料區
                //所有顯示區塊判斷用值
                create_book_open:false,//新增借閱區塊 顯示與否
            },
            announcement:{
                //所有會用到的資料
                sub_nav:0,//ann:公告
                data_anns:[],//公告列表資料
                reminder_data:[],//使用者提醒列表
                //所有顯示區塊判斷用值
                create_ann_open:false,//新增公告區塊 顯示與否
                tabHover:-1,//顯示圖片為hover或是尚未hover
            },
            property:{
                //所有會用到的資料
                data_propertys:[],//資產列表資料
                create_property_data:{},//新增資產暫存資料區
                //所有顯示區塊判斷用值
                create_property_open:false,//新增資產區塊 顯示與否
                //asset(資產)所有顯示的欄位
                property_field_show_or_not:{
                    'ud_name':true, //人員
                    'pm_host':true, //主機
                    'pm_screenone':true, //螢幕1
                    'pm_screentwo':true, //螢幕2
                    'pm_telephone':true, //話機
                    'pm_canvas':true, //繪圖板
                    'pm_other':true, //其他
                    'pm_adobe':true //adobe
                },
            },
            account:{
                users:[], //全部使用者資料
                auths:[], //全部權限等級資料
                //基本設定值
                sub_nav:'account_management',
                //排序功能的參數
                user_order:'ud_code',
                user_sort:'DESC',
                auth_order:'al_name',
                auth_sort:'DESC',
            },
            project:{
                //右鍵功能相關設定
                menudata:{
                    boxStyle:"width:150px;background:#f55;",// 菜单box的样式   Menu box style
                    optionStyle:"border: 1px solid #EEEEEE;background:#EDF2F6;color:#4F5A6A;line-height:30px;font-size:12px;",// 菜单选项的样式 Style of menu options
                    menus:[//按下右鍵跳出的按鈕
                        {
                        content:"修改標籤",
                        callback:"modifyTagStyle",
                        },
                        {
                        content:"刪除標籤",
                        callback:"deleteTagStyle",
                        },
                        {
                        content:"新增人員",
                        callback:"openUserTagWrap",
                        }
                    ],
                },
                //list所有顯示的欄位
                list_field_show_or_not:{
                    'all':{
                        'pmc_name':true,//里程碑
                        'prsc_name':true,//需求類別
                        'peic_name':true,//執行項目
                        'pst_requiredate':true,//需求日期
                        'pst_executiondate':true,//執行日期
                        'pst_completiondate':true,//完成日期
                        'ud_name':true,//執行者
                        'psc_name':true,//狀態
                        'ppc_name':true,//優先權
                        'pst_spendtime':true,//執行時間
                        'pt_backup':true//備份
                    },
                    'wait':{
                        'pmc_name':true,//里程碑
                        'prsc_name':true,//需求類別
                        'peic_name':true,//執行項目
                        'pst_requiredate':true,//需求日期
                        'pst_executiondate':true,//執行日期
                        'pst_completiondate':true,//完成日期
                        'ud_name':true,//執行者
                        'psc_name':true,//狀態
                        'ppc_name':true,//優先權
                        'pst_spendtime':true,//執行時間
                        'pt_backup':true//備份
                    },
                    'finish':{
                        'pmc_name':true,//里程碑
                        'prsc_name':true,//需求類別
                        'peic_name':true,//執行項目
                        'pst_requiredate':true,//需求日期
                        'pst_executiondate':true,//執行日期
                        'pst_completiondate':true,//完成日期
                        'ud_name':true,//執行者
                        'psc_name':true,//狀態
                        'ppc_name':true,//優先權
                        'pst_spendtime':true,//執行時間
                        'pt_backup':true//備份
                    },
                    'else':{
                        'pmc_name':true,//里程碑
                        'prsc_name':true,//需求類別
                        'peic_name':true,//執行項目
                        'pst_requiredate':true,//需求日期
                        'pst_executiondate':true,//執行日期
                        'pst_completiondate':true,//完成日期
                        'ud_name':true,//執行者
                        'psc_name':true,//狀態
                        'ppc_name':true,//優先權
                        'pst_spendtime':true,//執行時間
                        'pt_backup':true//備份
                    }
                },
                //所有欄位全部的選項
                milestone_cate:[],//里程碑所有選項
                requiresort_cate:[],//需求分類所有選項
                priority_cate:[],//優先權所有選項
                status_cate:[],//狀態所有選項
                executeitem_cate:[],//執行項目選項
                subprojectsort_cate:[],
                //所有會用到的資料
                project_ug_id:'',//該專案任務頁面是哪個組別 1.介面A 2.介面B 3.平台/遊戲A 4.平台/遊戲B
                user_tags:[],//使用者的標籤資訊
                user_favorites:[],//使用者的最愛專案
                sub_nav:'all',//wait:待排程,all:全部任務,finish:完成任務,所有數字都是使用者自定義的標籤編號
                project_status:'全部任務',
                projects:[],//專案任務複數
                sub_projects:[],//專案子任務複數
                user_tag_projects:[],//使用者自定義標籤所包含的專案
                project:[],//專案任務單數
                sub_project:[],//專案子任務單數
                //各種顯示區塊
                create_tag_open:false,//新增標籤頁面 顯示與否
                add_user_tag_open:false,//新增使用者到標籤區塊 顯示與否
                create_project_status:false,//新增專案任務區塊 顯示與否
                create_subproject_status:false,//新增專案子任務區塊 顯示與否
                create_project_ann_status:false,//新增專案任務公告區塊 顯示與否
                subprojects_show:true,//列表呈現子任務 顯示與否
                project_show:false,//列表所顯示的專案任務狀態區塊 顯示與否
                project_nav_open:'information',//單一專案任務頁面-nav區塊 顯示與否
                prompt_box_open:false,//提示框 顯示與否
                sub_project_input_open:false,//新增子任務區塊 顯示與否
                show_submit_btn:true,//送出按鈕功能 顯示與否
                search_show:false,//搜尋框 顯示與否
                //判別用的設定
                open_list_item:'',//列表頁 下拉選單所屬的欄位
                open_list_id:'',//列表頁 所打開的下拉選單為哪個id
                open_project_id:'',//列表頁 所打開的添加子任務輸入框為哪個id
                //拖拉功能設定
                drag_data:{},
                drag_pt_id:'',
                drag_pst_id:'',
                drag_over_pst_id:'',
                //標籤新增修改相關設定
                tag_type:'',
                tag_data:{},
                tag_user_data:[], //該標籤的所有成員資料
                tag_search_udname:'',
                tag_owner_id:'', //該標籤的擁有者的使用者編號
            }
        }
    },
    created:function(){
        let self = this;
        //擷取路徑抓取到ug_id
        let url = new URL(location.href);
        var array = url.hash.split("#/");
        if(array[1] != ''){
            self.url_show_block = array[1];
            if(!isNaN(self.url_show_block)){
                self.project.project_ug_id = self.url_show_block;
            }
        }else{
            this.$router.replace('/index');
        }

        //設定時鐘
        var timerID = setInterval(self.updateTime(), 1000);

        //設定周曆
        self.index.one_week = self.getDaysOfWeek();

        //抓取一周的頭跟尾日期
        var cd = new Date();
        var timesStamp = cd.getTime();
        var currenDay = cd.getDay();
        var f_year = 1900 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 7) % 7)).getYear();
        var f_month = 1 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 7) % 7)).getMonth();
        var f_day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 7) % 7)).getDate();

        self.index.firstday = f_year + '-' + f_month + '-' + f_day;

        var l_year = 1900 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (6 - (currenDay + 7) % 7)).getYear();
        var l_month = 1 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (6 - (currenDay + 7) % 7)).getMonth();
        var l_day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (6 - (currenDay + 7) % 7)).getDate();

        self.index.lastday = l_year + '-' + l_month + '-' + l_day;

    },
    mounted: function () {
        this.init();
    },
    computed: {
        data_for_month:function(){
            let self = this;
            var array_a = [];
            var result_arr = [];
            var totalDay = self.daysMonth(self.index.now_page_month, self.index.now_page_year); //獲取該月總天數
            var firstDay = self.dayStart(self.index.now_page_month, self.index.now_page_year); //获取该月第一天是星期几
            for (var i = 0; i < firstDay; i++) {
                var json = {};
                json.week = i % 7; //禮拜幾
                json.day  = '';
                json.month = '';
                json.year = '';
                array_a.push(json);
                result_arr.push(json);
            }
            for (var i = 0; i < totalDay; i++) {
                var json = {};
                var array_b = [];
                var cd = new Date(self.index.now_page_year, self.index.now_page_month, i+1);
                json.week = cd.getDay();
                json.day  = cd.getDate();
                json.month = self.index.now_page_month;
                json.year = self.index.now_page_year;
                for(var j = 0;j<self.index.sub_projects_month.length;j++){
                    var nd = new Date(self.index.sub_projects_month[j].pst_completiondate);
                    if(cd.getDay() == nd.getDay() && cd.getDate() == nd.getDate() && self.index.now_page_month == nd.getMonth() && self.index.now_page_year == nd.getFullYear()){
                        array_b.push(self.index.sub_projects_month[j]);
                    }
                }
                if(array_b.length > 0){
                    json.sub_projects_month = array_b;
                }
                array_a.push(json);
                result_arr.push(json);
            }
            var num = Math.ceil(array_a.length / 7);
            for (var i = 0; i < (num*7 - array_a.length); i++) {
                var json = {};
                json.week = (array_a.length+i) % 7; //禮拜幾
                json.day  = '';
                json.month = '';
                json.year = '';
                result_arr.push(json);
            }
            return result_arr;
        },
        data_for_week:function(){
            let self = this;
            var result_arr = [];
            var currentDate = new Date();
            var timesStamp = currentDate.getTime();
            var currenDay = currentDate.getDay();
            for(var i = 0;i<7;i++){
                var f_year = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getYear();
                var f_month = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getMonth();
                var f_day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getDate();
                var array_a = [];
                for(var j = 0;j < self.index.sub_projects_week.length ;j++){
                    var dd = new Date(self.index.sub_projects_week[j].pst_completiondate);
                    if(dd.getYear() == f_year && dd.getMonth() == f_month && dd.getDate() == f_day){
                        array_a.push(self.index.sub_projects_week[j]);
                    }
                }
                result_arr.push(array_a);
            }
            return result_arr;
        },
        new_data:function(){
            let self = this;
            if(self.url_show_block == 'book-list'){
                var array_a = [];
                var array_b = [];
                if(!Array.isArray(self.book.data_bookborrows)){
                    array_a.push(self.book.data_bookborrows)
                }else{
                    array_a = self.book.data_bookborrows;
                }
                if(self.search_condition.book_content != ''){
                    for (var j=0;j<array_a.length;j++ ){
                        var ss = array_a[j].ud_name;
                        var tt = new RegExp(self.search_condition.book_content, "i");
                        if(ss.match(tt)){
                            array_b.push(array_a[j]);
                        }
                    }
                    return array_b;
                }else{
                    return array_a;
                }
            }else if(self.url_show_block == 'announcement-list'){
                var array_a = [];
                var array_b = [];
                var array_c = [];
                var array_d = [];
                var array_e = [];
                for (var i = 0; i < self.announcement.data_anns.length; i++) {
                    if(self.announcement.sub_nav == 0){
                        if(self.announcement.data_anns[i].ai_cate == 2){
                            array_e.push(self.announcement.data_anns[i]);
                        }
                    }else{
                        if(self.announcement.data_anns[i].ai_cate == 1 && self.announcement.data_anns[i].ug_id == self.announcement.sub_nav){
                            array_e.push(self.announcement.data_anns[i]);
                        }
                    }
                }
                for (var i = 0; i < array_e.length; i++) {
                    if(array_e[i].ai_topping == 1){
                        array_a.push(array_e[i]);
                    }else{
                        array_b.push(array_e[i]);
                    }
                }
                array_c = array_a.concat(array_b);
                if(self.search_condition.ann_content != ''){
                    for (var j=0;j<array_c.length;j++ ){
                        var ss = array_c[j].ai_title;
                        var tt = new RegExp(self.search_condition.ann_content, "i");
                        if(ss.match(tt)){
                            array_d.push(array_c[j]);
                        }
                    }
                    for (var k = 0;k < array_d.length;k++){
                        var boolean = true;
                        for (var l = 0;l<self.announcement.reminder_data.length;l++){
                            if(array_d[k].ai_id == self.announcement.reminder_data[l].ai_id){
                                array_d[k].url_reminderdate = self.announcement.reminder_data[l].url_reminderdate;
                                boolean = false
                            }
                        }
                        if(boolean){
                            array_c[k].url_reminderdate = null;
                        }
                    }
                    return array_d;
                }else{
                    for (var k = 0;k < array_c.length;k++){
                        var boolean = true;
                        for (var l = 0;l<self.announcement.reminder_data.length;l++){
                            if(array_c[k].ai_id == self.announcement.reminder_data[l].ai_id){
                                array_c[k].url_reminderdate = self.announcement.reminder_data[l].url_reminderdate;
                                boolean = false
                            }
                        }
                        if(boolean){
                            array_c[k].url_reminderdate = null;
                        }
                    }
                    return array_c;
                }
            }else if(self.url_show_block == 'property-list'){
                let self = this;
                var array_a = [];
                var array_b = [];
                array_a = self.property.data_propertys;
                if(self.search_condition.property_content != ''){
                    for (var j=0;j<array_a.length;j++ ){
                        var ss = array_a[j].ud_name;
                        var tt = new RegExp(self.search_condition.property_content, "i");
                        if(ss.match(tt)){
                            array_b.push(array_a[j]);
                        }
                    }
                    return array_b;
                }else{
                    return array_a;
                }
            }
            
        },
        books:function(){
            let self = this;
            var array_a = [];
            var array_b = [];
            for (var i = 0; i < self.book.data_books.length; i++) {
                if(self.book.book_infor.bs_id == self.book.data_books[i].bs_id){
                    array_a.push(self.book.data_books[i]);
                }
            }
            return array_a;
        },
        new_users:function(){
            let self = this;
            var array_a = [];
            var array_b = [];
            array_a = self.account.users;
            if(self.search_condition.user_content != ''){
                for (var j=0;j<array_a.length;j++ ){
                    var ss = array_a[j].ud_name;
                    var tt = array_a[j].ud_account;
                    var uu = new RegExp(self.search_condition.user_content, "i");
                    if(ss.match(uu) || tt.match(uu)){
                        array_b.push(array_a[j]);
                    }
                }
                return array_b;
            }else{
                return array_a;
            }
        },
        new_auths:function(){
            let self = this;
            var array_a = [];
            var array_b = [];
            array_a = self.account.auths;
            if(self.search_condition.auth_content != ''){
                for (var j=0;j<array_a.length;j++ ){
                    var ss = array_a[j].al_name;
                    var tt = array_a[j].al_remark;
                    var uu = new RegExp(self.search_condition.auth_content, "i");
                    if(ss){
                        if(ss.match(uu)){
                            array_b.push(array_a[j]);
                        }
                    }else if(tt){
                        if(tt.match(uu)){
                            array_b.push(array_a[j]);
                        }
                    }
                }
                return array_b;
            }else{
                return array_a;
            }
        },
        projects_for_group:function(){
            let self = this;
            var array_a = self.project.projects;
            var array_b = [];
            if(array_a.length > 0){
                for(var i = 0 ; i < array_a.length ; i++){
                    if(array_a[i].ug_id == self.url_show_block){
                        array_b.push(array_a[i]);
                    }
                }
            }
            return array_b;
        },
        new_projects:function(){
            let self = this;
            if(self.project.sub_nav == 'all'){
                if(self.project.project_status == '全部任務'){
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if(self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show){
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if(tt && self.projects_for_group[i].is_show){
                            array_b.push(self.projects_for_group[i]);
                        }

                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if(self.project.sub_projects[j].pt_id == array_c[i].pt_id){
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        if(array_d.length > 0){
                            array_c[i].sub_projects = array_d;
                            array_e.push(array_c[i]);
                        }else{
                            if(self.user_status.ud_admin || self.user_auth.pt_admin){
                                array_c[i].sub_projects = array_d;
                                array_e.push(array_c[i]);
                            }
                        }
                    }
                    if(self.search_condition.pro_content != ''){
                        for (var j=0;j<array_e.length;j++ ){
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if(ss.match(tt)){
                                if(array_e[j].sub_projects.length > 0){
                                    var vv = [];
                                    for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if(xx.match(yy)){
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                }else{
                                    array_f.push(array_e[j]);
                                }
                            }else{
                                if(array_e[j].sub_projects.length > 0){
                                    var vv = [];
                                    var boolean = false;
                                    for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if(xx.match(yy)){
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if(boolean){
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    }else{
                        return array_e;
                    }
                }else if(self.project.project_status == '最愛'){
                    var array_a = [];
                    var array_f = [];
                    var array_e = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if(self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show){
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }

                    }
                    for (var i = 0; i < array_a.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if(self.project.sub_projects[j].pt_id == array_a[i].pt_id){
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        if(array_d.length > 0){
                            array_a[i].sub_projects = array_d;
                            array_e.push(array_a[i]);
                        }else{
                            if(self.user_status.ud_admin || self.user_auth.pt_admin){
                                array_e.push(array_a[i]);
                            }
                        }
                    }
                    if(self.search_condition.pro_content != ''){
                        for (var j=0;j<array_e.length;j++ ){
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if(ss.match(tt)){
                                if(array_e[j].sub_projects.length > 0){
                                    var vv = [];
                                    for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if(xx.match(yy)){
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                }else{
                                    array_f.push(array_e[j]);
                                }
                            }else{
                                if(array_e[j].sub_projects.length > 0){
                                    var vv = [];
                                    var boolean = false;
                                    for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if(xx.match(yy)){
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if(boolean){
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    }else{
                        return array_e;
                    }
                }else if(self.project.project_status == '待排程'){
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if(self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show){
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if(tt && self.projects_for_group[i].is_show){
                            array_b.push(self.projects_for_group[i]);
                        }

                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if(self.project.sub_projects[j].pt_id == array_c[i].pt_id){
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                    }


                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        var tt = false;
                        for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                            if(array_c[i].sub_projects[j].psc_id == 2){
                                tt = true;
                                array_d.push(array_c[i].sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                        if(tt){
                            array_e.push(array_c[i]);
                        }
                    }
                    if(self.search_condition.pro_content != ''){
                        for (var j=0;j<array_e.length;j++ ){
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if(ss.match(tt)){
                                if(array_e[j].sub_projects.length > 0){
                                    var vv = [];
                                    for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if(xx.match(yy)){
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                }else{
                                    array_f.push(array_e[j]);
                                }
                            }else{
                                if(array_e[j].sub_projects.length > 0){
                                    var vv = [];
                                    var boolean = false;
                                    for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if(xx.match(yy)){
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if(boolean){
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    }else{
                        return array_e;
                    }
                }else if(self.project.project_status == '待確認'){
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if(self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show){
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if(tt && self.projects_for_group[i].is_show){
                            array_b.push(self.projects_for_group[i]);
                        }

                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if(self.project.sub_projects[j].pt_id == array_c[i].pt_id){
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                    }


                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        var tt = false;
                        for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                            if(array_c[i].sub_projects[j].psc_id == 3){
                                tt = true;
                                array_d.push(array_c[i].sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                        if(tt){
                            array_e.push(array_c[i]);
                        }
                    }
                    if(self.search_condition.pro_content != ''){
                        for (var j=0;j<array_e.length;j++ ){
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if(ss.match(tt)){
                                if(array_e[j].sub_projects.length > 0){
                                    var vv = [];
                                    for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if(xx.match(yy)){
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                }else{
                                    array_f.push(array_e[j]);
                                }
                            }else{
                                if(array_e[j].sub_projects.length > 0){
                                    var vv = [];
                                    var boolean = false;
                                    for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if(xx.match(yy)){
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if(boolean){
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    }else{
                        return array_e;
                    }
                }else if(self.projectf.project_status == '進行中'){
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if(self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show){
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if(tt && self.projects_for_group[i].is_show){
                            array_b.push(self.projects_for_group[i]);
                        }

                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if(self.project.sub_projects[j].pt_id == array_c[i].pt_id){
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                    }


                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        var tt = false;
                        for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                            if(array_c[i].sub_projects[j].psc_id == 4){
                                tt = true;
                                array_d.push(array_c[i].sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                        if(tt){
                            array_e.push(array_c[i]);
                        }
                    }
                    if(self.search_condition.pro_content != ''){
                        for (var j=0;j<array_e.length;j++ ){
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if(ss.match(tt)){
                                if(array_e[j].sub_projects.length > 0){
                                    var vv = [];
                                    for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        if(xx.match(self.search_condition.pro_content)){
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                }else{
                                    array_f.push(array_e[j]);
                                }
                            }else{
                                if(array_e[j].sub_projects.length > 0){
                                    var vv = [];
                                    var boolean = false;
                                    for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if(xx.match(yy)){
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if(boolean){
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    }else{
                        return array_e;
                    }
                }
            }else if(self.project.sub_nav == 'wait'){
                var array_a = [];
                var array_b = [];
                var array_c = [];
                var array_e = [];
                var array_f = [];
                for (var i = 0; i < self.projects_for_group.length; i++) {
                    var tt = true;
                    var array_c = [];
                    for (var j = 0; j < self.project.user_favorites.length; j++) {
                        if(self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show == 0){
                            array_a.push(self.projects_for_group[i]);
                            tt = false;
                        }
                    }
                    if(tt && self.projects_for_group[i].is_show == 0){
                        array_b.push(self.projects_for_group[i]);
                    }

                }
                array_c = array_a.concat(array_b);
                for (var i = 0; i < array_c.length; i++) {
                    var array_d = [];
                    for (var j = 0; j < self.project.sub_projects.length; j++) {
                        if(self.project.sub_projects[j].pt_id == array_c[i].pt_id){
                            array_d.push(self.project.sub_projects[j]);
                        }
                    }
                    array_c[i].sub_projects = array_d;
                }

                if(self.search_condition.pro_content != ''){
                    for (var j=0;j<array_c.length;j++ ){
                        var ss = array_c[j].pt_name;
                        var tt = new RegExp(self.search_condition.pro_content, "i");
                        if(ss.match(tt)){
                            if(array_c[j].sub_projects.length > 0){
                                var vv = [];
                                for(var k = 0;k<array_c[j].sub_projects.length;k++){
                                    var xx = array_c[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if(xx.match(yy)){
                                        vv.push(array_c[j].sub_projects[k]);
                                    }
                                }
                                array_c[j].sub_projects = vv;
                                array_f.push(array_c[j]);
                            }else{
                                array_f.push(array_c[j]);
                            }
                        }else{
                            if(array_c[j].sub_projects.length > 0){
                                var vv = [];
                                var boolean = false;
                                for(var k = 0;k<array_c[j].sub_projects.length;k++){
                                    var xx = array_c[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if(xx.match(yy)){
                                        vv.push(array_c[j].sub_projects[k]);
                                        boolean = true;
                                    }
                                }
                                if(boolean){
                                    array_c[j].sub_projects = vv;
                                    array_f.push(array_c[j]);
                                }
                            }
                        }
                    }
                    return array_f;
                }else{
                    return array_c;
                }
            }else if(self.project.sub_nav == 'finish'){
                var array_a = [];
                var array_b = [];
                var array_c = [];
                var array_e = [];
                var array_f = [];
                for (var i = 0; i < self.projects_for_group.length; i++) {
                    var tt = true;
                    var array_c = [];
                    for (var j = 0; j < self.project.user_favorites.length; j++) {
                        if(self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id){
                            array_a.push(self.projects_for_group[i]);
                            tt = false;
                        }
                    }
                    if(tt){
                        array_b.push(self.projects_for_group[i]);
                    }

                }
                array_c = array_a.concat(array_b);
                for (var i = 0; i < array_c.length; i++) {
                    var array_d = [];
                    for (var j = 0; j < self.project.sub_projects.length; j++) {
                        if(self.project.sub_projects[j].pt_id == array_c[i].pt_id){
                            array_d.push(self.project.sub_projects[j]);
                        }
                    }
                    array_c[i].sub_projects = array_d;
                }


                for (var i = 0; i < array_c.length; i++) {
                    var array_d = [];
                    var tt = false;
                    for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                        if(array_c[i].sub_projects[j].psc_id == 6 || array_c[i].sub_projects[j].psc_id == 7 || array_c[i].sub_projects[j].psc_id == 8 || array_c[i].sub_projects[j].psc_id == 9){
                            tt = true;
                            array_d.push(array_c[i].sub_projects[j]);
                        }
                    }
                    array_c[i].sub_projects = array_d;
                    if(tt){
                        array_e.push(array_c[i]);
                    }
                }
                if(self.search_condition.pro_content != ''){
                    for (var j=0;j<array_e.length;j++ ){
                        var ss = array_e[j].pt_name;
                        var tt = new RegExp(self.search_condition.pro_content, "i");
                        if(ss.match(tt)){
                            if(array_e[j].sub_projects.length > 0){
                                var vv = [];
                                for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                    var xx = array_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if(xx.match(yy)){
                                        vv.push(array_e[j].sub_projects[k]);
                                    }
                                }
                                array_e[j].sub_projects = vv;
                                array_f.push(array_e[j]);
                            }else{
                                array_f.push(array_e[j]);
                            }
                        }else{
                            if(array_e[j].sub_projects.length > 0){
                                var vv = [];
                                var boolean = false;
                                for(var k = 0;k<array_e[j].sub_projects.length;k++){
                                    var xx = array_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if(xx.match(yy)){
                                        vv.push(array_e[j].sub_projects[k]);
                                        boolean = true;
                                    }
                                }
                                if(boolean){
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                }
                            }
                        }
                    }
                    return array_f;
                }else{
                    return array_e;
                }
            }else if(self.project.sub_nav != 'department_ann'){
                var toto_a = [];
                var toto_b = [];
                var toto_c = [];
                var toto_e = [];
                var toto_f = [];
                for (var i = 0; i < self.projects_for_group.length; i++) {
                    var tt = true;
                    for (var j = 0; j < self.project.user_favorites.length; j++) {
                        if(self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id){
                            toto_a.push(self.projects_for_group[i]);
                            tt = false;
                        }
                    }
                    if(tt){
                        toto_b.push(self.projects_for_group[i]);
                    }

                }
                toto_c = toto_a.concat(toto_b);
                for (var i = 0; i < toto_c.length; i++) {
                    var gg = [];
                    for (var j = 0; j < self.project.sub_projects.length; j++) {
                        if(toto_c[i].pt_id == self.project.sub_projects[j].pt_id){
                            gg.push(self.project.sub_projects[j]);
                        }
                    }
                    toto_c[i].sub_projects = gg;
                }
                for (var i = 0;i < toto_c.length; i++){
                    if(toto_c[i].tm_id == self.project.sub_nav){
                        toto_e.push(toto_c[i]);
                    }
                }
                if(self.search_condition.pro_content != ''){
                    for (var j=0;j<toto_e.length;j++ ){
                        var ss = toto_e[j].pt_name;
                        var tt = new RegExp(self.search_condition.pro_content, "i");
                        if(ss.match(tt)){
                            if(toto_e[j].sub_projects.length > 0){
                                var vv = [];
                                for(var k = 0;k<toto_e[j].sub_projects.length;k++){
                                    var xx = toto_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if(xx.match(yy)){
                                        vv.push(toto_e[j].sub_projects[k]);
                                    }
                                }
                                toto_e[j].sub_projects = vv;
                                toto_f.push(toto_e[j]);
                            }else{
                                toto_f.push(toto_e[j]);
                            }
                        }else{
                            if(toto_e[j].sub_projects.length > 0){
                                var vv = [];
                                var boolean = false;
                                for(var k = 0;k<toto_e[j].sub_projects.length;k++){
                                    var xx = toto_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if(xx.match(yy)){
                                        vv.push(toto_e[j].sub_projects[k]);
                                        boolean = true;
                                    }
                                }
                                if(boolean){
                                    toto_e[j].sub_projects = vv;
                                    toto_f.push(toto_e[j]);
                                }
                            }
                        }
                    }
                    return toto_f;
                }else{
                    return toto_e;
                }
            }
        },
        usercate_for_group:function(){
            let self = this;
            var array_a = self.user_cate;
            var array_b = [];
            for(var i = 0;i < array_a.length;i++){
                if(array_a[i].ug_id == self.url_show_block){
                    array_b.push(array_a[i]);
                }
            }
            return array_b;
        },
        search_user_data:function(){
            let self = this;
            var array_a = [];
            var array_b = [];
            var array_c = [];
            if(self.project.tag_search_udname){
                for(var i = 0;i < self.usercate_for_group.length;i++){
                    var name = self.usercate_for_group[i].ud_name;
                    var boolean = true;
                    for(var j = 0;j < self.project.tag_user_data.length;j++){
                        if(self.project.tag_user_data[j].ud_id == self.usercate_for_group[i].ud_id){
                            boolean = false;
                        }
                    }
                    var string = new RegExp(self.project.tag_search_udname, "i")
                    if(boolean && name.match(string)){
                        array_a.push(self.usercate_for_group[i]);
                    }
                }
                return array_a;
            }else{
                return array_b;
            }
        }
   	},
    methods: {
        init: function () {
            let self = this;
            //取得初始化所有的資料
            var json_index = {};
            json_index.firstday = self.index.firstday;
            json_index.lastday = self.index.lastday;
            axios.post('/getAllIndexData',json_index)
                .then(function (response) {
                    self.user_group = response.data.user_group;
                    self.user_status = response.data.user_status;
                    self.user_auth = response.data.user_status.auth;
                    self.index.system_urls = response.data.system_urls;
                    self.index.sub_projects_week = response.data.sub_projects_week;
                    self.index.sub_projects_all = response.data.sub_projects_all;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification(response,'failure');
                });
            var json_book = {};
            axios.post('/getAllBookData',json_book)
                .then(function (response) {                    
                    self.book.data_books = response.data.data_books;
                    self.book.book_infor = response.data.data_books[0];
                    self.book.data_bookborrows = response.data.data_bookborrows;
                    self.book.data_booksorts = response.data.data_booksorts;
                    self.book.cate_bookstatus = response.data.cate_bookstatus;
                    self.user_cate = response.data.user_cate;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification(response,'failure');
                });
            var json_announcement = {};
            axios.post('/getAllAnnouncementData',json_announcement)
                .then(function (response) {
                    self.announcement.reminder_data = response.data.reminder_data;
                    self.announcement.data_anns = response.data.data_anns;

                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
            var json_account = {};
            json_account.auth_order = self.account.auth_order;
            json_account.auth_sort = self.account.auth_sort;
            json_account.user_order = self.account.user_order;
            json_account.user_sort = self.account.user_sort;
            axios.post('/getAllAccountData',json_account)
                .then(function (response) {
                    self.account.auths = response.data.auths;
                    self.account.users = response.data.users;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
            var json_property = {};
            axios.post('/getAllPropertyData',json_property)
                .then(function (response) {
                    self.property.data_propertys = response.data.data_propertys;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
            var json_project = {};
            axios.post('/getAllProjectData',json_project)
                .then(function (response) {
                    self.project.user_tags = response.data.user_tags;
                    self.project.user_favorites = response.data.user_favorites;
                    self.project.projects = response.data.projects;
                    if(!self.user_status.ud_admin && !self.user_auth.pt_admin && self.project.sub_projects.length == 0){
                        var string = '';
                        for (var i = 0; i < response.data.sub_projects.length; i++) {
                            if(string != response.data.sub_projects[i].pt_id){
                                string = response.data.sub_projects[i].pt_id;
                                var json = {};
                                json.pt_id = string;
                                axios.post('/getsubprojectsofproject',json)
                                    .then(function (response) {
                                        self.project.sub_projects = self.project.sub_projects.concat(response.data);
                                    })
                                    .catch(function (response) {
                                        self.notification('系統出錯','failure');
                                    });
                            }
                        }
                    }else if(self.user_status.ud_admin || self.user_auth.pt_admin){
                        self.project.sub_projects = response.data.sub_projects;
                    }
                    self.project.subprojectsort_cate = response.data.subprojectsort_cate;
                    self.project.executeitem_cate = response.data.executeitem_cate;
                    self.project.status_cate = response.data.status_cate;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //切換頁面
        changePage:function(page){
            let self = this;
            if(page != self.url_show_block){
                self.$router.replace('/'+page);
                self.url_show_block = page;
            }
        },
        //關閉彈跳視窗
        closeHover:function(){
            let self = this;
            self.hoverwrap = {'title':'','subtitle':'','date':'','position':{}};
        },
        //開啟彈跳視窗
        openHover:function(pt_name,pst_name,date,user,e){
            let self = this;
            self.hoverwrap.title = pt_name;
            self.hoverwrap.subtitle = pst_name;
            if(date){
                self.hoverwrap.date = date;
            }else{
                self.hoverwrap.date = '尚未設定';
            }
            if(user){
                self.hoverwrap.user = user;
            }else{
                self.hoverwrap.user = '待排程';
            }
            self.hoverwrap.position.x=e.x;
            self.hoverwrap.position.y=e.y;
        },
        //判斷是否開啟彈跳視窗
        checkToOpenHover:function(){
            let self = this;
            var boolean = true;
            if(self.hoverwrap.title == ''){
                return false;
            }else if(self.hoverwrap.subtitle == ''){
                return false;
            }else if(self.hoverwrap.date == ''){
                return false;
            }
            return boolean;
        },
        //打開月曆
        openCalendar:function(){
            let self = this;
            self.index.read_more = true;
            var cd = new Date();
            self.index.now_page_year = cd.getFullYear();
            self.index.now_page_month = cd.getMonth();
            self.index.today.year = cd.getFullYear();
            self.index.today.month = cd.getMonth();
            self.index.today.day = cd.getDate();
            self.getOneMonthProjectData();
        },
        //切換月份
        changeMonth:function(type){
            let self = this;
            var cd = new Date();
            if(type == 'pre'){
                if(self.index.now_page_month == 0){
                    self.index.now_page_year = self.index.now_page_year - 1;
                    self.index.now_page_month = 11;
                }else{
                    self.index.now_page_month = self.index.now_page_month - 1;
                }
            }else if(type == 'today'){
                self.index.now_page_year = cd.getFullYear();
                self.index.now_page_month = cd.getMonth();
            }else if(type == 'next'){
                if(self.index.now_page_month == 11){
                    self.index.now_page_year = self.index.now_page_year + 1;
                    self.index.now_page_month = 0;
                }else{
                    self.index.now_page_month = self.index.now_page_month + 1;
                }
            }
            self.getOneMonthProjectData();
        },
        //如果未達某位數就補0
        zeroPadding:function(num, digit){
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        //時鐘要素
        updateTime:function(){
            let self = this;
            var cd = new Date();
            self.index.time = self.zeroPadding(cd.getHours(), 2) + ':' + self.zeroPadding(cd.getMinutes(), 2) + ':' + self.zeroPadding(cd.getSeconds(), 2);
            self.index.date = self.zeroPadding(cd.getFullYear(), 4) + '/' + self.zeroPadding(cd.getMonth()+1, 2) + '/' + self.zeroPadding(cd.getDate(), 2);
        },
        //取得當周每天的年月日
        getDaysOfWeek:function(){
            let self = this;
            var currentDate = new Date();
            var timesStamp = currentDate.getTime();
            var currenDay = currentDate.getDay();
            var dates = [];
            for (var i = 0; i < 7; i++) {
                var json = {};
                json.year = 1900 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getYear();
                json.month = self.index.month_en[new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getMonth()];
                json.day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getDate();
                json.week = self.index.week_cn[new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getDay()]
                dates.push(json);
            }
            return dates;
        },
        //取得某年某月的天數
        daysMonth:function(month, year) {
            let self = this;
            var tmp = year % 4;
            if (tmp == 0) {
                return (self.index.month_olympic[month]);
            } else {
                return (self.index.month_normal[month]);
            }
        },
        //取得某年某月第一天是星期幾
        dayStart:function(month, year) {
            var tmpDate = new Date(year, month, 1);
            return (tmpDate.getDay());
        },
        //變更排序方式
        changeUserSort:function(order){
            let self = this;
            if(self.account.user_order == order){
                if(self.account.user_sort == 'DESC'){
                    self.account.user_sort = 'ASC';
                    self.getUsers();
                }else{
                    self.account.user_sort = 'DESC';
                    self.getUsers();
                }
            }else{
                self.account.user_order = order;
                self.account.user_sort = 'DESC';
                self.getUsers();
            }
        },
        //變更排序方式
        changeAuthSort:function(order){
            let self = this;
            if(self.account.auth_order == order){
                if(self.account.auth_sort == 'DESC'){
                    self.account.auth_sort = 'ASC';
                    self.getAuths();
                }else{
                    self.account.auth_sort = 'DESC';
                    self.getAuths();
                }
            }else{
                self.account.auth_order = order;
                self.account.auth_sort = 'DESC';
                self.getAuths();
            }
        },
        //關閉新增子任務與主任務的欄位
        closeProjectInput:function(){
            let self = this;
            self.project.create_project_status=false;//新增專案任務區塊 顯示與否
            self.project.create_subproject_status=false;//新增專案子任務區塊 顯示與否
        },
        colseUserTagWrap:function(e){
            let self = this;
            var classname = e.target.className;
            var array = ['user_tag_item'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if(classname.match(array[i])){
                    boolean = false;
                }
            }
            if(boolean){
                self.project.add_user_tag_open = false;
                self.project.tag_data = {};
                $('#TT_MASK').hide();
                self.image_url = '';
                self.project.tag_search_udname= '';
            }
        },
        //關閉自訂標籤的視窗
        closeTagWrap:function(){
            let self = this;
            self.project.create_tag_open = false;
            self.image_url = '';
            self.project.tag_data = {};
            $('.create_tag_wrap input[name=tm_name]').val('')
        },
        //////////////////// 單一框設定 ////////////////////
        ///
        //關閉單一顯示頁
        closeSinglePage:function(obj){
            let self = this;
            if(obj){
                self.init();
                self.single = {'userdata':'','type':'','id':'','cate':'','group':''}
            }
        },
        //開啟單一顯示頁
        openSinglePage:function(user,type,id,cate,group = 0){
            let self = this;
            self.single.userdata = user;
            self.single.type = type;
            self.single.id = id;
            self.single.cate = cate;
            self.single.group = group;
        },
        //判斷是否開啟單一顯示頁
        checkToOpenSingle:function(){
            let self = this;
            var boolean = true;
            if(self.single.type == ''){
                return false;
            }else if(self.single.id == ''){
                return false;
            }else if(self.single.cate == ''){
                return false;
            }
            return boolean;
        },
        showAllSubprojectsOrNot:function(boolean){
            let self = this;
            if(boolean){
                $('.sub_item').removeClass('hidden');
            }else{
                $('.sub_item').addClass('hidden');
            }
        },
        showSubProject:function(e,id){
            let self = this;
            var classname = e.target.className;
            var array_a = ['cell']; // 點擊範圍
            var array_b = ['dropdown_item'];
            var boolean = true;
            var string = '.list'+id;
            for (var i = 0; i < array_a.length; i++) {
                if(!classname.match(array_a[i])){
                    boolean = false;
                }
            }
            for (var i = 0; i < array_b.length; i++) {
                if(classname.match(array_b[i])){
                    boolean = false;
                }
            }
            if(boolean){
                if($(string).find('.sub_item').hasClass('hidden')){
                    $(string).find('.sub_item').removeClass('hidden');
                }else{
                    $(string).find('.sub_item').addClass('hidden');
                }
            }
        },
        ///
        //////////////////// 單一框設定 end ////////////////////

        ////////////////////////拖拉功能////////////////////////
        ///
        ///
        ///
        //拖拉功能
        drag:function(type,id){
            let self = this;
            var json = {};
            //如果拖拉主任務，就是連同底下的子任務都一起拖拉
            if(type == 'pt_id'){
                json.pt_id = id;
            //如果拖拉子任務，就只有單一子任務拖拉
            }
            self.project.drag_data = json;
        },
        dragOrNot:function(){
            let self = this;
            if(self.user_status.ud_admin || self.user_auth.pt_admin){
                return true;
            }else{
                return false;
            }
        },
        dragend:function(){
            let self = this;
            self.project.drag_data = {};
        },
        drop:function(id){
            let self = this;
            self.project.drag_data.tm_id = id;
            self.project.drag_data.is_show = 1;
            self.project.drag_data.ug_id = self.project.project_ug_id;
            axios.post('/project-modify/1',self.project.drag_data) //修改 專案任務的標籤
                .then(function (response) {
                    if(response.data.result){
                        self.getProjects();
                        self.notification(response.data.string,'success');
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //我們必須阻止某一DOM元素對dragover的默認行為，才能使drop事件在其上正確執行
        allowDrop:function(event){
            event.preventDefault();
        },
        comingsoon:function(id){
            let self = this;
            self.project.drag_over_pst_id = id;
        },
        //拖拉對調順序
        dragToChangeProjectSort:function(style,pt_id,pst_id){
            let self = this;
            if(style == 'start'){
                self.project.drag_pt_id = pt_id;
                self.project.drag_pst_id = pst_id;
            }else if(style == 'drop'){
                if(self.project.drag_pt_id == pt_id && self.project.drag_pst_id != pst_id){
                    var sort = '';
                    var dragTargetIndex = '';
                    var dropTargetIndex = '';
                    var pss_id = '';
                    //先取得是哪個專案底下的子任務排序列表
                    for(var i = 0;i<self.project.subprojectsort_cate.length;i++){
                        if(self.project.subprojectsort_cate[i].pt_id == pt_id){
                            sort = JSON.parse(self.project.subprojectsort_cate[i].pss_sort);
                            pss_id = self.project.subprojectsort_cate[i].pss_id;
                        }
                    }
                    var newsort = [];
                    //抓取拖拉的目標以及要前往的目標的排序第幾順位
                    for(var i = 0;i<sort.length;i++){
                        if(sort[i] == self.project.drag_pst_id){
                            dragTargetIndex = i;
                        }else if(sort[i] == pst_id){
                            dropTargetIndex = i;
                        }
                    }
                    //排出新的排序列表
                    for(var i = 0;i<sort.length;i++){
                        //拖拉目標往後移動
                        if(dragTargetIndex < dropTargetIndex){
                            if(sort[i] == self.project.drag_pst_id){

                            }else{
                                if(sort[i] == pst_id){
                                    newsort.push(sort[i]);
                                    newsort.push(self.project.drag_pst_id);
                                }else{
                                    newsort.push(sort[i]);
                                }
                            }
                        //拖拉目標往前移動
                        }else if(dragTargetIndex > dropTargetIndex){
                            if(sort[i] == self.project.drag_pst_id){

                            }else{
                                if(sort[i] == pst_id){
                                    newsort.push(self.project.drag_pst_id);
                                    newsort.push(sort[i]);
                                }else{
                                    newsort.push(sort[i]);
                                }
                            }
                        //拖拉目標並沒有移動
                        }else{
                            newsort.push(sort[i]);
                        }
                    }
                    //儲存新的排序列表
                    var json = {};
                    json.pss_id = pss_id;
                    json.pss_sort = JSON.stringify(newsort);
                    axios.post('/project-sort-modify',json) //修改 - 子任務排序
                        .then(function (response) {
                            if(response.data.result){
                                self.getSubProjects();
                                self.getSubProjectsSortCate();
                            }else{
                                self.notification(response.data.string,'failure');
                            }
                        })
                        .catch(function (response) {
                            self.notification('系統出錯','failure');
                        });
                }
            }else if(style == 'end'){
                self.project.drag_pt_id = '';
                self.project.drag_pst_id = '';
                self.project.drag_over_pst_id = '';
            }
        },
        ///
        ///
        ///
        ////////////////////////拖拉功能 end////////////////////////

        ////////////////////////右鍵功能////////////////////////
        ///
        ///
        ///
        //右鍵功能 - 修改標籤
        modifyTagStyle:function(){
            let self = this;
            self.project.create_tag_open = true;
            self.project.tag_type = 'modify';
            $('#TT_MASK').hide();
        },
        //右鍵功能 - 刪除標籤
        deleteTagStyle:function(){
            let self = this;
            self.openDeletePromptBox(self.project.tag_data.tm_id,5);
        },
        //右鍵功能 - 新增人員
        openUserTagWrap:function(){
            let self = this;
            self.getUserInThisTag();
            self.project.add_user_tag_open = true;
        },
        //將被點擊右鍵的自訂標籤資料存起來
        updateTagData:function(id,url,name){
            let self = this;
            self.project.tag_data.tm_id = id;
            self.project.tag_data.tm_url = url;
            self.image_url = url;
            self.project.tag_data.tm_name = name;
        },
        ///
        ///
        ///
        ////////////////////////右鍵功能 end////////////////////////

        ////////////////////////查詢功能////////////////////////
        ///
        //查詢功能
        search: function () {
            let self = this;
            setTimeout(function(){
                if(self.composing){
                    if(self.url_show_block == "book-list"){
                        self.search_condition.book_content = $('input[name=search_content]').val();
                    }else if(self.url_show_block == 'announcement-list'){
                        self.search_condition.ann_content = $('input[name=search_content]').val();
                    }else if(self.url_show_block == 'account-list'){
                        if(self.account.sub_nav=='account_management'){
                            self.search_condition.user_content = $('input[name=search_content]').val();
                        }else if(self.account.sub_nav=='authority_level'){
                            self.search_condition.auth_content = $('input[name=search_content]').val();
                        }
                    }else if(self.url_show_block == 'property-list'){
                        self.search_condition.property_content = $('input[name=search_content]').val();
                    }else if(!isNaN(self.url_show_block)){
                        self.search_condition.pro_content = $('input[name=search_content]').val();
                    }
                }
            },10)
        },
        //查詢不在此標籤內的使用者
        searchUser:function(){
            let self = this;
            setTimeout(function(){
                if(self.composing){
                    var json = {};
                    json.ud_name = $('.tag_input input[name=ud_name]').val();
                    json.tm_id = self.project.tag_data.tm_id;
                    self.project.tag_search_udname = $('.tag_input input[name=ud_name]').val();
                    axios.post('/userinthistag',json)
                        .then(function (response) {
                            self.project.tag_user_data = response.data;
                        })
                        .catch(function (response) {
                            self.notification('系統出錯','failure');
                        });
                }
            },10)
        },
        //監聽搜尋框 注音輸入開始
        listen_input_start:function(){
            let self = this;
            self.composing = false;
        },
        //監聽搜尋框 注音輸入結束
        listen_input_end:function(){
            let self = this;
            self.composing = true;
        },
        //清除搜尋資料
        clearSearchCondition:function(){
            let self = this;
            self.search_condition= {
                book_content: '',
                ann_content: '',
                user_content: '',
                auth_content: '',
                property_content: '',
                pro_content: '',
            };
        },
        ///
        ////////////////////////查詢功能 end////////////////////

        ////////////////////////下拉功能////////////////////////
        ///
        //關閉月曆
        closeDateTimePicker:function(obj){
            let self = this;
            if(obj){
                self.closeAllDropdownMenu();
            }
        },
        //判斷是否開啟下拉選單
        checkToOpenDropDown:function(item,type,id){
            let self = this;
            if(self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id){
                return true;
            }else{
                return false;
            }
        },
        //打開列表頁的下拉選單
        openDropdownMenu:function(item,type,id,e){

            let self = this;
            var classname = e.target.className;
            var string = 'dropdown_item';
            var boolean = false;

            if(classname.match(string)){
                boolean = true;
            }
            var index_height = $(window).height();
            if(index_height - e.y < 400){
                self.top_or_bottom = true;
            }else{
                self.top_or_bottom = false;
            }
            
            var json = {};
            json.x = e.x;
            json.y = e.y;
            if(boolean){
                if(self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id){
                    self.closeAllDropdownMenu();
                }else{
                    self.dropdown.item = item;
                    self.dropdown.type = type;
                    self.dropdown.id = id;
                    self.dropdown.position = json;
                }
            }
        },
        //關閉所有彈出的下拉選單
        closeAllDropdownMenu:function(){
            let self = this;
            self.dropdown.item ='';
            self.dropdown.type ='';
            self.dropdown.id ='';
            self.dropdown.position ='';
        },
        ///
        ////////////////////////下拉功能 end/////////////////////

        //////////////////// 上傳圖片 ////////////////////
        ///
        //新增自訂標籤的圖片
        getFile(file, fileList) {
            let self = this;
            const isLt2M = file.size / 1024 / 1024 < 1;
            var str = file.name;
            var res = str.split(".");
            var isImage = false;
            if(res.length > 0){
                if(res[res.length-1] == 'png' || res[res.length-1] == 'jpg' || res[res.length-1] == 'jpeg'){
                    isImage = true;
                }
            }
            if(!isLt2M){
                self.notification('圖片大小不能超過1M','failure');
            }else if(!isImage){
                self.notification('上傳標籤圖示只能是JPG或PNG格式','failure');
            }else{
                this.getBase64(file.raw).then(res => {
                    self.image_url = res;
                });
            }
        },
        //將圖片轉成base64
        getBase64(file) {
            return new Promise(function(resolve, reject) {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function() {
                    imgResult = reader.result;
                };
                reader.onerror = function(error) {
                    reject(error);
                };
                reader.onloadend = function() {
                    resolve(imgResult);
                };
            });
        },
        ///
        //////////////////// 上傳圖片 end ////////////////////

        ////////////////////////取值專區 ////////////////////////
        ///
        //取得子任務排序資料
        getSubProjectsSortCate:function(){
            let self = this;
            axios.get('/subprojectsortcate')
                .then(function (response) {
                    self.project.subprojectsort_cate = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得執行項目資料
        getExecuteitemCate:function(){
            let self = this;
            axios.get('/executeitemcate')
                .then(function (response) {
                    self.project.executeitem_cate = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得狀態資料
        getStatusCate:function(){
            let self = this;
            axios.get('/statuscate')
                .then(function (response) {
                    self.project.status_cate = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //優先顯示加入最愛的專案
        showFavoriteFirst:function($pt_id){
            let self = this;
            for (var i = 0; i < self.project.user_favorites.length; i++) {
                if(self.project.user_favorites[i].pt_id == $pt_id){
                    return true;
                }
            }
        },
        //取得使用者自定義標籤
        getUserTags:function(){
            let self = this;
            var json = {};
            json.ud_id = self.user_status.ud_id;
            axios.post('/usertags',json)
                .then(function (response) {
                    self.project.user_tags = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得使用者專案最愛
        getUserFavorites:function(){
            let self = this;
            //取得該使用者加最愛的專案
            axios.post('/userfavorites',self.user_status)
                .then(function (response) {
                    self.project.user_favorites = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得專案任務資料
        getProjects:function(){
            let self = this;
            axios.post('/projects')
                .then(function (response) {
                    self.project.projects = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一專案任務底下所有的子任務資料
        getSubProjects:function(){
            let self = this;
            axios.get('/subprojects')
                .then(function (response) {
                    if(!self.user_status.ud_admin && !self.user_auth.pt_admin && self.project.sub_projects.length == 0){
                        var string = '';
                        // self.sub_projects = [];
                        for (var i = 0; i < response.data.length; i++) {
                            if(string != response.data[i].pt_id){
                                string = response.data[i].pt_id;
                                var json = {};
                                json.pt_id = string;
                                axios.post('/getsubprojectsofproject',json)
                                    .then(function (response) {
                                        self.project.sub_projects = self.project.sub_projects.concat(response.data);
                                    })
                                    .catch(function (response) {
                                        self.notification('系統出錯','failure');
                                    });
                            }
                        }
                        // self.sub_projects = array_a;
                    }else if(self.user_status.ud_admin || self.user_auth.pt_admin){
                        self.project.sub_projects = response.data;
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得某標籤裡的成員資料
        getUserInThisTag:function(){
            let self = this;
            var json = {};
            json.tm_id = self.project.tag_data.tm_id;
            axios.post('/userinthistag',json)
                .then(function (response) {
                    self.project.tag_user_data = response.data;
                    for (var i = 0; i < self.project.tag_user_data.length; i++) {
                        if(self.project.tag_user_data[i].trm_owner){
                            self.project.tag_owner_id = self.project.tag_user_data[i].ud_id;
                        }
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得資產列表資訊
        getPropertys:function(){
            let self = this;
            axios.get('/propertys')
                .then(function (response) {
                    self.property.data_propertys = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得全部權限等級資料
        getAuths:function(){
            let self = this;
            var json = {};
            json.order = self.account.auth_order;
            json.sort = self.account.auth_sort;
            axios.post('/auths',json)
                .then(function (response) {
                    self.account.auths = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得全部使用者資料
        getUsers:function(){
            let self = this;
            var json = {};
            json.order = self.account.user_order;
            json.sort = self.account.user_sort;
            axios.post('/users',json)
                .then(function (response) {
                    self.account.users = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得公告列表資訊
        getAnns:function(id){
            let self = this;
            axios.get('/companyanns/'+id)
                .then(function (response) {
                    self.announcement.data_anns = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得書籍列表資訊
        getBooks:function(){
            let self = this;
            axios.get('/books')
                .then(function (response) {
                    if(response.data.length > 0){
                        self.book.data_books = response.data;
                        self.book.book_infor = self.book.data_books[0];
                        self.getBorrowing(self.book.data_books[0].bi_id);
                    }else{
                        self.book.book_infor = {};
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一書籍資訊
        getBook:function(id){
            let self = this;
            axios.get('/book/'+id)
                .then(function (response) {
                    self.book.book_infor = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得某書籍借閱紀錄
        getBorrowing:function(id){
            let self = this;
            axios.get('/borrowing/'+id)
                .then(function (response) {
                    self.book.data_bookborrows = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得書籍分類
        getBookSort:function(){
            let self = this;
            axios.get('/booksort')
                .then(function (response) {
                    self.book.data_booksorts = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得書籍狀態
        getBookStatusCate:function(){
            let self = this;
            axios.get('/bookstatuscate')
                .then(function (response) {
                    self.book.cate_bookstatus = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得所有使用者
        getUserCate:function(){
            let self = this;
            axios.get('/users')
                .then(function (response) {
                    self.user_cate = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //取得系統連結資料
        getUrls:function(){
            let self = this;
            axios.get('/urls')
                .then(function (response) {
                    if(response.data){
                        self.index.system_urls = response.data;
                    }else{
                        self.notification('無法取得全部資料，請重新登入。','failure');
                    }
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        //取得某年某月資料
        getOneMonthProjectData:function(){
            let self = this;
            var json = {};
            json.year = self.index.now_page_year;
            json.month = self.index.now_page_month;
            axios.post('/onemonthproject',json)
                .then(function (response) {
                    if(response.data){
                        self.index.sub_projects_month = response.data;
                    }else{
                        self.notification('無法取得當月資料，請重新登入。','failure');
                    }
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        //取得當週資料
        getOneWeekProjectData:function(){
            let self = this;
            var json = {};
            json.firstday = self.index.firstday;
            json.lastday = self.index.lastday;

            axios.post('/oneweekproject',json)
                .then(function (response) {
                    if(response.data){
                        self.index.sub_projects_week = response.data;
                    }else{
                        self.notification('無法取得當週資料，請重新登入。','failure');
                    }
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        //取得該使用者全部資料
        getAllUserProjectData:function(){
            let self = this;
            axios.get('/allusersubproject')
                .then(function (response) {
                    if(response.data){
                        self.index.sub_projects_all = response.data;
                    }else{
                        self.notification('無法取得全部資料，請重新登入。','failure');
                    }
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        ///
        ////////////////////////取值專區 end////////////////////////
        
        ////////////////////////其他有用功能////////////////////////
        ///
        //移除秒數
        removeSecond:function(date){
            let self = this;
            var d = new Date(date);
            var year = d.getFullYear();
            var month = (d.getMonth()+1);
            if(month < 10){
                month = '0'+month;
            }
            var day = d.getDate();
            if(day < 10){
                day = '0'+day;
            }
            var hour = d.getHours();
            if(hour < 10){
                hour = '0'+hour;
            }
            var minute = d.getMinutes();
            if(minute < 10){
                minute = '0'+minute;
            }
            var datetime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
            return datetime;
        },
        //關閉所有打開的區塊或視窗或是重置任何數值
        closeAll:function(){
            let self = this;
            self.dropdown.item ='';
            self.dropdown.type ='';
            self.dropdown.id ='';
            self.dropdown.position ='';

            self.book.create_book_open = false;
            self.book.create_book_data = {};
            self.property.create_property_open = false;
            self.property.create_property_data = {};
            self.announcement.create_ann_open = false;

            $('.content_wrap').removeClass('modify');
            $('.content_text input').addClass('none');
            $('.content_text span').removeClass('none');
            //後續還有可以繼續新增
        },
        //點擊目標以外地方關閉所有下拉
        colseIfClickOutside:function(e){
            let self = this;
            var classname = e.target.className;
            var array = ['dropdown_item','dd_wrap'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if(classname.match(array[i])){
                    boolean = false;
                }
            }
            if(boolean){
                self.closeAll();
            }
        },
        //顯示某個欄位的input並且開始修改
        showThisFieldInput:function(field,id){
            let self = this;
            var target = '.list'+id;
            $('.content_wrap').removeClass('modify');
            $('.content_text input').addClass('none');
            $('.content_text span').removeClass('none');
            $(target).find('.'+field).find('span').addClass('none');
            $(target).find('.'+field).find('input').removeClass('none');
            $(target).addClass('modify')
        },
        //選擇這本書
        selectThisBook:function(id,name){
            let self = this;
            self.getBook(id);
            self.getBorrowing(id);
        },
        //切換其他書籍分類
        changeBookSort:function(id,name){
            let self = this;
            self.book.book_infor = {};
            self.book.book_infor.bs_id = id;
            self.book.book_infor.bs_name = name;
            self.book.data_bookborrows = [];
        },
        ///
        ////////////////////////其他有用功能 end////////////////////////

        //////////////////// 推播框設定 ////////////////////
        ///
        //推撥提示框
        notification:function(string,type){
            if(type == 'success'){
                var block = "<div class='remove_wrapper success'><i class='fa fa-check'></i><span>"+string+"</span></div>";
                $('.notification_wrap').append(block);
                $('.remove_wrapper').hover(function(){
                    $(this).remove()
                })
                setTimeout(function(){
                   $('.remove_wrapper').remove();
                }, 3000);
            }else if(type == 'failure'){
                var block = "<div class='remove_wrapper failure'><i class='fa fa-times'></i><span>"+string+"</span></div>";
                $('.notification_wrap').append(block);
                $('.remove_wrapper').hover(function(){
                    $(this).remove()
                })
                setTimeout(function(){
                   $('.remove_wrapper').remove();
                }, 3000);
            }
        },
        //彈出提示框
        prompt:function(string,type,boolean){//string：要提示的字串，type：提示框的類型，boolean：是否要重整頁面
            let self = this;
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_title').find('h2').text(string);
            if(type == 'question'){
                $('.prompt_icon').find('i').removeClass('fa-check');
                $('.prompt_icon').find('i').removeClass('fa-times');
                $('.prompt_icon').find('i').addClass('fa-question');
                $('.prompt_btn_group').find('.btn_cancel').show();
                $('.prompt_btn_group').find('.btn_submit').show();
                $('.prompt_btn_group').find('p').hide();
            }else if(type == 'success'){
                $('.prompt_icon').find('i').removeClass('fa-question');
                $('.prompt_icon').find('i').removeClass('fa-times');
                $('.prompt_icon').find('i').addClass('fa-check');
                $('.prompt_btn_group').find('.btn_cancel').hide();
                $('.prompt_btn_group').find('.btn_submit').hide();
                $('.prompt_btn_group').find('p').show();
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function(){
                    $('.prompt_btn_group span').text(n-1);
                    setTimeout(function(){
                        $('.prompt_btn_group span').text(n-2);
                        setTimeout(function(){
                            if(boolean){
                                self.closePrompt();
                                // self.init(true);
                            }else{
                                self.closePrompt();
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            }else if(type == 'failure'){
                $('.prompt_icon').find('i').removeClass('fa-check');
                $('.prompt_icon').find('i').removeClass('fa-question');
                $('.prompt_icon').find('i').addClass('fa-times');
                $('.prompt_btn_group').find('.btn_cancel').hide();
                $('.prompt_btn_group').find('.btn_submit').hide();
                $('.prompt_btn_group').find('p').show();
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function(){
                    $('.prompt_btn_group span').text(n-1);
                    setTimeout(function(){
                        $('.prompt_btn_group span').text(n-2);
                        setTimeout(function(){
                            if(boolean){
                                self.closePrompt();
                                // self.init(true);
                            }else{
                                self.closePrompt();
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
            self.prompt_box_open = true;
            $('html').addClass('over_hidden');
        },
        closePrompt:function(){
            let self = this;
            self.prompt_box_open = false;
            $('html').removeClass('over_hidden');
        },
        ///
        //////////////////// 推播框設定 end ////////////////////

        ////////////////////////新增區塊////////////////////////
        ///
        //新增專案任務
        createProject:function(){
            let self = this;
            var json = {};
            if($('input[name=pt_name]').val() != ''){
                json.pt_name = $('input[name=pt_name]').val();
            }else{
                self.notification('請填入主任務名稱','failure');
                return false;
            }
            json.ug_id = self.project.project_ug_id;
            if(self.project.sub_nav != 'all' && self.project.sub_nav != 'wait'){
                json.tm_id = self.project.sub_nav;
            }else if(self.project.sub_nav == 'wait'){
                json.is_show = 0;
            }
            axios.post('/project-create/1',json) //新增 - 專案主任務
                .then(function (response) {
                    if(response.data.result){
                        self.openSinglePage(self.user_status,'pt',response.data.id,1,self.project.project_ug_id);
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //新增標籤
        createTag:function(){
            let self = this;
            var json = {};
            var tm_name = $('.create_tag_wrap input[name=tm_name]').val();
            var tm_url = self.image_url;
            if(tm_name == ''){
                self.notification('請填入標籤名稱','failure');
            }else if(tm_name.length > 4){
                self.notification('標籤名稱字數不能超過4位','failure');
            }else if(tm_url == ''){
                self.notification('請傳入標籤圖示','failure');
            }else{
                json.tm_name = tm_name;
                json.tm_url = tm_url;
                json.ug_id = self.project.project_ug_id;
                json.ud_id = self.user_status.ud_id;
                axios.post('/project-create/5',json) //新增 - 標籤
                    .then(function (response) {
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                            self.closeTagWrap();
                            self.getUserTags();
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.notification('系統出錯','failure');
                    });
            }
        },
        //新增專案子任務
        createSubProject:function(pt_id){
            let self = this;
            var json = {};
            json.pt_id = pt_id;
            if($('.create_subproject input[name=pst_name]').val() != ''){
                json.pst_name = $('.create_subproject input[name=pst_name]').val();
            }else{
                self.notification('請填入子任務名稱','failure');
                return false;
            }
            axios.post('/project-create/2',json) //新增 - 專案子任務
                .then(function (response) {
                    if(response.data.result){
                        self.getSubProjects();
                        self.getSubProjectsSortCate();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //新增使用者最愛
        createFavorite:function(pt_id){
            let self = this;
            var arraydata = {};
            arraydata.pt_id = pt_id;
            arraydata.ud_id = self.user_status.ud_id;
            axios.post('/user-create/2',arraydata) //新增 - 使用者最愛
                .then(function (response) {
                    if(response.data.result){
                        self.getProjects();
                        self.getSubProjects();
                        self.getUserFavorites();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //新增使用者到此標籤
        addUserToThisTag:function(ud_id){
            let self = this;
            var json = {};
            json.ud_id = ud_id;
            json.tm_id = self.project.tag_data.tm_id;
            axios.post('/user-to-tag-create',json)
                .then(function (response) {
                    if(response.data.result){
                        self.notification(response.data.string,'success');
                        self.getUserInThisTag();
                        $('.tag_input input[name=ud_name]').val('');
                        self.project.tag_search_udname = '';
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //新增資產
        createProperty:function(){
            let self = this;
            var json = {};
            if(self.property.create_property_data.ud_id){
                json.ud_id = self.property.create_property_data.ud_id;
            }else{
                self.notification('請選擇人員','failure');
                return false;
            }
            if($('.new_asset input[name=pm_host]').val() != ''){
                json.pm_host = $('.new_asset input[name=pm_host]').val();
            }
            if($('.new_asset input[name=pm_screenone]').val() != ''){
                json.pm_screenone = $('.new_asset input[name=pm_screenone]').val();
            }
            if($('.new_asset input[name=pm_screentwo]').val() != ''){
                json.pm_screentwo = $('.new_asset input[name=pm_screentwo]').val();
            }
            if($('.new_asset input[name=pm_telephone]').val() != ''){
                json.pm_telephone = $('.new_asset input[name=pm_telephone]').val();
            }
            if($('.new_asset input[name=pm_canvas]').val() != ''){
                json.pm_canvas = $('.new_asset input[name=pm_canvas]').val();
            }
            if($('.new_asset input[name=pm_other]').val() != ''){
                json.pm_other = $('.new_asset input[name=pm_other]').val();
            }
            if($('.new_asset input[name=pm_adobe]').val() != ''){
                json.pm_adobe = $('.new_asset input[name=pm_adobe]').val();
            }
            axios.post('/property-create/6',json) //新增 - 資產管理
                .then(function (response) {
                    if(response.data.result){
                        self.closeAll();
                        self.getPropertys();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //新增借閱紀錄
        createBorrowing:function(){
            let self = this;
            var json = {};
            json.bi_id = self.book.book_infor.bi_id;
            if(self.book.create_book_data.ud_id){
                json.ud_id = self.book.create_book_data.ud_id;
            }else{
                self.notification('請選擇借閱人','failure');
                return false;
            }
            if(self.book.create_book_data.bbr_borrowingdate){
                json.bbr_borrowingdate = self.book.create_book_data.bbr_borrowingdate;
            }else{
                self.notification('請選擇借閱日期','failure');
                return false;
            }
            if(self.book.create_book_data.bbr_returndate){
                json.bbr_returndate = self.book.create_book_data.bbr_returndate;

            }
            axios.post('/book-create/3',json) //新增 - 書籍借閱
                .then(function (response) {
                    if(response.data.result){
                        self.closeAll();
                        self.getBorrowing(self.book.book_infor.bi_id);
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //設定借閱時間
        createBorrowingDate:function(obj){
            let self = this;
            self.book.create_book_data.bbr_borrowingdate = obj.date;
        },
        //設定歸還時間
        createReturnDate:function(obj){
            let self = this;
            self.book.create_book_data.bbr_returndate = obj.date;
        },
        //新增公告
        createAnn:function(){
            let self = this;
            var json = {};
            if($('input[name=ai_title]').val() != ''){
                json.ai_title = $('input[name=ai_title]').val();
            }else{
                self.notification('請填入公告標題','failure');
                return false;
            }
            json.ug_id = self.announcement.sub_nav;
            if(self.announcement.sub_nav == 0){
                json.ai_cate = 2;
            }else{
                json.ai_cate = 1;
            }
            axios.post('/announcement-create/1',json) //新增 - 公告資訊
                .then(function (response) {
                    if(response.data.result){
                        $('input[name=ai_title]').val('');
                        //關閉新增公告區塊
                        self.announcement.create_ann_open = false;
                        //開啟單一公告頁
                        self.openSinglePage(self.user_status,'ai',response.data.id,3)
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        ///
        //////////////////// 新增區塊 end ////////////////////

        ////////////////////////修改區塊////////////////////////
        ///
        //修改標籤
        changeTagStyle:function(){
            let self = this;
            var json = {};
            var tm_name = $('.create_tag_wrap input[name=tm_name]').val();
            var tm_url = self.image_url;
            if(tm_name == ''){
                self.notification('請填入標籤名稱','failure');
            }else if(tm_name.length > 4){
                self.notification('標籤名稱字數不能超過4位','failure');
            }else if(tm_url == ''){
                self.notification('請傳入標籤圖示','failure');
            }else{
                json.tm_id = self.project.tag_data.tm_id;
                json.tm_name = tm_name;
                json.tm_url = tm_url;
                json.ug_id = self.project.project_ug_id;
                axios.post('/project-modify/5',json) //修改 - 標籤
                    .then(function (response) {
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                            self.closeTagWrap();
                            self.getUserTags();
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.notification('系統出錯','failure');
                    });
            }
        },
        //修改執行項目
        changeExecuteItem:function(pst_id,peic_id){
            let self = this;
            var arraydata = {};
            arraydata.pst_id = pst_id;
            arraydata.peic_id = peic_id;
            axios.post('/project-modify/2',arraydata) //修改 - 專案子任務
                .then(function (response) {
                    if(response.data.result){
                        self.getSubProjects();
                        self.closeAllDropdownMenu();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                    self.closeAllDropdownMenu();
                });
        },
        //修改狀態
        changeStatus:function(pst_id,psc_id){
            let self = this
            var arraydata = {};
            arraydata.pst_id = pst_id;
            arraydata.psc_id = psc_id;
            axios.post('/project-modify/2',arraydata) //修改 - 專案子任務
                .then(function (response) {
                    if(response.data.result){
                        self.getSubProjects();
                        self.closeAllDropdownMenu();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                    self.closeAllDropdownMenu();
                });
        },
        //修改執行人
        changeUser:function(pst_id,ud_id){
            let self = this;
            var arraydata = {};
            arraydata.pst_id = pst_id;
            arraydata.ud_id = ud_id;
            axios.post('/project-modify/2',arraydata) //修改 - 專案子任務
                .then(function (response) {
                    if(response.data.result){
                        self.getSubProjects();
                        self.closeAllDropdownMenu();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                    self.closeAllDropdownMenu();
                });
        },
        //修改需求日期
        changeRequireDate:function(obj){
            let self = this;
            var arraydata = {};
            if(obj.pt_id){
                arraydata.pt_id = obj.pt_id;
                arraydata.pt_requiredate = obj.date;
                axios.post('/project-modify/1',arraydata) //修改 - 專案主任務
                    .then(function (response) {
                        if(response.data.result){
                            self.getProjects();
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.notification('系統出錯','failure');
                    });
            }else if(obj.pst_id){
                arraydata.pst_id = obj.pst_id;
                arraydata.pst_requiredate = obj.date;
                axios.post('/project-modify/2',arraydata) //修改 - 專案子任務
                    .then(function (response) {
                        if(response.data.result){
                            self.getSubProjects();
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.notification('系統出錯','failure');
                    });
            }
        },
        //修改執行日期
        changeExecutiondate:function(obj){
            let self = this;
            var arraydata = {};
            arraydata.pst_id = obj.pst_id;
            arraydata.pst_executiondate = obj.date;
            axios.post('/project-modify/2',arraydata) //修改 - 專案子任務
                .then(function (response) {
                    if(response.data.result){
                        self.getSubProjects();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //修改完成日期
        changeCompletiondate:function(obj){
            let self = this;
            var arraydata = {};
            arraydata.pst_id = obj.pst_id;
            arraydata.pst_completiondate = obj.date;
            axios.post('/project-modify/2',arraydata) //修改 - 專案子任務
                .then(function (response) {
                    if(response.data.result){
                        self.getSubProjects();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //修改資產人員
        changePropertyUser:function(pm_id,ud_id){
            let self = this;
            var json = {};
            json.pm_id = pm_id;
            json.ud_id = ud_id;
            axios.post('/property-modify/6',json) //修改 - 資產管理
                .then(function (response) {
                    if(response.data.result){
                        self.getPropertys();
                        self.closeAllDropdownMenu();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                    self.closeAllDropdownMenu();
                });
        },
        //修改某資產欄位資料
        changePropertyThisField:function(field,id){
            let self = this;
            var json = {};
            var target = '.list'+id
            if(field == 'pm_host'){
                json.pm_host = $(target).find('.'+field).find('input').val();
            }else if(field == 'pm_screenone'){
                json.pm_screenone = $(target).find('.'+field).find('input').val();
            }else if(field == 'pm_screentwo'){
                json.pm_screentwo = $(target).find('.'+field).find('input').val();
            }else if(field == 'pm_telephone'){
                json.pm_telephone = $(target).find('.'+field).find('input').val();
            }else if(field == 'pm_canvas'){
                json.pm_canvas = $(target).find('.'+field).find('input').val();
            }else if(field == 'pm_other'){
                json.pm_other = $(target).find('.'+field).find('input').val();
            }else if(field == 'pm_adobe'){
                json.pm_adobe = $(target).find('.'+field).find('input').val();
            }
            json.pm_id = id;
            axios.post('/property-modify/6',json) //修改 - 資產管理
                .then(function (response) {
                    if(response.data.result){
                        self.getPropertys();
                        self.closeAllDropdownMenu();
                        $('.content_text input').addClass('none');
                        $('.content_text span').removeClass('none');
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                    self.closeAllDropdownMenu();
                });
        },
        //停啟用使用者
        changeUserStatus:function($ud_id,$ud_status){
            let self = this;
            var json = {};
            json.ud_id = $ud_id;
            if($ud_status == 1){
                json.ud_status = 0;
            }else{
                json.ud_status = 1;
            }

            axios.post('/user-modify/1',json) //修改使用者資料
                .then(function (response) {
                    if(response.data.result){
                        self.notification(response.data.string,'success');
                        self.getUsers();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //修改歸還日期
        changeReturnDate:function(obj){
            let self = this;
            var json = {};
            json.bbr_id = obj.bbr_id;
            json.bbr_returndate = obj.date;
            axios.post('/book-modify/3',json) //修改 - 書籍借閱紀錄
                .then(function (response) {
                    if(response.data.result){
                        self.getBorrowing(self.book.book_infor.bi_id);
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        //修改公告置頂與否
        changeAnnTopping:function(id,boolean){
            let self = this;
            var json = {};
            if(boolean){//改為置頂
                json.ai_topping = 1;
                json.ai_id = id;
            }else{//取消置頂
                json.ai_topping = 0;
                json.ai_id = id;
            }
            if(self.user_status.ud_admin || self.user_auth.ai_admin){
                axios.post('/announcement-modify/1',json) //修改 - 公告資訊
                    .then(function (response) {
                        if(response.data.result){
                            self.getAnns(self.announcement.sub_nav);
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.notification('系統出錯','failure');
                    });
            }
        },
        ///
        ////////////////////////修改區塊 end////////////////////////

        ////////////////////////刪除區塊////////////////////////
        ///
        //刪除資料
        deleteData:function(){
            let self = this;
            self.show_submit_btn = false;
            setTimeout(function(){
                self.show_submit_btn = true;
            },1000)
            var json = {};
            if(self.url_show_block == 'book-list'){
                json.bbr_id = self.delete_id;
                axios.post('/book-delete/'+self.ann_type,json) //刪除 - 書籍
                    .then(function (response) {
                        self.getBorrowing(self.book.book_infor.bi_id);
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                        self.closePrompt();
                    })
                    .catch(function (response) {
                        self.notification('系統出錯','failure');
                    });
            }else if(self.url_show_block == 'announcement-list'){
                json.ai_id = self.delete_id;
                axios.post('/announcement-delete/'+self.ann_type,json) //刪除 - 公告
                    .then(function (response) {
                        self.getAnns(self.announcement.sub_nav);
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                        self.closePrompt();
                    })
                    .catch(function (response) {
                        self.notification('系統出錯','failure');
                    });
            }else if(self.url_show_block == 'account-list'){
                json.al_id = self.delete_id;
                axios.post('/auth-delete/'+self.ann_type,json) //刪除 - 權限等級
                    .then(function (response) {
                        self.getAuths();
                        self.closePrompt();
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.notification('系統出錯','failure');
                    });
            }else if(self.url_show_block == 'property-list'){
                json.pm_id = self.delete_id;
                axios.post('/property-delete/'+self.ann_type,json) //刪除 - 公告
                    .then(function (response) {
                        self.getPropertys();
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                        self.closePrompt();
                    })
                    .catch(function (response) {
                        self.notification('系統出錯','failure');
                    });
            }else if(!isNaN(self.url_show_block)){
                json.tm_id = self.delete_id;
                axios.post('/project-delete/'+self.pro_type,json) //刪除 - 專案訊息
                    .then(function (response) {
                        self.getUserTags();
                        if(response.data.result){
                            self.closePrompt();
                            self.notification(response.data.string,'success');
                        }else{
                            self.closePrompt();
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.notification('系統出錯','failure');
                    });
            }
            
            
        },
        //開啟刪除的提示詢問窗
        openDeletePromptBox:function(id,type){
            let self = this;
            var string = '';
            if(!isNaN(self.url_show_block)){//1.專案主任務 2.專案子任務 3.專案訊息 4.專案紀錄 5.標籤
                self.pro_type = type;
                self.delete_id = id;
                if(type == 1){
                    string = '確定要刪除該公告？';
                }else if(type == 5){
                    string = '確定要刪除該標籤？';
                }
            }else{//1.公告資訊 2.公告訊息 3.書籍借閱 4.書籍資訊 5.書籍分類 6.資產管理 7.權限等級
                self.ann_type = type;
                self.delete_id = id;
                if(type == 1){
                    string = '確定要刪除該公告？';
                }else if(type == 3){
                    string = '確定要刪除該書籍借閱資訊？';
                }else if(type == 4){
                    string = '確定要刪除該書籍？';
                }else if(type == 5){
                    string = '確定要刪除該書籍分類？';
                }else if(type == 6){
                    string = '確定要刪除該資產？';    
                }else if(type == 7){
                    string = '確定要刪除該權限等級？';
                }
            }
            
            self.prompt(string,'question',false);
        },
        //取消加入最愛
        deleteFavorite:function($pt_id){
            let self = this;
            var arraydata = {};
            arraydata.pt_id = $pt_id;
            arraydata.ud_id = self.user_status.ud_id;
            axios.post('/user-delete/2',arraydata) //刪除 - 使用者最愛
                .then(function (response) {
                    if(response.data.result){
                        self.getProjects();
                        self.getSubProjects();
                        self.getUserFavorites();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯','failure');
                });
        },
        ///
        ////////////////////////刪除區塊 end////////////////////////


    },
    watch: {
	}
}
</script>