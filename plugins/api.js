export default function (ctx, inject) {
  const filters = {
    name: { label: "País", key: "name" },
    region: { label: "Região", key: "region" },
    capital: { label: "Capital", key: "capital" },
    lang: { label: "Idioma", key: "languages" },
    currency: { label: "Moeda", key: "currencies" },
  };
  const filtersArr = Object.values(filters);
  const filtersKeys = Object.values(filters).map((filter) => filter.key);
  const getLabelFromKey = (key) => {
    let filter = filtersArr.find((filter) => filter.key === key);
    return filter ? filter.label : "";
  };
  const defaultFilterOptions = filtersKeys.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});

  const getCountries = (filterKey = "", filterValue) => {
    switch (filterKey) {
      case filters.name.key:
        return ctx.$axios.get(`name/${filterValue}`);
      case filters.region.key:
        return ctx.$axios.get(`region/${filterValue}`);
      case filters.capital.key:
        return ctx.$axios.get(`capital/${filterValue}`);
      case filters.lang.key:
        return ctx.$axios.get(`lang/${filterValue}`);
      case filters.currency.key:
        return ctx.$axios.get(`currency/${filterValue}`);
    }
  };

  const getCountryInfo = (code) => {
    return ctx.$axios.get(`alpha/${code}`);
  };

  const getCountriesByCode = (codes = []) => {
    return ctx.$axios.get(`alpha?codes=${codes.join(",")}`);
  };

  const getAllCountries = (fields = filtersKeys) => {
    return ctx.$axios.get(`all?fields=${fields.join(",")}`);
  };

  const formatOptions = (countries) => {
    let reduced = countries.reduce((options, item) => {
      //names
      if (options[filters.name.key]) {
        if (!options[filters.name.key].includes(item.name.common))
          options[filters.name.key] = [
            ...options[filters.name.key],
            item.name.common,
          ];
      } else {
        options[filters.name.key] = [];
      }
      //region
      if (options[filters.region.key]) {
        if (!options[filters.region.key].includes(item.region))
          options[filters.region.key] = [
            ...options[filters.region.key],
            item.region,
          ];
      } else {
        options[filters.region.key] = [];
      }
      //capital
      if (options[filters.capital.key]) {
        item.capital.forEach((capital) => {
          if (!options[filters.capital.key].includes(capital))
            options[filters.capital.key] = [
              ...options[filters.capital.key],
              capital,
            ];
        });
      } else {
        options[filters.capital.key] = [];
      }
      //currencies
      if (options[filters.currency.key]) {
        Object.keys(item.currencies).forEach((currency) => {
          if (!options[filters.currency.key].includes(currency))
            options[filters.currency.key] = [
              ...options[filters.currency.key],
              currency,
            ];
        });
      } else {
        options[filters.currency.key] = [];
      }
      //languages
      if (options[filters.lang.key]) {
        Object.values(item.languages).forEach((lang) => {
          if (!options[filters.lang.key].includes(lang))
            options[filters.lang.key] = [...options[filters.lang.key], lang];
        });
      } else {
        options[filters.lang.key] = [];
      }

      return options;
    }, defaultFilterOptions);
    return reduced;
  };

  inject("api", {
    filters,
    filtersArr,
    getLabelFromKey,
    getCountries,
    getCountryInfo,
    getCountriesByCode,
    getAllCountries,
    formatOptions,
  });
}
