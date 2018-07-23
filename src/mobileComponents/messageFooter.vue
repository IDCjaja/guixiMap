<template>
  <div class="message-footer">
    <div v-if="markerClustererShow" class="message-toggle">
      <span>更多信息</span>
      <a @click="clustererOpen">展开</a>
    </div>
    <div class="message-body">
      <div class="message-content" @click="tellMessageFooter">
        <div class="title">{{ currentMarker.name }}</div>
        <div class="address">{{ currentMarker.address }}</div>
      </div>
      <div class="message-more">
        <span class="el-icon-arrow-right" @click="tellMessageFooter"></span>
      </div>
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
      this.$emit('get-from-message-footer',this.currentMarker.id)
    },
    clustererOpen() {
      this.$emit('listen-clusterer-open')
    }
  }
}
</script>

<style>

</style>
