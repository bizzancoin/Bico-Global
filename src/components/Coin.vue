<template>
    <el-form-item class="alignment" :label="$t('recharge.select')" prop="region">
        <div class="selectList" v-if="isShow == true">
            <el-select v-model="value" :placeholder="$t('form.select')" :no-data-text="$t('tip.noRecord')">
                <el-option value="USDT">
                    <span>USDT</span>
                </el-option>
            </el-select>
        </div>
       <div class="selectList" v-else>
            <el-select v-model="form.region" :placeholder="$t('form.select')" @change="selectCoin" :no-data-text="$t('tip.noRecord')">
                <el-option v-for="(item,index) in coinArr" :key="index" :value="item.symbols">
                    <span>{{item.symbols}}</span>
                </el-option>
            </el-select>
       </div>
    </el-form-item>
</template>
<script>
import { allCoinApi } from '@/api/getData'
export default {
    props:['fromValue','toValue','type','show'],
    data(){
        return{
            form:{
                region:''
            },
            value:'USDT',
            coinArr:[],
            isShow:true,
        }
    },
    computed:{
        getValue(){
            var that = this;
            that.getValueFun();
            return that.fromValue
        },
    },
    watch:{
        getValue(newValue){
            this.getValueFun();
        },
    },
    created(){
        this.coinFun()
    },
    methods:{
        getValueFun(){
            var that = this;
            if(that.fromValue == 'CONTRACT' || that.fromValue == 'LEGAL'|| that.fromValue == 'OPTION'
              || that.toValue == 'CONTRACT' || that.toValue == 'LEGAL' || that.toValue == 'OPTION'){
                that.form.region = 'USDT';
                that.$emit('selectCoin','USDT')
                that.isShow = true;
            }else{
                that.isShow = false;
            }
        },
        async coinFun(){
            var that = this;
            var res = '';
            if(that.type){
                var data = new URLSearchParams();
                data.set('type',that.type);
                res = await allCoinApi(data);
            }else{
                res = await allCoinApi();
            }


            if(res.success){
                var arr = res.data;
                if(arr.length > 0){
                    var value = '';
                    if(that.isShow){
                        value = 'USDT';
                    }else{
                        value = arr[0].symbols;
                    }

                    that.form.region = value;

                    if(that.show == 'recharge' || that.show == 'withdraw'){
                        arr.forEach(element => {
                            // if(element.symbols != 'EOS' && element.symbols != 'BCH') {
                               that.coinArr.push(element)
                            // }
                        });
                    }else{
                        that.coinArr = arr;
                    }
                    that.$emit('selectCoin',value);
                }

            }
        },
        selectCoin(value){
            var that = this;
            if(that.fromValue == 'CONTRACT' || that.fromValue == 'LEGAL' || that.toValue == 'CONTRACT' || that.toValue == 'LEGAL'){
                that.form.region = 'USDT';
                that.isShow = true;
                that.$emit('selectCoin','USDT');
            }else{
                that.isShow = false;
                that.$emit('selectCoin',value)
            }

        }
    }
}
</script>
<style lang="less">
.alignment{
    .el-form-item__content{
        display: flex;
        flex-direction: row;
        align-items: center;
        &>img{
            padding-right: 8px;
        }
    }
    .selectList{
        width: 100%;
    }
    .el-select-dropdown__item.selected{
	background-color: #381fc4;
	color: #fff;
}
}
</style>
