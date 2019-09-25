<template>
  <div class="login">
    <!-- <div @click="goon">点击注册</div> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-if="!parentLogin" label="登录" name="first">
        <el-form
          :model="formLogin"
          status-icon
          :rules="rulesLogin"
          ref="formLogin"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formLogin.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="formLogin.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('formLogin')">提交</el-button>
            <el-button @click="resetForm('ruleForm1')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="!parentLogin" label="注册" name="second">
        <el-form
          :model="formSignup"
          status-icon
          :rules="rulesSignup"
          ref="formSignup"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="formSignup.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="formSignup.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="formSignup.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="formSignup.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formSignup')">提交</el-button>
            <el-button @click="resetForm('formSignup')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="!parentLogin" label="找回密码" name="third">
        <el-form
          :model="formForget"
          status-icon
          :rules="rulesForget"
          ref="ruleForget"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="formForget.username"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForget')">提交</el-button>
            <el-button @click="resetForm('ruleForget')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="parentLogin" label="个人信息" name="fourth">
        <div>信息，设置，权限</div>

        <el-button @click="logout">登出</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    var validatePassLogin = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        // }
        callback();
      }
    };
    var checkUsernameLogin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var checkUsername = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        // async function checkcheck() {
        //   let va = await this.checkUsernameExist();
        //   console.log(va);
        // }
        // checkcheck();
        var notExist = await this.checkUsernameExist();

        if (notExist) {
          callback();
        } else {
          callback(new Error("用户名重复"));
        }
        // setTimeout(() => {
        //   if (false) {
        //     callback();
        //   } else {
        //     return callback(new Error("用户名重复"));
        //   }
        // }, 100);
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        if (value < 10000000000 || value > 19999999999) {
          callback(new Error("手机号格式错误"));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formSignup.checkPass !== "") {
          this.$refs.formSignup.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formSignup.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formSignup: {
        username: "",
        pass: "",
        checkPass: "",
        phone: ""
      },
      activeName: "first",
      rulesSignup: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }]
      },
      formLogin: {
        username: "",
        pass: ""
      },
      rulesLogin: {
        username: [{ validator: checkUsernameLogin, trigger: "blur" }],
        pass: [{ validator: validatePassLogin, trigger: "blur" }]
      },
      formForget: {
        username: ""
      },
      rulesForget: {
        username: [{ validator: checkUsernameLogin, trigger: "blur" }]
      },
      userStatus: {
        isLogin: false
      }
    };
  },
  computed: {
    parentLogin() {
      return this.$parent.isLogined;
    }
  },
  mounted() {
    this.initFormData();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formBodyData = {};
          // this.userStatus.isLogin = true;

          if (formName == "formLogin") {
            this.login();
          } else if (formName == "formSignup") {
            this.signup();
          } else if (formName == "formForget") {
            this.forget();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login() {
      this.$axios
        .post("login", {
          username: this.formLogin.username,
          password: this.formLogin.pass
        })
        .then(res => {
          console.log(res);
          if (res.data.status) {
            this.$mess.success("登录成功");
            this.$emit("changeLoginStatus");
            this.activeName = "fourth";
          } else {
            this.$mess.error("用户或密码错误");
          }
        });
    },
    signup() {
      this.$axios
        .post("register", {
          username: this.formSignup.username,
          password: this.formSignup.pass,
          phone: this.formSignup.phone
        })
        .then(res => {
          console.log(res);
          if (res.data.status) {
            this.$mess.success("注册申请已提交，等待审批");
            this.activeName = "first";
          } else {
            this.$mess.error(res.data.error);
          }
        });
    },
    checkUsernameExist() {
      return this.$axios
        .post("user_exsit", {
          username: this.formSignup.username
        })
        .then(res => {
          console.log(res);
          return new Promise(resolve => {
            resolve(res.data.status);
          });
        });
    },

    forget() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logout() {
      this.$emit("changeLoginStatus");
      this.activeName = "first";
    },
    initFormData() {
      if (this.$parent.isLogined) this.activeName = "fourth";
      else this.activeName = "first";
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style  scoped>
.login {
  /* background-color: bisque; */
  position: absolute;
  top: 20%;
  left: 40%;
  padding: 20px 30px 20px 20px;

  border: 1px solid rgb(238, 236, 236);
}
</style>