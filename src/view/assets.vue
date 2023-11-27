<template>
<div class="assets_div">
        <div data-v-7babfee8="" class="page">
            <section data-v-2baeab78="" data-v-7babfee8="" class="sidebar">
                <div data-v-2baeab78="" class="inner">
                    <div data-v-2baeab78="" class="switch">
                        <div data-v-2baeab78="" class="button"></div>
                    </div>

                    <div data-v-2baeab78="" class="account-list">
                        <dl data-v-2baeab78="" class="">

                        <dt data-v-2baeab78="" class="overview"></dt>
                        <dd data-v-2baeab78="">
                                <el-tabs class="titleBar" v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="$t('assets.account')" name="0"></el-tab-pane>
                                </el-tabs>
                            </dd>
                        </dl>

                        <dl data-v-2baeab78="" class="">
                            <dt data-v-2baeab78="" class="spot"></dt>
                            <dd data-v-2baeab78="">
                                <el-tabs class="titleBar" v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="$t('assets.recharge')" name="1"></el-tab-pane>
                                </el-tabs>
                            </dd>
                        </dl>

                        <dl data-v-2baeab78="" class="">
                            <dt data-v-2baeab78="" class="margin"></dt>
                            <dd data-v-2baeab78="">
                                <el-tabs class="titleBar" v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="$t('assets.withdraw')" name="2"></el-tab-pane>
                                </el-tabs>
                            </dd>
                        </dl>

                        <dl data-v-2baeab78="" class="">
                            <dt data-v-2baeab78="" class="otc"></dt>
                            <dd data-v-2baeab78="">
                                <el-tabs class="titleBar" v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="$t('assets.transfer')" name="3"></el-tab-pane>
                                </el-tabs>
                            </dd>
                        </dl>

                        <dl data-v-2baeab78="" class="">
                            <dt data-v-2baeab78="" class="otc-options"></dt>
                            <dd data-v-2baeab78="">
                                <el-tabs class="titleBar" v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="$t('assets.record')" name="4"></el-tab-pane>
                                </el-tabs>
                            </dd>
                        </dl>

                        <dl data-v-2baeab78="" class="">
                            <dt data-v-2baeab78="" class="crypto-loans"></dt>
                            <dd data-v-2baeab78="">
                                <el-tabs class="titleBar" v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="$t('bico.W165')" name="5"></el-tab-pane>
                                </el-tabs>
                            </dd>
                        </dl>

                        <dl data-v-2baeab78="" class="">
                            <dt data-v-2baeab78="" class="minepool"></dt>
                            <dd data-v-2baeab78="">
                                <el-tabs class="titleBar" v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="$t('bico.W166')" name="6"></el-tab-pane>
                                </el-tabs>
                            </dd>
                        </dl>

                        <dl data-v-2baeab78="" class="">
                            <dt data-v-2baeab78="" class="earn"></dt>
                            <dd data-v-2baeab78="">
                                <el-tabs class="titleBar" v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="$t('bico.W167')" name="7"></el-tab-pane>
                                </el-tabs>
                            </dd>
                        </dl>

                        <dl data-v-2baeab78="" class="">
                            <dt data-v-2baeab78="" class="grid-trading"></dt>
                            <dd data-v-2baeab78="">
                                <el-tabs class="titleBar" v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="$t('bico.W168')" name="8"></el-tab-pane>
                                </el-tabs>
                            </dd>
                        </dl>

                    </div>
                </div>

                 <div data-v-2baeab78="" class="ad-box"></div>
            </section>

            <div data-v-7babfee8="" class="container">
                <section data-v-18d72e53="" data-v-7babfee8="">
                    <section data-v-2eb14797="" data-v-18d72e53="" class="risk-tips no-expand">
                        <dl data-v-2eb14797="">
                            <dt data-v-2eb14797="">
                                <p data-v-2eb14797="">
                                    <el-collapse accordion>
                                        <el-collapse-item>
                                            <template slot="title">
                                                <i data-v-2eb14797="" class="hb_icon_toast_failed"></i>
                                                 每次登录请检查访问网址、Bico Global 官方工作人员不会主动联系您、请保管好您的账号密码以及资产密码、提防骗子假冒官方客服
                                                <div style="color: rgb(255, 152, 0);position: absolute;text-align: right;top: 1px;right: 24px;">{{$t('bico.W169')}}</div>
                                            </template>
                                                    <!-- <div>A. 演示系统、请勿向演示系统充值币、提币 以免资产丢失无法找回</div>
                                                    <div style="height:5px;"></div>
                                                    <div>B. 本系统 由 Bico Global 研发、 其它均为假冒，请勿上当受骗</div>
                                                    <div style="height:5px;"></div>
                                                    <div>C. 测试过程中如您有幸看到这里的广告、您有什么建议与 BUG 的发现，电报纸飞机反馈给我们将会获得一定的 USDT 作为奖励</div>
                                                    <div style="height:5px;"></div>
                                                    <div>D. 如果您有更好的建议或者有需求商业合作，我们真诚期待与您的合作，长久互赢 唯一电报客服飞机 https://t.me/BicoGlobal</div>
                                                    <div style="height:5px;"></div>
                                                    <div>E. 前台 www.bro-cons.com 手机 wap.bro-cons.com 后台 admin.bro-cons.com 后台账号 admin 密码 123456 安全码 123456 为方便它人请勿修改后台账号密码</div>
                                                    <div style="height:30px;"></div> -->
                                        </el-collapse-item>
                                    </el-collapse>
                                </p>
                            </dt>
                        </dl>
                    </section>
                    <div data-v-4e41cf60="" data-v-18d72e53="" class="wrapcp account-head over-wrap">
                        <div data-v-4e41cf60="" class="row-1">
                            <!-- 资产估值 -->
                            <div data-v-4e41cf60="" class="tb-title eye_visible">
                                <span data-v-4e41cf60="">{{$t('assets.assets')}}<span style="margin-left: 10px !important;"><el-switch v-model="assetsShow" active-color="#2483ff" inactive-color="#fff4d0"></el-switch></span></span>
                            </div>
                            <div data-v-4e41cf60="" class="action">
                                <a data-v-18d72e53="" data-v-4e41cf60="" href="/#/assets?type=3" class="btn1">{{$t('bico.W161')}}</a>
                                <a data-v-18d72e53="" data-v-4e41cf60="" href="/#/assets?type=2" class="btn1">{{$t('bico.W162')}}</a>
                                <a data-v-18d72e53="" data-v-4e41cf60="" href="/#/assets?type=1" class="btn2">{{$t('bico.W163')}}</a>
                                <a data-v-18d72e53="" data-v-4e41cf60="" href="/#/assets?type=4" class="has-arrow">{{$t('bico.W164')}}</a>
                            </div>
                        </div>

                        <div data-v-4e41cf60="" class="content-wrap">
                            <div data-v-18d72e53="" data-v-4e41cf60="" class="mod">

                                <!-- USDT 总资产 -->
                                <div data-v-12a2c570="" data-v-18d72e53="" class="center" data-v-4e41cf60="">
                                    <span data-v-12a2c570="" class="value">{{assetsShow ? totalPrice : '****'}} <span style="font-size: 27px;"> USDT</span></span>
                                    <i data-v-4e41cf60=""></i>
                                    <!-- 隐藏或打开我的资产 -->
                                </div>

                                <!-- USDT 总资产 折合 CNY 人民币 -->
                                <div data-v-12a2c570="" data-v-18d72e53="" class="center" data-v-4e41cf60="" style="position: relative;top: 0vw;left: 0vw;">
                                    <span data-v-12a2c570="" class="estimate">≈ {{rateObj.sign}} {{assetsShow ? totalPrice*rateNumber : '****'}} {{rateObj.rateName}}</span>
                                    <img @click="assetsShow = !assetsShow" :src="assetsShow ? assetsOpen : assetsClose"  class="valueslo"/>
                                </div>

                                <div data-v-18d72e53="" data-v-4e41cf60="" class="bottom" style="position: relative;top: -1vw;left: 0vw;">
                                    <div data-v-18d72e53="" data-v-4e41cf60="" class="left">
                                        <div data-v-10f73420="" data-v-18d72e53="" class="tb-profit" data-v-4e41cf60="" style="display: none;">
                                            <!---->
                                            <span data-v-10f73420="" class="tb-start">开启盈亏分析</span>
                                        </div>
                                    </div>
                                    <div data-v-18d72e53="" data-v-4e41cf60="" class="right">

                                    <el-tabs class="transtionBar cruntpage" v-model="activeIndex" @tab-click="handleIndex">
                                        <el-tab-pane :label="$t('assets.wallet')" name="0"></el-tab-pane>
                                        <el-tab-pane :label="$t('assets.contact')" name="1"></el-tab-pane>
                                        <el-tab-pane :label="$t('assets.mine')"  name="5"></el-tab-pane>
                                        <el-tab-pane :label="$t('assets.coinAssets')" name="2"></el-tab-pane>
                                        <el-tab-pane :label="$t('assets.option')" name="4"></el-tab-pane>
                                        <el-tab-pane :label="$t('assets.currency')" name="3"></el-tab-pane>
                                    </el-tabs>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-v-13ff3db4="" data-v-18d72e53="" class="content">

                        <div data-v-4d08f79a="" data-v-13ff3db4="" class="item line">
                            <dl data-v-4d08f79a="" class="account">
                            <div v-if="activeName == '0'">

                                    <el-table class="fishTable" :data="tableData" :empty-text="$t('bico.W160')">



                                        <el-table-column prop="type" :label="$t('table.coin')">

                                            <template slot-scope="scope">
                                                <div class="leftSpread" style="display: flex;justify-content: center;font-size: 18px;">
                                                  <!--图片-->

                                                  <span><img :src="scope.row.img" style="height: 28px;width: 28px;top: -0.1vw;position: relative;"/></span>

                                                  <!--币种类型-->
                                                  <!-- <span>{{scope.row.type}}</span> -->
                                                </div>
                                            </template>

                                        </el-table-column>


                                        <el-table-column prop="type" :label="$t('table.coin')">

                                            <template slot-scope="scope">
                                                <div class="leftSpread" style="display: flex;justify-content: center;font-size: 18px;">
                                                  <!--图片-->

                                                  <!-- <span style="width: 30px;height: 30px;margin-right: 18px;border-radius: 50px;background-color: rgba(22, 29, 66, 0.22);"> <img :src="scope.row.img" style="height: 28px;width: 28px;top: -0.1vw;position: relative;"/></span> -->

                                                  <!--币种类型-->
                                                  <span>{{scope.row.type}}</span>
                                                </div>
                                            </template>

                                        </el-table-column>


                                        <el-table-column  prop="totalPrice" :label="$t('table.total')">
                                            <template slot-scope="scope">
                                                <p style="font-size: 18px;">{{scope.row.totalPrice}}</p>
                                            </template>
                                        </el-table-column>

                                        <!-- <el-table-column v-if="activeIndex != '1' || activeIndex != '2'" prop="totalPrice" label="冻结"></el-table-column> -->

                                        <el-table-column prop="usedPrice" :label="$t('table.user')">
                                            <template slot-scope="scope">
                                                <p style="font-size: 18px;">{{scope.row.usedPrice}}</p>
                                            </template>
                                        </el-table-column>
                                    </el-table>

                                    <page-total v-if="page.total > 10" :page="page" @pageChange="pageChange"></page-total>

                                    </div>
                                    <!--充币-->
                                    <div v-if="activeName == '1'">
                                        <Recharge />
                                    </div>
                                    <!--提币-->
                                    <div v-if="activeName == '2'">
                                        <Withdraw />
                                    </div>
                                    <!--资产划转-->
                                    <div v-if="activeName == '3'">
                                        <TurnUsdt />
                                    </div>
                                    <!--资产记录-->
                                    <div v-if="activeName == '4'">
                                        <AssetsRecord />
                                    </div>
                                    <!--站内转账-->
                                    <div v-if="activeName == '5'">
                                        <Trasfer />
                                    </div>
                                    <div class="api-note">
                                    <h4>
                                        <b class="red"></b>
                                    </h4>
                                    <div class="show-content">
                                        <p><a href="/"></a></p>
                                        <p></p>
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </div>

                </section>
            </div>
        </div>
        <div style="height:2vw;"></div>

    <Foot />
