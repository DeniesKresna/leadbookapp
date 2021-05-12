import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/plugins/api';
import company from './company';
Vue.use(Vuex);

const state = {
  drawer: true,
  assetUrl: "http://leadbook.localhost:8080/public/images/",
  //assetUrl: "http://103.55.38.109/leadbookapi/public/images/",
  //apiUrl: "https://localhost/signage/",
  overlay: false,
  user:null,
  version: "1.00"
};

const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  setOverlay(state, payload){
    state.overlay = payload;
  },
  setUser(state, payload){
    state.loginDialog = false;
    state.user = payload;
  },
  logout(state){
    state.user = null;
    localStorage.removeItem('token');
  }
};

const actions = {
  login({commit}, payload){
    return new Promise((resolve)=>{
      api.post('/auth/login',payload).then(response =>{
          localStorage.setItem('token',"Bearer "+response.data.access_token)
          commit('setUser',response.data.user);
          resolve(response.data);
      });
    });
  },
  logout({commit}){
    return new Promise((resolve)=>{
      api.get('/auth/logout').then((response) =>{
          commit('logout');
          resolve(response.data);
      });
    });
  },
  register(_,payload){
    return new Promise((resolve)=>{
      api.post('/auth/register',payload).then(response=>{
        resolve(response.data);
      });
    });
  },
  verify(_,payload){
    return new Promise((resolve)=>{
      api.get('/auth/verify/'+payload).then(response=>{
        resolve(response.data);
      });
    });
  },
  checkResetCode(_,payload){
    return new Promise((resolve)=>{
      api.get('/auth/check-reset-code/'+payload).then(response =>{
          resolve(response.data);
      });
    });
  },
  forgetPassword(_,payload){
    return new Promise((resolve)=>{
      api.post('/auth/forget-password',payload).then(response=>{
        resolve(response.data);
      });
    });
  },
  resetPassword(_,payload){
    return new Promise((resolve)=>{
      api.post('/auth/reset-password/'+payload.code, payload).then(response=>{
        resolve(response.data);
      });
    });
  },
  me({commit}){
    return new Promise((resolve)=>{
      api.get('/auth/me').then(response=>{
        let obj = response.data;
        console.log()
        if(obj.id != undefined)
          commit('setUser',response.data);
        
        resolve(response.data);
      });
    });
  },
  TOGGLE_DRAWER({ commit }) {
    commit('toggleDrawer');
  }
};

const getters = {
  assetUrl(state){
    return state.assetUrl;
  },
  overlay(state){
    return state.overlay;
  },
  user(state){
    return state.user;
  },
  DRAWER_STATE(state) {
    return state.drawer;
  }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        company
    }
});
