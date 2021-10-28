import Vue from 'vue';
import Vuex from 'vuex';
import blogService from '@/services/blogService';

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
       // eslint-disable-next-line no-unused-vars
        async getAllPost(context){  
            const data = await blogService.getAllPost();
            return data;
        },

        async getPostById(context,id){       
            const data = await blogService.getPostById(id);
            return data;
        },

        async updatePost(context,modelo){
            const data = await blogService.updatePost(modelo);
            return data;
        },

        async createPost(context,modelo){
            const data = await blogService.createPost(modelo);
            return data;
        },

        async deletePost(context,modelo){
            const data = await blogService.deletePost(modelo);
            return data;
        },

        async getAllGNews(context,paginator){       
            const data = await blogService.getAllGNews(paginator);
            return data;
        },
    },
});
