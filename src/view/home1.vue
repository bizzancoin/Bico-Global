<template>
	<div class="home_div">




<main class="home-container">
	<div class="home-main">

		<section class="home-top">
		
			<div class="home-bg">
				<div class="home-bg-father">
					<div class="home-bg-main"></div>
				</div>
			</div>


			<div class="home-banner-bg">
				<div class="okg-container">
					<div class="main-container">
						<div class="home-text-box" id="homeTextBox">
							<div class="home-title" data-lang-key="home_banner_title1">{{ $t("home.huobi18") }}</div>
							<div class="home-title" data-lang-key="home_banner_title1"></div>
							<h1 class="home-subtitle" data-lang-key="home_banner_subtitle">{{$t('home.huobi20')}}</h1>
						</div>

						<div class="buy-coin-box" id="buyCoinBox">
							<div class="buy-input-box" id="buyInputBox">
								<input type="text" name="" id="buyAmount" class="buy-input" :placeholder="$t('home.huobi40')" autocomplete="off">
							</div>
							<button class="buy-coin-btn" id="buyCoinBtn" @click="jumpRegister">{{$t("home.onceRe")}}</button>
						</div>
					</div>
				</div>
			</div>

			<div class="block" style="position: relative;right: 0px;left: 224px;text-align: center;border-radius: 30px;top: -148px;width: 1000px;height: 280px;">
			<el-carousel :interval="3000" type="card" indicator-position="none" arrow="never" height="height: 280px;">
				<el-carousel-item v-for="item in bannerArr" :key="item.id">
						<a
						:href="item.link == '' ? 'javascript:;' : item.link"
						:target="item.link == '' ? '' : '_blank'">
							<img class="imgFull" :src="item.img" alt="" />
						</a>
					</el-carousel-item>
			</el-carousel>
		</div>
		</section>



	</div>
