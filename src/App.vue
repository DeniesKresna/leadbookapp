<template>
  <div>
    <v-overlay :value="overlay"></v-overlay>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      overlay() {
        return this.$store.getters.overlay
      },
      user(){
        return this.$store.getters.user
      }
    }
  };

</script>

<style src="./styles/app.scss" lang="scss"/>


