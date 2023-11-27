<template>
    <div class="recharge_div">
        <el-row :gutter="60">
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">
        		<el-form ref="form" :model="form">
					<div class="chain_box" v-if="form.region == 'USDT'">
					
						<div class="chain_title">{{$t('recharge.chain')}}</div>
						
						<el-tabs v-model="chainName" @tab-click="changeCoin">
							<el-tab-pane label="ERC20" name="ERC20"></el-tab-pane>
							<el-tab-pane label="TRC20" name="TRC20"></el-tab-pane>
							<!-- <el-tab-pane label="OMNI" name="OMNI"></el-tab-pane> -->
						</el-tabs>
					</div>

			        <div>
			        	<p>{{$t('recharge.tip')}} {{$t('recharge.tip2')}}{{form.region}} {{$t('recharge.tip3')}}</p>
			        	<div id="qrcode"></div>
			        </div>
					<el-form-item :label="$t('recharge.address')" prop="link">
	                    <el-input v-model="form.link" autocomplete="off" readonly>
	                    	<i class="el-icon-document-copy" style="width: 100%;cursor: pointer;" slot="suffix" @click="handleCopy(form.link,$event)"></i>
	                    </el-input>
	                </el-form-item>
                    <Coin @selectCoin="selectCoin" :type="'CHANGER'" :show = "'recharge'" />
					<div v-if="form.region == 'EOS'">
						<el-form-item label="Memo" prop="value">
							<el-input v-model="form.value" autocomplete="off" readonly>
								<i class="el-icon-document-copy" style="width: 100%;cursor: pointer;" slot="suffix" @click="handleCopy(form.value,$event)"></i>
							</el-input>
						</el-form-item>
					</div>




				</el-form>
					
        	</el-col>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">

					<el-form ref="form" :model="form">
					
						<el-form-item :label="$t('recharge.num')" prop="number" :rules="[{ required: true, message: $t('recharge.numEmpty')}]">
							<el-input  type="number" v-model="form.number" autocomplete="off" :placeholder="$t('recharge.numEmpty')"></el-input>
						</el-form-item>

						<el-form-item :label="$t('recharge.addressId')" prop="id">
							<el-input v-model="form.id" autocomplete="off" :placeholder="$t('recharge.addressHash')"></el-input>
						</el-form-item>
					
					</el-form>

					<div class="recharge_upload">
						<div class="recharge_title">{{$t('recharge.rechargeImage')}}</div>
						<el-upload
							:action="baseUrl+'/upload/img'"
							list-type="picture-card"
							:on-success="upSuccessFun"
							:on-remove="removeImgFun"
							:on-exceed="limitImgFun"
							:limit="3"
							accept="image/png, image/jpeg"
							>
							<img class="downImg" src="@/assets/infrontzf.png" style="height: 200px;">
						</el-upload>
					</div>
					
                    <div style="height:100px;"></div>
					<el-button @click="submitFun('form')" class="themeBtn">{{$t('assets.recharge')}}</el-button>

        	</el-col>
			
        </el-row>
    	
    	<AssetPage :vauleType="vauleType" :changeValue="changeValue" />
    </div>
