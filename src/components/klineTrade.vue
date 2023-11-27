<template>
  <div class="main wh-full">
    <my-header
      class="header-dark"
      :showHeadBody='false'
      :show-head-top='true'
    >
      <div
        slot="top-slot"
        class="k-line-top"
      >
        <router-link to="./main">
          <img
            class="logo p-rel"
            :src='logo'
            alt=""
          >
        </router-link>
        <div class="mark-name p-rel">
          <span class="font-bold">{{currentConInfo.coinid}}/{{currentConInfo.maincoinid}}</span>
          <div class="table p-abs">
            <div class="thead">
              <span
                @click='tabChange(item)'
                v-for="(item,v) in mainCoinList.maincoin"
                :class="mainCoinId==item.coinid?'active':''"
                :key='v'
                v-text="item.coinid"
              >
              </span>
              <span
                @click="getCustomList"
                :class="mainCoinId=='opt'?'active':''"
                v-text='$t("optional")'
              >
              </span>
            </div>
            <div class="table-content">
              <div class="tr flex flex-between">
                <div
                  class="td"
                  v-text="$t('optional')"
                ></div>
                <div
                  class="td"
                  v-text="$t('currencyType')"
                ></div>
                <div
                  class="td"
                  v-text="$t('latestPrice')"
                ></div>
                <div
                  class="td"
                  v-text="$t('high')"
                ></div>
                <div
                  class="td"
                  v-text="$t('low')"
                ></div>
                <div
                  class="td"
                  v-text="$t('increase')"
                ></div>
                <div
                  class="td"
                  v-text="$t('dayVol')"
                ></div>
              </div>
              <div
                v-loading='showLoading'
                element-loading-background='rgba(0,0,0,.4)'
                class="tbody"
              >
                <div
                  class="tr flex flex-between"
                  @click='onTableRowClick(item)'
                  v-for="(item,index) in tableData"
                  :key='item.autoid'
                >
                  <div
                    @click="addMylist(item,index)"
                    class="td"
                  >
                    <i
                      :class="item.isMyLike?'el-icon-star-on':'el-icon-star-off'"
                      class="font-16"
                    ></i>
                  </div>
                  <div class="td flex flex-v-center">
                    <img
                      class="thumb-20"
                      :src="item.logo"
                      alt=""
                    >
                    <span>{{item.coinid}}/{{item.maincoinid}}</span>
                  </div>
                  <div class="td">
                    <span>{{item.prise*1}}</span>
                  </div>
                  <div class="td">
                    <span>{{item.height*1}}</span>
                  </div>
                  <div class="td">
                    <span>{{item.low*1}}</span>
                  </div>
                  <div class="td">
                    <span :class="item.rise*1>0?'color-danger':'color-success'">
                      {{item.rise*1}}
                    </span>
                  </div>
                  <div class="td">
                    <span>{{item.number*1}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 币种后面的数据展示 top -->
        <div class="price flex fl">
          <div class="item h-full">
            <em class="font-16 color-success font-bold">{{Number(currentCoinInfo.prise).toFixed(4)||'0'}}</em>&nbsp;
            <em class="price-1 font-12">≈&nbsp;￥{{Number(currentCoinInfo.prise*7).toFixed(4)||'0'}}</em>
          </div>
          <i class="tag">|</i>
          <div class="item h-full fl">
            <em
              class="label"
              v-text="$t('increase')"
            ></em>
            <em
              :class="currentConInfo.rise>0?'color-danger':'color-success'"
              class="price-1 font-14"
            >&nbsp;{{(currentCoinInfo.rise||0)*1}}%
            </em>
          </div>
          <i class="tag">|</i>
          <div class="item h-full fl">
            <em
              class="label"
              v-text="$t('high')"
            ></em>
            <em class="price-1 font-14">{{(currentCoinInfo.height||0)*1}}</em>
          </div>
          <i class="tag">|</i>
          <div class="item h-full fl">
            <em
              class="label"
              v-text="$t('low')"
            ></em>
            <em class="price-1 font-14">{{(currentCoinInfo.low||0)*1}}</em>
          </div>
          <i class="tag">|</i>
          <div class="item h-full fl">
            <em
              class="label"
              v-text="$t('dayVol')"
            ></em>
            <em class="price-1 font-14">{{(currentCoinInfo.number||0)*1}} {{currentCoinInfo.coin}}</em>
          </div>
        </div>
      </div>
    </my-header>
    <div class="main-body p-rel">
      <div class="k-map">
        <!-- K线图 -->
        <div class="map-wrap fl">
          <iframe
            id='iframe'
            :src="iframUrl"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </div>
        <div class="trade-panel flex flex-between">
          <!-- K线右边的栏目 -->
          <div class="trade-table">
            <div class="trade-head flex flex-between">
              <div class="tr-mPrice">{{$t('type')}}</div>
              <div class="tr-name">{{$t('price')}}</div>
              <div class="tr-vol">{{$t('amount')}}</div>
            </div>
            <!-- 买入五档图 -->
            <!-- <vue-seamless-scroll :data="latestSoldData" class="seamless-warp tb-left trade-body" :class-option="optionSingleHeightTime"> -->
              <!-- 如需去掉滚动效果，在ul 上加tb-left trade-body，去掉外层的 vue-seamless-scroll  -->
            <ul
              v-if="latestSoldData.length>0"
              class="tb-left trade-body"
            >
              <li
                @click='onLatestLiClick(item,1)'
                v-for="(item,index) in latestSoldData"
                :key='index'
                class="flex flex-between p-rel"
              >
                <span class="color-danger tr-mPrice">{{$t('sell')}}</span>
                <span
                  class="tr-name"
                  v-text="item.price*1"
                ></span>
                <span
                  class="tr-vol"
                  v-text="item.number*1"
                ></span>
                <div
                  :style='{width:(item.total/sellListTotal)*400+"%"}'
                  class="p-abs progress"
                ></div>
              </li>
            </ul>
            <div
              v-else
              class="table-no-data txt-center"
              v-text="$t('tip.noRecord')"
            ></div>
            <!-- 最新价 -->
            <div
              v-show="currentCoinInfo.prise*1"
              class="newprice txt-center color-danger"
            >
              <span class="font-16">
                {{(currentCoinInfo.prise*1).toFixed(2)}}
              </span>
              <em>≈￥{{(currentCoinInfo.prise*7).toFixed(2)}}</em>
            </div>
            <!-- 卖出五档图 -->
            <!-- <vue-seamless-scroll :data="latestBuyData" class="seamless-warp tb-left trade-body" :class-option="optionSingleHeightTime"> -->
              <!-- 如需去掉滚动效果，在ul 上加tb-left trade-body，去掉外层的 vue-seamless-scroll  -->
            <ul
              v-if="latestBuyData.length>0"
              class="tb-left trade-body"
            >
              <li
                @click='onLatestLiClick(item,2)'
                v-for="(item,index) in latestBuyData"
                :key='index'
                class="flex flex-between p-rel"
              >
                <span class="color-success tr-mPrice">{{$t('buy')}}</span>
                <span
                  class="tr-name"
                  v-text="item.price*1"
                ></span>
                <span
                  class="tr-vol"
                  v-text="item.number*1"
                ></span>
                <div
                  :style='{width:(item.total/buyListTotal)*400+"%"}'
                  class="p-abs progress"
                ></div>
              </li>
            </ul>

            <div
              v-else
              class="table-no-data txt-center"
              v-text="$t('tip.noRecord')"
            ></div>

          </div>
          <div class="trade-table">
            <div class="trade-head flex flex-between">
              <div class="tr-mPrice">{{$t('date')}}</div>
              <div class="tr-name">{{$t('price')}}</div>
              <div class="tr-vol">{{$t('volumn')}}</div>
            </div>
            <!-- 滚动列表 右侧-->
            <!-- <vue-seamless-scroll :data="historicalBuyData" class="seamless-warp tb-right trade-body" :class-option="optionSingleHeightTime"> -->
            <ul
              v-if="historicalBuyData.length>0"
              class="tb-right trade-body"
            >
              <li
                v-for="(item,index) in historicalBuyData"
                :key='index'
                class="flex flex-between p-rel"
              >
                <span
                  class="color-666 tr-mPrice"
                  v-text="item.writedate"
                ></span>
                <span
                  class="tr-name color-danger"
                  v-text="item.price*1"
                ></span>
                <span
                  class="tr-vol"
                  v-text="item.number*1"
                ></span>
              </li>
            </ul>

            <div
              v-else
              class="table-no-data txt-center"
              v-text="$t('tip.noRecord')"
            ></div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="record">
          <div class="entrust_btn">
            <div
              class="btn"
              @click="changeTable(0)"
              :class="contentId==0?'click':''"
            >{{$t('currEnstrument')}}</div>
            <div
              class="btn"
              @click="changeTable(1)"
              :class="contentId==1?'click':''"
            >{{$t('oldEnstrument')}}</div>
          </div>
          <template v-if="userData.isLogin">
            <!-- 当前委托 -->
            <div
              element-loading-background='rgba(0,0,0,.4)'
              v-loading='showLoading_1'
              v-show="contentId==0"
              class="entr-content"
            >
              <div class="flex entr-head flex-between">
                <div
                  style="flex:1;"
                  v-text="$t('time')"
                ></div>
                <div
                  style="flex:1;"
                  v-text="$t('currencyType')"
                ></div>
                <div
                  style="flex:1.5;"
                  v-text="$t('price')"
                ></div>
                <div
                  style="flex:0.5;"
                  v-text="$t('WTtype')"
                ></div>
                <div
                  style="flex:1.5;"
                  v-text="$t('amount')"
                ></div>
                <div
                  style="flex:1.5;"
                  v-text="$t('volumn')"
                ></div>
                <div
                  style="flex:1.5;"
                  v-text="$t('total')"
                ></div>
                <div
                  style="flex:0.5;"
                  v-text="$t('operation')"
                ></div>
              </div>
              <div class="entr-body">
                <div
                  v-if="myEntrustList.length>0"
                  v-for="(item,index) in myEntrustList"
                  :key='index'
                  class="row flex flex-between"
                >
                  <div
                    style="flex:1;"
                    v-text="item.writedate"
                  ></div>
                  <div
                    style="flex:1;"
                    v-text="item.tradcoin"
                  ></div>
                  <div
                    style="flex:1.5;"
                    v-text="item.price*1"
                  ></div>
                  <!-- 0 买入 1 卖出 -->
                  <div
                    style="flex:0.5;"
                    :class="item.type=='0'?'color-danger':'color-success'"
                    v-text="item.type=='0'?$t('buy'):$t('sell')"
                  ></div>
                  <div
                    style="flex:1.5;"
                    v-text="item.number*1"
                  ></div>
                  <div
                    style="flex:1.5;"
                    v-text="item.dealnumber*1"
                  ></div>
                  <div
                    style="flex:1.5;"
                    v-text="(item.number*item.price).toFixed(4)"
                  ></div>
                  <div
                    @click="cancelOrder(item.id)"
                    style="flex:0.5;cursor:pointer"
                    class="color-danger"
                    v-text="$t('withdrawed')"
                  ></div>
                </div>
                <div
                  v-if="myEntrustList.length==0"
                  class="no-data"
                  v-text="$t('tip.noRecord')"
                ></div>
              </div>
            </div>
            <!-- 历史委托 -->
            <div
              element-loading-background='rgba(0,0,0,.4)'
              v-loading='showLoading_1'
              v-show="contentId==1"
              class="entr-content"
            >
              <div class="flex entr-head flex-between">
                <div
                  style="flex:1;"
                  v-text="$t('time')"
                ></div>
                <div
                  style="flex:1.5;"
                  v-text="$t('currencyType')"
                ></div>
                <div
                  style="flex:1.5;"
                  v-text="$t('price')"
                ></div>
                <div
                  style="flex:1.5;"
                  v-text="$t('amount')"
                ></div>
                <div
                  style="flex:1.5;"
                  v-text="$t('money')"
                ></div>
                <!-- <div
                  style="flex:1.5;"
                  v-text="$t('commision')"
                ></div> -->
                <div
                  style="flex:0.5;"
                  v-text="$t('type')"
                ></div>
              </div>
              <div class="entr-body">
                <div
                  class="row flex flex-between"
                  v-if='myHistoryEntrustList.length>0'
                  v-for="(item,index) in myHistoryEntrustList"
                  :key='index'
                >
                  <div
                    style="flex:1"
                    v-text="item.writedate"
                  ></div>
                  <div
                    style="flex:1.5;"
                    v-text="item.tradcoin"
                  ></div>
                  <div
                    style="flex:1.5;"
                    v-text="item.price*1"
                  ></div>
                  <div
                    style="flex:1.5;"
                    v-text="item.number"
                  ></div>
                  <div
                    style="flex:1.5;"
                    v-text="(item.number*item.price).toFixed(4)"
                  ></div>
                  <!-- <div
                    style="flex:1.5;"
                    v-text="item.tradgas"
                  ></div> -->
                  <div
                    style="flex:0.5;"
                    :class="item.type=='0'?'color-danger':'color-success'"
                    v-text="item.type=='0'?$t('buy'):$t('sell')"
                  >
                  </div>
                </div>
                <div
                  v-if='myHistoryEntrustList.length==0'
                  v-text="$t('tip.noRecord')"
                ></div>
              </div>
            </div>
          </template>
          <div
            v-if="!userData.isLogin"
            class="no-login"
          >
            <span class="font-16">
              <router-link
                to='/user/login'
                class="color-danger"
              >{{$t('login')}}</router-link>&nbsp;or&nbsp;
              <router-link
                to='/user/register'
                class="color-success"
              >{{$t('register')}}</router-link>
            </span>
          </div>
        </div>
        <div class="form-wrap">
          <ul class="transaction-tabs">
            <li
              class="tab-xj selected"
              v-text='$t("label119")'
            ></li>
          </ul>
          <div class="transaction-content">
            <!-- 买入 -->
            <div class="form transaction-sell">
              <p class="transaction-title">{{$t('buy')}}</p>
              <p class="transaction-input transaction-xj">
                <input
                  id="getCountPrice"
                  class="tread-input"
                  :placeholder="$t('buyingRate')"
                  v-model="buyFormData.price"
                >
              </p>
              <p class="transaction-treadNum">
                <span class="transaction-price">
                  <s>--</s></span>&nbsp;&nbsp;
              </p>
              <p class="transaction-input transaction-xj">
                <input
                  id="getCountPrice"
                  v-model="buyFormData.number"
                  class="tread-input"
                  :placeholder="$t('buyVol')"
                >
              </p>
              <p class="transaction-input flex flex-between">
                <span
                  @click="changeNum(0.25,1)"
                  class="percentage"
                >25%</span>
                <span
                  @click="changeNum(0.5,1)"
                  class="percentage"
                >50%</span>
                <span
                  @click="changeNum(0.75,1)"
                  class="percentage"
                >75%</span>
                <span
                  @click="changeNum(1,1)"
                  class="percentage"
                >100%</span>
              </p>
              <p class="transaction-treadNum">
                <label>{{$t('total')}}</label>
                <span class="transaction-price">
                  <s>--</s></span>&nbsp;&nbsp;{{buyTotal}}
              </p>
              <p class="transaction-button clearfix">
                <span
                  @click="handleBuy"
                  class="button-jy"
                >{{$t('buy')}}</span>
              </p>
            </div>
            <!-- 卖出 -->
            <div class="form transaction-buy">
              <p class="transaction-title">{{$t('sell')}}</p>
              <p class="transaction-input transaction-xj">
                <input
                  id="getCountPrice"
                  class="tread-input"
                  :placeholder="$t('sellingRate')"
                  v-model="sellFormData.price"
                >
              </p>
              <p class="transaction-treadNum">
                <span class="transaction-price">
                  <s>--</s></span>&nbsp;&nbsp;
              </p>
              <p class="transaction-input transaction-xj">
                <input
                  id="getCountPrice"
                  class="tread-input"
                  v-model="sellFormData.number"
                  :placeholder="$t('sellVol')"
                >
              </p>
              <p class="transaction-input flex flex-between">
                <span
                  @click="changeNum(0.25,2)"
                  class="percentage"
                >25%</span>
                <span
                  @click="changeNum(0.5,2)"
                  class="percentage"
                >50%</span>
                <span
                  @click="changeNum(0.75,2)"
                  class="percentage"
                >75%</span>
                <span
                  @click="changeNum(1,2)"
                  class="percentage"
                >100%</span>
              </p>
              <p class="transaction-treadNum">
                <label>{{$t('total')}}</label>
                <span class="transaction-price">
                  <s>--</s></span>&nbsp;&nbsp;{{sellTotal}}
              </p>
              <p class="transaction-button clearfix">
                <span
                  @click="handleSell"
                  class="button-jy"
                >{{$t('sell')}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let webSocket;
import mainCoinModel from "@/js/allCoinModel.js";
import {
  addCustomList,
  removeCustomList,
  matchCustomList,
  randomString
} from "@/assets/js/common.js";
let ajaxDone = false;
window.onbeforeunload = () => {
  webSocket.close();
};
export default {
  data() {
    return {
      logo: require("@/assets/images/logoimg/logo01.png"),
      mainCoinList: mainCoinModel,
      userData: this.userModel,
      tableData: [],
      contentId: 0,
      mainCoinId: "",
      nowTrade: [],
      tradeRecord: [],
      showLoading: false,
      showLoading_1: false,
      currentConInfo: false,
      myEntrustList: [],
      myHistoryEntrustList: [],
      latestBuyData: [],
      latestSoldData: [],
      historicalBuyData: [],
      buyFormData: {
        price: "",
        number: ""
      },
      //   最新行情
      currentCoinInfo:"",
      latestData: "",
      sellNum: "",
      buyNum: "",
      sellFormData: {
        price: "",
        number: ""
      },
      timer: null,
      iframUrl: "./static/kline.html?"
    };
  },
  computed: {
    //end
    buyTotal() {
      return this.Util.accMul(this.buyFormData.number, this.buyFormData.price);
    },
    sellTotal() {
      return this.Util.accMul(
        this.sellFormData.number,
        this.sellFormData.price
      );
    },
    //最新买入总计
    buyListTotal() {
      let total = 0;
      this.latestBuyData.map(item => {
        total += item.total * 1;
      });
      return total;
    },
    //最新卖出总计
    sellListTotal() {
      let total = 0;
      this.latestSoldData.map(item => {
        total += item.total * 1;
      });

      return total;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (webSocket) {
      webSocket.close();
      webSocket = null;
    }
    clearInterval(this.timer);
    this.timer = null;
    next();
  },
  mounted() {
    this.getMainCoin();
    this.upTopDdata();
  },
  methods: {
    // 撤单
    cancelOrder(id) {
      this.showLoading = true;
      this.request(this.api.clearentrust, { id: id, showLoading: true }).then(
        res => {
          console.log(`操作结果：${JSON.stringify(res)}`);
          if (res && res.code != "0") return this.getDataFaild(res.msg);
          this.successMsg(res.msg);
          this.delItemFromList(id, this.myEntrustList);
          this.showLoading = false;
        }
      );
    },
    // 删除列表某一项
    delItemFromList(id, listArr) {
      listArr.map((item, index) => {
        if (item.id == id) {
          listArr.splice(index, 1);
          return listArr;
        }
      });
    },
    //  更新最新列表
    updateLastestData(token, maincoin, tradecoin) {
      if ("WebSocket" in window) {
        this.updateListBySocket(token, maincoin, tradecoin);
      } else {
        this.updateListByAjax();
      }
    },
    // 通过socket 刷新数据
    updateListBySocket(token, maincoin, tradecoin) {
      console.log("浏览器支持websocket");
      if (webSocket) {
        webSocket.send(`${token}_${maincoin}_${tradecoin}`);
        return false;
      }
      webSocket = new WebSocket(
        `${this.api.socketUrl}${token ||
          randomString(32)}/${maincoin}_${tradecoin}`
      );
      webSocket.onopen = () => {
        console.log("socket 已经连接，可以发送数据");
        webSocket.send(`${token}_${maincoin}_${tradecoin}`);
        if (this.timer) clearInterval(this.timer);
      };
      // 接收数据
      webSocket.onmessage = event => {
        let msg = JSON.parse(event.data);
        this.latestData = msg.info[0];
        this.latestBuyData = this.Util.sumCalc(msg.buy, "price", "number");
        this.latestSoldData = this.Util.sumCalc(msg.sell, "price", "number");
        this.historicalBuyData = this.Util.sumCalc(msg.top, "price", "number");
      };
      webSocket.onerror = err => {
        console.log(err);
        this.updateListByAjax(maincoin, tradecoin);
      };
      webSocket.onclose = () => {
        console.log("socket 连接关闭");
      };
    },
    //通过ajax更新数据
    updateListByAjax(maincoin, tradecoin) {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (ajaxDone) {
          Promise.all([
            this.getEntrustData(maincoin, tradecoin),
            this.getHistoryData(maincoin, tradecoin)
          ]).then(res => {
            ajaxDone = true;
            this.myEntrustList = res[0];
            this.myHistoryEntrustList = res[1];
          });
          let params = {
            maincoin: maincoin,
            tradcoin: tradecoin
          };
          // 买入五档
          const buyOrder = this.request(this.api.buyorder, params);
          // 卖出五档
          const sellOrder = this.request(this.api.sellorder, params);
          // 交易记录
          const allOrder = this.request(this.api.gettoporder, params);
          Promise.all([buyOrder, sellOrder, allOrder])
            .then(res => {
              this.showLoading = false;
              ajaxDone = true;
              let [buyOrder, sellOrder, allOrder] = [...res];
              this.latestBuyData = this.Util.sumCalc(
                buyOrder.data.list,
                "price",
                "number"
              );
              this.latestSoldData = this.Util.sumCalc(
                sellOrder.data.list,
                "price",
                "number"
              );
              this.historicalBuyData = this.Util.sumCalc(
                allOrder.data.list,
                "price",
                "number"
              );
            })
            .catch(err => {
              console.log(err);
            });
        }
        ajaxDone = false;
      }, 3000);
    },
    // 获取主币种
    getMainCoin() {
      this.request(this.api.getmaincoin)
        .then(res => {
          if (res.code == "0") {
            this.mainCoinId = res.data.list[0].coinid;
            return this.getConiInfo(this.mainCoinId);
          }
        })
        .then(res => {
          if (JSON.stringify(this.$route.query) != "{}") {
            // 获取url 中币种的名称
            this.currentConInfo = {
              coinid: this.$route.query.coinid,
              maincoinid: this.$route.query.maincoinid
            };
          }
          if (this.currentConInfo) {
            this.Util.setCookie("maincoinname", this.currentConInfo.maincoinid);
            this.Util.setCookie("tradcoinname", this.currentConInfo.coinid);
            this.iframUrl = `${this.iframUrl}t=${new Date().getTime()}`;
            this.updateLastestData(
              this.storage.get("token"),
              this.currentConInfo.maincoinid,
              this.currentConInfo.coinid
            );
            let { coinid, maincoinid } = this.currentConInfo;
            this.showLoading_1 = true;
            Promise.all([
              this.getEntrustData(maincoinid, coinid),
              this.getHistoryData(maincoinid, coinid)
            ]).then(res => {
              ajaxDone = true;
              this.showLoading_1 = false;
              this.myEntrustList = res[0];
              this.myHistoryEntrustList = res[1];
            });
          }
        });
    },
    // 0423修改
    upTopDdata(){
      // 刷新top栏目数据
      if (JSON.stringify(this.$route.query) != "{}") {
            // 获取url 中币种的名称
            this.currentConInfo = {
              coinid: this.$route.query.coinid,
              maincoinid: this.$route.query.maincoinid
            };
      }
      this.request(this.api.searchcoin, { maincoin:this.currentConInfo.maincoinid, tradcoin:this.currentConInfo.coinid }).then(
        res => {
          this.currentCoinInfo = res.data.list[0];
      })
    },
    // 获取当前委托
    getEntrustData(maincoin, tradecoin) {
      if (this.userData.isLogin) {
        return this.request(this.api.getentrust, {
          maincoin: maincoin,
          tradcoin: tradecoin
        }).then(res => {
          if (res.code == "0") {
            return Promise.resolve(res.data.list);
          } else {
            this.errMsg(res.msg);
          }
        });
      }
    },
    // 获取历史委托
    getHistoryData(maincoin, tradecoin) {
      if (this.userData.isLogin) {
        return this.request(this.api.gethistoryorder, {
          maincoin: maincoin,
          tradcoin: tradecoin
        }).then(res => {
          if (res.code == "0") {
            return Promise.resolve(res.data.list);
            console.log(res.data);

          } else {
            this.errMsg(res.msg);
          }
        });
      }
    },
    // 交易币种列表点击-----》top菜单点击切换币种
    onTableRowClick(data) {
      if (data) {
        this.currentConInfo = data;
        console.log(data.coinid);
        // 0404 修改切换路由的路径  kline_trade?maincoinid=USDT&coinid=ETH
        this.$router.replace(`/kline_trade?maincoinid=${data.maincoinid}&coinid=${data.coinid}`);
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          window.location.reload();
          loading.close();
        }, 2000);
        // 0404新改的跳转
        this.upTopDdata();
        this.getMainCoin();
        return
        //
        this.Util.setCookie("maincoinname", this.currentConInfo.maincoinid);
        this.Util.setCookie("tradcoinname", this.currentConInfo.coinid);
        this.iframUrl = `${this.iframUrl}t=${new Date().getTime()}`;
        // 获取委托历史数据
        Promise.all([
          this.getEntrustData(data.maincoinid, data.coinid),
          this.getHistoryData(data.maincoinid, data.coinid)
        ]).then(res => {
          this.myEntrustList = res[0];
          this.myHistoryEntrustList = res[1];
        });
        this.updateLastestData(
          this.storage.get("token"),
          data.maincoinid,
          data.coinid
        );
      }
    },
    // 交易币种切换
    tabChange(data) {
      this.mainCoinId = data.coinid;
      console.log("币种切换"+this.mainCoinId);

      this.getConiInfo(this.mainCoinId).then(res => {
        if (res.code == "0") {
          let { coinid, maincoinid } = this.currentConInfo;
          this.Util.setCookie("maincoinname", this.currentConInfo.maincoinid);
          this.Util.setCookie("tradcoinname", this.currentConInfo.coinid);
          this.iframUrl = `${this.iframUrl}t=${new Date().getTime()}`;
          Promise.all([
            this.getEntrustData(maincoinid, coinid),
            this.getHistoryData(maincoinid, coinid)
          ]).then(res => {
            this.myEntrustList = res[0];
            this.myHistoryEntrustList = res[1];
          });
          this.updateLastestData(this.storage.get("token"), maincoinid, coinid);
        }
      });
    },
    // 切换委托记录内容
    changeTable(index) {
      this.contentId = index;
    },
    // 获取自定义币种
    getCustomList() {
      let customList = this.storage.get("customList");
      this.mainCoinId = "opt";
      if (customList) {
        this.tableData = customList;
      } else {
        this.tableData = [];
      }
    },
    // 添加自定义币种
    addMylist(rowData, index) {
      let data = rowData;
      this.$set(this.tableData, index, data);
      data.isMyLike = !data.isMyLike;
      if (data.isMyLike) {
        addCustomList(data);
      } else {
        if (this.currentId == "opt") {
          this.tableData = removeCustomList(data);
        } else {
          removeCustomList(data);
        }
      }
    },
    // 获取币种信息---?交易子币种
    getConiInfo(maincoin) {
      this.showLoading = true;
      return this.request(this.api.getTradCoin, {
        maincoin: maincoin
      }).then(res => {
        this.showLoading = false;
        if (res && res.code != "0") {
          this.getDataFaild(res.msg);
          return false;
        } else if (res.data && res.data.list) {
          this.tableData = matchCustomList(res.data.list);
          console.log(this.tableData);
          this.currentConInfo = this.tableData[0];
          return Promise.resolve(res);
        }
      });
    },
    // 买入操作
    handleBuy() {
      if (!this.userData.isLogin) {
        this.errMsg("请登录后操作");
        return;
      }
      if (this.buyFormData.number == "" || this.buyFormData.price == "") {
        this.errMsg("请填写完整信息");
        return;
      }
      if (isNaN(this.buyTotal) || this.buyTotal == 0) {
        this.errMsg("请输入有效的数量或价格");
        return;
      }
      this.request(this.api.forbuy, {
        maincoin: this.currentConInfo.maincoinid,
        tradcoin: this.currentConInfo.coinid,
        number: this.buyFormData.number,
        prise: this.buyFormData.price
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg);
          this.getEntrustData(
            this.currentConInfo.maincoinid,
            this.currentConInfo.coinid
          ).then(res => {
            if (res.code == "0") {
              this.myEntrustList = res.data.list;
              this.getCustomList();
            }
          });
        } else {
          this.errMsg(res.msg);
        }
      });
    },
    // 卖出操作
    handleSell() {
      if (!this.userData.isLogin) {
        this.errMsg("请登录后操作");
        return;
      }
      if (this.sellFormData.number == "" || this.sellFormData.price == "") {
        this.errMsg("请填写完整信息");
        return;
      }
      if (isNaN(this.sellTotal) || this.sellTotal == 0) {
        this.errMsg("请输入有效的数量或价格");
        return;
      }
      // 买入操作
      this.request(this.api.forsell, {
        maincoin: this.currentConInfo.maincoinid,
        tradcoin: this.currentConInfo.coinid,
        number: this.sellFormData.number,
        prise: this.sellFormData.price
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg);
          this.getEntrustData(
            this.currentConInfo.maincoinid,
            this.currentConInfo.coinid
          ).then(res => {
            if (res.code == "0") {
              this.myEntrustList = res.data.list;
              this.getCustomList();
            }
          });
        } else {
          this.errMsg(res.msg);
        }
      });
    },
    //买入/卖出五档图列表点击
    onLatestLiClick(data, id) {
      switch (id) {
        case 1:
          this.sellNum = data.number;
          this.sellFormData.price = data.price * 1;
          this.sellFormData.number = data.number * 1;
          break;
        case 2:
          this.buyNum = data.number;
          this.buyFormData.price = data.price * 1;
          this.buyFormData.number = data.number * 1;
          break;
      }
    },
    //改变数量
    changeNum(val, id) {
      switch (id) {
        case 1:
          this.buyFormData.number = this.Util.accMul(this.buyNum, val);
          break;
        case 2:
          this.sellFormData.number = this.Util.accMul(this.sellNum, val);
          break;
      }
    },
    // K线数据
    // 最新交易信息
  }
};
</script>
<style lang="scss">
.header-dark {
  .hd-top {
    padding: 0 10px;
    background-color: #303644;
    border-bottom: 1px solid #303644;
    box-sizing: border-box !important;
  }
}
</style>

