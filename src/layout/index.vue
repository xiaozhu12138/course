<template>
  <el-container>
    <el-aside width="auto"  v-model="collapse">
      <el-menu
      router
      :default-active="path"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      
      <el-menu-item index="/dashbaord">
        <i class="el-icon-menu"></i>
        <span  slot_="title">首页</span>
        
      </el-menu-item> 
      <el-menu-item index="/subjeact">
        <i class="el-icon-document"></i>
        <span slot_="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/video">
        <i class="el-icon-setting"></i>
        <span slot_="title">视频管理</span>
      </el-menu-item>
      <el-menu-item index="/chapter?pk=61">
        <i class="el-icon-s-order"></i>
        <span slot_="title">章节管理</span>
      </el-menu-item>
      <el-menu-item index="/map">
        <i class="el-icon-s-promotion"></i>
        <span slot_="title">地图位置</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-container>
      <el-header class="list">
        <Headers @collapse="change" :collapse="collapse"/>        
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
const Headers = () => import('./Header.vue')

export default {
  components:{
    Headers
  },
  data(){
    return {
      path:'/dashbaord',
      // isCollapse: true
    }
  },
  computed:{
    collapse(){
      return this.$store.state.isCollapse;
    }
  },
  methods:{
    change(){
      this.collapse = !this.collapse;
    }
  },
  watch:{
    $route(newValue){
      document.title = newValue.meta.title
    }
  },
  created(){
    this.path = this.$route.path;
  },

};
</script>

<style>
  html,body,#app,.el-container,.el-menu {
    height: 100%;
  }
  .but{
    float: right;
  }
  .list{
    padding: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }


</style>