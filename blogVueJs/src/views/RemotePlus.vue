<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div>
            <div>
              <h2 class="text-h4 font-weight-bold">Api Net Core</h2>

            </div>

            <v-divider class="my-4"></v-divider>

            <v-btn class="mb-5" depressed color="accent" @click="add">add
                  <v-icon right dark>
                    mdi-plus
                </v-icon></v-btn> 
            <v-row >
              <v-col cols="12" md="6" lg="4" v-for="(item,index) in list" :key="index">
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
                        :src="item.link"
                        :aspect-ratio="16 / 9"
                        gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        height="200px"
                        class="elevation-2"
                        style="border-radius: 16px"
                      >
                        <v-card-text>
                          <v-btn @click="view(item.id)" color="accent">View</v-btn>
                        </v-card-text>
                      </v-img>

                      <v-card-text>
                        <div class="text-h5 font-weight-bold primary--text">
                          {{item.name}}
                        </div>

                        <div class="text-body-1 py-4" v-if="item.description">
                          {{item.description.length > 147 ? item.description.slice(0, 147) + " ..." : item.description}}
                        </div>
                        <div class="mb-5">
                            <v-btn depressed color="accent" @click="remove(item)">
                                <v-icon right dark>
                                    mdi-delete
                                </v-icon>&nbsp;Remove
                            </v-btn>
                            &nbsp;
                            <v-btn depressed color="accent" @click="edit(item.id)">
                                <v-icon right dark>
                                    mdi-table-edit
                                </v-icon>&nbsp;&nbsp;Edit
                            </v-btn>
                        </div>

                        <div class="d-flex align-center">
                          <v-avatar color="accent" size="36">
                            <v-icon dark>mdi-newspaper</v-icon>
                          </v-avatar>

                          <div class="pl-2">{{item.date}}</div>
                        </div>
                        
                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>
            </v-row>
            <infinite-loading @infinite="infiniteHandler">
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
            tempList:[],
            total:0,
            page:1,
            itemPerPage:5,
        }
    },
    async mounted(){
        try {
            this.page = 1;
            const {data} = await this.$store.dispatch('getAllPost');
            this.tempList = data;
            this.list = this.tempList.slice(0, this.itemPerPage);
            this.total = this.tempList.length;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        infiniteHandler($state) {
            setTimeout(() => {
                let newPage = this.page++;
                this.list = this.tempList != null ? this.tempList.slice(0, this.itemPerPage * newPage)  : [];
                if(this.list.length >= this.total){
                    $state.complete();    
                }else{
                    $state.loaded();
                }
            }, 500);
        },
        add(){
            router.push('/maintenance-remote');
        },
        edit(id) {
            router.push('/maintenance-remote/'+id);
        },
        async remove(item){
            await this.$store.dispatch('deletePost',item);
            window.location.reload();
        },
        view(id){
            router.push('/view-remote/'+id);
        }
        
    }
};
</script>
