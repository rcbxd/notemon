<template>
  <div>
    <span class="md-title">Enter Your Credentials</span>
    <br />
    <h3 class="md-error">{{err}}</h3>
    <div>
      <md-field>
        <label for="fname">First Name</label>
        <md-input type="fname" name="fname" id="fname" autocomplete="fname" v-model="firstName" />
      </md-field>
      <md-field>
        <label for="lname">Last Name</label>
        <md-input type="lname" name="lname" id="lname" autocomplete="lname" v-model="lastName" />
      </md-field>
      <md-field>
        <label for="email">Email</label>
        <md-input type="email" name="email" id="email" autocomplete="email" v-model="email" />
      </md-field>
      <md-field>
        <label for="password">Password</label>
        <md-input type="password" name="password" v-model="password" />
      </md-field>
      <md-field>
        <label for="secondPassword">Repeat Password</label>
        <md-input type="password" name="secondPassword" v-model="secondPassword" />
      </md-field>
      <md-button type="submit" class="md-primary" v-on:click="login">Sign Up</md-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

const db = firebase.firestore();

export default {
  name: "signup",
  data: () => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      err: "",
      secondPassword: ""
    };
  },
  methods: {
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          db.collection("users")
            .add({
              first: this.firstName,
              last: this.lastName,
              uid: data.user.uid
            })
            .then(() => {
              this.$router.replace("/login");
            })
            .catch(err => {
              this.err = err;
            });
        })
        .catch(err => {
          this.err = err;
        });
    }
  }
};
</script>