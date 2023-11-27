<template>
    <div class="legal_bone_div">

        <!-- 流程：
            一：status = 2、4状态 申请成为承兑商
            二：提交申请成为承兑商 status = 6 现不可提交
            三：审核失败 status = 7 可再次提交申请
            四：审核成功 status = 1 显示可退还保证金页
            五：提交退还保证金 status = 3  显示退还审核中，现不可提交-->

        <div class="title">
            <p v-if="status == 4 || status == 6 || status == 7 || status == 2">{{$t('legal.payBond')}}</p>
            <p v-else>{{$t('legal.myBond')}}</p>
            <h2 v-if="status == 0 || status == 1 || status == 5">{{numbers}} USDT</h2>
            <h2 v-else>{{price}} USDT</h2>
        </div>

        <!--
            status状态： 4：需要成为承兑商 6.承兑商申请审核中 7.承兑商审核失败  2-未开通  
            显示=> 申请成为承兑商页
        -->
        <div v-if="status == 4 || status == 6 || status == 7 || status == 2">
            <el-form ref="form" :model="form">
                <el-form-item :label="$t('recharge.asset')" :rules="[{ required: true, message: $t('recharge.assetEmpty')},{pattern:validation.assetsPwd,message:$t('recharge.assetNum'),trigger:'blur'}]" prop="pwd">
                    <el-input v-model="form.pwd" :type="showImg ? 'number' : 'password'" autocomplete="off" :placeholder="$t('recharge.assetEmpty')">
                        <template slot="append">
                            <img class="showPwd" @click="showImg = !showImg" :src="showImg ? open : close"  />
                        </template>
                    </el-input>
                </el-form-item>
                <p class="tip">USDT {{$t('legal.canUser')}}：{{available}}</p>
                <el-button class="themeBtn" disabled v-if="status == 6">{{$t('legal.appealAcceptor')}}</el-button>
                <el-button class="themeBtn" v-else @click="submit('form')">{{$t('legal.payAcceptor')}}</el-button>
            </el-form>
            <div class="reminder">
                <p>{{$t('recharge.tip')}}</p>
                <div>{{$t('orderStatus.bindTip')}}</div>
            </div>
        </div>
        
        <!-- 
            status状态： 1：全部缴纳 5.已获得承兑商权限 
            显示=> 可退还保证金 
        -->
        <div v-if="status == 1 || status == 5">
            <el-button class="themeBtn" @click="returnMoney">{{$t('legal.returnBond')}}</el-button>
        </div>

        <!--
            status状态： 3：押金退还审核中 
            显示=> 退还保证金审核中 
        -->
        <div v-if="status == 3">
            <el-button class="themeBtn">{{$t('orderStatus.returnTip')}}</el-button>
        </div>

        <!-- 
            status状态： 0：待补缴 
            显示=>  补缴保证金页
        -->
        <div v-if="status == 0">
            <el-form ref="form" :model="form">
                <p class="tip">
                    <span>{{$t('orderStatus.repairMoney')}}</span>
                    <span class="redColor">{{repair}}USDT</span>
                </p>
                <el-form-item :label="$t('recharge.asset')" :rules="[{ required: true, message: $t('recharge.assetEmpty')},{pattern:validation.assetsPwd,message:$t('recharge.assetNum'),trigger:'blur'}]" prop="pwd">
                    <el-input v-model="form.pwd" :type="showImg ? 'number' : 'password'" autocomplete="off" :placeholder="$t('recharge.assetEmpty')">
                        <template slot="append">
                            <img class="showPwd" @click="showImg = !showImg" :src="showImg ? open : close"  />
                        </template>
                    </el-input>
                </el-form-item>
                <p class="tip">{{$t('orderStatus.canBlance')}}：{{available}}</p>
                <el-button class="themeBtn" @click="supplementary('form')">{{$t('orderStatus.repairNum')}}</el-button>
            </el-form>
        </div>
        
    </div>
