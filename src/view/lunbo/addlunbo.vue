<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right ">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!$route.path == '/layout/xiugailunbo'">添加轮播图</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改轮播图</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form class="addlunbo" label-width="120px" label-position="left" >
            <el-form-item label="轮播图标题">
                <el-input v-model="info.title"  placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="轮播图书籍">
                <el-select v-model="info.typeId" @change=xuanzefenlei  placeholder="请选择">
                    <el-option
                    v-for="item in fenlei"
                    :key="item._id"
                    :label="item.title"
                    :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>

            <div class="activebook" v-if="getxuanzebook[0]">
                <div class="book_left">
                     <img :src="getxuanzebook[0].img" alt="">
                </div>
                <div class="book_right">
                    <h4>标题：{{this.getxuanzebook[0].title}}</h4>
                    <span>作者:{{getxuanzebook[0].author}}</span>
                </div>
            </div>
           
            <el-form-item label="轮播图头图">
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
            <el-form-item label="轮播图排序">
                <el-input-number v-model="info.index"></el-input-number>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSuber" v-if="!$route.path == '/layout/xiugailunbo'">立即创建</el-button>
                <el-button type="primary" @click="onXiugai" v-else>确定修改</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="该分类下的书籍" :visible.sync="isShow">
        <el-table :data="books">
            <el-table-column property="title" label="书名" width="230"></el-table-column>
            <el-table-column  label="头图" width="200">
                  <template slot-scope="scope">
                    <img class="img_ys" :src="scope.row.img" alt="">
                </template>
            </el-table-column>
            <el-table-column property="author" width="200" label="作者"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="xuanzhong(scope.row._id,scope.$index)">选中</el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-dialog>

        


    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                token:{token:''},
                fenlei:'',
                pn:1,
                isShow:false,
                books:[],
                bookid:'',
                info:{
                    title:'',
                    img:'',
                    book:'',
                    index:1,
                    typeId:'',
                }

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
            getfenlei(){
                this.$axios.get('/category',{pn:this.pn}).then(res=>{
                    this.fenlei = [...this.fenlei,...res.data]
                    if(res.data.length == 10){
                        this.pn = this.pn + 1
                        this.getfenlei()
                    }
                })
            },
            xuanzefenlei(){
                this.isShow= true
                this.getbook()
            },
            async getbook(){
               let res = await this.$axios.get(`/category/${this.info.typeId}/books`)
               console.log(res)
               this.books = [...res.data.books,...this.books]
               if(res.data.books.length == 10){
                   this.getbook()
               }
               console.log(this.books)
            },
            xuanzhong(id,index){
                // console.log(id,index)
                this.info.book = id
                this.isShow = false;
            },
            async onSuber(){
                // console.log(this.info)
                let res = await this.$axios.post(`/swiper`,this.info)
                // console.log(res)
                if(res.code == 200){
                    this.$message({
                        message: '添加成功，正在跳转轮播图列表页',
                        type: 'success'
                    });
                    this.$router.push('/layout/lunbolist')
                }
            },
            getaddbooklunbo(){ //分类下书籍生成轮播图
                let bookid =   this.$route.query.bookid
                this.bookid = bookid
                    if(bookid){
                    this.info.book = bookid
                    this.$axios.get(`book/${bookid}`).then(res=>{
                        console.log(res)
                        this.info.typeId = res.data.type
                        // this.getxuanzebook[0] = res.data
                    })
                }
            },

            async getxiugai(){ //编辑轮播图
                let res = await this.$axios.get(`/swiper/${this.$route.query.id}`)
                console.log(res)
                this.info = {...this.info,...res.data}
                this.info.typeId = res.data.book.type
                this.info.book = res.data.book._id
                this.bookid = res.data.book._id
                // this.getxuanzebook[0] = res.data.book
                this.getbook()
            },

            onXiugai(){
                console.log(1)
                this.$axios.put(`/swiper/${this.info._id}`,this.info).then(res=>{
                    // console.log(res)
                    if(res.code == 200){
                        this.$message({
                                type: 'success',
                                message: '修改成功,正在跳转轮播图列表页。。。'
                        });
                        this.$router.push('/layout/lunbolist')
                    }
                })
            }


        },
        created(){
            this.gettoken()
            this.getfenlei()
            this.getaddbooklunbo()
            if(this.$route.path == '/layout/xiugailunbo'){
                // console.log('11111')
                this.getxiugai()
            }
        },

        computed:{
            getxuanzebook(){
                if(this.info.book ){ //用户选择了一本书
                // if(this.info.book && this.info.book != this.bookid){ //用户选择了一本书
                    return this.books.filter(item => item._id == this.info.book)
                }else{
                    return []
                }
            }
        },
      
        
    }
</script>

<style scoped lang="scss">
.activebook{
    width: 400px;
    height: 130px;
    padding: 20px;
    border: 1px solid #888;
    margin-bottom: 10px;
    .book_left{
        float: left;
        width: 120px;
        height: 130px;
        img{
            width: 100px;
            height: 130px;
        }
    }
    .book_right{
        float: left;
        line-height: 24px;
    }
}

.addlunbo{
    width: 700px;
    margin-top: 20px;
}
.img_ys{
    width: 80px;
    height: 80px;
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