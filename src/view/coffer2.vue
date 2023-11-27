<template>
	<div class="d_c2_container">
		<div class="d_c2_select_symbol">
			<el-select v-model="value" :placeholder="$t('home.huobi87')" @change="selectCoin">
				<el-option v-for="(item,index) in coinList" :key="index" :label="item.title" :value="item.id"></el-option>
			</el-select>
		</div>
		<div class="d_c2_div1">
			<div class="d_flex d_c2_div1_title_box">
				<img class="d_c2_div1_title_logo" :src="selectCoinModel?selectCoinModel.img:'../assets/TRIP2.png'">
				<div style="margin-left:20px">
					<div class="d_c2_div1_title_text">{{selectCoinModel.currency}}</div>
					<div class="d_c2_div1_title_desc">{{$t('home.xbsg24')}} </div>
				</div>


				<div style="margin-left:60px">
					<div class="d_c2_div1_title_text"></div>
				</div>

				<!--div style="margin-left:20px">
					<div class="d_c2_div1_title_text">描述</div>
					<div class="d_c2_div1_title_desc">{{selectCoinModel.describes}}</div>
				</div-->
				<div style="margin-left:20px">
					<div class="d_c2_div1_title_text">{{$t('home.xbsg25')}}{{selectCoinModel.issuanceCount}} {{selectCoinModel.currency}} </div>
					<div class="d_c2_div1_title_desc">{{$t('home.xbsg26')}}</div>
				</div>

				<div style="margin-left:60px">
					<div class="d_c2_div1_title_text"></div>
				</div>

				<div style="margin-left:20px">
					<div class="d_c2_div1_title_text">{{$t('home.xbsg27')}}{{selectCoinModel.minPrice}} {{selectCoinModel.currency}} </div>
					<div class="d_c2_div1_title_desc">{{$t('home.xbsg28')}}</div>

				</div>
				<!--div style="margin-left:20px">
					<div class="d_c2_div1_title_text">币种</div>
					<div class="d_c2_div1_title_desc">{{selectCoinModel.currency}}</div>
				</div-->
				<!--div style="margin-left:20px">
					<div class="d_c2_div1_title_text">最低认购</div>
					<div class="d_c2_div1_title_desc">{{selectCoinModel.minPrice}}</div>
				</div-->


				<div style="margin-left:60px">
					<div class="d_c2_div1_title_text"></div>
				</div>

				<div style="margin-left:20px">
					<div class="d_c2_div1_title_text">{{$t('home.xbsg29')}}</div>
					<div class="d_c2_div1_title_desc">{{selectCoinModel.startTime}}</div>
				</div>

				<div style="margin-left:60px">
					<div class="d_c2_div1_title_text"></div>
				</div>

				<div style="margin-left:20px">
					<div class="d_c2_div1_title_text">{{$t('home.xbsg30')}}</div>
					<div class="d_c2_div1_title_desc">{{selectCoinModel.endTime}}</div>
				</div>
				<!--div style="margin-left:20px">
					<div class="d_c2_div1_title_text">介绍</div>
					<div class="d_c2_div1_title_desc">{{selectCoinModel.introduce}}</div>
				</div>
				<div style="margin-left:20px">
					<div class="d_c2_div1_title_text">条件</div>
					<div class="d_c2_div1_title_desc">{{selectCoinModel.conditions}}</div>
				</div-->

			</div>
			<div class="d_c2_div1_tips">
				<div class="d_c2_div1_tips_content">
					<i class="el-icon-warning"></i>
					{{selectCoinModel.describes}}{{$t('home.xbsg31')}}
				</div>
			</div>
			<div class="d_flex d_c2_div1_main">
				<div class="d_c2_div1_main_left">
					<div class="d_c2_div1_main_left_item">
						<div class="d_c2_div1_main_left_item_title">{{$t('home.xbsg32')}}</div>
						<div class="d_c2_div1_main_left_item_input_box">
							<el-select v-model="value" :placeholder="$t('home.huobi87')" style="width: 100%" disabled>
								<el-option v-for="(item,index) in coinList" :key="index" :label="item.currency" :value="item.id">

								</el-option>
							</el-select>
						</div>
					</div>
					<div class="d_c2_div1_main_left_item">
						<div class="d_c2_div1_main_left_item_title">{{$t('home.xbsg33')}}</div>
						<div class="d_c2_div1_main_left_item_input_box">

							<el-input :placeholder="$t('home.huobi88')" v-model="input3" @change="numChange"></el-input>
							<div class="d_flex d_c2_input_append">
								<div class="d_c2_input_appendText" @click="allFun">{{$t('home.xbsg34')}}</div>
								<div class="d_c2_input_appendLine"></div>
								<div class="d_c2_input_appendSymbol">{{selectCoinModel.currency}}</div>
							</div>
						</div>
					</div>
					<div class="d_c2_div1_main_left_item">
						<div class="d_c2_div1_main_left_item_title">{{$t('home.xbsg35')}}</div>
						<div class="d_c2_div1_main_left_item_input_box">
							<el-progress :percentage='percentage' :stroke-width="8" color="#6358a0" :show-text="false"></el-progress>
							<div class="d_flex d_c2_div1_proce_desc">
								<div>
									<span class="d_c2_color1">{{$t('home.xbsg36')}}{{selectCoinModel.issuanceCount}} {{selectCoinModel.currency}}  / </span>
									<span class="d_c2_color2">{{$t('home.xbsg37')}}{{boughtNum}} {{selectCoinModel.currency}}</span>
								</div>
								<div class="d_c2_color1">{{$t('home.xbsg38')}}{{percentage}}%</div>
							</div>
						</div>
					</div>
				</div>
				<div class="d_c2_div1_main_right">
					<div class="d_c2_div1_main_title">{{$t('home.xbsg39')}}<i class="el-icon-info"></i></div>
					<div class="d_flex d_c2_div1_main_desc">
						<span class="d_c2_div1_main_desc_num">14.5</span>
						<span class="d_c2_div1_main_desc_unit">%</span>
						<span class="d_c2_div1_main_desc_symbol">USDC</span>
					</div>
					<div class="d_c2_div1_right_year"></div>
					<div class="d_c2_echarts_box">
						<div id="d_c2_echart"></div>
					</div>
				</div>
			</div>
			<div class="d_flex d_c2_div1_bot">
				<div class="d_flex d_c2_div1_bot_left">
					<span>{{$t('home.xbsg40')}}</span>
					<span>{{selectCoinModel.oddsWinning}}% </span>
					<span>{{selectCoinModel.currency}}</span>
				</div>
				<div class="d_c2_div1_bot_right">
					<div class="d_c2_check">
						<el-checkbox v-model="checked" @change="d_change">{{$t('home.xbsg41')}}</el-checkbox>
					</div>
					<div class="d_flex d_cyBtB">
						<div class="d_tc">{{$t('home.xbsg42')}}</div>
						<button class="d_cyBtn" @click="save">{{$t('home.xbsg43')}}</button>
					</div>

				</div>
			</div>
		</div>

		<div class="d_c2_div2">
			<div class="d_c2_div2_title">{{$t('home.xbsg44')}}</div>
			<div class="d_c2_div2_stepBox">
				<div class="d_flex d_c2_div2_step1">
					<div>{{$t('home.xbsg45')}}</div>
					<div>{{$t('home.xbsg46')}}</div>
					<div>{{$t('home.xbsg47')}}</div>
					<div>{{$t('home.xbsg48')}}</div>
				</div>
				<div class="d_c2_div2_step2">
					<div class="d_flex d_c2_div2_step2s">
						<div class="d_c2_div2_step2sItemActive">
							<div><div></div></div>
						</div>
						<div class="d_c2_div2_step2sItem"></div>
						<div class="d_c2_div2_step2sItem"></div>
						<div class="d_c2_div2_step2sItem"></div>
					</div>
				</div>
				<div class="d_flex d_c2_div2_step3">
					<div>2021-09-04</div>
					<div>2021-09-05</div>
					<div>{{$t('home.xbsg49')}}</div>
					<div>{{$t('home.xbsg50')}}</div>
				</div>
			</div>
			<div class="d_c2_div2_desc">
				<p>{{$t('home.xbsg51')}}</p>
				<p>{{$t('home.xbsg52')}}</p>
				<p>{{$t('home.xbsg53')}}</p>
				<p>{{$t('home.xbsg54')}}</p>
				<p>{{$t('home.xbsg55')}}</p>
				<p>{{$t('home.xbsg56')}}</p>
				<p>{{$t('home.xbsg57')}}</p>
			</div>
			<!--div class="d_c2_more">
				<button>查看更多</button>
			</div-->
		</div>

		<el-dialog :visible.sync="visible" width="470px" :before-close="handleClose">
			<div slot="title" class="d_dialog_title">{{$t('home.xbsg58')}}</div>
			<div class="d_dialog_content">{{$t('home.xbsg59')}}</div>
			<div slot="footer" class="d_dialog_footer">
				<button class="d_dialog_footer_btn" @click="visible=false">{{$t('home.xbsg60')}}</button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import echarts from 'echarts'
	import { teManagementListAllApi,walletApi,knowTeManagementList,teManagementOrderAddApi} from '@/api/getData'

	export default{
		props:{
			coffer2Data:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return{
				value:"",
				coinList:[],
				input3:'',
				checked:false,
				visible:false,
				selectCoinModel:{},
				//项目申购剩余数量
				remainAmount: 0 ,
				//已购入
				boughtNum: 0,
				//项目进度
				percentage: 0,
				//selectCoinName:'',
				//描述
				// selectCoinDescribes:'',
				// //标题
				// selectCoinTitle:'',
				// //总发行量
				// selectCoinIssuanceCount:'',
				// //发行价格
				// selectCoinIssuancePrice:'',
				// //币种
				// selectCoinCurrency:'',
				// //最低认购金额
				// selectCoinMinPrice:'',
				// //开始时间
				// selectCoinStartTime:'',
				// //结束时间
				// selectCoinEndTime:'',
				// //官方链接
				// selectCoinComLink:'',
				// //白皮书连接
				// selectWhiteBookLink:'',
				// //状态
				// //介绍
				// selectCoinIntroduce:'',
				// //条见
				// selectCoinConditions:'',

			}
		},
		created(){
			this.getTeManagementList()
			this.getAssets();
		},
		mounted(){
			this.echartsInit();
		},
		methods:{
		  allFun(){
        this.input3 = this.selectCoinModel.issuanceCount -this.boughtNum
      },
			d_change(v){
				if(v){
					this.visible = true;
				}
			},
			save(){
				var num = this.input3
				if(num<this.selectCoinModel.minPrice){
					this.$message.error(this.$t('bico.W313')+this.selectCoinModel.minPrice);
					return
				}
				if(num>this.selectCoinModel.issuanceCount){
					this.$message.error(this.$t('bico.W314')+this.selectCoinModel.issuanceCount);
					return
				}
				if(num>this.remainAmount){
					this.$message.error(this.$t('bico.W315')+this.remainAmount);
					return
				}
				//const r = /^\+?[0-9][0-9]*$/; // 正整数（可以以0打头）
				//const r = /^\+?[1-9][0-9]*$/;//正整数
				// if (!r.test(num) ) {
				// 	this.$message.error("请输入正整数！");
				//  return
				// };

				if(!this.checked){
					this.$message.error(this.$t('bico.W316'));
					return
				}
				this.saveNew()
			},
			async saveNew(){
				var dataArr = new URLSearchParams();
				dataArr.set('teManagementId',this.selectCoinModel.id);
				dataArr.set('amount',this.input3);

				var res = await teManagementOrderAddApi(dataArr);
				if(res.success){
					this.$message.success(this.$t('bico.W317'));
					this.selectCoin(this.selectCoinModel.id)
				}else{
					this.$message.error(this.$t('bico.W318')+res.msg);
				}
			},
			 //获取期权合约钱包
			async getAssets(){
			var that = this;
			if(this.isLogin) {
				//获取当前人的钱包
				var dataArr = new URLSearchParams();
				dataArr.set('valuation','USDT');
				dataArr.set('hide','Y');
				dataArr.set('type','OPTION');
				var res = await walletApi(dataArr);
				if(res.success){
				this.tableMoney = res.data.list;
					for (let i = 0; i < this.tableMoney.length; i++) {
						if(this.tableMoney[i].type == "USDT") {
						this.assetUsdt = Number(this.tableMoney[i].usedPrice).toFixed(8);
						}
					}
				}
			}
			},
			selectCoin(id){
				console.log(id)
				for(var i=0;i<this.coinList.length;i++){
					if(this.coinList[i].id==id){
						this.selectCoinModel = this.coinList[i];
						this.getHavingBuy(this.coinList[i])
					}
				}
				//selectCoinModel = item;
			},
			async getHavingBuy(item){
				var dataArr = new URLSearchParams();
				dataArr.set('id',item.id);
				var res = await knowTeManagementList(dataArr);
				if(res.success){
					this.boughtNum = res.data
					if(this.boughtNum == 0){
						this.percentage = '0'
					}else{
						this.percentage =Number( this.boughtNum /item.issuanceCount  * 100 ).toFixed(2)
					}
					this.remainAmount = item.issuanceCount -this.boughtNum
				}
			},
			numChange(num){
				console.log(num)
				if(num<this.selectCoinModel.minPrice){
					this.$message.error(this.$t('bico.W313')+this.selectCoinModel.minPrice);
				}
				if(num>this.selectCoinModel.issuanceCount){
					this.$message.error(this.$t('bico.W314')+this.selectCoinModel.issuanceCount);
				}
				if(num>this.remainAmount){
					this.$message.error(this.$t('bico.W315')+this.remainAmount);
				}
				//const r = /^\+?[0-9][0-9]*$/; // 正整数（可以以0打头）
				//const r = /^\+?[1-9][0-9]*$/;//正整数
				// if (!r.test(num) ) {
				// 	this.$message.error("请输入正整数！");
				// };

			},
			async getTeManagementList(){
				var res = await teManagementListAllApi();
				if(res.success){
					this.coinList = res.data
					if(this.coinList!=null ){
						if(this.coinList.length>0){
							for(var j=0; j<this.coinList.length; j++){
							var a  = this.coinList[j]
							if(a.currency=='BTC'){
								this.value = a.id
								this.selectCoin(this.value)
								}
							}
						}

					};
					this.value = this.coffer2Data.id;
					this.selectCoin(this.value)
				}
			},
			handleClose(){
				this.checked = false;
				this.visible = false;
			},
			echartsInit(){
				let myChar = echarts.init(document.getElementById('d_c2_echart'));
				let option = {
					grid:{
						left:-20,
						top:0,
						right:-20,
						bottom:0
					},
				    xAxis: {
				    	splitLine:{
				    		show:false
				    	},
				    	axisTick: {
				            show: false
				        },
				        axisLine: {
				            show: false
				        },
				        type: 'category',
				        data: [],
				        axisLabel : {
				            formatter: function(){
				                  return "";
				            }
				        }
				    },
				    yAxis: {
				    	splitLine:{
				    		show:false
				    	},
				    	axisTick: {
				            show: false
				        },
				        axisLine: {
				            show: false
				        },
				        type: 'value',
				        axisLabel : {
				            formatter: function(){
				                  return "";
				            }
				        }
				    },
				    series: [{
				        data: [150, 230, 224, 218],
				        type: 'line',
				        color:'#7368aa',
				        areaStyle: {
			                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                    offset: 0,
			                    color: 'rgba(58,77,233,0.8)'
			                }, {
			                    offset: 1,
			                    color: '#fff'
			                }])
			            }
				    }]
				};
				this.$nextTick(()=>{
					myChar.setOption(option)
				})
			},
		}
	}
