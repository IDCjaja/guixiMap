<template>
  <div class="container">
    <el-amap 
      vid="amapDemo"
      :zoom="zoom"
      class="amap-demo"
      :center="center"
      :events="events">
      <el-amap-marker v-for="(marker, index) in markers" :key="marker.index" :position="marker.position" :events="marker.events" :visible="marker.visible" :content="marker.content" :vid="index"></el-amap-marker>
      <el-amap-info-window 
        :position="window.position" 
        :autoMove="true"
        :closeWhenClickMap="true"
        :visible="window.visible"
        :offset=[0,-15]>
        <div class="window-edit info">
          <tag-edit-window :tag-list="tagList" :choose-tags="chooseTags"></tag-edit-window>
          <category-edit-window :existed-categories="existedCategories"></category-edit-window>
          <div class="window-edit-footer" v-on:click="openInformation">
            <span>桂溪和平社区</span>
            <img src="http://p1ctmsz1g.bkt.clouddn.com/more.png" />
          </div>
        </div>
        <!-- <window-information v-on:information-show='listenToWindowInformation'></window-information> -->
      </el-amap-info-window>
    </el-amap>
    <div class="search-wrapper">
      <el-input class="search-input" placeholder="" suffix-icon="el-icon-search" @change="handleInput"></el-input>
      <search-dropdown
        :search-dropdown-show="searchDropdownShow" 
        :search-result="searchResult"
        :search-result-list="searchResultList"></search-dropdown>
    </div>
    <div class="filter-wrapper" :class="{filterShow: filterShow}">
      <div class="filter-icon" @click="filterOpen" :class="{display: !filterShow, hidden: filterShow}">
        <i class="el-icon-info"></i><span>筛选</span>
      </div>
      <div class="filter-content" :class="{display: filterShow, hidden: !filterShow}">
        <filter-category :categories="categories" :category-list="categoryList"></filter-category>
        <filter-tag :tags="tags" :tagList="tagList"></filter-tag>
        <div class="filter-footer">
          <span class="filter-footer-title">共计</span>
          <span>个</span>
        </div>
      </div>
    </div>
    <information :information-show="informationShow"></information>
  </div>
</template>

<script>
import AMap from 'AMap'
import { AMapManager } from 'vue-amap'
import Vue from 'vue'
import searchDropdown from './searchDropdown'
import filterCategory from './filterCategory'
import filterTag from './filterTag'
import tagEditWindow from './tagEditWindow'
import categoryEditWindow from './categoryEditWindow'
import information from './information'

export default {
  name: 'Helloworld',
  components: {
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
      center: [121.5273285, 31.21515044],
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
      categories: [
        {id:1,name:'全部',value: '全部',tagId:2},
        {id:2,name:'企业',value: '企业',tagId:3},
        {id:3,name:'个人',value: '个人',tagId:2},
        {id:4,name:'法人',value: '法人',tagId:4}
      ],
      tags:[
        {id:1,color:'#808080',name:'',value: '全部', label: '全部'},
        {id:2,color:'#ff8c00',name:'',value: '黄色', label: '黄色'},
        {id:3,color:'#ff0000',name:'',value: '红色', label: '红色'},
        {id:4,color:'#228B22',name:'',value: '绿色', label: '绿色'},
      ],
      chooseTags:[
        {id:1,color:'#808080',name:''},
        {id:2,color:'#ff8c00',name:''},
        {id:3,color:'#ff0000',name:''},
        {id:4,color:'#228B22',name:''},
        {id:5,color:'#222222',name:''},
        {id:6,color:'#FF7F50',name:''},
        {id:7,color:'#A52A2A',name:''},
        {id:8,color:'#00BFFF',name:''}
      ],
      categoryList: [
        {name: '全部', number: '2'},
        {id:1,name: '企业', number:'1',categoryId:1},
        {id:2,name: '个人', number: '1',tagId:2,categoryId:2},
        {id:3,name: '法人', number: '0',tagId:3,categoryId:3}
      ],
      tagList: [
        {name: '等待检查', color: '#ccc', number: '2',defaultColor: true},
        {name: '不合格', color: 'red', number: '5',defaultColor: false},
        {name: '合格', color: 'green', number: '1',defaultColor: false},
        {name: '待整改', color: 'yellow', number: '0',defaultColor: false}
      ],
      existedCategories: [
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
  },
  methods: {
    initMap(){
      this.creatMap();
    },
    creatMap() {
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
          //offset: new AMap.Pixel(-10, -10),
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
    openInformation() {
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
</script>