<template>
  <div class="cities-new">
    <!-- DASHBOARD ORDERS SECTION -->
    <section class="clearfix bg-dark listingSection" id="listing-add-edit">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <form v-on:submit.prevent="createCity()" action="" method="" class="listing__form">
              <div class="dashboardBoxBg mb30">
                <div class="profileIntro paraMargin">
                  <h3>Add Your City</h3>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                  <div class="row">
                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="cityName"></label>
                      <input
                        type="text"
                        v-model="newCityName"
                        class="form-control"
                        id="cityName"
                        placeholder="City Name"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="cityState"></label>
                      <input
                        type="text"
                        v-model="newCityState"
                        class="form-control"
                        id="cityName"
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-sm-6 col-xs-12">
                      <label for="cityImage"></label>
                      <input
                        type="text"
                        v-model="newCityImage"
                        class="form-control"
                        id="cityName"
                        placeholder="Image Url"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-footer text-center">
                <button type="submit" class="btn-submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- <h1>New City</h1>
    <form v-on:submit.prevent="createCity()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="newCityName" />
      State:
      <input type="text" v-model="newCityState" />
      <input type="text" v-model="newCityImage" />
      <input type="submit" value="Create" />
    </form> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      newCityName: "",
      newCityState: "",
      newCityImage: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    createCity: function() {
      var params = {
        name: this.newCityName,
        state: this.newCityState,
        image: this.newCityImage
      };
      axios
        .post("/api/cities", params)
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
