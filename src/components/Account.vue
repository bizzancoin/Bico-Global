<template>
    <el-form-item :label="$t('person.name')" prop="name">
        <el-input readonly v-model="name" autocomplete="off" :placeholder="$t('person.nameInput')">
        </el-input>
    </el-form-item>
</template>
<script>
import userInform from '@/config/userInform'
export default {
    data(){
        return{
            name:''
        }
    },
    created(){
		this.getUserFun();
    },
    methods:{
		getUserFun(){
			var that = this;
            userInform(function(res){
                that.name = res.realName;
            })
        }
    }
}
</script>
