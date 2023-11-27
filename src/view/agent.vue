<template>
    <div class="agent_div">

        <!-- 顶部幻灯片 -->
        <div data-v-2be6a87c="" class="section-head">

            <div data-v-2be6a87c="" class="content">
            <h2 data-v-2be6a87c="">{{$t('bico.W124')}}</h2>
            <h3 data-v-2be6a87c="">
              <span style="font-size: 24px;color: #ffffff;">Bico Global </span>
              <span style="font-size: 24px;color: #ffffff;"> {{$t('bico.W125')}}</span>
              <span style="font-size: 34px;color: #ffffff;"></span>
              <span style="font-size: 34px;color: #ff9d0c;">{{myInfoObj.type}}</span>
              <span style="font-size: 24px;color: #ffffff;"> {{$t('bico.W126')}}</span>
              </h3>
            <!-- <div data-v-2be6a87c="" class="links">
                <img class="d_topRight" src="../assets/pool_bg_b.png" alt="">
            </div> -->
            </div>
        </div>
        <div class="d_container3">

        </div>

        <div class="container">
            <!-- 加入头像 -->
            <el-row :gutter="20">
                <el-col :span="8"><div class=""></div>
                    <div class="">
                            <!-- <div>
                                <el-avatar>
                                    <div class="leftSpread">
                                    <img
                                    src="../assets/default.png"
                                    style="height: 40px;border-radius: 10%;position: absolute;top: 15px;left: 14px;"/>

                                    </div>

                                </el-avatar>

                            </div> -->
                        </div>
                </el-col>
            </el-row>

            <!-- 代理中心选项 -->
            <!-- <el-divider></el-divider> -->
            <div class="containerzh">

            <div class="shouyi3">{{$t('bico.W127')}} {{myEarningObj.usedPrice?myEarningObj.usedPrice:'0.0'}} {{myInfoObj.type}}</div>
            <div class="shouyi">{{$t('bico.W128')}}{{myEarningObj.withdrawPrice?myEarningObj.withdrawPrice:'0.0'}} {{myInfoObj.type}}</div>

                <div class="conta">
                    <el-row>
                        <el-button @click="dialogFormVisible = true" type="primary">{{$t('bico.W129')}}</el-button>
                    </el-row>
                </div>

            <el-row :gutter="20">
                <el-col :span="4"><div class="shouyi2 grid-content bg-purple">{{$t('bico.W130')}}{{myInfoObj.all}} {{myInfoObj.type}}</div></el-col>
                <el-col :span="4"><div class="shouyi2 grid-content bg-purple">{{$t('bico.W131')}}{{myInfoObj.directY?myInfoObj.directY:0.0}} {{myInfoObj.type}}</div></el-col>
                <el-col :span="4"><div class="shouyi2 grid-content bg-purple">{{$t('bico.W132')}}{{myInfoObj.directN?myInfoObj.directN:0.0}} {{myInfoObj.type}}</div></el-col>
            </el-row>

                <!-- 划转按钮 -->

                <el-divider>TOP</el-divider>
                <el-tabs :tab-position="tabPosition" style="height:650px;">

                    <el-tab-pane label="团队明细">

                        <el-table
                            :data="page1data.records"
                            stripe
                            style="width: 100%">

                            <el-table-column
                                prop="account"
                                :label="$t('bico.W133')">
                            </el-table-column>

                            <el-table-column
                                prop="createTime"
                                :label="$t('bico.W134')"
                                width="350">
                            </el-table-column>

                            <el-table-column

                                :label="$t('bico.W135')"
                                width="350">
                              <template slot-scope="scope">

                                <span>{{ scope.row.class }}</span>
                              </template>
                            </el-table-column>


                            <el-table-column
                                prop="address"
                                :label="$t('bico.W136')">
                              <template slot-scope="scope">

                                <span>{{ scope.row.class==1?$t('bico.W137'):$t('bico.W138') }} {{user.memberId}}</span>
                              </template>
                            </el-table-column>

                        </el-table>

                        <div style="height:100px;"></div>
                        <!-- 分页组件，当记录数量达到10条记录的时候可以分页 -->
                        <el-pagination
                          :page-size="Number(page1data.size)"
                            layout="prev, pager, next"
                          @current-change="pageChange1"
                          :current-page="Number(page1data.current)"
                            :total="Number(page1data.total)">
                        </el-pagination>

                    </el-tab-pane>

                    <el-tab-pane :label="$t('bico.W139')">
                        <el-table
                            :data="page2data.records"
                            stripe
                            style="width: 100%">

                            <el-table-column
                                prop="registAccount"
                                :label="$t('bico.W133')">
                            </el-table-column>

                            <el-table-column
                                prop="createTime"
                                :label="$t('bico.W134')"
                                width="350">
                            </el-table-column>

                            <el-table-column
                                prop="addr"
                                :label="$t('bico.W136')"
                                width="350">
                              <template slot-scope="scope">

                                <span>{{ scope.row.direct == "Y"?$t('bico.W137'):$t('bico.W138') }}</span>
                              </template>
                            </el-table-column>


                            <el-table-column
                                prop="price"
                                :label="$t('bico.W140')">
                              <template slot-scope="scope">
                                <span>{{scope.row.price}} {{scope.row.type}}</span>
                              </template>
                            </el-table-column>

                        </el-table>

                        <div style="height:100px;"></div>
                        <!-- 分页组件，当记录数量达到10条记录的时候可以分页 -->
                        <el-pagination
                          :page-size="Number(page2data.size)"
                          layout="prev, pager, next"
                          @current-change="pageChange2"
                          :total="Number(page2data.total)">
                        </el-pagination>

                    </el-tab-pane>

                    <el-tab-pane :label="$t('bico.W141')">
                       <el-table
                            :data="page3data.records"
                            stripe
                            style="width: 100%">




                         <el-table-column
                           prop="createTime"
                           :label="$t('bico.W142')"
                           width="350">
                         </el-table-column>
                         <el-table-column
                             prop="price"
                             :label="$t('bico.W143')">
                           <template slot-scope="scope">
                             <span>{{scope.row.price}} {{scope.row.coin}}</span>
                           </template>
                         </el-table-column>



                         <el-table-column

                           :label="$t('bico.W144')">
                           <template slot-scope="scope">

                             <span>{{$t('bico.W145')}}</span>
                           </template>
                         </el-table-column>

                        </el-table>

                        <div style="height:100px;"></div>
                        <!-- 分页组件，当记录数量达到10条记录的时候可以分页 -->
                        <el-pagination
                          :page-size="Number(page3data.size)"
                          layout="prev, pager, next"
                          @current-change="pageChange3"
                          :total="Number(page3data.total)">
                        </el-pagination>

                    </el-tab-pane>

                </el-tabs>


              <el-dialog :title="$t('bico.W146')" :visible.sync="dialogFormVisible" @click="centerDialogVisible = true" width="30%" center>

                <div>{{$t('bico.W147')}}{{myInfoObj.all}} {{myInfoObj.type}}</div>
                <div style="height:10px;"></div>
                <div>{{$t('bico.W148')}}{{myEarningObj.withdrawPrice?myEarningObj.withdrawPrice:'0.0'}} {{myInfoObj.type}}</div>
                <div style="height:10px;"></div>
                <div>{{$t('bico.W149')}}{{myEarningObj.usedPrice?myEarningObj.usedPrice:'0.0'}} {{myInfoObj.type}}</div>
                <div style="height:10px;"></div>
                <el-form>
                  <el-form-item :label="$t('bico.W150')" :label-width="formLabelWidth">
                    <el-input v-model="price" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">{{$t('button.cancel')}}</el-button>
                  <el-button type="primary" @click="submit">{{$t('button.ok')}}</el-button>
                </div>

              </el-dialog>
            </div>
        </div>
        <div style="height:200px;"></div>
        <Foot />
    </div>

