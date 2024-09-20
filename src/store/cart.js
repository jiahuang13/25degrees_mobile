// import Vue from "vue";
export default {
  namespaced: true,
  state() {
    return {
      list: [],
      selectedList: [],
    };
  },
  mutations: {
    updateList(state, newList) {
      state.list = newList;
      // console.log(state.list, newList)
      localStorage.setItem("25degrees_cart", JSON.stringify(state.list));
    },
    updateSelectedList(state, selectedItems) {
      state.selectedList = [...selectedItems]; // 更新选中的商品列表
    },
    updateCount(state, obj) {
      // obj: { id, newcount}
      const product = state.list.find((item) => item.id === obj.id);
      product.count = obj.count;
      localStorage.setItem("25degrees_cart", JSON.stringify(state.list));
    },
    addProduct(state, item) {
      state.list.push(item);
      localStorage.setItem("25degrees_cart", JSON.stringify(state.list));
    },
    deleteProduct(state, id) {
      state.list = state.list.filter((item) => item.id !== id);
      state.selectedList = state.selectedList.filter((item) => item.id !== id);
      localStorage.setItem("25degrees_cart", JSON.stringify(state.list));
    },
    getList(state) {
      const res = localStorage.getItem("25degrees_cart");
      state.list = res ? JSON.parse(res) : [];
    },
  },
  actions: {},
  getters: {
    // 商品總數量
    total(state) {
      return state.selectedList.reduce((sum, item) => sum + item.count, 0);
      // console.log(state)
    },
    // 商品總價
    totalPrice(state) {
      return (
        state.selectedList.reduce(
          (sum, item) =>
            sum + item.count * Math.floor((item.price * item.discount) / 100),
          0
        ) * 100
      );
    },
  },
};
