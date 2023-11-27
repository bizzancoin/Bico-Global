<template>
  <div class="option">
   <div class="ctc_container">
      <h1></h1>
      <div class="main">
          <div class="option-tab">
            <div :class="{ 'option-tab-item': true, 'option-tab-current': item.symbol == currentCoinSymbol }" class="option-tab-item" v-for="item in coinList" :key="item.symbol" @click="changeCoin(item.symbol)">{{item.symbol}} {{$t('option.title')}}</div>
          </div>
          <div class="ctc-container">
            <div class="trade_wrap">
              <div class="trade_panel">
                <div class="trade_bd_ctc">
                  <div class="panel panel_buy">
                    <div class="bd bd_limited">
                      <div class="result-panel">

                        <div style="width: 100%;font-weight: bold;font-size: 24px;text-align: center;margin-bottom: 10px;">
                          <span :class="{ 'title-switch': true, 'switch-current': historyTab == 1 }" @click="historyClick(1)">{{$t('option.history')}}</span>
                          <span :class="{ 'title-switch': true, 'switch-current': historyTab == 2 }" @click="historyClick(2)">{{$t('option.kline')}}</span>
                        </div>

                        <div v-show="historyTab==2" style="height: 240px;position: relative;overflow: hidden;">
                          <optionEchartsKLine :symbols="symbolsStr" v-if="historyTab==2"></optionEchartsKLine>
                        </div>

                        <div v-show="historyTab==1">
                          <div class="result-item" v-for="item in historyList" :key="item.id">
                            <div class="item-title"><span>{{$t('option.seriers')}}</span><span>{{item.optionNo}}</span><span>{{$t('option.period')}}</span></div>
                            <div class="item-body">
                              <el-tooltip effect="dark" placement="bottom">
                                    <img v-if="item.result==1" style="width:25px;height:25px" src="../assets/zhang1.png"/>
                                    <img v-if="item.result==2" style="width:25px;height:25px" src="../assets/die1.png"/>
                                    <img v-if="item.result==3" style="width:25px;height:25px" src="../assets/ping1.png"/>
                                  <div slot="content">
                                    <div style="line-height: 2.2;">{{$t('option.opentime')}}：{{item.openTime | dateFormat(that)}}</div>
                                    <div style="line-height: 2.2;">{{$t('option.closetime')}}：{{item.closeTime | dateFormat(that)}}</div>
                                    <div style="line-height: 2.2;">{{$t('option.openprice1')}}：{{item.openPrice}} USDT</div>
                                    <div style="line-height: 2.2;">{{$t('option.closeprice')}}：{{item.closePrice}} USDT</div>
                                    <div style="line-height: 2.2;">{{$t('option.buyupreward')}}：{{item.totalBuy}} USDT</div>
                                    <div style="line-height: 2.2;">{{$t('option.buydownreward')}}：{{item.totalSell}} USDT</div>
                                  </div>
	                              </el-tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="last-period" v-if="openingOption.id == 0">
                        <div style="height:40px;line-height:40px;">{{$t('option.noopening')}}</div>
                      </div>
                      <div class="last-period" v-if="openingOption.id != 0">
                        <div style="width: 10%;text-align: center;float:left;height:40px;line-height: 40px;font-size: 20px;font-weight: bold;text-shadow: 2px 2px 2px #000;">
                          {{$t('option.seriers')}} {{openingOption.optionNo}} {{$t('option.period')}}
                          <Tooltip placement="top-start">
                            <Icon type="ios-alarm" style="margin-top: -3px;"/>
                            <div slot="content">
                              {{(openingOption.openTime + currentCoin.openTimeGap * 1000) | dateFormat(that)}} ~ {{(openingOption.openTime + currentCoin.openTimeGap * 1000 + currentCoin.closeTimeGap * 1000) | dateFormat(that)}}
                            </div>
                          </Tooltip>
                        </div>
                        <div class="period-content">
                          <div class="content-item color_green"><span>{{$t('option.buyupreward')}}: <b>{{openingOption.totalBuy}}</b> USDT</span></div>
                          <div class="content-item color_red"><span>{{$t('option.buydownreward')}}: <b>{{openingOption.totalSell}}</b> USDT</span></div>
                          <div class="content-item color_gold" v-if="isLogin">
                            <span>{{$t('option.myamount')}}: <b>{{myOpeningOption.betAmount}}</b> USDT</span> &nbsp;&nbsp;
                            <span class="direction color_green" v-if="myOpeningOption.direction=='BUY'">{{$t('option.buyup')}}</span>
                            <span class="direction color_red" v-if="myOpeningOption.direction=='SELL'">{{$t('option.buydown')}}</span>
                          </div>
                          <div style="float:left;" v-if="!isLogin">{{$t('option.myamount')}}:
                              <router-link to="/login" id="login">{{$t("common.login")}}</router-link>/<router-link to="/register" id="register">{{$t("common.register")}}</router-link>
                          </div>
                        </div>
                        <div style="float:right;height:40px;line-height:40px;padding-right:10px;">
                          <span :class="{ 'bg-green': currentPrice > openPrice, 'bg-red': currentPrice < openPrice }" style="letter-spacing:2px;display: inline-block;height:20px;line-height:20px;border-radius: 3px;padding: 0 5px;color:#FFF;">{{priceChange}}</span>
                        </div>
                        <div style="color:#a5a5a5;width:170px;float: right;height:40px;text-align: center;">
                          <div style="height:16px;line-height: 16px;margin-top: 4px;margin-left:5px;font-size: 6px;text-align: left;">{{$t('option.openprice')}}：{{openPrice | fixed2}} USDT</div>
                          <div style="height:16px;line-height: 16px;font-size: 6px;margin-left:5px;text-align: left;">{{$t('option.currentprice')}}：<span :class="{ 'color_green': currentPrice > openPrice, 'color_red': currentPrice < openPrice }">{{currentPrice | fixed2}} USDT</span>
                          </div>
                        </div>
                        <div  style="width:200px;float: right;height:40px;line-height: 36px;text-align: right;padding-right: 10px;margin-top: 3px;">

                          <div style="margin-top:8px;"><el-progress :text-inside="true" :stroke-width="18" :percentage="d_percentage" status="warning"></el-progress></div>
                        </div>
                        <div style="color:#ff8100;width:80px;float: right;height:40px;line-height: 40px;text-align: right;font-size:12px;">{{$t('option.progress')}}：</div>
                      </div>
                      <div class="current-period">
                        <div class="content">
                          <div class="period-title">{{$t('option.seriers')}} {{startingOption.optionNo}} {{$t('option.period')}}</div>
                          <div class="period-time">
                            <div ref="proRef" style="display:none">{{(new Date(startingOption.createTime).getTime() + currentCoin.openTimeGap * 1000) | dateFormat(that)}}~{{(new Date(startingOption.createTime).getTime() + currentCoin.openTimeGap * 1000 + currentCoin.closeTimeGap * 1000) | dateFormat(that)}}</div>

                            <div style="margin-top:10px;font-size:12px;">{{$t('option.currentoption')}}：{{(new Date(startingOption.createTime).getTime() + currentCoin.openTimeGap * 1000) | dateFormat(that)}} ~ {{(new Date(startingOption.createTime).getTime() + currentCoin.openTimeGap * 1000 + currentCoin.closeTimeGap * 1000) | dateFormat(that)}}</div>
                          </div>

                          <div class="period-reward color_green" style="border-top-left-radius: 8px;border-bottom-left-radius: 8px;">
                            <h2>{{startingOption.totalBuy | fixed2}} USDT</h2>
                            <p>{{$t('option.buyupreward')}}</p>
                          </div>

                          <div class="period-reward color_gold">
                            <h2>{{myStartingOption.betAmount | fixed2}} USDT</h2>
                            <p>{{$t('option.myamount')}}</p>
                          </div>

                          <div class="period-reward color_red">
                            <h2>{{startingOption.totalSell | fixed2}} USDT</h2>
                            <p>{{$t('option.buydownreward')}}</p>
                          </div>

                        </div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <Form style="width: 100%;margin-top: 20px;">
                        <FormItem class="buy-input">
                          <div class="quantity-group">
                            <div v-for="item in currentCoinAmountList" :class="{ 'quantity-item': true, 'current': currentSelectCount == item }" @click="selectCount(item)"> {{item}} USDT</div>
                          </div>
                        </FormItem>
                        <div>{{$t('option.avaliablebalance')}}：{{assetUsdt}} USDT</div>
                      </Form>
                      <div style="width: 100%;margin-top: 20px;">
                        <div style="width: 50%;float:left;text-align: center;">
                          <Button v-if="isLogin" class="bg-green" style="width: 80%;height: 40px;line-height: 3;border-radius: 4px;" size="large" @click="addClick(0)">{{$t('option.buyup')}}</Button>
                          <Button v-if="!isLogin" class="bg-gray" style="width: 80%;height: 40px;line-height: 3;border-radius: 4px;" size="large">{{$t('option.login')}}</Button>
                        </div>
                        <div style="width: 50%;float:right;text-align: center;">
                          <Button v-if="isLogin" class="bg-red" style="width: 80%;height: 40px;line-height: 3;border-radius: 4px;" size="large" @click="addClick(1)">{{$t('option.buydown')}}</Button>
                          <Button v-if="!isLogin" class="bg-gray" style="width: 80%;height: 40px;line-height: 3;border-radius: 4px;" size="large">{{$t('option.login')}}</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div style="margin-top: 10px;background: #1d2031">

                  <div style="height:20px;background: #1d2031"></div>

                          <el-table border :data="orders" style="width:100%;background: #0b1520;" :empty-text="$t('bico.W160')">






                            <el-table-column align="center" prop="optionNo" :label="$t('option.qishu')">

                            </el-table-column>
                            <el-table-column align="center" prop="betAmount" :label="$t('option.kaicangjin')">

                            </el-table-column>
                            <el-table-column align="center" prop="direction" :label="$t('option.col_direction')">
                                <template slot-scope="scope">
                                  <span v-if="scope.row.direction == 0">{{$t('option.buyup')}}</span>
                                  <span v-if="scope.row.direction == 1">{{$t('option.buydown')}}</span>
                                </template>

                            </el-table-column>
                            <el-table-column align="center" prop="result" :label="$t('option.col_result')">
                                <template slot-scope="scope">
                                  <span v-if="scope.row.result == 0">{{$t('option.daikaishi')}}</span>
                                  <span v-if="scope.row.result == 1">{{$t('option.shengli')}}</span>
                                  <span v-if="scope.row.result == 2">{{$t('option.shibai')}}</span>
                                  <span v-if="scope.row.result == 3">{{$t('option.pingju')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="rewardAmount" :label="$t('option.jjshu')">

                            </el-table-column>
                            <el-table-column align="center" prop="fee" :label="$t('option.kcsxf')">

                            </el-table-column>
                            <el-table-column align="center" prop="winFee" :label="$t('option.col_winfee')">

                            </el-table-column>
                            <el-table-column align="center" prop="createTime" :label="$t('option.col_createTime')">

                            </el-table-column>

                          </el-table>
                  </div>
              </div>
            </div>
          </div>
      </div>
      <div style="height: 42px;width: 100%;background: #21253a;"></div>
    </div>



  </div>
</template>

<script>
import Datafeeds from "@/js/charting_library/datafeed/optiontrade.js";
import { ticketApi,walletApi,coinGoldListApi,coinGoldInfoApi,klineApi,
  historyGoldListApi,openingGoldApi,startingGoldApi,orderGoldCurrentApi,goldOrderAdd,orderGoldHistoryApi} from '@/api/getData'

//var moment = require("moment-timezone");
//var Stomp = require("stompjs");
//var SockJS = require("sockjs-client");
import expandRow from "@/components/exchange/expand.vue";
//import '@/style/option.css'
import $ from "jquery";
import optionEchartsKLine from './OptionEchartsKLine.vue'


export default {
  components: { optionEchartsKLine, expandRow ,Datafeeds,$},
  data() {
    const self = this;
    return {
      symbolsStr:'BTC/USDT',
      d_percentage:0,
      tableData:[],
	  that:this,
      modal: false,
      historyTab: 1,
      datafeed: null,
      datafeedK: null,
      stompClient: null,
      stompClientK: null,
      skin: "night", //皮肤样式day&night
      coinList: [],
      currentCoinSymbol: "BTC/USDT",
      currentCoin: {},
      currentCoinAmountList: [],
      currentPrice: 10000.00,
      openPrice: 12456.8,
      currentSelectCount: 0,
      baseCoinUnit: "USDT",
      tableMoney: [],
      assetUsdt: 0,
      currentTotalBuy: 0,
      currentTotalSell: 0,
      historyList: [],
      openingOption: {
        id: 0,
        optionNo: "-",
        totalBuy: 0,
        totalSell: 0
      },
      startingOption: {
        optionNo: "-",
        totalBuy: 0,
        totalSell: 0
      },
      myOpeningOption: {
        betAmount: 0
      },
      myStartingOption: {
        betAmount: 0
      },
      currentPercent: 0,
      orders: [],
      loading: false,
      total: 0,
      pageSize: 10,
      pages:10,
      current:1,
      pageNo: 1,
      //页面下方投注记录的列
      columns: [
        {
          title: self.$t("option.col_optionNo"),
          key: "optionNo",
          minWidth: 65,
          render: (h, params) => {
            return h("span", {}, params.row.symbol + " - " + self.$t('option.seriers') + params.row.optionNo + self.$t('option.period'));
          }
        },
        {
          title: self.$t("option.col_betAmount"),
          key: "betAmount",
          minWidth: 65,
          render: (h, params) => {
            return h("span", {}, params.row.betAmount);
          }
        },
        {
          title: self.$t("option.col_direction"),
          key: "direction",
          minWidth: 65,
          render: (h, params) => {

            let txt = params.row.direction == "BUY" ? self.$t("option.buyup") : self.$t("option.buydown");
            const txtColor = params.row.direction == "BUY" ? "#42b983" : "#FF0000";
            return h("div", {
                    style:{
                      color: txtColor
                    }
                  }, [
                    h("span", {}, txt)
                  ]);
          }
        },
        {
          title: self.$t("option.col_result"),
          key: "result",
          minWidth: 65,
          render: (h, params) => {
            let txt = params.row.result == "WIN" ? self.$t("option.win") : self.$t("option.lose");

            let txtColor = params.row.result == "WIN" ? "#42b983" : "#FF0000";
            if(params.row.result == "WAIT") {
              txt = self.$t("option.wait");
              txtColor = "#FFF";
            }
            return h("div", {
                    style:{
                      color: txtColor
                    }
                  }, [
                    h("span", {}, txt)
                  ]);
          }
        },
        {
          title: self.$t("option.col_rewardAmount"),
          key: "rewardAmount",
          minWidth: 65,
          render: (h, params) => {
            let txt = params.row.rewardAmount;
            if(params.row.result == "WAIT") {
              txt = "-";
            }else{
              if(params.row.rewardAmount > 0) {
                txt = "+" + txt;
              }
            }
            return h("span", {}, txt);
          }
        },
        {
          title: self.$t("option.col_fee"),
          key: "fee",
          minWidth: 65,
          render: (h, params) => {
            let txt = params.row.fee;
            if(params.row.result == "WAIT") {
              txt = "-";
            }
            return h("span", {}, txt);
          }
        },
        {
          title: self.$t("option.col_winfee"),
          key: "winFee",
          minWidth: 65,
          render: (h, params) => {
            let txt = params.row.winFee;
            if(params.row.result == "WAIT") {
              txt = "-";
            }
            return h("span", {}, txt);
          }
        },
        {
          title: self.$t("option.col_createTime"),
          key: "createTime",
          minWidth: 65,
          render: (h, params) => {
            return h("span", {}, self.dateFormatHM(params.row.createTime));
          }
        }
      ],
    };
  },
  created: function() {
    //初始化

     this.init();
    //增加
    // var that = this;
    // that.ticketFun();
    // that.wTimerList = setInterval(function(){
    //   that.ticketFun()
    // },300)
    // that.timeTimer = setInterval(function(){
    //   that.tradeFun(); //行情深度
    // },1000)
  },
  filters:{
    dateFormat: function(tick,that) {
      // return '123'

      return that.dateFormatHM(new Date(Number(tick)));//格式化时间
    },
    fixedScale: function(value, scale) {
      return  Number(value).toFixed(scale);
    },
    fixed2: function(value){
      return  Number(value).toFixed(2);
    }
  },
  mounted () {
    // setTimeout(()=>{
    //   this.$nextTick(()=>{
    //     this.proFun();
    //   })
    // },10000)

  },
  computed: {
    // lang() {
    //   return this.$i18n.locale;
    // },
    // langPram(){
    //   return this.$store.state.lang;
    // },
    isLogin: function() {
      return sessionStorage.getItem('userToken')!=null;
    },
    priceChange: function(){
      var chg = this.currentPrice - this.openPrice;
      var percent = chg/this.openPrice*100;
      if(chg > 0) {
        return "+" + Number(percent).toFixed(3) + "%";
      }
      if(chg < 0) {
        return Number(percent).toFixed(3) + "%";
      }
      return "0.00%";
    }
  },
  methods: {
    proFun(){
      this.$nextTick(()=>{
        let proRef = this.$refs.proRef;

        let arr = proRef.innerHTML.split('~');
        let s = arr[0];
        let e = arr[1];
        let z = (+new Date(e) - +new Date(s))/1000;
        let timer = setInterval(()=>{
          if(this.d_percentage>=100){
            clearInterval(timer)
          }else{
            let n = Number((this.d_percentage + 1/z * 100).toFixed(2));
            this.d_percentage = n>100?100:n;
          }
        },1000)
      })
    },
    init() {
       console.log(sessionStorage.getItem('userToken'))
      //this.$store.commit("navigate", "nav-option");

       if(this.isLogin){
         this.getAssets();
       }
      //this.getAssets();
      //被注释
      //this.startWebsock();
      this.getCoinList();
      this.getCoinInfo();

      this.initPageData();
      //开发阶段不循环获取
      this.setTime();

      this.loadMyOrders(1);
      //被注释
      //this.startKlineWebsock();
    },
    historyClick(tab){
      this.historyTab = tab;
      if(tab==2){
        this.getKlineData();
      }
    },
    initPageData(){
      this.getHistory();
      this.getOpening();
      this.getStarting();
      this.loadMyOrders(1);
    },
    // dateFormat: function(tick) {
    //   return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    // },
    setTime(){
      setTimeout(()=>{
          this.$nextTick(()=>{
            this.proFun();
          })
        },3000)
      // 1s
      // var that = this;
      // setInterval(function(){

      //    if(that.openingOption == undefined || that.openingOption.openTime == undefined || that.openingOption.openTime == 0 || that.openingOption.openTime == null){
      //      return;
      //    }
      //   var currentTime = new Date().getTime();
        //  console.log(currentTime)
        //  console.log(that.openingOption.openTime)
        //  console.log(that.currentCoin.closeTimeGap)
        // that.currentPercent = Number(((currentTime - that.openingOption.openTime) / that.currentCoin.closeTimeGap / 10).toFixed(2));
        // console.log(that.currentPercent)
        // if(that.currentPercent >= 100){


          // that.initPageData();
    //     }
    //   }, 1000);
     },
    //获取币种列表
    async getCoinList() {
      var that = this;
      var dataArr = new URLSearchParams();
      dataArr.set('symbol',that.currentCoinSymbol);
      dataArr.set('type','1');

      var res = await coinGoldListApi(dataArr);
      if(res.data.success){
        this.coinList = res.data.data;
      }else{
        clearInterval(that.wTimerList);
      }
    },
    selectCount(count) {
      this.currentSelectCount = count;
    },
    changeCoin(symbol) {

      this.currentCoinSymbol = symbol;
      this.pageNo = 1;
      this.currentPrice = this.openPrice;
      //this.startWebsock();
      //this.getCoinInfo();

      this.initPageData();

      this.loadMyOrders(1);
      this.symbolsStr = symbol;

      //this.startKlineWebsock();
    },
    //获取期权合约钱包
    async getAssets(){
      var that = this;
      if(this.isLogin) {
        //获取当前人的钱包
        var dataArr = new URLSearchParams();
      dataArr.set('valuation','USDT');
      dataArr.set('hide','Y');
        dataArr.set('type','WALLET');
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
    //获取往期结果
    async getHistory(){
      var that = this;
      var dataArr = new URLSearchParams();
      dataArr.set('symbol',this.currentCoinSymbol);
      dataArr.set('count','40');

      var res = await historyGoldListApi(dataArr);

      if(res.success){
        //往期结果
        this.historyList = res.data.records;
        this.historyList.reverse();

        // setTimeout(()=>{
        //   this.$nextTick(()=>{
        //     this.proFun();
        //   })
        // },3000)
      }

    },
    //获取正在开奖中的合约
    async getOpening() {
      var that = this;
      var dataArr = new URLSearchParams();
      dataArr.set('symbol',this.currentCoinSymbol);


      var res = await openingGoldApi(dataArr);
      if(res.success){

        if(res.data.length > 0) {
          this.openingOption = res.data[0];
          this.openPrice = this.openingOption.openPrice;
          this.getMyOpeningOptionOrder(this.openingOption.optionNo);
        }
        else{
          this.openingOption = {
            id: 0
          };
        }
      }
    },
    getValueDise(obj){//获取k线最新价
      var that = this;
      // console.log(obj);
      if(obj){
        // that.newPirce = obj.close;
        // that.highForth = (obj.high).toFixed(2);
        // that.lossForth = obj.low;

        // that.amountPirce = Math.floor(obj.volume);
        // that.cny = element.cny;
        // if(that.getPair == 0){
        //     that.goodPrice = obj.close
        // }
      }
    },
     //获取获取正在投注中的合约
    async getStarting() {
      var that = this;
      var dataArr = new URLSearchParams();
      dataArr.set('symbol',this.currentCoinSymbol);


      var res = await startingGoldApi(dataArr);
      if(res.success){
        if(res.data.length > 0) {
          this.startingOption = res.data[0];
          this.getMyStartingOptionOrder(this.startingOption.optionNo); // 获取正在投注的我的订单
        }
        else{
          this.startingOption = {
            id: 0
          };
        }
      }
    },
    //获取自己正在开奖的订单
    async getMyOpeningOptionOrder(optionId){
      var that = this;
      this.myOpeningOption = {betAmount: 0};
      if(this.isLogin) {
        var dataArr = new URLSearchParams();
        dataArr.set('symbol',this.currentCoinSymbol);
        dataArr.set('optionId',optionId);
        var res = await orderGoldCurrentApi(dataArr);

        if(res.data.success){
          if(res.data.length > 0){
            this.myOpeningOption = res.data[0];
          }
        }
      }
    },
    //获取当前币种指定期数ID的参与记录
    async getMyStartingOptionOrder(optionId){
      var that = this;
      this.myStartingOption = {betAmount: 0};
      if(this.isLogin) {
        var dataArr = new URLSearchParams();
        dataArr.set('symbol',this.currentCoinSymbol);
        dataArr.set('optionId',optionId);
        var res = await orderGoldCurrentApi(dataArr);

        if(res.success){
          if(res.data.length > 0){
            this.myStartingOption = res.data[0];
          }
        }
      }
    },
    //获取币种信息
    async getCoinInfo(){
      var dataArr = new URLSearchParams()
      dataArr.set('symbol',this.currentCoinSymbol)
      var res = await coinGoldInfoApi(dataArr)
      if(res.data.success){
        this.currentCoin = res.data.data;
        this.currentCoinAmountList = this.currentCoin.amount.split(",");
      }
    },
    confirm(){

      this.modal = true;
    },
    cancel(){
      this.modal = false;
    },
    submit(){
      this.modal = false;
      var that = this;
      let params = {};

      this.$Spin.show();
    },

    //增加一个订单
    async addClick(direction){
      var that = this;

      if(!this.isLogin) {

        //this.$Message.error(this.$t("option.loginFirst"));
        that.$message.error(that.$t('option.loginFirst'))
        return;
      }
      if(this.currentSelectCount == 0) {

        this.$message.error(this.$t("option.selectAmount"));
        return;
      }
      if(Number(this.currentSelectCount) > Number(this.assetUsdt)) {

        this.$message.error(this.$t("option.balancenotenough"));
        return;
      }


      //this.$Spin.show();
      var dataArr = new URLSearchParams()
      dataArr.set('symbol',this.currentCoinSymbol)
      dataArr.set('direction',direction)
      dataArr.set('optionId',this.startingOption.optionNo)
      dataArr.set('amount',this.currentSelectCount)
      var res = await goldOrderAdd(dataArr)
      if(res.success){
        this.getStarting();
        this.getAssets();
        this.loadMyOrders(1);
        this.$message.success(this.$t("option.betsuccess"));
        //this.$Spin.hide();
      }else{
        //this.$message.error(res.msg);
      }
    },
    //读取我的订单
    async loadMyOrders(page){

      if(!this.isLogin) {
        return;
      }
      var dataArr = new URLSearchParams()
      dataArr.set('symbol',this.currentCoinSymbol)
      dataArr.set('pageNo',this.pageNo - 1)
      dataArr.set('pageSize', this.pageSize)
      var res = await orderGoldHistoryApi(dataArr)
      let rows = [];
      var resp;
      if(res.success){

        resp=res.data;
        if (resp.records.length > 0) {
          this.total = resp.total;
          for (var i = 0; i < resp.records.length; i++) {
            var row = res.data.records[i];
            rows.push(row);
          }
          this.orders = rows;
        }
      }


    },
  }
};
</script>

<style>

.ctc .item-title{
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: rgb(188, 188, 188);
}
.ctc .red{
  color: #f2334f;
}
.ctc .green{
  color: #45b854;
}
.ctc .item-title .unit{
  font-size: 14px;
}
.option{
  color: rgb(188, 188, 188);
}
.option .item-desc{
  font-size: 12px;
  text-align: center;
  color: #7c7f82;
}
.option .notice-bottom{
  margin-top: 5px;height: 55px;background-color:#192330;padding-top: 12px;color: rgb(42, 147, 255);
}
.option .notice-btn-left{
  height: 30px;line-height: 30px;width: 42%;margin-left: 5%;float:left;border-radius:3px;border: 1px solid rgb(0, 116, 235);
}
.option .notice-btn-left:hover{
  cursor: pointer;
}
.option #sendCode {
  position: absolute;
  border: none;
  background: none;
  top: 6px;
  outline: none;
  right: 0;
  width: 30%;
  color: #f0ac19;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  border-left: 1px solid #dddee1;
}
.option .notice-btn-right{
  height: 30px;line-height: 30px;width: 42%;margin-right: 5%;float:right;border-radius:3px;border: 1px solid rgb(0, 116, 235);
}
.option .notice-btn-right:hover{
  cursor: pointer;
}
.option .ivu-tabs-bar{
    border-bottom: 1px solid #323c53;
    font-size: 18px;
}
.option .ivu-tabs-nav .ivu-tabs-tab:hover{
    color: #f0a70a;
}
.option .ivu-tabs-nav .ivu-tabs-tab:hover, .option .ivu-tabs-nav .ivu-tabs-tab-active{
    color: #f0a70a;
    font-size: 18px;
}
.option .ivu-tabs-ink-bar{
    background-color: #f0a70a;
}
.option .buy_total{
  border-top: 1px solid #323c53;
  padding-top: 30px;
  margin-bottom: 30px;
}
.option .trade_bd_ctc{
  width: 100%;
  min-width: 800px;
  height: 750px;
}
.option .trade_bd_ctc .panel {
    position: relative;
    z-index: 2;
    float: left;
    width: 98%;
    height: 750px;
    margin-top: 0;
    margin-right: 0;
    border: 0 solid transparent;
    padding-top: 15px;
}

.option .trade_panel{
  background: transparent!important;
}
.option .trade_panel .panel .hd {
    line-height: 20px;
    height: 20px;
    border-bottom: 1px solid #1F2943;
    margin-bottom: 5px;
}

.option .trade_panel .panel .hd span {
    padding-left: 0;
    font-size: 12px;
    margin: 0 3px;
    float:right;
}
.ctc-order-status{
  text-align:center;margin-bottom: 15px;background: #f0a70a;padding: 5px 0px;border-radius: 2px;color: #000000;
}
.option .trade_panel .panel .hd b {
    padding-left: 0;
    font-size: 12px;
    color: #7A98F7;
    float:right;
}

.option .trade_panel .panel .hd.hd_login a {
    float: right;
    text-decoration: none;
    font-size: 12px;
    margin-right: 10px;
}

.option .trade_panel .panel.panel_buy {
    padding-right: 15px;
    padding-left: 15px;
    background: #1d2031;
}

.option .trade_panel .panel.panel_sell {
    padding-right: 15px;
    padding-left: 15px;
    background: #192330;
    margin-left: 5px;
}
.option .trade_wrap .buy-input .ivu-input {
  color: rgb(220, 142, 0);
  font-weight: bold;
  font-size: 20px;
  height: 35px;
}
.option .trade_wrap .sell-input .ivu-input {
  color: #f2334f;
  font-weight: bold;
  font-size: 20px;
  height: 35px;
}
.option .ivu-tabs{
  color: #a5a5a5;
}
.option .trade_wrap .trade-input .ivu-input {
    border: 1px solid #27313e;
    color: #fff;
    height: 35px;
    border-radius: 0;
}

.option .trade_wrap .ivu-input-wrapper {
    outline: none;
}

.option .trade_wrap .ivu-input:focus,
.option .trade_wrap .ivu-input:hover {
    box-shadow: none;
    outline: none;
}
.option .trade_wrap .ivu-input-number-input:focus,
.option .trade_wrap .ivu-input-number-input:hover {
    box-shadow: none;
    border-color: #41546d;
    outline: none;
}

.option .trade_wrap .ivu-input:hover {
    box-shadow: none;
    outline: none;
}
.option .trade_wrap .ivu-input-number-input:hover {
    box-shadow: none;
    border-color: #41546d;
    outline: none;
}
.option .trade_wrap .ivu-form-item-content input{
    padding-left: 5px;
    text-align:center;
    padding-right: 55px;
    font-size: 16px;
}
.option .trade_wrap .ivu-form-item-content input::-webkit-input-placeholder {
    font-size: 14px;
    color: #515a6e;
    margin-bottom: 10px;
    text-align: left;
}
.quantity-group {
    position: relative;
    line-height: 32px;
    font-size: 12px;
    margin-bottom: 24px;
    vertical-align: top;
    zoom: 1;
}
.option .trade_wrap .ivu-form-item-content label.before {
    position: absolute;
    top: 4px;
    left: 10px;
    color: #7c7f82;
    z-index: 2;
    font-size: 14px;
}

.option .trade_wrap .ivu-form-item-content label.after {
    position: absolute;
    top: 4px;
    right: 10px;
    color: #7c7f82;
    font-size: 14px;
}
.trade_bd_ctc Button {
    width: 100%;
    border: 0;
    color: #fff;
}

.trade_bd_ctc Button.bg-red {
    background-color: #f15057;
}
.trade_bd_ctc Button.bg-red:hover {
    background-color: #ff7278;
}

.trade_bd_ctc Button.bg-green {
    background-color: #00b275;
}
.trade_bd_ctc Button.bg-green:hover {
    background-color: #01ce88;
}

.trade_bd_ctc Button.bg-gray {
    background-color: #35475b;
    cursor: not-allowed;
    color: #9fabb5;
    padding: 6px 15px 6px 15px;
    font-size: 14px;
    border-radius: 4px;
}
.trade_bd_ctc Button.bg-gray:hover{
    color: #9fabb5!important;
}

.option .trade_wrap .ivu-btn{
  color: #FFF!important;
}
.option .total{
  min-height: 90px;
}
.trade-input .ivu-form-item-content .ivu-radio-group .ivu-radio-wrapper{
  cursor: auto!important;
}
.option .trade_wrap .ivu-btn.ivu-btn-small{
  padding: 2px 5px!important;
}
.option .ivu-progress .ivu-progress-outer .ivu-progress-inner{
  background-color: #5d4920;
  border-radius: 0px;
}
.el-progress-bar__outer {

    background-color: #2e324a;

}
.color_green{
  color: #00b275;
}
.color_red{
  color: #f15057;
}
.color_gold{
  color: #f0a70a;
}
.current-period{
  position: relative;overflow: hidden;
  background: #0b1520;
    background-size: 500% 500%;
    animation: gradientBG 5s ease infinite;
}
.current-period span:nth-child(1){
  display: block;
  position: absolute;
  height: 3px;
  width:200px;
  top:5px;
  left:0px;
  background: linear-gradient(to right, rgba(0,0,0,0), #4CAF50);
  border-top-right-radius: 1px;
  border-bottom-right-radius: 1px;
  animation: span1 3s linear infinite;
  animation-delay: 1s;
}
@keyframes span1{
    0%{
        left:50%
    }
    100%{
        left:100%;
    }
}
.current-period span:nth-child(2){
    display: block;
    position: absolute;
    height: 70px;
    width: 3px;
    top:-70px;
    right:0px;
    background: linear-gradient(to bottom, rgba(0,0,0,0), #ff1100);
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    animation: span2 3s linear infinite;
    animation-delay: 3.2s;
}
@keyframes span2{
    0%{
        top:-70px;
    }
    100%{
        top:100%;
    }
}
.current-period  span:nth-child(3){
    display: block;
    position: absolute;
    height:3px;
    width:200px;
    right:50%;
    top: 0px;
    background: linear-gradient(to left, rgba(0,0,0,0), #4CAF50);
    border-top-left-radius: 1px;
    border-bottom-left-radius: 1px;
    animation: span3 3s linear infinite;
    animation-delay: 1s;
}
@keyframes span3{
    0%{
        right:40%;
    }
    100%{
        right: 100%;
    }
}

.current-period  span:nth-child(4){
    display: block;
    position: absolute;
    height:70px;
    width:3px;
    bottom:-70px;
    left:0px;
    background: linear-gradient(to bottom, rgba(0,0,0,0), #4CAF50);
    border-top-right-radius: 1px;
    border-top-left-radius: 1px;
    animation: span4 3s linear infinite;
    animation-delay: 3.2s;
}
@keyframes span4{
    0%{
        top: -70px;
    }
    100%{
        top:100%;
    }
}


.current-period  span:nth-child(5){
  display: block;
  position: absolute;
  height: 3px;
  width:200px;
  top:0px;
  right:50%;
  background: linear-gradient(to right, rgba(0,0,0,0), #ff1100);
  border-top-right-radius: 1px;
  border-bottom-right-radius: 1px;
  animation: span5 3s linear infinite;
  animation-delay: 1s;
}
@keyframes span5{
    0%{
        left:40%;
    }
    100%{
        left:100%;
    }
}

.last-period{
    background-image: linear-gradient(60deg, #9C27B0, #3F51B5, #E91E63, #9C27B0, #673AB7, #4CAF50, #673AB7, #9C27B0);
    background-size: 400% 400%;
    animation: gradientBG 5s ease infinite;
}
@keyframes gradientBG {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
.option .ctc-container{
  width: 100%;
}
.option-tab{
  position: relative;
  width: 100%;margin-bottom: 10px;

}
.el-progress.is-warning .el-progress-bar__inner {
    background-color: #8BC34A;
}
.option-tab:after{
  height: 1px;
  background: #FFF;
  width: 100%;
  position: absolute;
  bottom: 1px;
}
.option-tab-item{
  float:left;margin-right: 10px;padding: 5px 10px;font-size: 14px;
}
.option-tab-item:hover{
  cursor: pointer;
}
.option-tab-current{
  border-bottom: 2px solid #f0a70a!important;
  color: #f0a70a!important;
}
.option .ivu-progress-text-inner{
  display: inline-block;
  width: 40px;
}
.option iframe{
  height:500px!important;
}
</style>

<style lang="scss" scoped>
  .option {
    height: 100%;
    background-size: cover;
    position: relative;
    overflow: hidden;
    // padding-bottom: 50px;
    padding-top: 60px;
    color: #a5a5a5;
  }
  .option .bannerimg {
    display: block;
    width: 100%;
  }
  .option .ctc_container {
    padding: 0 10%;
    text-align: center;
    height: 100%;
    background: #0f132b;
    > h1 {
      margin-top: -150px;
      font-size: 32px;
      line-height: 1;
      padding: 50px 0 20px 0;
      letter-spacing: 3px;
    }
  }
  .option .main {
    margin-top: 55px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .ctc-container{
    min-height: 470px;
  }
  .bottom-panel{
      border-top: 1px solid rgb(237, 237, 237);margin-top: 15px;
      .bottom{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span{
          font-size: 12px;
          color: #a7a7a7;
          margin-top:15px;
        }
        button, a{
          margin-top: 11px;
        }
        a.ivu-btn-primary{
          background:#0095ff;
        }
        a.ivu-btn-primary:hover{
          background: #2ba7ff;
        }
      }
  }
  .right{
    float: right;
  }
  .left{
    float: left;
  }
  .gray{
    color: #a7a7a7;
  }
  .option .quantity-group{
    .quantity-item{
      display: inline-block;
      padding: 0px 15px;
      border-radius: 3px;
      border: 1px solid #515a6e;
      margin-left: 15px;
      &:hover{
        border: 1px solid #f0ac19;
        cursor:pointer;
      }
    }
    .current{
      border: 1px solid #f0ac19;
      color: #f0ac19;
    }
  }
  .result-panel{
    border-radius: 5px;
    min-height:300px;
    background: #0b1520;
    width: 100%;
    text-align:left;
    padding: 0px 0px;
    margin-bottom: 10px;
    .title-switch{
      display: inline-block;
      margin: 0 8px;
      padding: 0px 3px 3px 3px;
      border-bottom: 2px solid #0b1520;
      &:hover{
        cursor: pointer;
        color: #f0a70a;
      }
    }
    .switch-current{
      color: #f0a70a!important;
      border-bottom: 2px solid #f0a70a!important;
    }
    .result-item{
      width:73.9px;
      display:inline-block;
      float:left;
      margin-bottom: 30px;

      .item-title{
        width: 100%;text-align: center;
        span{
          display: inline-block;width: 100%;line-height: 20px;font-size:13px;
        }
      }
      .item-body{
        width: 100%;text-align: center;color:#FFF;font-weight: bold;margin-top: 10px;
        span{
          display: inline-block;height:25px;line-height: 25px;width:25px;border-radius: 25px;font-size:16px;font-weight:bold;
          i{
            margin-top: -4px;
          }
        }
        .tip-item{
          span{
            display: inline-block;width: 60px;font-size: 10px;height:16px;line-height: 16px;text-align: right;
            font-size: 8px;font-weight:normal;
          }
        }
      }

      &:not(:last-child){
        border-right: 1px dashed #2c3038;
      }
      &:nth-child(20) {//这个是显示往期结果的条数，20就是只显示20条。
        border-right: none;
      }
      &:nth-child(1) {
        margin-left: 7px;
      }
      &:nth-child(21) {
        margin-left: 7px;
      }
    }
  }
  .bg-green{
    background: #00b275;
  }
  .bg-red{
    background: #f2334f;
  }
  .bg-gray{
    background: #585858;
  }
  .last-period{
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
    min-height: 40px;
    .period-content{
      width:560px;float: left;margin-left: 30px;height:40px;line-height: 40px;font-size:12px;
      .content-item{
        float: left;width:33%;text-align:center;text-shadow: 2px 2px 5px #00000047;
        span:nth-child(1) {
          display: inline-block;height: 20px;line-height: 20px;background: #0000004d;padding: 0px 8px;border-radius: 3px;box-shadow: 2px 2px 5px 0px #00000047;
        }
        .direction{
          display: inline-block;height: 20px;line-height: 20px;background: #FFF;padding: 0px 8px;border-radius: 3px;box-shadow: 2px 2px 5px 0px #00000047;
        }
      }
    }
  }
  .current-period{
    min-height: 170px;margin-bottom: 30px;padding: 10px;border-radius: 5px;
    .period-title{
      display: inline-block;width: 100%;text-align: center;font-size: 24px;font-weight: bold;
    }
    .period-time{
      display: inline-block;width: 100%;text-align: center;font-size: 14px;margin-bottom: 20px;letter-spacing:1px;
    }
    .period-reward{
      width:33.3%;float:left;padding: 0px 0px;box-sizing: border-box;background:#21253a;
      &:not(:last-child){
        border-right: 2px dashed #0b1520;
      }
      &:first-child{
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      &:last-child{
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      .el-table th, .el-table tr {
          background: #21253a;
      }
    }

  }
</style>
