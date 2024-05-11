const state = {
    appmine:''
  }
  const mutations = {
    set_appmine(state,message){
        state.appmine=message
    }
  }

  
export default {
    namespaced: true,
    state,
    mutations,
  }
  