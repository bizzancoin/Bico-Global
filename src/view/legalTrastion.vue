<template>
    <div class="legal_transaction_div">
        <el-row>
            <el-col :xs="24" :sm="24" :md="17" :lg="19">
                <div class="grid-content">
                    <div class="transaction_left">
                        <div class="hasPadding">
                            <el-form ref="form" :model="form" class="selectLogoClass">
                                <img class="selectLogoClassImg" :src="selectLogoClassImg" alt="">
                                <el-form-item class="alignment">
                                    <el-select class="selectPair" v-model="form.region" :no-data-text="$t('tip.noRecord')" :placeholder="$t('form.select')" @change="selectCoin" style="height: 40px;border: 1px solid #3b3e4c;border-radius: 22px;padding-left: 18px;margin-right: 140px;width:335px;">
                                        <el-option v-for="(item,index) in coinArr" :key="index" :value="item.symbol">
                                            <div style="display:flex;align-items: center;">
                                                <img :src="item.symbolLogo" alt="" style="width:20px;height:20px;margin-right:2px;">
                                                <span>{{item.symbol}}</span>
                                            </div>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <ul class="topBox">
                                <li>{{$t('transaction.newPirce')}}<span class="getValue">{{newPirce}}</span></li>
                                <li>{{$t('transaction.zhangfu')}} <span :class="rose>0 ? 'greenColor' : 'redColor'"> {{rose}}%</span></li>
                                <li>{{$t('transaction.highPrice')}}<span class="getValue">{{highForth}}</span></li>
                                <li>{{$t('transaction.lossPrice')}}<span class="getValue">{{lossForth}}</span></li>
                                <li>{{$t('transaction.amountPirce')}}<span class="getValue">{{amountPirce}}</span></li>
                            </ul>
                        </div>




                        <!-- 左侧币种列表 -->
                        <div class="leftBzList" style="width:19%;color:#fff;position:absolute;left:0;top:80px;padding: 20px 20px 20px;background-color: #131722;height: 81%;overflow:auto;">
                            <div style="display:flex;justify-content:flex-end;padding:0 0 10px 0">
                                <div style="flex:1;padding-left:40px;">{{$t('home.coin')}}</div>
                                <div style="width:140px;text-align:center">{{$t('transaction.newPirce')}}</div>
                                <div style="width:100px;text-align:center">{{$t('transaction.zhangfu')}}</div>
                            </div>
                            <div v-for="item in coinArr" :key="item.symbol" style="display:flex;justify-content:flex-end;padding:6px 0 6px 0">
                                <div style="flex:1;display:flex;align-items: center;">
                                    <img :src="item.symbolLogo" alt="" style="width: 20px;height: 20px;margin-right: 4px;padding: 8px 8px;border-radius: 50px;">
                                    <span>{{item.symbol}}</span>
                                </div>
                                <div style="width:200px;padding: 8px 8px;text-align:center">{{item.symbol == form.region?newPirce:item.close}}</div>
                                <div style="width:100px;padding: 8px 8px;text-align:center" :class="item.rose>0?'green':'red'">{{item.rose>0?'+':''}}{{(item.rose).toFixed(2)}}%</div>
                            </div>
                        </div>
                        <!-- 左侧币种列表 -->







                        <div class="picture" style="width: 73%;float: right;">
                            <TradeView :nowPrice="newPirce" :symbolValue="form.region" :type="0" />





                        <!--加入居中-->


            <el-col :xs="24" :sm="24" :md="7" :lg="5">
                <div class="grid-content transaction_right" style="background-color: rgb(19, 23, 34);padding: 20px;height: 40%;position: absolute;top: 700px;width: 55.4%;float: right;">

                    <div class="transaction_right_div">

                        <!-- 买入卖出 -->
                        <el-tabs class="transtionBar" v-model="sellIndex" @tab-click="handleType">
                            <el-tab-pane :label="$t('coin.buy')" name="BUY"></el-tab-pane>
                            <el-tab-pane :label="$t('coin.sell')" name="SELL"></el-tab-pane>
                        </el-tabs>

                        <!-- 限价市价 -->
                        <el-select v-model="activeIndex" :placeholder="$t('form.select')" @change="handleIndex">
                            <el-option :label="$t('transaction.limit')" value="0"></el-option>
                            <el-option :label="$t('transaction.market')" value="1"></el-option>
                        </el-select>


                        <!-- 委托价格 -->
                        <div class="entrust_price">
                            <span class="white">{{$t('transaction.waitPrice')}}</span>
                            <el-input v-if="activeIndex == '0'" v-model="goodPrice" @input="addPrice" autocomplete="off" :placeholder="$t('transaction.goodPrice')">
                                <span slot="suffix">USDT</span>
                            </el-input>
                            <el-input v-else autocomplete="off" disabled :value="newPirce"  :placeholder="$t('transaction.market')"></el-input>
                        </div>
                        <!-- 手数 -->
                        <div class="priceBox">
                            <div class="betweenSpread">
                                <span class="white">{{$t('contract.entrustNum')}}</span>
                            </div>
                            <el-input class="upNum" type="number" v-model="num" @input="changeNum" :placeholder="$t('transaction.num')">
                                <span slot="suffix">{{getCoin}}</span>
                            </el-input>
                        </div>
                        <!-- 下单百分比 -->
                        <div class="blockPecent">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane v-for="item in pecentArr"  :key="item.id" :label="item.name" :name="item.value"></el-tab-pane>
                                 <div class="bondClass" style="color: #ffffff;">
                            
                           
                        </div>
                            </el-tabs>
                        </div>

                        <div class="lastBtn hasToken" v-if="token">
                            <el-button :class="sellIndex == 'BUY' ? 'buyBtn' : 'sellBtn'" block @click="submitFun" type="button">{{sellIndex == 'BUY' ? $t('coin.buy') : $t('coin.sell')}}</el-button>
                        </div>
                        <div class="lastBtn" v-else>
                            <div class="nothing">
                                <router-link to="login">{{$t('verification.logoName')}}/</router-link>
                                <router-link to="register">{{$t('verification.registerName')}}</router-link>
                            </div>
                            <div class="nothing">
                                <router-link to="login">{{$t('verification.logoName')}}/</router-link>
                                <router-link to="register">{{$t('verification.registerName')}}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>


                        <!--加入居中-->
                        </div>













                    </div>
                </div>
                <div style="padding:0 20px;width: 123.7%;">
                            <CoinOrder :symbolValue="form.region" />
                        </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="7" :lg="5">
                <div class="grid-content transaction_right">
                    <div class="entrustList">
                      <h3>
                        <span @click="changEnOrReList(true)">{{$t('transaction.entrustList')}}</span>
                        <span @click="changEnOrReList(false)" style="margin-left: 15px">{{$t('transaction.realTimeList')}}</span>
                      </h3>
                        <div v-show="selectPanKou" class="transaction_right_title" style="display:flex;">

                            <div class="right_title">
                                <span>{{$t('transaction.createTime')}}</span>
                            </div>

                            <div class="right_title">
                                <span>{{$t('transaction.price')}}</span>
                            </div>


                            <div class="right_title">
                                <span>{{$t('transaction.num')}}</span>
                            </div>

                        </div>
                        <!-- 卖单 -->
                        <ul class="fallList" v-show="selectPanKou">
                            <li v-for="item in sellArr" :key="item.id" style="display:flex">
                                <span>{{item[2]|dateFormat()}}</span>
                                <span style="text-align:center">{{(item[0]).toFixed(interception)}}</span>
                                <span style="text-align:right;color:#d2d9ff;">{{(item[1]).toFixed(10)}}</span>
                                <div class="percenttd">
                                    <span class="percentDiv" :style="'width:'+((item[1]/sellHigh) * 100).toFixed(2)+'%'"></span>
                                </div>
                            </li>
                        </ul>

                        <div class="conversion" v-show="selectPanKou">
                            <span :class="rose>0 ? 'greenColor' : 'redColor'">{{newPirce}} </span>
                            <span :class="rose>0 ? 'greenColor' : 'redColor'">{{rose}}%</span>
                        </div>

                        <!-- 买单 -->
                        <ul class="riseList" v-show="selectPanKou">
                            <li v-for="item in buyArr" :key="item.id" style="display:flex">
                                <span>{{item[2]|dateFormat()}}</span>
                                <span style="text-align:center">{{(item[0]).toFixed(interception)}}</span>
                                <span style="text-align:right;color:#d2d9ff;">{{(item[1]).toFixed(10)}}</span>
                                <div class="percenttd">
                                    <span class="percentDiv" :style="'width:'+((item[1]/buyHigh) * 50).toFixed(2)+'%'"></span>
                                </div>
                            </li>
                        </ul>
                        <!-- 实时数据 -->
                        <div v-show="!selectPanKou" class="transaction_right_title" style="display:flex;">

                            <div class="right_title">
                                <span>{{$t('transaction.createTime')}}</span>
                            </div>

                            <div class="right_title">
                                <span>{{$t('transaction.price')}}</span>
                            </div>
                            <div class="right_title">
                                <span>{{$t('transaction.num')}}</span>
                            </div>

                        </div>

                        <ul class="" v-show="!selectPanKou">
                            <li v-for="(item,index) in realTimeList" :key="index" style="display:flex;">
                                <span1 style="text-align:left;" :class="item.direction=='buy' ? 'greenColor' : 'redColor'">{{item.ts|dateFormat()}}</span1>
                                <span1 style="text-align:center" :class="item.direction=='buy' ? 'greenColor' : 'redColor'">{{(item.price).toFixed(interception)}}</span1>
                                <span1 style="text-align:right;" :class="item.direction=='buy' ? 'greenColor' : 'redColor'">{{(item.amount).toFixed(4)}}</span1>
                                <!-- <div class="percenttd">
                                    <span class="percentDiv" :style="'width:'+((item[1]/sellHigh) * 100).toFixed(2)+'%'"></span>
                                </div> -->
                            </li>
                        </ul>
                    </div>

                </div>
            </el-col>
        </el-row>
    </div>

