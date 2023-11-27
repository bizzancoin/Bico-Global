<template>
	<div class="d_c1_container">
		<div class="d_c1_card_box">
			<div class="d_flex d_c1_card_box_top" >
				<div class="d_cl_card" v-for="(item,index) in list1" :key="item.id">

					<div class="d_c1_card_tag d_c1_card_tag1">
						<div class="d_c1_card_tag_text d_text_bold">{{item.currency}}</div>
					</div>

					<div class="d_flex d_c1_card_top">
						<div class="">
							<div class="d_c1_card_top_title">{{item.title}}</div>

							<div class="uipwi">{{$t('home.xbsg9')}}： {{item.oddsWinning}} %</div><div></div>
							<div class="uipwi">{{$t('home.xbsg8')}} {{item.issuanceCount}}</div><div></div>
							<div class="uipwi">{{$t('home.xbsg10')}}： {{item.minPrice}} <span class="c1_card_center_desc">{{item.currency}}</span></div><div></div>
                            <div class="uipwi">{{$t('home.xbsg11')}}： {{timedownList[index]}}</div><div></div>
						</div>
						<div class="d_c1_card_bottommk">
						    <img class="d_c1_card_top_img" :src="item.img">
					    </div>
					</div>

                    <div style="height:30px;"></div>
					<div class="d_c1_card_bottom">
						<button class="d_c1_card_bottom_btn" @click="d_tab_label_change(item)">{{$t('home.xbsg12')}}</button>
					</div>

				</div>
			</div>
			<div class="d_flex d_c1_card_box_bottom">
				<el-pagination layout="prev, pager, next" :total="total1" :page-size="pageSize" :current-page="currentPage1" @current-change="handleSizeChange1"></el-pagination>
			</div>
		</div>
		<div class="d_c1_adv">
			<!-- <a href="">
				<img src="https://b.csscoe.com/new-pos/banner_b2c_cn.png">
			</a> -->
		</div>
		<div class="d_c1_card_box1">
			<div class="d_flex d_c1_card_box1_title_box">
				<div class="d_c1_card_box1_title">{{$t('home.xbsg13')}}</div>
				<!-- <div class="d_c1_card_box1_more">查看更多 <i class="el-icon-arrow-right"></i></div> -->
			</div>
			<div class="d_c1_card_box">
				<div class="d_flex d_c1_card_box_top" >
					<div class="d_cl_card" v-for="(item,index) in list2" :key="item.id">

						<div class="d_c1_card_tag d_c1_card_tag33">
						  <div class="d_c1_card_tag_text d_text_bold">{{$t('home.xbsg13')}}</div>
					    </div>

							<div class="d_flex d_c1_card_top">
								<div class="">
									<div class="d_c1_card_top_title">{{item.instrument}}</div>
									<div class="uipwi">{{$t('home.xbsg15')}}： {{item.sum}} {{item.managementCurrency}}</div><div></div>
									<div class="uipwi">{{$t('home.xbsg14')}}： {{item.earningsSum}} {{item.managementCurrency}}</div><div></div>
									<div class="uipwi">{{$t('home.xbsg16')}}： {{item.createtime}}</div><div></div>
								</div>
								<div class="d_c1_card_bottommk">
									<img class="d_c1_card_top_img" :src="item.img">
								</div>
							</div>

						<div style="height:30px;"></div>
						<div class="d_c1_card_bottom">
							<button :class="['d_c1_card_bottom_btn22',index==0?'d_active_over':'']">{{item.status==1?'募集结束':'进行中'}}</button>
						</div>
					</div>
				</div>
				<div class="d_flex d_c1_card_box_bottom">
					<el-pagination layout="prev, pager, next" :total="total2" :page-size="pageSize" :current-page="currentPage2" @current-change="handleSizeChange2"></el-pagination>
				</div>
			</div>
		</div>
		<div class="d_c1_kc_box" v-if="list3.length>0">
			<div class="d_c1_kc_title">{{$t('home.xbsg17')}}</div>
			<div class="d_flex d_c1_kcings">
				<div class="d_cl_card" v-for="(item,index) in list3" :key="item.id">
                        <div class="d_c1_card_tag d_c1_card_tag333">
						  <div class="d_c1_card_tag_text d_text_bold">{{$t('home.xbsg23')}}</div>
					    </div>

							<div class="d_flex d_c1_card_top">
								<div class="">
									<div class="d_c1_card_top_title">{{item.instrument}}</div>

									<div class="uipwi">{{$t('home.xbsg20')}}： {{item.sum}}</div><div></div>

									<div class="uipwi">{{$t('home.xbsg19')}}： {{item.earningsSum}} </div><div></div>

									<div class="uipwi">{{$t('home.xbsg21')}}： {{item.updatetime}}</div><div></div>

									<div class="uipwi">{{$t('home.xbsg22')}}： {{item.createtime}}</div><div></div>
								</div>
								<div class="d_c1_card_bottommk">
									<img class="d_c1_card_top_img" :src="item.img">
								</div>
							</div>
						<div style="height:30px;"></div>
						<div class="d_c1_card_bottom">
							<button :class="['d_c1_card_bottom_btn222',index==0?'d_active_over':'']">{{$t('home.xbsg23')}}</button>
						</div>
				</div>
        <div class="d_flex d_c1_card_box_bottom">
          <el-pagination layout="prev, pager, next" :total="total3" :page-size="pageSize" :current-page="currentPage3" @current-change="handleSizeChange3"></el-pagination>
        </div>
			</div>
		</div>
	</div>
