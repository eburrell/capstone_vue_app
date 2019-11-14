<template>
  <div class="cities-index">
    <!-- BANNER SECTION -->
    <section class="clearfix homeBanner" style="background-image: url(assets/img/banner/banner1.jpg);">
      <div class="container">
        <div class="row">
          <div class="col-xs-14">
            <div class="banerInfo">
              <h1>Explore. Discover. Visit.</h1>
              <p></p>
              <form class="form-inline" action="listings-half-screen-map-list.html">
                <div class="form-group">
                  <label for="name"></label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search for a city..."
                    v-model="cityFilter"
                    list="name"
                  />
                  <button type="" class="btn btn btn-primary">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- SEARCH BROWSE SECTION -->
    <section class="clearfix bg-light pr">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 "></div>
        </div>
        <div class="row">
          <div class="col-sm-6 col-xs-12">
            <div class="categoryBox">
              <h2>
                Top Rated City
              </h2>
              <ul class="list-inline listCategory">
                <h3>{{ highestRated.name }}, {{ highestRated.state }}</h3>
              </ul>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12">
            <div class="categoryBox">
              <h2>
                Most Popular City
              </h2>
              <ul class="list-inline listCategory">
                <h3>{{ mostPopular.name }}, {{ mostPopular.state }}</h3>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- THINGS SECTION -->
    <section class="clearfix thingsArea">
      <div class="container">
        <div class="form-group">
          <label for="name"></label>
          <input type="text" class="form-control" placeholder="Search for a city..." v-model="cityFilter" list="name" />
        </div>
        <div class="page-header text-center">
          <h2>
            <small>View Cities</small>
          </h2>
        </div>

        <div class="row">
          <div
            v-for="city in orderBy(filterBy(cities, cityFilter), 'name', sortAscending)"
            class="col-md-4 col-sm-6 col-xs-12"
          >
            <div class="thingsBox thinsSpace">
              <div class="thingsImage">
                <img :src="city.image" alt="" height="250" />
                <div class="thingsMask">
                  <ul class="list-inline rating">
                    <li><i class="fa fa-star" aria-hidden="true"></i></li>
                    <li><i class="fa fa-star" aria-hidden="true"></i></li>
                    <li><i class="fa fa-star" aria-hidden="true"></i></li>
                    <li><i class="fa fa-star" aria-hidden="true"></i></li>
                    <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                  </ul>
                  <a href="listing-details-right.html">
                    <h2>
                      {{ city.name }}
                    </h2>
                  </a>
                  <p>{{ city.state }}</p>
                </div>
              </div>
              <div class="thingsCaption ">
                <ul class="list-inline captionItem">
                  <li>
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                  </li>
                  <span>upvote</span>

                  <li><router-link v-bind:to="`/cities/${city.id}`">Learn More</router-link></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-xs-12">
            <div class="btnArea btnAreaBorder text-center">
              <router-link to="/cities/new" class="btn btn-primary">Add a City</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      cities: [],
      numReviews: "",
      highestRated: [],
      mostPopular: [],
      cityFilter: "",
      sortAscending: 1
    };
  },
  created: function() {
    axios.get("/api/cities").then(response => {
      this.cities = response.data.cities;
      this.mostPopular = response.data.most_reviewed_city;
      this.highestRated = response.data.highest_rated_city;
      console.log(response.data);
    });
  },
  methods: {}
};
</script>
