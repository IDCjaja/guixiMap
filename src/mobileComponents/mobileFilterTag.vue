<template>
  <div class="filter-body">
    <div class="filter-select">
      <span class="filter-select-title">颜色</span>
      <el-input v-model="selectTagList" placeholder="请选择" suffix-icon="el-icon-arrow-right" @focus="toSelect"></el-input>
    </div>
    <div class="filter-list-wrapper">
      <ul>
        <li
          v-for="item in tagList"
          :key="item.value">
          <span class="filter-color-block" :style="{backgroundColor: item.color}"></span>
          <span class="filter-tag-title">
            <span class="filter-color-badge"></span>
            {{ item.name }}
          </span>
          <span>{{ item.number }}个</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobileFilterTag',
  data() {
    return {
      tag: '',
      selectTagListArr: Array,
      selectCategoryListArr: Array,
      selectTagList: ''
    }
  },
  props: {
    tagList: Array,
  },
  mounted() {
    if(!this.$router.currentRoute.params.checkedCategories || !this.$router.currentRoute.params.checkedTag){
      this.$router.currentRoute.params.checkedCategories = [];
      this.$router.currentRoute.params.checkedTag = []
    } else {
      this.selectTagList = this.$router.currentRoute.params.checkedTag.join(',')
    }
    this.selectCategoryListArr = this.$router.currentRoute.params.checkedCategories;
    this.selectTagListArr = this.$router.currentRoute.params.checkedTag;
  },
  methods: {
    toSelect() {
      this.$router.push({
        name: 'select',
        params: {
          checkedCategories: this.selectCategoryListArr,
          checkedTag:this.selectTagListArr
        }
      })
    }
  }
}
</script>

<style>

</style>
