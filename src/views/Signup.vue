<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <select v-model="cityId" id="">
          <option value="">Pick a City</option>
          <option v-for="city in cities" v-bind:value="city.id">{{ city.name }}</option>
        </select>
        <br />

        <router-link to="/cities/new">Add a City</router-link>

        <div class="form-group">
          <label>First Name:</label>
          <input type="text" class="form-control" v-model="firstName" />
        </div>
        <div class="form-group">
          <label>Last Name:</label>
          <input type="text" class="form-control" v-model="lastName" />
        </div>
        <div class="form-group">
          <label>Username:</label>
          <input type="username" class="form-control" v-model="username" />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password" />
          <small v-if="password.length > 0 && password.length < 8">Must be at least 8 characters</small>
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation" />
          <small v-if="password != passwordConfirmation">Must match password</small>
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      cityId: "",
      cityName: "",
      firstName: "",
      lastName: "",
      username: "",
      zipCode: "",
      password: "",
      passwordConfirmation: "",
      cities: [],
      errors: [],
      status: "",
      citiesId: ""
    };
  },
  created: function() {
    axios.get("/api/cities").then(response => {
      this.cities = response.data.cities;
      console.log(this.cities);
    });
  },
  methods: {
    submit: function() {
      var params = {
        city_id: this.cityId,
        first_name: this.firstName,
        last_name: this.lastName,
        username: this.username,
        zip_code: this.zipCode,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.status = error.response.status;
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
