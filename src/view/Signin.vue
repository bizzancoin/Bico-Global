<template>
	<div class="poll pollMinWidth">
		<div id="pollIndex">
			<div>
				<div class="pollIndexBanner flex">
					<div class="pollIndexBannerView _row flex-1">
						<div class="pollIndexBannerRow flex-1">
							<div class="pollIndexBannerTitle">{{$t('bico.W266')}}</div>
							<div class="pollIndexBannerText">{{$t('bico.W267')}}</div>
						</div>
						<div class="pollIndexBannerBg"></div>
					</div>
				</div>
				<div class="pollList">
					<div class="pollListTab _row">
						<div class="pollListTabItem font-medium active">{{$t('bico.W268')}}</div>
					</div>
					<ul class="">
						<li class="pollItemRow _row" style="display: block;">
							<div class="pollItemView">
								<div class="flex">
									<div class="pollItemIcon">
										<img class="" src="https://gimg2.gateimg.com/image/1651650215376965681_vote2.png">
									</div>
									<div class="pollItemTitle">
										<p>{{$t('bico.W269')}}</p>
										<i>{{$t('bico.W270')}} {{config.one}} {{config.rewrdCoin}}</i>
									</div>

								</div>
								<div class="pollItemMainRow">
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<a class="pollItemMainRowBtn finished" @click="check()" v-if="data2222.count <= 0 ">{{$t('bico.W277')}}</a>
									<a class="pollItemMainRowBtn finished" style="background: #b9bdd0;" v-if="data2222.count > 0">{{$t('bico.W278')}}</a>
								</div>
							</div>
						</li>
						<li class="pollItemRow _row" style="display: block;">
							<div class="pollItemView">
								<div class="flex">
									<div class="pollItemIcon">
										<img class="" src="https://gimg2.gateimg.com/image/1649038387796976726_avt.png">
									</div>
									<div class="pollItemTitle">
										<p>{{$t('bico.W269')}}</p>
										<i>{{$t('bico.W271')}} {{config.two}} {{config.rewrdCoin}}</i>
									</div>

								</div>
								<div class="pollItemMainRow">
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<a class="pollItemMainRowBtn finished" @click="check()" v-if="data2222.count <= 1">{{$t('bico.W277')}}</a>
									<a class="pollItemMainRowBtn finished" style="background: #b9bdd0;" v-if="data2222.count > 1">{{$t('bico.W278')}}</a>

								</div>
							</div>
						</li>
						<li class="pollItemRow _row" style="display: block;">
							<div class="pollItemView">
								<div class="flex">
									<div class="pollItemIcon">
										<img class="" src="https://gimg.gateimg.com/image/1646361565487737130zkt400.png">
									</div>
									<div class="pollItemTitle">
										<p>{{$t('bico.W269')}}</p>
										<i>{{$t('bico.W272')}}{{config.three}} {{config.rewrdCoin}}</i>
									</div>
								</div>
								<div class="pollItemMainRow">
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<a class="pollItemMainRowBtn finished" @click="check()" v-if="data2222.count <= 2 ">{{$t('bico.W277')}}</a>
									<a class="pollItemMainRowBtn finished" style="background: #b9bdd0;" v-if="data2222.count > 2">{{$t('bico.W278')}}</a>

								</div>
							</div>
						</li>
						<li class="pollItemRow _row" style="display: block;">
							<div class="pollItemView">
								<div class="flex">
									<div class="pollItemIcon">
										<img class="" src="https://gimg.gateimg.com/image/1646193324167162198_mql200.png">
									</div>
									<div class="pollItemTitle">
										<p>{{$t('bico.W269')}}</p>
										<i>{{$t('bico.W273')}}{{config.four}} {{config.rewrdCoin}}</i>
									</div>

								</div>
								<div class="pollItemMainRow">
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<a class="pollItemMainRowBtn finished" @click="check()" v-if="data2222.count <= 3 ">{{$t('bico.W277')}}</a>
									<a class="pollItemMainRowBtn finished" style="background: #b9bdd0;" v-if="data2222.count > 3">{{$t('bico.W278')}}</a>
								</div>
							</div>
						</li>
						<li class="pollItemRow _row" style="display: block;">
							<div class="pollItemView">
								<div class="flex">
									<div class="pollItemIcon">
										<img class="" src="https://gimg.gateimg.com/image/1645411316363994464_sin200.png">
									</div>
									<div class="pollItemTitle">
										<p>{{$t('bico.W269')}}</p>
										<i>{{$t('bico.W274')}}{{config.five}} {{config.rewrdCoin}}</i>
									</div>

								</div>
								<div class="pollItemMainRow">
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>


									<a class="pollItemMainRowBtn finished" @click="check()" v-if="data2222.count <= 4 ">{{$t('bico.W277')}}</a>
									<a class="pollItemMainRowBtn finished" style="background: #b9bdd0;" v-if="data2222.count > 4 ">{{$t('bico.W278')}}</a>
								</div>
							</div>
						</li>
						<li class="pollItemRow _row" style="display: block;">
							<div class="pollItemView">
								<div class="flex">
									<div class="pollItemIcon">
										<img class="" src="https://gimg.gateimg.com/image/1645154115609623364_qtcon200.png">
									</div>
									<div class="pollItemTitle">
										<p>{{$t('bico.W269')}}</p>
										<i>{{$t('bico.W275')}}{{config.six}} {{config.rewrdCoin}}</i>
									</div>

								</div>
								<div class="pollItemMainRow">
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<a class="pollItemMainRowBtn finished" @click="check()" v-if="data2222.count <= 5 ">{{$t('bico.W277')}}</a>
									<a class="pollItemMainRowBtn finished" style="background: #b9bdd0;" v-if="data2222.count > 5 ">{{$t('bico.W278')}}</a>

								</div>
							</div>
						</li>
						<li class="pollItemRow _row" style="display: block;">
							<div class="pollItemView">
								<div class="flex">
									<div class="pollItemIcon">
										<img class="" src="https://gimg.gateimg.com/image/164498728456491478_dep200.png">
									</div>
									<div class="pollItemTitle">
										<p>{{$t('bico.W269')}}</p>
										<i>{{$t('bico.W276')}}{{config.seven}} {{config.rewrdCoin}}</i>
									</div>

								</div>
								<div class="pollItemMainRow">
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<div class="pollItemMainRow_i">
										<p></p>
										<i></i>
									</div>
									<a class="pollItemMainRowBtn finished" @click="check()" v-if="data2222.count <= 6">{{$t('bico.W277')}}</a>
									<a class="pollItemMainRowBtn finished" style="background: #b9bdd0;" v-if="data2222.count == 7">{{$t('bico.W278')}}</a>
								</div>
							</div>
						</li>

					</ul>
				</div>
			</div>
		</div>
		<Foot />
	</div>
