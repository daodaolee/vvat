<template>
  <div class="w100 h100 login">
    <div class="w100 h100 login-container">
      <h2>VVAT 后台系统模板</h2>
      <a-form
        class="login-form"
        ref="formRef"
        :model="formState"
        :rules="rules"
        v-bind="layout"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item required has-feedback label="账号" name="username">
          <a-input v-model:value="formState.username" autocomplete="off" placeholder="请输入账号，随意填写" />
        </a-form-item>
        <a-form-item required has-feedback label="密码" name="password">
          <a-input
            v-model:value="formState.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码，随意填写"
          />
        </a-form-item>
        <a-form-item label="验证码" style="margin-bottom: 0">
          <a-form-item has-feedback required name="code" :wrapper-col="{ span: 24 }">
            <a-input
              v-model:value="formState.code"
              placeholder="请输入验证码"
              style="width:150px"
              :maxlength="4"
            />
            <div id="codeImg" @click="changeCode" title="点击切换" />
          </a-form-item>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 8 }" style="margin-bottom: 0">
          <a-button type="primary" html-type="submit" :loading="formState.loginLoading">登录</a-button>
          <a-button style="margin-left: 30px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, UnwrapRef } from 'vue';
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { randomString } from "/@/utils/code.ts";
interface FormState {
  username: string;
  password: string;
  code: string;
}
export default defineComponent({
  setup() {
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      username: '',
      password: '',
      code: '',
      codeImg: undefined,
      loginLoading: false
    });
    // 验证账号
    let validateUser = async (rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.reject("请输入账号");
      } else {
        return Promise.resolve();
      }
    }
    // 验证密码
    let validatePass = async (rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.reject('请输入密码');
      } else {
        return Promise.resolve();
      }
    };
    // 验证验证码
    let validateCode = async (rule: RuleObject, value: string, callback: any) => {
      if (value === '') {
        return Promise.reject('请输入验证码');
      } else {
        if (formState.codeImg != value) {
          return Promise.reject("区分大小写哦");
        } else {
          return Promise.resolve()
        }
      }
    };

    const rules = {
      password: [{ validator: validatePass, trigger: 'change' }],
      username: [{ validator: validateUser, trigger: 'change' }],
      code: [{ validator: validateCode, trigger: 'change' }]
    };
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    // 提交验证成功
    const handleFinish = (values: FormState) => {
      console.log(values, formState);
      formState.loginLoading = true;
      
      setTimeout(() => {
        formState.loginLoading = false;
      }, 700);

    };
    // 提交验证失败
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const changeCode = () => {
      return randomString();

    }
    onMounted(() => {
      let tempCode = changeCode();
      let imgsCode = document.getElementById("codeImg");
      imgsCode.innerHTML = tempCode;

      formState.codeImg = tempCode;
    })
    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      changeCode
    };
  },
});
</script>
<style lang="scss" scoped>
.login {
  background-image: linear-gradient(
    to right,
    #3ab5b0 0%,
    #3d99be 31%,
    #56317a 100%
  );
  @include flex;
  @include flex-primary-axis-center;
  @include flex-secondary-axis-center;
  .login-container {
    width: 500px;
    height: 370px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 5px 12px #ececec;
    @include flex;
    @include flex-column;
    @include flex-primary-axis-center;
    @include flex-secondary-axis-center;
    h2 {
      margin-bottom: 30px;
    }

    form {
      width: 400px;
      margin: 0 auto;
    }
    #codeImg {
      width: 100px;
      height: 32px;
      border: 1px solid #d9d9d9;
      background: #aeaeae;
      position: absolute;
      top: -10px;
      right: -150px;
      line-height: 32px;
      text-align: center;
      font-size: 20px;
      color: white;
      letter-spacing: 5px;
      font-weight: bold;
      font-style: italic;
      cursor: pointer;

      -moz-user-select: -moz-none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
  }
}
</style>