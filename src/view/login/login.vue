<template>
    <div class="big_box">
        <h2>欢迎来到Web小书库后台管理系统</h2>
        <div class="content">
            <h3>请登录</h3>
            <el-form ref="from"  label-width="80px"  :rules="rules2" :model="fromdata" >
                <el-form-item class="jx" label="用户名" prop="username">
                    <el-input  v-model="fromdata.username"
                    placeholder="请输入用户名" ></el-input>
                </el-form-item>
                 <el-form-item class="jx" label="密码"  prop="password">
                    <el-input 
                    v-model="fromdata.password"
                    placeholder="请输入密码" 
                    type="password" 
                    @keyup.enter.native="loginyanzheng"></el-input>
                </el-form-item>
                    <el-button class="ys" 
                    @click="loginyanzheng"  
                    type="primary" :loading="isLoging">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){

        // 验证
        const userNamefun = (rule, value, callback) =>{
            if(!value){
                return callback(new Error('用户名不能为空'))
            }else{
                return callback()
            }
        }
        const passWordfun  =(rule,value,callback)=>{
            if(value&&value.length>=5){
                callback()
            }else{
                callback(new Error('密码格式错误'))
            }
        }

       
        return{
            fromdata:{
                username:'',
                password:''
            },
            isLoging:false,
            rules2:{
            username:[
                { validator:userNamefun,trigger: 'blur'}
            ],
            password:[
                { validator:passWordfun,trigger: 'blur'}
            ]
        }
        }
        
    },
    methods:{
        handlelogin(){
            this.isLoging = true;
            this.$axios.post('/login',this.fromdata).then(res=>{
                console.log(res)
            this.isLoging = false;
                if(res.code ==200){
                    this.$message({
                        message: '登录成功，正在跳转到首页',
                        type: 'success'
                    });
                    let obj = {
                          avatar: res.data.avatar,
                          desc:res.data.desc,
                          email:res.data.email,
                          nickname:res.data.nickname,
                          username:res.data.username
                    }
                    // console.log(obj)
                    this.$store.commit('fuzhi',obj)
                    console.log(this.$store.state)
                    setTimeout(() => {
                        this.$router.push('/layout/index')
                    }, 1000);
                }else if(res.code ==403){
                    this.$message.error('用户名或密码错误');
                }
            })
        },
        loginyanzheng(){
            // refs[]里面是表单ref里的名字,要加引号
          this.$refs['from'].validate((valid) => {
            if (valid) {
                this.handlelogin()
            } else {
                return false;
            }
        });

        }
    }
};
</script>

<style scoped lang='scss'>
.big_box{
    height: 100vh;
    background: #545c64;
    text-align: center;
    color: #fff;
    h2{
    padding-top: 50px;
    }
    .content{
        border-radius: 6px;
        width: 500px;
        height: 300px;
        background: #fff;
        margin: 20px auto 0;
        h3{
            color: #333;
            padding: 20px;
        }
        .jx{
            margin-right: 28px;
        }
        .ys{
            width:90%;
            margin:40px 20px 0 ;
        }
    }
}

</style>