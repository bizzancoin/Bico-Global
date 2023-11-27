<template>
	<div class="email_div">
		<el-row :gutter="60">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/set' }">{{$t('person.set')}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t('person.email')}}</el-breadcrumb-item>
			</el-breadcrumb>

			<el-divider></el-divider>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">

			    <img src="@/assets/anq.png" alt="" style="height: 400px;position: absolute;text-align: right;top: 104px;right: 70px;">

        		<el-form ref="form" :model="form">
					        <el-form-item :label="$t('form.email')" prop="email" :rules="[{ required: true, message: $t('form.loginEmail')},{pattern:validation.email,message:$t('verification.emailRight'),trigger:'blur'}]">
	                    <el-input v-model="form.email" autocomplete="off" :placeholder="$t('form.loginEmail')">
	                    </el-input>
	               	</el-form-item>

	                <el-form-item v-if="!emailSendBoolean" :label="$t('form.emailNo')" :rules="[{ required: true, message: $t('form.emailNoEmpty')}]"  prop="emailCode">
	                    <el-input v-model="form.emailCode" autocomplete="off" :placeholder="$t('form.emailNoEmpty')">
	                    	<i v-if="ifDisable == false" class="el-input__icon themeFont" slot="suffix"  @click="handleIconClick">{{$t('form.code')}}</i>
	                    	<i v-else class="el-input__icon themeFont" slot="suffix">{{$t('form.code')}}{{count}}</i>
	                    </el-input>
	                </el-form-item>

					        <el-form-item v-if="!smsSendBoolean" :label="$t('form.phoneSms')" :rules="[{ required: true, message: $t('form.codeEmpty')}]" prop="smsCode">
	                    <el-input v-model="form.smsCode" autocomplete="off" :placeholder="$t('form.codeEmpty')">
	                    	<i v-if="smsDisable == false" class="el-input__icon themeFont" slot="suffix"  @click="smsClick">{{$t('form.code')}}</i>
	                    	<i v-else class="el-input__icon themeFont" slot="suffix">{{$t('form.code')}}{{smsCount}}</i>
	                    </el-input>
	                </el-form-item>

	                <el-button class="themeBtn" @click="bindFun('form')">{{$t('person.once')}}</el-button>
	            </el-form>
	        </el-col>
	        <el-col :xs="24" :sm="24" :md="12" :lg="12">

	        </el-col>
	   </el-row>
	</div>
</template>

<script>
import codeStatus from '@/config/codeStatus'
import { sendApi,bindAccountApi,checkSmsCodeApi,checkSmsSendApi,checkEmailSendApi } from '@/api/getData'
import { validation } from '@/config/validation'
export default {
	inject:['reload'],
    data(){
        return{
        	form:{
        		email:'',
				emailCode:'',
				smsCode:''
			},
			clock:null,
        	ifDisable:false,
            count:'',
			totalTime:300,
			smsClock:null,
			smsDisable:false,
            smsCount:'',
			smsTotalTime:'',
          smsSendBoolean:true,
          emailSendBoolean:true,
			validation
        }
	},
	created(){
		this.smsTotalTime = this.validation.count;
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
    	async handleIconClick(){//发送绑定邮箱验证码
			var that = this;
			var data = new URLSearchParams();
			if(that.form.email == ''){
				that.$message.error(that.$t('form.loginEmail'));
				return false;
			}
			data.set('account',that.form.email);
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // setTimeout(() => {
        //
        // }, 2000);
			var res =  await sendApi(data);
			if(res.code == 200){
        loading.close();
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
                        that.totalTime = 300;
                        that.ifDisable = false
                    }
                },1000)
			}else{
        loading.close();
				codeStatus(res.code,function(msg){
					that.$message.error(msg);
				})
			}
		},
		async smsClick(){//发送登入账户验证码(短信)
			var that = this;
			var data = new URLSearchParams();
			data.set('account','');
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
			var res =  await sendApi(data);
			if(res.code == 200){
        loading.close();
				that.$message({
                    type:'success',
                    message:that.$t('tip.sendSuccess')
                })
                that.smsDisable = true;
                that.smsCount = '('+that.smsTotalTime+'s)';
                that.smsClock = setInterval(function(){
                    that.smsTotalTime--
                    that.smsCount = '('+that.smsTotalTime+'s)';
                    if(that.smsTotalTime < 0){
                        clearInterval(that.smsClock)
                        that.smsCount = ''
                        that.smsTotalTime = that.validation.count;
                        that.smsDisable = false
                    }
                },1000)
			}else{
        loading.close();
				codeStatus(res.code,function(msg){
					that.$message.error(msg);
				})
			}
		},
		bindFun(form){//绑定邮箱前，先验证登录的账户验证码是否正确
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){
					var dataArr = new URLSearchParams();
					dataArr.set('account',that.$parent.account);
					dataArr.set('code',that.form.smsCode);
					var res = await checkSmsCodeApi(dataArr);
					if(res.success){
						if(res.data.isTrue == 'Y'){
							that.bindEmail();
						}else{
							that.$message.error(that.$t('form.phoneSmsError'));
						}
					}else{
						codeStatus(res.code,function(msg){
							that.$message.error(msg);
						})
					}

				}
			})
		},
		async bindEmail(){////绑定邮箱
			var that = this;
			var dataArr = new URLSearchParams();
			dataArr.set('bindAccount',that.form.email);
			dataArr.set('msg',that.form.emailCode);
			var res = await bindAccountApi(dataArr);
			if(res.success){
				that.$message({
					type:'success',
					message:this.$t('bico.W321'),
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
    }
}
</script>

<style lang="less">
.email_div{
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
