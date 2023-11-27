<template>

    <div class="artapp_div">
        <!-- 币种行情 -->
        <div>
            <!-- <div class="container">
                <div class="betweenSpread market_title">
                    <div class="leftSpread">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane :label="$t('home.mark')" name="1"></el-tab-pane>
                            <el-tab-pane :label="$t('home.coinMark')" name="0"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <el-button @click="checkPair">{{$t('home.checkPair')}}</el-button>
                </div>
            </div> -->
            <Trade :activeName="activeName" />
        </div>
        <!-- <div class="baAX0PF9AVpM03C30LDa cc_cursor">
            <div class="AwsLHsacI5OhANTDV6ng cc_cursor">
                <div>
                    <h3>
                        <span></span>
                        <span class="FwHELYUlEt4CzFUy1fvm">
                            <br></span>
                    </h3>
                    <p></p>
                </div>
            </div>
            <div class="AwsLHsacI5OhANTDV6ng cc_cursor">
                <img src="../assets/logo_txt2.png">
                <div>
                    <h3>
                        <span>{{$t('home.huobi16')}}</span>
                    </h3>
                    <p>{{$t('home.huobi17')}}</p>
                </div>
            </div>
            <div class="EmuSQjkiZVeLkTJeuL5s cc_cursor">
                <div class="Cxes8pdRHI7ruiAetwwE cc_cursor"></div>
                <div class="PNiUYpJKQhmwdy_zgnIp cc_cursor"></div>
            </div>
            <div class="Fq5s6j9G6EvY5cj8RSmb cc_cursor">
                <div class="tIt8JSp9mhKKx6DNIMoE">
                    <div class="wHAHYYZIuJFFId7OlVRo cc_cursor">
                    </div>
                </div>
            </div>
        </div> -->










