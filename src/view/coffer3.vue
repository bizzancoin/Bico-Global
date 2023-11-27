<template>
	<div class="d_c3_container">
		<div class="d_flex d_c3_top">
			<div class="d_c3_tabs">
				<span :class="['d_c3_tab',d_c3_tab_index=='1'?'d_c3_tab_active':'']" @click="d_c3_tab_change(1)">进行中</span>
			    <div class="d_c3_divider">
			    	<div></div>
			    </div>
			    <span :class="['d_c3_tab',d_c3_tab_index=='2'?'d_c3_tab_active':'']" @click="d_c3_tab_change(2)">已结束</span>
			</div>
			<div class="d_c3_check">
				<el-checkbox v-model="checked" @change="d_change">仅展示可购买项目</el-checkbox>
			</div>
		</div>
		<div class="d_c3_cardItem">
			<div class="d_flex d_c3_cardItem_top">
				<div :class="['d_c3_cardItem_top_label',d_c3_tab_index=='1'?'d_c3_cardItem_top_label1':'d_c3_cardItem_top_label2']">{{d_c3_tab_index=='1'?'进行中':'已结束'}}</div>
				<div class="d_flex d_c3_cardItem_top_con">
					<div class="d_flex d_c3_cardItem_top_con_left">
						<div class="d_c3_cardItem_top_con_left_label">002 - EOS</div>
						<div class="d_flex d_c3_cardItem_top_con_left_tag">
							<div class="d_c3_cardItem_top_con_left_tag_left"></div>
							<div class="d_c3_cardItem_top_con_left_tag_center"></div>
							<div class="d_c3_cardItem_top_con_left_tag_right">进行中</div>
						</div>
					</div>
					<div class="d_flex d_c3_cardItem_top_con_right">
						<div class="d_c3_cardItem_top_con_right_label">抢购日期：</div>
						<div class="d_c3_cardItem_top_con_right_date">2020-02-14 18:00</div>
					</div>
				</div>
			</div>
			<div class="d_flex d_c3_cardItem_center">
				<div class="d_c3_cardItem_center_item">
					<div class="d_c3_cardItem_center_item_top">参考年化收益率</div>
					<div class="d_c3_cardItem_center_item_bot">
						<span class="d_c3_cardItem_center_item_bot_span1">0.8</span>
						<span class="d_c3_cardItem_center_item_bot_span2">%</span>
					</div>
				</div>
				<div class="d_c3_cardItem_center_item">
					<div class="d_c3_cardItem_center_item_top">周期</div>
					<div class="d_c3_cardItem_center_item_bot">
						<span class="d_c3_cardItem_center_item_bot_span3">灵活</span>
					</div>
				</div>
				<div class="d_c3_cardItem_center_item">
					<div class="d_c3_cardItem_center_item_top">最小挖矿金额</div>
					<div class="d_c3_cardItem_center_item_bot">
						<span class="d_c3_cardItem_center_item_bot_span1">0.1</span>
						<span class="d_c3_cardItem_center_item_bot_span2">EOS</span>
					</div>
				</div>
				<div class="d_c3_cardItem_center_item d_c3_cardItem_center_itemLast">
					<div class="d_c3_cardItem_center_item_top">进度</div>
					<div class="d_c3_cardItem_center_item_bot">
						<el-progress :percentage="50" :stroke-width="7" color="#6358a0" :show-text="false"></el-progress>
						<div class="d_flex d_c3_proce_desc">
							<div>
								<span class="d_c3_color1">3,199</span>
								<span> ETH / </span>
								<span class="d_c3_color2">3,200 ETH</span>
							</div>
							<div class="d_c2_color1">50%</div>
						</div>	
					</div>
				</div>
			</div>
		</div>
		<div class="d_flex d_c3_page">
			<el-pagination
			background
		    layout="prev, pager, next"
		     @current-change="handleSizeChange"
		    :total="total">
		  </el-pagination>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				d_c3_tab_index:'1',
				checked:false,
				params:{},
				list:[],
				total:0
			}
		},
		methods:{
			d_c3_tab_change(index){
				this.d_c3_tab_index = index;
			},
			d_change(v){},
			handleSizeChange(v){
				console.log(v)
			}
		}
	}
