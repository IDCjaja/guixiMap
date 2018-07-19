<template>
  <div class="mobile-map">
    <router-view></router-view>
    <el-amap
      vid="amapDemo"
      resizeEnable="true"
      :amap-manager="amapManager"
      :zoom="zoom"
      :zooms="zooms"
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
      v-on:listen-clusterer-open="clustererOpen"
      :current-marker="currentMarker"
      :marker-clusterer-show="markerClustererShow">
    </message-footer>
    <marker-cluster-list
      v-if="clustererOpenShow"
      :marker-cluster-list="markerClusterList"
      v-on:get-from-markerlist="closeMarkerList"></marker-cluster-list>
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
      zooms: [14,19],
      center: [104.0723,30.602836],
      filterCollapse: false,
      messageFooterShow: false,
      markerClustererShow: false,
      clustererOpenShow: false,
      selectCategoryList: '',
      selectTagList: '',
      currentMarker: [],
      markerClusterList: [],
      events: {
        click() {
          self.filterCollapse = false
        },
        complete() {
          self.creatMap();
          self.setMapLimit()
        }
      },
      markerList: [
        {
          id: 1,
          longitude: 104.106946,
          latitude: 30.674249,
          name: '华茂广场',
          tagId: 1,
          categoryId: 1,
          address: '二环路东二段华茂广场'
        },
        {
          id: 2,
          longitude: 104.109191,
          latitude: 30.671637,
          name: '伊藤洋华堂(建设路店)',
          tagId: 2,
          categoryId: 3,
          address: '二环路东二段426号阳光新生活广场'
        },
        {
          id: 3,
          longitude: 114.396345,
          latitude: 30.9454,
          name: '成都',
          tagId: 3,
          categoryId: 4,
        },
        {
          id: 4,
          longitude: 104.101876,
          latitude: 30.668877,
          name: '第五大道',
          tagId: 4,
          categoryId: 5,
          address: '建设路26号'
        },
        {
          id: 5,
          longitude: 121.5273285,
          latitude: 31.21515044,
          name: '上海',
          tagId: 4,
          categoryId: 3,
        },
        {
          id: 6,
          longitude: 104.108444,
          latitude: 30.670595,
          name: '建设路东站(公交站)',
          tagId: 2,
          categoryId: 6,
          address: '6路;14路;42路;71路;72路;社区巴士1010路'
        },
        {
          id: 7,
          longitude: 104.104973,
          latitude: 30.670078,
          name: '万科·钻石广场',
          tagId: 3,
          categoryId: 5,
          address: '建设路10号'
        },
        {
          id: 8,
          longitude: 104.104147,
          latitude: 30.669054,
          name: '高地中心',
          tagId: 2,
          categoryId: 1,
          address: '建设路9号'
        },
        {
          id: 9,
          longitude: 104.075275,
          latitude: 30.601965,
          name: '成都高新技术产业开发区桂溪街道办事处',
          tagId: 4,
          categoryId: 4,
          address: '天仁路176号'
        },
        {
          id: 10,
          longitude: 104.077467,
          latitude: 30.618422,
          name: '桂溪加油站(科华中路)',
          tagId: 3,
          categoryId: 4,
          address: '科华中路63号'
        },
        {
          id: 12,
          longitude: 104.062087,
          latitude: 30.599805,
          name: '宜家家居(成都商场店)',
          tagId: 4,
          categoryId: 2,
          address: '四川省成都市武侯区桂溪街道宜家家居(成都商场店)'
        },
        {
          id: 13,
          longitude: 104.06183,
          latitude: 30.601754,
          name: '欧尚(成都高新店)',
          tagId: 3,
          categoryId: 4,
          address: '四川省成都市武侯区桂溪街道欧尚(成都高新店)'
        },
        {
          id: 14,
          longitude: 104.063986,
          latitude: 30.599547,
          name: '迪卡侬',
          tagId: 2,
          categoryId: 2,
          address: '四川省成都市武侯区桂溪街道都会路199号迪卡侬运动场'
        },
        {
          id: 15,
          longitude: 104.060961,
          latitude: 30.601255,
          name: '必胜客',
          tagId: 3,
          categoryId: 3,
          address: '四川省成都市武侯区桂溪街道必胜客(成都高新店)'
        },
        {
          id: 16,
          longitude: 104.060102,
          latitude: 30.601394,
          name: '宜家家居(成都商场店)',
          tagId: 2,
          categoryId: 6,
          address: '四川省成都市武侯区石羊场街道益州大道北段360号英祥·财富领域'
        },
        {
          id: 17,
          longitude: 104.062903,
          latitude: 30.601855,
          name: '凯德广场',
          tagId: 2,
          categoryId: 4,
          address: '四川省成都市武侯区桂溪街道南洋小馆(凯德广场)凯德广场(新南店)'
        },
        {
          id: 18,
          longitude: 104.062087,
          latitude: 30.599805,
          name: '宜家家居(成都商场店)',
          tagId: 4,
          categoryId: 3,
          address: '四川省成都市武侯区桂溪街道宜家家居(成都商场店)'
        },{
          id: 19,
          longitude: 104.05815,
          latitude: 30.599565,
          name: '城市春天',
          tagId: 3,
          categoryId: 2,
          address: '四川省成都市武侯区石羊场街道成都云起茶宿客栈城市春天'
        },
        {
          id: 20,
          longitude: 104.062087,
          latitude: 30.599805,
          name: '四川省城市车辆置业有限责任公司',
          tagId: 2,
          categoryId: 5,
          address: '四川省成都市武侯区石羊场街道火车南站西路865号四川省城市车辆置业有限责任公司'
        }
      ],
      categories: [
        {id:1,name:'全部',value: '全部',iconId: 1,defaultCategory: true},
        {id:2,name:'企业',value: '企业',iconId: 2,defaultCategory: false},
        {id:3,name:'个人',value: '个人',iconId: 3,defaultCategory: false},
        {id:4,name:'法人',value: '法人',iconId: 4,defaultCategory: false},
        {id:5,name:'法人',value: '法人',iconId: 5,defaultCategory: false},
        {id:6,name:'法人',value: '法人',iconId: 6,defaultCategory: false}
      ],
      tags:[
        {id:1,color:'#a0a0a0',name:'',value: '全部', label: '全部'},
        {id:2,color:'#feb902',name:'',value: '黄色', label: '黄色'},
        {id:3,color:'#f52b1f',name:'',value: '红色', label: '红色'},
        {id:4,color:'#73b724',name:'',value: '绿色', label: '绿色'},
      ],
      categoryList: [
        {id:1,name: '全部', number: 2,categoryId:1},
        {id:2,name: '企业', number: 1,categoryId:2},
        {id:3,name: '个人', number: 1,tagId:2,categoryId:3},
        {id:4,name: '法人', number: 0,tagId:3,categoryId:4}
      ],
      tagList: [
        {id:1,name: '等待检查', color: '#a0a0a0', number: 2,defaultColor: true},
        {id:2,name: '不合格', color: '#f52b1f', number: 5,defaultColor: false},
        {id:3,name: '合格', color: '#73b724', number: 1,defaultColor: false},
        {id:4,name: '待整改', color: '#feb902', number: 0,defaultColor: false}
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
  },
  methods: {
    setMapLimit(){
      let mapObj = amapManager._map;
      var southWest = new AMap.LngLat(103.978188,30.533126);
      var northEast = new AMap.LngLat(104.106075,30.625936);
      var bounds = new AMap.Bounds(southWest, northEast);
      mapObj.setLimitBounds(bounds);
    },
    creatMap() {
      var self = this;
      let mapObj = amapManager._map;
      var markers = [];
      this.markerList.forEach((item,index) => {
        var category;
        var tag;
        this.categories.forEach(categoryItem => {
          if(categoryItem.id == item.categoryId){
            category = categoryItem;
            return category;
          }
        })
        this.tags.forEach(tagItem => {
          if(tagItem.id == item.tagId){
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
                    '<svg height="40px" width="40px"><use xlink:href="#chooseIcon'+category.iconId+'" fill="'+tag.color+'" stroke="'+tag.color+'" class="use-style"></use></svg>'+
                  '</div>'
        })
        marker.on('click', function() {
          self.markerClustererShow = false;
          self.clustererOpenShow = false
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
        this.clustererOpenShow = false;
        this.markerClustererShow = true;
        this.markerClusterList = [];
        target.markers.map((markerItem,index) => {
          this.markerList.forEach(item => {
            if(markerItem.getExtData() == item.id){
              this.markerClusterList.push(item)
            }
          })
        })
        this.currentMarker = this.markerClusterList[0];
        this.messageFooterShow = true
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
    },
    clustererOpen() {
      this.clustererOpenShow = true;
    },
    closeMarkerList() {
      this.clustererOpenShow = false;
    }
  }
}
</script>

<style>

</style>
