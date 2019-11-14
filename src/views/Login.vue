<template>
  <div class="login">
    <div class="container pb-50">
      <!-- LOGIN SECTION -->
      <section class="clearfix loginSection">
        <div class="container">
          <div class="row">
            <div class="center-block col-md-5 col-sm-6 col-xs-12">
              <div class="panel panel-default loginPanel">
                <div class="panel-heading text-center">Members log in</div>
                <div class="panel-body">
                  <form v-on:submit.prevent="submit()" class="loginForm">
                    <ul>
                      <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>
                    <div class="form-group">
                      <label>Username:</label>
                      <input type="username" class="form-control" v-model="username" />
                    </div>
                    <div class="form-group">
                      <label>Password:</label>
                      <input type="password" class="form-control" v-model="password" />
                    </div>

                    <div class="form-group">
                      <button type="submit" class="btn btn-primary pull-left">Log In</button>
                      <a href="/" class="pull-right link">Fogot Password?</a>
                    </div>
                  </form>
                </div>
                <div class="panel-footer text-center">
                  <p>
                    Not a member yet?
                    <router-link to="/signup" class="link">Sign up</router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>username:</label>
          <input type="username" class="form-control" v-model="username" />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      username: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        username: this.username,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid username or password."];
          this.username = "";
          this.password = "";
        });
    }
  }
};
</script>
