<template>
  <div class="window-edit info">
    <div class="window-edit-footer" v-on:click="openInformation">
      <span>桂溪和平社区</span>
      <img src="http://p1ctmsz1g.bkt.clouddn.com/more.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'infoWindow',
  data () {
    return {
      editTagShow: [false,false,false,false],
      editCategoryShow: false,
      toggleShow: [false,false,false,false],
      addColor: false,
      radio3: 2,
      tagColorList: [
        {name: '默认', color: '#ccc', number: '2',defaultColor:true},
        {name: '不合格', color: 'red', number: '5',defaultColor:false},
        {name: '合格', color: 'green', number: '1',defaultColor:false},
        {name: '待整改', color: 'yellow', number: '0',defaultColor:false}
      ],
      existedIcons: [
        {id:1,iconUrl: 'http://p1ctmsz1g.bkt.clouddn.com/10.png',iconText:'默认图标'},
        {id:2,iconUrl: 'http://p1ctmsz1g.bkt.clouddn.com/anquanjiancha.png',iconText:'政府'},
      ],
      choosedIcons: [
        {id:3,iconText:'默认图标'},
        {id:4,iconText:'政府'},
      ],
      tags:[
        {id:1,color:'#808080',name:''},
        {id:2,color:'#ff8c00',name:''},
        {id:3,color:'#ff0000',name:''},
        {id:4,color:'#228B22',name:''},
        {id:5,color:'#222222',name:''},
        {id:6,color:'#FF7F50',name:''},
        {id:7,color:'#A52A2A',name:''},
        {id:8,color:'#00BFFF',name:''}
      ],
      
    }
  },
  methods: {
    
    toggleOpenEdit(index) {
      if(index != 0){
        this.$set(this.toggleShow, index, true)
      }
    },
    toggleCloseEdit(index) {
      this.$set(this.toggleShow, index, false)
    },
    editTag(index) {
      this.$set(this.editTagShow, index, true)
    },
    editTagSave(index) {
      this.$set(this.editTagShow, index, false)
    },
    editCategoryOpen(id) {
      this.editCategoryShow = true
    },
    editCategoryHidden() {
      this.editCategoryShow = false
    },
    addColorOpen() {
      this.addColor = true
    },
    addColorHidden() {
      this.addColor = false
    },
    tagMessageBoxOpen() {
      this.$alert('<div><h4>您确定要删除这个颜色?</h4><ol><li>您将无法撤销</li><li>将从所有地点移除此颜色，并清除其历史记录，请谨慎对待!</li></ol></div>','删除',{
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确认删除'
      })
    },
    categoryMessageBoxOpen() {
      this.$alert('<div class="message-box"><h4>您确定要删除这个分类?</h4><ol><li>删除分类后，该分类不在列表中显示</li><li>将从所有地点移除此分类，并清除其历史记录，请谨慎对待!</li></ol></div>','删除',{
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确认删除'
      })
    }
  }
}
</script>
