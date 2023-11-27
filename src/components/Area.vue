<template>

  <div class="selectArea" style="width: 55px;border: 1px solid #c0cfde !important;border-right: 1px solid #c0cfde!important;font-size: 16px;">
      <VueCountryIntl schema="popover"
                      popover-class="popover-class1111"
                      :visible="visible"
                      v-model="form.area"
                      :showSelectedText='false'
                      :searchInputPlaceholder="text"
                      @onChange="changeValue2">
        <button type="button" slot="reference">+{{form.area}}</button>
        <template slot="vueCountryNoData"><h1>{{$t('tip.noRecord')}}</h1></template>
      </VueCountryIntl>
  </div>




</template>
<script>
import { areaNumApi } from '@/api/getData'
export default {
    data(){
        return{

            text:this.$t('bico.W194'),//这里翻译
          visible:false,
            form:{
                area:'86',
            },
            areaArr:[{code:'86',type:'0',country:'China',area:'北京',label:'86 China 北京'}],
        }
    },
    created(){
        this.areaFun();
    },
    methods:{
        async areaFun(){
            var that = this;
            var res = await areaNumApi();
            if(res.success){
                var arr = res.data;
                that.areaArr = arr;
                arr.forEach((element,index) => {
                    if(index == 0){
                        that.form.area = element.code;
                        var obj = {
                            'type':element.type,
                            'code':element.code
                        };
                        that.$emit('selectValue',obj);
                    }
                });
            }
        },
      changeValue2(selected){
          var that=this
        var type=""
        var value = selected.dialCode
        if(value != "86"){
          type="1"
        }else{
          type="0"
        }
        var obj = {
          'type':type,
          'code':value
        };
        that.$emit('selectValue',obj);
      },
      changeValue(value){
            var that = this;
            var type = '';
            var arr = that.areaArr;
            arr.forEach(element => {
               if(value == element.code) {
                   type = element.type;
               }
            });
            var obj = {
                'type':type,
                'code':value
            };
            that.$emit('selectValue',obj);
        }
    }
}
</script>
<style lang="less">

.selectArea{
    .el-input__inner{
        border-radius:4px 0 0 4px;
        border-right: none!important;
        text-align: right!important;
        &:focus{
            border-color: #c0cfde!important;
        }
    }

}
.el-select-dropdown__item.selected{
    color: #4964ff !important;
}
















</style>
