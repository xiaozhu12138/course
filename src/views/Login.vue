<template>
  <div id="box">
    <div class="from" @keydown.enter="submitForm('ruleForm')">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="el_img">
          <el-form-item class="inp" label="验证码" prop="text">
            <el-input maxlength="4" v-model="ruleForm.text"></el-input>
          </el-form-item>
          <img @click="repliceImg" class="img" :src="url" alt="" />
        </div>
        <el-form-item class="list">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import { login } from "@/api/user";
import cookie from "js-cookie";

export default {
  data() {
    var validaUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      if (/^[\w-]{4,16}$/g.test(value)) {
        callback();
      } else {
        callback(new Error("用户名格式不正确"));
      }
    };
    var validaPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      if (/^[\w-]{4,16}$/g.test(value)) {
        callback();
      } else {
        callback(new Error("密码不正确"));
      }
    };
    var validaText = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      if (/\w{4}/.test(value)) {
        callback();
      } else {
        callback(new Error("验证码不正确"));
      }
    };

    return {
      ruleForm: {
        username: "",
        password: "",
        text: "",
      },
      url: "https://www.chengzier.cn:8000/api/generateimagecode",
      uid: null,
      timer: 0,
      rules: {
        username: [{ validator: validaUsername, trigger: "blur" }],
        password: [{ validator: validaPassword, trigger: "blur" }],
        text: [{ validator: validaText, trigger: "blur" }],
      },
    };
  },
  created() {
    this.CodeImg();
    this.itmer = setInterval(() => {
      this.CodeImg();
    }, 1000 * 60);
  },
  methods: {
    CodeImg() {
      this.uid = uuid();
      this.url = `https://www.chengzier.cn:8000/api/generateimagecode?uuid=${this.uid}`;
    },
    repliceImg() {
      clearInterval(this.itmer);
      this.itmer = setInterval(() => {
        this.CodeImg();
      }, 1000 * 60);
      this.CodeImg();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await login(
              Object.assign({ uuid: this.uid }, this.ruleForm)
            );
            if (res.data.status == "error") {
              this.$message.error(res.data.msg);
            } else {
              cookie.set("id", res.data.token, {
                expires: 1,
              });
              //储存到VueX
              this.$store.commit("writeToken", res.data.token);
              this.$message({
                message: "恭喜你，登录成功",
                type: "success",
              });
              this.$router.push("/");
            }
          } catch (err) {
            console.log(11);
            this.$message.error("登陆异常,请稍后重试");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  destroyed() {
    clearInterval(this.itmer);
  },
};
</script>

<style scoped>
#box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list {
  display: flex;
  justify-content: space-between;
}
.from {
  width: 600px;
  border-radius: 15px;
  background: #fff;
  padding: 40px 40px 20px 0px;
}
.el_img {
  display: flex;
}
.inp {
  width: 50%;
}
.img {
  margin-left: 20px;
  height: 40px;
  cursor: pointer;
}
</style>