export default {
  namespaced: true,
  state: {
    searchHistory: [],
  },
  getters: {},
  mutations: {
    changeSearchHistory(state, keyword) {
      if (state.searchHistory.includes(keyword)) {
        const index = state.searchHistory.indexOf(keyword);
        console.log(index);
        state.searchHistory.splice(index, 1);
        state.searchHistory.unshift(keyword);
        localStorage.setItem(
          "25dg_search",
          JSON.stringify(state.searchHistory)
        );
      } else {
        state.searchHistory.unshift(keyword);
        localStorage.setItem(
          "25dg_search",
          JSON.stringify(state.searchHistory)
        );
      }
    },
    updateSearchHistory(state, arr) {
      state.searchHistory = arr;
    },
    clearHistory(state) {
      state.searchHistory = [];
    },
  },
  actions: {
    getSearchHistory(context) {
      if (JSON.parse(localStorage.getItem("25dg_search"))) {
        const res = JSON.parse(localStorage.getItem("25dg_search"));
        context.commit("updateSearchHistory", res);
      } else {
        // console.log("no hisotry");
        return;
      }
    },
  },
};
