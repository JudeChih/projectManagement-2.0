<style scoped>

</style>

<template>
    <div id="singlepage"  @click="colseIfClickOutside($event),colseInput($event)">
        <div class="overlay" v-bind:class="type" @click="closeNowPage()"></div>
        <div class="sp_block pro" v-if="type == 'pst' || type == 'pt'">
            <!-- 加載框 -->
            <div class="sub_loading_block" v-if="sub_loading">
                <img src="/image/loading.svg" alt="">
            </div>
            <div class="sp_nav">
                <ul class="nav_wrap">
                    <li v-bind:class="{'current':project_cate == 1 && single_title.pt_id == project_id}" @click="getProject(single_title.pt_id),clickImgToOpenNewTab()">
                        <i v-if="!project.pt_backup" class="far fa-square icon_backup"></i>
                        <i v-else class="fas fa-check-square icon_backup"></i>
                        <p>{{single_title.pt_name}}</p>
                        <i v-if="isadmin" class="cursor far fa-trash-alt" @click="openDeleteProjectPromptBox(single_title.pt_id,1)"></i>
                    </li>
                    <li class="sub_item" v-if="single_title_sub.length > 0 && isadmin" v-for="title in single_title_sub" v-bind:class="{'border_color1':title.psc_id == 1,'border_color2':title.psc_id == 2,'border_color3':title.psc_id == 3,'border_color4':title.psc_id == 4||title.psc_id == 5,'border_color5':title.psc_id == 6||title.psc_id == 7||title.psc_id == 8,'border_color6':title.psc_id == 9,'current':project_cate == 2 && title.pst_id == project_id}" @click="getReminderDate(title.pst_id),getSubProject(title.pst_id),clickImgToOpenNewTab(),closeAllDropdownMenu()" draggable='true' @dragstart='dragToChangeProjectSort("start",title.pt_id,title.pst_id)' @dragend='dragToChangeProjectSort("end",title.pt_id,title.pst_id)' @drop='dragToChangeProjectSort("drop",title.pt_id,title.pst_id)' @dragover='allowDrop($event)'>
                        <p>{{title.pst_name}}</p>
                        <i class="cursor far fa-trash-alt" @click="openDeleteProjectPromptBox(title.pst_id,2)"></i>
                    </li>
                    <li class="sub_item" v-if="single_title_sub.length > 0 && !isadmin" v-for="title in single_title_sub" v-bind:class="{'border_color1':title.psc_id == 1,'border_color2':title.psc_id == 2,'border_color3':title.psc_id == 3,'border_color4':title.psc_id == 4||title.psc_id == 5,'border_color5':title.psc_id == 6||title.psc_id == 7||title.psc_id == 8,'border_color6':title.psc_id == 9,'current':project_cate == 2 && title.pst_id == project_id}" @click="getReminderDate(title.pst_id),getSubProject(title.pst_id),clickImgToOpenNewTab(),closeAllDropdownMenu()">
                        <p>{{title.pst_name}}</p>
                    </li>
                </ul>
                <div v-if="sub_project_input_open && isadmin" class="create_subproject_input">
                    <textarea name="pst_name" placeholder="添加子任務"></textarea>
                    <i class="far fa-times-circle close" @click="sub_project_input_open=false"></i><i class="far fa-check-circle check" @click="createSubProject(single_title.pt_id)"></i>
                </div>
                <div v-else-if="!sub_project_input_open && isadmin" class="create_subproject" @click="sub_project_input_open = true">
                    添加子任務
                </div>
            </div>
            <div class="sp_content">
                <div class="content_title">
                    <div class="project_name">
                        <p v-if="project_cate == 1 && isadmin" @click="showInput()"><input class="none pro_input" type="text" name="pt_name" :value="project.pt_name" @change="changeProjectName()"><span class="pro_input">{{project.pt_name}}</span></p>
                        <p v-else-if="project_cate == 2 && isadmin" @click="showInput()"><input class="none pro_input" type="text" name="pst_name" :value="project.pst_name" @change="changeProjectName()"><span class="pro_input">{{project.pst_name}}</span></p>
                        <p v-else-if="project_cate == 1 && !isadmin">{{project.pt_name}}</p>
                        <p v-else-if="project_cate == 2 && !isadmin">{{project.pst_name}}</p>
                        <i class="fas fa-times close" @click="closeNowPage()"></i>
                    </div>
                    <div class="project_creater">
                        <p>{{project.create_user}} 在 {{project.create_date}} 建立</p>
                    </div>
                    <div class="content_nav">
                        <ul class="nav_wrap">
                            <li @click="project_nav_open = 'information',resetSinglePage(),clickImgToOpenNewTab(),closeAllDropdownMenu()" v-bind:class="{ 'current': project_nav_open == 'information'}">任務訊息</li>
                            <li @click="project_nav_open = 'record',resetSinglePage(),clickImgToOpenNewTab(),closeAllDropdownMenu()" v-bind:class="{ 'current': project_nav_open == 'record'}">紀錄</li>
                            <li v-if="project_cate == 1" @click="project_nav_open = 'backup',resetSinglePage(),closeAllDropdownMenu()" v-bind:class="{ 'current': project_nav_open == 'backup'}">備份</li>
                        </ul>
                    </div>
                </div>
                <div class="content">
                    <!-- 專案訊息 -->
                    <div v-if="project_nav_open == 'information'" class="information_wrap">
                        <div class="infor_table">
                            <div class="infor_row">
                                <div v-if="project_cate == 2" class="infor_cell">
                                    <span>里程碑</span>
                                    <span class="content unfilled">無須設定</span>
                                </div>
                                <div v-else class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('pmc_name','pt_id',project.pt_id,$event) : false">
                                    <span class="dropdown_item">里程碑</span>
                                    <span class="content dropdown_item" v-if="project.pmc_id">{{project.pmc_name}}</span>
                                    <span class="content unfilled dropdown_item" v-else>設定里程碑</span>
                                    <div class="drop_down_wrap" v-if="checkToOpen('pmc_name','pt_id',project.pt_id)">
                                        <ul class="infor_ul">
                                            <li class="infor_li" v-for="mile in milestone_cate" @click="changeMilestone(mile.pmc_id)" v-bind:class="{'current':project.pmc_name == mile.pmc_name}">{{mile.pmc_name}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-if="project_cate == 2" class="infor_cell">
                                    <span>需求類別</span>
                                    <span class="content unfilled">無須設定</span>
                                </div>
                                <div v-else class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('prsc_name','pt_id',project.pt_id,$event) : false">
                                    <span class="dropdown_item">需求類別</span>
                                    <span class="content dropdown_item" v-if="project.prsc_id">{{project.prsc_name}}</span>
                                    <span class="content unfilled dropdown_item" v-else>設定類別</span>
                                    <div class="drop_down_wrap" v-if="checkToOpen('prsc_name','pt_id',project.pt_id)">
                                        <ul class=" infor_ul">
                                            <li class="infor_li" v-for="require in requiresort_cate" @click="changeRequireSort(require.prsc_id)" v-bind:class="{'current':project.prsc_name == require.prsc_name}">{{require.prsc_name}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-if="project_cate == 2" class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('peic_name','pst_id',project.pst_id,$event) : false">
                                    <span class="dropdown_item">執行項目</span>
                                    <span class="content dropdown_item" v-if="project.peic_name">{{project.peic_name}}</span>
                                    <span class="content unfilled dropdown_item" v-else>設定項目</span>
                                    <div class="drop_down_wrap" v-if="checkToOpen('peic_name','pst_id',project.pst_id)">
                                        <ul class="infor_ul">
                                            <li class="infor_li" v-for="item in executeitem_cate" @click="changeExecuteItem(project_id,item.peic_id)" v-bind:class="{'current':project.peic_id == item.peic_id}">{{item.peic_name}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-else class="infor_cell">
                                    <span>執行項目</span>
                                    <span class="content unfilled">無須設定</span>
                                </div>
                            </div>
                            <div class="infor_row">
                                <div v-if="project_cate == 2" class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('pst_requiredate','pst_id',project.pst_id,$event) : false">
                                    <span class="dropdown_item">確認日期</span>
                                    <span class="content unfilled dropdown_item" v-if="!project.pst_requiredate">設定日期</span>
                                    <span class="content dropdown_item" v-else>{{project.pst_requiredate}}</span>
                                    <datetimepicker v-if="checkToOpen('pst_requiredate','pst_id',project.pst_id)" :id="project.pst_id" type="pst_id" :date="project.pst_requiredate" @get-close="closeDateTimePicker" @get-newdate="changeRequireDate"></datetimepicker>
                                </div>

                                <div v-else class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('pt_requiredate','pt_id',project.pt_id,$event) : false">
                                    <span class="dropdown_item">需求日期</span>
                                    <span class="content unfilled dropdown_item" v-if="!project.pt_requiredate">設定日期</span>
                                    <span class="content dropdown_item" v-else>{{project.pt_requiredate}}</span>
                                    <datetimepicker v-if="checkToOpen('pt_requiredate','pt_id',project.pt_id)" :id="project.pt_id" type="pt_id" :date="project.pt_requiredate" @get-close="closeDateTimePicker" @get-newdate="changeRequireDate"></datetimepicker>
                                </div>
                                <div v-if="project_cate == 2" class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('pst_executiondate','pst_id',project.pst_id,$event) : false">
                                    <span class="dropdown_item">執行日期</span>
                                    <span class="content unfilled dropdown_item" v-if="!project.pst_executiondate">設定日期</span>
                                    <span class="content dropdown_item" v-else>{{project.pst_executiondate}}</span>
                                    <datetimepicker v-if="checkToOpen('pst_executiondate','pst_id',project.pst_id)" :id="project.pst_id" type="pst_id" :date="project.pst_executiondate" @get-close="closeDateTimePicker" @get-newdate="changeExecutiondate"></datetimepicker>
                                </div>
                                <div v-else class="infor_cell">
                                    <span>執行日期</span>
                                    <span class="content unfilled">無須設定</span>
                                </div>
                                <div v-if="project_cate == 2" class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('pst_completiondate','pst_id',project.pst_id,$event) : false">
                                    <span class="dropdown_item">完成日期</span>
                                    <span class="content unfilled dropdown_item" v-if="!project.pst_completiondate">設定日期</span>
                                    <span class="content dropdown_item" v-else>{{project.pst_completiondate}}</span>
                                    <datetimepicker v-if="checkToOpen('pst_completiondate','pst_id',project.pst_id)" :id="project.pst_id" type="pst_id" :date="project.pst_completiondate" @get-close="closeDateTimePicker" @get-newdate="changeCompletiondate"></datetimepicker>
                                </div>
                                <div v-else class="infor_cell">
                                    <span>完成日期</span>
                                    <span class="content unfilled">無須設定</span>
                                </div>
                            </div>
                            <div class="infor_row">
                                <div v-if="project_cate == 2" class="infor_cell infor_cell2 dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('ud_name','pst_id',project.pst_id,$event) : false">
                                    <span class="dropdown_item">執行人</span>
                                    <span class="content dropdown_item" v-if="project.ud_name">{{project.ud_name}}</span>
                                    <span class="content unfilled dropdown_item" v-else>設定執行人</span>
                                    <div class="drop_down_wrap user" v-if="checkToOpen('ud_name','pst_id',project.pst_id)">
                                        <ul class="infor_ul">
                                            <li class="infor_li" v-for="user in user_cate" @click="changeUser(project_id,user.ud_id)" v-bind:class="{'current':project.ud_id == user.ud_id}">
                                                <img v-if="user.ud_icon" :src="user.ud_icon" alt="">
                                                <img v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=" alt="">
                                                {{user.ud_name}}
                                            </li>
                                            <li class="infor_li" v-if="user_cate.length == 0">暫無執行人</li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-else class="infor_cell infor_cell2">
                                    <span>執行人</span>
                                    <span class="content unfilled">無須設定</span>
                                </div>
                                <div v-if="project_cate == 2" class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('psc_name','pst_id',project.pst_id,$event) : false">
                                    <span class="dropdown_item">狀態</span>
                                    <span v-if="project.psc_id" class="content dropdown_item">{{project.psc_name}}</span>
                                    <span v-else class="content unfilled dropdown_item">設定狀態</span>
                                    <div class="drop_down_wrap" v-if="checkToOpen('psc_name','pst_id',project.pst_id)">
                                        <ul class="infor_ul">
                                            <li v-for="status in status_cate" class="infor_li" @click="changeStatus(project_id,status.psc_id)" v-bind:class="{'current':project.psc_id == status.psc_id}">{{status.psc_name}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-else class="infor_cell">
                                    <span>狀態</span>
                                    <span class="content unfilled">無須設定</span>
                                </div>
                            </div>
                            <div class="infor_row">
                                <div class="infor_cell dropdown_item border_none" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('ppc_name','pst_id',project.pst_id,$event) : false">
                                    <span class="dropdown_item">優先權</span>
                                    <span class="content dropdown_item" v-if="project.ppc_id">{{project.ppc_name}}</span>
                                    <span class="content unfilled dropdown_item" v-else>設定優先權</span>
                                    <div class="drop_down_wrap" v-if="checkToOpen('ppc_name','pst_id',project.pst_id)">
                                        <ul class="infor_ul">
                                            <li v-for="pri in priority_cate" class="infor_li" @click="changePriority(pri.ppc_id)" v-bind:class="{'current':project.ppc_name == pri.ppc_name}">{{pri.ppc_name}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-if="project_cate == 2" class="infor_cell dropdown_item border_both" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('url_reminderdate','url_id',user_reminderdate.url_id,$event) : false">
                                    <span class="dropdown_item">提醒</span>
                                    <span class="content  dropdown_item" v-if="user_reminderdate.url_reminderdate">{{removeSecond(user_reminderdate.url_reminderdate)}}</span>
                                    <span class="content unfilled dropdown_item" v-else>設定日期</span>
                                    <datetimepicker v-if="checkToOpen('url_reminderdate','url_id',user_reminderdate.url_id)" :id="user_reminderdate.url_id" type="url_id" :date="user_reminderdate.url_reminderdate" time="true" @get-close="closeDateTimePicker" @get-newdate="changeReminderdate"></datetimepicker>
                                </div>
                                <div v-else class="infor_cell border_both">
                                    <span>提醒</span>
                                    <span class="content unfilled">無須設定</span>
                                </div>
                                <div v-if="project_cate == 2" class="infor_cell">
                                    <span>執行時間</span>
                                    <input type="text" class="single_input" name="pst_spendtime" :value="project.pst_spendtime" placeholder="00.00" @change="isadmin ? changeSpendTime(project.pst_id) : false">
                                </div>
                                <div v-else class="infor_cell">
                                    <span>執行時間</span>
                                    <span class="content unfilled">無須設定</span>
                                </div>
                            </div>
                            <div v-if="project_cate == 1" class="infor_row">
                                <div class="infor_cell dropdown_item"  v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('tm_name','pt_id',project.pt_id,$event) : false">
                                    <span class="dropdown_item">標籤</span>
                                    <span class="content dropdown_item" v-if="project.tm_id">{{project.tm_name}}</span>
                                    <span class="content unfilled dropdown_item" v-else>設定標籤</span>
                                    <div class="drop_down_wrap" v-if="checkToOpen('tm_name','pt_id',project.pt_id)">
                                        <ul class="infor_ul">
                                            <li class="infor_li" v-for="tag in user_tags" @click="changeTag(tag.tm_id)" v-bind:class="{'current':project.tm_name == tag.tm_name}">{{tag.tm_name}}</li>
                                            <li v-if="user_tags.length < 1" class="infor_li">暫無標籤</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="infor_cell"></div>
                            </div>
                        </div>
                        <div class="add_new_information" v-if="!create_infor_editor_open" @click="create_infor_editor_open = true,closeInforEditor(),fileList = []">
                            <i class="fas fa-plus"></i><span class="infor_content">新增訊息</span>
                        </div>
                        <div class="create_new_information" v-if="create_infor_editor_open">
                            <i class="fas fa-plus"></i><input class="pi_title" type="text" name="pi_title" value="">
                            <vue-html5-editor v-if="create_infor_editor_open" :content="editor_content" :height="500"></vue-html5-editor>
                            <div>
                                <el-upload
                                    class="upload-demo"
                                    ref="upload"
                                    action="/uploadfile"
                                    multiple
                                    name="newPro"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-change="handleChange"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :file-list="fileList"
                                    :headers="{'X-CSRF-TOKEN':csrfToken}"
                                    :auto-upload="false">
                                    <el-button size="small" type="text">上傳檔案</el-button>
                                </el-upload>
                            </div>
                        </div>
                        <div class="create_new_information_btn" v-if="create_infor_editor_open">
                            <div class="btn_cancel" @click="create_infor_editor_open = false">取消</div>
                            <div class="btn_submit" @click="createInformation()">確認</div>
                        </div>
                        <div class="infor_lists">
                            <div v-for="item in project_infors" class="infor_item" v-bind:class="'infor'+item.pi_id">
                                <div class="infor_title">
                                    <div class="cursor title_content" @click="project_infor_id != item.pi_id || !editing?openThisInforItem(item.pi_id):false,project_infor_id != item.pi_id || !editing?create_infor_editor_open = false:false">
                                        <i class="fas fa-chevron-circle-down infor_icon"></i>
                                        <input v-if="project_infor_id == item.pi_id && editing" class="pi_title" type="text" name="pi_title" :value="item.pi_title">
                                        <span v-else>{{item.pi_title}}</span>
                                    </div>
                                    <div class="function_wrap">
                                        <i class="cursor far fa-edit" @click="openThisInforEditor(item.pi_id,item.pi_fileurl),create_infor_editor_open = false"></i>
                                        <i class="cursor far fa-trash-alt" @click="create_infor_editor_open = false,openDeleteProjectPromptBox(item.pi_id,3)"></i>
                                    </div>
                                </div>
                                <div class="infor_content">
                                    <div class="message" v-html="item.pi_message"></div>
                                    <div class="upload-demo">
                                        <ul class="el-upload-list el-upload-list--text">
                                            <li v-for="file in JSON.parse(item.pi_fileurl)" class="el-upload-list__item is-ready" v-on:click="downloadProFile(item.pi_id,file.name)">
                                                <a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{file.name}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="creator">
                                        <div>
                                            <span class="user">{{item.create_user}}</span><span class="date">{{item.create_date}}</span>
                                        </div>
                                    </div>
                                </div>
                                <vue-html5-editor v-if="project_infor_id == item.pi_id && editing" :content="item.pi_message" :height="500"></vue-html5-editor>
                                <div v-if="project_infor_id == item.pi_id && editing">
                                    <el-upload
                                        class="upload-demo"
                                        action="/uploadfile"
                                        multiple
                                        name="upPro"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :on-change="handleChange"
                                        :on-success="handleSuccess"
                                        :on-error="handleError"
                                        :file-list="fileList"
                                        :headers="{'X-CSRF-TOKEN':csrfToken}"
                                        :auto-upload="false">
                                        <el-button size="small" type="text">上傳檔案</el-button>
                                    </el-upload>
                                </div>
                                <div class="modify_information_btn" v-if="project_infor_id == item.pi_id && editing">
                                    <div class="btn_cancel" @click="openThisInforItem(item.pi_id)">取消</div>
                                    <div class="btn_submit" @click="changeInformation(item.pi_id)">確認</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 專案訊息 end -->
                    <!-- 專案紀錄 -->
                    <div v-else-if="project_nav_open == 'record'" class="record_wrap">
                        <div class="add_new_record" v-if="!create_record_editor_open" @click="create_record_editor_open = true,project_infor_id = ''">
                            <i class="fas fa-plus"></i><span class="record_content">新增紀錄</span>
                        </div>
                        <div class="create_new_record" v-if="create_record_editor_open">
                            <vue-html5-editor v-if="create_record_editor_open" :content="editor_content" :height="500"></vue-html5-editor>
                        </div>
                        <div class="create_new_record_btn" v-if="create_record_editor_open">
                            <div class="btn_cancel" @click="create_record_editor_open = false">取消</div>
                            <div class="btn_submit" @click="createRecord()">確認</div>
                        </div>
                        <div class="record_lists">
                            <div v-for="item in project_records" class="record_item" v-bind:class="'item'+item.pr_id">
                                <div class="record_content close">
                                    <div class="creator">
                                        <div class="creator_wrap">
                                            <span class="user">{{item.create_user}}</span><span class="date">{{item.create_date}}</span>
                                        </div>
                                        <div class="function_wrap">
                                            <!-- <i class="fal fa-edit" @click="editing = true,project_record_id = item.pr_id,create_record_editor_open = false"></i> -->
                                            <i class="cursor far fa-trash-alt" @click="create_record_editor_open = false,openDeleteProjectPromptBox(item.pr_id,4)"></i>
                                        </div>
                                    </div>
                                    <div class="message" v-html="item.pr_message"></div>
                                    <div class="view_more" @click="viewMore(item.pr_id)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 專案紀錄 end -->
                    <!-- 專案備份 -->
                    <div v-else-if="project_nav_open == 'backup'" class="backup_wrap">
                        <div class="backup_table">
                            <div class="backup_row">
                                <div class="backup_cell">
                                    <span>備份</span>
                                    <span class="content" v-if="project.pt_backup == 1"><i class="fas fa-check-square icon_backup"></i></span>
                                    <span class="content" v-else-if="project.pt_backup == 0"><i class="far fa-square icon_backup"></i></span>
                                </div>
                                <div class="backup_cell">
                                    <span>日期</span>
                                    <span class="content" v-if="project.pt_backup == 1">{{project.pt_backupdate}}</span>
                                    <span class="content unfilled" v-else-if="project.pt_backup == 0">尚未備份</span>
                                </div>
                            </div>
                            <div class="backup_row">
                                <div class="backup_cell backup_cell2">
                                    <span>備份路徑</span>
                                    <input type="text" name="pt_backupurl" placeholder="填入備份路徑" :value="project.pt_backupurl" @change="changeBackupDate(project.pt_id)">
                                </div>
                            </div>
                        </div>
                        <!-- 專案備份 end -->
                    </div>
                </div>
            </div>
        </div>
        <div class="sp_block ann" v-else-if="type == 'ai'">
            <!-- 加載框 -->
            <div class="sub_loading_block" v-if="sub_loading">
                <img src="/image/loading.svg" alt="">
            </div>
            <!-- 加載框 end -->
            <div class="sp_content">
                <div class="content_title">
                    <i class="fas fa-star btn_favor" v-if="project_ann.ai_topping == 1" @click="isadmin ? changeAnnTopping(project_ann.ai_id,false) : false"></i>
                    <i class="far fa-star btn_favor" v-else @click="isadmin ? changeAnnTopping(project_ann.ai_id,true) : false"></i>
                    <div class="project_name">
                        <p v-if="isadmin" @click="showInput()"><input type="text" name="ai_title" class="ann_input none" :value="project_ann.ai_title" @change="changeAnnTitle()"><span class="ann_input">{{project_ann.ai_title}}</span></p>
                        <p v-else>{{project_ann.ai_title}}</p>
                        <i class="fas fa-times close" @click="closeNowPage()"></i>
                    </div>
                    <div class="project_creater">
                        <p>{{project_ann.create_user}} 在 {{project_ann.create_date}} 建立</p>
                    </div>
                </div>
                <div class="content">
                    <!-- 公告訊息 -->
                    <div class="information_wrap">
                        <div class="infor_table">
                            <div class="infor_row">
                                <div class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('ai_expirydate','ai_id',project_ann.ai_id,$event) : false">
                                    <span class="dropdown_item">到期日</span>
                                    <span class="content unfilled dropdown_item" v-if="!project_ann.ai_expirydate">設定日期</span>
                                    <span class="content dropdown_item" v-else>{{project_ann.ai_expirydate}}</span>
                                    <datetimepicker v-if="checkToOpen('ai_expirydate','ai_id',project_ann.ai_id)" :id="project_ann.ai_id" type="ai_id" :date="project_ann.ai_expirydate" @get-close="closeDateTimePicker" @get-newdate="changeAnnExecutiondate"></datetimepicker>
                                </div>
                                <div class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('url_reminderdate','url_id',user_reminderdate.url_id,$event) : false">
                                    <span class="dropdown_item">提醒</span>
                                    <span class="content  dropdown_item" v-if="user_reminderdate.url_reminderdate">{{removeSecond(user_reminderdate.url_reminderdate)}}</span>
                                    <span class="content unfilled dropdown_item" v-else>設定日期</span>
                                    <datetimepicker v-if="checkToOpen('url_reminderdate','url_id',user_reminderdate.url_id)" :id="user_reminderdate.url_id" type="url_id" :date="user_reminderdate.url_reminderdate" time="true" @get-close="closeDateTimePicker" @get-newdate="changeReminderdate"></datetimepicker>
                                </div>
                            </div>
                        </div>
                        <div class="add_new_information" v-if="!create_message_editor_open" @click="create_message_editor_open = true,closeMessageEditor(),fileList = []">
                            <i class="fas fa-plus"></i><span class="infor_content">新增訊息</span>
                        </div>
                        <div class="create_new_information" v-if="create_message_editor_open">
                            <i class="fas fa-plus"></i><input class="am_title" type="text" name="am_title" value="">
                            <vue-html5-editor v-if="create_message_editor_open" :content="editor_content" :height="500"></vue-html5-editor>
                            <div>
                                <el-upload
                                    class="upload-demo"
                                    ref="upload"
                                    action="/uploadfile"
                                    multiple
                                    name="newAnn"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-change="handleChange"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :file-list="fileList"
                                    :headers="{'X-CSRF-TOKEN':csrfToken}"
                                    :auto-upload="false">
                                    <el-button size="small" type="text">上傳檔案</el-button>
                                </el-upload>
                            </div>
                        </div>
                        <div class="create_new_information_btn" v-if="create_message_editor_open">
                            <div class="btn_cancel" @click="create_message_editor_open = false">取消</div>
                            <div class="btn_submit" @click="createMessage()">確認</div>
                        </div>
                        <div class="infor_lists">
                            <div v-for="item in project_ann_messages" class="infor_item" v-bind:class="'item'+item.am_id">
                                <div class="infor_title">
                                    <div class="cursor title_content" @click="ann_message_id != item.am_id || !editing?openThisMessageItem(item.am_id):false,ann_message_id != item.am_id || !editing?create_message_editor_open = false:false">
                                        <i class="fas fa-chevron-circle-down infor_icon"></i>
                                        <input v-if="ann_message_id == item.am_id && editing" class="am_title" type="text" name="am_title" :value="item.am_title">
                                        <span v-else>{{item.am_title}}</span>
                                    </div>
                                    <div class="function_wrap">
                                        <i class="cursor far fa-edit" @click="openThisMessageEditor(item.am_id,item.am_fileurl),create_message_editor_open = false"></i>
                                        <i class="cursor far fa-trash-alt" @click="create_message_editor_open = false,openDeleteAnnPromptBox(item.am_id,2)"></i>
                                    </div>
                                </div>
                                <div class="infor_content">
                                    <div class="message" v-html="item.am_message"></div>
                                    <div class="upload-demo">
                                        <ul class="el-upload-list el-upload-list--text">
                                            <li v-for="file in JSON.parse(item.am_fileurl)" class="el-upload-list__item is-ready" v-on:click="downloadAnnFile(item.am_id,file.name)">
                                                <a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{file.name}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="creator">
                                        <div>
                                            <span class="user">{{item.create_user}}</span><span class="date">{{item.create_date}}</span>
                                        </div>
                                    </div>
                                </div>
                                <vue-html5-editor v-if="ann_message_id == item.am_id && editing" :content="item.am_message" :height="500"></vue-html5-editor>
                                <div v-if="ann_message_id == item.am_id && editing">
                                    <el-upload
                                        class="upload-demo"
                                        ref="upload"
                                        action="/uploadfile"
                                        multiple
                                        name="upAnn"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :on-change="handleChange"
                                        :on-success="handleSuccess"
                                        :on-error="handleError"
                                        :file-list="fileList"
                                        :headers="{'X-CSRF-TOKEN':csrfToken}"
                                        :auto-upload="false">
                                        <el-button size="small" type="text">上傳檔案</el-button>
                                    </el-upload>
                                </div>
                                <div class="modify_information_btn" v-if="ann_message_id == item.am_id && editing">
                                    <div class="btn_cancel" @click="openThisMessageItem(item.am_id)">取消</div>
                                    <div class="btn_submit" @click="changeMessage(item.am_id)">確認</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 公告訊息 end -->
                </div>
            </div>
        </div>
        <div class="sp_block ud" v-else-if="type == 'ud'">
            <!-- 加載框 -->
            <div class="sub_loading_block" v-if="sub_loading">
                <img src="/image/loading.svg" alt="">
            </div>
            <!-- 加載框 end -->
            <div class="sp_content">
                <div class="content_title">
                    <div class="project_name">
                        <el-upload v-if="isadmin" class="user_image_wrap" action='' :on-change="getFile" :auto-upload="false" :show-file-list="false">
                            <img v-if="imageurl" :src="imageurl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div v-else class="user_icon_wrap">
                            <img  :src="imageurl" class="avatar">
                        </div>
                        <p v-if="user_id">修改帳號</p>
                        <p v-else>新增帳號</p>
                        <p class="creater" v-if="user_id">{{user_data.create_user}} 在 {{user_data.create_date}} 建立</p>
                        <!-- <i class="fas fa-times close" @click="closeNowPage()"></i> -->
                    </div>
                    <!-- <div class="project_creater" v-if="user_id">
                        <p>{{user_data.create_user}} 在 {{user_data.create_date}} 建立</p>
                    </div> -->
                </div>
                <div class="content overflow" v-bind:class="{'create':!user_id,'modify':user_id}">
                    <div class="account_infor_wrap">
                        <div class="account_infor_header">
                            <p>員工帳號</p>
                        </div>
                        <div class="account_infor_container">
                            <div class="infor_table">
                                <div class="infor_row">
                                    <div class="infor_cell">
                                        <span class="">帳號</span>
                                        <span class="content" v-if="!user_id"><input type="text" v-model="user_data.ud_account" placeholder="待填入"></span>
                                        <span class="content" v-else>{{user_data.ud_account}}</span>
                                    </div>
                                    <div class="infor_cell">
                                        <span class="">啟/停用</span>
                                        <span v-if="user_data.ud_status == 1" class="btn green" v-bind:class="{'cursor':isadmin}" @click="isadmin ? changeUserStatus(user_data.ud_id,user_data.ud_status) : false">啟用中</span>
                                        <span v-else-if="user_data.ud_status == 0" class="btn red" v-bind:class="{'cursor':isadmin}" @click="isadmin ? changeUserStatus(user_data.ud_id,user_data.ud_status) : false">停用中</span>
                                        <span v-if="!user_id" class="content unfilled">新增無效用</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="password_infor_wrap">
                        <div class="password_infor_header">
                            <p>員工密碼</p>
                        </div>
                        <div class="password_infor_container">
                            <div class="infor_table">
                                <div class="infor_row">
                                    <div class="infor_cell">
                                        <span class="">密碼</span>
                                        <span class="content"><input type="password" v-model="user_data.ud_password" placeholder="待填入"></span>
                                    </div>
                                    <div class="infor_cell">
                                        <span class="">確認密碼</span>
                                        <span class="content"><input type="password" v-model="user_data.ud_password_confirm" placeholder="待填入"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 員工資訊 -->
                    <div class="user_infor_wrap">
                        <div class="user_infor_header">
                            <p>員工資訊</p>
                        </div>
                        <div class="user_infor_container">
                            <div class="infor_table">
                                <div class="infor_row">
                                    <div class="infor_cell">
                                        <span class="">使用者名稱</span>
                                        <span class="content"><input type="text" v-model="user_data.ud_name" placeholder="請輸入使用者名稱"></span>
                                    </div>
                                    <div class="infor_cell">
                                        <span class="">年資</span>
                                        <span class="content" v-if="user_data.ud_code">滿{{showSeniority(user_data.ud_code)}}年</span>
                                        <span class="content unfilled" v-else>無法計算</span>
                                    </div>
                                </div>
                                <div class="infor_row">
                                    <div class="infor_cell">
                                        <span class="">員工代號</span>
                                        <span class="content"><input type="text" v-model="user_data.ud_code" placeholder="待填入"></span>
                                    </div>
                                    <div class="infor_cell">
                                        <span class="">信箱</span>
                                        <span class="content"><input type="text" v-model="user_data.ud_mail" placeholder="待填入"></span>
                                    </div>
                                </div>
                                <div class="infor_row">
                                    <div class="infor_cell">
                                        <span class="">市話</span>
                                        <span class="content"><input type="text" v-model="user_data.ud_tel" placeholder="待填入"></span>
                                    </div>
                                    <div class="infor_cell">
                                        <span class="">手機</span>
                                        <span class="content"><input type="text" v-model="user_data.ud_mobile" placeholder="待填入"></span>
                                    </div>
                                </div>
                                <div class="infor_row">
                                    <div class="infor_cell">
                                        <span class="">緊急聯絡人</span>
                                        <span class="content"><input type="text" v-model="user_data.ud_emercontactname" placeholder="待填入"></span>
                                    </div>
                                    <div class="infor_cell">
                                        <span class="">聯絡人電話</span>
                                        <span class="content"><input type="text" v-model="user_data.ud_emercontactphone" placeholder="待填入"></span>
                                    </div>
                                </div>
                                <div class="infor_row">
                                    <div class="infor_cell" v-bind:class="{'cursor':isadmin,'dropdown_item':isadmin}" @click="isadmin ? openDropdownMenu('ut_name','ut_id',user_data.ut_id,$event) : false">
                                        <span class="dropdown_item">部門</span>
                                        <span class="content dropdown_item" v-if="user_data.ut_id">{{user_data.ut_name}}</span>
                                        <span class="content unfilled dropdown_item" v-else>請選擇</span>
                                        <div class="drop_down_wrap" v-if="checkToOpen('ut_name','ut_id',user_data.ut_id)">
                                            <ul class="infor_ul">
                                                <li class="infor_li" v-for="type in type_cate" @click="user_data.ut_id = type.ut_id,user_data.ut_name = type.ut_name" v-bind:class="{'current':user_data.ut_id == type.ut_id}">{{type.ut_name}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="infor_cell" v-bind:class="{'cursor':isadmin,'dropdown_item':isadmin}" @click="isadmin ? openDropdownMenu('ug_name','ug_id',user_data.ug_id,$event) : false">
                                        <span class="dropdown_item">群組</span>
                                        <span class="content dropdown_item" v-if="user_data.ug_id">{{user_data.ug_name}}</span>
                                        <span class="content unfilled dropdown_item" v-else>請選擇</span>
                                        <div class="drop_down_wrap" v-if="checkToOpen('ug_name','ug_id',user_data.ug_id)">
                                            <ul class="infor_ul">
                                                <li class="infor_li" v-for="group in group_cate" @click="user_data.ug_id = group.ug_id,user_data.ug_name = group.ug_name" v-bind:class="{'current':user_data.ug_id == group.ug_id}">{{group.ug_name}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 員工資訊 end -->
                    <div class="auth_infor_wrap">
                        <div class="auth_infor_header">
                            <p>權限資訊</p>
                        </div>
                        <div class="auth_infor_container">
                            <div class="auth_level" v-bind:class="{'cursor':isadmin,'dropdown_item':isadmin}" @click="isadmin ? openDropdownMenu('al_name','al_id',user_data.al_id,$event) : false">
                                <span class="dropdown_item">權限等級</span>
                                <span class="content dropdown_item" v-if="user_data.al_name">{{user_data.al_name}}</span>
                                <span class="content unfilled dropdown_item" v-else>請選擇</span>
                                <div class="drop_down_wrap" v-if="checkToOpen('al_name','al_id',user_data.al_id)">
                                    <ul class="infor_ul">
                                        <li v-if="auths.length < 1" class="infor_li">請新增權限等級</li>
                                        <li class="infor_li" v-for="auth in auths" @click="selectAuth(auth)" v-bind:class="{'current':user_data.al_id == auth.al_id}">{{auth.al_name}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="auth_remark">
                                <span>備註</span>
                                <span class="content" v-if="user_data.al_remark">{{user_data.al_remark}}</span>
                                <span class="content unfilled" v-else>無</span>
                            </div>
                            <div v-if="user_data.al_id" class="auth_detail">
                                <div class="auth_item">
                                    <span>專案權限</span>
                                    <span class="content" v-if="user_data.pt_admin">可編輯</span>
                                    <span class="content" v-else>僅查看</span>
                                </div>
                                <div class="auth_item">
                                    <span>公告權限</span>
                                    <span class="content" v-if="user_data.ai_admin">可編輯</span>
                                    <span class="content" v-else>僅查看</span>
                                </div>
                                <div class="auth_item">
                                    <span>資產權限</span>
                                    <span class="content" v-if="user_data.pm_admin">可編輯</span>
                                    <span class="content" v-else>僅查看</span>
                                </div>
                                <div class="auth_item">
                                    <span>書籍權限</span>
                                    <span class="content" v-if="user_data.bi_admin">可編輯</span>
                                    <span class="content" v-else>僅查看</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content_footer">
                    <div class="btn_cancel" @click="closeNowPage()">取消</div>
                    <div class="btn_submit" @click="changeUserData()">確認</div>
                    
                </div>
            </div>
        </div>
        <div class="sp_block al" v-else-if="type == 'al'">
            <!-- 加載框 -->
            <div class="sub_loading_block" v-if="sub_loading">
                <img src="/image/loading.svg" alt="">
            </div>
            <!-- 加載框 end -->
            <div class="sp_content">
                <div class="content_title">
                    <div class="project_name">
                        <p v-if="auth_id">修改權限等級</p>
                        <p v-else>新增權限等級</p>
                        <!-- <i class="fas fa-times close" @click="closeNowPage()"></i> -->
                    </div>
                    <div class="project_creater" v-if="auth_level.create_user">
                        <p>{{auth_level.create_user}} 在 {{auth_level.create_date}} 建立</p>
                    </div>
                </div>
                <div class="content overflow" v-bind:class="{'create':!auth_id,'modify':auth_id}">
                    <div class="auth_infor_wrap">
                        <div class="auth_infor_header">
                            <p>權限資訊</p>
                        </div>
                        <div class="auth_infor_container">
                            <div class="infor_table">
                                <div class="infor_row">
                                    <div class="infor_cell">
                                        <span class="">權限名稱</span>
                                        <span class="content"><input type="text" name="al_name" v-model="auth_level.al_name" placeholder="請輸入權限名稱"></span>
                                    </div>
                                    <div class="infor_cell">
                                        
                                    </div>
                                </div>
                                <div class="infor_row">
                                    <div class="infor_cell x2">
                                        <span class="">備註</span>
                                        <span class="content"><input type="text" name="al_remark" v-model="auth_level.al_remark" placeholder="填入備註"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="auth_level_wrap">
                        <div class="auth_level_header">
                            <p>權限等級</p>
                        </div>
                        <div class="auth_level_container">
                            <div class="infor_table">
                                <div class="infor_row">
                                    <div class="infor_cell">
                                        <span>專案權限</span>
                                        <span class="content">
                                            <input id="pt1" type="radio" value="1" v-model="auth_level.pt_admin" /><label for="pt1">可編輯</label>
                                            <input id="pt2" type="radio" value="0" v-model="auth_level.pt_admin" /><label for="pt2">僅查看</label>
                                        </span>
                                    </div>
                                    <div class="infor_cell">
                                        <span>公告權限</span>
                                        <span class="content">
                                            <input id="ai1" type="radio" value="1" v-model="auth_level.ai_admin" /><label for="ai1">可編輯</label>
                                            <input id="ai2" type="radio" value="0" v-model="auth_level.ai_admin" /><label for="ai2">僅查看</label>
                                        </span>
                                    </div>
                                    <div class="infor_cell">
                                        <span>資產權限</span>
                                        <span class="content">
                                            <input id="pm1" type="radio" value="1" v-model="auth_level.pm_admin" /><label for="pm1">可編輯</label>
                                            <input id="pm2" type="radio" value="0" v-model="auth_level.pm_admin" /><label for="pm2">僅查看</label>
                                        </span>
                                    </div>
                                    <div class="infor_cell">
                                        <span>書籍權限</span>
                                        <span class="content">
                                            <input id="bi1" type="radio" value="1" v-model="auth_level.bi_admin" /><label for="bi1">可編輯</label>
                                            <input id="bi0" type="radio" value="0" v-model="auth_level.bi_admin" /><label for="bi0">僅查看</label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content_footer">
                    <div class="btn_cancel" @click="closeNowPage()">取消</div>
                    <div class="btn_submit" @click="changeAuthorityLevel()">確認</div>
                    
                </div>
            </div>
        </div>
        <div class="sp_block bi" v-else-if="type == 'bi'">
            <!-- 加載框 -->
            <div class="sub_loading_block" v-if="sub_loading">
                <img src="/image/loading.svg" alt="">
            </div>
            <!-- 加載框 end -->
            <div class="sp_content">
                <div class="content_title">
                    <div class="project_name">
                        <el-upload class="book_image_wrap" action='' :on-change="getFile" :auto-upload="false" :show-file-list="false">
                            <img v-if="imageurl" :src="imageurl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <p v-if="book_data.bi_name">{{book_data.bi_name}}</p>
                        <p v-else>設定書籍名稱</p>
                        <p class="creater" v-if="book_id">{{book_data.create_user}} 在 {{book_data.create_date}} 建立</p>
                        <i class="fas fa-times close" @click="closeNowPage()"></i>
                        <i class="cursor far fa-trash-alt delete" @click="openDeleteAnnPromptBox(book_data.bi_id,4)"></i>
                    </div>
                </div>
                <div class="content overflow" v-bind:class="{'create':!book_id,'modify':book_id}">
                    <div class="book_infor_wrap">
                        <!-- <div class="book_infor_header">
                            <p>書籍資訊</p>
                        </div> -->
                        <div class="book_infor_container">
                            <div class="infor_table">
                                <div class="infor_row">
                                    <div class="infor_cell">
                                        <span class="">書籍名稱</span>
                                        <span class="content"><input type="text" v-model="book_data.bi_name" placeholder="設定書籍名稱"></span>
                                    </div>
                                    <div class="infor_cell dropdown_item" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('bs_id','bi_id',book_data.bs_id,$event) : false">
                                        <span class="dropdown_item">分類</span>
                                        <span class="content dropdown_item" v-if="book_data.bs_id">{{book_data.bs_name}}</span>
                                        <span class="content unfilled dropdown_item" v-else>請選擇</span>
                                        <div class="drop_down_wrap" v-if="checkToOpen('bs_id','bi_id',book_data.bs_id)">
                                            <ul class="infor_ul">
                                                <li class="infor_li" v-for="sort in book_sort" @click="book_data.bs_id = sort.bs_id,book_data.bs_name = sort.bs_name" v-bind:class="{'current':book_data.bs_id == sort.bs_id}">{{sort.bs_name}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="infor_row">
                                    <div class="infor_cell dropdown_item x3" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('bi_purchasedate','bi_id',book_data.bi_id,$event) : false">
                                        <span class="dropdown_item">進貨日期</span>
                                        <span class="content unfilled dropdown_item" v-if="!book_data.bi_purchasedate">設定日期</span>
                                        <span class="content dropdown_item" v-else>{{book_data.bi_purchasedate}}</span>
                                        <datetimepicker v-if="checkToOpen('bi_purchasedate','bi_id',book_data.bi_id)" :id="book_data.bi_id" type="bi_id" :date="book_data.bi_purchasedate" @get-close="closeDateTimePicker" @get-newdate="changePurchaseDate"></datetimepicker>
                                    </div>
                                    <div class="infor_cell dropdown_item x3" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('ud_name','bi_id',book_data.bi_id,$event) : false">
                                        <span class="dropdown_item">資產</span>
                                        <span class="content dropdown_item" v-if="book_data.ud_id">{{book_data.ud_name}}</span>
                                        <span class="content dropdown_item" v-else-if="book_data.ud_id == 0">公司</span>
                                        <span class="content unfilled dropdown_item" v-else>設定資產</span>
                                        <div class="drop_down_wrap user" v-if="checkToOpen('ud_name','bi_id',book_data.bi_id)">
                                            <ul class="infor_ul">
                                                <li class="infor_li" v-for="user in user_cate" @click="changeBookUser(user.ud_id,user.ud_name)" v-bind:class="{'current':book_data.ud_id == user.ud_id}">
                                                    <img v-if="user.ud_icon" :src="user.ud_icon" alt="">
                                                    <img v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=" alt="">
                                                    {{user.ud_name}}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="infor_cell dropdown_item x3" v-bind:class="{'cursor':isadmin}" @click="isadmin ? openDropdownMenu('bsc_id','bi_id',book_data.bsc_id,$event) : false">
                                        <span class="dropdown_item">狀態</span>
                                        <span class="content dropdown_item" v-if="book_data.bsc_id">{{book_data.bsc_name}}</span>
                                        <span class="content unfilled dropdown_item" v-else>請選擇</span>
                                        <div class="drop_down_wrap" v-if="checkToOpen('bsc_id','bi_id',book_data.bsc_id)">
                                            <ul class="infor_ul">
                                                <li class="infor_li" v-for="status in book_status" @click="book_data.bsc_id = status.bsc_id,book_data.bsc_name = status.bsc_name" v-bind:class="{'current':book_data.bsc_id == status.bsc_id}">{{status.bsc_name}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="infor_row">
                                    <div class="infor_cell x1">
                                        <span class="">書籍內容</span>
                                        <span class="content">
                                            <textarea name="bi_message" cols="30" rows="10" v-model="book_data.bi_message"></textarea>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content_footer">
                    <div class="btn_cancel" @click="closeNowPage()">取消</div>
                    <div class="btn_submit" @click="changeBook()">確認</div>
                </div>
            </div>
        </div>
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
                    <div class="btn_submit" v-if="show_submit_btn" @click="deleteProject()">確認</div>
                    <div class="btn_submit" v-else>確認</div>
                    <p><span></span>s 後自動關閉</p>
                </div>
            </div>
        </div>
        <!-- 提示框 end -->
    </div>
</template>
<script>
import datetimepicker from '../components/Datetimepicker.vue'
export default {
    name:'singlepage',
    components:{
        datetimepicker
    },
    props: {
        userdata:'',//使用者資訊
        type:'',//所屬table的開頭 pt pst ai ud al bi ...
        id:'',//所屬的編號
        cate:'',// 1 主任務、 2 子任務、 3 公告、 4 使用者帳號、 5 權限等級、 6 書籍...
        group:'',//所屬組別
    },
	data() {
        return {
            //是否為管理員
            isadmin:false,
            //所有欄位全部的選項
            milestone_cate:[],//里程碑所有選項
            requiresort_cate:[],//需求分類所有選項
            priority_cate:[],//優先權所有選項
            status_cate:[],//狀態所有選項
            executeitem_cate:[],//執行項目選項
            group_cate:[],//群組所有選項
            type_cate:[],//部門所有選項
            user_cate:[],//所有使用者
            user_group:[],//使用者所屬群組
            user_tags:[],//使用者的標籤資訊
            user_status:[],//使用者資訊
            user_auth:[],//使用者權限
            user_reminderdate:[],//使用者提醒專案資訊
            subprojectsort_cate:[],
            // authoritylevel_cate:[],//權限等級資訊
            user_data:{},//單一使用者資料
            user_id:'',//單一使用者的編號
            auths:[],//所有權限等級資料
            auth_level:{},//單一權限等級資料
            auth_id:'',//單一權限等級的編號
            book_status:[],//單一書籍狀態
            book_sort:[],//單一書籍分類
            book_data:{},//單一書籍資料
            imageurl:'',//書籍圖片路徑暫存區
            book_id:'',//單一書籍編號
            project:[],
            project_ann:[],
            project_infors:[],//某專案任務所有的專案訊息
            project_records:[],//某專案任務所有的專案紀錄
            project_cate:'',//單一專案任務目前顯示的 1.專案任務 2.專案子任務 3.公告 4.....
            project_id:'',//單一專案任務目前顯示的專案任務資料的id
            project_infor_id:'',//單一專案任務目前顯示的專案訊息
            project_record_id:'',//單一專案任務目前顯示的專案紀錄
            single_title:[],//單一專案任務頁面左側主任務title顯示
            single_title_sub:[],//單一專案任務頁面左側子任務title顯示
            sub_loading:false,//單一專案加載框 顯示與否
            pro_type:'',//1.專案主任務 2.專案子任務 3.專案訊息 4.專案紀錄 5.標籤
            ann_type:'',//1.公告資訊 2.公告訊息 3.書籍借閱 4.書籍資訊 5.書籍分類 6.資產管理 7.wifi申請
            delete_id:'',//需要刪除的目標的id
            prompt_box_open:false,//提示框 顯示與否
            sub_project_input_open:false,//新增子任務區塊 顯示與否
            show_submit_btn:true,//送出按鈕功能 顯示與否
            project_ann_id:'',//單一專案任務目前顯示的專案任務資料的id
            ann_message_id:'',//單一專案公告目前顯示的公告訊息的id
            project_ann_messages:[],//某專案公告所有的公告訊息
            project_nav_open:'information',//單一專案任務頁面-nav區塊 顯示與否
            //拖拉相關
            drag_pt_id:'',
            drag_pst_id:'',
            dropdown:{'item':'','type':'','id':''}, //用於判斷要開啟哪個下拉選單
            //文字編輯器設定
            editor_content:"",
            editing:false,
            create_infor_editor_open:false,//新增訊息區塊 顯示與否
            create_record_editor_open:false,//新增紀錄區塊 顯示與否
            create_message_editor_open:false,//新增訊息區塊(專案公告的) 顯示與否
            //上傳下載
            fileList:[],
            csrfToken:$('meta[name="csrf-token"]').attr('content'),
            amid:'', //公告訊息的編號
        }
    },
    computed: {
   	},
    methods: {
        init: function () {
            let self = this;
            // self.showLoadingBlock();

            self.project_cate = this.cate;

            if(this.userdata.ud_admin){
                self.isadmin = true;
            }else if(this.type == 'pt' && this.userdata.auth.pt_admin){
                self.isadmin = true;
            }else if(this.type == 'ai' && this.userdata.auth.ai_admin){
                self.isadmin = true;
            }else if(this.type == 'bi' && this.userdata.auth.bi_admin){
                self.isadmin = true;
            }

            //傳入的type所牽涉到的設定 'pt' 'pst' ...
            if(this.type == 'pt'){
                var json = {};
                json.type = this.type;
                json.id = this.id;
                axios.post('/getSingleProjectData',json)
                    .then(function (response) {
                        self.project = response.data.project;
                        self.project_id = response.data.project_id;
                        self.single_title = response.data.single_title;
                        self.single_title_sub = response.data.single_title_sub;
                        self.project_infors = response.data.project_infors;
                        self.project_records = response.data.project_records;
                        self.user_tags = response.data.user_tags;
                        self.project_cate = 1;
                        self.project_nav_open='information';
                        self.clickImgToOpenNewTab();
                        self.resetSinglePage();
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else if(this.type == 'pst'){
                var json = {};
                json.type = this.type;
                json.id = this.id;
                axios.post('/getSingleProjectData',json)
                    .then(function (response) {
                        self.project = response.data.project;
                        self.project_id = response.data.project_id;
                        self.single_title = response.data.single_title;
                        self.single_title_sub = response.data.single_title_sub;
                        self.project_infors = response.data.project_infors;
                        self.project_records = response.data.project_records;
                        self.user_reminderdate = response.data.user_reminderdate;self.project_cate = 2;
                        self.project_nav_open='information';
                        self.clickImgToOpenNewTab();
                        self.resetSinglePage();
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else if(this.type == 'ai'){
                var json = {};
                json.id = this.id;
                axios.post('/getSingleAnnouncementData',json)
                    .then(function (response) {
                        self.project_ann = response.data.project_ann;
                        self.project_ann_id = response.data.project_ann_id;
                        self.project_ann_messages = response.data.project_ann_messages;
                        self.user_reminderdate = response.data.user_reminderdate;
                        self.ann_message_id = '';
                        self.resetSinglePage();
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else if(this.type == 'ud' && this.id){
                var json = {};
                json.id = this.id;
                axios.post('/getSingleUserData',json)
                    .then(function (response) {
                        self.user_data = response.data.user_data;
                        self.user_id = response.data.user_id;
                        self.imageurl = response.data.imageurl;
                        self.resetSinglePage();
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else if(this.type == 'al' && this.id){
                var json = {};
                json.id = this.id;
                axios.post('/getSingleAuthorityData',json)
                    .then(function (response) {
                        self.auth_level = response.data.auth_level;
                        self.auth_id = response.data.auth_id;
                        self.resetSinglePage();
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else if(this.type == 'bi' && this.id){
                var json = {};
                json.id = this.id;
                axios.post('/getSingleBookData',json)
                    .then(function (response) {
                        self.book_data = response.data.book_data;
                        self.book_id = response.data.book_id;
                        self.imageurl = response.data.imageurl;
                        self.resetSinglePage();
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }

            if(this.cate == 1 || this.cate == 2){
                var json = {};
                json.cate = this.cate;
                json.group = this.group;
                axios.post('/getSingleCateData',json)
                    .then(function (response) {
                        self.subprojectsort_cate = response.data.subprojectsort_cate;
                        self.executeitem_cate = response.data.executeitem_cate;
                        self.milestone_cate = response.data.milestone_cate;
                        self.requiresort_cate = response.data.requiresort_cate;
                        self.priority_cate = response.data.priority_cate;
                        self.status_cate = response.data.status_cate;
                        self.user_cate = response.data.user_cate;
                        self.pro_type = json.cate;
                        self.resetSinglePage();
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else if(this.cate == 4 || this.cate == 5){
                var json = {};
                json.cate = this.cate;
                json.type = 'ALL';
                axios.post('/getSingleCateData',json)
                    .then(function (response) {
                        self.auths = response.data.auths;
                        self.group_cate = response.data.group_cate;
                        self.type_cate = response.data.type_cate;
                        self.resetSinglePage();
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else if(this.cate == 6){
                var json = {};
                json.cate = this.cate;
                json.type = 'ALL';
                axios.post('/getSingleCateData',json)
                    .then(function (response) {
                        self.book_sort = response.data.book_sort;
                        self.book_status = response.data.book_status;
                        self.user_cate = response.data.user_cate;
                        self.resetSinglePage();
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }
        },
        ////////////////////////檔案上傳下載功能/////////////////////////
        ///
        ///
        ///
        downloadProFile:function(id,name){
            let self = this;
            let type = self.project.ug_id;
            axios({
                methods:'GET',
                url:'/downloadprofile?pi_id='+id+'&name='+name+'&type='+type,
                responseType: 'blob'})
                .then(function (response) {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.style.display = 'none'
                    link.href = url;
                    link.setAttribute('download', name); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        downloadAnnFile:function(id,name){
            let self = this;
            axios({
                methods:'GET',
                url:'/downloadannfile?am_id='+id+'&name='+name,
                responseType: 'blob'})
                .then(function (response) {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.style.display = 'none'
                    link.href = url;
                    link.setAttribute('download', name); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        submitProUpload:function(id){
            let self = this;
            let new_data = [];
            if(!self.editing){
                new_data = $('input[name=newPro]')[0].files;
            }else{
                new_data = $('input[name=upPro]')[0].files;
            }
            let form = new FormData();
            if(new_data.length > 0){
                for(var i = 0 ; i < new_data.length ; i++){
                    form.append("file["+i+"]", new_data[i])
                }
            }
            form.append("type",self.project.ug_id);
            form.append("pi_id",id);
            form.append("nowdata",self.fileList.length > 0 ? JSON.stringify(self.fileList) : '');
            axios.post('/uploadprofile',form)
                .then(function (response) {
                    self.getProjectInfor();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
            
        },
        submitAnnUpload:function(id){
            let self = this;
            let new_data = [];
            if(!self.editing){
                new_data = $('input[name=newAnn]')[0].files;
            }else{
                new_data = $('input[name=upAnn]')[0].files;
            }
            let form = new FormData();
            if(new_data.length > 0){
                for(var i = 0 ; i < new_data.length ; i++){
                    form.append("file["+i+"]", new_data[i])
                }
            }
            
            form.append("am_id",id);
            form.append("nowdata",self.fileList.length > 0 ? JSON.stringify(self.fileList) : '');
            axios.post('/uploadannfile',form)
                .then(function (response) {
                    self.getProjectAnnMessage();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
            
        },
        handleError:function(err, file, fileList){
            return true;
        },
        handleSuccess:function(response, file, fileList){
        },
        handleChange:function(file,filelist){
            let self = this;
            self.fileList = filelist;
        },
        handlePreview:function(file){
            let self = this;
        },
        handleRemove:function(file,filelist){
            let self = this;
            self.fileList = filelist;
        },
        ///
        ///
        ///
        ////////////////////////檔案上傳下載功能 end////////////////////////
        ////////////////////////拖拉功能////////////////////////
        ///
        ///
        ///
        //我們必須阻止某一DOM元素對dragover的默認行為，才能使drop事件在其上正確執行
        allowDrop:function(event){
            event.preventDefault();
        },
        //拖拉對調順序
        dragToChangeProjectSort:function(style,pt_id,pst_id){
            let self = this;
            if(style == 'start'){
                self.drag_pt_id = pt_id;
                self.drag_pst_id = pst_id;
            }else if(style == 'drop'){
                if(self.drag_pt_id == pt_id && self.drag_pst_id != pst_id){
                    var sort = '';
                    var dragTargetIndex = '';
                    var dropTargetIndex = '';
                    var pss_id = '';
                    //先取得是哪個專案底下的子任務排序列表
                    for(var i = 0;i<self.subprojectsort_cate.length;i++){
                        if(self.subprojectsort_cate[i].pt_id == pt_id){
                            sort = JSON.parse(self.subprojectsort_cate[i].pss_sort);
                            pss_id = self.subprojectsort_cate[i].pss_id;
                        }
                    }
                    var newsort = [];
                    //抓取拖拉的目標以及要前往的目標的排序第幾順位
                    for(var i = 0;i<sort.length;i++){
                        if(sort[i] == self.drag_pst_id){
                            dragTargetIndex = i;
                        }else if(sort[i] == pst_id){
                            dropTargetIndex = i;
                        }
                    }
                    //排出新的排序列表
                    for(var i = 0;i<sort.length;i++){
                        //拖拉目標往後移動
                        if(dragTargetIndex < dropTargetIndex){
                            if(sort[i] == self.drag_pst_id){

                            }else{
                                if(sort[i] == pst_id){
                                    newsort.push(sort[i]);
                                    newsort.push(self.drag_pst_id);
                                }else{
                                    newsort.push(sort[i]);
                                }
                            }
                        //拖拉目標往前移動
                        }else if(dragTargetIndex > dropTargetIndex){
                            if(sort[i] == self.drag_pst_id){

                            }else{
                                if(sort[i] == pst_id){
                                    newsort.push(self.drag_pst_id);
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
                                self.getSingleTitle(pt_id);
                                self.getSubProjectsSortCate();
                            }else{
                                self.notification(response.data.string,'failure');
                            }
                        })
                        .catch(function (response) {
                            console.log(response);
                            self.notification('系統出錯','failure');
                        });
                }
            }else if(style == 'end'){
                self.drag_pt_id = '';
                self.drag_pst_id = '';
                self.drag_over_pst_id = '';
            }
        },
        ///
        ///
        ///
        ////////////////////////拖拉功能 end////////////////////////
        ////////////////////////取得所需資料////////////////////////
        ///
        ///
        ///
        //取得單一書籍狀態
        getBookStatusCate:function(){
            let self = this;
            axios.get('/bookstatuscate')
                .then(function (response) {
                    self.book_status = response.data;
                    self.resetSinglePage();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一書籍分類
        getBookSort:function(){
            let self = this;
            axios.get('/booksort')
                .then(function (response) {
                    self.book_sort = response.data;
                    self.resetSinglePage();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一書籍資料
        getBookData:function($bi_id){
            let self = this;
            axios.get('/book/'+$bi_id)
                .then(function (response) {
                    self.book_data = response.data;
                    self.book_id = response.data.bi_id;
                    self.imageurl = response.data.bi_fileurl;
                    self.resetSinglePage();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得全部權限等級資料
        getAuths:function(){
            let self = this;
            var json = {};
            json.order = '';
            json.sort = '';
            axios.post('/auths',json)
                .then(function (response) {
                    self.auths = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一權限等級資料
        getAuthorityLevel:function($al_id){
            let self = this;
            axios.get('/authority/'+$al_id)
                .then(function (response) {
                    self.auth_level = response.data;
                    self.auth_id = response.data.al_id;
                    self.resetSinglePage();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一使用者資料
        getUserData:function($ud_id){
            let self = this;
            axios.get('/user/'+$ud_id)
                .then(function (response) {
                    self.user_data = response.data;
                    self.user_id = response.data.ud_id;
                    self.imageurl = response.data.ud_icon;
                    self.resetSinglePage();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一公告資料
        getProjectAnn:function($ai_id){
            let self = this;

            axios.get('/announcement/'+$ai_id)
                .then(function (response) {
                    self.project_ann = response.data;
                    self.project_ann_id = response.data.ai_id;
                    self.ann_message_id = '';
                    //取得該專案公告的訊息
                    self.getProjectAnnMessage();
                    self.resetSinglePage();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一專案公告的資訊
        getProjectAnnMessage:function(){
            let self = this;
            var json = {};
            if(self.project_ann.ai_id){
                json.ai_id = self.project_ann.ai_id;
            }
            axios.post('/announcementmessages',json)
                .then(function (response) {
                    self.project_ann_messages = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一專案任務資料
        getProject:function($pt_id){
            let self = this;
            axios.get('/project/'+$pt_id)
                .then(function (response) {
                    self.project = response.data;
                    self.project_id = response.data.pt_id;
                    //改變顯示專案類別
                    self.project_cate = 1;
                    //取得該專案任務nav title
                    self.getSingleTitle(response.data.pt_id);
                    //取得該專案任務的專案訊息
                    self.getProjectInfor();
                    //取得該專案任務的專案紀錄
                    self.getProjectRecord();
                    self.resetSinglePage();
                    self.project_nav_open='information';
                    self.getUserTags(response.data.ug_id);
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一專案子任務資料
        getSubProject:function($pst_id){
            let self = this;
            axios.get('/subproject/'+$pst_id)
                .then(function (response) {
                    self.project = response.data;
                    self.project_id = response.data.pst_id;
                    //改變顯示專案類別
                    self.project_cate = 2;
                    //取得該專案任務nav title
                    self.getSingleTitle(response.data.pt_id);
                    //取得該專案任務的專案訊息
                    self.getProjectInfor();
                    //取得該專案任務的專案紀錄
                    self.getProjectRecord();
                    self.resetSinglePage();
                    self.project_nav_open='information';
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得專案訊息
        getProjectInfor:function(){
            let self = this;
            var json = {};
            if(self.project.pt_id){
                json.pt_id = self.project.pt_id;
            }
            if(self.project.pst_id){
                json.pst_id = self.project.pst_id;
            }
            axios.post('/projectinfors',json)
                .then(function (response) {
                    self.project_infors = response.data;
                    self.clickImgToOpenNewTab();
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得專案紀錄
        getProjectRecord:function(){
            let self = this;
            var json = {};
            if(self.project.pt_id){
                json.pt_id = self.project.pt_id;
            }
            if(self.project.pst_id){
                json.pst_id = self.project.pst_id;
            }
            axios.post('/projectrecords',json)
                .then(function (response) {
                    self.project_records = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得單一專案任務頁面左側title
        getSingleTitle:function($pt_id){
            let self = this;
            axios.get('/singletitle/'+$pt_id)
                .then(function (response) {
                    self.single_title = response.data.project;
                    self.single_title_sub = response.data.projectsub;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得群組資料
        getGroupCate:function(){
            let self = this;
            axios.get('/usergroups')
                .then(function (response) {
                    self.group_cate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得部門資料
        getDepartmentCate:function(){
            let self = this;
            axios.get('/usertype')
                .then(function (response) {
                    self.type_cate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得權限等級資料(all)
        // getAuthorityLevelCate:function(){
        //     let self = this;
        //     axios.get('/authoritylevelcate')
        //         .then(function (response) {
        //             self.authoritylevel_cate = response.data;
        //         })
        //         .catch(function (response) {
        //             console.log(response);
        //             self.notification('系統出錯','failure');
        //         });
        // },
        //取得子任務排序資料
        getSubProjectsSortCate:function(){
            let self = this;
            axios.get('/subprojectsortcate')
                .then(function (response) {
                    self.subprojectsort_cate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得執行項目資料
        getExecuteitemCate:function(){
            let self = this;
            axios.get('/executeitemcate')
                .then(function (response) {
                    self.executeitem_cate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得里程碑資料
        getMilestoneCate:function(){
            let self = this;
            axios.get('/milestonecate')
                .then(function (response) {
                    self.milestone_cate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得需求類別資料
        getRequiresortCate:function(){
            let self = this;
            axios.get('/requiresortcate')
                .then(function (response) {
                    self.requiresort_cate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得優先權資料
        getPriorityCate:function(){
            let self = this;
            axios.get('/prioritycate')
                .then(function (response) {
                    self.priority_cate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得狀態資料
        getStatusCate:function(){
            let self = this;
            axios.get('/statuscate')
                .then(function (response) {
                    self.status_cate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得所有使用者
        getAllUserCate:function(){
            let self = this;
            axios.get('/users')
                .then(function (response) {
                    self.user_cate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得各部門使用者
        getUserCate:function(){
            let self = this;
            axios.get('/usercate')
                .then(function (response) {
                    self.user_cate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得使用者自定義標籤
        getUserTags:function(id){
            let self = this;
            var json = {};
            json.ug_id = id;
            json.ud_id = this.userdata.ud_id;
            axios.post('/usertags',json)
                .then(function (response) {
                    self.user_tags = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //取得使用者有設定提醒的專案資料
        getReminderDate:function(id){
            let self = this;
            var json = {};
            json.ud_id = this.userdata.ud_id;
            json.ut_id = this.userdata.ut_id;
            if(this.type == 'ai'){
                json.ai_id = id;
            }else{
                json.pst_id = id;
            }
            axios.post('/userreminderdate',json)
                .then(function (response) {
                    self.user_reminderdate = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //將所選的權限等級填入使用者資料裡
        selectAuth:function(auth){
            let self = this;
            self.user_data.al_id = auth.al_id;
            self.user_data.al_name = auth.al_name;
            self.user_data.al_remark = auth.al_remark;
            self.user_data.pt_admin = auth.pt_admin;
            self.user_data.ai_admin = auth.ai_admin;
            self.user_data.pm_admin = auth.pm_admin;
            self.user_data.bi_admin = auth.bi_admin;
        },
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
                self.notification('上傳圖示只能是JPG或PNG格式','failure');
            }else{
                this.getBase64(file.raw).then(res => {
                    if(this.type == 'bi'){
                        self.book_data.bi_fileurl = res;
                    }else if(this.type == 'ud'){
                        self.user_data.ud_icon = res;
                    }
                    self.imageurl = res;
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
        //如果未達某位數就補0
        zeroPadding:function(num, digit){
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        ///
        ///
        ///
        ////////////////////////取得所需資料 end////////////////////
        ////////////////////////打開或關閉某物件////////////////////
        ///
        ///
        ///
        //計算年資
        showSeniority:function(ud_code){
            let self = this;
            var year = ud_code.substr(0,4);
            var month = ud_code.substr(4,2);
            var day = ud_code.substr(6,2);
            var date = year + '-' + month + '-' + day;

            var now = new Date();
            var num = parseInt(Math.abs((Date.parse(now)).valueOf() - (Date.parse(date)).valueOf()) / 1000 / 60 / 60 / 24 / 365)
            return num;
        },
        //顯示input
        showInput:function(){
            let self = this;
            $('.project_name input').removeClass('none');
            $('.project_name span').addClass('none');
            $('.project_name input').focus();
        },
        //顯示loading區塊
        showLoadingBlock:function(){
            let self = this;
            // self.sub_loading = true;
            setTimeout(function(){
                self.sub_loading = false;
            },1000);
        },
        //展開或關閉單一專案頁面其中一個紀錄
        viewMore:function(id){
            let self = this;
            var target = '.item'+id;
            if($(target).find('.record_content').hasClass('close')){
                $(target).find('.record_content').removeClass('close');
            }else{
                $(target).find('.record_content').addClass('close');
            }
        },
        //展開或關閉單一公告頁面其中一個資訊
        openThisMessageItem:function(id){
            let self = this;
            var target = '.item'+id;
            self.editing = false;
            if($(target).find('.infor_content').hasClass('close')){
                $(target).find('.infor_content').removeClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
            }else{
                $(target).find('.infor_content').addClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-down');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-up');
            }
        },
        //展開或關閉單一專案頁面其中一個資訊
        openThisInforItem: function(id){
            let self = this;
            var target = '.infor'+id;
            self.editing = false;
            if($(target).find('.infor_content').hasClass('close')){
                $(target).find('.infor_content').removeClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
            }else{
                $(target).find('.infor_content').addClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-down');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-up');
            }
        },
        openThisMessageEditor:function(id,am_fileurl){
            let self = this;
            var target = '.item'+id;
            self.editing = true;
            if(am_fileurl){
                self.fileList = JSON.parse(am_fileurl);
            }else{
                self.fileList = [];
            }
            if(self.ann_message_id != '' && self.ann_message_id != id){
                var ex_target = '.infor'+self.ann_message_id;
                $(ex_target).find('.infor_content').removeClass('close');
                $(ex_target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(ex_target).find('.infor_icon').addClass('fa-chevron-circle-down');
            }
            self.ann_message_id = id;
            $(target).find('.infor_content').addClass('close');
            $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
            $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
        },
        closeMessageEditor:function(){
            let self = this;
            self.editing = false;
            self.ann_message_id = '';
            $('.infor_content').removeClass('close');
        },
        openThisInforEditor:function(id,pi_fileurl){
            let self = this;
            var target = '.infor'+id;
            self.editing = true;
            if(pi_fileurl){
                self.fileList = JSON.parse(pi_fileurl);
            }else{
                self.fileList = [];
            }
            if(self.project_infor_id != '' && self.project_infor_id != id){
                var ex_target = '.infor'+self.project_infor_id;
                $(ex_target).find('.infor_content').removeClass('close');
                $(ex_target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(ex_target).find('.infor_icon').addClass('fa-chevron-circle-down');
            }
            self.project_infor_id = id;
            $(target).find('.infor_content').addClass('close');
            $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
            $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
        },
        closeInforEditor:function(){
            let self = this;
            self.editing = false;
            self.project_infor_id = '';
            $('.infor_content').removeClass('close');
        },
        //點擊圖片開新視窗
        clickImgToOpenNewTab:function(){
            setTimeout(function(){
                $('.message img').unbind();
                $('.message img').on('click',function(){
                    var string = $(this).prop('src');
                    var iframe = "<iframe width='100%' height='100%' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes' src='" + string + "'></iframe>"
                    var x = window.open();
                    x.document.open();
                    x.document.write(iframe);
                    x.document.close();
                })
                $('.message a').prop('target','_blank');
            },1000)
        },
        //判斷是否能打開
        checkToOpen:function(item,type,id){
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
            if(boolean){
                if(self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id){
                    self.dropdown.item = '';
                    self.dropdown.type = '';
                    self.dropdown.id = '';
                }else{
                    self.dropdown.item = item;
                    self.dropdown.type = type;
                    self.dropdown.id = id;
                }
            }
        },
        //關閉月曆
        closeDateTimePicker:function(obj){
            let self = this;
            if(obj){
                self.dropdown.item = '';
                self.dropdown.type = '';
                self.dropdown.id = '';
            }
        },
        //關閉目前的單一頁面
        closeNowPage:function(){
            let self = this;
            self.$emit('get-close',true);
        },
        ///
        ///
        ///
        ////////////////////////打開或關閉某物件 end////////////////
        ///////////////////////////新增相關///////////////////////////
        ///
        ///
        ///
        //新增公告訊息
        createMessage:function(){
            let self = this;
            var json = {};
            //檢查各欄位是否確實填入
            if($('input[name=am_title]').val() != ''){
                json.am_title = $('input[name=am_title]').val();
            }else{
                self.notification('公告標題尚未填入','failure');
                return false;
            }
            if($('.vue-html5-editor .content').html() != ''){
                json.am_message = $('.vue-html5-editor .content').html();
            }else{
                self.notification('公告內容尚未填入','failure');
                return false;
            }

            json.ai_id = self.project_ann.ai_id;
            axios.post('/announcement-create/2',json) //新增 - 公告訊息
                .then(function (response) {
                    if(response.data.result){
                        self.submitAnnUpload(response.data.id);
                        self.create_message_editor_open = false;
                        self.clickImgToOpenNewTab();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統錯誤','failure');
                });
        },
        //新增專案子任務
        createSubProject:function(pt_id){
            let self = this;
            var json = {};
            json.pt_id = pt_id;
            if($('.create_subproject_input textarea[name=pst_name]').val() != ''){
                json.pst_name = $('.create_subproject_input textarea[name=pst_name]').val();
            }else{
                self.notification('請填入子任務名稱','failure');
                return false;
            }
            axios.post('/project-create/2',json) //新增 - 專案子任務
                .then(function (response) {
                    if(response.data.result){
                        //設定單一專案任務id
                        self.project_id = response.data.id;
                        self.getSubProject(self.project_id);
                        $('textarea[name=pst_name]').val('');
                        self.sub_project_input_open = false;
                        //變更單一專案顯示類別為專案主任務
                        self.project_cate = 2;
                        self.getSubProjectsSortCate();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //新增專案訊息
        createInformation:function(){
            let self = this;
            var json = {};
            //檢查各欄位是否確實填入
            if($('input[name=pi_title]').val() != ''){
                json.pi_title = $('input[name=pi_title]').val();
            }else{
                self.notification('訊息標題尚未填入','failure');
                return false;
            }
            if($('.vue-html5-editor .content').html() != ''){
                json.pi_message = $('.vue-html5-editor .content').html();
            }else{
                self.notification('訊息內容尚未填入','failure');
                return false;
            }

            if(self.project_cate == 1){
                json.pt_id = self.project.pt_id;
            }else if(self.project_cate == 2){
                json.pt_id = self.project.pt_id;
                json.pst_id = self.project.pst_id;
            }
            axios.post('/project-create/3',json) //新增 - 專案訊息
                .then(function (response) {
                    if(response.data.result){
                        self.submitProUpload(response.data.id);
                        // self.project_infors = response.data.data;
                        self.create_infor_editor_open = false;
                        self.clickImgToOpenNewTab();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //新增專案紀錄
        createRecord:function(){
            let self = this;
            var json = {};
            //檢查各欄位是否確實填入
            if($('.vue-html5-editor .content').html() != ''){
                json.pr_message = $('.vue-html5-editor .content').html();
            }else{
                self.notification('紀錄內容尚未填入','failure');
                return false;
            }

            if(self.project_cate == 1){
                json.pt_id = self.project.pt_id;
            }else if(self.project_cate == 2){
                json.pt_id = self.project.pt_id;
                json.pst_id = self.project.pst_id;
            }
            axios.post('/project-create/4',json) //新增 - 專案紀錄
                .then(function (response) {
                    if(response.data.result){
                        self.project_records = response.data.data;
                        self.create_record_editor_open = false;
                        self.clickImgToOpenNewTab();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        ///
        ///
        ///
        ////////////////////////新增相關 end///////////////////////
        ////////////////////////修改相關///////////////////////////
        ///
        ///
        ///
        //設定書籍所有人
        changeBookUser:function(ud_id,ud_name){
            let self = this;
            self.book_data.ud_id = ud_id;
            self.book_data.ud_name = ud_name;
        },
        //設定進貨日期
        changePurchaseDate:function(obj){
            let self = this;
            self.book_data.bi_purchasedate = obj.date;
        },
        //新增或修改書籍
        changeBook:function(){
            let self = this;
            var json = {};
            json = self.book_data;
            //檢查全部欄位是否填入
            if(!json.bi_name){
                self.notification('請填入書籍名稱','failure');
                return false;
            }else if(!json.bs_id){
                self.notification('請選擇分類','failure');
                return false;
            }else if(!json.bi_purchasedate){
                self.notification('請選擇進貨日期','failure');
                return false;
            }else if(!json.ud_id){
                self.notification('請設定所有人','failure');
                return false;
            }else if(!json.bsc_id){
                self.notification('請設定狀態','failure');
                return false;
            }else if(!json.bi_fileurl){
                self.notification('請上傳一張書籍圖片','failure');
                return false;
            }
            if(self.book_id){
                json.bi_id = self.book_id;
                axios.post('/book-modify/4',json) //修改書籍
                    .then(function (response) {
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                            self.closeNowPage();
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else{
                axios.post('/book-create/4',json) //新增書籍
                    .then(function (response) {
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                            self.closeNowPage();
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }
        },
        //新增或修改使用者資料
        changeUserData:function(){
            let self = this;
            var json = {};
            json = self.user_data;
            //檢查帳號
            if(!self.user_id){
                if(!json.ud_account){
                    self.notification('請填入帳號','failure');
                    return false;
                }else if(/[^0-9A-Za-z]/g.test(json.ud_account)){
                    self.notification('帳號只能是英文和數字的組合字串','failure');
                    return false;
                }
            }
            
            //檢查密碼
            if(self.user_id){ //修改
                if(json.ud_password && json.ud_password_confirm){
                    if(json.ud_password != json.ud_password_confirm){
                        self.notification('密碼與確認密碼不相符','failure');
                        return false;
                    }
                }
            }else{ //新增
                if(!json.ud_password){
                    self.notification('請填入密碼','failure');
                    return false;
                }else if(!json.ud_password_confirm){
                    self.notification('請填入確認密碼','failure');
                    return false;
                }else if(json.ud_password != json.ud_password_confirm){
                    self.notification('密碼與確認密碼不相符','failure');
                    return false;
                }
            }

            //檢查必填欄位
            if(!json.ud_name){
                self.notification('請填入使用者名稱','failure');
                return false;
            }else if(!json.ut_id){
                self.notification('請選擇部門','failure');
                return false;
            }else if(!json.ug_id){
                self.notification('請選擇群組','failure');
                return false;
            }

            //檢查選填項目
            if(json.ud_code){
                var reg = /^[\d]+$/;
                var boolean = reg.test(json.ud_code);
                if(!boolean){
                    self.notification('員工代號只能輸入數字','failure');
                    return false;
                }else if(json.ud_code.length != 10){
                    self.notification('員工代號只限10碼','failure');
                    return false;
                }
            }

            //檢查是否設定權限
            if(!json.al_id){
                self.notification('請選擇權限等級','failure');
                return false;
            }

            if(self.user_id){
                axios.post('/user-modify/1',json) //修改使用者資料
                    .then(function (response) {
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                            self.closeNowPage();
                            if(!self.isadmin){
                                var sub_json = {};
                                sub_json.url_message = json.ud_name + '修改了個人資料';
                                var f_year = self.zeroPadding(1900 + new Date().getYear(),4);
                                var f_month = self.zeroPadding(1 + new Date().getMonth(),2);
                                var f_day = self.zeroPadding(new Date().getDate(),2);
                                sub_json.url_reminderdate =f_year + '-' + f_month + '-' + f_day;
                                axios.post('/reminderdate-modify',sub_json) //修改使用者資料
                                    .then(function (response) {

                                    })
                                    .catch(function (response) {
                                        console.log(response);
                                        self.notification('系統出錯','failure');
                                    });
                            }
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else{
                axios.post('/user-create/1',json) //新增使用者資料
                    .then(function (response) {
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                            self.closeNowPage();
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }
        },
        //新增或修改權限等級
        changeAuthorityLevel:function(){
            let self = this;
            var json = {};
            json = self.auth_level;
            //檢查全部欄位是否填入
            if(!json.al_name){
                self.notification('請填入權限名稱','failure');
                return false;
            }else if(!json.pt_admin && json.pt_admin != 0){
                self.notification('請設定專案權限','failure');
                return false;
            }else if(!json.ai_admin && json.ai_admin != 0){
                self.notification('請設定公告權限','failure');
                return false;
            }else if(!json.pm_admin && json.pm_admin != 0){
                self.notification('請設定資產權限','failure');
                return false;
            }else if(!json.bi_admin && json.bi_admin != 0){
                self.notification('請設定書籍權限','failure');
                return false;
            }
            if(self.auth_id){
                json.al_id = self.auth_id;
                axios.post('/auth-modify/7',json) //修改權限等級
                    .then(function (response) {
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                            self.closeNowPage();
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else{
                axios.post('/auth-create/7',json) //新增權限等級
                    .then(function (response) {
                        if(response.data.result){
                            self.notification(response.data.string,'success');
                            self.closeNowPage();
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }
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
                        self.getUserData($ud_id);
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //修改使用者暱稱
        changeUserName:function(){
            let self = this;
            var json = {};
            json.ud_id = self.user_id;
            //檢查各欄位是否確實填入
            if($('input[name=ud_name]').val() != ''){
                json.ud_name = $('input[name=ud_name]').val();
            }else{
                self.notification('使用者暱稱不能為空','failure');
                return false;
            }

            axios.post('/user-modify/1',json) //修改 - 公告資訊
                .then(function (response) {
                    if(response.data.result){
                        self.getUserData(self.user_id);
                        self.notification(response.data.string,'success');
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    console.log(response);
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
            if(self.isadmin){
                axios.post('/announcement-modify/1',json) //修改 - 公告資訊
                    .then(function (response) {
                        if(response.data.result){
                            self.getProjectAnn(id);
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }
        },
        //修改公告標題
        changeAnnTitle:function(){
            let self = this;
            var json = {};
            json.ai_id = self.project_ann_id;
            //檢查各欄位是否確實填入
            if($('input[name=ai_title]').val() != ''){
                json.ai_title = $('input[name=ai_title]').val();
            }else{
                self.notification('公告標題不能為空','failure');
                return false;
            }
            axios.post('/announcement-modify/1',json) //修改 - 公告資訊
                .then(function (response) {
                    if(response.data.result){
                        self.project_ann.ai_title = json.ai_title;
                        self.notification(response.data.string,'success');
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //修改公告訊息
        changeMessage:function(id){
            let self = this;
            var target = '.item'+id;
            var json = {};
            json.am_id = id;
            //檢查各欄位是否確實填入
            if($(target).find('.am_title').val() != ''){
                json.am_title = $('input[name=am_title]').val();
            }else{
                self.notification('公告標題尚未填入','failure');
                return false;
            }
            if($(target).find('.vue-html5-editor .content').html() != ''){
                json.am_message = $('.vue-html5-editor .content').html();
            }else{
                self.notification('公告內容尚未填入','failure');
                return false;
            }
            json.ai_id = self.project_ann.ai_id;
            axios.post('/announcement-modify/2',json) //修改 - 公告訊息
                .then(function (response) {
                    if(response.data.result){
                        self.submitAnnUpload(id);
                        self.editing = false;
                        var target = '.item'+self.ann_message_id;
                        $(target).find('.infor_content').removeClass('close');
                        $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                        $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
                        self.ann_message_id = '';
                        self.notification(response.data.string,'success');
                        self.clickImgToOpenNewTab();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //修改到期日期 - 專案公告
        changeAnnExecutiondate:function(obj){
            let self = this;
            var json = {};
            json.ai_id = obj.ai_id;
            json.ai_expirydate = obj.date;
            axios.post('/announcement-modify/1',json) //修改 - 公告資訊
                .then(function (response) {
                    if(response.data.result){
                        self.project_ann.ai_expirydate = json.ai_expirydate;
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //修改專案訊息
        changeInformation:function(id){
            let self = this;
            var target = '.item'+id;
            var json = {};
            json.pi_id = id;
            //檢查各欄位是否確實填入
            if($(target).find('.pi_title').val() != ''){
                json.pi_title = $('input[name=pi_title]').val();
            }else{
                self.notification('訊息標題尚未填入','failure');
                return false;
            }
            if($(target).find('.vue-html5-editor .content').html() != ''){
                json.pi_message = $('.vue-html5-editor .content').html();
            }else{
                self.notification('訊息內容尚未填入','failure');
                return false;
            }
            if(self.project_cate == 1){
                json.pt_id = self.project.pt_id;
            }else if(self.project_cate == 2){
                json.pt_id = self.project.pt_id;
                json.pst_id = self.project.pst_id;
            }
            axios.post('/project-modify/3',json) //修改 - 專案訊息
                .then(function (response) {
                    if(response.data.result){
                        self.submitProUpload(id);
                        self.editing = false;
                        var target = '.infor'+self.project_infor_id;
                        $(target).find('.infor_content').removeClass('close');
                        $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                        $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
                        self.project_infor_id = '';
                        self.notification(response.data.string,'success');
                        self.clickImgToOpenNewTab();
                    }else{
                        self.notification(response.data.string,'failure');
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯','failure');
                });
        },
        //修改標籤
        changeTag:function(id){
            let self = this;
            var json = {};
            json.pt_id = self.project_id;
            json.tm_id = id;
            self.changeForProject('pt',self.project_id,json);
        },
        //修改執行時間
        changeSpendTime:function(pst_id){
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            if($('input[name=pst_spendtime]').val() != ''){
                json.pst_spendtime = $('input[name=pst_spendtime]').val();
            }else{
                self.notification('請填入執行時間','failure');
                return false;
            }
            self.changeForProject('pst',pst_id,json);
        },
        //修改執行項目
        changeExecuteItem:function(pst_id,peic_id){
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            json.peic_id = peic_id;
            self.changeForProject('pst',pst_id,json);
        },
        //修改狀態
        changeStatus:function(pst_id,psc_id){
            let self = this
            var json = {};
            json.pst_id = pst_id;
            json.psc_id = psc_id;
            self.changeForProject('pst',pst_id,json);
        },
        //修改執行人
        changeUser:function(pst_id,ud_id){
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            json.ud_id = ud_id;
            self.changeForProject('pst',pst_id,json);
        },
        //修改專案主任務名稱或子任務名稱
        changeProjectName:function(){
            let self = this;
            var json = {};
            if(self.project_cate == 1){
                json.pt_id = self.project_id;
                json.ug_id = self.project_ug_id;
                json.pt_name = $('.project_name input[name=pt_name]').val();
                self.changeForProject('pt',self.project_id,json);
            }else if(self.project_cate == 2){
                json.pst_id = self.project_id;
                json.pt_id = self.project.pt_id;
                json.ug_id = self.project_ug_id;
                json.pst_name = $('.project_name input[name=pst_name]').val();
                self.changeForProject('pst',self.project_id,json);
            }
        },
        //修改里程碑
        changeMilestone:function($pmc_id){
            let self = this;
            var json = {};
            json.pt_id = self.project_id;
            json.pmc_id = $pmc_id;
            self.changeForProject('pt',self.project_id,json);
        },
        //修改優先權
        changePriority:function($ppc_id){
            let self = this;
            var json = {};
            if(self.project_cate == 1){
                json.pt_id = self.project_id;
                json.ppc_id = $ppc_id;
                self.changeForProject('pt',self.project_id,json);
            }else if(self.project_cate == 2){
                json.pst_id = self.project_id;
                json.ppc_id = $ppc_id;
                self.changeForProject('pst',self.project_id,json);
            }
        },
        //修改需求類別
        changeRequireSort:function($prsc_id){
            let self = this;
            var json = {};
            if(self.project_cate == 1){
                json.pt_id = self.project_id;
                json.prsc_id = $prsc_id;
                self.changeForProject('pt',self.project_id,json);
            }else if(self.project_cate == 2){
                json.pst_id = self.project_id;
                json.prsc_id = $prsc_id;
                self.changeForProject('pst',self.project_id,json);
            }
        },
        //修改需求日期
        changeRequireDate:function(obj){
            let self = this;
            var json = {};
            if(self.project_cate == 1){
                json.pt_id = obj.pt_id;
                json.pt_requiredate = obj.date;
                self.changeForProject('pt',obj.pt_id,json);
            }else if(self.project_cate == 2){
                json.pst_id = obj.pst_id;
                json.pst_requiredate = obj.date;
                self.changeForProject('pst',obj.pst_id,json);
            }
        },
        //修改執行日期
        changeExecutiondate:function(obj){
            let self = this;
            var json = {};
            json.pst_id = obj.pst_id;
            json.pst_executiondate = obj.date;
            self.changeForProject('pst',obj.pst_id,json);
        },
        //修改完成日期
        changeCompletiondate:function(obj){
            let self = this;
            var json = {};
            json.pst_id = obj.pst_id;
            json.pst_completiondate = obj.date;
            self.changeForProject('pst',obj.pst_id,json);
        },
        //修改提醒時間
        changeReminderdate:function(obj){
            let self = this;
            var json = {};
            json.ud_id = this.userdata.ud_id;
            json.url_id = obj.url_id;
            json.url_reminderdate = obj.date;
            if(this.type == 'ai'){
                json.ai_id = self.project_ann_id;
            }else{
                json.pst_id = self.project_id;
            }
            var now = new Date();
            if ( (Date.parse(obj.date)).valueOf() < (Date.parse(now)).valueOf()){
                self.notification('提醒時間不能早於現在','failure');
            }else{
                axios.post('/reminderdate-modify',json) //修改 - 提醒時間
                    .then(function (response) {
                        if(response.data.result){
                            if(json.pst_id){
                                self.getReminderDate(self.project_id);
                            }else if(json.ai_id){
                                self.getReminderDate(self.project_ann_id);
                            }
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                        self.closeAllDropdownMenu();
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                        self.closeAllDropdownMenu();
                    });
            }
        },
        //修改備份相關資訊
        changeBackupDate:function(id){
            let self = this;
            var json = {};
            json.pt_id = id;
            if($('input[name=pt_backupurl]').val() != ''){
                json.pt_backup = 1;
                json.pt_backupurl = $('input[name=pt_backupurl]').val();
            }else{
                self.notification('請填入備份路經方可備份','failure');
                return false;
            }
            self.changeForProject('pt',id,json);
        },
        //專案相關統一由這個送到後端
        changeForProject:function(type,id,json){
            let self = this;
            if(type == 'pt'){
                axios.post('/project-modify/1',json) //修改 - 專案任務
                    .then(function (response) {
                        self.closeAllDropdownMenu();
                        if(response.data.result){
                            self.getProject(id);
                            $('.pro .project_name input').addClass('none');
                            $('.pro .project_name span').removeClass('none');
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                        self.closeAllDropdownMenu();
                    });
            }else if(type == 'pst'){
                axios.post('/project-modify/2',json) //修改 - 專案子任務
                    .then(function (response) {
                        self.closeAllDropdownMenu();
                        if(response.data.result){
                            self.getSubProject(id)
                            $('.pro .project_name input').addClass('none');
                            $('.pro .project_name span').removeClass('none');
                        }else{
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                        self.closeAllDropdownMenu();
                    });
            }
        },
        ///
        ///
        ///
        ////////////////////////修改相關 end///////////////////////
        ////////////////////////刪除相關///////////////////////////
        ///
        ///
        ///
        //刪除專案任務相關的資料
        deleteProject:function(){
            let self = this;
            self.show_submit_btn = false;
            setTimeout(function(){
                self.show_submit_btn = true;
            },1000)
            var json = {};
            if(self.pro_type !== ''){
                if(self.pro_type == 1){
                    json.pt_id = self.delete_id;
                }else if(self.pro_type == 2){
                    json.pst_id = self.delete_id;
                }else if(self.pro_type == 3){
                    json.pi_id = self.delete_id;
                }else if(self.pro_type == 4){
                    json.pr_id = self.delete_id;
                }
                axios.post('/project-delete/'+self.pro_type,json) //刪除 - 專案訊息
                    .then(function (response) {
                        if(self.pro_type == 1){
                            self.$emit('get-close',true);
                        }else if(self.pro_type == 2){
                            self.getProject(self.project.pt_id);
                        }else if(self.pro_type == 3){
                            self.getProjectInfor();
                        }else if(self.pro_type == 4){
                            self.getProjectRecord();
                        }
                        if(response.data.result){
                            self.closePrompt();
                            self.notification(response.data.string,'success');
                        }else{
                            self.closePrompt();
                            self.notification(response.data.string,'failure');
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯','failure');
                    });
            }else if(self.ann_type !== ''){
                if(self.ann_type == 1){
                    json.ai_id = self.delete_id;
                }else if(self.ann_type == 2){
                    json.am_id = self.delete_id;
                }else if(self.ann_type == 4){
                    json.bi_id = self.delete_id;
                }
                if(self.ann_type == 1 || self.ann_type == 2){
                    axios.post('/announcement-delete/'+self.ann_type,json) //刪除 - 公告相關
                        .then(function (response) {
                            if(self.ann_type == 1){
                                self.getProjectAnns();
                            }else if(self.ann_type == 2){
                                self.getProjectAnnMessage();
                            }
                            if(response.data.result){
                                self.closePrompt();
                                self.notification(response.data.string,'success');
                            }else{
                                self.closePrompt();
                                self.notification(response.data.string,'failure');
                            }
                        })
                        .catch(function (response) {
                            console.log(response);
                            self.notification('系統出錯','failure');
                        });
                }else{
                    axios.post('/book-delete/'+self.ann_type,json) //刪除 - 書籍
                        .then(function (response) {
                            if(response.data.result){
                                self.closePrompt();
                                self.notification(response.data.string,'success');
                                if(self.ann_type == 4){
                                    self.closeNowPage();
                                }
                            }else{
                                self.closePrompt();
                                self.notification(response.data.string,'failure');
                            }
                        })
                        .catch(function (response) {
                            console.log(response);
                            self.notification('系統出錯','failure');
                        });
                }
            }else if(self.user_type !== ''){
            }

        },
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
        ///
        ///
        ///
        ////////////////////////刪除相關 end///////////////////////
        ////////////////////////提示框/////////////////////////////
        ///
        ///
        ///
        //重置單一專案頁面所有設定
        resetSinglePage:function(){
            let self = this;
            self.create_infor_editor_open = false;
            self.create_record_editor_open = false;
            self.create_message_editor_open = false;
            self.editing = false;
            self.project_record_id = '';
            self.project_infor_id = '';
        },
        //關閉所有彈出的下拉選單
        closeAllDropdownMenu:function(){
            let self = this;
            self.dropdown.item ='';
            self.dropdown.type ='';
            self.dropdown.id ='';
        },
        colseInput:function(e){
            let self = this;
            var classname = e.target.className;
            var array = ['pro_input','ann_input'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if(classname.match(array[i])){
                    boolean = false;
                }
            }
            if(boolean){
                $('.pro .project_name input').addClass('none');
                $('.pro .project_name span').removeClass('none');
                $('.ann .project_name input').addClass('none');
                $('.ann .project_name span').removeClass('none');

            }
        },
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
                self.dropdown.item = '';
                self.dropdown.type = '';
                self.dropdown.id = '';
            }
        },
        ///
        ///
        ///
        ////////////////////////刪除相關 end///////////////////////
        ////////////////////////提示框/////////////////////////////
        ///
        ///
        ///
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
        //關閉提示框
        closePrompt:function(){
            let self = this;
            self.prompt_box_open = false;
            $('html').removeClass('over_hidden');
        },
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
        //開啟刪除專案的提示詢問窗
        openDeleteProjectPromptBox:function(id,type){//1.專案主任務 2.專案子任務 3.專案訊息 4.專案紀錄 5.標籤
            let self = this;
            var string = '';
            if(type == 6){
                self.ann_type = type;
                self.pro_type = '';
                self.delete_id = id;
            }else{
                self.ann_type = '';
                self.pro_type = type;
                self.delete_id = id;
            }
            if(type == 1){
                string = '確定要刪除該專案任務？';
            }else if(type == 2){
                string = '確定要刪除該專案子任務？';
            }else if(type == 3){
                string = '確定要刪除該專案訊息？';
            }else if(type == 4){
                string = '確定要刪除該專案紀錄？';
            }
            self.prompt(string,'question',false);
        },
        //開啟刪除公告的提示詢問窗
        openDeleteAnnPromptBox:function(id,type){//1.公告資訊 2.公告訊息 4.書籍
            let self = this;
            var string = '';
            self.pro_type = '';
            self.ann_type = type;
            self.delete_id = id;
            if(type == 1){
                string = '確定要刪除該公告資訊？';
            }else if(type == 2){
                string = '確定要刪除該公告訊息？';
            }else if(type == 4){
                string = '確定要刪除該書籍？';
            }
            self.prompt(string,'question',false);
        },
        ///
        ///
        ///
        ////////////////////////提示框 end/////////////////////////
    },
    watch: {

	},
    mounted: function () {
        this.init();
    }
}
</script>