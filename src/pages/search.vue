<template>
  <div class="search-container">
    <div class="search-navbar">
      <span class="back el-icon-arrow-left" @click="back"></span>
      <el-input
        clearable
        @change="getResult"
        :value="searchInputValue"
        placeholder="搜索"
        prefix-icon="el-icon-search">
      </el-input>
      <el-button v-if="btnShow">搜索</el-button>
    </div>
    <div class="result-content">
      <div class="result-list" v-if="resultShow">
        <div class="result-item" v-for="(item,index) in searchResultList" :key="index" v-on:click="changeCenter(item.longitude,item.latitude)">
          <span class="el-icon-search"></span>
          <div class="item-content">
            <label>{{ item.name }}<small>{{ item.address }}</small></label>
            <img src="http://p1ctmsz1g.bkt.clouddn.com/sign.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobileSearch',
  data() {
    return {
      btnShow: false,
      resultShow: false,
      searchResultList: [
        {id:1,name: '桂溪加油站', address:'dhfkjsdfsdfklsdjf.',longitude: 104.106946,latitude: 30.674249,},
        {id:2,name: '桂溪加油站', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.',longitude: 104.109191,latitude: 30.671637,},
        {id:3,name: '桂溪加油站', address:'dhfkjsdfsdfklsdjf.',longitude: 114.396345,latitude: 30.9454,},
        {id:4,name: '桂溪加油站', address:'dhfkjsdfsdfklsdjf.',longitude: 104.101876,latitude: 30.668877,},
        {id:5,name: '桂溪加油站', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.',longitude: 121.5273285,latitude: 31.21515044,},
        {id:6,name: '桂溪加油站', address:'dhfkjsdfsdfklsdjf.',longitude: 104.108444,latitude: 30.670595,},
        {id:7,name: '桂溪加油站', address:'dhfkjsdfsdfklsdjf.',longitude: 104.104973,latitude: 30.670078,},
        {id:8,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.',longitude: 104.077467,latitude: 30.618422,},
        {id:9,name: '法人', address:'dhfkjsdfsdfklsdjf.'},
        {id:10,name: '桂溪加油站', address:'dhfkjsdfsdfklsdjf.'},
        {id:11,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.'},
        {id:12,name: '桂溪加油站', address:'dhfkjsdfsdfklsdjf.'},
        {id:1,name: '企业', address:'dhfkjsdfsdfklsdjf.'},
        {id:2,name: '桂溪加油站', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.'},
        {id:3,name: '法人', address:'dhfkjsdfsdfklsdjf.'},
        {id:1,name: '企业', address:'dhfkjsdfsdfklsdjf.'},
        {id:2,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.'},
        {id:3,name: '法人', address:'dhfkjsdfsdfklsdjf.'},
        {id:1,name: '企业', address:'dhfkjsdfsdfklsdjf.'},
        {id:2,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.'},
        {id:3,name: '法人', address:'dhfkjsdfsdfklsdjf.'}
      ]
    }
  },
  methods: {
    changeCenter(longitude,latitude) {
      this.$router.push({
        name: 'adminMobile',
        params: {
          centerLongitude: longitude,
          centerLatitude: latitude
        }
      })
    },
    back() {
      this.$router.go(-1)
    },
    getResult(event) {
      this.searchInputValue = event;
      if(event !== ""){
        this.resultShow = true;
        this.btnShow = true
        if(this.searchResultList.length) {
          this.searchResult = true
        } else {
          this.searchResult = false
        }
      } else {
        this.btnShow = false
        this.resultShow = false
      }
    },
    keyCode() {
      if(this.searchInputValue !== ""){
        debugger
        this.resultShow = true;
        if(this.searchResultList.length) {
          this.searchResult = true
        } else {
          this.searchResult = false
        }
      } else {
        this.resultShow = false
      }
    },
  }
}
</script>

<style>

</style>
