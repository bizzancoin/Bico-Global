<template>
	<div class="mstarch2">
		<div class="mstarch">

			<!-- 顶部 -->
			<div class="section-head">



				<!-- 顶部样式开始 -->
				<div class="contentmep">
					<!-- 加入星空效果 -->
					<!-- <div class="stars">
						<div class="star" v-for="(item, index) in starsCount" :key="index" ref="star"></div>
					</div> -->
					<!-- 加入星空效果 -->
					<h2>{{$t('bico.W206')}}</h2>
					<h3>{{$t('bico.W207')}}</h3>
					<div class="links">

						<a href="/">{{$t('bico.W208')}}</a>
						<a href="/" target="_blank" rel="noopener noreferrer">{{$t('bico.W210')}}</a>
					</div>
				</div>
				<!-- 顶部样式结束 -->

				<!-- 导航切换 -->
				<div class="contentmep2">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane :label="$t('bico.W211')" name="first">
							<!-- 矿机商城列表开始 -->
							<div class="contentmep3">
								<el-row :gutter="20">
									<el-col :span="10" v-show="miningPage.records.length>0" v-for="(item,index) in miningPage.records" :key="item.id">
										<div class="">
											<!-- 矿机商城模板示例开始 -->
											<div class="card-primer cloud-card-shadow gray-bg cloud-shadow-dark">
												<p class="card-btc com-font">
													<span class="icon-32 icon-32-btc">
														<img class="theme-night-display-hide pc-header-logo icon-32" :src="item.image2">
														<!-- <img class="theme-night-display-hide pc-header-logo icon-32" :src="item.image2"> -->
													</span>&ensp;&ensp;{{item.title}}
												</p>
												<p class="card-btcs com-font">{{item.introduction}} </p>

												<h1>{{item.estimatedCapacity}}%</h1>

												<p class="card-static com-font">{{$t('bico.W212')}}</p>

												<div class="card-level">
													<div class="card-divi block-bg"></div>{{item.name}}
												</div>

												<p class="card-p com-font">
													<span class="card-span">{{$t('bico.W213')}}: </span>
													<span class="fs18">{{item.cycleNumber}} {{$t('bico.W214')}}</span>
												</p>

												<p class="card-p com-font">
													<span class="card-span">{{$t('bico.W215')}}：</span>
													<span class="fs18">{{item.fuelEnergyNumber}} {{item.fuelEnergyCoin}}</span>
												</p>

												<p class="card-p com-font">
													<span class="card-span">{{$t('bico.W216')}}：</span>
													<span class="fs18">{{item.calculatingPowerNumber}} {{item.calculatingPowerCoin}}</span>
												</p>

												<p class="card-p com-font">
													<span class="card-span">{{$t('bico.W217')}}：</span>
													<span class="fs18">{{item.price}} {{item.priceCoin}}</span>
												</p>
												<button v-if="item.tradedAmount>=item.totalSupply" class="card_btns com-border com-color0 cp">{{$t('bico.W218')}}</button>
												<button v-if="item.tradedAmount<item.totalSupply" @click="showDetail(item)" class="card_btns com-border com-color0 cpd">{{$t('bico.W219')}}</button>
												<li class="card-line">
													<!--<p class="line-lines"></p>-->
													<!--<p class="line-red" style="width: calc(0px);"></p>-->
													<div style="width: 130px">
														<el-progress :stroke-width="8" :percentage="Number(item.tradedAmount/item.totalSupply*100).toFixed(0)"></el-progress>
													</div>

													<span>{{$t('bico.W220')}}： {{item.tradedAmount}}/{{item.totalSupply}}</span>
												</li>
											</div>
											<!-- 矿机商城模板示例开始 -->
										</div>
									</el-col>
								</el-row>
							</div>
							<div style="height: 200px;"></div>
							<el-pagination

										   @current-change="getMiningList"
										   :currentPage="miningPage.current"
										   :page-size="miningPage.size"
										   layout="prev, pager, next"
										   :prev-text="$t('bico.W115')"
										   :next-text="$t('bico.W116')"
										   :total="miningPage.total">
							</el-pagination>
							<div style="height: 200px;"></div>
							<!-- 矿机商城列表结束 -->
						</el-tab-pane>


						<el-tab-pane :label="$t('bico.W221')" name="second">
							<div class="contentmep4" v-show="miningOrderPage.records.length>0" v-for="(item,index) in miningOrderPage.records" :key="item.id">
								<div class="cloud-buy-center">
									<div class="cloud-detail cloud-shadow-dark block-bg">
										<div class="cloud-detail-title">
											<p class="card-btc com-font">
												<span class="icon-32 icon-32-btc">
													<!--矿机logo-->
													<img class="theme-night-display-hide pc-header-logo icon-32" :src="item.image">
													<!--币种logo-->
													<!--<img class="theme-night-display-hide pc-header-logo icon-32" :src="item.image">-->

												</span>&ensp;&ensp; {{item.title}}
												<!--{{item.name}}-->
											</p>
										</div>

										<div class="cloud-detail-row">
											<div class="cloud-row-left">
												<div class="row-left-top">
													<div>
														<div class="profit-rate">{{item.estimatedCapacity}}
															<span class="fs16">%</span>
														</div>
														<div class="gray-text fs14 mt10">{{$t('bico.W222')}}</div>
													</div>
													<div>
														<div class="profit-rate">{{item.estimatedStaticYield}}
															<span class="fs16">%</span>
														</div>
														<div class="gray-text fs14 mt10">{{$t('bico.W223')}}</div>
													</div>
													<div>
														<div class="fs33">{{item.cycleNumber}}
															<span class="fs16 gray-text"> {{cycleTypeMap[item.cycleType]}}</span>
														</div>
														<div class="gray-text fs14 mt10">{{$t('bico.W224')}}</div>
													</div>
													<div>
														<div class="fs33">{{item.fuelEnergyNumber}}
															<span class="fs16 gray-text">{{item.fuelEnergyCoin}}/l</span>
														</div>
														<div class="gray-text fs14 mt10">{{$t('bico.W225')}}</div>
													</div>
													<div>
														<div class="fs33">{{item.energyLossNumber}}
															<span class="fs16 gray-text">{{item.energyLossCoin}}/s</span>
														</div>
														<div class="gray-text fs14 mt10">{{$t('bico.W226')}}</div>
													</div>
												</div>
												<div class="row-left-bottom gray-bg">
													<div>
														<span class="gray-text">{{$t('bico.W227')}}：</span>
														<span style="width: 100px;">{{item.miningedDays}} {{$t('bico.W214')}}</span>
													</div>
													<div>
														<span class="gray-text">{{$t('bico.W228')}}：</span>
														<span style="width: 150px;">{{item.received+" "+item.miningCoin}}</span>
													</div>
													<div>
														<span class="gray-text">{{$t('bico.W229')}}：</span>
														<span style="width: 150px;">{{item.available+" "+item.staticCoin}}</span>
													</div>
													<div>
														<span class="gray-text">{{$t('bico.W230')}}：</span>
														<span style="width: 100px;">{{item.createTime}}</span>
													</div>
												</div>
											</div>
											<div class="cloud-row-divi block-bg"></div>
											<div class="cloud-row-right">


												<div style="margin-top: -80px;">{{$t('bico.W231')}}：<span class="red-text">
														<span class="fs33">{{item.miningCoin}}</span>
													</span>
												</div>

												<div style="margin-top: -20px;">{{$t('bico.W232')}}：<span class="red-text">
														<span class="fs333">{{item.price}}</span> {{item.priceCoin}}
													</span>
												</div>

												<div class="go-buy-selled POSr" @click="$router.push('/currencyTrade?symbol='+item.energyLossCoin+'%2FUSDT')">
													<span class="icon-32 icon-32-btc" style="width: 24px;height: 24px;">
														<img class="theme-night-display-hide pc-header-logo icon-322" src="@/starchainminer/static/image/chongzhi.png">
													</span>&ensp;{{$t('bico.W233')}}
												</div>

												<div class="go-buy-selled POSrr" @click="startUp(item)">

													<!-- 启动 -->
													<p class="card-btc2 com-font" v-if="item.miningStatus=='0'">
														<span class="icon-32 icon-32-btc" style="width: 24px;height: 24px;">
															<img class="theme-night-display-hide pc-header-logo icon-322" src="@/starchainminer/static/image/zanting.png">
														</span>&ensp;
													</p>
													<!-- 结束 现有逻辑不用写结束状态，因为不在此处显示，结束的订单会在我的收益里显示 -->
													<p class="card-btc2 com-font" v-if="item.miningStatus=='2'">
														<span class="icon-32 icon-32-btc" style="width: 24px;height: 24px;">
															<img class="theme-night-display-hide pc-header-logo icon-322" src="@/starchainminer/static/image/kaishi.png">
														</span>&ensp;&ensp;
													</p>
													<!-- 进行中 -->
													<p class="card-btc2 com-font flash animated infinite" v-if="item.miningStatus=='1'||item.miningStatus=='3'">
														<span class="icon-32 icon-32-btc" style="width: 24px;height: 24px;">
															<img class="theme-night-display-hide pc-header-logo icon-322" src="@/starchainminer/static/image/kaishi.png">
														</span>&ensp;
													</p>
													{{stepMap[item.miningStatus]}}
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
							<div style="height: 200px;"></div>
							<el-pagination

										   @current-change="getMiningOrder"
										   :currentPage="miningOrderPage.current"
										   :page-size="miningOrderPage.size"
										   layout="prev, pager, next"
										   :prev-text="$t('bico.W115')"
										   :next-text="$t('bico.W116')"
										   :total="miningOrderPage.total">
							</el-pagination>
							<div style="height: 200px;"></div>
						</el-tab-pane>

						<el-tab-pane :label="$t('bico.W234')" name="third">
							<div class="contentmep5" v-show="miningOrderDetailPage.records.length>0" v-for="(item,index) in miningOrderDetailPage.records" :key="item.id">
								<div class="mine-overview">
									<div class="overview-card block-bg">
										<div class="flex-1">
											<div class="card-btccc">
												<div class="btc-btc321">
													<span class="icon-32 icon-32-btc">
														<img class="theme-night-display-hide pc-header-logo icon-32" :src="item.image2">
													</span>
												</div>
												<div style="margin: 0px 700px 0 0;">
													{{item.title}}
												</div>
												<div style="margin: 0px 20px 0 0;">
													<p class="overview-btn" @click="pick(item,'chan')">{{$t('bico.W235')}}</p>
												</div>
												<div>
													<p class="go-buy-btn mt16" @click="pick(item,'jing')">{{$t('bico.W236')}}</p>
												</div>
											</div>
											<el-divider></el-divider>

											<div class="flex-start">
												<div class="flex-col" style="width: 170px;">
													<img class="theme-night-display-hide pc-header-logo icon-32" style="width: 120px;height: 120px;border-radius: 4px;" :src="item.image">
												</div>
												<div class="flex-col" style="width: 170px;">
													<div class="fs12 gray-text">{{$t('bico.W217')}}</div>
													<div class="fs20 mt8">{{item.price}} {{item.priceCoin}}</div>
												</div>
												<div class="flex-col" style="width: 170px;">
													<div class="fs12 gray-text">{{$t('bico.W224')}}</div>
													<div class="fs20 mt8">{{item.cycleNumber}} {{cycleTypeMap[item.cycleType]}}</div>
												</div>
												<div class="flex-col" style="width: 170px;">
													<span class="fs12 gray-text" style="border-bottom: 1px dashed; cursor: help;">{{$t('bico.W237')}}</span>
													<div class="fs20 mt8 color-E64E62">{{item.estimatedCapacity}} %</div>
												</div>
												<div class="flex-col" style="width: 170px;">
													<span class="fs12 gray-text" style="border-bottom: 1px dashed; cursor: help;">{{$t('bico.W238')}}</span>
													<div class="fs20 mt8 color-E64E62">{{item.estimatedStaticYield}} %</div>
												</div>
												<div class="flex-col" style="width: 170px;">
													<div class="fs12 gray-text">{{$t('bico.W239')}}：</div>
													<div class="fs20 mt8">{{item.miningedDays}} {{$t('bico.W214')}}</div>
												</div>
												<div class="flex-col" style="width: 170px;">
													<div class="fs12 gray-text">{{$t('bico.W240')}}</div>
													<div class="fs20 mt8">{{item.chanShouyi}} {{item.chanShouyiCoin}}</div>
												</div>

											</div>

											<div class="flex-start mt16">
												<div class="flex-col" style="width: 170px;">

												</div>
												<div class="flex-col" style="width: 170px;margin-top: -54px;">
													<div class="fs12 gray-text">{{$t('bico.W241')}}</div>
													<div class="fs20 mt8">{{item.fuelEnergyNumber}} {{item.fuelEnergyCoin}}</div>
												</div>
												<div class="flex-col" style="width: 170px;margin-top: -54px;">
													<div class="fs12 gray-text">{{$t('bico.W242')}}</div>
													<div class="fs20 mt8">{{item.energyLossNumber*item.miningedDays}} {{item.energyLossCoin}}</div>
												</div>
												<div class="flex-col" style="width: 170px;margin-top: -54px;">
													<div class="fs12 gray-text">{{$t('bico.W243')}}</div>
													<div class="fs20 mt8">{{item.calculatingPowerNumber}} {{item.calculatingPowerCoin}}</div>
												</div>
												<div class="flex-col" style="width: 170px;margin-top: -54px;">
													<div class="fs12 gray-text">{{$t('bico.W244')}}</div>
													<div class="fs20 mt8">{{item.received}} {{item.miningCoin}}</div>
												</div>
												<!--
                        //可领取静态化收益
                      aaa.kejingtaishouyi = aaa.available
                      aaa.kejingtaishouyiCoin = aaa.staticCoin
                      //可领取茶能
                      aaa.chanShouyi = aaa.received
                      aaa.chanShouyiCoin = aaa.miningCoin


                        -->
												<div class="flex-col" style="width: 170px;margin-top: -54px;">
													<div class="fs12 gray-text">{{$t('bico.W245')}}</div>
													<div class="fs20 mt8">{{item.available}} {{item.staticCoin}}</div>
												</div>
												<div class="flex-col" style="width: 170px;margin-top: -54px;">
													<div class="fs12 gray-text">{{$t('bico.W246')}}</div>
													<div class="fs20 mt8">{{item.kejingtaishouyi}} {{item.kejingtaishouyiCoin}}</div>
												</div>


											</div>

										</div>
									</div>
								</div>
							</div>
							<div style="height: 200px;"></div>
							<el-pagination

										   @current-change="getMiningDetailOrder"
										   :currentPage="miningOrderDetailPage.current"
										   :page-size="miningOrderDetailPage.size"
										   layout="prev, pager, next"
										   :prev-text="$t('bico.W115')"
										   :next-text="$t('bico.W116')"
										   :total="miningOrderDetailPage.total">
							</el-pagination>
							<div style="height: 200px;"></div>
						</el-tab-pane>
					</el-tabs>
				</div>

				<Foot />
				<!-- 导航切换结束 -->

				<!--详情弹窗-->
				<el-dialog :visible.sync="show" :close-on-click-modal="false" :before-close="closeDialog" width="30%" :title="$t('bico.W247')">
					<div class="list_details">

						<!--内容 等待加css-->

						<!-- 美化样式开始 -->
						<!-- 宫格模式 4X4 排列，左右居中，中间 缕空 -->
						<el-row :gutter="20">
							<el-col :span="20">
								<div class="grid-content anniujuzhong">
									<img class="theme-night-display-hide pc-header-logo icon-32" :src="detail.image" />
									<span class="kjmc">{{detail.title}} {{detail.name}}</span>
								</div>
							</el-col>
						</el-row>
						<el-divider></el-divider>
						<!-- <el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									名字:
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{detail.name}}
								</div>
							</el-col>
						</el-row> -->
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{$t('bico.W224')}}
								</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="12">
								<div class="grid-content anniujuzhong" style="color: #4CAF50;font-weight: bold;">
									{{detail.introduction}}
								</div>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{$t('bico.W237')}}
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong2">
									{{detail.estimatedCapacity}}% {{detail.miningCoin}}
								</div>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{$t('bico.W238')}}
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong2">
									{{detail.estimatedStaticYield}}% {{detail.staticCoin}}
								</div>
							</el-col>
						</el-row>

						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{$t('bico.W248')}}
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong2">
									{{detail.energyLossNumber}} {{detail.energyLossCoin}}
								</div>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{$t('bico.W225')}}
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong2">
									{{detail.fuelEnergyNumber}} {{detail.fuelEnergyCoin}}
								</div>
							</el-col>
						</el-row>


						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{$t('bico.W249')}}
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong2">
									{{detail.totalSupply}} {{$t('bico.W251')}}
								</div>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{$t('bico.W250')}}
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong2">
									{{detail.limitTimes}} {{$t('bico.W251')}}
								</div>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{$t('bico.W252')}}
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong2">
									{{detail.tradedAmount}}丨{{detail.totalSupply}}
								</div>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{$t('bico.W243')}}
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong2">
									{{detail.calculatingPowerNumber}} {{detail.calculatingPowerCoin}}
								</div>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
									{{$t('bico.W232')}}
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong">
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content anniujuzhong2" style="color: #e62323;font-weight: bold;">
									{{detail.price}} {{detail.priceCoin}}
								</div>
							</el-col>
						</el-row>
						<!-- 美化样式结束 -->
						<!--按钮-->
						<el-divider></el-divider>
						<div class="waitPay">
							<div class="lastBtn">
								<el-row :gutter="20">
									<el-col :span="6">
										<div class="grid-content">
										</div>
									</el-col>
									<el-col :span="6">
										<div class="grid-content anniujuzhong">
											<el-button class="transBtn" @click="closeDialog">{{$t('bico.W253')}}</el-button>
										</div>
									</el-col>
									<el-col :span="6">
										<div class="grid-content anniujuzhong" style="padding-left: 40px;padding-right: 10px;">
											<el-button class="themeBtn" v-show="token" @click="submit">{{$t('bico.W219')}}</el-button>
											<el-button class="themeBtn" v-show="!token" @click="$router.push('/login');">{{$t('bico.W254')}}</el-button>
										</div>
									</el-col>
									<el-col :span="6">
										<div class="grid-content">
										</div>
									</el-col>
								</el-row>
							</div>
						</div>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
	import { miningListApi,addMiningApi,miningOrderDetailApi,miningOrderApi ,startUpMiningOrderApi,pickMiningOrderApi} from '@/api/getData'
					  import codeStatus from '@/config/codeStatus'
						import Foot from "@/components/Foot";
						export default {
							data () {
								return {
							//starsCount: 800,//隐藏星空动态效果
		                    //distance: 800,//隐藏星空动态效果
					        token:sessionStorage.getItem('userToken'),
					        show:false,
					        cycleTypeMap:{
					          1001:this.$t('bico.W255'),//年
					          1002:this.$t('bico.W256'),//年
					          1003:this.$t('bico.W257'),//年
					        },
					        stepMap : {
					          "0":this.$t('bico.W258'),//启动矿机
					          "1":this.$t('bico.W259'),//已经启动
					          "2":this.$t('bico.W260'),//已经结束
					          "3":this.$t('bico.W261'),//已经启动
					        },
					        activeName: 'first',
					        miningPage:{
					          current: 1,
					          pages: 1,
					          records: [],
					          searchCount: true,
					          size: 8,
					          total: 1,
					        },
					        miningOrderPage:{
					          current: 1,
					          pages: 1,
					          records: [],
					          searchCount: true,
					          size: 10,
					          total: 1,
					        },
					        miningOrderDetailPage:{
					          current: 1,
					          pages: 1,
					          records: [],
					          searchCount: true,
					          size: 10,
					          total: 1,
					        },
					        detail:{},
								}
							},
					    created(){
		
					      this.getMiningList(this.miningPage.current)
					      if(this.token){
					        this.getMiningOrder(this.miningOrderPage.current)
					      }
		
					      //this.getMiningOrder(this.miningOrderPage.current)
					      //this.getMiningDetailOrder(this.miningOrderDetailPage.current)
					    },
							mounted () {
								//星空效果控制开始
								// let starArr = this.$refs.star
								// starArr.forEach(item => {
								// let speed = 1 + (Math.random() * 1)
								// let thisDistance = this.distance + (Math.random() * 30)
								// item.style.transformOrigin = `0 0 ${thisDistance}px`
								// item.style.transform = `translate3d(0, 0, -${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * 80)}deg) scale(${speed}, ${speed})`
								// })
					            // 星空效果控制结束
		
							},
							methods: {
							  pick(item,type){
				        var that=this
		            var flag = true
		            if(item.miningOrderDetail.length>0){
		              for (let i = 0; i < item.miningOrderDetail.length; i++) {
		                var aaaa = item.miningOrderDetail[i]
		                if(item.staticCoin == aaaa.miningUnit && type =="jing"){
		                  flag = false
		                }
		                if(item.miningCoin == aaaa.miningUnit && type =="chan"){
		                  flag = false
		                }
		              }
		            }
				        if(flag){
		
				          var data =new URLSearchParams();
		              data.set('id',item.miningOrderId);
		              data.set('type',type);
					          pickMiningOrderApi(data).then(res=>{
					            if(res.code == 200){
					              that.$message.success(this.$t("bico.W262"));//"领取成功！"
					              this.getMiningDetailOrder(this.miningOrderDetailPage.current)
					            }else{
					              codeStatus(res.code,function(res){
					                that.$message.error(res);
					              })
					            }
					          })
					        }else{
					          that.$message.error(this.$t("bico.W263"));//已领取过收益
					        }
					      },
					      startUp(item){
					        if(item.miningStatus == '0'){
					          var that=this
					          var data =new URLSearchParams();
					          data.set('id',item.miningOrderId);
					          startUpMiningOrderApi(data).then(res=>{
					            if(res.code == 200){
					              that.$message.success(this.$t("bico.W264"));//启动成功！待服务期满可领取收益
					              this.getMiningOrder(this.miningOrderPage.current)
					            }else{
					              codeStatus(res.code,function(res){
					                that.$message.error(res);
					              })
					            }
					          })
		
					        }
					      },
					      handleClick(val, tab, event) {
						        if(this.activeName=='first'){
					            this.getMiningList(this.miningPage.current)
					          }else if(this.activeName=='second'){
					            if(this.token){
					              this.getMiningOrder(this.miningOrderPage.current)
					            }else{
					              this.$router.push('/login')
					            }
					            //this.getMiningOrder(this.miningOrderPage.current)
					          }else if(this.activeName=='third'){
					            if(this.token){
					              this.getMiningDetailOrder(this.miningOrderDetailPage.current)
					            }else{
					              this.$router.push('/login')
					            }
		
					          }
						        console.log(val,tab, event);
						      },
					      submit(){
					        var that=this
					        that.addMining(this.detail.id)
					      },
					      closeDialog(){
					        this.show=false
					      },
					      sizeChange(){
		
					      },
					      showDetail(item){
					        this.detail=item
					        this.show=true
					      },
					      handleCurrentChange(page){
					        this.currentPage = page;
					        //this.tableData = this.tableDataAllArr[page-1];
					      },
					      addMining(id){
					        var that=this
					        var data =new URLSearchParams();
					        data.set('id',id);
					        addMiningApi(data).then(res=>{
					          if(res.code == 200){
					            //var data = res.data;
					            this.getMiningList(this.miningPage.current)
					            that.$message.success(this.$t("bico.W265"));//购买成功，矿机已加入到 我的矿机 请前往查看启动
					            this.show=false
					          }else{
					            codeStatus(res.code,function(res){
					              that.$message.error(res);
					            })
					          }
					        })
					      },
					      getMiningList(page){
					        var that=this
					        var data =new URLSearchParams();
					        data.set('size',this.miningPage.size);
					        data.set('current',page);
					        miningListApi(data).then(res=>{
					          if(res.code == 200){
					            var data = res.data;
					            that.miningPage= data
		                  that.miningPage.size = Number(that.miningPage.size)
		                  that.miningPage.current = Number(that.miningPage.current)
		                  that.miningPage.total = Number(that.miningPage.total)
		                  that.miningPage.pages = Number(that.miningPage.pages)
		
		                  //  miningOrderPage:{
		                //   current: 1,
		                //     pages: 1,
		                //     records: [],
		                //     searchCount: true,
		                //     size: 10,
		                //     total: 1,
		                // },
		
		
					          }else{
					            codeStatus(res.code,function(res){
					              that.$message.error(res);
					            })
					          }
					        })
					      },
					      getMiningOrder(page){
					        var that=this
					        var data =new URLSearchParams();
					        data.set('size',this.miningOrderPage.size);
					        data.set('current',page);
					        miningOrderApi(data).then(res=>{
					          if(res.code == 200){
					            var data = res.data;
					            console.log(data)
					            that.miningOrderPage= data
		                  that.miningOrderPage.size = Number(that.miningOrderPage.size)
		                  that.miningOrderPage.current = Number(that.miningOrderPage.current)
		                  that.miningOrderPage.total = Number(that.miningOrderPage.total)
		                  that.miningOrderPage.pages = Number(that.miningOrderPage.pages)
					          }else{
					            codeStatus(res.code,function(res){
					              that.$message.error(res);
					            })
					          }
					        })
					      },
		            getMiningDetailOrder: function (page) {
		              var that = this
		              var data = new URLSearchParams();
		              data.set('size', this.miningOrderDetailPage.size);
		              data.set('current', page);
		              miningOrderDetailApi(data).then(res => {
		                if (res.code == 200) {
		                  var data = res.data;
		                  data.size = Number(data.size)
		                  data.current = Number(data.current)
		                  data.total = Number(data.total)
		                  data.pages = Number(data.pages)
		
		
		                  var records = data.records
		                  for (let i = 0; i < records.length; i++) {
		                    var aaa = records[i]
		                    var details = aaa.miningOrderDetail
		
		                    //可领取静态化收益
		                    aaa.kejingtaishouyi = aaa.available
		                    aaa.kejingtaishouyiCoin = aaa.staticCoin
		                    //可领取茶能
		                    aaa.chanShouyi = aaa.received
		                    aaa.chanShouyiCoin = aaa.miningCoin
		                    if (details.length > 0) {
		                      var mining = details.filter(item => item.miningUnit == aaa.miningCoin);
		                      var staticcc = details.filter(item => item.miningUnit == aaa.staticCoin);
		                      if(mining.length>0){
		                        console.log("mining",mining)
		                        aaa.chanShouyi =aaa.chanShouyi- mining[0].output
		                        aaa.chanShouyiCoin = mining[0].miningUnit
		                      }
		                      if(staticcc.length>0){
		                        console.log("staticcc",staticcc)
		
		                        aaa.kejingtaishouyi = aaa.kejingtaishouyi-staticcc[0].output
		                        aaa.kejingtaishouyiCoin = staticcc[0].miningUnit
		                      }
		                    }
		                  }
		
		
		                  that.miningOrderDetailPage = data
		                } else {
		                  codeStatus(res.code, function (res) {
		                    that.$message.error(res);
		                  })
		                }
		              })
		            }
		
		
		          },
		
							components: {
								 Foot,
							},
		
		
						}
