<template>
  <div class="login">
    <div class="background-image"></div>
    <div class="login-wrapper">
      <div class="title">用户名</div>
      <div class="content">
        <el-input v-model="username"
          clearable
          placeholder="请输入用户名"></el-input>
      </div>
      <div class="title">密码</div>
      <div class="content">
        <el-input v-model="password"
          clearable
          type="password"
          placeholder="请输入密码"></el-input>
      </div>
      <div>
        <el-button type="primary"
          :disabled="disabled"
          @click="login"
          style="width:100%;">登录</el-button>
      </div>
      <div>
        <span>注册</span>/
        <span>忘记密码?</span>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../api';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      disabled: true
    };
  },
  watch: {
    username() {
      this.validInput();
    },
    password() {
      this.validInput();
    }
  },
  methods: {
    validInput() {
      if (
        this.password &&
        this.password.length >= 6 &&
        this.username &&
        this.username.length >= 4
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    login() {
      login(this.username, this.password)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  & > .background-image {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    background: url("/static/images/mock-bg.jpg") no-repeat;
  }

  & > .login-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    width: 300px;
    /* text-align: center; */
    color: #e4e4e4;
    transform: translate(-50%, -50%);
  }

  & > .login-wrapper > .title,
  & > .login-wrapper > .content {
    font-size: 14px;
    margin-bottom: 15px;
  }
}


</style>
