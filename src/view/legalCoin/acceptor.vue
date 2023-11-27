<template>
    <div class="acceptor_div">
            <!-- status:0 1 5可挂单 3展示订单 -->
        <div v-if="status == 0 || status == 1 || status == 3 || status == 5">
            <el-tabs class="transtionBar cruntpage" v-model="activeIndex" @tab-click="handleIndex">
                <el-tab-pane :label="$t('legal.listBuy')"></el-tab-pane>
                <el-tab-pane :label="$t('legal.listSell')"></el-tab-pane>
                <el-tab-pane :label="$t('contract.bond')"></el-tab-pane>
            </el-tabs>

        
            <Buy :activeIndex="Number(activeIndex)+1" v-if="activeIndex != '2'"  />

            <LegalBone v-if="activeIndex == '2'" />
        </div>

        

        <div v-if="status == 4 || status == 6 || status == 7 || status == 2">
            <div v-if="haveAppeal == 'Y'">
                <el-tabs class="transtionBar cruntpage" v-model="activeIndex" @tab-click="handleIndex">
                    <el-tab-pane :label="$t('legal.listBuy')"></el-tab-pane>
                    <el-tab-pane :label="$t('legal.listSell')"></el-tab-pane>
                    <el-tab-pane :label="$t('contract.bond')"></el-tab-pane>
                </el-tabs>
                <Buy :activeIndex="Number(activeIndex)+1" v-if="activeIndex != '2'"  />
                <LegalBone v-if="activeIndex == '2'" />
            </div>
            <div v-else>
                <LegalBone  />
            </div>
        </div>
        <div style="height:100px;"></div>
    </div>
</template>
<script>
import Buy from '@/components/Buy'
import LegalBone  from '@/components/LegalBone'
import { legalMgrPageApi } from '@/api/legalData'
export default {
    data(){
        return{
            activeIndex:0,
            status:-1,
            available:'',
            price:0,
            repair:0,
            number:0,
            haveAppeal:''
        }
    },
    created(){
        this.statusFun();
    },
    methods:{
        handleIndex(){

        },
        async statusFun(){
            var that = this;
            var res = await legalMgrPageApi();
            if(res.success){
                var data = res.data;
                that.status = Number(data.deposit);
                that.price = data.USDT;
                that.available = (data.usedPrice).toFixed(2);
                that.number = data.number;
                that.haveAppeal = data.haveAppeal;
                if(Number(data.deposit) == 0){
                    that.repair = data.USDT - data.number;
                }
            }
        },
    },
    components:{
        Buy,
        LegalBone
    }
}
</script>
<style lang="less">
.acceptor_div{
    min-height: 480px;
    .cruntpage {
        .el-tabs__nav-scroll{
            display: flex;
        }
        .el-tabs__nav{
            overflow: hidden;
            margin: 0 auto;
            border-radius: 30px;
        }
        .el-tabs__item.is-top{
            position: relative;
            top: 0;
            width:160px;
            height: 45px!important;
            line-height: 45px!important;
            text-align: center;
            &::before{
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right:0;
                z-index: -1;
                background-color: #0066ed0d;
            }
            &:nth-child(2){
                &::before{
                    transform-origin: 100% 0;
                    transform:skew(-22deg);
                    -webkit-transform: skew(-22deg);
                    -moz-transform: skew(-22deg);
                    -ms-transform: skew(-22deg);
                }
            }
            &:nth-child(3){
                &::before{
                    transform: skew(-22deg);
                    -webkit-transform: skew(-22deg);
                    -moz-transform: skew(-22deg);
                    -ms-transform: skew(-22deg);
                }
            }
            &:nth-child(4){
                &::before{
                    transform-origin:  0 100%;
                    transform:skewX(-22deg);
                    -webkit-transform: skewX(-22deg);
                    -moz-transform: skewX(-22deg);
                    -ms-transform: skewX(-22deg);
                }
            }
        }
        .el-tabs__item.is-active{
            color: #ffffff!important;
            &::before{
                background-color: @mainsColor!important;
            }
        }
    }
}
</style>