</script>

<style scoped>
	/*顶部样式开始*/
							.section-head {
		
								height: 246px;
								background: url(../starchainminer/static/image/my_cryptoloan_header.png) #2354e6 no-repeat center center;
								padding: 48px 0 0;
								width: 100%;
		
								background-size: cover;
								background-position: center;
								display: flex;
								justify-content: space-between;
								align-items: center;
								flex-direction: column;
		
		
		
		
							}
		
							.section-head .contentmep {
								width: 1200px;
								margin: 0 auto;
								padding: 52px 0 24px;
								position: relative;
							}
							.section-head h2 {
								font-size: 36px;
								line-height: 36px;
								color: #fff;
								margin-bottom: 16px;
							}
							.section-head h3 {
								font-size: 16px;
								color: #c4dcff;
							}
		
							.section-head .links {
								align-items: center;
								position: absolute;
								right: 0;
								bottom: 24px;
								display: flex;
								font-size: 14px;
							}
							.section-head .links a {
								color: #deebff;
							}
							.section-head .links a+a {
								display: flex;
								align-items: center;
							}
							.section-head .links a+a:before {
								content: "";
								border-left: 1px solid rgba(222,235,255,.5);
								height: 16px;
								display: inline-block;
								margin-left: 16px;
								padding-left: 16px;
							}
							/*顶部样式结束*/
		
							/*星空样式开始*/
							@keyframes rotate {
							0% {
								transform: perspective(400px) rotateZ(0deg) rotateX(-40deg) rotateY(0);
							}
							100% {
								transform: perspective(400px) rotateZ(0deg) rotateX(-40deg) rotateY(1000deg);
							}
							}
							.stars {
							transform: perspective(500px);
							transform-style: preserve-3d;
							position: absolute;
							perspective-origin: 50% 100%;
							left: 50%;
							animation: rotate 100s infinite linear;
							bottom: 0;
							}
							.star {
							width: 2px;
							height: 2px;
							background: #f7f7b8;
							position: absolute;
							top: 0;
							left: 0;
							backface-visibility: hidden;
							}
							/*星空样式结束*/
