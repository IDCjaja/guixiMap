<template>
  <div class="icon-edit-wrapper">
    <div v-if="!editCategoryShow">
      <div class="icon-title">
        <span>分类</span>
        <i class="icon-circle-plus" v-on:click="addCategoryOpen">+</i>
      </div>
      <div class="existed-icon-wrapper">
        <label class="radio-button" v-for="existedCategory in existedCategories" :key="existedCategory.id">
          <input type="radio"
            class="radio-button_orig-readio"
            v-model="currentMarkerCategoryId"
            :value="existedCategory.id"
            :name="'category_select_edit'+radioName"
            @click="changeCategory(existedCategory.categoryId)">
          <div class="existed-icon-list radio-button_inner">
            <svg class="radio-button_inner" height="16px" width="16px">
              <use :xlink:href="'#icon'+existedCategory.iconId" fill="#a2a2a2" stroke="#a2a2a2"></use>
            </svg>
            <span>{{ existedCategory.name }}</span>
            <i class="el-icon-edit" v-on:click="editCategoryOpen(existedCategory.name,existedCategory.id)"></i>
            <i class="el-icon-delete" v-on:click="categoryMessageBoxOpen(existedCategory.id)"></i>
          </div>
        </label>
      </div>
    </div>
    <div v-if="editCategoryShow">
      <div class="icon-title">
        <span>分类</span>
      </div>
      <div class="edit-icon-content">
        <el-input placeholder="请输入内容" v-model="newCategoryName" @change="getNewCategoryName"></el-input>
        <div class="edit-icon-list">
          <div class="svg-box">
            <label class="radio-button" v-for="(item,index) in chooseCategories" :key="index">
              <input type="radio"
                class="radio-button_orig-readio"
                @click="chooseCategory(item.id,index)"
                name="category_select" />
              <svg class="radio-button_inner" height="16px" width="16px">
                <use v-if="strokeSvgShow[index]" :xlink:href="'#icon'+item.id" fill="#a2a2a2" stroke="#a2a2a2"></use>
                <use v-if="!strokeSvgShow[index]" :xlink:href="'#icon'+item.id" fill="#f07235" stroke="#f07235"></use>
              </svg>
            </label>
          </div>
        </div>
        <div class="submit-btn-group">
          <el-button v-on:click="editCategoryHidden">取消</el-button>
          <el-button class="orangeBtn" @click="addCategory">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editCategoryShow: false,
      strokeSvgShow: [true,true,true,true,true,true],
      newCategoryName: '',
      selectedCategoryId: Number,
      categoryChoosedId: Number,
      editCategoryId: Number
    }
  },
  props: {
    existedCategories: Array,
    chooseCategories: Array,
    currentMarkerCategoryId: Number,
    radioName: Number
  },
  methods: {
    editCategoryOpen(name,id) {
      this.strokeSvgShow = [true,true,true,true,true,true];
      this.$set(this.strokeSvgShow, id-1, false)
      this.flag = 'edit';
      this.newCategoryName = name;
      this.editCategoryShow = true;
      this.editCategoryId = id;
      this.categoryChoosedId = id
    },
    addCategoryOpen() {
      this.newTagName = '';
      this.flag = 'add';
      this.editCategoryShow = true
    },
    chooseCategory(id,index) {
      this.categoryChoosedId = id;
      this.strokeSvgShow = [true,true,true,true,true,true];
      this.$set(this.strokeSvgShow, index, false)
    },
    getNewCategoryName(event) {
      this.newCategoryName = event
    },
    addCategory() {
      if(this.newCategoryName !== ""){
        if(this.flag == 'add'){
        this.chooseCategories.forEach( category => {
          if(category.id == this.categoryChoosedId){
            this.existedCategories.push({
              name: this.newCategoryName,
              iconId: this.categoryChoosedId,
              number: '2'
            })
          }
        });
      } else {
        this.existedCategories.forEach(editCategory => {
          if(this.editCategoryId == editCategory.id){
            editCategory.iconId = this.categoryChoosedId,
            editCategory.name = this.newTagName
          }
        })
      }
      this.editCategoryShow = false
      this.categoryChoosedId = -1
      this.$emit('toggleInitMap')
      } else {
        this.$message({
          type: 'info',
          message: '输入不能为空'
        })
      }
    },
    editCategoryHidden() {
      this.editCategoryShow = false
    },
    categoryMessageBoxOpen(id) {
      this.$alert('<div class="message-box"><h4>您确定要删除这个分类?</h4><ol><li>删除分类后，该分类不在列表中显示</li><li>将从所有地点移除此分类，并清除其历史记录，请谨慎对待!</li></ol></div>','删除',{
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确认删除'
      }).then(() => {
        this.existedCategories.forEach((deleteCategory,index) =>{
          if(deleteCategory.id == id){
            this.existedCategories.splice(index,1)
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changeCategory(id) {
      console.log("POST success")
      // 提交选择的category的id，更改marker的category
      this.currentMarkerCategoryId = id;
      this.$emit('toggleInitMap')// 触发父组件方法
    }
  }
}
</script>

<style>

</style>
