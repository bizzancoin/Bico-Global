
import { sendMsgApi } from '@/api/getData'
import Vue from 'vue'

//发送验证码

export default function  sendMsg(obj,callback){
    Vue.nextTick(async() =>{
        var  data = new URLSearchParams();
        data.set('account',obj.account);
        data.set('type',obj.type);
        data.set('code',obj.code);
        var res = await sendMsgApi(data);
        callback(res);
    })
}