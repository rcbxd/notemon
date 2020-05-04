<template>
  <div class="landing">
    <span class="md-display-4">Notemon</span>
    <br />
    <span class="md-headline">A futuristic reminder and todo app</span>
    <div class="buttons">
      <md-button class="md-primary" v-on:click="logIn">Log In</md-button>
      <md-button class="md-primary" v-on:click="signUp">Sign Up</md-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logIn() {
      this.$router.replace("/login");
    },
    signUp() {
      this.$router.replace("/signup");
    }
  }
};
</script>

<style lang="scss">
.landing {
  justify-content: center;
  text-align: center;
}
.buttons {
  margin-top: 20px;
}
</style>