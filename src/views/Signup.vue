<template>
  <div class="signup">
    <div class="container">
      <!-- PAGE TITLE SECTION -->
      <section class="clearfix pageTitleSection" style="background-image: url();">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <div class="pageTitle">
                <h2>Sign Up Page</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SIGN UP SECTION -->
      <section class="clearfix signUpSection">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-xs-12">
              <div class="signUpFormArea">
                <div class="priceTableTitle">
                  <h2>Account Registration</h2>
                  <p>
                    Please fill out the fields below to create your account. Your email address and information will NOT
                    be sold or shared with any 3rd party. If you already have an account, please
                    <router-link to="/login">click here</router-link>
                    .
                  </p>
                </div>
                <div class="signUpForm">
                  <form v-on:submit.prevent="submit()">
                    <div class="formSection">
                      <h3>Account Information</h3>
                      <div class="row">
                        <div class="form-group col-sm-6 col-xs-12 col-md-8 col-lg-6">
                          <select v-model="cityId" id="">
                            <option value="">Which city do you live in?</option>
                            <option v-for="city in cities" v-bind:value="city.id">{{ city.name }}</option>
                          </select>
                        </div>

                        <div class="form-group col-xs-12">
                          <label for="firstName" class="control-label">First Name:</label>
                          <input id="firstName" type="text" class="form-control" v-model="firstName" />
                        </div>

                        <div class="form-group col-xs-12">
                          <label for="lastName" class="control-label">Last Name:</label>
                          <input to="lastName" type="text" class="form-control" v-model="lastName" />
                        </div>

                        <div class="form-group col-xs-12">
                          <label for="usernames" class="control-label">Username:</label>
                          <input type="username" class="form-control" v-model="username" />
                        </div>

                        <div class="form-group col-sm-6 col-xs-12">
                          <label for="passwordFirst" class="control-label">Password:</label>
                          <input id="passwordFirst" type="password" class="form-control" v-model="password" />
                          <small v-if="password.length > 0 && password.length < 8">Must be at least 8 characters</small>
                        </div>

                        <div class="form-group col-sm-6 col-xs-12">
                          <label for="passwordAgain" class="control-label">Password (re-type):</label>
                          <input
                            to="passwordAgain"
                            type="password"
                            class="form-control"
                            v-model="passwordConfirmation"
                          />
                          <small v-if="password != passwordConfirmation">Must match password</small>
                        </div>

                        <!-- <select v-model="cityId" id="">
                          <option value="">Which city do you live in?</option>
                          <option v-for="city in cities" v-bind:value="city.id">{{ city.name }}</option>
                        </select>
                        <br />
                        <p>Don't see your city?</p>
                        <router-link to="/cities/new">Add a City</router-link> -->

                        <div class="form-group col-xs-12 mb0">
                          <button type="submit" class="btn btn-primary" value="Submit">Create Account</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- <form v-on:submit.prevent="submit()">
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
      </form> -->

    <!-- /div> -->
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
