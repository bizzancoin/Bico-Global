<template>
	<div class="head_start">
		<div class="head_div">
			<div>
				<div class="fedui-header-pc">
					<el-col :xs="24" :sm="24" :md="16" :lg="16">
						<div class="left_nav" style="margin-left: 0px; width: 100%; margin-top: 6px">
							<div class="logo_img" @click="comeback">
								<div class="fedui-header-group">
									<div class="fedui-header-group-inner">
										<i class="fedui-header-group-icon fedui-theme-text"></i>
									</div>
									<div class="fedui-header-group-dropdowns">
										<dl class="fedui-header-group-left">

											<dt>{{ $t("home.huobi24") }}</dt>
											<dd>
												<a data-type="global" href="/">{{ $t("home.huobi25") }}</a>
											</dd>
											<dd>
												<a data-type="kr" rel="noopener noreferrer nofollow" href="/">{{ $t("home.huobi26") }}</a>
											</dd>
											<dd>
												<a data-type="jp" rel="noopener noreferrer nofollow" href="/" data-ha-click='{"eventId": 5753}'>{{ $t("home.huobi27") }}</a>
											</dd>
										</dl>
										<dl class="fedui-header-group-right">
											<dt class="fedui-line-1">{{ $t("home.huobi28") }}</dt>

                      <dd>
												<a
												   href="/#/upcoinForm"
												   rel="noopener noreferrer nofollow"
												   data-type="pow">{{ $t("home.huobi29") }}</a>
											</dd>
                      <dd>
                        <a
                          href="/#/upLoanForm"
                          rel="noopener noreferrer nofollow"
                          data-type="pow">{{ $t("bico.W323") }}</a>
                      </dd>
											<dd>
												<a
												   rel="noopener noreferrer nofollow"
												   data-type="chat"
												   href="/#/lcsx">{{ $t("home.licaishengxi") }}</a>
											</dd>
											<dd>
												<a
												   data-type="wallet"
												   rel="noopener noreferrer nofollow"
												   href="/#/currencyTrade">{{ $t("home.coin") }}</a>
											</dd>
											<dd>
												<a
												   href="/#/transactionTrade "
												   data-type="cn"
												   rel="noopener noreferrer nofollow">{{ $t("home.huobi30") }}</a>
											</dd>
											<dd>
												<a
												   data-type="capital"
												   href="/#/contact">{{ $t("home.huobi31") }}</a>
											</dd>
											<dd>
												<a
												   href="/#/newSymbol"
												   class=""
												   data-type="eco">{{ $t("home.huobi32") }}</a>
											</dd>

											<dd>
												<a
												   href="/#/starchainminer"
												   class=""
												   data-type="eco">{{ $t("bico.W206") }}</a>
											</dd>

											<dd>
												<a
												   data-type="chain"
												   rel="noopener noreferrer nofollow"
												   href="/#/option">{{ $t("home.qiquanheyue") }}</a>
											</dd>
											<dd>
												<a
												   data-type="defilabs"
												   rel="noopener noreferrer nofollow"
												   href="javascript:swal('','Hi, this service is not open yet. Please wait','');">{{ $t("home.huobi34") }}</a>
											</dd>
										</dl>
									</div>
								</div>
								<!-- <img src="../assets/logo_txt.png" alt="" /> -->
								<h1 class="fedui-header-logo">
									<a href="/#/"></a>
								</h1>
							</div>
							<!--导航内部开始-->

							<nav class="fedui-header-nav">

								<!--行情-->
								<a href="/#/quotation">
									<span>{{ $t("home.quotation") }}</span>
								</a>

								<!--法币交易-->
								<div class="fedui-header-menu">
									<div class="fedui-header-menu-text fedui-theme-text">
										<span>{{ $t("nav.currency") }}</span>
										<i class="icon iconfont icon-ic_arrow"></i>
									</div>
									<div class="fedui-header-menu-dropdowns">
										<a data-new="true" href="/#/legalCoin"> {{ $t("legal.buy") }} </a>
										<!--我购买-->
										<a data-new="true" href="/#/sell"> {{ $t("legal.sell") }} </a>
										<!--我要出售-->
										<a data-new="true" href="/#/acceptor">
											{{ $t("legal.acceptorsj") }}
										</a>
										<!--商家承兑-->
										<a data-new="true" href="/#/legalOrder">
											{{ $t("legal.jiaoyidongtai") }}
										</a>
										<!--交易动态-->
									</div>
								</div>


								<div class="fedui-header-menu">
									<div class="fedui-header-menu-text fedui-theme-text">
										<span>{{ $t("home.xianhuo") }}</span>
										<!--现货交易-->
										<i class="icon iconfont icon-ic_arrow"></i>
									</div>
									<div class="fedui-header-menu-dropdowns">
										<!--a data-new="true"  href="/#/legalTrastion">{{$t('home.coin')}} </a-->
										<!--币币交易-->
										<!-- <a data-new="true" href="/#/exchgtrade">{{ $t("home.coin") }} </a> -->
										<a data-new="true" href="/#/currencyTrade">{{ $t("home.coin") }} </a>
										<!--币币交易-->
										<!-- <a
										data-new="true"
										href="javascript:swal('','Hi, this service is not open yet. Please wait','');"
										>{{ $t("home.gangganjiaoyi") }}
										</a> -->
										<!--杠杆交易-->
										<!-- <a
										data-new="true"
										href="javascript:swal('','Hi, this service is not open yet. Please wait','');"
										>{{ $t("home.celuejiaoyi") }}
										</a> -->
										<!--策略交易-->
										<!-- <a
										data-new="true"
										href="javascript:swal('','Hi, this service is not open yet. Please wait','');"
										>{{ $t("home.dazongjiaoyi") }}
										</a> -->
										<!--大宗交易-->
									</div>
								</div>

								<div class="fedui-header-menu">
									<div class="fedui-header-menu-text fedui-theme-text">
										<span>{{ $t("home.heyuejiaoyi") }}</span>
										<!--合约交易-->
										<i class="icon iconfont icon-ic_arrow"></i>
									</div>
									<div class="fedui-header-menu-dropdowns">
										<!--a data-new="true" href="/#/transaction">{{$t('nav.contract')}} </a-->
										<!--永续合约-->
										<a data-new="true" href="/#/transactionTrade">{{ $t("nav.contract") }}
										</a>
										<!--永续合约-->
										<!-- <a
										data-new="true"
										href="javascript:swal('','Hi, this service is not open yet. Please wait','');"
										>{{ $t("home.benweiheyue") }}
										</a> -->
										<!--本位永续-->
										<!-- <a
										data-new="true"
										href="javascript:swal('','Hi, this service is not open yet. Please wait','');"
										>{{ $t("home.usdtheyue") }}
										</a> -->
										<!--USDT永续-->
									</div>
								</div>

								<div class="fedui-header-menu">
									<div class="fedui-header-menu-text fedui-theme-text">
										<span>{{ $t("home.qiquanheyue") }}</span>
										<!--期权合约-->
										<i class="icon iconfont icon-ic_arrow"></i>
									</div>
									<div class="fedui-header-menu-dropdowns">
										<a data-new="true" href="/#/option">{{ $t("nav.miaoheyue") }} </a>
										<!--期权秒合约-->
									</div>
								</div>

								<!--期货交易-->
								<!-- <div class="fedui-header-menu">
                                    <div class="fedui-header-menu-text fedui-theme-text">
                                        <span>{{$t('home.qihuojiaoyi')}}</span>
                                        <i class="icon iconfont icon-ic_arrow"></i>
                                    </div>
                                    <div class="fedui-header-menu-dropdowns">
                                        <a data-new="true" href="/#/futures">{{$t('home.qihuoyongxuheyue')}}</a>
                                    </div>
                                </div> -->

								<div class="fedui-header-menu">
									<div class="fedui-header-menu-text fedui-theme-text">
										<span>{{ $t("home.jinrongyewu") }}</span>
										<i class="icon iconfont icon-ic_arrow"></i>
									</div>
									<div class="fedui-header-menu-dropdowns">

										<!--理财生息-->
										<a data-new="true" href="/#/lcsx">{{ $t("home.licaishengxi") }}</a>

										<!--新币申购-->
										<a data-new="true" href="/#/newSymbol">{{$t("home.xinbishengou")}}</a>

										<!--云算挖矿-->
										<a data-new="true" href="/#/starchainminer">{{ $t("bico.W206") }}</a>

									</div>
								</div>

								<!--更多-->
								<div class="fedui-header-menu">
									<div class="fedui-header-menu-text fedui-theme-text">
										<span>{{$t('home.huobi23')}}</span>
										<i class="icon iconfont icon-ic_arrow"></i>
										<svg class="icon-gonggao" style="font-size: 30px; padding-left: 4px" aria-hidden="true">
											<use xlink:href="#icon-new"></use>
										</svg>
									</div>
									<div class="fedui-header-menu-dropdowns">
										<!-- 邀请好友 -->
										<a data-new="true" href="/#/invitation">{{$t('person.invite')}}</a>

										<!-- 我的团队 -->
										<!-- <a data-new="true" href="/#/agent">{{$t('bico.W30')}}</a> -->

										<!-- 每日收益 -->
										<a data-new="true" href="/#/Signin">{{$t('home.huobi89')}}</a>

										<!-- 转盘福利 -->
										<!-- <a data-new="true" href="/#/invitation">{{$t('home.huobi90')}}</a> -->

										<!-- 聊天社群 -->
										<!-- <a data-new="true" href="javaScript:return" @click="openClick">聊天社群</a> -->

									</div>
								</div>

								<!--a href="/#/assets">{{ $t("nav.person") }}</!--a-->
								<!--资产中心-->

								<!-- <a href="/#/surbhtml">请勿冲币</a> -->
								<!--系统说明-->
							</nav>
						</div>
					</el-col>



					<!-- 分割线这里开始是原始样式 -->

					<!-- 登录 注册 之前的状态-->
					<div class="fedui-header-right">
						<div class="fedui-header-userinfo" style="">
							<div class="right_nav">
								<el-menu
										 :default-active="activeIndex"
										 class="el-menu-demo"
										 mode=""
										 @select="handleNav"
										 router>
									<!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleNav" router> 这个标签加了 mode="horizontal" 导致触发闪出一个框 -->
									<!-- 登录 注册 之前的状态-->
									<div class="noTokenBox" v-if="getToken == null">
										<div class="fedui-header-nologin">
											<a
											   href="/#/login"
											   data-ha-click='{"eventId": 3}'
											   class="fedui-theme-text cc_pointer">{{ $t("nav.log") }}</a>
											<a
											   href="/#/register"
											   data-ha-click='{"eventId": 2}'
											   class="fedui-header-register fedui-theme-text">{{ $t("nav.register") }}</a>
										</div>
									</div>

									<!-- 登录 注册 之前的状态结束-->

									<!-- 登录 注册 之后的状态开始 -->

									<div class="user_box" v-else>
										<!-- user_box 判断是否登录状态，登录状态就隐藏注册登录按钮框，显示出登录状态 -->

										<div class="fedui-header-info">
											<div class="fedui-header-info-text fedui-theme-text">
												<i class="fedui-icon-info"></i>
											</div>

											<div data-level="0" data-type="1" class="fedui-header-info-dropdowns">
												<div class="fedui-header-info-dropdowns-header">
													<div class="leftSpread">
														<img
															 src="../assets/default.png"
															 style="height: 40px;border-radius: 10%;position: absolute;top: 15px;left: 14px;" />
													</div>
													<span
														  class="fedui-header-info-dropdowns-header-name fedui-line-1">{{ userName }}
													</span>
													<span
														  class="fedui-header-info-dropdowns-header-uid fedui-line-1">{{ realName }}</span>
													<span class="fedui-header-info-dropdowns-header-vip">
														<a href="/#/invitation" class="yhzx_zt">{{$t('person.invite')}}
															<i class="fedui-icon-youjiantou"></i>
														</a>
													</span>
												</div>
												<!-- 我的资产 -->
												<a href="/#/assets" class="yhzx_zt">{{$t('assets.account')}}</a>

												<!-- 我要充币 -->
												<a href="/#/assets?type=1" class="yhzx_zt">{{$t('assets.recharge')}}</a>

												<!-- 我要提币 -->
												<a href="/#/assets?type=2" class="yhzx_zt">{{$t('assets.withdraw')}}</a>

												<!-- 资产划转 -->
												<a href="/#/assets?type=3" class="yhzx_zt">{{$t('assets.transfer')}}</a>

												<!-- 资产记录 -->
												<a href="/#/assets?type=4" class="yhzx_zt">{{$t('assets.record')}}</a>

												<!-- 安全设置 -->
												<a href="/#/set" class="yhzx_zt">{{$t('person.set')}}</a>

												<!-- 我的团队 -->
												<a href="/#/agent" class="yhzx_zt">{{$t('bico.W30')}}</a>

												<!-- 用户中心 -->
												<!-- <a href="/#/users" class="yhzx_zt">用户中心</a> -->

												<!-- 身份认证 -->
												<a href="/#/person" class="yhzx_zt">
													<span>{{$t('person.verification')}}</span>
													<em class="identity">{{$t('bico.W31')}}</em>
												</a>

												<!-- 安全退出 -->
												<a class="userOUt leftSpread">
													<el-button @click="outBtn">{{ $t("user.out") }}</el-button>
												</a>
											</div>
										</div>
									</div>

									<!-- 站内信 公告段落开始 -->
									<div class="fedui-header-notice">
										<div class="fedui-header-notice-icon">
											<i class="fedui-icon-tongzhi"></i>
											<!---->
											<!---->
										</div>
										<div class="fedui-header-notice-dropdowns">
											<header>
												<h3>{{$t('bico.W32')}}</h3>
												<a href="/#/notice">{{$t('bico.W33')}} &gt;</a>
											</header>
											<div style="margin-left:10px;margin-top:10px; width: 220px; color: #0a0a0a;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" v-for="(item,index) in listArr" @click="detailFun(item)">
												{{item.title}}
												<el-divider></el-divider>
											</div>
											<!--<div class="fedui-header-notice-dropdowns-loading"></div>-->



											<!-- <footer>
                        <div class="checkbox">
                          <input type="checkbox" />
                          <i></i>
                          <span>隐藏已读</span>
                        </div>
                        <button>标为已读</button>
                      </footer> -->
										</div>
									</div>
									<!-- 站内信 公告段落结束 -->

									<!-- 扫码下载 APP 段落开始 -->
									<div class="fedui-header-download">
										<i class="fedui-icon-download"></i>
										<div class="fedui-header-download-dropdowns">
											<!-- <div class="fedui-header-download-qr cc_pointer">

												<img style="border-radius: 2px;padding: 0px 7px;height: 110px;margin-left: -8px;" src="../assets/androidImg.png">

											</div> -->
											<div class="fedui-header-download-qrtext">
												<p>{{$t('bico.W34')}}</p>
												<p>
													<strong>iOS &amp; Android</strong>
												</p>
												<a href="/#/artapp">
													{{$t('bico.W35')}}
													<i class="fedui-icon-youjiantou"></i>
												</a>
											</div>
										</div>
									</div>
									<!-- 国际化 开始 -->

									<div class="fedui-header-locales">
										<i class="fedui-icon-locale"></i>
										<div class="fedui-header-locales-dropdowns">
											<div class="fedui-header-locales-dropdowns-single">
												<div class="single-title">{{$t('bico.W36')}}</div>

												<div class="change_language">
													<el-dropdown @command="handleCommand" v-loading.fullscreen.lock="fullscreenLoading">
														<div class="d_dropDownS">
															<p>
																<a>
																	<el-dropdown-item command="en">
																		<img src="../assets/yingyu.png" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>English</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt=""/-->
																	</el-dropdown-item>
																</a>

																<a>
																	<el-dropdown-item command="jp">
																		<img src="../assets/riyu.png" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>日本语</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt="" style="display: none"/-->
																	</el-dropdown-item>
																</a>

																<a>
																	<el-dropdown-item command="zh">
																		<img src="../assets/jianti.png" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>简体中文</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt="" style="display: none"/-->
																	</el-dropdown-item>
																</a>

																<a>
																	<el-dropdown-item command="hy">
																		<img src="../assets/hanyu.png" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>한국어</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt="" style="display: none"/-->
																	</el-dropdown-item>
																</a>

																<a>
																	<el-dropdown-item command="hk">
																		<img src="../assets/xg.png" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>繁体中文</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt="" style="display: none"/-->
																	</el-dropdown-item>
																</a>

																<a>
																	<el-dropdown-item command="yn">
																		<img src="../assets/yn.jpg" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>ViệtName</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt="" style="display: none"/-->
																	</el-dropdown-item>
																</a>

																<a>
																	<el-dropdown-item command="ty">
																		<img src="../assets/ty.png" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>ภาษาไทย</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt="" style="display: none"/-->
																	</el-dropdown-item>
																</a>

																<a>
																	<el-dropdown-item command="fay">
																		<img src="../assets/faguo.png" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>Französisch</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt="" style="display: none"/-->
																	</el-dropdown-item>
																</a>

																<a>
																	<el-dropdown-item command="dy">
																		<img src="../assets/deguo.png" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>Deutsch</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt="" style="display: none"/-->
																	</el-dropdown-item>
																</a>

																<a>
																	<el-dropdown-item command="ydly">
																		<img src="../assets/ydl.png" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>Italienisch</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt="" style="display: none"/-->
																	</el-dropdown-item>
																</a>

																<a>
																	<el-dropdown-item command="elsy">
																		<img src="../assets/elsy.png" style="width: 24px; height: 16px; margin: 0 6px 0 -15px" />
																		<span>Russisch</span>
																		<!--img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                                      alt="" style="display: none"/-->
																	</el-dropdown-item>
																</a>

															</p>
														</div>
													</el-dropdown>
												</div>

											</div>
											<div class="fedui-header-locales-dropdowns-single">
												<div class="single-title">{{$t('bico.W37')}}</div>
												<p class="single-fiat">
													<a href="javascript:void(0)" @click="setRate(item)"  v-for="item in rateList">
														<span>
															
															{{item.rateName}}
															<i>{{item.sign}}</i>
														</span>
                            <img v-show="item.rateCode==rateObj.rateCode"
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
                            />
													</a>
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>ARS$</i>-->
															<!--ARS-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>R$</i>-->
															<!--BRL-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>¥</i>-->
															<!--CNY-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>€</i>-->
															<!--EUR-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>£</i>-->
															<!--GBP-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>HK$</i>-->
															<!--HKD-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>Rp</i>-->
															<!--IDR-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>₹</i>-->
															<!--INR-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>¥</i>-->
															<!--JPY-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>₩</i>-->
															<!--KRW-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>RM</i>-->
															<!--MYR-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>₦</i>-->
															<!--NGN-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>₺</i>-->
															<!--TRY-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>₽</i>-->
															<!--RUB-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>S$</i>-->
															<!--SGD-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>NT$</i>-->
															<!--TWD-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>₴</i>-->
															<!--UAH-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>₫</i>-->
															<!--VND-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
													<!--<a href="#">-->
														<!--<span>-->
															<!--<i>R</i>-->
															<!--ZAR-->
														<!--</span>-->
														<!--<img-->
															 <!--src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNUw0LjUgOUwxMC41IDEiIHN0cm9rZT0iIzI0ODNGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="-->
															 <!--alt=""-->
															 <!--style="display: none" />-->
													<!--</a>-->
												</p>
											</div>
										</div>
									</div>

									<div class="fedui-header-diy">
										<div :title="themeTxt" class="theme_box">
											<!-- 在这个位置里面加入黑夜白天肤色 -->

											<div :title="themeTxt" class="theme_box">
												<span @click="changeTheme" :class="them_logo"></span>
											</div>
											<!-- 在这个位置里面加入黑夜白天肤色 -->
										</div>
									</div>

									<!-- 国际化 结束 -->
								</el-menu>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 加入客服显示图标 -->


		<div class="MICHAT-MINI-BTN2" style="display: block; z-index:1;">
			<span id="MICHAT-MINI-NUM"></span>
			<div class="MICHAT-MINI-BAR">
				<a data-new="true" href="javaScript:return" @click="openClick">
					<div aria-hidden="true" class="MICHAT-MINI-IMG2">
						<div aria-hidden="true" class="lc-1uc96ko e1dmt1bi1">
							<svg color="inherit" viewBox="0 0 32 32" class="lc-1mpchac">
								<path fill="#FFFFFF" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"></path>
								<path fill="#2000F0" d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="lc-tev3o5 e1nep2br0"></path>
							</svg>
							<div class="lc-ybw656 e1dmt1bi0">
								<svg viewBox="0 0 60 40" width="20px" fill="#fff">
									<circle r="6" cy="20" cx="9" class="lc-1xuzwae epoxe490"></circle>
									<circle r="6" cy="20" cx="30" class="lc-pg4hi7 epoxe490"></circle>
									<circle r="6" cy="20" cx="51" class="lc-xmt1be epoxe490"></circle>
								</svg>
							</div>
						</div>
						<div class="lc-1o92iqh e1dmt1bi0"></div>
					</div>
				</a>
			</div>
		</div>

		<div class="MICHAT-MINI-BTN" style="display: block; z-index: 214748300;background: #00000000;">
		    <a :href="link" target="_blank" >
				<span id="MICHAT-MINI-NUM"></span>
				<div class="MICHAT-MINI-BAR">
				<img src="../assets/kefu5.png" style="width: 60px;height: 60px;">
					<!-- <div aria-hidden="true" class="MICHAT-MINI-IMG1"><svg color="inherit" viewBox="0 0 32 32" class="lc-1mpchac"><path fill="#FFFFFF" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"></path><path fill="#2000F0" d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="lc-1adcsh3 e1nep2br0"></path></svg><div class="lc-1o92iqh e1dmt1bi0"></div></div> -->
				</div>
			</a>
		</div>


		<div class="magnify" @click.self="hide" @touchmove.prevent @mousewheel.prevent>

			<div class="dialogue-wrapper">
				<div class="dialogue-main">

					<div class="dialogue-header">
						<i id="btn_close" class="dialogue-close" @click="closeClick">x
							<a-icon type="caret-down" />
						</i>
						<div class="dialogue-service-info">
							<!-- <i class="dialogue-service-img">
								<img src="../assets/chat_logo.png" style="height: 42px;width: 40px;border-radius: 10%;position: absolute;top: 4px;left: 24px;" />
							</i> -->
							<div class="dialogue-service-title">
								<p class="dialogue-service-name">{{chatName}}</p>
								<p class="dialogue-service-detail">{{chatDesc}}</p>
							</div>
						</div>
					</div>
					<customerServiceFrom ref="kefuReload"></customerServiceFrom>
				</div>
			</div>

		</div>

		<!--聊天室密码框-->
		<el-dialog :visible.sync="chatPwdFlag" :title="$t('bico.W309')" width="30%" true>
			<el-form :model="form" ref="form">
				<el-form-item label="" prop="profile">
					<el-input v-model="form.pwd" autocomplete="off" :placeholder="$t('bico.W310')"></el-input>
				</el-form-item>
				<div class="lastBtnbt">
					<el-button class="transBtn" @click="chatPwdFlag=false">{{$t('button.cancel')}}</el-button>
					<el-button class="themeBtn" @click="chatShow">{{$t('button.ok')}}</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import customerServiceFrom from './customerServiceFrom'
	  import $ from 'jquery'
		import QRCode from "qrcodejs2";
		import { baseUrl } from "@/config/env";
		import userInform from "@/config/userInform";
		import { walletApi,platformRateApi, linkContactApi, userOutApi ,noticeApi,chatConfigsApi,checkChatPwdApi} from "@/api/getData";
		import centerHide from "@/config/centerHide";
		import codeStatus from "@/config/codeStatus";
		import "@/style/com.css";
		import "@/style/iconfont.css";
		import appDown from "@/config/appDown";
		export default {
	    name: 'customerService',
		  inject: ["reload"],
		  data() {
		    return {
	        form:{
	          pwd:'',
	        },
            needChatPwd:true,
	        chatPwdFlag:false,
	        chatName:"聊天室1",
	        chatDesc:"聊天室描述1",
	        token:sessionStorage.getItem('userToken'),
		      fullscreenLoading: false, //切换语言的加载圈
		      baseUrl,
		      getToken: sessionStorage.getItem("userToken"),
		      coinTrue: true,
		      openImg: require("../assets/eye_open.png"),
		      closeImg: require("../assets/eye_close.png"),
		      showImg: false,
		      userName: "",
		      realName: "",
		      totalAssets: 0, //个人资产
		      link: "",
          rateList:[],
          rateObj:{},
		      themeTxt: localStorage.getItem('localTheme')?localStorage.getItem('localTheme'):"day",
		      listArr:[]
		    };
		  },
		  created() {
		    this.linkFun();
		    this.getChatConfigs()
        this.getPlatFomrRate()
		  },
		  computed: {
		    activeIndex: function () {
		      return this.$route.path.replace("/", "");
		    },
		    them_logo() {
		      return this.themeTxt;
		    },
		  },
		  mounted() {
		    this.userFun(); //用户信息
		    this.qrcodeFun();
		    this.noticeFun()
		    this.$bus.emit("changeTheme", this.themeTxt);
		  },

		  methods: {
        setRate(rate){
          var that =this
          this.rateObj=rate
          const rowObj = JSON.stringify(rate)
          sessionStorage.setItem('platFormRate',rowObj);
          sessionStorage.setItem('platFormRateNumber',rate.number);
          that.fullscreenLoading = true; //组件重新加载建议使用，不过在更换语言时k线加载不出来
          setTimeout(() => {
            that.reload();
            that.fullscreenLoading = false;
          }, 1000);
        },
	      getPlatFomrRate(language){
          var dataArr = new URLSearchParams();
          //var language = this.$i18n.locale
          if(language) {
            dataArr.set("code",language)
          }
          platformRateApi(dataArr).then(res=>{
            if(res.code == 200){

              if(language) {
                dataArr.set("code",language)
                if(res.data!=""){
                  this.setRate(res.data)
                }

              }else{
                this.rateList=res.data
                if(sessionStorage.getItem('platFormRate')){
                  this.rateObj=JSON.parse(sessionStorage.getItem('platFormRate'))
                }else{
                  this.setRate(res.data[0])
                }
              }
            }
          })
        },
	      getChatConfigs(){
	        chatConfigsApi().then(res=>{
	          if(res.code == 200){
	            //获取信息历史记录
	            this.chatName=res.data.chatName
	            this.chatDesc = res.data.chatDesc
              this.needChatPwd = res.data.chatOpen=='Y'
	          }
	        })
	      },
	      closeClick(e) {
	        $('.dialogue-main').animate({'height': '0'}, function() {
	          $('.dialogue-main').css({'display': 'none'});
	          $('.dialogue-support-btn').css({'display': 'inline-block'});
	        });
	      },
	      openClick(){
	        if (typeof WebSocket === "undefined") {
	          this.$message.error(this.$t('bico.W312'),);
	          return false
	        }
	        if(this.token){
	          if(this.needChatPwd){
              if(this.form.pwd){
                this.chatShow()
                return
              }
              this.chatPwdFlag = true
            }else{
              this.showChat()
            }
	        }else{
	          this.$message.error(this.$t('bico.W311'),);
	        }
	      },
	      chatShow(){
	        var that = this
	        console.log(that.form.pwd)
	        if(that.token){
	          if(that.form.pwd==undefined || that.form.pwd == ''){
	            that.$message.error(this.$t('bico.W310'),);
	            return
	          }
	          that.checkPwd(that.form.pwd);
	        }else{
	          that.$message.error(this.$t('bico.W311'),);
	        }
	      },

        showChat(){
	        var that = this;
          //唤醒聊天框 获取历史数据 开启socekt
          that.$refs.kefuReload.intoInfo();
          $('.dialogue-support-btn').css({'display': 'none'});
          $('.dialogue-main').css({'display': 'inline-block', 'height': '0'});
          $('.dialogue-main').animate({'height': '800px'})
          this.chatPwdFlag = false
        },
	      async checkPwd(password){
	        var that =this
	        var data =new URLSearchParams();
	        data.set('pwd',password);
	        var res = await checkChatPwdApi(data);
	        if(res.code == 200){
	          this.showChat()
	        }else{
	          codeStatus(res.code,function(res){
	            that.$message.error(res);
	          })
            this.chatPwdFlag = true
	        }
	      },
		    detailFun(getIndex){
		      var that = this;
		      var obj = getIndex;
		      sessionStorage.setItem('detailTxt',JSON.stringify(obj));
		      that.$router.push('/detail?t='+new Date().getTime());
		    },
		    async noticeFun(){
		      var that = this;
		      var dataArr = new URLSearchParams();
		      var language = this.$i18n.locale
		      dataArr.set("language",language)
		      dataArr.set('status','N');
		      dataArr.set('current',1);
		      dataArr.set('size',6);
		      var res = await noticeApi(dataArr);
		      that.listArr = [];
		      if(res.code == 200){
		        var arr = res.data.records;
		        arr.forEach((element)=>{
		          that.listArr.push(element)
		        })
		      }
		    },
		    async linkFun() {
		      //联系客服地址
		      var that = this;
		      var res = await linkContactApi();
		      if (res.success) {
		        that.link = res.data;
		      }
		    },
		    async qrcodeFun() {
		      //获取下载app的地址

		      var that = this;
		      // appDown(function(res){
		      new QRCode("anroidQrcode", {
		        width: 150,
		        height: 150,
		        text: "https://t.me/usdtvps666",
		      });

		      new QRCode("IosQrcode", {
		        width: 150,
		        height: 150,
		        text: "https://t.me/usdtvps666",
		      });
		      // });
		    },
		    userFun() {
		      //用户信息
		      var that = this;
		      userInform(function (res) {
		        if (res.loginMethod == "PHONE") {
		          that.userName = centerHide(res.phone);
		        } else {
		          that.userName = centerHide(res.email);
		        }

		        switch (Number(res.realStatus)) {
		          case 0:
		            that.realName = that.$t("codeTxt.noAuthentication");
		            break;
		          case 1:
		            that.realName = that.$t("codeTxt.authentication");
		            break;
		          case 2:
		            that.realName = that.$t("codeTxt.waitAuthent");
		            break;
		          default:
		            break;
		        }
		        sessionStorage.setItem("nickName", res.nickName);
		        that.assestsFun();
		      });
		    },
		    async assestsFun() {
		      //用户资产
		      var that = this;
		      var dataArr = new URLSearchParams();
		      dataArr.set("valuation", "USDT");
		      dataArr.set("hide", "N");
		      dataArr.set("type", "WALLET");
		      var res = await walletApi(dataArr);
		      if (res.success) {
		        var obj = res.data;
		        //that.totalAssets = Number(res.data.accountTotalPrice).toFixed(8);
		        that.totalAssets = Number(obj.valuationTotalPrice).toFixed(8);
		      }
		    },
		    changeInput() {
		      //隐藏显示资产
		      var that = this;
		      that.showImg = !that.showImg;
		    },
		    handleNav(key, keyPath) {
		      //点击切换导航
		    },
		    checkLogin() {
		      this.$message.error(this.$t("user.token"));
		      this.$router.push("/login");
		    },
		    comeback() {
		      //点击logo跳转首页
		      this.$router.push("/");
		    },
		    handleCommand(command) {
		      //切换语言
		      var that = this;
		      if (command != that.$i18n.locale) {
		        that.$i18n.locale = command;
		        sessionStorage.setItem("language", command);
            this.getPlatFomrRate(that.$i18n.locale)
            // location.reload() //使用原始更新，有白屏，用户体验不好
		        // that.fullscreenLoading = true; //组件重新加载建议使用，不过在更换语言时k线加载不出来
		        // setTimeout(() => {
		        //   that.reload();
		        //   that.fullscreenLoading = false;
		        // }, 1000);
		      }
		    },
		    outBtn() {
		      var that = this;
		      that
		        .$confirm(that.$t("user.outTxt"), that.$t("layer.tips"), {
		          confirmButtonText: that.$t("button.ok"),
		          cancelButtonText: that.$t("button.cancel"),
		          type: "warning",
		        })
		        .then(async () => {
		          var res = await userOutApi();
		          if (res.success) {
		            that.$message({
		              type: "success",
		              message: that.$t("user.outSuccess"),
		            });
		            that.reload();
		            sessionStorage.removeItem("userToken");
		            sessionStorage.removeItem("userInform");
		            sessionStorage.removeItem("nickName");
		            that.$router.push("/login");
		          } else {
		            codeStatus(res.code, function (res) {
		              that.$message.error(res);
		            });
		          }
		        })
		        .catch(() => {});
		    },

		    changeTheme() {
		      //debugger
		      this.themeTxt = this.themeTxt == "night" ? "day" : "night";
		      this.$bus.emit("changeTheme", this.themeTxt);
		    },
		  },
		  components: {customerServiceFrom},
		};
