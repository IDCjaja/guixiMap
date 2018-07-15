<template>
  <div class="mobile-map">
    <router-view></router-view>
    <el-amap
      vid="amapDemo"
      :amap-manager="amapManager"
      :zoom="zoom"
      :center="center"
      :events="events"
      class="map amap-demo"
      >
      <!-- <el-amap-marker v-for="(marker, index) in markers" ref="marker" :key="marker.index" :position="marker.position" :events="marker.events" :visible="marker.visible" :content="marker.content" :vid="index"></el-amap-marker> -->
    </el-amap>
    <div class="mobile-search-content">
      <el-input class="mobile-search-input"
      placeholder="搜索"
      prefix-icon="el-icon-search"
      @focus="toSearch"></el-input>
    </div>
    <div class="mobile-filter-content" :class="{filterCollapse: filterCollapse}">
      <div class="filter-icon-collapse" :class="{display: !filterCollapse, hidden: filterCollapse}" v-on:click="filterOpen">
        <img src="http://p1ctmsz1g.bkt.clouddn.com/mobileFilter.jpg" />
      </div>
      <div class="mobile-filter-detail" :class="{display: filterCollapse, hidden: !filterCollapse}">
        <mobile-filter-category :category-list="categoryList"></mobile-filter-category>
        <mobile-filter-tag :tag-list="tagList" :select-tag-list="selectTagList"></mobile-filter-tag>
        <div class="mobile-footer">
          <span>共计8个</span>
        </div>
      </div>
    </div>
    <message-footer
      v-if="messageFooterShow"
      v-on:get-from-message-footer="toInformation"
      :current-marker="currentMarker"
      :marker-clusterer-show="markerClustererShow">
    </message-footer>
    <marker-cluster-list></marker-cluster-list>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
import Vue from 'vue'
import mobileFilterCategory from '../mobileComponents/mobileFilterCategory'
import mobileFilterTag from '../mobileComponents/mobileFilterTag'
import messageFooter from '../mobileComponents/messageFooter'
import markerClusterList from '../mobileComponents/markerClusterList'

let amapManager = new AMapManager();

