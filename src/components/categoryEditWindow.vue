<template>
  <div class="icon-edit-wrapper">
    <div v-if="!editCategoryShow">
      <div class="icon-title">
        <span>分类</span>
        <i class="el-icon-circle-plus-outline" v-on:click="editCategoryOpen"></i>
      </div>
      <div class="existed-icon-wrapper">
        <label class="radio-button" v-for="existedIcon in existedCategories" :key="existedIcon.id">
          <input type="radio" class="radio-button_orig-readio" name="category_select_edit">
          <div class="existed-icon-list radio-button_inner">
            <img :src="existedIcon.iconUrl">
            <span>{{ existedIcon.iconText }}</span>
            <i class="el-icon-edit" v-on:click="editCategoryOpen(key)"></i>
            <i class="el-icon-delete" v-on:click="categoryMessageBoxOpen"></i>
          </div>
        </label>
      </div>
    </div>
    <div v-if="editCategoryShow">
      <div class="icon-title">
        <span>分类</span>
        <span>
          <i class="el-icon-circle-plus-outline active"></i>
          <i class="el-icon-arrow-down" v-on:click="editCategoryHidden"></i>
        </span>
      </div>
      <div class="edit-icon-content">
        <el-input placeholder="请输入内容"></el-input>
        <div class="edit-icon-list">
          <div class="svg-box">
            <label class="radio-button">
              <input type="radio" class="radio-button_orig-readio" name="category_select" />
              <svg class="radio-button_inner" height="20px" width="20px">
                <use xlink:href="#chooseIcon1" fill="#73B724" stroke="#73B724"></use>
              </svg>
            </label>
            <label class="radio-button">
              <input type="radio" class="radio-button_orig-readio" name="category_select" />
              <svg class="radio-button_inner" height="20px" width="20px">
                <use xlink:href="#chooseIcon2" fill="#73B724" stroke="#73B724"></use>
              </svg>
            </label>
            <label class="radio-button">
              <input type="radio" class="radio-button_orig-readio" name="category_select" />
              <svg class="radio-button_inner" height="20px" width="20px">
                <use xlink:href="#chooseIcon3" fill="#73B724" stroke="#73B724"></use>
              </svg>
            </label>
            <label class="radio-button">
              <input type="radio" class="radio-button_orig-readio" name="category_select" />
              <svg class="radio-button_inner" height="20px" width="20px">
                <use xlink:href="#chooseIcon4" fill="#73B724" stroke="#73B724"></use>
              </svg>
            </label>
            <label class="radio-button">
              <input type="radio" class="radio-button_orig-readio" name="category_select" />
              <svg class="radio-button_inner" height="20px" width="20px">
                <use xlink:href="#chooseIcon5" fill="#73B724" stroke="#73B724"></use>
              </svg>
            </label>
          </div>
        </div>
        <div class="submit-btn-group">
          <el-button v-on:click="editCategoryHidden">取消</el-button>
          <el-button class="orange-btn">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editCategoryShow: false
    }
  },
  props: {
    existedCategories: Array
  },
  methods: {
    editCategoryOpen(id) {
      this.editCategoryShow = true
    },
    editCategoryHidden() {
      this.editCategoryShow = false
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

<style>

</style>