</template>

<script>
import Foot from '@/components/Foot'
import codeStatus from '@/config/codeStatus'
import { teamDetailApi,earningsPageApi,earningsInfosApi,freeTransferForWalletLogApi,freeTransferForWalletApi,myearningsApi } from '@/api/getData'
export default {

    data(){
        return{
          user:{},
          formLabelWidth: '80px',
          price:0,
          dialogFormVisible:false,
          size:10,
          current:0,
          total:20,
          page1data:{
            current: "1",
            pages: "1",
            records: [],
            searchCount: true,
            size: "2147483647",
            total: "3",
          },
          page2data:{
            current: "1",
            pages: "1",
            records: [],
            searchCount: true,
            size: "2147483647",
            total: "3",
          },
          page3data:{
            current: "1",
            pages: "1",
            records: [],
            searchCount: true,
            size: "2147483647",
            total: "3",
          },
            content:'',
            tabPosition: 'top',

            tableData: [{
                date: '2016-05-02 10:30:25',
                name: '133******65',
                address: this.$t('bico.W153'),
                addr: this.$t('bico.W154'),
              },

              {
                date: '2016-05-02 10:30:25',
                name: '139******15',
                address: this.$t('bico.W153'),
                addr: this.$t('bico.W154'),
              },

              {
                date: '2016-05-02 10:30:25',
                name: '136******62',
                address: this.$t('bico.W155'),
                addr: this.$t('bico.W156'),
              },


              {
                date: '2016-05-02 10:30:25',
                name: '136******62',
                address: this.$t('bico.W153'),
                addr: this.$t('bico.W154'),
              },

              {
                date: '2016-05-02 10:30:25',
                name: '138******27',
                address: this.$t('bico.W155'),
                addr: this.$t('bico.W156'),
              }
            ],

          myEarningObj:{
            usedPrice:'0.00',
          },
          myInfoObj:{
            all: 0.27,
            directN: 0,
            directY: 0.27,
            type:"U",
          },

          //团队明细
          //收益记录
          //划转记录
          //划转

        }
    },

    created(){
       this.getTeamDetail(0)
      this.getEarningsPage(0)
      this.getLog(0)
      this.getMyEarnings()
      this.getInfo()
    },

    methods:{
      init(){
        this.getTeamDetail(0)
        this.getEarningsPage(0)
        this.getLog(0)
        this.getMyEarnings()
        this.getInfo(),
          this.userFun()
      },
      async getTeamDetail(page){
        var data = new URLSearchParams();
        data.set('current',page);
        var res = await teamDetailApi(data)
        if(res.code == 200){
            this.page1data=res.data
        }
      },
      async getEarningsPage(page){
        var data = new URLSearchParams();
        data.set('current',page);
        var res = await earningsPageApi(data)
        if(res.code == 200){
          this.page2data = res.data
        }
      },
      async getLog(page){
        var data = new URLSearchParams();
        data.set('current',page);
        var res = await freeTransferForWalletLogApi(data)
        if(res.code == 200){
          this.page3data = res.data
        }
      },
      async getMyEarnings(){
        var res = await myearningsApi()
        if(res.code == 200){
          this.myEarningObj=res.data
        }
      },
      async getInfo(){
        var res = await earningsInfosApi()
        if(res.code == 200){
          this.myInfoObj=res.data
        }
      },
      async submit(){
        var that =this
        if(this.price == ''){
          that.$message.error(this.$t('bico.W157'),)
          return
        }
        if(!this.myEarningObj.usedPrice){
          that.$message.error(this.$t('bico.W158'),)
          return
        }
        if(Number(this.myEarningObj.usedPrice)<Number(this.price)){
          that.$message.error(this.$t('bico.W158'),)
          return
        }
        var data = new URLSearchParams();
        data.set('price',this.price);
       var res =  await freeTransferForWalletApi(data)
        if(res.success){
          that.$message.success(this.$t('bico.W159'),)
          this.dialogFormVisible = false
          that.init()
        }else{
          codeStatus(res.code,function(res){
            that.$message.error(res);
          })
        }
      },
      pageChange1(index){
        this.getTeamDetail(index)
      },
      pageChange2(index){
        this.getEarningsPage(index-1)
      },
      pageChange3(index){
        this.getLog(index-1)
      }
    },

    components:{
        Foot
    }

}
</script>

