<template>
	<div class="invite_div">
		<div class="invite_box">
            <p>{{$t('user.address')}}</p>
            <div id="qrcode"></div>
            <div class="lastTxt">
                <span>{{$t('user.myCode')}} {{invite}}</span>
                <i class="el-icon-document-copy" @click="handleCopy(invite,$event)"></i>
            </div>
        </div>
	</div>
</template>

<script>
import QRCode from 'qrcodejs2' 
import clip from '@/config/clipboard'
import userInform from '@/config/userInform'
export default {
    data(){
        return{
            invite:'',
        }
    },
    mounted(){
        this.qrcodeFun();
    },
    methods:{
        qrcodeFun(){
            var that = this;
            userInform(function(res){
                that.invite = res.inviteCode;
                var qrcode = new QRCode('qrcode', {
                    width: 220,  
                    height: 220,
                    text: res.inviteLink
                })
            })
        },
        handleCopy(text,$event){//复制代码
    		clip(text,event);
    	},
    },
    components:{
    }
}
</script>

<style lang="less">
.invite_div{
	background-color: #f8f8f8;
	border-radius: 4px;
    padding: 20px;
    .invite_box{
        width: 220px;
        text-align: center;
        margin: 0 auto;
        #qrcode{
            margin: 30px 0;
        }
    }
    .el-icon-document-copy{
        color: #999999;
        cursor: pointer;
    }
}
</style>