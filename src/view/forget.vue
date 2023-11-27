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

                                <p class="tit">{{$t('verification.forgetTxt')}}</p>

                                <div class="labelRow labelItem">

                                    <el-tabs v-model="activeName" @tab-click="handleClick">
                                        <el-tab-pane class="labelRow1" :label="$t('bico.W192')" name="1"></el-tab-pane>
                                        <el-tab-pane class="labelRow2" :label="$t('bico.W193')" name="0"></el-tab-pane>
                                    </el-tabs>

                                </div>
                                <el-divider></el-divider>

                            <el-form :model="form" :rules="rules" ref="ruleForm">

                                <el-form-item v-if="activeName == '0'" :rules="[{ required: true, message: $t('form.loginEmail')},{pattern:validation.email,message:$t('verification.emailRight'),trigger:'blur'}]" prop="email">
                                    <el-input v-model="form.email" autocomplete="off" :placeholder="$t('form.loginEmail')"></el-input>
                                </el-form-item>

                                <div class="selectArea" v-if="activeName == '1'" >

                                    <el-form-item :rules="[{ required: true, message: $t('form.phone')}]" prop="phone">

                                        <Area @selectValue="selectValue" />

                                        <el-input class="enterInput" v-model="form.phone" autocomplete="off" :placeholder="$t('form.phone')"></el-input>

                                    </el-form-item>

                                </div>

                                <el-form-item :rules="[{ required: true, message: $t('form.loginPwdEmpty')},{pattern:validation.password,message:$t('form.loginPwdRight'),trigger:'blur'}]" prop="pwd">
                                    <el-input v-model="form.pwd" :type="showIcon1?'text':'password'" autocomplete="off" :placeholder="$t('form.loginPwdEmpty')">
                                        <img class="eye" :src="showIcon1? eyeImg : closeImg" slot="append" alt="" @click="handleEye(1)" />
                                    </el-input>
                                </el-form-item>

                                <el-form-item prop="repwd">
                                    <el-input v-model="form.repwd" :type="showIcon2?'text':'password'" autocomplete="off" :placeholder="$t('form.loginSureEmpty')">
                                        <img class="eye" :src="showIcon2? eyeImg : closeImg" slot="append" alt="" @click="handleEye(2)" />
                                    </el-input>
                                </el-form-item>

                                <el-form-item  :rules="[{ required: true, message: $t('form.codeEmpty')}]" prop="codeMsg" v-if="activeName=='1'&&!smsSendBoolean">
                                    <el-input v-model="form.codeMsg" autocomplete="off" :placeholder="$t('form.codeEmpty')">
                                    <i class="el-input__icon themeFont" slot="append" @click="handleIconClick">{{$t('form.code')}}{{count}}</i>
                                    </el-input>
                                </el-form-item>
                              <el-form-item  :rules="[{ required: true, message: $t('form.codeEmpty')}]" prop="codeMsg" v-if="activeName=='0'&&!emailSendBoolean">
                                <el-input v-model="form.codeMsg" autocomplete="off" :placeholder="$t('form.codeEmpty')">
                                  <i class="el-input__icon themeFont" slot="append" @click="handleIconClick">{{$t('form.code')}}{{count}}</i>
                                </el-input>
                              </el-form-item>


                                <div>
                                    <el-button style="width: 100%;" class="themeBtn" @click="submitForget('ruleForm')">{{$t('verification.reset')}}</el-button>

                                </div>

                                <div>
                                    <p class="fontCenter moveHand ppip">{{$t('form.haveAccount')}} ？<a class="themeFont" @click="returnClose">{{$t('verification.logoName')}}</a></p>
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
import { updatePwdApi,checkEmailSendApi,checkSmsSendApi } from '@/api/getData'
import sendMsg from '@/config/sendMsg'
import codeStatus from '@/config/codeStatus'
import { validation } from '@/config/validation'
export default {
    data(){
        var checkPwd = (rule,value,callback) => {
            if( value !== this.form.pwd ){
                callback(new Error(this.$t('form.pwdDifferent')));
            }else{
                callback()
            }
        };
        return{
            activeName:'1',
            form: {
                email:'',
                phone:'',
	        	name: '',
                pwd: '',
                repwd:'',
                code:'',
                codeMsg:'',
                areaCode:'86',
                areaType:'0'
            },
            showIcon1:false,
            showIcon2:false,
            eyeImg:require('../assets/eye_open.png'),
            closeImg:require('../assets/eye_close.png'),
            ifDisable:false,
            count:'',
            totalTime:'',
            clock:null,
            validation,
          smsSendBoolean:true,
          emailSendBoolean:true,
            rules:{
                repwd:[
                    { required:true,whitespace:true,message:this.$t('form.loginSureEmpty')},
                    { pattern:validation.password,message:this.$t('form.loginPwdRight'),trigger:'blur'},
                    { validator:checkPwd,trigger:'blur'}
                ],
            },

        }
    },
    created(){
        this.totalTime = this.validation.count;
        this.getSmsSend()
      this.getEmailSend()
    },
    methods:{
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
        selectValue(item){//选择区号
            var that = this;
            that.form.areaCode = item.code;
            that.form.areaType = item.type;
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
            // this.$refs.ruleForm.resetFields();
        },
        returnClose(){// 返回登录页
            this.$router.go(-1);
        },
        handleEye(value){//显示隐藏密码
            var that = this;
            if(value == 1){
                that.showIcon1 = !that.showIcon1
            }else if(value == 2){
                that.showIcon2 = !that.showIcon2
            }
        },
        handleIconClick(){//发送验证码
            var that = this;
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
                var account = that.form.email;
                var areaType = '';
                var areaCode = '';
            }
            var obj = {
               'account':account,
               'type':areaType,
               'code':areaCode
            };
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
        },
        openRegister(){//关闭忘记密码层，打开注册层
            this.$router.push('/register')
        },
        submitForget(ruleForm){//提交
            var that = this;
            that.$refs[ruleForm].validate(async (valid) => {
                if(valid){
                    if(that.activeName == '0'){
                        var account = that.form.email;
                        var areaTypeTxt = '';
                    }else if(that.activeName == '1'){
                        if(that.form.areaType == ''){
                            that.$message.error(that.$t('layer.emptyArea'));
                            return false;
                        }
                        var account = that.form.phone;
                        var areaTypeTxt = that.form.areaType;
                    }
                    if(that.form.pwd != that.form.repwd){
                        that.$message.error(that.$t('form.pwdDifferent'));
                        return false;
                    }
                    var dataArr = new URLSearchParams();
                    dataArr.set('account',account);
                    dataArr.set('password',that.form.pwd);
                    dataArr.set('confirmPwd',that.form.repwd);
                    dataArr.set('msg',that.form.codeMsg);
                    dataArr.set('type',areaTypeTxt);
                    var res = await updatePwdApi(dataArr);
                    if(res.success){
                        that.$message({
                            type:'success',
                            message:that.$t('person.updatePwd')
                        })
                        that.$refs[ruleForm].resetFields();
                        setTimeout(function(){
                            that.$router.push('/login');
                        },800)
                    }else{
                        codeStatus(res.code,function(msg){
                            that.$message.error(msg)
                        })
                    }
                }
            })
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

.el-popper[x-placement^=top] {

    width: 18%!important;
}

.el-input-group__append, .el-input-group__prepend {

    border-radius: 0px;

}
.el-select-dropdown {

    border-radius: 0px;

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
.vue-country-item.selected {
    color: #fff;
    background-color: #424277;
}
.vue-country-item:not(.selected):hover {
    color: #fff;
    background-color: #e6e6e6;
}
</style>