</template>
<script>
import CoinOrder from '@/components/CoinOrder'
import { ticketApi,tradeListApi,coinInformApi,coinTrasctionApi,realListApi } from '@/api/getData'
import TradeView from '@/components/TradeView'
import codeStatus from '@/config/codeStatus'
import logosArr from '@/logoSrc/index.js'
export default {
    data(){
        return{
            selectLogoClassImgFlag:false,
            selectLogoClassImg:'',
            activeIndex:'0',
            sellIndex:'BUY',
            goodPrice:1,
            num: '',
            sliderValue:'',
            levarageLabel:'',
            form:{
                region:'BTC/USDT'
            },
            coinArr:[],
            buyArr:[],
            buyHigh:'',
            sellArr:[],
            sellHigh:'',
            wTimerList:null,
            wRealList:null,
            newPirce:'',
            highForth:'',
            lossForth:'',
            amountPirce:'',
            rose:'',
            cny:'',
            useBond:'0.00000000',
            needBond:0,
            proportion:0,
            getIndex:0,
            cnyUsdt:'',
            timeTimer:null,
            steps:0,
            activeName:'0',
            hands:'',
            getPair:0,
            pecentArr:[{name:'25%',value:"25"},{name:'50%',value:"50"},{name:'75%',value:"75"},{name:'100%',value:"100"}],
            token:sessionStorage.getItem('userToken'),
            fee:'',//手续费比例
            balanceNum:'0.00000000',//可用数量
            isClick:false,
            changeValue:'',
            interception:'',//币种截取位数
            hitNum:0,
            loading: false,
            selectPanKou:true,
            realFlag:true,
            minBuyNumber:'',//最小委托数量
            realTimeList:[],//实时交易数据
        }
    },
    created(){
        var that = this;
        that.wTimerList = setInterval(function(){
            that.ticketFun()
        },1000)
        that.timeTimer = setInterval(function(){
            that.tradeFun();
        },1000)
        that.wRealList = setInterval(function(){
            that.getRealList()
        },1000)

    },
    filters:{
        dateFormat: function(tick) {
            var data = new Date(Number(tick));
            var h = data.getHours()<10?"0"+data.getHours():data.getHours()
            var m = data.getMinutes()<10?"0"+data.getMinutes():data.getMinutes()
            var s = data.getSeconds()<10?'0'+data.getSeconds():data.getSeconds()
        return h+  ":" +m + ":" +s;

        },
    },
    computed:{
        getCoin(){
            var arr = this.form.region;
            var coin = arr.split('/');

            return coin[0]
        },
        getNew(){
            return this.newPirce
        },
    },
    watch:{
        getNew(newValue){
            var that = this;
            if(that.activeIndex == '1'){//市价
                that.getBond();
            }
        },
        selectLogoClassImgFlag(n){
            if(n){
                this.selectLogoClassImg = this.coinArr[0].symbolLogo
            }
        }
    },
    mounted(){
        this.informFun();//页面信息

    },
    methods:{
      changEnOrReList(flag){
        this.selectPanKou=flag;
      },
      //获取当前币种的实时交易数据
      async getRealList(){
        var that = this;
        var dataArr = new URLSearchParams();
        dataArr.set('symbol',that.form.region);
        dataArr.set('type','0');
        var res = await realListApi(dataArr);
        if(res.success){
          var dataList = res.data;
          var c = dataList.length
          var flag = false
          if(that.realTimeList.length>=c){
            var list = that.realTimeList.slice(0,c)
            for(var i=0;i<c;i++){
            　　if(list[i].ts == dataList[i].ts){
                  flag=true
                }
            }
          }
          if(!flag){
            that.realTimeList=dataList.concat(that.realTimeList)
            if(that.realTimeList.length>38){
              that.realTimeList = that.realTimeList.slice(0,38)
            }
            if(that.realTimeList.length>0){
              that.realFlag = false
               that.newPirce =that.realTimeList[0].price.toFixed(that.interception)
            }
          }
        }else{
          clearInterval(that.wRealList)
        }
      },
      //重复点击取消选择比例
        handleClick(tab, event){//重复点击取消选择比例
            var that = this;
            if(Number(that.activeName) == Number(that.changeValue)){
                that.isClick = !(that.isClick);

                if(that.isClick){
                    that.activeName = '0';
                }
            }else{
                that.activeName = tab.name;
                that.isClick = false;
            }

            that.changeValue = tab.name;

            that.getBond();
        },
      //获取可用余额和手续费比例
        async informFun(){
            var that = this;
            if(that.token){
                var dataArr = new URLSearchParams();
                dataArr.set('type',that.form.region);
                dataArr.set('matchType',that.sellIndex);
                var res = await coinInformApi(dataArr);
                if(res.success){
                    var data = res.data;
                    that.fee = (Number(data.feeRate) / 100).toFixed(8);
                    that.balanceNum = (data.price).toFixed(8);
                    that.minBuyNumber = Number(data.minBuyNumber)
                }
            }
        },
      //获取币种
        async ticketFun(){
            var that = this;
            var data =new URLSearchParams();
            data.set('type',0)
            var res = await ticketApi(data);
            if(res.success){
                var obj = res.data;
                that.coinArr = [];
                obj.forEach((element,index) => {
                    if(element.symbol != ''){
                        if(that.form.region == element.symbol){
                            // if(that.getIndex == 0){
                                var index = Number(element.number);
                                if(that.realFlag){
                                  that.newPirce = that.interception != '' ? (element.close).toFixed(that.interception) : (element.close);
                                }
                                that.highForth = element.high;
                                that.lossForth = element.low;
                                that.rose = ((element.rose)).toFixed(2);
                                that.amountPirce = element.amount;
                            // }

                            that.cny = element.cny;

                            if(that.getPair == 0){
                                that.goodPrice = element.close
                            }
                            that.interception = Number(element.number);
                        }

                        that.coinArr.push(element);
                        that.selectLogoClassImgFlag = true;
                    }


                });
                for(let i of that.coinArr){
                    for(let j of logosArr){
                        if(i.symbol==j.name){
                            i.symbolLogo = j.logo;
                            break;
                        }
                    }
                }
                if(that.getIndex == 0){
                    var objArr = that.coinArr[0];
                    that.form.region = objArr.symbol;
                }
                that.getIndex = that.getIndex+1;
                that.getPair = that.getPair + 1;
                // that.getTicketsDetail();
            }else{
                clearInterval(that.wTimerList)
            }
        },
      //获取某个币种的行情
        getTicketsDetail(){
            var that = this;
            var value = ((that.form.region).split('/')).join('');
            var getValue = value.toLocaleLowerCase();
            $.ajax({
                type:'GET',
                url:'https://api.huobi.pr/market/detail?symbol='+getValue,
                success:function(res){

                    if(res.status == 'ok'){
                        var obj = res.tick;
                        if(obj){
                            var index = that.interception;
                            that.newPirce = (obj.close).toFixed(index);
                            that.highForth = (obj.high).toFixed(2);
                            that.lossForth = obj.low;

                            that.amountPirce = Math.floor(obj.amount);
                            // that.cny = element.cny;
                            if(that.getPair == 0){
                                that.goodPrice = (obj.close).toFixed(index)
                            }
                            that.roseFun();
                        }
                    }
                },
                error:function(err){
                    console.log(err)
                }
            })
        },
      //获取一天24小时的行情，得出涨幅
        roseFun(){
            var that = this;
            var value = ((that.form.region).split('/')).join('');
            var getValue = value.toLocaleLowerCase();
            $.ajax({
                type:'GET',
                url:'https://api.huobi.pr/market/history/kline?period=1day&size=1&symbol='+getValue,
                success:function(res){
                    if(res.status == 'ok'){
                        var arr = res.data;
                        if(arr.length>0){
                            var obj = arr[0];
                            // （收盘价-开盘价）/开盘价*100
                            that.rose = (((obj.close - obj.open) / obj.open) * 100).toFixed(8);
                        }
                    }
                }
            })
        },
      //行情深度
        async tradeFun(){
            var that = this;
            var dataArr = new URLSearchParams();
            dataArr.set('symbol',that.form.region);
            dataArr.set('type','0');
            var res = await tradeListApi(dataArr);
            if(res.success){
                var buyArr = [],sellArr = [];
                var buyArrObj = res.data.bids;//买单
                var sellArrObj = res.data.asks;//卖单
                if(buyArrObj.length>0){
                    buyArrObj.sort(function(x,y){
                        return y[0] - x[0];
                    })
                    for(var i in buyArrObj){
                        buyArr.push(buyArrObj[i]);
                    }
                    that.buyArr = [];
                    that.buyArr = buyArr.slice(0,20);

                    var buyNum =  buyArr.slice(0,4);
                    buyNum.sort(function(x,y){
                        return y[1]-x[1]
                    })

                    that.buyHigh = buyNum[0][1];
                }

                if(sellArrObj.length>0){
                    sellArrObj.sort(function(x,y){
                        return x[0] - y[0];
                    })
                    for(var i in sellArrObj){
                        sellArr.push(sellArrObj[i]);
                    }
                    that.sellArr = [];
                    var newArr = sellArr.slice(0,18);
                    newArr.sort(function(x,y){
                        return y[0] - x[0];
                    })

                    that.sellArr = newArr;
                    var sellNum =  newArr.slice(0,4);
                    sellNum.sort(function(x,y){
                        return y[1]-x[1]
                    })
                    that.sellHigh = sellNum[0][1];
                }



            }else{
                clearInterval(that.timeTimer)
            }
        },
      //选择币种
        selectCoin(value){//选择币种
            var that = this;
            that.form.region = value;
            that.informFun();
            var obj = value.split('-');
            that.hands = obj[1];
            that.getPair = 0;
            // that.ticketFun();
            that.realTimeList=[]
            that.realFlag = true
            let imgSrc = logosArr.filter(v=>v.name==value);
            this.selectLogoClassImg = imgSrc[0].logo;
        },
      //币币交易
        async submitFun(){
            var that = this;
            if(that.num == ''){
                that.$message.error(that.$t('legal.entrustNum'));
                return false;
            }
            if(Number(that.num)<=0){
                that.$message.error(that.$t('legal.entrustCount')+'0');
                return false;
            }
            var way = '',price='';
            if(that.activeIndex == '0'){//限价
                if(Number(that.goodPrice)<0){
                    that.$message.error(that.$t('legal.effectiveBig'));
                    return false;
                }

                if(isNaN(that.goodPrice)){
                    that.$message.error(that.$t('legal.effectivePrice'));
                    return false;
                }

                way = 'LIMIT';

                price = that.goodPrice;
            }else{//市价
                way = 'MARKET'
                price = that.newPirce;
            }

            if(Number(that.num) < that.minBuyNumber){
                that.$message.error(that.$t('legal.minEntrustNum')+that.minBuyNumber);
                return false
            }

            var dataArr = new URLSearchParams();
            dataArr.set('unit',price);
            dataArr.set('number',that.num);
            dataArr.set('matchType',that.sellIndex);
            dataArr.set('dealWay',way);
            dataArr.set('symbols',that.form.region);
            that.hitNum += that.hitNum+1;
            if(that.hitNum == 1){
                var res = await coinTrasctionApi(dataArr);
                console.log(res)
                if(res.success){
                    that.$message({
                        type:'success',
                        message:res.msg
                    })
                    that.informFun();
                }else{
                    codeStatus(res.code,function(msg){
                        that.$message.error(msg);
                    })
                }

                setTimeout(() => {
                    that.hitNum = 0;
                }, 2000);
            }

        },
      //选择限价市价
        handleIndex(){

        },
      //选择买入卖出
        handleType(){
            this.informFun();//根据买入卖出获取手续费
            this.getBond();//根据买入卖出计算手数
        },
      //计算手续费
        changeNum(value){
            var that = this;
            var index = that.interception;
            var getTxt = '/^[0-9]+(\.[0-9]{1,'+ index +'})?$/';
            var patrn = eval(getTxt);
            if(!(patrn.test(value))){
                that.num = '';
                that.useBond = '0.00';
                that.proportion = 0;
                return false;
            }else{
                var cnyPrice = Number(value) * Number(that.fee);
                that.useBond = (cnyPrice).toFixed(8);
            }
        },
      //根据比例计算手数
        getBond(){
            var that = this;
            if(that.activeName != '0'){

                var price = ''
                if(that.activeIndex == '1'){//市价：以当前行情价为委托价
                    price = Number(that.newPirce);
                }else{
                    price = Number(that.goodPrice)
                }

                var index = that.interception;
                var lastPrice = '';
                if(that.sellIndex == 'BUY'){//买入
                    lastPrice = (Number(that.balanceNum) * (Number(that.activeName)/100) / Number(price))
                }else{//卖出
                    lastPrice = (Number(that.balanceNum) * (Number(that.activeName)/100))
                }

                var str = String(lastPrice);
                var getStr = str.indexOf('.');
                var getValue = str.substring(0,getStr+index+1)
                var valueNum = Number(getValue);

                that.num = valueNum;
                that.changeNum(valueNum)
            }
        },
      //加限价最优价格
        addPrice(value) {
            this.getBond();
        },
    },
    handleChange(){

    },
    beforeDestroy(){
      clearInterval(this.wRealList);
        clearInterval(this.wTimerList);
        clearInterval(this.timeTimer);
    },
    components:{
        CoinOrder,TradeView
    }
}
</script>
<style lang="less">
.legal_transaction_div{

            .leftBzList::-webkit-scrollbar{
                display: none;
            }
            .leftBzList{
                scrollbar-color: transparent transparent;
                scrollbar-width:none;
            }

            .green{
                color:#0fbf69;
            }
            .red{
                color:red;
            }
            .selectLogoClass{
                position: relative;
            }
            .selectLogoClassImg{
                width: 20px;
                height: 20px;
                position: absolute;
                left: 9px;
                top: 10px;
                z-index: 999;
            }

                border-top: 1px solid #3B3B3B;
                position: relative;
                width: 100%;
                left: 0;
                height: 100%;
                overflow-y: auto;
                background-color: #0B0B0B;
                &::-webkit-scrollbar{/*滚动条整体部分，可以设置宽度啥的**/
                    width: 0px;
                }
                .greenColor{
                    color: #44BCA7
                }
                .redColor{
                    color:#CD3D58;
                }
                .el-row{
                    background-color: #0B0B0B;
                }
                .transaction_left{
                    height: 1300px;
                    overflow-y: auto;
                    background-color: #0B0B0B;
                    &::-webkit-scrollbar{/*滚动条整体部分，可以设置宽度啥的**/
                        width: 6px;
                    }
                    &::-webkit-scrollbar-thumb{/*滚动的滑块*/
                        border-radius: 10px;
                        box-shadow: inset 0 0 5px #575F67;
                        -webkit-box-shadow: inset 0 0 5px #575F67;
                        background: #575F67;
                    }
                    &::-webkit-scrollbar-track{/* 外层轨道*/
                        border-radius: 10px;
                        box-shadow: inset 0 0 5px #131722;
                        -webkit-box-shadow: inset 0 0 5px #131722;
                        background: #131722;
                    }
                    .hasPadding{
                        padding: 20px 20px 0 20px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        .el-form-item{
                            margin-bottom: 0;
                        }
                        .pairList{
                            &>div{
                                display: block;
                            }
                        }
                    }
                    .topBox{
                        display: flex;
                        flex-direction: row;
                        margin-left: -105px;
                        li{
                            color: #8E8E8E;
                            margin-right: 20px;
                        }
                        .getValue{
                            color: #ffffff;
                            margin:0 10px;
                        }
                    }

                    .el-form-item__content{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        .el-input__inner{
                            border: none;
                            background-color: transparent;
                            outline: none;
                        }
                        .el-select{
                            width:150px;
                        }
                    }
                }
                .transaction_right{
                        padding: 20px 20px 20px;
                        background-color: rgb(19, 23, 34);
                        height: 81%;
                        position: absolute;
                        top: 80px;
                        width: 19%;
                        float: right;

                    .transaction_right_title{
                        width: 100%;
                        .right_title{
                            width: 48%;
                            display: inline-block;
                            color: #8E8E8E;
                            &:nth-child(2){
                                text-align: center;
                            }
                            &:nth-last-child(1){
                                text-align: right;
                            }
                            span{
                                display: block;
                            }
                        }
                    }
                    .entrustList{
                        h3{
                            margin: 0 0 20px 0;
                            color: #ffffff;
                        }
                        &>ul{
                            width: 100%;
                            li{
                                width: 100%;
                                padding: 0;
                                height: 30px;
                                line-height: 30px;
                                span{
                                    width: 48%;
                                    display: inline-block;
                                    &:nth-child(2){
                                        text-align: right;
                                        color: #ffffff;
                                    }
                                    &:nth-last-child(1){
                                        color: #C3C3C3;
                                        text-align: right;
                                    }
                                }
                                span1{
                                    width: 48%;
                                    display: inline-block;
                                    &:nth-child(0){
                                        text-align: right;
                                        color: #ffffff;
                                    }
                                    &:nth-last-child(1){
                                        color: #C3C3C3;
                                        text-align: right;
                                    }
                                }
                                .percenttd{
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    right: 0;
                                    height: 30px;
                                    .percentDiv{
                                        position: absolute;
                                        //right: 0;
                                        width: 40%;
                                        height: 100%;
                                    }
                                }
                            }
                        }
                    }
                    .conversion{
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                        border-top: 1px solid #3B3B3B;
                        border-bottom: 1px solid #3B3B3B;
                        span{
                            margin-right: 10px;
                        }
                    }
                    .riseList{
                        li{
                            position: relative;
                            top: 0;
                            left: 0;
                            span{
                                &:nth-child(1){
                                    color: #2cf5a7;
                                }
                            }
                            .percenttd{
                                .percentDiv{
                                background-color: #00ff9b;
                                opacity: 0.2;
                                }
                            }
                        }
                    }
                    .fallList{
                        li{
                            position: relative;
                            top: 0;
                            left: 0;
                            span{
                                &:nth-child(1){
                                    color: #ff1100;
                                }
                            }
                            .percenttd{
                                .percentDiv{
                                    background-color: #ff1100 !important;
                                    opacity: 0.2;
                                }
                            }
                        }
                    }
                    .transtionBar{//切换限价市价
                        text-align: center;
                        .el-tabs__nav-scroll{
                            display: flex;
                        }
                        .el-tabs__nav{
                            overflow: hidden;
                            margin: 0 auto;
                        }
                        .el-tabs__item.is-top{
                            position: relative;
                            top: 0;
                            width:120px;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            color: #999999!important;
                            &::before{
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                bottom: 0;
                                right:0;
                                z-index: -1;
                                background-color: #232E3D;
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
                    }
                    .entrust_price,.priceBox{
                        margin-bottom: 20px;
                        .white{
                            margin-bottom: 10px;
                        }
                        .el-input__inner{
                            background-color: transparent;
                            border: 1px solid #3B3B3B;
                            color: #fff;
                        }
                        .el-input__suffix-inner{
                            display: inline-block;
                            line-height: 40px;
                            color: #FFFFFF;
                            margin-right: 16px;
                        }
                    }
                    .el-select{
                        width: 100%;
                        margin:20px 0 10px 0;
                    }
                    .el-input.is-disabled .el-input__inner,.el-select .el-input__inner{
                        background-color: transparent;
                        border: 1px solid #3B3B3B;
                        padding-left: 20px;
                        color: #ffffff;
                    }
                    .transaction_right_div{
                            margin-top: -19px;
                            border-top: 1px solid #3b3b3b00;
                            padding: 20px 0;
                        .el-input-number{
                            .el-input__inner{
                                background-color: transparent;
                                border: 1px solid #3b3b3b;
                                color: #ffffff;
                            }
                            .el-input-number__increase,.el-input-number__decrease{
                                background-color: transparent;
                                border: none;
                                color: #ffffff;
                            }
                        }
                        .priceBox{
                            display: flex;
                            flex-direction: column;
                            margin: 10px 0;
                            .el-input-number{
                                width: 100%;
                                margin-top: 10px;
                                .el-input-number__decrease,.el-input-number__increase{
                                    border: none;
                                    background-color: transparent;
                                    &:hover{
                                        color: @mainsColor;
                                    }
                                    i{
                                        color: #ffffff;
                                    }
                                }
                                .el-input__inner{
                                    background-color: transparent;
                                    border: 1px solid #3B3B3B;
                                    padding-left: 20px;
                                    color: #ffffff;
                                }
                            }
                        }
                        // 下单百分比
                        .blockPecent{
                            margin-top: 20px;
                            .el-tabs__item{
                                padding: 0 10px;
                                border-radius: 4px;
                                min-width: 34px;
                                text-align: center;
                                color: #ffffff!important;
                                margin-right: 14px;
                                height: 30px;
                                line-height: 30px;
                                border: 1px solid #3B3B3B;
                            }
                            .el-tabs__item.is-active{
                                background-color: @mainsColor;
                                border: 1px solid @mainsColor;
                            }
                        }
                        .bondClass{
                            p{
                                color: #ffffff;
                            }
                        }
                        .hasToken{
                            &>.el-button{
                                width: 100%!important;
                            }
                        }
                        .lastBtn{
                            margin-top: 20px;
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                            button{
                                width: 44%;
                            }
                            .buyBtn{
                                background: #44BCA7!important;
                                color:#fff !important;
                                border:1px solid#44BCA7!important;
                            }
                            .sellBtn{
                                background: #CD3D58!important;
                                color:#fff !important;
                                border:1px solid #CD3D58!important;
                            }
                            &>.nothing{
                                width: 48%;
                                height: 40px;
                                line-height: 40px;
                                display: inline-block;
                                border-radius: 4px;
                                text-align: center;
                                a{
                                    color:#fff !important;
                                }
                                &:nth-child(1){
                                    background: #44BCA7!important;
                                }
                                &:nth-last-child(1){
                                    background: #CD3D58!important;
                                }
                            }
                        }
                    }




                    .el-slider__button{
                        width: 10px;
                        height: 10px;
                        border: 6px solid #fff;
                        background-color: #6FC1A1;
                    }
                    .el-slider__bar{
                        background-color: #6FC1A1;
                    }
                    .el-slider__runway{
                        background-color: #8E8E8E;
                        &>div{
                            .el-slider__marks-stop{
                                background: #FFFFFF;
                                border: 2px solid #6FC1A1;
                                top: -2px;
                            }
                        }
                    }
                    .el-slider__stop{
                        background: #8E8E8E;
                    }
                }
                .el-select-dropdown__item.selected,.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: #2a2e44!important;
}
}
</style>
