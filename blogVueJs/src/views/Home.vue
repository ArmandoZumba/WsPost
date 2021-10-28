<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
            <div class="pt-5">
            <div>
              <v-btn depressed color="accent" @click="add">add
                  <v-icon right dark>
                    mdi-plus
                </v-icon></v-btn>  
              <v-row v-for="(item,index) in this.notices" :key="index" class="py-4">
                <v-col cols="12" md="4">
                  <v-card flat height="100%">
                    <v-img
                      :src="item.link"
                      :aspect-ratio="16 / 9"
                      height="100%"
                    ></v-img>
                  </v-card>
                </v-col>

                <v-col>
                  <div>
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

                    <h3 class="text-h5 font-weight-bold pt-3">
                      {{item.name}}
                    </h3>

                    <p class="text-h6 font-weight-regular pt-3 text--secondary">
                      {{item.description.length > 147 ? item.description.slice(0, 147) + " ..." : item.description}}
                    </p>

                    <div class="d-flex align-center">
                      <v-avatar color="accent" size="36">
                        <v-icon dark>mdi-newspaper</v-icon>
                      </v-avatar>

                      <div class="pl-2">{{item.date}}</div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
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

      <v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from '@/router';
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: "Home",
    data(){
        return{
            total: 0,
            page:1,
            itemPerPage:5,
            notices:[],
            localNotice :[
                    {
                    id:1,
                    name: "From penny post to $8-million as world’s first stamp heads for auction",
                    description: "‘The earliest securely dated example of the first postage stamp,’ Sotheby’s says, will be up for auction with a price estimate of up to $8.25-million",
                    content: "The Penny Black, 'the earliest securely dated example of the first postage stamp,' according to Sotheby’s.Reuters An example of the world’s first postage stamp, the Penny Black, is being offered at auction, Sotheby’s said on Tuesday, with a price est... [2038 chars]",
                    url: "https://www.theglobeandmail.com/world/article-from-penny-post-to-8-million-as-worlds-first-stamp-heads-for-auction-2/",
                    link: "https://www.theglobeandmail.com/resizer/YvV-9a1H2Un4SaMotZuJQmwyIjg=/1200x675/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/tgam/7XUYWOLX5ZMUNIDNN3G22IJVKQ.JPG",
                    date: "2021-10-26T13:56:46Z",
                    },
                    {
                    id:2,
                    name: "Samantha Akkineni Invokes Shilpa Shetty's Example in Defamation Case Against YouTube Channels",
                    description: "Samantha Akkineni had earlier lashed out at 'false rumours' being spread in the media against her following her separation from Naga Chaitanya.",
                    content: "Samantha Akkineni, who had filed a defamation case against a couple of YouTube channels and an individual, is in no mood to rest until she gets things right. It was reported that the Kukatpally court here had trashed Samantha’s appeal to take legal a... [2206 chars]",
                    url: "https://www.news18.com/news/movies/samantha-akkineni-invokes-shilpa-shettys-example-in-defamation-case-against-youtube-channels-4367252.html",
                    link: "https://images.news18.com/ibnlive/uploads/2021/10/samantha-akkineni-and-naga-chaitanya-163317146916x9.jpg",
                    date: "2021-10-26T12:31:50Z",
                    },
                    {
                    id:3,
                    name: "No entry: How to protect your businesses as effectively as a nightclub bouncer",
                    description: "Here we explain in more detail, using nightclubbing as an example, to show you how to best protect your organization.",
                    content: "How secure are you? Well, now is the time to find out. October is Cybersecurity Awareness Month, which aims to raise awareness of the important role cybersecurity plays in ensuring both businesses and individuals have the appropriate tools to defend ... [6911 chars]",
                    url: "https://www.itproportal.com/features/no-entry-how-to-protect-your-businesses-as-effectively-as-a-nightclub-bouncer/",
                    link: "https://cdn.mos.cms.futurecdn.net/LXoHHDwHCN5w9LzZ6ypULX-1200-80.jpg",
                    date: "2021-10-26T10:00:09Z",
                    },
                    {
                    id:4,
                    name: "Penny Black: One of world's first postage stamps to fetch up to £6m at auction",
                    description: "The Penny Black postage stamp dates back to 1840 and is the earliest securely dated example of the first postage stamp, according to Sotheby's.",
                    content: "An example of the world's first postage stamp - the Penny Black - bearing an image of Queen Victoria is set to fetch as much as £6m at auction. Launched in 1840, the item is the earliest securely dated example of the first postage stamp, according",
                    url: "https://news.sky.com/story/penny-black-one-of-worlds-first-postage-stamps-to-fetch-up-to-6m-at-auction-12444831",
                    link: "https://e3.365dm.com/21/10/1600x900/skynews-stamp-penny-black_5559859.jpg?20211026084454",
                    date: "2021-10-26T09:14:00Z",
                    },
                    {
                    id:5,
                    name: "World's first stamp heads for auction",
                    description: "An example of the world's first postage stamp, the Penny Black, is being offered at auction, Sotheby's says, with a price estimate of up to STG6 million ($A11...",
                    content: "news, latest-news An example of the world's first postage stamp, the Penny Black, is being offered at auction, Sotheby's says, with a price estimate of up to STG6 million ($A11 million). Dating from 1840, the item is the earliest securely dated exam... [1833 chars]",
                    url: "https://www.canberratimes.com.au/story/7485876/worlds-first-stamp-heads-for-auction/",
                    link: "https://www.canberratimes.com.au/images/transform/v1/crop/frm/silverstone-feed-data/f7be4943-ca51-4331-b1a1-1fac786b867f.jpg/r0_74_800_526_w1200_h678_fmax.jpg",
                    date: "2021-10-26T09:02:39Z",
                    },
                    {
                    id:6,
                    name: "Bicycle-, gun-linked injuries rose during COVID-19 lockdowns, study finds",
                    description: "In yet another example of the cost of the pandemic, a new study finds there were significant increases in bicycle- and gun-related injuries during coronavirus lockdowns in the U.S., but a decrease in traffic injuries.",
                    content: "| License Photo A study of four hospitals in major cities found increases in bicycle- and gun-related injuries last year during COVID-19 pandemic lockdowns. File Photo by John Angelillo/UPI In yet another example of the cost of the pandemic, a new st... [3057 chars]",
                    url: "https://www.upi.com/Health_News/2021/10/26/covid19-injuries-bikes-guns-up-study-finds/1351635194650/",
                    link: "https://cdnph.upi.com/sv/ph/og/upi/1351635194650/2021/1/d57442913447112e224b3f27271c8e60/v1.5/Bicycle-gun-linked-injuries-rose-during-COVID-19-lockdowns-study-finds.jpg",
                    date: "2021-10-26T07:05:07Z",
                    },
                    {
                    id:7,
                    name: "The Amount Spent For New IPL Teams Shows Why Cricket Is The Second Most Popular Sport - Shane Warne",
                    description: "Former Aussie spinner Shane Warne cited the example of the amount spent on two new IPL teams to claim that cricket is the second most popular sport.",
                    content: "Former Australian leg-spinner Shane Warne stated that the amount of money spent by businesses to become owners of the two new IPL teams shows why cricket is the second most popular sport on the planet after football. On October 25, closed bidding was",
                    url: "https://cricketaddictor.com/indian-premier-league-ipl/amount-spent-shows-why-cricket-is-second-most-popular-sport-shane-warne/",
                    link: "https://cricketaddictor.com/wp-content/uploads/2021/02/Shane-Warne.jpg",
                    date: "2021-10-26T04:37:26Z",
                    },
                    {
                    id:8,
                    name: "From penny post to $8 million as world's first stamp heads for auction",
                    description: "An example of the world's first postage stamp, the Penny Black, is being offered at auction, Sotheby's said on Tuesday, with a price estimate of up to $8.25 million.",
                    content: "The World's first postage stamp, a Penny Black, is seen on display ahead of auction at Sotheby's in London, Britain, October 19, 2021. Picture taken October 19, 2021. REUTERS/Hannah McKay LONDON, Oct 26 (Reuters) - An example of the world's first pos... [2019 chars]",
                    url: "https://www.reuters.com/lifestyle/penny-post-8-million-worlds-first-stamp-heads-auction-2021-10-26/",
                    link: "https://www.reuters.com/resizer/DzJ7pTeGDQalrKlrO6o5Rs1jGSM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/I64OCO3QL5MFDDIBYLZ3QKM4YA.jpg",
                    date: "2021-10-26T04:00:00Z",
                    },
                    {
                    id:9,
                    name: "'Will Set Example Through Case': UAPA FIRs Against Kashmir Medical Students for Anti-India Sloganeering",
                    description: "The students of two medical colleges raised anti-India abusive slogans after Pakistan won the match against India in Dubai on Sunday, causing outrage on social media.",
                    content: "The J&K Police has registered two FIRs against hostel wardens, management and students of two medical colleges in Srinagar where students created a ruckus and raised anti-India abusive slogans after Pakistan won the match against India in Dubai on Su... [2268 chars]",
                    url: "https://www.news18.com/news/india/will-set-example-through-case-uapa-firs-against-kashmir-medical-students-for-anti-india-sloganeering-4364750.html",
                    link: "https://images.news18.com/ibnlive/uploads/2021/10/india-pakistan-2-163521905716x9.jpg",
                    date: "2021-10-26T03:31:22Z",
                    },
                    {
                    id:10,
                    name: "Officials say 18 villagers shot dead at mosque in Nigeria",
                    description: "He said another four people were injured.Niger police commissioner Monday Kuryas said the attack was related to the conflict between the villagers and the Fulani herders.The latest attack is another example of the troubled security situation in most states in Nigerias northwest and central regions.",
                    content: "At least 18 worshippers were killed by gunmen who attacked a mosque in northern Nigeria during early morning prayers Monday, local authorities and police told The Associated Press. The attack took place in Mazakuka village in Mashegu local government... [1984 chars]",
                    url: "https://www.devdiscourse.com/article/headlines/1781963-officials-say-18-villagers-shot-dead-at-mosque-in-nigeria",
                    link: "https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/imagegallery/27_06_2019_15_04_53_4794057.jpg?width=920&format=jpeg",
                    date: "2021-10-25T22:10:01Z",
                    },
                    ],
            tempNotice:[],
        }
    },
    components: {
        InfiniteLoading,
    },
    mounted(){
        const data = JSON.parse( localStorage.getItem('listPostModel'));
        this.page = 1;
        if(data == null){
            this.tempNotice = this.localNotice;
            localStorage.setItem('listPostModel',JSON.stringify(this.tempNotice));
        }else{
            this.tempNotice = data;
        }
        this.notices = this.tempNotice.slice(0, this.itemPerPage);
        this.total = this.tempNotice.length;
    },
    methods: {
        edit(id) {
            router.push('/maintenance-local/'+id);
        },
        async remove(postModel){
            const index = this.notices.findIndex(x => x.id == postModel.id);
            this.notices.splice(index,1);
            localStorage.removeItem('listPostModel');
            localStorage.setItem('listPostModel',JSON.stringify(this.notices));
        },
        add(){
            router.push('/maintenance-local');
        },
        infiniteHandler($state) {
            setTimeout(() => {
                let newPage = this.page++;
                this.itemPerPage = 5;
                this.notices = this.tempNotice.slice(0, this.itemPerPage * newPage);
                if(this.notices.length >= this.total || this.notices.length == 0){
                    $state.complete();    
                }else{
                    $state.loaded();
                }
            }, 500);
        },
        
    }
};
</script>