</template>
<script>
	import { chenkDayConfigApi,checkInfoApi,checkInApi} from '@/api/getData'
	  import codeStatus from '@/config/codeStatus'
	  import Foot from '@/components/Foot'
	    export default {
	        components:{
	            Foot
	        },
	        data(){
	            return {
	              config:{
	                one:"",
	                two:'',
	                three:'',
	                four:'',
	                five:'',
	                six:'',
	                seven:'',
	                rewrdCoin:'刷新'
	              },
	              data2222:{
	                awardInfo: "",
	                count: 4,
	                days: [12, 11, 10, 9, 7, 6],
	                isToday: "Y",
	              }
	
	            }
	        },
	      created(){
	          this.getConfig()
	        this.getCheckInConfig()
	      },
	        computed: {
	
	        },
	
	        mounted(){
	
	        },
	        methods:{
	          check(){
	            var that=this
	            if(that.data2222.isToday == "Y"){
	              that.$message.error(this.$t("bico.W279"));
	              return;
	            }
	            checkInApi().then(res=>{
	              if(res.code == 200){
	                that.$message.success(this.$t("bico.W280"));
	                this.getCheckInConfig()
	              }else{
	                codeStatus(res.code,function(res){
	                  that.$message.error(res);
	                })
	              }
	            })
	          },
	          getConfig(){
	            var that=this
	            chenkDayConfigApi().then(res=>{
	              if(res.code == 200){
	                var data = res.data;
	                that.config= data
	              }else{
	                codeStatus(res.code,function(res){
	                  that.$message.error(res);
	                })
	              }
	            })
	          },
	          getCheckInConfig(){
	            var that=this
	            checkInfoApi().then(res=>{
	              if(res.code == 200){
	                var data = res.data;
	                that.data2222 = data
	                console.log(data)
	              }else{
	                codeStatus(res.code,function(res){
	                  that.$message.error(res);
	                })
	              }
	            })
	          }
	        }
	    }
