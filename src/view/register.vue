<template>
    <div class="all_container">
        <div class="">
            <section id="container">
                <div class="sign-page bg-img" id="contBox" style="padding-top: 70px; padding-bottom: 90px; background: rgb(29, 29, 60); min-height: 985px;background: linear-gradient(-45deg, #171b31, #0e1121, #211535, #111531);background-size: 400% 400%;animation: gradient 5s ease infinite;">
                    <div class="cont-center">
                            <div class="left">
                                <P class="leftt">Bico Global</P>
                                <div class="tit">{{$t('bico.W180')}}</div>
                                    <ul>
                                        <li>
                                            <b>{{$t('bico.W182')}}</b> {{$t('bico.W183')}}
                                        </li>
                                        <li>{{$t('bico.W184')}} <b>{{$t('bico.W185')}} </b>
                                        </li>
                                        <li>{{$t('bico.W186')}}<b>{{$t('bico.W187')}}</b>{{$t('bico.W188')}}</li>
                                        <li>{{$t('bico.W189')}}<b>{{$t('bico.W190')}}</b> {{$t('bico.W191')}}</li>
                                    </ul>
                                    <img src="../assets/register-footer.png" class="register-footer">
                            </div>
                            <div class="registerBox">

                                <p class="tit">{{$t('bico.W181')}}</p>

                                <div class="labelRow labelItem">


                                    <el-tabs v-model="activeName" @tab-click="handleClick">

                                        <el-tab-pane class="labelRow1" :label="$t('verification.phone')" name="1"></el-tab-pane>

                                        <el-tab-pane class="labelRow2"  :label="$t('verification.email')" name="0"></el-tab-pane>

                                    </el-tabs>

                                </div>
                                <el-divider></el-divider>

                            <el-form :model="form" ref="form">



                                <el-form-item v-if="activeName == '0'" :rules="[{ required: true, message: $t('form.loginEmail')},{pattern:validation.email,message:$t('verification.emailRight'),trigger:'blur'}]" prop="email">
                                    <el-input v-model="form.email"  autocomplete="off" :placeholder="$t('form.loginEmail')"></el-input>
                                </el-form-item>

                                <!-- 国际区号选择 -->

                                <div class="selectArea" v-if="activeName == '1'" >

                                    <el-form-item :rules="[{ required: true, message: $t('form.phone')}]" prop="phone">

                                        <Area @selectValue="selectValue" />

                                        <el-input class="enterInput" v-model="form.phone" autocomplete="off" :placeholder="$t('form.phone')"></el-input>

                                    </el-form-item>

                                </div>


                                <el-form-item :rules="[{ required: true, message: $t('form.loginPwdEmpty')},{pattern:validation.password,message:$t('form.loginPwdRight'),trigger:'blur'}]" prop="pwd">
                                    <el-input class="codeBtn" v-model="form.pwd" :type="passwordType ? 'text' : 'password'" autocomplete="off" :placeholder="$t('form.loginPwdEmpty')">
                                        <img class="eye" :src="eyeImg" slot="append" alt="" @click="handleEye" />
                                    </el-input>
                                </el-form-item>

                                <el-form-item prop="invite" v-if="inviteOpen" :rules="[{ required: true, message: $t('form.inviteEmpty')}]">
                                    <el-input v-model="form.invite" autocomplete="off" :placeholder="$t('form.inviteEmpty')"></el-input>
                                </el-form-item>
                                <!--验证码-->
                                <el-form-item :rules="[{ required: true, message: $t('form.codeEmpty')}]"  prop="code" v-if="activeName=='1'&&!smsSendBoolean">
                                    <el-input v-model="form.code" autocomplete="off" :placeholder="$t('form.codeEmpty')" >
                                        <i v-if="ifDisable == false" class="el-input__icon themeFont " slot="append"  @click="handleIconClick">{{$t('form.code')}}</i>
                                        <i v-else class="el-input__icon themeFont" slot="suffix">{{$t('form.code')}}{{count}}</i>
                                    </el-input>
                                </el-form-item>

                              <el-form-item :rules="[{ required: true, message: $t('form.codeEmpty')}]" prop="code" v-if="activeName=='0'&&!emailSendBoolean">
                                <el-input v-model="form.code" autocomplete="off" :placeholder="$t('form.codeEmpty')" >
                                  <i v-if="ifDisable == false" class="el-input__icon themeFont " slot="append"  @click="handleIconClick">{{$t('form.code')}}</i>
                                  <i v-else class="el-input__icon themeFont" slot="suffix">{{$t('form.code')}}{{count}}</i>
                                </el-input>
                              </el-form-item>

                                <!-- <div style="height:10px;"></div> -->
                                <p>
                                    <el-checkbox v-model="checked">
                                        {{$t('verification.agree')}}
                                    </el-checkbox>
                                    <router-link class="differnet" :to="{path:'privacy',query:{type:1}}">《{{$t('foot.secret')}}》</router-link>
                                    <router-link class="differnet" to="privacy">{{$t('tip.privacy')}}</router-link>
                                </p>

                                <div>
                                    <el-button style="width: 100%;" class="themeBtn" v-loading.fullscreen.lock="fullLoading" @click="submitRegister('form')">{{$t('verification.registerName')}}</el-button>
                                </div>


                                <div class="blink">
                                    <p class="fontCenter moveHand ppip">{{$t('form.haveAccount')}}<a class="themeFont" @click="openLoginClose">{{$t('verification.logoName')}}</a></p>
                                </div>

                            </el-form>
                        </div>

                    </div>

                </div>

                <div class="miniFooter">
                    <a href=""></a><span class="line"></span>
                    <span class="f">© 2010-2022 Bico Global.sh ALL Rights Reserved.</span>
                </div>

            </section>
        </div>
    </div>
