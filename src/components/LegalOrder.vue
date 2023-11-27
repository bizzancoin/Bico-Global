<template>
    <div class="legal_order">
        <el-form :model="ruleForm" ref="ruleForm">
            <div class="list">
                <el-select clearable v-model="coin" :placeholder="$t('form.select')" @change="selectPay" :no-data-text="$t('tip.noRecord')">
                    <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
          <div class="list">
            <p>{{$t('legal.payMethods')}}</p>
            <el-select multiple v-model="value" :placeholder="$t('form.select')" @change="selectPay" :no-data-text="$t('tip.noRecord')">
              <el-option
                v-for="(item,index) in payMethods"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
            <div class="list borderNone">
                <p>{{$t('trasfer.money')}}</p>
                <el-input placeholder="0.00" v-model="money">
                    <template slot="append">USD</template>
                </el-input>
            </div>
            <div class="list borderNone">
                <p>{{$t('transaction.num')}}</p>
                <el-input placeholder="0.00" v-model="number">
                    <template slot="append"></template>
                </el-input>
            </div>
            <el-button @click="submitFun" class="themeBtn">{{$t('assetsRecord.btn')}}</el-button>
        </el-form>
        <!-- 商家交易部分代码 -->
        <!-- 分割线 -->
        <div>
            <el-divider></el-divider>
        </div>
        <!-- 分割线 -->
        <!-- 包络头部面包屑开始 -->
        <el-row :gutter="10">
            <el-col :span="4">
                <div class="shouyi1">{{$t('bico.W95')}}</div>
            </el-col>

            <el-col :span="4">
                <div class="shouyi2">{{$t('bico.W96')}}</div>
            </el-col>

            <el-col :span="4">
                <div class="shouyi3">{{$t('bico.W97')}}</div>
            </el-col>

            <el-col :span="4">
                <div class="shouyi4">{{$t('bico.W98')}}</div>
            </el-col>

            <el-col :span="4">
                <div class="shouyi5">{{$t('bico.W99')}}</div>
            </el-col>

        </el-row>

        <ul class="fiat-list" v-if="!isEmpty">
            <li v-for="item in list" :key="item.id">
                <div style="height:10px;"></div>
                <!-- 分割线 -->
                <div>
                    <el-divider></el-divider>
                </div>
                        <!-- 商家信息 -->
                <el-row :gutter="10">
                        <el-col :span="4">
                                <div class="shouyi1">
                                <!-- 文字头像 -->
                                <el-avatar :class="type == 1 ? 'greenColor2' : 'redColor2'"> {{item.nickName.substring(0,1)}} </el-avatar>
                                <!-- 币商昵称 -->
                                <div class="shouyi222" style="height: 24px;">
                                        <span class="item-label merchant1" style="margin-right: 14px;">
                                         {{item.nickName}}
                                        </span>
                                    </div>

                                    <div class="shouyi222" style="height: 24px;">
                                        <span class="item-label" style="margin-right: 14px;">
                                        <!-- <img src="@/assets/certified.png" class="merchant2"> -->
                                        <img src="@/assets/certified2.png" class="merchant3">
                                        <div class="merchant4">{{$t('bico.W100')}}</div>
                                        <div class="merchant5">{{$t('bico.W101')}} 0 | 0%</div>
                                        </span>
                                    </div>
                                </div>

                        </el-col>

                        <!-- 数量丨限额 -->

                        <el-col :span="4">
                                <div class="shouyi2">
                                    <div class="shouyi22" style="height: 24px;">
                                        <span class="item-label" style="color: #9aa5b5;margin-right: 14px;">{{$t('transaction.num')}}</span><span> {{item.restNumber}} {{item.coin}}</span>
                                    </div>
                                    <div class="shouyi22" style="height: 24px;">
                                        <span class="item-label" style="color: #9aa5b5;margin-right: 14px;">{{$t('legal.limit')}}</span><span> {{item.lowPrice}}-{{item.total}} USD</span>
                                    </div>
                                </div>
                        </el-col>

                        <!-- 单价 -->

                        <el-col :span="4">
                                <div class="shouyi33">
                                <span class="price" :class="type == 1 ? 'greenColor' : 'redColor'">${{item.unitPrice}}  USD</span>
                                </div>
                        </el-col>

                        <!-- 支付方式 -->

                        <el-col :span="4">
                                <div class="shouyi4">
                                <img :src="item.img" style="width: 24px;height: 24px;padding: 8px 20px;">
                                </div>
                        </el-col>


                        <!-- 交易按钮 -->
                        <el-col :span="4">
                                 <div class="shouyi5">
                                 <el-button type="danger" :class="type == 1 ? 'BuyBtn' : 'sellBtn'" @click="subSell(item.orderNo)">{{type == 1 ? $t('legal.title') : $t('legal.sale')}} {{item.coin}}</el-button>
                                 </div>
                        </el-col>
                </el-row>

            </li>
        </ul>

        <!-- 商家交易部分代码结束 -->
        <div class="nodata" v-else>
            <img src="@/assets/noData.png" :title="$t('tip.noRecord')" />
            <p>{{$t('tip.noRecord')}}</p>
        </div>

        <!-- 分页 -->
        <div style="height:100px;"></div>
        <page-total v-if="page.total > 8" :page="page" @pageChange="pageChange"></page-total>
        <div style="height:100px;"></div>
    </div>

