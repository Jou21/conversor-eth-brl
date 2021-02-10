<template>
  <v-app>
    <v-main>
      <!--img alt="Ethereum" src="./assets/logo.png" height="300px" width="300px"/-->
    <Conversor moeda-a="ETH" moeda-b="BRL" /> 
    </v-main>
  </v-app>
</template>

<script>
import Conversor from './components/Conversor';

export default {
  name: 'App',

  components: {
    Conversor,
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
