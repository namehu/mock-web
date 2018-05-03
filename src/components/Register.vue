<template>
  <div class="register">
    <div class="back-image"></div>
    <div class="content">
      <div>用户名</div>
      <div>
        <el-input type="primary"
          v-model="userName"
          @focus="focusUserName"
          @blur="blurUserName"
          @input.native="changeUserName"
          clearable
          placeholder="请输入用户名"></el-input>
      </div>
      <div>密码</div>
      <div>
        <el-input type="primary"
          v-model="password"
          clearable
          placeholder="请输入密码"></el-input>
      </div>
      <div>确认密码</div>
      <div>
        <el-input type="primary"
            v-model="confirmPassword"
            clearable
            placeholder="请输入密码"></el-input>
      </div>
      <div>
        <el-button type="primary"
          :disabled="disabled"
          @click="register"
          style="width: 100%;"
        >注册</el-button>
      </div>
      <div class="tip">
       <div v-show="showUserTip"
         class="user-tip">
         <div>
           <i class="el-icon-circle-check"
            :class="{'success': userNameNotEmpty}"
           ></i>
           用户名不能为空</div>
         <div>
           <i class="el-icon-circle-check"
              :class="{'success': userNameLength}"
           ></i>
           用户名不少于两位</div>
       </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { register } from '../api';

export default {
  data() {
    return {
      userName: '',
      password: '',
      confirmPassword: '',
//      disabled: true,
      showUserTip: false,
      userNameNotEmpty: false,
      userNameLength: false,
    };
  },
  computed: {
    disabled() {
      return !(
        this.userNameNotEmpty &&
        this.userNameLength
      )
    },
  },
  methods: {
    focusUserName() {
      this.showUserTip = true;
    },
    blurUserName() {
      this.showUserTip = false;
    },
    changeUserName(event) {
      this.userNameNotEmpty = !!event.target.value;
      this.userNameLength = (event.target.value || '').length > 2;
    },
    register() {
      register(this.userName, this.password).then((data) => {
        console.log(data);
        if (data.code && data.code === 200) {
          this.$router('/afa')
        }
      })
    }
  },
};
</script>

<style scoped lang="scss">
.register {

  .back-image {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    background: url("/static/images/login.jpg") no-repeat;
  }

  .content {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 300px;

    & > div {
      margin-bottom: 10px;
    }

    & > div:nth-child(odd) {
      color: #ffffff;
    }

    .tip {
      position: absolute;
      z-index: 2;
      color: #ffffff;
      font-size: 12px;

      i {
        font-size: 20px;
      }
      i.success {
        color: green;
      }
    }
  }



}


</style>
