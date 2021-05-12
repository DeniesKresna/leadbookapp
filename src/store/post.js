import api from '@/plugins/api'

const post = {
    namespaced: true,

	state: {
	},

	mutations: {
	},

	actions: {
        index(_, payload){
            return new Promise((resolve)=>{
              api.get('v1/posts'+payload).then(response =>{
                  resolve(response.data);
              });
            });
        },
        store(_, payload){
            return new Promise((resolve)=>{
                api.post('v1/posts',payload).then(response => {
                    resolve(response.data);
                })
            });
        },
        update(_, payload){
            return new Promise((resolve)=>{
                api.put('v1/posts/'+payload.id,payload).then(response => {
                    resolve(response.data);
                })
            });
        },
        delete(_, payload){
            return new Promise((resolve)=>{
                api.delete('v1/posts/'+payload.id).then(response => {
                    resolve(response.data);
                })
            });
        }
	},

	getters: {
	}
}

export default post;