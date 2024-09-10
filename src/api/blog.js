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
export const updateBlogAPI = (id, data) => {
  return request({
    url: `/blog/${id}`,
    method: "PATCH",
    data,
  });
};
