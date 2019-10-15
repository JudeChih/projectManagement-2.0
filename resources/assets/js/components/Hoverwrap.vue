<style scoped>

</style>

<template>
    <div id="hoverwrap" :style="stylelist">
        <div class="title"><span>{{title}}</span></div>
        <div class="subtitle"><i class="fas fa-long-arrow-alt-right" title="子專案標題"></i><span>{{subtitle}}</span></div>
        <div class="user"><i class="fas fa-running"></i><span>執行人：</span><span>{{user}}</span></div>
        <div class="date"><i class="fas fa-calendar-day"></i><span>執行日期：</span><span>{{date}}</span></div>

    </div>
</template>
<script>
export default {
    name:'hoverwrap',
    props: {
        title:'',
        subtitle:'',
        date:'',
        position:'',
        user:''
    },
	data() {
        return {
            stylelist:{},//該彈窗的座標
        }
    },
    created:function(){
    },
    computed: {
   	},
    methods: {
        init: function () {
            let self = this;
            //從這邊設定座標
            var index_width = $(window).width();
            var index_height = $(window).height();
            var json = {};
            if(index_width - this.position.x < 400){
                json.right = (index_width - this.position.x) + 'px';
            }else{
                json.left = this.position.x + 'px';
                self.stylelist = {top:this.position.y + 'px',left:this.position.x + 'px'};
            }
            if(index_height - this.position.y < 200){
                json.bottom = (index_height - this.position.y) + 'px';
            }else{
                json.top = this.position.y + 'px';
            }
            self.stylelist = json;
        },
    },
    watch: {

	},
    mounted: function () {
        this.init();
    }
}
</script>