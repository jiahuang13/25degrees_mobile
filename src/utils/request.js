import axios from "axios";
import { getToken, removeToken } from "./auth";
import router from "@/router/index";
import { Toast } from "vant";

// 創建實例
const instance = axios.create({
  baseURL: "http://localhost:3008",
  timeout: 5000,
});

// 請求攔截器
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 全局錯誤處理攔截器
instance.interceptors.response.use(
  (response) => response.data, // 直接返回數據體
  (error) => {
    // 判斷是否有 response，如果沒有，表示網絡錯誤
    if (!error.response) {
      Toast.fail("網絡錯誤，請檢查你的網絡連接");
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const message = data?.message || "操作失敗"; // 取後端返回的 message 或顯示通用錯誤提示

    // 處理不同狀態碼的錯誤響應
    if (status === 401) {
      Toast.fail(message || "身份認證失敗，請重新登入");
      removeToken(); // 移除本地 token
      router.push("/login");
    } else {
      Toast.fail(message); // 統一顯示錯誤訊息
    }

    // 返回一個被拒絕的 Promise，以標識失敗
    return Promise.reject(error);
  }
);

const request = async (options) => {
  try {
    // 使用 await 獲取 axios 返回結果
    return await instance(options); // 直接返回 response
  } catch (error) {
    console.error("API 調用失敗：", error);
    throw error; // 使用 throw 而非 return null
  }
};

export default request;
