<template>
  <div class="container">
    <header-nav></header-nav>
    <el-amap
      vid="amapDemo"
      :amap-manager="amapManager"
      :zoom="zoom"
      class="amap-demo"
      :center="center"
      :events="events">
      <el-amap-marker v-for="(marker, index) in markers" ref="marker" :key="marker.index" :position="marker.position" :events="marker.events" :visible="marker.visible" :content="marker.content" :vid="index"></el-amap-marker>
      <el-amap-info-window 
        :position="window.position" 
        :autoMove="true"
        :closeWhenClickMap="true"
        :visible="window.visible"
        :offset=[0,-15]>
        <div class="window-edit info">
          <tag-edit-window :existed-tag="existedTag" :choose-tags="chooseTags"></tag-edit-window>
          <category-edit-window :existed-categories="existedCategories"></category-edit-window>
          <div class="window-edit-footer" v-on:click="openInformation">
            <span>桂溪和平社区</span>
            <img src="http://p1ctmsz1g.bkt.clouddn.com/more.png" />
          </div>
        </div>
      </el-amap-info-window>
    </el-amap>
    <div class="search-wrapper">
      <el-input class="search-input" placeholder="" :value="searchInputValue" suffix-icon="el-icon-search" @change="handleInput" @keyup.enter.native="keyCode"></el-input>
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
        <filter-category :categories="categories" :category-list="categoryList"></filter-category>
        <filter-tag :tags="tags" :tagList="tagList"></filter-tag>
        <div class="filter-footer">
          <span class="filter-footer-title">共计</span>
          <span>个</span>
        </div>
      </div>
    </div>
    <information :information-show="informationShow" v-on:information-show="listenToInformation"></information>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
import Vue from 'vue'
import headerNav from './headerNav'
import searchDropdown from './searchDropdown'
import filterCategory from './filterCategory'
import filterTag from './filterTag'
import tagEditWindow from './tagEditWindow'
import categoryEditWindow from './categoryEditWindow'
import information from './information'

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
      events: {
        click() {
          self.filterShow = false;
          self.searchDropdownShow =false
        }
      },
      zoom: 15,
      center: [104.109191,30.671637],
      window: {
        position: [104.109191,30.671637],
        visible: false
      },
      markers: [],
      marker: {},
      windows:[],
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
      tagIcon: '',
      tagColor: '',
      categories: [
        {id:1,name:'全部',value: '全部',tagId:2,defaultCategory: true},
        {id:2,name:'企业',value: '企业',tagId:3,defaultCategory: false},
        {id:3,name:'个人',value: '个人',tagId:2,defaultCategory: false},
        {id:4,name:'法人',value: '法人',tagId:4,defaultCategory: false}
      ],
      tags:[
        {id:1,color:'#a0a0a0',name:'',value: '全部', label: '全部'},
        {id:2,color:'#feb902',name:'',value: '黄色', label: '黄色'},
        {id:3,color:'#f52b1f',name:'',value: '红色', label: '红色'},
        {id:4,color:'#73b724',name:'',value: '绿色', label: '绿色'},
      ],
      chooseTags:[
        {id:1,color:'#a2a2a2',name:''},
        {id:2,color:'#f52b1f',name:''},
        {id:3,color:'#73b724',name:''},
        {id:4,color:'#feb902',name:''},
        {id:5,color:'#222222',name:''},
        {id:6,color:'#f07235',name:''},
        {id:7,color:'#e72b5d',name:''},
        {id:8,color:'#21bdd4',name:''}
      ],
      categoryList: [
        {id:1,name: '全部', number: '2',categoryId:1},
        {id:2,name: '企业', number:'1',categoryId:2},
        {id:3,name: '个人', number: '1',tagId:2,categoryId:3},
        {id:4,name: '法人', number: '0',tagId:3,categoryId:4}
      ],
      tagList: [
        {id:1,name: '默认', color: '#a0a0a0', number: '2',defaultColor: true},
        {id:2,name: '不合格', color: '#f52b1f', number: '5',defaultColor: false},
        {id:3,name: '合格', color: '#73b724', number: '1',defaultColor: false},
        {id:4,name: '待整改', color: '#feb902', number: '0',defaultColor: false}
      ],
      existedTag: [
        {id:1,name: '默认', color: '#a0a0a0', number: '2',defaultColor: true},
      ],
      existedCategories: [
        {iconUrl: 'http://p1ctmsz1g.bkt.clouddn.com/10.png',iconText:'默认图标'},
        {iconUrl: 'http://p1ctmsz1g.bkt.clouddn.com/anquanjiancha.png',iconText:'政府'},
      ],
      searchResultList: [
        {id:1,name: '企业', address:'dhfkjsdfsdfklsdjf.',longitude: 104.106946,latitude: 30.674249,},
        {id:2,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.',longitude: 104.109191,latitude: 30.671637,},
        {id:3,name: '法人', address:'dhfkjsdfsdfklsdjf.',longitude: 114.396345,latitude: 30.9454,},
        {id:4,name: '企业', address:'dhfkjsdfsdfklsdjf.',longitude: 104.101876,latitude: 30.668877,},
        {id:5,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.',longitude: 121.5273285,latitude: 31.21515044,},
        {id:6,name: '法人', address:'dhfkjsdfsdfklsdjf.',longitude: 104.108444,latitude: 30.670595,},
        {id:7,name: '企业', address:'dhfkjsdfsdfklsdjf.',longitude: 104.104973,latitude: 30.670078,},
        {id:8,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.',longitude: 104.077467,latitude: 30.618422,},
        {id:9,name: '法人', address:'dhfkjsdfsdfklsdjf.'},
        {id:10,name: '企业', address:'dhfkjsdfsdfklsdjf.'},
        {id:11,name: '个人', address:'dhfkjsdfsdfklsdvbxcvkjjdlhlvsdkljf.'},
        {id:12,name: '法人', address:'dhfkjsdfsdfklsdjf.'},
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
    this.creatMap();
  },
  methods: {
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
          offset: (-10,-24),
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
        debugger
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
    add() {
      let o = amapManager._map;
      let marker = new AMap.Marker({
        position: [103.951572,30.559105],
        content:'<div>'+
                  '<svg height="30px" width="30px"><use xlink:href="#chooseIcon4" fill="blue" stroke="blue" class="use-style"></use></svg>'+
                '</div>'
      });

      marker.setMap(o);
    },
    setCenterLngLat(centerMarkerId) {
      this.markerList.forEach( item => {
        if ( centerMarkerId === item.id ) {
          this.center = [item.longitude,item.latitude];
          this.zoom = 18
        }
      })
    }
  }
}
</script>