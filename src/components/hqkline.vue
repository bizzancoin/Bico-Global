<template>
  <div ref="divklinechart" style="height:800px">
    <!--k线周期-->
    <div class="tabs kLineTabs blockBg" ref="divperiod">
      <p class="tabsTitle">
        <span
          v-for="(item,index) in Period.Menu"
          :key="index"
          :class="{active : item.Name == Period.SelItem.Name}"
          @click="ChangePeriod(item)"
        >{{item.Name}}</span>
      </p>
    </div>

    <!-- k线图 -->
    <div class="klineWrap" id="kline" ref="divkline" v-show="KLine.IsShow"></div>
    <div class="klineWrap" id="kline" ref="divkminute" v-show="Minute.IsShow"></div>

    <!-- k线图指标 -->
    <!-- <div class="indexWrap" ref="divindex" v-show="Index.IsShow">
      <span
        :key="index2"
        v-for="(item,index2) in Index.Menu"
        @click="ChangeIndex(item)"
        class="indexItem"
      >{{item.Name}}</span>
    </div> -->
  </div>
</template>

<script>
import HQChart from "hqchart";
import { klineApi } from '@/api/getData'
// import mainCoinModel from "@/js/allCoinModel.js";

var JSCommon = HQChart.Chart;

function DefaultData() {}

DefaultData.GetKlineOption = function() {
  let data = {
    Type: "历史K线图",
    //窗口指标
    Windows: [
      { Index: "均线", Modify: false, Change: false },
      { Index: "VOL", Modify: false, Change: false },
      // { Index: "RSI", Modify: false, Change: false }
    ],
    //Symbol: '600000.sh',
    IsAutoUpdate: true,
    AutoUpdateFrequency: 10000, //数据更新频率 ms

    IsShowRightMenu: false, //右键菜单
    IsApiPeriod: true, //使用Api计算周期

    IsClickShowCorssCursor: true, //手势点击出现十字光标
    IsCorssOnlyDrawKLine: true, //十字光标在K线中间
    CorssCursorTouchEnd: true, //手势离开屏幕十字光标自动隐藏
    EnableScrollUpDown: true, //允许手势上下操作滚动页面
    CorssCursorInfo: { Left: 0, Right: 2, Bottom: 1, IsShowCorss: true }, //十字光标刻度设置 Left, Right, Bottom十字光标刻度显示设置 0=不显示 1=现在在框外 2=显示在框内

    KLine: {
      DragMode: 1, //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
      Right: 1, //复权 0 不复权 1 前复权 2 后复权
      Period: 0, //周期 0 日线 1 周线 2 月线 3 年线
      MaxReqeustDataCount: 1000, //日线数据最近1000天
      MaxRequestMinuteDayCount: 15, //分钟数据最近15天
      PageSize: 100, //一屏显示多少数据
      IsShowTooltip: false //是否显示K线提示信息
    },
    //标题设置
    KLineTitle: {
      IsShowName: false, //不显示股票名称
      IsShowSettingInfo: false //不显示周期/复权
    },
    //边框
    Border: {
      Left: 0, //左边间距
      Right: 1, //右边间距
      Top: 20,
      Bottom: 20
    },
    //子框架设置
    Frame: [
      { SplitCount:6,Height:4, IsShowLeftText: false,IsShowRightText:true, Custom: [{ Type: 0 }] },
      { SplitCount: 3,Height:2, IsShowLeftText: false,IsShowRightText:true },
      { SplitCount: 3,Height:2, IsShowLeftText: false ,IsShowRightText:false}
    ],
     //0=柱子宽度  1=间距
    ZOOM_SEED:[
    [48,10],	[44,10],
    [40,9],     [36,9],
    [32,8],     [28,8],
    [24,7],     [20,7],
    [18,6],     [16,6],
    [14,5],     [12,5],
    [8,4], [6,4], [4,4],

    [3,3],
    [3,1], [2,1], [1,1], [1,0],
  ],


    ExtendChart: [{ Name: "KLineTooltip" }] //tooltip十字光标提示信息
  };
  return data;
};