</template>
<script>
import AppTxt from '@/components/AppTxt'
import Area from '@/components/Area'
import { registerApi,checkInviteApi,checkSmsSendApi,checkEmailSendApi,inviteConfigApi } from '@/api/getData'
import sendMsg from '@/config/sendMsg'
import codeStatus from '@/config/codeStatus'
import { validation } from '@/config/validation'
export default {
    data(){
        return{
            checked:false,
            activeName:'1',
            form: {
                areaCode:'86',
                areaType:'0',
                email: '',
                phone:'',
	        	pwd: '',
                invite:'',//搜索框内容
                code:''
            },
            passwordType:false,
            eyeArr:[{
                img:require('../assets/eye_close.png')
            },{
                img:require('../assets/eye_open.png')
            }],
            eyeImg:require('../assets/eye_close.png'),
            ifDisable:false,
            count:'',
            totalTime:'',
            userFormVisible:false,
            clock:null,
            getTwoLang:'',
            validation,
            fullLoading:false,
          smsSendBoolean:true,
          emailSendBoolean:true,
          inviteOpen:true

        }
    },
    created(){
        this.totalTime = this.validation.count;
        this.getSmsSend();
        this.getEmailSend()
      this.getInviteConfigs()
    },
    methods:{
      getInviteConfigs(){
        inviteConfigApi().then(res=>{
          if(res.code == 200){
            //获取信息历史记录
            this.inviteOpen=res.data.inviteOpen=='Y'
          }
        })
      },
        selectValue(item){//选择区号

            var that = this;
            that.form.areaCode = item.code;
            that.form.areaType = item.type;
            console.log(item)
        },
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
		handleClick(tab, event){
            var that = this;
            that.$refs.form.resetFields();
            clearInterval(that.clock);
            that.count = ''
            if(that.activeName == '1'){
                that.totalTime = that.validation.count
            }else{
                that.totalTime = 300
            }
       
            that.ifDisable = false
        },
        handleEye(){//显示隐藏密码
            var that = this;
            that.passwordType = !that.passwordType;
            if(that.passwordType){
                that.eyeImg = that.eyeArr[1].img
            }else{
                that.eyeImg = that.eyeArr[0].img
            }
        },
        handleIconClick(){//发送验证码
            var that = this;
            if(that.inviteOpen &&that.form.invite == ''){
              that.$message.error(that.$t('form.inviteEmpty'))
              return
            }
            if(that.activeName == '1'){//手机
                if(that.form.areaCode == ''){
                    that.$message.error(that.$t('layer.emptyArea'));
                    return false;
                }
                if(that.form.phone == ''){
                    that.$message.error(that.$t('form.phone'));
                    return false;
                }

                if(that.form.areaCode == '86'){
                    var pattern = that.validation.tel;
                    if(!pattern.test(that.form.phone)){
                        that.$message.error(this.$t('bico.W319'),);
                        return false
                    }
                }


                var account = that.form.phone;
                var areaType = that.form.areaType;
                var areaCode = that.form.areaCode;
            }else{//邮箱
                if(that.form.email == ''){
                    that.$message.error(that.$t('form.loginEmail'));
                    return false;
                }
                var pattern = that.validation.email;
                if(!pattern.test(that.form.email)){
                  that.$message.error(this.$t('bico.W320'),);
                  return false
                }

                var account = that.form.email;
                var areaType = '';
                var areaCode = '';
            }
            var obj = {
               'account':account,
               'type':areaType,
               'code':areaCode
            };
          that.checkInvite(obj)

        },
      async checkInvite(obj){
          var that = this
        var res
        if(that.inviteOpen){
          var data = new URLSearchParams();
          data.set('code', this.form.invite);
          res = await checkInviteApi(data)
        }
        if((!that.inviteOpen)||res.success){
          sendMsg(obj,function(res){
            if(res.success){
              that.$message({
                type:'success',
                message:that.$t('tip.sendSuccess')
              })
              that.ifDisable = true;
              that.count = '('+that.totalTime+'s)';
              that.clock = setInterval(function(){
                that.totalTime--
                that.count = '('+that.totalTime+'s)';
                if(that.totalTime < 0){
                  clearInterval(that.clock)
                  that.count = ''
                  if(that.activeName == '1'){
                    that.totalTime = that.validation.count
                  }else{
                    that.totalTime = 300
                  }
                  that.ifDisable = false
                }
              },1000)
            }else{
              codeStatus(res.code,function(msg){
                that.$message.error(msg)
              })
            }
          })
        }else{
          codeStatus(res.code,function(msg){
            that.$message.error(msg)
          })
        }


      },
        submitRegister(form){//提交表单
            var that = this;
            that.$refs[form].validate(async (valid) => {
                if(valid){
                    if(!that.checked){
                        that.$message.error(that.$t('layer.select'));
                        return false;
                    }

                    if(that.activeName == '0'){
                        var account = that.form.email;
                        var areaType = '';
                        var areaCodeTxt = '';
                    }else if(that.activeName == '1'){
                        if(that.form.areaCode == ''){
                            that.$message.error(that.$t('layer.emptyArea'));
                            return false;
                        }

                        // if(that.form.areaCode == '86'){
                        //     var pattern = that.validation.tel;
                        //     if(!pattern.test(that.form.phone)){
                        //         that.$message.error('请输入11位手机号码');
                        //         return false
                        //     }
                        // }
                        var account = that.form.phone;
                        var areaType = that.form.areaType;
                        var areaCodeTxt = that.form.areaCode;
                    }
                    that.fullLoading = true;
                    let dataArr = new URLSearchParams();
                    dataArr.set('account',account);
                    dataArr.set('password',that.form.pwd);
                    dataArr.set('inviteCode',that.form.invite);
                    dataArr.set('msg',that.form.code);
                    dataArr.set('type',areaType);
                    dataArr.set('code',areaCodeTxt);
                    var res = await registerApi(dataArr);
                    if(res.success){
                        that.$message({
                            type:'success',
                            message:that.$t('form.registerSuccess')
                        });
                        var data = res.data;
                        that.$refs[form].resetFields();
                        setTimeout(function(){
                            that.$router.push('/login');
                        },800)

                    }else{
                        that.fullLoading = false
                        codeStatus(res.code,function(res){
                            that.$message.error(res);
                        })
                    }

                    setTimeout(()=>{
                        that.fullLoading = false
                    },2000)

                }
            })
        },
        openLoginClose(){
            this.$router.push('/login')
        },
    },
    components:{
		AppTxt,Area
    }
}
</script>
<style lang="less">
#container .cont-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #container .cont-center .left {
          width: 500px;
          padding-top: 90px;
          padding-left: 70px;
          margin-right: 200px;
        }
        #container .cont-center .left .register-logo {
          width: 130px;
          margin-bottom: 18px;
        }
        #container .cont-center .left .tit {
          font-size: 26px;
          font-family: Helvetica-Bold, Helvetica;
          font-weight: bold;
          color: #FEFEFC;
          line-height: 31px;
          margin-bottom: 60px;
          margin-right: -40px;
        }
        .leftt{

            font-size: 40px;
            font-family: Helvetica-Bold, Helvetica;
            font-weight: bold;
            color: #FEFEFC;
            line-height: 0px;
            margin-bottom: 40px;
            margin-right: -40px;
        }
        #container .cont-center .left ul li {
          font-size: 12px;
          font-family: Helvetica;
          color: #85889C;
          line-height: 14px;
          margin-bottom: 18px;
          padding-left: 10px;
          position: relative;
        }
        #container .cont-center .left ul li b{
          font-size: 18px;
          font-family: DINPro-Medium, DINPro;
          font-weight: 500;
          color: #85889C;
        }
        #container .cont-center .left ul li::before {
          content: '';
          width: 4px;
          height: 4px;
          background: #7650FF;
          transform: rotate(45deg);
          position: absolute;
          top: 2px;
          left: 0px;
        }
        #container .cont-center .register-footer {
          width: 290px;
          margin-top: 40px;
          margin-left: 10px;
        }
        @media screen and (max-width: 1670px) {
          .media1500 {
            display: block;
            width: 116px;
            word-wrap: break-word;
            white-space: normal;
            word-break: break-all;
        }










}