</main>



		<!-- 轮播图 -->
		<div class="block">
			<!-- <el-carousel height="500px" :interval="3000" indicator-position="none" direction="vertical" arrow="always">
				<el-carousel-item v-for="item in bannerArr" :key="item.id">
					<a
					   :href="item.link == '' ? 'javascript:;' : item.link"
					   :target="item.link == '' ? '' : '_blank'">
						<img class="imgFull" :src="item.img" alt="" />
					</a>
				</el-carousel-item>

			</el-carousel> -->

			<div data-v-2bd6cbe3="" class="register_wrap" style="">
				<!--p data-v-2bd6cbe3="" class="block_title">
					<span>{{ $t("home.huobi18") }}</span>
				</p-->
				<!-- <p data-v-2bd6cbe3="" class="" style="font-size: 18px;color: hsla(0, 0%, 100%, 0.51);margin-top: -20px;z-index: 9;"><span>{{$t('home.huobi20')}}</span></p> -->
				<!--div data-v-2bd6cbe3="" class="input_wrap">
					<input
						   data-v-2bd6cbe3=""
						   type="text"
						   :placeholder="$t('home.huobi40')"
						   maxlength="64" />
					<button data-v-2bd6cbe3="">
						<el-button class="themeBtn" @click="jumpRegister">{{
              $t("home.onceRe")
            }}</el-button>
					</button>
				</div-->
				<br />
				<!--p style="z-index: 9; font-size: 14px; text-align: center; color: #ffffff">
					<span>{{ $t("home.huobi19") }}</span>
				</p-->
			</div>
		</div>

		<!-- 币种行情 -->
		<div class="market">
			<Trade :activeName="activeName" />
		</div>

		<!-- 滚动公告的位置 -->
		<div class="d_notice_box">
			<div
				 class="d_notice_item"
				 v-for="(item, index) in noticeArr"
				 :key="item.carouselId">
				<img src="../assets/tzgg.png" class="tzgg">
				<span>{{ item.title.slice(0, 30) }}</span>
				<span class="d_notice_split" v-if="index != 6"></span>
			</div>
		</div>
		<!-- 滚动公告的位置 -->


		<div class="trade-banner-wrap">
			<!-- <div class="trade-banner-title">我们的优势</div> -->
				<div class="trade-banner cc_cursor">
					<div class="trade-banner-item">
						<img src="../assets/cypp/1.png" class="trade-banner-pic">
						<div class="trade-banner-info">
							<div class="trade-banner-name">
								行业创新引领者
							</div>
							<div class="trade-banner-description">2018年接入人脸识别验证能力，让交易更安心；
								<br>2018年开启认证广告方模式，让交易更安全；
								<br>2018年推出一键买币等创新功能，让交易更便捷。</div>
						</div>
					</div>
					<div class="trade-banner-item">
						<img src="../assets/cypp/2.png" class="trade-banner-pic">
						<div class="trade-banner-info">
							<div class="trade-banner-name">
								7*24小时守护
							</div>
							<div class="trade-banner-description">行业首创7x24客服支持，专业服务；
								<br>后端风控7x24人工巡查，极速响应；
								<br>用心服务超170个国家的数千万用户。</div>
						</div>
					</div>
					<div class="trade-banner-item">
						<img src="../assets/cypp/3.png" class="trade-banner-pic">
						<div class="trade-banner-info">
							<div class="trade-banner-name">
								反诈正风践行者
							</div>
							<div class="trade-banner-description">安全教育触达360+万人次;
								<br>2020年上线中高风险提币拦截能力；
								<br>2020年实现事前拦截并阻断杀猪盘诈骗能力。</div>
						</div>
					</div>
					<div class="trade-banner-item">
						<img src="../assets/cypp/4.png" class="trade-banner-pic">
						<div class="trade-banner-info">
							<div class="trade-banner-name">
								顶级安全风控能力
							</div>
							<div class="trade-banner-description">精耕风控情报工作，侧重事前预警防控；
								<br>持续迭代风控策略，策略因子覆盖全业务场景；
								<br>OTC买入限时限额提币限制，覆盖全站用户，提币限制时间大于T+1，确保平台资金安全。
							</div>
					</div>
				</div>
			</div>
        </div>




		<div data-v-63c57342="" class="feature_wrap">
			<h2 data-v-63c57342="" style="font-weight: 400">
				<span>{{ $t("home.huobi1") }}</span>
				<b> $263,27598,39{{ testNum }}</b> {{ $t("home.huobi2") }}
			</h2>
			<!--p data-v-63c57342="">
				<span>{{ $t("home.huobi3") }}</span>
			</p-->
		</div>

		<div class="container">

			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane :label="$t('home.mark')" name="1"></el-tab-pane>
				<el-tab-pane :label="$t('home.coinMark')" name="0"></el-tab-pane>
			</el-tabs>

            <div class="ainer_maer">
				<div>
					<div class="el-table table el-table--fit el-table--enable-row-hover el-table--enable-row-transition">
						<el-table border stripe :data="tableData" style="width: 100%;">

							<el-table-column align="center" prop="symbol" :label="$t('home.huobi10')">
								<template slot-scope="scope">
									<div class="symbolBox">
										<img :src="scope.row.symbolLogo" alt="" />
										<span style="font-weight: 700; font-size: 14px">{{
											scope.row.symbol
										}}</span>
									</div>
								</template>
							</el-table-column>

							<el-table-column align="center" prop="open" :label="$t('home.huobi11')">
								<template slot-scope="scope">
									<span style="font-weight: 700; font-size: 14px">{{ scope.row.open }}
										<span style="font-weight: 400; color: #673AB7; font-size: 12px">
											≈ {{ scope.row.cny }} CNY</span>
									</span>
								</template>
							</el-table-column>

							<el-table-column align="center" prop="rose" :label="$t('home.huobi12')">
								<template slot-scope="scope">
									<div
										:class="scope.row.rose > 0 ? 'greenColor' : 'redColor'"
										style="font-weight: 700; font-size: 14px">
										{{ scope.row.rose > 0 ? "+" : "" }}{{ scope.row.rose.toFixed(2) }}%
										<!-- <svg class="icon-gonggao" aria-hidden="true">
										<use xlink:href="#icon-shangxia"></use>
									</svg> -->
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="low" :label="$t('home.huobi14')">
								<template slot-scope="scope">
									<div style="font-weight: 700; font-size: 14px">
										{{ scope.row.low }}
										<!-- <svg class="icon-gonggao" aria-hidden="true">
										<use xlink:href="#icon-xiaji"></use>
									</svg> -->
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="high" :label="$t('home.huobi13')">
								<template slot-scope="scope">
									<div style="font-weight: 700; font-size: 14px">
										{{ scope.row.high }}
										<!-- <svg class="icon-gonggao" aria-hidden="true">
										<use xlink:href="#icon-shangji"></use>
									</svg> -->
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="count" :label="$t('home.huobi15')">
								<template slot-scope="scope">
									<div style="font-weight: 700; font-size: 14px">
										{{ scope.row.count }} {{ $t("home.huobi85") }}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="rose" :label="$t('home.huobi21')">
								<template slot-scope="scope">
									<div class="decharts" :id="`decharts${scope.$index}`"></div>
									{{ echartsInit(scope.$index, scope.row.rose) }}
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div
						class="ticker-more"
						style="
							font-weight: 700;
							font-size: 14px;
							line-height: 40px;
							text-align: center;
							margin: 20px 0 20px 0;
						">
						<a href="/#/quotation">
							<span class="text" data-lang-key="view.newHome.quotation.more">{{ $t("home.huobi23") }} ></span>
						</a>
					</div>
				</div>
			</div>

			<!--APP 下载-->
		</div>

		<div class="client_wrap">
			<div class="trans-reg content"></div>
		</div>
		<div class="new_appDownload">
			<div class="new_appDownload_container">
				<div class="new_appDownload_iphone_img"></div>
				<div class="new_appDownload_link">
					<div class="new_appDownload_link_title">
						<span class="one" style="font-size: 20px; font-weight: 700">{{
              $t("home.huobi16")
            }}</span>
					</div>
					<div class="new_appDownload_link_title">
						<br />
						<span style="font-size: 16px; font-weight: 700">{{
              $t("home.huobi17")
            }}</span>
					</div>
					<div class="new_appDownload_link_title btn">
						<a href="/#/artapp">
							<span>Apple store</span>
						</a>
						<a href="/#/artapp">
							<span>Android</span>
						</a>
						<a href="/#/artapp">
							<span>Google play</span>
						</a>
					</div>
					<div class="new_appDownload_link_qrCode">
						<div class="new_appDownload_link_qrCode_left"></div>
						<div id="qrcode" title=""></div>
					</div>
				</div>
			</div>
		</div>
		<div class="new_registered">
			<svg
				 xmlns="http://www.w3.org/2000/svg"
				 xmlns:xlink="http://www.w3.org/1999/xlink"
				 width="100%"
				 height="300">
				<g fill="rgba(157,119,255,0.5)" transform="translate(-976.065 0)">
					<path
						  d="M 0 100 Q 250 35, 500 100 T 1000 100 T 1500 100 T 2000 100 T 2500 100 T 3000 100 T 3500 100 T 4000 100 T 4500 100 T 5000 100 T 5500 100 T 6000 100 V 300 H 0 V 0"></path>
					<animateTransform
									  attributeName="transform"
									  attributeType="XML"
									  type="translate"
									  from="0"
									  to="-2000"
									  dur="10s"
									  repeatCount="indefinite"></animateTransform>
				</g>
				<g fill="rgba(157,119,255,0.3)" transform="translate(-1561.7 0)">
					<path
						  d="M 0 100 Q 400 35, 800 100 T 1600 100 T 2400 100 T 3200 100 T 4000 100 T 4800 100 T 5600 100 T 6400 100 T 7200 100 V 300 H 0 V 0"></path>
					<animateTransform
									  attributeName="transform"
									  attributeType="XML"
									  type="translate"
									  from="0"
									  to="-3200"
									  dur="10s"
									  repeatCount="indefinite"></animateTransform>
				</g>
			</svg>
			<h4 class="reg_title color-gold" style="font-weight: 600">
				{{ $t("home.huobi35") }}
			</h4>
			<p class="ppm_cc_cursor">{{ $t("home.huobi20") }}</p>
			<div class="new_registered_input">
				<input type="text" :placeholder="$t('home.huobi40')" autocomplete="off" />
				<span>{{ $t("home.onceRe") }}</span>
			</div>
		</div>
		<Foot />
	</div>
