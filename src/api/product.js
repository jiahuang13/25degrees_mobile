import request from "@/utils/request";

// 獲取商品詳情
export const getOneProductAPI = (id) => {
  return request({
    url: `/api/product/${id}`,
  });
};

// 獲取所有商品
export const getAllProductAPI = () => {
  return request({
    url: "/api/product",
  });
};

// 獲取所有商品 隨機排序
export const getAllProductRandAPI = () => {
  return request({
    url: "/api/product/random",
  });
};

// 搜索結果
export const getSearchResultsAPI = (params) => {
  return request({
    url: "/api/product/search",
    params,
  });
};

// 收藏
// export const collectAPI = () => {};

// ----- 後台 ------
// 新增商品
export const addNewProductAPI = (data) => {
  return request({
    url: "/admin/product",
    method: "POST",
    data,
  });
};

// 刪除商品
export const deleteProductAPI = (id) => {
  return request({
    url: `/admin/product/${id}`,
    method: "DELETE",
  });
};

// 更新商品
export const updateProductAPI = (data) => {
  return request({
    url: "/admin/product",
    method: "PATCH",
    data,
  });
};

// 後台搜尋商品
export const searchProductAPI = (params) => {
  return request({
    url: "/product/search",
    params,
  });
};
