<template>
    <div class="terminal">
        <div>
            <el-dropdown>
                <div class="el-dropdown-link">
                    <img src="../assets/android.png" alt="" />
                    <p class="ppip">Android</p>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <div class="ppipp" id="qrcode"></div>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div>
            <el-dropdown>
                <div class="el-dropdown-link">
                    <img src="../assets/ios.png" alt="" />
                    <p class="ppip">IOS</p>
                </div>
                <el-dropdown-menu slot="dropdown" size="small">
                    <div class="ppipp" id="iosQrcode"></div>
                </el-dropdown-menu>
            </el-dropdown>
        </div>


    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import appDown from '@/config/appDown'
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.qrcodeFun();
    },
    methods:{
        async qrcodeFun(){//获取下载app的地址
            var that = this;
            // appDown(function(res){
                new QRCode('qrcode', {
                    width: 150,  
                    height: 150,
                    text:'https://app.mobile.bico-global.com/download.html'
                })

                new QRCode('iosQrcode', {
                    width: 150,  
                    height: 150,
                    left: 2000,
                    text:'https://app.mobile.bico-global.com/download.html'
                })
            // });
        },
    }
}
</script>
<style lang="less">
.terminal{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    width: 260px;
    margin: 0px auto 0 auto;
}



</style>