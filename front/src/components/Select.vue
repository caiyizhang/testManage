<template>
     
    <el-form-item label="地区" style="width: 1000px">
        <el-select
          v-model="pname"
          @change="choseProvince"
          placeholder="省级地区"
          style="width: 152px; margin-right: 5px"
          ref="p"
        >
          <el-option
            v-for="(item, $index) in province"
            :key="$index"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          style="width: 190px; margin-right: 5px"
          v-model="cname"
          @change="choseCity"
          placeholder="市级地区"
          ref="c"
        >
          <el-option
            v-for="(item, $index) in city"
            :key="$index"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          style="width: 170px"
          v-model="bname"
          @change="choseBlock"
          placeholder="区级地区"
          ref="b"
        >
          <el-option
            v-for="(item, $index) in block"
            :key="$index"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select  style="width: 152px; margin-right: 5px" 
        placeholder="行业" 
        v-model="iname"
        @change="choseIndusty"
        size="large"
        ref="i"
        >
          <el-option
            v-for="(item, $index) in industys"
            :key="$index"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
            <el-button @click="recommend" type="success" size="large">
              推荐
            </el-button>
            <div height="200px" weight="200px"></div>
      </el-form-item>

    

</template>

<script>
// import { ChineseDistricts } from '../api/xuanzhi'
import {getProvince,getCitys,getRegions,getIndusty} from '../api/xuanzhi'
import bus from './address'
export default {
  name:'main',
  data() {
    return {
      ChineseDistricts: [],
      province: [],
      shi1: [],
      qu1: [],
      city: [],
      block: [],
      industys: [],
      address: [],
      pname: "", //省的名字
      cname: "", //市的名字
      bname: "", //区的名字
      iname: "",
    };
  },
  
  methods: {
    // 加载china地点数据，三级
    recommend: function() {
      let data = {
        province:this.$refs.p.$options.propsData.value,
        city:this.$refs.c.$options.propsData.value,
        block:this.$refs.b.$options.propsData.value,
        industry:this.$refs.i.$options.propsData.value,
      }
        

      
      bus.$emit('addressData', data)
      // console.log(this.$refs.p.$options.propsData.value + this.$refs.c.$options.propsData.value + this.$refs.b.$options.propsData.value+this.$refs.i.$options.propsData.value);
    },
    
    getIndustyData: function () {
      let that = this;
      let i = 1;
      getIndusty()
      .then(res=>{
        res.data.result.forEach(function (item, index) {
          that.industys.push({
          id: i++,
          value: item,
        });
      })
    })
    .catch(error => console.log(error));
  },
    getCityData: function () {


      let that = this;
      getProvince()
      .then(res=>{
        
        res.data.results.forEach(function (item, index) {
          that.province.push({
          id: item.code,
          value: item.name,
        });
      })
    })
    .catch(error => console.log(error));


    },
    // 选省
    choseProvince: function (e) {
      let that = this;
      that.city = [];
      that.block = [];
      that.cname = "";
      that.bname = "";
      for (var index2 in that.province) {
        if (e === that.province[index2].id) {
          
          getCitys(that.province[index2].value).then(res=>{
              that.pname = that.province[index2].value;
              res.data.results.forEach(function (citem, cindex) {
            that.city.push({
              id: citem.code,
              value: citem.name,
            });
          });
          // console.log(that.city);
            })
            .catch(error => console.log(error))
        }
      }
      // console.log(that.pname);
    },
    // 选市
    choseCity: function (e) {
      let that = this;
      that.block = [];
      that.bname = "";
      for (var index3 in that.city) {
        if (e === that.city[index3].id) { 
          getRegions(that.province[index3].value, that.city[index3].value)
            .then(res=>{
              that.cname = that.city[index3].value;
              res.data.results.forEach(function (bitem, cindex) {
                that.block.push({
              id: bitem.code,
              value: bitem.name,
            });
          });

            })
            .catch(error => console.log(error))
        }
      }
      console.log(that.cname);
    },
    // 选区
    choseBlock: function (e) {
      this.bname = e;
      // console.log(this.bname);
    },
    choseIndusty: function (e) {
      this.iname = e;
    }
  },
  mounted() {
    this.getCityData();
    this.getIndustyData();
    // this.$axios.get('/xuanzhi/api/province').then(res=>{
		// 		console.log(res.data);
		// 	})
  },
};
</script>