<style scoped>

</style>

<template>
    <div id="reminderwrap">
        

    </div>
</template>
<script>
export default {
    name:'reminderwrap',
    props: {
        id:'',//使用者編號
        admin:'',//是否為管理員
        // type:'',//所屬部門
    },
	data() {
        return {
            reminderdata:[],
        }
    },
    created:function(){
        let self = this;
        setInterval(function(){
            self.getUserReminderData();
        }, 1000);
    },
    computed: {
        
   	},
    methods: {
        init: function () {
            let self = this;
        },
        getUserReminderData:function(){
            let self = this;
            var json = {};
            json.ud_id = this.id;
            if(this.admin){
                axios.post('/adminallreminderdata',json)
                    .then(function (response) {
                        self.reminderdata = response.data;
                        if(self.reminderdata.length > 0){
                            for(var i=0;i<self.reminderdata.length;i++){
                                self.appendReminderWrap(self.reminderdata[i]);
                            }
                        }
                    })
                    .catch(function (response) {
                        return false;
                    });
            }else{
                axios.post('/userallreminderdata',json)
                    .then(function (response) {
                        self.reminderdata = response.data;
                        if(self.reminderdata.length > 0){
                            for(var i=0;i<self.reminderdata.length;i++){
                                self.appendReminderWrap(self.reminderdata[i]);
                            }
                        }
                    })
                    .catch(function (response) {
                        return false;
                    });
            }
        },
        appendReminderWrap:function(data){
            let self = this;
            if(data.pst_name){
                var string = "<div class='reminder'><i class='fas fa-bell'></i><p>"+data.pst_name+"</p></div>";
                $('#reminderwrap').append(string);
            }else if(data.ai_title){
                var string = "<div class='reminder'><i class='fas fa-bell'></i><p>"+data.ai_title+"</p></div>";
                $('#reminderwrap').append(string);
            }else{
                var string = "<div class='reminder'><i class='fas fa-bell'></i><p>"+data.url_message+"</p></div>";
                $('#reminderwrap').append(string);
            }
            $('.reminder').on('click',function(){
                $(this).remove();
            })
        }
    },
    watch: {

	},
    mounted: function () {
        this.init();
    }
}
</script>