<template>
    <div class="article_div">
        <!-- 关于我们 -->
        <div class="container">
			<h2 class="article_title">{{$t('nav.about')}}</h2>
			<div class="content" v-html="content"></div>
        </div>
        <Foot />
    </div>
</template>
<script>
import Foot from '@/components/Foot'
import { aboutApi } from '@/api/getData'
export default {
    data(){
        return{
            content:''
        }
    },
    created(){
        this.prvacyFun();
    },
    methods:{
        async prvacyFun(){
            var that = this;
            var dataArr = new URLSearchParams();
            dataArr.set('type','ABOUT_US');
            var res = await aboutApi(dataArr);
			if(res.code == 200){
                that.content = res.data.content;
            }
        }
    },
    components:{
        Foot
    }
}
</script>
<style lang="less">
.article_div{
    .container{
        .article_title{
            line-height:55px;
            font-weight: inherit;
            font-size: 28px;
        }
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