.registerBox {
  width: 400px;
  height: 700px;

  font-size: 14px;
  /* margin: 70px auto 0; */
  padding: 0 30px;
  margin-top: 70px;
}

.miniFooter {

    text-align: center;
    color: #a1a1a1;
    font-size: 12px;
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0;
    opacity: 1;
    height: 60px;
    line-height: 60px;
    background: #15192b;
}

.registerBox .formInfo .blink {
    display: flex;
    margin-top: 31px;
    justify-content: space-between;
    font-size: 13px;
}

.fontCenter {
    text-align: center;
    display: flex;
    margin-top: 60px;
    justify-content: space-between;
    font-size: 14px;
}

.labelRow1 {
  width: 15.5%;
    border-bottom: 2px solid #699bf3;
    padding: 0px 0 0px;
    position: relative;
    left: 0px;
    bottom: 3px;
    display: block;
    height: 3px;
    transition: all ease 0.3s;


}

.labelRow2 {
  width: 15.5%;
    border-bottom: 2px solid #699bf3;
    padding: 0px 0 0px;
    position: relative;
    left: 96px;
    bottom: 3px;
    display: block;
    height: 3px;
    transition: all ease 0.3s;


}

.el-tabs__header {

    margin: 0 0 0px;
}
.registerBox .labelRow .labelItem {
  font-size: 18px;
  color: #333;
  margin-right: 45px;
  cursor: pointer;
  user-select: none;
}
.registerBox .labelRow .sliding {
  position: absolute;
  left: 0;
  bottom: -30px;
  display: block;
  width: 40px;
  height: 3px;
  background: #7551FF;
  transition: all ease 0.3s;
}
.registerBox .formInfo {
  padding-top: 25px;
  transition: all ease 0.3s;
  opacity: 0;
}
.registerBox .formInfo .paddingNone {
  padding: 0 !important;
}
.registerBox .formInfo .xyRow {
  margin-bottom: 36px;
  display: flex;
  align-items: center;
}
.registerBox .formInfo .xyRow .checkbox {
  width: 14px;
  height: 14px;
  text-align: center;
  line-height: 14px;
  background: #7551FF;
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
}
.registerBox .formInfo .xyRow input{
  visibility: hidden;
  width: 1px;
  height: 1px;
  overflow: hidden;
  transform: translate(-10px, -10px);
  -webkit-text-fill-color: #fff;
  text-shadow: none !important;
  -webkit-appearance: none !important;
  background-color: transparent;
  outline-color: transparent !important;
}
/*.registerBox .formInfo .xyRow .checkbox.active::after {*/
  /*content: "\e60c";*/
  /*color: #fff;*/
  /*width: 9px;*/
  /*height: 6px;*/
