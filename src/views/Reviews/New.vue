<template>
  <div class="reviews-new">
    <h1>New Review</h1>
    <form v-on:submit.prevent="createReview()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Accessibility:
      <input type="text" v-model="newReviewAccessiblity" />
      <br />
      Cost:
      <input type="text" v-model="newReviewCost" />
      <br />
      Quality:
      <input type="text" v-model="newReviewQuality" />
      <br />
      Safety:
      <input type="text" v-model="newReviewSafety" />
      <br />
      Entertainment:
      <input type="text" v-model="newReviewEntertainment" />
      <br />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      newReviewAccessiblity: "",
      newReviewCost: "",
      newReviewQuality: "",
      newReviewSafety: "",
      newReviewEntertainment: "",
      user_id: localStorage.getItem("user_id"),
      city_id: localStorage.getItem("city_id"),
      user: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.user_id).then(response => {
      this.user = response.data;
    });
  },
  methods: {
    createReview: function() {
      var params = {
        accessibility: this.newReviewAccessiblity,
        cost: this.newReviewCost,
        quality: this.newReviewQuality,
        safety: this.newReviewSafety,
        entertainment: this.newReviewEntertainment,
        user_id: this.user_id,
        city_id: this.user.city_id
      };
      axios
        .post("/api/reviews", params)
        .then(response => {
          this.$router.push("/users/" + this.user_id);
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
