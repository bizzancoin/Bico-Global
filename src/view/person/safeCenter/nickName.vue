<template>
	<div class="nickName_div">
		<el-row :gutter="60">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/set' }">{{$t('person.set')}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t('legal.nickname')}}</el-breadcrumb-item>
			</el-breadcrumb>
			<el-divider></el-divider>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">
        		<el-form ref="form" :model="form">
					<el-form-item :label="$t('legal.myNickname')" prop="name" :rules="[{ required: true, message: $t('legal.inputNickname')}]">
	                    <el-input v-model="form.name" autocomplete="off" :placeholder="$t('legal.inputNickname')">
	                    </el-input>
	               	</el-form-item>
	                <el-button class="themeBtn" @click="bindFun('form')">{{$t('form.sure')}}</el-button>

               </el-form>
	        </el-col>
	        <el-col :xs="24" :sm="24" :md="12" :lg="12">

	        </el-col>
	   </el-row>
	</div>
</template>

<script>
import codeStatus from '@/config/codeStatus'
import { updateNicknameApi } from '@/api/getData'
import { validation } from '@/config/validation'
export default {
	inject:['reload'],
    data(){
        return{
        	form:{
        		name:'',
			},
			validation
        }
	},
	created(){
		var name = sessionStorage.getItem('nickName');
		if(name){
			this.form.name = name;
		}
	},
    methods:{
        bindFun(form){
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){
					if(!that.validation.nickName.test(that.form.name)){
						that.$message.error(that.$t('legal.ifNickname'));
						return false
					}
					var dataArr = new URLSearchParams();
					dataArr.set('nickName',that.form.name);
					var res = await updateNicknameApi(dataArr);
					if(res.success){
						that.$message({
							type:'success',
							message:'昵称修改成功'
						})
						sessionStorage.setItem('nickName',that.form.name);
						setTimeout(()=>{
							that.$router.back(-1);
						},800)
					}else{
						codeStatus(res.code,function(msg){
							that.$message.error(msg);
						})
					}
				}
			})
		}
    }
}
</script>

<style lang="less">
.nickName_div{
	.el-breadcrumb{
		    padding: 0px 0 0px 30px;
		.el-breadcrumb__inner{
			color: #8E8E8E;
		}
	}

	.el-form-item{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border:1px solid #828ab359;
		padding:10px;
		border-radius:4px;
		.el-form-item__label{
			text-align: left;
		}
		.el-form-item__content{
			.el-select{
				width: 94%;
			}
		}
		.el-input-group__append{
			border: none;
			background-color: transparent;
			color: #87D8EA;
			cursor: pointer;
		}
		.el-input__inner{
			border: none;
			background-color: transparent;
			padding: 0;
		}
	}
	.el-button{
		width: 100%;
		margin: 20px 0;
	}
	.el-input__icon{
		width: 100%;
		cursor: pointer;
		font-style: normal;
	}
}
</style>
