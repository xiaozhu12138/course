<template>
  <div>
    <template>
      <div class="but">
        <el-input
          class="seek"
          v-model="seek"
          placeholder="请输入内容"
          clearable
        >
        </el-input>
        <el-button class="left_but" type="success" @click="newopen"
          >添加信息</el-button
        >
      </div>
      <div class="clear_top">
        <el-date-picker v-model="start_data" type="date" placeholder="选择日期">
        </el-date-picker>
        <el-date-picker v-model="end_data" type="date" placeholder="选择日期">
        </el-date-picker>
        <el-button @click="search">查询</el-button>
        <el-button @click="resct">重置</el-button>
      </div>
    </template>

    <el-table :data="ifmetion" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <template #default="{ row }">
          <p>{{ new Date(row.create_time).toLocaleString() }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更改时间">
        <template #default="{ row }">
          <p>{{ new Date(row.update_time).toLocaleString() }}</p>
        </template>
      </el-table-column>
      <el-table-column #default="{ row }">
        <el-button type="warning" @click="open_change(row.id)">修改</el-button>
        <el-button type="danger" @click="open(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="custom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 6, 8]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Authorization, del, once, change } from "@/api/suberject.js";
export default {
  data() {
    return {
      ifmetion: [],
      seek: "",
      start_data: null,
      end_data: null,
      currentPage: 1,
      cloneifmetion:[],
    };
  },
  computed:{
    total(){
      return this.cloneifmetion.length
    }
  },
  watch: {
    seek: {
      handler(val) {
        console.log(val);
        this.ifmetion = this.ifmetion.filter((p) => {
          return p.name.indexOf(val) !== -1;
        });
      },
    },
  },
  async created() {
    try {
      const res = await Authorization(this.$store.state.token);
      // console.log(res);
      this.$store.commit("subject/writList", res.data.data);
      this.ifmetion = res.data.data;
      this.cloneifmetion = this.ifmetion
      this.ifmetion = this.ifmetion.slice(0,4)
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const { data } = await del(this.$store.state.token, { pk: id });
            if (data.status == "success") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message.error(data.msg);
            }
          } catch (e) {
            this.$message.error(data.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    newopen() {
      this.$prompt("请输入名字", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "名字不正确",
      })
        .then(async ({ value }) => {
          try {
            const res = await once(this.$store.state.token, { name: value });
            console.log(res.data.title);
            this.$message({
              type: "success",
              message: "你的名字是: " + value,
            });
          } catch (e) {}
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    open_change(id) {
      this.$prompt("请输入新的名字", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          console.log(111);
          try {
            const res = await change(this.$store.state.token, {
              name: value,
              pk: id,
            });
            console.log(res);
            this.$message({
              type: "success",
              message: "你的名字改为: " + value,
            });
          } catch (e) {
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
    search() {
      let startTime = this.start_data.getTime();
      let endTime = this.end_data.getTime();
      let newArr = this.ifmetion.filter((item) => {
        let time = new Date(item.create_time).getTime();
        if (time >= startTime && time <= endTime) {
          return true;
        }
      });
      this.ifmetion = newArr;
    },
    async resct() {
      this.start_data = null;
      this.end_data = null;
      const res = await Authorization(this.$store.state.token);
      this.$store.commit("subject/writList", res.data.data);
      this.ifmetion = res.data.data;
    },
    handleSizeChange(val) {
      
      this.ifmetion = this.cloneifmetion.slice(0,val )
    },
    handleCurrentChange(val) {
      this.ifmetion = this.cloneifmetion.slice((val -1 ) * 4, val * 4 )
    },
  },
};
</script>

<style scoped>
.but {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}
.left_but {
  float: right;
}
.seek {
  width: 60%;
}
.clear_top > div {
  margin-right: 20px;
}
.custom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>