<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right " >
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/bookfenlei' }">书籍分类</el-breadcrumb-item>
            <el-breadcrumb-item>分类修改</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form label-width="100px" label-position="left" style="margin-top:20px;">
            <el-form-item label="分类名" >
                <el-input v-model="xiugai.title" ></el-input>
            </el-form-item>
            <el-form-item label="分类排序">
                <el-input v-model="xiugai.index" ></el-input>
            </el-form-item>
            <el-form-item label="分类logo"> 
               <el-upload
                    class="avatar-uploader"
                    action="https://upload-z1.qiniup.com"
                    method="post"
                    :data=token
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="xiugai.icon" :src="xiugai.icon" class="img_ys">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-button size="mini" type="primary" @click="onSubmit">点击修改</el-button>

        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
               
                xiugai:{
                    title:'',
                    icon:'',
                    index:''
                },
                token:{token:''}

            }
        },
        methods:{
            onSubmit(){
                let id = this.$route.query.id
                this.$axios.put(`category/${id}`,this.xiugai).then(res=>{
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    this.$router.push('/layout/bookfenlei')

                }).catch(err =>{
                    this.$message.error('添加失败！');
                    console.log(err)
                })
            },
            handleAvatarSuccess(res, file) {
                this.xiugai.icon = res.url
            },
            gettoken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                    this.token.token = res.data.data
                })
            },

        },
        created(){
            let id = this.$route.query.id
            this.$axios.get(`category/${id}`).then(res=>{
                this.xiugai.title = res.data.title
                this.xiugai.icon = res.data.icon
                this.xiugai.index = res.data.index
            })
            this.gettoken()
        }
        
    }
</script>

<style scoped>
.img_ys{
    width: 200px;
    height: 200px;
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