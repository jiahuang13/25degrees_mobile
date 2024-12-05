export default {
  namespaced: true,
  state: {
    history: [],
  },
  getters: {},
  mutations: {
    getHistory(state) {
      state.history =
        JSON.parse(localStorage.getItem("25degrees_search")) || [];
    },
    addHistory(state, keyword) {
      // 移除重複項並將新項目放到最前面
      state.history = [
        keyword,
        ...state.history.filter((item) => item !== keyword),
      ];
      // 儲存到 localStorage
      localStorage.setItem("25degrees_search", JSON.stringify(state.history));
    },
  },
};
