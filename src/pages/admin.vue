<template>
  <div class="container">
    <header-nav></header-nav>
    <el-amap
      vid="amapDemo"
      resizeEnable="true"
      :amap-manager="amapManager"
      :zoom="zoom"
      :zooms="zooms"
      class="amap-demo"
      :center="center"
      :events="events">
      <el-amap-info-window 
        :position="window.position" 
        :autoMove="true"
        :closeWhenClickMap="true"
        :visible="window.visible"
        :offset=[0,-15]>
        <div v-if="!markerClustererShow" class="window-edit info">
          <tag-edit-window
            @toggleTagInitMap="initTagMap($event)"
            ref="tagWindow"
            :existed-tag="existedTag"
            :choose-tags="chooseTags"
            :marker-list="markerList"
            :current-marker-id="currentMarkerId"
            :current-marker-tag-id="currentMarkerTagId"></tag-edit-window>
          <category-edit-window
            @toggleCategoryInitMap="initCategoryMap($event)"
            ref="categoryWindow"
            :existed-categories="existedCategories"
            :choose-categories="chooseCategories"
            :marker-list="markerList"
            :current-marker-id="currentMarkerId"
            :current-marker-category-id="currentMarkerCategoryId"></category-edit-window>
          <div class="window-edit-footer" v-on:click="openInformation">
            <span>{{ currentMarkerName }}</span>
            <img src="http://p1ctmsz1g.bkt.clouddn.com/more.png" />
          </div>
        </div>
        <el-tabs
          v-if="markerClustererShow"
          type="card"
          tabPosition="left"
          v-model="activeName"
          @tab-click="handleClick">
          <el-tab-pane
            v-for="(item,index) in markerClusterList"
            :key="index">
            <span slot="label" :name="index">
              <svg height="16px" width="16px">
                <use :xlink:href="'#icon'+item.categoryId" :fill="item.color" :stroke="item.color"></use>
              </svg>
            {{item.name}}</span>
            <div class="window-edit info">
              <tag-edit-window
                @toggleTagInitMap="initTagMap($event)"
                ref="tagWindowTab"
                :existed-tag="existedTag"
                :choose-tags="chooseTags"
                :radioName="item.id"
                :marker-list="markerList"
                :current-marker-id="currentMarkerId"
                :current-marker-tag-id="currentMarkerTagId"></tag-edit-window>
              <category-edit-window
                @toggleCategoryInitMap="initCategoryMap($event)"
                ref="categoryWindowTab"
                :existed-categories="existedCategories"
                :choose-categories="chooseCategories"
                :radioName="item.id"
                :marker-list="markerList"
                :current-marker-id="currentMarkerId"
                :current-marker-category-id="currentMarkerCategoryId"></category-edit-window>
              <div class="window-edit-footer" @click="openInformation">
                <span>{{ currentMarkerName }}</span>
                <img src="http://p1ctmsz1g.bkt.clouddn.com/more.png" />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-amap-info-window>
    </el-amap>
    <div class="search-wrapper">
      <el-input
        class="search-input"
        placeholder=""
        :value="searchInputValue"
        suffix-icon="el-icon-search"
        @change="handleInput"
        @focus="searchFocus"
        @keyup.enter.native="keyCode"></el-input>
      <search-dropdown
        :search-dropdown-show="searchDropdownShow"
        :search-result="searchResult"
        :search-result-list="searchResultList"
        v-on:triggerSetCenter="setCenterLngLat"></search-dropdown>
    </div>
    <div class="filter-wrapper" :class="{filterShow: filterShow}">
      <div class="filter-icon" @click="filterOpen" :class="{display: !filterShow, hidden: filterShow}">
        <img src="http://p1ctmsz1g.bkt.clouddn.com/filter.jpg" class="filter-icon-info"/><span>筛选</span>
      </div>
      <div class="filter-content" :class="{display: filterShow, hidden: !filterShow}">
        <filter-category :existedCategories="existedCategories" ref="filterCategory"></filter-category>
        <filter-tag :tags="tags" :existedTag="existedTag" ref="filterTag"></filter-tag>
        <div class="filter-footer">
          <span class="filter-footer-title">共计</span>
          <span>12个</span>
        </div>
      </div>
    </div>
    <information :information-show="informationShow" v-on:information-show="listenToInformation"></information>
  </div>
