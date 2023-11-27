<template>
    <div class="users_div">

        <!-- 加一行空格 100 PX -->
        <div style="height:100px;"></div>

        <div class="container_users">
            <!-- 加上用户中心的头像 -->
            <el-row class="">

                <el-col :span="12">

                    <div class="demo_sue">

                        <div class="sub-title"><h2 class="grzx">{{$t('person.title')}}</h2></div>
                        <div class="demo-basic--circle">
                            <div class="block grzxtx"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
                            <div class="block" v-for="size in sizeList" :key="size">
                            
                            </div>
                            <div class="zhanghao">
                                    13920002365
                                </div>
                                <div class="yaoqingma">
                                    邀请码：JDKS63A485
                                </div>
                        </div>
                    </div>
                    
                </el-col> 
            </el-row>






            <!-- 开始使用骨架布局 -->
            <!-- 加一行空格 100 PX -->
            <div style="height:100px;"></div>
            <el-row :gutter="20">
                <el-col :span="6">
                
                    <div class="grid-content bg-purple">
                    
                    <el-menu :default-active="usersIndex" class="el-menu-demo" mode="horizontal" @select="handleNav" router>
                        <el-menu-item index="set">{{$t('person.set')}}</el-menu-item>
                        <el-menu-item index="person">{{$t('person.verification')}}</el-menu-item>
                        <el-menu-item index="invitation">{{$t('person.invite')}}</el-menu-item>
                    </el-menu>
                    <router-view></router-view>
                    </div>

                </el-col>

                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>

            </el-row>

            
            

       
        
        
        </div>
        <Foot />
    </div>
</template>

<script>
import Foot from '@/components/Foot'
import userInform from '@/config/userInform'
export default {
    data(){
        return{
            account:'',
			email:'',
			phone:'',
			nickName:'',
			isOpenPay:'',

            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            sizeList: ["large", "medium", "small"]
            
            
        }
    },
    computed: {
        personIndex: function(){
            return this.$route.path.replace('/', '');
		},
	},
	created(){
		this.userInformFun()
	},
    methods:{
		handleNav(key, keyPath) {//点击切换导航
			// console.log(key, keyPath);
		},
		async userInformFun(){
			var that = this;
            userInform(function(res){
				that.account = res.account;
				that.email = res.email;
				that.phone = res.phone;
				that.nickName = res.nickName;
				that.isOpenPay = res.isOpenPay;
			})
		}
    },
    components:{
		Foot
    }
}
</script>
<style lang="less">
.users_div{

    

    .container_users{
        padding-left: calc(50% - 624px);
        padding-right: calc(50% - 624px);
        min-height: 900px;
    }

    .zhanghao{
    font-family: HarmonyOS Sans,PingFang SC,Microsoft Yahei,Heiti SC,WenQuanYi Micro Hei,Helvetica Neue,Helvetica,Arial,sans-serif!important;
        height: 24px;
        width: 150px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: 700;
        color: #2c2d31;
        border-radius: 4px;
        position: relative;
        top: -56px;
        right: 0;
        left: 6vw;
    }

    .yaoqingma{
        height: 24px;
        width: 150px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 700;
        color: #2c2d31;
        border-radius: 4px;
        position: relative;
        top: -68px;
        right: 0;
        left: 6vw;
    }



    .grzx{
        position: relative;
        top: 0px;
        right: 0;
        left: 2VW;
    }

    .grzxtx{
        position: relative;
        top: 0px;
        right: 0;
        left: 2VW;
    }
        

    


    
}
</style>
<style>
  .el-row {
    margin-bottom: 0px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>