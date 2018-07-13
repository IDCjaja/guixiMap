<template>
  <div class="color-wrapper">
    <div v-if="!addColor">
      <div class="color-title">
        <span>颜色</span>
        <i class="icon-circle-plus" v-on:click="addColorOpen()">+</i>
      </div>
      <div class="color-list">
        <ul>
        <li v-for="(tag,index) in existedTag" :key="index" v-on:mouseenter="toggleOpenEdit(index)" v-on:mouseleave="toggleCloseEdit(index)">
          <div class="color-bar" v-if="!editTagShow[index]">
            <label class="radio-button">
              <input type="radio" class="radio-button_orig-readio"
                :value="tag.id"
                v-on:click="changeTag(tag.id)"
                v-model="selectTagId"
                name="tag_select" />
              <span class="color-bar-item radio-button_inner" :class="{active:toggleShow[index]}" :style="{ backgroundColor: tag.color }">{{tag.name}}<i class="el-icon-check"></i></span>
            </label>
            <span class="edit-operate" :class="{show:toggleShow[index]}">
              <i class="el-icon-edit" v-on:click="editColorOpen('edit',tag.id,tag.name)"></i>
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
      </div>
      <div class="color-list">
        <el-input placeholder="" v-model="newTagName" @change="getNewTagName"></el-input>
        <div class="radio-group">
          <label class="radio-button" v-for="(item,index) in chooseTags" :key="index">
            <input type="radio" class="radio-button_orig-readio"
            v-on:click="colorRepeatConfirm(item.id)"
            :value="item.id"
            v-model="tagChoosedId"
            name="tag_select_edit" />
            <span class="radio-button_inner" :style="{backgroundColor: item.color}">
              <i class="el-icon-check"></i>
            </span>
          </label>
        </div>
        <span v-if="tagRepeatTip" class="tag-repeat-tip">该颜色已存在，确定后会替换之前的颜色</span>
        <div class="submit-btn-group">
          <el-button v-on:click="addColorHidden">取消</el-button>
          <el-button class="orangeBtn" v-on:click="addTag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var self = this;
    return {
      editTagShow: [false,false,false,false],
      toggleShow: [false,false,false,false],
      addColor: false,
      tagRepeatTip: false,
      tagChoosedId: Number,
      editTagId: Number,
      colorValue: [],
      selectTagId: Number,
      newTagName: '',
      flag: 'add'
    }
  },
  props: {
    existedTag: Array,
    chooseTags: Array,
    currentMarkerId: Number,
  },
  mounted() {
    this.existedTag.forEach(item => {
      this.colorValue.push(item.color)
      if(item.id == this.currentMarkerId){
        this.selectTagId = item.tagId
      }
    })
  },
  methods: {
    toggleOpenEdit(index) {
      this.$set(this.toggleShow, index, true)
    },
    toggleCloseEdit(index) {
      this.$set(this.toggleShow, index, false)
    },
    addColorOpen() {
      this.newTagName = '';
      this.flag = 'add';
      this.addColor = true;
      this.tagRepeatTip = false;
    },
    editColorOpen(flag,tagId,name) {
      this.flag = 'edit';
      this.newTagName = name;
      this.addColor = true;
      this.editTagId = tagId;
      this.tagChoosedId = tagId;
      this.tagRepeatTip = false;
    },
    addColorHidden() {
      this.tagChoosedId = -1;
      this.addColor = false
    },
    getNewTagName(event) {
      this.newTagName = event
    },
    addTag() {
      if(this.newTagName !== ""){
        if(this.flag == 'add'){
          this.chooseTags.forEach( tag => {
            if(tag.id == this.tagChoosedId){
              if(this.colorValue.indexOf(tag.color) === -1){
                this.existedTag.push({
                  id: this.tagChoosedId,
                  name: this.newTagName,
                  color: tag.color,
                  number: '2'
                })
              } else {
                this.existedTag.forEach(editTag => {
                  if(editTag.color == tag.color){
                    editTag.id = this.tagChoosedId;
                    editTag.name = this.newTagName;
                    editTag.color = tag.color
                  }
                })
              }
            }
          });
        } else {
          var existed;
          var editTagColor;
          this.chooseTags.forEach(tag => {
            if(tag.id == this.tagChoosedId){
              var choosedColor = tag.color;
              if(this.colorValue.indexOf(choosedColor) === -1){
                this.existedTag.forEach(editTag => {
                  if(editTag.id == this.editTagId){
                    editTag.id = this.tagChoosedId;
                    editTag.name = this.newTagName;
                    editTag.color = choosedColor
                  }
                })
              } else {
                this.existedTag.forEach(editTag => {
                  if(editTag.color == choosedColor) {
                    editTag.id = this.tagChoosedId;
                    editTag.name = this.newTagName;
                    editTag.color = choosedColor
                  }
                })
              }
            }
          })
        }
        this.addColor = false;
        this.tagRepeatTip = false;
        this.tagChoosedId = -1;
        this.$emit('toggleInitMap');
        this.existedTag.forEach(item => {
          this.colorValue.push(item.color)
        })
      } else {
        this.$message({
          type: 'info',
          message: '输入不能为空'
        })
      }
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
        this.existedTag.forEach((deleteTag,index) => {
          if(deleteTag.id == id){
            this.existedTag.splice(index,1)
          }
          this.colorValue.push(deleteTag.color)
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
    changeTag(id) {
      // 提交选择的tag的id，更改marker的tag
      this.$emit('changeCurrentMarker',this.selectTagId)// 触发父组件方法
    },
    colorRepeatConfirm(id) {
      this.chooseTags.forEach( tag => {
        if(tag.id == id){
          if(this.colorValue.indexOf(tag.color) === -1){
            this.tagRepeatTip = false;
          } else {
            this.tagRepeatTip = true;
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