</script>

<style lang="less">
	.dialogue-wrapper {
	    font-size: 22px;
	    color: #fff;
	  }
	  /*右侧点击按钮*/
	  .dialogue-wrapper .dialogue-support-btn {
	    z-index: 99;
	    position: fixed;
	    display: inline-block;
	    top: 50%;
	    right: 0;
	    margin-top: -70px;
	    padding: 10px 0;
	    width: 30px;
	    height: 150px;
	    font-size: 16px;
	    font-weight: 500;
	    text-align: center;
	    cursor: pointer;
	    border-top-left-radius: 5px;
	    border-bottom-left-radius: 5px;
	    box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.4);
	    background-color: #5d94f3;
	  }

	  .dialogue-wrapper .dialogue-support-btn .dialogue-support-icon {
	    position: relative;
	    display: inline-block;
	    margin-bottom: -2px;
	    width: 20px;
	    height: 16px;
	    border-radius: 4px;
	    background-color: #fff;
	  }

	  .dialogue-wrapper .dialogue-support-btn .dialogue-support-icon:before {
	    content: '';
	    position: absolute;
	    left: 50%;
	    bottom: -6px;
	    margin-left: -3px;
	    width: 0;
	    height: 0;
	    border-left: 4px solid transparent;
	    border-right: 4px solid transparent;
	    border-top: 6px solid #fff;
	  }

	  .dialogue-wrapper .dialogue-support-btn .dialogue-support-line {
	    display: inline-block;
	    width: 100%;
	    height: 1px;
	    background-color: #ddd;
	  }

	  .dialogue-wrapper .dialogue-support-btn .dialogue-support-text {
	    padding: 5px 0;
	    letter-spacing: 4px;
	    writing-mode: vertical-rl;
	    -webkit-user-select: none;
	  }

	  /*底部客服对话框*/
	  .dialogue-wrapper .dialogue-main {
	    position: fixed;
	    display: none;
	    right: 12px;
	    bottom: 10px;
	    width: 500px;
	    height: 800px;
	    border-radius: 4px;
	    box-shadow: 0px 4px 10px rgba(37, 44, 84, 0.36);
	    z-index: 99;
	    background-color: #7b434300;
	  }

	  /*客服对话框头部*/
	  .dialogue-wrapper .dialogue-main .dialogue-header {
	    position: relative;
	    padding: 10px;
	    height: 60px;
	    border-top-left-radius: 4px;
	    border-top-right-radius: 4px;
	    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	    background-color: #003bfc;
	  }

	  .dialogue-wrapper .dialogue-main .dialogue-close {
	    position: absolute;
	    top: 10px;
	    right: 20px;
	    padding: 2px;
	    font-size: 30px;
	    // transform: rotate(90deg);
	    cursor: pointer;
	  }

	  .dialogue-wrapper .dialogue-main .dialogue-service-info {
	    position: relative;
	    top: 50%;
	    margin-top: -20px;
	    height: 40px;
	    width: 90%;
	  }

	  .wrapper .web__main .web__main-item--mine .web__main-text {
	    margin-left: 0;
	    text-align: left;
	    background-color: #f3f3f3!important;
	    color: #09090c!important;
	  }

	  .wrapper .web__main .web__main-item--mine .web__main-text .web__main-arrow:after {
	    left: auto;
	    right: -2px;
	    border-color: transparent;
	    border-style: solid;
	    border-width: 7px;
	    border-right-width: 0;
	    border-left-color: #f3f3f3!important;
	  }

	  .wrapper .web__main .web__main-item--mine .web__main-text .web__main-arrow {
	    left: auto;
	    right: -5px;
	    border-color: transparent;
	    border-style: solid;
	    border-width: 8px;
	    border-right-width: 0;
	    border-left-color: #f3f3f3!important;
	  }

	  .wrapper .web__main .web__main-item--mine .web__main-user cite i {
	    padding-left: 0;
	    padding-right: 0px!important;
	  }

	  .wrapper .web__main .web__main-user cite {
	    position: absolute;
	    left: 60px;
	    top: -2px;
	    line-height: 24px;
	    font-size: 14px!important;
	    white-space: nowrap;
	    color: #999 !important;
	    text-align: left;
	    font-style: normal;
	  }

	  .dialogue-wrapper .dialogue-main .dialogue-service-img {
	    display: inline-block;
	    margin: 0 10px 0 20px;
	    width: 40px;
	    height: 40px;
	    text-align: center;
	    line-height: 40px;
	    vertical-align: middle;
	    color: #000;
	    border-radius: 50%;
	    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0);
	    background-color: #fff0;
	  }

	  .dialogue-wrapper .dialogue-main .dialogue-service-title {
	    display: inline-block;
	    vertical-align: middle;
	  }

	  .dialogue-wrapper .dialogue-main .dialogue-service-detail {
	    font-size: 12px;
	  }






		.theme_box {
		  cursor: pointer;
		  display: flex;
		  align-items: center;
		  height: 100%;
		  span {
		    width: 24px;
		    height: 24px;
		    display: inline-block;
		  }
		  .day {
		    background-image: url(../assets/theme/day.png);
		    background-size: 100% 100%;
		  }
		  .night {
		    background-image: url(../assets/theme/night.png);
		    background-size: 100% 100%;
		  }
		}
		.d_dropDownS {
		  height: 300px;
		  overflow: auto;
		  scrollbar-color: transparent transparent;
		  scrollbar-width: none;
		}
		.d_dropDownS::-webkit-scrollbar {
		  display: none;
		}
		.head_div {
		  position: fixed;
		  top: 0px;
		  z-index: 999;
		  width: 100%;
		  background-color: #0b0b0b;
		  background: #131625;

		  .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
		  .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
		  .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
		    background-color: transparent !important;
		  }
		  .el-row {
		    padding: 0 10px;
		  }
		  .left_nav {
		    display: -webkit-box;
		    .el-menu.el-menu--horizontal {
		      & > .el-menu-item.is-active {
		        color: @mainsColor!important;
		      }
		    }
		    .logo_img {
		      display: flex;
		      flex-direction: row;
		      align-items: center;
		      img {
		        height: 42px;
		        margin-right: 10px;
		        margin-left: 18px;
		        margin-top: -8px;
		      }
		      span {
		        color: #ffffff;
		        letter-spacing: 1px;
		      }
		    }
		    .el-icon-search,
		    .logo_img:hover,
		    .el-input__suffix:hover {
		      cursor: pointer;
		    }
		  }
		  /* 右边导航 */
		  .right_nav {
		    .leftSpread {
		      .twoName {
		        width: 30x;
		        height: 30px;
		        margin-right: 40px;
		      }
		    }
		    ul {
		      display: flex;
		      flex-direction: row;
		      align-items: center;
		      justify-content: flex-end;
		      height: 0px;
		      //text-align: right;
		    }
		    .el-menu.el-menu--horizontal {
		      & > .noTokenBox {
		        display: flex;
		        flex-direction: row;
		        align-items: center;
		        .el-menu-item {
		          height: 32px;
		          line-height: 32px;
		          border-radius: 4px;
		          &:nth-child(1) {
		            margin-right: 8px;
		          }
		        }
		        .el-menu-item.is-active {
		          background-color: @mainsColor!important;
		          color: #ffffff !important;
		        }
		        .el-menu-item:hover {
		          background-color: @mainsColor!important;
		        }
		      }
		    }
		  }
		  .change_language {
		    .el-dropdown {
		      cursor: pointer;
		    }
		    .el-dropdown-selfdefine {
		      color: #ffffff;
		    }
		  }
		  .user_box {
		    .selectMenu {
		      .el-submenu__title:hover {
		        background-color: transparent !important;
		      }
		      .el-submenu__icon-arrow {
		        right: 0;
		        color: #ffffff;
		      }
		    }
		    .account {
		      color: #ffffff;
		    }
		  }
		}
		.userDrop {
		  padding: 20px;
		  background-color: #ffffff;
		  width: 320px;
		  .user-top {
		    justify-self: flex-start;
		    & > a {
		      display: inline-block;
		      img {
		        width: 16px;
		        height: 16px;
		      }
		    }
		    .leftSpread {
		      & > img {
		        margin-right: 6px;
		      }
		      p {
		        margin: 6px 0 0 0;
		        color: #cd3d58;
		      }
		    }
		  }
		  .user-assets {
		    border-top: 1px solid #c1c1c1;
		    border-bottom: 1px solid #c1c1c1;
		    margin: 10px 0;
		    padding: 10px 0;
		    .leftSpread {
		      img {
		        margin-right: 8px;
		      }
		    }
		    .el-input__inner {
		      background: transparent;
		      border: none;
		      color: #333333;
		      padding: 0;
		      font-size: 28px;
		      // width: 100px;
		      &::-webkit-input-placeholder {
		        color: #333333;
		      }
		      &:-moz-placeholder {
		        color: #333333;
		      }
		      &::-o-placeholder {
		        color: #333333;
		      }
		    }
		    img {
		      cursor: pointer;
		    }
		    .asset-box {
		      p {
		        img {
		          margin-left: 10px;
		        }
		        span {
		          color: #c3c3c3;
		          font-size: 12px;
		        }
		      }
		    }
		  }
		}
		.user-order {
		  display: flex;
		  flex-direction: row;
		  justify-content: flex-start;
		  .user-order-right {
		    margin-left: 15px;
		  }
		  & > div {
		    width: 50%;
		    display: flex;
		    flex-direction: column;
		    justify-content: flex-start;
		    p {
		      color: #c3c3c3;
		      margin: 0 0 10px 0;
		      font-size: 12px;
		    }
		    a {
		      line-height: 35px;
		      color: #333333;
		      display: flex;
		      flex-direction: row;
		      align-items: center;
		      img {
		        margin-right: 22px;
		      }
		    }
		  }
		}
		.userOUt {
		  border-top: 1px solid #c1c1c1;
		  margin-top: 10px;
		  button,
		  button:focus,
		  button:hover {
		    background-color: transparent;
		    width: 100%;
		    /* text-align: left; */
		    border: 1px solid #dcdfe6;
		  }
		}

		.el-menu-item i {
		  font-size: 20px;
		  color: #dadde8 !important;
		}

		.changeBg {
		  background-color: #ffffff !important;
		  border: 1px solid #1b1c27 !important;
		  color: #8e8e8e !important;
		  .el-dropdown-menu__item:hover {
		    background-color: #2196f3 !important;
		    color: #ffffff !important;
		  }
		}
		.fedui-header-pc {
		  height: 48px;
		  padding-left: 20px;
		  padding-right: 20px;
		}
		.el-menu-item {
		  padding: 0 10px !important;
		}

		.chatPage {

			margin: 0 auto;
			position: relative;
			background: #fff;
			overflow: hidden;
			height: 700px !important;
			width: 480px !important;
			border-radius: 4px;
		}

		.wrapper {
			position: relative;
			width: 490px!important;
			height: 538px!important;
			overflow: hidden;
			touch-action: none;
			-webkit-text-size-adjust: none;
			-moz-text-size-adjust: none;
			text-size-adjust: none;
		}

		dd {
		    display: block;
		    margin-inline-start: 0px;
		}

		.dialogue-service-name{
			margin-block-start: 0em;
			margin-block-end: 0em;
			margin-inline-start: 0px;
			margin-inline-end: 0px;
		}

		.MICHAT-MINI-BTN {
			display: none;
			margin: 0;
			padding: 0;
			position: fixed;
			z-index: 1000;
			_position: absolute;
			width: 60px;
			height: 60px;
		    right: 30px;
	        bottom: 200px;
			border-radius: 60px;
			background: #2000f0;
			color: #fff;
			text-align: center;
			cursor: pointer;
		}
		.MICHAT-MINI-IMG1 {
			width: 50%;
			margin-top: 16px;
			right: 15px;
			position: absolute;
		}

		.MICHAT-MINI-BTN2 {
			display: none;
			margin: 0;
			padding: 0;
			position: fixed;
			z-index: 1000;
			_position: absolute;
			width: 60px;
			height: 60px;
		    right: 30px;
	        bottom: 110px;
			border-radius: 60px;
			background: #2000f0;
			box-shadow: 0 0 6px rgba(0,0,0,.12);
			color: #fff;
			text-align: center;
			cursor: pointer;

			transform: translatey(0px);
	animation: float 6s ease-in-out infinite;




		}
		.MICHAT-MINI-IMG2 {
			width: 60%;
			margin-top: 12px;
			right: 11px;
			position: absolute;
		}

		.lc-ybw656 {
			position: absolute;
			z-index: 1;
			left: 2px;
			right: 4px;
			bottom: 3px;
			display: flex;
			width: 32px;
			height: 32px;
			-webkit-box-align: center;
			align-items: center;
			-webkit-box-pack: center;
			justify-content: center;
			opacity: 1;
			transition: opacity 150ms cubic-bezier(0.33, 0, 0.67, 1) 50ms;
		}

		.web__msg-submit {
			display: inline-block;
			outline: none;
			cursor: pointer;
			text-align: center;
			background-color: #003bfc!important;
			border-color: #003bfc!important;
			padding: 10px 20px;
			font-size: 14px;
		}

		.lastBtnbt{

			width: 190px;
			height: 70px;
			border-radius: 16px;
			font-size: 14px;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 80px;
			border: none;
			margin: 0 auto;
			margin-top: 25px;
			position: relative;

		}

		.el-dialog .el-dialog__title, .el-dialog .el-dialog__close {
			font-size: 18px!important;
			font-weight: bold!important;
		}
		.web__msg {
			padding: 10px 10px!important;

		}

		.toolIcon[data-v-b4bb0df6] {
			padding-left: 10px!important;
			font-size: 24px!important;
			color: #4d5580!important;
		}
		.wrapper .web__main .web__main-item {

			min-height: 80px!important;

		}
</style>

