<template>
  <v-app>
    <v-main>
      <v-container>
        <v-col cols="12" sm="12">
          <!--img alt="Ethereum" src="./assets/logo.png" height="300px" width="300px"/-->
          <Conversor moeda-a="ETH" moeda-b="BRL" />
          <Sobre />
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Conversor from './components/Conversor';
import Sobre from './components/Sobre';

export default {
  name: 'App',

  components: {
    Conversor,
    Sobre,
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
