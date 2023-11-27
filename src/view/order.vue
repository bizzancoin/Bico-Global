<template>
<div class="order_etr2">
    <div style="height:148px;">
    </div>
    <div class="legal_ecccui56">
        {{$t('contract.title')}}
        <span style="font-size: 28px;color: #FFF;">Service<span style="font-size: 28px;color: #ff9800;"> Centre</span></span>
    </div>
    <div class="order_div">
        <div class="myselfContent">
            <div class="order_title">
                <div style="height:200px;"></div>
                <h2 class="title"></h2>
                <div class="leftSpread">
                    <AllPair :type="'CONTRACT'" @getCoin="getCoinFun" />
                    <div class="leftSpread">
                        <span>{{$t('transaction.allType')}}</span>
                        <el-select v-model="warehouse" :placeholder="$t('form.select')">
                            <el-option :label="$t('transaction.moreStore')" value="BUY"></el-option>
                            <el-option :label="$t('transaction.emptyStore')" value="SELL"></el-option>
                        </el-select>
                    </div>
                    <div class="leftSpread">
                        <span>{{$t('transaction.allType')}}</span>
                        <el-select v-model="close" :placeholder="$t('form.select')">
                            <el-option
                                v-for="(item,index) in closeArr"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button @click="submitFun('ruleForm')" class="themeBtn">{{$t('assetsRecord.btn')}}</el-button>
                </div>
            </div>
            <el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">
                <!-- 交易对 -->
                <el-table-column width="130" prop="leverName" :label="$t('transaction.location')+'/'+$t('contract.pair')">
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
                <el-table-column width="160" prop="pl" :label="$t('contract.profile')">
                    <template slot-scope="scope">
                        <!-- <span class="greenColor" v-if="scope.row.pl>0">{{scope.row.pl}}{{scope.row.computedPirce}}</span>
                        <span class="redColor" v-else>{{scope.row.pl}}{{scope.row.computedPirce}}</span> -->
                        <span :class="scope.row.lossProfit > 0 ? 'greenColor' : 'redColor'">{{scope.row.lossProfit+'('+scope.row.lossProfitRatio+')'}}</span>
                    </template>
                </el-table-column>
                <!-- 平仓类型 -->
                <el-table-column prop="exitType" :label="$t('transaction.averageType')"></el-table-column>
                <!-- 平仓手数 -->
                <el-table-column prop="numbers"  :label="$t('transaction.handNum')"></el-table-column>
                <!-- 平仓手数 -->
                <el-table-column prop="closeNumber"  :label="$t('transaction.closeNum')"></el-table-column>
                <!-- 平仓价值 -->
                <el-table-column prop="handPrice"  :label="$t('transaction.closeValue')">
                    <template slot-scope="scope">
                        <span>{{scope.row.handPrice+scope.row.getCoin}}</span>
                    </template>
                </el-table-column>

                <!-- 建仓价 -->
                <el-table-column prop="tradePrice"  :label="$t('contract.average')"></el-table-column>
                <!-- 平仓价 -->
                <el-table-column prop="exitPrice" :label="$t('transaction.averagePrice')"></el-table-column>

                <!-- 持仓保证金 -->
                <el-table-column prop="positionPrice"  :label="$t('transaction.hasBond')"></el-table-column>

                <!-- 平仓保证金 -->
                <el-table-column prop="exitPositionPrice"  :label="$t('transaction.closeBond')"></el-table-column>

                <!-- 平仓手续费 -->
                <el-table-column prop="closeFeePrice" :label="$t('transaction.efee')"></el-table-column>
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
                <!-- 订单 -->
                <el-table-column width="190" prop="orderNo" :label="$t('nav.order')"></el-table-column>

            </el-table>

            <pageTotal v-if="page.total > 8" :page="page" @pageChange="pageChange"></pageTotal>
        </div>
        <div style="height:300px;"></div>
        <Foot />
    </div>
</div>
</template>

