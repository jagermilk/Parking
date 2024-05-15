const state = {
    appmine:'',
    SmallCard:'',
    isCard:false
  }
  const mutations = {
    set_appmine(state,message){
        state.appmine=message
    },
    set_SmallCard(state,message){
      state.SmallCard=message
  },
  set_isCard(state){
    state.isCard=!state.isCard
}
  
  
  }

  
export default {
    namespaced: true,
    state,
    mutations,
  }
  