<style lang="scss" scoped>
.main {
  background: #000;
  color:#fff;
}
span.color-success{
    color:$color-success !important;
}
span.color-danger{
    color:$color-danger !important;
}
.no-login {
  line-height: 100px;
  text-align: center;
}
.k-line-top {
  height: 100%;
  ul {
    overflow: hidden;
    li {
      height: 100%;
      line-height: 40px;
      float: left;
    }
  }
}
.entr-content{
        height: calc(100% - 31px);
    }
.entr-body{
    max-height: calc(100% - 40px);
    overflow-y: auto;
    .no-data{
        line-height: 60px;
        text-align: center;
    }
}
.mark-name {
  line-height: 40px;
  height: 40px;
  color: #fff;
  margin: 0 20px;
  font-size: 16px;
  float: left;
  cursor: pointer;
  &:hover .table {
    display: block;
  }
  .table {
    display: none;
    top: 40px;
    width: 900px;
    z-index: 999;
    background-color: #1c212c;
    left: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 5px 0px;
    opacity: 1;
    box-shadow: 1px 1px 1px #222;
  }
  .tr {
    font-size: 14px;
    .td {
      flex: 2;
      &:first-child {
        flex: 1;
      }
    }
  }
  .thead {
    background: #202531;
    font-weight: bold;
    span {
      display: inline-block;
      width: 100px;
      @include textVcenter(30px);
      font-size: 15px;
      text-align: center;
      border-bottom: 2px solid transparent;
      &.active {
        border-bottom: 2px solid #4b90e2;
        color: #4b90e2 !important;
      }
    }
  }
  .tbody {
    max-height: 300px;
    overflow-y: auto;
    .tr {
      &:nth-child(odd) {
        background: #252b38;
      }
      &:nth-child(even) {
        background: #202531;
      }
    }
    img {
      margin-right: 15px;
    }
  }
}
.main-body {
  padding-right: 10px;
  height: calc(100% - 40px);
  padding-top: 8px;
  box-sizing: border-box;
  .k-map {
    height: 67.5%;
    overflow: hidden;
  }
  .map-wrap {
    width: 71.35%;
    background: #252b38;
    height: 100%;
  }
  .trade-panel {
    float: right;
    width: calc(28.65% - 10px);
    height: 100%;
  }
  .bottom {
    height: 32.5%;
    box-sizing: border-box;
    padding-top: 10px;
    .record {
      float: left;
      width: 71.35%;
      height: 100%;
      background: #252b38;
      color: #fff;
    }
    .form-wrap {
      float: right;
      width: calc(28.65% - 10px);
      height: 100%;
      background: #252b38;
    }
  }
}
.newprice {
  height: 40px;
  line-height: 40px;
}
.price {
  > div {
    color: #f5f5f5;
    margin: 0 30px;
    font-size: 14px;
  }
  .label {
    color: #888;
  }
  em::first-child {
    margin-right: 5px;
  }
  .tag {
    color: #888;
    font-size: 18px;
  }
}
.table-content {
  width: 100%;
  .td {
    text-align: center;
  }
}
.logo {
  width: 100px;
  float: left;
  margin: 9px 15px 0 0;
}
.trade-table {
  height: 100%;
  background: #252b38;
  width: calc(50% - 5px);
  .trade-head {
    color: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 6px;
    background: darkslategrey;
  }
  .table-no-data{
    height: 260px;
  }
}
.tb-left {
  max-height: 288px;
  overflow-y: auto;
}
.tb-right {
  max-height: calc(100% - 28px);
  overflow-y: auto;
}
.tr-mPrice {
  flex: 1;
}
.entrust_btn {
  height: 30px;
  width: 100%;
  border-bottom: 1px solid #333;
  .btn {
    height: 24px;
    line-height: 24px;
    padding: 0px 20px;
    /* background-color: #2f2c2c; */
    color: #fff;
    float: left;
    margin-left: 10px;
    font-size: 13px;
    margin-top: 3px;
    cursor: pointer;
    &.click {
      border-bottom: 2px #fff solid;
      color: #fff;
    }
  }
}
.entr-head {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #000;
}
.entr-body {
  .row {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #444;
  }
}
.tr-name {
  flex: 1;
}
.tr-vol {
  flex: 1;
  text-align: right;
}
.trade-body {
  li {
    padding: 0 5px;
    line-height: 26px;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    &:first-child {
      border-top: none !important;
    }
    &:hover {
      border-top: 1px solid #555;
      border-bottom: 1px solid #555;
    }
    color: #fff;
    span {
      display: block;
    }
  }
  .progress {
    height: 100%;
    right: 0;
    width: 50%;
    background: #000;
    opacity: 0.4;
  }
}
.transaction-tabs {
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #242e47;
}
.transaction-tabs li.selected {
  color: #fff;
  border-bottom: 2px solid #fff;
}