<div data-v-6a651f2c="" class="download-bg">
<!-- <img data-v-6a651f2c="" src="../assets/dl-bg-img2.png" alt="" style="width: 100%; height: 299px; position: absolute; bottom: 800px; z-index: 10;"> -->
        <div data-v-6a651f2c="" class="app-download-header">
            <div data-v-6a651f2c="" class="flex-center">
                <img data-v-6a651f2c="" src="../assets/dl-head-img2.png" alt="" style="width: 530px; height: 648px;">
                <div data-v-6a651f2c="" class="header-right">
                    <div data-v-6a651f2c="" class="flex-center">
                        <div data-v-6a651f2c="" style="font-size: 46px; font-weight: 600; line-height: 65px;">Bico Global</div>
                        <div data-v-6a651f2c="" class="header-right-icon">{{$t('bico.W305')}}</div>
                    </div>
                    <div data-v-6a651f2c="" style="font-size: 26px; line-height: 37px; margin-top: 12px;">{{$t('home.huobi17')}}</div>
                    <div data-v-6a651f2c="" class="flex-center" style="margin-top: 86px;">
                        <div data-v-6a651f2c="" style="width: 144px; height: 144px; padding: 8px; border-radius: 6px;">


                        <div class="d7J1PEEIJ6V3FZt441oB cc_cursor">
                        <div class="downloadBox">

                        <div class="container_app">
                            <div class="leftSpread verticalBox">
                                <div class="leftSpread vertical">
                                    <div class="downImg">
                                        <div id="iosDown"></div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>

                    </div>

                    </div>
                        <div data-v-6a651f2c="" style="margin-left: 36px; color: rgb(255, 255, 255);">
                            <div data-v-6a651f2c="" class="app-icon">
                                <img data-v-6a651f2c="" src="data:image/png;base64,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" alt="" style="width: 40px; height: 40px; margin-right: 16px;">
                                <span data-v-6a651f2c="" class="ex-fontSize20">Mac ios</span>
                            </div>
                            <div data-v-6a651f2c="" class="app-icon" style="margin-top: 32px;">
                                <img data-v-6a651f2c="" src="data:image/png;base64,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" alt="" style="width: 40px; height: 40px; margin-right: 16px;">
                                <span data-v-6a651f2c="" class="ex-fontSize20">Android</span>
                            </div>
                            <div data-v-6a651f2c="" class="app-icon" style="margin-top: 32px;">
                                <img data-v-6a651f2c="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAACO0lEQVRoQ+2Zu4oWQRCFv7NeUPACXldFxdt6jXwRIwMxVB9CEzMFn0E3EYzEwNjY0GgzY59ADBZljxT0D6P8u1Mztr/Dbw9MMFAzXeecqunqKrFkl5YMDw3Q1BVtCjWFFsxAC7m/Sbjts8AacBI4ApwHbgOrkm5m1l64QrZXgavhJHAMOAPcAi4D12D+ViIp5WvKKMNM18b23vJ8Bzhe7mD4RlFgz8BvfpV0KPPOaEC2Y4Hrhd2LJUzC+WD5MfAe+J5xImFTB5DtfUAwG45HbEeYnABOF8cPbuPMfUlvbDvhbMakGqCNAiizaNfmrqS3tn8Au4a+PMe+GqBNYJYPQ/yaLKAvJbyGgAnbBqiHsWoh1xQqTLeQayG3DQM7Vgq2Ww61HMrtcNV+22NrsYeSXlWs5ahyfLD9BIiqOgsscjLu15I2bD8DVga8P0+v+N6mpKcZMUcfHzIf/xc2fX+59XKq3BrgXFTXzyV9tP2uVNtZhectEwp/k3Qv40MfoLGOPJC0PsUcavtQ24cyiQHV9qEWci3kWsjtzEDfPtRyaOo5NLZSmGxP4UVpAc/GHAdyOTzRvlzXeduHy/QgJgjRnI8+dzTnLwCXgP0d+0eSXlas5epsrEk1sH20NPQDZMx7PgCfgU8jxye/L71YQPOA216RtGX7VGcqF5OL2YDrSlF2d4a4KifWzEJ/YlPAxqgmlA2Vz5V5U4xuIpxnVygURPRe/9eJtZeOCRo0hSYoyi8uNYWaQgtmYOlC7iccuEJE96Z4twAAAABJRU5ErkJggg==" alt="" style="width: 40px; height: 40px; margin-right: 16px;">
                                <span data-v-6a651f2c="" class="ex-fontSize20">Windows</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div style="height:100px;"></div>
        <Foot/>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import Trade from '@/components/trade'
import Foot from '@/components/Foot'
import { partenApi,bannerApi } from '@/api/getData'

