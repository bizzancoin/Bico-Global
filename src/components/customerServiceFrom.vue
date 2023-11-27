
<template>
  <div class="container">
    <div class="main" style="margin: 0 !important">
      <div class="box">
        <div style="display:none">

          <el-upload
            :action="baseUrl+'/upload/img'"
            list-type="picture-card"
            :file-list="fileList"
            :on-success="upSuccessFun"
            :limit="1"
            accept="image/png, image/jpeg"
          >
            <el-button size="small" ref="upload" id="btn_file" type="primary">{{ $t("bico.W308") }}</el-button>
          </el-upload>
        </div>
        <!--<div style="visibility:hidden;">-->
        <!--<input type="file" id="btn_file" @change="uploadImg" accept=".bmp,.jpg,.jpeg,.png,.gif,.pdf,.doc,.zip,.rar,.gz,.mp4,.wav,.avi,.mp3,.BMP,.JPG,.JPEG,.PNG,.GIF,.PDF,.DOC,.ZIP,.RAR,.GZ,.MP4,.WAV,.AVI,.MP3">-->
      <!--</div>-->
        <JwChat width="370px" :taleList="list" @enter="bindEnter" @clickTalk="talkEvent" v-model="inputMsg"
                :toolConfig="tool" :quickList="quickList" :scrollType="'scroll'">
          <!--<template slot="tools">-->
          <!--<div style="width:20rem;text-align:right;" @click="toolEvent('自定义')">-->
          <!--<b slot="tools">插槽</b>-->
          <!--<JwChat-icon type="icon-lishi" title="自定义"/>-->
          <!--</div>-->
          <!--</template>-->
        </JwChat>

      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import { wsBaseUrl,imgBaseUrl,baseUrl  } from '../config/env'
  import { socketClient } from "../config/socketClient";
  import codeStatus from "@/config/codeStatus";
  import { chatListApi,checkChatPwdApi,fileUploadApi} from "@/api/getData";
  export default {
    name: 'customerServiceFrom',
    components: {},
    computed: {},
    data () {
      return {
        baseUrl:baseUrl,
        token:sessionStorage.getItem('userToken'),
        wsocket:null,
        fileList:[],
        inputMsg: '',
        fileMsg:'',
        list: [],
        password:'',
        tool: {
          // 现在只配置了 ["file", "video", "img", "hongbao", "more", "history"]
          // show: ['file', 'img', ['文件1', '', '美图']],// 二级数组中放自定义名称
          show: ['img', ['文件1', '', '美图']],// 二级数组中放自定义名称
          showEmoji: true, // 是否显示表情图标
          /**
           * @description: 点击按钮的回调函数
           * @param {*} type 当前点击的按钮
           * @param {*} plyload 附加文件或者需要处理的数据
           * @return {*}
           */
          callback: this.toolEvent,
        },

        askStr:'/ask/',
        quickList: [

        ]
      }
    },
    methods: {


      intoInfo(){
        var that =this
        if (typeof WebSocket === "undefined") {
          that.$message.error("您的浏览器不支持socket");
          return false
        }
        //获取历史记录
        this.chatList()
      },
      async chatList(){
        var that =this
        var res = await chatListApi();

          if(res.code == 200){
            //获取信息历史记录
            var data = res.data;
            for (var i=0;i< data.length;i++) {
              var item = data[i];
              data[i].img = imgBaseUrl+item.img
              if(item.contentType==2){//语音
                var voiceData = JSON.parse(item.text.text)
                item.text.text = "<audio data-src='"+imgBaseUrl+voiceData.content+"'/>"
              }
            }
            this.list = data
            //sokect链接
            this.socektSer()
            return true
          }else{
            codeStatus(res.code,function(res){
              that.$message.error(res);
            })
            return false
          }
      },
      socektSer(){
        //sokect链接
        console.log("增加sokect链接",this.token)
        // 初始化 socket
        if(socketClient.websocket==null || socketClient.websocket==undefined){
          const ws_wyf_url = wsBaseUrl+this.askStr+this.token;//链接地址
          const wsAuto = '';//参数
          // const wsAuto = {password:password};//参数
          socketClient.websocket = new socketClient(ws_wyf_url, wsAuto);
        }else{
          console.log("刷新页面")
        }
        socketClient.websocket.initWebSocket();
        socketClient.websocket.wsMessage(this.callReturn)


      },
      callReturn(res){
        var that=this
        if(res.code==200){
          var data = res.data
          data.img = imgBaseUrl+data.img
          if(data.contentType==2){//语音
            var voiceData = JSON.parse(data.text.text)
            data.text.text = "<audio data-src='"+imgBaseUrl+voiceData.content+"'/>"
          }
          console.log("返回数据",data)
          this.list.push(data)
        }else{
          codeStatus(res.code,function(res){
            that.$message.error(res);
          })
        }

      },

      bindEnter (e,isFile=false) {
        console.log(e)
        //socketClient.websocket.wsSend(wsAuto);
        var msg=null
        var contentType=3
        if(isFile){
          msg = this.fileMsg
        }else{
          msg = this.inputMsg
          contentType=1
        }

        if (!msg) return;
        const msgObj = {
          // "date": "2020/05/20 23:19:07",
          "text": { "text": msg },
          // "mine": true,
          // "name": "JwChat",
          // "img": "@/assets/chat_logo.png",
          "contentType":contentType
        }

        if(socketClient.websocket==null || socketClient.websocket==undefined){
          const ws_wyf_url = wsBaseUrl+this.askStr+this.token;//链接地址
          const wsAuto = '';//参数
          // const wsAuto = {password:password};//参数
          socketClient.websocket = new socketClient(ws_wyf_url, wsAuto);
          socketClient.websocket.initWebSocket();
          socketClient.websocket.wsMessage(this.callReturn)
        }
        socketClient.websocket.wsSend(msgObj);
        if(isFile){
         this.fileMsg =''
          this.fileList=[]
        }
        //this.list.push(msgObj)
      },
      toolEvent (type, obj) {
        var that=this
        console.log('tools', type, obj)
        if(type=='img'){
          $('#btn_file').click();
        }

        if(type=='file'){
          for (let objKey in obj) {
            socketClient.websocket.wsSend(objKey,true);
          }
        }
      },
      upSuccessFun(res){
        var that=this
        console.log("res",res)
        if(res.code==200){
          var img = res.data.src
          var title = res.data.title
          var imgStr = "<img data-src='"+imgBaseUrl+img+"' title='"+title+"'/>"
          this.fileMsg = imgStr
          this.bindEnter (null,true)
        }else{
          codeStatus(res.code,function(res){
            that.$message.error(res);
          })
        }

      },
      talkEvent (play) {
        console.log(play)
      },
    },
    mounted () {

    },

    props: {},
    destroyed() {},
  }
