<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div>
            <v-card flat color="transparent">
              <v-img
                :src="postModel.link"
                :aspect-ratio="16 / 9"
                gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                style="border-radius: 16px"
              ></v-img>

              <v-card-text>

                <div class="text-h4 font-weight-bold primary--text pt-4">
                  <h4>{{postModel.name}}</h4>
                </div>

                <div class="text-body-1 py-4">
                  {{postModel.description}}
                </div>

                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <v-avatar color="accent" size="36">
                      <v-icon dark>mdi-newspaper</v-icon>
                    </v-avatar>

                    <div class="pl-2 text-body-1">{{postModel.date}}</div>
                  </div>

                </div>

                <v-divider class="my-4"></v-divider>

                <div>
                  <p class="text-subtitle-1 primary--text font-weight-medium">
                    {{postModel.content}}
                  </p>
                </div>

              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            postModel:{
                description: "",
                id: 0,
                link: "",
                name: "",
                content: "",
                date:"", 
            },
        };
    },
    async created(){
        const id = this.$route.params && this.$route.params.id;
        if(id > 0){
        const {data} = await this.$store.dispatch('getPostById',id);
        this.postModel = data;  
        }
        
    },
};
</script>
