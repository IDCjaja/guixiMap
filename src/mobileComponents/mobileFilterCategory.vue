<template>
  <div class="filter-body">
    <div class="filter-select">
      <span class="filter-select-title">分类</span>
      <el-input v-model="selectCategoryList" placeholder="请选择" suffix-icon="el-icon-arrow-right" @focus="toSelect"></el-input>
    </div>
    <div class="filter-list-wrapper">
      <ul>
        <li
          v-for="item in categoryList"
          :key="item.value">
          <span class="filter-category-icon">
            <svg height="20px" width="20px"><use :xlink:href="'#chooseIcon'+item.categoryId" fill="rgb(204, 204, 204)" stroke="rgb(204, 204, 204)" class="use-style"></use></svg>
          </span>
          <span class="filter-tag-title">{{ item.name }}</span>
          <span>{{ item.number }}个</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobileFilterCategory',
  data() {
    return {
      category: '',
      selectCategoryListArr: Array,
      selectTagListArr: Array,
      selectCategoryList: ''
    }
  },
  props: {
    categoryList: Array,
  },
  mounted() {
    if(!this.$router.currentRoute.params.checkedCategories || !this.$router.currentRoute.params.checkedTag){
      this.$router.currentRoute.params.checkedCategories = [];
      this.$router.currentRoute.params.checkedTag = []
    }else {
      this.selectCategoryList = this.$router.currentRoute.params.checkedCategories.join(',');
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
