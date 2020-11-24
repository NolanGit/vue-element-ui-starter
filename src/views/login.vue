<template>
  <section class="background" :style="myBackgroundStyle">
    <el-form
      :model="loginForm"
      :rules="loginFormRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
      v-show="loginForm.show"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input
          type="text"
          v-model="loginForm.account"
          @keyup.enter.native="login"
          auto-complete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="loginForm.checkPass"
          @keyup.enter.native="login"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click.native.prevent="login"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>

    <el-form
      :model="autoLoginForm"
      ref="autoLoginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
      v-show="autoLoginForm.show"
    >
      <h3 class="title">系统登录</h3>
      <div>
        <img class="avatar" :src="autoLoginForm.image" />
      </div>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="autoLoginClicked"
          :loading="logining"
          >使用{{ autoLoginForm.userName }}登录</el-button
        >
        <el-button
          type="text"
          size="mini"
          @click="
            autoLoginForm.show = false;
            loginForm.show = true;
          "
          :loading="logining"
          >不是我？</el-button
        >
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { requestLogin, getBackground, clientIp } from "@/views/api";
import md5 from "js-md5";
import axios from "axios";
import Router from "vue-router";
const api = {
  userLogin: "login/userLogin",
  userLoginSalt: "login/userLoginSalt"
};
export default {
  data() {
    return {
      logining: false,
      loginForm: {
        show: true,
        account: "",
        checkPass: ""
      },
      loginFormRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      myBackgroundStyle: "",
      autoLoginForm: {
        show: false,
        loginName: '',
        userName: '',
        image: ''
      }
    };
  },
  methods: {
    handleReset2() {
      this.$refs.loginForm.resetFields();
    },
    autoLoginClicked() {
      this.loginForm.account = this.autoLoginForm.loginName
      this.loginForm.checkPass = '123456'
      this.login()
    },
    getBackgroundUrl: function () {
      getBackground().then(data => {
        let { code, msg, url, copyright } = data;
        if (code !== 200) {
          this.$notify.error({
            message: msg,
            type: "error"
          });
        } else {
          this.myBackgroundStyle = {
            background: "url(" + url + ") no-repeat center",
            filter:
              "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')",
            "min-height": "100%",
            "min-width": "1024px",
            width: "100%",
            height: "auto",
            position: "fixed",
            top: "0",
            left: "0",
            "-moz-background-size": "100% 100%",
            "background-size": "100% 100%",
            "background-attachment": "fixed"
          };
          this.$message(copyright);
        }
      });
    },
    autoLogin() {
      clientIp().then(data => {
        var autoLogin = data["data"]["autoLogin"]
        if (autoLogin == 1) {
          this.autoLoginForm.image = data["data"]["avatar"]
          this.autoLoginForm.userName = data["data"]["userName"]
          this.autoLoginForm.loginName = data["data"]["loginName"]
          this.autoLoginForm.show = true
          this.loginForm.show = false
        }
      })
    },
    md5It(str) {
      str = md5(str);
      return str;
    },
    async login() {
      if (
        this.loginForm.account === "" ||
        this.loginForm.checkPass === "" ||
        this.loginForm.account === undefined ||
        this.loginForm.checkPass === undefined ||
        this.loginForm.account.length == 0 ||
        this.loginForm.checkPass.length == 0
      ) {
        this.$notify.error({
          message: "请填写用户名和密码",
          type: "error"
        });
      } else {
        try {
          const { data: res } = await axios.post(api.userLoginSalt, {
            login_name: this.loginForm.account
          });
          var para = {
            login_name: this.loginForm.account,
            password: this.md5It(
              this.md5It(this.md5It(this.loginForm.checkPass) + res.data.stable_salt) +
              res.data.salt
            ),
            is_generate_cookie: true
          };
          const { data: res2 } = await axios.post(api.userLogin, para);
          this.$message({
            message: res2.msg,
            type: "success"
          });
          sessionStorage.setItem("user", JSON.stringify(res2.user));
          this.$cookies.set("user_key", res2.user_key);
          this.$cookies.set("user", JSON.stringify(res2.user));
          this.$cookies.set("userID", JSON.stringify(res2.user_id));
          this.$router.push({ path: "/welcome" });
        } catch (e) {
          console.log(e);
          this.$message({
            message: e.response.data.msg,
            type: "error"
          });
        }
      }
    },
    logout() {
      this.$cookies.remove("user_key");
      this.$cookies.remove("user");
      this.$cookies.remove("userID");
      this.user = "";
      this.$message({
        message: "退出成功！",
        type: "success"
      });
      this.$emit("user", "");
    },
  },
  mounted() {
    this.getBackgroundUrl();
    this.autoLogin()
  }
};
</script>

<style scoped>
.login-container {
  opacity: 0.89;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #000000;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.avatar {
  width: 150px;
  margin: auto;
  text-align: center;
  display: flex;
  padding-bottom: 35px;
}
.background {
  background: #fff no-repeat center;
  filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  background-attachment: fixed;
}
</style>
