<template>
<div class="legal_etr">
    <div style="height:245px;">
    </div>
    <div class="legal_eccr">
    </div>
    <div class="legal_ecccui">
        {{$t('tip.use')}}
        <span style="font-size: 28px;color: #FFF;">Service<span style="font-size: 28px;color: #ff9800;"> Centre</span></span>
    </div>
    <div class="agreement_div">
        <div class="container">
            <div class="content" v-html="content">
            </div>
        </div>
        <div style="height:245px;"></div>
        <Foot />
    </div>
</div>
</template>
<script>
import Foot from '@/components/Foot'
import { agreementApi } from '@/api/getData'
export default {
    data(){
        return{
            content:''
        }
    },
    created(){
        this.agreeFun();
    },
    methods:{
        async agreeFun(){
            var that = this;
          var dataArr = new URLSearchParams();
          var language = this.$i18n.locale
          dataArr.set("language",language)
          dataArr.set('status','HOME');
            var res = await agreementApi(dataArr);
			if(res.code == 200){
                that.content = res.data;
            }
        }
    },
    components:{
        Foot,
    }
}
</script>
<style lang="less">
.agreement_div{
    h2{
        font-size: 28px;
        font-weight: initial;
    }
    .content{
        border-top: 1px solid #3B3B3B;
        color: #393939;
        img{
            max-width: 100%;
        }
    }
}
</style>
