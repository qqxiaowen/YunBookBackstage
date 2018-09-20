import Vue from 'vue'
import Vuex from 'vuex' 
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userinfo:{
            avatar: '',
            desc:'',
            email:'',
            nickname:'',
            username:''
        }
    },
    mutations: {
        'fuzhi'(state,xx) { 
            state.userinfo = xx
        }
    },
    actions: {},
    plugins: [createPersistedState({
        storage: {
          getItem: key => sessionStorage.getItem(key),
          setItem: (key, value) =>
            sessionStorage.setItem(key, value),
          removeItem: key => sessionStorage.removeItem(key),
        },
      })],
  })

  export default store