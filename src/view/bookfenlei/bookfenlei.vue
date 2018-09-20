<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right " class="mbys">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>书籍分类</el-breadcrumb-item>
        </el-breadcrumb>

        
         <el-table
            :data="bookfenlei"
            border
            style="width: 100%; margin-top:20px">
            <el-table-column prop="title" label="分类名" width="150" >
            </el-table-column>
            <el-table-column prop="books.length" label="书的数量" width="90">
            </el-table-column>
            <el-table-column prop="index" label="排序"  width="70">
            </el-table-column>
            <el-table-column   label="图标" class="img_box"  width="200">
                <template slot-scope="scope">
                    <img class="img_ys"  :src="scope.row.icon" >
                </template>
            </el-table-column>
            <el-table-column prop="_id" label="id编号" width="260">
            </el-table-column>
            <el-table-column label="操作" width="230">
                <template slot-scope="scope">
                    <el-button @click=xiangqing(scope.row._id) size="mini"  type="primary">
                        详情
                    </el-button>
                     <el-button @click=xiugai(scope.row._id) size="mini"  type="primary">
                        修改
                    </el-button>
                    <el-button @click=dell(scope.row._id) size="mini" type="danger">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <div class="block">
            <el-pagination
                :background="true"
                layout="prev, pager, next"
                @current-change="fanye"
                :page-size="qingqu.size"
                :total="count">
            </el-pagination>
        </div>

        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                qingqu:{
                    pn:1,
                    size:5
                },
                bookfenlei:[],
                count:1,
            }
        },
        methods:{
            getdata(){
                this.$axios.get('/category',this.qingqu).then(res=>{
                    this.bookfenlei = res.data
                    this.count = res.count
                    // console.log(this.bookfenlei)
                })
            },
            fanye(x){
                // console.log(x)
                this.qingqu.pn = x;
                this.getdata()
            },
            xiangqing(x){
                this.$router.push(`/layout/bookfldetail?id=${x}`)
            },
            xiugai(x){
                this.$router.push(`/layout/bookflxiugai?id=${x}`)

            },
            dell(x){
                // console.log(x)
                this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(()=>{
                        this.$axios.delete(`/category/${x}`).then(res=>{
                            // console.log(res)
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
            
        },
       
        created(){
            this.getdata()
        }
    }
</script>

<style scoped lang="scss">
.img_ys{
    width: 80px;
    height: 80px;
    display: block;
    margin: 0 auto;
}
.block{
    position: fixed;
    bottom: 20px;
    left: 50%;
    margin-left: -100px;
    right: 50%;
    z-index: 998;
}
</style>