<template>
  <div class="filter-body">
    <div class="filter-select">
      <span class="filter-select-title">分类</span>
      <el-select v-model="category" multiple placeholder="请选择">
        <el-option
          v-for="(item,index) in existedCategories"
          :key="index"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </div>
    <div class="filter-list-wrapper">
      <ul>
        <li
          v-for="item in existedCategories"
          :key="item.id">
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
  data() {
    return {
      category: ''
    }
  },
  props: {
    existedCategories: Array
  }
}
</script>

<style>

</style>
