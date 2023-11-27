<template>
    <div class="self_footer">
        <footer height="auto" class="c-common-footer md:min-w-full">
            <div class="top-box md:px-25">
                <div class="lower-box md:flex-col">
                    <div class="left-box md:min-w-full md:order-2 md:mt-20">

                        <div class="logo md:hidden">
                            <img src="../assets/logo_txt2.png" alt="logo" class="img-day">
                        </div>

                        <!-- <div class="slogan md:text-14">{{$t('home.introduce')}}</div> -->

                        <div class="social-box md:flex md:justify-between">

                                <table class="footer-table">

                                    <tbody>

                                        <tr>
                                            <td class="contact">
                                                <!-- 纸飞机 -->
                                                <a href="" target="_blank" style="padding: 0">
                                                    <svg class="icon-gonggao" style="font-size: 18px;padding-left: 0px;vertical-align: -16px;" aria-hidden="true">
                                                        <use xlink:href="#icon-emizhifeiji"></use>
                                                    </svg>
                                                </a>

                                                <!-- 微信 -->
                                                <a class="weixin" href="javascript:void(0);">
                                                    <!-- <img class="qrcode" src="../assets/wechat.png"> -->
                                                    <svg class="icon-gonggao" style="font-size: 18px;padding-left: 0px;vertical-align: -16px;" aria-hidden="true">
                                                        <use xlink:href="#icon-weixin"></use>
                                                    </svg>
                                                </a>

                                                <!-- 新浪 -->
                                                <a href="" target="_blank" style="padding: 0">
                                                    <svg class="icon-gonggao" style="font-size: 18px;padding-left: 0px;vertical-align: -16px;" aria-hidden="true">
                                                        <use xlink:href="#icon-xinlangweibo"></use>
                                                    </svg>
                                                </a>

                                                <!-- facebook -->
                                                <a href="" target="_blank" style="padding: 0">
                                                    <svg class="icon-gonggao" style="font-size: 18px;padding-left: 0px;vertical-align: -16px;" aria-hidden="true">
                                                        <use xlink:href="#icon-facebook"></use>
                                                    </svg>
                                                </a>

                                                <!-- QQ  -->
                                                <a href="" target="_blank" style="padding: 0">
                                                    <svg class="icon-gonggao" style="font-size: 18px;padding-left: 0px;vertical-align: -16px;" aria-hidden="true">
                                                        <use xlink:href="#icon-qq"></use>
                                                    </svg>
                                                </a>

                                                <!-- WhatsApp -->
                                                <a href="" target="_blank" style="padding: 0">
                                                    <svg class="icon-gonggao" style="font-size: 20px;padding-left: 0px;vertical-align: -18px;" aria-hidden="true">
                                                        <use xlink:href="#icon-shejiao"></use>
                                                    </svg>
                                                </a>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>

                    <div class="right-box md:block md:order-1">
                        <div class="logo hidden md:block">
                            <img src="/assets/img/logo-black.png" alt="logo" class="img-day">
                            <img src="/assets/img/logo-white.png" alt="logo" class="img-night">
                        </div>
                        <div class="link-col md:ms-0">

                            <div class="col-title">
                                <span>{{$t('foot.huobi17')}}</span>
                                <i class="iconfont icon-page-next hidden rtl:mirror md:block"></i>
                            </div>
                            <a><router-link to="agreement" style="color: #82828e; !important;">{{$t('tip.use')}}</router-link></a>
                            <a><router-link :to="{path:'privacy',query:{type:2}}" style="color: #82828e; !important;">{{$t('foot.agree')}}</router-link></a>
                            <a><router-link to="contact" style="color: #82828e; !important;">{{$t('foot.helpCenter')}}</router-link></a>
                            <a><router-link :to="{path:'privacy',query:{type:1}}" style="color: #82828e; !important;">{{$t('foot.secret')}}</router-link></a>
                            <a><router-link to="" style="color: #82828e; !important;">{{$t('foot.huobi3')}}</router-link></a>
                            <a :href="link" target="_blank" style="color: #82828e; !important;">{{$t('foot.huobi16')}}</a>



                        </div>

                        <div class="link-col service md:ms-0">
                            <div class="col-title">
                                <span>{{$t('foot.huobi18')}}</span>
                                <i class="iconfont icon-page-next hidden rtl:mirror md:block"></i>
                            </div>
                            <a><router-link to="Whiteskin" style="color: #82828e; !important;">{{$t('foot.huobi9')}}</router-link></a>
                            <!-- <a><router-link to="book" style="color: #82828e; !important;">{{$t('foot.huobi13')}}</router-link></a> -->
                            <a><router-link to="" style="color: #82828e; !important;">{{$t('foot.huobi2')}}</router-link></a>
                            <a><router-link to="invitation" style="color: #82828e; !important;">{{$t('foot.huobi10')}}</router-link></a>
                            <a><router-link to="" style="color: #82828e; !important;">{{$t('foot.huobi14')}}</router-link></a>
                            <a><router-link to="upcoinForm" style="color: #82828e; !important;">{{$t('foot.huobi1')}}</router-link></a>
                        </div>

                        <div class="link-col md:ms-0">
                            <div class="col-title">
                                <span>{{$t('foot.huobi19')}}</span>
                                <i class="iconfont icon-page-next hidden rtl:mirror md:block"></i>
                            </div>
                            <a><router-link to="artapp" style="color: #82828e; !important;">{{$t('foot.huobi5')}}</router-link></a>
                            <a><router-link to="artapp" style="color: #82828e; !important;">{{$t('foot.huobi6')}}</router-link></a>
                            <a><router-link to="artapp" style="color: #82828e; !important;">{{$t('foot.huobi7')}}</router-link></a>
                            <a><router-link to="" style="color: #82828e; !important;">{{$t('foot.huobi4')}}</router-link></a>


                        </div>

                        <div class="link-col md:ms-0">

                            <div class="col-title">
                                <span>{{$t('foot.huobi21')}}</span>
                                <i class="iconfont icon-page-next hidden rtl:mirror md:block"></i>
                            </div>

                            <a><router-link to="" style="color: #82828e; !important;">{{$t('foot.huobi11')}}</router-link></a>
                            <a><router-link to="" style="color: #82828e; !important;">{{$t('foot.huobi15')}}</router-link></a>
                            <a><router-link to="" style="color: #82828e; !important;">{{$t('foot.huobi8')}}</router-link></a>
                            <!-- <a><router-link to="" style="color: #82828e; !important;">{{$t('foot.huobi12')}}</router-link></a> -->

                        </div>

                    </div>
                </div>
            </div>
            <!-- <div class="bottom-box dark:bg-21263d md:py-14 mono-letter">
                <div class="bottom-inner-box md:px-25 md:block">
                    <div class="rtl:unicode-plain">
                        <div class="claim">© 2010 - 2022 Bico Global All rights reserved.</div>
                    </div>
                </div>
            </div> -->

            <div class="reserved6"></div>
                <div class="lick">
                    <div class="boxImg">
                        <img src="../assets/budaocaijing.png" style="height: 35px;">
                    </div>
                    <div class="boxImg">
                        <img src="../assets/feixiaohao.png" style="height: 35px;">
                    </div>
                    <div class="boxImg">
                        <img src="../assets/mytoken.png" style="height: 35px;">
                    </div>
                    <div class="boxImg">
                        <img src="../assets/jinse.png" style="height: 35px;">
                    </div>
                    <div class="boxImg">
                        <img src="../assets/qubi.png" style="height: 35px;">
                    </div>
                    <div class="boxImg">
                        <img src="../assets/buyongbao.png" style="height: 35px;">
                    </div>
                    <div class="boxImg">
                        <img src="../assets/wmp.png" style="height: 35px;">
                    </div>
                </div>
                <div class="space5"></div>
            <div class="reservem">© 2010 - 2022 Bico Global All rights reserved.</div>
    </footer>
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
          try {
            new QRCode('androidImg', {
              width: 100,
              height: 100,
              text:'https://t.me/usdtvps666'
            })
          } catch(e) {
            console.log('捕获到异常：',e);
          }
          try {
            new QRCode('iosImg', {
              width: 100,
              height: 100,
              text:'https://t.me/usdtvps666'
            })
          } catch(e) {
            console.log('捕获到异常：',e);
          }




            // });
        },
    }
}
</script>
<style lang="scss" scoped>
.self_footer {
    font-size: 12px;
    width: 100%;
    left: 0;
    color: #acacac;
    z-index: 899;
    min-width: 1200px;
    background: #151721;

    .c-common-footer {
        min-width: 1280px;
        background-color: #0d1123;
    }
    .c-common-footer .top-box {
        max-width: 1280px;
        margin: 0 auto;
    }
    .c-common-footer .top-box .lower-box {
        display: flex;
        padding-top: 40px;
        padding-bottom: 28px;
        color: var(--text-7d7f81);
    }
    .c-common-footer .top-box .lower-box .left-box {
        min-width: 500px;
        flex: 2;
    }
    .c-common-footer .top-box .lower-box .logo {
        margin-bottom: 0px;
    }
    .c-common-footer .top-box .lower-box .logo img {
        width: 151px;
    }
    .c-common-footer .img-day {
        display: block;
    }
    img, video {
        max-width: 100%;
        height: auto;
    }
    .c-common-footer .img-night {
        display: none;
    }

    *, :after, :before {
        box-sizing: border-box;
        border: 0 solid;
    }
    .c-common-footer .top-box .lower-box .left-box .slogan {
        margin-bottom: 30px;
        font-size: 14px;
        font-weight: 400;
    }
    .c-common-footer .top-box .lower-box .left-box .social-box {
        display: flex;
        margin-bottom: 16px;
    }
    .c-common-footer .top-box .lower-box .left-box .social-box a {
            margin-right: 14px;
            height: 40px;
            min-width: 40px;

            font-size: 14px;
            font-weight: 400;
            line-height: 1;
            color: #4858b5;
            white-space: normal;
            background: #31313f;
            border: 1px solid #343e6b2e;
            border-radius: 30px;
            outline: none;
            transition: all .3s;
    }
    .c-common-footer .top-box .lower-box .left-box .social-box a {
        display: inline-block;
        text-decoration: none;
    }
    a {
        color: var(--text-0ead98);
        text-decoration: none;
        transition: color .4s;
    }
    .c-common-footer .top-box .lower-box .left-box .social-box a img {
        display: block;
        width: 150px;
    }
    .c-common-footer .top-box .lower-box .left-box .claim {
        text-align: left;
    }
    .c-common-footer .top-box .lower-box .left-box .claim {
        font-size: 12px;
        unicode-bidi: -moz-plaintext;
        unicode-bidi: plaintext;
    }
    .c-common-footer .top-box .lower-box .left-box {
        min-width: 500px;
        flex: 2;
    }
    .c-common-footer .top-box .lower-box .right-box {
        display: flex;
        max-width: 1000px;
        flex: 3;
        justify-content: space-between;
    }
    .hidden {
        display: none!important;
    }
    .c-common-footer .top-box .lower-box .logo img {
        width: 150px;
        position: relative;
        text-align: center;
        top: -18px;
        right: -85px;
    }
    .c-common-footer .img-night {
        display: none;
    }
    .c-common-footer .top-box .lower-box .right-box .link-col {
        text-align: left;
    }
    .c-common-footer .top-box .lower-box .right-box .link-col {
        margin-left: 10px;
    }
    .c-common-footer .top-box .lower-box .right-box .link-col {
        min-width: 130px;
    }
    .c-common-footer .top-box .lower-box .right-box .link-col .col-title {
        margin-bottom: 24px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
    }
    .c-common-footer .top-box .lower-box .right-box .link-col a {
        display: block;
        margin-bottom: 18px;
        font-size: 14px;
        font-weight: 400;
        color: var(--text-7d7f81);
        text-decoration: none;
        transition: color .3s;
    }
    .c-common-footer .top-box .lower-box .right-box .link-col.service {
        margin-left: 20px;
    }
    .c-common-footer .top-box .lower-box {
        display: flex;
        padding-top: 70px;
        padding-bottom: 70px;
        color: var(--text-7d7f81);
    }
    .c-common-footer .top-box {
        max-width: 1280px;
        margin: 0 auto;
    }
    .c-common-footer .bottom-box {
        padding-top: 18px;
        padding-bottom: 13px;
        font-size: 12px;
        color: #fff;
        background-color: var(--bg-0ead98);
    }
    .c-common-footer .bottom-box .bottom-inner-box {
        display: flex;
        max-width: 1280px;
        margin: 0 auto;
        justify-content: space-between;
    }
    .c-common-footer .bottom-box .bottom-inner-box {
        display: flex;
        max-width: 1280px;
        margin: 0 auto;
        justify-content: space-between;
    }
    .c-common-footer .bottom-box {
        padding-top: 18px;
        padding-bottom: 13px;
        font-size: 12px;
        color: #fff;
        background-color: var(--bg-0ead98);
    }
}
</style>


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
    margin: -38px auto 0;
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
.self_footer .reserved6 {
    font-size: 12px;
    font-family: PingFang SC,PingFangSC-Regular;
    font-weight: 400;
    color: #57607d;
    text-align: center;
    padding: 40px 0;
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
    color: #82828e;;
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
    top: -160px;
    right: -60px;
    width: 8.5rem;
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

.reservem {
    font-size: 12px;
    font-family: PingFang SC, PingFangSC-Regular;
    font-weight: 400;
    color: #d4d6dac2;
    text-align: center;
    padding: 60px 0;
}
.space5 {
    width: 100%;
    /*margin: auto;*/
    height: 1px;
    background-color: #262b427d;
}

</style>
