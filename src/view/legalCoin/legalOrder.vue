<template>
	<div class="order_div">
		<el-tabs class="transtionBar cruntpage" v-model="activeIndex" @tab-click="handleIndex">
            <el-tab-pane :label="$t('legal.buyOrder')" name="BUY"></el-tab-pane>
            <el-tab-pane :label="$t('legal.sellOrder')" name="SELL"></el-tab-pane>
        </el-tabs>
		<!-- 资产流水 -->
		<div class="assets_top">
			<el-form ref="form" :model="form">
				<span>{{$t('legal.orderStatus')}}</span>
	           	<el-form-item prop="region" v-if="activeIndex == 'BUY'">
				    <el-select v-model="form.region" :placeholder="$t('form.select')">
				    	<el-option v-for="item in orderBuyState" :key="item.id" :label="item.txt" :value="item.value"></el-option>
				    </el-select>

				</el-form-item>
				<el-form-item prop="region" v-else>
				    <el-select v-model="form.region" :placeholder="$t('form.select')">
						<el-option v-for="item in orderSellState" :key="item.id" :label="item.txt" :value="item.value"></el-option>
				    </el-select>
				</el-form-item>
				<el-button class="themeBtn"  @click="selectValue">{{$t('assetsRecord.btn')}}</el-button>
			</el-form>
		</div>

		<el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">
            <el-table-column prop="orderNo" width="200" :label="$t('nav.orderNum')"></el-table-column>
            <el-table-column prop="number" :label="$t('transaction.num')+''">
              <template slot-scope="scope">

                <span >{{ scope.row.number+ ' ' +scope.row.coin }}</span>
              </template>
            </el-table-column>
			<el-table-column prop="cny" :label="$t('contract.transactionNum')+'（USD）'"></el-table-column>
			<el-table-column prop="txt" :label="$t('legal.payMethods')"></el-table-column>
			<el-table-column prop="createTime" :label="$t('legal.payTime')"></el-table-column>

            <el-table-column prop="statusTxt" :label="$t('table.status')">
				<template slot-scope="scope">
					<span class="greenColor" v-if="scope.row.status == 'FINISH' || scope.row.status == 'WAIT_COIN' ">{{scope.row.statusTxt}}</span>
					<span class="blueColor" v-if="scope.row.status == 'APPEAL'">{{scope.row.statusTxt}}</span>
					<span class="redColor" v-if="scope.row.status == 'WAIT'  || scope.row.status == 'CANCEL'">{{scope.row.statusTxt}}</span>
				</template>

			</el-table-column>

			<el-table-column prop="orderNo" :label="$t('contract.operation')">
				<template slot-scope="scope">
					<div class="operation">
						<el-button class="themeBtn" size="small" v-if="scope.row.status == 'APPEAL'" @click="detailFun(scope.row.orderNo,scope.row.status)">{{$t('legal.appealDetail')}}</el-button>
						<el-button class="themeBtn" size="small" v-if="scope.row.status == 'FINISH' || scope.row.status == 'CANCEL'" @click="detailFun(scope.row.orderNo,scope.row.status)">{{$t('legal.detail')}}</el-button>

						<div class="opeareFun" v-if="scope.row.status == 'WAIT'">
							<div class="opeareBox" v-if="activeIndex == 'BUY'">
								<el-button class="themeBtn" size="small"  @click="detailFun(scope.row.orderNo,scope.row.status)">{{$t('legal.pay')}}</el-button>
								<el-button class="themeBtn" size="small"  @click="cancelFun(scope.row.orderNo)">{{$t('button.cancel')}}</el-button>
							</div>
							<el-button v-else class="themeBtn" size="small" @click="detailFun(scope.row.orderNo,scope.row.status)">{{$t('legal.detail')}}</el-button>
						</div>
						<div class="opeareBox" v-if="scope.row.status == 'WAIT_COIN'">
							<!-- detailFun(scope.row.orderNo,scope.row.status) -->
							<!-- <el-button class="themeBtn" v-if="activeIndex == 'SELL'" size="small"  @click="apealFun(scope.row.orderNo)">申诉</el-button>
							<el-button class="themeBtn" v-if="activeIndex == 'BUY'" size="small"  @click="detailFun(scope.row.orderNo,scope.row.status)">详情</el-button>
							<el-button class="themeBtn" size="small" v-else @click="legoFun(scope.row.orderNo)">放币</el-button> -->
							<el-button class="themeBtn" size="small"  @click="detailFun(scope.row.orderNo,scope.row.status)">{{$t('legal.detail')}}</el-button>
							<el-button class="themeBtn" size="small" v-if="activeIndex == 'SELL'"  @click="legoFun(scope.row.orderNo)">{{$t('legal.putCoin')}}</el-button>
						</div>
					</div>
				</template>
			</el-table-column>
        </el-table>
        <page-total v-if="page.total > 10" :page="page" @pageChange="pageChange"></page-total>



		<el-dialog
            :visible.sync="show"
            :close-on-click-modal="false"
            :before-close="closeDialog"
            width="30%"
            :title="$t('legalOrder.detail')">
            <div class="list_details">
                <ul>
                    <li>
                        <div>
							<h3 v-if="status == 'APPEAL'"><span>{{$t('legalOrder.appeal')}}</span> <span>{{$t('legalOrder.waitCustomer')}}</span></h3>
                            <h3 v-else><span>{{activeIndex == 'BUY' ? $t('legal.title') : $t('legal.sale')}} {{detail.coin}}</span>  <span>{{statusContent}}</span></h3>
                        </div>
                        <h2 :class="status == 'FINISH' ? 'status' : 'blueColor'">{{statusTxt}}</h2>
                    </li>
                    <li>
                        <span>{{$t('legalOrder.buySigle')}}</span>
                        <span>${{getUnitPrice}}</span>
                    </li>
                    <li>
                        <span>{{$t('transaction.num')}}</span>
                        <span>{{getNumber}} {{detail.coin}}</span>
                    </li>
					<li>
                        <span>{{$t('legalOrder.orderMoney')}}</span>
                        <h2 class="money">${{getCny}}</h2>
                    </li>
                    <li class="line"></li>

					<li>
                        <span>{{activeIndex == 'BUY' ? $t('legalOrder.seller') : $t('legalOrder.buyer')}}</span>
                        <span>{{(activeIndex == 'BUY') ? (detail.sellName) : (detail.buyName)}}</span>
                    </li>
					<div v-if="status != 'CANCEL'">
						<li>
							<span>{{$t('legal.payMethods')}}</span>
							<span>{{getPayTxt}}</span>
						</li>
						<li>
							<span>{{$t('legalOrder.collector')}}</span>
							<span>{{(activeIndex == 'BUY') ? (detail.buyName) : (detail.sellName)}}</span>
						</li>
						<li>
							<span>{{$t('legalOrder.collectAccout')}}</span>
							<div>
								<span>{{detail.payAccount}}</span>
								<i class="el-icon-document-copy" @click="handleCopy(detail.payAccount,$event)"></i>
							</div>
						</li>
						<li v-if="detail.payImg != ''">
							<span>{{$t('legalOrder.coolectQrcode')}}</span>
							<img class="qrcodeBox"   @click="imgDialogVisible = true" src="@/assets/qrcode.png" />
						</li>
					</div>
                    <li>
                        <span>{{$t('nav.orderNum')}}</span>
                        <div>
                            <span>{{detail.orderNo}}</span>
                            <i class="el-icon-document-copy"  @click="handleCopy(detail.orderNo,$event)"></i>
                        </div>
                    </li>
					          <li>
                        <span>{{$t('legalOrder.reference')}}</span>
                        <div>
                            <span>{{detail.markNo}}</span>
                            <i class="el-icon-document-copy" @click="handleCopy(detail.markNo,$event)"></i>
                        </div>
                    </li>
                    <li>
                        <span>{{$t('legal.payTime')}}</span>
                        <span>{{detail.createTime}}</span>
                    </li>
					          <li v-if="detail.status == 'WAIT_COIN'">
                        <span>{{$t('legalOrder.payTime')}}</span>
                        <span>{{detail.payTime}}</span>
                    </li>
					          <li v-if="detail.status == 'CANCEL'">
                        <span>{{$t('legalOrder.cancelTime')}}</span>
                        <span>{{detail.cancelTime}}</span>
                    </li>

                    <!--<li  v-if="status == 'WAIT_COIN'">-->
                      <!--<span>{{activeIndex == 'BUY' ? $t('legalOrder.seller') : $t('legalOrder.buyer')}}联系方式</span>-->

                      <!--<div>-->
                        <!--<span>{{activeIndex == 'BUY'?detail.sellAccount:detail.buyAccount}}</span>-->
                        <!--<i class="el-icon-document-copy" @click="handleCopy(activeIndex == 'BUY'?detail.sellAccount:detail.buyAccount,$event)"></i>-->
                      <!--</div>-->

                    <!--</li>-->




					<div v-if="status == 'APPEAL'">
						<li v-if="detail.content != ''">
							<span>{{activeIndex == 'BUY' ? $t('legalOrder.mine') : $t('legalOrder.buyer')}} {{$t('legalOrder.apealContent')}}</span>
						</li>
						<div class="apeal_content" v-if="detail.content != ''">
							<h4>{{$t('legalOrder.apealReason')}}：{{detail.content}}</h4>
							<div class="apeal_img" v-if="detail.img != ''">
								<img :src="imgBaseUrl+detail.img" />
							</div>
						</div>
						<p class="rightBox" v-if="detail.content != ''"><span>{{$t('legalOrder.time')}}：{{detail.atime}}</span></p>
						<li  v-if="detail.content1 != ''">
							<span>{{activeIndex == 'BUY' ? $t('legalOrder.seller') : $t('legalOrder.mine')}} {{$t('legalOrder.apealContent')}}</span>
						</li>
						<div  v-if="detail.content1 != ''" class="apeal_content">
							<h4>{{$t('legalOrder.apealReason')}}：{{detail.content1}}</h4>
							<div class="apeal_img" v-if="detail.img1 != ''">
								<img :src="imgBaseUrl+detail.img1" />
							</div>
						</div>
						<p class="rightBox" v-if="detail.content1 != ''"><span>{{$t('legalOrder.time')}}：{{detail.atime1}}</span></p>
					</div>
                </ul>
				<div class="waitPay" v-if="status == 'WAIT' && activeIndex == 'BUY'">
					<div class="lastBtn">
						<el-button class="transBtn" @click="cancelFun(detail.orderNo)">{{$t('legalOrder.cancelOrder')}}</el-button>
						<el-button class="themeBtn" @click="finishFun(detail.orderNo)">{{$t('legalOrder.finishPay')}}</el-button>
					</div>
					<div class="waitTime">
						<span>{{count}}</span>
						<div>{{$t('legalOrder.countTip')}}</div>
					</div>
				</div>
				<div class="waitPay" v-if="status == 'WAIT_COIN'">
					<div class="lastBtn">
						<el-button class="themeBtn appeal" :disabled="showBtn ? true : false"  @click="apealFun(detail.orderNo,activeIndex)">{{$t('legalOrder.apealBtn')}}</el-button>
            <el-button v-if="activeIndex != 'BUY'" class="themeBtn appeal" @click="legoFun(detail.orderNo)">{{$t('legal.putCoin')}}</el-button>
            <!--<el-button v-if="activeIndex == 'BUY'&& showBtn" class="themeBtn appeal" @click="apealFun(detail.orderNo,activeIndex)">-->
            <!--</el-button>-->
            <el-button v-if="activeIndex == 'BUY'&& showBtn" class="themeBtn appeal">
                <el-upload
                    class=""
                    v-model="uploadImg"
                    :action="baseUrl+'/upload/img'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="failAvater"
                    :on-remove="handleRemove"
                    :before-upload="beforeAvatarUpload">
                上传凭证
              </el-upload>
              </el-button>



					</div>

					<div class="waitTime" v-if="count != 0" >
						<span>{{count}}</span>
						<div v-if="activeIndex == 'BUY'">{{$t('legalOrder.putCoinTip')}}</div>
						<div v-else>{{$t('legalOrder.sellTip')}}</div>
					</div>
				</div>

				<div class="waitPay" v-if="status == 'APPEAL'">
					<el-button v-if="detail.appealStatus == 'CHECK'" class="themeBtn appeal" @click="apealFun(detail.orderNo,activeIndex)">{{$t('legalOrder.sendApeal')}}</el-button>
				</div>


            </div>

		</el-dialog>

		<el-dialog
			:visible.sync="imgDialogVisible"
			width="40%"
			class="checkQcord"
			center>
			<img :src="imgBaseUrl+detail.payImg" />
		</el-dialog>
	</div>
