// 前台登入權限
export const getToken = () => {
  return localStorage.getItem("25degrees_token");
};

export const setToken = (token) => {
  return localStorage.setItem("25degrees_token", token);
};

export const removeToken = () => {
  return localStorage.removeItem("25degrees_token");
};

// 後台權限
export const getAdminToken = () => {
  return localStorage.getItem("25degrees_admin_token");
};

export const setAdminToken = (token) => {
  return localStorage.setItem("25degrees_admin_token", token);
};

export const removeAdminToken = () => {
  return localStorage.removeItem("25degrees_admin_token");
};
