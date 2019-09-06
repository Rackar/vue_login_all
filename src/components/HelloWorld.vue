<template>
  <div class="hello">login 登录
    <br>
    <link2 />
  </div>

</template>

<script>
import link2 from './link'
export default {
  name: "hello",
  props: {
    msg: String
  },
  components:{
    link2
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
.hello{
  color: red;
  font-size: 32px;
}
</style>
