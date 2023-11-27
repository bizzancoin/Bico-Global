<template>
    <div class="sell_div">
        <LegalOrder :type="type" />
    </div>
</template>
<script>
import LegalOrder from '@/components/LegalOrder'
export default {
    data(){
        return{
            type:1
        }
    },
    created(){
  
    },
    methods:{
        
    },
    components:{
        LegalOrder
    },
}
</script>
<style lang="less">
</style>
