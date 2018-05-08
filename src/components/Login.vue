<template>
  <div class="login">
    <div class="background-image"></div>
    <div class="login-wrapper">
      <!--<div class="title">用户名</div>-->
      <div class="content">
        <el-input v-model="username"
          clearable
          placeholder="请输入用户名"></el-input>
      </div>
      <!--<div class="title">密码</div>-->
      <div class="content">
        <el-input v-model="password"
          clearable
          :type="inputType"
          placeholder="请输入密码">
          <i class="el-icon-view input-prefix-icon"
            slot="prefix"
            @click="handleIconClick">
          </i>
        </el-input>
      </div>
      <div>
        <el-button type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="login"
          style="width:100%;">登录</el-button>
      </div>
      <div class="other-operation">
        <span @click="$router.push('/register')">注册</span>/
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
      disabled: true,
      inputType: 'password',
      loading: false,
    };
  },
  watch: {
    username() {
      this.validInput();
    },
    password() {
      this.validInput();
    },
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
    handleIconClick() {
      if (this.inputType === 'password') {
        this.inputType = 'text';
      } else {
        this.inputType = 'password';
      }
    },
    login() {
      this.loading = true;
      login(this.username, this.password)
        .then(res => {
          this.loading = false;
          this.$notify({
            // title: '成功',
            message: '登录成功',
            type: 'success',
          });
          if (res.code && res.code === 200) {
            this.$store.commit('UPDATE_USER_INFO', {
              name: this.username,
            });
            this.$router.push('/');
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../config';
.login {
  & > .background-image {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    background: url('/static/images/mock-bg.jpg') no-repeat;
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
    margin-bottom: 20px;
  }

  .other-operation {
    margin-top: 15px;
    font-size: 12px;
    text-align: right;

    & > span {
      cursor: pointer;
      margin: 5px;

      &:hover {
        color: $blue;
      }
    }
  }
}
</style>

<style lang="scss">
.login .el-input input {
  background-color: rgba(255, 255, 255, 0);
  color: #ffffff;
  text-align: center;
  /*box-shadow: 0 0px 2px #e4e4e4;*/
}

.login i.input-prefix-icon {
  position: relative;
  top: 12px;
  font-size: 18px;
  left: 3px;
}
</style>
