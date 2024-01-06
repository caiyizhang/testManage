<template>
  <div class="layout">
    <Header class="header"></Header>
    <el-container>
      <el-aside width="200px">
        <h1 class="asideTitle">引擎组看板</h1>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          router
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <MenuTree :menuList="menuList" />
        </el-menu>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
     
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import MenuTree from "../components/MenuTree";
import Header from "../components/Header";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { MenuTree, Header },
  data() {
    //这里存放数据
    return {
      menuList: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.menuList = this.$router.options.routes[1].children.filter((item) => {
      return item.path !== "/Layout";
    });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.layout {
  width: 100%;
  height: 100%;
}
.asideTitle{
  background: rgb(84, 92, 100);
  text-align: center;
  width: calc(100% - 1px);
  height: 50px;
  line-height: 50px;
  color: white;
}
.el-menu {
  height: calc(100% - 50px);
}

.el-container {
  height: calc(100% - 60px);
}
</style>
