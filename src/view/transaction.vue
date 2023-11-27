<template>
    <div class="transaction_div">
        <el-row>
            <el-col :xs="24" :sm="24" :md="17" :lg="19">
                <div class="grid-content">
                    <div class="transaction_left">
                        <div class="hasPadding">
                            <el-form ref="form" :model="form" class="selectLogoClass">
                                <img class="selectLogoClassImg" :src="selectLogoClassImg" alt="">
                                <el-form-item class="alignment">
                                    <el-select class="selectPair" v-model="form.region" :placeholder="$t('form.select')" @change="selectCoin" style="height: 40px;border: 1px solid #3b3e4c;border-radius: 22px;padding-left: 18px;margin-right: 140px;width: 339px;">
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
                        <div class="leftBzList" style="width:19%;color:#fff;position:absolute;left:0;top:80px;padding: 20px 20px 20px;background-color: #131722;height: 79.5%;overflow:auto;">
                            <div style="display:flex;justify-content:flex-end;padding:0 0 10px 0">
                                <div style="flex:1;padding-left:40px;">{{$t('nav.contract')}}</div>
                                <div style="width:140px;text-align:center">{{$t('transaction.newPirce')}}</div>
                                <div style="width:100px;text-align:center">{{$t('transaction.zhangfu')}}</div>
                            </div>
                            <div v-for="item in coinArr" :key="item.symbol" style="display:flex;justify-content:flex-end;padding:6px 0 6px 0">
                                <div style="flex:1;display:flex;align-items: center;">
                                    <img :src="item.symbolLogo" alt="" style="width: 20px;height: 20px;margin-right: 4px;padding: 8px 8px;border-radius: 50px;">
                                    <span>{{item.symbol}}</span>
                                </div>
                                <div style="width:250px;padding: 8px 8px;text-align:center">{{item.symbol == form.region?newPirce:item.close}}</div>
                                <div style="width:100px;padding: 8px 8px;text-align:center" :class="item.rose>0?'green':'red'">{{item.rose>0?'+':''}}{{(item.rose).toFixed(2)}}%</div>
                            </div>
                        </div>
                        <!-- 左侧币种列表 -->


















                <!--买入卖出，居中-->




               <el-col :xs="24" :sm="24" :md="7" :lg="5">
                <div class="grid-content transaction_right" style="background-color: rgb(10, 22, 39);padding: 20px;height: 38%;width: 26.5%;top: 700px;transform: translateX(74.5%);">

                    <div class="transaction_right_div">
                        <el-tabs class="transtionBar" v-model="activeIndex" @tab-click="handleIndex">
                            <el-tab-pane :label="$t('transaction.limit')" name="0"></el-tab-pane>
                            <el-tab-pane :label="$t('transaction.market')" name="1"></el-tab-pane>
                        </el-tabs>
                        <!-- 杠杆倍率列表 -->
                        <div class="lever_box">
                            <p class="white">{{$t('transaction.leverage')}}：</p>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane v-for="item in levarageArr"  :key="item.id" :label="item.name" :name="item.name"></el-tab-pane>
                            </el-tabs>
                        </div>
                        <!-- 委托价格 -->
                        <div class="entrust_price">
                            <span class="white">{{$t('transaction.waitPrice')}}</span>
                            <el-input v-if="activeIndex == '0'" v-model="goodPrice" @input="addPrice" autocomplete="off" :placeholder="$t('transaction.goodPrice')">
                                <span slot="suffix">USDT</span>
                            </el-input>
                            <el-input v-else autocomplete="off" disabled :placeholder="$t('transaction.market')"></el-input>
                        </div>
                        <!-- 手数 -->
                        <div class="priceBox">
                            <div class="betweenSpread">
                                <span class="white">{{$t('transaction.hands')}}</span>
                                <span style="color:#fff">{{$t('transaction.firstPrice')}}{{hands}}{{getCoin}}</span>
                            </div>
                            <el-input-number v-model="num" @change="changeNum" :step="0.1" :min="0.1" :placeholder="$t('transaction.num')"></el-input-number>
                        </div>
                        <!-- 下单百分比 -->
                        <div class="blockPecent">
                            <el-tabs v-model="percentActive" @tab-click="handlePercent">
                                <el-tab-pane v-for="item in pecentArr"  :key="item.id" :label="item.name" :name="item.value"></el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="bondClass">
                            <p>
                                <span>{{$t('transaction.occupy')}}</span>
                                <span>{{occupy}} USDT</span>
                            </p>
                            <p>
                                <span>{{$t('transaction.userBlance')}}</span>
                                <span>{{useBond}} USDT</span>
                            </p>
                            <p>
                                <span>{{$t('coin.bond')}}：{{figure}}</span>
                                <span>{{$t('coin.fee')}}：{{relief}}</span>
                            </p>
                        </div>
                        <div class="lastBtn" v-if="token">
                            <el-button class="buyBtn" @click="submitFun('BUY')" type="button">{{$t('transaction.buy')}}</el-button>
                            <el-button class="sellBtn" @click="submitFun('SELL')" type="button">{{$t('transaction.sell')}}</el-button>
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


               <el-col :xs="24" :sm="24" :md="7" :lg="5">
                <div class="grid-content transaction_right" style="background-color: rgb(10, 22, 39);padding: 20px;height: 38%;width: 26.5%;top: 700px;transform: translateX(176%);">

                    <div class="transaction_right_div">
                        <el-tabs class="transtionBar" v-model="activeIndex" @tab-click="handleIndex">
                            <el-tab-pane :label="$t('transaction.limit')" name="0"></el-tab-pane>
                            <el-tab-pane :label="$t('transaction.market')" name="1"></el-tab-pane>
                        </el-tabs>
                        <!-- 杠杆倍率列表 -->
                        <div class="lever_box">
                            <p class="white">{{$t('transaction.leverage')}}：</p>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane v-for="item in levarageArr"  :key="item.id" :label="item.name" :name="item.name"></el-tab-pane>
                            </el-tabs>
                        </div>
                        <!-- 委托价格 -->
                        <div class="entrust_price">
                            <span class="white">{{$t('transaction.waitPrice')}}</span>
                            <el-input v-if="activeIndex == '0'" v-model="goodPrice" @input="addPrice" autocomplete="off" :placeholder="$t('transaction.goodPrice')">
                                <span slot="suffix">USDT</span>
                            </el-input>
                            <el-input v-else autocomplete="off" disabled :placeholder="$t('transaction.market')"></el-input>
                        </div>
                        <!-- 手数 -->
                        <div class="priceBox">
                            <div class="betweenSpread">
                                <span class="white">{{$t('transaction.hands')}}</span>
                                <span style="color:#fff">{{$t('transaction.firstPrice')}}{{hands}}{{getCoin}}</span>
                            </div>
                            <el-input-number v-model="num" @change="changeNum" :step="0.1" :min="0.1" :placeholder="$t('transaction.num')"></el-input-number>
                        </div>
                        <!-- 下单百分比 -->
                        <div class="blockPecent">
                            <el-tabs v-model="percentActive" @tab-click="handlePercent">
                                <el-tab-pane v-for="item in pecentArr"  :key="item.id" :label="item.name" :name="item.value"></el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="bondClass">
                            <p>
                                <span>{{$t('transaction.occupy')}}</span>
                                <span>{{occupy}} USDT</span>
                            </p>
                            <p>
                                <span>{{$t('transaction.userBlance')}}</span>
                                <span>{{useBond}} USDT</span>
                            </p>
                            <p>
                                <span>{{$t('coin.bond')}}：{{figure}}</span>
                                <span>{{$t('coin.fee')}}：{{relief}}</span>
                            </p>
                        </div>
                        <div class="lastBtn" v-if="token">
                            <el-button class="buyBtn" @click="submitFun('BUY')" type="button">{{$t('transaction.buy')}}</el-button>
                            <el-button class="sellBtn" @click="submitFun('SELL')" type="button">{{$t('transaction.sell')}}</el-button>
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
























