import axios from "axios";
import { getToken, removeToken } from "./auth";
import router from "@/router/index";
import { Toast } from "vant";

// 創建實例
const instance = axios.create({
  baseURL: "http://localhost:3008",
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // 检查是否上传文件
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 攔截器 - 全局錯誤處理
instance.interceptors.response.use(
  (response) => {
    // 成功響應，直接返回數據
    return response.data;
  },
  (error) => {
    // 錯誤響應
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          Toast.fail("身份認證失敗，請重新登入");
          // 移除本地 token
          removeToken();
          // 跳轉到登入頁面
          router.push("/login");
          break;
        case 403:
          Toast.fail("權限不足，禁止訪問");
          break;
        case 404:
          Toast.fail("請求資源不存在");
          break;
        case 500:
          Toast.fail("伺服器錯誤，請稍後再試");
          break;
        default:
          Toast.fail(`未知錯誤：${error.response.data.message || "未知錯誤"}`);
      }
    } else {
      Toast.fail("網絡錯誤，請檢查你的網絡連接");
    }
    // 返回一個被拒絕的 Promise，讓上層函數能捕捉到錯誤
    return Promise.reject(error);
  }
);

// 統一封裝 request 函數
const request = async (options) => {
  try {
    // 使用 await 獲取 axios 返回結果
    const response = await instance(options);
    return response;
  } catch (error) {
    // 可以在這裡進一步自定義錯誤處理
    console.error("API 調用失敗：", error);
    return null; // 返回 `null` 來標識失敗
  }
};

export default request;
