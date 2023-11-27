
import  { versionApi } from '@/api/getData'

import Vue from 'vue'
//获取下载app的地址
export default function appDown(back){
    Vue.nextTick(async() =>{
        var data = new URLSearchParams();
        data.set('version','');
        data.set('type','ANDROID');
        var res = await versionApi(data);
        if(res.success){
            var android = res.data.address

            iosQrcodeFun(function(res){
                var obj = {
                    'android':android,
                    'ios':res
                }
                back(obj)
            });
        }
    })
}


function iosQrcodeFun(callback){
    Vue.nextTick(async() =>{
        var data = new URLSearchParams();
        data.set('version','');
        data.set('type','IOS');
        var res = await versionApi(data);
        if(res.success){
            var address = res.data.address;
            callback(address)
        }
    })
}