<!--买入卖出，居中-->


































                        <div class="picture" style="width: 73%;float: right;">
                            <TradeView :nowPrice="newPirce" :symbolValue="form.region" :type="1"  @getValueDise="getValueDise" />
                        </div>

                    </div>
                    <div style="padding: 0px 14px;width: 124%;">
                            <OrderRecord :symbolValue="form.region" :coinArr="coinArr" />
                    </div>
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
                            <li v-for="item in sellArr" :key="item.id" style="display:flex;">
                                <span>{{item[2]|dateFormat()}}</span>
                                <span style="text-align:center">{{(item[0]).toFixed(interception)}}</span>
                                <span style="text-align:right;color:#d2d9ff;">{{(item[1]).toFixed(4)}}</span>
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
                            <li v-for="item in buyArr" :key="item.id" style="display:flex;">
                                <span>{{item[2]|dateFormat()}}</span>
                                <span style="text-align:center">{{(item[0]).toFixed(interception)}}</span>
                                <span style="text-align:right;color:#d2d9ff;">{{(item[1]).toFixed(4)}}</span>
                                <div class="percenttd">
                                    <span class="percentDiv" :style="'width:'+((item[1]/buyHigh) * 100).toFixed(2)+'%'"></span>
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
                    <div class="transaction_right_div">




                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import OrderRecord from '@/components/OrderRecord'