<style lang="less">

.agent_div{

    .section-head .content[data-v-2be6a87c] {
        width: 1248px;
        margin: 0 auto;
        padding: 88px 0 24px;
        position: relative;
    }

    .section-head h2[data-v-2be6a87c] {
        font-size: 36px;
        line-height: 36px;
        color: #fff;
        margin-bottom: 16px;
    }
    .section-head h3[data-v-2be6a87c] {
        font-size: 22px;
        color: #c4dcff;
        padding: 30px 0 24px;
    }
    .section-head .links[data-v-2be6a87c] {
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

    .section-head h2[data-v-2be6a87c] {
        font-size: 36px;
        line-height: 36px;
        color: #fff;
        margin-bottom: 16px;
    }
    .section-head .links a+a[data-v-2be6a87c] {
        display: flex;
        align-items: center;


    }

    .section-head .links a+a[data-v-2be6a87c]:before {
        content: "";
        border-left: 1px solid rgba(36,131,255,.3);
        height: 16px;
        display: inline-block;
        margin-left: 10px;
        padding-left: 16px;
    }

    .container {

        width: 65%;
    }

    .containerzh {

        position: relative;
        top: -66px;
        right: 0;
        left: 0vw;
    }


    .shouyi {

        width: 160px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #409eff;
        font-size: 14px;
        font-weight: 400;
        color: #FFF;
        border-radius: 4px;
        position: absolute;
        /* top: 0px; */
        right: 0;
        left: 49vw;
    }



    .shouyi3 {

        width: 160px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #409eff;
        font-size: 14px;
        font-weight: 400;
        color: #FFF;
        border-radius: 4px;
        position: absolute;
        /* top: 0px; */
        right: 0;
        left: 38vw;
    }

    .shouyi2 {

        width: 160px;
        height: 40px;
        line-height: 40px;
        text-align: center!important;
        font-size: 14px;
        font-weight: 400;
        color: #FFF;
        border-radius: 4px;
        /* position: absolute; */
        /* top: 0px; */
        /* right: 0; */
        /* left: 67vw; */
    }

    .conta {
        z-index: 1;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        right: 0;
        position: absolute;

    }

        .el-avatar {
            background: #c0c4cc00;
        }

        .el-tabs__item {

            font-size: 14px;
            line-height: 40px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .el-table th > .cell {
            font-size: 14px;
            line-height: 40px;
            font-weight: bold;
        }


}

</style>
