import request from "@/utils/request";

export const paypalCreateAPI = (amount) => {
  return request({
    url: "/paypal/create-order",
    method: "POST",
    data: { amount },
  });
};

export const paypalVerifyAPI = (orderId, paypalId) => {
  return request({
    url: "/paypal/verify-order",
    method: "POST",
    data: { orderId, paypalId },
  });
};

export const createOrderAPI = (data) => {
  return request({
    url: "/order/create",
    method: "POST",
    data,
  });
};

// 獲取某會員所有訂單
export const getAllOrdersAPI = () => {
  return request({
    url: "/order",
  });
};

// 獲取某會員一筆訂單
export const getOneOrderById = (id) => {
  return request({
    url: `/order/${id}`,
  });
};

//
export const getOrderStatusCountAPI = () => {
  return request({
    url: "/order/status",
  });
};

// 取得銷售趨勢
export const getSalesTrendAPI = (params) => {
  return request({
    url: "sales/trend",
    params,
  });
};

// 取得銷售排行
export const getSalesRankingAPI = (params) => {
  return request({
    url: "sales/ranking",
    params,
  });
};
