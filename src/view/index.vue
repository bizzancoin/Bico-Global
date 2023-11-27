<template>
    <div class="allContent">
        <!-- 回到顶部 -->
        <el-backtop style="right: 30px;bottom: 22px;">
            <div style="{width: 100%;text-align: center;color: #FF9800;font-size: 12px;}">
                <img src="../assets/dingbu.png" style="height: 30px;border-radius: 10%;position: absolute;top: 14px;left: 14px;"/>
            </div>
        </el-backtop>

        <!-- 头部内容 -->
        <HeaderBox @flyingValue="flyingValue" />	

        <!-- 内容 -->
        <!-- <div style="height:60px;"></div> -->

        <div class="content_div">
			<router-view></router-view>
		</div>

    </div>
</template>
<script>
import HeaderBox from '@/components/Head'
export default {
    name:'index',
    data(){
        return{
            getCoinType:''
        }
    },
    components:{
        HeaderBox
    },
    methods:{
        flyingValue(item){
            this.getCoinType = item;
        }
    }
}
</script>
<style lang="less">
.content_div{
    position: absolute;
    min-width: 100%;
    left: 0;
    top: 48px;
    position: relative;
}
.el-icon-caret-top{
    color: @mainsColor;
}
</style>
