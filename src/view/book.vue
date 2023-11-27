<template>
    <div class="book_div">
        <!-- 白皮书 -->
        <div class="container">
			<h2 class="article_title">{{$t('nav.book')}}</h2>
			<div class="content" v-html="content"></div>
        </div>
        <Foot />
    </div>
</template>
<script>
import Foot from '@/components/Foot'
import { booksApi } from '@/api/getData'
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
            var res = await booksApi();
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
.book_div{
    .container{
        .article_title{
            line-height:55px;
            font-weight: inherit;
            font-size: 28px;
        }
    }
	.content{
        padding: 40px 0;
        border-top: 1px solid #3B3B3B;
		color: #393939;
		img{
			max-width: 100%;
		}
	}
	
}
</style>