</template>
<script>
import AssetPage from '@/components/AssetPage'
import Coin from '@/components/Coin'
import { rechargeAddressApi,rechargeApi } from '@/api/getData'
import QRCode from 'qrcodejs2'
import clip from '@/config/clipboard'
import { baseUrl } from '@/config/env'
import codeStatus from '@/config/codeStatus'
export default {
	inject:['reload'],
    data(){
        return{
			baseUrl,
            form:{
            	region:'',
				link:'',
				value:'',
				number:'',
				id:'',
			},
			chainName:'ERC20',
			imgArr:[],
			vauleType:1,
			
			changeValue:0,
        }
	},
    methods:{
		async addressFun(){//充币地址
			var that = this;
			var data = new URLSearchParams();
			var getCoin = '';
			var coin = that.form.region;
			if(coin == 'USDT'){
				getCoin = coin+'-'+that.chainName
			}else{
				getCoin = coin
			}

			data.set('symbol',getCoin);
			var res = await rechargeAddressApi(data);
			if(res.success){
				var arr = res.data;
				var addressTxt = '';
				addressTxt = arr.address;
				
				that.form.link = addressTxt;
				that.form.value = arr.memoTagValue;
				var qrcode = new QRCode('qrcode', {
					width: 140,  
					height: 140,
					text: addressTxt,
				})
			}
		},
    	handleCopy(text,event){//复制代码
    		clip(text,event);
		},
		selectCoin(value){
			var that = this;
			document.getElementById('qrcode').innerHTML = ''; //清除二维码 
			that.form.region = value;
			that.addressFun();
		},
		changeCoin(){
			document.getElementById('qrcode').innerHTML = ''; //清除二维码 
			this.addressFun();
		},
		upSuccessFun(res){
			var that = this;
			if(res.code == 200){
				var obj = res.data;
				that.imgArr.push(obj.src)
			}else{
				that.$message.error(res.message);
			}
		},
		removeImgFun(file){
			
			var that = this;
			var img = file.response.data.src;
			if(that.imgArr.length>0){
				(that.imgArr).forEach((element,index) => {
					if(element == img){
						that.imgArr.splice(index,1)
					}
				});
			}
		},
		limitImgFun(file,fileList){
			this.$message.error(this.$t('tip.uplimit'))
		},
		submitFun(form){
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){

					// if(isNaN(that.form.number)){
					// 	that.$message.error('有效数值');
					// 	return false;
					// }

					if(that.imgArr.length == 0){
						that.$message.error(that.$t('recharge.rechargeImage'));
						return false;
					}

					var getCoin = '';
					var coin = that.form.region;
					if(coin == 'USDT'){
						getCoin = coin+'-'+that.chainName
					}else{
						getCoin = coin
					}
					console.log(that.form.region)
					var dataArr = new URLSearchParams();
					dataArr.set('type',getCoin);
					dataArr.set('price',that.form.number);
					dataArr.set('address',that.form.id);
					dataArr.set('remark',(that.imgArr).join(','));
					var res = await rechargeApi(dataArr);
					if(res.success){
						that.$message({
							type:'success',
							message:that.$t('tip.submitTxt')
						})
						setTimeout(()=>{
							that.reload()
						},800)
					}else{
						that.$message.error(res.message)
					}
				}
			})
		
		},
    },
    components:{
		AssetPage,
		Coin
    }
}
</script>
<style lang="less">
.recharge_div{

   border-radius: 12px;



	.chain_box{
		.chain_title{
			margin-bottom: 10px;
		}
		.el-tabs__item{
			padding: 0;
			width: 86px;
			text-align: center;
			border:1px solid #828ab359;
			border-radius: 4px;
			margin-right: 10px;
		}

		.el-tabs__item.is-active{
			background-color: #0066ED;
			color: #ffffff!important;
			border: 1px solid #0066ED;
		}
	}

	#qrcode{
		background-color: #ffffff;
		padding: 10px;
		width: 140px;
		height: 140px;
		margin: 10px 0 20px 0;
	}
	.el-row{
		background-color: #ffffff;
		padding: 20px 0;
		margin: -8px 0 40px 0 !important;
		border-radius: 6px;
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
		.el-input__inner{
			border: none;
			background-color: transparent;
			padding: 0;
			color: #333333;
		}
	}
	
	.el-button{
		width: 100%;
		margin: 40px 0;
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
	.el-icon-document-copy{
		color: #4A4A4A;
	}

	.recharge_upload{
		.recharge_title{
			margin-bottom: 10px;
		}
		.el-upload--picture-card{
			border: none;
		}
	}
	.el-upload--picture-card {
		background-color: #fbfdff00;
		border: 1px dashed #fbfdff00;
		border-radius: 6px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 148px;
		height: 148px;
		line-height: 146px;
		vertical-align: top;
}
}
</style>