</template>
<script>
import { AMapManager } from 'vue-amap'
import Vue from 'vue'
import headerNav from '../components/headerNav'
import searchDropdown from '../components/searchDropdown'
import filterCategory from '../components/filterCategory'
import filterTag from '../components/filterTag'
import tagEditWindow from '../components/tagEditWindow'
import categoryEditWindow from '../components/categoryEditWindow'
import information from '../components/information'

let amapManager = new AMapManager();

export default {
  name: 'admin',
  components: {
    headerNav,
    searchDropdown,
    filterCategory,
    filterTag,
    tagEditWindow,
    categoryEditWindow,
    information
  },
  data () {
    let self = this
    return {
      amapManager,
      count: 1,
      searchInputValue:'',
      filterShow: false,
      informationShow: false,
      searchDropdownShow: false,
      searchResult: false,
      markerClustererShow: false,
      currentMarkerId: -1,
      currentMarkerTagId: -1,
      currentMarkerCategoryId: -1,
      currentMarkerName: '',
      markerClusterList: [],
      activeName: "0",
      events: {
        click() {
          self.filterShow = false;
          self.searchDropdownShow =false;
          self.$refs.filterCategory.closeSelect();
          self.$refs.filterTag.closeSelect();
        },
        complete() {
          self.creatMap();
          self.setMapLimit()
        }
      },
      zoom: 17,
      zooms: [14,19],
      center: [104.0723,30.602836],
      window: {
        position: [0,0],
        visible: false
      },
      tagIcon: '',
      tagColor: '',
      categories: [
        {id:1,name:'全部',value: '全部',tagId:2,defaultCategory: true},
        {id:2,name:'企业',value: '企业',tagId:3,defaultCategory: false},
        {id:3,name:'个人',value: '个人',tagId:2,defaultCategory: false},
        {id:4,name:'法人',value: '法人',tagId:4,defaultCategory: false}
      ],
      categoryList: [
        {id:1,name: '全部', number: '2',categoryId:1},
        {id:2,name: '企业', number:'1',categoryId:2},
        {id:3,name: '个人', number: '1',tagId:2,categoryId:3},
        {id:4,name: '法人', number: '0',tagId:3,categoryId:4}
      ],
      existedCategories: [
        {id:1, name: '默认', iconId:1, number: '2'}
      ],
      chooseCategories:[
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5},
        {id:6}
      ],
      tags:[
        {id:1,color:'#a0a0a0',name:'',value: '全部', label: '全部'},
        {id:2,color:'#feb902',name:'',value: '黄色', label: '黄色'},
        {id:3,color:'#f52b1f',name:'',value: '红色', label: '红色'},
        {id:4,color:'#73b724',name:'',value: '绿色', label: '绿色'},
      ],
      existedTag: [
        {id:1,name: '默认', color: '#a0a0a0', number: '2',defaultColor: true},
      ],
      chooseTags:[
        {id:1,color:'#a0a0a0'},
        {id:2,color:'#73b724'},
        {id:3,color:'#feb902'},
        {id:4,color:'#f52b1f'},
        {id:5,color:'#222222'},
        {id:6,color:'#21bdd4'},
        {id:7,color:'#f07235'},
        {id:8,color:'#e72b5d'}
      ],
      tagList: [
        {id:1,name: '默认', color: '#a0a0a0', number: '2',defaultColor: true},
        {id:2,name: '不合格', color: '#f52b1f', number: '5',defaultColor: false},
        {id:3,name: '合格', color: '#73b724', number: '1',defaultColor: false},
        {id:4,name: '待整改', color: '#feb902', number: '0',defaultColor: false}
      ],
      searchResultList: [
        {id: 1,longitude: 104.106946,latitude: 30.674249,name: '妈妈驿站',tagId: 1,categoryId:1},
        {id: 11,longitude: 104.106946,latitude: 30.674253,name: '华贸广场',tagId: 1,categoryId:1},
        {id: 2,longitude: 104.109191,latitude: 30.671637,name: '伊藤洋华堂(建设路店)',tagId: 1,categoryId: 1,address: '二环路东二段426号阳光新生活广场'},
        {id: 3,longitude: 114.396345,latitude: 30.9455,name: '成都',tagId: 1,categoryId: 1},
        {id: 4,longitude: 104.101876,latitude: 30.668877,name: '第五大道',tagId: 1,categoryId: 1,address: '建设路26号'},
        {id: 5,longitude: 121.5273285,latitude: 31.21515044,name: '上海',tagId: 1,categoryId: 1},
        {id: 6,longitude: 104.108444,latitude: 30.670595,name: '建设路东站(公交站)',tagId: 1,categoryId: 1,address: '6路;14路;42路;71路;72路;社区巴士1010路'},
        {id: 7,longitude: 104.104973,latitude: 30.670078,name: '万科·钻石广场',tagId: 1,categoryId: 1,address: '建设路10号'},
        {id: 8,longitude: 104.104147,latitude: 30.669054,name: '高地中心',tagId: 1,categoryId: 1,address: '建设路9号'},
        {id: 9,longitude: 104.075275,latitude: 30.601965,name: '成都高新技术产业开发区桂溪街道办事处',tagId: 1,categoryId: 1,address: '天仁路176号'},
        {id: 10,longitude: 104.077467,latitude: 30.618422,name: '桂溪加油站(科华中路)',tagId: 1,categoryId: 1,address: '科华中路63号'},
        {id: 12,longitude: 104.062087,latitude: 30.599805,name: '宜家家居(成都商场店)',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道宜家家居(成都商场店)'},
        {id: 13,longitude: 104.06183,latitude: 30.601754,name: '欧尚(成都高新店)',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道欧尚(成都高新店)'},
        {id: 14,longitude: 104.063986,latitude: 30.599547,name: '迪卡侬',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道都会路199号迪卡侬运动场'},
        {id: 15,longitude: 104.060961,latitude: 30.601255,name: '必胜客',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道必胜客(成都高新店)'},
        {id: 16,longitude: 104.060102,latitude: 30.601394,name: '宜家家居(成都商场店)',tagId: 1,categoryId: 1,address: '四川省成都市武侯区石羊场街道益州大道北段360号英祥·财富领域'},
        {id: 17,longitude: 104.062903,latitude: 30.601855,name: '凯德广场',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道南洋小馆(凯德广场)凯德广场(新南店)'},
        {id: 18,longitude: 104.062087,latitude: 30.599805,name: '宜家家居(成都商场店)',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道宜家家居(成都商场店)'},
        {id: 19,longitude: 104.05815,latitude: 30.600565,name: '城市春天',tagId: 1,categoryId: 1,address: '四川省成都市武侯区石羊场街道成都云起茶宿客栈城市春天'},
        {id: 20,longitude: 104.062087,latitude: 30.609805,name: '四川省城市车辆置业有限责任公司',tagId: 1,categoryId: 1,address: '四川省成都市武侯区石羊场街道火车南站西路865号四川省城市车辆置业有限责任公司'}
      ],
      markerList: [
        {id: 1,longitude: 104.106946,latitude: 30.674249,name: '妈妈驿站',tagId: 1,categoryId:1},
        {id: 11,longitude: 104.106946,latitude: 30.674253,name: '华贸广场',tagId: 1,categoryId:1},
        {id: 2,longitude: 104.109191,latitude: 30.671637,name: '伊藤洋华堂(建设路店)',tagId: 1,categoryId: 1,address: '二环路东二段426号阳光新生活广场'},
        {id: 3,longitude: 114.396345,latitude: 30.9455,name: '成都',tagId: 1,categoryId: 1},
        {id: 4,longitude: 104.101876,latitude: 30.668877,name: '第五大道',tagId: 1,categoryId: 1,address: '建设路26号'},
        {id: 5,longitude: 121.5273285,latitude: 31.21515044,name: '上海',tagId: 1,categoryId: 1},
        {id: 6,longitude: 104.108444,latitude: 30.670595,name: '建设路东站(公交站)',tagId: 1,categoryId: 1,address: '6路;14路;42路;71路;72路;社区巴士1010路'},
        {id: 7,longitude: 104.104973,latitude: 30.670078,name: '万科·钻石广场',tagId: 1,categoryId: 1,address: '建设路10号'},
        {id: 8,longitude: 104.104147,latitude: 30.669054,name: '高地中心',tagId: 1,categoryId: 1,address: '建设路9号'},
        {id: 9,longitude: 104.075275,latitude: 30.601965,name: '成都高新技术产业开发区桂溪街道办事处',tagId: 1,categoryId: 1,address: '天仁路176号'},
        {id: 10,longitude: 104.077467,latitude: 30.618422,name: '桂溪加油站(科华中路)',tagId: 1,categoryId: 1,address: '科华中路63号'},
        {id: 12,longitude: 104.062087,latitude: 30.599905,name: '宜家家居(成都商场店)',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道宜家家居(成都商场店)'},
        {id: 13,longitude: 104.06183,latitude: 30.601754,name: '欧尚(成都高新店)',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道欧尚(成都高新店)'},
        {id: 14,longitude: 104.063986,latitude: 30.599547,name: '迪卡侬',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道都会路199号迪卡侬运动场'},
        {id: 15,longitude: 104.060961,latitude: 30.601255,name: '必胜客',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道必胜客(成都高新店)'},
        {id: 16,longitude: 104.060102,latitude: 30.601394,name: '宜家家居(成都商场店)',tagId: 1,categoryId: 1,address: '四川省成都市武侯区石羊场街道益州大道北段360号英祥·财富领域'},
        {id: 17,longitude: 104.062903,latitude: 30.601855,name: '凯德广场',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道南洋小馆(凯德广场)凯德广场(新南店)'},
        {id: 18,longitude: 104.062087,latitude: 30.599805,name: '成都商场店',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道宜家家居(成都商场店)'},
        {id: 19,longitude: 104.05815,latitude: 30.600865,name: '城市春天',tagId: 1,categoryId: 1,address: '四川省成都市武侯区石羊场街道成都云起茶宿客栈城市春天'},
        {id: 20,longitude: 104.062087,latitude: 30.610805,name: '四川省城市车辆置业有限责任公司',tagId: 1,categoryId: 1,address: '四川省成都市武侯区石羊场街道火车南站西路865号四川省城市车辆置业有限责任公司'},
        {id: 21,longitude: 104.062903,latitude: 30.601985,name: '凯德广场',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道南洋小馆(凯德广场)凯德广场(新南店)'},
        {id: 22,longitude: 104.062087,latitude: 30.599815,name: '宜家',tagId: 1,categoryId: 1,address: '四川省成都市武侯区桂溪街道宜家家居(成都商场店)'},
        {id: 23,longitude: 104.05815,latitude: 30.599815,name: '城市春天',tagId: 1,categoryId: 1,address: '四川省成都市武侯区石羊场街道成都云起茶宿客栈城市春天'},
        {id: 24,longitude: 104.062087,latitude: 30.609955,name: '四川省城市车辆置业有限责任公司',tagId: 1,categoryId: 1,address: '四川省成都市武侯区石羊场街道火车南站西路865号四川省城市车辆置业有限责任公司'}
      ]
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
      var markers = [];
      let mapObj = amapManager._map;
      var cluster = new AMap.MarkerClusterer(mapObj, markers,{
        gridSize:30,
        zoomOnClick: false
      });
      cluster.clearMarkers()
      this.markerList.forEach((item,index) => {
        var category = {};
        var tag = {};
        this.existedCategories.forEach(categoryItem => {
          if(categoryItem.id == item.categoryId){
            category = categoryItem;
            return category;
          }
        })
        this.existedTag.forEach(tagItem => {
          if(tagItem.id == item.tagId){
            tag = tagItem;
            return tag;
          }
        })
        if(category.id == 1){
          var marker = new AMap.Marker({
            extData: item.id,
            map: mapObj,
            position: [item.longitude, item.latitude],
            offset:  new AMap.Pixel(-10,-24),
            zIndex: item.zIndex,
            riseOnHover: true,
            content:'<div>'+
                      '<span class="marker-title">'+category.name.substr(0,1)+'</span>'+
                      '<svg height="30px" width="30px"><use xlink:href="#chooseIcon'+category.id+'" fill="'+tag.color+'" stroke="'+tag.color+'" class="use-style"></use></svg>'+
                    '</div>'
          })
        } else {
          var marker = new AMap.Marker({
            extData: item.id,
            map: mapObj,
            position: [item.longitude, item.latitude],
            offset:  new AMap.Pixel(-10,-24),
            zIndex: item.zIndex,
            riseOnHover: true,
            content:'<div>'+
                      '<svg height="30px" width="30px"><use xlink:href="#chooseIcon'+category.id+'" fill="'+tag.color+'" stroke="'+tag.color+'" class="use-style"></use></svg>'+
                    '</div>'
          })
        }
        var self = this;
        marker.on('click', function() {
          self.activeName = "0";
          self.window.visible = false;
          var markerId = this.getExtData();
          self.markerClustererShow = false;
          self.window.position = [item.longitude, item.latitude];
          self.currentMarkerId = markerId;
          self.markerList.forEach(item => {
            if(item.id == self.currentMarkerId){
              self.currentMarkerTagId = item.tagId;
              self.currentMarkerCategoryId = item.categoryId
              self.currentMarkerName = item.name
            }
          })
          self.$nextTick(() => {
            self.window.visible = true;
            self.$refs.tagWindow.setNewTagId();
            self.$refs.categoryWindow.setNewCategoryId();
          });
        });
        markers.push(marker);
      })
      cluster.addMarkers(markers)
      cluster.on('click',(target)=>{
        this.activeName = "0";
        this.window.visible = false;
        this.window.position = [target.lnglat.lng,target.lnglat.lat];
        this.markerClusterList = [];
        target.markers.map((markerItem,index) => {
          this.markerList.forEach(item => {
            if(markerItem.getExtData() == item.id){
              this.existedTag.forEach(tag => {
                if(tag.id == item.tagId) {
                  item.color = tag.color
                }
              })
              this.markerClusterList.push(item)
            }
          })
        })
        this.markerClustererShow = true;
        this.currentMarkerId = this.markerClusterList[0].id;
        this.currentMarkerTagId = this.markerClusterList[0].tagId
        this.currentMarkerCategoryId = this.markerClusterList[0].categoryId;
        this.currentMarkerName = this.markerClusterList[0].name
        this.$nextTick(() => {
          this.window.visible = true;
          this.$refs.tagWindowTab[0].setNewTagId();
          this.$refs.categoryWindowTab[0].setNewCategoryId();
        });
      })
    },
    filterOpen() {
      this.filterShow = true
    },
    searchFocus() {
      this.window.visible = false
    },
    openInformation() {
      alert(this.currentMarkerId)
      this.informationShow = true
    },
    listenToInformation() {
      this.informationShow = false
    },
    handleInput(event) {
      this.searchInputValue = event;
      if(event !== ""){
        this.searchDropdownShow = true;
        if(this.searchResultList.length) {
          this.searchResult = true
        } else {
          this.searchResult = false
        }
      } else {
        this.searchDropdownShow = false
      }
    },
    keyCode() {
      if(this.searchInputValue !== ""){
        this.searchDropdownShow = true;
        if(this.searchResultList.length) {
          this.searchResult = true
        } else {
          this.searchResult = false
        }
      } else {
        this.searchDropdownShow = false
      }
    },
    setCenterLngLat(centerMarkerId) {
      this.markerList.forEach( item => {
        if ( centerMarkerId === item.id ) {
          this.center = [item.longitude,item.latitude];
          this.zoom = 18;
          item.zIndex = 200
          this.creatMap();
        } else {
          item.zIndex = 100;
          this.creatMap();
        }
      })
    },
    handleClick(tab,event) {
      this.activeName = tab.index.toString();
      this.currentMarkerId = this.markerClusterList[tab.index].id;
      this.currentMarkerTagId = this.markerClusterList[tab.index].tagId
      this.currentMarkerCategoryId = this.markerClusterList[tab.index].categoryId;
      this.currentMarkerName = this.markerClusterList[tab.index].name;
      this.$refs.tagWindowTab[tab.index].setNewTagId();
      this.$refs.categoryWindowTab[tab.index].setNewCategoryId();
    },
    initTagMap(id) {
      this.currentMarkerTagId = id;
      this.markerClusterList.forEach(item => {
        this.existedTag.forEach(tag => {
          if(item.tagId == tag.id){
            item.color = tag.color
          }
        })
      })
      var self = this
      this.$nextTick(() => {
        self.creatMap()
      })
      //重新请求marker数据，渲染地图
      this.creatMap()
    },
    initCategoryMap(id) {
      this.currentMarkerCategoryId = id;
      //重新请求marker数据，渲染地图
      this.creatMap()
    }
  }
}
</script>