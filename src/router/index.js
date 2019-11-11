import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

import CitiesIndex from "../views/Cities/Index.vue";
import CitiesNew from "../views/Cities/New.vue";
import CitiesShow from "../views/Cities/Show.vue";

import UsersShow from "../views/Users/Show.vue";
import UsersEdit from "../views/Users/Edit.vue";

import ReviewsNew from "../views/Reviews/New.vue";
import ReviewsEdit from "../views/Reviews/Edit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "cities-index",
    component: CitiesIndex
  },
  {
    path: "/cities/new",
    name: "cities-new",
    component: CitiesNew
  },
  {
    path: "/cities/:id",
    name: "cities-show",
    component: CitiesShow
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow
  },
  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: UsersEdit
  },
  {
    path: "/reviews/new",
    name: "reviews-new",
    component: ReviewsNew
  },
  {
    path: "/reviews/:id/edit",
    name: "reviews-edit",
    component: ReviewsEdit
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
