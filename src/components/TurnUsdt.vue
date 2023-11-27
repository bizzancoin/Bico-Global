<template>
	<div class="Turn_div">
		<!--资产划转-->
		<el-row :gutter="60">
			<el-col :xs="24" :sm="24" :md="12" :lg="12">
				<el-form ref="form" :model="form">

					<Coin :fromValue="form.fromValue" :type="tyype" :toValue="form.toValue" @selectCoin="selectCoin" />

					<p>{{$t('trasfer.available')}} {{abiliyPrice}} {{form.region}} </p>
					<div class="transfer_box">
						<div class="exchangBtn" @click="changeBoxFun"><img src="../assets/exchangeIcon.png" /></div>
						<div class="exchangContent">
							<el-form-item>
								<p>{{$t('contract.from')}}：</p>
								<el-select v-model="form.fromValue" @change="selectFrom">
									<el-option v-for="item in getFromArr" :key="item.id" :label="item.name" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<p>{{$t('contract.to')}}：</p>
								<el-select v-model="form.toValue" @change="selectTo">
									<el-option v-for="item in getToArr" :key="item.id" :label="item.name" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</div>
					</div>

					<el-form-item :label="$t('trasfer.turn')" :rules="[{ required: true, message: $t('trasfer.turnEmpty')},{pattern:/^(0(\.\d*[1-9]+\d*)?)$|^([1-9]\d*)(\.\d*)?$/,message:$t('trasfer.turnEmpty'),trigger:'blur'}]" prop="number">
	                    <el-input v-model="form.number" autocomplete="off" :placeholder="$t('trasfer.turnEmpty')">
	                    	<template slot="append">
								<span class="allAssets" @click="getAllAssetsFun">{{$t('withdraw.all')}}</span>
								<span>{{form.region}}</span>
							</template>
	                    </el-input>
	                </el-form-item>

					<el-button @click="submitFun('form')" class="themeBtn">{{$t('trasfer.sureTurn')}}</el-button>
				</el-form>
			</el-col>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">
        		<div class="tipBox">

        		</div>
        	</el-col>
        </el-row>
	</div>

</template>