</template>
<script>
	import QRCode from "qrcodejs2";
			import Trade from "@/components/trade";
			import Foot from "@/components/Foot";
			import { bannerApi, ticketApi, noticeApi } from "@/api/getData";
			import logosArr from "@/logoSrc/index.js";
			import echarts from "echarts";
			export default {
			  data() {
			    return {
			      pageSize: 9, //首页币种显示的数量
			      testNum: 3, //美元全球成交量数据初始值
			      bannerArr: [], //banner图
			      isToken: sessionStorage.getItem("userToken"),
			      lang: sessionStorage.getItem("language"),
			      activeName: "1",
			      tableData: [],
			      backgroundColor: "transparent",
			      background: "transparent",
			      noticeArr: [], //公告列表,
            timer:null
			    };
			  },
			  created() {
			    noticeApi({}).then((r) => {
			      this.noticeArr = r.data.records.slice(0, 5); //控制公告仅显示4条
			    });
			    // console.log(logosArr)
			    this.randomNum();

			    var data = new URLSearchParams();
			    data.set("type", this.activeName);
			    if(this.timer == null){
			      this.timer = setInterval(() => {
              ticketApi(data).then((res) => {
                let datas = res.data.slice(0, this.pageSize);
                for (let i of datas) {
                  for (let j of logosArr) {
                    if (i.symbol == j.name) {
                      i.symbolLogo = j.logo;
                      break;
                    }
                  }
                }
                this.tableData = datas;
              });
            }, 2000);
          }

			  },
			  beforeDestroy() {
			    this.backgroundColor = "#171b2b";
			    this.background = "#171b2b";
			    let content_div = document.querySelector(".content_div");
			    let head_div = document.querySelector(".head_div");
			    content_div.style.top = "48px";
			    head_div.style.backgroundColor = this.backgroundColor;
			    head_div.style.background = this.background;
          this.timer = clearInterval(this.timer)
        },
			  destroyed() {
			    let content_div = document.querySelector(".content_div");
			    let head_div = document.querySelector(".head_div");
			    window.onscroll = () => {
			      let top = document.documentElement.scrollTop;
			      this.backgroundColor = "#171b2b";
			      this.background = "#171b2b";
			      head_div.style.backgroundColor = this.backgroundColor;
			      head_div.style.background = this.background;
			    };
			  },
			  mounted() {
			    this.backgroundColor = "transparent";
			    this.background = "transparent";
			    let content_div = document.querySelector(".content_div");
			    let head_div = document.querySelector(".head_div");
			    content_div.style.top = 0;
			    head_div.style.background = this.background; //transparent表示透明色
			    head_div.style.backgroundColor = this.backgroundColor;

			    window.onscroll = () => {
			      let top = document.documentElement.scrollTop;
			      if (top > 50) {
			        //顶部导航下拉填充
			        this.backgroundColor = "#171b2b";
			        this.background = "#171b2b;";
			        head_div.style.backgroundColor = this.backgroundColor;
			        head_div.style.background = this.background;
			      } else {
			        this.backgroundColor = "transparent";
			        this.background = "transparent";
			        head_div.style.background = this.background; //transparent表示透明色
			        head_div.style.backgroundColor = this.backgroundColor;
			      }
			    };

			    this.bannerFun();
			    this.qrcodeFun();
			  },

			  // mounted(){
			  //     this.bannerFun();
			  //     this.qrcodeFun()
			  // },
			  methods: {
			    echartsInit(index, rose) {
			      var base = +new Date(1988, 9, 3);
			      var oneDay = 24 * 3600 * 1000;
			      var eColor = rose > 0 ? "#2ead659c" : "#e35e5e9e"; //上涨就是冒号：前面的颜色(最顶端的颜色)，下跌就是后面的颜色(最底部的颜色)
			      var data = [[base, Math.random() * 300]];
			      for (var i = 1; i < 10; i++) {
			        //这里这个5，就是走图的线，数字越大，表示绘画的点数越多，数字越小表示绘画越小
			        var now = new Date((base += oneDay));
			        data.push([
			          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
			          Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]),
			        ]);
			      }
			      let option = {
			        grid: {
			          top: 0,
			          bottom: 0,
			          left: 0,
			          right: 0,
			        },
			        xAxis: {
			          type: "time",
			          boundaryGap: false,
			          show: false,
			        },
			        yAxis: {
			          type: "value",
			          boundaryGap: [0, "100%"],
			          show: false,
			        },
			        series: [
			          {
			            // name: '模拟数据',
			            type: "line",
			            // smooth: true,
			            symbol: "none",
			            areaStyle: {
			                color: {
			                    type: 'linear',
			                    x: 0,
			                    y: 0,
			                    x2: 0,
			                    y2: 1,
			                    colorStops: [{
			                    offset: 0,  color: eColor  // 100% 处的颜色
			                    }, {
			                    offset: 1, color: '#FFF' //   0% 处的颜色
			                    }],
			                    global: false // 缺省为 false
			                }
			            },
			            lineStyle: {
			              color: eColor,
			            },
			            data: data,
			          },
			        ],
			      };
			      this.$nextTick(() => {
			        let myChart = echarts.init(document.getElementById(`decharts${index}`));
			        myChart.setOption(option);
			      });
			    },
			    randomNum() {
			      let rand = Math.ceil(Math.random() * 6); //美元全球成交量初始数据值
			      setInterval(() => {
			        this.testNum += rand;
			      }, 1000);
			    },
			    handleClick() {},
			    async qrcodeFun() {
			      //获取下载app的地址
			      var that = this;
			      // appDown(function(res){
			      new QRCode("androidDown", {
			        width: 100,
			        height: 100,
			        text: "https://mobile.bikohuobian.com/download.html",
			      });

			      new QRCode("iosDown", {
			        width: 100,
			        height: 100,
			        text: "https://mobile.bikohuobian.com/download.html",
			      });
			      // });
			    },
			    async bannerFun() {
			      //banner图
			      var that = this;
			      var data = new URLSearchParams();
			      data.set("showType", "PC");
			      var res = await bannerApi(data);
			      that.bannerArr = [];
			      if (res.code == 200) {
			        that.bannerArr = res.data;
			      }
			    },
			    checkPair() {
			      if (this.activeName == "1") {
			        this.$router.push("/transactionTrade");
			      } else {
			        this.$router.push("/currencyTrade");
			      }
			    },
			    jumpRegister() {
			      this.$router.push("/register");
			    },
			  },
			  components: {
			    Trade,
			    Foot,
			  },
			};
