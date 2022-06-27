webpackJsonp([7],{"F/pk":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("lC5x"),s=a.n(n),i=a("J0Oq"),r=a.n(i),o={props:{alertText:String},methods:{closeTip:function(){this.$emit("closeTip")}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"alert_container"},[a("section",{staticClass:"tip_text_container"},[t._m(0),t._v(" "),a("p",{staticClass:"tip_text"},[t._v(t._s(t.alertText))]),t._v(" "),a("div",{staticClass:"confrim",on:{click:t.closeTip}},[t._v("确认")])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip_icon"},[e("span"),this._v(" "),e("span")])}]};var l=a("C7Lr")(o,c,!1,function(t){a("wjvn")},"data-v-74055de1",null).exports,p=a("gyMJ"),u={data:function(){return{loginWay:!0,phone:"",showPwd:!1,computeTime:0,pwd:"",name:"",code:"",captcha:"",alertText:"",alertShow:!1}},computed:{rightPhone:function(){return/^1[3-9][0-9]{9}$/.test(this.phone)}},methods:{loginWayClear:function(t){return this.showPwd=!1,this.code=this.captcha=this.pwd="",this.getCaptcha(),this.loginWay=t},getCode:function(){var t=this;return r()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.computeTime){e.next=7;break}return t.computeTime=30,t.intervalId=setInterval(function(){t.computeTime--,t.computeTime<=0&&clearInterval(t.intervalId)},1e3),e.next=5,Object(p.f)(t.phone);case 5:1===(a=e.sent).code&&(t.showAlert(a.msg),t.computeTime&&(t.computeTime=0,clearInterval(t.intervalId),t.intervalId=void 0));case 7:case"end":return e.stop()}},e,t)}))()},showAlert:function(t){this.alertShow=!0,this.alertText=t},login:function(){var t=this;return r()(s.a.mark(function e(){var a,n,i,r,o,c,l,u,h;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=void 0,!t.loginWay){e.next=16;break}if(n=t.rightPhone,i=t.phone,r=t.code,n){e.next=8;break}return t.showAlert("手机号不正确"),e.abrupt("return");case 8:if(/^\d{6}$/.test(r)){e.next=11;break}return t.showAlert("短信验证码必须是6位数字"),e.abrupt("return");case 11:return e.next=13,Object(p.k)(i,r);case 13:a=e.sent,e.next=33;break;case 16:if(o=t.name,c=t.pwd,l=t.captcha,o){e.next=22;break}return t.showAlert("用户名不正确"),e.abrupt("return");case 22:if(c){e.next=27;break}return t.showAlert("密码不正确"),e.abrupt("return");case 27:if(l){e.next=30;break}return t.showAlert("图形验证码不正确"),e.abrupt("return");case 30:return e.next=32,Object(p.d)({name:o,pwd:c,captcha:l});case 32:a=e.sent;case 33:t.computeTime&&(t.computeTime=0,clearInterval(t.intervalId),t.intervalId=void 0),0===a.code?(u=a.data,t.$store.dispatch("recordUser",u),t.$router.replace("/profile")):(t.getCaptcha(),h=a.msg,t.showAlert(h));case 35:case"end":return e.stop()}},e,t)}))()},closeTip:function(){this.alertShow=!1,this.alertText=""},getCaptcha:function(){this.$refs.captcha.src="http://localhost:4000/captcha?time="+Date.now()}},components:{AlertTip:l}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"loginContainer"},[a("div",{staticClass:"loginInner"},[a("div",{staticClass:"login_header"},[a("h2",{staticClass:"login_logo"},[t._v("饿了麽外卖")]),t._v(" "),a("div",{staticClass:"login_header_title"},[a("a",{class:{on:t.loginWay},attrs:{href:"javascript:;"},on:{click:function(e){return t.loginWayClear(!0)}}},[t._v("短信登录")]),t._v(" "),a("a",{class:{on:!t.loginWay},attrs:{href:"javascript:;"},on:{click:function(e){return t.loginWayClear(!1)}}},[t._v("密码登录")])])]),t._v(" "),a("div",{staticClass:"login_content"},[a("form",{on:{submit:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[a("div",{class:{on:t.loginWay}},[a("section",{staticClass:"login_message"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{type:"text",maxlength:"11",placeholder:"手机号"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}}),t._v(" "),a("button",{staticClass:"get_verification",class:{right_phone:t.rightPhone},attrs:{disabled:!t.rightPhone},on:{click:function(e){return e.preventDefault(),t.getCode.apply(null,arguments)}}},[t._v(t._s(t.computeTime>0?"已发送("+t.computeTime+"s)":"获取验证码"))])]),t._v(" "),a("section",{staticClass:"login_verification"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{type:"text",maxlength:"6",placeholder:"验证码"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}})]),t._v(" "),t._m(0)]),t._v(" "),a("div",{class:{on:!t.loginWay}},[a("section",[a("section",{staticClass:"login_message"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",maxlength:"11",placeholder:"手机/邮箱/用户名"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),a("section",{staticClass:"login_verification"},[t.showPwd?a("input",{directives:[{name:"model",rawName:"v-model",value:t.pwd,expression:"pwd"}],attrs:{type:"text",maxlength:"8",placeholder:"密码"},domProps:{value:t.pwd},on:{input:function(e){e.target.composing||(t.pwd=e.target.value)}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.pwd,expression:"pwd"}],attrs:{type:"password",maxlength:"8",placeholder:"密码"},domProps:{value:t.pwd},on:{input:function(e){e.target.composing||(t.pwd=e.target.value)}}}),t._v(" "),a("div",{staticClass:"switch_button",class:t.showPwd?"on":"off",on:{click:function(e){t.showPwd=!t.showPwd}}},[a("div",{staticClass:"switch_circle",class:{right:t.showPwd}}),t._v(" "),a("span",{staticClass:"switch_text"},[t._v(t._s(t.showPwd?"abc":"...."))])])]),t._v(" "),a("section",{staticClass:"login_message"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.captcha,expression:"captcha"}],attrs:{type:"text",maxlength:"11",placeholder:"验证码"},domProps:{value:t.captcha},on:{input:function(e){e.target.composing||(t.captcha=e.target.value)}}}),t._v(" "),a("img",{ref:"captcha",staticClass:"get_verification",attrs:{src:"http://localhost:4000/captcha",alt:"captcha"},on:{click:t.getCaptcha}})])])]),t._v(" "),a("button",{staticClass:"login_submit"},[t._v("登录")])]),t._v(" "),a("a",{staticClass:"about_us",attrs:{href:"https://www.eleme.cn/waimai"}},[t._v("关于我们")])]),t._v(" "),a("a",{staticClass:"go_back",attrs:{href:"javascript:"},on:{click:function(e){return t.$router.back()}}},[a("i",{staticClass:"iconfont icon-jiantou2"})])]),t._v(" "),a("AlertTip",{directives:[{name:"show",rawName:"v-show",value:t.alertShow,expression:"alertShow"}],attrs:{alertText:t.alertText},on:{closeTip:t.closeTip}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"login_hint"},[this._v("\n            温馨提示：未注册饿了麽外卖帐号的手机号，登录时将自动注册，且代表已同意\n            "),e("a",{attrs:{href:"javascript:;"}},[this._v("《用户服务协议》")])])}]};var v=a("C7Lr")(u,h,!1,function(t){a("dVA9")},null,null);e.default=v.exports},dVA9:function(t,e){},wjvn:function(t,e){}});
//# sourceMappingURL=7.38641bf0e4f5335aeebc.js.map