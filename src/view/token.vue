<template>

    <div class="token_div">

        <div class="banner-container cc_cursor">
            <div class="title-container cc_cursor">
                <div class="main-title">Bico Global 全球站申请上币服务 ！</div>
                <div class="sub-title">即日起您可 在 Bico Global 全球站开启上币申请服务<div class="icon_about"></div>
                </div>
            </div>
            <div class="news-swiper" style="">
                <div class="icon_notice"></div>
                <div class="swiper-container swiper-container-coverflow swiper-container-3d swiper-container-initialized swiper-container-vertical">
                    <div class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(0px, -40px, 0px);">
                        
                    </div>
                    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                </div>
            </div>
        </div>

        <div class="token_div1">
            <div class="token_div2">

                <div>
                    <span>请填写完整项目信息，提交您的上币申请到 Bico Global 全球站 。</span>
                    <el-divider></el-divider>
                </div>

                <div style="margin: 20px;"></div>
                    <span>（ Bico Global 上币申请表 ）温馨提示：<span style="color: #F44336;">带 * 为必填项</span></span>
                    <el-divider></el-divider>
                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    
                        <el-form-item label="币种全称 *">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>

                        <el-form-item label="英文全称 *">
                            <el-input v-model="formLabelAlign.region"></el-input>
                        </el-form-item>

                        <el-form-item label="货币英文缩写 *">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>

                                            
                        <el-form-item label="市场流通量 *">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>

                        <el-form-item label="官方持有量 *">
                            <el-input v-model="formLabelAlign.region"></el-input>
                        </el-form-item>

                        <el-form-item label="官网地址 *">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>

                                            
                        <el-form-item label="区块浏览器 *">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>

                        <el-form-item label="活动区域">
                            <el-input v-model="formLabelAlign.region"></el-input>
                        </el-form-item>

                        <el-form-item label="白皮书地址 *">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>

                                            
                        <el-form-item label="已上线交易所 *">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>

                        <el-form-item label="项目定位及涉及领域 *">
                            <el-input v-model="formLabelAlign.region"></el-input>
                        </el-form-item>

                        <el-form-item label="代币功能及用途的详细解释 *">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="代币转账合约地址的代码是否开源或部分开源？如有，请提供代码github地址（代币程序地址） *">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="请简介目前项目的开发者社区情况, 开发者社区地址和进入方式  *">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        
                        <span>（ 提交申请后，我们会在 1~3 个工作日内尽快与您联系。如果您有任何其他疑问，请联系 ：<span style="color: #F44336;"> BiconGlobal@gmail.com </span></span>
                        <el-divider></el-divider>


                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即提交</el-button>
                        </el-form-item>



                    </el-form>
            </div>
        </div>
        <div style="margin: 60px;"></div>
        <Foot />
    </div>
</template>

<script>
import Foot from '@/components/Foot'
  export default {
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    },
    components:{
        
        Foot,
        
    }
  }
</script>

<style lang="less">
.tokenlisting_div{

}
.token_div1 {

    margin: 0;
    padding: 0;
    padding-left: calc(50% - 600px);
    padding-right: calc(50% - 600px);
    box-sizing: border-box;
    margin-top: 30px !important;
    /* padding: 125px 0 0px; */
    /* text-align: center; */
    color: #495666;
    line-height: 2em;
    font-size: 18px;

}


</style>


<style>

.banner-container {
    background: -webkit-gradient(linear,left top,left bottom,from(#09279e),to(#24c));
    background: linear-gradient(180deg,#09279e,#24c);
    overflow: hidden;
    padding: 112px 8px 32px;
    position: relative;
    text-align: center;
}

@media (min-width: 768px) {
    .banner-container {
        padding-left:12px;
        padding-right: 12px
    }
}

@media (min-width: 1024px) {
    .banner-container {
        padding-left:calc(50% - 480px);
        padding-right: calc(50% - 480px)
    }
}

@media (min-width: 1270px) {
    .banner-container {
        padding-left:calc(50% - 624px);
        padding-right: calc(50% - 624px)
    }
}

@media (min-width: 768px) {
    .banner-container {
        padding-top:142px
    }
}

.banner-container .title-container {
    margin: 0 auto;
}

@media (max-width: 767px) {
    .banner-container .title-container {
        -webkit-box-sizing:border-box;
        box-sizing: border-box;
        padding-left: 8px;
        padding-right: 8px;
        width: 100%
    }
}

.banner-container .title-container .main-title {
    color: #fff;
    font-size: 36px;
    font-weight: 600;
    line-height: 40px
}

.banner-container .title-container .sub-title {
    color: hsla(0,0%,100%,.65);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    margin-top: 12px;
    position: relative;
    z-index: 100
}

@media (min-width: 768px) {
    .banner-container .title-container {
        width:626px
    }
}

@media (min-width: 1024px) {
    .banner-container .title-container {
        width:835px;
    }

    .banner-container .title-container .main-title {
        font-size: 48px;
        line-height: 52px
    }

    .banner-container .title-container .sub-title {
        font-size: 18px;
        line-height: 24px;
        margin-top: 16px
    }
}

.banner-container .news-swiper {
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-weight: 400;
    justify-content: center;
    margin: 64px auto 0;
    max-width: 292px;
    position: relative;
    z-index: 100
}

.banner-container .news-swiper a {
    color: #fff;
    font-size: 16px;
    line-height: 20px
}

@media (min-width: 768px) {
    .banner-container .news-swiper {
        margin-top:94px;
        max-width: 392px
    }
}

.banner-container .news-swiper .swiper-container {
    height: 20px;
    margin: 0;
    max-width: 222px
}

@media (min-width: 768px) {
    .banner-container .news-swiper .swiper-container {
        max-width:315px
    }
}

.banner-container .news-swiper .swiper-container .swiper-slide {
    color: #fff;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%
}

.banner-container:before {
    background: -webkit-gradient(linear,left top,left bottom,from(#5278d7),to(rgba(60,111,239,0)));
    background: linear-gradient(180deg,#5278d7,rgba(60,111,239,0));
    border-radius: 36px;
    bottom: -14.26%;
    content: "";
    display: block;
    height: 115px;
    left: -17.65%;
    mix-blend-mode: normal;
    opacity: .2;
    position: absolute;
    right: 80.02%;
    top: 75.37%;
    -webkit-transform: rotate(-15deg);
    transform: rotate(-15deg);
    width: 115px;
}

@media (min-width: 768px) {
    .banner-container:before {
        bottom:-32.36%;
        height: 182px;
        left: -16.54%;
        right: 87.5%;
        top: 70.41%;
        width: 182px
    }
}

@media (min-width: 1024px) {
    .banner-container:before {
        bottom:-25.39%;
        left: 4.16%;
        right: 80.36%;
        top: 66.71%
    }
}

@media (min-width: 1270px) {
    .banner-container:before {
        bottom:-25.39%;
        left: -2.78%;
        right: 87.3%;
        top: 66.71%
    }
}

.banner-container:after {
    background: linear-gradient(357.59deg,#507ae2 1.08%,rgba(60,111,239,0) 78.26%);
    border-radius: 36px;
    bottom: 41.11%;
    content: "";
    display: block;
    height: 184px;
    left: 66.44%;
    mix-blend-mode: normal;
    opacity: .2;
    position: absolute;
    right: -41.71%;
    top: -7.78%;
    -webkit-transform: rotate(-15deg);
    transform: rotate(-15deg);
    width: 241px
}

@media (min-width: 768px) {
    .banner-container:after {
        height:311px;
        left: unset;
        right: -220px;
        top: -14.69%;
        width: 386px
    }
}



</style>