</script>
<style lang="less">
	.d_notice_item {
			  font-size: 14px;
			  color: #5e6173;
			  line-height: 30px;
			}
			.d_notice_split {
			  padding: 0 20px;
			}
			.decharts {
			    width: 120px;
				height: 50px;
				padding: 0px 0;
				min-width: 0;
				position: relative;
				padding-left: 55px;
			}
			.symbolBox {
			  display: flex;
			  align-items: center;
			  justify-content: center;
			  img {
			    width: 24px;
			    height: 24px;
			    margin-right: 18px;
				border-radius: 30px;
				background-color: #ffffff;
			  }
			}
			.greenColor {
			  color: #2ead65;
			  font-weight: 700;
			  font-size: 14px;
			}
			.redColor {
			  color: #e35e5e;
			  font-weight: 700;
			  font-size: 14px;
			}
			.home_div {
			  //轮播图
			  .block {

			    

			    a {
			      display: inline-block;
			      width: 100%;
			      height: 100%;
			      .imgFull {
			        object-fit: cover;
					    border-radius: 10px;
			      }
			    }
			    .el-carousel__arrow {
			      background: rgba(0, 0, 0, 0) !important;
			      height: 60px;
			      width: 30px;
			      border-radius: 2%;
			      & > i {
			        color: #ffffffa8;
			        font-weight: inherit;
			        font-size: 0px !important;
			      }
			    }
			    .el-carousel__indicators{
					bottom: 80px !important;
					background-color:transparent;
					border-radius: 4px;
					overflow: hidden;
					.el-carousel__indicator--horizontal{
						padding: 0;
						border-radius: 0px;
						width: 40px;
						margin: 0 8px;
						background: rgba(0, 0, 0, .3);
					}
					.el-carousel__indicator{
						opacity: .2;
                        background: #fff;
						height: 4px;
						&:nth-child(1){
							border-radius:4px 4px 4px 4px;
						}
						&:nth-last-child(1){
							border-radius:4px 4px 4px 4px;
						}
					}
					.el-carousel__button{
						background-color: transparent;
					}
					.el-carousel__indicator.is-active{
						opacity: .8;
						background: #fff;
					}
			    }
			  }
			  .market {
			    .container {
			      h2 {
			        margin-right: 30px;
			        font-weight: inherit;
			      }
			      .market_title {
			        margin: 50px 0 20px 0;
			        justify-content: center;
			        .el-tabs__header {
			          margin: 0;
			        }
			        .el-tabs__item {
			          color: #9b9da5 !important;
			          float: left;
			          text-align: center;
			          margin-left: 4px;
			          height: 44px;
			          border-radius: 4px;
			          font-size: 16px;
			          line-height: 44px;
			          padding: 0 16px;
			          /* -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12); */
			          /* box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12); */
			          /* background: #f6f7ff;*/
			        }

			        .el-button--default {
			          color: #6977b1 !important;
			          float: left;
			          text-align: center;
			          margin-left: 4px;
			          height: 44px;
			          border-radius: 4px;
			          font-size: 16px;
			          line-height: 44px;
			          padding: 0 16px;
			          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
			          border: 1px solid #b9c1e2;
			          span {
			            color: #7b83a2;
			          }
			        }
			      }
			    }
			  }
			  .article {
			    h2 {
			      margin: 40px 0;
			      font-size: 28px;
			      font-weight: inherit;
			    }
			    .article_box {
			      ul {
			        display: flex;
			        flex-direction: row;
			        li {
			          width: 33%;
			          margin-right: 28px;
			          text-align: center;
			          padding: 0 22px;
			          &:nth-last-child(1) {
			            margin: 0;
			          }
			          p {
			            font-size: 18px;
			            line-height: 40px;
			            border-bottom: 1px solid #3c3c3c;
			          }
			          span {
			            font-size: 12px;
			            color: #8e8e8e;
			          }
			          img {
			            width: 260px;
			          }
			        }
			      }
			    }
			  }
			  .downloadBox {
			    padding: 0px 0;
			    background-color: #ffffff;
			    margin: 50px 0;
			    h2 {
			      line-height: 1;
			      text-shadow: 0px 2px 3px rgb(212, 212, 212);
			      font-size: 28px;
			      text-align: center;
			      color: #60656b;
			      font-weight: inherit;
			    }
			    .vertical {
			      margin: 0px 0 0 60px;
			      .downImg {
			        background-color: #ffffff;
			        padding: 4px;
			        margin-left: 6px;
			        transition: all 1s ease-out;
			        -webkit-transition: all 1s ease-out;
			        -moz-transition: all 1s ease-out;
			        -o-transition: all 1s ease-out;
			        z-index: 1;
			        background: #fff;
			        outline: 1px solid #2483ff;
			        &:hover {
			          transform: scale(1.5);
			          -webkit-transform: scale(1.5);
			          -moz-transform: scale(1.5);
			          -o-transform: scale(1.5);
			        }
			      }
			    }
			    .verticalBox {
			      width: 520px;
			      margin: 30px auto;
			    }
			  }

			  .feature_wrap .feature_list[data-v-63c57342] {
			    padding-top: 73px;
			    width: 70%;
			    margin: 0 auto;
			  }
			  .feature_wrap .feature_list li div[data-v-63c57342] {
			    font-size: 0;
			    margin-bottom: 70px;
			    height: 53px;
			  }

			  .feature_wrap .feature_list li[data-v-63c57342] {
			    float: left;
			    width: 33%;
			    background: transparent none no-repeat top;
			    padding-top: 0;
			  }

			  .feature_wrap .feature_list li div[data-v-63c57342] {
			    font-size: 0;
			    margin-bottom: 70px;
			    height: 53px;
			  }

			  .feature_wrap .feature_list li p.title[data-v-63c57342] {
			    color: #1c242c;
			    font-size: 18px;
			    font-weight: 400;
			    margin-bottom: 10px;
			  }

			  .feature_wrap .feature_list li p[data-v-63c57342] {
			    font-size: 14px;
			    color: #54748f;
			    line-height: 28px;
			  }

			  .feature_wrap .feature_list li p[data-v-63c57342] {
			    font-size: 14px;
			    color: #54748f;
			    line-height: 28px;
			  }

			  .feature_wrap h2[data-v-63c57342] {
			    font-size: 28px;
			    margin-bottom: 50px;
			    font-weight: 600 !important;
			  }

			  .feature_wrap h2 b {
			    padding: 0 10px;
			    color: #3f51b5 !important;
			  }

			  .home_div .table {
			    width: 1200px;
			    margin: 50px auto;
			  }
			  .client_wrap .wrap_in[data-v-46167268] {
			    -webkit-box-sizing: border-box;
			    box-sizing: border-box;
			    height: 800px;
			    padding-top: 30px;
			    width: 1200px;
			    margin: 0 auto;
			    background-size: cover;
			  }

			  .client_wrap .block_title[data-v-46167268] {
			    font-size: 30px;
			    margin-bottom: 22px;
			    color: #575d79;
			  }
			  .client_wrap[data-v-46167268] {
			    width: 100%;
			    color: #4b5775 !important;
			    text-align: center !important;
			    line-height: 2em !important;

			    //background-image: url(../assets/downbg.png);
			    //background-color: #251746;
			  }

			  .client_wrap .sub_title[data-v-46167268] {
			    font-size: 16px;
			    margin-bottom: 60px;
			  }
			  .client_wrap ul[data-v-46167268] {
			    max-width: 260px;
			    display: -webkit-box;
			    display: -ms-flexbox;
			    display: flex;
			    text-align: left;
			    -webkit-box-pack: center;
			    -ms-flex-pack: center;
			    justify-content: center;
			    -webkit-box-orient: vertical;
			    -webkit-box-direction: normal;
			    -ms-flex-direction: column;
			    flex-direction: column;
			    float: left;
			    margin-left: 52px;
			    margin-top: -36px;
			  }

			  .home_div .client_wrap #moons_mind[data-v-46167268] {
			    width: 1200px;
			    margin: 0 26px 0 0;
			    position: relative;
			    float: right;
			  }

			  .can_animate {
			    -webkit-animation: slideup 0.3s;
			    animation: slideup 0.3s;
			  }

			  .client_wrap ul[data-v-46167268] {
			    max-width: 260px;
			    display: -webkit-box;
			    display: -ms-flexbox;
			    display: flex;
			    text-align: left;
			    -webkit-box-pack: center;
			    -ms-flex-pack: center;
			    justify-content: center;
			    -webkit-box-orient: vertical;
			    -webkit-box-direction: normal;
			    -ms-flex-direction: column;
			    flex-direction: column;
			    float: left;
			    margin-left: 52px;
			    margin-top: -36px;
			  }

			  .client_wrap ul li a[data-v-46167268] {
			    min-width: 172px;
			    height: 64px;
			    display: block;
			    color: #f2f6fa;
			    padding: 16px 10px;
			    line-height: 32px;
			    position: relative;
			    font-size: 14px;
			    -webkit-box-sizing: border-box;
			    box-sizing: border-box;
			    border: 1px solid transparent;
			    border-radius: 2px;
			    overflow: hidden;
			    white-space: nowrap;
			    -o-text-overflow: ellipsis;
			    text-overflow: ellipsis;
			  }

			  .client_wrap ul li i[data-v-46167268] {
			    display: inline-block;
			    height: 32px;
			    width: 32px;
			    margin: 0 10px 0 0;
			    text-align: center;
			    vertical-align: top;
			    border-radius: 50%;
			    background: #fff;
			    padding-top: 3px;
			    position: relative;
			    overflow: hidden;
			  }

			  .client_wrap ul li a.download i img.icon[data-v-46167268] {
			    top: 50%;
			    -webkit-transform: translateY(-50%);
			    -ms-transform: translateY(-50%);
			    transform: translateY(-50%);
			  }

			  .client_wrap ul li a.download i img[data-v-46167268] {
			    position: absolute;
			    left: 9px;
			    -webkit-transition: top 0.5s;
			    -o-transition: top 0.5s;
			    transition: top 0.5s;
			  }

			  .client_wrap ul li.qr div[data-v-46167268] {
			    position: relative;
			    z-index: 1;
			    width: 172px;
			    height: 172px;
			    background: #fff;
			    border: 10px solid #2d448b;
			    outline: 1px solid #2483ff;
			  }
			  .client_wrap ul li[data-v-46167268] {
			    min-width: 172px;
			    font-size: 18px;
			    margin-bottom: 8px;
			  }

			  .client_wrap ul li[data-v-46167268] {
			    min-width: 172px;
			    font-size: 18px;
			    margin-bottom: 8px;
			  }

			  .client_wrap #moons_mind .mac[data-v-46167268] {
			    width: 876px;
			    height: 480px;
			    border-radius: 3px 3px 0 0;
			    position: relative;
			    float: right;
			  }
			  .client_wrap #moons_mind.load .mac div img[data-v-46167268] {
			    width: 100%;
			    height: 100%;
			  }

			  .client_wrap #moons_mind .phone[data-v-46167268] {
			    right: 370px;
			    bottom: 1056px;
			    width: 122px;
			    height: 253px;
			    background: none no-repeat 50% / cover;
			  }

			  .register_wrap[data-v-2bd6cbe3] {
			    //height: 300px;
			    width: 100%;
			    display: -webkit-box;
			    display: -ms-flexbox;
			    display: flex;

			    background: #fff;
			    -webkit-box-align: center;
			    -ms-flex-align: center;
			    align-items: center;
			    -webkit-box-pack: center;
			    -ms-flex-pack: center;
			    justify-content: center;
			    -webkit-box-orient: vertical;
			    -webkit-box-direction: normal;
			    -ms-flex-direction: column;
			    flex-direction: column;
			  }

			  .register_wrap .block_title[data-v-2bd6cbe3] {
			    text-align: center;
			    color: #ffffff !important;
			    margin-top: -410px !important;
			    z-index: 9 !important;
			    max-width: 100% !important;
			    font-size: 34px !important;
			    line-height: 52px !important;
			    font-weight: 600 !important;
			  }

			  .register_wrap .input_wrap[data-v-2bd6cbe3] {
			    margin-top: 0px;
			    display: -webkit-box;
			    display: -ms-flexbox;
			    display: flex;
			    z-index: 9;
			  }

			  .register_wrap input[data-v-2bd6cbe3] {
			    width: 300px !important;
			    height: 52px !important;
			    font-size: 14px !important;
			    color: #000 !important;
			    border: 1px solid #bdced9 !important;
			    border-radius: 4px !important;
			    padding-left: 16px !important;
			    -webkit-box-sizing: border-box !important;
			    box-sizing: border-box !important;
			  }

			  .register_wrap button[data-v-2bd6cbe3] {
			    margin-left: 8px !important;
			    display: inline-block !important;
			    height: 52px !important;
			    padding: 0 0px !important;
			    font-size: 18px !important;
			    min-width: 120px !important;
			    -webkit-appearance: none !important;
			    background-color: #0066ed !important;
			    color: #fff !important;
			    border: none;
			    outline: none;
			    border-radius: 4px !important;
			    -webkit-transition: background-color 0.2s;
			    -o-transition: background-color 0.2s;
			    transition: background-color 0.2s;
			  }

			  .partner {
			    h2 {
			      margin: 40px 0;
			      font-size: 28px;
			      font-weight: inherit;
			    }
			    ul {
			      display: flex;
			      display: -webkit-flex;
			      justify-content: space-between;
			      flex-direction: row;
			      flex-wrap: wrap;
			    }
			    li {
			      width: 33%;
			      margin-bottom: 40px;
			      a {
			        width: 320px;
			        text-align: center;
			        display: inline-block;
			        cursor: pointer;
			        img {
			          border-radius: 2px;
			          height: 120px;
			        }
			        p {
			          color: #ffffff;
			        }
			      }
			    }
			  }
			}
