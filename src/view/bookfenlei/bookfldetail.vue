<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right " class="mbys">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/bookfenlei' }">书籍分类</el-breadcrumb-item>
            <el-breadcrumb-item>分类详情</el-breadcrumb-item>
        </el-breadcrumb>
        <h3 class="biaoti">分类名：{{title}} 
            <span class="span_ys">
                <el-button type="primary" size="small" :round='true' icon="el-icon-edit" >添加书籍</el-button>
            </span>
        </h3>

        <el-table
            :data="books"
            stripe
            style="width: 100%">
            <el-table-column prop="" label="logo" width="120">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="avatar">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="书名" width="260">
            </el-table-column>
            <el-table-column prop="author" label="作者" width="100">
            </el-table-column>
            <el-table-column prop="index" label="排序" width="80">
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" >
            </el-table-column>

            <el-table-column label="操作" width="400">
                <template slot-scope="scope">
                    <el-button size="mini" @click="addlunbo(scope.row._id)">
                        生成轮播图
                    </el-button>
                    <el-button size="mini" @click="revisebook(scope.row._id)" type="primary">
                        编辑
                    </el-button>
                    <el-button size="mini" @click="delbook(scope.row._id)"  type="danger">
                        删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>


        <el-pagination
        class="yema"
        background
        layout="prev, pager, next"
        @current-change="fanye"
        :page-size="size"
        :total="count">
        >
        </el-pagination>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                books:[],
                title:"",
                size:5,
                pn:1,
                count:1
            }
        },
        methods:{
            fanye(x){
                let id = this.$route.query.id
                this.pn = x;
                this.getdata(id)
            },
            getdata(){
                let id = this.$route.query.id
                this.$axios.get(`/category/${id}/books`,{
                    pn:this.pn,
                    size:this.size
                }).then(res=>{
                    console.log(res)
                    this.books = res.data.books
                    this.title = res.data.title
                    this.count = res.count
                    this.books.forEach((item,index) => {
                        let time =  new Date(item.createTime)
                        let newtime = time.toLocaleDateString() +" "+ time.toTimeString().substr(0, 8)
                        this.books[index].createTime = newtime
                        });  
                })
            },
            delbook(bookid){
                let id = this.$route.query.id
                console.log(id)
                this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/category/${id}/book/${bookid}`).then(res=>{
                        if(res.code == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getdata()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },

            revisebook(bookid){
                this.$router.push(`/layout/revisebook?bookid=${bookid}`)
            },
            addlunbo(bookid){
                this.$router.push(`/layout/addlunbo?bookid=${bookid}`)
            }
        },
        created(){
            this.getdata()
            
        }
    }
</script>

<style scoped lang="scss">
.biaoti{
    margin-top:20px;
    font-weight: 400;
    .span_ys{
        float: right;
        font-weight: 500;
        font-size: 16px;
    }
}
.avatar{
    width: 70px;
    height: 70px;
}
.yema{
    position: fixed;
    bottom: 20px;
    left: 240px;
    z-index: 998;
}

</style>