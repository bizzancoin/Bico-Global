<template>
<div class="order_etr2">
    <div style="height:148px;">
    </div>
    <div class="legal_ecccui56">
        {{$t('legal.dealRecord')}}
        <span style="font-size: 28px;color: #FFF;">Service<span style="font-size: 28px;color: #ff9800;"> Centre</span></span>
    </div>
    <div class="coin_order_div">
        <div class="myselfContent">
            <div class="order_title">
                <div style="height:200px;"></div>
                <h2 class="title"></h2>
                <div class="leftSpread">
                    <AllPair :type="'CURRENCY'" @getCoin="getCoinFun" />
                    <div class="leftSpread">
                        <span>{{$t('transaction.allType')}}</span>
                        <el-select v-model="warehouse" :placeholder="$t('form.select')">
                            <el-option :label="$t('transaction.allType')" value="5"></el-option>
                            <el-option :label="$t('coin.buy')" value="2"></el-option>
                            <el-option :label="$t('coin.sell')" value="3"></el-option>
                            <el-option :label="$t('orderStatus.cancelBtn')" value="4"></el-option>
                        </el-select>
                    </div>
                    <el-button @click="submitFun" class="themeBtn">{{$t('assetsRecord.btn')}}</el-button>
                </div>
            </div>
            <el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">
                <!-- 交易对 -->
                <el-table-column width="130" prop="leverName" :label="$t('transaction.location')+'/'+$t('contract.pair')">
                    <template slot-scope="scope">
                        <span :class="scope.row.matchType == 'BUY' ? 'greenColor' : 'redColor'">{{scope.row.matchType == 'BUY' ? $t('coin.buy') : $t('coin.sell')}}{{scope.row.symbols}}</span>
                    </template>
                </el-table-column>
                <!-- 委托价格 -->
                <el-table-column prop="unit" :label="$t('transaction.waitPrice')"></el-table-column>

                <!-- 委托数量 -->
                <el-table-column prop="willNumberB"  :label="$t('contract.entrustNum')"></el-table-column>

                <!-- 交易总额 -->
                <el-table-column prop="numbersU" :label="$t('contract.total')+'(USDT)'"></el-table-column>

                <!-- 成交量 -->
                <el-table-column prop="numbersB"  :label="$t('legal.number')"></el-table-column>

                <!-- 成交均价 -->
                <el-table-column prop="avgUnit"  :label="$t('legal.aveprice')"></el-table-column>

                <!-- 手续费 -->
                <el-table-column prop="numberFee" :label="$t('contract.fee')"></el-table-column>

                <!-- 订单号 -->
                <el-table-column prop="orderNo" :label="$t('nav.orderNum')"></el-table-column>

                <!-- 时间 -->
                <el-table-column width="190" prop="createTime" :label="$t('table.time')"></el-table-column>

            </el-table>

            <pageTotal v-if="page.total > 10" :page="page" @pageChange="pageChange"></pageTotal>
        </div>
        <div style="height:300px;"></div>
        <Foot />
    </div>
</div>
</template>

<script>
import pageTotal from '@/components/pageTotal'
import Foot from '@/components/Foot'
import { coinListApi } from '@/api/getData'
import AllPair from '@/components/AllPair'
export default{
    data(){
        return{
            contract:'',
            warehouse:'5',
            page:{
                currentPage:1,
                limit:10,
                total:0,
            },
            tableData:[]
        }
    },
    created(){
        var that = this;
        if(sessionStorage.getItem('userToken')){
            that.recordFun();
        }
    },
    methods:{
        submitFun(){//筛选
            var that = this;
            if(sessionStorage.getItem('userToken')){
                that.recordFun();
            }
        },
        getCoinFun(item){
            this.contract = item;
        },
        async recordFun(){
            var that = this;
            var dataArr = new URLSearchParams();
            dataArr.set('type',that.warehouse);
            dataArr.set('current',that.page.currentPage);
            dataArr.set('size',that.page.limit);
            dataArr.set('symbols',that.contract);
            var res = await coinListApi(dataArr);
            that.tableData = [];
            if(res.success){
                that.page.total = Number(res.data.total);
                var obj = res.data.records;
                if(obj.length > 0){
                    obj.forEach(element => {
                        // 交易总额 = 委托数量*委托价格
                        element.totalPrice = (Number(element.unit) *  Number(element.willNumberB)).toFixed(8);
                        element.avgUnit = Number(element.avgUnit).toFixed(4);
                        element.numbersB = element.numbersB = '' ? '0.0000' : Number(element.numbersB).toFixed(4);
                        element.numbersU = element.numbersU == '' ? '0.0000' : Number(element.numbersU).toFixed(4);
                        element.numberFee = Number(element.numberFee).toFixed(8);
                        that.tableData.push(element);
                    });
                }
            }
        },
        pageChange(item){
            this.page.currentPage = item;
            this.recordFun();
        },
    },
    components:{
        pageTotal,
        Foot,
        AllPair
    }
}
</script>

<style lang="less">
.coin_order_div{
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