</style>

<style lang="scss" scoped>
	.trans-reg {
			  padding: 0px 0;
			  background-color: #ffffff;
			}
			.terrace_tips {
			  text-align: center;
			  p {
			    color: #a8a8a8;
			    height: 50px;
			    line-height: 50px;
			    margin-top: 0px;
			    padding: 0 15px;
			  }
			  .reg_title {
			    color: #232a4a;
			    font-size: 30px;
			    line-height: 1;
			  }
			}
			.condata_box {
			  color: #ffffff;
			  text-align: center;
			  display: flex;
			  border-top: 1px solid #cad7e0;
			  background: #fff;
			  h3 {
			    font-size: 24px;
			    line-height: 45px;
			  }
			  p {
			    background: rgba(223, 198, 159, 0.2);
			    height: 30px;
			    line-height: 30px;
			  }
			}
			.mt50 {
			  margin-top: 50px;
			}
			.reg_tips {
			  p {
			    color: #787878;
			    line-height: 80px;
			    text-align: center;
			    font-size: 18px;
			  }
			}
			.reg_input {
			  display: flex;
			  justify-content: center;
			  input {
			    width: 480px;
			    height: 48px;
			    font-size: 16px;
			    color: #000;
			    border: 1px solid #bdced9;
			    border-radius: 2px;
			    padding-left: 16px;
			  }
			  button {
			    width: 120px;
			    background: #357ce1;
			    color: #ffffff;
			    display: block;
			    height: 48px;
			    margin-left: 15px;
			  }
			}
