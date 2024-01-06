<template>
  <el-container>
            <el-aside height="200px" weight="200px">
            <div>
              <el-button
              v-for="(item, $index) in addressList"
            :key="$index"
            :label="item.value"
            :value="item.value"
            @click="showInMap(item.value)">
                {{ item.value }}
              </el-button>
            </div>
          </el-aside>
          <el-main>
            <div id="container"></div>
          </el-main>
          </el-container>

  </template>
  <script>
  import AMapLoader from "@amap/amap-jsapi-loader";
  window._AMapSecurityConfig = {
    securityJsCode: '854da7de3facb9321829474afa3d9c90',//你的秘钥
  }
  import {getAddress} from '../api/xuanzhi'
  import bus from './address'
  export default {
    name: "main",
    data() {
      return{
        addressList:[],
      }
    },
    mounted() {
      this.initAMap();
      bus.$on('addressData',addresses=>{
        let that = this;
        that.addressList=[],
        // console.log(addresses.province+addresses.city+addresses.block+addresses.industry);
        getAddress(addresses.province,addresses.city,addresses.block,addresses.industry)
        .then(res=>{
          // console.log(res.data.results);
          res.data.results.forEach(function (data, cindex) {
            console.log(data.address);
            that.addressList.push({
              value: data.address,
            });
          });
        })
      })
    },

    methods: {

      initAMap() {
        let that = this;
        AMapLoader.load({
          key: "1afd145d9b1b58a9648fa334cbfa35a9", // 申请好的Web端开发者Key，首次调用 load 时必填
          version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: ['AMap.PlaceSearch','AMap.Geocoder',], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          resizeEnable: true,
        })
          .then((AMap) => {
            that.map = new AMap.Map("container", {
              // 设置地图容器id
              viewMode: "3D", // 是否为3D地图模式
              zoom: 11, // 初始化地图级别
              center: [116.397428, 39.90923], // 初始化地图中心点位置
            });
            that.geocoder = new AMap.Geocoder()
            // that.mapSearchInit()
            this.placeSearchComponent = new AMap.PlaceSearch()
          })
          .catch((e) => {
            console.log(e);
          });
      },

      showInMap(mapAddress){
     let that= this;
     console.log(mapAddress);
     that.placeSearchComponent.search('广西北海市海城区', function (status, result) {
       if(status==='complete' && result.info === "OK"){
         that.showsearchResult = true
         that.poiList = result.poiList.pois
         console.log(that.poiList[0]);
         var marker = new AMap.Marker({
          position: [that.poiList[0].location.lng,that.poiList[0].location.lat],
        });
        that.map.clearMap()// 清除所有覆盖物（点标志）
        that.map.add(marker)// 添加点标志
        // that.showInfoWindow(marker);
        setTimeout(() => {
          that.map.setCenter(result.poiList.pois[0].location);
          that.map.setZoom(15);
        }, 50)
       }else{
         that.showsearchResult = false
         that.poiList = []
         that.$message({
           message: "没有查到结果",
           type: "warning",
         });
       }
     })
   },
    },
  };
  </script>
  <style scoped>
  #container {
    width: 600px;
    height: 600px;
  }
  </style>
