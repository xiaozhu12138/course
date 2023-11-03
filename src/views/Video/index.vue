<template>
  <div class="videoplus">
    <div class="video">
      <p>课程</p>
      <el-tree
        style="width: 130px"
        :data="subjectList"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div>
      <p>章节</p>
      <el-tree
        style="width: 130px"
        :data="chapterList"
        :props="defaultPropss"
        @node-click="handleNodeClicks"
      ></el-tree>
    </div>
    <div v-if="olad">
      <div>
        <el-button @click="show">上传视频</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="create_time" label="日期" width="150">
          <template #default="{ row }">
            <p>{{ new Date(row.create_time).toLocaleString() }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="视频名称" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="textopen(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="delete_video(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click="play_video(scope.row)" type="text" size="small"
              >播放</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="zzc" v-if="chuan"></div>
    <div class="list" v-if="chuan">
      <el-input
        placeholder="请输入视频名称"
        v-model="video.name"
        style="margin-bottom: 25px"
        clearable
      >
      </el-input>
      <el-upload
        class="upload-demo"
        drag
        :data="video"
        action="https://www.chengzier.cn:8000/api/chapter_video"
        name="video"
        multiple
        :headers="headers"
        :on-success="success"
        :on-change="progress"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-button @click="no_show" style="margin-top: 25px">取消上传</el-button>
    </div>
    <div class="show_zzc" v-if="play_show"></div>
    <div class="show" v-if="play_show">
      <p
        @click="del_show"
        style="font-size: 20px; text-align: right; cursor: pointer"
      >
        x
      </p>
      <video
        :data="plays"
        controls
        muted
        loop
        width="400px"
        height="300px"
        :src="plays.path"
      ></video>
    </div>
  </div>
</template>

<script>
import { Authorization } from "@/api/suberject.js";
import { chapter } from "@/api/chapter";
import { videochapter, videochapterlist, del, text } from "@/api/video";
export default {
  data() {
    return {
      tableData: [],
      olad: false,
      chuan: false,
      play_show: false,
      chapterList: [],
      obj: {
        id: "",
      },
      ids:{
        id:null,
        id2:null,

      },
      headers: {
        authorization: "",
      },
      plays: {
        path: "",
      },
      video: {
        chapter_id: null,
        video: "",
        name: "",
        video_permission: 1,
      },
      subjectList: [],
      defaultProps: {
        label: this.subjectList,
      },
      defaultPropss: {
        label: this.chapterList,
      },
    };
  },
  methods: {
     textopen(row) {
      this.$prompt("请输入新的名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          try{
            let pk = row.id;
            let chapter_id = row.chapter_id;
            let name = value;
            const res = await text({pk, chapter_id, name});
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          }catch(e){
            console.log(e);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    async delete_video(row) {
      console.log(row);
      const res = await del({ pk: row.id });
      console.log(res);
    },
    show() {
      this.chuan = true;
    },
    no_show() {
      this.chuan = !this.chuan;
    },
    play_video(row) {
      this.play_show = !this.play_show;
      let path = row.mp4_url.slice(0, -4);
      path = "https://www.chengzier.cn:9000/api/videoplay?path=" + path;
      this.plays.path = path;
    },
    del_show() {
      this.play_show = !this.play_show;
    },
    async handleNodeClick(data) {
      this.olad = false;
      this.chapterList = [];
      let pk = 0 + data.id;
      this.obj.id = pk;
      let booke = this.$store.state.bookarr.booke;
      const resarr = await chapter(this.$store.state.token, pk);
      this.$store.commit("bookarr/writList", resarr.data.data);
      booke = resarr.data.data;
      if (booke) {
        booke.forEach((item) => {
          this.chapterList.push({
            label: item.name,
            id: item.id,
          });
        });
      }
    },
    async handleNodeClicks(data) {
      this.olad = true;
      let id = this.obj.id;
      this.ids.id = id;
      let id2 = 0 + data.id;
      this.ids.id2 = id2;
      this.video.chapter_id = id2;
      const res = await videochapter({ pk: id }, id2);
      this.tableData = res.data.data;
    },
    progress(file) {
      this.video.video = file.name;
      this.headers["authorization"] = `Bearer ${this.$store.state.token}`;
    },
    async success() {
      this.chuan = !this.chuan;
    },
  },
  async created() {
    let list = this.$store.state.subject.list;
    // console.log(list);
    if (!list) {
      const res = await Authorization(this.$store.state.token);
      this.$store.commit("subject/writList", res.data.data);
      list = res.data.data;
    }
    list.forEach((item) => {
      this.subjectList.push({
        label: item.name,
        id: item.id,
      });
    });
  },
};
</script>

<style scoped>
.video {
  /* display: flex; */
  width: 130px;
  height: 670px;
  overflow: scroll;
}
.video::-webkit-scrollbar {
  width: 12px;
}
.videoplus {
  display: flex;
  /* justify-content: space-between; */
}
.list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 20px;
  padding: 50px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}
.list > video {
  margin-top: 100px;
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
.show_zzc {
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
.show {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 20px;
  padding: 50px;
  z-index: 9999;
}
p{
  text-align: center;
}
</style>