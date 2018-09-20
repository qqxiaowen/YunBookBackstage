<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right " class="mbys">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加分类</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form class="addbookfenlei">
            <el-form-item label="分类名">
                <el-input v-model="adddata.title"  placeholder="请输入分类名"></el-input>
            </el-form-item>
            
                <el-upload
                    class="avatar-uploader"
                    action="https://upload-z1.qiniup.com"
                    method="post"
                    :data=token
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="adddata.icon" :src="adddata.icon" >
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-button type="primary" @click="onSubmit">添加分类</el-button>

        </el-form>
        
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        data(){
            return{
                adddata:{
                    title:'',
                    icon:'',
                },
                token:{token:''},
            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.adddata.icon = res.url
            },
            gettoken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                    this.token.token = res.data.data
                })
            },
            onSubmit(){
                this.$axios.post('/category',this.adddata).then(res=>{
                    console.log(res)
                    if(res.code == 200){
                            this.$message({
                            message: '添加成功，正在跳转到用户管理页',
                            type: 'success'
                        })
                        this.$router.push('/layout/bookfenlei')
                    }
                }).catch(err=>{
                    this.$message.error('添加失败！');
                })
            },

        },
        created(){
            this.gettoken()
        }
        
    }
</script>

<style scoped>
.addbookfenlei{
    margin-top: 20px;
    width: 600px;
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