<template>
  <div class="topbar">
    <el-dropdown placement="bottom">
      <span class="el-dropdown-link"
        ><i class="el-icon-s-custom" style="margin-right: 5px"></i
        >{{ getUsername || "用户" }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
  name: 'Topbar',
  data() {
    return {
    };
  },
  computed: {
    getUsername: function () {
      return this.$cookies.get("username");
    }
  },
  methods: {
    logout() {
      this.$confirm('是否退出系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$cookies.remove("sid");
          this.$cookies.remove("user");
          this.$cookies.remove("userID");
          window.location.assign("https://net:4436/sec/login?ref=" + window.location.href)
        })
        .catch(() => { });
    },
  },
};
</script>