</template>
<script>
import logosArr from '@/logoSrc/index.js'
import { teManagementListApi,getMyLogList0Api,getMyLogList1Api } from '@/api/getData'
	export default{
		data(){
			return{
				currentPage1:1,
        currentPage2:1,
        currentPage3:1,
				pageSize:3,
				params1:{},
				list1:[],
				total1:10,
				params2:{},
				list2:[],
				total2:10,
				index:0,
				list3: [],
				total3:0,
				//倒计时列表i哦
				timedownList:[]

			}
		},
		created(){
			this.init();

		},
		computed: {
            isLogin: function() {
            	return sessionStorage.getItem('userToken')!=null;
            }

        },
		methods:{
			init() {
				//if(this.isLogin){
					this.getTeManagementList()
					this.getMyLogList()
				// }else{

				// }

			},
			//获取下单记录
			async getMyLogList(){
				var dataArr = new URLSearchParams();
				dataArr.set('current',this.currentPage2);
				dataArr.set('size',this.pageSize);
				//进行中的
				var res = await getMyLogList0Api(dataArr);
				if(res.success){
					this.list2 = res.data.records
					this.total2 = Number(res.data.pages)
				}
				//已结束的
				var resp = await getMyLogList1Api();
				if(resp.success){
          this.list3 = res.data.records
          this.total3 = Number(res.data.pages)

				}
			},
			//获取下单币种
			async getTeManagementList(){
				 var dataArr = new URLSearchParams();
				 dataArr.set('current',this.currentPage1);
				 dataArr.set('size',this.pageSize);
				var res = await teManagementListApi(dataArr);
				if(res.success){
					this.list1 = res.data.records

					//.records
					this.total1=Number(res.data.pages)
					this.countTime();
				}
			},
			countTime() {
            //获取当前时间
			var that = this;
			for(var i=0;i<that.list1.length;i++){
				var data =that.list1[i]
				var date = new Date();
				var now = date.getTime();
				//设置截止时间
				//var str="2019/1/1 00:00:00";
				var endDate = new Date(data.endTime);
				var end = endDate.getTime();

				//时间差
				var leftTime = end-now;
				//定义变量 d,h,m,s保存倒计时的时间
				var d,h,m,s;
				if (leftTime>=0) {
					d = Math.floor(leftTime/1000/60/60/24);
					h = Math.floor(leftTime/1000/60/60%24);
					m = Math.floor(leftTime/1000/60%60);
					s = Math.floor(leftTime/1000%60);
				}
				//将倒计时赋值到div中
				this.timedownList[i] =  d+"天"+h+"时"+m+"分"+s+"秒"
				//console.log(data.countdown)
			}
            //递归每秒调用countTime方法，显示动态时间效果
            setTimeout(this.countTime,1000);

        	},
			async handleSizeChange1(v){
				console.log(v)
				console.log(`当前页: ${v}`);
				var dataArr = new URLSearchParams();
				 dataArr.set('current',v);
				 dataArr.set('size',this.pageSize);
				var res = await teManagementListApi(dataArr);
				if(res.success){
					this.list1 = res.data.records

					//.records
					this.total1=Number(res.data.pages)
					this.countTime();
				}

			},
			async handleSizeChange2(v){
				console.log(v)
				var dataArr = new URLSearchParams();
				dataArr.set('current',v);
				dataArr.set('size',this.pageSize);
				var res = await getMyLogList0Api(dataArr);
				if(res.success){
					this.list2 = res.data.records
					this.total2 = Number(res.data.pages)
				}
			},
      async handleSizeChange3(v){
        var dataArr = new URLSearchParams();
        dataArr.set('current',v);
        dataArr.set('size',this.pageSize);
        var res = await getMyLogList1Api(dataArr);
        if(res.success){
          this.list3 = res.data.records
          this.total3 = Number(res.data.pages)
        }
      },
			d_tab_label_change(item){
				this.$emit('coffer1Into',item)
			}
		}
	}
