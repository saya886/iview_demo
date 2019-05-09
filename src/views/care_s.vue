<template>
<div>
  <!-- 弹出modal -->
  <div>
    <Modal
        v-model="modal1"
        title="添加记录"
        @on-ok="ok"
        @on-cancel="cancel">
        <div v-for="column in columns" :style="{'margin-top':'10px'}">
          <Input  placeholder="" style="width: 100%">
          <Button slot="append">{{column.title}}</Button>
          </Input>
        </div>

    </Modal>
  </div>
  <!-- 操作栏目 -->
  <div :style="{'margin-bottom':'20px'}">
    <div :style="{'display':'inline-block'}">
      <ButtonGroup>
        <Button @click="exportData">导出PDF</Button>
        <Button @click="modal1 = true"> 添加记录</Button>
        <Button @click="del_select_item"> 删除</Button>
        <Button @click="add_a_row"> 添加一条记录</Button>
    </ButtonGroup>
    </div>
    <div :style="{'display':'inline-block','float':'right'}">
    <Input v-model="searchString" icon="ios-search"  placeholder="搜索" style="width: auto" />
    </div>
  </div>
<!-- 表格内容 -->
  <div>
  <Table @on-selection-change="selection_change_click" :columns="columns" :data="filter_arry" ref="table">
    <template slot-scope="{ row, index }" slot="name">
      <Input type="text" v-model="editName" v-if="editIndex === index" />
      <span v-else>{{ row.name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="age">
      <Input type="text" v-model="editAge" v-if="editIndex === index" />
      <span v-else>{{ row.age }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="birthday">
      <Input type="text" v-model="editBirthday" v-if="editIndex === index" />
      <span v-else>{{ getBirthday(row.birthday) }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="address">
      <Input type="text" v-model="editAddress" v-if="editIndex === index" />
      <span v-else>{{ row.address }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button @click="handleSave(index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button @click="handleEdit(row, index)">操作</Button>
      </div>
    </template>
  </Table>
  </div>
  <!-- 底部状态 -->
  <div :style="{'margin-top':'10px'}">
    <div :style="{'display':'inline-block','margin-top':'20px'}">
      共有 {{total_count}} 条记录
    </div>
    <div :style="{'display':'inline-block','margin-top':'10px','float':'right'}">
      <Page @on-page-size-change="page_size_click" @on-change="page_change_click" :page-size="page_size_count" :total="total_count" show-sizer />
    </div>
  </div>
</div>
</template>
<script>
  export default {
    props: ['message'],
    data () {
      return {
        columns: [
          {
              type: 'selection',
              width: 60,
              align: 'center'
          },
          {
            title: '姓名',
            slot: 'name',
            sortable: true,
            key:'name'
          },
          {
            title: '年龄',
            slot: 'age',
            sortable: true,
            key:'age'
          },
          {
            title: '出生日期',
            slot: 'birthday',
            sortable: true,
            key:'birthday'
          },
          {
            title: '地址',
            slot: 'address',
            key:'address'
          },
          {
            title: '操作',
            slot: 'action',
            key:'action'
          }
        ],
        data: [
          {
            name: 'abc',
            age: 18,
            birthday: '919526400000',
            address: '北京市朝阳区芍药居'
          },
          {
            name: 'ab',
            age: 25,
            birthday: '696096000000',
            address: '北京市海淀区西二旗'
          },
          {
            name: 'ac',
            age: 30,
            birthday: '563472000000',
            address: '上海市浦东新区世纪大道'
          },
          {
            name: 'ad',
            age: 26,
            birthday: '687024000000',
            address: '深圳市南山区深南大道'
          }
        ],
        editIndex: -1,  // 当前聚焦的输入框的行数
        editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editAge: '',  // 第二列输入框
        editBirthday: '',  // 第三列输入框
        editAddress: '',  // 第四列输入框
        searchString:'',
        modal1: false,
        page_size_count:10,
        page_num:1,
        selection_item:[],
        export_status:true
      }
    },
    methods: {
      handleEdit (row, index) {
        this.editName = row.name;
        this.editAge = row.age;
        this.editAddress = row.address;
        this.editBirthday = row.birthday;
        this.editIndex = index;
      },
      handleSave (index) {
        this.data[index].name = this.editName;
        this.data[index].age = this.editAge;
        this.data[index].birthday = this.editBirthday;
        this.data[index].address = this.editAddress;
        this.editIndex = -1;
      },
      handleDel () {
      },
      getBirthday (birthday) {
        const date = new Date(parseInt(birthday));
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
      },
      exportData(){
        function createAndDownloadFile(fileName, content) {
            var aTag = document.createElement('a');
            var blob = new Blob([content]);
            aTag.download = fileName;
            aTag.href = URL.createObjectURL(blob);
            aTag.click();
            URL.revokeObjectURL(blob);
        }
        var swap_this = this
        var content = ""
        for(var i=0;i<swap_this.data.length;i++){
          var swap_str = ""
          Object.keys(swap_this.data[i]).forEach(function(key){
            swap_str = swap_str + swap_this.data[i][key].toString() + ","
          })
          swap_str = swap_str + "\n"
          content = content + swap_str
        }
        createAndDownloadFile("导出记录.csv",content)
        
        
      },
      add_a_row(){
        var data_obj = {
            name: '123',
            age: 26,
            birthday: '687024000000',  
            address: '深圳市南山区深南大道'
          }

          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
          this.data.push(data_obj)
      },
      ok () {
          this.$Message.info('添加成功');
            },
      cancel () {
          // this.$Message.info('Clicked cancel');
      },
      page_change_click(page_num_arg){
        console.log(page_num_arg)
        this.page_num = page_num_arg

      },
      page_size_click(page_size_arg){
        console.log(page_size_arg)
        if(page_size_arg != undefined){
          this.page_size_count = page_size_arg
        }
      },
      selection_change_click(selection_item_arg){
        console.log(selection_item_arg)
        this.selection_item = selection_item_arg
      },
      del_select_item(){
      }
    },
    computed:
        {
            total_count:function(){
                var data_array = this.data,
                searchString = this.searchString;

                if(!searchString){
                  return data_array.length
                }

                searchString = searchString.trim().toLowerCase();
                var page_num_a = this.page_num
                data_array = data_array.filter(function(item){
                    if(item.name.toLowerCase().indexOf(searchString) !== -1){
                        return item;
                    }
                })
                return data_array.length
                
            },
            
            // 计算数学，匹配搜索
        filter_arry: function () {
            var data_array = this.data,
            searchString = this.searchString;
 
            if(!searchString){
              data_array = data_array.slice((this.page_num-1)*this.page_size_count,(this.page_num)*this.page_size_count)
              return data_array
            }
 
            searchString = searchString.trim().toLowerCase();
            var page_num_a = this.page_num
            var page_size_count_a = this.page_size_count
            data_array = data_array.filter(function(item){
                if(item.name.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })
            
            // data_array = data_array.filter(function(item){
            //     item.filter(function(list_arg){
            //         //采用标记法
            //         var mark = false
            //         if(list_arg.toLowerCase().indexOf(searchString) !== -1){
            //             mark = true
            //         }
            //         if(mark != false){
            //           return item
            //         }
            //     })
                
            // })
            // 返回过来后的数组
            // 当数组的数据不够一页的时候
            if(data_array.length/this.page_size_count < 1){
              return data_array;
            }
            else{
              data_array = data_array.slice((this.page_num-1)*this.page_size_count,(this.page_num)*this.page_size_count)
              return data_array
            }
        }
        }
        
  }
</script>