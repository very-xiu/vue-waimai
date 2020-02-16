<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">饿了麽外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWayClear(true)">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWayClear(false)">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="手机号" v-model="phone" />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{right_phone:rightPhone}"
                @click.prevent="getCode"
              >{{computeTime>0?`已发送(${computeTime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="6" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册饿了麽外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" />
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd" />
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd" />
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd?'abc':'....'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="https://www.eleme.cn/waimai" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>

    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip" />
  </section>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip.vue";
import { reqPwdLogin, reqSmsLogin, reqSendCode } from "../../api";

export default {
  data() {
    return {
      loginWay: true, //true是短信登录，false是密码登录
      phone: "", //手机号码
      showPwd: false, //是否显示密码
      computeTime: 0, //计时时间
      pwd: "", //密码
      name: "", //用户名
      code: "", //短信验证码
      captcha: "", //图片验证码
      alertText: "", //提示的文本内容
      alertShow: false //是否显示提示警告框
    };
  },
  computed: {
    // 验证手机号码是否正确，才可以点击获取验证码
    rightPhone() {
      return /^1[3-9][0-9]{9}$/.test(this.phone);
    }
  },
  methods: {
    // 每次切换登录方式，清空里面的内容
    loginWayClear(isB) {
      this.showPwd = false;
      this.code = this.captcha = this.pwd = "";
      this.getCaptcha();
      return (this.loginWay = isB);
    },
    // 点击获取验证码
    async getCode() {
      // 如果当前没有计时
      if (!this.computeTime) {
        this.computeTime = 30;
        this.intervalId = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            clearInterval(this.intervalId);
          }
        }, 1000);

        // 发送ajax请求(向指定手机号发送验证码短信)
        const result = await reqSendCode(this.phone);
        if (result.code === 1) {
          // 显示提示
          this.showAlert(result.msg);
          // 停止计时
          if (this.computeTime) {
            this.computeTime = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
          }
        }
      }
    },

    // 封装一个函数
    showAlert(alertText) {
      this.alertShow = true;
      this.alertText = alertText;
    },

    // 前台表单验证
    async login() {
      let result;
      if (this.loginWay) {
        const { rightPhone, phone, code } = this;
        if (!rightPhone) {
          //手机号不正确
          this.showAlert("手机号不正确");
          return;
        } else if (!/^\d{6}$/.test(code)) {
          //短信验证码不正确
          this.showAlert("短信验证码必须是6位数字");
          return;
        }
        // 发送ajax请求短信验证码登录
        result = await reqSmsLogin(phone, code);
      } else {
        const { name, pwd, captcha } = this;
        if (!name) {
          //用户名不正确
          this.showAlert("用户名不正确");
          return;
        } else if (!pwd) {
          //密码不正确
          this.showAlert("密码不正确");
          return;
        } else if (!captcha) {
          //图片验证码不正确
          this.showAlert("图形验证码不正确");
          return;
        }
        // 发送ajax用户名密码登录
        result = await reqPwdLogin({ name, pwd, captcha });
      }

      // 无论登录成功或者失败都停止计时器计时
      if (this.computeTime) {
        this.computeTime = 0;
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }

      // 要么手机验证码登录要么用户名密码登录
      if (result.code === 0) {
        const user = result.data;
        // 将user保存到vuex中的state
        this.$store.dispatch("recordUser", user);
        // 跳转到个人中心界面
        this.$router.replace("/profile");
      } else {
        // 登录失败重新刷新图形验证码
        this.getCaptcha();
        // 提示警告信息
        const msg = result.msg;
        this.showAlert(msg);
      }
    },
    // 关闭警告框
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
    },
    // 点击获取一个新的图形验证码
    getCaptcha() {
      // console.log(event);
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    }
  },
  components: {
    AlertTip
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #009AFF;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #009AFF;
            font-weight: 700;
            border-bottom: 2px solid #009AFF;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #009AFF;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              outline: none;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: #000;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  position: absolute;
                  right: 2px;
                  top: -4px;
                  letter-spacing: 2px;
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(26px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #009AFF;
            }
          }
        }

        .login_submit {
          outline: none;
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #009AFF;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 12px;
      left: 12px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>