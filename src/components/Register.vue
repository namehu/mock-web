<template>
  <div class="register">
    <div class="back-image"></div>
    <Particles></Particles>
    <div class="content">
      <div>
        <Input v-model="userName"
          @on-focus="focusUserName"
          @on-blur="blurUserName"
          @input.native="changeUserName"
          :class="{'error': userNameError}"
          clearable
          size="large"
          placeholder="请输入用户名"></Input>
      </div>
      <div style="position:relative;">
        <Input v-model="password"
          @on-focus="focusPwd"
          @on-blur="blurPwd"
          @input.native="changePwd"
          :class="{'error': pwdError}"
          :type="inputType"
          clearable
          size="large"
          placeholder="请输入密码">
        </Input>
        <Icon :type="inputIcon"
          class="icon-eye"
          @click.native="handleIconClick"></Icon>
      </div>
      <div>
        <Input v-model="confirmPassword"
          @on-focus="focusConfirmPwd"
          @on-blur="blurConfirmPwd"
          @input.native="changeConfirmPwd"
          :class="{'error': confrimPwdError}"
          :type="inputType"
          clearable
          size="large"
          placeholder="请再次输入密码"></Input>
      </div>
      <div>
        <Button type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="register"
          size="large"
          style="width: 100%;">注册</Button>
      </div>
      <div class="tip">
        <!-- 用户名注册提示 -->
        <div v-show="showUserTip"
          class="user-tip">
          <div>
            <Icon type="checkmark-circled"
              :class="{'success': userNameNotEmpty}"></Icon>
            用户名不能为空</div>
          <div>
            <Icon type="checkmark-circled"
              :class="{'success': userNameLength}"></Icon>
            用户名不少于两位</div>
        </div>
        <!-- 密码相关提示 -->
        <div v-show="showPwdTip"
          class="pwd-tip">
          <div>
            <Icon type="checkmark-circled"
              :class="{'success': pwdLength}"></Icon>
            密码不少于6位</div>
          <div>
            <Icon type="checkmark-circled"
              :class="{'success': pwdContainCUppercase}"></Icon>
            包含一个大写英文</div>
          <div>
            <Icon type="checkmark-circled"
              :class="{'success': pwdContainCSepcialChar}"></Icon>
            包含一个特殊字符</div>
        </div>
        <!-- 确认密码相关提示 -->
        <div v-show="showConfirmPwdTip"
          class="pwd-tip">
          <div>
            <Icon type="checkmark-circled"
              :class="{'success': confimrPwdLength}"></Icon>
            密码不少于6位</div>
          <div>
            <Icon type="checkmark-circled"
              :class="{'success': confimrPwdContainCUppercase}"></Icon>
            包含一个大写英文</div>
          <div>
            <Icon type="checkmark-circled"
              :class="{'success': confimrPwdContainCSepcialChar}"></Icon>
            包含一个特殊字符</div>
        </div>
        <!-- 密码不一致 -->
        <div v-show="!passwordSame&& !first"
          style="color: #f56c6c;">
          <Icon type="close-circled"></Icon>
          密码不一致
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '../api';
import Particles from './Particles';

export default {
  components: {
    Particles,
  },
  data() {
    return {
      //      disabled: true,
      inputType: 'password',
      inputIcon: 'ios-eye-outline',
      loading: false,
      first: true,
      // 用户名相关
      userName: '',
      showUserTip: false,
      userNameError: false,
      userNameNotEmpty: false,
      userNameLength: false,
      // 密码相关
      password: '',
      showPwdTip: false,
      pwdError: false,
      pwdLength: false,
      pwdContainCUppercase: false,
      pwdContainCSepcialChar: false,
      // 确认密码
      confirmPassword: '',
      showConfirmPwdTip: false,
      confrimPwdError: false,
      confimrPwdLength: false,
      confimrPwdContainCUppercase: false,
      confimrPwdContainCSepcialChar: false,
    };
  },
  computed: {
    disabled() {
      return !(
        this.userNameNotEmpty &&
        this.userNameLength &&
        this.pwdLength &&
        this.pwdContainCUppercase &&
        this.pwdContainCSepcialChar &&
        this.passwordSame
      );
    },
    passwordSame() {
      return (
        this.password !== '' &&
        this.confirmPassword !== '' &&
        this.password === this.confirmPassword
      );
    },
  },
  methods: {
    initTip() {
      this.showUserTip = false;
      this.showPwdTip = false;
      this.showConfirmPwdTip = false;
    },
    focusUserName() {
      this.initTip();
      this.showUserTip = true;
    },
    blurUserName() {
      this.showUserTip = false;
      this.userNameError = !(this.userNameNotEmpty && this.userNameLength);
    },
    changeUserName(event) {
      this.userNameNotEmpty = !!event.target.value;
      this.userNameLength = (event.target.value || '').length >= 2;
      this.userNameError = !(this.userNameNotEmpty && this.userNameLength);
    },
    focusPwd() {
      this.initTip();
      this.showPwdTip = true;
    },
    blurPwd() {
      this.showPwdTip = false;
      this.pwdError = !(
        this.pwdLength &&
        this.pwdContainCUppercase &&
        this.pwdContainCSepcialChar
      );
    },
    changePwd(event) {
      this.first = false;
      const value = event.target ? event.target.value || '' : '';
      this.pwdLength = value.length >= 6;
      this.pwdContainCUppercase = /[A-Z]+/.test(value);
      /* eslint-disable no-useless-escape */
      const Reg = /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/;
      this.pwdContainCSepcialChar = Reg.test(value);
      this.pwdError = !(
        this.pwdLength &&
        this.pwdContainCUppercase &&
        this.pwdContainCSepcialChar
      );
    },
    focusConfirmPwd() {
      this.initTip();
      this.showConfirmPwdTip = true;
    },
    blurConfirmPwd() {
      this.showConfirmPwdTip = false;
      this.confrimPwdError = !(
        this.confimrPwdLength &&
        this.confimrPwdContainCUppercase &&
        this.confimrPwdContainCSepcialChar
      );
    },
    changeConfirmPwd(event) {
      this.first = false;
      const value = event.target ? event.target.value || '' : '';
      this.confimrPwdLength = value.length >= 6;
      this.confimrPwdContainCUppercase = /[A-Z]+/.test(value);
      /* eslint-disable no-useless-escape */
      const Reg = /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/;
      this.confimrPwdContainCSepcialChar = Reg.test(value);
      this.confrimPwdError = !(
        this.confimrPwdLength &&
        this.confimrPwdContainCUppercase &&
        this.confimrPwdContainCSepcialChar
      );
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
    register() {
      this.loading = true;
      register(this.userName, this.password).then(data => {
        if (data.code && data.code === 200) {
          this.$Notice.success({
            title: '注册成功',
          });
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../config.scss';
.register {
  .back-image {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    background: url('/static/images/mock-bg.jpg') no-repeat;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 300px;

    & > div {
      margin-bottom: 20px;
    }

    & > div:nth-child(odd) {
      color: $white;
    }

    .tip {
      position: absolute;
      z-index: 2;
      color: $white;
      font-size: 12px;

      i {
        font-size: 14px;
      }
      i.success {
        color: $orange;
      }
    }

    .icon-eye {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2em;
      left: 10px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.register .ivu-input-wrapper input {
  background-color: rgba(255, 255, 255, 0);
  color: #ffffff;
  text-align: center;
  // height: 40px;
  /*box-shadow: 0 0px 2px #e4e4e4;*/
}
.register .ivu-input-wrapper.error {
  input {
    border: 1px solid #f56c6c;
  }
}
</style>