export default {
    data(){
        return{
            bannerArr:[],//banner图
            isToken:sessionStorage.getItem('userToken'),
            lang:sessionStorage.getItem('language'),
            activeName:'1'
        }
    },
    created(){

    },
    mounted(){
        this.bannerFun();
        this.qrcodeFun()
    },
    methods:{
        handleClick(){

        },
        async qrcodeFun(){//获取下载app的地址
            var that = this;
            // appDown(function(res){
                // new QRCode('androidDown', {
                //     width: 100,
                //     height: 100,
                //     text:'https://h5.bickox.com/'
                // })

                new QRCode('iosDown', {
                    width: 100,
                    height: 100,
                    text:'https://t.me/usdtvps666'
                })
            // });
        },
        async bannerFun(){//banner图
            var that = this;
            var data = new URLSearchParams();
            data.set('showType','PC');
            var res = await bannerApi(data);
            that.bannerArr = [];
            if(res.code == 200){
                that.bannerArr = res.data;
            }
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
.artapp_div{
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


    }



    .app-download-header[data-v-6a651f2c] {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        z-index: 10;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding-top: 68px;
        width: 100%;
        height: 100%;
    }
    .flex-center[data-v-6a651f2c] {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .app-download-header .header-right-icon[data-v-6a651f2c] {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        margin: 0 0 10px 12px;
        padding: 0 11px;
        height: 33px;
        color: #ffffff;
        font-size: 18px;
        line-height: 25px;
        border-radius: 5px;
        background: linear-gradient(40deg, #0264ec 0%, #1b3cd8 100%);
    }
    .app-icon[data-v-6a651f2c] {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding-left: 32px;
        width: 196px;
        cursor: pointer;
        height: 56px;
        line-height: 56px;
        border-radius: 28px;
        background: linear-gradient(270deg, #1d39d6 0%, #0066ed 100%);
    }
    .app-download-header .header-right-icon[data-v-6a651f2c]::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        left: 0;
        bottom: -10px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 5px solid #0264ec;
    }

    .app-download-header .header-right[data-v-6a651f2c] {
        margin-left: 227px;
        color: #333333;
    }
    .flex-center[data-v-6a651f2c] {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
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
                .el-tabs__item{
                    font-size: 24px;
                    color: #8E8E8E!important;
                }
                .el-tabs__item.is-active{
                    font-size: 28px;
                    color: #333333!important;
                }
                .el-button--default{
                    background-color: transparent;
                    border: 1px solid @mainsColor;
                    span{
                        color: @mainsColor;
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
            text-align: center;
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
            padding: 0px 0px;
            background-color: #ffffff00;
            margin: 0px 0;
        h2{
            text-shadow:0px 2px 3px rgba(170, 170, 170, .3);
            font-size: 28px;
            text-align: center;
        }
        .vertical{
            margin: 0px 0  0 0px;
            .downImg{
                    background-color: #ffffff;
                    padding: 12px;
                    margin-left: -7px;
                    width: 136px;
                    height: 136px;
                    cursor: pointer;
                    margin-top: -8px;
                    border-radius: 7px;
                    border: 1px solid #6e74985e;
                    transition:all 1s ease-out;
                    -webkit-transition: all 1s ease-out;
                    -moz-transition: all 1s ease-out;
                    -o-transition:all 1s ease-out;
                &:hover{
                    transform:scale(1.5);
                    -webkit-transform: scale(1.5);
                    -moz-transform:scale(1.5);
                    -o-transform:scale(1.5)
                }
            }
        }
        .verticalBox{
            width: 600px;
            margin: 0 auto;
        }
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

    .AwsLHsacI5OhANTDV6ng {
        margin-top: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .AwsLHsacI5OhANTDV6ng img {
        flex-shrink: 0;
        width: 150px;
        height: 150px;
        margin-right: 20px;
    }

    .baAX0PF9AVpM03C30LDa h3, .baAX0PF9AVpM03C30LDa p {
        margin: 0;
    }

    .AwsLHsacI5OhANTDV6ng .FwHELYUlEt4CzFUy1fvm {
        margin-left: 10px;
        color: #00f2e6;
        font-size: 16px;
        display: inline-block;
        line-height: 22px;
    }
    .EmuSQjkiZVeLkTJeuL5s {
        margin-top: 85px;
        display: flex;
        justify-content: center;
    }
    .Fq5s6j9G6EvY5cj8RSmb {
        margin-top: 70px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .EmuSQjkiZVeLkTJeuL5s .Cxes8pdRHI7ruiAetwwE, .EmuSQjkiZVeLkTJeuL5s .PNiUYpJKQhmwdy_zgnIp {
        width: 590px;
        height: 354px;
    }

    .Fq5s6j9G6EvY5cj8RSmb .Cq1YqusRLKYrWQJiKwQ0 .v9SxiJwyPbov5gEgQR5X {
        background: rgba(89,63,124,.4);
        margin-bottom: 14px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,.4);
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
    }
    .Fq5s6j9G6EvY5cj8RSmb .Cq1YqusRLKYrWQJiKwQ0 {
        width: 175px;
    }
    .Fq5s6j9G6EvY5cj8RSmb .tIt8JSp9mhKKx6DNIMoE {
        margin-right: 480px;
        text-align: center;
    }
    .Fq5s6j9G6EvY5cj8RSmb .wHAHYYZIuJFFId7OlVRo {
        display: flex;
        position: relative;
        height: auto;
        width: auto;
        margin-bottom: 40px;
    }
    .Fq5s6j9G6EvY5cj8RSmb .wHAHYYZIuJFFId7OlVRo .sFbzcQ2_Xq9R9QcyFoPE {
        width: auto;
        text-align: center;
        margin-right: 39px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .Fq5s6j9G6EvY5cj8RSmb .wHAHYYZIuJFFId7OlVRo .sFbzcQ2_Xq9R9QcyFoPE .jGWMomzT6X882Rp_uuZX {
        padding: 4px;
        width: 136px;
        height: 136px;
        background-color: #fff;
        border-radius: 7px;
        border: 1px solid #ccc;
    }
    .Fq5s6j9G6EvY5cj8RSmb .wHAHYYZIuJFFId7OlVRo .sFbzcQ2_Xq9R9QcyFoPE p {
        margin: 10px 0 0;
        font-size: 14px;
        color: #fff;
    }
    .Fq5s6j9G6EvY5cj8RSmb .wHAHYYZIuJFFId7OlVRo .sFbzcQ2_Xq9R9QcyFoPE .bYnECsZBchyuvGkpyJ9Y {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .Fq5s6j9G6EvY5cj8RSmb .MtwoBORcDhyzVKArt9Nk {
        color: #00f2e6;
        font-size: 15px;
        border-bottom: 1px solid #00f2e6;
    }
    a {
        color: #00d0c4;
        text-decoration: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        transition: color .3s;
        -webkit-text-decoration-skip: objects;
    }
    .Fq5s6j9G6EvY5cj8RSmb .Cq1YqusRLKYrWQJiKwQ0 .v9SxiJwyPbov5gEgQR5X img {
        width: 25px;
        height: 25px;
        margin-right: 13px;
        margin-left: 17px;
    }
    img {
        vertical-align: middle;
        border-style: none;
    }
    .Fq5s6j9G6EvY5cj8RSmb .Cq1YqusRLKYrWQJiKwQ0 .v9SxiJwyPbov5gEgQR5X span {
        font-size: 16px;
        color: #fff;
    }

    .VNE7aXARdJZrZssT40Fd {
        display: flex;
        position: relative;
        height: auto;
        width: auto;
    }
    .VNE7aXARdJZrZssT40Fd .d7J1PEEIJ6V3FZt441oB {
        width: auto;
        text-align: center;
        margin-right: 39px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .VNE7aXARdJZrZssT40Fd .d7J1PEEIJ6V3FZt441oB .EQ0eFZN7VCdVZTfRBgi4 {
        padding: 4px;
        width: 136px;
        height: 136px;
        background-color: #fff;
        border-radius: 7px;
        border: 1px solid #ccc;
    }
    .VNE7aXARdJZrZssT40Fd .d7J1PEEIJ6V3FZt441oB {
        width: auto;
        text-align: center;
        margin-right: 39px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .S3U0HCSczyF8K3yF7OOD {
        display: flex;
        flex-wrap: wrap;
        width: 420px;
    }
    .S3U0HCSczyF8K3yF7OOD .cble46zAo5eUI6RlpKvf:nth-child(2n-1) {
        margin-right: 63px;
    }
    .S3U0HCSczyF8K3yF7OOD .cble46zAo5eUI6RlpKvf {
        background: rgba(89,63,124,.4);
        width: 175px;
        height: 45px;
        margin-bottom: 14px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,.4);
        display: flex;
        align-items: center;
    }
    .S3U0HCSczyF8K3yF7OOD .cble46zAo5eUI6RlpKvf img {
        width: 25px;
        height: 25px;
        margin-right: 13px;
        margin-left: 17px;
    }
    .S3U0HCSczyF8K3yF7OOD .cble46zAo5eUI6RlpKvf span {
        font-size: 16px;
        color: #fff;
    }
    .container_app {
        width: 100%;
    }
    img {
        vertical-align: middle;
        border-style: none;
        width: 136px;
        height: 136px;
    }



}
</style>
