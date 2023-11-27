// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()

import 'url-search-params-polyfill'
import Vue from 'vue'

import i18n from './i18n'

import App from './App'
import router from './router'
import VueCountryIntl from 'vue-country-intl';
// 引入css
import 'vue-country-intl/lib/vue-country-intl.css'
// 全局注册组件
Vue.component(VueCountryIntl.name, VueCountryIntl);
Vue.config.productionTip = false

import less from 'less'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
import '../static/ico/iconfont.js'//引入阿里云开发者图标
import '../static/ico/iconfont.css'//引入阿里云开发者图标
// import '../static/ico/element-ui.css'//引入阿里云开发者图标

//import '../static/ztcss/ztcss.css'//引入第三方字体
import '../static/zmzit/zmcss.css'//引入第三方字体




import './js/jquery-3.2.1.min.js'

var momentTimezone = require('moment-timezone');
Vue.use(less)

Vue.use(ElementUI)

Vue.prototype.getTimezone4K = function(){
  var curlang = i18n.locale;
  if(curlang=="en"){
    return "America/Los_Angeles";
  }
  if(curlang=="jp"){
    return "Asia/Tokyo";
  }
  if(curlang=="ko"){
    return "Asia/Seoul";
  }
  if(curlang=="fay"){ //德国
    return "Europe/Berlin";
  }
  if(curlang=="fr_FR"){
    return "Europe/Paris";
  }
  if(curlang=="it_IT"){
    return "Europe/Rome";
  }
  if(curlang=="es_ES"){
    return "Europe/Madrid";
  }
  if(curlang=="tc"){
    return "Asia/Hong_Kong";
  }
  if(curlang=="vn_VN"){
    return "Asia/Ho_Chi_Minh";
  }
  if(curlang=="zh"){
    return "Asia/Shanghai";
  }
  return curlang;
};
// Vue.prototype.getLang4K = function(){
//   var curlang = i18n.locale;;
//   if(curlang=="en_US"){
//     return "en";
//   }
//   if(curlang=="ja_JP"){
//     return "ja";
//   }
//   if(curlang=="ko_KR"){
//     return "ko";
//   }
//   if(curlang=="de_DE"){
//     return "de_DE";
//   }
//   if(curlang=="fr_FR"){
//     return "fr";
//   }
//   if(curlang=="it_IT"){
//     return "it";
//   }
//   if(curlang=="es_ES"){
//     return "es";
//   }
//   if(curlang=="zh_HK"){
//     return "zh_TW";
//   }
//   if(curlang=="zh_CN"){
//     return "zh";
//   }
//   return curlang;
// };

// Vue.prototype.timeFormat=function(tick) {
//   return momentTimezone(tick).tz(this.getTimezone4K()).format("HH:mm:ss");
// };
// Vue.prototype.dateFormat=function(tick) {
//   return momentTimezone(tick).tz(this.getTimezone4K()).format("YYYY-MM-DD HH:mm:ss");
// };
 Vue.prototype.dateFormatHM=function(tick) {
   return momentTimezone(tick).tz(this.getTimezone4K()).format("YYYY-MM-DD HH:mm:ss");
 };
// Vue.prototype.dateFormatFromString=function(tick){
// var timestamp = momentTimezone(tick).tz('Asia/Shanghai').valueOf();
// return momentTimezone(timestamp).tz(this.getTimezone4K()).format("YYYY-MM-DD HH:mm:ss");
// };
/* eslint-disable no-new */

import VueBus from 'vue-bus';
Vue.use(VueBus);
import JwChat from 'jwchat';

/* 在 0.2.041 之前的版本需要引入 css */
// import 'jwchat/lib/JwChat.css';
Vue.use(JwChat)
import "./style/theme/day.css"
import "./style/theme/night.css"


// ********** socket **********
// import { socketClient } from "./config/socketClient";
// // 初始化 socket
// const ws_wyf_url = "ws://xxx.xxx.xxx.xxx:8080/conn?u=123ad";
// const wsAuto = {
//   appId: "xxxx",
//   appSecret: "xxxxxxx"
// };
// const wsocket = new socketClient(ws_wyf_url, wsAuto);
// wsocket.initWebSocket();
// Vue.prototype.$ws = wsocket;


new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
