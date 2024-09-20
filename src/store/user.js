// export default {
//   namespaced: true,
//   state: {
//     addressList: [
//       // {
//       //   id: 0,
//       //   recipient_name: "阿呆",
//       //   tel: "0947464535",
//       //   address: "台南市東區大馬路",
//       //   city: "台南市 東區",
//       //   detail: "大馬路",
//       //   is_default: true,
//       // },
//       // {
//       //   id: 1,
//       //   recipient_name: "德永",
//       //   tel: "0947464535",
//       //   address: "台北市信義區大馬路",
//       //   city: "台北市 信義區",
//       //   detail: "大馬路",
//       //   is_default: false,
//       // },
//     ],
//     defaultOne: [],
//   },
//   getters: {
//     defaultAddress(state) {
//       return state.addressList.filter((v) => v.is_default === true)[0];
//     },
//   },
//   mutations: {
//     addAddress(state, obj) {
//       obj = { ...obj, id: state.addressList.length };
//       // 移除其他的預設
//       if (obj.is_default === true) {
//         state.addressList.forEach((v) => {
//           if (v.is_default) {
//             v.is_default = false;
//           }
//         });
//       }
//       state.addressList.unshift(obj);
//     },
//     updateAddress(state, obj) {
//       const index = state.addressList.findIndex((item) => item.id === +obj.id);
//       // 移除其他的預設
//       if (obj.is_default) {
//         state.addressList.forEach((v) => {
//           if (v.is_default) {
//             v.is_default = false;
//           }
//         });
//         obj.is_default = true;
//       }
//       state.addressList[index] = obj;
//       console.log(obj.is_default);
//     },
//     deleteAddress(state, id) {
//       state.addressList = state.addressList.filter((item) => +item.id !== +id);
//     },
//     removeDefault(state) {
//       state.addressList.forEach((v) => {
//         if (v.is_default) {
//           v.is_default = false;
//         }
//       });
//     },
//   },
//   actions: {
//     getAddressListAPI() {},
//   },
// };