.transaction-tabs li {
  float: left;
  height: 90%;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  padding: 0 5px;
  margin: 0 5px;
}
.transaction-content{
    overflow: hidden;
    height: calc(100% - 36px);
    .form{
        height: 100%;
        float::left;
        width:50%;
        box-sizing: border-box;
        padding: 0 10px;
    }
}
.transaction-content p {
	height: 25px;
	padding: 5px 0;
	line-height: 20px;
	font-size: 12px;
}

.transaction-content p.transaction-title .t-title {
	font-size: 14px;
}

.transaction-content p.transaction-title .transaction-money {
	float: right;
}

.transaction-content p label.xjTxt {
	display: inline-block;
	width: 45px;
}

.transaction-input input {
	height: 30px;
	margin-right: 5px;
	width: 100%;
	text-indent: 5px;
	border: 1px solid #415480;
	border-radius: 4px;
	background: #242e47;
	color: #ddd;
}

.percentage {
	padding: 3px 14px;
	border: 1px solid #415480;
	color: #ddd;
	cursor: pointer;
	border-radius: 5px;
	// margin-right: 5.6px;
	width: 20%;
}

.transaction-content p.transaction-button {
	padding: 0;
	height: 48px;
}

.transaction-sell .button-jy {
	background: #72ba5f;
}

.transaction-button .button-jy {
	width: 100%;
	height: 48px;
	line-height: 48px;
	text-align: center;
	font-size: 16px;
	color: #fff;
	cursor: pointer;
	border-radius: 3px;
	opacity: 1;
	display: block;
	cursor: pointer;
}

.transaction-buy,
.transaction-sell {
	float: left;
	width: 240px;
	padding: 0 10px;
}

.transaction-buy .button-jy {
	background: #de6565;
}

.transaction-title,
.transaction-treadNum {
	height: 17px !important;
	padding-left: 4px !important;
}
// .seamless-warp {
//         height: 350px;
//         overflow: hidden;
//     }
</style>
