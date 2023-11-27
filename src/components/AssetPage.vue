<template>
	<div class="record_two">
        <el-divider></el-divider>
        <div class="record_Btn recdl" style="position: relative;text-align: right;top: -24px;right: 0px;border-radius: 0px 0px 12px 12px;">
            <div class="record_Btn recdl" style="position: relative;text-align: right;top:0px;right: 30px;">
                <AllPair @getCoin="getCoinFun" />
                <el-button @click="submitFun" class="themeBtn">{{$t('assetsRecord.btn')}}</el-button>
            </div>
        </div>
        <!-- <el-divider style="position: relative;text-align: right;top: -54px;right: 0px;"></el-divider> -->
        <!-- 提币，充币记录 -->
		<el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">
    		<el-table-column prop="time" :label="$t('table.time')"></el-table-column>
            <el-table-column prop="coin" :label="$t('table.coin')"></el-table-column>
            <el-table-column prop="price" :label="$t('table.num')"></el-table-column>
            <el-table-column prop="actualPrice" :label="$t('recharge.infactMoney')"></el-table-column>
            <el-table-column class="showRight" prop="statusTxt" :label="$t('table.status')">
                <template slot-scope="scope">
                    <p v-if="scope.row.statusId == 0" class="redColor">{{scope.row.statusTxt}}</p>
                    <p v-else-if="scope.row.statusId == 1" class="greenColor">{{scope.row.statusTxt}}</p>
                    <p v-else>{{scope.row.statusTxt}}</p>
                </template>
            </el-table-column>
        </el-table>
        <pageTotal v-if="page.total > page.limit" :page="page" @pageChange="pageChange"></pageTotal>
	</div>
</template>

<script>
import { coinRecordApi } from '@/api/getData'
import pageTotal from '@/components/pageTotal'
import AllPair from '@/components/AllPair'
export default {
    props:['vauleType','changeValue'],
    data(){
        return{
            tableData:[],
            pair:'',
            page:{
                currentPage:1,
                limit:10,
                total:0,
            },
		}
    },
    computed:{
        getChange(){
            return this.changeValue
        }
    },
    watch:{
        getChange(newValue){
            if(newValue != 0){
                this.rechargeFun();
            }
        }
    },
    mounted(){
        this.rechargeFun();
    },
    methods:{
        getCoinFun(item){//获取币种
            this.pair = item;
        },
        submitFun(){//提交筛选内容
            this.rechargeFun();
        },
        async rechargeFun(){
            var that = this;
            var dataArr = new URLSearchParams();
            var typeTxt = '';
            switch (Number(that.vauleType)) {
                case 1:
                    typeTxt = 'R'
                    break;
                case 2:
                    typeTxt = 'W'
                    break;
                default:
                    break;
            }
            dataArr.set('type',typeTxt);
            dataArr.set('symbol',that.pair);
            dataArr.set('current',that.page.currentPage);
            dataArr.set('size',that.page.limit);
            var res = await coinRecordApi(dataArr);
            that.tableData = [];
            if(res.code == 200){
                that.page.total = Number(res.data.total);
                var obj = res.data.records;
                obj.forEach(element => {
                   var statusTxt = '';
                   element.price = Number(element.price).toFixed(2);
					switch (element.status){
						case '审核中':
                            statusTxt = that.$t('codeTxt.examine');
                            element.statusId = 0;
							break;
						case '审核通过':
                            statusTxt = that.$t('legal.successTxt');
                            element.statusId = 1;
							break;
						case '提币中':
                            statusTxt = that.$t('lagal.withdrawWait');
                            element.statusId = 2;
							break;
						case '审核不通过':
                            statusTxt = that.$t('legal.examineFail');
                            element.statusId = 3;
							break;
						default:
							break;
                    } 
                    element.statusTxt = statusTxt;
                    that.tableData.push(element)
                });
            }
        },
        pageChange(item){
            this.page.currentPage = item;
        	this.rechargeFun();
        }
    },
	components:{
        pageTotal,
        AllPair
    }
}
</script>

<style lang="less">
.record_two{
    .themeBtn {
        width: 100px!important;
    }
    .record_Btn{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .redColor{
        color: #EC5E45;
    }
    .greenColor{
        color: #6FC1A1;
    }

}
</style>