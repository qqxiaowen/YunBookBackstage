<template>
    <div>
        <h2>修改个人密码</h2>

        <el-form label-position=left class="from_ys" ref="form" :model="mypwd" label-width="80px">
            <el-form-item label="原密码">
                <el-input v-model="mypwd.oldpwd" ></el-input>
            </el-form-item>
           
            <el-form-item label="新密码">
                <el-input v-model="mypwd.newpwd"></el-input>
            </el-form-item>

             <el-form-item label="再次输入">
                <el-input  @keyup.enter.native="removepwd" v-model="mypwd.agepwd"></el-input>
            </el-form-item>
            <el-button  type="primary" @click="removepwd">
                        确认修改
            </el-button>
        </el-form>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                mypwd:{
                    oldpwd:'',
                    newpwd:'',
                    agepwd:''
                }
            }
        },
        methods:{
            removepwd(){
                console.log(1)
                if(this.mypwd.newpwd.length<6){
                    this.$message.error('密码位数不够');
                }else if(this.mypwd.newpwd != this.mypwd.agepwd){
                    this.$message.error('两次输入的密码不一致');
                }else{
                    // console.log(this.mypwd.oldpwd)
                    // console.log(this.mypwd.newpwd)
                    this.$axios.put('/user/password',{
                        password:this.mypwd.oldpwd,
                        new_password:this.mypwd.newpwd
                    }).then(res=>{
                        // console.log(res)
                        if(res.code == 200){
                             this.$message({
                            message: res.msg,
                            type: 'success'
                            });
                        }else if(res.code ==400){
                            this.$message({
                            message: res.msg,
                            type: 'error'
                            });
                        }
                    })
                }
            }
        }
        
    }
</script>

<style scoped>
.from_ys{
    width: 700px;
    margin-top: 20px;
}
</style>