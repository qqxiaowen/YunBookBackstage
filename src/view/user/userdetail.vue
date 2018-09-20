<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right " class="mbys">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/layout/user'}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>查看用户详情</el-breadcrumb-item>
        </el-breadcrumb>

         <el-form label-position=left class="from_ys" label-width="80px">
            <el-form-item label="id编号">
                <el-input :disabled='true' v-model="datal._id"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input :disabled='true' v-model="datal.username" ></el-input>
            </el-form-item>
            <el-form-item  label="昵称">
                <el-input :disabled='true' v-model="datal.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input :disabled='true' v-model="datal.email"></el-input>
            </el-form-item>
            <el-form-item label="日期">
                <el-input :disabled='true' v-model="riqi"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <img class="detailimg avatar" v-if="datal.avatar" :src="datal.avatar" >
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input :disabled='true' v-model="datal.desc"></el-input>
            </el-form-item>
           
        </el-form>


    </div>
</template>

<script>
    export default {
        data(){
            return{
                datal:[],
                riqi:'',
                id:''
            }
        },
        methods:{
            getdata(){
                let userid = this.id
                this.$axios.get(`/user/${userid}`).then(res=>{
                    this.datal = res.data
                    let time = new Date(res.data.createdTime)
                    this.riqi = time.toLocaleDateString() +" "+ time.toTimeString().substr(0, 8)
                    // console.log(this.riqi)

                })
            }
        },
        created(){
            // console.log(this.$route.query)
            this.id = this.$route.query.id
            this.getdata()
        }
        
    }
</script>

<style scoped lang="scss">
.mbys{
    padding-bottom: 20px;
}
.from_ys{
    width: 700px;
    padding-top: 30px;
    img{
        width: 280px;
        height: 280px;
    }
}
</style>