DefaultData.GetKMinuteOption = function() {
  let data = {
    Type: "历史K线图",
    //窗口指标
    Windows: [
      { Index: "EMPTY", Modify: false, Change: false, TitleHeight: 0 },
      { Index: "VOL", Modify: false, Change: false }
    ],
    //Symbol: '600000.sh',
    IsAutoUpdate: true,
    AutoUpdateFrequency: 1000, //数据更新频率 ms

    IsShowRightMenu: false, //右键菜单
    IsApiPeriod: true, //使用Api计算周期

    IsClickShowCorssCursor: true, //手势点击出现十字光标
    IsCorssOnlyDrawKLine: true, //十字光标在K线中间
    CorssCursorTouchEnd: true, //手势离开屏幕十字光标自动隐藏
    EnableScrollUpDown: true, //允许手势上下操作滚动页面
    CorssCursorInfo: { Left: 0, Right: 2, Bottom: 1, IsShowCorss: true }, //十字光标刻度设置 Left, Right, Bottom十字光标刻度显示设置 0=不显示 1=现在在框外 2=显示在框内

    KLine: {
      DragMode: 1, //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
      Right: 1, //复权 0 不复权 1 前复权 2 后复权
      Period: 4, //周期 0 日线 1 周线 2 月线 3 年线
      MaxReqeustDataCount: 1000, //日线数据最近1000天
      MaxRequestMinuteDayCount: 15, //分钟数据最近15天
      PageSize: 100, //一屏显示多少数据
      IsShowTooltip: false, //是否显示K线提示信息
      DrawType: 4,

    },
    //标题设置
    KLineTitle: {
      IsShowName: false, //不显示股票名称
      IsShowSettingInfo: false //不显示周期/复权
    },
    //边框
    Border: {
      Left: 0, //左边间距
      Right: 1, //右边间距
      Top: 1,
      Bottom: 20
    },
    //子框架设置
    Frame: [
      { SplitCount: 3, IsShowLeftText: false, Custom: [{ Type: 0 }] },
      { SplitCount: 3, IsShowLeftText: false },
      { SplitCount: 3, IsShowLeftText: false }
    ],

    ExtendChart: [{ Name: "KLineTooltip" }] //tooltip十字光标提示信息
  };
  return data;
};


DefaultData.GetPeriod = function() //周期菜单
{
  var data = [
    { Name: "分时", Period: 4, Type: 0, Min: '1min' },
    { Name: "1", Period: 4, Type: 0, Min: '1min' },
    { Name: "5", Period: 5, Type: 0, Min: '5min' },
    { Name: "15", Period: 6, Type: 0, Min: '15min' },
    { Name: "30", Period: 7, Type: 0, Min: '30min' },
    { Name: "1H", Period: 8, Type: 0, Min: '60min' },
    { Name: "4H", Period: 12, Type: 0, Min: '4hour' },

    { Name: "D", Period: 0, Type: 1, Min: '1day' },
    // {Name:'W', period:0,Type:1,Min:'1week'}
    // { Name: "W", Period: 1, Type: 2, Min:' 1week' },
    // { Name: "M", Period: 2, Type: 3, Min: '1mon' },
    // { Name: "Y", Period: 3, Type: 3, Min: '1year' }
  ];

  return data;
};

DefaultData.GetIndexMenu = function() //指标菜单配置
{
  var data =
    //ID=指标ID Name=菜单显示的名字  WindowIndex=切换指标对应的窗口索引
    [
      // {Name:'KDJ', ID:'KDJ', WindowIndex:1 },
      // {Name:'MACD', ID:'MACD', WindowIndex:2 },
      // {Name:'RSI', ID:'RSI', WindowIndex:1 },
      // {Name:'BOLL', ID:'BOLL', WindowIndex:0 },
      // {Name:'VOL', ID:'VOL', WindowIndex:1 },
      // {Name:'均线', ID:'均线', WindowIndex:0 },
    ];

  return data;
};
  // //柱子缩放
  DefaultData.GetKLineZoom = function() {
     //新的K线宽度和间距设置
    let NEW_ZOOM_SEED=      //0=柱子宽度  1=间距
    [
        [48,10],	[44,10],
        [40,9],     [36,9],
        [32,8],     [28,8],
        [24,7],     [20,7],
        [18,6],     [16,6],
        [14,5],     [12,5],
        [8,4], [6,4], [0,1],
    ];

    zoom.length=0;
    for(var i=0;i<NEW_ZOOM_SEED.length;++i) //发新的缩放配置设置到hqchart全局变量里面
    {
        zoom.push(NEW_ZOOM_SEED[i]);
    }

  };
