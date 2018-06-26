<template>
  <div class="container">
    <el-amap 
      vid="amapDemo"
      :zoom="zoom"
      class="amap-demo"
      :amap-manager="amapManager"
      :events="events">
      <el-amap-marker v-for="(marker, index) in markers" :key="marker.index" :position="marker.position" :events="marker.events" :visible="marker.visible" :content="marker.content" :vid="index"></el-amap-marker>
      <el-amap-info-window 
        :position="window.position" 
        :autoMove="true"
        :closeWhenClickMap="true"
        :visible="window.visible"
        :offset=[0,-15]>
          <window-information v-on:information-show='listenToWindowInformation'></window-information>
      </el-amap-info-window>
    </el-amap>
    <div class="search-wrapper">
      <el-input class="search-input" placeholder="" suffix-icon="el-icon-search" @change="handleInput"></el-input>
      <div class="search-dropdown" v-if="searchDropdownShow">
        <ul v-if="searchResult">
          <li v-for="(item,index) in searchResultList" :key="index">
            <i class="el-icon-search"></i>
            <span>{{item.name}}</span>
            <small>{{item.address}}</small>
          </li>
        </ul>
        <div v-if="!searchResult" class="no-result">
          <label><span class="el-icon-search"></span>没有找到想要的结果</label>
        </div>
      </div>
    </div>
    <div class="filter-wrapper" :class="{filterShow: filterShow}">
      <div class="filter-icon" @click="filterOpen" :class="{display: !filterShow, hidden: filterShow}">
        <i class="el-icon-info"></i><span>筛选</span>
      </div>
      <div class="filter-content" :class="{display: filterShow, hidden: !filterShow}">
        <div class="filter-body">
          <div class="filter-select">
            <span class="filter-select-title">分类</span>
            <el-select v-model="tagIcon" multiple placeholder="请选择">
              <el-option
                v-for="(item,index) in tagIcons"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="filter-list-wrapper">
            <ul>
              <li
                v-for="item in tagIconList"
                :key="item.value">
                <span class="filter-category-icon">
                  <svg height="20px" width="20px"><use xlink:href="#chooseIcon1" fill="rgb(204, 204, 204)" stroke="rgb(204, 204, 204)" class="use-style"></use></svg>
                </span>
                <span class="filter-tag-title">{{ item.name }}</span>
                <span>{{ item.number }}个</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="filter-body">
          <div class="filter-select">
            <span class="filter-select-title">颜色</span>
            <el-select v-model="tagColor" multiple placeholder="请选择">
              <el-option
                v-for="(item,index) in tagColors"
                :key="index"
                :label="item.label"
                :value="item.value">
                <span class="multiple-color-option" :style="{backgroundColor: item.color}"></span>
              </el-option>
            </el-select>
          </div>
          <div class="filter-list-wrapper">
            <ul>
              <li
                v-for="item in tagColorList"
                :key="item.value">
                <span class="filter-color-block" :style="{backgroundColor: item.color}"></span>
                <span class="filter-tag-title">
                  <span class="filter-color-badge"></span>
                  {{ item.name }}
                </span>
                <span>{{ item.number }}个</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="filter-footer">
          <span class="filter-footer-title">共计</span>
          <span>个</span>
        </div>
      </div>
    </div>
    <div class="information-wrapper" v-if="informationShow">
      <div class="information-title"><span>桂溪加油站</span><a class="information-close" @click="closeInformation">×</a></div>
      <div class="information-list">
        <ul>
          <li>
            <span class="item-title">经营者姓名</span>
            <span class="item-content">张萌萌</span>
          </li>
          <li>
            <span class="item-title">经营地址</span>
            <span class="item-content">四川省成都市高新区天府一街北50米银湖公园（天府一街）附近</span>
          </li>
          <li>
            <span class="item-title">有效期开始时间</span>
            <span class="item-content">2018-6-11</span>
          </li>
          <li>
            <span class="item-title">有效期结束时间</span>
            <span class="item-content">2018-8-10</span>
          </li>
          <li>
            <span class="item-title">国有土地使用证</span>
            <span class="item-content">2018-6-11</span>
          </li>
          <li>
            <span class="item-title">经营环境</span>
            <span class="item-content">2018-6-11</span>
          </li>
          <li>
            <span class="item-title">经营者姓名</span>
            <span class="item-content">张萌萌</span>
          </li>
          <li>
            <span class="item-title">经营地址</span>
            <span class="item-content">四川省成都市高新区天府一街北50米银湖公园（天府一街）附近</span>
          </li>
          <li>
            <span class="item-title">有效期开始时间</span>
            <span class="item-content">2018-6-11</span>
          </li>
          <li>
            <span class="item-title">有效期结束时间</span>
            <span class="item-content">2018-8-10</span>
          </li>
          <li>
            <span class="item-title">国有土地使用证</span>
            <span class="item-content">2018-6-11</span>
          </li>
          <li>
            <span class="item-title">经营环境</span>
            <span class="item-content">2018-6-11</span>
          </li>
          <li>
            <span class="item-title">经营者姓名</span>
            <span class="item-content">张萌萌</span>
          </li>
          <li>
            <span class="item-title">经营地址</span>
            <span class="item-content">四川省成都市高新区天府一街北50米银湖公园（天府一街）附近</span>
          </li>
          <li>
            <span class="item-title">有效期开始时间</span>
            <span class="item-content">2018-6-11</span>
          </li>
          <li>
            <span class="item-title">有效期结束时间</span>
            <span class="item-content">2018-8-10</span>
          </li>
          <li>
            <span class="item-title">国有土地使用证</span>
            <span class="item-content">2018-6-11</span>
          </li>
          <li>
            <span class="item-title">经营环境</span>
            <span class="item-content">2018-6-11</span>
          </li>
          <li>
            <div class="item-image">
              <div class="item-image-title">经营环境</div>
              <img><img>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import { AMapManager } from 'vue-amap'
