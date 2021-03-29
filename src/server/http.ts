// axios 二次封装
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { message, Modal } from "ant-design-vue";
import { userInfo } from "@/utils/user.ts";
import UserState from "@store/user/types.d.ts";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

let modal: any = null;

// 超时时间
const timeout = 30000;
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const user: UserState = userInfo();
    const token: string | null = user.token;
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
interface IResult {
  code: number;
  data: any;
  [propName: string]: any;
}
// 处理http状态
function checkStatus(res: AxiosResponse) {
  let result: IResult;
  if (res.status === 200 || res.status === 304) {
    const contentType = res.headers["content-type"];
    if (
      contentType === "text/html;charset=utf-8" ||
      contentType === "application/pdf" ||
      contentType === "application/vnd.ms-excel"
    ) {
      result = {
        code: 0,
        data: res.data,
      };
      return Promise.resolve(result);
    } else {
      const code = res.data.code;
      if (code === 2) {
        result = {
          code: code,
          message: "登录失效，请重新登录",
          data: null,
        };
        return Promise.resolve(result);
      }
    }
    return Promise.resolve(res.data);
  }
  let message: string;
  switch (res.status) {
    case 400:
      // 错误请求
      message = "错误请求";
      break;
    case 401:
      // 未授权
      message = "服务器未授权的请求";
      break;
    case 403:
      // 拒绝访问
      message = "服务器拒绝访问";
      break;
    case 404:
      // 未找到该资源
      message = "无服务器请求";
      break;
    case 405:
      // 请求方法未允许
      message = "服务器未允许的请求方法";
      break;
    case 408:
      // 请求超时
      message = "服务器繁忙";
      break;
    case 500:
      // 服务器错误
      message = "服务器错误";
      break;
    case 501:
      // 网络未实现
      message = "无网络";
      break;
    case 502:
      // 网络错误
      message = "网络错误";
      break;
    case 503:
      // 服务不可用
      message = "服务不可用";
      break;
    case 504:
      // 网络超时
      message = "网络信号弱";
      break;
    case 505:
      // http版本不支持该请求
      message = "不支持的请求";
      break;
    default:
      message = `连接错误${res.status}`;
  }
  result = {
    code: res.status,
    message,
    data: null,
  };
  return Promise.resolve(result);
}
function checkCode(res: IResult) {
  const store = useStore();
  const router = useRouter();
  if (res.code !== 0) {
    if (res.code !== 2) {
      message.error(`${res.message}！`, 1.5);
    } else {
      if (res.code === 2) {
        // token失效
        if (!modal) {
          modal = Modal.warning({
            title: "提醒",
            content: `${res.message}`,
            onOk() {
              // 重新登录
              store.dispatch("clearUserInfo");
              modal.destroy();
              modal = null;
              router.push({ path: "/login" });
            },
          });
        }
      }
    }
  }
  return Promise.resolve(res);
}

export default {
  async get(url: string, params: object, headers = null) {
    const step1 = await axios({
      url,
      method: "get",
      params,
      timeout,
      headers: headers || {},
    });
    const step2 = await checkStatus(step1);
    const step3 = await checkCode(step2);
    return step3;
  },
  async post(url: string, data: object, params: object, headers = null) {
    await axios({
      url,
      method: "post",
      params,
      data,
      timeout,
      headers: headers || {},
    });
    await checkStatus;
    await checkCode;
  },
  async postDownload(
    url: string,
    data: object,
    params: object,
    headers = null
  ) {
    await axios({
      method: "post",
      url,
      params,
      data,
      timeout: timeout,
      headers: headers || {},
      responseType: "blob",
    });
    await checkStatus;
    await checkCode;
  },
};
