<template>
<div>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">No border title</p>
            <p>{{message}}</p>
            <p>{{this.data_arg}}</p>
            <p @click.stop=fun2>{{this.data_arg}}</p>
            {{func123}}
            {{fun2()}}
        </Card>
        
    </div>
    </div>
</template>
<script>
    export default {
        props: ['message'],
        data(){
            return{
                data_arg:this.message
            }
        },
        computed:
        {
            func123:function(){
                console.log("22222222222222")
                this.data_arg = this.message
                return this.data_arg
                
            }
        },
        methods:
        {
            fun2:function(){
                console.log("111111111")
                return this.message
            }
        }
    }
</script>
