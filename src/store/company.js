import api from '@/plugins/api'

const company = {
    namespaced: true,

	state: {
	},

	mutations: {
	},

	actions: {
        index(_, payload){
            return new Promise((resolve)=>{
              api.get('v1/companies'+payload).then(response =>{
                  resolve(response.data);
              });
            });
        },
        list(_, payload){
            return new Promise((resolve)=>{
              api.get('v1/companies/list'+payload).then(response =>{
                  resolve(response.data);
              });
            });
        },
        store(_, payload){
            return new Promise((resolve)=>{
                api.post('v1/companies',payload).then(response => {
                    resolve(response.data);
                })
            });
        },
        setFavourite(_, payload){
            return new Promise((resolve)=>{
                api.put('v1/companies/favourite/'+payload.id,payload).then(response =>{
                    resolve(response.data);
                });
            });
        }
	},

	getters: {
	}
}

export default company;