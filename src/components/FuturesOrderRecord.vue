<template>
    <div class="contract_record_div">
        <div class="transtionBar">
            <el-tabs v-model="activeIndex" @tab-click="handleIndex">
                <el-tab-pane :label="$t('contract.position')" name="0">
                    <el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">
                        <!-- 方向交易对 -->
                        <el-table-column width="120" prop="leverName" :label="$t('transaction.location')+'/'+$t('contract.pair')">
                            <template slot-scope="scope">
                                <span :class="scope.row.compactType == 'BUY' ? 'greenColor' : 'redColor'">{{scope.row.compactType == 'BUY' ? $t('transaction.buySigel') : $t('transaction.sellSigel')}}{{scope.row.symbols}}</span>
                            </template>
                        </el-table-column>
                        <!-- 杠杆 -->
                        <el-table-column width="80" prop="leverName" :label="$t('contract.lever')">
                            <template slot-scope="scope">
                                {{scope.row.leverName}}
                            </template>
                        </el-table-column>

                        <!-- 盈亏 -->
                        <el-table-column  width="120" prop="lossProfit" :label="$t('contract.profile')">
                            <template slot-scope="scope">
                                <span :class="scope.row.profitLoss > 0 ? 'greenColor' : 'redColor'">{{scope.row.profitLoss+'('+scope.row.percentage+')'}}</span>
                            </template>
                        </el-table-column>

                        <!-- 建仓价 -->
                        <el-table-column prop="tradePrice"  :label="$t('contract.average')"></el-table-column>

                        <!-- 持仓手数 -->
                        <el-table-column prop="numbers"  :label="$t('transaction.handNum')"></el-table-column>

                        <!-- 持仓价值 -->
                        <el-table-column prop="openHandPrice"  :label="$t('nav.handValue')"></el-table-column>

                        <!-- 当前价 -->
                        <el-table-column prop="unit" :label="$t('contract.current')"></el-table-column>

                        <!-- 止盈价 -->
                        <el-table-column prop="stopProfit" :label="$t('contract.proPrice')">
                            <template slot-scope="scope">
                                {{(scope.row.stopProfit)}}
                            </template>
                        </el-table-column>
                        <!-- 止损价 -->
                        <el-table-column prop="stopLoss" :label="$t('contract.lossPrice')">
                            <template slot-scope="scope">
                                {{(scope.row.stopLoss)}}
                            </template>
                        </el-table-column>

                        <!-- 保证金 -->
                        <el-table-column prop="positionPrice"  :label="$t('contract.bond')"></el-table-column>

                        <!-- 手续费 -->
                        <el-table-column prop="fee" :label="$t('contract.buildFee')"></el-table-column>

                        <!-- 订单 -->
                        <el-table-column width="164" prop="orderNo" :label="$t('nav.order')"></el-table-column>
                        <!-- 建仓时间 -->
                        <el-table-column width="164" prop="createTime" :label="$t('table.time')"></el-table-column>

                        <!-- 操作 -->
                        <el-table-column width="130" prop="compactId" :label="$t('contract.operation')">
                            <template slot-scope="scope">
                                <div class="operation_div" v-if="activeIndex == '0'">
                                    <span @click="setPrice(scope.row.compactId,scope.row.stopProfit,scope.row.stopLoss)">{{$t('transaction.updateContract')}}</span>
                                    <!-- 平仓 -->
                                    <span @click="averageFun(scope.row.compactId)">{{$t('transaction.average')}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="$t('contract.trust')" name="1">
                    <el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">
                        <!-- 方向交易对 -->
                        <el-table-column width="120" prop="leverName" :label="$t('transaction.location')+'/'+$t('contract.pair')">
                            <template slot-scope="scope">
                                <span :class="scope.row.compactType == 'BUY' ? 'greenColor' : 'redColor'">{{scope.row.compactType == 'BUY' ? $t('transaction.buySigel') : $t('transaction.sellSigel')}}{{scope.row.symbols}}</span>
                            </template>
                        </el-table-column>
                        <!-- 杠杆 -->
                        <el-table-column width="80" prop="leverName" :label="$t('contract.lever')">
                            <template slot-scope="scope">
                                {{scope.row.leverName}}
                            </template>
                        </el-table-column>

                         <!-- 开仓均价 -->
                        <el-table-column prop="tradePrice"  :label="$t('contract.average')"></el-table-column>

                        <!-- 手数 -->
                        <el-table-column prop="numbers"  :label="$t('transaction.handNum')"></el-table-column>

                        <!-- 当前价 -->
                        <el-table-column prop="unit" :label="$t('contract.current')"></el-table-column>

                        <!-- 保证金 -->
                        <el-table-column prop="positionPrice" :label="$t('contract.bond')"></el-table-column>
                        <!-- 手续费 -->
                        <el-table-column prop="fee" :label="$t('contract.buildFee')"></el-table-column>
                        <!-- 建仓时间 -->
                        <el-table-column width="164" prop="createTime" :label="$t('table.time')"></el-table-column>

                        <el-table-column prop="compactId" :label="$t('contract.operation')">
                            <template slot-scope="scope">
                                <div class="operation_div">
                                    <span @click="cancelEntrustFun(scope.row.compactId)">{{$t('assets.cancelEntrust')}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="$t('transaction.newDeal')" name="2">
                    <el-table class="fishTable" :data="newsData" :empty-text="$t('bico.W160')">
                        <el-table-column prop="createTime" :label="$t('transaction.direction')">
                            <template slot-scope="scope">
                                <span :class="scope.row.direction == 'buy' ? 'greenColor' : 'redColor'">{{scope.row.direction == 'buy' ? $t('coin.buy') : $t('coin.sell')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" :label="$t('transaction.price')+'(USDT)'"></el-table-column>
                        <el-table-column prop="amount" :label="$t('transaction.num')"></el-table-column>
                        <el-table-column prop="ts" :label="$t('table.time')"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="$t('transaction.contractInfo')" name="3">
                    <div class="contract_info">
                        <div class="title"><span>{{symbolValue}} {{$t('transaction.sustainable')}}</span><span>{{$t('transaction.frontSustainable')}}</span></div>
                        <ul>
                            <li>
                                <span>{{$t('transaction.date')}}</span>
                                <span>{{$t('transaction.sustainable')}}</span>
                            </li>
                            <li>
                                <span>{{$t('transaction.computCoin')}}</span>
                                <span>USDT</span>
                            </li>
                            <li>
                                <span>{{$t('transaction.totalCoin')}}</span>
                                <span>USDT</span>
                            </li>
                            <li>
                                <span>{{$t('transaction.transactionSize')}}</span>
                                <span>{{size}} {{coin}}/{{$t('nav.hand')}}</span>
                            </li>
                            <li>
                                <span>{{$t('transaction.lossest')}}</span>
                                <span>{{smallPrice}}</span>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <router-link class="linkRight" to="order">{{$t('transaction.closeRecord')}}</router-link>
        </div>


        <div v-if="activeIndex != '3'">
            <pageTotal v-if="page.total > 8" :page="page" @pageChange="pageChange"></pageTotal>
        </div>

        <!-- 设置止盈止损弹窗 -->
        <el-dialog
            :visible.sync="setProfit"
            :close-on-click-modal="false"
            :before-close="setAverageCancel"
            width="20%"
            class="dialogPadding"
            :title="$t('transaction.updateContract')">
            <el-form :model="form" ref="form">

                <el-form-item :label="$t('contract.proPrice')" prop="profile">
                    <el-input v-model="form.profile" autocomplete="off" :placeholder="$t('form.profileEmpty')"></el-input>
                </el-form-item>

                <el-form-item :label="$t('contract.lossPrice')" prop="loss">
                    <el-input v-model="form.loss" autocomplete="off" :placeholder="$t('form.lossEmpty')"></el-input>
                </el-form-item>
                <div class="lastBtn">
                    <el-button class="transBtn" @click="setAverageCancel">{{$t('button.cancel')}}</el-button>
                    <el-button class="themeBtn" @click="setProfitFun('form')">{{$t('button.ok')}}</el-button>
                </div>
            </el-form>
		</el-dialog>

        <!-- 确认平仓弹窗 -->
        <el-dialog
            :visible.sync="sureAverage"
            :close-on-click-modal="false"
            :before-close="closeCancel"
            width="20%"
            class="dialogPadding"
            :title="$t('transaction.average')">
            <div class="average_content">
                <div class="title">
                    <span :class="averageContent.compactType == 'BUY' ? 'greenColor' : 'redColor'">{{averageContent.compactType == 'BUY' ? $t('transaction.moreStore') : $t('transaction.emptyStore')}}  {{averageContent.leverName}}</span>
                    <span>{{averageContent.symbols}}</span>
                </div>
                <ul>
                    <li>
                        <!-- 开仓价 -->
                        <span>{{$t('contract.average')}}</span>
                        <span>{{averageContent.tradePrice}}</span>
                    </li>
                    <li>
                        <!-- 当前价 -->
                        <span>{{$t('transaction.avaragePrice')}}</span>
                        <span>{{averageContent.unit}}</span>
                    </li>
                    <li>
                        <!-- 平仓手数 -->
                        <span>{{$t('transaction.closeNum')}}</span>
                        <span>{{$t('transaction.closeValue')+worth+getCoin}}</span>
                    </li>
                    <li>
                        <el-input v-model="form.closeNum" @input="changeHands" type="number" :min="1" autocomplete="off" :placeholder="$t('transaction.enterAvarageNum')"></el-input>
                    </li>
                    <li>
                        <!-- 可平手数 -->
                        <span>{{$t('transaction.canAverage')}}</span>
                        <span>{{averageContent.numbers}}</span>
                    </li>
                     <li>
                        <!-- 预计盈亏 -->
                        <span>{{$t('transaction.planLoss')}}</span>
                        <span :class="estimate > 0 ? 'greenColor' : 'redColor'">{{estimate}}</span>
                    </li>
                    <li>
                        <!-- 平仓手续费 -->
                        <span>{{$t('transaction.efee')}}</span>
                        <span>{{ClosingFee}}</span>
                    </li>
                </ul>
            </div>
            <div class="lastBtn">
                <el-button class="transBtn" @click="sureAverage = false">{{$t('coin.think')}}</el-button>
                <el-button class="themeBtn" @click="setAverageFun('form')">{{$t('transaction.average')}}</el-button>
            </div>
		</el-dialog>
    </div>
</template>
<script>
import codeStatus from '@/config/codeStatus'
import pageTotal from '@/components/pageTotal'
import {futuresContractListApi,cancelFuturesContractApi,outFuturesContractApi,futuresContractPlApi
,futuresInfoApi,futuresTradeApi} from '@/api/getData'
import { Loading } from 'element-ui';
import conversion from '@/config/conversion'
export default {
    inject:['reload'],
    props:{
        symbolValue:String,
        coinArr:Array
    },
    data(){
        return{
            activeIndex:'0',
            tableData:[],
            form:{
                profile:'',
                loss:'',
                closeNum:''
            },
            page:{
                currentPage:1,
                limit:8,
                total:0,
            },
            setProfit:false,
            sureAverage:false,
            averageId:'',
            priceId:'',
            averageContent:{
                lossProfit:0,
                lossProfitRatio:0,
                tradePrice:0,
                unit:0,
                handNumber:0,
                closeNumber:0,
                closeFeePrice:0,
            },
            timer:null,
            averageTime:null,
            newsData:[],
            size:0,//合约大小
            smallPrice:0,//最新变动价格
            token:sessionStorage.getItem('userToken'),
            worth:0,
            ClosingFee:'0.00',
            estimate:0
        }
    },
    created(){
        var that = this;
        if(that.token){
            that.recordFun();
        }

    },
    mounted(){
        var that = this;
        if(that.token){
            that.timer = setInterval(function(){
                that.recordFun()
            },1000)
        }
    },
    computed:{
        getCoin(){
            var that = this;
            var coin = that.averageContent.symbols;
            if(coin){
                var value = coin.split('/');
                return value[0]
            }

        },
        coin(){
            var that = this;
            var coin = that.symbolValue;
            if(coin){

                return coin.split('/')[0]
            }
        }
    },
    watch:{
        coin(newValue){
            var that = this;
            if(that.activeIndex == '2'){//最新成交价
                that.currentTradeFun();
            }else if(that.activeIndex == '3'){//合约简介
                that.currentInfoFun();
            }

        }
    },
    methods:{
        async recordFun(){
            var that = this;
            var dataArr = new URLSearchParams();
            var type = '';
            if(that.activeIndex == '0'){
                type = 'N'
            }else if(that.activeIndex == '1'){
                type = 'IN'
            }
            dataArr.set('type',type);
            dataArr.set('current',that.page.currentPage);
            dataArr.set('size',that.page.limit);
            dataArr.set('showMethod','ALL');
            dataArr.set('symbols','');
            dataArr.set('buyMethod','');
            dataArr.set('status','');
            var res = await futuresContractListApi(dataArr);
            that.tableData = [];
            if(res.success){
                that.page.total = Number(res.data.total);
                var obj = res.data.records;
                obj.forEach(element => {
                    var arr = that.coinArr;
                    var coin = element.symbols;
                    arr.filter(function(item){
                        if(coin == item.symbol){
                            element.unit = item.close;//当前价
                        }
                    })
                    element.positionPrice = Number(element.positionPrice).toFixed(2);//持仓、委托保证金
                    element.lossProfit = Number(element.lossProfit).toFixed(2);//lossProfit

                    element.tradePrice = Math.round((element.tradePrice)*100)/100;//开仓价

                    element.exitFeeRatio = Number(element.exitFeeRatio).toFixed(2);//平仓手续费率
                    element.fee = Number(element.fee).toFixed(2);//建仓手续费
                    element.stopProfit == '' ?  element.stopProfit = '--' : element.stopProfit = Number(element.stopProfit).toFixed(2);//止盈
                    element.stopLoss == '' ?  element.stopLoss = '--' : element.stopLoss = Number(element.stopLoss).toFixed(2);//止损

                    //买入盈亏额 = 持仓价值数量（手数X每手价值）* (当前价 - 建仓价)
                    //卖出盈亏额 =  持仓价值数量（手数X每手价值）* (建仓价 - 当前价)

                    var num = ''
                    if(element.compactType == 'BUY'){
                        num = Number(element.unit) - Number(element.tradePrice)
                    }else if(element.compactType == 'SELL'){
                        num = Number(element.tradePrice) - Number(element.unit) ;
                    }
                    var handNum = Number(element.numbers) * Number(element.handNumber);
                    element.profitLoss = (handNum * num).toFixed(2);

                    //持仓盈亏百分比 = 盈亏额 / (持仓手数 * 每手价值数量 *建仓价格) * 100%
                    element.percentage = ((element.profitLoss / (handNum * Number(element.tradePrice)))*100).toFixed(2)+'%';

                    that.tableData.push(element)
                });
            }else{
                clearInterval(that.timer)
            }
        },
        handleIndex(tab, event){//标题切换
            var that = this;
            that.page.currentPage = 1;
            that.tableData = [];
            clearInterval(that.timer);
            if(that.token){
                if(tab.name == '0' || tab.name == '1'){
                    that.timer = null;
                    that.recordFun();
                    that.timer = setInterval(function(){
                        that.recordFun()
                    },1000)
                }
            }

            if(tab.name == '3'){
                that.currentInfoFun();
            }else if(tab.name == '2'){
                that.currentTradeFun();
            }
        },
        async currentInfoFun(){ //合约简介
            var that = this;
            var data = new URLSearchParams();
            data.set('symbol',that.symbolValue);
            var res = await futuresInfoApi(data);
            if(res.success){
                var obj = res.data;
                that.size = obj.handNumber;
                that.smallPrice = obj.price;
            }
        },
        async currentTradeFun(){//最新成交价
            var that = this;
            var data = new URLSearchParams();
            data.set('symbol',that.symbolValue);
            var res = await futuresTradeApi(data);
            that.newsData = [];
            if(res.success){
                var arr = res.data;
                if(arr.length>0){

                    arr.forEach((element) =>{
                        element.ts = conversion(element.ts);
                        that.newsData.push(element);
                    })
                }

            }
        },
        pageChange(item){
            this.page.currentPage = item;
            this.recordFun();
        },
        averageFun(id){//点击平仓获取id
            var that = this;
            that.sureAverage = true;
            that.averageId = id;
            var arr = that.tableData;
            var obj = {};
            arr.forEach(element => {
                if(id == element.compactId){
                    obj = element
                }
            });
            that.averageContent = obj;
            that.form.closeNum = obj.numbers;
            var current = '';
            that.averageTime = setInterval(function(){
                (that.tableData).forEach(el => {
                    if(id == el.compactId){
                        that.averageContent.unit = el.unit;
                        that.changeHands(that.form.closeNum)
                    }
                });
            },1000)

            that.changeHands(obj.numbers)

        },
        setPrice(id,profile,loss){//点击止盈止损获取id
            var that = this;
            that.setProfit = true;
            that.priceId = id;
            if(profile != '--'){
                that.form.profile = profile;
            }

            if(loss != '--'){
                that.form.loss = loss;
            }

        },
        async setAverageFun(){//确认平仓
            var that = this;
            var dataArr = new URLSearchParams();
            if(that.form.closeNum == ''){
                that.$message.error(that.$t('contract.closeHand'));
                return false;
            }
            if(isNaN(that.form.closeNum)){
                that.$message.error(that.$t('contract.validCloseHand'));
                return false;
            }
            if(!(Number(that.form.closeNum) %1 === 0)){
                that.$message.error(that.$t('contract.ceilNum'));
                return false;
            }

            if(Number(that.form.closeNum) < 1){
                that.$message.error(that.$t('contract.minClose'));
                return false;
            }
            dataArr.set('compactId',that.averageId);
            dataArr.set('type',1);
            dataArr.set('number',that.form.closeNum);
            var res = await outFuturesContractApi(dataArr);
            that.resultFun(res,1)
        },
        setProfitFun(form){//设置止盈止损
            var that = this;
            that.$refs[form].validate(async (valid) => {
                if(valid){
                    var dataArr = new URLSearchParams();
                    dataArr.set('compactId',that.priceId);
                    dataArr.set('stopProfit',that.form.profile);
                    dataArr.set('stopLoss',that.form.loss);
                    if(that.form.profile == '' && that.form.loss == ''){

                        that.$message.error(that.$t('contract.setLoss'));
                        // that.setProfit = false;
                        // that.$refs[form].resetFields();
                        return false;
                    }else{

                        if(isNaN(that.form.profile)){
                            that.$message.error(that.$t('contract.profitInput'));
                            return false
                        }

                        if(isNaN(that.form.loss)){
                            that.$message.error(that.$t('contract.lossInput'));
                            return false
                        }

                        var res = await futuresContractPlApi(dataArr);
                        that.resultFun(res,2)
                    }
                }
            })
        },
        setAverageCancel(){
            this.setProfit = false;
            this.$refs.form.resetFields();
        },
        closeCancel(){
            this.sureAverage = false;
            this.form.closeNum = '';
            this.worth = 0;
            this.estimate = 0;
            this.ClosingFee = 0;
            clearInterval(this.averageTime);
        },
        cancelEntrustFun(id){//撤销委托
            var that = this;
            that.$confirm(that.$t('orderStatus.cancelTip'), that.$t('assets.cancelEntrust'), {
                confirmButtonText:that.$t('orderStatus.cancelBtn'),
                cancelButtonText:that.$t('coin.think'),
                customClass:'sureBoxConfirm',
            }).then(async() => {
                var dataArr = new URLSearchParams();
                dataArr.set('compactId',id);
                dataArr.set('type',1);
                var res = await cancelFuturesContractApi(dataArr);
                that.resultFun(res)
            }).catch(() => {
            });


        },
        resultFun(res,type){
            var that = this;
            if(res.success){
                if(type == 1){//平仓成功
                    that.$message({
                        type:'success',
                        message:that.$t('transaction.averageSuccess')
                    })
                }else if(type == 2){//设置止盈止损
                    that.$message({
                        type:'success',
                        message:that.$t('assets.setProfile')
                    })
                }else{//撤销成功
                    that.$message({
                        type:'success',
                        message:that.$t('assets.cancelSuccess')
                    })
                };
                that.reload();
            }else{
                codeStatus(res.code,function(msg){
                    that.$message.error(msg)
                })
            }
        },
        changeHands(value){//计算平仓手续费
            var that = this;
            if(isNaN(value)){
                return false
            }else{
                // 平仓价值数量 （平仓手数 * 每手价值）
                that.worth = Number(value * that.averageContent.handNumber);

                //预计盈亏
                // 多仓： （平仓价值数量 * （平仓价格 - 建仓价格））
                // 空仓： （平仓价值数量 * （建仓价格 - 平仓价格））

                if(that.averageContent.compactType == 'BUY'){

                    that.estimate = (that.worth * (Number(that.averageContent.unit) - Number(that.averageContent.tradePrice))).toFixed(2);
                }else{

                    that.estimate = (that.worth * (Number(that.averageContent.tradePrice) - Number(that.averageContent.unit))).toFixed(2);
                }


                // 平仓手续费 （平仓价值数量 * 平仓价格 * 平仓手续费率）
                that.ClosingFee = (that.worth * that.averageContent.unit * (Number(that.averageContent.exitFeeRatio)/100)).toFixed(2);
            }
        }
    },

    beforeDestroy(){
        clearInterval(this.timer);
        clearInterval(this.averageTime);
    },
    components:{
        pageTotal,
    }
}
</script>
<style lang="less">
@mainColor:#00EEFF;
.contract_record_div{
    .transtionBar{
        position: relative;
        top: 10px;
        background-color: #131722;
        .linkRight{
            position: absolute;
            top: 10px;
            right: 0;
            color: @mainColor;
        }
    }
    // tab切换
    .el-tabs {
        .el-tabs__header{
            border-bottom: 1px solid #3b3b3b;
            margin-bottom: 40px;
        }
        .el-tabs__item{
            color: #C3C3C3!important;
            padding: 0!important;
            margin-right: 40px;
        }
        .el-tabs__item.is-active{
            color: @mainColor!important;
            position: relative;
            top: 0;
            &::after{
                content: '';
                position: absolute;
                bottom: 0;
                width: 40%;
                left: 26%;
                border: 1px solid @mainColor;
            }
        }
    }
    .greenColor{
        color:#44BCA7!important;
    }
    .redColor{
        color: #CD3D58!important;
    }

    .el-table .cell{
        font-size: 12px;
    }
    .el-table thead,.el-table tr th{
            background: #212435 !important;
            color: #d0d0d0;
    }
    .el-table tbody,.el-table tr td{
        background: #0A1627!important;
        color: #FFFFFF;
        border: none;
    }
    .el-table__empty-block{
        background-color:#0A1627!important;
    }
    .el-pagination{
        background-color:#0A1627!important;
    }

    // 合约简介
    .contract_info{
        background-color: #0A1627;
        border-radius: 4px;
        min-height: 500px;
        .title{
            line-height: 47px;
            background-color:  #232E3D!important;
            color: #FFFFFF;
            padding: 0 40px;
            span{
                margin-right: 10px;
            }
        }
        ul{
            padding: 0 20px;
            li{
                padding: 0 20px;
                border-bottom: 1px solid #DCDCDC;
                line-height: 56px;
                color: #999999;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
        }
    }
    // 表格操作按钮
    .operation_div{
        span{
            cursor: pointer;
            display: block;
            color: #87D8EA;
        }
    }
    // 平仓弹窗
    .average_content{
        margin: 20px 0;
        .title{
            text-align: center;
            span{
                margin-right: 10px;
            }
        }
        ul{
            li{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                line-height: 30px;
                span{
                    &:nth-child(1){
                        color: #8E8E8E;
                    }
                    &:nth-last-child(1){
                        color: #333333;
                    }
                }
            }
        }
    }

    .lastBtn{
        button{
            width: 47.6%;
        }
    }
}
</style>
