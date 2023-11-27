<template>
	<div class="echartsBox">
		<div class="tabs">
			<div v-for="(item,index) in timeArr" :key="item+index" :class="['tabItem',index==tabItemActiveIndex?'tabItemActive':'']" @click="tabchange(index)">{{item}}</div>
		</div>
		<div class="kgds">
			<div><span class="k">开= </span><span class="v">{{kv.open}}</span></div>
			<div><span class="k">高= </span><span class="v">{{kv.high}}</span></div>
			<div><span class="k">低= </span><span class="v">{{kv.low}}</span></div>
			<div><span class="k">收= </span><span class="v">{{kv.close}}</span></div>
		</div>
		<div id="echartsK" style="height: 208px;"></div>
	</div>
</template>
<script>
	import echarts from 'echarts'
    import { klineApi } from '@/api/getData'
	export default{
		props:{
			symbols:{
				type:String,
				default:'BTC/USDT'
			}
		},
		watch:{
			symbols(n,o){
				this.getKlineData(n,this.interArr[this.tabItemActiveIndex]);
			}
		},
		data(){
			return {
				tabItemActiveIndex:0,
				timeArr:['分时','M1','M5','M15','M30','H1','H4','D1','W1','M1'],
                interArr:['15min','1min','5min','30min','60min','4hour','1day','1week'],
				kv:{
					open:'',
					high:'',
					low:'',
					close:''
				}
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getKlineData(this.symbols,this.interArr[this.tabItemActiveIndex]);
			})
		},
		methods: {
            getKlineData(symbols,interval){
                var dataArr = new URLSearchParams();
                dataArr.set('symbol',symbols);
                dataArr.set('period',interval);
                dataArr.set('size',600);
                dataArr.set('type','0');
                klineApi(dataArr).then(r=>{
                    this.echartsInit(r.data.reverse());                    
                })
            },
			d_formatTime(ms){
				let d = new Date(parseInt(ms));
				let Y = d.getFullYear();
				let M = d.getMonth()+1>9?d.getMonth()+1:'0'+(d.getMonth()+1);
				let D = d.getDate()>9?d.getDate():'0'+d.getDate();
				let h = d.getHours()>9?d.getHours():'0'+d.getHours();
				let m = d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes();
				return `${h}:${m}`;
		    },
			tabchange(index){
				this.tabItemActiveIndex = index;
                let interval = this.interArr[index];
                this.getKlineData(this.symbols,interval)
			},
            calculateMA(dayCount,values){
                var result = [];
                for (var i = 0, len = values.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += values[i - j][1];
                    }
                    result.push(+(sum / dayCount).toFixed(3));
                }
                return result;
            },
			echartsInit(datas) {
				let that = this;
				let upColor = '#00b275'; //红涨
				let downColor = '#f15057'; //绿跌
                let dataTime = [];
                let dataMes = [];
                let volumeNum = [];

                datas.forEach(v=>{
                    dataTime.push(this.d_formatTime(parseInt(v.id)*1000));
                    dataMes.push([v.open,v.close,v.low,v.high]);
                    volumeNum.push(v.vol)
                });
                this.kv.open = dataMes[0][1];
                this.kv.high = dataMes[0][4];
                this.kv.low = dataMes[0][3];
                this.kv.close = dataMes[0][2];

				let volumeData = [] //交易量添加颜色判断
				for (let i = 0; i < dataMes.length; i++) {
					volumeData.push([i, volumeNum[i], dataMes[i][0] > dataMes[i][1] ? 1 : -1]);
				};
				let option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							link: {
								xAxisIndex: 'all'
							}, //上下划过分开展示还是一起展示
						},
						textStyle: {
							color: '#000'
						},
						formatter: function(params) { //修改鼠标划过显示为中文
							if (params[0].componentSubType == "candlestick") { //先划过蜡烛图
								var params1 = params[0]; //开盘收盘最低最高数据汇总
								var params2 = params[1].data[1]; //成交量数据
							} else if (params[0].componentSubType == "bar") { //先划过成交量
								var params1 = params[1]; //开盘收盘最低最高数据汇总
								var params2 = params[0].data[1]; //成交量数据
							}
							var currentItemData = params1.data; //k线数据
							that.kv.open = currentItemData[1];
							that.kv.high = currentItemData[4];
							that.kv.low = currentItemData[3];
							that.kv.close = currentItemData[2];
							return '';
						}
					},
					axisPointer: {
						link: {
							xAxisIndex: 'all'
						}, //整体划过还是单个划过
						label: {
							backgroundColor: '#777'
						}
					},
					visualMap: { //视觉映射组，就是将数据映射到视觉元素
						show: false,
						seriesIndex: 1, //指定取哪个系列的数据，第几个图形的数据，从0开始，1代表的是成交量的柱状图
						pieces: [{ //自定义『分段式视觉映射组件』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
							value: 1, //value值为1则用downColor颜色的样式
							color: '#589065'
						}, {
							value: -1,
							color: '#AE4E54'
						}]
					},
					grid: [{ //蜡烛图的位置
						left: 20,
						top: 30,
						right: 50,
						bottom: 18,
					}, { //成交量柱状图的位置
						left: 20,
						right: 50,
						bottom: 18,
						height: 40,

					}],
					xAxis: [{ //蜡烛图的设置
						type: 'category',
						data: dataTime,
						scale: true,
						//boundaryGap: false,
						axisLine: {
							onZero: false
						},
						splitLine: {
							show: false
						},
						splitNumber: 20,
						min: 'dataMin',
						max: 'dataMax',
						axisPointer: {
							z: 100
						},
						axisLine:{
							lineStyle:{
								color:'#79797a'
							}
						},
						axisLabel: {
							show: true
						},

					}, { //成交量柱状图的设置
						type: 'category',
						gridIndex: 1,
						data: dataTime,
						scale: true,
						axisLine: {
							onZero: false
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						},
						axisLabel: {
							show: false
						},
						axisLine:{
							lineStyle:{
								color:'#79797a'
							}
						},
						splitNumber: 20,
						min: 'dataMin',
						max: 'dataMax'
					}],
					yAxis: [{
						scale: true,
						splitArea: {
							show: false
						},
						position: 'right',
						splitLine: {
							show: false
						},
						axisLine:{
							lineStyle:{
								color:'#79797a'
							}
						}
					}, {
						scale: true,
						gridIndex: 1,
						splitNumber: 2,
						axisLabel: {
							show: false
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						}
					}],
					dataZoom: [{
						type: 'inside',
						xAxisIndex: [0, 1],
						start: 0,
						end: 20
					}],
					series: [{ //蜡烛图的设置
						type: 'candlestick',
						data: dataMes,
						itemStyle: {
							color: upColor,
							color0: downColor,
							borderColor: null,
							borderColor0: null
						},
					},
                    { //成交量柱状图的设置
						name: 'Volume',
						type: 'bar',
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: volumeData
					},
                    {
                        name: 'MA5',
                        type: 'line',
                        data: this.calculateMA(5, dataMes),
                        smooth: true,
                        symbol:'none',
                        itemStyle:{
                            color:'#000',//黑色
                        },
                        lineStyle:{
                            opacity:0.5
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        data: this.calculateMA(10, dataMes),
                        smooth: true,
                        symbol:'none',
                        itemStyle:{
                            color:'green',//绿色
                        },
                        lineStyle:{
                            opacity:0.5
                        }
                    },
                    {
                        name: 'MA20',
                        type: 'line',
                        data: this.calculateMA(20, dataMes),
                        smooth: true,
                        symbol:'none',
                        itemStyle:{
                            color:'blue',//蓝色
                        },
                        lineStyle:{
                            opacity:0.5
                        }
                    },
                    {
                        name: 'MA30',
                        type: 'line',
                        data: this.calculateMA(30, dataMes),
                        smooth: true,
                        symbol:'none',
                        itemStyle:{
                            color:'red',//红色
                        },
                        lineStyle:{
                            opacity:0.5
                        }
                    },
                   ]
				};
				let myChart = echarts.init(document.getElementById('echartsK'));
                myChart.clear();
				myChart.setOption(option)
			},
		}
	}
</script>
<style scoped>
	div{
		box-sizing: border-box;
	}
	.echartsBox{
		width: 100%;
		height: 240px;
		position: relative;
	}
	.tabs{
		display: flex;
		padding: 0 20px;
	}

	.tabItem:hover{
		color: #c7cce6;
		border: solid 1px #c7cce6;
	}

	.kgds{
		padding: 4px 20px 0;
		display: flex;
		position: absolute;
		top: 33px;
		left: 0;
		z-index: 10;
	}
	.kgds>div{
		margin-right: 8px;
	}
	.k{
		color:rgb(97, 104, 138);
	}
	.v{
		color: rgb(60, 120, 216)
	}
</style>
