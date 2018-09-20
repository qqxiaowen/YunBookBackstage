<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right " class="mbys">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column prop="nickname" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="createdTime" label="日期"  width="210">
            </el-table-column>
            <el-table-column prop="desc" label="个性签名">
            </el-table-column>
            <el-table-column   label="用户头像" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="avatar">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="205">
                <template slot-scope="scope">
                    <el-button @click="lookxiangqing(scope.row._id)" prop="_id"  type="primary">
                        查看信息
                    </el-button>
                    <el-button @click="delUser(scope.row._id)" type="danger">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            class="yema"
            background
            layout="prev, pager, next"
            @current-change="changepage"
            :page-size="size"
            :total="count">
        </el-pagination>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                tableData:[],
                count:1,
                size:20,
                page:1,
            }
        },
        methods:{
            changepage(page){
                this.page = page
                this.getData()
            },
            getData(){
                this.$axios.get('/user',{
                        pn:this.page,
                        size:this.size
                }).then(res=>{
                    console.log(res)
                    if(res.code == 200){
                        this.tableData = res.data
                        this.count = res.count
                        // this.count = res.count/this.size*10

                    this.tableData.forEach((item,index) => {
                        let time =  new Date(item.createdTime)
                        let newtime = time.toLocaleDateString() +" "+ time.toTimeString().substr(0, 8)
                        this.tableData[index].createdTime = newtime
                        });  
                    }
                })
            },
            lookxiangqing(e){
                this.$router.push(`/layout/userdetail?id=${e}`)
            },
            delUser(id){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.post('/user/delete',{userIds:[id]}).then(res=>{
                            if(res.code == 200){
                                 this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getData()
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
            this.getData()
        }
        
    }
</script>

<style scoped>
.yema{
    position: fixed;
    bottom: 30px;
    left: 50%;
    margin-left: -100px;
    right: 50%;
}
.avatar{
    width: 80px;
    height: 80px;
}
.mbys{
    padding-bottom: 20px;
}
</style>