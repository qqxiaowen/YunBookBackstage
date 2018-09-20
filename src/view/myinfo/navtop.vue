<template>
    <div class="big_box">

        <el-dropdown @command="handleCommand" >
            <div class="img_ys">
                <img class="el-icon-arrow-down " :src="$store.state.userinfo.avatar" alt="">
            </div>
                <i class="el-icon-caret-bottom"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">修改个人信息</el-dropdown-item>
                <el-dropdown-item command="0">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
       
    </div>
</template>

<script>
    export default {
        methods:{
            handleCommand(x) {
                if(x==1){
                    this.$router.push('/layout/remyinfo')
                }else if(x==0){
                    this.$router.push('/login')
                }
            },
         
        }
        
    }
</script>

<style scoped lang="scss">
.big_box{
    position:absolute;
    top: 0px;
    right: 10px;
    z-index: 998;
    width: 70px;
    height: 60px;
    // right: 500px;
    // top: 0;
    .img_ys{
        margin-top: 5px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        img{
            width: 50px;
            height: 50px;
        }
    }
    .el-icon-caret-bottom{
        color: #333;
        float: right;
        margin-top: -30px;
        // display: inline-block;
    }
    /deep/{
        .el-dropdown{
            display: block
        }
    }
    
}
</style>