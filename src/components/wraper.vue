<template>
  <div class="hello">
    <div class="mainbutton" @click="isLoginShow=!isLoginShow">
      <div class="avatar-abstract" style="background-image: url(&quot;/img/avatar.png&quot;);"></div>
    </div>

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

.avatar-abstract {
  background-color: #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-transition: opacity 0.4s linear;
  transition: opacity 0.4s linear;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
}
</style>
