<template>
    <div class="all_container">
        <div class="allBox">
            <div class="formPage">
                
                
                <h2 style="margin: 0 auto;font-size: 24px;font-weight: 400;margin: 2vh auto 20px;">{{$t('verification.logoName')+' Bico Global'}}</h2>
            
                <p style="margin: 0 auto;font-size: 14px;font-weight: 400;margin: 2vh auto 20px;">{{$t('verification.loginTxt')}}</p>

                <el-form :model="form" ref="form">

                    <el-form-item :rules="[{ required: true, message: $t('form.accountEmpty')}]" prop="name">
                        <el-input v-model="form.name" autocomplete="off" :placeholder="$t('form.account')"></el-input>
                    </el-form-item>
                    
                    <el-form-item :rules="[{ required: true, message: $t('form.loginPwdEmpty')},{pattern:validation.password,message:$t('form.loginPwdRight'),trigger:'blur'}]" prop="pwd">
                        <el-input v-model="form.pwd" :type="passwordType ? 'text' : 'password'" autocomplete="off" :placeholder="$t('form.loginPwd')">
                            <img class="eye" :src="eyeImg" slot="suffix" alt="" @click="handleEye" />
                        </el-input>
                    </el-form-item>

                    <div>
                        <el-button style="width: 100%;" class="themeBtn" v-loading.fullscreen.lock="fullLoading" @click="submitLogin('form')">{{$t('nav.log')}}</el-button>
                    </div>

                    <div>
                        <p class="moveHand"><a class="themeFont" @click="dialogForget">{{$t('form.forget')}}</a></p>
                    </div>

                    <div>
                        <p class="fontCenter moveHand ppip">{{$t('form.noAccount')}} ？<a class="themeFont" @click="$router.push('/register')">{{$t('verification.registerName')}}</a></p>
                    </div>

                </el-form>
                <!--AppTxt /-->
            </div>
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
.formPage {
	
    
    .eye{
        cursor: pointer;
        padding-top: 12px;
    }
    .themeFont {
        .moveHand{
            cursor: pointer;
        }
    }
    .el-tabs__active-bar{
        display: none;
    }
}
</style>