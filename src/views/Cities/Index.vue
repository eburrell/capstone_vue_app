<template>
  <div class="cities-index">
    <div>Top Rated City: {{ highestRated.name }}, {{ highestRated.state }}</div>
    <div>Most Popular City: {{ mostPopular.name }}, {{ mostPopular.state }}</div>
    <h1>All Cities</h1>

    <div class="form-group">
      <label for="name">Search</label>
      <input type="text" class="form-control" placeholder="Enter City Name..." v-model="cityFilter" list="name" />
    </div>
    <br />
    <router-link to="/cities/new">Add a City</router-link>

    <div v-for="city in orderBy(filterBy(cities, cityFilter), 'name', sortAscending)">
      <h2>{{ city.name }}</h2>
      <p>{{ city.state }}</p>
      <router-link v-bind:to="`/cities/${city.id}`">Show</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      cities: [],
      highestRated: [],
      mostPopular: [],
      cityFilter: "",
      sortAscending: 1
    };
  },
  created: function() {
    axios.get("/api/cities").then(response => {
      this.cities = response.data.cities;
      this.mostPopular = response.data.most_reviewed_city;
      this.highestRated = response.data.highest_rated_city;
      console.log(response.data);
    });
  },
  methods: {}
};
</script>
