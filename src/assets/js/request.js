import qs from 'qs';
import axios from 'axios';
import { Loading } from 'element-ui';
import api from '@/config/apiConfig.js';
import Utils from './utils';
import myStorage from '@/assets/js/myStorage';
import userModel from '@/model/userData.js';
axios.defaults.withCredentials = true;
let loadingMask = null;
const ajaxRequest = (function () {
    const baseURL = api.baseURL;
    axios.interceptors.request.use(
        config => {
            if (config.showLoading) {
                loadingMask = Loading.service({
                    background: "rgba(255, 255, 255, .4)"
                });
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        response => {
            return response.data;
            
            // 这里做了加解密处理-》返回的不是加密数据则返回原来数据，方便上传图片
            // console.log(response.data);
            // if(typeof(response.data) !== 'string'){
            //     console.log(response.data.data); 
            //     return response;
            // }else {
            //     // return response;
            //     let originalText = Utils.decode(response.data);
            //     // console.log(originalText);
            //     return JSON.parse(originalText);
            // }
            
        },
        error => {
            return Promise.resolve(error.response);
        }
    );

    function errorState(response) {
        loadingMask && loadingMask.close();
        if (
            response &&
            (response.status === 200 ||
                response.status === 304 ||
                response.status === 400)
        ) {
            return response;
        }
        return false;
    };

    function successState(response) {
        loadingMask && loadingMask.close();
        let code = response.code * 1 || null;
        // 统一判断后端返回的错误码
        console.log(code)
        if (code == 404) {
            myStorage.remove('token');
            myStorage.remove("cellphone");
            myStorage.set('isLogin', false);
            userModel.isLogin = false;
        };
    };
    function createParam(data) {
        let params = '';
        if (data && Utils.dataType(data) == "object") {
            for (let key in data) {
                data[key] && (params += `/${data[key]}`);
            }
            return params;
        }
    };
    return (opts, data) => {
        let Public = {
            //公共参数
            token: myStorage.get("token") || "",
            method:opts.url,
        };
        
        !myStorage.get('token') && delete Public.token;
        let postData = Object.assign(Public, data);
        console.log('------加密前传送的参数-----',postData);
        
        // let cipherText = Utils.encode(JSON.stringify(postData));
        let cipherText=JSON.stringify(postData);
        // console.log(cipherText);
        let httpDefaultOpts = {
            //http默认配置
            method: opts.method ? opts.method : "post",
            baseURL: baseURL,
            url: opts.reqUrl,
            timeout: 60000,
            params: {param:cipherText},
            data: qs.stringify({param:cipherText}),
            headers:
                opts.method == "get"
                    ? {
                        "X-Requested-With": "XMLHttpRequest",
                        Accept: "application/json",
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                    : {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
        };
        if (opts.method == "get") {
            delete httpDefaultOpts.data;
        } else {
            delete httpDefaultOpts.params;
        }
        if (data && data.showLoading) {
            httpDefaultOpts.showLoading = data.showLoading;
        } else {
            httpDefaultOpts.showLoading = false;
        }
        let promise = new Promise(function (resolve, reject) {
            axios(httpDefaultOpts)
                .then(res => {
                    successState(res);
                    resolve(res);
                })
                .catch(response => {
                    errorState(response);
                    reject(response);
                });
        });
        return promise;
    }
}());
export default ajaxRequest
