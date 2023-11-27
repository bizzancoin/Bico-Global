<template>
	<div class="bind_phone_div">
		<el-row :gutter="60">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/set' }">{{$t('person.set')}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t('person.phone')}}</el-breadcrumb-item>
			</el-breadcrumb>
			<el-divider></el-divider>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding-left: 400px;padding-right: 400px;width: 100%;">
        		<el-form ref="form" :model="form">
                    <div class="selectArea">
                        <el-form-item :label="$t('form.phoneNum')" :rules="[{ required: true, message: $t('form.phone')}]" prop="phone">
                            <Area @selectValue="selectValue" />
                            <el-input class="enterInput" v-model="form.phone" autocomplete="off" :placeholder="$t('form.phone')"></el-input>
                        </el-form-item>
                    </div>
					<el-form-item v-if="!smsSendBoolean" :label="$t('form.phoneSms')" :rules="[{ required: true, message: $t('form.codeEmpty')}]" id="vsCode" prop="smsCode">
	                    <el-input v-model="form.smsCode" autocomplete="off" :placeholder="$t('form.codeEmpty')">
	                    	<i v-if="ifDisable == false" class="el-input__icon themeFont" slot="suffix"  @click="handleIconClick">{{$t('form.code')}}</i>
	                    	<i v-else class="el-input__icon themeFont" slot="suffix">{{$t('form.code')}}{{count}}</i>
	                    </el-input>
	                </el-form-item>
					<el-form-item v-if="!emailSendBoolean" :label="$t('form.emailNo')" :rules="[{ required: true, message: $t('form.emailNoEmpty')}]" id="vsCode" prop="emailCode">
	                    <el-input v-model="form.emailCode" autocomplete="off" :placeholder="$t('form.emailNoEmpty')">
	                    	<i v-if="ifEmail == false" class="el-input__icon themeFont" slot="suffix"  @click="emailClick">{{$t('form.code')}}</i>
	                    	<i v-else class="el-input__icon themeFont" slot="suffix">{{$t('form.code')}}{{emailCount}}</i>
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
import Area from '@/components/Area'
import codeStatus from '@/config/codeStatus'
import { sendApi,bindAccountApi,checkSmsCodeApi,checkSmsSendApi,checkEmailSendApi } from '@/api/getData'
import { validation } from '@/config/validation'
export default {
	inject:['reload'],
    data(){
        return{
        	form:{
        		phone:'',
				smsCode:'',
				emailCode:''
            },
            areaCode:'',
			areaType:'',
			clock:null,
        	ifDisable:false,
            count:'',
			totalTime:'',
			validation,
			emailClock:null,
			ifEmail:false,
            emailCount:'',
			emailtotalTime:300,
          smsSendBoolean:true,
          emailSendBoolean:true,
        }
	},
	created(){
		this.totalTime = this.validation.count;
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
        selectValue(item){//选择区号
            var that = this;
            // console.log(item);
            that.areaCode = item.code;
            that.areaType = item.type;
        },
    	async handleIconClick(){//发送绑定手机号验证码
			var that = this;
			var data = new URLSearchParams();
			if(that.form.phone == ''){
				that.$message.error(that.$t('form.phone'));
				return false;
			}
			data.set('account',that.form.phone);
			data.set('type',that.areaType);
			data.set('code',that.areaCode);
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
                that.ifDisable = true;
                that.count = '('+that.totalTime+'s)';
                that.clock = setInterval(function(){
                    that.totalTime--
                    that.count = '('+that.totalTime+'s)';
                    if(that.totalTime < 0){
                        clearInterval(that.clock)
                        that.count = ''
                        that.totalTime = that.validation.count;
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
		async emailClick(){//发送登入账户验证码
			var that = this;
			var data = new URLSearchParams();
			data.set('type','');
			data.set('code','');
			data.set('account',that.$parent.account);
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
                that.ifEmail = true;
                that.emailCount = '('+that.emailtotalTime+'s)';
                that.emailClock = setInterval(function(){
                    that.emailtotalTime--
                    that.emailCount = '('+that.emailtotalTime+'s)';
                    if(that.emailtotalTime < 0){
                        clearInterval(that.emailClock)
                        that.emailCount = ''
                        that.emailtotalTime = 300;
                        that.ifEmail = false
                    }
                },1000)
			}else{
        loading.close();
				codeStatus(res.code,function(msg){
					that.$message.error(msg);
				})
			}
		},
		bindFun(form){//绑定手机前，先验证登录的账户验证码是否正确
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){
					var dataArr = new URLSearchParams();
					dataArr.set('account',that.$parent.account);
					dataArr.set('code',that.form.emailCode);
					var res = await checkSmsCodeApi(dataArr);
					if(res.success){
						if(res.data.isTrue == 'Y'){
							that.bindPhone();
						}else{
							that.$message.error(that.$t('form.emailError'));
						}
					}else{
						codeStatus(res.code,function(msg){
							that.$message.error(msg);
						})
					}
				}
			})
		},
		async bindPhone(){//绑定手机
			var that = this;
			var dataArr = new URLSearchParams();
			dataArr.set('bindAccount',that.form.phone);
			dataArr.set('msg',that.form.smsCode);
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
    },
    components:{
        Area
    }
}
</script>

<style lang="less">
.bind_phone_div{
	.el-breadcrumb{
		    padding: 0px 0 0px 30px;
		.el-breadcrumb__inner{
			color: #8E8E8E;
		}
    }
    .selectArea{
        .el-form-item__content{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            .el-select{
                width: 90px!important;
                margin-right: 10px;
                position: relative;
                top: 0;
                &::before{
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 10px;
                    border-right: 1px solid #333333;
                    height: 20px;
				}
            }
		}

        .el-input__inner{
            text-align: left!important;
        }
	}
	.enterInput{
		.border-left{
			border: none;
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
