<template>
  <div class="cities-new">
    <h1>New City</h1>
    <form v-on:submit.prevent="createCity()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="newCityName" />
      State:
      <input type="text" v-model="newCityState" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      newCityName: "",
      newCityState: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    createCity: function() {
      var params = {
        name: this.newCityName,
        state: this.newCityState
      };
      axios
        .post("/api/cities", params)
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
