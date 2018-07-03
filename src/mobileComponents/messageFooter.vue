<template>
  <div class="message-footer" @click="tellMessageFooter">
    <div class="message-content">
      <div class="title">{{ currentMarker.title }}</div>
      <div class="address">{{ currentMarker.address }}</div>
    </div>
    <div class="message-more">
      <span class="el-icon-arrow-right"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nameFooter',
  props: {
    currentMarker: Object
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
