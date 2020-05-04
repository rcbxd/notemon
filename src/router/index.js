import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/Landing.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () => import("../views/Signup.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/Logout.vue"),
    meta: {
      requiresAuth: true,
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let loggedIn = false;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      loggedIn = true;
    }
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !loggedIn) next('/login')
    else next()
  });
})

export default router;