export default {
  name: "BitKLine",

  props: [
    "DefaultPairName", //代码
    "DefaultName", //名称
    "DefaultfloatPrecision", //小数位数
    "DefaultPeriod", //周期
    "type",//类型  两个：名称以及类型最为重要
  ],

  data() {
    return {
      Symbol: "BTC/USDT.bit",
      Name: "",
      symboltype:1,//永续或者币币
      PairName: "BTC/USDT", //货币代码
      FloatPrecision: 2, //品种的小数位数

      // mainCoinModel: mainCoinModel,

      historyTime1:'',
      historyTime2:'',

      //K线
      KLine: {
        JSChart: null,
        Option: DefaultData.GetKlineOption(),
        IsShow: true,
        IsShowMaxMinPrice:true,
      },

      //分时 (使用K线面积图来做分时图)
      Minute: {
        JSChart: null,
        Option: DefaultData.GetKMinuteOption(),
        IsShow: false
      },

      //周期菜单
      Period: {
        Menu: DefaultData.GetPeriod(), //菜单项
        SelItem: DefaultData.GetPeriod()[15] //当前选中
      },

      //指标菜单
      Index: {
        Menu: DefaultData.GetIndexMenu(), //菜单项
        SelItem: DefaultData.GetIndexMenu()[0],
        IsShow: true
      },
    };
  },
  destroyed(){
    console.log(11111111111);

    this.KLine.JSChart.StopAutoUpdate();
    // window.clearInterval(this.interval);
  },
  created() {
    //
    if (this.DefaultPairName) {
        this.PairName  = this.DefaultPairName;
        console.log('241++++PairName'+this.PairName );
      // this.getTradCoin(mainCoinModel.coinid);
      // this.currentId = mainCoinModel.coinid;
      // return;
    }

    // if (this.DefaultPairName) this.PairName = this.DefaultPairName;
    if (this.DefaultName) this.Name = this.DefaultName;
    if (this.type) {this.symboltype = this.type;console.log("symboltype:"+this.symboltype)}

    if (this.DefaultfloatPrecision)
      this.FloatPrecision = parseInt(this.DefaultfloatPrecision);
    if (this.DefaultPeriod) {
      var periodItem = this.GetPeriodInfo(this.DefaultPeriod);
      if (periodItem) this.Period.SelItem = periodItem;
    }
    this.Symbol = this.PairName + ".BIT";

    console.log('symbol-name'+this.Symbol);


  },

  mounted() {
    //配置颜色  https://blog.csdn.net/jones2000/article/details/90286933
    var resource = JSCommon.JSChart.GetResource();

    resource.DownBarColor='rgb(209, 75, 100)';//需改刻度的输出字体
    resource.UpBarColor='rgb(4, 173, 143)';//刻度颜色
    resource.DownTextColor='rgb(209, 75, 100)';//鼠标移动K线指标，K线上状态栏显示的文字颜色
    resource.UpTextColor='rgb(4, 173, 143)';
    // 新加配置-颜色
    resource.FrameBorderPen="rgba(236,236,236,0.13)",     //边框
    resource.FrameSplitPen="rgba(34,38,54,0.8)",          //分割线
    resource.FrameSplitTextColor= "rgb(131,140,151)",     //刻度文字颜色
    // resource.FrameSplitTextFont= 12*GetDevicePixelRatio() +"px 微软雅黑",        //坐标刻度文字字体
    resource.FrameTitleBGColor="rgb(23,27,43)",      //标题栏背景色
    resource.DefaultTextColor= "rgb(123,146,208)",
    resource.CorssCursorBGColor= "rgb(43,54,69)",            //十字光标背景
    resource.KLine.MaxMin={ Font: 12* 1 +'px 微软雅黑', Color: 'rgb(130,139,150)',LeftArrow:"<--",RightArrow:'-->',LowYOffset:-10 },   //K线最大最小值显示


    //
    this.OnSize();
    this.CreateKLine();



  },

  methods: {
    getMyDate( str) {
         var oDate = new Date( str),
         oYear = oDate. getFullYear(),
         oMonth = oDate. getMonth()+ 1,
         oDay = oDate. getDate(),
         oHour = oDate. getHours(),
         oMin = oDate. getMinutes(),
         oSen = oDate. getSeconds(),
         oTime = oYear + ''+ this.addZero( oMonth) + ''+ this.addZero( oDay)
         return oTime;
    },
    getMyTime( str) {
         var oDate = new Date( str),
         oYear = oDate. getFullYear(),
         oMonth = oDate. getMonth()+ 1,
         oDay = oDate. getDate(),
         oHour = oDate. getHours(),
         oMin = oDate. getMinutes(),
         oSen = oDate. getSeconds(),
         oTime =  this.addZero( oHour) + ''+this.addZero( oMin) + ''+ this.addZero( oSen);
         return oTime;
    },

    //补零操作
    addZero ( num ){
         if( parseInt( num) < 10){
             num = '0'+ num;
        }
         return num;
    },
    // ----------------------获取参数
    //表格列点击
    getRowData(data) {
      console.log(99999999999999,data);
      this.bus.$emit("onkline",data);

      // if (mainCoinModel.tradecoinid == data.tradcoin) return false;
      // this.topData=data;//点击更新K线上的数据
      // this.tradcoin=this.topData.tradcoin;
      // this.maincoin=this.topData.maincoin;
      // this.formAlign.price=this.topData.price;
      // mainCoinModel.tradecoinid = data.tradcoin;
      // mainCoinModel.coinid = data.maincoin;
      // //当日委托
      // this.mytableData = [];
      // //历史委托
      // this.HismytableData = [];

      // this.historicalBuyData = [];//成交历史
      // this.priceHisData={};//五档图
      // this.loadData(data);
    },
    // ---------------------
    //////////////////////////////////////////////////////////////////////////////////
    //公共对外接口
    //
    /////////////////////////////////////////////////////////////////////////////////

    OnSize() { //动态调整
      var divKLineChart = this.$refs.divklinechart;
      var height = divKLineChart.offsetHeight;
      var width = divKLineChart.offsetWidth;
      var divPeriod = this.$refs.divperiod;
      // var divSymbol = this.$refs.divsymbol;
      // var divIndex = this.$refs.divindex;

      var klineHeight =
        height -
        divPeriod.offsetHeight -
        // divSymbol.offsetHeight -
        // divIndex.offsetHeight -
        4; //总的高度减去其他控件高度就是图形高度
      var divKLine = this.$refs.divkline;
      divKLine.style.width = width + "px";
      divKLine.style.height = klineHeight + "px";
      if (this.KLine.JSChart) this.KLine.JSChart.OnSize();

      var divKMinute = this.$refs.divkminute;
      var kMinuteHeight =
        height - divPeriod.offsetHeight - 4; //总的高度减去其他控件高度就是图形高度
      divKMinute.style.width = width + "px";
      divKMinute.style.height = kMinuteHeight + "px";
      if (this.Minute.JSChart) this.Minute.JSChart.OnSize();
    },

    ChangeSymbol( symbol, name, floatPrecision  ) {//切换股票
      if (this.PairName == symbol) return;
      this.PairName = symbol;
      this.Symbol = symbol + ".BIT";
      //this.Name = name;
      //this.FloatPrecision = floatPrecision;
      if (this.KLine.JSChart) this.KLine.JSChart.ChangeSymbol(this.Symbol);
      if (this.Minute.JSChart) this.Minute.JSChart.ChangeSymbol(this.Symbol);
    },

    // ChangeIndex( item) {//切换指标
    //   if (this.KLine.JSChart)
    //     this.KLine.JSChart.ChangeIndex(item.WindowIndex, item.ID);
    // },

    ChangePeriod(item) {
      this.Period.SelItem = item;
      if (item.Name == "分时") {
        if (!this.Minute.JSChart) this.CreateMinute();

        this.Index.IsShow = false;
        this.KLine.IsShow = false;
        this.Minute.IsShow = true;
      } else {
        if (this.KLine.JSChart) this.KLine.JSChart.ChangePeriod(item.Period);
        else this.CreateKLine();

        this.Index.IsShow = true;
        this.KLine.IsShow = true;
        this.Minute.IsShow = false;
      }
    },

    /////////////////////////////////////////////////////////////////////////////////////////////
    // 私有内部函数
    /////////////////////////////////////////////////////////////////////////////////////////////
    CreateKLine() {
      if (this.KLine.JSChart) return;

      JSCommon.MARKET_SUFFIX_NAME.GetBITDecimal = symbol => {
        return this.FloatPrecision;
      }; // 不同品种虚拟币，使用不同小数位数
      var divKLine = this.$refs.divkline;
      this.KLine.JSChart = JSCommon.JSChart.Init(divKLine);
      this.KLine.Option.KLine.Period = this.Period.SelItem.Period;
      this.KLine.Option.Symbol = this.Symbol;
      this.KLine.Option.NetworkFilter = (data, callback) => {
        this.NetworkFilter(data, callback);
      }; //网络请求回调函数
      this.KLine.JSChart.SetOption(this.KLine.Option);
    },

    CreateMinute() {
      if (this.Minute.JSChart) return;

      JSCommon.MARKET_SUFFIX_NAME.GetBITDecimal = symbol => {
        return this.FloatPrecision;
      }; // 不同品种虚拟币，使用不同小数位数
      var divKLine = this.$refs.divkminute;
      this.Minute.JSChart = JSCommon.JSChart.Init(divKLine);
      this.Minute.Option.Symbol = this.Symbol;
      this.Minute.Option.NetworkFilter = (data, callback) => {
        this.MinuteNetworkFilter(data, callback);
      }; //网络请求回调函数
      this.Minute.JSChart.SetOption(this.Minute.Option);
    },

    GetPeriodInfo(period) {
      for (var i in this.Period.Menu) {
        var item = this.Period.Menu[i];
        if (item.Period == period) return item;
      }

      return null;
    },

    MinuteNetworkFilter(data, callback) {
      switch (data.Name) {
        case "KLineChartContainer::ReqeustHistoryMinuteData": //分钟全量数据下载
          this.ReqeustHistoryMinuteData(data, callback, { PageSize: 100 });
          break;
        case "KLineChartContainer::RequestMinuteRealtimeData": //分钟实时数据更新
          this.RequestMinuteRealtimeData(data, callback);
          break;
      }
    },

    NetworkFilter( data, callback ) {//第3方数据替换接口
      switch (data.Name) {
        case "KLineChartContainer::ReqeustHistoryMinuteData": //分钟全量数据下载
          this.ReqeustHistoryMinuteData(data, callback, { PageSize: 100 });
          break;
        case "KLineChartContainer::RequestHistoryData": //日线全量数据下载
          this.RequestHistoryData(data, callback);
          break;
        case "KLineChartContainer::RequestMinuteRealtimeData": //分钟实时数据更新
          this.RequestMinuteRealtimeData(data, callback);
          break;
        case "KLineChartContainer::RequestRealtimeData": //日线实时数据更新
          this.RequestRealtimeData(data, callback);
          break;
      }
    },

    ReqeustHistoryMinuteData( data, callback, option ) {//第3方分钟线历史数据请求
      data.PreventDefault = true;
      var period = data.Self.Period; //获取周期
      var symbol = this.Symbol;
      var name = this.Name;
      var peirodMenu = this.GetPeriodInfo(period);
      var type = this.symboltype,
        min = peirodMenu.Min,
        count = 500;
      console.log("period",{
          pairname: this.PairName,
          type: type,
          period: min,
          size: count,
          date:0
        })
        let self = this;
        self.$nextTick(async () => {
        	var dataArr = new URLSearchParams();
        	dataArr.set('symbol',this.PairName);
        	dataArr.set('period',min);
        	dataArr.set('size',count);
        	dataArr.set('type',type);
          var data2=[]
        	var result = await klineApi(dataArr);
        	 console.log("请求成功",result)
        	 console.log(this.DefaultName+"请求成功")
        	if(result.success){
        		let
        			bars = [],
        			data2 = result.data;

        		if(self.type == 1){
        			data2.reverse();
        		}
           
        		data2.forEach(item => {
        			let newObj = {
                                //差8个小时 8*3600*1000
        				// time: (Number(item.id) * 1000)+8*3600*1000,
        				time: (Number(item.id) * 1000),
                close: item.close,
        				open: item.open,
        				high: item.high,
        				low: item.low,
        				volume: item.amount
        			}
        			bars.push(newObj)
        		})
            let newDate = new Date()
            this.historyTime1 = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
           // recvData = JSON.parse(recvData)

            this.RecvMinuteHistoryData( bars, callback,
              { Name: name, Symbol: symbol, Chart: data.Self },
              option
            );
            //self.startData = self.startData + self.lengsData + self.countDate + 1;
        		//self.onLoadedCallback(bars);
        	}
        })

    },

    RecvMinuteHistoryData(recvData, callback, stockData, option) {
      var klineData = this.JsonToHQChartMinuteHistoryData(recvData);

      var hqChartData = { code: 0, data: klineData };
      hqChartData.symbol = stockData.Symbol;
      hqChartData.name = stockData.Name;
      stockData.Chart.PageSize = option.PageSize; //设置一屏显示数据个数
      callback(hqChartData);
    },
/**/
    RequestHistoryData( data, callback ){//第3方日线历史数据请求
      data.PreventDefault = true;
      var period = data.Self.Period; //获取周期
      var symbol = this.Symbol;
      var name = this.Name;
      var peirodMenu = this.GetPeriodInfo(period);
      var type = this.symboltype,
        min = peirodMenu.Min,
        count = 500;
      let self = this;
              self.$nextTick(async () => {
              	var dataArr = new URLSearchParams();
              	dataArr.set('symbol',this.PairName);
              	dataArr.set('period',min);
              	dataArr.set('size',count);
              	dataArr.set('type',type);
                var data2=[]
              	var result = await klineApi(dataArr);
              	if(result.success){
              		let
              			bars = [],
              			data2 = result.data;

              		if(self.type == 1){
              			data2.reverse();
              		}
              		data2.forEach(item => {
              			let newObj = {
                                      //差8个小时 8*3600*1000
              				// time: (Number(item.id) * 1000)+8*3600*1000,
              				time: (Number(item.id) * 1000),
                      close: item.close,
              				open: item.open,
              				high: item.high,
              				low: item.low,
              				volume: item.amount
              			}
              			bars.push(newObj)
              		})
                  let newDate = new Date()
                  this.historyTime2 = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
                 // recvData = JSON.parse(recvData)

                  this.RecvHistoryData(bars, callback, {
                    Name: name,
                    Symbol: symbol,
                    Chart: data.Self
                  });
                  //self.startData = self.startData + self.lengsData + self.countDate + 1;
              		//self.onLoadedCallback(bars);
              	}
              })

    },

    RecvHistoryData(recvData, callback, stockData) {
      var klineData = this.JsonToHQChartHistoryData(recvData);

      var hqChartData = { code: 0, data: klineData };
      hqChartData.symbol = stockData.Symbol;
      hqChartData.name = stockData.Name;
      stockData.Chart.PageSize = 100; //设置一屏显示数据个数
      callback(hqChartData);
    },

    RequestMinuteRealtimeData(data,callback) {
      // 请求K线接口
      data.PreventDefault = true;
      var period = data.Self.Period; //获取周期
      var symbol = this.Symbol;
      var name = this.Name;
      var peirodMenu = this.GetPeriodInfo(period);
      var type = this.symboltype,
        min = peirodMenu.Min,
        count = 2; //取最新5条数据 分时数据多取几条更新
      let self = this;
      self.$nextTick(async () => {
      	var dataArr = new URLSearchParams();
      	dataArr.set('symbol',this.PairName);
      	dataArr.set('period',min);
      	dataArr.set('size',count);
      	dataArr.set('type',type);
      	var result = await klineApi(dataArr);
      	 console.log("请求成功",result)
         console.log(this.DefaultName+"请求成功")
      	if(result.success){
      		let
      			bars = [],
      			data = result.data;

      		if(self.type == 1){
      			data.reverse();
      		}
      		data.forEach(item => {
      			let newObj = {
                              //差8个小时 8*3600*1000
      				// time: (Number(item.id) * 1000)+8*3600*1000,
      				time: (Number(item.id) * 1000),
              close: item.close,
      				open: item.open,
      				high: item.high,
      				low: item.low,
      				volume: item.amount
      			}
      			bars.push(newObj)
      		})
         // recvData = JSON.parse(recvData)

          this.RecvMinuteRealtimeData(bars, callback, {
            Name: name,
            Symbol: symbol
          });
          //self.startData = self.startData + self.lengsData + self.countDate + 1;
      		//self.onLoadedCallback(bars);
      	}
      })
    },

    RecvMinuteRealtimeData(recvData, callback, stockData) {
      var klineData = this.JsonToHQChartMinuteHistoryData(recvData);

      var hqChartData = { code: 0, data: klineData, ver: 2.0 }; //数字货币使用ver2.0数据格式
      hqChartData.symbol = stockData.Symbol;
      hqChartData.name = stockData.Name;
      callback(hqChartData);
    },
/* */
    RequestRealtimeData(data,callback) {//第3方日线实时数据更新请求
      data.PreventDefault = true;
      var period = data.Self.Period; //获取周期
      var symbol = this.Symbol;
      var name = this.Name;
      var peirodMenu = this.GetPeriodInfo(period);
      var type = this.symboltype,
        min = peirodMenu.Min,
        count = 2; //取最新2条数据
      let self = this;
      self.$nextTick(async () => {
      	var dataArr = new URLSearchParams();
      	dataArr.set('symbol',this.PairName);
      	dataArr.set('period',min);
      	dataArr.set('size',count);
      	dataArr.set('type',type);
        var data2=[]
      	var result = await klineApi(dataArr);
      	 console.log("请求成功",result)
      	 console.log(this.DefaultName+"请求成功")
      	if(result.success){
          this.RecvRealtimeData(bars, callback, {
            Name: name,
            Symbol: symbol
          });
          //self.startData = self.startData + self.lengsData + self.countDate + 1;
      		//self.onLoadedCallback(bars);
      	}
      })
    },

    RecvRealtimeData(recvData, callback, stockData) {
      var stockItem = this.JsonToHQChartRealtimeData(recvData);
      stockItem.symbol = stockData.Symbol;
      stockItem.name = stockData.Name;
      var hqChartData = { code: 0, stock: [stockItem] };

      callback(hqChartData);
    },

    JsonToHQChartMinuteHistoryData(recvData) {//分钟（历史/最新）数据转化为hqchart数据格式
    console.log(recvData);
      var data = recvData;
      var yClose = null;
      var klineData = [];
      for (var i in data) {
        var item = data[i];
        //var aryItem = item.split("|");
        var date = parseInt(this.getMyDate(item.time));
        var time = parseInt(this.getMyTime(item.time));
        var open = parseFloat(item.open);
        var high = parseFloat(item.high);
        var low = parseFloat(item.low);
        var close = parseFloat(item.close);
        var vol = parseFloat(item.volume);
        klineData.push([date, yClose, open, high, low, close, vol, null, time]);

        yClose = close;
      }
      console.log(klineData);

      return klineData;
    },

    JsonToHQChartHistoryData(recvData) {//日线历史数据转化为hqchart数据格式
    console.log(recvData);
      var data = recvData;
      var yClose = null;
      var klineData = [];
      for (var i in data) {
        var item = data[i];
        //var aryItem = item.split("|");
        var date = parseInt(this.getMyDate(item.time));
        var open = parseFloat(item.open);
        var high = parseFloat(item.high);
        var low = parseFloat(item.low);
        var close = parseFloat(item.close);
        var vol = parseFloat(item.volume);
        klineData.push([date, yClose, open, high, low, close, vol, null]);
//1635394741000
//1635350400000
        yClose = close;
      }
      console.log(klineData);

      return klineData;
    },

    JsonToHQChartRealtimeData(recvData) {//日线最新数据转化为hqchart数据格式
      var stockData = {};
      console.log(recvData);

      if(recvData.length==0){
        return;
      }
      var data = recvData;
      var yClose = null;
      for (var i in data) {
        var item = data[i];
        var aryItem = item.split("|");
        stockData.date = parseInt(this.getMyDate(item.time));
        stockData.open = parseFloat(item.open);
        stockData.high = parseFloat(item.high);
        stockData.low = parseFloat(item.low);
        stockData.price = parseFloat(item.close); //收盘价
        stockData.vol = parseFloat(item.volume);
        stockData.yclose = yClose;
        stockData.amount = null;

        yClose = stockData.price;
      }

      console.log(stockData);

      return stockData;
    },
    getAjaxData(symbol,period,size,type) {
    	let self = this;
    	self.$nextTick(async () => {
    		var dataArr = new URLSearchParams();
    		dataArr.set('symbol',symbol);
    		dataArr.set('period',period);
    		dataArr.set('size',size);
    		dataArr.set('type',type);
    		var result = await klineApi(dataArr);
    		// console.log(result)
    		if(result.success){
    			let
    				bars = [],
    				data = result.data;

    			if(self.type == 1){
    				data.reverse();
    			}
    			data.forEach(item => {
    				let newObj = {
                              //差8个小时 8*3600*1000
    					// time: (Number(item.id) * 1000)+8*3600*1000,
    					time: (Number(item.id) * 1000),
              close: item.close,
    					open: item.open,
    					high: item.high,
    					low: item.low,
    					volume: item.amount
    				}
    				bars.push(newObj)
    			})
          //self.startData = self.startData + self.lengsData + self.countDate + 1;
    			//self.onLoadedCallback(bars);
    		}
    	})
    },
  }
};
</script>

