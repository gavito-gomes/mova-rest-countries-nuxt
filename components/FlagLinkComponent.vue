<template>
  <v-card :elevation="4">
    <nuxt-link :to="href">
      <v-img :src="imgSrc" :aspect-ratio="16 / 9"></v-img>
    </nuxt-link>
  </v-card>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
};
</script>
