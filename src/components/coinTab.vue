<template>
  <div class="mod coin-switch">
    <!-- {{coinListdata[0]}} -->
    <div class="tabs coin-switch-tabs">
      <div class="quotes">
        <span class="mock-a fav" @click="getCustomList()" :class="currentCoinId=='opt'?'active':''">
          <!---->
          <em>自选</em>
        </span>
        <span class="mock-a upper" v-for="(item,index) in mainCoinList"
          :key="index" :class="currentCoinId==item.coinname?'active':''" @click="clickTab(item)"
        >{{item.coinname}}</span>
      </div>
      <!-- 币种搜索 -->
      <div class="actions-serch flex" >
        <div class="input-box" >
          <input placeholder="搜索" maxlength="9"  type="text" />
          <i class="el-icon-search i_sos" ></i>
          <i class="hb_icon_clear" style="display:none" ></i>
        </div>
        <button class="btnexch upper" @click="showCny()">
          <i class="iconfont icon-yqfqiehuan" ></i>CNY
        </button>
      </div>
    </div>
    <!--币种列表 -->
      <div class="coin-switch-content coin_list">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%;background-color:#171b2b;"
            :default-sort = "{prop: 'date', order: 'descending'}"
              height="710"
              header-align='right'
              @row-click='onTableRowClick'
            >
            <el-table-column
              prop="coin"
              label="币种"
              sortable
              width="90">
              <template slot-scope="scope" >
                <div class="left_coinname flex" >
                        <div
                            @click="addMylist(scope.row,scope.$index)"
                            :title="$t('label109')"
                            class="option wh-full"
                          >
                            <i
                              class="icon-star font-16 "
                              :class="scope.row.isMyLike?'el-icon-star-on star_active':'el-icon-star-off star_deft'"
                            >
                            </i>
                        </div>
                        <P :class="scope.row.tradcoin==setion_tradcoin?'trad_active':''">{{scope.row.tradcoin}}</P>
                      </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="最新价"
              sortable
              width="90"
              align="right"
              >
              <template slot-scope="scope" >
                <p class="currency" v-if="usdtorcny==1">{{ scope.row.price }}</p>
                <p class="currency" v-else>{{ scope.row.cny }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="rise"
              label="涨幅 "
              :formatter="formatter"
              width="100"
              align="right"
              >
              <template slot-scope="scope">
                      <span :class="scope.row.rise >= '0' ? 'color_up' : 'color_down'"
                      v-if="scope.row.rise>=0">+{{scope.row.rise}}%</span>
                      <span :class="scope.row.rise < '0' ? 'color_down' : 'color_up'"
                      v-if="scope.row.rise<0">{{scope.row.rise}}%</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
  </div>
</template>
<script>
import mainCoinModel from "@/js/allCoinModel.js";
// import {
//   addCustomList,
//   removeCustomList,
//   matchCustomList
// } from "@/assets/js/common.js";
export default {
  name: "coin-Tab",

  props:[
    "coinListdata",//socket 接收父组件数据
  ],

  data() {
    return {
      mainCoinModel: mainCoinModel,
      currentId: 0,
      tableData: null,
      showLoading: true,
      activeName: "second",

      topMenu:[
        {mname:'全部行情',enname:'main',index:'0'}, {mname:'主板',enname:'main',index:'1'},{mname:'创新版',enname:'pioneer',index:'2'},
      ],
      mainCoinList:[
        {coinname:'USDT',id:'0',},{coinname:'ETH',id:'1',},{coinname:'BTC',id:'2',}
      ],
      setion_tradcoin:'',
      seeDta:{},
      maincoin:'USDT',//usdt
      tradcoin:'',//xrp
      areaID:'main',
      cointabID:'0',
      rightTopInfo:{},
      currentCoinId:'USDT',
      resArr:[],
      usdtorcny:1,
      websocket2:null,
    };
  },
  destroyed: function() {
    if(this.timer) { //如果定时器在运行则关闭
      clearInterval(this.timer);
    }
    this.websocket2.close();
　},
  beforeDestroy () {
    if (this.timer) clearInterval(this.timer);
  },

  created(){
    if (this.$route.query.maincoinid) {
      this.areaID=this.$route.query.areaid;
      this.maincoin=this.$route.query.maincoinid;
      this.tradcoin=this.$route.query.coinid;
      this.setion_tradcoin=this.$route.query.coinid;
      this.PostData={
        maincoin:this.maincoinid,
        tradcoin:this.coinid,
        areaID:this.areaid,
        top:this.Datatop,
      }
      this.currentCoinId=this.maincoin;
      // this.getmaincoin(this.areaid);
    }else{
      this.currentCoinId='USDT';
      // this.getarea();
    }
  },
  mounted() {
    //this.getsymbols(this.areaID,this.maincoin);
  },
  destroyed() {},
  methods: {
    formatter(row, column) {
        return row.rise;
    },
    // 获取自选
    getCustomList() {
      // let customList = this.storage.get("customList");
      // this.currentId = "opt";
      // customList && customList.length > 0 && (this.tableData = customList);
    },
    // 添加自选
    addMylist(rowData, index) {
      // let data = rowData;
      // this.$set(this.tableData, index, data);
      // data.isMyLike = !data.isMyLike;
      // if (data.isMyLike) {
      //   addCustomList(data);
      // } else {
      //   if (this.currentId == "opt") {
      //     this.tableData = removeCustomList(data);
      //   } else {
      //     removeCustomList(data);
      //   }
      // }
    },
    clickTab(item){
      // this.websocket2.close();
      // this.currentCoinId=item.coinname;
      // this.maincoin=item.coinname;
      // this.storage.set("maincoin", this.maincoin);
      // var areaID='';
      // if(this.currentCoinId==1||this.currentCoinId==0){
      //   areaID='main';
      // }else if (this.currentCoinId==2){
      //   areaID='pioneer';
      // }
      // return this.getsymbols(areaID,this.maincoin);
    },
    // 币种列表
    getsymbols(areaID,maincoin){
      // this.tableData=[];
      // var areaID=this.areaID;
      // var maincoin =maincoin;
      // console.log(areaID+maincoin);

      // this.request(this.api.symbols).then(res => {
      //   // console.log(`交易币种:${JSON.stringify(res)}`);
      //   if(res.code==0&&res.data.length>0){
      //     this.resArr=res.data;
      //     console.log('areaID'+areaID,maincoin);
      //     var newArr = this.resArr.filter(function (obj) {
      //         return obj.plate== areaID;
      //     });
      //     console.log('plate主板pioneer数据'+newArr);
      //     var newArr2 = newArr.filter(function (obj) {
      //         return obj.maincoin== maincoin;
      //     });
      //     this.tableData=newArr2;
      //     // sessionStorage.setItem('quotationDetailsData',JSON.stringify(this.tableData[0]));
      //     if(this.tableData==''){
      //       return
      //     }
      //     this.tradcoin=this.tableData[0].tradcoin;
      //     this.rightTopInfo=this.tableData[0];
      //     // 查询列表第一条右侧数据
      //     this.seeDta={
      //       area:this.area,
      //       maincoin:this.maincoin,
      //       coin:this.tradcoin
      //     }
      //     console.log(this.seeDta);
      //     this.initWebSocket(areaID,maincoin);
      //     return this.seeDta
      //   }else{
      //     this.tableData=[];
      //     this.rightTop=[];
      //   }
      // });
    },
    //表格列点击
    onTableRowClick(rowData) {
      // this.$emit("onRowClick", rowData);
      // sessionStorage.setItem('quotationDetailsData',JSON.stringify(rowData));
      const link ='currency_trade?maincoinid='+rowData.maincoin+'&coinid='+rowData.tradcoin+'&areaid='+rowData.plate;
      // // this.navigateTo(link);
      // this.websocket2.close();
      // // 刷新
      // this.$router.replace(link);
      //   const loading = this.$loading({
      //     lock: true,
      //     text: 'Loading',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });
      //   setTimeout(() => {
      //     window.location.reload();
      //     loading.close();
      //   }, 2000);

    },
    toTrad(){
      const link ='currency_trade?maincoinid='+this.maincoin+'&coinid='+this.tradcoin+'&areaid='+this.areaID;
      this.navigateTo(link);

    },
    showCny(){
      if(this.usdtorcny==1){
        this.usdtorcny=2;
      }else{
        this.usdtorcny=1;
      }
    },
    initWebSocket(areaID,maincoin){ //初始化
    // let userNo = new Date().getTime() + Math.floor(Math.random()*1000 + 1);
    //   // 02 首页，行情也刷新行情 ->币种行情数据更新
    //   this.websocket2 = new WebSocket(`${this.api.socketUrl}/ws/symbols/${userNo}`);
    //   this.websocket2.onopen = () =>{
    //     console.log("WebSocket连接成功");
    //   };
    //   this.websocket2.onmessage = (res)=>{ //数据接收
    //     //处理逻辑
    //     let data = JSON.parse(res.data)
    //     this.processingDataList(data.symbols,areaID,maincoin);

    //   }
    //   this.websocket2.onerror = (e) =>{ //错误
    //     console.log(e);
    //     console.log("WebSocket连接发生错误");
    //   };
    //   this.websocket2.onclose=function(e){
    //     console.log('关闭了');
    //     //关闭TCP连接
    //   };
    },
    processingDataList(coinListdata,areaID,maincoin){
    //   var areaID=this.areaID;
    //   var maincoin = maincoin;
    //   console.log(areaID+maincoin);

    //   if(coinListdata){
    //     this.resArr=coinListdata;
    //     console.log(this.resArr);

    //     // this.resArr=res.data;
    //       console.log('areaID'+areaID,maincoin);
    //       var newArr = this.resArr.filter(function (obj) {
    //           return obj.plate== areaID;
    //       });
    //       console.log('plate主板pioneer数据'+newArr);
    //       var newArr2 = newArr.filter(function (obj) {
    //           return obj.maincoin== maincoin;
    //       });
    //       this.tableData=newArr2;
    //       // sessionStorage.setItem('quotationDetailsData',JSON.stringify(this.tableData[0]));
    //       if(this.tableData==''){
    //         return
    //       }
    //       this.tradcoin=this.tableData[0].tradcoin;
    //       this.rightTopInfo=this.tableData[0];
    //   }
    }
  }
};
</script>
<style lang="scss" scoped>
.coin-switch {
  box-sizing: border-box;
  background: #171b2b;
  height: 100%;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex: auto;
  flex: auto;
  padding-bottom: 0;
  .quotes {
    display: flex;
    min-height: 28px;
    span{cursor: pointer;}
  }
  .mock-a {
    color: #b0b8db;
    height: 20px;
    font-size: 12px;
    line-height: 22px;
    padding: 0 6px;
    margin: 0 4px 4px 0;
    border-radius: 2px;
    border-bottom: 0;
    text-transform: uppercase;
    &.active {
      color: #ffffff;
      background-color: #357ce1;
    }
  }
  .tabs {
    padding: 8px 8px 8px 10px;
    display: block;
    height: auto;
    border-radius: 2px 2px 0 0;
    border: 0;
  }
  // 搜索框
  .actions-serch{
    .input-box{
      height: 26px;
      position: relative;
      input{
        background: #171b2b;
        border-color:#383f66;
        color: #d2d6ec;
        padding-left: 28px;
        border: 1px solid #383f66;
        border-radius: 2px;
        font-size: 12px;
        width: 100%;
        height: 100%;

      }
    }
    .i_sos{position: absolute;left: 5px;top: 6px;}
    .btnexch{
      padding-left: 40px;font-size: 14px;
      i{font-size: 16px;margin-right: 5px;}
    }
  }
  // coin_list
  .coin_list{
    tr{font-size: 12px!important;}
    p,span{font-size: 12px;}
    .el-table .cell{
      p{text-align: right;color: #b0b8db;}
      .trad_active{color: #357ce1;}
    }

  }
  .left_coinname{
    .option {width: 24px;}
    .star_active{color:#357ce1;}
  }
}

@media screen and (max-width:1440px) {
  .coin-switch .mock-a {
    padding: 0 2px;
    height: 18px;line-height: 18px;
  }
}

</style>
