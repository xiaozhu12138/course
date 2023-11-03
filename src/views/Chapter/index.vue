<template>
  <div class="chapter">
    <div class="chapter_left">
      <el-tree class="tree" :data="data" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="chapter_right">
      <div>
        <el-button type="primary" @click="add" style="float: right;">添加</el-button>
      </div>
      <template>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="id" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="章节" width="180">
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
              <el-button @click="opentwo(row.id)">修改</el-button>
              <el-button @click="open(row.id)">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Authorization } from "@/api/suberject.js";
import { chapter, change, del, modify } from "@/api/chapter";
export default {
  data() {
    return {
      data: [],
      tableData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      arr: [],
      arrid: [],
    };
  },
  methods: {
    async handleNodeClick(data,arrid) {
      const res = await chapter(this.$store.state.token, data.id);
      this.tableData = res.data.data;

      let list = this.$store.state.subject.list;
      if (!list) {
        const resa = await Authorization(this.$store.state.token);
        this.$store.commit("subject/writList", resa.data.data);
        list = resa.data.data;
      }
      if (!arrid) {
        list.forEach((item) => {
          arrid.push({
            id: item.id,
          });
        });
      }
      this.arrid = arrid.data.id;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    add() {
      let id = 0 + this.arrid;
      this.$prompt("请输入章节名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "名字不正确",
      })
        .then(async ({ value }) => {
          try {
            const res = await change(this.$store.state.token, {chapter_name: value,pk: id});
            console.log(res);
            this.$message({
              type: "success",
              message: "你新添加的章节是: " + value,
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
    opentwo(id) {
      this.$prompt("请输入新的名字", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          try {
            const res = await modify(this.$store.state.token, {
              chapter_name: value,
              pk: id,
            });
            // console.log(res);
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
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const res = await del(this.$store.state.token, { pk: id });
            // console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            
          } catch (e) {
            console.log(e);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
      this.data.push({
        label: item.name,
        id: item.id,
      });
    });
    const res = await chapter(this.$store.state.token, this.data[0].id);
    // console.log(res);
    this.tableData = res.data.data;
  },
};
</script>

<style scoped>
.chapter {
  display: flex;
}
.chapter_left {
  width: 200px;
}
.chapter_right {
  width: 80%;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #a8b89f;
}
.tree{
  height: 660px;
  overflow: scroll;
}
.tree::-webkit-scrollbar{
  width: 12px;
}
</style>
<style>
body{
  scrollbar-width:none;
}
</style>