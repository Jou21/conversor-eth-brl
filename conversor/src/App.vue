<template>
  <v-app>
    <v-main>
      <v-container>
        <v-col cols="12" sm="12">
          <router-view></router-view>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import Conversor from './components/Conversor';

export default {
  name: 'App',
  components: {
    //Conversor,
  },

  data: () => ({
    //
  }),
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
