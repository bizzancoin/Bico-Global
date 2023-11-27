<template>
  <div class="option">
   <div class="ctc_container">
      <h1></h1>
      <div class="main">
        <!-- <div style="color: #0db124">
            {{sysTime |  dateFormat(that)}}
        </div> -->
          <div class="option-tab">
            <div :class="{ 'option-tab-item': true, 'option-tab-current': item.symbol == currentCoinSymbol }" class="option-tab-item" v-for="item in coinList" :key="item.symbol" @click="changeCoin(item)">{{item.name}}</div>
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
                        <div style="width: 10%;text-align: center;color: #ffffff;float:left;height:40px;line-height: 40px;font-size: 20px;font-weight: bold;text-shadow: 2px 2px 2px #000;">
                          {{$t('option.seriers')}} {{openingOption.optionNo}} {{$t('option.period')}}
                          <Tooltip placement="top-start">
                            <Icon type="ios-alarm" style="margin-top: -3px;"/>
                            <div slot="content">
                              {{(openingOption.openTime + currentCoin.openTimeGap * 1000) | dateFormat(that)}} ~ {{(openingOption.openTime + currentCoin.openTimeGap * 1000 + currentCoin.closeTimeGap * 1000) | dateFormat(that)}}
                            </div>
                          </Tooltip>
                        </div>
                        <div class="period-content">
                          <!--开奖中间部分-->
                          <div class="content-item color_green"><span>{{$t('option.buyupreward')}}: <b>{{openingOption.totalBuy|fixedScale(that)}}</b> USDT</span></div>
                          <div class="content-item color_red"><span>{{$t('option.buydownreward')}}: <b>{{openingOption.totalSell|fixedScale(that)}}</b> USDT</span></div>
                          <div class="content-item color_gold" v-if="isLogin">
                            <span>{{$t('option.myamount')}}: <b>{{myOpeningOption.betAmount|fixedScale(that)}}</b> USDT</span> &nbsp;&nbsp;
                            <span class="direction color_green" v-if="myOpeningOption.direction==0">{{$t('option.buyup')}}</span>
                            <span class="direction color_red" v-if="myOpeningOption.direction==1">{{$t('option.buydown')}}</span>
                          </div>
                          <div style="float:left;" v-if="!isLogin">{{$t('option.myamount')}}:
                              <router-link to="/login" id="login">{{$t("common.login")}}</router-link>/<router-link to="/register" id="register">{{$t("common.register")}}</router-link>
                          </div>
                        </div>
                        <div style="float:right;height:40px;line-height:40px;padding-right:10px;">
                          <span :class="{ 'bg-green': currentPrice > openPrice, 'bg-red': currentPrice < openPrice }" style="letter-spacing:2px;display: inline-block;height:20px;line-height:20px;border-radius: 3px;padding: 0 5px;color:#FFF;">{{priceChange}}</span>
                        </div>
                        <div style="color:#a5a5a5;width:170px;float: right;height:40px;text-align: center;">
                          <div style="height:16px;line-height: 16px;color: #ffffff;margin-top: 4px;margin-left:5px;font-size: 6px;text-align: left;">{{$t('option.openprice')}}：{{openPrice | fixedScale(that)}} USDT</div>
                          <div style="height:16px;line-height: 16px;color: #ffffff;font-size: 6px;margin-left:5px;text-align: left;">{{$t('option.currentprice')}}：<span :class="{ 'color_green': currentPrice > openPrice, 'color_red': currentPrice < openPrice }">{{currentPrice | fixedScale(that)}} USDT</span>
                          </div>
                        </div>
                        <div  style="width:200px;float: right;height:40px;line-height: 36px;text-align: right;padding-right: 10px;margin-top: 3px;">

                          <div style="margin-top:8px;"><el-progress :text-inside="true" :stroke-width="18" :percentage="d_percentage" status="success"></el-progress></div>
                        </div>
                        <div style="color:#ff8100;width:80px;float: right;height:40px;line-height: 40px;text-align: right;font-size:12px;">{{$t('option.progress')}}：</div>
                      </div>
                      <div class="current-period">
                        <div class="content">
                          <div class="period-title">{{$t('option.seriers')}} {{startingOption.optionNo}} {{$t('option.period')}}</div>
                          <div class="period-time">
                            <div ref="proRef" style="display:none">{{(new Date(startingOption.createTime).getTime() ) | dateFormat(that)}} ~ {{(new Date(startingOption.createTime).getTime() + currentCoin.openTimeGap * 1000 ) | dateFormat(that)}}</div>

                            <div style="margin-top:14px;font-size:14px;">{{$t('option.currentoption')}}：{{(new Date(startingOption.createTime).getTime() ) | dateFormat(that)}} ~ {{(new Date(startingOption.createTime).getTime() + currentCoin.openTimeGap * 1000 ) | dateFormat(that)}}</div>
                          </div>

                          <div class="period-reward color_green" style="border-top-left-radius: 8px;border-bottom-left-radius: 8px;">
                            <h2>{{startingOption.totalBuy | fixedScale(that)}} USDT</h2>
                            <p>{{$t('option.buyupreward')}}</p>
                          </div>

                          <div class="period-reward color_gold">
                            <h2>{{myStartingOption.betAmount | fixedScale(that)}} USDT</h2>
                            <p>{{$t('option.myamount')}}</p>
                          </div>

                          <div class="period-reward color_red">
                            <h2>{{startingOption.totalSell | fixedScale(that)}} USDT</h2>
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
                          <Button v-if="isLogin" class="bg-green" style="width: 80%;height: 40px;line-height: 3;border-radius: 4px;" size="large" @click="addClick(0)">{{syTime<=0?'封盘':$t('option.buyup')+'  '+syTime+'S'}}</Button>
                          <Button v-if="!isLogin" class="bg-gray" style="width: 80%;height: 40px;line-height: 3;border-radius: 4px;" size="large">{{$t('option.login')}}</Button>
                        </div>
                        <div class="ctc_avi">
                             <div class="ctc_avi2">V</div>
                             <div class="ctc_avi3">S</div>
                        </div>
                        <div style="width: 50%;float:right;text-align: center;">
                          <Button v-if="isLogin" class="bg-red" style="width: 80%;height: 40px;line-height: 3;border-radius: 4px;" size="large" @click="addClick(1)">{{syTime<=0?'封盘':$t('option.buydown')+'  '+syTime+'S'}}</Button>
                          <Button v-if="!isLogin" class="bg-gray" style="width: 80%;height: 40px;line-height: 3;border-radius: 4px;" size="large">{{$t('option.login')}}</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div  class="ctc_avibnm">
                  <div></div>
                          <el-table border :data="orders" :empty-text="$t('bico.W160')">
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
    </div>
  <div class="mvusodwe"></div>
  <Foot />

  </div>
