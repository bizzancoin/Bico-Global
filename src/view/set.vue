<template>
	<div class="safeCenter_div">




                <!-- 绑定手机和邮箱，当注册使用的是邮箱，显示手机，当注册使用的是手机，就显示绑定邮箱 -->
            	<div style="height:40px;"></div>
				<div class="safeCenterset_div">
					<el-row :gutter="20">
						<el-col :span="12">
							<div class="">

									<li v-if="getPhone == ''">
										<div class="title leftSpread">
											<img src="../assets/money-phone.png" style="height: 24px;">
											<span class="emri">{{$t('person.phone')}}</span>
										</div>
										<p class="emri2">{{$t('person.emailTip')}}</p>
									</li>
									<li v-if="getEmail == ''">
										<div class="title leftSpread">
											<img src="../assets/email-icon.png" style="height: 24px;">
											<span class="emri">{{$t('person.email')}}</span>
										</div>
										<p class="emri2">{{$t('person.emailTip')}}</p>
									</li>
							</div>
						
						</el-col>

						<el-col :span="12">
							<div class="">

								<li v-if="getPhone == ''">
									<div class="lastBtn">
										<router-link class="themeClass" style="color: #ffffff;" to="bindPhone">{{$t('person.once')}}</router-link>
									</div>
								</li>
								<li v-if="getEmail == ''">
									<div class="lastBtn">
										<router-link class="themeClass" style="color: #ffffff;" to="email">{{$t('person.once')}}</router-link>
									</div>
								</li>
							
							</div>
						</el-col>
					</el-row>

					<!-- 修改登录密码 -->
					<el-divider></el-divider>
					<el-row :gutter="20">
						<el-col :span="12">
							<div class="">

									<div class="title leftSpread">
										<img src="../assets/loginPwd-icon.png" style="height: 24px;">
										<span class="emri">{{$t('form.loginPwd')}}</span>
									</div>
									
									<p class="emri2">{{$t('person.loginTip')}}</p>
							</div>
						
						</el-col>

						<el-col :span="12">
							<div class="">

								<div class="lastBtn">
									<router-link class="themeClass" style="color: #ffffff;" to="updateLogin">{{$t('person.update')}}</router-link>
								</div>
								
							</div>
						</el-col>
					</el-row>

					<!-- 修改登录密码 -->

					<!-- 修改资金密码 -->
					<el-divider></el-divider>
					<el-row :gutter="20">
						<el-col :span="12">
							<div class="">

								<div class="title leftSpread">
									<img src="../assets/money-icon.png" style="height: 24px;">
									<span class="emri">{{$t('recharge.asset')}}</span>
								</div>
								
								<p class="emri2">{{$t('person.assetsTip')}}</p>
							</div>
						
						</el-col>

						<el-col :span="12">
							<div class="">

								<div class="lastBtn">
									<router-link class="themeClass" style="color: #ffffff;" to="updateAssets">{{isOpenPay == 'Y' ? $t('person.reset') : $t('legal.set')}}</router-link>
								</div>
								
							</div>
						</el-col>
					</el-row>

					<!-- 修改资金密码 -->

					<!-- 法币收款方式 -->
					<el-divider></el-divider>
					<el-row :gutter="20">
						<el-col :span="12">
							<div class="">

								<div class="title leftSpread">
									<img src="../assets/legal-icon.png" style="height: 24px;">
									<span class="emri">{{$t('legal.methods')}}</span>
								</div>
								<p class="emri2">{{$t('legal.methosTxt')}}</p>
							</div>
						
						</el-col>

						<el-col :span="12">
							<div class="">

								<div class="lastBtn">
									<router-link v-if="realStatus == 1" class="themeClass" style="color: #ffffff;" to="pay">{{$t('legal.check')}}</router-link>
									<router-link v-else class="themeClass" style="color: #ffffff;" to="person">{{$t('legal.verify')}}</router-link>
								</div>
								
							</div>
						</el-col>
					</el-row>

					<!-- 法币收款方式 -->

					<!-- 法币商家昵称 -->
					<el-divider></el-divider>
					<el-row :gutter="20">
						<el-col :span="12">
							<div class="">

								<div class="title leftSpread">
									<img src="../assets/nickName-icon.png" style="height: 24px;">
									<span class="emri">{{$t('legal.nickname')}}</span>
								</div>
								<p class="emri2">{{$t('legal.nicknameTxt')}}</p>
							</div>
						
						</el-col>

						<el-col :span="12">
							<div class="">


								<div class="lastBtn">
									<router-link v-if="realStatus == 1" class="themeClass" style="color: #ffffff;" to="nickName">{{$t('bico.W170')}}</router-link>
									<router-link v-else class="themeClass" style="color: #ffffff;" to="person">{{$t('legal.verify')}}</router-link>
								</div>
								
							</div>
						</el-col>
					</el-row>
                </div>
				<!-- 法币商家昵称 -->
				<div style="height:100px;"></div>

	</div>
</template>

<script>
import userInform from '@/config/userInform'
export default {
    data(){
        return{
			isOpenPay:'',
			realStatus:'',
			getEmail:'',
			getPhone:''
        }
	},
	mounted(){
		this.userInformFun();
	},
	computed:{
		getName(){
			var that = this;
			var value = that.$parent.nickName;
			if(value){
				that.nickName = value;
				return value
			}else{
				return value = ''
			}
		},
	},
	methods:{
		async userInformFun(){
			var that = this;
            userInform(function(res){
				that.isOpenPay = res.isOpenPay;
				that.realStatus = res.realStatus;
				that.getEmail = res.email;
				that.getPhone = res.phone;
			})
		}
	},
    components:{
    }
}
</script>

<style lang="less">
.safeCenter_div{
	.themeBtn{
		width: 90%;
		margin: 0 auto;
		display: block;
	}
	ul {
		flex-wrap: wrap;
		display: flex;
		li{
			background-color: #f8f8f8;
			border-radius: 4px;
			width: 44%;
			margin: 0 60px 60px 0;
			padding:20px; 
			min-height: 200px;
			position: relative;
			top: 0;
			&:nth-child(2n){
				margin-right: 0;
			}
			.themeClass{
				height: 40px;
				line-height: 40px;
				background-color: @mainsColor !important;
				border-radius: 4px;
				width: 90%;
				margin: 0 auto;
				display: block;
				color: #ffffff;
				text-align: center;
			}
			.title{
				span{
					font-size: 16px;
					padding-left:12px;
				}
			}
			p{
				color: #C3C3C3;
			}
		}
	}

	.lastBtn{
		height: 40px;
		background-color: #0066ED !important;
		position: absolute;
		top: 10px;
		right: 20px;
		text-align: right;
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		border: 1px solid #0066ed;
		box-sizing: border-box;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		a{
			cursor: pointer;
		}
	}



	



	








}
</style>

<style>
  .el-row {
    margin-bottom: 0px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>