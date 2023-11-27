<template>
    <div class="self_footer">
            <table class="foot">
                <tr>
                    <td style="width: 240px;">
                        <table>
                            <tr>
                                <td>
                                    <a href="/">
                                        <img src="../assets/logo_txt2.png" style="height: 155px;">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table class="footer-table">
                            <thead>
                                <tr>
                                    <th>{{$t('foot.huobi17')}}</th>
                                    <th>{{$t('foot.huobi18')}}</th>
                                    <th>{{$t('foot.huobi19')}}</th>
                                    <th>{{$t('foot.huobi20')}}</th>
                                    <th>{{$t('foot.huobi21')}}</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>
                                        <a><router-link to="agreement" style="color: #b1bad6 !important;">{{$t('tip.use')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="upcoinForm" style="color: #b1bad6 !important;">{{$t('foot.huobi1')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi5')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="Whiteskin" style="color: #b1bad6 !important;">{{$t('foot.huobi9')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="book" style="color: #b1bad6 !important;">{{$t('foot.huobi13')}}</router-link></a>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <a><router-link :to="{path:'privacy',query:{type:2}}" style="color: #b1bad6 !important;">{{$t('foot.agree')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi2')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi6')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi10')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi14')}}</router-link></a>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <a><router-link to="contact" style="color: #b1bad6 !important;">{{$t('foot.helpCenter')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi3')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi7')}}</router-link></a>
                                    </td>
                                    <td>
                                       <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi11')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi15')}}</router-link></a>
                                    </td>

                                </tr>

                                <tr>
                                    <td>
                                        <a><router-link :to="{path:'privacy',query:{type:1}}" style="color: #b1bad6 !important;">{{$t('foot.secret')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi4')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi8')}}</router-link></a>
                                    </td>
                                    <td>
                                        <a><router-link to="" style="color: #b1bad6 !important;">{{$t('foot.huobi12')}}</router-link></a>
                                    </td>
                                     <td>
                                        <a :href="link" target="_blank" style="color: #b1bad6 !important;">{{$t('foot.huobi16')}}</a>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <a target="_blank" href="https://t.me/BicoGlobal">
                                        <img src="../assets/zhifeijierwema.png" style="height: 124px;">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        <div class="space"></div>
            <table class="foot">
                <tr>
                    <td>
                        <table class="footer-table">

                            <tbody>
                                <tr>
                                    <td class="contact">
                                        <!-- 纸飞机 -->
                                        <a href="https://t.me/BicoGlobal" target="_blank" style="padding: 0">
                                            <svg class="icon-gonggao" style="font-size: 18px;padding-left: 0px;vertical-align: -12px;" aria-hidden="true">
                                                <use xlink:href="#icon-emizhifeiji"></use>
                                            </svg>
                                        </a>

                                        <!-- 微信 -->
                                        <a class="weixin" href="javascript:void(0);">
                                            <img class="qrcode" src="../assets/wechat.png">
                                            <svg class="icon-gonggao" style="font-size: 18px;padding-left: 0px;vertical-align: -12px;" aria-hidden="true">
                                                <use xlink:href="#icon-weixin"></use>
                                            </svg>
                                        </a>

                                        <!-- 新浪 -->
                                        <a href="https://t.me/BicoGlobal" target="_blank" style="padding: 0">
                                            <svg class="icon-gonggao" style="font-size: 18px;padding-left: 0px;vertical-align: -12px;" aria-hidden="true">
                                                <use xlink:href="#icon-xinlangweibo"></use>
                                            </svg>
                                        </a>

                                        <!-- facebook -->
                                        <a href="https://t.me/BicoGlobal" target="_blank" style="padding: 0">
                                            <svg class="icon-gonggao" style="font-size: 18px;padding-left: 0px;vertical-align: -12px;" aria-hidden="true">
                                                <use xlink:href="#icon-facebook"></use>
                                            </svg>
                                        </a>

                                        <!-- QQ  -->
                                        <a href="https://t.me/BicoGlobal" target="_blank" style="padding: 0">
                                            <svg class="icon-gonggao" style="font-size: 18px;padding-left: 0px;vertical-align: -12px;" aria-hidden="true">
                                                <use xlink:href="#icon-qq"></use>
                                            </svg>
                                        </a>

                                        <!-- WhatsApp -->
                                        <a href="https://t.me/BicoGlobal" target="_blank" style="padding: 0">
                                            <svg class="icon-gonggao" style="font-size: 20px;padding-left: 0px;vertical-align: -12px;" aria-hidden="true">
                                                <use xlink:href="#icon-shejiao"></use>
                                            </svg>
                                        </a>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </table>
        <div class="space"></div>
	    <div class="reserved"></div>
            <!-- <div class="lick">
                <div class="boxImg">
                    <img src="../assets/budaocaijing.png" style="height: 24px;">
                </div>
                <div class="boxImg">
                    <img src="../assets/feixiaohao.png" style="height: 24px;">
                </div>
                <div class="boxImg">
                    <img src="../assets/mytoken.png" style="height: 24px;">
                </div>
                <div class="boxImg">
                    <img src="../assets/sosolx.png" style="height: 24px;">
                </div>
                <div class="boxImg">
                    <img src="../assets/jinse.png" style="height: 24px;">
                </div>
                <div class="boxImg">
                    <img src="../assets/qubi.png" style="height: 24px;">
                </div>
                <div class="boxImg">
                    <img src="../assets/buyongbao.png" style="height: 24px;">
                </div>
                <div class="boxImg">
                    <img src="../assets/wmp.png" style="height: 24px;">
                </div>
                <div class="boxImg">
                    <img src="../assets/benpaocaijing.png" style="height: 50px;">
                </div>
            </div> -->
	    <div class="reserved">© 2010 - 2022 Bico Global All rights reserved.</div>
    </div>
