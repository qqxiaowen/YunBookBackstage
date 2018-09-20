<template>
    <div>
        <h2>修改个人信息</h2>
        <el-form label-position=left class="from_ys" ref="form" :model="myinfo" label-width="80px">
            <el-form-item label="用户名">
                <el-input :disabled='true' v-model="myinfo.username" ></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="myinfo.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="myinfo.email"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <!-- <el-input v-model="myinfo.avatar"></el-input>
                 -->
                   <el-upload
                    class="avatar-uploader"
                    action="https://upload-z1.qiniup.com"
                    method="post"
                    :data=token
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="myinfo.avatar" :src="myinfo.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

            </el-form-item>
            <el-form-item label="个性签名">
                <el-input v-model="myinfo.desc"></el-input>
            </el-form-item>
            <el-button @click="remove" type="primary">
                        确认修改
            </el-button>
        </el-form>
    </div>
</template>

<script>
    import  axios from 'axios'
    export default {
        data(){
            return{
                myinfo:{
                    // avatar: '',
                    // desc:'',
                    // email:'',
                    // nickname:'',
                    // username:''
                },
                token:{token:''}
            }
            
        },
        methods:{
            handleAvatarSuccess(res, file) {
                // console.log(res)
                this.myinfo.avatar = res.url

            },
            gettoken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                    this.token.token = res.data.data
                })
            },
            getdata(){
                this.myinfo = this.$store.state.userinfo
            },

            remove(){
                console.log(1)
                this.$axios.put('/user/userInfo',this.myinfo).then(res=>{
                    console.log(res)
                    if(res.code == 200){
                        let newinfo = res.data
                        this.$store.commit('fuzhi',newinfo)
                        this.getdata()
                        this.$message.success(res.msg)
                    }
                })
            }
        },
        created(){
            this.getdata()
            this.gettoken()
            // console.log(this.myinfo)
        }
    }
</script>

<style scoped>
.from_ys{
    width: 700px;
    padding-top: 30px;
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