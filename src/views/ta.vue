<template>
<div>
  <Button @click="exportData">导出PDF</Button>
  <Table :columns="columns" :data="data" ref="table">
  </Table>
</div>
</template>
<script>
  export default {
    props: ['message'],
    data () {
      return {
        columns: [
          {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Address1',
                        key: 'address1'
                    }
                    
        ],
        data: [
          {
            name: '王小明',
            age: 18,
            birthday: '919526400000',
            address: '北京市朝阳区芍药居'
          },
          {
            name: '张小刚',
            age: 25,
            birthday: '696096000000',
            address: '北京市海淀区西二旗'
          },
          {
            name: '李小红',
            age: 30,
            birthday: '563472000000',
            address: '上海市浦东新区世纪大道'
          },
          {
            name: '周小伟',
            age: 26,
            birthday: '687024000000',
            address: '深圳市南山区深南大道'
          }
        ]
      }
    },
    methods: {
      exportData(){
        this.$refs.table.exportCsv({
            filename: '导出数据1',
            original:true,
            data:this.data
        });
      },
    }
  }
</script>