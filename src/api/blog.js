import request from "@/utils/request";

// 獲取文章詳情
export const getOneBlogAPI = (id) => {
  return request({
    url: `/api/blog/${id}`,
  });
};

// 獲取所有文章
export const getAllBlogAPI = () => {
  return request({
    url: "/api/blog",
  });
};

// 搜尋文章
export const searchBlogAPI = (params) => {
  return request({
    url: "/api/blog/search",
    params,
  });
};

// 取得 3 條推薦文章（隨機）
export const getThreeRandBlogAPI = (id) => {
  return request({
    url: "/api/blog/threeRandom",
    params: { id },
  });
};

// 新增文章
export const addNewBlogAPI = (data) => {
  return request({
    url: "/admin/blog",
    method: "POST",
    data,
  });
};

// 刪除文章
export const deleteBlogAPI = (id) => {
  return request({
    url: `/admin/blog/${id}`,
    method: "DELETE",
  });
};

// 更新文章
export const updateBlogAPI = (data) => {
  return request({
    url: "/admin/blog",
    method: "PATCH",
    data,
  });
};