</script>
<style scoped>
	.d_c1_container{
		color: #fff;
	  	font-size: 14px;
	  	width: 100%;
	}
	.d_flex{
		display: flex;
	}
	.d_text_left{
		text-align: left;
	}
	.d_text_center{
		text-align: center;
	}
	.d_text_bold{
		font-weight: bold;
	}
	.d_text_right{
		text-align: right;
	}
	.d_c1_card_box{
		padding: 40px 24px 18px;
		background: linear-gradient(135deg,rgb(36, 37, 76),rgb(33, 34, 69));
    	border-radius: 5px 5px 4px 4px;
	}
	.d_c1_card_box_top{
		justify-content: space-between;
	}
	.d_cl_card{

		padding: 34px 24px;
		position: relative;
		border-radius: 4px;
		width: 380px;
		background-color: #130c29;
		cursor: pointer;
	}
	.d_c1_card_tag{
		position: absolute;
		left: 0;
		top: 0;
		width: 54px;
		height: 54px;
	}
	.d_c1_card_tag1{
		border-top-left-radius: 4px;
		background: linear-gradient(-45deg,transparent 50%,#23ab28 0);
	}
	.d_c1_card_tag33{
		border-top-left-radius: 4px;
		background: linear-gradient(-45deg,transparent 50%,#6727da 0);
	}

	.d_c1_card_tag333{
		border-top-left-radius: 4px;
		background: linear-gradient(-45deg,transparent 50%,#FF5722 0);
	}
	.d_c1_card_tag2{
		left: -4px;
		top: -4px;
		background-image: url('https://b.csscoe.com/new-pos/purple_tag.png');
		background-size: 100% 100%;
	}
	.d_c1_card_tag3{
		left: -4px;
		top: -4px;
		background-image: url('https://b.csscoe.com/new-pos/hot_tag.png');
		background-size: 100% 100%;
	}

	.d_c1_card_tag_text{
		transform: rotate(-45deg) translate(-7px,4px);
	}
	.d_c1_card_tag_text1{
		font-size: 12px;
		transform: rotate(-45deg) translate(0px,3px);
	}
	.d_c1_card_top{
		justify-content: space-between;
		align-items: center;
	}
	.d_c1_card_top1{
		padding: 10px 0;
	}
	.d_c1_card_top_title{
		color: #f0f2f5;
    	font-size: 16px;
		padding: 14px 0px;
	}
	.d_c1_card_top_symbol{
		padding-top: 4px;
		font-size: 10px;
    	color: #637282;
	}
	.d_c1_card_top_img{
		width: 40px;

	}
	.d_c1_card_center{
		justify-content: space-between;
		padding: 34px 0 40px;
	}
	.c1_card_center_rate{
		color: #f0f2f5;
	}
	.c1_card_center_rate_span1{
		color: #f5a624;
	    font-size: 15px;
	    font-weight: bold;
	}
	.c1_card_center_rate_span2{
		padding-left: 4px;
		font-size: 11px;
		opacity: .5;
	}
	.c1_card_center_desc{
		margin-top: 3px;
	    color: #637282;
	    font-size: 13px;
	}
	.d_c1_card_bottom_btn{
		border:none;
		outline: none;
		cursor: pointer;
		font-size: 14px;
		color: #fff;
		width: 100%;
		height: 46px;
		background: #1e3bdc;
    	border-color: #6039de;
    	box-shadow: inset 0 1px 0 hsla(0,0%,100%,.15), 0 1px 1px rgba(0,0,0,.07);
        border: 1px solid transparent;
        border-radius: .25rem;
    	transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
	}

    .d_c1_card_bottom_btn22{
		border:none;
		outline: none;
		cursor: pointer;
		font-size: 14px;
		color: #fff;
		width: 100%;
		height: 46px;
		background: #6727da;
    	border-color: #6039de;
    	box-shadow: inset 0 1px 0 hsla(0,0%,100%,.15), 0 1px 1px rgba(0,0,0,.07);
        border: 1px solid transparent;
        border-radius: .25rem;
    	transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
	}
	.d_c1_card_bottom_btn222{
		border:none;
		outline: none;
		cursor: pointer;
		font-size: 14px;
		color: #fff;
		width: 100%;
		height: 46px;
		background: #1f1833;
    	border-color: #6039de;

	}
	.d_c1_card_bottom_btn:hover{
		background: #3451f5;
	}
	.d_c1_card_box_bottom{
		padding-top: 18px;
		justify-content: flex-end;
	}
	.el-pagination{
		background: transparent;
		opacity: .8;
	}
	.d_c1_card_box_bottom{
		color: #b8aeff
	}
	.d_c1_card_box_bottom>>>.el-pagination .btn-next,.d_c1_card_box_bottom>>>.el-pagination .btn-prev{
		background-color: transparent;
		color: #fff;
	}
	.d_c1_card_box_bottom>>>.el-pager li{
		background-color: transparent;
	}
	.d_c1_adv{
		margin: 24px 0 70px;
		border-radius: 4px;
		overflow: hidden;
	}
	.d_c1_adv img{
		width: 100%;
		height: 125px;
		border-radius: 4px;
	}
	.d_c1_card_box1_title_box{
		justify-content: space-between;
		align-items: center;
		padding:0 0 16px 0;
	}
	.d_c1_card_box1_title{
		font-size: 24px;
	}
	.d_c1_card_box1_more{
		font-size: 18px;
		color: #b8aeff;
		cursor: pointer;
	}
	.d_c1_kc_box{
		margin-top: 60px;
		padding: 40px 24px 18px;
		background: linear-gradient(135deg,rgb(36, 37, 76),rgb(33, 34, 69));
		border-radius: 5px 5px 4px 4px;
	}
	.d_c1_kc_title{
		font-size: 24px;
		padding-bottom: 20px;
	}
	.d_c1_kcings{
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.d_c1_kc_item{
		position: relative;
		width: 330px;
		padding: 24px;
    	margin-bottom: 24px;
    	border-radius: 4px;
		background-color: #24254b;
	}
	.d_c1_kc_item_tag{
		position: absolute;
		width: 54px;
		height: 54px;
		left: -4px;
		top: -4px;
		background-image: url('https://b.csscoe.com/new-pos/hot_tag.png');
		background-size: 100% 100%;
    	text-align: center;
	}
	.d_c1_kc_item_tag_text{
	    font-size: 12px;
		transform: rotate(-45deg) translate(-13px,3px);
	}
	.d_c1_kc_item_top{
		align-items: center;
		justify-content: space-between;
	}
	.d_c1_kc_item_top_img{
		width: 28px;
		height: 28px;
		margin-right: 4px;
	}
	.d_c1_kc_item_top_left{
		flex:1;
	}
	.d_c1_kc_item_top_left_title{
		margin-bottom: 1px;
	    color: #3e3563;
	    font-size: 17px;
	}
	.d_c1_kc_item_top_left_desc{
	    color: #c5c2d1;
    	font-size: 12px
	}
	.d_c1_kc_item_top_right_title{
		color: #323232;
    	font-size: 18px;
	}
	.d_c1_kc_item_top_right_desc{
		color: #999;
    	font-size: 13px;
	}
	.d_c1_kc_item_bottom{
		padding: 20px 0 10px;
	}
	.d_c1_kc_item_bottom_item{
		margin-bottom: 10px;
	}
	.d_c1_kc_item_bottom_item_l{
		color: #ababab;
    	font-size: 13px;
	}
	.d_c1_kc_item_bottom_item_r{
		color: #333;
	    font-size: 13px
	}
	.d_c1_kc_item_bottom_button_box{
		position: absolute;
		right: 24px;
		bottom: 24px;
	}
	.d_c1_kc_item_bottom_button{
		outline: none;
		width: 90px;
		height: 34px;
		color: #fff;
		background: linear-gradient(90deg,#786dad,#60549e);
    	border-radius: 6px;
    	border: solid 1px #6039de;
    	box-shadow: inset 0 1px 0 hsla(0,0%,100%,.15), 0 1px 1px rgba(0,0,0,.075);
    	cursor: pointer;
	}
	.d_c1_kc_item_bottom_button:hover{
		background: linear-gradient(90deg,#877bc4,#7f6fcd);
	}

	.uipwi{
	    padding: 6px 0px;
	}
	.d_c1_card_bottommk{

		position: relative;
		left: 6px;
		top: -50px;
	}
</style>