</template>

<script>
import Datafeeds from "@/js/charting_library/datafeed/optiontrade.js";
import { ticketApi,walletApi,coinOptionListApi,coinInfoApi,klineApi,sysTimeApi,
  historyListApi,openingApi,startingApi,orderCurrentApi,optionOrderAdd,orderHistoryApi,timeCountApi} from '@/api/getData'

//var moment = require("moment-timezone");
//var Stomp = require("stompjs");
//var SockJS = require("sockjs-client");
import expandRow from "@/components/exchange/expand.vue";
import '@/style/option2.css';
import $ from "jquery";
import optionEchartsKLine from './OptionEchartsKLine.vue'
import Foot from '@/components/Foot'

export default {
  components: { optionEchartsKLine, expandRow ,Foot ,Datafeeds,$},
  data() {
    const self = this;
    return {
      sysTime:'',
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
      syTime:0,
      pages:10,
      current:1,
      secend:0,
      timer:null,
      timer2:null,
      pageNo: 1,
      localOffset:0,
      serviceOffset: -8*60*60*1000,//后台服务器的时间偏移量
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
  var d=new Date(); //创建一个Date对象
      var localTime = d.getTime();
      this.localOffset=d.getTimezoneOffset()*60000; //获得当地时间偏移的毫秒数
    //初始化
     this.init();
  },
  watch:{
    // sysTime:function (newVal,oldVal) {
    //
    //   //当地时间 + 偏移量 +服务器偏移量
    //   let e = new Date(this.startingOption.createTime).getTime()  ;//封盘时间
    //   console.log("系统：："+new Date(Number(newVal)))
    //   console.log(new Date(e))
    //   let z = this.currentCoin.openTimeGap
    //
    //   //系统时间
    //   //debugger
    //   var t = parseInt((Number(newVal) - e) /1000)
    //   this.syTime=z-t
    //   var timed = t/z*100 // 过去的时间   210/300*100
    //   //console.log(this.sysTime - e)
    //   //console.log("已经过去"+timed)
    //   //console.log(new Date())
    //   let n = Number((timed).toFixed(2));
    //   this.d_percentage = n>100?100:n;
    //   if(this.d_percentage>=100){
    //
    //     this.initPageData()
    //   }
    // }
  },
  filters:{
    dateFormat: function(tick,that) {
      // return '123'

      return that.dateFormatHM(Number(tick));//格式化时间
    },
    fixedScale: function(value,that) {
      return  Number(value).toFixed(that.currentCoin.baseCoinScale);
    },
    fixed2: function(value){
      return  Number(value).toFixed(2);
    }
  },
  mounted () {
  },
  computed: {

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
  beforeDestroy(){
    this.timer = clearInterval(this.timer)
    this.timer2 = clearInterval(this.timer2)
  },
  methods: {
    // dateFormatHM(tick){
    // var d=new Date(); //创建一个Date对象
    // var localTime = d.getTime();
    // var localOffset=d.getTimezoneOffset()*60000; //获得当地时间偏移的毫秒数
    // var gmt = localTime + localOffset; //GMT时间
    // var offset = 8;
    // var hawaii = gmt + (3600000*offset);
    // var nd = new Date(hawaii);
    // return nd.toLocaleString()
    // },
    async getTime(){
      let z = this.currentCoin.openTimeGap
      var dataArr = new URLSearchParams();
      dataArr.set('symbol',this.currentCoinSymbol);

      var res = await timeCountApi(dataArr);
      if(res.success){
        // res.data.num //过去秒数
        // res.data.systemTime //系统时间
        // res.data.createLongTime //创建时间
        //系统时间
        //debugger
        var t = Number(res.data.num)//过去秒数
        this.syTime=z-t
        var timed = t/z*100 // 过去的时间   210/300*100
        let n = Number((timed).toFixed(2));
        this.d_percentage = n>100?100:n;
        if(this.d_percentage>=100){
          this.initPageData()
        }
        this.sysTime = res.data.systemTime
      }
      this.secend=this.secend+1
      console.log("secend:"+this.secend)
      if(this.secend%5 == 0 && this.d_percentage<100){
        console.log("secend:"+this.secend)
        this.initPageData()
      }
      this.getStarting()
    },
    proFun(){
      if(this.timer == null){
        this.timer = setInterval(this.getTime,1000)
      }
      if(this.timer2 == null){
        this.timer2 = setInterval(this.ticketFun,1000)
      }

    },
      init() {
       console.log(sessionStorage.getItem('userToken'))
      //this.$store.commit("navigate", "nav-option");

       if(this.isLogin){
         this.getAssets();
       }
      //this.getAssets();
      //被注释

      this.getCoinList();

      //this.initPageData();
      //开发阶段不循环获取
        //this.timer = clearInterval(this.timer)
      //this.proFun();

      //this.loadMyOrders(1);
      //被注释

    },
    historyClick(tab){
      this.historyTab = tab;
      if(tab==2){
        this.getKlineData();
      }
    },
    initPageData(){
      this.getHistory();
      this.getAssets();
      this.getOpening();
      //this.getStarting();
      this.loadMyOrders(1);
    },
    // dateFormat: function(tick) {
    //   return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    // },
    async ticketFun(){//获取币种
      var that = this;
      var data =new URLSearchParams();
      data.set('type',0);
      var res = await ticketApi(data);
      if(res.success){
        var obj = res.data;
        obj.forEach((element,index) => {
          if(element.symbol != ''){
            if(that.currentCoinSymbol == element.symbol){
                that.currentPrice =  (element.close).toFixed(that.currentCoin.coinScale) ;
            }
          }
        });
      }else{
        clearInterval(that.timer2);
      }
    },

    //获取币种列表
    async getCoinList() {
      var that = this;
      var res = await coinOptionListApi();
      if(res.data.success){
        this.coinList = res.data.data;
        var a = true
        var having = null
        this.coinList.forEach(item =>{
          if(item.symbol == this.currentCoinSymbol){
            a=false
            having = item
          }
        })
        that.changeCoin(a?this.coinList[0]:having)


      }

    },
    selectCount(count) {
      this.currentSelectCount = count;
    },
    changeCoin(item) {
      this.currentCoin = item;
      this.currentCoinAmountList = item.amount.split(",");
      this.currentCoinSymbol = item.symbol;
      this.pageNo = 1;
      this.timer = clearInterval(this.timer)

      this.proFun();
      this.initPageData();
      this.symbolsStr = item.symbol;

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
    //获取往期结果
    async getHistory(){
      var that = this;
      var dataArr = new URLSearchParams();
      dataArr.set('symbol',this.currentCoinSymbol);
      dataArr.set('count','40');

      var res = await historyListApi(dataArr);

      if(res.success){
        //往期结果
        this.historyList = res.data.records;
        this.historyList.reverse();

      }

    },
    //获取正在开奖中的合约
    async getOpening() {
      var that = this;
      var dataArr = new URLSearchParams();
      dataArr.set('symbol',this.currentCoinSymbol);
      var res = await openingApi(dataArr);
      if(res.success){
        if(res.data.length > 0) {
          if(!(this.openingOption.id === res.data[0].id)){
            this.openingOption = res.data[0]


            this.openPrice = this.openingOption.openPrice;
            this.getMyOpeningOptionOrder(this.openingOption.optionNo);
          }

        }
        else{
          this.openingOption = {
            id: 0
          };
        }
      }
    },

     //获取获取正在投注中的合约
    async getStarting() {
      var that = this;
      var dataArr = new URLSearchParams();
      dataArr.set('symbol',this.currentCoinSymbol);


      var res = await startingApi(dataArr);
      if(res.success){
        if(res.data.length > 0 ) {
          this.startingOption.totalBuy = res.data[0].totalBuy
          this.startingOption.totalSell = res.data[0].totalSell

          //this.startingOption.totalBuy
          if(this.startingOption.id !== res.data[0].id){
            this.startingOption = res.data[0];
            this.d_percentage=0
            this.getMyStartingOptionOrder(this.startingOption.optionNo)


          }

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
        var res = await orderCurrentApi(dataArr);

        if(res.success){
          if(res.data.data!=''){

            this.myOpeningOption = res.data.data;
          }
        }
      }
    },
    //获取当前币种指定期数ID的参与记录
    async getMyStartingOptionOrder(optionId){
      var that = this;
      this.myStartingOption = {betAmount: 0};

      var dataArr = new URLSearchParams();
      dataArr.set('symbol',this.currentCoinSymbol);
      dataArr.set('optionId',optionId);
      var res = await orderCurrentApi(dataArr);

      if(res.success){
        if(res.data.data != ''){
          this.myStartingOption = res.data.data;
        }
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
      if(that.syTime<=0){
        that.$message.error("正在创建新一期，请稍等")
        return
      }
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
      var res = await optionOrderAdd(dataArr)
      if(res.success){
        this.getMyStartingOptionOrder(this.startingOption.optionNo)
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
      var res = await orderHistoryApi(dataArr)
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
  font-family: "Times New Roman", Times, serif;
}
.color_red{
  color: #f15057;
  font-family: "Times New Roman", Times, serif;
}
.color_gold{
  color: #f0a70a;
      font-family: "Times New Roman", Times, serif;
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
    background-color: #8BC34A!important;
}
.option-tab:after{
  height: 1px;
  background: #FFF;
  width: 100%;
  position: absolute;
  bottom: 1px;
}
.option-tab-item{
  float:left;margin-right: 14px;padding: 10px 0px;font-size: 14px;
}
.option-tab-item:hover{
  cursor: pointer;
}

.option .ivu-progress-text-inner{
  display: inline-block;
  width: 40px;
}
.option iframe{
  height:240px!important;
}

.ctc_avi{
    width: 0%;
    float: left;
    padding: 4px 0px;
    box-sizing: border-box;
    background: #21253a;
    font-size: 30px;
    margin-left: -22px;
    font-weight: 700;
}
.ctc_avi2{
    width: 0%;
    float: left;
    padding: 4px 0px;
    box-sizing: border-box;
    font-size: 40px;
    margin-left: -8px;
    font-weight: 700;
    color: #1ed496;
    margin-top: -7px;
    font-family: "Times New Roman", Times, serif;
}
.ctc_avi3{
    width: 0%;
    float: left;
    padding: 4px 0px;
    box-sizing: border-box;
    font-size: 34px;
    margin-left: 18px;
    font-weight: 700;
    color: #FF9800;
    margin-top: -2px;
    font-family: "Times New Roman", Times, serif;
}
</style>

<style lang="scss" scoped>

  .option .bannerimg {
    display: block;
    width: 100%;
  }
  .option .ctc_container {
    padding: 0 10%;
    text-align: center;
    height: 100%;


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
      border: 1px solid #6267825c;
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
        border-right: 1px dashed #51567140;
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

  .el-table th, .el-table tr {
    background-color: #21253a !important;
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
      width:33.3%;
      float:left;
      padding: 0px 0px;
      box-sizing: border-box;

      &:not(:last-child){
        border-right: 2px dashed #40476d47;
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
          background: #191c2f;
      }
    }

  }
  .el-table tr {
    background-color: #1d2031 !important;
  }
</style>
