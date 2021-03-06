import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
import hello from "./components/testPlugin.js";

Vue.use(hello);
Vue.use(ElementUI);

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/token/";
//请求拦截。所有http请求增加token
axios.interceptors.request.use(
  config => {
    config.headers = {
      "Content-Type": " application/json"
    };
    // if (store.state.token) {
    //   config.headers.Authorization = `${store.state.token}`;
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  function(response) {
    //// 用户信息是否超时，重定向到登录页面

    // if (response.data.status === 0) {
    //   localStorage.clear();
    //   router.replace({
    //     path: "/login",
    //     query: {
    //       redirect: router.currentRoute.fullPath
    //     }
    //   });
    //   ElementUI.Message({
    //     showClose: true,
    //     duration: 1000,
    //     type: "error",
    //     message: "请登录后操作"
    //   });
    // }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axios;

const mess = {
  success: function(message) {
    ElementUI.Message({
      showClose: true,
      duration: 1000,
      type: "success",
      message: message
    });
  },
  error: function(message) {
    ElementUI.Message({
      showClose: true,
      duration: 1000,
      type: "error",
      message: message
    });
  },
  warning: function(message) {
    ElementUI.Message({
      showClose: true,
      duration: 1000,
      type: "warning",
      message: message
    });
  }
};

Vue.prototype.$mess = mess;

new Vue({
  render: h => h(App)
}).$mount("#app");