</style>
<style lang="scss" scoped>
	.down_temp {
			  padding: 40px 0;
			}
			.terrace_tips {
			  text-align: center;
			  padding-top: 0px;
			  margin-bottom: 0px;
			  p {
			    color: #ffffff;
			    height: 50px;
			    line-height: 50px;
			    font-size: 36px;
			    padding: 0 15px;
			  }
			  .do_title {
			    color: #b7c5db;
			    padding: 15px 0;
			    font-size: 18px;
			  }
			}
			.downbox {
			  cursor: pointer;
			  .flex {
			    display: flex;
			    align-items: center;
			  }
			  .btn {
			    color: #ffffff;
			  }
			  .m-top-40 {
			    margin-top: 40px;
			  }
			  .m-left-50 {
			    margin-left: 30px;
			  }
			  .downbtn {
			    img {
			      width: 200px;
			    }
			  }
			}
			.leftimg {
			  img {
			    position: absolute;
			    width: 600px;
			    top: -12px;
			    bottom: 4px;
			    z-index: 1;
			    margin-left: 100px;
			  }
			}
			.qrimgbox {
			  cursor: pointer;
			}
			.img_none {
			  width: 220px;
			  margin-top: 110px;
			  margin-left: 0px;
			  .qr-code {
			    width: 180px;
			    height: 180px;
			    margin: 0 auto;
			    background: rgba(58, 118, 204, 0.14);
			    border: 1px solid rgba(58, 118, 204, 1);
			    border-radius: 4px;
			    padding: 15px;
			    img {
			      width: 180px;
			      margin: 20px !important;
			    }
			  }
			  .d_bottip {
			    width: 220px;
			    color: #d5def2;
			    line-height: 50px;
			    font-size: 14px;
			    text-align: center;
			  }
			}
			// appicon
			.btn_cor {
			  width: 220px;
			  height: 64px;
			  border-radius: 4px;
			  justify-content: center;
			  align-items: center;
			  i {
			    font-size: 24px;
			  }
			  p {
			    font-size: 18px;
			    text-align: center;
			    padding-left: 5px;
			  }
			}
			.btn_cor:hover {
			  background: linear-gradient(90deg, rgba(58, 118, 204, 1), rgba(75, 145, 246, 1));
			  color: #3a76cc;
			  border: 1px solid #3a76cc;
			  transition: all 2s linear;
			}
			.zbg_index .new_registered {
			  height: 350px;
			  background-color: #3f2482;
			  position: relative;
			  z-index: 2;
			  display: -webkit-flex;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  flex-direction: column;
			  color: #fff;
			}

			.new_registered .new_registered_input span {
			  display: inline-block;
			  height: 42px;
			  line-height: 42px;
			  width: 120px;
			  text-align: center;
			  background-color: #0066ed;
			  -webkit-border-radius: 3px;
			  -moz-border-radius: 3px;
			  border-radius: 3px;
			  margin-left: 10px;
			  cursor: pointer;
			}
			.new_registered .new_registered_input input {
			  height: 40px;
			  line-height: 40px;
			  width: 420px;
			  font-size: 14px;
			  border-radius: 4px;
			  border: none;
			  padding-left: 15px;
			  border: 1px solid #c1c1c1 !important;
			}
			.new_registered {
			  height: 500px;
			  //background: linear-gradient(359.57deg,#24c 3.55%,#08269d 99.56%);
			  position: relative;
			  z-index: 2;
			  display: -webkit-flex;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  flex-direction: column;
			  color: #fff !important;
			}
			.new_registered svg {
			  position: absolute;
			  bottom: 500px;
			  z-index: 1;
			}
			.new_registered .new_registered_input {
			  z-index: 2;
			}

			.new_appDownload .new_appDownload_container .new_appDownload_link {
			  width: 380px;
			}
			.new_appDownload .new_appDownload_container {
			  height: 100%;
			  width: 1200px;
			  margin: 0 auto;
			  display: flex;
			  display: -webkit-flex;
			  align-items: center;
			  justify-content: space-between;
			}
			.new_appDownload
			  .new_appDownload_container
			  .new_appDownload_link
			  .new_appDownload_link_title.btn {
			  font-size: 13px;
			  font-weight: normal;
			  margin-top: 50px;
			}
			.new_appDownload
			  .new_appDownload_container
			  .new_appDownload_link
			  .new_appDownload_link_title {
			  color: #dbdbdc;
			  font-size: 28px;
			  font-weight: 500;
			  display: -webkit-flex;
			  display: flex;
			  flex-wrap: wrap;
			  justify-content: space-between;
			}
			.new_appDownload
			  .new_appDownload_container
			  .new_appDownload_link
			  .new_appDownload_link_title.btn {
			  font-size: 13px;
			  font-weight: normal;
			  margin-top: 50px;
			}
			.new_appDownload
			  .new_appDownload_container
			  .new_appDownload_link
			  .new_appDownload_link_title.btn
			  a {
			  height: 35px;
			  padding: 0 20px;
			  -webkit-border-radius: 3px;
			  -moz-border-radius: 3px;
			  border-radius: 50px;
			  border: 1px solid #c1c1c15c;
			  color: #dbdbdc;
			  line-height: 31px;
			  text-align: center;
			  margin-top: 10px;
			  font-weight: 700;
			}
			.new_appDownload
			  .new_appDownload_container
			  .new_appDownload_link
			  .new_appDownload_link_qrCode {
			  display: flex;
			  display: -webkit-flex;
			  justify-content: space-between;
			  margin-top: 50px;
			  color: #5d31cf;
			}
			.new_appDownload
			  .new_appDownload_container
			  .new_appDownload_link
			  .new_appDownload_link_qrCode
			  .new_appDownload_link_qrCode_left {
			  flex: 1;
			  font-size: 12px;
			  text-align: end;
			}
			.new_appDownload
			  .new_appDownload_container
			  .new_appDownload_link
			  .new_appDownload_link_qrCode
			  .new_appDownload_link_qrCode_left
			  p:nth-child(2) {
			  margin-top: 20px;
			  cursor: pointer;
			}
			.new_appDownload
			  .new_appDownload_container
			  .new_appDownload_link
			  .new_appDownload_link_qrCode
			  #qrcode {
			  width: 100px;
			  margin-left: 38px;
			}
			.new_appDownload
			  .new_appDownload_container
			  .new_appDownload_link
			  .new_appDownload_link_qrCode
			  #qrcode {
			  width: 100px;
			  margin-left: 38px;
			}
			.new_appDownload
			  .new_appDownload_container
			  .new_appDownload_link
			  .new_appDownload_link_qrCode {
			  display: flex;
			  display: -webkit-flex;
			  justify-content: space-between;
			  margin-top: 50px;
			  color: #5d31cf;
			}




			.container {
			  //width: 70.5%;
			  //background: #fff;
			  //-webkit-box-shadow: 0 0 40px 0 rgba(131,136,152,.25);
			  //box-shadow: 0 0 40px 0 rgba(131,136,152,.25);
			  border-radius: 9px;
			  display: -webkit-box;
			  display: -ms-flexbox;
			  display: flex;
			  -webkit-box-orient: vertical;
			  -webkit-box-direction: normal;
			  -ms-flex-direction: column;
			  flex-direction: column;
			}
			
			.tzgg {
				width: 18px;
				height: 18px;
				position: relative;
				top: 3px;
				left: -4px;

			}







































			.home-main .buy-coin-box {
    display: -webkit-box;
    display: flex;
    
    position: relative;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    width: 343px;
    z-index: 2;
}

