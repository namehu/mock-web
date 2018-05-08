<template>
  <div class="register">
    <div class="back-image"></div>
    <Particles></Particles>
    <Particles></Particles>
    <div class="content">
      <div>
        <el-input v-model="userName"
          @focus="focusUserName"
          @blur="blurUserName"
          @input.native="changeUserName"
          :class="{'error': userNameError}"
          clearable
          placeholder="请输入用户名"></el-input>
      </div>
      <div>
        <el-input v-model="password"
          @focus="focusPwd"
          @blur="blurPwd"
          @input.native="changePwd"
          :class="{'error': pwdError}"
          :type="inputType"
          clearable
          placeholder="请输入密码">
          <i class="el-icon-view input-prefix-icon"
            slot="prefix"
            @click="handleIconClick">
          </i>
        </el-input>
      </div>
      <div>
        <el-input v-model="confirmPassword"
          @focus="focusConfirmPwd"
          @blur="blurConfirmPwd"
          @input.native="changeConfirmPwd"
          :class="{'error': confrimPwdError}"
          :type="inputType"
          clearable
          placeholder="请再次输入密码"></el-input>
      </div>
      <div>
        <el-button type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="register"
          style="width: 100%;">注册</el-button>
      </div>
      <div class="tip">
        <!-- 用户名注册提示 -->
        <div v-show="showUserTip"
          class="user-tip">
          <div>
            <i class="el-icon-circle-check"
              :class="{'success': userNameNotEmpty}"></i>
            用户名不能为空</div>
          <div>
            <i class="el-icon-circle-check"
              :class="{'success': userNameLength}"></i>
            用户名不少于两位</div>
        </div>
        <!-- 密码相关提示 -->
        <div v-show="showPwdTip"
          class="pwd-tip">
          <div>
            <i class="el-icon-circle-check"
              :class="{'success': pwdLength}"></i>
            密码不少于6位</div>
          <div>
            <i class="el-icon-circle-check"
              :class="{'success': pwdContainCUppercase}"></i>
            包含一个大写英文</div>
          <div>
            <i class="el-icon-circle-check"
              :class="{'success': pwdContainCSepcialChar}"></i>
            包含一个特殊字符</div>
        </div>
        <!-- 确认密码相关提示 -->
        <div v-show="showConfirmPwdTip"
          class="pwd-tip">
          <div>
            <i class="el-icon-circle-check"
              :class="{'success': confimrPwdLength}"></i>
            密码不少于6位</div>
          <div>
            <i class="el-icon-circle-check"
              :class="{'success': confimrPwdContainCUppercase}"></i>
            包含一个大写英文</div>
          <div>
            <i class="el-icon-circle-check"
              :class="{'success': confimrPwdContainCSepcialChar}"></i>
            包含一个特殊字符</div>
        </div>
        <!-- 密码不一致 -->
        <div v-show="!passwordSame&& !first"
          style="color: #f56c6c;">
          <i class="el-icon-circle-close"></i>
          密码不一致</div>
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
      return !(
        this.password !== '' &&
        this.confirmPassword !== '' &&
        this.password !== this.confirmPassword
      );
    },
  },
  methods: {
    hanldeFunction(param) {
      console.log(param);
    },
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
      } else {
        this.inputType = 'password';
      }
    },
    register() {
      this.loading = true;
      register(this.userName, this.password).then(data => {
        if (data.code && data.code === 200) {
          this.$notify({
            message: '注册成功',
            type: 'success',
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
  }
}
</style>

<style lang="scss">
.register .el-input input {
  background-color: rgba(255, 255, 255, 0);
  color: #ffffff;
  text-align: center;
  /*box-shadow: 0 0px 2px #e4e4e4;*/
}
.register .el-input.error {
  input {
    border: 1px solid #f56c6c;
  }
}

.register i.input-prefix-icon {
  position: relative;
  top: 12px;
  font-size: 18px;
  left: 3px;
}
</style>

