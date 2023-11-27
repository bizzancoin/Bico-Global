<template>
  <div class="d_page">
    <div class="d_container">

     <div data-v-2be6a87c="" class="section-head2">
        <div data-v-2be6a87c="" class="content">
          <h2 data-v-2be6a87c="">
           {{$t('licai.lc1')}}
          </h2>
          <h3 data-v-2be6a87c="">
            {{$t('licai.lc2')}}
          </h3>
          <div data-v-2be6a87c="" class="links">

            <img class="d_topRight" src="../assets/GHJH23E9CDFT33.png" alt="">
          </div>
        </div>
      </div>

      <div class="d_container2">
      </div>
      <div class="d_center">
          <div class="d_tabs">
              <div :class="['d_tabItem',d_tabItenIndex=='1'?'d_tabItemActive':'']" @click="d_tabChange(1)">{{$t('licai.lc4')}}</div>
              <div :class="['d_tabItem',d_tabItenIndex=='2'?'d_tabItemActive':'']" @click="d_tabChange(2)">{{$t('licai.lc5')}}</div>
          </div>
          <div v-if="d_tabItenIndex==1" class="d_tabBox1">
              <div class="d_tabBox1Left">
                  <div class="d_cleftItem">
                      <div class="d_label">{{$t('licai.lc6')}} (USDT)</div>
                      <div class="d_input">
                          <el-input :placeholder="$t('home.huobi86')" v-model="input" @blur="checkNum">
                              <el-select v-model="select" slot="append" :placeholder="$t('home.huobi87')" class="d_select" disabled>
                                  <el-option label="USDT" value="1"></el-option>
                              </el-select>
                          </el-input>
                      </div>
                      <div class="d_desc">{{$t('licai.lc7')}}  {{minNum}} USDT ≤ {{$t('licai.lc8')}} ≤ {{maxNum}} USDT</div>
                  </div>

                  <div class="d_cleftItem">
                      <div class="d_label">{{periodicStr}}</div>
                      <div class="d_input">
                          <el-slider v-model="value4" :min="sliderMin" :max="sliderMax" :format-tooltip="formatTooltip"></el-slider>
                      </div>
                      <div class="d_desc1">
                          <div>0%</div>
                          <div>100%</div>
                      </div>
                  </div>
                  <div class="d_cleftItem">
                      <div class="d_desc">{{$t('licai.lc11')}}</div>
                      <br>
                      <div class="d_desc">{{$t('licai.lc12')}}</div>
                      <br>
                      <div class="d_btns">
                          <div v-for="(item,index) in dayArr" :key="item" :class="['d_buttonItem',d_buttonItemActiveIndex==index?'d_buttonItemActive':'']" @click="d_btnChange(item,index)">{{
                              typeStatus[item.type]}}</div>
                      </div>
                  </div>
                  <div class="d_cleftItem d_jkBox">
                      <div class="d_jkCheckBox">
                        <el-checkbox v-model="checked">{{$t('licai.lc13')}}</el-checkbox>
                        <!-- <a href="/">{{$t('licai.lc14')}}</a> -->
                      </div>
                      <div>
                        <el-button type="primary" class="d_loginJk" @click="periodicAdd">{{$t('licai.lc15')}}</el-button>
                      </div>
                  </div>
              </div>
              <div class="d_tabBox1Right">
                <div class="d_tabBox1RightContent">
                  <div class="d_rightTitle">{{$t('licai.lc16')}}</div>
                  <div class="d_rightPriceText">{{$t('licai.lc17')}}  (USDT) </div>
                  <div class="d_rightPriceBox">
                    <span class="d_rightPriceNum">{{walletNum}}</span>
                    <span class="d_rightPriceUnit">USDT</span>
                  </div>
                  <div class="d_rightDesc">
                    <div class="d_rightDI">
                      <el-tooltip placement="bottom">
                        <div slot="content">
                          {{$t('licai.lc18')}} USDT  <br/> = {{$t('licai.lc19')}} USDT {{$t('licai.lc20')}} {{weekRate}} {{$t('licai.lc21')}}
                        </div>
                        <div class="d_rightDILabel">{{$t('licai.lc22')}}</div>
                      </el-tooltip>
                      <span class="d_rightLabelRoate">{{weekRate}}</span>
                    </div>
                    <div class="d_rightDI">
                      <el-tooltip placement="bottom">
                        <div slot="content">
                          {{$t('licai.lc18')}} USDT  <br/> = {{$t('licai.lc19')}} USDT {{$t('licai.lc20')}} {{monthRate}} {{$t('licai.lc21')}}
                        </div>
                        <div class="d_rightDILabel">{{$t('licai.lc23')}}</div>
                      </el-tooltip>
                      <span class="d_rightLabelRoate">{{monthRate}}</span>
                    </div>
                    <div class="d_rightDI">
                      <el-tooltip placement="bottom">
                        <div slot="content">
                          {{$t('licai.lc18')}} USDT  <br/> = {{$t('licai.lc19')}} USDT {{$t('licai.lc20')}} {{jiRate}} {{$t('licai.lc21')}}
                        </div>
                        <div class="d_rightDILabel">{{$t('licai.lc24')}}</div>
                      </el-tooltip>
                      <span class="d_rightLabelRoate">{{jiRate}}</span>
                    </div>
                    <div class="d_rightDI">
                      <el-tooltip placement="bottom">
                        <div slot="content">
                          {{$t('licai.lc18')}} USDT  <br/> = {{$t('licai.lc19')}} USDT {{$t('licai.lc20')}} {{yearRate}} {{$t('licai.lc21')}}
                        </div>
                        <div class="d_rightDILabel">{{$t('licai.lc25')}}</div>
                      </el-tooltip>
                      <span class="d_rightLabelRoate">{{yearRate}}</span>
                    </div>
                  </div>
                  <div class="d_rightHkBox">
                    <div class="d_HkLine"></div>
                    <div class="d_hkTitle">{{$t('licai.lc26')}}</div>
                    <div class="d_hkInfo">
                      <div class="d_hkInfoText">{{$t('licai.lc27')}} (USDT)</div>
                      <div class="d_hkInfoNum">{{Number(winTotal).toFixed(4)}} USDT</div>
                    </div>
                    <br>
                    <div class="d_hkInfo">
                      <div class="d_hkInfoText">{{$t('licai.lc28')}} (USDT)</div>
                      <div class="d_hkInfoNum">{{Number(noWinTotal).toFixed(4)}} USDT</div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div v-else class="d_tabBox2">
            <div class="d_box2Desc">
              <div class="d_box2DescItem">
                <div class="d_box2Text">{{$t('licai.lc29')}} (USDT)</div>
                <div class="d_box2Num">{{Number(principal).toFixed(4)}}</div>
              </div>
              <div class="d_box2DescItem">
                <div class="d_box2Text">{{$t('licai.lc27')}} (USDT)</div>
                <div class="d_box2Num">{{Number(winTotal).toFixed(4)}}</div>
              </div>
              <div class="d_box2DescItem">
                <div class="d_box2Text">{{$t('licai.lc28')}} (USDT)</div>
                <div class="d_box2Num">{{Number(noWinTotal).toFixed(4)}}</div>
              </div>
              <div class="d_box2DescItem">
                <div class="d_box2Text">{{$t('licai.lc30')}} (USDT)</div>
                <div class="d_box2Num">{{Number(walletNum).toFixed(4)}}</div>
              </div>

            </div>
            <div class="d_box2Table">
              <el-table :data="tableData">
                <div slot="empty" class="d_emptyTable">
                  <img class="d_topRight" src="../assets/765514C06D96EB11.web.png" alt="" style="width: 60px;height: 60px;">
                  <span>{{$t('licai.lc31')}} </span>
                </div>
                <el-table-column align="center" prop="orderNo" :label="$t('licai.lc32')"></el-table-column>
                <el-table-column align="center" prop="periodicName" :label="$t('licai.lc33')">
                  <template slot-scope="scope">
                    <span>{{typeStatus[scope.row.type]}}</span>

                  </template>
                </el-table-column>
                <el-table-column align="center" prop="amount" :label="$t('licai.lc34')"></el-table-column>
                <el-table-column align="center" prop="rate" :formatter="stateFormat" :label="$t('licai.lc35')"></el-table-column>
                <el-table-column align="center" prop="winN" :label="$t('licai.lc36')"></el-table-column>
                <el-table-column align="center" prop="result" :label="$t('licai.lc37')">
                    <template slot-scope="scope">
                      <span v-if="scope.row.result == 4">{{$t('bico.W01')}}</span>
                      <span v-if="scope.row.result == 3">{{$t('bico.W02')}}</span>
                                  <span v-if="scope.row.result == 2">{{$t('licai.lc38')}}</span>
                                  <span v-if="scope.row.result == 1">{{$t('licai.lc39')}}</span>
                                </template>
                </el-table-column>
                <el-table-column align="center" prop="createTime" :label="$t('licai.lc40')">
                </el-table-column>
                <el-table-column align="center" prop="endTime" :formatter="updateTimeStr" :label="$t('licai.lc41')"></el-table-column>

              </el-table>
            </div>
          </div>
      </div>

      <div class="d_center">

      <div class="d_lcTitle">{{$t('licai.lc42')}}</div>

            <el-steps :active="3" space="1400px" align-center>
              <el-step :title="$t('bico.W07')" :description="$t('bico.W11')" ></el-step>
              <el-step :title="$t('bico.W08')" :description="$t('bico.W12')"></el-step>
              <el-step :title="$t('bico.W09')" :description="$t('bico.W13')"></el-step>
              <el-step :title="$t('bico.W10')" :description="$t('bico.W14')"></el-step>
            </el-steps>

        <div class="d_oftenTitle">{{$t('licai.lc47')}}</div>
        
        <div class="d_oftenItemBox">
          <div v-for="(item,index) in oftenArr" :key="item.title" :class="['d_oftenItem',item.open?'d_oftenItemActive':'']" @click="d_oftenItemChange(item,index)">
            <div class="d_oftenItemTitleBox">
              <div class="d_oftenItemTitle">{{item.title}}</div>
              <div class="d_oftenItemTitleArrow">
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
            <transition name="fade">
              <div class="d_oftenItemContent" v-if="item.open">{{item.desc}}</div>
            </transition>

          </div>
        </div>
      </div>
    </div>
    <div style="height:100px;"></div>
    <Foot/>
  </div>
