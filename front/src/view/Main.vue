<template>
  <div id="main" class="common-layout" ref="main">
    <el-main>
      <el-space direction="vertical" alignment="start" :size="30">
        <el-space spacer="">
          <el-form ref="form" label-width="85px">
            <Select></Select>
          </el-form>
        </el-space>
        <Map></Map>
      </el-space>
    </el-main>
    <!-- </el-container>
    </el-container> -->
  </div>
</template>

<script>
import Select from "../components/Select.vue";
import Map from "../components/Map.vue";
// import logo from "../assets/logo.png";
export default {
  name: "Main",
  components: {
    Select,
    Map,
  },
  data() {
    return {
      // logo,
    };
  },
  mounted() {
    // this.$axios({
    //   method:'get',
    //   URL:'/xuanzhi/api/province',
    // })
    // .then((res)=>{
    //   console.log(JSON.stringify(res.data));
    // })
    // .catch(error => console.log(error))
    // this.$axios.get('/xuanzhi/api/province')
    // .then(res=>{
    // 	console.log(JSON.stringify(res.data.results));
    // })
    // .catch(error => console.log(error))
    // this.$axios.get('/xuanzhi/api/citys',{
    //   params:{
    //     province:'北京市'
    //   }
    // })
    // .then(res=>{
    // 	console.log(JSON.stringify(res.data));
    // })
    // .catch(error => console.log(error))
  },
};
</script>

<style>
.image {
  margin-top: 1%;
  left: -30%;
  width: 40px;
  height: 40px;
}

.amap-logo {
  display: none !important;
  visibility: hidden !important;
}

.amap-copyright {
  display: none !important;
  visibility: hidden !important;
}
.header {
  position: relative;
}
</style>