import Vue from 'vue'
import windowInformation from './infoWindow'

export default {
  name: 'Helloworld',
  components: { windowInformation },
  data () {
    let self = this
    return {
      amapManager,
      count: 1,
      filterShow: false,
      informationShow: false,
      searchDropdownShow: false,
      searchResult: false,
      events: {
        click() {
          self.filterShow = false
        }
      },
      slotStyle: {
        padding: '2px 8px',
        background: '#eee',
        color: '#333',
        border: '1px solid #aaa'
      },
      zoom: 15,
      window: {
        position: [121.5273285, 31.21515044],
        visible: false
      },
      markers: [],
      marker: {},
      windows:[],
      markerList: [
        {
          longitude: 116.39,
          latitude: 39.9,
          title: '北京',
          tagId: 1
        },
        {
          longitude: 116.396345,
          latitude: 39.9454,
          title: '北京',
          tagId: 2
        },
        {
          longitude: 114.396345,
          latitude: 40.9454,
          title: '成都',
          tagId: 3
        },
        {
          longitude: 115.416345,
          latitude: 42.0454,
          title: '成都',
          tagId: 4
        },
        {
          longitude: 121.5273285,
          latitude: 31.21515044,
          title: '上海',
          tagId: 4
        }
      ],
      tagIcon: '',
      tagColor: '',
      tagIcons: [
        {value: '全部', label: '全部'},
        {value: '企业', label: '企业'},
        {value: '个人', label: '个人'},
        {value: '法人', label: '法人'}
      ],
      categories: [
        {id:1,name:'全部',tagId:2},
        {id:2,name:'企业',tagId:3},
        {id:3,name:'个人',tagId:2},
        {id:4,name:'法人',tagId:4}
      ],
      tags:[
        {id:1,color:'#808080',name:''},
        {id:2,color:'#ff8c00',name:''},
        {id:3,color:'#ff0000',name:''},
        {id:4,color:'#228B22',name:''}
      ],
      tagColors: [
        {value: '全部', label: '全部'},
        {value: '灰色', label: '灰色',color:'#ccc'},
        {value: '红色', label: '红色',color:'#ff0000'},
        {value: '绿色', label: '绿色',color:'green'},
        {value: '黄色', label: '黄色',color:'yellow'}
      ],
      tagIconList: [
        {name: '全部', number: '2'},
        {id:1,name: '企业', number:'1',categoryId:1},
        {id:2,name: '个人', number: '1',tagId:2,categoryId:2},
        {id:3,name: '法人', number: '0',tagId:3,categoryId:3}
      ],
      tagColorList: [
        {name: '等待检查', color: '#ccc', number: '2'},
        {name: '不合格', color: 'red', number: '5'},
        {name: '合格', color: 'green', number: '1'},
        {name: '待整改', color: 'yellow', number: '0'}
      ],
      existedIcons: [
        {iconUrl: 'http://p1ctmsz1g.bkt.clouddn.com/10.png',iconText:'默认图标'},
        {iconUrl: 'http://p1ctmsz1g.bkt.clouddn.com/anquanjiancha.png',iconText:'政府'},
      ],
      searchResultList: [
        {id:1,name: '企业', address:'dhfkjsdfsdfklsdjf.'},
        {id:2,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.'},
        {id:3,name: '法人', address:'dhfkjsdfsdfklsdjf.'},
        {id:1,name: '企业', address:'dhfkjsdfsdfklsdjf.'},
        {id:2,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.'},
        {id:3,name: '法人', address:'dhfkjsdfsdfklsdjf.'},
        {id:1,name: '企业', address:'dhfkjsdfsdfklsdjf.'},
        {id:2,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.'},
        {id:3,name: '法人', address:'dhfkjsdfsdfklsdjf.'},
        {id:1,name: '企业', address:'dhfkjsdfsdfklsdjf.'},
        {id:2,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.'},
        {id:3,name: '法人', address:'dhfkjsdfsdfklsdjf.'},
        {id:1,name: '企业', address:'dhfkjsdfsdfklsdjf.'},
        {id:2,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.'},
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
  mounted () {
    this.initMap();
    console.log(amapManager._map);
  },
  methods: {
    initMap(){
      this.creatMap();
    },
    creatMap() {
      // var southWest = [103.901771,30.530069];
      // var northEast = [104.25445,30.79041]
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
        this.marker = {
          position: [item.longitude, item.latitude],
          offset: new AMap.Pixel(-10, -10),
          events: {
            click: () => {
              this.windows.forEach(window => {
                window.visible = false;
              });
              this.window = this.windows[index];
              this.$nextTick(() => {
                this.window.visible = true;
              });
            },
            mouseover: ()=> {
              this.markers[index].content = '<div>'+
                                              '<svg height="30px" width="30px"><use xlink:href="#chooseIcon'+category.id+'-hover" fill="'+tag.color+'" stroke="'+tag.color+'" class="use-style"></use></svg>'+
                                            '</div>'
            },
            mouseout: ()=> {
              this.markers[index].content = '<div>'+
                                              '<svg height="30px" width="30px"><use xlink:href="#chooseIcon'+category.id+'" fill="'+tag.color+'" stroke="'+tag.color+'" class="use-style"></use></svg>'+
                                            '</div>'
            }
          },
          content:'<div>'+
                    '<svg height="30px" width="30px"><use xlink:href="#chooseIcon'+category.id+'" fill="'+tag.color+'" stroke="'+tag.color+'" class="use-style"></use></svg>'+
                  '</div>'
        }
        this.markers.push(this.marker)
        this.windows.push({
          position: [item.longitude, item.latitude],
          visible: false
        })
      })
    },
    filterOpen() {
      this.filterShow = true
    },
    closeInformation() {
      this.informationShow = false
    },
    listenToWindowInformation(){
      this.informationShow = true
    },
    handleInput(event) {
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
    }
  }
}
</script><template>
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :plugin="plugin" :zoom="zoom" :events="events" class="amap-demo">
      </el-amap>

      <div class="toolbar">
        <button @click="getMap()">get map</button>
      </div>
    </div>
  </template>

  <style>
    .amap-page-container {
      height: 300px;
    }
  </style>

  <script>
    // NPM 方式
    import { AMapManager } from 'vue-amap';
    // CDN 方式
    let amapManager = new AMapManager();
    export default {
      data: function() {
        return {
          amapManager,
          zoom: 12,
          center: [121.59996, 31.197646],
          events: {
            init: (o) => {
              console.log(o.getCenter())
              console.log(this.$refs.map.$$getInstance())
              o.getCity(result => {
                console.log(result)
              })
            },
            'moveend': () => {
            },
            'zoomchange': () => {
            },
            'click': (e) => {
              alert('map clicked');
            }
          },
          plugin: ['ToolBar', {
            pName: 'MapType',
            defaultType: 0,
            events: {
              init(o) {
                console.log(o);
              }
            }
          }]
        };
      },

      methods: {
        getMap() {
          // amap vue component
          console.log(amapManager._componentMap);
          // gaode map instance
          console.log(amapManager._map);
        }
      }
    };
</script>