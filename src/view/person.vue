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
                        <div class="demo-basic--circle" style="position: relative;top: 30px;right: 0;left: 0VW;">
                            <div class="block grzxtx">
                            <el-avatar :size="50" :src="circleUrl">
                            <img src="../assets/default.png" style="height: 48px;border-radius: 10%;position: absolute;top: 1px;left: 1px;" />
                            </el-avatar>
                            </div>
                            <div class="block" v-for="size in sizeList" :key="size">

                            </div>
                            <div class="zhanghao">
                                    {{account}}
                            </div>
                            <div class="yaoqingma">
                                    UID：{{uid}}
                            </div>
                            

                            

                            <!-- <div class="zhanghao3">

                            </div>

                            <div class="yaoqingma4">
                                   邀请码：8Z6F3RG5
                            </div> -->

                            <div class="zhanghao2">
                                   <img src="../assets/rzzxbg.png" style="height: 90px;">
                            </div>
                        </div>


                    </div>

                </el-col>
            </el-row>

            <div style="height:100px;"></div>

			<div class="person_div">
				<div class="container" style="width: 100%;">

						<el-menu  style="height: 60px;line-height: 60px;border-radius: 0px 0px 0px 0px;background-color: #0066ED !important;top: 40px;" :default-active="personIndex" active-text-color="#0066ed" background-color="#0066ed" text-color="#0066ed" mode="horizontal" @select="handleNav" router>
							<el-menu-item index="set" style="border-radius: 0px">{{$t('person.set')}}</el-menu-item>
							<el-menu-item index="person" style="border-radius: 0px">{{$t('person.verification')}}</el-menu-item>
                            <el-menu-item index="agent" style="border-radius: 0px">{{$t('bico.W30')}}</el-menu-item>
							<el-menu-item index="invitation" style="border-radius: 0px">{{$t('person.invite')}}</el-menu-item>
						</el-menu>
						<div style="height:20px;"></div>
						<router-view></router-view>
				</div>
			</div>

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
            value: 3.7,
			circleUrl: "",
			activeName: 'first',
			account:'',
			email:'',
			phone:'',
			nickName:'',
			isOpenPay:'',
          uid:''
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
		 handleClick(tab, event) {
        console.log(tab, event);
      },
		async userInformFun(){
			var that = this;
            userInform(function(res){
				that.account = res.account;
				that.email = res.email;
				that.uid = res.uid;
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








    .grzxtx{
        position: relative;
        top: 0px;
        right: 0;
        left: 2VW;
    }


}
</style>
