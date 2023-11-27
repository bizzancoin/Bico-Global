<template>
<div class="legal_ec">
<div style="height:315px;"></div>
    <div class="legal_ecc">      
    </div>
    <div class="legal_div">
        <div class="container">

            <div class="legal_eccc">
                <!-- {{$t('nav.currency')}}  -->
                <span style="font-size: 50px;color: #FFF;">OTC Coinw<span style="font-size: 50px;color: #ffc846;"> Earn</span></span>
            </div>
            <div class="legal_ev">
                {{$t('bico.W94')}}
            </div>

            <el-menu :default-active="activeName" mode="horizontal" @select="handleSelect" background-color="#00000000" text-color="#000" router>
            
            <el-menu-item  class="app_nav" index="legalCoin">{{$t('legal.buy')}}</el-menu-item>
            <el-menu-item  class="app_nav" index="sell">{{$t('legal.sell')}}</el-menu-item>
            <el-menu-item  class="app_nav" index="acceptor">{{$t('legal.acceptor')}}</el-menu-item>
            <el-menu-item  class="app_nav" index="legalOrder">{{$t('nav.order')}}</el-menu-item>
            
            </el-menu>

            <div class="legal_content">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <Foot />
</div>
</template>
<script>
import Foot from '@/components/Foot'
export default {
    inject:['reload'],
    data(){
        return{
        }
    },
    computed: {
        activeName: function(){
            return this.$route.path.replace('/', '');
		},
    },
    components:{
        Foot
    },
}
</script>
<style lang="less">
.legal_div{
    h2{
        font-weight: initial;
        font-size: 28px;
    }
    .el-menu.el-menu--horizontal{
        border-bottom: 1px solid #3b3b3b29 !important;
    }
    .el-menu.el-menu--horizontal {
        .el-menu-item,.el-menu-item:hover{
            color: #8E8E8E!important;
            padding: 0;
            margin-right:60px;
        }
        .el-menu-item.is-active{
            position: relative;
            top: 0;
            color: @mainsColor!important;
            &::before{
                position: absolute;
                bottom: 2px;
                content: '';
                width: 40%;
                left: 26%;
                border: 1px solid @mainsColor;
                background-color: @mainsColor;
            }
        }
    }
    .legal_content{
        margin-top: 30px;
    }
    .app_nav{
        font-size: 16px;
    } 
}
</style>