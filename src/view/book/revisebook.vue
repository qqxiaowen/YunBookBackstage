<template>
    <div>
        <h2>修改图书</h2>
        <el-form class="addbook" label-width="120px" label-position="left" >
            <el-form-item label="作者">
                <el-input v-model="info.author"  placeholder="请输入作者名"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="info.type" placeholder="请选择">
                    <el-option
                    v-for="item in fenlei"
                    :key="item._id"
                    :label="item.title"
                    :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>

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
            <el-form-item label="排序">
                <el-input v-model="info.index"  placeholder="请输入排序号"></el-input>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="info.title"  placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="info.desc"  placeholder="请输入描述"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                info:{},

                pn:1,
                fenlei:'',

                token:{token:''}

            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.info.img = res.url
            },
           
            gettoken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                    this.token.token = res.data.data
                })
            },
            getbook(){
                let bookid = this.$route.query.bookid
                this.$axios.get(`/book/${bookid}`).then(res=>{
                    // console.log(res)
                    this.info = res.data
                    this.info.book_id = this.info._id
                    console.log(this.info)
                })
            },
            getfenlei(){
                this.$axios.get('/category',{pn:this.pn}).then(res=>{
                    this.fenlei = [...this.fenlei,...res.data]
                    if(res.data.length == 10){
                        this.pn = this.pn + 1
                        this.getfenlei()
                    }
                })
            },

            onSubmit(){
                this.$axios.put(`/book`,this.info
                // {
                //     book_id:this.info._id,
                //     index:this.info.index,
                //     desc:this.info.desc,
                //     author:this.info.author,
                //     img:this.info.img,
                //     type:this.info.type,
                //     title:this.info.title,
                // }
                ).then(res=>{
                    if(res.code == 200){
                        this.$message({
                        message: '修改成功，正在跳转分类详情页',
                        type: 'success'
                        });
                        this.$router.push(`/layout/bookfldetail?id=${this.info.type}`)
                    }
                }).catch(err=>{
                    console.log(err)                    
                    this.$message.error('添加失败！');
                })
            }

        },
        created(){
            this.getbook()
            this.gettoken()
            this.getfenlei()
        }
        
    }
</script>

<style scoped>

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