.home-main .buy-coin-box .ok-tip {
    position: relative
}



.home-main .buy-coin-box .buy-input-box .buy-input {
    background-color: #fff;
    border-radius: 4px 0 0 4px;
    color: #000;
    font-size: 14px;
    font-weight: 400;
    height: 50px;
    line-height: 16px;
    min-width: 100px;
    padding: 0 20px;
    width: 223px;
}


.home-main .buy-coin-box .buy-coin-btn {
    background-color: #004cff;
    border-radius: 0 4px 4px 0;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    height: 52px;
    -webkit-transition: all .25s;
    transition: all .25s;
    width: 120px
}

.home-main .buy-coin-box .buy-coin-btn:hover {
    background-color: #2660ff
}



.home-main .home-top {
    background: linear-gradient(180deg,#110a26,#24254c);
	/*background: url(../assets/9342DD6E8A854864.png) no-repeat 100%;*/
    height: 738px;
    overflow: hidden;
    position: relative;
}

.home-main .home-top .home-bg {
    /*background: url(../assets/9342DD6E8A854864.png) no-repeat 100%;*/
    background-size: 1059px 100%;
    height: 690px;
    position: absolute;
    right: 0;
    top: 48px;
    width: 1440px;
}

.home-main .home-top .home-bg .home-bg-father {
    height: 100%;
    position: relative;
    width: 100%
}

.home-main .home-top .home-bg .home-bg-main {
    background: url(../assets/6C42583C0DB5F1F5.png) no-repeat;
    background-size: 100% 100%;
    height: 690px;
    position: absolute;
    right: -250px;
    top: 0;
    width: 602px;
}



.home-main .home-top .home-text-box .home-title {
    color: #fff;
    font-size: 44px;
    font-weight: 700;
    line-height: 58px
}

.home-main .home-top .home-text-box .home-subtitle {
    color: #9eb6f9;
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    margin-top: 24px
}



@media (min-width: 1024px) {
    .home-main .home-top .home-banner-bg {
        padding-bottom:183px;
        padding-top: 130px
    }

    .home-main .home-top .home-text-box {
        width: 1000px
    }

    .home-main .home-top .home-text-box .home-title {
        font-size: 34px;
        line-height: 75px
    }

    .home-main .home-top .home-text-box .home-subtitle {
        font-size: 20px;
        line-height: 34px
    }
}

@media (min-width: 1024px) and (min-width:768px) {
    .home-main .home-top .main-container {
        -webkit-box-sizing:border-box;
        box-sizing: border-box;
        padding-left: 223px;
        padding-right: 12px;
        width: 83.33333333%
    }
}



















@media (min-width: 1441px) {
    .home-main .home-top .home-bg {
        -webkit-box-pack:center;
        display: -webkit-box;
        display: flex;
        justify-content: center;
        right: 0;
        -webkit-transform: translateX(0);
        transform: translateX(0);
        width: 92%
    }

    .home-main .home-top .home-bg .home-bg-father {
        width: 1059px
    }

}


















</style>

<style>

.trade-banner {
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: 0 auto;
    margin-top: 40px;
}
.trade-banner .trade-banner-item {
    width: 282px;
}
.trade-banner .trade-banner-item .trade-banner-pic {
    display: block;
    width: 100%;
    border-radius: 8px;
}
.trade-banner .trade-banner-item .trade-banner-info {
    margin-top: 24px;
}

</style>
