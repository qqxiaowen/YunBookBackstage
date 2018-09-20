<template>
    <div class="layout">
        <div class="top ml-200" >
            Web小书库后台管理系统
            <navtop></navtop>
        </div>
        <div class="left">
            
       <el-menu
       background-color ='#697478'
       text-color = '#fff'
      :router = true>

        <el-menu-item-group>
          <el-menu-item style="padding-left:54px" index="/layout/index">首页</el-menu-item>
        </el-menu-item-group>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/layout/user">用户管理</el-menu-item>
          <el-menu-item index="/layout/useradd">添加用户</el-menu-item>
          <el-menu-item index="/login">登录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>个人管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/layout/remyinfo">修改个人信息</el-menu-item>
          <el-menu-item index="/layout/remypwd">修改个人密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/layout/bookfenlei">书籍分类列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/layout/addbookfenlei">添加分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>书籍管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/layout/booklist">书籍列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/layout/addbook">添加书籍</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       </el-menu>

        </div>
        <div class="main-content ml-200">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import navtop from '../myinfo/navtop';
export default {
    components:{
      navtop
    }
};
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 955;
  background: #697478;
  color: #fff;
  // width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 24px;
}
.left {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: #697478;
  width: 200px;
  padding-top: 60px;

  /deep/{
    .el-menu {
      border-right: none;
    }
     
  }
}
.ml-200 {
  margin-left: 200px;
}
.main-content{
    padding: 16px;
    margin-top: 60px;
}
  
</style>