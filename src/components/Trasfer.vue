<template>
	<div class="trasfer_div">
		<!--站内转币-->
		<el-row :gutter="60">
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">
        		<el-form ref="form" :model="form">
        			<el-form-item :label="$t('trasfer.account')" :rules="[{ required: true, message: $t('trasfer.accountEmpty')}]" prop="account">
	                    <el-input v-model="form.account" autocomplete="off" :placeholder="$t('trasfer.accountEmpty')">
	                    </el-input>
	                </el-form-item>
	                <el-tabs v-model="activeName" @tab-click="handleClick">
		                <el-tab-pane :label="$t('table.num')" name="0"></el-tab-pane>
		                <el-tab-pane :label="$t('trasfer.money')" name="1"></el-tab-pane>
		            </el-tabs>
					<div v-if="activeName == '0'">
						<el-form-item :label="$t('trasfer.num')" :rules="[{ required: true, message: $t('trasfer.numEmpty')},{pattern:/^(0(\.\d*[1-9]+\d*)?)$|^([1-9]\d*)(\.\d*)?$/,message:$t('trasfer.numEmpty'),trigger:'blur'}]" prop="num">
		                    <el-input v-model="form.num" autocomplete="off" :placeholder="$t('trasfer.numEmpty')">
		                    	<template slot="append">USDT</template>
		                    </el-input>
		                </el-form-item>
					</div>
					<div v-if="activeName == '1'">
						<el-form-item :label="$t('trasfer.trasfermoney')" :rules="[{ required: true, message: $t('trasfer.moneyEmpty')},{pattern:/^(0(\.\d*[1-9]+\d*)?)$|^([1-9]\d*)(\.\d*)?$/,message:$t('trasfer.moneyEmpty'),trigger:'blur'}]" prop="money">
		                    <el-input v-model="form.money" autocomplete="off" :placeholder="$t('trasfer.moneyEmpty')">
		                    	<template slot="append">USD</template>
		                    </el-input>
		                </el-form-item>
					</div>
					<div style="margin-bottom:20px">
						<div class="betweenSpread">
							<p>{{$t('trasfer.available')}}：{{price}} USDT </p>
							<p>1 USDT ≈ {{cnyPrice}}CNY</p>
						</div>
						<p>{{$t('withdraw.fee')}}：{{fee}}USDT</p>
					</div>
					<el-form-item :label="$t('recharge.asset')" :rules="[{ required: true, message: $t('recharge.assetEmpty')},{pattern:/^[0-9]{6}$/,message:$t('form.assetsCruent'),trigger:'blur'}]" prop="asset">
	                    <el-input v-model="form.asset" :type="passwordType ? 'text' : 'password'" autocomplete="off" :placeholder="$t('recharge.assetEmpty')">
	                        <img class="eye" :src="eyeImg" slot="suffix" alt="" @click="handleEye" />
	                    </el-input>
	              </el-form-item>
					<el-button class="themeBtn" @click="submitFun('form')">{{$t('trasfer.trasfer')}}</el-button>
				</el-form>
        	</el-col>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">
        		<div class="tipBox">

        		</div>
        	</el-col>
        </el-row>
    	<el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">

            <el-table-column prop="to" :label="$t('table.account')"></el-table-column>
            <el-table-column prop="price" :label="$t('table.num')"></el-table-column>
			<el-table-column prop="typeTxt" :label="$t('table.type')"></el-table-column>
            <el-table-column prop="time" :label="$t('table.time')"></el-table-column>
        </el-table>
        <pageTotal v-if="page.total > 10" :page="page" @pageChange="pageChange"></pageTotal>

	</div>
</template>
<script>
import pageTotal from '@/components/pageTotal'
import { transferPageApi,transfersApi,transfersRcordApi } from '@/api/getData'
import codeStatus from '@/config/codeStatus'
export default {
    data(){
        return{
        	activeName:'0',
        	form:{
        		money:'',
        		num:'',
				account:'',
				asset:'',
        	},
			passwordType:false,
            eyeArr:[{
                img:require('../assets/eye_close.png')
            },{
                img:require('../assets/eye_open.png')
            }],
            eyeImg:require('../assets/eye_close.png'),
            tableData:[],
            page:{
                currentPage:1,
                limit:10,
                total:0,
			},
			price:0,
			cnyPrice:0,
			fee:0
		}
	},
	created(){
		this.formFun();
	},
	mounted(){
		this.recordFun();
	},
	methods:{
		async formFun(){//获取信息
			var that = this;
			var res = await transferPageApi();
			if(res.success){
				var obj = res.data;
				that.price = Number(obj.price).toFixed(2);
				that.cnyPrice = Number(obj.usdt).toFixed(2);
				that.fee = Number(obj.fee).toFixed(2);
			}
		},
		submitFun(form){//提交转账
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){
					var method,numberTxt;
					if(that.activeName == '0'){
						method = 'USDT';
						numberTxt = that.form.num;
					}else{
						method = 'CNY';
						numberTxt = that.form.money;
					}
					var dataArr = new URLSearchParams();
					dataArr.set('account',that.form.account);
					dataArr.set('price',numberTxt);
					dataArr.set('type',method);
					dataArr.set('payPwd',that.form.asset);
					var res = await transfersApi(dataArr);
					if(res.success){
						that.$message({
							type:'success',
							message:that.$t('tip.submitTxt')
						});
						that.$refs[form].resetFields();
						that.page.currentPage = 1;
						that.recordFun();
					}else{
						codeStatus(res.code,function(msg){
							that.$message.error(msg)
						})
					}
				}
			})
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
		async recordFun(){//转账记录
			var that = this;
			var dataArr = new URLSearchParams();
			dataArr.set('current',that.page.currentPage);
			dataArr.set('size',that.page.limit);
			var res = await transfersRcordApi(dataArr);
			that.tableData = [];
			if(res.success){
				that.page.total = Number(res.data.total);
				var obj = res.data.records;
				if(obj.length>0){
					obj.forEach(element => {
						switch (element.type) {
							case '内部转出 USDT':
								element.typeTxt = that.$t('assets.insideEnter')+' USDT'
								break;
							case '内部转入 USDT':
								element.typeTxt = that.$t('assets.insideInfo')+' USDT'
								break;
							default:
								break;
						}
						element.price = Number(element.price).toFixed(2);
						that.tableData.push(element)
					});
				}
			}else{
				codeStatus(res.code,function(msg){
					that.$message.error(msg)
				})
			}
		},
		pageChange(item){
			this.page.currentPage = item;
			this.recordFun();
		},
        handleClick(){

        }
	},
	components:{
        pageTotal
    }
}
</script>

<style lang="less">
.trasfer_div{

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
			border: none!important;
			background-color: transparent!important;
			color: #87D8EA !important;
		}
		.el-input__inner{
			border: none;
			background-color: transparent;
			padding: 0;
		}
	}
	p{
		margin: 0;
		color: #8E8E8E;
	}
	.el-button{
		width: 100%;
		margin: 20px 0;
	}
}
</style>
