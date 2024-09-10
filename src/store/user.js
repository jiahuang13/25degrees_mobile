export default {
  namespaced: true,
  state: {
    addressList: [
      {
        id: 0,
        name: "阿呆",
        tel: "0947464535",
        address: "台南市東區大馬路",
        city: "台南市 東區",
        detail: "大馬路",
        isDefault: true,
      },
      {
        id: 1,
        name: "德永",
        tel: "0947464535",
        address: "台北市信義區大馬路",
        city: "台北市 信義區",
        detail: "大馬路",
        isDefault: false,
      },
    ],
    defaultOne: [],
  },
  getters: {
    defaultAddress(state) {
      return state.addressList.filter((v) => v.isDefault === true)[0];
    },
  },
  mutations: {
    addAddress(state, obj) {
      obj = { ...obj, id: state.addressList.length };
      // 移除其他的預設
      if (obj.isDefault === true) {
        state.addressList.forEach((v) => {
          if (v.isDefault) {
            v.isDefault = false;
          }
        });
      }
      state.addressList.unshift(obj);
    },
    updateAddress(state, obj) {
      const index = state.addressList.findIndex((item) => item.id === +obj.id);
      // 移除其他的預設
      if (obj.isDefault) {
        state.addressList.forEach((v) => {
          if (v.isDefault) {
            v.isDefault = false;
          }
        });
        obj.isDefault = true;
      }
      state.addressList[index] = obj;
      console.log(obj.isDefault);
    },
    deleteAddress(state, id) {
      state.addressList = state.addressList.filter((item) => +item.id !== +id);
    },
    removeDefault(state) {
      state.addressList.forEach((v) => {
        if (v.isDefault) {
          v.isDefault = false;
        }
      });
    },
  },
  actions: {},
};
