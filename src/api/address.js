import request from "@/utils/request";

//新增地址
export const addAddressAPI = (data) => {
  return request({
    url: "/address/add",
    method: "POST",
    data,
  });
};

// 獲取地址list
export const getAddressListAPI = () => {
  return request({
    url: "/address/all",
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
    url: "/address/default",
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
