<template>
  <div class="users-show">
    <!-- USER PROFILE SECTION -->
    <section class="user-profile-section bg-light">
      <div class="container">
        <div class="user-profile">
          <div class="row">
            <div class="col-xs-12 col-sm-8">
              <div class="user-profile-content">
                <h3 class="user-name">{{ user.first_name }} {{ user.last_name }}</h3>
                <span class="designation">{{ user.username }}</span>
                <p>
                  <img
                    src="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg"
                    alt=""
                    height="250"
                    width="250"
                  />
                </p>
                <ul class="user-contact-details">
                  <li>
                    <i class="fa fa-building" aria-hidden="true"></i>
                    <router-link :to="`/cities/${user.city_id}`">{{ user.city_name }}</router-link>
                  </li>
                  <li>
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <router-link :to="`/users/${user.id}/edit`">Edit User Info</router-link>
                  </li>
                </ul>

                <div class="verified-user">
                  <i class="fa fa-check" aria-hidden="true"></i>
                  verified account
                </div>
                <router-link :to="`/users/${user.id}/edit`">Edit User</router-link>
              </div>
              <button v-on:click="destroyUser(user)">Delete Profile</button>
              <br />
            </div>

            <!-- Opening Hours -->
            <div class="border rounded px-6 py-5 mb-5">
              <h3>Last Review:</h3>

              <div v-if="review">
                <p>Accessibiliy: {{ review.accessibility }}</p>
                <p>Cost: {{ review.cost }}</p>
                <p>Quality: {{ review.quality }}</p>
                <p>Safety: {{ review.safety }}</p>
                <p>Entertainment: {{ review.entertainment }}</p>
                <p>Average Rating: {{ review.avg_rating }}</p>
                <p>Description: {{ review.text }}</p>
                <router-link :to="`/reviews/${review.id}/edit`">Edit Review</router-link>
              </div>

              <div v-else>
                A review doesnt exist
                <br />
                <router-link :to="`/cities/${user.city_id}`">Create a Review</router-link>
              </div>
            </div>
          </div>
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
      user: {},
      users: [],
      review: {},
      reviews: [],
      city: ""
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log(response.data);
      this.review = response.data.reviews.pop();
      this.city = response.data.city_id;
    });
  },
  methods: {
    destroyUser: function(user) {
      axios.delete("/api/users/" + this.user.id).then(response => {
        console.log(response.data);
        this.$router.push("/logout");
      });
    }
  }
};
</script>
