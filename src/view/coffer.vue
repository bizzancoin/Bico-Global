<template>
	<div class="d_container">
		<div class="d_main">
			<div class="d_flex d_top">
				<div class="d_top_left">
					<div class="d_top_left_text1">{{$t('home.xbsg1')}}</div>
					<div class="d_top_left_text2">{{$t('home.xbsg2')}}</div>
					<div class="d_top_left_text3">{{$t('home.xbsg3')}}</div>
					<div class="d_top_left_text3">{{$t('home.xbsg4')}}</div>
					<div class="d_top_left_text3">{{$t('home.xbsg5')}}</div>

				</div>
				<div class="d_top_right">
					<el-carousel trigger="click">
				        <el-carousel-item>
				        	<img class="d_top_right_banner_img" src="../assets/shengou1.png">
				        </el-carousel-item>
				        <el-carousel-item>
				        	<img class="d_top_right_banner_img" src="../assets/shengou2.png">
				        </el-carousel-item>
						<el-carousel-item>
				        	<img class="d_top_right_banner_img" src="../assets/shengou3.png">
				        </el-carousel-item>
				    </el-carousel>
				</div>
			</div>
			<div class="d_tab_label_box">
			    <span :class="['d_tab_label',d_tab_label_index=='1'?'d_tab_label_active':'']" @click="d_tab_label_change('1')">{{$t('home.xbsg6')}}</span>
			    <el-divider direction="vertical"></el-divider>
			    <span :class="['d_tab_label',d_tab_label_index=='2'?'d_tab_label_active':'']" @click="d_tab_label_change('2')">{{$t('home.xbsg7')}}</span>
			    <el-divider direction="vertical"></el-divider>
			    <!--span :class="['d_tab_label',d_tab_label_index=='3'?'d_tab_label_active':'']" @click="d_tab_label_change('3')">计划列表</span-->
			</div>
			<div class="d_tab_panels">
				<coffer1 v-if="d_tab_label_index=='1'" @coffer1Into="coffer1Into"></coffer1>
				<coffer2 v-if="d_tab_label_index=='2'" :coffer2Data="coffer2Data"></coffer2>
				<!--coffer3 v-if="d_tab_label_index=='3'"></coffer3-->
			</div>
		</div>
		<div style="height:100px;"></div>
    <Foot/>
	</div>
</template>
<script>
	import coffer1 from './coffer1'
	import coffer2 from './coffer2'
	import coffer3 from './coffer3'
	import Foot from '@/components/Foot'
	export default {
		components:{
			coffer1,
			coffer2,
			coffer3,
			Foot
		},
		data(){
			return{
				d_tab_label_index:'1',
				coffer2Data:{},
			}
		},
        computed: {
            isLogin: function() {
            return sessionStorage.getItem('userToken')!=null;
            }

        },
		created(){},
		methods:{
			d_tab_label_change(index){
				this.d_tab_label_index = index;
			},
			coffer1Into(item){
				this.d_tab_label_index = '2';
				this.coffer2Data = item;
			}
		}
	}
</script>
<style scoped>
  .d_container{
  	color: #fff;
  	font-size: 14px;
  	width: 100%;
  	background: linear-gradient(180deg,#110a26,#24254c);
  }
  .d_main{
  	width: 1380px;
  	margin: 0 auto;
  }
  .d_flex{
  	display: flex;
  }
  .d_top{
  	padding: 50px 0;
  	justify-content: space-between;
  }
  .d_top_left{
  	padding-left: 0px;
  }
  .d_top_left_text1{
  	font-size: 40px;
  	padding: 30px 0 40px;
  }
  .d_top_left_text2{
  	font-size: 22px;
    padding: 0px 0 20px;
  }
  .d_top_left_text3{
  	font-size: 14px;
	padding: 0px 0 12px;
  }
  .d_top_right{
  	width: 640px;
  	height: 300px;
  	overflow: hidden;
  	border-radius: 4px;
  }
  .d_top_right_banner_img{
  	width: 100%;
  	height: 100%;
  }
  .d_tab_label_box{
  	font-size: 24px;
  	color: #999;
  }
  .d_tab_label{
  	cursor: pointer;
  }
  .d_tab_label_active{
  	color: #fff;
  }
  .d_tab_label:nth-child(1){
  	padding-right: 10px;
  }
  .d_tab_label:nth-child(3){
  	padding: 0 10px;
  }
  .d_tab_label:nth-child(5){
  	padding-left: 10px;
  }
  .d_tab_panels{
  	padding: 20px 0;
  }
</style>
