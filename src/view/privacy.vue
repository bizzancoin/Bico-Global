<template>
<div class="legal_etr">
    <div style="height:245px;">
    </div>
    <div class="legal_eccr">
    </div>
    <div class="legal_ecccui">
        {{type == 1 ? $t('foot.secret') : $t('foot.agree')}}
        <span style="font-size: 28px;color: #FFF;">Service<span style="font-size: 28px;color: #ff9800;"> Centre</span></span>
    </div>


    <div class="privacy_div">
        <div class="container">
            <div class="content" v-html="content"></div>
        </div>

        <div style="height:200px;"></div>
        <Foot />
    </div>

</div>
</template>
<script>
import Foot from '@/components/Foot'
import { aboutApi } from '@/api/getData'
export default {
    data(){
        return{
            title:'',
            content:'',
            type:''
        }
    },
    computed:{
        getType(){
            var that = this;
            var type = that.$route.query.type;
            that.type = type;
            return type;
        }
    },
    watch:{
        getType(newValue){
            if(newValue){
                this.prvacyFun();
            }
        }
    },
    created(){
        this.prvacyFun();
    },
    methods:{
        async prvacyFun(){
            var that = this;
            var dataArr = new URLSearchParams();
            if(that.getType == 1){
                dataArr.set('type','SERVER_INFO');
            }else{
                dataArr.set('type','PRIMARY');
            }
          var language = this.$i18n.locale
          dataArr.set("language",language)

            var res = await aboutApi(dataArr);
			if(res.code == 200){
                that.content = res.data.content;
            }
        }
    },
    components:{
        Foot,
    }
}
</script>
<style lang="less">

.day .privacy_div{


h2{
      font-weight: initial;
      font-size: 28px;
  }

}



</style>
