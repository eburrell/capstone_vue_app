<template>
  <div class="reviews-new">
    <!-- DASHBOARD PROFILE SECTION -->
    <section class="clearfix bg-dark profileSection">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-5 col-xs-12"></div>
          <div class="col-md-8 col-sm-7 col-xs-12">
            <form v-on:submit.prevent="createReview()">
              <div class="dashboardBoxBg">
                <div class="profileIntro">
                  <h2>Your City Review</h2>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </div>
              </div>
              <div class="dashboardBoxBg mt30">
                <div class="profileIntro">
                  <h3>Create a Review</h3>
                  <div class="row">
                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="accessibility">Accessibility</label>
                      <input
                        type="text"
                        class="form-control"
                        id="accessibility"
                        v-model="newReviewAccessiblity"
                        placeholder="Please rate 1-5"
                      />
                    </div>

                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="cost">Cost</label>
                      <input
                        type="text"
                        class="form-control"
                        id="cost"
                        v-model="newReviewCost"
                        placeholder="Please rate 1-5"
                      />
                    </div>

                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="quality">Quality</label>
                      <input
                        type="text"
                        class="form-control"
                        id="quality"
                        v-model="newReviewQuality"
                        placeholder="Please rate 1-5"
                      />
                    </div>
                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="safety">Safety</label>
                      <input
                        type="text"
                        class="form-control"
                        id="safety"
                        v-model="newReviewSafety"
                        placeholder="Please rate 1-5"
                      />
                    </div>

                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="entertainment">Entertainment</label>
                      <input
                        type="text"
                        class="form-control"
                        id="entertainment"
                        v-model="newReviewEntertainment"
                        placeholder="Please rate 1-5"
                      />
                    </div>

                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="text">Description</label>
                      <input type="text" class="form-control" id="text" v-model="newReviewText" placeholder="Text" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="btn-area mt30">
                <button type="submit" value="Create" class="btn btn-primary">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- <h1>New Review</h1>
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
      Description:
      <input type="text" v-model="newReviewText" />
      <br />
      <input type="submit" value="Create" />
    </form> -->
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
      newReviewText: "",
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
        text: this.newReviewText,
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
