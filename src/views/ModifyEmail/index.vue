<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="验证码"></el-step>
      <el-step title="输入新邮箱"></el-step>
      <el-step title="绑定成功"></el-step>
    </el-steps>
    <div class="center">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="验证码" prop="oldemail">
          <el-input
            class="code"
            type="text"
            v-model="ruleForm.oldemail"
            autocomplete="off"
          ></el-input>
          <el-button @click="oldPaswd" :disabled="disp"
            >发送验证码到旧邮箱
            <template>
              <span v-if="overtime">{{ time }}</span>
            </template>
          </el-button>
        </el-form-item>
        <el-form-item label="新邮箱" prop="new">
          <el-input
            type="text"
            v-model="ruleForm.new"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次输入邮箱" prop="newtwo">
          <el-input
            type="text"
            v-model="ruleForm.newtwo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="newemail">
          <el-input
            class="code"
            type="text"
            v-model="ruleForm.newemail"
            autocomplete="off"
          ></el-input>
          <el-button @click="NewPaswd" :disabled="newdisp"
            >点击发送验证码
            <template>
              <span v-if="newtime">{{ news }}</span>
            </template>
          </el-button>
        </el-form-item>
        <el-form-item>
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
import { binding, change, ouldEmail, newEmail } from "@/api/modifyemail";
export default {
  data() {
    return {
      ruleForm: {
        new: "",
        newtwo: "",
        newemail: "",
      },
      active: 0,
      overtime: false,
      newtime: false,
      disp: false,
      newdisp: false,
      time: 60,
      news: 60,
    };
  },
  updated() {
    if (this.time == 0) {
      clearInterval(this.a);
      this.time = 60;
      this.overtime = false;
    }
    if (this.news == 0) {
      clearInterval(this.T);
      this.news = 60;
      this.newtime = false;
    }
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    async oldPaswd() {
      this.next();
      this.overtime = true;
      const res = await binding();
      this.a = setInterval(() => {
        this.time--;
      }, 1000);
      if (!this.disp) {
        this.disp = !this.disp;
      }
      setTimeout(() => {
        this.disp = false;
      }, 1000 * 60);
      alert(res.data.msg);
    },
    async NewPaswd() {
      this.next();
      let text = this.ruleForm.oldemail;
      await change({ text });
      let email1 = this.ruleForm.new;
      let email2 = this.ruleForm.newtwo;
      this.newtime = true;
      const res = await ouldEmail({ email1, email2 });
      alert(res.data.msg);
      this.T = setInterval(() => {
        this.news--;
      }, 1000);
      if (!this.newdisp) {
        this.newdisp = !this.newdisp;
      }
      setTimeout(() => {
        this.newdisp = false;
      }, 1000 * 60);
    },
    async submitForm(formName) {
      this.next();
      let text = this.ruleForm.newemail;
      const res = await newEmail({ text });
      alert(res.data.msg);
      this.ruleForm = {
        new: "",
        newtwo: "",
        newemail: "",
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.code {
  width: 30%;
  margin-right: 25px;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.demo-ruleForm {
  border: 1px solid #dcdfe6;
  padding: 30px 30px 10px 10px;
  border-radius: 15px;
}
</style>