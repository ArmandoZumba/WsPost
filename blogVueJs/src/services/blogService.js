import config from "@/config/AppConfig";
import Axios from 'axios';

export default {	
    async getAllGNews(paginator) {
		return Axios.get(config.baseUrlGnews + 
            "/v4/search?"+"q=watches&max="+paginator.items+"&page="+paginator.page+"&token="+config.baseToken,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
	},

	async getAllPost() {
		return Axios.get("/feed/PostModels",{
            headers: {
                'Content-Type': 'application/json'
            }
        });
	},

    async getPostById(id){
        return Axios.get("/feed/PostModels/"+id,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    async updatePost(model){
        return Axios.put("/feed/PostModels/"+model.id, JSON.stringify(model),{
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    async createPost(model){
        return Axios.post("/feed/PostModels", JSON.stringify(model),{
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    async deletePost(model){
        return Axios.delete("/feed/PostModels/" +model.id,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}