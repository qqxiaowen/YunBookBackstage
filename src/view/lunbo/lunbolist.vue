<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right ">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table
            :data="data"
            stripe
            style="width: 100%">
            <el-table-column  label="头图" width="120">
                <template slot-scope="scope">
                    <img class="img_ys" :src="scope.row.img" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="index" label="排序" width="80">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="220">
            </el-table-column>
            <el-table-column prop="book.title" label="所属书籍" width="330">
            </el-table-column>
            <el-table-column prop="date" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="xiugai(scope.row._id)" type="primary">编辑</el-button>
                    <el-button size="mini" @click="dellunbo(scope.row._id)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            class="yema"
            background
            layout="prev, pager, next"
            @current-change="changepage"
            :page-size="fanye.size"
            :total="count">
        </el-pagination>

            </div>
        </template>

<script>
    export default {
        data(){
            return{
                count:1,
                data:[],
                fanye:{
                    pn:1,
                    size:6
                }

            }
        },
        methods:{
            changepage(x){
                this.fanye.pn = x
                this.getdata()
            },
            getdata(){
                this.$axios.get('/swiper',this.fanye).then(res=>{
                    console.log(res)
                    if(res.code == 200){
                        this.data = res.data
                        this.count = res.count
                    }
                })
            },
            dellunbo(id){
                this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(`/swiper/delete`,{
                        ids:[id]
                    }).then(res=>{
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

            xiugai(id){
                this.$router.push(`/layout/xiugailunbo?id=${id}`)
            }
        },
        created(){
            this.getdata()
        }
        
    }
</script>

<style scoped>
.img_ys{
    width: 80px;
    height: 80px;
    display: block;
    margin: 0 auto;
}

.yema{
    position: fixed;
    bottom: 30px;
    left: 50%;
    margin-left: -100px;
    right: 50%;
    z-index: 998;
}
</style>