</script>
<style scoped>
	.d_c2_container{
		color: #999;
	  	font-size: 14px;
	  	width: 100%;
	}
	.d_flex{
		display: flex;
	}
	.d_c2_select_symbol{
		margin-bottom: 20px;
	}
	.d_c2_select_symbol>>>.el-input--suffix .el-input__inner{
		background-color: transparent;
		color: #fff;
	}
	.d_c2_div1{
		background-color: #fff;
		align-items: center;
		border-radius: 4px;
		overflow: hidden;
	}
	.d_c2_div1_title_box{
		padding: 23px 24px;
	}
	.d_c2_div1_title_logo{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 6px;
	}
	.d_c2_div1_title_text{
		padding: 4px 0;
	    color: #3e3563;
	    font-size: 16px;
	    font-weight: 600;
	}
	.d_c2_div1_title_desc{
		color: #777777;
    	font-size: 12px;
	}
	.d_c2_div1_tips{
	    padding: 32px 24px;
	}
	.d_c2_div1_tips_content{
		background: #fffbe6;
	    border: 1px solid #ffe58f;
	    border-radius: 4px;
	    padding: 10px;
	    font-size: 12px;
	    color: #433f54;
	}
	.d_c2_div1_tips_content>i{
		color: #ffe58f;
	}
	.d_c2_div1_main{
		padding: 32px 24px;
	}
	.d_c2_div1_main_left{
		flex:1;
	}


	.d_c2_div1_main_right{
		width: 350px;
		padding-left: 55px;
		border-left: solid 1px #ebebeb;
	}
	.d_c2_div1_main_title{
		font-size: 13px;
		padding-bottom: 10px;
	}
	.d_c2_div1_main_title>i{
		cursor: pointer;
	}
	.d_c2_div1_main_desc{
		align-items: baseline;
	}
	.d_c2_div1_main_desc_num{
	    color: #7368aa;
		font-size: 28px;
	}
	.d_c2_div1_main_desc_unit{
		padding: 0 4px;
	    color: #c3c0cf;
    	font-size: 18px;
	}
	.d_c2_div1_main_desc_symbol{
	    color: #c3c0cf;
    	font-size: 18px;
	}
	.d_c2_div1_right_year{
		color: #999;
    	font-size: 13px;
		padding: 20px 0 10px;
	}
	.d_c2_echarts_box{
		height: 100px;
	}
	#d_c2_echart{
		width: 100%;
		height: 100px;
	}




	.d_c2_div1_main_left_item_title{
		margin-bottom: 10px;
    	color: #999;
    	font-size: 14px;
	}
	.d_c2_div1_main_left_item_input_box{
		margin: 0 49px 32px 0;
		position: relative;
	}
	.d_c2_input_append{
		align-items: center;
		position: absolute;
		right: 0;
		top: 10px;
		white-space: nowrap;
	}
	.d_c2_input_appendText{
		padding: 0 16px;
		color: #6755b9;
	    cursor: pointer;
	    font-size: 14px;
	}
	.d_c2_input_appendLine{
		width: 1px;
		height: 20px;
		background-color: #DCDFE6;
	}
	.d_c2_input_appendSymbol{
		padding: 0 16px;
		color: #999;
	    font-size: 14px;
	}
	.d_c2_div1_proce_desc{
		padding-top: 10px;
		justify-content: space-between;
	}
	.d_c2_color1{
		color: #6358a0;
		font-size: 13px;
		font-weight: bold;
	}
	.d_c2_color2{
		color: #c3c0cf;
		font-size: 13px;
		font-weight: bold;
	}
	.d_c2_div1_bot{
		padding: 12px 24px;
		align-items: center;
		justify-content: space-between;
	}
	.d_c2_div1_bot_left{
		align-items: baseline;
	}
	.d_c2_div1_bot_left>span:nth-child(1){
		font-size: 13px;
	}
	.d_c2_div1_bot_left>span:nth-child(2){
		padding: 0 4px 0 8px;
		color: #7368aa;
		font-size: 28px;
	}
	.d_c2_div1_bot_left>span:nth-child(3){
		color: #c3c0cf;
    	font-size: 18px;
	}
	.d_c2_check{
		padding: 0 20px 10px 0;
		text-align: right;
		font-size: 14px;
	}
	.d_c2_check>>>.el-checkbox__inner{
		width: 16px;
		height: 16px;
	}
	.d_c2_check>>>.el-checkbox__label{
		color: #606266
	}
	.d_c2_check>>>.el-checkbox__inner::after{
		left: 5px;
	}
	.d_c2_check>>>.el-checkbox__input.is-checked .el-checkbox__inner{
	    background-color: #766bac;
    	border-color: #6039de;
	}
	.d_cyBtB{
		align-items: center;
	}
	.d_tc{
		margin-right: 18px;
	    color: #de3509;
	    font-size: 13px;
	}
	.d_cyBtn{
		cursor: pointer;
		outline: none;
	    width: 230px;
	    height: 44px;
	    background: linear-gradient(90deg,#766bac,#5f549e);
	    border: 1px solid transparent;
	    border-radius: 4px;
	    color: #fff;
	    font-size: 14px;
	}
	.d_dialog_title{
		text-align: center;
		color: #212f4f;
    	font-size: 20px;
	}
	.d_dialog_content{
		font-size: 16px;
	}
	.d_dialog_footer_btn{
		display: inline-block;
		width: 100%;
	    height: 44px;
	    outline: none;
	    border:none;
	    color: #fff;
	    background: linear-gradient(90deg,#766bac,#5f549e);
	    border-radius: 4px;
	    cursor: pointer;
	}
	.d_c2_div2{
		padding: 28px 24px;
		margin-top: 20px;
		background-color: #fff;
		border-radius: 4px;
	}
	.d_c2_div2_title{
		color: #7f7999;
		font-size: 18px;
		font-weight: bold;
	}
	.d_c2_div2_step1{
		margin: 30px 0 10px;
		padding: 0 6px;
		justify-content: space-between;
	}
	.d_c2_div2_step1>div{
		padding: 4px 8px;
    	border: 1px solid #c0b5f6;
    	background: #eeebfb;
	    border-radius: 4px;
	    color: #7368aa;
	    font-size: 12px;
	}
	.d_c2_div2_step2{
		padding:14px 30px;
	}
	.d_c2_div2_step2s{
		height: 4px;
		background-color: #ddd;
		justify-content: space-between;
	}
	.d_c2_div2_step2sItem{
		margin-top: -3px;
	    width: 8px;
	    height: 8px;
	    border: 2px solid rgba(0,0,0,.09);
	    background: #fff;
	    border-radius: 4px;
	    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
	}
	.d_c2_div2_step2sItemActive{
		margin-top: -5px;
		width: 12px;
	    height: 12px;
	    border: 4px solid #fff;
	    background: #c0b5f6;
	    border-radius: 6px;
	    box-shadow: 0 0 2px 2px rgba(0,0,0,.2);
	}
	.d_c2_div2_step3{
		margin: 10px 0 10px;
		justify-content: space-between;
	}
	.d_c2_div2_step3>div{
		width: 70px;
		white-space: nowrap;
		text-align: center;
	}
	.d_c2_div2_desc{
		padding: 30px 0 60px 24px;
		font-size: 12px;
	}
	.d_c2_div2_desc>p{
		margin-bottom: 16px;
	}
	.d_c2_more{
		text-align: center;
		padding-bottom: 20px;
	}
	.d_c2_more>button{
		outline: none;
		cursor: pointer;
		width: 230px;
		height: 44px;
		background: linear-gradient(90deg,#766bac,#5f549e 97%);
		border: solid 1px #6039de;
    	box-shadow: inset 0 1px 0 hsla(0,0%,100%,.15), 0 1px 1px rgba(0,0,0,.075);
    	border-radius: 4px;
    	color: #fff;
    	font-size: 14px;
	}
</style>
