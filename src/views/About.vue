<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import store from "../store/store";
import { changePageTitle } from "../actions/actions";

export default {
  mounted() {
    store.dispatch(changePageTitle("About"));
  }
};
</script>