import { ticketApi,tradeListApi,contractPageApi,contractApi,realListApi } from '@/api/getData'
import TradeView from '@/components/TradeView'
import codeStatus from '@/config/codeStatus'
import logosArr from '@/logoSrc/index.js'
export default {
    data(){
        return{
            selectLogoClassImgFlag:false,
            selectLogoClassImg:'',
            activeIndex:'0',//限价
            goodPrice:1,//限价的委托价格
            num: 0.1,//手数
            hands:'',//手数值
            activeName:'0',//默认杠杆的值
            sliderValue:'',//杠杆id
            levarageArr:[],//杠杆数组
            levarageLabel:'',//杠杆值
            form:{//默认币种
                region:'BTC/USDT'
            },
            coinArr:[],//币种数组
            buyArr:[],
            buyHigh:'',
            sellArr:[],
            sellHigh:'',
            wTimerList:null,//币种计时器
            wRealList:null,
            newPirce:'',//最新价，收盘价
            highForth:'',//最高价
            lossForth:'',//最低价
            amountPirce:'',//持仓量
            rose:'',//幅度
            cny:'',//换算人民币
            useBond:'0.00',//可用余额
            getIndex:0,
            timeTimer:null,

            getPair:0,
            occupy:'0.00',//委托占用
            percentActive:'0',//比例
            changeValue:'',//比例历史值
            isClick:false,//是否显示比例值
            pecentArr:[{name:'25%',value:"25"},{name:'50%',value:"50"},{name:'75%',value:"75"},{name:'100%',value:"100"}],//比例数组
            token:sessionStorage.getItem('userToken'),
            feeRadio:'',//开仓手续费率
            figure:'0.00',//仓位保证金
            relief:'0.00',//开仓手续费
            interception:'',//保留几位小数
            hitNum:0,
            selectPanKou:true,
            realFlag:true,
            realTimeList:[],//实时交易数据
        }
    },
    created(){
        var that = this;
        that.ticketFun();
        that.wTimerList = setInterval(function(){
            that.ticketFun()
        },300)
        that.wRealList = setInterval(function(){
            that.getRealList()
        },1000)
        that.timeTimer = setInterval(function(){
            that.tradeFun(); //行情深度
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
            var getValue = arr.split('/')[0];
            return getValue
        },
        getNew(){
            return this.newPirce
        },
        getGoodPrice(){//监听限价的委托价格
            return this.goodPrice
        }
    },
    watch:{
        selectLogoClassImgFlag(n){
            if(n){
                this.selectLogoClassImg = this.coinArr[0].symbolLogo
            }
        },
        getNew(newValue){
            var that = this;
            if(that.activeIndex == '1'){//市价
                that.getBond();
            }
        },
        getGoodPrice(newValue){
            var that = this;
            if(that.activeIndex == '0'){//限价
                if(that.hands){
                    that.getBond();
                }

            }
        }
    },
    mounted(){
        this.contractFun() ;

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
          dataArr.set('type','1');
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
            }
            if(that.realTimeList.length>0){
              that.realFlag = false
               that.newPirce =that.realTimeList[0].price.toFixed(that.interception)
            }

          }else{
            clearInterval(that.wRealList)
          }
        },
        async ticketFun(){//获取币种
            var that = this;
            var data =new URLSearchParams();
            data.set('type',1);
            var res = await ticketApi(data);
            if(res.success){
                var obj = res.data;
                that.coinArr = [];

                obj.forEach((element,index) => {
                    if(element.symbol != ''){
                        if(that.form.region == element.symbol){
                            // if(that.getIndex == 0){

                            // }
                            that.highForth = element.high;
                            that.lossForth = element.low;


                            that.cny = element.cny;

                            that.amountPirce = element.amount;
                            that.rose = ((element.rose)).toFixed(2);
                            if(that.getPair == 0){
                                that.goodPrice = element.close
                            }

                            that.interception = Number(element.number);

                          if(that.realFlag){
                            that.newPirce = that.interception != '' ? (element.close).toFixed(that.interception) : (element.close);
                          }
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
                clearInterval(that.wTimerList);
            }
        },

        getTicketsDetail(){//获取某个币种的行情
            var that = this;
            var value = ((that.form.region).split('/')).join('-');
            fetch('https://t.me/usdtvps666linear-swap-ex/market/detail/merged?contract_code='+value, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
            })
            .then(res => {
                res.json()
            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
        },
        async tradeFun(){//行情深度
            var that = this;
            var dataArr = new URLSearchParams();
            dataArr.set('symbol',that.form.region);
            dataArr.set('type','1');
            var res = await tradeListApi(dataArr);
            if(res.success){
                var buyArr = [],sellArr = [];
                var buyArrObj = res.data.bids;//买单
                var sellArrObj = res.data.asks;//卖单
                // 买单列表（从高到低）
                buyArrObj.sort(function(x,y){
                    return y[0] - x[0];
                })

                for(var i in buyArrObj){
                    buyArr.push(buyArrObj[i]);
                }
                that.buyArr = [];
                that.buyArr = buyArr.slice(0,17);//绿色价格显示条数

                var buyNum =  buyArr.slice(0,10);
                buyNum.sort(function(x,y){
                    return y[1]-x[1]
                })

                that.buyHigh = buyNum[0][1];

                // 卖单列表（从低到高）
                sellArrObj.sort(function(x,y){
                    return x[0] - y[0];
                })
                for(var i in sellArrObj){
                    sellArr.push(sellArrObj[i]);
                }

                // 按照价格数组排序
                that.sellArr = [];

                var newArr = sellArr.slice(0,20); // 红色价格显示条数
                newArr.sort(function(x,y){
                    return y[0] - x[0];
                })

                that.sellArr = newArr;

                // 获取最高的数量值
                var sellNum =  sellArr.slice(0,10);
                sellNum.sort(function(x,y){
                    return y[1]-x[1]
                })
                that.sellHigh = sellNum[0][1];


            }else{
                clearInterval(that.timeTimer)
            }
        },
        async contractFun(){//获取手数值、可用余额和手续费
            var that = this;
            if(that.token){
                var dataArr = new URLSearchParams();
                dataArr.set('symbols',that.form.region);
                var res = await contractPageApi(dataArr);
                if(res.success){
                    var data = res.data;
                    // console.log(data);
                    that.hands = data.handNumber;
                    that.useBond = data.price;
                    that.feeRadio = Number(data.openFeePrice) / 100;
                    var arr = data.leverageList;
                    that.levarageArr = arr;
                    if(arr.length>0){
                        that.activeName = arr[0].name;//默认杠杆的值
                        that.sliderValue = arr[0].id;//杠杆id
                        that.levarageLabel = Number((arr[0].name).replace('x',''));//杠杆值
                    }
                    that.getBond();
                }
            }
        },
        selectCoin(value){//选择币种
            var that = this;
            that.form.region = value;
            that.getPair = 0;
            that.realTimeList=[]
            that.realFlag = true
            that.contractFun();

            let imgSrc = logosArr.filter(v=>v.name==value);
            this.selectLogoClassImg = imgSrc[0].logo;
        },
        async submitFun(type){//合约交易
            var that = this;
            if(that.num == ''){
                that.$message.error(that.$t('nav.numEmpty'));
                return false;
            }
            var way = '',price='';
            if(that.activeIndex == '0'){//限价
                way = 'LIMIT';

                price = that.goodPrice;
            }else{//市价
                way = 'MARKET'
                price = that.newPirce;
            }

            var dataArr = new URLSearchParams();
            dataArr.set('symbols',that.form.region);
            dataArr.set('unit',price);
            dataArr.set('numbers',that.num);
            dataArr.set('compactType',type);
            dataArr.set('dealWay',way);
            dataArr.set('leverageId',that.sliderValue);
            dataArr.set('coin','USDT');
           
            that.hitNum += that.hitNum+1;
            if(that.hitNum == 1){
                var res = await contractApi(dataArr);
                if(res.success){
                    that.$message({
                        type:'success',
                        message:res.msg
                    })
                    that.num = 0.1;
                    that.contractFun();
                }else{

                    codeStatus(res.code,function(msg){
                        that.$message.error(msg);
                    })
                }

                setTimeout(()=>{
                    that.hitNum = 0
                },1500)
            }

        },
        handleIndex(){//切换限价、市价
            this.hitNum = 0
        	this.getBond();
        },
        handleClick(value){//切换杠杆
            var that = this;
            var getName = value.name;
            that.levarageLabel = Number(getName.replace('x',''));
            var arr = that.levarageArr;
            arr.forEach(element => {
                if(element.name == getName){
                    that.sliderValue = element.id;
                }
            });

            that.getBond();
            that.computedStep();
        },
        handlePercent(tab, event){//重复点击取消选择比例
            var that = this;
            if(Number(that.percentActive) == Number(that.changeValue)){
                that.isClick = !(that.isClick);

                if(that.isClick){
                    that.percentActive = '0';
                }
            }else{
                that.percentActive = tab.name;
                that.isClick = false;
            }

            that.changeValue = tab.name;

            that.computedStep();
            that.getBond();
        },
        changeNum(value){//手数
            var that = this;
            //var patrn = /^\+?[1-9][0-9]*$/;//正整数
          // var patrn = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/ //正小数
          var patrn = /^[0-9][0-9]*([\\.][0-9]{1,2})?$/;
            if(!(patrn.test(value))){
                that.num = '';
                return false;
            }else{
                that.getBond();
            }
        },
        getBond(){//计算占用保证金
            var that = this;
            //一、仓位保证金  (委托手数*每手价值数量*委托价格/杠杆倍数)
            var price = '';
            if(that.activeIndex == '0'){//限价
                price = Number(that.goodPrice);
            }else{//市价
                price = Number(that.newPirce);
            }

            if(that.levarageLabel == ''){
                return false;
            }

            that.figure = (Number(that.num) * that.hands * price / that.levarageLabel).toFixed(2);

            //二、开仓手续费 （委托手数*每手价值数量*委托价格*开仓手续费率）
            that.relief = (that.num * Number(that.hands) * price * Number(that.feeRadio)).toFixed(2);

            //三、委托占用 （仓位保证金+开仓手续费）
            that.occupy = (Number(that.figure) + Number(that.relief)).toFixed(2);

        },
        addPrice(value) {//加限价最优价格
            var that = this;
            that.getBond();

        },
        computedStep(){//计算手数
            var that  = this;
            if(that.percentActive == '0'){
                return false;
            }

            var price = '';
            if(that.activeIndex == '0'){//限价
                price = Number(that.goodPrice);
            }else{//市价
                price = Number(that.newPirce);
            }

            // 手数 = （可用余额*比例*杠杆）/（委托价格*每手价值数量+委托价格*每手价值数量*开仓手续费率*杠杆）

            var step1 = Number(that.useBond) * Number(that.percentActive)/100 * that.levarageLabel;

            var step2 = price * that.hands;

            var step3 = step2 * that.feeRadio * that.levarageLabel;
            var step = Number(step2) + Number(step3);
            that.num = Math.floor(step1 / step);
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
        }
    },
    beforeDestroy(){
        clearInterval(this.wTimerList);
        clearInterval(this.wRealList);
        clearInterval(this.timeTimer);
    },
    components:{
        OrderRecord,TradeView
    }
}
</script>
<style lang="less">
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
.transaction_div{
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
            margin-left: -108px;
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
            background-color: #131722;
            padding: 20px 20px 20px;
            height: 69.6%;
            position: absolute;
            top: 81px;
            width: 19%;
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
                        color: #0fbf69;
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
        .lever_box{//杠杆
            .el-tabs__nav{
                flex-wrap: wrap;
            }
            .el-tabs__item{
                padding: 0 10px!important;
                background-color: #262A38;
                border-radius: 4px;
                min-width: 34px;
                text-align: center;
                color: #999999!important;
                margin-right: 14px;
                height: 30px;
                line-height: 30px;
            }
            .el-tabs__item.is-active{
                background-color: @mainsColor;
                color: #ffffff!important;
            }
        }
        .entrust_price{
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
        .el-input.is-disabled .el-input__inner{
            background-color: transparent;
            border: 1px solid #3B3B3B;
            padding-left: 20px;
            color: #ffffff;
        }
        .transaction_right_div{
                margin-top: -20px;
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
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    color: #ffffff;
                    margin-top: 26px;
                    &:nth-last-child(1){
                        span{
                            color: #8E8E8E;
                        }
                    }
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
}

.el-select-dropdown__item.selected,.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: #575F67!important;
}
</style>
