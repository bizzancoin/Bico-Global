<template>

    <div class="token_div">

        <div class="banner-container cc_cursor">
            <div class="title-container cc_cursor">
                <div class="main-title">{{$t('bico.W38')}}</div>
                <div class="sub-title">{{$t('bico.W39')}}<div class="icon_about"></div>
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
                    <span>{{$t('bico.W40')}}</span>
                    <el-divider></el-divider>
                </div>

                <div style="margin: 20px;"></div>
                    <span>{{$t('bico.W41')}}<span style="color: #F44336;">{{$t('bico.W42')}}</span></span>
                    <el-divider></el-divider>
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item :label="$t('bico.W44')" prop="currencyZhName" :rules="[{ required: true, message:$t('bico.W58')}]">
          <el-input v-model="form.currencyZhName"  :placeholder="$t('bico.W58')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W45')" prop="currencyEnName" :rules="[{ required: true, message:$t('bico.W59')}]">
          <el-input v-model="form.currencyEnName"  :placeholder="$t('bico.W59')" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W46')" prop="currencyAbbrName" :rules="[{ required: true, message:$t('bico.W60')}]">
          <el-input v-model="form.currencyAbbrName"  :placeholder="$t('bico.W60')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W47')" prop="marketFloat" :rules="[{ required: true, message:$t('bico.W61')}]">
          <el-input v-model="form.marketFloat"  :placeholder="$t('bico.W61')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W48')" prop="officialHoldings" :rules="[{ required: true, message:$t('bico.W62')}]">
          <el-input v-model="form.officialHoldings"   :placeholder="$t('bico.W62')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W49')" prop="officialAddress" :rules="[{ required: true, message:$t('bico.W63')}]">
          <el-input v-model="form.officialAddress"  :placeholder="$t('bico.W63')" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W50')" prop="blockBrowser" :rules="[{ required: true, message:$t('bico.W64')}]">
          <el-input v-model="form.blockBrowser"  :placeholder="$t('bico.W64')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W51')" prop="movementArea" :rules="[{ required: true, message:$t('bico.W65')}]">
          <el-input v-model="form.movementArea"  :placeholder="$t('bico.W65')" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W52')" prop="whitePaperAddress" :rules="[{ required: true, message:$t('bico.W66')}]">
          <el-input v-model="form.whitePaperAddress"  :placeholder="$t('bico.W66')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W53')" prop="listedExchange" :rules="[{ required: true, message:$t('bico.W67')}]">
          <el-input v-model="form.listedExchange"  :placeholder="$t('bico.W67')" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W54')" prop="projectAreas" :rules="[{ required: true, message:$t('bico.W68')}]">
          <el-input v-model="form.projectAreas"  :placeholder="$t('bico.W68')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W55')" prop="functionalInterpretation" :rules="[{ required: true, message:$t('bico.W69')}]">
          <el-input v-model="form.functionalInterpretation"  :placeholder="$t('bico.W69')" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W56')" prop="projectAddress" :rules="[{ required: true, message:$t('bico.W70')}]">
          <el-input v-model="form.projectAddress"  :placeholder="$t('bico.W70')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W57')" prop="addressWay" :rules="[{ required: true, message:$t('bico.W71')}]">
          <el-input v-model="form.addressWay"  :placeholder="$t('bico.W71')"></el-input>
        </el-form-item>
        <el-form-item v-if="(!smsSendBoolean)&&(!emailSendBoolean)" :label="$t('form.verification')" :rules="[{ required: true, message: $t('form.codeEmpty')}]"
                      id="vsCode" prop="code">
          <el-input v-model="form.code" autocomplete="off" :placeholder="$t('form.codeEmpty')">
            <i class="el-input__icon themeFont" slot="suffix"  @click="handleIconClick">{{$t('form.code')}}{{count}}</i>
          </el-input>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{$t('bico.W43')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
        </div>
        <div style="margin: 200px;"></div>
        <Foot />
    </div>
</template>
<script>
import Foot from '@/components/Foot'
  import codeStatus from '@/config/codeStatus'
  import { sendApi,addCoinApply,checkSmsSendApi,checkEmailSendApi } from '@/api/getData'
  export default {
    data() {
      return {
        showLoading: true,
        TGurl:'',
        activeIndex: '/FrTrade/c2cTrade',
        userShopType:'',
        indexList:'1',
        ifDisable:false,
        count:'',
        totalTime:60,
        smsSendBoolean:true,
        emailSendBoolean:true,
        isToken:sessionStorage.getItem('userToken'),
        form: {
          code:'',
          currencyZhName:'',
          currencyEnName:'',
          currencyAbbrName:'',
          marketFloat:'',
          officialHoldings:'',
          officialAddress:'',
          blockBrowser:'',
          movementArea:'',
          whitePaperAddress:'',
          listedExchange:'',
          projectAreas:'',
          functionalInterpretation:'',
          projectAddress:'',
          addressWay:'',
          del:'N'
        }
      };
    },
    created(){
      this.getSmsSend();
      this.getEmailSend()
    },
    components:{

        Foot,

    },
    methods: {
      async getSmsSend(){
        var that =this
        var res = await checkSmsSendApi()
        if(res.success){
          this.smsSendBoolean = res.data == "N"
        }else{
          codeStatus(res.code,function(msg){
            that.$message.error(msg)
          })
        }

      },
      async getEmailSend(){
        var that=this
        var res = await checkEmailSendApi()
        if(res.success){
          this.emailSendBoolean = res.data == "N"
        }else{
          codeStatus(res.code,function(msg){
            that.$message.error(msg)
          })
        }
      },
      async handleIconClick() {//发送验证码
        var that = this;
        if(!that.isToken){
          that.$message.error(this.$t('bico.W72'),);
          return
        }
        if (that.ifDisable) {
          that.$message.error(this.$t('bico.W73'), + that.count + this.$t('bico.W73'),);
          return
        }
        if(!that.checkData()){
          return
        }

        that.send()
      },
      async send(){
        var that=this
        var data = new URLSearchParams();
        data.set('account', '');
        console.log(this.$t('bico.W75'),)
        var res = await sendApi(data);
        if (res.code == 200) {
          that.$message({
            type: 'success',
            message: that.$t('tip.sendSuccess')
          })
          that.ifDisable = true;
          that.count = '(' + that.totalTime + 's)';
          that.clock = setInterval(function () {
            that.totalTime--
            that.count = '(' + that.totalTime + 's)';
            if (that.totalTime <= 0) {
              clearInterval(that.clock)
              that.count = ''
              that.totalTime = 60
              that.ifDisable = false
            }
          }, 1000)
        } else {
          codeStatus(res.code, function (msg) {
              that.$message.error(msg);
            }
          )
        }
      },
      isEmpty(obj){
        if(typeof obj == "undefined" || obj == null || obj == ""){
          return true;
        }else{
          return false;
        }
      },
      checkData(){
        var that=this

        if(that.isEmpty(that.form.currencyZhName)){
          that.$message.error(this.$t('bico.W58'),);
          return false
        }
        if(that.isEmpty(that.form.currencyEnName)){
          that.$message.error(this.$t('bico.W59'),);
          return false
        }
        if(that.isEmpty(that.form.currencyAbbrName)){
          that.$message.error(this.$t('bico.W60'),);
          return false
        }
        if(that.isEmpty(that.form.marketFloat)){
          that.$message.error(this.$t('bico.W61'),);
          return false
        }
        if(that.isEmpty(that.form.officialAddress)){
          that.$message.error(this.$t('bico.W63'),);
          return false
        }
        if(that.isEmpty(that.form.officialHoldings)){
          that.$message.error(this.$t('bico.W62'),);
          return false
        }
        if(that.isEmpty(that.form.blockBrowser)){
          that.$message.error(this.$t('bico.W64'),);
          return false
        }
        if(that.isEmpty(that.form.movementArea)){
          that.$message.error(this.$t('bico.W65'),);
          return false
        }
        if(that.isEmpty(that.form.whitePaperAddress)){
          that.$message.error(this.$t('bico.W66'),);
          return false
        }
        if(that.isEmpty(that.form.listedExchange)){
          that.$message.error(this.$t('bico.W67'),);
          return false
        }
        if(that.isEmpty(that.form.projectAreas)){
          that.$message.error(this.$t('bico.W68'),);
          return false
        }
        if(that.isEmpty(that.form.functionalInterpretation)){
          that.$message.error(this.$t('bico.W69'),);
          return false
        }
        if(that.isEmpty(that.form.projectAddress)){
          that.$message.error(this.$t('bico.W70'),);
          return false
        }
        if(that.isEmpty(that.form.addressWay)){
          that.$message.error(this.$t('bico.W71'),);
          return false
        }
        return true
      },
      async submit(){
        var that=this
        var data = new URLSearchParams();
        data.set("code",that.form.code)
        data.set("currencyZhName",that.form.currencyZhName)
        data.set("currencyEnName",that.form.currencyEnName)
        data.set("currencyAbbrName",that.form.currencyAbbrName)
        data.set("marketFloat",that.form.marketFloat)
        data.set("officialHoldings",that.form.officialHoldings)
        data.set("officialAddress",that.form.officialAddress)
        data.set("blockBrowser",that.form.blockBrowser)
        data.set("movementArea",that.form.movementArea)
        data.set("whitePaperAddress",that.form.whitePaperAddress)
        data.set("listedExchange",that.form.listedExchange)
        data.set("projectAreas",that.form.projectAreas)
        data.set("functionalInterpretation",that.form.functionalInterpretation)
        data.set("projectAddress",that.form.projectAddress)
        data.set("addressWay",that.form.addressWay)
        data.set("del",that.form.del)

        console.log(data);
        var res =await addCoinApply(data);
        if (res.code == 200) {
          that.$message({
            type: 'success',
            message: this.$t('bico.W76'),
          })
        }
      },
      onSubmit(){
        var that = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            that.submit()
          } else {
            this.$message.error(this.$t('bico.W77'),);
            return false;
          }
        });
      }
    }
  };
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
        font-size: 22px;
        line-height: 24px;
        margin-top: 22px;
        font-weight: 600;
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
