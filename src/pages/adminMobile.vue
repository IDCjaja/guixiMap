<template>
  <div class="mobile-map">
    <el-amap 
      :zoom="zoom"
      :center="center"
      class="map"
      >
    </el-amap>
    <div class="mobile-search-content">
      <el-input class="mobile-search-input" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
    </div>
    <div class="mobile-filter-content filter-collapse">
      <div class="filter-icon-collapse">
        <span class="el-icon-setting"></span>
      </div>
      <div class="mobile-filter-detail">
        <mobile-filter-category :category-list="categoryList"></mobile-filter-category>
        <mobile-filter-tag></mobile-filter-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
import Vue from 'vue'
import mobileFilterCategory from '../components/mobileFilterCategory'
import mobileFilterTag from '../components/mobileFilterTag'

export default {
  name: 'adminMobile',
  components: {
    mobileFilterCategory,
    mobileFilterTag,
  },
  data() {
    return {
      zoom: 15,
      center: [104.109191,30.671637],
      categoryList: [
        {id:1,name: '全部', number: '2',categoryId:1},
        {id:2,name: '企业', number:'1',categoryId:2},
        {id:3,name: '个人', number: '1',tagId:2,categoryId:3},
        {id:4,name: '法人', number: '0',tagId:3,categoryId:4}
      ]
    }
  }
}
</script>

<style>

</style>
