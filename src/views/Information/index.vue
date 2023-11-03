<template>
  <div>
    <div class="block">
      <el-upload
        class="avatar-uploader block_top"
        action="https://www.chengzier.cn:8000/api/changesuperavator"
        name="avator"
        :show-file-list="false"
        :auto-upload="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        ref="upload"
        :on-change="handleAvatarChange"
        :headers="headers"
      >
        <img :src="url" class="avatar" />
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm big"
    >
      <el-form-item label="用户名" prop="pass">
        <el-input
          type="text"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 350px;" label="邮箱" prop="checkPass">
        <el-input
          type="text"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
        <el-button @click="modify" index="/modifyemail" style="position: absolute; right: -170px;">修改邮箱</el-button>
      </el-form-item>
      <el-form-item label="id" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="upload">上传</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <div v-if="state" class="zzc"></div>
      <el-form
        v-if="state"
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm zzc_exit"
      >
        <el-form-item label="邮箱" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="username">
          <el-input
            class="inp_yzm"
            type="text"
            v-model="ruleForm.verify"
            autocomplete="off"
          ></el-input>
          <el-button class="inp_obtain" @click="obtain" :disabled="disp"
            >获取验证码  
            <template>
              <span v-if="overtime">{{ time }}</span>
            </template>
          </el-button>
        </el-form-item>
        <el-button
          style="margin-left: 30%; width: 200px"
          @click="sending('ruleForm')"
          type="primary"
          >确认</el-button
        >
        <el-button
          style="margin-left: 30%; width: 200px"
          @click="dele"
          id="delete"
          >取消</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { zation } from "@/api/infmsn";
import { binding, change } from "@/api/email";
export default {
  async created() {
    try {
      const res = await zation(this.$store.state.token);
      this.ruleForm.pass = res.data.username;
      this.ruleForm.checkPass = res.data.email;
      this.ruleForm.age = res.data.id;
      if (!res.data.email) {
        this.$confirm("您还没有绑定邮箱，请尽快绑定", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.state = true;
          })
          .catch(() => {
            this.state = false;
          });
      }
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    url() {
      return this.$store.state.userProfile.avatar;
    },
  },
  data() {
    return {
      state: false,
      disp: false,
      overtime:false,
      time:60,
      a:null,
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        verify: "",
      },
      imageUrl: "",
      headers: {
        authorization: "",
      },
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
    modify(){
      this.$router.push("/modifyemail");
    },
    async obtain() {
      this.overtime = true;
      this.a = setInterval(()=>{
        this.time--;
      },1000)
      if (!this.disp) {
        this.disp = !this.disp;
      }
      let email = this.ruleForm.checkPass;
      const res = await binding({ email: email });
      
      setTimeout(()=> {
        this.disp = false;
      }, 1000 * 60);
      alert(res.data.msg);
    },
    async sending() {
      let text = this.ruleForm.verify;
      const res = await change({ text: text });
      alert(res.data.msg);
      this.state = false;
    },
    dele() {
      this.state = false;
    },
    upload() {
      this.headers["authorization"] = `Bearer ${this.$store.state.token}`;
      this.$refs.upload.submit();
      alert("上传成功");
    },
    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      const resa = await zation(this.$store.state.token);
      this.$store.state.userProfile.avatar =
        "https://www.chengzier.cn:8000/" + resa.data.avator;
    },
    handleAvatarChange(file, silelist) {
      this.$store.state.userProfile.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 28px;
  color: #8c939d;
  z-index: 100;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 15px;
}
.big {
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid #888;
  padding: 40px 40px 20px 20px;
  border-radius: 10px;
}
.square {
  position: relative;
  left: 45%;
}
.block {
  position: relative;
  height: 200px;
}
.block_top {
  position: absolute;
  left: 40%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
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
  width: 450px;
  /* height: 200px; */
  padding: 50px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 9999;
}
#delete {
  margin-top: 20px;
  margin-left: 0;
}
.inp_yzm {
  width: 50%;
}
.inp_obtain {
  font-size: 16px;
  margin-left: 15px;
  /* width:20%; */
}
</style>