import axios from "axios";

// 創建實例
const instance = axios.create({
  baseURL: "http://localhost:3008",
  timeout: 5000,
});

//請求和響應攔截器

// 導出實例
export default instance;
