<template>
  <div class="reviews-edit">
    <h1>Edit review</h1>
    <form v-on:submit.prevent="updateReview(review)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>

      <select v-model="cityId" id="">
        <option value="">Pick a City</option>
        <option v-for="city in cities" v-bind:value="city.id">{{ city.name }}</option>
      </select>
      {{ cityId }}

      accessibility:
      <input type="text" v-model="review.accessibility" />
      <br />
      cost:
      <input type="text" v-model="review.cost" />
      <br />
      quality:
      <input type="text" v-model="review.quality" />
      <br />
      safety:
      <input type="text" v-model="review.safety" />
      <br />
      entertainment:
      <input type="text" v-model="review.entertainment" />
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
      review: {},
      cities: {},
      cityId: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/reviews/" + this.$route.params.id).then(response => {
      this.review = response.data;
      console.log(this.review);
    });
  },
  methods: {
    updateReview: function(review) {
      var params = {
        accessibility: review.accessibility,
        cost: review.cost,
        quality: review.quality,
        safety: review.safety,
        entertainment: review.entertainment
      };
      axios
        .patch("/api/reviews/" + review.id, params)
        .then(response => {
          this.$router.push("/users/" + this.review.user_id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