</script>
<style scoped>
	.poll .flex {
	    display: flex;
	}
	
	.poll .flex-1 {
	    flex: 1
	}
	
	.poll p, .poll i {
	    margin: 0;
	    font-style: normal;
	}
	
	.pollMinWidth {
	    min-width: 1280px;
	}
	
	._row {
	    width: 1200px;
	    margin: 0 auto;
	}
	
	.poll ._red {
	    color: var(--brandColor)
	}
	
	.poll .font-bold {
	    font-weight: bold;
	}
	
	.text-center {
	    text-align: center;
	}
	
	.poll .text-ellipsis {
	    text-overflow: ellipsis;
	    overflow: hidden;
	    white-space: nowrap;
	}
	
	/* poll index */
	.pollIndexBanner {
	    flex-direction: column;
	    height: 300px;
	    background: linear-gradient(180deg, #EDF7FF 0%, rgba(25,255,255,0) 100%);
	    background: #0012b9;
	}
	
	.pollIndexBannerView {
	    flex-direction: row;
	    display: flex;
	    flex: 1;
	    align-items: center;
	}
	
	.pollIndexBannerRow {
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	}
	
	.pollIndexBannerRow .pollIndexBannerTitle {
	    color: #ffffff;
	    font-size: 50px;
	    line-height: 1;
	}
	
	.pollIndexBannerRow .pollIndexBannerText {
	    color: #ffffff;
	    font-size: 22px;
	    padding-top: 42px;
	    line-height: 1;
	}
	
	.pollIndexBannerBg {
	    width: 286px;
	    height: 286px;
	    background: url(../assets/poll_index_img.png) center center no-repeat;
	}
	
	.pollListTab {
	    display: block;
	    margin-bottom: 40px;
	}
	
	.pollListTab .pollListTabItem:first-child {
	    margin-left: 0;
	}
	
	.pollListTab .pollListTabItem {
	    color: #999999;
	    padding: 12px 5px;
	    font-size: 24px;
	    position: relative;
	    display: inline-block;
	    margin: 0 10px;
	    cursor: pointer;
	    transition: all 0.2s ease;
	}
	
	.pollListTab .pollListTabItem.active {
	    color: #333;
	}
	
	.pollListTab .pollListTabItem:before {
	    content: '';
	    height: 6px;
	    top: 100%;
	    left: 0;
	    width: 0;
	    background: #0BBA80;
	    position: absolute;
	    transition: all 0.2s ease;
	}
	
	.pollListTab .pollListTabItem.active:before {
	    width: 100%;
	}
	
	.pollList {
	    padding-bottom: 100px;
	}
	
	.pollList .pollItemRow {
	    box-sizing: border-box;
	    padding: 28px;
	    background: #FFFFFF;
	    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.06);
	    border-radius: 8px;
	    margin-bottom: 28px;
	    cursor: pointer;
	}
	
	.pollList .pollItemRow:last-child {
	    margin-bottom: 0
	}
	
	.pollList .pollItemIcon {
	    display: block;
	    width: 54px;
	    height: 54px;
	    border-radius: 100px;
	    overflow: hidden;
	    margin-right: 20px;
	}
	
	.pollList .pollItemIcon img {
	    display: block;
	    width: 54px;
	    height: 54px;
	    background: #999
	}
	
	.pollList .pollItemMainRow {
	    margin-top: -38px;
	}
	
	.pollList .pollItemTitle {
	    display: flex;
	    flex: 1;
	    flex-direction: column;
	}
	
	.pollList .pollItemTitle p {
	    font-size: 18px;
	    line-height: 24px;
	    color: #333;
	    margin: 0;
	    font-weight: 500;
	}
	
	.pollList .pollItemTitle i {
	    font-size: 14px;
	    color: #999;
	    line-height: 20px;
	    padding-top: 12px;
	    font-style: normal;
	}
	
	.pollList .pollItemTime {
	    min-width: 150px;
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	    font-size: 14px;
	    line-height: 20px;
	    color: #999;
	    font-weight: 500;
	}
	
	.pollList .pollItemTime b {
	    color: #333;
	    margin-left: 2px;
	}
	
	.pollList .pollItemMainRow {
	    background: #F7F8F9;
	    border-radius: 4px;
	    box-sizing: border-box;
	    padding: 25px;
	    display: flex;
	    flex-direction: row;
	}
	
	.pollList .pollItemMainRow .pollItemMainRow_i {
	    flex: 1
	}
	
	.pollList .pollItemMainRowBtn {
	    min-width: 150px;
	    display: flex;
	    padding: 11px 10px;
	    box-sizing: border-box;
	    color: #fff;
	    font-size: 16px;
	    text-align: center;
	    justify-content: center;
	    align-items: center;
	    border-radius: 3px;
	    background: #ccc;
	    transition: all 0.2s ease;
	}
	
	.pollList .pollItemMainRowBtn.to_start {
	    background: #FF9500
	}
	
	.pollList .pollItemMainRowBtn.in_progress {
	    background: #0BBA80
	}
	
	.pollList .pollItemMainRowBtn.finished {
	    background: #4f69f9
	}
	
	.pollList .pollItemMainRowBtn.to_start:hover {
	    background: #FF9B1A
	}
	
	.pollList .pollItemMainRowBtn.in_progress:hover {
	    background: #23C18C
	}
	
	.pollList .pollItemMainRow .pollItemMainRow_i p {
	    color: #999;
	    line-height: 20px;
	    font-size: 14px;
	    display: block;
	}
	
	.pollList .pollItemMainRow .pollItemMainRow_i i {
	    color: #333;
	    line-height: 18px;
	    font-size: 14px;
	    padding-top: 8px;
	    display: block;
	}
	
	.pollList .pollItemMainRow {
	    padding: 0 25px;
	    background: transparent;
	}
	
	.poll .fee_msg {
	    color: #E64E62;
	    text-align: center;
	    font-size: 12px;
	    margin-top: 8px;
	}
	
	/* ranking || pk3 */
	.poll .listPoll .fee_msg {
	    color: #E64E62;
	    text-align: right;
	    margin-top: 10px;
	    font-size: 14px;
	}
	
	.pollList .fee_msg {
	    color: #E64E62;
	    text-align: center;
	}
	
	.pollBg {
	    width: 100%;
	    min-height: 800px;
	    background: linear-gradient(180deg, #EDF7FF 0%, rgba(255,255,255,0) 800px);
	}
	
	.pollDetailBanner {
	    flex-direction: column;
	    min-height: 300px;
	}
	
	.pollDetailBannerTitleSub div {
	    display: inline-block;
	}
	
	.pollDetailBannerTitleSub {
	    font-size: 18px;
	    opacity: 0.8;
	}
	
	.pollDetailBannerView {
	    flex-direction: row;
	    display: flex;
	    flex: 1;
	    position: relative;
	}
	
	.pollDetailBannerRow {
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	}
	
	.pollDetailBannerRow .pollDetailBannerTitle {
	    color: #1F2533;
	    font-size: 48px;
	    line-height: 1;
	}
	
	.pollDetailBannerRow .pollDetailBannerText {
	    color: #979FAF;
	    font-size: 18px;
	    padding-top: 24px;
	    line-height: 1.2;
	}
	
	#pollRanking .pollDetailBannerBg {
	    width: 286px;
	    height: 286px;
	    background: url(/images/poll_ranking_img.png) center center no-repeat;
	}
	
	#pollPK3 .pollDetailBannerBg {
	    width: 286px;
	    height: 286px;
	    background: url(/images/poll_pk3_img.png) center center no-repeat;
	}
	
	#pollDeposit .pollDetailBannerBg {
	    width: 286px;
	    height: 286px;
	    background: url(/images/poll_deposit_img.png) center center no-repeat;
	}
	
	.pollDetailData {
	    padding-bottom: 60px;
	}
	
	.pollDetailData li p {
	    color: #333;
	    line-height: 22px;
	    font-size: 16px;
	    margin: 0;
	    display: block;
	}
	
	.pollDetailData li i {
	    color: #979FAF;
	    line-height: 20px;
	    font-size: 16px;
	    padding-top: 10px;
	    display: block;
	}
	
	#pollBreadNav {
	    position: absolute;
	    left: 0;
	    top: 20px;
	    display: flex;
	    flex-direction: row;
	}
	
	#pollBreadNav li.active:after {
	    content: '';
	}
	
	#pollBreadNav li:after {
	    content: '>';
	    color: #999;
	    font-size: 16px;
	    display: inline-block;
	    padding: 0 4px;
	}
	
	#pollBreadNav li {
	    font-size: 16px;
	}
	
	#pollBreadNav li.active span {
	    color: #333
	}
	
	#pollBreadNav li a {
	    color: #999;
	    transition: all 0.3s ease
	}
	
	#pollBreadNav li a:hover {
	    color: #7e9599
	}
	
	.pollItemList {
	    padding-bottom: 80px;
	}
	
	.pollItemList .pollItemRow {
	    box-sizing: border-box;
	    padding: 28px;
	    background: #FFFFFF;
	    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.06);
	    border-radius: 8px;
	    margin-bottom: 28px;
	}
	
	.pollItemList .pollItemRow:last-child {
	    margin-bottom: 0
	}
	
	.pollItemList .pollItemIcon {
	    display: block;
	    width: 54px;
	    height: 54px;
	    border-radius: 100px;
	    overflow: hidden;
	    margin-right: 20px;
	}
	
	.pollItemList .pollItemIcon img {
	    display: block;
	    width: 54px;
	    height: 54px;
	    background: #999
	}
	
	.pollItemList .pollItemMainRow {
	    margin-top: 28px;
	}
	
	.pollItemList .pollItemTitle {
	    display: flex;
	    flex: 1;
	    flex-direction: column;
	}
	
	.pollItemList .pollItemTitle p {
	    font-size: 18px;
	    line-height: 28px;
	    color: #333;
	    margin: 0;
	    font-weight: 500;
	}
	
	.pollItemList .pollItemTitle i {
	    font-size: 14px;
	    color: #999;
	    line-height: 20px;
	    padding-top: 10px;
	    font-style: normal;
	}
	
	.pollItemList .pollItemBtnView {
	    min-width: 320px;
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	    font-size: 14px;
	    line-height: 20px;
	    color: #999;
	    font-weight: 500;
	}
	
	.pollItemList .pollItemBtnView .pollDtlBtn {
	    flex: 1;
	    min-width: 150px;
	    display: flex;
	    padding: 10px 9px;
	    box-sizing: border-box;
	    color: #fff;
	    font-size: 16px;
	    text-align: center;
	    justify-content: center;
	    align-items: center;
	    border-radius: 4px;
	    background: #ccc;
	    margin: 0 10px;
	    transition: all 0.2s ease;
	    box-sizing: border-box;
	}
	
	.pollItemList .pollItemBtnView .pollDtlBtn:first-child {
	    margin-left: 0;
	}
	
	.pollItemList .pollItemBtnView .pollDtlBtn:last-child {
	    margin-right: 0;
	}
	
	.pollItemList .pollItemBtnView .pollDtlBtn.success {
	    background: #0BBA80;
	    border-color: #0BBA80;
	}
	
	.pollItemList .pollItemBtnView .pollDtlBtn.success:hover {
	    background: #23C18C;
	    border-color: #23C18C;
	}
	
	.pollItemList .pollItemBtnView .pollDtlBtn.error {
	    background: #E64E62;
	    border-color: #E64E62;
	}
	
	.pollItemList .pollItemBtnView .pollDtlBtn.error:hover {
	    background: #E86072;
	    border-color: #E86072;
	}
	
	.pollItemList .pollItemBtnView .pollDtlBtn.disabled {
	    background: #ccc;
	    border-color: #ccc;
	    cursor: not-allowed;
	}
	
	.pollItemList .pollItemBtnView .pollDtlBtn.shareBtn {
	    background: transparent;
	    padding: 10px 9px;
	    border: solid 2px #979797;
	    color: #666
	}
	
	.pollItemList .pollItemBtnView .pollDtlBtn.shareBtn:hover {
	    background: transparent;
	    padding: 10px 9px;
	    border: solid 2px var(--brandColor);
	    color: var(--brandColor)
	}
	
	.pollItemList .pollItemMainRow {
	    background: #F7F8F9;
	    border-radius: 4px;
	    box-sizing: border-box;
	    padding: 25px;
	    display: flex;
	    flex-direction: row;
	}
	
	.pollItemList .pollItemMainRow .pollItemMainRow_i {
	    flex: 1
	}
	
	.pollItemList .pollItemMainRow .pollItemMainRow_i p {
	    color: #999;
	    line-height: 20px;
	    font-size: 14px;
	    display: block;
	}
	
	.pollItemList .pollItemMainRow .pollItemMainRow_i i {
	    color: #333;
	    line-height: 18px;
	    font-size: 14px;
	    padding-top: 8px;
	    display: block;
	}
	
	.pollDetailInfo {
	    padding-top: 20px;
	    padding-bottom: 100px;
	}
	
	.pollDetailInfo h3 {
	    color: #333;
	    font-size: 24px;
	    padding-bottom: 26px;
	    margin: 0;
	}
	
	.pollDetailInfo p {
	    color: #333;
	    font-size: 16px;
	    margin: 0;
	    text-align: justify;
	    line-height: 26px;
	}
	
	.pollDetailInfo a {
	    background: transparent;
	    color: var(--brandColor);
	    border-radius: 17px;
	    border: solid 1px var(--brandColor);
	    padding: 5px 16px;
	    display: inline-block;
	    margin: 0 auto;
	    font-size: 16px;
	    transition: all 0.3s ease
	}
	
	.pollDetailInfo a:hover {
	    background: var(--brandColor);
	    color: #fff
	}
	
	.itemRankIcon {
	    display: inline-block;
	    width: 28px;
	    height: 28px;
	    background-position: center center;
	    background-repeat: no-repeat;
	    vertical-align: middle;
	    margin-left: 10px;
	}
	
	.itemRankIcon.no0 {
	    background-image: url(/images/poll_no_1.png);
	}
	
	.itemRankIcon.no1 {
	    background-image: url(/images/poll_no_2.png);
	}
	
	.itemRankIcon.no2 {
	    background-image: url(/images/poll_no_3.png);
	}
	
	.pollItemList .voted_row {
	    display: inline-block;
	    padding-left: 20px;
	    font-size: 14px;
	}
	
	.pollItemList .voted_row img {
	    padding-right: 4px;
	}
	
	.fee_tip_pre {
	    position: relative;
	    cursor: pointer;
	}
	
	.fee_tip {
	    position: absolute;
	    bottom: calc(100% + 4px);
	    left: 50%;
	    -webkit-border-radius: 4px;
	    -moz-border-radius: 4px;
	    border-radius: 4px;
	    background: rgba(0,0,0,0.6);
	    color: #fff;
	    font-size: 12px;
	    white-space: nowrap;
	    -webkit-transform: translateX(-50%);
	    -moz-transform: translateX(-50%);
	    -ms-transform: translateX(-50%);
	    -o-transform: translateX(-50%);
	    transform: translateX(-50%);
	    padding: 5px 10px;
	    display: none;
	}
	
	.fee_tip_pre:hover .fee_tip {
	    display: block;
	}
	
	/* pk */
	.poll_pk .pollItemList {
	    flex-direction: row;
	    display: flex;
	    justify-content: space-between;
	}
	
	.poll_pk .pollItemList.pk1 {
	    justify-content: center;
	}
	
	.poll_pk .pkItemView {
	    width: 480px;
	    display: flex;
	    flex-direction: column;
	}
	
	.poll_pk .pollItemBody {
	    position: relative;
	}
	
	.poll_pk .pollItemRow {
	    padding: 50px 55px;
	    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
	    margin-bottom: 10px;
	    position: relative;
	}
	
	.poll_pk .pollItemRow span.pkItemTip {
	    position: absolute;
	    display: block;
	    background: var(--brandColorOpacity);
	    color: var(--brandColor);
	    right: 25px;
	    top: 25px;
	    padding: 5px 15px;
	    border-radius: 6px;
	}
	
	.poll_pk .pollItemRow .pollItemIcon {
	    display: block;
	    margin: 0 auto;
	}
	
	.poll_pk .pkItemName {
	    padding: 20px 0 16px 0;
	    font-weight: bold;
	    font-size: 24px;
	    color: #333;
	    line-height: 1.2em;
	    text-align: center;
	}
	
	.poll_pk .pollItemRow p {
	    color: #666;
	    font-size: 16px;
	    line-height: 28px;
	    display: block;
	    width: 100%;
	    display: block;
	    text-align: center;
	}
	
	.poll_pk .pollItemRow a {
	    font-size: 16px;
	    color: #333;
	    margin-top: 8px;
	    display: inline-block;
	}
	
	.poll_pk #pollBreadNav {
	    position: inherit;
	    padding-top: 25px;
	    padding-bottom: 55px;
	}
	
	.poll_pk .pkItemDtl {
	    padding-top: 20px
	}
	
	.poll_pk .pkItemDtlRow {
	    display: inline-block;
	    padding: 0 15px;
	    font-size: 18px;
	    color: #333;
	    line-height: 24px;
	}
	
	.poll_pk .pkItemDtlRow:first-child {
	    padding-left: 0;
	}
	
	.poll_pk .pkItemDtlRow:last-child {
	    padding-right: 0;
	}
	
	.poll_pk .pkTimer {
	    padding-top: 20px;
	}
	
	.poll_pk#pollPK1 .pkTimer {
	    border-top: solid 1px #E5E5E5;
	}
	
	.poll_pk .pkTimer .pkTimerTxt {
	    padding-bottom: 12px;
	}
	
	.poll_pk .pollItemBody .pkItemDtl {
	    padding-top: 15px;
	    font-size: 16px;
	}
	
	.poll_pk .pollItemBtnView {
	    padding-top: 48px;
	}
	
	.poll_pk .pkCenterTitle p {
	    color: #999;
	    font-size: 20px;
	    padding-top: 12px;
	}
	
	.poll_pk .pkCenterTitle p span {
	    color: #333;
	}
	
	.poll_pk .pkCenterTitle .pkCenterTitleText {
	    text-align: center;
	    font-size: 16px;
	    color: #333;
	}
	
	.poll_pk .pkCenterTitle img {
	    padding-top: 20px;
	    max-width: 90%;
	    height: auto;
	    margin: 0 auto;
	}
	
	.poll_pk .pkCenterTitle {
	    padding-bottom: 150px;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	}
	
	.poll_pk .pkCenterTitle {
	    padding: 0;
	}
	
	.poll_pk .pkProgressBarView {
	    overflow: hidden;
	    border-radius: 8px;
	    height: 68px;
	    position: relative;
	    margin-bottom: 100px;
	}
	
	.poll_pk .pkProgressBar {
	    height: 68px;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    min-width: 200px;
	    max-width: calc(100% - 200px);
	}
	
	.poll_pk .pkProgressBarLeft {
	    left: 0;
	    padding-right: /*15px*/4px;
	    background: url(/images/poll_pk2_left.png?v=2) right center no-repeat;
	    text-align: left;
	}
	
	.poll_pk .pkProgressBarRight {
	    right: 0;
	    padding-left: /*15px*/4px;
	    background: url(/images/poll_pk2_right.png?v=2) left center no-repeat;
	    text-align: right;
	}
	
	.poll_pk .pkProgressBarRight.pkProgressBarRight_pk1 {
	    right: 0;
	    padding-left: /*15px*/4px;
	    background: url(/images/poll_pk2_right_default.png?v=2) left center no-repeat;
	    text-align: right;
	}
	
	.poll_pk .pkProgressBar p {
	    display: block;
	    color: #fff;
	    font-size: 14px;
	    line-height: 24px;
	}
	
	.poll_pk .pkProgressBar p span.font-bold {
	    font-size: 20px;
	}
	
	.poll_pk .pkProgressBar i {
	    display: block;
	    color: rgba(255,255,255,0.6);
	    font-size: 14px;
	    line-height: 24px;
	}
	
	.poll_pk .pkProgressBarContent {
	    padding: 0 28px;
	    position: relative;
	    overflow: hidden;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    flex: 1;
	}
	
	.poll_pk .pkProgressBarContent:after {
	    content: "";
	    position: absolute;
	    /*top: -10px;*/
	    height: 8px;
	    /*bottom: -1px;*/
	    width: 50px;
	}
	
	.poll_pk .pkProgressBarLeft .pkProgressBarContent:after {
	    left: -60px;
	    bottom: -1px;
	    background: -webkit-linear-gradient(right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 0) 100%);
	    background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 0) 100%);
	    -webkit-animation: pkLeftAni 5s ease infinite;
	    animation: pkLeftAni 5s ease infinite;
	}
	
	.poll_pk .pkProgressBarRight .pkProgressBarContent:after {
	    right: -60px;
	    top: -1px;
	    background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 0) 100%);
	    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 0) 100%);
	    -webkit-animation: pkRightAni 5s ease infinite;
	    animation: pkRightAni 5s ease infinite;
	}
	
	/*.poll_pk .pkProgressBarContent:before {
	  width: 7px;
	  right: -4px;
	  background: -webkit-radial-gradient(center, ellipse, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 75%);
	  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 75%);
	}
	.poll_pk .pkProgressBarContent:after {
	  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.3) 75%, rgba(255, 255, 255, 0) 100%);
	  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.3) 75%, rgba(255, 255, 255, 0) 100%);
	}*/
	@-webkit-keyframes pkLeftAni {
	    0% {
	        left: calc(0% - 60px);
	        opacity: 0
	    }
	
	    10% {
	        left: calc(0% - 60px);
	        opacity: 0.5
	    }
	
	    50% {
	        left: calc(0% - 60px);
	        opacity: 1
	    }
	
	    75% {
	        opacity: 1
	    }
	
	    90% {
	        opacity: 0.5
	    }
	
	    100% {
	        left: calc(100% - 55px);
	        opacity: 0
	    }
	}
	
	@keyframes pkLeftAni {
	    0% {
	        left: calc(0% - 60px);
	        opacity: 0
	    }
	
	    10% {
	        left: calc(0% - 60px);
	        opacity: 0.5
	    }
	
	    50% {
	        left: calc(0% - 60px);
	        opacity: 1
	    }
	
	    75% {
	        opacity: 1
	    }
	
	    90% {
	        opacity: 0.5
	    }
	
	    100% {
	        left: calc(100% - 55px);
	        opacity: 0
	    }
	}
	
	@-webkit-keyframes pkRightAni {
	    0% {
	        right: calc(0% - 60px);
	        opacity: 0
	    }
	
	    10% {
	        right: calc(0% - 60px);
	        opacity: 0.5
	    }
	
	    50% {
	        right: calc(0% - 60px);
	        opacity: 1
	    }
	
	    75% {
	        opacity: 1
	    }
	
	    90% {
	        opacity: 0.5
	    }
	
	    100% {
	        right: calc(100% - 55px);
	        opacity: 0
	    }
	}
	
	@keyframes pkRightAni {
	    0% {
	        right: calc(0% - 60px);
	        opacity: 0
	    }
	
	    10% {
	        right: calc(0% - 60px);
	        opacity: 0.5
	    }
	
	    50% {
	        right: calc(0% - 60px);
	        opacity: 1
	    }
	
	    75% {
	        opacity: 1
	    }
	
	    90% {
	        opacity: 0.5
	    }
	
	    100% {
	        right: calc(100% - 55px);
	        opacity: 0
	    }
	}
	
	.fee-h4 {
	    padding: 20px;
	}
	
	.fee-msg {
	    letter-spacing: 0px;
	    margin: 0 auto;
	}
	
	.fee-btn {
	    background: transparent;
	    min-width: 160px;
	    text-align: center;
	    line-height: 36px;
	    border: solid 1px #434343;
	    -webkit-border-radius: 6px;
	    -moz-border-radius: 6px;
	    border-radius: 6px;
	    color: #fff;
	    font-size: 14px;
	    float: left;
	    cursor: pointer;
	}
	
	.fee-btn.fee-btn-sub {
	    float: right;
	}
	
	.fee-btn.active {
	    background: #c85161;
	    border-color: #c85161;
	}
	
	.fee-btn-row {
	    padding-top: 20px;
	}
	
	.poll_pk .progress_status {
	    display: block;
	    position: absolute;
	    top: 20px;
	    right: 10px;
	    -webkit-transform: rotate(30deg);
	    -moz-transform: rotate(30deg);
	    -ms-transform: rotate(30deg);
	    -o-transform: rotate(30deg);
	    transform: rotate(30deg);
	    border-style: solid;
	    border-width: 6px;
	    padding: 4px;
	    text-align: center;
	    font-size: 1.2em;
	    font-weight: bold;
	}
	
	.poll_pk .progress_status span {
	    display: block;
	    border-style: solid;
	    border-width: 4px;
	    padding: 4px;
	    min-width: 72px;
	}
	
	.poll_pk .progress_status.status_success span, .poll_pk .progress_status.status_success {
	    border-color: #00ad82;
	    color: #00ad82;
	}
	
	.poll_pk .progress_status.status_failed span, .poll_pk .progress_status.status_failed {
	    border-color: var(--brandColor);
	    color: var(--brandColor);
	}
	
	/* share dialog */
	.shareDialogMask {
	    position: fixed;
	    z-index: 100;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: rgba(0,0,0,0.5);
	}
	
	.shareDialog {
	    position: relative;
	    width: 100%;
	    height: 100%;
	}
	
	.shareDialogView {
	    position: absolute;
	    transform: translate(-50%, -50%);
	    left: 50%;
	    top: 50%;
	    background: #FFFFFF;
	    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
	    border-radius: 16px;
	}
	
	.shareDialogMain {
	    padding: 50px 60px 40px 60px;
	    position: relative;
	}
	
	.shareDialogTitle {
	    font-size: 26px;
	    color: #333;
	    text-align: center;
	    margin-bottom: 20px;
	    line-height: 1
	}
	
	.shareDialogBody {
	    width: 500px;
	    text-align: center;
	}
	
	.shareListItem {
	    display: inline-block;
	    margin: 25px 30px;
	    cursor: pointer;
	    position: relative;
	}
	
	.shareDialogMain .close_icon {
	    position: absolute;
	    top: 15px;
	    right: 15px;
	    font-size: 16px;
	    color: #999;
	    padding: 5px;
	    cursor: pointer;
	}
	
	.shareListItem #wechatShare {
	    position: absolute;
	    transform: translateX(-50%);
	    bottom: calc(100% + 10px);
	    left: 50%;
	    display: none;
	    box-shadow: 0px 4px 24px 0px rgb(0 0 0 / 8%);
	    padding: 6px;
	    background: #fff;
	    border-radius: 4px;
	}
	
	/* countdown-container */
	.countdown-container {
	    display: flex;
	    justify-content: space-between;
	    margin-bottom: 5px;
	}
	
	.countdown-container .time {
	    border-radius: 5px;
	    display: inline-block;
	    text-align: center;
	    position: relative;
	    height: 55px;
	    width: 19%;
	    -webkit-perspective: 479px;
	    -moz-perspective: 479px;
	    perspective: 479px;
	    -webkit-backface-visibility: hidden;
	    -moz-backface-visibility: hidden;
	    backface-visibility: hidden;
	    transform: translateZ(0) translate3d(0, 0, 0);
	}
	
	.countdown-container .count {
	    background: #313940;
	    color: #f8f8f8;
	    display: block;
	    font-family: 'Oswald', sans-serif;
	    font-size: 2em;
	    line-height: 55px;
	    ; overflow: hidden;
	    position: absolute;
	    text-align: center;
	    text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
	    top: 0;
	    width: 100%;
	    transform: translateZ(0);
	    transform-style: flat;
	}
	
	.countdown-container .count.top {
	    border-top: 1px solid rgba(255,255,255,0.2);
	    border-bottom: 1px solid rgba(255,255,255,0.1);
	    border-radius: 5px 5px 0 0;
	    height: 50%;
	    transform-origin: 50% 100%;
	}
	
	.countdown-container .count.bottom {
	    background-image: linear-gradient(rgba(255,255,255,0.1), transparent);
	    border-top: 1px solid #222;
	    border-bottom: 1px solid #222;
	    border-radius: 0 0 5px 5px;
	    line-height: 0;
	    height: 50%;
	    top: 50%;
	    transform-origin: 50% 0;
	}
	
	.countdown-container .label {
	    color: #888;
	    font-size: 12px;
	    margin-top: 5px;
	    display: block;
	    position: absolute;
	    top: 52px;
	    width: 100%;
	}
	
	/* Animation start */
	.countdown-container .count.curr.top {
	    transform: rotateX(0deg);
	    z-index: 3;
	}
	
	.countdown-container .count.next.bottom {
	    transform: rotateX(90deg);
	    z-index: 2;
	}
	
	/* Animation end */
	.countdown-container .flip .count.curr.top {
	    transition: all 250ms ease-in-out;
	    transform: rotateX(-90deg);
	}
	
	.countdown-container .flip .count.next.bottom {
	    transition: all 250ms ease-in-out 250ms;
	    transform: rotateX(0deg);
	}
	
	/* feeDialog */
	#noty_center_layout_container li#pollFeeDialog {
	    background: #fff
	}
	
	#pollFeeDialog .fee-h4 {
	    font-size: 18px;
	    color: #333;
	}
	
	#pollFeeDialog .fee-msg {
	    font-size: 12px;
	    color: #666;
	    line-height: 20px;
	}
	
	#pollFeeDialog .fee-btn-close {
	    box-sizing: border-box;
	    border: solid 1px #666;
	    color: #666;
	    background: transparent;
	}
	
	#pollFeeDialog .fee-btn-sub {
	    background: #E93A3D;
	    color: #fff;
	}
	
	/* dark css */
	body.classic-dark .pollIndexBanner {
	    background-image: linear-gradient(180deg, #11445b 0%, rgba(255,255,255,0))
	}
	
	body.classic-dark .pollIndexBannerRow .pollIndexBannerTitle {
	    color: #fff
	}
	
	body.classic-dark .pollListTab .pollListTabItem.active {
	    color: #12b97f
	}
	
	body.classic-dark .pollList .pollItemRow {
	    background: #333
	}
	
	body.classic-dark .pollList .pollItemTime b {
	    color: #fff
	}
	
	body.classic-dark .pollList .pollItemTitle p {
	    color: #bbb
	}
	
	body.classic-dark .pollList .pollItemMainRowBtn.finished {
	    background: #666
	}
	
	body.classic-dark .pollBg {
	    background-image: linear-gradient(180deg, #11445b 0%, rgba(255,255,255,0))
	}
	
	body.classic-dark #pollBreadNav li.active span {
	    color: #fff
	}
	
	body.classic-dark .pollDetailBannerRow .pollDetailBannerTitle {
	    color: #fff
	}
	
	body.classic-dark .pollDetailBannerRow .pollDetailBannerText {
	    color: #ddd
	}
	
	body.classic-dark .pollDetailData li p {
	    color: #ccc
	}
	
	body.classic-dark .pollItemList .pollItemRow {
	    background: #222
	}
	
	body.classic-dark .pollItemList .pollItemTitle p {
	    color: #ccc;
	}
	
	body.classic-dark .pollItemList .pollItemMainRow {
	    background: #282828;
	}
	
	body.classic-dark .pollItemList .pollItemMainRow .pollItemMainRow_i i {
	    color: #ccc
	}
	
	body.classic-dark .pollItemList .pollItemBtnView .pollDtlBtn.disabled {
	    background: #444
	}
	
	body.classic-dark .shareDialogView {
	    background: #333
	}
	
	body.classic-dark .shareDialogTitle {
	    color: #666
	}
	
	body.classic-dark .pollDetailInfo h3 {
	    color: #aaa
	}
	
	body.classic-dark .pollDetailInfo p {
	    color: #999
	}
	
	body.classic-dark .poll_pk .pkItemName {
	    color: #999
	}
	
	body.classic-dark .poll_pk .pollItemRow a.dtlBtn {
	    color: #999
	}
	
	body.classic-dark .poll_pk .pkItemDtl {
	    color: #999
	}
	
	body.classic-dark .poll_pk .pkItemDtlRow {
	    color: #999
	}
	
	body.classic-dark .poll_pk .pollItemRow a {
	    color: #fff
	}
	
	body.classic-dark .poll_pk .pollItemRow span.pkItemTip {
	    color: #baa7a7
	}
	
	body.classic-dark .poll_pk .pkCenterTitle .pkCenterTitleText {
	    color: #aaa
	}
	
	body.classic-dark .poll_pk .pkCenterTitle p span {
	    color: #ddd
	}
	
	body.classic-dark .poll_pk#pollPK1 .pkTimer {
	    border-color: #000
	}
	
	body.classic-dark #pollFeeDialog .fee-h4 {
	    color: #999
	}
	
	body.dark-body .pollIndexBanner {
	    background-image: linear-gradient(180deg, #11445b 0%, rgba(255,255,255,0))
	}
	
	body.dark-body .pollIndexBannerRow .pollIndexBannerTitle {
	    color: #fff
	}
	
	body.dark-body .pollListTab .pollListTabItem.active {
	    color: #12b97f
	}
	
	body.dark-body .pollList .pollItemRow {
	    background: #333
	}
	
	body.dark-body .pollList .pollItemTime b {
	    color: #fff
	}
	
	body.dark-body .pollList .pollItemTitle p {
	    color: #bbb
	}
	
	body.dark-body .pollList .pollItemMainRowBtn.finished {
	    background: #666
	}
	
	body.dark-body .pollBg {
	    background-image: linear-gradient(180deg, #11445b 0%, rgba(255,255,255,0))
	}
	
	body.dark-body #pollBreadNav li.active span {
	    color: #fff
	}
	
	body.dark-body .pollDetailBannerRow .pollDetailBannerTitle {
	    color: #fff
	}
	
	body.dark-body .pollDetailBannerRow .pollDetailBannerText {
	    color: #ddd
	}
	
	body.dark-body .pollDetailData li p {
	    color: #ccc
	}
	
	body.dark-body .pollItemList .pollItemRow {
	    background: #222
	}
	
	body.dark-body .pollItemList .pollItemTitle p {
	    color: #ccc;
	}
	
	body.dark-body .pollItemList .pollItemMainRow {
	    background: #282828;
	}
	
	body.dark-body .pollItemList .pollItemMainRow .pollItemMainRow_i i {
	    color: #ccc
	}
	
	body.dark-body .pollItemList .pollItemBtnView .pollDtlBtn.disabled {
	    background: #444
	}
	
	body.dark-body .shareDialogView {
	    background: #333
	}
	
	body.dark-body .shareDialogTitle {
	    color: #666
	}
	
	body.dark-body .pollDetailInfo h3 {
	    color: #aaa
	}
	
	body.dark-body .pollDetailInfo p {
	    color: #999
	}
	
	body.dark-body .poll_pk .pkItemName {
	    color: #999
	}
	
	body.dark-body .poll_pk .pollItemRow a.dtlBtn {
	    color: #999
	}
	
	body.dark-body .poll_pk .pkItemDtlRow {
	    color: #999
	}
	
	body.dark-body .poll_pk .pkItemDtl {
	    color: #999
	}
	
	body.dark-body .poll_pk .pollItemRow a {
	    color: #fff
	}
	
	body.dark-body .poll_pk .pollItemRow span.pkItemTip {
	    color: #baa7a7
	}
	
	body.dark-body .poll_pk .pkCenterTitle .pkCenterTitleText {
	    color: #aaa
	}
	
	body.dark-body .poll_pk .pkCenterTitle p span {
	    color: #ddd
	}
	
	body.dark-body .poll_pk#pollPK1 .pkTimer {
	    border-color: #000
	}
	
	body.dark-body #pollFeeDialog .fee-h4 {
	    color: #999
	}
</style>