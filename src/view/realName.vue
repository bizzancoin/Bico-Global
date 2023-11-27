<template>
	<div class="check">
    	<el-row>
    		<el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding-left: 15px;padding-right: 15px;width: 100%;">
    			<el-form ref="form" :model="form">
					<div v-if="realStatus != 1 && realStatus != 2"> 
					    <el-row :gutter="20">
							<el-col :span="6"><div class="grid-content">
									<el-form-item :label="$t('realName.type')" prop="type">
										<el-select v-model="form.type" :placeholder="$t('form.select')">
											<el-option :label="$t('realName.idCard')" value="1">{{$t('realName.idCard')}}</el-option>
											<el-option :label="$t('realName.passport')" value="2">{{$t('realName.passport')}}</el-option>
										</el-select>
									</el-form-item>
							</div></el-col>
							<el-col :span="6"><div class="grid-content">
									<el-form-item :label="$t('realName.surname')" :rules="[{ required: true, message:$t('realName.surnameInput')}]" prop="surname">
										<el-input v-model="form.surname" autocomplete="off" :placeholder="$t('realName.surnameInput')">
										</el-input>
									</el-form-item>
							</div></el-col>
							<el-col :span="6"><div class="grid-content">
									<el-form-item :label="$t('realName.name')" :rules="[{ required: true, message:$t('realName.nameInput')}]"  prop="name">
										<el-input v-model="form.name" autocomplete="off" :placeholder="$t('realName.nameInput')">
										</el-input>
									</el-form-item>
							</div></el-col>
							<el-col :span="6"><div class="grid-content">
									<el-form-item :label="$t('realName.number')" :rules="[{ required: true, message: $t('realName.numberInput')}]" prop="realNo">
										<el-input v-model="form.realNo" autocomplete="off" :placeholder="$t('person.realNoEmpty')">
										</el-input>
									</el-form-item>
							</div></el-col>
						</el-row>

						<el-row :gutter="20">
							<el-col :span="6"><div class="grid-content">

							</div></el-col>
							<el-col :span="6"><div class="grid-content">
					        <!-- 上传身份证正面 -->
							<el-upload
								class="avatar-uploader"
								v-model="form.front"
								:action="baseUrl+'/upload/img'"
								:show-file-list="false"
								:on-success="frontAvatarSuccess"
								:on-error="failAvater"
								:on-remove="handleRemove"
								:before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<img v-else src="../assets/img-zmbj.png" alt="" style="height: 200px;">
								<div class="el-upload__tip" slot="tip">{{$t('person.front')}}</div>
							</el-upload>
							</div></el-col>
							<el-col :span="6"><div class="grid-content">
						    <!-- 上传身份证反面 -->
							<el-upload
								class="avatar-uploader"
								v-model="form.behind"
								:action="baseUrl+'/upload/img'"
								:show-file-list="false"
								:on-success="behindAvatarSuccess"
								:on-error="failAvater"
								:on-remove="handleRemove"
								:before-upload="beforeAvatarUpload">
								<img v-if="behindUrl" :src="behindUrl" class="avatar">
								<img v-else src="../assets/img-bj.png" alt="" style="height: 200px;">
								<div class="el-upload__tip" slot="tip">{{$t('person.behind')}}</div>
							</el-upload>
							</div></el-col>
							<el-col :span="6"><div class="grid-content">
							
							</div></el-col>
						</el-row>





						
						<div class="leftSpread">
	

						</div>
					</div>
	                						<el-row :gutter="20">
							<el-col :span="8"><div class="grid-content"></div></el-col>
							<el-col :span="8"><div class="grid-content">
							<el-button :disabled="realStatus == 0 ? false : true" class="themeBtn" @click="submit('form')">{{buttonTxt}}</el-button>
							</div></el-col>
							<el-col :span="8"><div class="grid-content"></div></el-col>
						</el-row>
	           </el-form>
    		</el-col>
    		<el-col :xs="24" :sm="24" :md="12" :lg="12"></el-col>
    	</el-row>
		<div style="height:100px;"></div>
    </div>
        
