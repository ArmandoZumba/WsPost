<template>
    <v-container fluid>
        <v-layout align-center justify-center>
            <v-flex xs12 sm12 md12>
                <v-card class="elevation-12">
                    <v-toolbar dark color="accent">
                        <v-toolbar-title>New Local Item</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field
                                color="#3e2723"
                                name="Titulo"
                                label="Title"
                                v-model="postModel.name"
                                :rules="requerido"
                                required
                                
                            >
                            </v-text-field>
                            <v-textarea
                            color="#3e2723"
                                name="Descripcion"
                                label="Description"
                                type="text"
                                v-model="postModel.description"
                                :rules="requerido"
                                required
                            >
                            </v-textarea>
                            
                            <v-text-field
                                color="#3e2723"
                                name="LinkImagen"
                                label="Link Img"
                                v-model="postModel.link"
                                :rules="requerido"
                                required
                            >
                            </v-text-field>
                            
                            <div v-if="this.postModel.link != null && this.postModel.link != ''">
                                <v-card flat height="500">
                                    <v-img
                                    :src="postModel.link"
                                    :aspect-ratio="16 / 9"
                                    height="500"
                                    ></v-img>
                                </v-card>

                            </div>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="back"
                            color="accent"
                            >Back</v-btn
                        >
                        &nbsp;
                        <v-btn
                            @click="submit"
                            color="accent"
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
       
    </v-container>
</template>

<script>
import router from '@/router';

export default {
    name: 'Signin',
    data() {
        return {
            valid: false,
            requerido: [
                v => !!v || 'Required',
            ],
            postModel:{
                description: "",
                id: 0,
                link: "",
                name: "",
                content: "",
                date:"", 
            },
            listaPost:[],

        };
    },
    async created(){
        const id = this.$route.params && this.$route.params.id;
        const data = JSON.parse( localStorage.getItem('listPostModel'));
        this.listaPost = data == null ? []: data;  
         if(id > 0){
            this.postModel = this.listaPost.find(x => x.id == id);
         }
    },
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {
                try {
                    if(this.postModel.id > 0){
                        const index = this.listaPost.findIndex(x => x.id == this.postModel.id);
                        this.listaPost.splice(index,1,this.postModel);
                    }else{
                        const max = this.maxId(this.listaPost);
                        this.postModel.id = max + 1;
                        const today  = new Date();
                        this.postModel.date = today.toLocaleDateString("en-US");
                        this.listaPost.push(this.postModel);
                    }

                    localStorage.removeItem('listPostModel');
                    localStorage.setItem('listPostModel',JSON.stringify(this.listaPost));
                    router.push('/');

                } catch (error) {
                    console.log(error,"Error");
                }
                
            }else{
                this.text = "No data";
            }
        },
        maxId(array){
            if(array.length > 0){
                let nuevoArrayId = [];
                nuevoArrayId = array.map(x => x.id);
                return Math.max.apply(null, nuevoArrayId);
            }
            return 0;
        },
        back(){
            router.push('/'); 
        }
    },
   
   
};
</script>

<style scoped></style>
