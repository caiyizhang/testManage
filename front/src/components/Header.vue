<template>
  <div>
    <el-header class="uweb-header">
      <div class="uweb-box">
        <img src="../assets/logo.png" class="image">
        <span>选址大师</span>
      </div>
        <span>admin</span>
      </el-header>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.uweb-header{
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .uweb-box{
    line-height: 50px;
  }
}
.image{
  width: 50px;
  height: 50px;
  margin: 0 20px;
}
</style>
