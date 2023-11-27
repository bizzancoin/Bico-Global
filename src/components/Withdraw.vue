<template>
	<div class="withdraw_div">
		<el-row :gutter="60">
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">
        		<el-form ref="form" :model="form">
		           	<Coin @selectCoin="selectCoin" :type="'WITHDRAW'" :show = "'withdraw'" />

					<el-form-item :label="$t('withdraw.num')" prop="number" :rules="[{ required: true, message: $t('withdraw.numEmpty')}]">
						<el-input v-model="form.number" :placeholder="$t('withdraw.numEmpty')" @input="changeFee">
							<span class="themeFont" slot="suffix" @click="allFun">{{$t('withdraw.all')}}</span>
						</el-input>
					</el-form-item>
					<div class="betweenSpread" style="margin-bottom:20px">
						<p>{{$t('trasfer.available')}}：{{available}}{{getCoinValue}}</p>
						<p>{{$t('withdraw.fee')}}：{{getFee}}{{getCoinValue}}</p>
					</div>

					<div v-if="form.region == 'EOS'">
						<el-form-item label="Memo" prop="memo" :rules="[{ required: true, message:'请输入或粘贴提币EOS地址'}]">
							<el-input v-model="form.memo" placeholder="请输入或粘贴提币EOS地址"></el-input>
						</el-form-item>
					</div>

					<div v-if="form.region == 'XRP'">
						<el-form-item label="Tag" prop="memo" :rules="[{ required: true, message: '请输入或粘贴提币XRP地址'}]">
							<el-input v-model="form.memo" placeholder="请输入或粘贴提币XRP地址"></el-input>
						</el-form-item>
					</div>

					<el-form-item :label="$t('withdraw.address')" :rules="[{ required: true, message: $t('withdraw.addressEmpty')}]" prop="link">
	                    <el-input v-model="form.link" autocomplete="off" :placeholder="$t('withdraw.addressEmpty')">
							<i class="el-icon-document-copy" style="width: 100%;cursor: pointer;" slot="suffix" @click="handleCopy(form.link,$event)"></i>
	                    </el-input>
	                </el-form-item>


					<el-form-item :label="$t('recharge.asset')" :rules="[{ required: true, message: $t('recharge.assetEmpty')},{pattern:/^[0-9]{6}$/,message:$t('form.assetsCruent'),trigger:'blur'}]" prop="asset">
						<el-input v-model="form.asset" :type="passwordType ? 'text' : 'password'" autocomplete="off" :placeholder="$t('recharge.assetEmpty')">
							<img class="eye" :src="eyeImg" slot="suffix" alt="" @click="handleEye" />
						</el-input>
					</el-form-item>

					<!--<div v-if="showTelSms">-->
						<!--<h3>{{$t('withdraw.phoneVerify')}}</h3>-->
						<!--<el-form-item :label="$t('form.verification')" prop="code">-->
							<!--<el-input v-model="form.phoneSms" autocomplete="off" :placeholder="$t('form.codeEmpty')">-->
								<!--<i v-if="phoneDisable == false" class="el-input__icon themeFont" slot="suffix"  @click="handlePhone">{{$t('form.code')}}</i>-->
								<!--<i v-else class="el-input__icon themeFont" slot="suffix">{{$t('form.code')}}{{phoneCount}}</i>-->
							<!--</el-input>-->
						<!--</el-form-item>-->

					<!--</div>-->

					<!--<div v-if="showEmailSms">-->
						<!--<h3>{{$t('withdraw.emailVerify')}}</h3>-->
						<!--<el-form-item :label="$t('form.emailNo')" prop="code">-->
							<!--<el-input v-model="form.emailSms" autocomplete="off" :placeholder="$t('form.emailNoEmpty')">-->
								<!--<i v-if="smsDisable == false" class="el-input__icon themeFont" slot="suffix"  @click="handleEmail">{{$t('form.code')}}</i>-->
								<!--<i v-else class="el-input__icon themeFont" slot="suffix">{{$t('form.code')}}{{smsCount}}</i>-->
							<!--</el-input>-->
						<!--</el-form-item>-->
					<!--</div>-->

					<el-button @click="submitFun('form')" class="themeBtn">{{$t('assets.withdraw')}}</el-button>
				</el-form>
        	</el-col>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">
        		<div class="tipBox">
        			<p>{{$t('recharge.tip')}}</p>
        			<ul>
						<li>*{{$t('withdraw.tip1')}}</li>
						<li>*{{$t('withdraw.tip2')}}</li>
        			</ul>
        		</div>
        	</el-col>
        </el-row>
    	<AssetPage :vauleType="vauleType" :changeValue="changeValue" />
	</div>
