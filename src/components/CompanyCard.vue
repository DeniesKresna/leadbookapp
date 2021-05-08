<template>
<div>
  <v-card
    class="mx-auto my-12"
  >
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{company.name}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="favouriteStar"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 subtitle-1">
        {{company.address}}
      </div>

      <div>{{company.description}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        v-if="!company.isFavourite"
        class="green--text"
        text
        @click="setFavourite(true)"
      >
        Make Favourite
      </v-btn>
      <v-btn
        v-else
        class="red--text"
        text
        @click="setFavourite(false)"
      >
        Make Unfavourite
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>
<script>
export default {
  name: 'CompanyCard',
  props: ["company"],
  data(){
      return {
      }
  },
  methods: {
    setFavourite (status) {
      let payload = {
        status: status,
        id: this.company.id
      }
      this.$emit('favouriteClick',payload);
    },
  },
  computed:{
    favouriteStar() {
      return this.company.isFavourite? 5:0;
    }
  }
};
</script>