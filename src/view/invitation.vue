<template>
    <div class="invitation_div">
            <div class="double-reward page">
            <div class="header">
                <div class="holder"></div>
                <div class="main">
                    <div class="title">
                        {{$t('bico.W117')}}
                    </div>
                    <div class="subtitle">
                        <span data-v-6e14adbb="">{{$t('bico.W118')}}</span>
                        <b data-v-6e14adbb="">{{$t('bico.W119')}}</b>
                    </div>
                </div>
                <div class="banners"></div>
            </div>
            <div class="part overview">
                <div class="main">
                    <section class="dashboard">
                        <header data-v-6e14adbb="">

                           <!-- 我的邀请码 -->
                           <span>{{$t('user.myCode')}} {{invite}}</span>

                            <span class="base">
                                <div class="lastTxt">
                                    <!-- 复制邀请码 -->
                                    <i class="el-icon-document-copy" @click="handleCopy(invite,$event)"></i>
                                </div>
                            </span>

                        </header>

                        <!-- 传递参数 收益 丨 记录 丨 直属下级 -->

                        <div class="columns">
                            <div class="column">
                                <div class="increment">
                                </div>
                                <div class="number">
                                    {{page1data.total}}
                                </div>
                                <div class="title">
                                    {{$t('bico.W120')}}
                                </div>
                            </div>

                            <div class="column">
                                <div class="increment">
                                </div>
                                <div class="number">
                                    {{myInfoObj.directY}}
                                </div>
                                <div class="title">
                                    {{$t('bico.W121')}}({{myInfoObj.type}})
                                </div>
                            </div>

                            <div class="column">
                                <div class="increment">
                                </div>
                                <div class="number">
                                  {{myInfoObj.directN}}
                                </div>
                                <div class="title">
                                    {{$t('bico.W122')}}({{myInfoObj.type}})
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- 分享二维码 -->
                    <section class="operation notloggedin" style="padding-top: 24px">

                        <div class="invite_box">

                            <div id="qrcode"></div>
                        </div>

                        <!-- 这个我不会，点击这个按钮复制这个二维码里的链接 -->

                        <button @click="handleCopy(h5,$event)" >
                            {{$t('bico.W123')}}
                        </button>

                    </section>

                </div>
            </div>



        </div>
        <Foot />
    </div>

</template>

<script>
import QRCode from 'qrcodejs2'
import Foot from '@/components/Foot'
import clip from '@/config/clipboard'
import userInform from '@/config/userInform'
import { teamDetailApi,earningsInfosApi } from '@/api/getData'

export default {
    data(){
        return{
            invite:'',
          h5:'',
          page1data:{
            current: "1",
            pages: "1",
            records: [],
            searchCount: true,
            size: "2147483647",
            total: "3",
          },
          myInfoObj:{
            all: 0.27,
            directN: 0,
            directY: 0.27,
            type:"U"
          },
        }
    },
    mounted(){
        this.qrcodeFun();
        this.getTeamDetail()
      this.getInfo()
    },
    methods:{
        qrcodeFun(){
            var that = this;
            userInform(function(res){
                that.invite = res.inviteCode;
                that.h5 = res.inviteLink
                var qrcode = new QRCode('qrcode', {
                    width: 220,
                    height: 220,
                    text: res.inviteLink
                })
            })
        },
      async getTeamDetail(page){
        var data = new URLSearchParams();
        var res = await teamDetailApi(data)
        if(res.code == 200){
          this.page1data=res.data
        }
      },
      async getInfo(){
        var res = await earningsInfosApi()
        if(res.code == 200){
          this.myInfoObj=res.data
        }
      },

        handleCopy(text,$event){//复制代码
    		clip(text,event);
    	},
    },

    components:{
        Foot
    }

}
</script>


<style lang="less">

