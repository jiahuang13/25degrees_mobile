// import Vue from "vue";
export default {
  namespaced: true,
  state() {
    return {
      list: [],
      checkedList: [],
    };
  },
  mutations: {
    updateList(state, newList) {
      state.list = newList;
      // console.log(state.list, newList)
      localStorage.setItem("25degrees_cart", JSON.stringify(state.list));
    },
    updateCount(state, obj) {
      // obj: { id, newcount}
      const product = state.list.find((item) => item.id === obj.id);
      product.count = obj.count;
      localStorage.setItem("25degrees_cart", JSON.stringify(state.list));
    },
    addProduct(state, item) {
      // 檢查 list 中是否已存在相同 id 的商品
      const existingProduct = state.list.find(
        (product) => product.id === item.id
      );
      if (existingProduct) {
        // 如果已存在，則增加商品數量
        existingProduct.count += item.count;
      } else {
        // 否則，新增商品到購物車列表
        state.list.push(item);
      }
      localStorage.setItem("25degrees_cart", JSON.stringify(state.list));
    },
    deleteProduct(state, id) {
      state.list = state.list.filter((item) => item.id !== id);
      state.checkedList = state.checkedList.filter((item) => item.id !== id);
      localStorage.setItem("25degrees_cart", JSON.stringify(state.list));
    },
    updateCheckedList(state, newCheckedList) {
      state.checkedList = newCheckedList;
    },
    removeCheckedListFromList(state) {
      // 遍历 list，移除 checkedList 中的所有商品
      state.list = state.list.filter(
        (listItem) =>
          !state.checkedList.some(
            (checkedItem) => checkedItem.id === listItem.id
          )
      );
      // 清空 checkedList
      state.checkedList = [];
      // 更新本地存储
      localStorage.setItem("25degrees_cart", JSON.stringify(state.list));
    },
  },
  actions: {
    getList(context) {
      const res = JSON.parse(localStorage.getItem("25degrees_cart"));
      if (res) {
        context.commit("updateList", res);
      } else {
        return;
      }
    },
  },
  getters: {
    // 商品總數量
    total(state) {
      return state.checkedList.reduce((sum, item) => sum + item.count, 0);
      // console.log(state)
    },
    // 商品總價
    totalPrice(state) {
      return (
        state.checkedList.reduce(
          (sum, item) =>
            sum + item.count * Math.floor((item.price * item.discount) / 100),
          0
        ) + 100
      );
    },
    // 商品折後價
    finalList(state) {
      return state.checkedList.map((item) => ({
        id: item.id,
        count: item.count,
        price: item.count * Math.floor((item.price * item.discount) / 100),
      }));
    },
  },
};
