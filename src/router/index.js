import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login:()=>import ('../view/login/login'),
  layout:()=>import('../view/layout/layout'),
  index:()=>import('../view/index/index'),
  user:()=>import('../view/user/user'),
  userdetail:()=>import('../view/user/userdetail'),
  useradd:()=>import('../view/user/useradd'),
  chuantong:()=>import('../view/layout/chuantongfrom'),
  ajax:()=>import('../view/layout/ajaxfrom'),
  remyinfo:()=>import('../view/myinfo/my-inforemove'),
  remypwd:()=>import('../view/myinfo/my-usrpwd'),
  bookfenlei:()=> import('../view/bookfenlei/bookfenlei'),
  addbookfenlei:()=> import('../view/bookfenlei/addbookfenlei'),
  bookfldetail:()=> import('../view/bookfenlei/bookfldetail'),
  bookflxiugai:()=> import('../view/bookfenlei/bookflxiugai'),
  booklist:()=> import('../view/book/booklist'),
  addbook:()=> import('../view/book/addbook'),
  revisebook:()=> import('../view/book/revisebook'),

}

const router =new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      meta:{
        title:'登录页'
      },
      component: components.login
    },
    {
      path: '/layout',
      component: components.layout,
      redirect:'/layout/index',
      children:[
        {
          path:'ajax',
          meta:{
            title:'ajax上传图片'
          },
          component: components.ajax,
        },
        {
          path:'chuantong',
          meta:{
            title:'传统表单上传图片'
          },
          component: components.chuantong,
        },
        {
          path:'index',
          meta:{
            title:'首页'
          },
          component: components.index,
        },
        {
          path:'user',
          meta:{
            title:'用户管理'
          },
          component: components.user,
        },{
          path:'userdetail',
          meta:{
            title:'用户详情页'
          },
          component: components.userdetail,
        },{
          path:'useradd',
          meta:{
            title:'添加用户页'
          },
          component: components.useradd,
        },
        {
          path:'remyinfo',
          meta:{
            title:'修改个人信息'
          },
          component: components.remyinfo,
        },
        {
          path:'remypwd',
          meta:{
            title:'修改个人信息'
          },
          component: components.remypwd,
        },
        {
          path:'bookfenlei',
          meta:{
            title:'书籍分类页'
          },
          component: components.bookfenlei,
        },
        {
          path:'addbookfenlei',
          meta:{
            title:'添加分类'
          },
          component: components.addbookfenlei,
        },
        {
          path:'bookfldetail',
          meta:{
            title:'分类详情'
          },
          component: components.bookfldetail,
        },
        {
          path:'bookflxiugai',
          meta:{
            title:'修改分类'
          },
          component: components.bookflxiugai,
        },

        {
          path:'booklist',
          meta:{
            title:'图书列表'
          },
          component: components.booklist,
        },
        {
          path:'addbook',
          meta:{
            title:'添加图书'
          },
          component: components.addbook,
        },
        {
          path:'revisebook',
          meta:{
            title:'修改图书'
          },
          component: components.revisebook,
        }
      ]
    }
  ]
  
})

router.beforeEach((to,from,next) =>{
  if (to.meta && to.meta.title){
      document.title = to.meta.title
  }
  next()
})

// 导出路由实例
export default router