<template>
    <div>
        <h1>你好啊朋友,这是封装的组件</h1>
        <label class="upload-wrap">
            <input class="upload-input" style="display:none" type="file" @change="handleupload">
            <i class="el-icon-plus"></i>
        </label>
        <img :src="upimg" alt="">
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                token:'',
                upimg:''
            }
        },
        methods:{
            gettoken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                    // console.log(res)
                    this.token = res.data.data
                })
            },
            handleupload(e){

                let file = e.target.files[0]
                let forData = new FormData()
                forData.append('file',file,file.name)
                forData.append('token',this.token)

                axios.post('https://upload-z1.qiniup.com',forData,{
                    headers:{
                        'Content-Type':'multipart/form-data',
                    }
                }).then(res=>{
                    this.upimg = res.data.url
                    this.$emit('succes',res.data.url)
                })
            }
        },
       
        created(){
            this.gettoken()
        }
    } 
</script>

<style scoped lang="scss">
.upload-wrap{
    position: relative;
    display:block;
    width: 200px;
    height: 200px;
    border-radius: 6px;
    border: 1px solid #a3a3a3;
    cursor: pointer;
    .el-icon-plus{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)
    }
    .upload-input{
        width: 200px;
        height: 200px;
    }
}
</style>