</template>
<script>
import pageTotal from '@/components/pageTotal'
import { tradeListApi,contractOptionConfigApi } from '@/api/legalData'
import codeStatus from '@/config/codeStatus'
import getPay from '@/config/getPay'
import userInform from '@/config/userInform'
export default {
    props:['type'],
    data(){
        return{
          coin:'',
            payMethods:[],
          options:[],
            value:'',
            money:'',
            number:'',
            ruleForm:{
                legalNumber:'',
            },
            price:'',
            num:0,
            min:'',
            page:{
                currentPage:1,
                limit:8,
                total:0,
            },
            list:[],
            isEmpty:false,
            realStatus:''
        }
    },
    created(){
        var that = this;
        var arr = [
            {value:'ALI_PAY,WE_CHAT,BANK',name:that.$t('withdraw.all')},
            {value:'ALI_PAY',name:that.$t('payMethods.alipay')},
            {value:'WE_CHAT',name:that.$t('payMethods.wechat')},
            {value:'BANK',name:that.$t('payMethods.bank')},
            // {value:'PAYPAL',name:'PayPal'}
        ];
        that.payMethods = arr;
        this.userFun();//用户信息
        this.submitFun();
        this.getConfig()
    },
    methods:{
      async getConfig(){
        var res = await contractOptionConfigApi();
        if(res.code == 200){
          console.log(res);
          var o = []
          res.data.forEach(coin=>{
            o.push({
              value:coin,
              label:coin
            })
          })
          this.options =o
        }
      },
        userFun(){
            var that = this;
            userInform(function(res){
                that.realStatus = res.realStatus;
            })
        },
        subSell(id){
            var that = this;
            if(that.realStatus != '1'){
                that.$message.error(that.$t('legal.verify'));
                return false
            }
            var obj = {};
            var arr = that.list;
            if(arr.length>0){
                arr.forEach(element => {
                    if(element.orderNo == id){
                        obj = element;
                    }
                });
            }
            // console.log(obj);
            sessionStorage.setItem('detail',JSON.stringify(obj));
            that.$router.push({path:'/submitLegal',query:{type:this.type}})
        },
        async submitFun(){//筛选购买、出售订单
            var that = this;
            if(isNaN(that.money)){
                that.$message.error(that.$t('legal.effectiveMoney'));
                return false;
            }
            if(isNaN(that.number)){
                that.$message.error(that.$t('legal.effectiveNum'));
                return false;
            }

            // var payMethod = ''
            // if(that.value.length>0){
            //     var arr = that.value;
            //     var newValue = arr.join(',');
            //     if(arr.length == 1){
            //         if(newValue == 'all'){
            //             payMethod = "ALI_PAY,WE_CHAT,BANK,PAYPAL"
            //         }else{
            //             payMethod = newValue
            //         }
            //     }else{
            //         payMethod = newValue
            //     }
            // }
            that.list = [];
            var dataArr = new URLSearchParams();
            dataArr.set('type',that.type == 1 ? 0 : 1);
            dataArr.set('coin',that.coin);
            dataArr.set('payMethod',that.value);
            dataArr.set('price',that.money);
            dataArr.set('number',that.number);
            dataArr.set('current',that.page.currentPage);
            dataArr.set('size',that.page.limit);
            var res = await tradeListApi(dataArr);
            if(res.success){
                var data = res.data;
                that.page.total = Number(data.total);
                var arr = data.records;
                if(arr.length>0){
                    that.isEmpty = false;
                    arr.forEach(element => {
                        element.unitPrice = (element.unitPrice).toFixed(2);
                        element.restNumber = (element.restNumber).toFixed(4);
                        element.lowPrice = (element.lowPrice).toFixed(2);
                        element.total = ((element.restNumber) * (element.unitPrice)).toFixed(4);
                        element.img = (getPay(element.payMethod)).img;
                        that.list.push(element)
                    });
                }else{
                    that.isEmpty = true;
                }
            }else{
                //that.$message.error(res.msg);
            }
        },
        pageChange(item){//切换页码
			var that = this;
            that.page.currentPage = item;
            that.submitFun();
        },
        selectPay(value){//筛选选择支付方式
            var that = this;
            // var filter = value.filter((element)=>{
            //     if(element == 'all'){
            //         that.value = ['all'];
            //     }
            // })
        }
    },
    components:{
        pageTotal
    }
}
</script>
<style lang="less">
@themeColor:#00b464;
@sellColor:#FF5722;

