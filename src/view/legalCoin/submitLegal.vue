<template>
    <div class="order_div_detail">
        <el-row :gutter="60">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>{{$t('nav.currency')}}</el-breadcrumb-item>

                <el-breadcrumb-item v-if="orderType == 1" :to="{ path: '/legalCoin' }">{{$t('legal.buy')}}</el-breadcrumb-item>
                <el-breadcrumb-item v-else :to="{ path: '/sell' }">{{$t('legal.sell')}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{orderTxt}}{{$t('legal.detail')}}</el-breadcrumb-item>
			</el-breadcrumb>
        	<el-col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="betweenSpread">
                    <h2>{{detail.nickName}}</h2>
                    <h2 :class="orderType == 1 ? 'greenColor' : 'redColor'">${{detail.unitPrice}}</h2>
                </div>
                <p>{{$t('transaction.num')}}({{detail.coin}})：{{detail.restNumber}}</p>
                <div class="betweenSpread">
                    <p>{{$t('legal.limit')}}(USD)：{{detail.lowPrice}}-{{getTotal}}</p>
                    <img :src="detail.img" />
                </div>
                <el-form ref="form" :model="form">
                    <el-form-item :label="orderTxt+(type ? $t('trasfer.money') : $t('transaction.num'))" prop="name" :rules="[{ required: true, message: orderTxt+($i18n.locale == 'en' ? ' ' :'')+(type ? $t('trasfer.money') : $t('transaction.num'))}]">
                        <b>$</b>
                        <el-input :placeholder="$t('legal.min')+($i18n.locale == 'en' ? ' ' :'')+orderTxt+(type ? $t('trasfer.money') : $t('transaction.num')) + (type ? detail.lowPrice : detail.lowNumber)" v-model="form.name" @input="changeValue">
                            <template slot="append">
                                <span>{{type ? 'USD' :'USDT'}}</span>
                                <span class="line">|</span>
                                <span @click="allFun">{{$t('withdraw.all')}}{{$i18n.locale == 'en' ? ' ' :''}}{{orderTxt}}</span>
                            </template>
                        </el-input>
	               	</el-form-item>
                    <div class="buyBtn">
                        <span @click="changeType">{{type ? $t('legal.byNumber') : $t('legal.byMoney')}}{{$i18n.locale == 'en' ? ' ' :''}}{{orderTxt}}</span>
                    </div>

                    <el-form-item :label="$t('recharge.asset')"  prop="password" :rules="[{ required: true, message: $t('recharge.assetEmpty')},{pattern:validation.assetsPwd,message:$t('form.assetsCruent'),trigger:'blur'}]">
                        <el-input :type="openTrue ? 'text' : 'password'" v-model="form.password" autocomplete="off" :placeholder="$t('recharge.assetEmpty')">
                            <img class="eyeIcon" :src="openTrue ? openImg : closeImg" slot="suffix" alt="" @click="handleEye" />
                        </el-input>
                    </el-form-item>

                    <p class="grayColor">{{$t('legal.canPay')}}：{{money}}USD</p>



                    <div class="sellBox" v-if="orderType == 2">

                        <div class="buyBtn">
                            <router-link to="updateAssets">{{$t('form.forget')}}？</router-link>
                        </div>

                        <h3>{{$t('legal.select')}}</h3>
                        <div class="payMent">
                            <Collection :activeIndex="orderType" @activeFun="activeFun" @payContentFun="payContentFun"  />
                        </div>
                    </div>

                    <div class="lastBtn">

                        <el-button class="themeBtn" @click="subSell('form')">{{$t('legal.orderSubmit')}}</el-button>
                    </div>
                </el-form>

	        </el-col>
	   </el-row>
    </div>
