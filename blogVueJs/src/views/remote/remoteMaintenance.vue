<template>
    <v-container fluid>
        <v-layout align-center justify-center>
            <v-flex xs12 sm12 md12>
                <v-card class="elevation-12">
                    <v-toolbar dark color="accent">
                        <v-toolbar-title>New Remote + Item</v-toolbar-title>
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

                            <v-textarea
                            color="#3e2723"
                                name="Content"
                                label="Content"
                                type="text"
                                v-model="postModel.content"
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
        if(id > 0){
        const {data} = await this.$store.dispatch('getPostById',id);
        this.postModel = data;  
        }
        
    },
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {
                try {
                    if(this.postModel.id > 0){
                        await this.$store.dispatch('updatePost',this.postModel);
                    }else{
                        let today = new Date();
                        this.postModel.date = today.toLocaleDateString("en-US");
                        await this.$store.dispatch('createPost',this.postModel);
                    }

                    router.push('/remote-plus');

                } catch (error) {
                    console.log(error,"Error");
                }
                
            }else{
                console.log("no data");
            }
        },
        back(){
            router.push('/remote-plus'); 
        }
    },
   
   
};
</script>

<style scoped></style>
