

<template>
<!-- 收款方式 -->
    <div class="collection_list">
        <!--<el-radio-group v-model="collection">-->
            <!--<div class="radioList" v-for="(item) in methodArr" :key="item.id">-->
                <!--<el-radio :label="item.index">-->
                    <!--<div class="leftSpread">-->
                        <!--<img :src="item.img" :alt="item.name" />-->
                        <!--<span class="name">{{item.name}}</span>-->
                    <!--</div>-->
                    <!--<div class="payInform leftSpread">-->
                        <!--&lt;!&ndash; 根据nodata为true为未绑定    不同方式显示不同值 &ndash;&gt;-->
                        <!--<router-link to="bank" v-if="bankActive == ''">{{$t('orderStatus.goBind')}}</router-link>-->
                        <!--<span v-else>{{bankActive}}</span>-->

                        <!--<i :class="collection == item.index && nodata == false ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>-->
                    <!--</div>-->
                <!--</el-radio>-->

                <!--<div class="tender_box">-->
                    <!--<el-radio-group v-model="bankActive" @change="selectBank">-->
                        <!--<el-radio :label="item.idcard" v-for="item in collectArr" :key="item.id">-->
                            <!--<span class="name">{{item.name}}</span>-->
                            <!--<span>{{item.idcard}}</span>-->
                        <!--</el-radio>-->
                    <!--</el-radio-group>-->
                <!--</div>-->

            <!--</div>-->
        <!--</el-radio-group>-->

      <div class="block">
        <span class="demonstration">{{$t('bico.W103')}}</span>
        <el-cascader
          v-model="bankActive"
          :options="options" :placeholder="$t('form.select')"
          @change="selectBank"></el-cascader>
          <!-- 根据nodata为true为未绑定    不同方式显示不同值 -->
          <router-link to="pay" v-if="bankActive == ''">{{$t('orderStatus.goBind')}}</router-link>
          <span v-else></span>
      </div>

    </div>
</template>
<script>
import { otcPayMethodApi } from '@/api/legalData'
export default {
  props: ['activeIndex'],
  data() {
    return {
      collection: 'BANK',//收款方式
      collMap:{
        bank:'BANK',
        wx:'WE_CHAT',
        ali:'ALI_PAY'
      },
      methodArr: [],
      options: [],
  aliActive: '',
  weActive: '',
  bankActive: '',
  payPalActive: '',
  collectArr: [],
  nodata: false,
  }},
    computed:{
        getIndex(){
            var that = this;
            var value = that.activeIndex;
            if(value != 1){
                that.payMethodsFun();
            }
            return value
        }
    },
    watch:{
        getIndex(newValue){
            console.log(newValue)
        }
    },
    created(){
        var that = this;
      var arr = [{
        img:require('@/assets/bank_icon.png'),
        name:that.$t('payMethods.bank'),
        index:'BANK',
      },
        {
          img:require('@/assets/aiplay_icon.png'),
          name:that.$t('payMethods.alipay'),
          index:'ALI_PAY',
        },
        {
          img:require('@/assets/wechat_icon.png'),
          name:that.$t('payMethods.wechat'),
          index:'WE_CHAT',
        }];
        that.methodArr = arr;

    },
    methods:{
        async payMethodsFun(){//收款方式
            var that = this;
            var res = await otcPayMethodApi();
            if(res.success){
                var arr = res.data;
                var aliArr = arr.ali;
                var wxArr = arr.wx;
                var bankArr = arr.bank;
                that.collectArr = bankArr.concat(aliArr).concat(wxArr);
                var options=[]
                if(bankArr.length>0) {
                    options.push({
                      value:'bank',
                      label:this.$t('bico.W104')
                    })
                };
                if(aliArr.length>0) {
                  options.push({
                    value:'ali',
                    label:this.$t('bico.W105')
                  })
                };
                if(wxArr.length>0) {
                  options.push({
                    value:'wx',
                    label:this.$t('bico.W106')
                  })
                };
                options.forEach(item =>{
                  item.children = []
                  arr[item.value].forEach(ele =>{
                    item.children.push({
                      label:ele.idcard,
                      value:ele.idcard
                    })
                  })
                this.options = options

                })
                //that.getValueFun();

            }else{
                //that.$message.error(res.msg)
            }
        },
        selectBank(el){
          var that =this
          console.log(el)
          that.collection =that.collMap[el[0]]
          that.bankActive =el[1]

          this.getValueFun();
        },
        getValueFun(){
            var that = this;
            var data = {
                collectArr:that.collectArr,
                bankActive:that.bankActive,
            }

            that.$emit('activeFun',that.collection);
            that.$emit('payContentFun',data);
        }
    }
}
</script>
<style lang="less">
.collection_list{
    .el-radio{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        margin-right: 0;
    }
    .el-radio-group{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .el-radio__label{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            span{
                margin-left: 10px;
            }
            .name{
                color: #101010;
            }
            a{
                color: #999999;
            }
            .payInform{
                color: #999999;
            }
        }
    }
    .el-radio__inner{
        border-color:#999999;
        background:#999999;
        &::after{
            transform: translate(-50%,-50%) scale(1);
        }
    }
    .el-radio__input.is-checked {
        .el-radio__inner{
            border-color:@mainsColor;
            background:@mainsColor;
        }
    }
    .tender_box{
        
        margin-left: 20px;
        .el-radio{
            line-height: 40px;
            height: 40px;
            border-bottom: 1px solid #FAFAFA;
            padding: 0 20px;
            margin-bottom: 0;
            .el-radio__inner{
                display: none;
            }
        }
    }
}
</style>
