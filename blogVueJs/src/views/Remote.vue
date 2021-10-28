<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div>
            <div>
              <h2 class="text-h4 font-weight-bold">GNews</h2>

              <h4 class="text-h6">GNews API is a simple news REST API with which you can search news articles and get 
                  results in JSON.<strong> Includes infinite scroll.</strong></h4>
            </div>

            <v-divider class="my-4"></v-divider>
            <div>
                <v-row>
                <v-col cols="12" md="6" lg="4" v-for="(item,index) in list" :key="index" >
                    <v-hover
                    v-slot:default="{ hover }"
                    open-delay="50"
                    close-delay="50"
                    >
                    <div>
                        <v-card
                        flat
                        :color="hover ? 'white' : 'transparent'"
                        :elevation="hover ? 12 : 0"
                        hover
                        >
                        <v-img
                            :src="item.image"
                            :aspect-ratio="16 / 9"
                            gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                            height="200px"
                            class="elevation-2"
                            style="border-radius: 16px"
                        >
                        </v-img>

                        <v-card-text>
                            <div class="text-h5 font-weight-bold primary--text">
                            {{item.title}}
                            </div>

                            <div class="text-body-1 py-4">
                            {{item.description.length > 147 ? item.description.slice(0, 147) + " ..." : item.description}}
                            </div>

                            <div class="d-flex align-center">
                            <v-avatar color="accent" size="36">
                                <v-icon dark>mdi-newspaper</v-icon>
                            </v-avatar>

                            <div class="pl-2">{{item.publishedAt}}</div>
                            </div>
                        </v-card-text>
                        </v-card>
                    </div>
                    </v-hover>
                </v-col>
 
                </v-row>
                <infinite-loading @infinite="infiniteHandler" >
                    <v-alert
                    dense
                    class="mt-10"
                    slot="no-more"
                    text
                    color="blue-grey"
                    >
                    There is no more information
                    </v-alert>
                </infinite-loading>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import router from '@/router';

export default {
  name: "Category",
  components: {
    InfiniteLoading,
  },
    data(){
        return{
            list:[],
            total:0,
            page:1,
            items:10,
        }
    },
    async mounted(){
        try {
            this.page = 1;
            this.list = [];
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async infiniteHandler($state) {
            let newPage = this.page++;
            const {data} = await this.$store.dispatch('getAllGNews',{page:newPage,items:(this.items * newPage)});
            if (data.articles.length) {
                this.list.push(...data.articles);
                $state.loaded();
                if(this.list.length >= data.totalArticles){
                    $state.complete();    
                }
            } else {
                $state.complete();
            }
     
        },
        ver(id){
            router.push('/view-remote/'+id);
        }
        
    }
};
</script>
