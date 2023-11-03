<template>
  <div class="box" @contextmenu="showMenu($event)">
    <vue-context-menu
      style="width: 150px; height: 150px; background: #eee; margin-left: auto"
      :contextMenuData="contextMenuData"
      @deletedata="deletedata"
    ></vue-context-menu>
    <div>
      <div @click="but" :class="this.el_icon"></div>
    </div>

    <div>
      <el-dropdown class="linke">
        <el-avatar class="el-dropdown-link" :src="url"></el-avatar>
        <el-dropdown-menu route slot_="dropdown">
          <el-dropdown-item @click.native="curs" index="/information"
            >个人信息</el-dropdown-item
          >
          <el-dropdown-item>{{
            $store.state.userProfile.username
          }}</el-dropdown-item>
          <el-dropdown-item>{{
            $store.state.userProfile.email
          }}</el-dropdown-item>

          <el-dropdown-item @click.native="create" divided
            >创建账号</el-dropdown-item
          >
          <el-dropdown-item @click.native="secret" divided index="/password"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item @click.native="exit" divided
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="state" class="zzc"></div>
    <el-form
      v-if="state"
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm zzc_exit"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="exit_create('ruleForm')">确认</el-button>
      <el-button id="delete" @click="exit_del">取消</el-button>
    </el-form>
  </div>
  
</template>

<script>
import router from "@/router";
import cookie from "js-cookie";
import { logout } from "@/api/user";
export default {
  props: ["isCollapse"],
  data() {
    return {
      state:false,
      password:'',
      ruleForm:{
        username:'',
      },
      el_icon: "el-icon-s-fold icon_i",
      contextMenuData: {
        menuName: "demo",
        //菜单显示的位置
        axis: {
          x: null,
          y: null,
        },
        //菜单选项
        menulists: [
          {
            fnHandler: "deletedata",
            btnName: "删除当前数据",
          },
        ],
      },
    };
  },
  created() {
    if (this.$store.state.isCollapse) {
      this.el_icon = "el-icon-s-unfold icon_i";
    } else {
      this.el_icon = "el-icon-s-fold icon_i";
    }
  },
  computed: {
    url() {
      return this.$store.state.userProfile.avatar;
    },
  },
  methods: {
    secret(){
      this.$router.push("/password");
    },
    async exit_create(formName) {
      const res = await logout(this.ruleForm.username);
      this.password = res.data.password;
      this.$alert(`${this.password}`, `您的密码是`, {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `创建成功`
            });
          }
        });
        this.state = false;
    },
    create(){
      this.ruleForm.username = '';
      this.state = true;
    },
    exit_del(){
      this.state = false;
    },
    but() {
      this.$store.commit("reSave");
      if (this.$store.state.isCollapse) {
        this.el_icon = "el-icon-s-unfold icon_i";
      } else {
        this.el_icon = "el-icon-s-fold icon_i";
      }
    },
    curs() {
      this.$router.push("/information");
    },
    chenge() {
      this.$store.dispatch("asyncMsg");
    },
    showMenu($event) {
      $event.preventDefault();
      var x = $event.clientX;
      var y = $event.clientY;
      this.contextMenuData.axis = {
        x,
        y,
      };
    },
    deletedata() {
      console.log("delete!");
    },
    exit() {
      cookie.remove("id");
      this.$router.go(0);
    },
  },
};
</script>

<style scoped>
.box {
  height: 60px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.icon_i {
  cursor: pointer;
  font-size: 30px;
}
.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}
.zzc {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.zzc_exit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  /* height: 200px; */
  padding: 50px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index:9999;
}
#delete {
  margin-top: 20px;
  margin-left: 0;
}
</style>