</style>

<style scoped>
	/*容器样式*/
							.bg-purple {
								background: #d3dce6;
							}
							.grid-content {
								border-radius: 4px;
								min-height: 36px;
							}
						  	.contentmep2 {
								width: 1200px;
								margin: 0 auto;
								padding: 52px 0 24px;
								position: relative;
								margin-top: 60px;
							}
							.contentmep3 {
								width: 1200px;
								margin: 0 auto;
								padding: 0px 0 24px;
								position: relative;
								margin-top: 0px;
							}
						    .contentmep4 {
								width: 1200px;
								margin: 0 auto;
								padding: 20px 0 24px;
								position: relative;
								margin-top: 0px;
							}
							.contentmep5 {
								width: 1200px;
								margin: 0 auto;
								padding: 0px 0 24px;
								position: relative;
								margin-top: 0px;
							}
							.el-col-10 {
						    width: 24.66667%;
						}
</style>

<style scoped>
	/*矿机列表样式*/
						    .card-primer:not(:nth-child(4n)) {
						       margin-right: calc(5% / 3);
							}
		
							.card-primer {
								width: 100%;
								height: 530px;
								background: #FFFFFF;
								box-shadow: 0px 0px 40px 0px #e2e2e2;
		
								border-radius: 10px;
								margin-top: 20px;
								text-align: center;
								-webkit-transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
								transition: all 250ms cubic-bezier(.02, .01, .47, 1);
								position: relative;
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: space-around;
								z-index: 1;
							}
							.card-btc {
								font-size: 18px;
								font-weight: 500;
								color: #000000;
								line-height: 25px;
								margin: 23px 0 0 0;
								display: flex;
								justify-content: center;
								align-items: center;
							}
							.icon-32 {
								width: 32px;
								height: 32px;
								display: inline-block;
								float: left;
								background-repeat: no-repeat;
								border-radius: 50%;
							}
							.card-btcs {
						    /* width: 113px; */
								height: 16px;
								font-size: 14px;
								font-weight: 400;
								color: #909090;
								line-height: 16px;
								margin: 10px 0 0 0;
							}
		
							.card-primer h1 {
								height: 55px;
								font-size: 28px;
								font-weight: bold;
								color: #e62323;
								line-height: 55px;
								margin: 27px 0 0 0;
							}
							.card-static {
								/* width: 84px; */
								height: 17px;
								font-size: 12px;
								font-weight: 400;
								color: #909090;
								line-height: 17px;
								margin: 10px 0 0 0;
							}
							.card-level {
								width: 90px;
								height: 34px;
								background: #5c00ff;
								border-radius: 16px;
								font-size: 14px;
								font-weight: 400;
								color: #FFFFFF;
								line-height: 34px;
								border: none;
								margin: 0 auto;
								margin-top: 25px;
								position: relative;
							}
							.card-divi {
								width: 221px;
								height: 1px;
								background-color: #F4F4F4;
								position: absolute;
								top: 50%;
								left: calc(50% - 110px);
								z-index: -5;
							}
							.card-p span {
								font-weight: 500;
								line-height: 17px;
							}
							.card-span {
								margin-left: 0;
								display: inline-block;
								font-weight: 400;
								color: #909090;
								line-height: 25px;
							}
							.card-p {
								width: 240px;
								font-size: 14px;
								font-weight: 400;
								display: flex;
								flex-direction: row;
								justify-content: space-between;
								align-items: center;
								text-align: left;
								margin: 0 auto;
								margin-top: 17px;
							}
		
							.fs18 {
								font-size: 18px;
							}
							.card_btns {
								width: 245px;
								height: 40px;
								background: #2c5ef1;
								border-radius: 5px;
								border: 1px solid #EDEDED;
								margin: 19px 0 0 0;
								color: #ffffff;
							}
							.card-line {
								width: 240px;
								margin: 0 auto;
								margin-top: 10px;
								margin-bottom: 10px;
								position: relative;
								display: flex;
								flex-direction: row;
								justify-content: space-between;
							}
							.card-line span {
								margin-left: 5px;
								text-align: right;
								height: 16px;
								font-size: 14px;
								font-weight: 400;
								color: #909090;
								line-height: 16px;
							}
							.line-lines {
								width: 130px;
								height: 4px;
								background: #ECECEC;
								border-radius: 2px;
								margin: 10px 0 0 0px;
							}
							.email-text-a:hover {
							    color: var(--brandColor)!important;
							}
							.text-left button:hover {
							    background: var(--linearGradient1);
							}
							.card-primer:hover {
							    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
							    transform: translate(0,-5px);
							    transition-delay: 0s !important;
							}
