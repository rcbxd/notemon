<template>
  <div class>
    <span class="md-title">Enter Your Credentials</span>
    <br />
    <h3 class="md-error">{{err}}</h3>
    <md-field>
      <label for="email">Email</label>
      <md-input type="email" name="email" id="email" autocomplete="email" v-model="email" />
    </md-field>
    <md-field>
      <label for="email">Password</label>
      <md-input
        type="password"
        name="password"
        id="password"
        autocomplete="password"
        v-model="password"
      />
    </md-field>
    <md-button type="submit" class="md-primary" v-on:click="login">Log In</md-button>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "../store/store";
import { logIn, changePageTitle } from "../actions/actions";

const db = firebase.firestore();

export default {
  name: "login",
  data: () => {
    return {
      email: "",
      password: "",
      err: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          db.collection("users")
            .where("uid", "==", data.user.uid)
            .get()
            .then(snapshot => {
              if (!snapshot.empty) {
                snapshot.forEach(doc => {
                  let data = doc.data();
                  store.dispatch(logIn(data.first, data.last));
                });
              }
            });
          this.$router.replace("/home");
        })
        .catch(err => {
          this.err = err.message;
        });
    }
  },
  mounted() {
    store.dispatch(changePageTitle("Log In"));
  }
};
</script>