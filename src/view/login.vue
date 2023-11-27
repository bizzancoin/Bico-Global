<template>
    <div class="all_container">
        <div class="">
            <section id="container">
                <div class="sign-page bg-img" id="contBox" style="padding-top: 70px; padding-bottom: 90px; background: rgb(29, 29, 60); min-height: 985px;background: linear-gradient(-45deg, #171b31, #0e1121, #211535, #111531);background-size: 400% 400%;animation: gradient 5s ease infinite;">
                    <div class="cont-center">

                            <!-- <div class="left5">
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
                                    <img src="https://btc018.oss-accelerate.aliyuncs.com/coinw2/static/front/images/register/register-footer.png" class="register-footer">
                            </div> -->

                            <div class="registerBox">

                                <p class="tit">{{$t('verification.logoName')+' Bico Global'}}</p>
                                <div style="height:50px;"></div>
                                <div class="labelRow labelItem ppip">


                                    {{$t('verification.loginTxt')}}

                                </div>
                                <div style="height:50px;"></div>

                            <el-form :model="form" ref="form">

                                <el-form-item :rules="[{ required: true, message: $t('form.accountEmpty')}]" prop="name">
                                     <el-input v-model="form.name" autocomplete="off" :placeholder="$t('form.account')"></el-input>
                                </el-form-item>
                                
                                <el-form-item :rules="[{ required: true, message: $t('form.loginPwdEmpty')},{pattern:validation.password,message:$t('form.loginPwdRight'),trigger:'blur'}]" prop="pwd">
                                    <el-input v-model="form.pwd" :type="passwordType ? 'text' : 'password'" autocomplete="off" :placeholder="$t('form.loginPwd')">
                                        <img class="eye" :src="eyeImg" slot="append" alt="" @click="handleEye" />
                                    </el-input>
                                </el-form-item>

                                <div style="height:50px;"></div>

                                <div>
                                    <el-button style="width: 100%;" class="themeBtn" v-loading.fullscreen.lock="fullLoading" @click="submitLogin('form')">{{$t('nav.log')}}</el-button>
                                </div>

                                

                                <div>
                                    <p class="fontCenter5 moveHand ppip"><a class="themeFont" @click="dialogForget">{{$t('form.forget')}}</a><a class="themeFont" @click="$router.push('/register')">{{$t('verification.registerName')}}</a></p>
                                </div>

                            </el-form>
                            <!-- <div style="height:50px;"></div>
                            <el-divider></el-divider> -->
                            <!-- <AppTxt/> -->
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
import { loginApi } from '@/api/getData'
import codeStatus from '@/config/codeStatus'
import { validation } from '@/config/validation'
export default {
    inject:['reload'],
    data(){
        return{
            form: {
	        	name: '',
	        	pwd: '',
            },
            loginForm:true,
            passwordType:false,
            registerFormVisible:false,
            forgetFormVisible:false,
            eyeArr:[{
                img:require('../assets/eye_close.png')
            },{
                img:require('../assets/eye_open.png')
            }],
            eyeImg:require('../assets/eye_close.png'),
            validation,
            fullLoading:false,
        }
    },
    created(){

    },
    methods:{
    	handleEye(){//显示隐藏密码
            var that = this;
            that.passwordType = !that.passwordType;
            if(that.passwordType){
                that.eyeImg = that.eyeArr[1].img
            }else{
                that.eyeImg = that.eyeArr[0].img
            }
        },
        dialogForget(){
        	this.$router.push('/forget')
        },
		submitLogin(form){
            var that = this;
            that.$refs[form].validate(async (valid) => {
                if(valid){
                    that.fullLoading = true;
                    let dataArr = new URLSearchParams();
                    dataArr.set('account',that.form.name);
                    dataArr.set('password',that.form.pwd);
                    var res = await loginApi(dataArr);
                    if(res.code == 200){
                        that.$message({
                            type:'success',
                            message:that.$t('form.loginSuccess')
                        });
                        var data = res.data;
                        sessionStorage.setItem('userToken',data.token);
                        that.reload();
                        that.$router.push('/');
                        
                    }else{
                        codeStatus(res.code,function(res){
                            that.$message.error(res);
                        })
                        that.fullLoading = false
                    }

                    setTimeout(()=>{
                        that.fullLoading = false
                    },2000)
                }
            })
        }
    },
    components:{
		AppTxt
    }
}
</script>
<style lang="less">
#container .cont-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #container .cont-center .left5 {
            width: 460px;
            padding-top: 0px;
            padding-left: 0px;
            margin-right: 1px;
            background-color: #ffffff;
        }
        #container .cont-center .left5 .register-logo {
          width: 130px;
          margin-bottom: 18px;
        }
        #container .cont-center .left5 .tit {
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
        #container .cont-center .left5 ul li {
          font-size: 12px;
          font-family: Helvetica;
          color: #85889C;
          line-height: 14px;
          margin-bottom: 18px;
          padding-left: 10px;
          position: relative;
        }
        #container .cont-center .left5 ul li b{
          font-size: 18px;
          font-family: DINPro-Medium, DINPro;
          font-weight: 500;
          color: #85889C;
        }
        #container .cont-center .left5 ul li::before {
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

.fontCenter5 {
    text-align: center;
    display: flex;
    margin-top: 24px;
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
</style>