<style lang="scss">
/*页面头部*/
.name-box {
  flex: 1;
  text-align: center;
  position: relative;
}
.headTitle {
  display: flex;
  box-sizing: border-box;
  padding-top: 8px;
}
.nameWrap {
  text-align: center;
  line-height: 42px;
  font-family: "PingFangSC-Light";
}
.stockName {
  /*font-family: "PingFang-SC-Heavy";*/
  margin-right: 1.2%;
}
.exchangeInfo {
  font-size: 24px;
  // color: $subFontColor;
	color: red;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  text-align: center;
  font-family: "PingFangSC-Light";
}

/*k线部分*/
.blockBg {
  background: #131625;
  margin-top: 4px;
}
.tabsTitle {
  height: 22px;
  line-height: 22px;
  // border-bottom: 1px solid $lineColor;
  // border-top: 1px solid $lineColor;
	border-bottom: 1px solid #131625;
  border-top: 1px solid #131625;
  padding: 0 4%;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
}
.tabsTitle span {
  width: 15%;
  height: 22px;
  line-height: 22px;
  border-bottom: 2px solid transparent;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  border-radius: 3px;
	cursor: pointer;
}
.tabsTitle span.active {
  // border-bottom-color: $mainColor;
  color: #357ce1;
  background-color: rgba(#131625,0.9)
}
.klineWrap {
  float: left;
  position: relative;
  overflow: hidden;
}
.kLineTabs .tabsTitle {
  padding-left: 2%;
}
.kLineTabs .tabsTitle span {
  font-size: 16px;
  width: 16%;
}
.kLineTabs .tabsTitle span:last-child {
  width: 18%;
}
.indexWrap {
  width: 100%;
  height: 60px;
  background-color: red;
  font-size: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}
.indexWrap .indexItem {
  display: block;
  line-height: 60px;
  flex-grow: 1;
  text-align: center;
}
.indexWrap .indexItem.active {
  color: #333;
  background-color: #e1ecf2;
}
</style>
