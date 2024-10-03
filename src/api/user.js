import request from "@/utils/request";

// --------- 前台 --------------
// 註冊（data包含帳號、密碼、電子信箱）
export const registerAPI = (data) => {
  return request({
    url: "/api/register",
    method: "POST",
    data,
  });
};

// 驗證碼（註冊）
export const vCodeRegisterAPI = (data) => {
  return request({
    url: "/api/v-code/register",
    method: "POST",
    data,
  });
};

// 驗證碼（忘記密碼）
export const vCodeForgotPasswordAPI = (data) => {
  return request({
    url: "/api/v-code/forgot-password",
    method: "POST",
    data,
  });
};

// 設置新密碼
export const resetPasswordAPI = (data) => {
  return request({
    url: "/api/reset-password",
    method: "POST",
    data,
  });
};

// 登入
export const loginAPI = (data) => {
  return request({
    url: "/api/login",
    method: "POST",
    data,
  });
};

// 忘記密碼
export const forgotPasswordAPI = (data) => {
  return request({
    url: "/api/forgot-password",
    method: "POST",
    data,
  });
};

// 獲取會員資料
export const getUserByAuthAPI = () => {
  return request({
    url: "/user/auth",
  });
};

// --------- 後台 --------------
// 獲取所有會員資料
export const getAllUserAPI = () => {
  return request({
    url: "/admin/user/all",
  });
};

// 獲取單筆會員資料
export const getUserByIdAPI = (id) => {
  return request({
    url: `/admin/user/${id}`,
  });
};

// 刪除會員
export const deleteUserAPI = (id) => {
  return request({
    url: `/admin/user/${id}`,
    method: "DELETE",
  });
};

// 更新會員資料
export const updateUserAPI = (data) => {
  return request({
    url: "/admin/user",
    method: "PATCH",
    data,
  });
};

// 會員搜尋
export const searchUserAPI = (params) => {
  return request({
    url: "/admin/user/search",
    params,
  });
};