</template>
<script>
import codeStatus from '@/config/codeStatus'
import Coin from '@/components/Coin'
import AssetPage from '@/components/AssetPage'
import { sendApi,withdrawPageApi,withdrawCoinApi,addAddressApi ,checkSmsSendApi,checkEmailSendApi} from '@/api/getData'
import clip from '@/config/clipboard'
import trimNumber from '@/config/trimNumber'
import { validation } from '@/config/validation'
import userInform from '@/config/userInform'
export default {
    data(){
        return{
        	form:{
				region:'',
				link:'',
				number:'',
				memo:'',
        		asset:'',
				phoneSms:'',
				emailSms:''
        	},
          smsSendBoolean:true,
          emailSendBoolean:true,
			passwordType:false,
            eyeArr:[{
                img:require('../assets/eye_close.png')
            },{
                img:require('../assets/eye_open.png')
            }],
            eyeImg:require('../assets/eye_close.png'),
			vauleType:2,
			changeValue:0,
			minPrice:0,
			feeNum:0,
			getFee:0,
			available:0,//可用
			maxNumber:0,
			minNumber:0,
			phoneDisable:false,
            phoneCount:'',
			phoneTotalTime:'',
			smsDisable:false,
            smsCount:'',
			smstotalTime:300,
			validation,
			email:'',
			phone:'',
			phoneClock:null,
			smsClock:null,
			showTelSms:false,
			showEmailSms:false,
			hitNum:0,
			getCoinValue:''
		}
	},
	computed:{
		getNum(){
			return this.form.number
		},
		getCoin(){
			return this.form.region
		}
	},
	watch:{
		getNum(newValue){//监听输入的提币数量，显示相对应的需验证的验证码
			var that = this;
			var newValue = Number(newValue);


			if(newValue >= that.minNumber && newValue <= that.maxNumber){//中间区间
				that.showTelSms = true
			}

			if(newValue >= that.maxNumber){//大于区间
				that.showTelSms = true;
				that.showEmailSms = true
			}

			if(newValue < that.minNumber){
				that.showTelSms = false;
				that.showEmailSms = false;
				that.form.phoneSms = '';
				that.form.emailSms = '';
			}

			if(newValue < that.maxNumber){
				that.showEmailSms = false;
				that.form.emailSms = '';
			}
      if(that.smsSendBoolean){
        that.showTelSms = false;
      }
      if(that.emailSendBoolean){
        that.showEmailSms = false;
      }

		},
		getCoin(newValue){
			var value = '';
			if(newValue.indexOf('USDT') != -1){//含有usdt
				value = 'USDT';
			}else{
				value = newValue;
			}
			this.getCoinValue = value
			return value
		}
	},
	created(){
		this.phoneTotalTime = this.validation.count;
		// this.smstotalTime = this.validation.count;
		this.userInformFun();
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
		async userInformFun(){
			var that = this;
            userInform(function(res){
				that.email = res.email;
				that.phone = res.phone;
			})
		},
		async handlePhone(){//发送短信验证码
			var that = this;
			var data = new URLSearchParams();
			if(that.phone == ''){
				that.$message.error(that.$t('form.bindPhone'));
				return false
			};
			data.set('account',that.phone);
			var res =  await sendApi(data);
			if(res.code == 200){
				that.$message({
                    type:'success',
                    message:that.$t('tip.sendSuccess')
                })
                that.phoneDisable = true;
                that.phoneCount = '('+that.phoneTotalTime+'s)';
                that.phoneClock = setInterval(function(){
                    that.phoneTotalTime--
                    that.phoneCount = '('+that.phoneTotalTime+'s)';
                    if(that.phoneTotalTime < 0){
                        clearInterval(that.phoneClock)
                        that.phoneCount = ''
                        that.phoneTotalTime = that.validation.count
                        that.phoneDisable = false
                    }
                },1000)
			}else{
				codeStatus(res.code,function(msg){
                    that.$message.error(msg)
                })
			}
		},
		async handleEmail(){//发送邮箱验证码
			var that = this;
			if(that.email == ''){
				that.$message.error(that.$t('form.bindEmail'));
				return false
			};
			var data = new URLSearchParams();
			data.set('account',that.email);
			var res =  await sendApi(data);
			if(res.code == 200){
				that.$message({
                    type:'success',
                    message:that.$t('tip.sendSuccess')
                })
                that.smsDisable = true;
                that.smsCount = '('+that.smstotalTime+'s)';
                that.smsClock = setInterval(function(){
                    that.smstotalTime--
                    that.smsCount = '('+that.smstotalTime+'s)';
                    if(that.smstotalTime < 0){
                        clearInterval(that.smsClock)
                        that.smsCount = ''
                        that.smstotalTime = 300
                        that.smsDisable = false
                    }
                },1000)
			}else{
				codeStatus(res.code,function(msg){
                    that.$message.error(msg)
                })
			}
		},
		async withInform(){
			var that = this;
			var data = new URLSearchParams();

			data.set('type',that.form.region);

			var res = await withdrawPageApi(data);
			if(res.success){
				var obj = res.data;
				that.minPrice = Number(obj.min).toFixed(2);//最小
				that.feeNum = (Number(obj.fee)/100);//手续费
				that.available = Number(obj.price).toFixed(2);//可用
				that.minNumber = Number(obj.minSection);//最小区间值
				that.maxNumber = Number(obj.maxSection);//最大区间值
			}
		},
		handleCopy(text,$event){//复制代码
    		clip(text,event);
    	},
		handleEye(){//显示隐藏密码
            var that = this;
            that.passwordType = !that.passwordType;
            if(that.passwordType){
                that.eyeImg = that.eyeArr[1].img
            }else{
                that.eyeImg = that.eyeArr[0].img
            }
		},
		submitFun(form){//提币
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){

					var number = Number(that.form.number);
					if((isNaN(number))){
						return false
					}
					if(number < Number(that.minPrice)){
						that.$message.error(that.$t('withdraw.minNum')+that.minPrice);
						return false;
					}

					if(number>=that.minNumber && number<=that.maxNumber && !that.smsSendBoolean){//中间区间
						if(that.phone == ''){
							that.$message.error(that.$t('form.bindPhone'));
							return false
						};
						if(that.form.phoneSms == ''){
							that.$message.error(that.$t('form.phoneInput'));
							return false
						}
					}

					if(number > that.maxNumber && !that.smsSendBoolean && !that.emailSendBoolean){//大于区间
						if(that.phone == ''){
							that.$message.error(that.$t('form.bindPhone'));
							return false
						};
						if(that.form.phoneSms == ''){
							that.$message.error(that.$t('form.phoneInput'));
							return false
						}
						if(that.email == ''){
							that.$message.error(that.$t('form.bindEmail'));
							return false
						};
						if(that.form.emailSms == ''){
							that.$message.error(that.$t('form.emailNoEmpty'));
							return false
						}
					}
					var coin = that.form.region;
					var dataArr = new URLSearchParams();
					dataArr.set('toAddress',that.form.link);
					dataArr.set('type',coin);
					dataArr.set('price',that.form.number);
					dataArr.set('payPwd',that.form.asset);
					dataArr.set('smsCode',that.form.phoneSms);
					dataArr.set('emailCode',that.form.emailSms);
					dataArr.set('memoTagValue',that.form.memo);
					that.hitNum += that.hitNum+1;
					if(that.hitNum == 1){
						var res = await withdrawCoinApi(dataArr);
						if(res.success){
							that.$message({
								type:'success',
								message:res.msg
							})
							that.available = (Number(that.available)-Number(that.form.number)).toFixed(2)
							that.$refs[form].resetFields();
							that.changeValue = that.changeValue +1;
							that.form.region = coin;

						}else{
							codeStatus(res.code,function(msg){
								that.$message.error(msg)
							})
							that.hitNum = 0
						}

						setTimeout(()=>{
							that.hitNum = 0
						},1500)
					}

				}
			})
		},
		allFun(){
			this.form.number = this.available;
		},
		selectCoin(value){//切换币种
			var that = this;
			that.form.memo = '';
			that.$refs.form.resetFields();
			that.form.region = value;
			that.showTelSms = false;
			that.showEmailSms = false;
			that.getFee = 0;
			that.withInform();
		},
		changeFee(value){//计算手续费
			var that = this;
			if(isNaN(value)){
				that.getFee = 0;
				return false;
			}
			that.getFee = (that.feeNum * value).toFixed(8);
		}
	},
	components:{
		AssetPage,
		Coin
    }
}
</script>