</template>
<script>
    import { walletApi,finPeriodicListApi,finPeriodicMyOrderListApi,finPeriodicOrderAddApi } from '@/api/getData'
    import Foot from '@/components/Foot'
    export default {
        components:{
            Foot
        },
        data(){
            return {
              typeStatus: {
                '1': this.$t('bico.W03'),
                '2': this.$t('bico.W04'),
                '3': this.$t('bico.W05'),
                '4': this.$t('bico.W06'),
              },
                d_tabItenIndex:1,
                input:'',
                select:'1',
                walletNum:0,
                periodicStr:'日利率（年化利率：7.30%)',
                minNum:0,
                maxNum:2000,
                value4:10,
                sliderMin:0,
                //总收益额 已结算
                winTotal:0,
                //总收益 未结算
                noWinTotal:0,
                //总投资
                principal:0,
                sliderMax:100,
                weekRate:'',
                monthRate:'',
                jiRate:'',
                yearRate:'',
                dayArr:[
                    {name : '7 天'},{name : '15 天'},{name : '30 天'},{name : '90 天'},{name : '180 天'},],
                d_buttonItemActiveIndex:2,
                checked:false,
                tableData:[],
                activeNames:[],
                oftenArr:[
                  {
                    title: this.$t('bico.W15'),
                    desc: this.$t('bico.W16'),
                    open:false,
                  },
                  {
                    title: this.$t('bico.W17'),
                    desc: this.$t('bico.W18'),
                    open:false,
                  },
                  {
                    title: this.$t('bico.W19'),
                    desc: this.$t('bico.W20'),
                    open:false,
                  },
                  {
                    title: this.$t('bico.W21'),
                    desc: this.$t('bico.W22'),
                    open:false,
                  },
                ]
            }
        },
        computed: {
            isLogin: function() {
            return sessionStorage.getItem('userToken')!=null;
            }
        },
        created: function() {
            //初始化

            if(this.isLogin){
                this.assestsFun()
            }
            this.getPeriodicList()
            this.myOrderList();
         },
        mounted(){
        },
        methods:{
            async periodicAdd(){
                var that = this;
                if(that.checked){
                    if(that.input == undefined || that.input == 0 || that.input == null){
                        this.$message.error( this.$t('bico.W23'),);
                        return
                    }
                    var dataArr = new URLSearchParams();
                    var item = that.dayArr[that.d_buttonItemActiveIndex]
                    dataArr.set('periodicId',item.id)
                    dataArr.set('amount',that.input)
                    var res = await finPeriodicOrderAddApi(dataArr);
                    if(res.success){
                        this.$message.success(res.data);
                        this.input = ''
                        this.checked = false
                        this.myOrderList();
                        this.assestsFun()
                    }else{
                       // this.$message.error(res.msg);
                    }
                }else{
                    this.$message.error( this.$t('bico.W24'),);
                }
            },
            updateTimeStr(row, column){
              if(row.endTime== undefined || row.endTime== undefined){
                  return  this.$t('bico.W25')
              }
              return row.endTime
            },
            async myOrderList(){
                var res = await finPeriodicMyOrderListApi();
                if(res.success){
                    var da = res.data
                    this.winTotal = da.winTotal //已结算
                    this.noWinTotal = da.noWinTotal //未结束
                    this.principal = da.principal //总投资
                    this.tableData = da.list
                }
                console.log(this.$t('bico.W26'),res)
            },
            async assestsFun(){//用户资产
                var that = this;
                var valuation = 'USDT'
                var dataArr = new URLSearchParams();
                dataArr.set('valuation',valuation);
                dataArr.set('hide','N');
                dataArr.set('type','WALLET');
                var res = await walletApi(dataArr);
                if(res.success){
                    var obj = res.data
                    //that.totalAssets = Number(res.data.accountTotalPrice).toFixed(8);
                    var l = obj.list;
                    for(var i=0;i<l.length;i++){
                        if(l[i].type==valuation){
                            that.walletNum = Number(l[i].usedPrice).toFixed(8);
                        }
                    }
                    //that.walletNum = Number(obj.valuationTotalPrice).toFixed(8);
                }
            },
            checkNum(){
                if(this.input<this.minNum){
                    this.input =this. minNum
                    this.$message.error(this.$t('bico.W27')+this.minNum);
                }
                if(this.input>this.maxNum){
                    this.input = this.maxNum
                     this.$message.error(this.$t('bico.W28')+this.maxNum);
                }
                if(this.input>this.walletNum){
                    this.input = this.walletNum
                     this.$message.error(this.$t('bico.W29'));
                }
            },
            async getPeriodicList(){
                var res = await finPeriodicListApi()
                if(res.success){
                    this.dayArr = res.data
                    for(var i=0;i<this.dayArr.length;i++){
                        var a = this.dayArr[i]
                        if(a.type == '1'){
                            this.weekRate=a.rate+ '%'
                        }
                         if(a.type == '2'){
                            this.monthRate=a.rate+ '%'
                        }
                         if(a.type == '3'){
                            this.jiRate=a.rate+ '%'
                        }
                         if(a.type == '4'){
                            this.yearRate=a.rate+ '%'
                        }
                    }
                    this.d_btnChange(this.dayArr[0],0)
                }
            },
            d_tabChange(index){
                this.d_tabItenIndex = index;
            },
            stateFormat(row, column){
                return this.formatTooltip(row.rate)
            },
            formatTooltip(val) {
                return val +'%';
            },
            d_btnChange(item,index){
                this.maxNum = item.num
                this.minNum = item.minNum
                this.value4=item.rate
                this.periodicStr = this.typeStatus[item.type]+':'+this.formatTooltip(item.rate)
              this.d_buttonItemActiveIndex = index;
            },
            d_oftenItemChange(item,index){
              console.log(item,index)
              item.open = !item.open;
            },
        }
    }
