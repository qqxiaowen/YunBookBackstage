<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right ">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table
            border
            :data="books"
            style="width: 100%; margin-top:20px">

            <el-table-column
            label="书名"
            width="260">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                    <p class="hove_p_ys">描述: {{ scope.row.desc }}</p>
                    <p>创建日期: {{ scope.row.createTime }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.title }}</el-tag>
                    </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column prop="author" label="作者" width="120">
            </el-table-column>
            <el-table-column label="图标" class="img_box"  width="160">
                <template slot-scope="scope">
                    <img class="img_ys"  :src="scope.row.img" >
                </template>
            </el-table-column>
            <el-table-column prop="index" label="排序"  width="70">
            </el-table-column>
            <el-table-column prop="_id" label="id编号" width="240">
            </el-table-column>
            <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                     <el-button  size="mini" @click=xiugai(scope.row._id)  type="primary">
                        修改
                    </el-button>
                    <el-button size="mini" @click=del(scope.row._id) type="danger">
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
                books:[],
                pn:1,
                maxpn:1,
                size:20,
                count:70,

            }
        },
        methods:{
            xiugai(x){
                this.$router.push(`/layout/revisebook?bookid=${x}`)
            },
            del(x){
                console.log(x)
                
                this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/book/${x}`).then(res=>{
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
            changepage(x){
                if(x > this.maxpn){
                    this.maxpn = x
                }
                this.pn = x
                this.getdata()

            },
            getdata(){
                this.$axios.get('/book',{
                    pn:this.pn,
                    size:this.size
                }).then(res=>{
                    // console.log(res)
                    if(res.data.length == this.size && this.maxpn >= this.count/this.size && this.maxpn == this.pn){
                        // console.log('要加页了')
                        this.count = this.count +this.size
                    }
                    // this.count =res.count
                    this.books = res.data
                    this.books.forEach((item,index) => {
                        let time =  new Date(item.createTime)
                        let newtime = time.toLocaleDateString() +" "+ time.toTimeString().substr(0, 8)
                        this.books[index].createTime = newtime
                    }); 
                })
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
.hove_p_ys{
    padding-bottom: 20px;
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