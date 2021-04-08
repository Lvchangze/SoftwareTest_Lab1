<template>
  <div id="base_login"
       style="height: 100%;">
    <div class="login_container">
      <el-form :model="loginForm"
               :rules="rules"
               label-position="top"
               label-width="0px"
               size="small"
               style="width: 260px;margin: auto"
               v-loading="loading">
        <div class="login_title" style="">登录</div>
        <el-form-item prop="username" label="帐号" class="form-label" style="text-align: left"
                      label-width="80px">
          <el-input type="text"
                    v-model="loginForm.username"
                    auto-complete="off"
                    placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" class="form-label" style="text-align: left" label-width="80px">
          <el-input type="password"
                    v-model="loginForm.password"
                    auto-complete="off"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary"
                     style="background-color: #356eff;border-color: #356eff;width: 260px;border-radius: 3px;margin-top: 25px;margin-bottom: 5px"
                     v-on:click="login" round>登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  created() {
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '账号不得为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不得为空', trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    login() {
      if (this.loginForm.username === "" ||
        this.loginForm.password === "") {
        this.$message.error('用户名和密码不得为空');
        return;
      }
      this.$axios.post('/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      })
        .then(resp => {
          if (resp.status === 200) {
            this.$store.commit('setCurrentUsername', this.loginForm.username);
            this.$router.replace({path: '/Main'})
          }
        })
        .catch(error =>
          console.log(error)
        );
    }
  }
}
</script>
<style scoped>
#base_login {
  background: url("../assets/bg.jpeg") repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0;
  padding: 0;
}

.login_container {
  border-radius: 3px;
  background-clip: padding-box;
  top: 50%;
  position: relative;
  height: 382px;
  margin: -217px auto;
  width: 330px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 5px auto 45px auto;
  text-align: center;
  font-size: 32px;
  color: black;
}
</style>
<style>
.login_container .form-label .el-form-item__label {
  padding-bottom: 3px;
  color: #888888;
  font-size: 12px;
}
</style>
