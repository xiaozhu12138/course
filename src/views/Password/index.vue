<template>
  <div class="center">
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="验证码" prop="old">
        <el-input
          class="code"
          type="text"
          v-model="ruleForm.old"
          autocomplete="off"
        ></el-input>
        <el-button @click="oldPaswd" :disabled="disp">点击发送验证码
          <template>
              <span v-if="overtime">{{ time }}</span>
            </template>
        </el-button>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {ouldPassword , newPassword} from '@/api/email'
export default {
    
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          old:''
        },
        overtime:false,
        disp: false,
      time:60,
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    updated(){
    if(this.time == 0){
        clearInterval(this.a);
        this.time = 60;
        this.overtime = false;

      }
  },
    methods: {
        async oldPaswd(){
          this.overtime = true;
          const res = await ouldPassword();
      this.a = setInterval(()=>{
        this.time--;
      },1000)
      if (!this.disp) {
        this.disp = !this.disp;
      }
      setTimeout(()=> {
        this.disp = false;
      }, 1000 * 60);
          alert(res.data.msg)
        },
      async submitForm(formName) {
        let old = this.ruleForm.old;
        let pass = this.ruleForm.pass;
        let checkPass = this.ruleForm.checkPass;
        const res = await newPassword({text : old , pwd1 : pass , pwd2 : checkPass})
        alert(res.data.msg)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style scoped>
.code{
    width: 30%;
    margin-right:25px;
}
.center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.demo-ruleForm{
    border: 1px solid #dcdfe6;
    padding:30px 30px 10px 10px;
    border-radius:15px;
}
</style>