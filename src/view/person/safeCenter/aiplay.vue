<template>
	<div class="aiplay_div">
		<el-row :gutter="60">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/set' }">{{$t('person.set')}}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/pay' }">{{$t('legal.methods')}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t('payMethods.alipay')}}</el-breadcrumb-item>
			</el-breadcrumb>
			<el-divider></el-divider>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">
        		<el-form ref="form" :model="form">
					<Account />
                    
                    <el-form-item :label="$t('nav.account')" prop="account" :rules="[{ required: true, message: $t('verification.account')}]">
	                    <el-input v-model="form.account" autocomplete="off" :placeholder="$t('verification.accountAplay')">
	                    </el-input>
	               	</el-form-item>
                    
                    <h3>{{$t('payMethods.alipayQrcode')}}({{$t('payMethods.select')}})</h3>
					<el-upload
						class="avatar-uploader"
						v-model="form.front"
						:action="baseUrl+'/upload/img'"
						:show-file-list="false"
						:on-success="frontAvatarSuccess"
						:on-error="failAvater"
						:on-remove="handleRemove"
						:before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<img v-else src="@/assets/img-bj.png" alt="" style="height: 130px;">
					</el-upload>

	                <el-button class="themeBtn" @click="bindFun('form')">{{$t('table.keep')}}</el-button>
                    
               </el-form>
	        </el-col>
	        <el-col :xs="24" :sm="24" :md="12" :lg="12">
	        	
	        </el-col>
	   </el-row>
	</div>
</template>

<script>
import { baseUrl } from '@/config/env'
import codeStatus from '@/config/codeStatus'
import { addReciveApi } from '@/api/getData'
import Account from '@/components/Account'
export default {
	inject:['reload'],
    data(){
        return{
        	form:{
				account:'',
				front:''
			},
			baseUrl,
            imageUrl:''
        }
    },
    methods:{
		frontAvatarSuccess(res, file) {//正面上传成功
            this.imageUrl = URL.createObjectURL(file.raw);
            if(res.code == 200){
                this.form.front = res.data.src;
            }
		},
		failAvater(err,file){
            this.$message.error(this.$t('tip.uploadFail'));
		},
		handleRemove(file, fileList) {
			var that = this;
			// console.log(file)
            // var a = file.response.data.src;
            // var b = that.imageUrl.indexOf(a);
            // that.imageUrl.splice(b,1);
            // that.dialogImageUrl.splice(b,1);
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
				this.$message.error(this.$t('tip.uploadTip'));
				return false
            }
            if (!isLt2M) {
				this.$message.error(this.$t('tip.uploadSize'));
				return false
            }
			return (isJPG || isPNG) && isLt2M;
        },
        bindFun(form){
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){
					var dataArr = new URLSearchParams();
					dataArr.set('idcard',that.form.account);
					dataArr.set('img',that.form.front);
					dataArr.set('type','ALI_PAY')
					var res = await addReciveApi(dataArr);
					if(res.success){
						that.$message({
							type:'success',
							message:res.msg
						})
						setTimeout(()=>{
							that.$router.back(-1)
						},800)
					}else{
						codeStatus(res.code,function(msg){
							that.$message.error(msg);
						})
					}
				}
			})
		}
	},
	components:{
		Account
	}
}
</script>

<style lang="less">
.aiplay_div{
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
    .avatar-uploader {
        .el-upload {
            background-color: #FDFDFD;
            border-radius: 2px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
                border-color: #409EFF;
            }
        }
    }
    .avatar {
        width: 178px;
        height: 178px;
		display: block;
		object-fit: cover!important;
    }
	.el-input__icon{
		width: 100%;
		cursor: pointer;
		font-style: normal;
	}
}
</style>