<script>
import pageTotal from '@/components/pageTotal'
import Foot from '@/components/Foot'
import { contractListApi } from '@/api/getData'
import AllPair from '@/components/AllPair'
export default{
    data(){
        return{
            contract:'',
            closeArr:[],
            warehouse:'',
            close:'',
            page:{
                currentPage:1,
                limit:8,
                total:0,
            },
            tableData:[],
            timerY:null
        }
    },
    created(){
        var that = this;
        var arr = [
            {
                name:that.$t('assets.forceWarehouse'),id:'FIXED'
            },{
                name:that.$t('assets.profileWarehouse'),id:'PROFIT'
            },{
                name:that.$t('assets.lossWarehouse'),id:'LOSS'
            },{
                name:that.$t('assets.handWarehouse'),id:'HANDLE'
            }
        ];
        that.closeArr = arr;
        that.recordFun();
        // that.timerY = setInterval(()=>{
        //     that.recordFun();
        // },1000)
    },
    methods:{
        submitFun(){
            this.page.currentPage = 1;
            this.recordFun();
        },
        getCoinFun(item){
            this.contract = item;
        },
        async recordFun(){
            var that = this;
            var dataArr = new URLSearchParams();
            dataArr.set('type','Y');
            dataArr.set('current',that.page.currentPage);
            dataArr.set('size',that.page.limit);

            dataArr.set('showMethod','');
            dataArr.set('symbols',that.contract);
            dataArr.set('buyMethod',that.warehouse);
            dataArr.set('status',that.close);
            var res = await contractListApi(dataArr);
            that.tableData = [];
            if(res.success){
                that.page.total = Number(res.data.total);
                var obj = res.data.records;
                obj.forEach(element => {
                    element.positionPrice = Number(element.positionPrice).toFixed(2);//持仓保证金
                    element.exitPositionPrice = Number(element.exitPositionPrice).toFixed(2);//平仓保证金
                    element.closeFeePrice = Number(element.closeFeePrice).toFixed(2);//	平仓手续费
                    element.tradePrice = Math.round((element.tradePrice)*100)/100;//开仓价
                    element.lossProfit = Number(element.lossProfit).toFixed(2);//盈亏额
                    element.handPrice = Number(element.handPrice);//平仓价值
                    element.exitPrice = Math.round((element.exitPrice)*100)/100;//平仓价
                    element.numbers = Number(element.numbers);//交易数量
                    element.fee = Number(element.fee).toFixed(2);//建仓手续费
                    element.stopProfit == '' ?  element.stopProfit = '--' : element.stopProfit = Number(element.stopProfit).toFixed(2);//止盈
                    element.stopLoss == '' ?  element.stopLoss = '--' : element.stopLoss = Number(element.stopLoss).toFixed(2);//止损
                    element.getCoin = (element.symbols).split('/')[0];


                    //买入盈亏额 = 持仓价值数量（手数X每手价值）* (当前价 - 建仓价)
                    //卖出盈亏额 =  持仓价值数量（手数X每手价值）* (建仓价 - 当前价)

                    //平仓盈亏百分比 = 盈亏额 / (平仓手数 * 每手价值数量 *建仓价格) * 100%

                    switch (element.exitType) {
                        case '强制平仓':
                            element.exitType = that.$t('assets.forceWarehouse')
                            break;
                        case '手动平仓':
                            element.exitType = that.$t('assets.handWarehouse')
                            break;
                        case '止盈平仓':
                            element.exitType = that.$t('assets.profileWarehouse')
                            break;
                        case '止损平仓':
                            element.exitType = that.$t('assets.lossWarehouse')
                            break;
                        default:
                            break;
                    }
                    that.tableData.push(element)
                });
            }
        },
        pageChange(item){
            this.page.currentPage = item;
            this.recordFun();
        },
    },
    destroyed(){
        // clearInterval(this.timerY)
    },
    components:{
        pageTotal,
        Foot,
        AllPair
    }
}
</script>

<style lang="less">
.order_div{
    .myselfContent{
        margin: 0 auto;
        padding: 0;
    }
    .order_title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0px 0 0px 0;
        padding: 0 100px;
        .el-select{
            width: 150px;
            margin: 0 40px 0 10px;
        }
        .title{
            font-size: 30px;
        }
    }

    .greenColor{
        color:#44BCA7!important;
    }
    .redColor{
        color: #CD3D58!important;
    }
}
</style>