</template>
<script>
import codeStatus from '@/config/codeStatus'
import { tradeBuyApi,tradeSellApi } from '@/api/legalData'
import { validation } from '@/config/validation'
import Collection from '@/components/Collection'
import specialStatus from '@/config/specialStatus'
export default {
	inject:['reload'],
    data(){
        return{
        	form:{
                name:'',
                password:'',
            },
            collection:'BANK',//收款方式
            payObj:{
                aliActive:'',
                weActive:'',
                bankActive:'',
                payPalActive:'',
                collectArr:[],
            },
            orderType:'',
            orderTxt:'',
            type:true,
            detail:{},
            money:'0.00',
            openTrue:false,
            openImg:require('@/assets/eye_open.png'),
            closeImg:require('@/assets/eye_close.png'),
            validation
        }
    },
    computed:{
        getTotal(){
            var that = this;
            if(that.detail.number){
                var price = (Number(that.detail.restNumber)* Number(that.detail.unitPrice)).toFixed(4);
                return price
            }
        }
    },
    created(){
        var that = this;
        var type = this.$route.query.type;
        if(type){
            that.orderType = type;
            that.orderTxt = type == 1 ? that.$t('legal.title') : that.$t('legal.sale');
        }

        var detail = JSON.parse(sessionStorage.getItem('detail'));
        if(detail){
            that.detail = detail;
        }
    },
    methods:{
        subSell(form){//下单
            var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){

                    if(isNaN(that.form.name)){
                        that.$message.error(that.$t('legalOrder.effectiveNum'))
                        return false
                    }

                    if(that.type){//true金额
                        if(Number(that.form.name) < Number(that.detail.lowPrice)){
                            that.$message.error(that.$t('layer.minMoney')+that.detail.lowPrice)
                            return false
                        }

                        if(Number(that.form.name) > that.getTotal){
                            that.$message.error(that.$t('layer.maxNum')+that.getTotal)
                            return false
                        }
                    }else{///false数量
                        if(Number(that.form.name) < Number(that.detail.lowNumber)){
                            that.$message.error(that.$t('layer.minNum')+that.detail.lowNumber)
                            return false
                        }

                        if(Number(that.form.name) > that.getTotal){
                            that.$message.error(that.$t('layer.maxNum')+that.getTotal)
                            return false
                        }

                    }

					var dataArr = new URLSearchParams();
					dataArr.set('value',that.form.name);
                    dataArr.set('type',that.type ? 1 : 0 );//type为 true金额 false数量
                    dataArr.set('password',that.form.password);
                    var res = '';

                    if(that.orderType == 1){//购买
                        dataArr.set('sellId',that.detail.sellId);
                        res = await tradeBuyApi(dataArr);
                    }else {//出售
                        dataArr.set('buyId',that.detail.buyId);
                        dataArr.set('payPwd',that.form.password);
                        var getId = ''
                        //if (that.collection == 'BANK'){
                        var arr = that.payObj.collectArr;
                        if(arr.length>0){
                            arr.forEach(element => {
                                if(element.idcard == that.payObj.bankActive) {
                                    getId = element.paymentId
                                }
                            });
                        }else{
                            that.$message.error(that.$t('payMethods.bankEmpty'));
                            return false
                        }
                        //}
                        dataArr.set('paymentId',getId);


                        res = await tradeSellApi(dataArr);

                    }

					that.informFun(res);
				}
			})

        },
        informFun(res){
            var that = this;
            if(res.success){
                that.$message({
                    type:'success',
                    message:that.$t('codeTxt.orderSuccess')
                })

                setTimeout(function(){
                    that.$router.push('/legalOrder')
                },800)
            }else{
                if(res.code == 4011){
                    specialStatus(res.code,res.msg,function(obj){
                        that.$message.error(obj)
                    })
                }else{
                    codeStatus(res.code,function(msg){
                        that.$message.error(msg)
                    })
                }

            }
        },
        changeType(){
            var that = this;
            that.form.name = '';
            that.money = '0.00';
            that.type = !that.type;
            that.changeValue();
        },
        changeValue(){//计算需要付款金额
            var that = this;
            if(Number(that.form.name) <0){
                that.money == '0.00';
                return;
            }

            if(isNaN(that.form.name)){
                that.money == '0.00';
                return;
            }

            if(that.type){
                that.money = Number(that.form.name).toFixed(2);
            }else {
                that.money = (that.form.name * that.detail.unitPrice).toFixed(2)
            }
        },
        handleEye(){
            this.openTrue = !this.openTrue
        },
        activeFun(item){
            this.collection = item;
        },
        payContentFun(item){
            this.payObj = item;
        },
        allFun(){//全部
            var that = this;
            if(that.type){//数量
                that.form.name = that.getTotal
            }else{
                that.form.name = that.detail.restNumber
            }
            that.changeValue();
        }
    },
    components:{
        Collection
    }
}
</script>


<style lang="less">
.order_div_detail{
	.el-breadcrumb{
		padding: 10px 0 20px 26px;
		.el-breadcrumb__inner{
			color: #8E8E8E;
		}
    }
    .buyBtn{
        text-align: right;
        margin-bottom: 10px;
        span,a{
            color:@mainsColor;
            cursor: pointer;
        }
    }
    .greenColor{
        color: #44BCA7;
    }
    .redColor{
        color:#CD3D58;
    }
	.el-row{
		background-color: #f8f8f8;
		padding: 20px 0;
		margin: 20px 0 40px 0!important;
    }
    b{
        margin-right: 10px;
    }
    .el-form-item__content{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
	.el-form-item{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border:1px solid #D9D9D9;
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
			color: #87D8EA;
            cursor: pointer;
            .line{
                margin: 0 6px;
                display: inline-block;
            }
		}
		.el-input__inner{
			border: none;
			background-color: transparent;
			padding: 0;
		}
    }
    .sellBox{
        margin: 20px 0;
        .eyeIcon{
            cursor: pointer;
        }
        .payMent{
            width: 40%;
        }
    }
    .grayColor{
        color: #8E8E8E;
    }
    .lastBtn{
        width: 40%;

        .el-button{
            width: 100%;
            margin:0 0 20px 0;
        }
    }

}
</style>
