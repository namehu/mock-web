<template>
  <div class="login">
    <div class="background-image"></div>
    <div class="login-wrapper">
      <div class="content">
        <Input v-model="username"
          clearable
          placeholder="请输入用户名"></Input>
      </div>
      <div class="content"
        style="position: relative;">
        <Input v-model="password"
          clearable
          :type="inputType"
          placeholder="请输入密码">
        </Input>
        <Icon :type="inputIcon"
          class="icon-eye"
          @click.native="handleIconClick"></Icon>
      </div>
      <div>
        <Button type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="login"
          style="width:100%;height: 40px;">登录</Button>
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
      inputIcon: 'ios-eye-outline',
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
        this.inputIcon = 'ios-eye';
      } else {
        this.inputType = 'password';
        this.inputIcon = 'ios-eye-outline';
      }
    },
    login() {
      this.loading = true;
      login(this.username, this.password)
        .then(res => {
          this.loading = false;
          this.$Notice.success({
            title: '登录成功',
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

  .icon-eye {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2em;
    left: 10px;
    cursor: pointer;
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
.login .ivu-input-wrapper input {
  background-color: rgba(255, 255, 255, 0);
  color: #ffffff;
  text-align: center;
  height: 40px;
}
</style>
