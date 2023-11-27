<template>
	<div id="trade-view"></div>
</template>

<script>
	import { widget } from '../../static/charting_library/charting_library.min.js'
	import datafeeds from '@/js/datafees.js'
	import { baseUrl } from '@/config/env'
	import { klineApi } from '@/api/getData'
	export default {
		props:['symbolValue','type','klineObj'],
		data() {
			return {
				symbol: 'BTC/USDT',
				interval: '15min',
				chart: null,
				initdata:{},
				countDate: 0, //累加条数
				startData: 0, //起始条数
				lengsData: 200, //结束长度
				datafeeds: new datafeeds(this),
				onLoadedCallback: null, //初始数据回调
                onRealtimeCallback: null, //websocket数据回调
                baseUrl,
				pageRequire:0,
				websock:null,
				timerY:null
			}
		},
		created() { 
			this.symbol = ((this.symbolValue).split('-'))[0];
			// console.log(this.symbolValue)
		},
		computed:{
			getCoin(){
				return this.symbolValue
			},
			getTimes(){
				return this.interval
			}
		},
		watch:{
			getCoin(newValue){
				var self = this;
				self.symbol = ((newValue).split('-'))[0];
				self.chart.chart().setChartType(1);
				self.chart.setSymbol(self.symbol, self.filter(self.interval));

				// self.loadChart();
			},
			getTimes(newValue){
				var that = this;
				// that.webSocket();
				// that.getAjaxData();
			}
		},
		
		methods: {

			filter(time) {
				if(time == '1min')
					return '1';

				else if(time == '5min')
					return '5';
				
				else if(time == '15min')
					return '15';

				else if(time == '30min')
					return '30';

				else if(time == '60min')
					return '60';

				else if(time == '4hour')
					return '240'

				else if(time == '1day')
					return '1D';

				else if(time == '1week')
					return '1W';
			},
			
			//ajax
			getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback) {
				this.getAjaxData();
                this.onLoadedCallback = onLoadedCallback;
			},
			//socket
			subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
				var that = this;
				that.onRealtimeCallback = onRealtimeCallback; 
				if(that.type == 1){
					clearInterval(that.timerY);
				}
                that.webSocket();
			},

			//获取配置信息
			getSymbol(symbol) {
				return {
					'name': symbol,
					'full_name': symbol,
					'timezone': 'Asia/Shanghai',
					'minmov': 1,
					'minmov2': 0,
					'pointvalue': 1,
					'fractional': false,
					'session': '24x7',
					'has_intraday': true,
					'has_no_volume': false,//是否将成交量独立出来
					'description': symbol,
					'pricescale':  100,//刻度值,保留小数，如：2位小数传100，
					'ticker': symbol,
				}
			},

			//设置品信息(重新获取初始数据/推送数据)
			setSymbols() {
				let self = this;
				self.chart.setSymbol(self.symbol, self.filter(self.interval),function(){
					self.chart.chart().setVisibleRange(self.initdata)
					self.chart.chart().executeActionById("timeScaleReset");
				});
			},
			
			//卸载K线
			removeChart() {
				if (this.chart) {
					
					// this.chart.remove();
					// this.chart = null;
				}
            },
			
			//加载K线图插件
			loadChart() {

				let self = this;
				var local = sessionStorage.getItem('language');
				var languageTxt = '';

				if(local == 'en'){
					languageTxt = 'en'
				}else if(local == 'jp'){
					languageTxt = 'ja'
				}else if(local == 'ko'){
					languageTxt = 'ko'
				}else{
					languageTxt = 'zh_TW'
				}
				this.chart = new widget({
					container_id: 'trade-view',
					symbol: self.symbol,
					interval: self.filter(self.interval),
                    locale: languageTxt,
					theme: 'Dark',
					debug: false,//注释在控制台打印的错误
					// autosize: true,
					// // //图标宽度
					width: '100%',
					// //图标高度
					height: 600,
					// fullscreen: true,
					// preset: "mobile",
					datafeed: this.datafeeds,
					timezone: 'Asia/Shanghai',
					library_path: 'static/charting_library/',
					indicators_file_name: "custom-study.js",
					drawings_access: {type: 'black',tools: [{name: "Regression Trend"}]},
					toolbar_bg: '#000000',//左侧工具栏背景颜色
					loading_screen: {//定制加载进度条
						backgroundColor: "#181B2A"
					},
					charts_storage_url: 'http://saveload.tradingview.com',
					charts_storage_api_version: "1.1",
                    client_id: 'tradingview.com',
					overrides: self.overrides(),
					//启用的功能
					enabled_features: [
						'same_data_requery',
                        // 'disable_resolution_rebuild',//显示的时间与得到的数据时间一致
						'study_templates',
					],

					//面板上禁用的功能
					disabled_features: [
						"header_resolutions", //时间选择、分时切换
						"timeframes_toolbar", //底部时间栏
						"header_screenshot", //截图相机
						"header_symbol_search", //搜索框
						"header_saveload",
						'save_chart_properties_to_local_storage',
						"volume_force_overlay",//在主数据列的同一窗格上放置成交量指示器
						"use_localstorage_for_settings",//允许将用户设置保存到localstorage
						"header_chart_type",//图表类型切换 
						"header_compare",//头部对比信息按钮
						"display_market_status",
						"header_undo_redo", //头部左右箭头
						"header_indicators", //指标
						"snapshot_trading_drawings",//包含屏幕截图中的订单/位置/执行信号
                        "header_settings", //设置按钮
					],

					studies_overrides: {
						//柱状图颜色
						"volume.volume.color.0": "#FA5252",
						"volume.volume.color.1": "#12B886",

						"MA Cross.short:plot.color": "#6B3798",
      					"MA Cross.long:plot.color": "#708957",

						//MACD样式
						"MACD.MACD.color":"#F6D399",
						"MACD.Signal.color":"#3884FF",
						"MACD.Histogram.color":"#6fc1a1",
						'MACD.Histogram.linewidth':4,
					},
				});

				this.chart.onChartReady(function() {//创建tradingview图
					try {
						//1min按钮
                        self.chart.createButton()
							.attr('title', "1min")
                            .on('click', function(e) {
								
								if ($(this).hasClass("selected")) return;
								$(this)
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find(".selected")
								.removeClass("selected");
								self.interval = '1min';
								$(this).find('span').css('color','#2178FB');  
								$(this)
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find("span").css('color','#61688a');
								self.chart.chart().setChartType(1);
								self.chart.setSymbol(self.symbol, "1");
                            })
                            .append('<span style="color: #61688a;">1min</span>');
                        //5min按钮
                        self.chart.createButton()
                            .attr('title', "5min")
                            .on('click', function(e) {
								if ($(this).hasClass("selected")) return;
								$(this) 
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find(".apply-common-tooltip.selected")
								.removeClass("selected");
								self.interval = '5min';
								$(this).find('span').css('color','#2178FB');  
								$(this)
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find("span").css('color','#61688a');
								self.chart.chart().setChartType(1);
								self.chart.setSymbol(self.symbol, "5");
                            })
							.append('<span style="color: #61688a;">5min</span>');
						// //15min按钮
                        self.chart.createButton()
                            .attr('title', "15min")
                            .on('click', function(e) {
								if ($(this).hasClass("selected")) return;
								$(this) 
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find(".apply-common-tooltip.selected")
								.removeClass("selected");
								self.interval = '15min';
								$(this).find('span').css('color','#2178FB');  
								$(this)
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find("span").css('color','#61688a');
								self.chart.chart().setChartType(1);
								self.chart.setSymbol(self.symbol, "15");
                            })
                            .append('<span style="color: #2178FB;">15min</span>');
                        //30min
                        self.chart.createButton()
                            .attr('title', "30min")
                            .on('click', function(e) {
								self.interval = '30min';
								$(this).find('span').css('color','#2178FB');  
								$(this)
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find("span").css('color','#61688a');
								self.chart.chart().setChartType(1);
								self.chart.setSymbol(self.symbol, "30");
                            })
                            .append('<span style="color: #61688a ;">30min</span>');

                        //1hour
                        self.chart.createButton()
                            .attr('title', "60min")
                            .on('click', function(e) {
								self.interval = '60min';
								$(this).find('span').css('color','#2178FB');  
								$(this)
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find("span").css('color','#61688a');
								self.chart.chart().setChartType(1);
								self.chart.setSymbol(self.symbol, "60");
                            })
                            .append('<span style="color:  #61688a;">1H</span>');

                        //4hour
                        self.chart.createButton()
                            .attr('title', "4hour")
                            .on('click', function(e) {
								self.interval = '4hour';
								$(this).find('span').css('color','#2178FB');  
								$(this)
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find("span").css('color','#61688a');
								self.chart.chart().setChartType(1);
								self.chart.setSymbol(self.symbol, "240");
                            })
                            .append('<span style="color:  #61688a;">4H</span>');

                        //1day
                        self.chart.createButton()
                            .attr('title', "1day")
                            .on('click', function(e) {
								self.interval = '1day';
								$(this).find('span').css('color','#2178FB');  
								$(this)
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find("span").css('color','#61688a');
								self.chart.chart().setChartType(1);
								self.chart.setSymbol(self.symbol, "1D");
                            })
                            .append('<span style="color:  #61688a;">1D</span>');
						
                        //1week
                        self.chart.createButton()
                            .attr('title', "1week")
                            .on('click', function(e) {
								self.interval = '1week';
								$(this).find('span').css('color','#2178FB');  
								$(this)
								.addClass("selected")
								.parents(".group-wWM3zP_M-")
								.siblings(".group-wWM3zP_M-")
								.find("span").css('color','#61688a');
								self.chart.chart().setChartType(1);
								self.chart.setSymbol(self.symbol, "1W");
                            })
                            .append('<span style="color:  #61688a;">1W</span>');
					
                        //图标属性
                        self.chart.createButton()
                            .attr('title',self.$t('nav.iconName'))
                            .on('click', function(e) {
                                self.chart.save(function(data) {
                                    self.chart.chart().executeActionById("chartProperties");
                                })
                            })
                            .append('<img src="setting.svg" width="20" align="center"/>');
					
                        //指标
                        self.chart.createButton()
                            .attr('title', self.$t('nav.quota'))
                            .on('click', function(e) {
                                self.chart.save(function(data) {
                                    self.chart.chart().executeActionById("insertIndicator");
                                })
                            })
                            .append('<img src="quota.svg" width="20" align="center"/>');

						self.chart.chart().createStudy("Moving Average", !1, !1, [5], null, {'Plot.color': '#E6D399'});
						self.chart.chart().createStudy("Moving Average", !1, !1, [10], null, {'Plot.color': '#C479E5'});
						self.chart.chart().createStudy("Moving Average", !1, !1, [30], null, {'Plot.color': '#8ADDC6'});
						// self.chart.chart().createStudy('指数平滑异同移动平均线(MACD_Custom)', false, false, [20], null, {});//自定义MACD
						// self.chart.chart().createStudy('MACD', false, false, [12], null, {});//自定义MACD

					} catch(e) {}
				})

			},

			overrides() {
            	let style = {
					up: "#6FC1A1",//阳线
					down: "#EC6543",//阴线
					bg: "#1d1d29",
					// grid: "#1e2235",//方格
					grid: "#0066ED",//方格
					cross: "#9194A3",//十字交叉记号
					border: "#4e5b85",
					// borderUpColor: "#6FC1A1",
					borderUpColor: "#0066ED",
					// borderDownColor: "#EC6543",
					borderDownColor: "#0066ED",
					text: "#61688A",
					areatop: "rgba(122, 152, 247, .2)",
					areadown: "rgba(122, 152, 247, .02)"
                };

            	return {
            		//窗格背景
                    "paneProperties.background": "#000000",
                    //纵向网格线颜色
                    "paneProperties.vertGridProperties.color": "#1B1E27",
                    //横向网格线颜色
                    "paneProperties.horzGridProperties.color": "#1B1E27",
                    //标记水印透明度
                    "symbolWatermarkProperties.transparency": 0,
                    //刻度属性文本颜色
                    "scalesProperties.textColor": '#757575',
                    // 设置坐标轴字体大小
                    //'scalesProperties.fontSize': 16, 
                    //不隐藏左上角标题
                    'paneProperties.legendProperties.showLegend': true,
                    'left_toolbar': false,
                    //销量面板尺寸，支持的值: large, medium, small, tiny
                    "volumePaneSize": "large",
                    //隐藏左边尺度
                    "scalesProperties.showLeftScale" : false
				};
            },

			//ajax获取初始数据
			getAjaxData() {
				let self = this;
				self.$nextTick(async () => {
					var dataArr = new URLSearchParams();
					dataArr.set('symbol',self.symbol);
					dataArr.set('period',self.interval);
					dataArr.set('size',600);
					dataArr.set('type',self.type);
					var result = await klineApi(dataArr);
					// console.log(result)
					if(result.success){
						let
							bars = [],
							data = result.data;
						
						if(self.type == 1){
							data.reverse();
						}
						data.forEach(item => {
							let newObj = {
                                //差8个小时 8*3600*1000
								// time: (Number(item.id) * 1000)+8*3600*1000,
								time: (Number(item.id) * 1000),
                                close: item.close,
								open: item.open,
								high: item.high,
								low: item.low,
								volume: item.amount
							}

							bars.push(newObj)
						})
                        self.startData = self.startData + self.lengsData + self.countDate + 1;
						self.onLoadedCallback(bars);
					}
				})
			},

			//获取推送数据
			webSocket() {
				let self = this;

				// if(self.type == 1){
					// console.log('合约')
					self.timerY = setInterval(() =>{	
						self.$nextTick(async () => {
							var dataArr = new URLSearchParams();
							dataArr.set('symbol',self.symbol);
							dataArr.set('period',self.interval);
							dataArr.set('size',600);
							dataArr.set('type',self.type);
							var result = await klineApi(dataArr);
							if(result.success){
								var obj = result.data;
								// console.log(obj);
								var arrLength = obj.length;
								
								if(arrLength>0){
									if(self.type == 1){
										obj.reverse();
									}
									obj.forEach((item,index)=>{
										if(index == (arrLength-1)){
											let dise = {
												time: (item.id) * 1000,
												open: item.open,
												close: item.close,
												high: item.high,
												low: item.low,
												volume: item.amount
											};
											// console.log(dise);
											self.$emit('getValueDise',dise)
											self.onRealtimeCallback(dise)
										}


									})
								}
								
							}
						})
					
					},1000)
				// }else{
					// var pako = require('pako');
					// var a = self.symbol;
					// var b,coinType = '';
					// b = a.toLowerCase();
					// coinType = b.replace(/\//g,'');

					// let subK = { // 订阅数据
					// 	sub: "market."+ coinType +".kline."+self.interval,
					// 	id: coinType+self.interval
					// };

					// try {self.websock.close()} catch(e) {}

					// self.websock = new WebSocket('wss://api.huobi.pr/ws');
					// self.websock.onopen = function () {
					// 	// console.log("建立联接");
					// 	self.websock.send(JSON.stringify(subK));
					// };
					// self.websock.onmessage = function(event) {
					// 	let blob = event.data;
					// 	let reader = new FileReader();
					// 	reader.onload = function (e) {
					// 		let ploydata = new Uint8Array(e.target.result);
					// 		let msg = pako.inflate(ploydata, {to: 'string'});
					// 		self.handleData(msg);
					// 	};
					// 	reader.readAsArrayBuffer(blob, "utf-8");
					// };
					// /*连接关闭*/
					// self.websock.onclose = evt => {
					// 	// self.webSocket();
					// 	// console.log("webSocket连接关闭");
					// };
					// /*连接发生错误时*/
					// self.websock.onerror = (evt,e) => {
					// 	// console.log(evt);
					// };
		
				// }
				
			},
			handleData(msg){
				var self = this;
				let data = JSON.parse(msg);
				if (data.ping) {
					// 如果是 ping 消息
					self.sendHeartMessage(data.ping);
				} else if (data.status === 'ok') {
					// 响应数据
					self.handleReponseData(data);
				} else {
					// 数据体
					var obj = data.tick;
					// console.log(obj)
					let dise = {
						time: (obj.id) * 1000,
						open: obj.open,
						close: obj.close,
						high: obj.high,
						low: obj.low,
						volume: obj.amount
					};
					if(self.type == 1){
						self.$emit('getValueDise',dise);
					}
					self.onRealtimeCallback(dise)
				}
			},
			sendHeartMessage(ping) {
				this.websock.send(JSON.stringify({"pong": ping}));
			},
			handleReponseData(data) {
				// console.log(data)
			}
		},
		created(){

		},
		mounted() {
			let self = this;
			//加载K线图
			self.loadChart();
		},
		beforeDestroy(){
			var self = this;
			if(self.websock){
				self.websock.close(); 
			}
			clearInterval(self.timerY);
		}
	}
</script>
<style>
#trade-view{
	margin: 20px;
}
</style>