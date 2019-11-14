<template>
  <div class="cities-show">
    <section class="bg-light pt-5 height100vh">
      <div class="container">
        <div class="row">
          <div class="col-lg-6"></div>

          <!-- LISTINGS DETAILS TITLE SECTION -->
          <section class="clearfix paddingAdjustBottom">
            <div class="container">
              <div class="row">
                <div class="col-xs-12">
                  <div class="listingTitleArea">
                    <h2>{{ city.name }}, {{ city.state }}</h2>
                    <img :src="city.image" alt="" height="300" width="600" />

                    <div class="listingReview">
                      <router-link to="/reviews/new" class="btn btn-primary">Create a Review</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row">
                <div class="col-sm-12 col-xs-12">
                  <div class="listDetailsInfo">
                    <div class="detailsInfoBox">
                      <h3>About This City</h3>
                      <p>Overall Rating: {{ avg_rating }}</p>
                      <p>Accessibility: {{ avg_access }}</p>
                      <p>Cost: {{ avg_cost }}</p>
                      <p>Quality of Life: {{ avg_quality }}</p>
                      <p>Safety: {{ avg_safety }}</p>
                      <p>Entertainment: {{ avg_entertainment }}</p>
                      <div class="detailsInfoBox">
                        <h3>User Descriptions</h3>
                        <div v-for="review in city.reviews">
                          <p>Decription: {{ review.text }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4 col-xs-12">
                      <div class="clearfix map-sidebar map-right pull-left mt20">
                        <div
                          id="map"
                          style="position:relative; margin: 0;padding: 0;height: 538px; max-width: none;"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
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
      avg_entertainment: "",
      altImg: "../../assets/cityscape_0.png"
    };
  },
  created: function() {
    axios.get("/api/cities/" + this.$route.params.id).then(response => {
      this.city = response.data;
      console.log(response.data);
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
