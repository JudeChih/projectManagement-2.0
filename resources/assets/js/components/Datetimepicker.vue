<style scoped>

</style>

<template>
    <div id="datetimepicker" class="dd_wrap" v-bind:class="{'top':top_or_bottom,'bottom':!top_or_bottom}">
        <div class="header dd_wrap">
            <div class="selected_date dd_wrap">
                <p class="dd_wrap" v-if="istime">{{new_date}} {{new_time}}</p>
                <p class="dd_wrap" v-else>{{new_date}}</p>
            </div>
            <div class="datetime_title dd_wrap">
                <p class="dd_wrap">{{now_page_year}}年{{now_page_month+1}}月</p>
                <div class="btn_group dd_wrap">
                    <i class="fas fa-arrow-left dd_wrap" @click="changeMonth('pre')"></i>
                    <i class="fas fa-circle dd_wrap" @click="changeMonth('today')" title="回到當月"></i>
                    <i class="fas fa-arrow-right dd_wrap" @click="changeMonth('next')"></i>
                </div>
            </div>
        </div>
        <div class="container dd_wrap">
            <div class="week dd_wrap">
                <div v-for="week in week_en" class="item dd_wrap">{{week}}</div>
            </div>
            <div class="daysForMonth dd_wrap">
                <div v-for="date in data_for_month" class="item dd_wrap" v-bind:class="{'current':today.day == date.day && today.month == date.month && today.year == date.year}" @click="selectThisDay(date.year,date.month,date.day)">{{date.day}}</div>
            </div>
            <div v-if="istime" class="time dd_wrap">
                <div class="selected_time dd_wrap">
                    <i class="far fa-alarm-clock dd_wrap"></i><input type="number" min="0" max="23" class="hour dd_wrap" @change="selectThisTime()" :value="totime.hour"><span class="dd_wrap">：</span><input type="number" min="0" max="59" class="minute dd_wrap" @change="selectThisTime()" :value="totime.minute">
                </div>
            </div>
        </div>
        <div class="footer dd_wrap">
            <div class="btn_group dd_wrap">
                <div class="btn_cancel dd_wrap" @click="closeDateTimePicker()">取消</div>
                <div class="btn_submit dd_wrap" @click="submitDate()">確定</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'datetimepicker',
    props: {
        id:'',
        date:'',
        type:'',
        time:'',//date:只顯示日期不顯示時間、time:顯示日期與時間
        position:'',//點擊目標在畫面上的座標
    },
	data() {
        return {
            week_en:['Su','Mo','Tu','We','Th','Fr','Sa'],
            now_page_year:'',//當頁年份
            now_page_month:'',//當頁月份
            today:{'year':'','month':'','day':''},//當天年月日
            totime:{'hour':'00','minute':'00'},//當天小時分鐘
            month_olympic:[31,29,31,30,31,30,31,31,30,31,30,31],//閏年每月天數
            month_normal:[31,28,31,30,31,30,31,31,30,31,30,31],//正常年每月天數
            new_date:'',//所選日期
            new_time:'',//所選時間
            istime:false,
            top_or_bottom:false,// true = top , false = bottom 月曆會在目標的上方還是下方
        }
    },
    computed: {
    	data_for_month:function(){
            let self = this;
            var array_a = [];
            var result_arr = [];
            var totalDay = self.daysMonth(self.now_page_month, self.now_page_year); //獲取該月總天數
            var firstDay = self.dayStart(self.now_page_month, self.now_page_year); //获取该月第一天是星期几
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
                var cd = new Date(self.now_page_year, self.now_page_month, i+1);
                json.week = cd.getDay();
                json.day  = cd.getDate();
                json.month = self.now_page_month;
                json.year = self.now_page_year;
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
   	},
    methods: {
        init: function () {
            let self = this;
            if(this.position){
                var index_height = $(window).height();
                if(index_height - this.position.y < 400){
                    self.top_or_bottom = true;
                }else{
                    self.top_or_bottom = false;
                }
            }
            if(this.date){
                var cd = new Date(this.date);
                if(this.time){
                    if(cd.getHours() < 10){
                        self.totime.hour = '0' + cd.getHours();
                    }else{
                        self.totime.hour = cd.getHours();
                    }
                    if(cd.getMinutes() < 10){
                        self.totime.minute = '0' + cd.getMinutes();
                    }else{
                        self.totime.minute = cd.getMinutes();
                    }
                    self.new_time = self.totime.hour + ':' + self.totime.minute;
                }
            }else{
                var cd = new Date();
                if(this.time){
                    if(cd.getHours() < 10){
                        self.totime.hour = '0' + cd.getHours();
                    }else{
                        self.totime.hour = cd.getHours();
                    }
                    if(cd.getMinutes() < 10){
                        self.totime.minute = '0' + cd.getMinutes();
                    }else{
                        self.totime.minute = cd.getMinutes();
                    }
                    self.new_time = self.totime.hour + ':' + self.totime.minute;
                }
            }
            if(this.time){
                self.istime = true;
            }else{
                self.istime = false;
            }
            self.now_page_year = cd.getFullYear();
            self.now_page_month = cd.getMonth();
            self.today.year = cd.getFullYear();
            self.today.month = cd.getMonth();
            self.today.day = cd.getDate();
            self.new_date = cd.getFullYear() + "-" + (cd.getMonth()+1) + "-" + cd.getDate();
        },
        //刪除該欄位日期的設定
        closeDateTimePicker:function(){
            let self = this;
            var json = {};
            if(this.type == 'pt_id'){
                json.pt_id = this.id;
            }else if(this.type == 'pst_id'){
                json.pst_id = this.id;
            }else if(this.type == 'ai_id'){
                json.ai_id = this.id;
            }else if(this.type == 'url_id'){
                json.url_id = this.id;
            }
            json.date = '';
            self.$emit('get-newdate',json);

            self.now_page_year = '';
            self.now_page_month = '';
            self.today = {'year':'','month':'','day':''};
            self.totime = {'hour':'','minute':''};
            self.$emit('get-close',true);
        },
        //送出日期
        submitDate:function(){
            let self = this;
            var json = {};
            if(this.type == 'pt_id'){
                json.pt_id = this.id;
            }else if(this.type == 'pst_id'){
                json.pst_id = this.id;
            }else if(this.type == 'ai_id'){
                json.ai_id = this.id;
            }else if(this.type == 'url_id'){
                json.url_id = this.id;
            }else if(this.type == 'bbr_id'){
                json.bbr_id = this.id;
            }
            if(self.istime){
                json.date = self.new_date + ' ' + self.new_time;
            }else{
                json.date = self.new_date;
            }
            self.$emit('get-newdate',json);

            self.now_page_year = '';
            self.now_page_month = '';
            self.today = {'year':'','month':'','day':''};
            self.totime = {'hour':'','minute':''};
            self.$emit('get-close',true);
        },
        //切換月份
        changeMonth:function(type){
            let self = this;
            var cd = new Date();
            if(type == 'pre'){
                if(self.now_page_month == 0){
                    self.now_page_year = self.now_page_year - 1;
                    self.now_page_month = 11;
                }else{
                    self.now_page_month = self.now_page_month - 1;
                }
            }else if(type == 'today'){
                self.now_page_year = cd.getFullYear();
                self.now_page_month = cd.getMonth();
            }else if(type == 'next'){
                if(self.now_page_month == 11){
                    self.now_page_year = self.now_page_year + 1;
                    self.now_page_month = 0;
                }else{
                    self.now_page_month = self.now_page_month + 1;
                }
            }
        },
        //取得某年某月的天數
        daysMonth:function(month, year) {
            let self = this;
            var tmp = year % 4;
            if (tmp == 0) {
                return (self.month_olympic[month]);
            } else {
                return (self.month_normal[month]);
            }
        },
        //取得某年某月第一天是星期幾
        dayStart:function(month, year) {
            var tmpDate = new Date(year, month, 1);
            return (tmpDate.getDay());
        },
        //選擇時間
        selectThisTime:function(){
            let self = this;
            var hour = $('input.hour').val();
            var minute = $('input.minute').val();
            if(hour.length == 1){
                self.totime.hour = '0'+hour;
            }else if(hour.length == 0){
                self.totime.hour = '00';
            }else if(hour > 23){
                self.totime.hour = '23';
            }else{
                self.totime.hour = hour.substr(hour.length-2);
            }
            if(minute.length == 1){
                self.totime.minute = '0'+minute;
            }else if(minute.length == 0){
                self.totime.minute = '00';
            }else if(minute > 59){
                self.totime.minute = 59;
            }else{
                self.totime.minute = minute.substr(minute.length-2);
            }
            self.new_time = self.totime.hour + ':' + self.totime.minute;
        },
        //選擇某個日期
        selectThisDay:function(year,month,day){
            let self = this;
            self.today.year = year;
            self.today.month = month;
            self.today.day = day;
            self.new_date = year + "-" + (month+1) + "-" + day;
        },
    },
    watch: {

	},
    mounted: function () {
        this.init();
    }
}
</script>