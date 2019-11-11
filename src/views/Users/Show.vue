<template>
  <div class="users-show">
    <h2>Name:{{ user.first_name }} {{ user.last_name }}</h2>
    <p>Username: {{ user.username }}</p>
    <p>Your City: {{ user.city_name }}</p>
    <p>Birthdate: {{ user.birth_date }}</p>
    <router-link :to="`/users/${user.id}/edit`">Edit User</router-link>

    <button v-on:click="destroyUser(user)">Delete User</button>
    <br />

    <h3>Your most recent review:</h3>

    <div v-if="review">
      <p>Accessibiliy: {{ review.accessibility }}</p>
      <p>Cost: {{ review.cost }}</p>
      <p>Quality: {{ review.quality }}</p>
      <p>Safety: {{ review.safety }}</p>
      <p>Entertainment: {{ review.entertainment }}</p>
      <p>Average Rating: {{ review.avg_rating }}</p>
      <router-link :to="`/reviews/${review.id}/edit`">Edit Review</router-link>
    </div>

    <div v-else>
      A review doesnt exist
      <br />
      <router-link :to="`/cities/${user.city_id}`">Create a Review</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      review: {},
      reviews: [],
      city: ""
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log(this.user);
      this.review = response.data.reviews.pop();
      this.city = response.data.city_id;
    });
  },
  methods: {
    destroyUser: function(user) {
      axios.delete("/api/users/" + this.user.id).then(response => {
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
        console.log(this.user);
        this.$router.push("/");
      });
    }
  }
};
</script>
