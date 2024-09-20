import request from "@/utils/request";

// --------- 前台 --------------
// 註冊（data包含帳號、密碼、電子信箱）
export const registerAPI = (data) => {
  return request({
    url: "/register",
    method: "POST",
    data,
  });
};

// 驗證碼
export const verificationCodeAPI = (data) => {
  return request({
    url: "/verificationCode",
    method: "POST",
    data,
  });
};

// 登入
export const loginAPI = (data) => {
  return request({
    url: "/login",
    method: "POST",
    data,
  });
};

// ---------------- 地址 ---------------------
//新增地址
export const addAddressAPI = (data) => {
  return request({
    url: "/addAddress",
    method: "POST",
    data,
  });
};

// 獲取地址list
export const getAddressListAPI = () => {
  return request({
    url: "/addressList",
  });
};

// 獲取單一地址
export const getAddressOneAPI = (id) => {
  return request({
    url: `/address/${id}`,
  });
};

//獲取預設地址
export const getDefaultAddressAPI = () => {
  return request({
    url: "/addressDefault",
  });
};

// 更新地址
export const updateAddressAPI = (id, data) => {
  return request({
    url: `/address/${id}`,
    method: "PATCH",
    data,
  });
};

// --------- 後台 --------------
// 獲取所有會員資料
export const getAllUserAPI = () => {
  return request({
    url: "/user/all",
  });
};

// 獲取單筆會員資料
export const getUserAPI = () => {
  return request({
    url: "/user",
  });
};

// 刪除會員
export const deleteUserAPI = (id) => {
  return request({
    url: `/user/${id}`,
    method: "DELETE",
  });
};

// 更新會員資料
export const updateUserAPI = (id, data) => {
  return request({
    url: `/user/${id}`,
    method: "PATCH",
    data,
  });
};

// 管理員登入
export const adminUserLoginAPI = (data) => {
  return request({
    url: "/admin/login",
    method: "POST",
    data,
  });
};
