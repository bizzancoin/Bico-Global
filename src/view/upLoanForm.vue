<template>

    <div class="token_div">

      <div class="pollIndexBanner flex">
        <div class="pollIndexBannerView _row flex-1">
          <div class="pollIndexBannerRow flex-1">
            <div class="pollIndexBannerTitle">{{$t('bico.W323')}}</div>
            <div class="pollIndexBannerText">{{$t('bico.W324')}}</div>
          </div>
          <div class="pollIndexBannerBg"></div>
        </div>
      </div>

        <div class="token_div1">
            <div class="token_div2">

                <div>
                    <span>{{$t('bico.W325')}}</span>
                    <el-divider></el-divider>
                </div>

                <div style="margin: 20px;"></div>
                   
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item :label="$t('bico.W326')" prop="phone" :rules="[{ required: true, message:$t('bico.W326')}]">
          <el-input v-model="form.phone" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W327')" prop="idCard" :rules="[{ required: true, message:$t('bico.W327')}]">
        <el-input v-model="form.idCard"  ></el-input>
      </el-form-item>
        <el-form-item :label="$t('bico.W328')" prop="idCard2" :rules="[{ required: true, message:$t('bico.W328')}]">
          <el-input v-model="form.idCard2"   ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W329')" prop="price" :rules="[{ required: true, message:$t('bico.W329')}]">
        <el-input v-model="form.price"   ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W330')" prop="coin" :rules="[{ required: true, message:$t('bico.W330')}]">
          <el-input v-model="form.coin"   ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W331')" prop="address" :rules="[{ required: true, message:$t('bico.W331')}]">
          <el-input v-model="form.address"  ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bico.W332')" prop="remark" :rules="[{ required: true, message:$t('bico.W332')}]">
          <el-input v-model="form.remark"  :placeholder="$t('bico.W332')"></el-input>
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
  import { sendApi,addLoanApply,checkSmsSendApi,checkEmailSendApi } from '@/api/getData'
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
          phone:'',
          coin:'',
          idCard:'',
          idCard2:'',
          address:'',
          remark:'',
          price:'',

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

        if(that.isEmpty(that.form.phone)){
          that.$message.error('请填写联系号码手机');
          return false
        }
        if(that.isEmpty(that.form.coin)){
          that.$message.error('请填写币种');
          return false
        }
        if(that.isEmpty(that.form.address)){
          that.$message.error('请填写收款钱包地址');
          return false
        }
        if(that.isEmpty(that.form.idCard)){
          that.$message.error('请填写身份证');
          return false
        }
        if(that.isEmpty(that.form.idCard2)){
          that.$message.error('请填写护照');
          return false
        }
        if(that.isEmpty(that.form.remark)){
          that.$message.error('略微附加说明一下');
          return false
        }
        if(that.isEmpty(that.form.price)){
          that.$message.error('请填写金额');
          return false
        }

        return true
      },
      async submit(){
        var that=this
        var data = new URLSearchParams();
        data.set("code",that.form.code)
        data.set("phone",that.form.phone)
        data.set("coin",that.form.coin)
        data.set("address",that.form.address)
        data.set("idCard",that.form.idCard)
        data.set("idCard2",that.form.idCard2)
        data.set("remark",that.form.remark)
        data.set("price",that.form.price)

        data.set("del",that.form.del)

        console.log(data);
        var res =await addLoanApply(data);
        if (res.code == 200) {
          that.$message({
            type: 'success',
            message: this.$t('bico.W76'),
          })
        }else{
          codeStatus(res.code, function (msg) {
              that.$message.error(msg);
            }
          )
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



.pollIndexBannerView {
  flex-direction: row;
  display: flex;
  flex: 1;
  align-items: center;
}

.pollIndexBannerRow {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pollIndexBannerRow .pollIndexBannerTitle {
  color: #ffffff;
  font-size: 50px;
  line-height: 1;
}

.pollIndexBannerRow .pollIndexBannerText {
  color: #ffffff;
  font-size: 22px;
  padding-top: 42px;
  line-height: 1;
}

.pollIndexBannerBg {
  width: 408px;
  height: 300px;
  background: url(../assets/9342DD6E8A854864.png) center center no-repeat;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
  text-align: right;
  position: absolute;
  top: 0px;
  right: 0;
  left: 62vw;
}
.poll .flex {
  display: flex;
}

.poll .flex-1 {
  flex: 1
}
._row {
  width: 1200px;
  margin: 0 auto;
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
