<template>
  <v-app>
    <app-bar-component></app-bar-component>
    <v-main>
      <Nuxt keep-alive />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>