.sell_div{
    padding: 0px 0;
    min-height: 480px;
    &>.leftSpread{
        margin-bottom: 20px;
        img{
            margin-right: 10px;
        }
    }
    .el-select .el-input__inner{
        width: auto!important;
    }
    .el-form{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        .list{
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-right: 40px;
            &>p{
                margin-right: 10px;
            }
            .el-input{
                width: auto!important;
            }
            .el-input__inner{
                width: 100px;
            }
        }
        .borderNone{
            
            .el-input__inner,.el-input-group__append{
                border: none!important;
            }
            .el-input-group__append{
                color: @mainsColor!important;
                font-size: 14px;
                padding: 8px 14px;
            }
        }
    }
    .legal_list{
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        li{
            background-color: #F8F8F8;
            padding: 20px 12px;
            border-radius: 4px;
            margin:0 20px 20px 0;
            width: 30%;
            &:nth-child(3n){
                margin-right: 0;
            }
            h2,h3{
                margin: 0;
            }
        }
    }
    .el-button--danger{
        color:#fff !important;
        width: 40%;
        margin-top: 10px;
    }
    .BuyBtn{
        background: #4CAF50 !important;
        border: 1px solid #4CAF50 !important;
    }
    
    .sellBtn{
        background: #e84256 !important;
        border: 1px solid #e84256 !important;
    }
    .greenColor{
        color:@themeColor;
        font-size: 16px;
    }
    .greenColor2{
        color:#FFF;
        font-size: 20px;
        background: #793ee2 !important;
    }
    .redColor2{
        color:#FFF;
        font-size: 20px;
        background: #2196F3 !important;
    }
    .redColor{
        color:@sellColor;
        font-size: 16px;
    }

    .el-pagination{
        background: transparent!important;
    }

    .legal_div h2 {
        font-weight: initial;
        font-size: 28px;
    }




    .shouyi33 {
        /*width: 160px; */
        height: 40px;
        line-height: 40px;
        /* text-align: center; */
        font-size: 16px;
        font-weight: 700;
        border-radius: 4px;
        position: relative;
        top: 0px;
        right: 0;
        left: 4vw;
    }
 



    .avatar {
        font-size: 14px;
        line-height: 32px;
        width: 32px;
    }
    .avatar {
        -ms-flex-negative: 0;
        background: rgba(228,236,255,.4);
        border-radius: 50%;
        color: #2d60e0;
        flex-shrink: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 34px;
        text-align: center;
        width: 34px;
    }

    .el-avatar {

        background: #2483ff;
    }
    .el-col-4 {
        width: 20%;
    }

    .legal_div .el-menu.el-menu--horizontal .el-menu-item.is-active::before {
        position: absolute;
        bottom: 10px;
        content: '';
        width: 74% !important;
        left: 13% !important;
        border: 1px solid #0066ED;
        background-color: #0066ED;
    }

    .shouyi222 {
        height: 24px;
        width: 150px;
        height: 40px;
        line-height: 40px;
        /* text-align: center; */
        font-size: 14px;
        font-weight: 400;
        color: #2c2d31;
        border-radius: 4px;
        position: relative;
        top: -68px;
        right: 0px;
        left: 3vw;
    }
    .merchant1 {
        margin-right: 14px;
        font-size: 16px;
        font-weight: 500;
    }
    .merchant2 {
        height: 18px;
        margin-bottom: 8px;
        margin-left: 0px;
        vertical-align: bottom;
    }
    .merchant3 {
        height: 18px;
        margin-bottom: 8px;
        margin-left: 0px;
        vertical-align: bottom;
    }
    .merchant4 {
        margin-left: 24px;
        position: relative;
        top: -28px;
        right: 0px;
        left: 0vw;
        background: rgba(45,96,224,.1);
        color: #2d60e0;
        line-height: 24px;
        text-align: center;
        height: 24px;
        width: 24px;
        border-radius: 30px;
    }

    .merchant5 {
        margin-left: 20px;
        position: relative;
        top: -52px;
        right: 0px;
        left: 0vw;
        /* background: rgba(45, 96, 224, 0.1); */
        color: #9aa5b5;
        line-height: 24px;
        text-align: center;
        height: 24px;
        width: 170px;
        border-radius: 30px;
    }

}
</style>
