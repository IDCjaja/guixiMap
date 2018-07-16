<template>
  <div class="message-footer">
    <div class="message-content" @click="tellMessageFooter">
      <div class="title">{{ currentMarker.title }}</div>
      <div class="address">{{ currentMarker.address }}</div>
    </div>
    <div class="message-more">
      <span class="el-icon-arrow-right" @click="tellMessageFooter"></span>
      <a v-if="markerClustererShow" @click="clustererOpen">更多</a>
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
    },
    clustererOpen() {
      this.$emit('listen-clusterer-open')
    }
  }
}
</script>

<style>

</style>
