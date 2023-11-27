<template>
    <div class="pagenation">
        <el-pagination small  class="text-center"  
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page.sync="page.currentPage" 
            :page-size="page.limit"
            layout="prev, pager, next" 
            :total="page.total">
        </el-pagination>
   </div>
</template>
<script>
export default {
    props:{
        page:{
            type:Object
        }
    },
    data(){
        return{

        }
    },
    
    methods:{
        handleSizeChange(val){//查看每页条数变化 
            this.page.limit= val;
            this.$emit('pageChange', this.page.currentPage);
        },
        handleCurrentChange(val){//当前页码
            this.page.currentPage= val;
            this.$emit('pageChange', this.page.currentPage);
        }
    }
}
</script>