<template>
  <div class="search-dropdown" v-if="searchDropdownShow">
    <ul v-if="searchResult">
      <li v-for="(item,index) in searchResultList" :key="index" v-on:click="triggerSetCenter(item.id)">
        <i class="el-icon-search"></i>
        <span>{{item.name}}</span>
        <small>{{item.address}}</small>
      </li>
    </ul>
    <div v-if="!searchResult" class="no-result">
      <label><span class="el-icon-search"></span>没有找到想要的结果</label>
    </div>
  </div>
</template>

<script>
export default {
  name:'searchDropdown',
  props: {
    searchDropdownShow: Boolean,
    searchResult: Boolean,
    searchResultList: Array
  },
  methods: {
    triggerSetCenter(id) {
      this.$emit('triggerSetCenter',id)
      alert(id)
    }
  }
}
</script>

<style>

</style>
