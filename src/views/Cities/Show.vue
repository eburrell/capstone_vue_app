<template>
  <div class="cities-show">
    <h2>{{ city.name }}</h2>
    <h3>{{ city.state }}</h3>
    <h4>Average Score Overall: {{ avg_rating }}</h4>
    <h4>Average Accessibility: {{ avg_access }}</h4>
    <h4>Average Cost: {{ avg_cost }}</h4>
    <h4>Average Quality of life: {{ avg_quality }}</h4>
    <h4>Average Safety: {{ avg_safety }}</h4>
    <h4>Average Entertainmant: {{ avg_entertainment }}</h4>

    <h3>Reviews:</h3>
    <div v-for="review in city.reviews">
      <p>Accessibiliy: {{ review.accessibility }}</p>
      <p>Cost: {{ review.cost }}</p>
      <p>Quality: {{ review.quality }}</p>
      <p>Safety: {{ review.safety }}</p>
      <p>Entertainment: {{ review.entertainment }}</p>
      <p>Average Rating: {{ review.avg_rating }}</p>
    </div>
    <router-link to="/reviews/new">Create a Review for this City</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      city: {},
      avg_rating: "",
      avg_access: "",
      avg_cost: "",
      avg_quality: "",
      avg_safety: "",
      avg_entertainment: ""
    };
  },
  created: function() {
    axios.get("/api/cities/" + this.$route.params.id).then(response => {
      this.city = response.data;
      console.log(this.city);
      this.avg_rating = response.data.avg_rating.toFixed(1);
      this.avg_access = response.data.avg_access.toFixed(1);
      this.avg_cost = response.data.avg_cost.toFixed(1);
      this.avg_quality = response.data.avg_quality.toFixed(1);
      this.avg_safety = response.data.avg_safety.toFixed(1);
      this.avg_entertainment = response.data.avg_entertainment.toFixed(1);
    });
  },
  methods: {}
};
</script>
