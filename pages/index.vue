<template>
  <v-container>
    <filter-component
      :filter="filter"
      :filtersOptions="filterOptions"
      @submit="search"
    ></filter-component>
    <list-countries-component
      :items="countries"
      :filter="filter"
      :error="error"
      :loading="loading"
    ></list-countries-component>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      countries: [],
      filter: this.filterProp || {
        type: this.$api.filters.name.key,
        value: "",
      },
      error: "",
      filterOptions: this.$api.defaultFilterOptions,
      loading: false,
    };
  },
  computed: {
    filterProp() {
      return this.$nuxt.$route.params.filterProp;
    },
  },
  methods: {
    search(filter = {}) {
      const { type, value } = filter;
      if (!value) return;
      this.filter = filter;
      this.findCountries(type, value);
    },
    findCountries: async function (type, value) {
      this.loading = true;
      try {
        let res = await this.$api.getCountries(type, value);
        this.countries = res.data;
      } catch (err) {
        let error = JSON.parse(JSON.stringify(err));
        console.log(error);
        this.error = "Algo deu errado. Tente novamente mais tarde.";
      }
      this.loading = false;
    },
  },
  watch: {
    filterProp(curr, old) {
      console.log("filter", curr);
      this.filter = this.filterProp;
    },
    $route(curr, old) {
      // console.log("aqui de novo", this.filterProp);
      this.search(this.filterProp);
    },
  },
  created() {
    this.$api
      .getAllCountries()
      .then((res) => {
        this.filterOptions = this.$api.formatOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
