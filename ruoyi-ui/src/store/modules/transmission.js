const state = {
    appmine:'',
    SmallCard:'',
    // isCard:false,
    //字体大小
    fontSize:'',
    //标题
    carTitler:false
  }
  const mutations = {
    //首页dom
    set_appmine(state,message){
        state.appmine=message
    },
    //小卡片dom
    set_SmallCard(state,message){
      state.SmallCard=message
  },
  //卡片判断
  // set_isCard(state){
  //   state.isCard=!state.isCard
  // },
  //字体大小
  set_fontSize(state,message){
    state.fontSize=message
  },
  set_carTitler(state,message){
    state.carTitler=message
  }
  }
 const actions= {
    // 你可能需要action来异步改变carTitler

    // carTitlerAction({ commit },data) {
    //   commit('set_carTitler',data);
    // }
  }
  
export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  