</script>
<style lang="less" scoped>
  .main {
    .box {
      width: 484px;
      height: auto;
      background-color: #fafafa;
      position: relative;
      padding: 10px 8px;
      border-radius: 0px 0px 4px 4px;
      #content {
        height: 380px;
        overflow-y: scroll;
        font-size: 14px;
        width: 100%;
        .circle {
          display: inline-block;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: #dddddd;
        }
        .con_text {
          color: #333;
          margin-bottom: 5px;
        }
        .con_que {
          color: #1c88ff;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
        }
        .info_r {
          position: relative;
          margin-top: 10px;
          .circle_r {
            position: absolute;
            left: 0%;
          }
          .pic_r {
            width: 17px;
            height: 17px;
            margin: 8px;
          }
          .con_r {
            display: inline-block;
            /* max-width: 253px; */
            width: 55%;
            min-height: 55px;
            /* min-height: 20px; */
            background-color: #e2e2e2;
            border-radius: 6px;
            padding: 10px;
            margin-left: 40px;
          }
          .time_r {
            margin-left: 45px;
            color: #999999;
            font-size: 12px;
          }
        }
        .info_l {
          position: relative;
          text-align: right;
          // margin-right: 20px;
          color: #ffffff;
          color: #3163c5;
          margin-top: 10px;
          .circle_l {
            position: absolute;
            right: 5px;
          }
          .time_l {
            margin-right: 45px;
            color: #999999;
            font-size: 12px;
            margin-top: 5px;
          }
          .con_l {
            display: inline-block;
            width: 220px;
            min-height: 51px;
            background-color: #3163c5;
            border-radius: 6px;
            padding: 10px;
            text-align: left;
            color: #fff;
            margin-right: 45px;
          }
        }
        #question {
          cursor: pointer;
        }
      }
    }
  }
  .setproblem {
    width: 100%;
    height: 68px;
    background-color: #ffffff;
    position: relative;
    margin-top: 3.75rem;
  }
  .setproblem textarea {
    color: #999999;
    padding: 10px;
    box-sizing: border-box;
    height: 68px;
    width: 100%;
    resize: none;
    padding-right: 80px;
    outline: none;
    border-color: #ccc;
    border-radius: 5px;
  }
  .setproblem button {
    width: 4.5rem;
    height: 2rem;
    line-height: 2rem;
    background: #3163c5;
    opacity: 1;
    border-radius: 4px;
    font-size: 10px;
    color: #ffffff;
    position: absolute;
    right: 2%;
    bottom: 8%;
    cursor: pointer;
    border: none;
  }

  .czkj-item-title {
    line-height: 25px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }

  .czkj-item-question {
    cursor: pointer;
    display: block;
    padding: 8px;
    position: relative;
    border-bottom: 1px dashed #ccc;
    line-height: 20px;
    min-height: 20px;
    overflow: hidden;
  }

  .czkj-question-msg {
    float: left;
    font-size: 14px;
    color: #3163c5;
  }
</style>
