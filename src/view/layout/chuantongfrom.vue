<template>
    <div>
        <h1>传统表单上传</h1>
        <form action="https://upload-z1.qiniup.com" method="post" enctype="multipart/form-data">
            <input name ="file" type ="file"> 
            <br>
            <input v-model="token" name="token"> 
            <br>
            <button>提交</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                token:''
            }
        },
        methods:{
            gettoken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                    // console.log(res)
                    this.token = res.data.data
                })
            }
        },
        created(){
            this.gettoken()
        }
        
    }
</script>

<style scoped>

</style>