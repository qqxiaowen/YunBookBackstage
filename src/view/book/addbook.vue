<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right ">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加书籍</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form class="addbook" label-width="120px" label-position="left" >
            <el-form-item label="作者">
                <el-input v-model="info.author"  placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="info.typeId" placeholder="请选择">
                    <el-option
                    v-for="item in fenlei"
                    :key="item._id"
                    :label="item.title"
                    :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="看云图书链接">
                <el-input  v-model="info.url"  placeholder="请输入云图书链接地址"></el-input>
            </el-form-item >
             <el-form-item label="书籍头图">

                <el-upload
                    class="avatar-uploader"
                    action="https://upload-z1.qiniup.com"
                    method="post"
                    :data=token
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="info.img" :src="info.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item >
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
                token:{token:''},
                fenlei:'',
                title:'',
                pn:1,
                info:{
                    url:'',
                    img:'',
                    author:'',
                    typeId:''
                }

            }
        },
        methods:{
            onSubmit(){
                // console.log(this.info)
                this.$axios.post('book',this.info).then(res=>{
                    if(res.code == 200){
                        this.$message({
                        message: '添加成功，正在跳转分类详情页',
                        type: 'success'
                    });
                    setTimeout(()=>{
                        this.$router.push(`/layout/bookfldetail?id=${this.info.typeId}`)
                        },1000)
                    }
                   
                }).catch(err=>{
                    this.$message.error('添加失败！');
                    console.log(err)
                })
            },

            handleAvatarSuccess(res, file) {
                this.info.img = res.url

            },
           
            gettoken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                    this.token.token = res.data.data
                    // console.log(this.token)
                })
            },
            getfenlei(){
                this.$axios.get('/category',{pn:this.pn}).then(res=>{
                    // console.log(res)
                    this.fenlei = [...this.fenlei,...res.data]
                    // console.log(this.fenlei)
                    if(res.data.length == 10){
                        this.pn = this.pn + 1
                        this.getfenlei()
                    }
                })
            }

        },

        created(){
            this.gettoken()
            this.getfenlei()
        }
        
    }
</script>

<style scoped>
.addbook{
    width: 700px;
    margin-top: 20px;
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