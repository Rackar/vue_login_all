<template>
  <div class="hello">
    <div class="mainbutton" @click="isLoginShow=!isLoginShow">登录</div>
    <br />
    <login v-if="isLoginShow" />
  </div>
</template>

<script>
import login from "./login";
export default {
  name: "hello",
  data() {
    return {
      isLoginShow: false
    };
  },
  props: {
    msg: String
  },
  components: {
    login
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.mainbutton {
  position: fixed;
  top: 10px;
  right: 20px;
}
</style>