</template>

<script>
import pageTotal from '@/components/pageTotal'
import { uploadBuyProofApi,otcBillListApi,tradeBuyWaitPageApi,tradeCancelApi,tradePaidApi,otcFinishApi,cancelThreeApi } from '@/api/legalData'
import getPay from '@/config/getPay'
import clip from '@/config/clipboard'
import { baseUrl,imgBaseUrl } from '@/config/env'
import countTime from '@/config/countTime'
import { validation } from '@/config/validation'
import codeStatus from '@/config/codeStatus'
import specialStatus from '@/config/specialStatus'
export default {
	inject:['reload'],
    data(){
        return{
			activeIndex:'BUY',
			imgDialogVisible:false,
        	form:{
        		region:''
			},
			orderBuyState:[],
			orderSellState:[],
        	tableData:[],
            page:{
                currentPage:1,
                limit:10,
                total:0,
			},
			show:false,
			orderNo:'',
      uploadImg:'',
			detail:{},
			status:'',//订单状态
			statusTxt:'',
          baseUrl,
			imgBaseUrl,
			count:'0:00',
			timeY:null,//待付款倒计时
			statusContent:'',
			validation,
			showBtn:false
        }
	},
	created(){
		var that = this;
		// {value:'FINISH',txt:'已完成'},{value:'WAIT',txt:'待付款'},{value:'WAIT_COIN',txt:'已付款'},{value:'CANCEL',txt:'已取消'},{value:'APPEAL',txt:'申诉中'}
		var buyArr = [
			{value:'FINISH',txt:that.$t('orderStatus.finish')},{value:'WAIT',txt:that.$t('orderStatus.waitPay')},
			{value:'WAIT_COIN',txt:that.$t('orderStatus.finishPay')},{value:'CANCEL',txt:that.$t('orderStatus.cancel')},
			{value:'APPEAL',txt:that.$t('orderStatus.apeal')}
		];
		that.orderBuyState = buyArr;

		// {value:'FINISH',txt:'已完成'},{value:'WAIT',txt:'待收款'},{value:'WAIT_COIN',txt:'待放币'},{value:'CANCEL',txt:'已取消'},{value:'APPEAL',txt:'申诉中'}
		var sellArr = [
			{value:'FINISH',txt:that.$t('orderStatus.finish')},
			{value:'WAIT',txt:that.$t('orderStatus.waitCollected')},
			{value:'WAIT_COIN',txt:that.$t('orderStatus.waitCoin')},
			{value:'CANCEL',txt:that.$t('orderStatus.cancel')},
			{value:'APPEAL',txt:that.$t('orderStatus.apeal')}
		];
		that.orderSellState = sellArr;
		this.recordFun();
	},
	computed:{
		getUnitPrice(){
			var value = this.detail.unitPrice;
			if(value){
				return value.toFixed(2);
			}
		},
		getCny(){
			var value = this.detail.cny;
			if(value){
				return value.toFixed(2);
			}
		},
		getNumber(){
			var value = this.detail.number;
			if(value){
				return value.toFixed(2);
			}
		},
		getPayTxt(){

			var value = this.detail.payMethod;
			if(value){
				var getValue = (getPay(value)).txt;
        if(value == "BANK"){
          getValue = getValue+" "+this.detail.bank
        }
				return getValue;
			}
		}
	},
	methods:{
    handleAvatarSuccess(res, file) {
      var that = this;
      if(res.success){
        var dataArr = new URLSearchParams();
        dataArr.set('billNo',this.detail.orderNo);
        dataArr.set('img',res.data.src);

        uploadBuyProofApi(dataArr).then(res2=>{
          if (res2.success) {
            that.$message({
              type:'success',
              message:res2.msg
            })
            that.show=false
            that.uploadImg = '';
          }
        })


      }else{
        that.$message.error(res.msg)
      }
      console.log(res)

    },
    failAvater(err,file){
      // console.log(err)
      this.$message.error(this.$t('tip.uploadFail'));
    },
    beforeAvatarUpload(file) {
      var that=this
      if(this.uploadImg!=''){
        this.$message.error("已经上传过");
        return false
      }
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG)  {
        this.$message.error(that.$t('tip.uploadTip'));
        return false
      }
      if (!isLt2M) {
        this.$message.error(that.$t('tip.uploadSize'));
        return false
      }
      return (isJPG || isPNG) && isLt2M;
    },
    handleRemove(file, fileList) {
      ;
    },
		handleIndex(){
			this.page.currentPage = 1;
			this.form.region = '';
			this.recordFun();
		},
		async recordFun(){//流水记录
			var that = this;
			var dataArr = new URLSearchParams();
			dataArr.set('pageType',that.activeIndex);
			dataArr.set('status',that.form.region);
			dataArr.set('current',that.page.currentPage);
			dataArr.set('size',that.page.limit);
			var res = await otcBillListApi(dataArr);
			that.tableData = [];
			if(res.success){
				var data = res.data;
				that.page.total = Number(data.total);
				var obj = data.records;
				if(obj.length>0){
					obj.forEach(element => {
						element.txt = (getPay(element.payMethod)).txt;
						element.number = (element.number).toFixed(2);
						element.cny = (element.cny).toFixed(2);
						element.statusTxt = that.getStatus(element.status);
						that.tableData.push(element);
					});
				}
			}
		},
		handleCopy(text,$event){//复制代码
    		clip(text,event);
        },
		selectValue(){//选择流水记录类型
			var that = this;
			that.page.currentPage = 1;
			that.recordFun();
		},
		pageChange(item){//切换页码
			this.page.currentPage = item;
			this.recordFun();
		},
		closeDialog(){
			this.show = false;
			clearInterval(this.timeY);
		},
		apealFun(id,type){//申诉
			this.$router.push({path:'/apeal',query:{'id':id,status:type}});
		},
		getStatus(status){
			var that = this;
			var txt = '';
			switch (status) {
				case 'WAIT':
					if(that.activeIndex == 'BUY'){
						txt = that.$t('orderStatus.waitPay')
					}else{
						txt = that.$t('orderStatus.waitCollected')
					}
					break;
				case 'FINISH':
					txt = that.$t('orderStatus.finish')
					break;
				case 'WAIT_COIN':
					if(that.activeIndex == 'BUY'){
						txt = that.$t('orderStatus.finishPay')
					}else{
						txt = that.$t('orderStatus.waitCoin')
					}
					break;
				case 'CANCEL':
					txt = that.$t('orderStatus.cancel')
					break;
				case 'APPEAL':
					txt = that.$t('orderStatus.apeal')
					break;
				default:
					break;
			}

			return txt;
		},
		async detailFun(id,status){//订单详情
			var that = this;
			that.show = true;
			that.orderNo = id;
			that.status = status;
			that.statusTxt = that.getStatus(status);
			switch (that.status) {
				case 'WAIT':
					if(that.activeIndex == 'BUY'){
						that.statusContent = that.$t('orderStatus.orderPay')
					}else{
						// 买家已下单等待买家付款
						that.statusContent = that.$t('legalOrder.waitBuyPay')
					}
					break;
				case 'FINISH':
					that.statusContent = that.$t('orderStatus.orderFinish')
					break;
				case 'WAIT_COIN':
					if(that.activeIndex == 'BUY'){
						that.statusContent = that.$t('legalOrder.waitSellCoin')
					}else{
						that.statusContent = that.$t('legalOrder.sureAfterCoin')
					}
					break;
				case 'CANCEL':
					that.statusContent = that.$t('orderStatus.orderCancel')
					break;
				case 'APPEAL':
					that.statusContent = that.$t('orderStatus.waitApeal')
					break;
				default:
					break;
			}
			var data = new URLSearchParams();
			data.set('orderNo',id);
			var res = await tradeBuyWaitPageApi(data);
			if(res.success){
				var arr = res.data;
				that.detail = arr;
        arr.now=Number(arr.now)
				if(arr.status == 'WAIT' && that.activeIndex == 'BUY'){
				  arr.createTimestamp = Number(arr.createTimestamp)
					that.timeY = setInterval(()=>{
						var getCount = that.getCountTime(arr.createTimestamp,arr.now);
            arr.now= arr.now+1000
						if(Number(getCount) == -1){
							clearInterval(that.timeY);
							that.detailFun(that.orderNo,'CANCEL');
							that.page.currentPage = 1;
							that.recordFun();
						}else{
							that.count = getCount;
						}
					},1000)
				}else if(arr.status == 'WAIT_COIN'){
				  arr.payTimestamp=Number(arr.payTimestamp)
					that.timeY = setInterval(()=>{
						var getCount = that.getCountTime(arr.payTimestamp,arr.now);
            arr.now= arr.now+1000
						if(Number(getCount) == -1){
							that.showBtn = false;
							that.count = 0;
							clearInterval(that.timeY);
						}else{
							that.count = getCount;
							that.showBtn = true;
						}
					},1000)
				}
			}
		},
    getCountTime(countTime,arrNow){
      var date = new Date();

      var now = date.getTime();

      var countDown = 60;
      var differTime =(Number(countTime) + Number((countDown * 60 * 1000)) - arrNow);

      //定义变量,h,m,s保存倒计时的时间
      var h, m, s;
      if (differTime > 0) {
        h = Math.floor(differTime / 1000 / 60 / 60);
        m = Math.floor(differTime / 1000 / 60 % 60);
        s = Math.floor(differTime / 1000 % 60);
        var M = m < 10 ? ("0" + m) : m;
        var S = s < 10 ? ("0" + s) : s;
        return M+":"+S
      } else {
        return -1
      }
    },
		async cancelFun(id){//取消订单
			var that = this;
			var data = new URLSearchParams();
			data.set('orderNo',id);
			var res = await cancelThreeApi(data)
			if(res.code == 21001 || res.code == 21002){
				if(res.code == 21001){//获取时间
					specialStatus(res.code,res.msg,function(obj){
						console.log(obj)
                        that.cancelAlert(id,obj)
                    })
				}

				if(res.code == 21002){
					codeStatus(res.code,function(res){
						that.cancelAlert(id,res)
					})
				}
			}else{
				that.cancelAlert(id)
			}
		},
		cancelAlert(id,obj){
			var that = this;
			var txt = '';
			if(obj){
				txt = obj
			}else{
				txt = that.$t('legalOrder.cancelTip')
			}

			that.$confirm(txt, that.$t('layer.tips'), {
                confirmButtonText:that.$t('legalOrder.yes'),
                cancelButtonText: that.$t('legalOrder.no'),
                customClass:'sureBoxConfirm',
            }).then(async() => {
                var data = new URLSearchParams();
				data.set('orderNo',id);
				var res = await tradeCancelApi(data);
				if(res.success){
					that.$message({
						type:'success',
						message:that.$t('legalOrder.cancelSuccess')
					})

					setTimeout(() => {
						that.reload();
					}, 800);
				}else{
					codeStatus(res.code,function(msg){
                        that.$message.error(msg)
                    })
				}
            }).catch(() => {
            });
		},
		async finishFun(id){//已完成付款
			var that = this;
			var data = new URLSearchParams();
			data.set('orderNo',id);
			var res = await tradePaidApi(data);
			if(res.success){
				that.$message({
					type:'success',
					message:that.$t('tip.submitTxt')
				})
				setTimeout(() => {
					that.reload();
				}, 800);
			}else{
				codeStatus(res.code,function(msg){
					that.$message.error(msg)
				})
			}
		},
		legoFun(id){//放币
			var that = this;
			that.$prompt(that.$t('legalOrder.pwdTip'), that.$t('legalOrder.putCoinSure'), {
                confirmButtonText:that.$t('legalOrder.yes'),
                cancelButtonText: that.$t('legalOrder.no'),
				inputPattern: that.validation.assetsPwd,
				inputErrorMessage: that.$t('form.assetsCruent'),
				inputType:'password',
				customClass:'sureBoxConfirm',
				closeOnClickModal:false
            }).then(async({ value }) => {
                var data = new URLSearchParams();
				data.set('orderNo',id);
				data.set('payPwd',value);
				var res = await otcFinishApi(data);
				if(res.success){
					that.$message({
						type:'success',
						message:that.$t('tip.submitTxt')
					})
					setTimeout(() => {
						that.reload();
					}, 800);
				}else{
					codeStatus(res.code,function(msg){
                        that.$message.error(msg)
                    })
				}
            }).catch(() => {
            });
		}
	},
    components:{
    	pageTotal
    }
}
</script>

