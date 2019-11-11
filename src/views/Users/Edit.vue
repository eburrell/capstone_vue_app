<template>
  <div class="users-edit">
    <h1>Edit user</h1>
    <form v-on:submit.prevent="updateUser(user)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
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
      zip code:
      <input type="text" v-model="user.zip_code" />
      <br />
      birth date:
      <input type="text" v-model="user.birth_date" />
      <br />

      <input type="submit" value="Update" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      errors: [],
      user_id: localStorage.getItem("user_id")
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function(user) {
      var params = {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        password: user.password,
        zip_code: user.zip_code,
        birth_date: user.birth_date
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