.invitation_div{


    .invite_box {
        width: 100%;
        min-height: 240px;
    }




    .double-reward .header {
        width: 100%;
        min-height: 520px;
    }

    .double-reward .header .main {
        position: relative;
        width: 1200px;
        height: 317px;
        margin: 0 auto;
        font-style: normal;
        font-weight: 700;
        line-height: 88px;
        color: #fff;
    }
    .double-reward .header .main .title {
        font-size: 64px;
        text-shadow: 0 6px 20px rgb(48, 67, 173);
        padding-top: 160px;
    }
    .double-reward .header .main .subtitle {
        font-size: 48px;
    }
    .double-reward .header .main .subtitle span {
        vertical-align: -5px;
        padding-right: 15px;
        text-shadow: 0 6px 20px rgb(48, 67, 173);
    }
    .double-reward .header .main .subtitle b {
        background-color: #7263fe;
        font-size: 36px;
        padding: 0 10px;
        border-radius: 8px;
        display: inline-block;
        line-height: 56px;
        font-weight: 700;
    }
    .double-reward .header .banners {
        height: 167px;
        display: none;
    }
    .double-reward .overview {
        padding: 40px 0 60px;
        margin-top: -30px;

    }
    .double-reward .overview .main {
        height: 270px;
    }
    .double-reward .part .main {
        width: 1350px;
        margin: 0 auto;
    }

    .double-reward .overview .dashboard header {
        height: 86px;
        box-sizing: border-box;
        padding-top: 28px;
        margin: 0;
    }

    .double-reward .overview .dashboard header .base {
        display: inline-block;
        width: 300px;
        position: relative;
    }
    .double-reward .overview .dashboard .columns {
        height: 153px;
    }

    .double-reward .overview .dashboard .column {
        width: 33.33%;
        height: 100%;
        padding-left: 32px;
    }
    .double-reward .overview .main .column {
        float: left;
        box-sizing: border-box;
    }

    .double-reward .overview .dashboard .column .increment {
        box-sizing: border-box;
        padding-top: 30px;
        height: 60px;
    }

    .double-reward .overview .dashboard .column .increment span {
        display: inline-block;
        border: 1px solid #f5bd9d;
        height: 20px;
        line-height: 20px;
        padding: 0 10px;
        border-radius: 10px;
        color: #ff6322;
        position: relative;
    }
    .double-reward .overview .dashboard .column .number {
        height: 40px;
    }

    .double-reward .overview .main .column .title {
        font-size: 14px;
    }

    .double-reward .overview .dashboard .column+.column {
        padding-left: 0;
    }
    .double-reward .overview .dashboard .column {
        width: 33.33%;
        height: 100%;
        padding-left: 32px;
    }
    .double-reward .overview .dashboard .column .increment {
        box-sizing: border-box;
        padding-top: 30px;
        height: 60px;
    }
    .double-reward .overview .dashboard .column+.column .number {
        color: #ff6322;
    }
    .double-reward .overview .dashboard .column .number {
        height: 40px;
    }

    .double-reward .overview .dashboard .column .increment {
        box-sizing: border-box;
        padding-top: 30px;
        height: 60px;
    }



    .double-reward .overview .operation .signin {
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        color: #000;
        padding: 64px 0 40px;
        background-color: #fff;
    }

    .double-reward .part .main button {
        background-color: #2196F3;
        height: 40px;
        color: #fff;
        width: 100%;
        padding: 0 16px;
        border-radius: 4px;
    }

    .double-reward .part .main header {
        color: #1c242c;
        font-weight: 600;
        font-size: 28px;
        line-height: 39px;
        margin: 0px 0 0px;
    }
    .double-reward .invitecode header .create {
        float: right;
        font-size: 14px;
        font-weight: 400;
        margin-right: 16px;
    }
    .double-reward .invitecode.part .list {
        background: #fff;
        border: 1px solid #e4eaf2;
        border-radius: 12px;
        padding-top: 8px;
        padding-bottom: 8px;
    }
}
</style>
