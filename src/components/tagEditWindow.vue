<template>
  <div class="color-wrapper">
    <div v-if="!addColor">
      <div class="color-title">
        <span>颜色</span>
        <span>
          <i class="el-icon-circle-plus-outline" v-on:click="addColorOpen()"></i>
        </span>
      </div>
      <div class="color-list">
        <ul>
        <li v-for="(tag,index) in tagList" :key="index" v-on:mouseenter="toggleOpenEdit(index)" v-on:mouseleave="toggleCloseEdit(index)">
          <div class="color-bar" v-if="!editTagShow[index]">
            <label class="radio-button">
              <input type="radio" class="radio-button_orig-readio" v-on:click="changeTag(tag.id)" name="tag_select" />
              <span class="color-bar-item radio-button_inner" :class="{active:toggleShow[index]}" :style="{ backgroundColor: tag.color }">{{tag.name}}<i class="el-icon-check"></i></span>
            </label>
            <span class="edit-operate" :class="{show:toggleShow[index]}">
              <i class="el-icon-edit" v-on:click="editColorOpen(tag.id)"></i>
              <i class="el-icon-delete" v-on:click="tagMessageBoxOpen(tag.id)"></i>
            </span>
          </div>
        </li>
        </ul>
      </div>
    </div>
    <div v-if="addColor">
      <div class="color-title">
        <span>颜色</span>
        <span>
          <i class="el-icon-circle-plus-outline active"></i>
          <i class="el-icon-arrow-down" v-on:click="addColorHidden"></i>
        </span>
      </div>
      <div class="color-list">
        <el-input placeholder=""></el-input>
        <div class="radio-group">
          <label class="radio-button" v-for="(item,index) in chooseTags" :key="index">
            <input type="radio" class="radio-button_orig-readio" v-on:click="test(item.id)" :value="item.id" v-model="tagChoosed" name="tag_select_edit" />
            <span class="radio-button_inner" :style="{backgroundColor: item.color}">
              <i class="el-icon-check"></i>
            </span>
          </label>
        </div>
        <div class="submit-btn-group">
          <el-button v-on:click="addColorHidden">取消</el-button>
          <el-button class="orange-btn" v-on:click="addColorHidden">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editTagShow: [false,false,false,false],
      toggleShow: [false,false,false,false],
      addColor: false,
      tagChoosed: 1
    }
  },
  props: {
    tagList: Array,
    chooseTags: Array
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
    addColorOpen() {
      this.addColor = true
    },
    editColorOpen(tagId) {
      this.addColor = true;
      this.tagChoosed = tagId
    },
    addColorHidden() {
      this.addColor = false
      alert(this.tagChoosed)
    },
    editTag(index) {
      this.$set(this.editTagShow, index, true)
    },
    editTagSave(index) {
      this.$set(this.editTagShow, index, false)
    },
    tagMessageBoxOpen(id) {
      this.$confirm('<div><h4>您确定要删除这个颜色?</h4><ol><li>您将无法撤销</li><li>将从所有地点移除此颜色，并清除其历史记录，请谨慎对待!</li></ol></div>','删除',{
        dangerouslyUseHTMLString: true,
        showCancelButton: false,
        confirmButtonText: '确认删除'
      }).then(() => {
        alert(id)
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
    changeTag(flag,tagId) {
      alert('flag'+flag,'tagId' + tagId)
    },
    test(id){
      alert(id)
    }
  }
}
</script>

<style>

</style>
