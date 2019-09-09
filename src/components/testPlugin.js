import hello from "./wraper.vue";
let test = {};
test.install = function(Vue, options) {
  Vue.component(hello.name, hello); // testPanel.name 组件的name属性
};
export default test;
