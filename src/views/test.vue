
<template>
  <section>
    <el-row :gutter="40">
      <el-col :span="6">
        <div></div>
        <el-tree
          v-loading="loading.tree"
          :data="tree"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-col>
      <el-col :span="18">
        <el-row></el-row>
        <el-row>
          <div v-loading="loading.report" v-html="report + style"></div>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import axios from "axios";
const api = {
  getFullTree: "http://10.209.35.190:666/coverage/get_full_tree",
  getFullReport: "http://10.209.35.190:666/coverage/get_full_report",
}
export default {
  components: {
  },
  data() {
    return {
      taskId: undefined,
      loading: { tree: false, report: false },
      tree: [],
      reportMap: {},
      report: "",
      style: "<style scoped>.file{line-height: 20px;}.cov0{color: rgb(29 29 29);background: rgb(245 187 187);}.cov1{color: rgb(29 29 29); background: rgb(149 243 156);}.cov2{color: rgb(29 29 29); background: rgb(149 243 156);}.cov3{color: rgb(29 29 29); background: rgb(149 243 221);}.cov4{color: rgb(29 29 29); background: rgb(149 243 221);}.cov5{color: rgb(29 29 29); background: rgb(149 234 243);}.cov6{color: rgb(29 29 29); background: rgb(149 234 243);}.cov7{color: rgb(29 29 29); background: rgb(149 213 243)}.cov8{color: rgb(29 29 29); background: rgb(149 213 243)}.cov9{color: rgb(29 29 29); background: rgb(149 187 243)}.cov10{color: rgb(29 29 29); background: rgb(149 187 243)}</style>"
    }
  },
  methods: {
    node2path(node) {
      if (node.parent != null) {
        return this.node2path(node.parent) + '/' + node.data.label
      }
      else {
        return node.data[0].label
      }
    },
    handleNodeClick(x, y, z) {
      x
      y
      z
      var tempCheckedPath = this.node2path(y).split('/')
      tempCheckedPath.shift() //删除第一个元素
      tempCheckedPath = tempCheckedPath.join('/')
      let _ = tempCheckedPath.lastIndexOf(' (')
      tempCheckedPath = tempCheckedPath.slice(0, _)
      var checkedPath = tempCheckedPath


      if (y.isLeaf) {
        this.loading.tree = true
        this.getFullReport(this.taskId, this.reportMap[checkedPath])
        this.loading.tree = false
      }
    },
    //获取全量覆盖率的树
    async getFullTree(taskId) {
      this.loading.tree = true
      try {
        const { data: res } = await axios.post(api.getFullTree, {
          user_id:1,
          task_id: taskId
        });
        this.tree = res.data.tree
        this.reportMap = res.data.report_map
      } catch (e) {
        console.log(e);
        this.$message({
          message: e.response.data.msg,
          type: "error"
        });
      }
      this.loading.tree = false
    },
    //获取全量覆盖率的报告
    async getFullReport(taskId, reportKey) {
      this.loading.report = true


      try {
        const { data: res } = await axios.post(api.getFullReport, {
          user_id:1,
          task_id: taskId,
          report_key: reportKey
        });
        this.report = res.data
      } catch (e) {
        console.log(e);
        this.$message({
          message: e.response.data.msg,
          type: "error"
        });
      }
      this.loading.report = false
    },
  },
  mounted() {
    this.taskId = this.$route.query.taskId;
    if (this.taskId == undefined) {
      this.$message({
        message: "错误的任务ID！",
        type: "error"
      });
    }
    this.getFullTree(this.taskId)
  }
};
</script>

<style scoped>
body {
  background: black;
  color: rgb(80, 80, 80);
}
body,
pre,
#legend span {
  font-family: Menlo, monospace;
  font-weight: bold;
}
#topbar {
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 42px;
  border-bottom: 1px solid rgb(80, 80, 80);
}
#content {
  margin-top: 50px;
}
#nav,
#legend {
  float: left;
  margin-left: 10px;
}
#legend {
  margin-top: 12px;
}
#nav {
  margin-top: 10px;
}
#legend span {
  margin: 0 5px;
}
.cov0 {
  color: rgb(192, 0, 0);
}
.cov1 {
  color: rgb(128, 128, 128);
}
.cov2 {
  color: rgb(116, 140, 131);
}
.cov3 {
  color: rgb(104, 152, 134);
}
.cov4 {
  color: rgb(92, 164, 137);
}
.cov5 {
  color: rgb(80, 176, 140);
}
.cov6 {
  color: rgb(68, 188, 143);
}
.cov7 {
  color: rgb(56, 200, 146);
}
.cov8 {
  color: rgb(44, 212, 149);
}
.cov9 {
  color: rgb(32, 224, 152);
}
.cov10 {
  color: rgb(20, 236, 155);
}
</style>