<template>
  <div class="page-container">
    <link
      rel="stylesheet"
      href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"
    />
    <md-app md-waterfall md-mode="overlap">
      <md-app-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">{{pageTitle}}</span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent md-title" md-elevation="0">Notemon</md-toolbar>

        <md-list>
          <router-link to="/about">
            <md-list-item v-on:click="menuVisible = !menuVisible">
              <md-icon>info</md-icon>
              <span class="md-list-item-text">About</span>
            </md-list-item>
          </router-link>

          <router-link to="/home">
            <md-list-item v-on:click="menuVisible = !menuVisible">
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Home</span>
            </md-list-item>
          </router-link>

          <md-list-item v-on:click="menuVisible = !menuVisible">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <router-link to="/logout">
            <md-list-item v-on:click="menuVisible = !menuVisible">
              <md-icon>logout</md-icon>
              <span class="md-list-item-text">Logout</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import store from "./store/store";

export default {
  data: () => {
    return {
      loggedIn: false,
      menuVisible: false,
      pageTitle: "Notemon"
    };
  },
  methods: {
    changeLoginStatus() {
      this.loggedIn = store.getState().isLoggedIn;
    }
  },
  created() {
    store.subscribe(() => {
      this.changeLoginStatus();
      this.pageTitle = store.getState().pageTitle;
    });
  }
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

.md-app-content > div {
  margin: 50px;
}

.md-error {
  color: #ff1744 !important;
}

.md-app {
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin-left: 5px;
    margin-right: 5px;

    &.router-link-exact-active {
      color: #42b983 !important;
    }
  }
}
</style>