</template>
<script>
import { linkContactApi } from '@/api/getData'
import QRCode from 'qrcodejs2'
import appDown from '@/config/appDown'
export default {
    data(){
        return{
            link:''
        }
    },
    created(){
        this.linkFun()
    },
    mounted(){
        this.qrcodeFun()
    },
    methods:{
        async linkFun(){//联系客服地址
            var that = this;
            var res = await linkContactApi();
            if(res.success){
                that.link = res.data;
            }
        },
        async qrcodeFun(){//获取下载app的地址
            var that = this;
            // appDown(function(res){
                new QRCode('androidImg', {
                    width: 100,
                    height: 100,
                    text:'https://app.mobile.bico-global.com/download.html'
                })

                new QRCode('iosImg', {
                    width: 100,
                    height: 100,
                    text:'https://app.mobile.bico-global.com/download.html'
                })
            // });
        },
    }
}
</script>
<style lang="less">



.self_footer {
    font-size: 12px;
    width: 100%;
    left: 0;
    color: #acacac;
    z-index: 899;
    min-width: 1200px;
    background: #151721;
}
.foot {
    /*width: 1200px;*/
    margin: 0 auto;
    padding: 60px 0;
    border-collapse: separate;
    border-spacing: 2px;
}

.lick {
    width: 1200px;
    margin: 26px auto 0;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
}
.lick .boxImg, .lick {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.self_footer .reserved {
    font-size: 12px;
    font-family: PingFang SC,PingFangSC-Regular;
    font-weight: 400;
    color: #57607d;
    text-align: center;
    padding: 20px 0;
}
.footer-table th {
    line-height: 36px;
    font-size: 14px;
    opacity: .5;
    font-weight: 500;
    color: #57607d;
    min-width: 160px;
}
.footer-table td, .footer-table th {
    text-align: left;
    line-height: 24px;
}

.footer-table td>a {
    font-size: 12px;
    font-weight: 400;
    color: #b1bad6;
}
.boxImg {
    opacity: .6;
    cursor: pointer;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 104px;
    height: 42px;
    line-height: 42px;
    margin: 7px;
}

.boxImg {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.footer-table .contact a {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    margin-right: 15px;
    text-align: center;
}
.footer-table a.weixin {
    position: relative;
}


.footer-table .weixin img.qrcode {
    position: absolute;
    z-index: 99;
    top: -125px;
    right: -40px;
    width: 7.5rem;
    max-width: none;
    height: 7.5rem;
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: bottom;
    transform-origin: bottom;
    opacity: 0;
    border-radius: .25rem;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}



.footer-table .weixin:hover img.qrcode {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}











</style>
