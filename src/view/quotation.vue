<template>
    <div class="home_div">
        <div class="container" style="width: 1500px;">

        <div style="height:30px;"></div>

        <div class="el-table table el-table--fit el-table--enable-row-hover el-table--enable-row-transition">

        <div class="market">
			<Trade :activeName="activeName" />
		</div>
            <el-table border :data="tableData" :emptyText="emptyText"  @row-click="detailFun" style="width:100%">
                <el-table-column align="center" prop="symbol" :label="$t('home.huobi10')">
                    <template slot-scope="scope">
                    <div class="symbolBox">
                        <img :src="scope.row.img" alt="">
                        <span>{{scope.row.symbol}}</span>
                    </div>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="cny" :label="$t('home.huobi11')">
                    <template slot-scope="scope">
                    <div>${{scope.row.open}}</div>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="cny" :label="$t('home.huobi22')">
                    <template slot-scope="scope">
                        <span> ≈ {{rateObj.sign}} {{scope.row.cny}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="rose" :label="$t('home.huobi12')" >
                <template slot-scope="scope">
                    <div :class="scope.row.rose>0?'greenColor':'redColor'">{{scope.row.rose>0?'+':''}}{{scope.row.rose.toFixed(2)}}%</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="high" :label="$t('home.huobi13')">
                    <template slot-scope="scope">
                    <div>${{scope.row.high}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="low" :label="$t('home.huobi14')">
                    <template slot-scope="scope">
                    <div>${{scope.row.low}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="count" :label="$t('home.huobi15')" />

                <el-table-column align="center" prop="rose" :label="$t('home.huobi21')">
                    <template slot-scope="scope">
                        {{echartsInit(scope.$index,scope.row.rose)}}
                    <div class="echarts" :id="`echarts${scope.$index}`"></div>
                    </template>
                </el-table-column>
            </el-table>
        <div>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :currentPage="currentPage"
            :page-size="30"
            layout="prev, pager, next"
            :prev-text="$t('bico.W115')"
            :next-text="$t('bico.W116')"
            :total="total">
        </el-pagination>
    </div>


</div>
<div style="height:200px;"></div>

</div>

        <Foot />
    </div>
</template>
<script>
import Trade from '@/components/trade'
import Foot from '@/components/Foot'
import { partenApi,bannerApi,ticketApi } from '@/api/getData'
import appDown from '@/config/appDown'
import logosArr from '@/logoSrc/index.js'
import echarts from 'echarts'
export default {
    data(){
        return{
          emptyText:this.$t('tip.noRecord'),
            testNum:3,//美元虚拟全球成交量数据初始值
            bannerArr:[],//banner图
            isToken:sessionStorage.getItem('userToken'),
            lang:sessionStorage.getItem('language'),
            rateObj :JSON.parse(sessionStorage.getItem('platFormRate')),
            rateNumber:sessionStorage.getItem("platFormRateNumber"),
            activeName:'1',
            tableData:[],
            currentPage:1,
            tableDataAllArr:[],
            total:0,
        }
    },
    created(){
        console.log(logosArr)
        this.randomNum();

        var data =new URLSearchParams();
        data.set('type',this.activeName);

        setInterval(()=>{
            ticketApi(data).then(res=>{
                let datas = res.data;
                // for(let i of datas){
                //     for(let j of logosArr){
                //         if(i.symbol==j.name){
                //             i.symbolLogo = j.logo;
                //             break;
                //         }
                //     }
                // }
                //测试数据
                // let d = JSON.parse(JSON.stringify(datas));
                // for(let i = 0;i<10;i++){
                //    datas = [...datas,...d]
                // };
                let tableDataAllArr = [];
                for(let i = 0;i<datas.length;i+=30){
                    tableDataAllArr.push(datas.slice(i,i+30))
                }
                this.tableDataAllArr = tableDataAllArr;
                this.tableData = tableDataAllArr[this.currentPage-1];
                this.total = datas.length;
            });
        },1000);
    },
    mounted(){
    },
    methods:{
      detailFun(item){
        var that = this;
        that.$router.push('/currencyTrade?symbol='+item.symbol);
      },
        echartsInit(index,rose){
            var base = +new Date(1988, 9, 3);
            var oneDay = 24 * 3600 * 1000;
            var eColor = rose>0?'#2bf28b':'#E45247';//上涨就是冒号：前面的颜色，下跌就是后面的颜色
            var data = [[base, Math.random() * 300]];
            for (var i = 1; i < 100; i++) {//这里的100就是图片中点的密度，可以随便改，但是最好不要太大，也不要太小最好是3000以内嘛，你看情况
                var now = new Date(base += oneDay);
                data.push([
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])
                ]);
            }
            let option = {
                grid:{
                top:0,
                bottom:0,
                left:0,
                right:0,
                },
                xAxis: {
                type: 'time',
                boundaryGap: false,
                show:false,
                },
                yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                show:false,
                },
                series: [
                {
                    name: '模拟数据',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                        offset: 0,  color: eColor
                        }, {
                        offset: 1, color: '#FFFFFF' //   0% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                    },
                    lineStyle:{
                    color: eColor
                    },
                    data: data
                }
                ]
            };
            this.$nextTick(()=>{
                let myChart = echarts.init(document.getElementById(`echarts${index}`));
                myChart.setOption(option)
            })
        },
        handleSizeChange(size){
        },
        handleCurrentChange(page){
            this.currentPage = page;
            this.tableData = this.tableDataAllArr[page-1];
        },

        randomNum(){
            let rand = Math.ceil(Math.random()*6);//美元全球成交量初始数据值
            setInterval(()=>{
                this.testNum += rand;
            },1000)
        },
        handleClick(){

        },
        checkPair(){
            if(this.activeName == '1'){
                this.$router.push('/transaction')
            }else{
                this.$router.push('/legalTrastion')
            }
        },
        jumpRegister(){
            this.$router.push('/register')
        }
    },
    components:{
        Trade,Foot
    }
}
</script>
<style lang="less">
.echarts{
    width: 200px;
    height: 70px;
}
.symbolBox{
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width: 24px;
        height: 24px;
        margin-right: 18px;
        border-radius: 30px;
        background-color: #ffffff;
    }
}
.greenColor{
    color: #2ead65;
}
.redColor{
    color: red;
}
.home_div{
    //轮播图
    .block{
        a{
            display: inline-block;
            width: 100%;
            height: 100%;
            .imgFull{
                object-fit: cover;
            }
        }
        .el-carousel__arrow{
                background: rgba(0, 0, 0, 0.13);
                height: 60px;
                width: 30px;
                border-radius: 2%;
            &>i{
                    color: #ffffffa8;
                    font-weight: inherit;
                    font-size: 26px;
            }
        }

    }
    .market{
        .container{
            h2{

                margin-right: 30px;
                font-weight: inherit;
            }
            .market_title{
                margin: 50px 0 20px 0;
                .el-tabs__header{
                    margin: 0;
                }

                .el-tabs__item.is-active{
                            color: #2b2727 !important;
                            float: left;
                            text-align: center;
                            margin-left: 4px;
                            height: 44px;
                            border-radius: 0px;
                            font-size: 18px;
                            line-height: 44px;
                            padding: 0 16px;
                            background: #fff !important;
                            font-weight: 700;
                            border-bottom: 2px solid #2271e6;
                }
                .el-button--default{
                        color: #6977b1 !important;
                        float: left;
                        text-align: center;
                        margin-left: 4px;
                        height: 44px;
                        border-radius: 4px;
                        font-size: 16px;
                        line-height: 44px;
                        padding: 0 16px;
                        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
                        border: 1px solid #b9c1e2;
                    span{
                        color: #7b83a2;
                    }
                }
            }
        }
    }
    .article {
        h2{
            margin: 40px 0;
            font-size: 28px;
            font-weight: inherit;
        }
        .article_box {
            ul{
                display: flex;
                flex-direction: row;
                li{
                    width: 33%;
                    margin-right: 28px;
                    text-align: center;
                    padding:0 22px;
                    &:nth-last-child(1){
                        margin: 0;
                    }
                    p{
                        font-size: 18px;
                        line-height: 40px;
                        border-bottom: 1px solid #3C3C3C;
                    }
                    span{
                        font-size: 12px;
                        color: #8E8E8E;
                    }
                    img{
                        width: 260px;
                    }
                }
            }
        }
    }
    .downloadBox{
        padding: 0px 0;
        background-color: #ffffff;
        margin: 50px 0;
        h2{
               line-height: 1;
                text-shadow: 0px 2px 3px rgb(212, 212, 212);
                font-size: 28px;
                text-align: center;
                color: #60656b;
                font-weight: inherit;
        }
        .vertical{
            margin: 0px 0  0 60px;
            .downImg{
                background-color: #ffffff;
                padding: 4px;
                margin-left: 6px;
                transition:all 1s ease-out;
                -webkit-transition: all 1s ease-out;
                -moz-transition: all 1s ease-out;
                -o-transition:all 1s ease-out;
                z-index: 1;
                background: #fff;
                outline: 1px solid #2483ff;
                &:hover{
                    transform:scale(1.5);
                    -webkit-transform: scale(1.5);
                    -moz-transform:scale(1.5);
                    -o-transform:scale(1.5)
                }
            }
        }
        .verticalBox{
            width: 520px;
            margin: 30px auto;
        }
    }


    .feature_wrap[data-v-63c57342] {
        width: 100%;
        min-height: 0px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;

        //padding: 40px 0 85px;
        text-align: center;
        color: #495666;
        line-height: 2em;
        font-size: 16px;
    }

    .feature_wrap .feature_list[data-v-63c57342] {
        padding-top: 73px;
        width: 70%;
        margin: 0 auto;
    }
    .feature_wrap .feature_list li div[data-v-63c57342] {
        font-size: 0;
        margin-bottom: 70px;
        height: 53px;
    }

    .feature_wrap .feature_list li[data-v-63c57342] {
        float: left;
        width: 33%;
        background: transparent none no-repeat top;
        padding-top: 0;
    }

    .feature_wrap .feature_list li div[data-v-63c57342] {
        font-size: 0;
        margin-bottom: 70px;
        height: 53px;
    }

    .feature_wrap .feature_list li p.title[data-v-63c57342] {
        color: #1c242c;
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 10px;
    }

    .feature_wrap .feature_list li p[data-v-63c57342] {
        font-size: 14px;
        color: #54748f;
        line-height: 28px;
    }

    .feature_wrap .feature_list li p[data-v-63c57342] {
        font-size: 14px;
        color: #54748f;
        line-height: 28px;
    }

    .feature_wrap h2[data-v-63c57342] {
        font-size: 30px;
        margin-bottom: 20px;
    }

    .feature_wrap h2 b {
        padding: 0 10px;
        color: #3F51B5;
    }

    .home_div .table {
        width: 1200px;
        margin: 50px auto;
    }
    .client_wrap .wrap_in[data-v-46167268] {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 860px;
        padding-top: 126px;
        width: 1200px;
        margin: 0 auto;
        background-size: cover;
    }

    .client_wrap .block_title[data-v-46167268] {
        font-size: 30px;
        margin-bottom: 22px;
        color: #495666;
    }
    .client_wrap[data-v-46167268] {
        width: 100%;
        color: #787c92;
        text-align: center;
        line-height: 2em;
        background: #ffffff
        //background: #fff url(../assets/bg.png) no-repeat;
    }

    .client_wrap .sub_title[data-v-46167268] {
        font-size: 16px;
        margin-bottom: 60px;
    }
    .client_wrap ul[data-v-46167268] {
        max-width: 260px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        text-align: left;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        float: left;
        margin-left: 52px;
        margin-top: -36px;
    }

    .home_div .client_wrap #moons_mind[data-v-46167268] {
        width: 1200px;
        margin: 0 26px 0 0;
        position: relative;
        float: right;
    }

    .can_animate {
        -webkit-animation: slideup .3s;
        animation: slideup .3s;
    }

    .client_wrap ul[data-v-46167268] {
        max-width: 260px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        text-align: left;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        float: left;
        margin-left: 52px;
        margin-top: -36px;
    }


    .client_wrap ul li a[data-v-46167268] {
        min-width: 172px;
        height: 64px;
        display: block;
        color: #f2f6fa;
        padding: 16px 10px;
        line-height: 32px;
        position: relative;
        font-size: 14px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid transparent;
        border-radius: 2px;
        overflow: hidden;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
    }



    .mock-a, a {
        color: #2483ff;
        text-decoration: none;
        -webkit-transition: all .2s cubic-bezier(.645,.045,.355,1);
        -o-transition: all .2s cubic-bezier(.645,.045,.355,1);
        transition: all .2s cubic-bezier(.645,.045,.355,1);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }


    .client_wrap ul li i[data-v-46167268] {
        display: inline-block;
        height: 32px;
        width: 32px;
        margin: 0 10px 0 0;
        text-align: center;
        vertical-align: top;
        border-radius: 50%;
        background: #fff;
        padding-top: 3px;
        position: relative;
        overflow: hidden;
    }

    .client_wrap ul li a.download i img.icon[data-v-46167268] {
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .client_wrap ul li a.download i img[data-v-46167268] {
        position: absolute;
        left: 9px;
        -webkit-transition: top .5s;
        -o-transition: top .5s;
        transition: top .5s;
    }

    .client_wrap ul li.qr div[data-v-46167268] {
        position: relative;
        z-index: 1;
        width: 172px;
        height: 172px;
        background: #fff;
        border: 10px solid #2d448b;
        outline: 1px solid #2483ff;
    }
    .client_wrap ul li[data-v-46167268] {
        min-width: 172px;
        font-size: 18px;
        margin-bottom: 8px;
    }

    .client_wrap ul li[data-v-46167268] {
        min-width: 172px;
        font-size: 18px;
        margin-bottom: 8px;
    }


    .client_wrap #moons_mind .mac[data-v-46167268] {
        width: 876px;
        height: 480px;
        border-radius: 3px 3px 0 0;
        position: relative;
        float: right;

    }
    .client_wrap #moons_mind.load .mac div img[data-v-46167268] {
            width: 100%;
            height: 100%;
    }

    .client_wrap #moons_mind .phone[data-v-46167268] {

        right: 370px;
        bottom: 1056px;
        width: 122px;
        height: 253px;
        background: none no-repeat 50%/cover;
    }

    .register_wrap[data-v-2bd6cbe3] {
        //height: 300px;
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;

        background: #fff;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .register_wrap .block_title[data-v-2bd6cbe3] {
        line-height: 1;
        font-size: 28px;
        text-align: center;
        color: #ffffff;
        font-weight: inherit;
        margin-top: -200px;
        z-index: 9;
    }

    .register_wrap .input_wrap[data-v-2bd6cbe3] {
        margin-top: 0px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        z-index: 9;
    }

    .register_wrap input[data-v-2bd6cbe3] {
        width: 480px;
        height: 48px;
        font-size: 16px;
        color: #000;
        border: 1px solid #bdced9;
        border-radius: 2px;
        padding-left: 16px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .register_wrap button[data-v-2bd6cbe3] {
        margin-left: 8px;
        display: inline-block;
        height: 48px;
        padding: 0 44px;
        font-size: 18px;
        min-width: 120px;
        -webkit-appearance: none;
        background-color: #0066ed;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 2px;
        -webkit-transition: background-color .2s;
        -o-transition: background-color .2s;
        transition: background-color .2s;
    }
    .partner{
        h2{
            margin: 40px 0;
            font-size: 28px;
            font-weight: inherit;
        }
        ul{
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            flex-direction: row;
            flex-wrap: wrap;
        }
        li{
            width: 33%;
            margin-bottom: 40px;
            a{
                width: 320px;
                text-align: center;
                display: inline-block;
                cursor: pointer;
                img{
                    border-radius: 2px;
                    height: 120px;
                }
                p{
                    color: #ffffff;
                }
            }
        }
    }
}
</style>