</style>

<style scoped>
	/*我的矿机列表样式*/
						.cloud-detail {
						    padding: 32px;
						    -webkit-box-shadow: 0px 0px 31px 0px #EFF2F3;
						    box-shadow: 0px 0px 31px 0px #EFF2F3;
						    border-radius: 10px;
						    margin-top: 0px;
						}
						.cloud-detail-title {
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-orient: horizontal;
						    -webkit-box-direction: normal;
						    -ms-flex-direction: row;
						    flex-direction: row;
						    font-size: 20px;
						    font-weight: bold;
						}
						.card-btc {
						    font-size: 18px;
						    font-weight: 500;
						    color: #000000;
						    line-height: 25px;
						    margin: 23px 0 0 0;
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-pack: center;
						    -ms-flex-pack: center;
						    justify-content: center;
						    -webkit-box-align: center;
						    -ms-flex-align: center;
						    align-items: center;
						}
		
						.icon-32 {
						    width: 32px;
						    height: 32px;
						    display: inline-block;
						    background-repeat: no-repeat;
						    border-radius: 50%;
						}
						.card-btc img {
						    margin: 0 10px 0 0px;
						    vertical-align: sub;
						}
						.icon-32 {
						    width: 32px;
						    height: 32px;
						    display: inline-block;
						    background-repeat: no-repeat;
						    border-radius: 50%;
						}
						.cloud-detail-row {
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-orient: horizontal;
						    -webkit-box-direction: normal;
						    -ms-flex-direction: row;
						    flex-direction: row;
						    -webkit-box-pack: justify;
						    -ms-flex-pack: justify;
						    justify-content: space-between;
						    margin-top: 20px;
						}
						.cloud-row-left {
						    width: 736px;
						}
						.row-left-top {
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-orient: horizontal;
						    -webkit-box-direction: normal;
						    -ms-flex-direction: row;
						    flex-direction: row;
						    -webkit-box-pack: justify;
						    -ms-flex-pack: justify;
						    justify-content: space-between;
						    -webkit-box-align: end;
						    -ms-flex-align: end;
						    align-items: flex-end;
						}
						.profit-rate {
						    color: #e62323;
						    font-size: 28px;
						}
						.fs16 {
						    font-size: 16px;
						}
						.gray-text {
						    color: #999999;
						}
						.mt10 {
						    margin-top: 10px;
						}
						.fs14 {
						    font-size: 14px;
						}
						.fs33 {
						    font-size: 28px;
						}
						.gray-text {
						    color: #999999;
						}
						.fs16 {
						    font-size: 16px;
						}
		
						.row-left-top {
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-orient: horizontal;
						    -webkit-box-direction: normal;
						    -ms-flex-direction: row;
						    flex-direction: row;
						    -webkit-box-pack: justify;
						    -ms-flex-pack: justify;
						    justify-content: space-between;
						    -webkit-box-align: end;
						    -ms-flex-align: end;
						    align-items: flex-end;
						}
						.row-left-bottom {
						    background: #F7F7F7;
						    border-radius: 8px;
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-orient: horizontal;
						    -webkit-box-direction: normal;
						    -ms-flex-direction: row;
						    flex-direction: row;
						    -ms-flex-wrap: wrap;
						    flex-wrap: wrap;
						    font-size: 14px;
						    margin-top: 39px;
						    padding: 14px 0px;
						}
		
						.row-left-bottom div {
						    margin-left: 24px;
						}
						.gray-text {
						    color: #999999;
						}
						.gray-text {
						    color: #999999;
						}
		
		
						.cloud-row-divi {
						    height: 140px;
						    width: 2px;
						    background-color: #ECF2F3;
						}
						.cloud-row-right {
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-orient: vertical;
						    -webkit-box-direction: normal;
						    -ms-flex-direction: column;
						    flex-direction: column;
						    -webkit-box-pack: justify;
						    -ms-flex-pack: justify;
						    justify-content: space-between;
						}
		
						.red-text {
						    color: #676767;
						}
		
						.POSr {
						    background-color: #2483ff;
						}
		
						.POSrr {
						    background-color: #FF5722;
						}
		
						.fs333 {
						    font-size: 34px;
						    color: #24ad20;
						}
		
						.go-buy-selled {
						    width: 240px;
						    height: 48px;
						    border-radius: 4px;
						    color: #fff;
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-pack: center;
						    -ms-flex-pack: center;
						    justify-content: center;
						    -webkit-box-align: center;
						    -ms-flex-align: center;
						    align-items: center;
							cursor: pointer;
						}
						.card-btc2 {
						    font-size: 18px;
						    font-weight: 500;
						    color: #000000;
						    line-height: 25px;
						    margin: 0px 0 0 0;
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-pack: center;
						    -ms-flex-pack: center;
						    justify-content: center;
						    -webkit-box-align: center;
						    -ms-flex-align: center;
						    align-items: center;
						}
						.cloud-row-right {
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-orient: vertical;
						    -webkit-box-direction: normal;
						    -ms-flex-direction: column;
						    flex-direction: column;
						    -webkit-box-pack: justify;
						    -ms-flex-pack: justify;
						    justify-content: space-between;
						}
		
						.icon-32 {
						    width: 32px;
						    height: 32px;
						    display: inline-block;
						    background-repeat: no-repeat;
						    border-radius: 50%;
						}
						.icon-322 {
						    width: 24px;
						    height: 24px;
						    display: inline-block;
						    background-repeat: no-repeat;
						    border-radius: 50%;
						}
