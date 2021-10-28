<template>
  <div>
    <v-footer  color="primary" dark app absolute>
      <v-container>
        <v-row align="start">

          <v-col cols="12" md="3">
            <v-list flat color="transparent">
              <v-subheader class="text-h6">About</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, i) in About"
                  :key="i"
                  :href="item.href"
                  dense
                  target="_black"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-3"
                      v-text="item.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>

          <v-col cols="12" md="3">
            <v-list flat color="transparent">
              <v-subheader class="text-h6">Contact</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, i) in Contact"
                  :key="i"
                  :href="item.href"
                  dense
                  target="_black"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-3"
                      v-text="item.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>

          <v-col cols="12" md="3">
            <v-list flat color="transparent">
              <v-subheader class="text-h6">Our Sites</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, i) in Sites"
                  :key="i"
                  :href="item.href"
                  dense
                  target="_black"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-3"
                      v-text="item.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>


          <v-col cols="12" md="3">
            <v-list flat color="transparent">
              <v-subheader class="text-h6">Follow</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, i) in Follow"
                  :key="i"
                  :href="item.href"
                  dense
                  target="_black"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-3"
                      v-text="item.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
       
        </v-row>

        <div class="text-center mt-6">
          Copyright &copy;
          
          {{ new Date().getFullYear() }}. All rights reserved.
        </div>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    About: [
      {
        text: "TERMS OF USE",
        href: "",
      },
      {
        text: "PRIVACY",
        href: "",
      },
    ],
    Contact: [
      {
        text: "ADVERTISEMENT",
        href: "",
      },
      {
        text: "ASK US ANYTHING",
        href: "",
      },
    ],
    Sites: [
      {
        text: "HODINKEE.COM",
        href: "",
      },
      {
        text: "HODINKEE.JP",
        href: "",
      },
    ],
    Follow: [
      {
        text: "FACEBOOK",
        href: "",
      },
      {
        text: "TWITTER",
        href: "",
      },
    ],
  }),
};
</script>
