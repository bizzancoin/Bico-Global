let Base64 = require('js-base64').Base64
export default {
    getURLParams:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    getURLParams2:function(name,href) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        window.location.href=href
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    getURLBase64Params:function(name){
          
          let path = window.location.href.split("?") //分割url
          if(path==undefined ||path.length==1){
            return null
          }
      　　let href = path[0]+"?"+path[1]
      　　let query = Base64.decode(path[1])  //解码
      　　href = path[0]+"?"+ query //解码后重组
      　　return this.getURLParams2(name,href)
    }
}