export default {
  name: 'adminMobile',
  components: {
    mobileFilterCategory,
    mobileFilterTag,
    messageFooter,
    markerClusterList
  },
  data() {
    let self = this;
    return {
      amapManager,
      zoom:14,
      center: [104.109191,30.671637],
      filterCollapse: false,
      messageFooterShow: false,
      markerClustererShow: false,
      selectCategoryList: '',
      selectTagList: '',
      currentMarker: [],
      markerClusterList: [],
      events: {
        click() {
          self.filterCollapse = false
        }
      },
      markerList: [
        {
          id: 1,
          longitude: 104.106946,
          latitude: 30.674249,
          title: '',
          tagId: 1
        },
        {
          id: 2,
          longitude: 104.109191,
          latitude: 30.671637,
          title: '伊藤洋华堂(建设路店)',
          tagId: 2,
          address: '二环路东二段426号阳光新生活广场'
        },
        {
          id: 3,
          longitude: 114.396345,
          latitude: 30.9454,
          title: '成都',
          tagId: 3
        },
        {
          id: 4,
          longitude: 104.101876,
          latitude: 30.668877,
          title: '第五大道',
          tagId: 4,
          address: '建设路26号'
        },
        {
          id: 5,
          longitude: 121.5273285,
          latitude: 31.21515044,
          title: '上海',
          tagId: 4
        },
        {
          id: 6,
          longitude: 104.108444,
          latitude: 30.670595,
          title: '建设路东站(公交站)',
          tagId: 2,
          address: '6路;14路;42路;71路;72路;社区巴士1010路'
        },
        {
          id: 7,
          longitude: 104.104973,
          latitude: 30.670078,
          title: '万科·钻石广场',
          tagId: 3,
          address: '建设路10号'
        },
        {
          id: 8,
          longitude: 104.104147,
          latitude: 30.669054,
          title: '高地中心',
          tagId: 2,
          address: '建设路9号'
        },
        {
          id: 9,
          longitude: 104.075275,
          latitude: 30.601965,
          title: '成都高新技术产业开发区桂溪街道办事处',
          tagId: 4,
          address: '天仁路176号'
        },
        {
          id: 10,
          longitude: 104.077467,
          latitude: 30.618422,
          title: '桂溪加油站(科华中路)',
          tagId: 1,
          address: '科华中路63号'
        }
      ],
      categories: [
        {id:1,name:'全部',value: '全部',tagId:2,iconId: 1,defaultCategory: true},
        {id:2,name:'企业',value: '企业',tagId:3,iconId: 2,defaultCategory: false},
        {id:3,name:'个人',value: '个人',tagId:2,iconId: 3,defaultCategory: false},
        {id:4,name:'法人',value: '法人',tagId:4,iconId: 4,defaultCategory: false}
      ],
      tags:[
        {id:1,color:'#a0a0a0',name:'',value: '全部', label: '全部'},
        {id:2,color:'#feb902',name:'',value: '黄色', label: '黄色'},
        {id:3,color:'#f52b1f',name:'',value: '红色', label: '红色'},
        {id:4,color:'#73b724',name:'',value: '绿色', label: '绿色'},
      ],
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
  mounted() {
    if(!this.$router.currentRoute.params.currentMarker){
      this.$router.currentRoute.params.currentMarker = []
    } else {
      this.currentMarker = this.$router.currentRoute.params.currentMarker
    }
    if(this.$router.currentRoute.params.filterCollapse == true){
      this.filterCollapse = true
    }
    if(this.$router.currentRoute.params.messageFooterShow == true){
      this.messageFooterShow = true
    }
    if(this.$router.currentRoute.params.centerLongitude && this.$router.currentRoute.params.centerLatitude){
      this.center = [
        this.$router.currentRoute.params.centerLongitude,
        this.$router.currentRoute.params.centerLatitude
      ]
      this.zoom = 18
    }
    window.setTimeout(this.creatMap, 2000);
    //this.creatMap();
  },
  methods: {
    creatMap() {
      var self = this;
      let mapObj = amapManager._map;
      var markers = [];
      this.markerList.forEach((item,index) => {
        var category;
        var tag;
        this.categories.forEach(categoryItem => {
          if(categoryItem.id == item.tagId){
            category = categoryItem;
            return category;
          }
        })
        this.tags.forEach(tagItem => {
          if(category.tagId == tagItem.id){
            tag = tagItem;
            return tag;
          }
        })
        var marker = new AMap.Marker({
          extData: item.id,
          map: mapObj,
          position: [item.longitude, item.latitude],
          offset:  new AMap.Pixel(-10,-24),
          zIndex: item.zIndex,
          content:'<div>'+
                    '<svg height="30px" width="30px"><use xlink:href="#chooseIcon'+category.iconId+'" fill="'+tag.color+'" stroke="'+tag.color+'" class="use-style"></use></svg>'+
                  '</div>'
        })
        marker.on('click', function() {
          self.markerClustererShow = false;
          self.markerList.forEach(currentItem => {
            if(currentItem.id == item.id){
              self.currentMarker = currentItem;
              self.messageFooterShow = true
            }
          })
        })
        markers.push(marker);
      })
      var cluster = new AMap.MarkerClusterer(mapObj,markers,{
        gridSize:15,
        zoomOnClick: false
      });
      cluster.on('click',(target)=>{
        this.markerClustererShow = true;
        this.markerClusterList = [];
        target.markers.map((markerItem,index) => {
          this.markerList.forEach(item => {
            if(markerItem.getExtData() == item.id){
              this.markerClusterList.push(item)
            }
          })
        })
        self.currentMarker = this.markerClusterList[0];
        self.messageFooterShow = true
      })
    },
    filterOpen() {
      this.filterCollapse = true;
    },
    toSearch() {
      this.$router.push({
        name: 'search',
        path: '/mobile/search'
      })
    },
    toInformation() {
      this.$router.push({
        name: 'mobileInformation',
        params: {
          currentMarker: this.currentMarker
        }
      })
    }
  }
}
</script>

<style>

</style>