</script>
<style scoped>
	.d_c3_page{
		padding-top: 20px;
		justify-content: flex-end;
	}
	.d_c3_page>>>.el-pagination.is-background .el-pager li:not(.disabled).active{
		background:#6358a0;
	}
	.d_c3_color1{
		color: #7368aa
	}
	.d_c3_proce_desc{
		padding-top: 6px;
		justify-content: space-between;
	}
	.d_c3_cardItem_center_itemLast{
		width: 396px;
	}
	.d_c3_cardItem_center_item_bot_span1{
		color: #7368aa;
    	font-size: 20px;
    	font-weight: bold;
    	padding-right: 4px;
	}
	.d_c3_cardItem_center_item_bot_span2{
		color: #c3c0cf;
    	font-size: 14px;
    	font-weight: bold;
	}
	.d_c3_cardItem_center_item_bot_span3{
		color: #333;
    	font-size: 16px;
    	font-weight: bold;
	}

	
	.d_c3_cardItem_center_item_top{
		padding-bottom: 14px;
	}
	.d_c3_cardItem_center{
		color: #ababab;
		padding: 30px 0 20px 24px;
		justify-content: space-between;
	}
	.d_c3_cardItem_top_con_left_tag{
		position: relative;
		align-items: center;
		margin-left: 24px;
	}
	.d_c3_cardItem_top_con_left_tag_left{
		width: 0;
		height: 0;
		border-bottom:solid 10px transparent;
		border-right: solid 14px #7368aa;
		border-top: solid 10px transparent;
	}
	.d_c3_cardItem_top_con_left_tag_center{
		width: 5px;
		height: 5px;
		background-color: #fff;
		border-radius: 50%;
		position: absolute;
		left: 14px;
		top: 50%;
		transform: translate(0,-50%);
	}
	.d_c3_cardItem_top_con_left_tag_right{
		height: 20px;
		padding: 0 10px;
		line-height: 20px;
		color: #fff;
		background-color: #7368aa;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	.d_c3_cardItem{
		padding: 12px 24px 0 0;
		background-color: #fff;
		border-radius: 4px;
		margin-bottom: 20px;
	}
	.d_c3_cardItem_top{
		
	}
	.d_c3_cardItem_top_label{
		color: #fff;
		padding: 6px 6px 4px;
		font-size: 12px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	.d_c3_cardItem_top_label1{
		background-color: #7368aa;
	}
	.d_c3_cardItem_top_label2{
		background-color: #24b36b;
	}
	.d_c3_cardItem_top_con{
		flex: 1;
		justify-content: space-between;
		padding-left: 4px;
	}
	.d_c3_cardItem_top_con_right{
		font-size: 14px;
		align-items: center;
	}
	.d_c3_cardItem_top_con_right_date{
		color: #333;
	}
	.d_c3_cardItem_top_con_left{
		align-items: center;
	}
	.d_c3_cardItem_top_con_left_label{
		font-size: 14px;
		color: #333;
		font-weight: bold;
	}



	.d_c3_container{
		color: #ababab;
    	font-size: 12px;
	}
	.d_flex{
		display: flex;
	}
	.d_c3_top{
		padding-bottom: 30px;
		justify-content: space-between;
		align-items: center;
	}
	.d_c3_tabs{
		font-size: 16px;
		display: flex;
	}
	.d_c3_tab{
		cursor: pointer;
	}
	.d_c3_divider{
		height: 100%;
	}
	.d_c3_divider>div{
		height: 100%;
		margin: 4px 20px 0;
		width: 1px;
		height: 14px;
		background-color: #ababab;
	}
	.d_c3_tab_active{
		color: #fff;
	}
	.d_c3_check{
		padding: 0 20px 10px 0;
		text-align: right;
		font-size: 14px;
	}
	.d_c3_check>>>.el-checkbox__inner{
		width: 16px;
		height: 16px;
	}
	.d_c3_check>>>.el-checkbox__label{
		color: #fff
	}
	.d_c3_check>>>.el-checkbox__inner::after{
		left: 5px;
		top: 2px;
	}
	.d_c3_check>>>.el-checkbox__input.is-checked .el-checkbox__inner{
	    background-color: #766bac;
    	border-color: #6039de;
	}
</style>