<template>
	<div class="assetsRecord_div">
		<!-- 资产流水 -->
		<el-tabs class="transtionBar cruntpage" v-model="activeIndex" @tab-click="handleIndex" style="position: relative;height: 40px;top: 22px;left: 2vw;">
			<el-tab-pane :label="$t('assets.wallet')" name="WALLET"></el-tab-pane>
			<el-tab-pane :label="$t('assets.contact')" name="CONTRACT"></el-tab-pane>
			<!-- <el-tab-pane :label="$t('assets.futures')" name="FUTURES"></el-tab-pane> -->
			<el-tab-pane :label="$t('assets.coin')" name="CURRENCY"></el-tab-pane>
			<el-tab-pane :label="$t('assets.option')" name="OPTION"></el-tab-pane>
      <el-tab-pane :label="$t('assets.currency')" name="LEGAL"></el-tab-pane>
      <el-tab-pane label="矿机" name="MINING"></el-tab-pane>

		</el-tabs>
		<el-divider></el-divider>
		<div class="filter_form">
			<AllPair :type="'FLOW'" v-if="activeIndex == 'WALLET' || activeIndex == 'CURRENCY'" @getCoin="getCoinFun" />
			<div class="leftSpread">
				<span>{{$t('transaction.allType')}}</span>
				<el-select v-model="type" :placeholder="$t('form.select')" :no-data-text="$t('tip.noRecord')">
					<el-option
						v-for="(item,index) in closeArr"
						:key="index"
						:label="item.sources"
						:value="item.code">
					</el-option>
				</el-select>
			</div>
			<el-button @click="submitFun" class="themeBtn">{{$t('assetsRecord.btn')}}</el-button>
		</div>
		<el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">

			<el-table-column prop="flowCoin" :label="$t('table.coin')"></el-table-column>
            <el-table-column prop="typeTxt" :label="$t('table.type')">
				<template slot-scope="scope">
					<p>
						<span >{{scope.row.flowType}}</span>
						<span class="remark">{{(scope.row.concatTxt == '' ? '' : scope.row.concatTxt)}}</span>
					</p>
                </template>
			</el-table-column>
            <el-table-column prop="flowPrice" :label="$t('table.num')">
				<template slot-scope="scope">
					{{scope.row.symbol}} {{scope.row.flowPrice}}
				</template>
			</el-table-column>

            <el-table-column prop="createTime" :label="$t('table.time')"></el-table-column>
        </el-table>
        <page-total v-if="page.total > 10" :page="page" @pageChange="pageChange"></page-total>
	</div>
</template>

<script>
import pageTotal from '@/components/pageTotal'
import { assetsRecordApi,assetsListApi } from '@/api/getData'
import AllPair from '@/components/AllPair'
export default {
    data(){
        return{
        	form:{
        		region:'WALLET'
			},
			pair:'',
			activeIndex:'WALLET',
        	tableData:[],
            page:{
                currentPage:1,
                limit:10,
                total:0,
			},
			type:'',
			closeArr:[]
        }
	},
	created(){
		this.flowTypeList();//流水记录类型
	},
	mounted(){
		this.recordFun();//流水记录
	},
	methods:{
		submitFun(){//筛选
			this.recordFun();
		},
		getCoinFun(item){//获取币种
			this.pair = item
		},
		handleIndex(){//资产账户类型
			var that = this;
			that.page.currentPage = 1;
			that.recordFun();
		},
		async flowTypeList(){//流水类型
			var that = this;
			var lang = that.$i18n.locale;
			var getLang = '';
			if(lang == 'en'){
				getLang = 5
			}else if(lang == 'jp'){
				getLang = 4
			}else if(lang == 'ko'){
				getLang = 3
			}else if(lang == 'tc'){
				getLang = 2
			}else{
				getLang = 1
			}
			var data = new URLSearchParams();
			data.set('type',that.activeIndex);
			data.set('languageType',getLang);
			var res = await assetsListApi(data);
			if(res.success){

				that.closeArr = res.data;
			}
		},
		async recordFun(){//流水记录
			var that = this;
			var lang = that.$i18n.locale;
			var getLang = '';
			if(lang == 'en'){
				getLang = 5
			}else if(lang == 'jp'){
				getLang = 4
			}else if(lang == 'ko'){
				getLang = 3
			}else if(lang == 'tc'){
				getLang = 2
			}else{
				getLang = 1
			}
			var dataArr = new URLSearchParams();
			dataArr.set('type',that.activeIndex);
			dataArr.set('current',that.page.currentPage);
			dataArr.set('symbols',that.pair);
			dataArr.set('flowType',that.type);
			dataArr.set('size',that.page.limit);
			dataArr.set('languageType',getLang);
			var res = await assetsRecordApi(dataArr);
			that.tableData = [];
			if(res.success){

				var data = res.data.records;
				that.page.total = Number(data.total);
				var obj = data.records;
				if(obj.length>0){
					obj.forEach(element => {
						var one,two,concatTxt;
						if(element.remark != ''){
							var getValue = (element.remark).split('⇋');
							if(getValue.length == 2){
								var front = getValue[0];
								var behind = getValue[1];
								if(front == '钱包账户'){
									one = that.$t('assetsRecord.walletAccount')
								}else if(front == '法币账户'){
									one = that.$t('assetsRecord.legalAccount')
								}else if(front == '合约账户'){
									one = that.$t('assetsRecord.contactAccount')
								}else if(front == '币币账户'){
									one = that.$t('assetsRecord.currencyAccount')
								}else if(front == '期权账户'){
                  one = that.$t('assetsRecord.optionAccount')
                }else if(front == '黄金账户'){
                  one = that.$t('assetsRecord.futuresAccount')
                }else if(front == '矿机账户'){
                  one = "矿机账户"
                }
								if(behind == '钱包账户'){
									two = that.$t('assetsRecord.walletAccount')
								}else if(behind == '法币账户'){
									two =  that.$t('assetsRecord.legalAccount')
								}else if(behind == '合约账户'){
									two = that.$t('assetsRecord.contactAccount')
								}else if(behind == '币币账户'){
									two = that.$t('assetsRecord.currencyAccount')
								}else if(behind == '黄金账户'){
                  two = that.$t('assetsRecord.futuresAccount')
                }if(behind == '期权账户'){
									two = that.$t('assetsRecord.optionAccount')
                }else if(behind == '矿机账户'){
                  two = "矿机账户"
                }
								concatTxt = '（'+one +'⇋'+ two+'）';
							}else if(getValue.length == 1){
								concatTxt = ''
							}

						}else{
							concatTxt = ''
						}
						element.concatTxt = concatTxt;
						element.flowPrice = Number(element.flowPrice).toFixed(2);
						that.tableData.push(element);
					});
				}
			}
		},
		pageChange(item){//切换页码
			this.page.currentPage = item;
			this.recordFun();
		}
	},
    components:{
		pageTotal,
		AllPair
    }
}
</script>

<style lang="less">
.assetsRecord_div{
	&>.filter_form{
	margin-bottom: -40px;
    position: relative;
    top: -77px;
    left: -1vw;
	}


}
</style>
