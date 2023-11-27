<template>
    <div class="leftSpread filter_form">
        <span>{{$t('table.coin')}}</span>
        <el-select v-model="contract" :placeholder="$t('form.select')"  @change="selectCoin" :no-data-text="$t('tip.noRecord')">
            <el-option
                v-for="(item,index) in contractArr"
                :key="index"
                :label="item.symbols"
                :value="item.symbols">
            </el-option>
        </el-select>
    </div>
</template>
<script>
import { allCoinApi } from '@/api/getData'
export default {
    props:['type'],
    data(){
        return{
            contractArr:[],
            contract:'',
        }
    },
    created(){
        this.coinFun()
    },
    methods:{
        async coinFun(){
            var that = this;
            if(that.type){
                var data = new URLSearchParams();
                data.set('type',that.type);
                var res = await allCoinApi(data);
            }else{
                var res = await allCoinApi();
            }
            that.contractArr = [];
            if(res.success){
                var arr = res.data;
                if(arr.length > 0){
                    if(that.type == 'CURRENCY') {
                        arr.forEach(element => {
                            if(element.symbols != 'USDT'){
                                that.contractArr.push(element)
                            }
                        });
                    }else{
                        that.contractArr = arr;
                    }
                }
            }
        },
        selectCoin(value){
            this.$emit('getCoin',value);
        }
    }
}
</script>