<template>
    <div class="acceptor_buy_div">
         <!--  -->
        <div class="formBox" v-if="status == 0 || status == 1 || status == 5">
            <el-form ref="form" :model="form">
                <div class="grid-content">
                  <el-form-item :label="txt+(empty == 'en' ? ' ' : '')+ $t('bico.W102')"
                                :rules="[{ required: true, message: $t('legalOrder.inputPlacehold')+''+txt+(empty == 'en' ? ' ' : '')+$t('legal.siglePrice')}]">
                    <el-cascader
                      v-model="form.coin"
                      :options="options"
                      @change="selectCoin"></el-cascader>
                  </el-form-item>
                    <el-form-item :label="txt+(empty == 'en' ? ' ' : '')+$t('legal.siglePrice')" :rules="[{ required: true, message: $t('legalOrder.inputPlacehold')+''+txt+(empty == 'en' ? ' ' : '')+$t('legal.siglePrice')}]" prop="price">
                        <el-input v-model="form.price" autocomplete="off" placeholder="0.00">
                            <template slot="append">USD</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('legalOrder.sigleLoss')+(empty == 'en' ? ' ' : '')+txt+(empty == 'en' ? ' ' : '')+$t('trasfer.money')" :rules="[{ required: true, message: $t('legalOrder.sigleLossInput')+''+txt+(empty == 'en' ? ' ' : '')+$t('trasfer.money')}]" prop="money">
                        <el-input v-model="form.money" autocomplete="off" placeholder="0.00">
                            <template slot="append">USD</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('legalOrder.sigleLoss')+(empty == 'en' ? ' ' : '')+txt+(empty == 'en' ? ' ' : '')+$t('table.num')" :rules="[{ required: true, message: $t('legalOrder.sigleLossInput')+''+txt+(empty == 'en' ? ' ' : '')+$t('table.num')}]" prop="smaller">
                        <el-input v-model="form.smaller" autocomplete="off" placeholder="0.00">
                            <template slot="append">{{form.coin}}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="txt+(empty == 'en' ? ' ' : '')+$t('table.num')" :rules="[{ required: true, message: $t('legalOrder.inputPlacehold')+(empty == 'en' ? ' ' : '')+txt+ $t('table.num')}]" prop="number">
                        <el-input v-model="form.number" autocomplete="off" placeholder="0.00">
                            <template slot="append">{{form.coin}}</template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="paySelect" v-if="activeIndex == 1">
                    <h3>{{$t('legal.selectPay')}}</h3>
                    <el-radio-group v-model="payType">
                        <el-radio v-for="item in methodArr" :key="item.id" :label="item.index"  border>
                            <img :src="item.img" :alt="item.name" />
                            <span>{{item.name}}</span>
                        </el-radio>
                    </el-radio-group>
                </div>
                <div class="payment" v-else>
                    <h3>{{$t('legal.select')}}</h3>
                    <Collection :activeIndex="activeIndex" @activeFun="activeFun" @payContentFun="payContentFun" />
                </div>
                <el-button class="themeBtn" @click="submitForm('form')">{{$t('legal.sumbmitOrder')}}</el-button>
            </el-form>
        </div>
        <el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">
            <el-table-column prop="status" :label="$t('table.status')">
                <template slot-scope="scope">
					<span :class="scope.row.status == 'Y' ? 'greenColor' : 'redColor'">{{scope.row.typeTxt}}</span>
				</template>
            </el-table-column>
            <el-table-column prop="number" :label="$t('table.num')+''" >
              <template slot-scope="scope">

                <span >{{ scope.row.number+ ' ' +scope.row.coin }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="totalPrice" :label="$t('contract.transactionNum')"></el-table-column>
            <el-table-column prop="createTime" :label="$t('table.time')"></el-table-column>
            <el-table-column prop="orderNo" :label="$t('contract.operation')">
				<template slot-scope="scope">
					<el-button class="themeBtn" size="small" @click="operationFun(scope.row.orderNo)">{{$t('legal.detail')}}</el-button>
				</template>
			</el-table-column>
        </el-table>
        <page-total v-if="page.total > 10" :page="page" @pageChange="pageChange"></page-total>

        <!-- 订单详情 -->
        <el-dialog 
            :visible.sync="show"
            :close-on-click-modal="false"
            :before-close="closeDialog" 
            width="30%"
            :title="$t('legal.onListDetail')">
            <div class="list_details">
                <ul>
                    <li>
                        <div>
                            <h3 v-if="activeIndex == 1"><span>{{$t('legal.title')+' '}}{{detail.coin}}</span><span>{{$t('legal.waitSell')}}</span></h3>
                            <h3 v-else><span>{{$t('legal.sale')+' '}}{{detail.coin}}</span><span>{{$t('legal.waitBuy')}}</span></h3>
                        </div>
                        <h2 :class="detail.status == 'Y' ? 'greenColor' : 'redColor'">{{detail.typeTxt}}</h2>
                    </li>
                    <li>
                        <span>{{$t('legal.totalNum')}}</span>
                        <span>{{detail.number}} {{detail.coin}}</span>
                    </li>
                    <li>
                        <span>{{$t('table.total')}}</span>
                        <span>${{detail.totalPrice}}</span>
                    </li>
                    <li>
                        <span>{{activeIndex == 1 ? $t('legal.title') : $t('legal.sale')}} {{$t('legal.siglePrice')}}</span>
                        <span>${{detail.unitPrice}}</span>
                    </li>
                    <li>
                        <span>{{$t('legal.surplusTime')}}</span>
                        <span>{{detail.restNumber}} {{detail.coin}}</span>
                    </li>
                    <li class="line"></li>
                    <li>
                        <span>{{$t('legal.limit')}}</span>
                        <span>{{detail.lowPrice}}-{{detail.restNumber * detail.unitPrice}} USD</span>
                    </li>
                    <li>
                        <span>{{$t('nav.orderNum')}}</span>
                        <div>
                            <span>{{detail.orderNo}}</span>
                            <i @click="handleCopy(detail.orderNo,$event)" class="el-icon-document-copy"></i>
                        </div>
                    </li>
                    <li>
                        <span>{{$t('legal.payMethods')}}</span>
                        <span>{{detail.txt}}</span>
                    </li>
                    <li>
                        <span>{{$t('legal.payTime')}}</span>
                        <span>{{detail.createTime}}</span>
                    </li>
                </ul>
                <el-button v-if="detail.status == 'Y'" class="themeBtn" @click="cancelFun">{{$t('legal.cancelList')}}</el-button>
            </div>
            
		</el-dialog>
    </div>
</template>
<script>
import pageTotal from '@/components/pageTotal'
import { otcBuyApi,otcSellApi,otcOrderListApi,cancelOrderApi,contractOptionConfigApi } from '@/api/legalData'
import clip from '@/config/clipboard'
import getPay from '@/config/getPay'
import Collection from '@/components/Collection'
import codeStatus from '@/config/codeStatus'
export default {
    props:['activeIndex'],
    inject:['reload'],
    data(){
        return{
            form:{
                price:'',
                money:'',
                smaller:'',
                number:'',
              coin:'USDT',
            },

          options:[],
            payType:'BANK',//付款方式
            collection:'BANK',//收款方式
            methodArr:[],
            tableData:[],
            payObj:{
                bankActive:'', 
                collectArr:[],
            },
            page:{
                currentPage:1,
                limit:10,
                total:0,
            },
            show:false,
            txt:'',
            detail:{},
            hitNum:0,
            empty:'',
            haveAppeal:'',
            status:''
        }
    },
    computed:{
        getIndex(){
            return this.activeIndex
        }
    },
    watch:{
        getIndex(newValue){
            var that = this;
            that.txt = that.activeIndex == 1 ? that.$t('legal.title') : that.$t('legal.sale');
            that.hitNum = 0;
            that.orderFun();
        }
    },
    created(){
        var that = this;
        var arr = [{
            img:require('@/assets/bank_icon.png'),
            name:that.$t('payMethods.bank'),
            index:'BANK',
            Indexes:2
        },{
          img:require('@/assets/aiplay_icon.png'),
          name:that.$t('payMethods.alipay'),
          index:'ALI_PAY',
        },
          {
            img:require('@/assets/wechat_icon.png'),
            name:that.$t('payMethods.wechat'),
            index:'WE_CHAT',
          }];
        that.methodArr = arr;
        that.empty = that.$i18n.locale;
        that.orderFun();
        that.getConfig()
        that.haveAppeal = that.$parent.haveAppeal;
        that.status = that.$parent.status;
    },
    methods:{
      async getConfig(){
        var res = await contractOptionConfigApi();
        if(res.code == 200){
          console.log(res);
          var o = []
          res.data.forEach(coin=>{
            o.push({
              value:coin,
              label:coin
            })
          })
          this.options =o
        }
      },
      selectCoin(el){
        this.form.coin = el[0]
        console.log(el)
      },
        closeDialog(){
            this.show = false
        },
        activeFun(item){
            this.collection = item;
        },
        payContentFun(item){
            this.payObj = item;
        },
        submitForm(form){//提交下单
            var that = this;
            that.$refs[form].validate((valid) => {
                if (valid) {
                  if(that.form.coin == ''){
                    that.$message.error($t('bico.W107'));
                    return false;
                  }
                    if(isNaN(that.form.price)){
                        that.$message.error(that.$t('layer.siglePrice'));
                        return false;
                    }
                    if(isNaN(that.form.money)){
                        that.$message.error(that.$t('layer.sigleNum'));
                        return false;
                    }

                    if(isNaN(that.form.smaller)){
                        that.$message.error(that.$t('layer.sigleMoney'));
                        return false;
                    }
                    if(isNaN(that.form.number)){
                        that.$message.error(that.$t('legal.effectiveNum'));
                        return false;
                    }

                    var dataArr = new URLSearchParams();
                    dataArr.set('coin',that.form.coin);
                    dataArr.set('unitPrice',that.form.price);
                    dataArr.set('number',that.form.number);
                    dataArr.set('lowNumber',that.form.smaller);
                    dataArr.set('lowPrice',that.form.money);

                    
                    if(that.activeIndex == 1){
                        dataArr.set('payMethod',that.payType);
                        that.buyFun(dataArr)
                    }else{
                        dataArr.set('payMethod',that.collection);

                        var getId = '';

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

                        dataArr.set('paymentId',getId);
                        that.sellFun(dataArr)
                    }
                }
            })
            // console.log(that.getIndex);//下单类型：1购买 2出售
        },
        async buyFun(dataArr){//购买
            var that = this;
            that.hitNum += that.hitNum+1;
            if(that.hitNum == 1){
                var res = await otcBuyApi(dataArr);
                if(res.success){
                    that.$message({
                        type:'success',
                        message:that.$t('tip.submitTxt')
                    })
                    setTimeout(function(){
                        that.reload();
                    },800)
                }else{
                    codeStatus(res.code,function(msg){
                        that.$message.error(msg)
                    })
                    that.hitNum = 0;
                }
            }
            
        },
        async sellFun(dataArr){//出售
            var that = this;
            that.hitNum += that.hitNum+1;
            if(that.hitNum == 1){
                var res = await otcSellApi(dataArr);
                if(res.success){
                    that.$message({
                        type:'success',
                        message:that.$t('tip.submitTxt')
                    })

                    setTimeout(function(){
                        that.reload();
                    },800)
                }else{
                   codeStatus(res.code,function(msg){
                        that.$message.error(msg)
                    })
                    that.hitNum = 0;
                }
            }
            
        },
        
        async orderFun(){//订单列表
            var that = this;
            var dataArr = new URLSearchParams();
            dataArr.set('pageType',that.activeIndex == 1 ? 'BUY' : 'SELL');
            dataArr.set('size',that.page.limit);
            dataArr.set('current',that.page.currentPage);
            var res = await otcOrderListApi(dataArr);
            that.tableData = [];
            if(res.success){
                var data = res.data;
                that.page.total = Number(data.total);
                var arr = data.records;
                arr.forEach(element => {
                    element.txt = (getPay(element.payMethod)).txt;
                    element.number = (element.number).toFixed(2);
                    element.totalPrice = (element.totalPrice).toFixed(2);
                    element.unitPrice  = (element.unitPrice).toFixed(2);
                    element.restNumber = (element.restNumber).toFixed(2);
                    element.lowPrice = (element.lowPrice).toFixed(2);
                    element.typeTxt = (element.status == 'Y' ? that.$t('legal.onList') : that.$t('legal.readycancel'));
                    that.tableData.push(element)
                });
            }
        },
        async operationFun(orderNo){//显示订单详情
            var that = this;
            that.show = true;
            var arr = that.tableData;
            if(arr.length>0){
                arr.forEach(element => {
                    if(element.orderNo == orderNo){
                        that.detail = element
                    } 
                });
            }
        },
        handleCopy(text,$event){//复制代码
    		clip(text,event);
        },
        async cancelFun(){//撤单
            var that = this;
            var dataArr = new URLSearchParams();
            dataArr.set('pageType',that.activeIndex == 1 ? 'BUY' : 'SELL');
            dataArr.set('orderNo',that.detail.orderNo);
            var res = await cancelOrderApi(dataArr);
            if(res.success){
                that.$message({
                    type:'success',
                    message:that.$t('assets.cancelSuccess')
                });
                that.show = false;
                that.page.currentPage = 1;
                that.orderFun();
                

            }else{
                codeStatus(res.code,function(msg){
                    that.$message.error(msg)
                })
            }
        },
        pageChange(item){
            this.page.currentPage = item;
            this.orderFun();
        }
    },
    components:{
        pageTotal,
        Collection
    }
}
</script>
<style lang="less">
.acceptor_buy_div{
    min-height: 480px;
    .formBox{

        .el-form{
            
            padding: 20px;
            margin-bottom: 40px;
            .themeBtn{
                width: 46%;
                margin-top: 30px;
            }
        }
    }
    .grid-content{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-grow: 2;
        flex-wrap: wrap;
        &>div{
            width: 45%;
            &:nth-child(2n-1){
                margin: 0 40px 20px 0;
            }
        }
    }
    .el-form-item{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border: 1px solid #2c32505c;
		padding:10px;
		border-radius:4px;
		.el-form-item__label{
			text-align: left;
        }
        .showPwd{
            cursor: pointer;
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
    // 付款方式
    .paySelect{
        .el-radio{
            padding: 0px 20px 0 10px!important;
            line-height: 9px;
            border: 1px solid #2c32505c;
            .el-radio__inner{
                display: none;
            }
            .el-radio__label{
                display: flex;
                flex-direction: row;
                align-items: center;
                img{
                    margin-right: 4px;
                    width: 20px;
                }
            }
        }
    }
    
    .payment{//收款方式
        width: 50%;
        
    }
    //挂单详情
    .el-dialog__body{
        padding: 10px 0px 30px 0;
    }
    .list_details{
        li{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            padding: 0 20px;
            &:nth-child(1){
				&>div{
					span:nth-child(1){
						margin-right: 20px;
					}
				}
			}
            span:nth-child(1){
                color: #8E8E8E;
            }
            h2{
                margin: 0 0 20px 0;
                font-weight: 550;
            }
            h3{
                color: #8E8E8E;
                margin: 0 0 20px 0;
            }
        }
        .line{
            width: 100%;
            height: 18px;
            background-color: #f8f8f8;
            padding: 0!important;
        }
        .themeBtn{
            display: block;
            margin: 0 auto;
            width: 70%;
        }
    }
    .greenColor{
        color: #44BCA7;
    }
    .redColor{
        color: #CD3D58;
    }
}
</style>
