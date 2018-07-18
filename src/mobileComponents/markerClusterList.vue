<template>
  <ul class="marker-list">
    <li class="item"
      v-for="(item,index) in markerClusterList"
      :key="index"
      @click="toInformation(item.id)">
      <span>{{item.name}}</span>
      <i class="el-icon-arrow-right"></i>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'markerClusterList',
  props: {
    markerClusterList: Array
  },
  methods: {
    toInformation(id) {
      var currentMarker;
      this.markerClusterList.forEach(marker => {
        if(marker.id === id){
          currentMarker = marker
        }
      });
      this.$router.push({
        name: 'mobileInformation',
        params: {
          currentMarker: currentMarker
        }
      })
    },
  }
}
</script>

<style>

</style>
