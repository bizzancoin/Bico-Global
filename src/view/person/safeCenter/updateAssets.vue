<template>
	<!-- 修改资产密码 -->
	<div class="reAssets_div">
		<el-row :gutter="60">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/set' }">{{$t('person.set')}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t('recharge.asset')}}</el-breadcrumb-item>
			</el-breadcrumb>
			<el-divider></el-divider>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12" style="">
        		<el-form ref="form" :model="form">
	                <el-form-item :label="$t('recharge.asset')"  prop="newPwd" :rules="[{ required: true, message: $t('recharge.assetEmpty')},{pattern:validation.assetsPwd,message:$t('form.assetsCruent'),trigger:'blur'}]">
	                    <el-input type="password" v-model="form.newPwd" autocomplete="off" :placeholder="$t('recharge.assetEmpty')">
	                    </el-input>
	                </el-form-item>
	                <el-form-item :label="$t('form.loginSurePwd')"  prop="sureNew" :rules="[{ required: true, message: $t('form.loginSureEmpty')},{pattern:validation.assetsPwd,message:$t('form.assetsCruent'),trigger:'blur'}]">
	                    <el-input type="password" v-model="form.sureNew" autocomplete="off" :placeholder="$t('form.loginSureEmpty')">
	                    </el-input>
	                </el-form-item>
	                <el-form-item v-if="(!smsSendBoolean)&&(!emailSendBoolean)" :label="$t('form.verification')" :rules="[{ required: true, message: $t('form.codeEmpty')}]" id="vsCode" prop="code">
	                    <el-input v-model="form.code" autocomplete="off" :placeholder="$t('form.codeEmpty')">
							<i v-if="ifDisable == false" class="el-input__icon themeFont" slot="suffix"  @click="handleIconClick">{{$t('form.code')}}</i>
	                    	<i v-else class="el-input__icon themeFont" slot="suffix">{{$t('form.code')}}{{count}}</i>
	                    </el-input>
	                </el-form-item>
	                <el-button class="themeBtn" @click="submit('form')">{{$t('form.sure')}}</el-button>
	            </el-form>
	        </el-col>
	        <el-col :xs="24" :sm="24" :md="12" :lg="12">

	        </el-col>
	   </el-row>
	</div>
</template>

<script>
import codeStatus from '@/config/codeStatus'
import { sendApi,updateAssetApi  ,checkSmsSendApi,checkEmailSendApi} from '@/api/getData'
import { validation } from '@/config/validation'
export default {
	inject:['reload'],
    data(){
        return{
        	form:{
        		newPwd:'',
        		sureNew:'',
        		code:''
        	},
        	ifDisable:false,
            count:'',
			totalTime:'',
			validation,
          smsSendBoolean:true,
          emailSendBoolean:true,
        }
	},
	created(){
		this.totalTime = this.validation.count
    this.getSmsSend();
    this.getEmailSend()
	},
    methods:{
      async getSmsSend(){
        var that =this
        var res = await checkSmsSendApi()
        if(res.success){
          this.smsSendBoolean = res.data == "N"
        }else{
          codeStatus(res.code,function(msg){
            that.$message.error(msg)
          })
        }

      },
      async getEmailSend(){
        var that=this
        var res = await checkEmailSendApi()
        if(res.success){
          this.emailSendBoolean = res.data == "N"
        }else{
          codeStatus(res.code,function(msg){
            that.$message.error(msg)
          })
        }
      },
    	async handleIconClick(){//发送验证码
			var that = this;
			var data = new URLSearchParams();
			data.set('account','');
			var res =  await sendApi(data);
			if(res.code == 200){
				that.$message({
                    type:'success',
                    message:that.$t('tip.sendSuccess')
                })
                that.ifDisable = true;
                that.count = '('+that.totalTime+'s)';
                that.clock = setInterval(function(){
                    that.totalTime--
                    that.count = '('+that.totalTime+'s)';
                    if(that.totalTime < 0){
                        clearInterval(that.clock)
                        that.count = ''
                        that.totalTime = that.validation.count
                        that.ifDisable = false
                    }
                },1000)
			}else{
				codeStatus(res.code,function(msg){
					that.$message.error(msg);
				})
			}
		},
		submit(form){
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){
					if(that.form.newPwd != that.form.sureNew){
						that.$message.error(that.$t('form.pwdDifferent'));
						return false;
					}
					var dataArr = new URLSearchParams();
					dataArr.set('newPwd',that.form.newPwd);
					dataArr.set('confirmPwd',that.form.sureNew);
					dataArr.set('msgOrOldPwd',that.form.code);
					dataArr.set('type','PAY');
					var res = await updateAssetApi(dataArr);
					if(res.success){
						that.$message({
							type:'success',
							message:that.$t('tip.submitTxt')
						})
						setTimeout(function(){
                            that.$router.push('/set');
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
.reAssets_div{
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
