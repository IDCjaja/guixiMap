<template>
  <div class="mobile-map">
    <el-amap 
      :zoom="zoom"
      :center="center"
      :events="events"
      class="map"
      >
    </el-amap>
    <div class="mobile-search-content">
      <el-input class="mobile-search-input" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
    </div>
    <div class="mobile-filter-content" :class="{filterCollapse: filterCollapse}">
      <div class="filter-icon-collapse" :class="{display: !filterCollapse, hidden: filterCollapse}" v-on:click="filterOpen">
        <span class="el-icon-setting"></span>
      </div>
      <div class="mobile-filter-detail" :class="{display: filterCollapse, hidden: !filterCollapse}">
        <mobile-filter-category :category-list="categoryList"></mobile-filter-category>
        <mobile-filter-tag :tag-list="tagList"></mobile-filter-tag>
      </div>
    </div>
    <message-footer></message-footer>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
import Vue from 'vue'
import mobileFilterCategory from '../mobileComponents/mobileFilterCategory'
import mobileFilterTag from '../mobileComponents/mobileFilterTag'
import messageFooter from '../mobileComponents/messageFooter'

export default {
  name: 'adminMobile',
  components: {
    mobileFilterCategory,
    mobileFilterTag,
    messageFooter
  },
  data() {
    let self = this;
    return {
      zoom: 15,
      center: [104.109191,30.671637],
      filterCollapse: false,
      events: {
        click() {
          self.filterCollapse = false
        }
      },
      categoryList: [
        {id:1,name: '全部', number: '2',categoryId:1},
        {id:2,name: '企业', number:'1',categoryId:2},
        {id:3,name: '个人', number: '1',tagId:2,categoryId:3},
        {id:4,name: '法人', number: '0',tagId:3,categoryId:4}
      ],
      tagList: [
        {id:1,name: '等待检查', color: '#a0a0a0', number: '2',defaultColor: true},
        {id:2,name: '不合格', color: '#f52b1f', number: '5',defaultColor: false},
        {id:3,name: '合格', color: '#73b724', number: '1',defaultColor: false},
        {id:4,name: '待整改', color: '#feb902', number: '0',defaultColor: false}
      ]
    }
  },
  methods: {
    filterOpen() {
      this.filterCollapse = true;
    }
  }
}
</script>

<style>

</style>
