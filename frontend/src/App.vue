<template>
  <v-app>
    <v-main>
        <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
export default Vue.extend ({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>


