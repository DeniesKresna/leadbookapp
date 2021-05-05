import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/plugins/api';
Vue.use(Vuex);

const state = {
  drawer: true,
  apiUrl: "https://leadbook.localhost/",
  //apiUrl: "https://localhost/signage/",
  overlay: false,
  page: "",
  links: [],
  user:null,
  loginDialog:false,
  activeMenu: "device-quick-info",
  version: "1.083"
};

const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  setOverlay(state, payload){
    state.overlay = payload;
  },
  setLoginDialog(state, payload){
    state.loginDialog = payload;
  },
  setPage(state, payload){
    state.page = payload;
    if(payload == "academy"){
      state.links = [
        {'label':'Daftar Jobhun Academy','url':'/academy/form','auth':false},
        {'label':'Peserta','url':'/academy/customer','auth':true},
        {'label':'Periode','url':'/academy/period','auth':true},
        {'label':'Kelas','url':'/academy/list','auth':true},
        {'label':'Mentor','url':'/user/mentor','auth':true},
      ];
    }else if(payload == "ask-career"){
      state.links = [
        {'label':'Pendaftaran','url':'/ask-career/form','auth':false},
        {'label':'Customer','url':'/ask-career/customer','auth':true},
        {'label':'Periode','url':'/ask-career/period','auth':true},
        {'label':'List','url':'/ask-career/list','auth':true},
      ]
    }
  },
  setUser(state, payload){
    state.loginDialog = false;
    state.user = payload;
  },
  setActiveMenu(state, payload){
    state.activeMenu = payload;
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
  apiUrl(state){
    return state.apiUrl;
  },
  overlay(state){
    return state.overlay;
  },
  page(state){
    return state.page;
  },
  links(state){
    return state.links;
  },
  user(state){
    return state.user;
  },
  loginDialog(state){
    return state.loginDialog;
  },
  selectedMenu(state){
    let selectedMenu = 0;
    if(state.activeMenu=="device-quick-info"){
      selectedMenu = 0;
    }else{
      selectedMenu = 1;
    }
    return selectedMenu;
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
        //device
    }
});
