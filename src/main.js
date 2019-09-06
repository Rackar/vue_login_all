import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import hello from "./components/testPlugin.js";
Vue.use(hello);

new Vue({
  render: h => h(App)
}).$mount("#app");