<script>
import Coin from '@/components/Coin'
import codeStatus from '@/config/codeStatus'
import { convertPageApi,convertApi } from '@/api/getData'
export default {
	inject:['reload'],
    data(){
        return{
        	form:{
        		region:'USDT',
				number:'',
				fromValue:'',
				toValue:''
        	},
			getTotalArr:[],
			getFromArr:[],
			getToArr:[],
			abiliyPrice:0,
			times:1,
          tyype:"CURRENCY"
        }
	},
	computed:{
		getTotal(){
			var arr = [
				{value:'WALLET',name:this.$t('assets.wallet')},
				{value:'CONTRACT',name:this.$t('assets.contact')},
				{value:'LEGAL',name:this.$t('assets.currency')},
				{value:'CURRENCY',name:this.$t('assets.coin')},
                {value:'OPTION',name:this.$t('assets.option')},
                {value:'MINING',name:this.$t('assets.mine')},
			];
			this.getTotalArr = arr;
			return arr
		},
		getFrom(){
			var arr = [
				{value:'WALLET',name:this.$t('assets.wallet')},
				{value:'CONTRACT',name:this.$t('assets.contact')},
				{value:'LEGAL',name:this.$t('assets.currency')},
				{value:'CURRENCY',name:this.$t('assets.coin')},
				{value:'OPTION',name:this.$t('assets.option')},
                {value:'MINING',name:this.$t('assets.mine')},
			];
			this.getFromArr = arr;
			return arr
		},
		getTo(){
			var arr = [
				{value:'CONTRACT',name:this.$t('assets.contact')},
				{value:'LEGAL',name:this.$t('assets.currency')},
				{value:'CURRENCY',name:this.$t('assets.coin')},
				{value:'OPTION',name:this.$t('assets.option')},
                {value:'MINING',name:this.$t('assets.mine')},
			];
			this.getToArr = arr;
			return arr
		},
		getFromValue(){
			return this.form.fromValue
		}
	},
	watch:{
		getFromValue(newValue){
			if(this.form.region != ''){
				this.formFun();
			}
		}
	},
	created(){
		var that = this;
		that.form.fromValue = that.getFrom[0].value;
		that.form.toValue = that.getTo[3].value
	},
	mounted(){
		var that = this;
	},
	methods:{
		changeBoxFun(){
			var that = this;
			var fromArr = that.getFromArr;
			var toArr = that.getToArr;

			that.getFromArr = toArr;
			that.getToArr = fromArr;

			var formValueTxt = that.form.fromValue;
			var toValueTxt = that.form.toValue;

			that.form.fromValue = toValueTxt;
			that.form.toValue = formValueTxt;
			if(toValueTxt == "CONTRACT"){
			  that.tyype="FLOW"
      }else{
        that.tyype="CURRENCY"
      }
		},
		async formFun(){//获取信息

			var that = this;
			var dataArr = new URLSearchParams();
			var coin = '';
			if(that.form.fromValue == 'CONTRACT' || that.form.fromValue == 'LEGAL'){
				coin = 'USDT'
			}else{
				coin = that.form.region;
			}
			dataArr.set('type',coin);
			dataArr.set('from',that.form.fromValue);
			var res = await convertPageApi(dataArr);
			if(res.success){
				var obj = res.data;
				that.abiliyPrice = obj.price
			}else{
				//that.$message.error(res.msg)
			}

		},
		getAllAssetsFun(){
			var that = this;
			that.form.number = that.abiliyPrice;
		},
		submitFun(form){//提交划转
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){
					var dataArr = new URLSearchParams();

					if(isNaN(that.form.number)){
						that.$message.error(that.$t('legalOrder.effectiveNum'));
						return false;
					}
					dataArr.set('type',that.form.region);
					dataArr.set('from',that.form.fromValue);
					dataArr.set('to',that.form.toValue);
					dataArr.set('numbers',that.form.number);
					if(that.times == 1){
						that.times = that.times + 1;
						var res = await convertApi(dataArr);
						if(res.success){
							that.$message({
								type:'success',
								message:that.$t('assets.trasferSuccess')
							})
							// that.$refs[form].resetFields();
							that.reload();
						}else{
							codeStatus(res.code,function(msg){
								that.$message.error(msg)
							})
							that.times = 1;
						}
					}
				}
			})
		},
		selectFrom(value){//选择from
			var that = this;
			var filtered  = (that.getTotal).filter(function(element){
				return element.value != value
			});

			that.getToArr = filtered;
			if(value == that.form.toValue){

				that.form.toValue = filtered[0].value;

			}
		},
		selectTo(value){//选择To
			var that = this;
			var filtered  = (that.getTotal).filter(function(element){
				return element.value != value
			})
			that.getFromArr = filtered;

			if(value == that.form.fromValue){

				that.form.fromValue = filtered[0].value;

			}
		},
		selectCoin(value){//切换币种
			var that = this;
			that.form.region = value;
			that.formFun();
		},
	},
	components:{
		Coin
	}
}
</script>

<style lang="less">
.Turn_div{

	.el-select{
		width: 100%;
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
		.el-input-group__append{
			border: none!important;
			background-color: transparent!important;
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
	/*划转*/
	.transfer_box{
		position: relative;
		top: 0;
		margin-bottom: 20px;
		display: flex;
		flex-direction: row;
		.exchangContent{
			position: relative;
			top: 0;
			left: 106px;
			width: 80%;
			.el-form-item{
				padding: 1.5px;
				.el-form-item__content{
					display: flex;
					flex-direction: row;
					align-items: center;
					p{
						margin: 0;
						padding:0 10px ;
					}
				}
			}
			.el-select{
				width: 100%;
			}
		}
		.exchangBtn{
			position: absolute;
			top: 0;
			padding: 22px;
			z-index: 99;
			border-radius: 4px 0 0 4px;
			cursor: pointer;
		}
	}

	.allAssets{
		cursor: pointer;
		color: #0066ED;
		padding-right: 10px;
		margin-right: 6px;
		border-right: 1px solid #101010;
		display: inline-block;
	}
}
</style>