/*}*/
.registerBox .formInfo .xyRow .rFont {
  color: #878787;
  font-size: 13px;
}
.registerBox .formInfo .xyRow .rFont a {
  color: #656565;
  font-size: 13px;
  text-decoration: none;
}
.registerBox .formInfo .xyRow .rFont a:hover {
  color: #7551FF;
  text-decoration: underline;
}
.registerBox .formInfo .errMsg {
  color: #FF5757;
  font-size: 12px;
  margin-top: -13px;
  height: 30px;
  display: none;
}

.registerBox .formInfo .inputGroup.focus{
  border-color: #7651ff80;
  box-shadow: 0px 0px 4px #714cffb8;
}

#container .cont-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

















.formPage{

    .el-input__icon{
        width: 100%;
        cursor: pointer;
        font-style: normal;
    }




    .el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #409eff;
    z-index: 1;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
}


    .codeBtn {
        cursor: pointer;
        border-left: 1px solid #DFDFE7;
        width: 100px;
        height: 44px;
        font-size: 14px;
        color: #A1A1A1;
        line-height: 46px;
        text-align: center;
        transition: all ease 0.3s;
    }

    .el-checkbox__inner{
        border-radius: 14px;
        background-color: transparent !important;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner{
        background-color: transparent;
        border-color: @mainsColor;
    }
    .el-checkbox__inner::after{
        border-radius: 6px;
        background-color:@mainsColor;
        width: 6px;
        height: 6px;
        top: 4px;
        left: 4px;
        border:1px solid @mainsColor;
        top: 2px;
        left: 2px;
    }
    .el-checkbox__label,.el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__inner:focus{
        color: #8E8E8E;
    }
    .differnet{
        color:@mainsColor;
        cursor: pointer;
    }
    .el-checkbox__inner:hover{
        border-color: #DCDFE6!important;
    }
}

.selectArea{
    .el-form-item.is-error .el-input__inner{
        border-color: #c9d8e4!important;

    }
    .el-form-item__content{
        display: flex;
        flex-direction: row;
        .enterInput{
            .el-input__inner{
                border-radius: 0 0px 0px 0!important;
                border-left: none!important;
                text-align: left!important;


                &:focus{
                    border-color: #c9d8e4!important;
                }
            }
        }

    }
}


.el-button {

    border-radius: 2px;

    height: 46px!important;

}

.vue-country-intl-popover {
    position: absolute;
    width: 400px !important;
    z-index: 100;
    border: 1px solid #e8e8e8;
    filter: drop-shadow(2px 2px 8px #ddd);
}
.vue-country-intl-popover .search-input {
    display: block;
    width: 100%!important;
    height: 40px!important;
    line-height: 1.42857143;
    padding: 0px 0px!important;
    border: 1px solid #dadce5;
    border-radius: 4px;
    outline: none;
    font-size: 14px;
    color: #333;
    -webkit-transition: border-color .2s;
    transition: border-color .2s;
    background-color: #ffffff;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.vue-country-item:not(.selected):hover {
    color: #fff;
    background-color: #e6e6e6;
}
</style>
