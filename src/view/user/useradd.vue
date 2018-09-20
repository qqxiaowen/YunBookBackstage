<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right " class="mbys">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加用户</el-breadcrumb-item>
        </el-breadcrumb>


        <el-form class=" useradd">
           
            <el-form-item label="用户名">
                <el-input v-model="userinfo.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
             <el-form-item label="密码">
                <el-input v-model="userinfo.password" placeholder="请输入密码"></el-input>
            </el-form-item>
              <el-form-item label="再次输入密码">
                <el-input v-model="password2" placeholder="请输入密码"></el-input>
            </el-form-item>
             <el-form-item label="昵称">
                <el-input v-model="userinfo.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
             <el-form-item label="个性签名">
                <el-input v-model="userinfo.desc" placeholder="请输入个性签名" ></el-input>
            </el-form-item>
             <el-form-item label="电子邮箱">
                <el-input v-model="userinfo.email" placeholder="请输入电子邮箱"></el-input>
            </el-form-item>

                <el-upload
                    class="avatar-uploader"
                    action="https://upload-z1.qiniup.com"
                    method="post"
                    :data=token
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="userinfo.avatar" :src="userinfo.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                userinfo:{
                    username:'',
                    password:'',
                    nickname:'',
                    desc:'',
                    email:'',
                    avatar:'',
                },
                password2:'',
                token:{token:''}
            }
        },
        methods:{
            
            onSubmit(){
                // console.log(1)
                if(!(this.userinfo.username&&this.userinfo.password)){
                    this.$message.error('请输入用户名或密码');
                }else if(this.userinfo.password.length<6){
                    this.$message.error('密码位数不够');
                }else if(this.userinfo.password != this.password2){
                    this.$message.error('两次输入的密码不一致');
                }else{
                    this.$axios.post('/user',this.userinfo).then(res=>{
                    console.log(res)
                    this.$message({
                        message: '添加成功，正在跳转到用户管理页',
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push('/layout/user')
                    }, 1000);
                }).catch(err=>{
                    this.$message.error('添加失败！');
                    console.log(err)
                })
                }
             
            },

            handleAvatarSuccess(res, file) {
                console.log(res)
                this.userinfo.avatar = res.url

            },
            beforeAvatarUpload(file) {
                console.log(file)
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                    }
                    if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                return isJPG && isLt2M;
            },

            gettoken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                    // console.log(res)
                    this.token.token = res.data.data
                    console.log(this.token)
                })
            }

        },
        created(){
            this.gettoken()
        }
        
    }
</script>

<style scoped>
.useradd{
    margin-top: 30px;
    width: 600px;
}
.el-icon-plus{
    border: 1px solid #d9d9d9;
    margin-bottom: 20px;
}


.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>