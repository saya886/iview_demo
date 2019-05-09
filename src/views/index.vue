
<template>
<div>
    <care_s :style="{margin: '24px'}"/>
<ta/>

</div>
</template>
<script>
import ta from './ta.vue'
import card from './card.vue'
import Table_s from './table.vue'
import care_s from './care_s.vue'
    export default {
        data(){
            return{
                min_height:(window.innerHeight-170).toString()+"px",
                select_item:"null",
                data_list:[1,2,3,4,5]
            }
        },
        components:{
            ta,
            card,
            "table-s":Table_s,
            care_s
        },
        methods:{
            load_content:function(x){
                console.log(x)
                this.select_item = x
            }
        }
    }
</script>