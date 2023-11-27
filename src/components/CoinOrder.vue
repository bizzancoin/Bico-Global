<template>
    <div class="coin_record_div">
        <div class="transtionBar">
            <el-tabs v-model="activeIndex" @tab-click="handleIndex">
                <el-tab-pane :label="$t('contract.trust')" name="0">
                   <el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">
                        <!-- 方向交易对 -->
                        <el-table-column width="140" prop="leverName" :label="$t('transaction.location')+'/'+$t('contract.pair')">
                            <template slot-scope="scope">
                                <span :class="scope.row.matchType == 'BUY' ? 'greenColor' : 'redColor'">{{scope.row.matchType == 'BUY' ? $t('coin.buy') : $t('coin.sell')}}{{scope.row.symbols}}</span>
                            </template>
                        </el-table-column>

                         <!-- 委托价格 -->
                        <el-table-column prop="unit"  :label="$t('transaction.waitPrice')"></el-table-column>

                        <!-- 委托数量 -->
                        <el-table-column prop="willNumberB"  :label="$t('contract.entrustNum')"></el-table-column>

                        <!-- 交易总额 -->
                        <el-table-column prop="totalPrice" :label="$t('contract.transactionNum')+'(USDT)'"></el-table-column>

                        <!-- 成交量 -->
                        <el-table-column prop="numbersB" :label="$t('legal.number')"></el-table-column>

                        <!-- 成交均价 -->
                        <el-table-column prop="avgUnit" :label="$t('legal.aveprice')"></el-table-column>

                        <!-- 手续费 -->
                        <el-table-column prop="numberFee" :label="$t('contract.fee')"></el-table-column>

                        <!-- 订单号 -->
                        <el-table-column prop="orderNo" :label="$t('nav.orderNum')"></el-table-column>

                        <!-- 建仓时间 -->
                        <el-table-column width="164" prop="createTime" :label="$t('table.time')"></el-table-column>

                        <el-table-column width="168" prop="matchId" :label="$t('contract.operation')">
                            <template slot-scope="scope">
                                <div class="operation_div">
                                    <span @click="cancelEntrustFun(scope.row.matchId)">{{$t('assets.cancelEntrust')}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <router-link class="linkRight" to="coinOrder">{{$t('legal.record')}}</router-link>
        </div>

        <pageTotal v-if="page.total > 8" :page="page" @pageChange="pageChange"></pageTotal>

    </div>
</template>
<script>
import codeStatus from '@/config/codeStatus'
import pageTotal from '@/components/pageTotal'
import { coinListApi,cancelCoinApi } from '@/api/getData'
import { Loading } from 'element-ui';
export default {
    inject:['reload'],
    props:['symbolValue'],
    data(){
        return{
            activeIndex:'0',
            tableData:[],
            form:{
                profile:'',
                loss:'',
            },
            page:{
                currentPage:1,
                limit:8,
                total:0,
            },
            setProfit:false,
            averageId:'',
            priceId:'',
            timer:null,
            averageTime:null,
            newsData:[],
            token:sessionStorage.getItem('userToken')
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
    methods:{
        async recordFun(){
            var that = this;
            
            var dataArr = new URLSearchParams();
            dataArr.set('type',1);
            dataArr.set('current',that.page.currentPage);
            dataArr.set('size',that.page.limit);
            var res = await coinListApi(dataArr);
            that.tableData = [];
            if(res.success){
                that.page.total = Number(res.data.total);
                var obj = res.data.records;
                if(obj.length > 0){
                    obj.forEach(element => {
                        
                        element.avgUnit = Number(element.avgUnit).toFixed(4);
                        element.numbersB = element.numbersB = '' ? '0.0000' : Number(element.numbersB).toFixed(4);
                        // 交易总额 = 委托数量*委托价格
                        element.totalPrice = (Number(element.unit) *  Number(element.willNumberB)).toFixed(8);
                        element.numbersU = element.numbersU = '' ? '0.0000' : Number(element.numbersU).toFixed(4);
                        element.numberFee = Number(element.numberFee).toFixed(8);
                        that.tableData.push(element);
                    });
                }
            }else{
                clearInterval(that.timer)
            }
        },
        handleIndex(tab, event){//标题切换
            var that = this;
            that.page.currentPage = 1;
            that.tableData = [];
            clearInterval(that.timer);
            that.recordFun();
            if(tab.name == '2'){
                
            }else{
                that.timer = null;
                that.timer = setInterval(function(){
                    that.recordFun()
                },1000)
            }
            
        },
        pageChange(item){
            this.page.currentPage = item;
            this.recordFun();
        },
        cancelEntrustFun(id){//撤销委托
            var that = this;
            that.$confirm(that.$t('orderStatus.cancelTip'), {
                confirmButtonText:that.$t('orderStatus.cancelBtn'),
                cancelButtonText: that.$t('coin.think'),
                customClass:'comfirmBox',
                type: 'warning'
            }).then(async () => {
                var dataArr = new URLSearchParams();
                dataArr.set('matchId',id);
                var res = await cancelCoinApi(dataArr);
                that.resultFun(res)
            }).catch(() => {
            });
            
        },
        resultFun(res,type){
            var that = this;
            if(res.success){
                that.$message({
                    type:'success',
                    message:that.$t('assets.cancelSuccess')
                })
                setTimeout(function(){
                    that.$router.push('/coinOrder');
                },800)
            }else{
                codeStatus(res.code,function(msg){
                    that.$message.error(msg)
                })
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
.coin_record_div{
    .transtionBar{
            position: relative;
            top: 45px;
            background-color: #131722;
        .linkRight{
                position: absolute;
                top: 10px;
                right: 1730px;
                color: #929292;
                z-index: 9999;
        }
    }
    // tab切换
    .el-tabs {
        .el-tabs__header{
            border-bottom: 1px solid #3b3b3b;
            margin-bottom: 57px;
        }
        .el-tabs__item{
            color: #C3C3C3!important;
            padding: 0!important;
            margin-right: 40px;
        }
        .el-tabs__item.is-active{
            color: #929292 !important;
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
        background: #1d202d !important;  
    }
    .el-table tbody,.el-table tr td{
        background: #0A1627!important;  
        color: #FFFFFF;
        border: none;
    }
    .el-table__empty-block{
        background-color:#131722 !important;
    }
    .el-pagination{
        background-color:#0A1627!important;
    }
    // 表格操作按钮
    .operation_div{
        span{
            cursor: pointer;
            display: block;
            color: #87D8EA;
        }
    }

    .lastBtn{
        button{
            width: 47.6%;
        }
    }
}
.comfirmBox{
    .el-message-box__headerbtn{
        display: none!important;
    }
    .el-message-box__container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        .el-message-box__status{
            display: block!important;
            text-align: center;
            position:relative;
            top: -6px!important;
            &:before{
                content: '\e6c9' !important;
                font-size: 40px;
                color: @mainsColor;
            }
        }
        .el-message-box__message{
            text-align: center;
            padding-left:0;
            font-weight: bold;
            font-size: 16px;
            color: #101010;
        }
    }
    .el-message-box__btns{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px;
        .el-button{
            width: 46%;
            height: 40px;
            border-color:@mainsColor;
            &:nth-child(1){
                color:@mainsColor!important;
            }
            &:nth-last-child(1){
                background-color: @mainsColor;
            }
            span{
                letter-spacing: 1px;
            }
        }
    }
}
</style>