<template>
  <div id="app">
    <!-- HEADER -->
    <header id="pageTop" class="header">
      <!-- TOP INFO BAR -->

      <div class="nav-wrapper navbarWhite">
        <!-- NAVBAR -->
        <nav id="menuBar" class="navbar navbar-default lightHeader animated " role="navigation">
          <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <router-link class="navbar-brand" to="/">
                <img class="logo-svg" src="/assets/img/logo-main.jpg" />
              </router-link>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
              <ul class="nav navbar-nav navbar-right">
                <li>
                  <router-link to="/">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    Cities
                  </router-link>
                </li>

                <li>
                  <router-link v-if="!isLoggedIn()" to="/login">
                    <i class="fa fa-id-card" aria-hidden="true"></i>
                    Login
                  </router-link>
                </li>

                <li>
                  <router-link v-if="isLoggedIn()" :to="`/users/${getUserInfo().userId}`">
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                    My Profile
                  </router-link>
                </li>

                <li class="">
                  <router-link v-if="isLoggedIn()" to="/logout">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                    Logout
                  </router-link>
                </li>
              </ul>
            </div>
            <router-link v-if="!isLoggedIn()" class="btn btn-default navbar-btn" to="/signup">
              +
              <span>Signup</span>
            </router-link>
          </div>
        </nav>
      </div>
    </header>

    <router-view />

    <!-- FOOTER -->
    <footer>
      <!-- FOOTER INFO -->
      <div style="background-image: url(assets/img/background/bg-footer.jpg);">
        <!-- COPY RIGHT -->
        <div class="clearfix copyRight">
          <div class="container">
            <div class="row">
              <div class="col-xs-12">
                <div class="copyRightWrapper">
                  <div class="row">
                    <div class="col-sm-5 col-sm-push-7 col-xs-12">
                      <ul class="list-inline socialLink">
                        <li>
                          <a href="mailto:michaeleburrell@gmail.com">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://github.com/eburrell  "><i class="fa fa-github"></i></a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/in/meverret-b/">
                            <i class="fa fa-linkedin" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-sm-7 col-sm-pull-5 col-xs-12">
                      <div class="copyRightText">
                        <p>
                          Copyright &copy; 2019. All Rights Reserved by me.
                          <a href=""></a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.navbar-brand > img {
  width: 60px;
}
</style>

<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    getUserInfo: function() {
      return {
        userId: localStorage.getItem("user_id"),
        username: localStorage.getItem("username")
      };
    }
  }
};
</script>
