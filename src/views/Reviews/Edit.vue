<template>
  <div class="reviews-edit">
    <!-- DASHBOARD PROFILE SECTION -->
    <section class="clearfix bg-dark profileSection">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-5 col-xs-12"></div>
          <div class="col-md-8 col-sm-7 col-xs-12">
            <form v-on:submit.prevent="updateReview(review)">
              <div class="dashboardBoxBg">
                <div class="profileIntro">
                  <h2>Your Review</h2>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </div>
              </div>
              <div class="dashboardBoxBg mt30">
                <div class="profileIntro">
                  <h3>Edit Review</h3>
                  <div class="row">
                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="firstName">Accessibility</label>
                      <input type="text" class="form-control" id="firstName" v-model="review.accessibility" />
                    </div>

                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="cost">Cost</label>
                      <input type="text" class="form-control" id="cost" v-model="review.cost" />
                    </div>

                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="quality">Quality</label>
                      <input type="text" class="form-control" id="quality" v-model="review.quality" />
                    </div>
                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="safety">Safety</label>
                      <input type="text" class="form-control" id="safety" v-model="review.safety" />
                    </div>

                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="entertainment">Entertainment</label>
                      <input type="text" class="form-control" id="entertainment" v-model="review.entertainment" />
                    </div>

                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="text">Description</label>
                      <input type="text" class="form-control" id="text" v-model="review.text" />
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

    <footer class="copyRightDashboard">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <p>Copyright © 2019. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
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
      this.cities = response.data;
      console.log(this.cities);
    });
  },
  methods: {
    updateReview: function(review) {
      var params = {
        accessibility: review.accessibility,
        cost: review.cost,
        quality: review.quality,
        safety: review.safety,
        entertainment: review.entertainment,
        text: review.text
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
