<template>
  <div class="login">
    <!-- <div @click="goon">点击注册</div> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-if="!userStatus.isLogin" label="登录" name="first">
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
      <el-tab-pane v-if="!userStatus.isLogin" label="注册" name="second">
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
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formSignup.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formSignup')">提交</el-button>
            <el-button @click="resetForm('formSignup')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="!userStatus.isLogin" label="找回密码" name="third">
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
      <el-tab-pane v-if="userStatus.isLogin" label="个人信息" name="fourth">信息，设置，权限</el-tab-pane>
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
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 100);
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
        age: ""
      },
      activeName: "first",
      rulesSignup: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formBodyData = {};
          alert("验证通过");
          this.userStatus.isLogin = true;
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
    login() {},
    signup() {},
    forget() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
}
</style>