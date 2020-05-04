<template>
  <h1>Logging you out...</h1>
</template>
<script>
import firebase from "firebase";
import store from "../store/store";
import { logOut } from "../actions/actions";

export default {
  mounted() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        store.dispatch(logOut());
        this.$router.replace("/login");
      });
  }
};
</script>