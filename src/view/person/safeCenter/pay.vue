<template>
	<div class="pay_div">
		<el-row :gutter="60">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/set' }">{{$t('person.set')}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t('legal.methods')}}</el-breadcrumb-item>
			</el-breadcrumb>
            <el-divider></el-divider>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">
                <h2 class="pay_div2">{{$t('legal.addMethods')}}</h2>
                <div style="height:30px;"></div>
                <el-radio-group v-model="radio">
                    <el-radio :label="0">
                        <div class="leftSpread">
                            <img src='@/assets/aiplay_icon.png' alt="" />
                            <span class="payTxt">{{$t('payMethods.alipay')}}</span>
                        </div>
                    </el-radio>
                    <el-radio :label="1">
                        <div class="leftSpread">
                            <img src='@/assets/wechat_icon.png' alt="" />
                            <span class="payTxt">{{$t('payMethods.wechat')}}</span>
                        </div>
                    </el-radio>
                    <el-radio :label="2">
                        <div class="leftSpread">
                            <img src='@/assets/bank_icon.png' alt="" />
                            <span class="payTxt">{{$t('payMethods.bank')}}</span>
                        </div>
                    </el-radio>
                    <!-- <el-radio :label="4">
                        <div class="leftSpread">
                            <img src='@/assets/paypal_icon.png' alt="" />
                            <span class="payTxt">PayPal</span>
                        </div>
                    </el-radio> -->
                </el-radio-group>
                <div style="height:30px;"></div>
        		<el-button class="themeBtn" @click="bindFun">{{$t('assets.add')}}</el-button>
	        </el-col>
	        <el-col :xs="24" :sm="24" :md="12" :lg="12">
	        	
	        </el-col>
	   </el-row>
       <ul>
			<li v-for="item in arr" :key="item.id">
				<div class="title leftSpread">
					<img :src="item.image" alt="" />
					<span>{{item.txt}}</span>
				</div>
				<p>{{$t('person.bond')}} ： {{item.idcard}}</p>
                <el-button class="themeBtn" @click="delFun(item.paymentId)">{{$t('assets.del')}}</el-button>
			</li>
       </ul>

       <pageTotal v-if="page.total > 10" :page="page" @pageChange="pageChange"></pageTotal>
	</div>
</template>

<script>
import codeStatus from '@/config/codeStatus'
import { reciveApi,delReciveApi } from '@/api/getData'
import pageTotal from '@/components/pageTotal'
export default {
	inject:['reload'],
    data(){
        return{
            radio:2,
            arr:[],
            page:{
                currentPage:1,
                limit:10,
                total:0,
			},
        }
    },
    created(){
        this.reciveFun()
    },
    methods:{
        // 收款方式列表
        async reciveFun(){
            var that = this;
            that.arr = [];
            var dataArr = new URLSearchParams();
            dataArr.set('size',that.page.limit);
            dataArr.set('current',that.page.currentPage);
            var res = await reciveApi();
            if(res.success){ 
                var arr = res.data.records;
                if(arr.length>0){
                    arr.forEach(element => {
                        if(element.type=='ALI_PAY'){
                            element.image = require('@/assets/aiplay_icon.png');
                            element.txt = that.$t('payMethods.alipay');
                        }else if(element.type=='WE_CHAT'){
                            element.image = require('@/assets/wechat_icon.png');
                            element.txt = that.$t('payMethods.wechat');
                        }else if(element.type=='BANK'){
                            element.image = require('@/assets/bank_icon.png');
                            element.txt = that.$t('payMethods.bank');
                        }else if(element.type=='PAYPAL'){
                            element.image = require('@/assets/paypal_icon.png');
                            element.txt = 'PayPal';
                        }
                        that.arr.push(element);
                    });
                }
            }
        },
        async delFun(id){//删除收款方式
            var that = this;
            var data = new URLSearchParams();
            data.set('paymentId',id);
            var res = await delReciveApi(data);
            if(res.success){
                that.$message({
                    type:'success',
                    message:that.$t('assets.delsuccess') 
                })
                that.page.currentPage = 1;
                that.reciveFun();
            }else{
                codeStatus(res.code,function(msg){
					that.$message.error(msg);
				})
            }
        },
        bindFun(){
			var that = this;
			if(that.radio == 0){
                that.$router.push('/aiplay')
            }else if(that.radio == 1){
                that.$router.push('/wechat')
            }else if(that.radio == 2){
                that.$router.push('/bank')
            }else{
                that.$router.push('/paypal')
            }
        },
        pageChange(item){
			this.page.currentPage = item;
			this.walletFun()
		}
    }
}
</script>

<style lang="less">
.pay_div{
	.el-breadcrumb{
		    padding: 0px 0 0px 30px;
		.el-breadcrumb__inner{
			color: #8E8E8E;
		}
    }
    .el-radio,.el-radio-group {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .payTxt{
        margin-left: 10px;
        
    }

    .el-radio__inner{
        border-color:#999999;
        background:#999999;
        &::after{
            transform: translate(-50%,-50%) scale(1);
        }
    }
    .el-radio__input.is-checked {
        .el-radio__inner{
            border-color:@mainsColor;
            background:@mainsColor;
        }
    }
	.el-button{
		width: 100%;
		margin: 20px 0;
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
			&:nth-child(2n){
				margin-right: 0;
            }
            .title{
                span{
                    font-size: 16px;
                    margin-left: 10px;
                }
            }
        }
    }
	.el-input__icon{
		width: 100%;
		cursor: pointer;
		font-style: normal;
	}
}
</style>