</template>
<script>
import { depositPageApi,depositApi,legalMgrPageApi,makeUpDepositApi,backDepositApi } from '@/api/legalData'
import { validation } from '@/config/validation'
import codeStatus from '@/config/codeStatus'
export default {
    inject:['reload'],
    data(){
        return{
            form:{
                pwd:''
            },
            price:0,
            available:0,
            showImg:false,
            close:require('@/assets/eye_close.png'),
            open:require('@/assets/eye_open.png'),
            validation,
            status:'',
            repair:0,
            numbers:0
        }
    },
    created(){
        this.status = this.$parent.status;
        this.available = this.$parent.available;
        this.price = this.$parent.price;
        this.repair = this.$parent.repair;
        this.numbers = this.$parent.number;
    },
    methods:{
        submit(form){//申请成为承兑商
            var that = this;
            that.$refs[form].validate(async (valid)=>{
                if(valid){
                    var dataArr = new URLSearchParams();
                    dataArr.set('type','USDT');
                    dataArr.set('payPwd',that.form.pwd);
                    var res = await depositApi(dataArr);
                    if(res.success){
                        that.$message({
                            type:'success',
                            message:that.$t('tip.submitTxt')
                        })
                        setTimeout(()=>{
                            that.reload();
                        },800)
                        // console.log(res)
                    }else{
                        codeStatus(res.code,function(msg){
                            that.$message.error(msg)
                        })
                    }
                }
            })
        },
        returnMoney(){//退还保证金
            var that = this;
            that.$confirm(that.$t('orderStatus.returnDeposit'), that.$t('layer.tips'), {
                confirmButtonText: that.$t('legalOrder.yes'),
                cancelButtonText: that.$t('legalOrder.no'),
                customClass:'sureBoxConfirm',
            }).then(async () => {
                var res = await backDepositApi();
                if(res.success){
                    that.$message({
                        type:'success',
                        message:res.msg
                    });
                    setTimeout(()=>{
                        that.reload();
                    },800)
                }else{
                    codeStatus(res.code,function(msg){
                        that.$message.error(msg)
                    })
                }
            }).catch(() => {       
            });
            
        },
        supplementary(form){//补缴金额
            var that = this;
            that.$refs[form].validate(async (valid)=>{
                if(valid){
                    var dataArr = new URLSearchParams();
                    dataArr.set('payPwd',that.form.pwd);
                    var res = await makeUpDepositApi(dataArr);
                    if(res.success){
                        that.$message({
                            type:'success',
                            message:res.msg
                        });
                        setTimeout(()=>{
                            that.reload();
                        },800)
                    }else{
                        codeStatus(res.code,function(msg){
                            that.$message.error(msg)
                        })
                    }
                }
            })
        }
    }
}
</script>
<style lang="less">
.legal_bone_div{
    width: 440px;
    margin: 0 auto;
    padding: 20px;
    
    .title{
        text-align: center;
        h2{
            color: #CD3D58;
        }
    }
    .tip{
        color: #8E8E8E;
    }
    .themeBtn{
        width: 100%;
    }
    .el-form-item{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border:1px solid#3B3B3B;
		padding:10px;
		border-radius:4px;
		.el-form-item__label{
			text-align: left;
        }
        .showPwd{
            cursor: pointer;
        }
		.el-input-group__append{
			border: none!important;
			background-color: transparent!important;
		}
		.el-input__inner{
			border: none;
			background-color: transparent;
			padding: 0;
		}
    }
    .redColor{
        color: #CD3D58;
    }
    .reminder{
        border: 1px dashed #3B3B3B;
        margin-top: 40px;
        padding: 20px;
        border-radius: 4px;
        p{
            color: #CD3D58;
            margin: 0;
        }
        &>div{
            color: #8E8E8E;
            line-height: 36px;
        }
    }
}

</style>