</style>



<style scoped>
	/*我的矿机收益列表样式*/
						.overview-card {
						    min-height: 200px;
						    padding: 20px 20px 20px;
						    -webkit-box-shadow: 10px 4px 24px 10px rgba(0, 0, 0, 0.07);
						    box-shadow: 10px 4px 24px 10px rgba(0, 0, 0, 0.07);
						    border-radius: 10px;
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-orient: horizontal;
						    -webkit-box-direction: normal;
						    -ms-flex-direction: row;
						    flex-direction: row;
						    -webkit-box-pack: justify;
						    -ms-flex-pack: justify;
						    justify-content: space-between;
						    -webkit-box-align: center;
						    -ms-flex-align: center;
						    align-items: center;
						    margin-top: 40px;
						}
						.cloud-detail-title {
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-orient: horizontal;
						    -webkit-box-direction: normal;
						    -ms-flex-direction: row;
						    flex-direction: row;
						    font-size: 20px;
						    font-weight: bold;
						}
		
						.flex-1 {
						    -webkit-box-flex: 1;
						    -ms-flex: 1;
						    flex: 1;
						}
		
						.flex-start {
						    -webkit-box-pack: start;
						    -ms-flex-pack: start;
						    justify-content: flex-start;
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						}
						.ml70 {
						    margin-left: 70px;
						}
						.fs12 {
						    font-size: 12px;
						}
						.mt8 {
						    margin-top: 8px;
						}
						.fs20 {
						    font-size: 18px;
						}
		
						.overview-btn {
						    font-size: 14px;
						    color: white;
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-pack: center;
						    -ms-flex-pack: center;
						    justify-content: center;
						    -webkit-box-align: center;
						    -ms-flex-align: center;
						    align-items: center;
						    border-radius: 4px;
						    background: #2358f7;
						    cursor: pointer;
						    min-height: 22px;
						    padding: 5px 16px;
						}
		
						.go-buy-btn {
						    font-size: 14px;
						    color: #2358f7;
						    display: -webkit-box;
						    display: -ms-flexbox;
						    display: flex;
						    -webkit-box-pack: center;
						    -ms-flex-pack: center;
						    justify-content: center;
						    -webkit-box-align: center;
						    -ms-flex-align: center;
						    align-items: center;
						    border-radius: 4px;
						    border: solid 1px #2358f7;
						    cursor: pointer;
						    min-height: 20px;
						    padding: 5px 16px;
						}
		
						.mt16 {
						    margin-top: 16px;
						}
		
						.ml80 {
						    margin-left: 40px;
						}
						.color-E64E62 {
						    color: #e62323;
						}
		
		
						.anniujuzhong{
							/*text-align: center;*/
							color: #000000;
			                font-size: 16px;
							height: 40px;
			                line-height: 40px;
		
						}
						.anniujuzhong2{
							/*text-align: center;*/
							color: #000000;
			                font-size: 16px;
							height: 40px;
			                line-height: 40px;
							/*display: flex;
							justify-content: flex-end;*/
		
						}
						.kjmc{
		
							font-size: 18px;
							font-weight: bold;
							color: #333333;
							letter-spacing: 2px;
							padding: 0px 14px;
						}
		
						.animated {
		            -webkit-animation-duration: 3s;
		            animation-duration: 3s;
		            -webkit-animation-fill-mode: both;
		            animation-fill-mode: both
		        }
		
		        .animated.infinite {
		            -webkit-animation-iteration-count: infinite;
		            animation-iteration-count: infinite
		        }
		        .flash {
		
					width: 20px;
					height: 20px;
					/*background-color: #2483ff;*/
					border-radius: 50px;
		            -webkit-animation-name: flash;
		            animation-name: flash
		        }
		         @-webkit-keyframes flash {
		            0%,100%,50% {
		                opacity: 1
		            }
		
		            25%,75% {
		                opacity: 0
		            }
		        }
		
		        @keyframes flash {
		            0%,100%,50% {
		                opacity: 1
		            }
		
		            25%,75% {
		                opacity: 0
		            }
		        }
				
				.card-btccc{
				font-size: 18px;
				font-weight: 500;
				color: #000000;
				line-height: 25px;
				margin: 0px 0 0 0;
				display: -webkit-box;
				display: -ms-flexbox;
				/* display: flex; */
				/* -webkit-box-pack: center; */
				-ms-flex-pack: center;
				/* justify-content: center; */
				-webkit-box-align: center;
				-ms-flex-align: center;
				}
				.btc-btc321{
					    margin: 0px 14px 0 0;
				}
				.el-divider--horizontal {
					display: block;
					height: 1px;
					width: 98%;
					margin: 24px 0;
	
	            }
</style>