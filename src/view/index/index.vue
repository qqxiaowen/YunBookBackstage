<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right " class="mbys">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="adduser" >
            <el-button type="primary" @click="adduser">添加用户</el-button>
        </div>
        
    </div>
</template>

<script>
    export default {
        methods:{
            adduser(){
                this.$router.push('/layout/useradd')
            }
        }
        
    }
</script>

<style scoped>
.adduser{
    padding-top: 20px;
}
</style>