</div>
</template>

<script>
import pageTotal from '@/components/pageTotal'
import Recharge from '@/components/Recharge'
import Withdraw from '@/components/Withdraw'
import TurnUsdt from '@/components/TurnUsdt'
import Trasfer from '@/components/Trasfer'
import "@/assets/css2/d566d0f220308.css"
import "@/assets/css2/bb4e791220308.css"
import AssetsRecord from '@/components/AssetsRecord'
import Foot from '@/components/Foot'
import { walletApi } from '@/api/getData'

export default {
    data(){
        return{
            activeName:'0',
            activeIndex:'0',
            tableData:[],
            page:{
                currentPage:1,
                limit:2,
                total:0,
            },
            totalPrice:0,
            cny:0,
            assetsShow:true,
            assetsOpen:require('@/assets/white-open.png'),
            assetsClose:require('@/assets/white-close.png'),
          rateObj :JSON.parse(sessionStorage.getItem('platFormRate')),
          rateNumber:sessionStorage.getItem("platFormRateNumber"),
        }
    },
    computed:{
        queryType(){
            return this.$route.query.type
        },
        getGolob(){
            return this.$parent.getCoinType
        }
    },
    watch:{
        queryType(newValue,oldValue){
            this.activeName = String(newValue)
        },
        getGolob(newValue){
            this.walletFun();
        }
    },
    created(){
        if(this.$route.query.type){
            this.activeName = String(this.$route.query.type)
        }
    },
    mounted(){
        this.walletFun();//钱包资产
    },
    methods:{
            handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        async walletFun(){

            var that = this;
            var txt = '';
            if(that.activeIndex == '0'){
                txt = 'WALLET'
            }else if(that.activeIndex == '1'){
                txt = 'CONTRACT'
            }else if(that.activeIndex == '2'){
                txt = 'CURRENCY'
            }else if(that.activeIndex == '3'){
                txt = 'LEGAL'
            }else if(that.activeIndex == '4'){
                txt = 'OPTION'
            }else if(that.activeIndex == '5'){
              txt = 'MINING'
            }
            // }else if(that.activeIndex == '5'){
            //   txt = 'FUTURES'
            // }
            var dataArr = new URLSearchParams();
            dataArr.set('valuation','USDT');//BTC
            dataArr.set('hide','N');
            dataArr.set('type',txt);
            var res = await walletApi(dataArr);
            that.tableData = [];
            if(res.success){

                var obj = res.data;
                that.totalPrice = Number(obj.valuationTotalPrice).toFixed(8);
                that.cny = (obj.cny).toFixed(2);
                that.tableData = obj.list;
            }
        },
        handleClick(){//标题切换

        },
        handleIndex(){//交易切换
            this.walletFun();
        },
        pageChange(item){

        }
    },
    components:{
        pageTotal,
        Recharge,
        Withdraw,
        Trasfer,
        TurnUsdt,
        AssetsRecord,
        Foot
    }
}
</script>
<style lang="less">
.assets{




    .assets_title{
        font-weight: normal;
        margin: 44px 0 20px 0;
        font-size: 24px;
    }
    .coinImg{
        margin-right: 6px;
    }
    //资产估值
    .total_box{
        position: relative;
        top: 60px;
        width: 340px;
        height: 146px;
        margin: 0px 0 0px 0;
        &>img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }
    .total_content_mc{
        border-radius: 2px;
        color: #fff;
        font-size: 24px;
        display: -webkit-flex;
        justify-content: center;
        padding-right: 15px;
        position: relative;
        top: 20px;
        img{
            cursor: pointer;
            margin-left: 10px;
        }
        .changeFont{
            font-size: 24px;
            margin-right: 4px;
            font-weight: initial;
        }
    }
    .total_content{
        border-radius: 2px;
        padding: 20px;
        position: absolute;
        top: 0;
        color: #FFFFFF;
        img{
            cursor: pointer;
            margin-left: 10px;
        }
        .changeFont{
            font-size: 24px;
            margin-right: 4px;
            font-weight: initial;
        }
    }
    .titleBar{
        //tab切换
        .el-tabs__header{
            .el-tabs__item{
                padding: 0;
                margin-right: 20px;
            }
            .el-tabs__item.is-active{
                position: relative;
                top: 0;
                &::before{
                    content: ' ';
                    position: absolute;
                    width: 40%;
                    left: 26%;
                    bottom: 2px;
                    border: 1px solid @mainsColor!important;
                }
                // border-bottom: 1px solid #87D8EA!important;
            }
        }
    }
    .transtionBar{
        text-align: center;
        margin: -8px 0;
    }
    .cruntpage{

        .el-tabs__nav{
		    overflow: hidden;
		    margin: 0 auto;
            border-radius: 6px;
        	.el-tabs__item.is-top{
                position: relative;
                top: 0;
                width:100px;
                height: 50px;
                line-height: 50px;
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
                        transform: skew(-22deg);
                        -webkit-transform: skew(-22deg);
                        -moz-transform: skew(-22deg);
                        -ms-transform: skew(-22deg);
                    }
                }
                &:nth-child(4){
                    margin: 0 2px 0 10px;
                    &::before{
                        transform: skew(-22deg);
                        -webkit-transform: skew(-22deg);
                        -moz-transform: skew(-22deg);
                        -ms-transform: skew(-22deg);
                    }
                }
                &:nth-child(5){
                    margin: 0 2px 0 10px;
                    &::before{

                        transform:skewX(-22deg);
                        -webkit-transform: skewX(-22deg);
                        -moz-transform: skewX(-22deg);
                        -ms-transform: skewX(-22deg);
                    }
                }
                &:nth-child(6){
                    margin: 0 -10px 0 10px;
                    &::before{

                       transform:skewX(-22deg);
                       -webkit-transform: skewX(-22deg);
                       -moz-transform: skewX(-22deg);
                       -ms-transform: skewX(-22deg);
                     }
                }
                &:nth-child(7){
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
                    background-color: @mainsColor;
                }
            }
        }
    }
    .el-table tbody tr{
        margin: 0 20px;
    }
    .el-table td div{
        justify-content: center!important;
    }

    .total-assets {
        text-align: center;
        margin-bottom: 40px;
    }
    .total-assets .num {
        width: 100%;
        color: #fff;
        font-size: 34px;
        margin-top: 15px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
    }
    .total-assets .num .unit {
        cursor: pointer;
        height: 34px;
        margin-left: 25px;
        position: relative;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    .total-assets .num span {
        margin-left: 10px;
        display: inline-block;
        width: 0;
        height: 0;
        border: 4px solid #fff;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
    }
    h3 {
        display: block;
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        color: #fff;
        width: 100%;
        margin-top: 0px;
        display: -webkit-flex;
        justify-content: center;
    }
    .total-assets .num .unit ul {
        display: none;
        position: absolute;
        top: 34px;
        right: 0;
        background-color: #29295f;
        border: 1px solid #161633;
    }
    .total-assets .num .unit {
        cursor: pointer;
        height: 34px;
        margin-left: 25px;
        position: relative;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    .container_assets_div {
        max-width: 1200px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        position: relative;
        top: 60px;
    }
    .allAccount {
        margin-bottom: 20px;
    }
    .allAccount div.active {
        background-color: #7772d8;
        color: #fff;
    }
    .allAccount .wrapcp {
        margin-right: 11px;
        display: inline-block;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.15);
        cursor: pointer;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        color: #efefef;
    }
    .allAccount .wrapcp .amount {
        font-size: 18px;
        font-weight: bold;
        margin-top: 5px;
    }
    .api-note {
        width: 1200px;
        margin: 4px auto;
        /* border: 1px dotted #ddd; */
        padding: 60px 0px;
        font-size: 12px;
        margin-top: 70px;
        color: #333;
        /* background-color: #fff; */
        margin-bottom: 30px;
    }
    .api-note h4 {
        font-size: 14px;
        padding-bottom: 5px;
    }
    .api-note h4 {
        font-size: 14px;
        padding-bottom: 5px;
    }
    .api-note p {
        line-height: 22px;
    }


}
</style>





<style lang="less">

.risk-tips.no-expand~.over-wrap[data-v-18d72e53] {
    margin-top: -34px;
}

.el-table .cell, .el-table--border .el-table__cell:first-child .cell {
    padding-left: 20px;
}
.cell {



    line-height: 29px;

}
.titleBar .el-tabs__nav-wrap::after {
    background-color: #3B3B3B !important;
    height: 0px !important;
}
.page[data-v-7babfee8] {
    width: 80%;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    margin: 0 auto;
    max-width: 2560px;
}
.el-tabs__item {

    height: 24px !important;
    line-height: 24px !important;
}


.day .el-table tr {
    background-color: #947c7c00 !important;
}

.el-collapse {
    border-top: 1px solid #ebeef500 !important;
    border-bottom: 1px solid #ebeef500 !important;
}
.el-collapse {

    width: 100%;
}
.el-collapse-item__header {

    background-color: #ffffff00;
    border-bottom: 1px solid #ebeef500;

}

.el-collapse-item__content {

    padding: 0px 20px;
}

</style>
