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
    url: "/createOrder",
    method: "POST",
    data,
  });
};

// 獲取某會員所有訂單
export const getAllOrdersAPI = () => {
  return request({
    url: "/getAllOrdersById",
  });
};

// 獲取某會員一筆訂單
export const getOneOrderById = (id) => {
  return request({
    url: `/getOneOrderById/${id}`,
  });
};