<style lang="less">
.order_div{
	min-height: 480px;
	.el-tabs__nav-scroll{
		display: flex;
	}
	.el-tabs__nav{
		overflow: hidden;
		margin: 0 auto;
		border-radius: 30px;
	}
	.greenColor{
		color: #44BCA7;
	}
	.redColor{
		color: #CD3D58;
	}
	.blueColor{
		color: @mainsColor;
	}
	.el-tabs__item.is-top{
		position: relative;
		top: 0;
		width:160px;
		height: 45px !important;
        line-height: 45px !important;
		text-align: center;
		&::before{
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right:0;
			z-index: -1;
			background-color: #F8F8F8;
		}
		&:nth-child(2){
			&::before{
				transform-origin: 100% 0;
				transform:skew(-22deg);
				-webkit-transform: skew(-22deg);
				-moz-transform: skew(-22deg);
				-ms-transform: skew(-22deg);
			}
		}
		&:nth-child(3){
			&::before{
				transform-origin:  0 100%;
				transform:skewX(-22deg);
				-webkit-transform: skewX(-22deg);
				-moz-transform: skewX(-22deg);
				-ms-transform: skewX(-22deg);
			}
		}
	}
	.el-tabs__item.is-active{
		color: #ffffff!important;
		&::before{
			background-color: @mainsColor!important;
		}
	}
	.assets_top{
		padding:20px;
		.el-form{
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			&>div{
				margin:0 60px 0 20px;
			}
		}
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
						margin: 0 20px 10px 0;
					}
					&>h3{
						display: flex;
						flex-direction: column;
					}
				}
			}
            span:nth-child(1){
                color: #8E8E8E;
			}
			.status{
				color: #44BCA7;
				margin: 0 0 20px 0;
			}
			.money{
				color: #CD3D58;
				margin:0
			}
			.blueColor{
				color: @mainsColor;
				margin: 0 0 20px 0;
			}
            h2{
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
        &>.themeBtn{
            display: block;
            margin: 0 auto;
            width: 70%;
		}
		// 申诉理由
		.apeal_content{
			background-color: #f8f8f8;
			padding: 20px;
			margin: 0 20px 20px 20px;

			.apeal_img{
				display: flex;
				flex-direction: row;
				img{
					width: 122px;
					max-height: 122px;
					object-fit: cover;
					border-radius: 4px;
					margin-right: 20px;
				}

			}
		}
		// 待付款
		.waitPay{
			.lastBtn{
				display: flex;
				flex-direction: row;
				justify-content: center;
				width: 100%!important;
				.el-button{
					width: 40%!important;
					span{
						letter-spacing: 2px;
					}
				}
			}
			.waitTime{
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				margin-top: 20px;
				span{
					margin-right: 10px;
					color: #CD3D58;
				}
			}
			.appeal{
				width: 60%;
				margin: 0 auto;
				display: block;
			}
		}
	}
	.el-icon-document-copy{
		font-weight: bold;
		font-size: 20px;
	}
	.qrcodeBox{
		cursor: pointer;
		width: 20px;
	}
	.operation{
		.el-button{
			min-width: 60%;
			display: block;
			margin: 0 auto;
		}
	}
	.opeareBox{
		display: flex;
		flex-direction: column;
		justify-content: center;
		.el-button{
			&:nth-child(1){
				margin-bottom: 10px;
			}
		}
	}
	.rightBox{
		text-align: right;
		padding: 0 20px;
	}
}
.checkQcord{
	.el-dialog__body{
		padding: 30px 20px!important;
	}
	img{
		max-width: 100%;
		object-fit: cover;
		display: block;
		margin: 0 auto;
	}
}
</style>
