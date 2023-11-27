<template>
<div class="legal_etr">
    <div style="height:245px;">
    </div>
    <div class="legal_eccr">
    </div>
    <div class="legal_ecccui">
        {{$t('foot.helpCenter')}}
        <span style="font-size: 28px;color: #FFF;">Service<span style="font-size: 28px;color: #ff9800;"> Centre</span></span>
    </div>
    <div class="contact_div">
        <div class="container">
           <div class="content">
                <ul>
                   <li v-for="(item,index) in listArr" :key="item.id">
                       <!-- <div class="notice_left">
                           <h2>{{item.date}}</h2>
                           <div><span>{{item.month}}</span><span>{{item.year}}</span></div>
                       </div> -->
                       <div class="notice_right" @click="detailFun(index)">
                            <h3>{{item.title}}</h3>

                            <div class="txt" v-html="item.content"></div>
                            <div class="checkDetail"><span>{{item.createTime}} </span><span> {{$t('layer.detail')}} ></span></div>
                       </div>
                   </li>
                </ul>
           </div>
        </div>
        <Page v-if="page.total>page.limit" :page="page" @pageChange="pageChange" />
        <div style="height:200px;"></div>
        <Foot />
    </div>
</div>
</template>
<script>
import Foot from '@/components/Foot'
import { helpApi } from '@/api/getData'
import timeStamp from '@/config/timeStamp'
import Page from '@/components/pageTotal'
export default {
    data(){
        return{
            content:'',
            page:{
                currentPage: 1,
                limit: 5,
                total:0
            },
            listArr:[]
        }
    },
    created(){
        this.contactFun();
    },
    methods:{
        async contactFun(){
            var that = this;
            var dataArr = new URLSearchParams();
          var language = this.$i18n.locale
          dataArr.set("language",language)
            dataArr.set('type','HELP');
            dataArr.set('current',that.page.currentPage);
            dataArr.set('size',that.page.limit);
            var res = await helpApi(dataArr);
            that.listArr = [];
			if(res.code == 200){
                that.page.total = Number(res.data.total);
                var arr = res.data.records;
                arr.forEach((element)=>{
                    var time = timeStamp(element.createTime,'en');
                    var distribution = time.split('/');
                    element.year = distribution[0];
                    element.month = distribution[1];
                    element.date = distribution[2];
                    that.listArr.push(element)
                })
            }
        },
        pageChange(item){
            this.page.currentPage = item;
            this.contactFun();
        },
        detailFun(getIndex){
            var that = this;
            var arr = that.listArr;
            var obj = {};
            arr.forEach((element,index) => {
               if(getIndex == index){
                   obj = element
               }
            });
            sessionStorage.setItem('detailTxt',JSON.stringify(obj));
            that.$router.push('/detail');
        }
    },
    components:{
        Foot,Page
    }
}
</script>
<style lang="less">
.contact_div{
    h2{
        font-weight: initial;
        font-size: 28px;
    }
    .content{
        border-top: 1px solid #3B3B3B;
        img{
            max-width: 100%;
        }
        ul {
            margin-top: 20px;
            li{
                display: flex;
                flex-direction: row;
                align-items: center;

                padding-bottom: 20px;
                margin-bottom: 20px;
                .notice_left{
                    width: 160px;
                    text-align: center;
                    background-color: @mainsColor;
                    padding: 30px 0;
                    color: #ffffff;
                    margin-right: 30px;
                    display: inline-block;
                    h2{
                        margin: 0 0 20px 0;
                        font-size: 40px;
                        letter-spacing: 4px;
                    }
                    span{
                        &:nth-child(1){
                            margin-right: 10px;
                        }
                    }
                }
                .notice_right{

                    .time{
                        margin-bottom: 10px;
                        display: block;
                    }
                    .txt{
                        height: 35px;
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        margin-bottom: -20px;
                    }
                    .checkDetail{
                        text-align: right;
                    }
                }

            }
        }
    }

    .el-pagination{
        background-color: transparent!important;
    }
}
</style>