<style lang="less">
.withdraw_div{
	.copyClass{
		color: #87D8EA;
	}
	.delClass{
		color: #EC5E45;
	}
	.opeare span{
		margin-right: 12px;
		cursor: pointer;
	}
	.alignment{
		.el-form-item__content{
			display: flex;
			flex-direction: row;
			align-items: center;
			&>img{
				padding-right: 8px;
			}
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
			color: #8E8E8E;
		}
		.el-form-item__content{
			.el-select{
				width: 94%;
			}
		}
		.el-input-group__append{
			border: none!important;
			background-color: transparent!important;
			color: #87D8EA!important;
			cursor: pointer;
		}
		.el-input__inner{
			border: none;
			background-color: transparent;
			padding: 0;
		}
	}
	.eye{
		cursor: pointer;
	}
	.el-button{
		width: 100%;
		margin: 20px 0;
	}
	p{
		margin: 0;
		color: #8E8E8E;
	}
	.tipBox{
		border: 1px dashed #3B3B3B;
		border-radius: 4px;
		padding: 20px;
		&>p{
			color: #CD3D58;
			margin: 0 0 10px 0;
		}
		li{
			color: #8E8E8E;
			line-height: 30px;
		}
	}
	.el-input__suffix-inner{
		cursor: pointer;
		i{
			font-style: initial;
		}
	}
}
</style>
