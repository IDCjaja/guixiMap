<template>
  <div class="filter-body">
    <div class="filter-select">
      <span class="filter-select-title">颜色</span>
      <el-select v-model="tag" multiple placeholder="请选择">
        
      </el-select>
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
      tag: ''
    }
  },
  props: {
    tagList: Array
  }
}
</script>

<style>

</style>
