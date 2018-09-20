<template>
    <div>
        <h1>ajax上传图片</h1>
        <input type="file" @change="handleChange">
        <img :src="upimg" alt="">
        
        <upload @succes="uploadimg"></upload>
        <img :src="upimg2" alt="">
    </div>
</template>

<script>
    import axios from 'axios'
    import upload from './upload-com'
    export default {
        components:{
          upload  
        },
         data(){
            return{
                token:'',
                upimg:'',
                upimg2:''
            }
        },
        methods:{
            uploadimg(url){
                this.upimg2 = url
                },
            gettoken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                    // console.log(res)
                    this.token = res.data.data
                })
            },

            handleChange(e){
                console.log(e)
                let file = e.target.files[0]

                let forData = new FormData()
                forData.append('file',file,file.name)
                forData.append('token',this.token)

                axios.post('https://upload-z1.qiniup.com',forData,{
                    headers:{
                        'Content-Type':'multipart/form-data',
                    }
                }).then(res=>{
                    console.log(res)
                    this.upimg = res.data.url
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