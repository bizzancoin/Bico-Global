<template>
	<div class="updateLogin_div">
		<el-row :gutter="60">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/set' }">{{$t('person.set')}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t('form.loginPwd')}}</el-breadcrumb-item>
			</el-breadcrumb>
			<el-divider></el-divider>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12" style="">
        		<el-form ref="form" :model="form">
					<el-form-item :label="$t('form.oldPwd')" prop="oldPwd" :rules="[{ required: true, message: $t('form.oldPwdEmpty')},{pattern:/^[A-Za-z0-9]{6,16}$/,message:$t('form.loginPwdRight'),trigger:'blur'}]">
	                    <el-input type="password" v-model="form.oldPwd" autocomplete="off" :placeholder="$t('form.oldPwdEmpty')">
	                    </el-input>
	                </el-form-item>
	                <el-form-item :label="$t('form.newPwd')"  prop="newPwd" :rules="[{ required: true, message: $t('form.newPwdEmpty')},{pattern:/^[A-Za-z0-9]{6,16}$/,message:$t('form.loginPwdRight'),trigger:'blur'}]">
	                    <el-input type="password" v-model="form.newPwd" autocomplete="off" :placeholder="$t('form.newPwdEmpty')">
	                    </el-input>
	                </el-form-item>
					<el-form-item :label="$t('form.loginSurePwd')"  prop="password" :rules="[{ required: true, message: $t('form.loginSureEmpty')},{pattern:/^[A-Za-z0-9]{6,16}$/,message:$t('form.loginPwdRight'),trigger:'blur'}]">
	                    <el-input type="password" v-model="form.password" autocomplete="off" :placeholder="$t('form.loginSureEmpty')">
	                    </el-input>
	                </el-form-item>
	                <el-button class="themeBtn" @click="updateFun('form')">{{$t('form.sure')}}</el-button>
	            </el-form>
	        </el-col>
	        <el-col :xs="24" :sm="24" :md="12" :lg="12">
	        	
	        </el-col>
	   </el-row>
	</div>
</template>

<script>
import codeStatus from '@/config/codeStatus'
import { updateAssetApi } from '@/api/getData'
export default {
	inject:['reload'],
    data(){
        return{
        	form:{
        		oldPwd:'',
				newPwd:'',
				password:'',
			},
        }
	},
    methods:{
		updateFun(form){
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){
					if(that.form.newPwd != that.form.password){
						that.$message.error(that.$t('form.pwdDifferent'));
						return false
					};
					var dataArr = new URLSearchParams();
					dataArr.set('newPwd',that.form.newPwd);
					dataArr.set('msgOrOldPwd',that.form.oldPwd);
					dataArr.set('confirmPwd',that.form.password);
					dataArr.set('type','LOGIN');
					var res = await updateAssetApi(dataArr);
					if(res.success){
						sessionStorage.removeItem('userToken');
						sessionStorage.removeItem('nickName');
						that.$message({
							type:'success',
							message:res.msg
						})
						that.reload();
						setTimeout(function(){
							that.$router.push('/login')
						},800)
					}else{
						codeStatus(res.code,function(msg){
							that.$message.error(msg)
						})
					}
				}
			})
		}
    }
}
</script>

<style lang="less">
.updateLogin_div{
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
		.el-input__suffix-inner{
			cursor: pointer;
			i{
				font-style: initial;
			}
		}
	}
	.el-button{
		width: 100%;
		margin: 20px 0;
	}
}
</style>