</template>

<script>
import { baseUrl } from '@/config/env'
import { certificationApi } from '@/api/getData'
import codeStatus from '@/config/codeStatus'
import userInform from '@/config/userInform'
export default{
	inject:['reload'],
	data(){
		return{
			form:{
				type:'1',
				surname:'',
            	name:'',
				realNo:'',
				front:'',
				bebind:'',
			},
			imageUrl:'',
			behindUrl:'',
			baseUrl,
			realStatus:'',
			buttonTxt:''
		}
	},
	created(){
		// this.form.type = this.$t('realName.idCard');
		this.getUserFun();
	},
	methods:{
		getUserFun(){
			var that = this;
			userInform(function(res){
				that.realStatus = res.realStatus;
				switch (Number(res.realStatus)) {
					case 0:
						that.buttonTxt = that.$t('person.submit')
						break;
					case 1:
						that.buttonTxt = that.$t('codeTxt.authentication')
						break;
					case 2:
						that.buttonTxt = that.$t('codeTxt.waitAuthent')
						break;
					default:
						break;
				}
			})	
		},
		frontAvatarSuccess(res, file) {//正面上传成功
            this.imageUrl = URL.createObjectURL(file.raw);
            if(res.code == 200){
                this.form.front = res.data.src;
            }
		},
		behindAvatarSuccess(res, file) {//反面上传成功
            this.behindUrl = URL.createObjectURL(file.raw);
            if(res.code == 200){
                this.form.bebind = res.data.src;
            }
		},
		submit(form){
			var that = this;
            that.$refs[form].validate(async (valid) => {
                if(valid){
					if(that.form.front == ''){
						that.$message.error(that.$t('person.front'));
						return false;
					}
					if(that.form.bebind == ''){
						that.$message.error(that.$t('person.behind'));
						return false;
					}
					let dataArr = new URLSearchParams();
					dataArr.set('type',that.form.type == '1' ? '身份证' : '护照');
					dataArr.set('fistName',that.form.surname);
                    dataArr.set('lastName',that.form.name);
					dataArr.set('idCard',that.form.realNo);
					dataArr.set('frontImg',that.form.front);
                    dataArr.set('backImg',that.form.bebind);
                    var res = await certificationApi(dataArr);
                    if(res.success){
						that.$message({
							type:'success',
							message:res.msg
						});
						that.getUserFun();
                        // that.reload();
                    }else{
                        codeStatus(res.code,function(msg){
                            that.$message.error(msg);
                        })
                    }
                }
            })
		},
		failAvater(err,file){
            this.$message.error(this.$t('tip.uploadFail'));
		},
		handleRemove(file, fileList) {
            var that = this;
            var a = file.response.data.src;
            var b = that.imageUrl.indexOf(a);
            that.imageUrl.splice(b,1);
            that.dialogImageUrl.splice(b,1);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
				this.$message.error(this.$t('tip.uploadTip'));
				return false
            }
            if (!isLt2M) {
				this.$message.error(this.$t('tip.uploadSize'));
				return false
            }
			return (isJPG || isPNG) && isLt2M;
        }
	}
}
</script>

<style lang="less">
.check{

	.leftSpread{
		&>div{
			&:nth-child(1){
				margin-right: 40px;
			}
		}
	}
	.el-select{
		width: 100%;
	}
	.avatar-uploader{
		.el-upload{
			border: none;
			border-radius: 4px;
			padding: 60px 0px;
			background-color:#FDFDFD;
		}
		.el-upload__tip{
			text-align: center;
		}
		.avatar{
			width: 240px;
			height: 150px;
			object-fit: cover;
		}
	}
	
	.el-form-item{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border:1px solid #828ab359;
		padding:10px;
		border-radius:4px;
		.el-form-item__label{
			text-align: left;
		}
		.el-input__inner{
			border: none;
			background-color: transparent;
			padding: 0;
		}
	}
	.el-button{
		width: 100%;
		margin: 20px 0;
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
 

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    
  }
</style>