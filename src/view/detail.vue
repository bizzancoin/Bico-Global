<template>
    <div class="legal_etr">
    <div style="height:245px;">
    </div>
    <div class="legal_eccr">  
    </div>
    <div class="legal_ecccui">
        <span style="font-size: 28px;color: #FFF;">Service<span style="font-size: 28px;color: #ff9800;"> Centre</span></span>
    </div>
    <div class="detail_div">
        <div class="container">
           <h2 class="detail_divcv">{{title}}</h2>
           <div class="content" v-html="content"></div>
          <div style="text-align: right"></div>
        </div>
    </div>

    <div class="detail_dicom">
    </div>
    <Foot />
</div>
</template>
<script>
import Foot from '@/components/Foot'
export default {
    data(){
        return{
            title:'',
            content:'',
          timed:''
        }
    },
    created(){
        var that = this;
        var getContent = JSON.parse(sessionStorage.getItem('detailTxt'));
        that.title = getContent.title;
        that.content = getContent.content;
        that.timed = getContent.createTime
    },
    components:{
        Foot,
    }
}
</script>
<style lang="less">
.detail_div{
    .content{
        
        padding: 20px 0;
        line-height: 30px;
        img{
            max-width: 100%;
        }
    }
}

</style>
