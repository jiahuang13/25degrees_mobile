import request from "@/utils/request";

// 獲取文章詳情
export const getOneBlogAPI = (id) => {
  return request({
    url: `/blog/${id}`,
  });
};

// 獲取所有文章
export const getAllBlogAPI = () => {
  return request({
    url: "/blog",
  });
};

// 新增文章
export const addNewBlogAPI = (data) => {
  return request({
    url: "/blog",
    method: "POST",
    data,
  });
};

// 刪除文章
export const deleteBlogAPI = (id) => {
  return request({
    url: `/blog/${id}`,
    method: "DELETE",
  });
};

// 更新文章
export const updateBlogAPI = (data) => {
  return request({
    url: "/blog/search",
    method: "PATCH",
    data,
  });
};

// 搜尋文章
export const searchBlogAPI = (params) => {
  return request({
    url: "/blog/search",
    params,
  });
};

// 取得 3 條推薦文章（隨機）
export const getThreeRandBlogAPI = (id) => {
  return request({
    url: "/blog/threeRand",
    params: { id },
  });
};
