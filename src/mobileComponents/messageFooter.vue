<template>
  <div class="message-footer" @click="tellMessageFooter">
    <div class="message-content">
      <div class="title">{{ currentMarker.title }}</div>
      <div class="address">{{ currentMarker.address }}</div>
    </div>
    <div class="message-more">
      <span class="el-icon-arrow-right"></span>
      <a v-if="markerClustererShow">更多</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nameFooter',
  props: {
    currentMarker: Object,
    markerClustererShow: Boolean
  },
  methods: {
    tellMessageFooter() {
      this.$emit('get-from-message-footer')
    }
  }
}
</script>

<style>

</style>
