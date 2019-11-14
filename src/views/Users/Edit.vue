<template>
  <div class="users-edit">
    <!-- DASHBOARD PROFILE SECTION -->
    <section class="clearfix bg-dark profileSection">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-5 col-xs-12"></div>
          <div class="col-md-8 col-sm-7 col-xs-12">
            <form v-on:submit.prevent="updateUser(user)">
              <div class="dashboardBoxBg">
                <div class="profileIntro">
                  <h2>Your Profile</h2>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </div>
              </div>
              <div class="dashboardBoxBg mt30">
                <div class="profileIntro">
                  <h3>Edit Profile</h3>
                  <div class="row">
                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="firstName">First Name</label>
                      <input type="text" class="form-control" id="firstName" v-model="user.first_name" />
                    </div>

                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="lastNameProfile">Last Name</label>
                      <input type="text" v-model="user.last_name" class="form-control" id="lastNameProfile" />
                    </div>

                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="emailProfile">Username</label>
                      <input type="text" v-model="user.username" class="form-control" id="emailProfile" />
                    </div>
                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="phoneProfile">Password</label>
                      <input
                        type="text"
                        v-model="user.password"
                        class="form-control"
                        id="phoneProfile"
                        placeholder="password"
                      />
                    </div>
                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="listingCategory">Category</label>
                      <div class="contactSelect">
                        <select name="guiest_id9" v-model="cityId" id="guiest_id9" class="select-drop">
                          <option value="0">All Category</option>
                          <option value="1">Restaurant</option>
                          <option value="2">Bar</option>
                          <option value="3">Cafe</option>
                          <option value="">Update your City</option>
                          <option v-for="city in cities" v-bind:value="city.id">{{ city.name }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group col-xs-12">
                      <label for="aboutYou">About You</label>
                      <textarea class="form-control" rows="5" id="aboutYou" placeholder="About You"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="btn-area mt30">
                <button type="submit" value="Update" class="btn btn-primary">Save Change</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="copyRightDashboard">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <p>Copyright © 2016. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
    <!-- <h1>Edit User Profile</h1> -->
    <!-- <form v-on:submit.prevent="updateUser(user)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <select v-model="cityId" id="">
        <option value="">Update your City</option>
        <option v-for="city in cities" v-bind:value="city.id">{{ city.name }}</option>
      </select>
      <br />
      {{ user.cities }}
      <router-link to="/cities/new">Add a City</router-link>
      <br />
      first name:
      <input type="text" v-model="user.first_name" />
      <br />
      last name:
      <input type="text" v-model="user.last_name" />
      <br />
      username:
      <input type="text" v-model="user.username" />
      <br />
      password:
      <input type="text" v-model="user.password" />
      <br />
      birth date:
      <input type="text" v-model="user.birth_date" />
      <br />

      <input type="submit" value="Update" />
    </form> -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      cities: [],
      cityId: "",
      errors: [],
      user_id: localStorage.getItem("user_id")
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log(response.data);
    });
    axios.get("/api/cities").then(response => {
      this.cities = response.data.cities;
      console.log(this.cities);
    });
  },
  methods: {
    updateUser: function(user) {
      var params = {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        password: user.password,
        birth_date: user.birth_date,
        city_id: this.cityId
      };
      axios
        .patch("/api/users/" + user.id, params)
        .then(response => {
          this.$router.push("/users/" + this.user_id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
