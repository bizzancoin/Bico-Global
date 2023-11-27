<template>
    <div class="apeal_div">
        <el-row :gutter="60">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/legalCoin' }">{{$t('nav.currency')}}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/legalOrder' }">{{$t('nav.order')}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t('legalOrder.apealBtn')}}</el-breadcrumb-item>
			</el-breadcrumb>
        	<el-col :xs="24" :sm="24" :md="12" :lg="12">
        		<el-form ref="form" :model="form">
                    <h2>{{$t('legalOrder.apealReason')}}</h2>
                    <el-radio-group v-model="radio">
                        <el-radio label="0">{{type == 'BUY' ? buyer : seller}}</el-radio>
                        <el-radio label="1">{{$t('legalOrder.otherReason')}}</el-radio>
                    </el-radio-group>
                    <el-input v-if="radio == '1'" v-model="form.content" type="textarea" autocomplete="off" :placeholder="$t('legalOrder.apealInput')+'...'"> </el-input>

                    <p>{{$t('tip.upImg')}}</p>
                    <el-upload
						class="avatar-uploader"
						v-model="form.img"
						:action="baseUrl+'/upload/img'"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:on-error="failAvater"
						:on-remove="handleRemove"
						:before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<img v-else src="@/assets/img-bj.png" alt="" />
					</el-upload>

	                <el-button class="themeBtn" @click="bindFun('form')">{{$t('legalOrder.subApeal')}}</el-button>

               </el-form>
	        </el-col>
	        <el-col :xs="24" :sm="24" :md="12" :lg="12">

	        </el-col>
	   </el-row>
    </div>
</template>
<script>
import { tradeAppealApi } from '@/api/legalData'
import { baseUrl } from '@/config/env'
export default {
    data(){
        return{
            radio:'0',
            form:{
                content:'',
                img:'',
            },
            baseUrl,
            imageUrl:'',
            id:'',//订单号
            type:'',
            buyer:'',
            seller:''
        }
    },
    created(){
        var that = this;
        var value = that.$route.query.id;
        if(value){
            that.type = that.$route.query.status
            that.id = value;
        }
        that.buyer = that.$t('legalOrder.buyerTip');
        that.seller = that.$t('legalOrder.sellerTip');
    },
    methods:{
        handleAvatarSuccess(res, file) {
            var that = this;
            that.imageUrl = URL.createObjectURL(file.raw);
            if(res.success){
                that.$message({
                    type:'success',
                    message:res.msg
                })
                that.form.img = res.data.src;
            }else{
                //that.$message.error(res.msg)
            }

        },
        failAvater(err,file){
            // console.log(err)
            // this.$message.error(this.$t('tip.uploadFail'));
		},
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';

            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG)  {
                this.$message.error(that.$t('tip.uploadTip'));
                return false
            }
            if (!isLt2M) {
                this.$message.error(that.$t('tip.uploadSize'));
                return false
            }
            return (isJPG || isPNG) && isLt2M;
        },
        handleRemove(file, fileList) {
            var that = this;
            var a = file.response.data.src;
            var b = that.imageUrl.indexOf(a);
            that.imageUrl.splice(b,1);
            that.dialogImageUrl.splice(b,1);
        },
        bindFun(form){
			var that = this;
			that.$refs[form].validate(async (valid) => {
				if(valid){
					if(that.form.img == ''){
                        that.$message.error(that.$t('tip.upImg'));
                        return false;
                    }

                    var txt = '';
                    if(that.radio == '1'){
                        if(that.form.content == ''){
                            that.$message.error(that.$t('legalOrder.apealInput'));
                            return false;
                        }
                        txt = that.form.content;
                    }else{
                        if(that.type == 'BUY'){
                            txt = that.buyer
                        }else{
                            txt = that.seller;
                        }

                    }
                    var dataArr = new URLSearchParams();
                    dataArr.set('orderNo',that.id);
                    dataArr.set('content',txt);
                    dataArr.set('img',that.form.img);
                    var res = await tradeAppealApi(dataArr);
                    if(res.success){
                        that.$message({
                            type:"success",
                            message:that.$t('tip.submitTxt')
                        })

                        setTimeout(()=>{
                            that.$router.back(-1)
                        },800)
                    }else{
                        //that.$message.error(res.msg)
                    }
				}
			})
		}
    }
}
</script>
<style lang="less">
.apeal_div{
    .el-breadcrumb{
		padding: 10px 0 20px 26px;
		.el-breadcrumb__inner{
			color: #8E8E8E;
		}
	}
	.el-row{
		background-color: #f8f8f8;
		padding: 20px 0;
		margin: 20px 0 40px 0!important;
    }
    .el-radio-group{
        display: flex;
        flex-direction: column;
        .el-radio{
            margin-bottom: 10px;
        }
        .el-radio__input.is-checked .el-radio__inner{
            border-color: @mainsColor;
            background: @mainsColor;
        }
        .el-radio__input.is-checked+.el-radio__label{
            color: #606266;
        }
        .el-radio__inner{
            background-color: #999999;
            &::after{
                transform: translate(-50%,-50%) scale(1);
                -webkit-transform: translate(-50%,-50%) scale(1);
                -moz-transform: translate(-50%,-50%) scale(1);
                -ms-transform:translate(-50%,-50%) scale(1);
            }
        }
    }
    .el-textarea__inner{
        background-color: transparent;
        height: 140px;
        border: 1px solid #3B3B3B;
    }
	.el-button{
		width: 100%;
		margin: 20px 0;
    }
    .avatar-uploader {
        .el-upload {
            background-color: #FDFDFD;
            border-radius: 2px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
                border-color: #409EFF;
            }
        }
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
        object-fit: cover;
    }
	.el-input__icon{
		width: 100%;
		cursor: pointer;
		font-style: normal;
	}
}
</style>
