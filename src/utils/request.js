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

// 響應攔截器
instance.interceptors.response.use(
  (response) => {
    // 對響應數據進行處理
    return response.data; // 可以直接返回數據，這樣在請求成功時可以更簡單地處理
  },
  (error) => {
    // 對響應錯誤做點什麼
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // 401 未授權，可能是 token 過期或無效
        // console.warn("未授權或 token 過期，請重新登錄");
        Toast.fail("身份認證失敗，請重新登入");
        removeToken(); // 清除本地 token
        router.push("/login"); // 重定向到登入頁面
      } else if (status === 403) {
        // 403 禁止訪問，權限問題
        console.error("禁止訪問，權限不足");
      } else if (status >= 500) {
        // 500 伺服器錯誤
        console.error("伺服器錯誤，請稍後再試");
      } else {
        // 其他錯誤，顯示錯誤消息
        console.error(`錯誤：${error.response}`);
      }
    } else {
      console.error("網絡錯誤，請檢查你的網絡連接");
    }

    // 返回一個失敗的 Promise，這樣可以在請求處理中捕捉到錯誤
    return Promise.reject(error);
  }
);

// 導出實例
export default instance;
