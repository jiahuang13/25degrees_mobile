import request from "@/utils/request";

// --------- 前台 --------------
// 註冊
export const registerAPI = (data) => {
  return request({
    url: "/register",
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