</script>
<style scoped>

  .d_container{
      width:100%;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .d_top{
      width:1248px;
      display: flex;
      justify-content: space-between;

  }
  .d_topLeft{
      width: 708px;
      padding: 100px 0 0 0;
  }
  .d_topTitle{
      color: #1f2533;
      font-size: 44px;
      font-weight: bold;
      padding-bottom: 10px;
  }
  .d_titleDesc{
      font-size: 18px;
      color:#60687b
  }
  .d_titleDesc>a{
      color:#205fec;
      text-decoration: none;
  }
  .d_topRight{
    width: 244px;
    height: 200px;
  }
  .d_center{

      width: 1248px;


      
  }
  
  .d_tabs{
      width: 1248px;
      display: flex;
      margin-bottom: 40px;
          margin-top: -80px;
  }
  .d_tabItem{
      font-size: 22px;
      color: #959dad;
      padding: 24px 0 16px;
      margin-right: 20px;
      border-bottom:solid 2px transparent;
      cursor: pointer;
  }
  .d_tabItem:hover{
      color:#1f2533;
  }
  .d_tabItemActive{
      color:#1f2533;
      border-bottom:solid 2px #1f2533;
  }
  .d_tabBox1{
      display:flex;
      justify-content: space-between;
  }

  .d_cleftItem{
      margin-bottom: 30px;
  }
  .d_label{
      padding: 0 0 4px 0;
  }
  .d_desc{
      padding: 4px 0 0 0;
      color: #959dad;
  }
  .d_desc1{
      color: #959dad;
      display: flex;
      justify-content: space-between;
  }
  .d_select{
      width: 100px;
  }
  .d_btns{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .d_buttonItem{
    width: 125px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #d8dce6;
    cursor: pointer;
    border-radius: 4px;
    color: #60687b;
  }
  .d_buttonItemActive{
    color: #205fec;
    border: 1px solid #205fec;
    background: #e4ecff;
  }
  .d_jkBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .d_jkCheckBox{
    display: flex;
    align-items: center;
  }
  .d_loginJk{
    width: 200px;
  }
  .d_jkCheckBox>a{
    font-size: 14px;
    color: #205FEC;
    text-decoration: none;
  }
  .d_tabBox1Right{
    width: 488px;
  }
  .d_rightTitle{
    color: #1f2933;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 32px;
  }
  .d_rightPriceText{
    color: #3f475a;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    margin: 8px 0;
  }
  .d_rightDesc{
    margin-bottom: 16px;
    display: flex;
    padding: 20px 0 40px;
  }
  .d_rightDI{
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-size: 14px;
    cursor: pointer;
  }
  .d_rightDILabel{
    color: #959dad;
    border-bottom: 1px dashed #d8dce6;
  }
  .d_rightLabelRoate{
    color: #1f2933;
    margin-left: 5px;
  }
  .d_rightPriceBox{
    color: #e35e5e;
  }
  .d_rightPriceNum{
    font-size: 32px;
    margin-right: 10px;
  }
  .d_rightPriceUnit{
    font-size: 14px;
  }

  .d_HkLine{
    border-top: 1px solid #d8dce6;
    opacity: .6;
  }
  .d_hkTitle{
    padding: 48px 0 24px 0;
    font-size: 18px;
    font-weight: bold;
  }
  .d_hkInfo{
    padding-bottom: 16px;
    margin: 2px 0;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .d_hkInfoText{
    color: #959dad;
  }
  .d_hkInfoNum{
    color: #1f2933;
  }
  .d_box2Desc{
    display: flex;
  }
  .d_box2DescItem{
    margin-right: 64px;
    padding-bottom: 32px;
  }
  .d_box2Text{
    color: #959dad;
    font-size: 14px;
  }
  .d_box2Num{
    margin-top: 8px;
    font-size: 24px;
    color: #205fec;
    font-weight: 600;
  }
  .d_emptyTable{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    font-size: 12px;
  }
  .d_emptyTableImg{
    width: 46px;
    height: 46px;
    margin-bottom: 20px;
  }
  .d_lcTitle{
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    padding: 112px 0 72px;
  }
  .d_lcBox{
    display: flex;
  }
  .d_lcItem{
    text-align: center;
  }
  .d_lcImg{
    width: 56px;
    height: 56px;
  }
  .d_lcText{
    font-size: 16px;
    margin-top: 12px;
    color: #1f2533;
  }
  .d_lcLine{
    margin: 30px 14px 0;
    width: 145px;
    height: 1px;
    background-color: #f0f3f7;
  }
  .d_oftenTitle{
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    padding: 160px 0 48px;
  }
  .d_oftenItemBox{
    width: 100%;
  }
  .d_oftenItem{
    padding: 33px 0;
    border-top: solid 1px #edf0f7;
    cursor: pointer;
  }
  .el-icon-arrow-down{
    font-weight: bold;
    color: #959dad;
  }
  .d_oftenItemActive .el-icon-arrow-down{
    transition: .5s;
    transform: rotate(180deg);
  }
  .d_oftenItemTitleBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .d_oftenItemTitle{
    font-size: 16px;
  }
  .d_oftenItemContent{
    padding-top: 12px;
    color: #959dad;
    font-size: 14px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .d_more{
    margin-top: 32px;
  }
  .d_more>a{
    color: #205FEC;
    font-size: 14px;
    text-decoration: none;
  }


.section-head2 .content[data-v-2be6a87c] {
    width: 1248px;
    margin: 0 auto;
    padding: 52px 0 24px;
    position: relative;
}
.section-head2 h2[data-v-2be6a87c] {
    font-size: 36px;
    line-height: 36px;
    color: #fff;
    margin-bottom: 16px;
}
.section-head2 h3[data-v-2be6a87c] {
    font-size: 16px;
    color: #c4dcff;
}
.section-head2 .links[data-v-2be6a87c] {
    position: absolute;
    right: 0;
    bottom: -40px;
    display: flex;
}
.mock-a, a {
    color: #2483ff;
    text-decoration: none;
    transition: all .2s;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.section-head2 h2[data-v-2be6a87c] {
    font-size: 36px;
    line-height: 36px;
    color: #fff;
    margin-bottom: 16px;
}
.section-head2 .links a+a[data-v-2be6a87c] {
    display: flex;
    align-items: center;


}

.section-head2 .links a+a[data-v-2be6a87c]:before {
    content: "";
    border-left: 1px solid rgba(36,131,255,.3);
    height: 16px;
    display: inline-block;
    margin-left: 10px;
    padding-left: 16px;
}


</style>
