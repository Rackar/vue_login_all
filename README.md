# 功能

统一注册登录组件，在页面任意位置引用。
参考本文：https://blog.csdn.net/henjuewang/article/details/100561172

# login_all 插件

## 安装

npm i vue_login_all

## vue/cli 引入

在\*.vue 文件中引入：

```
<template>
<hello />
</template>

<script>
import hello from "vue_login_all/dist/myLib.common";
export default {
  data() {
    return {
      ...
    };
  },
  components: {
    hello
  }
  ...
}
</script>
```

## html 引入

如 dist/demo.html 所示

```
<meta charset="utf-8">
<title>myLib demo</title>
<script src="https://unpkg.com/vue"></script>
<script src="./myLib.umd.js"></script>


<div id="app">
  <demo></demo>
</div>

<script>
new Vue({
  components: {
    demo: myLib
  }
}).$mount('#app')
</script>
```

# login_all 源码

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn  serve
```

### Compiles and minifies for production

```
yarn  build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
