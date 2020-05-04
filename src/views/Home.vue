<template>
  <div class="home">
    <span class="md-display-1">Hello, {{firstName}} {{lastName}}</span>
    <br />
    <span class="md-subheading">Do you wish to add a reminder?</span>
    <div class="md-layout md-gutter">
      <div
        class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        md-with-hover
        v-for="r in reminders"
        :key="r.id"
      >
        <md-card class="md-accent">
          <md-ripple>
            <md-card-header>
              <div class="md-title">{{r.title}}</div>
              <div class="md-subhead">{{r.addedAt}}</div>
            </md-card-header>

            <md-card-content>
              {{r.text}}
              <h3 class="md-subheading">Today's availability</h3>
              <div class="reminder">
                <md-icon>access_time</md-icon>
                <span>{{r.remindAt.seconds * 1000}}</span>
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button>Delete</md-button>
              <md-button>Edit</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </div>
    </div>
    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target>
        <md-icon>add</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
  </div>
</template>

<script>
import store from "../store/store";
import firebase from "firebase";
import { loadHomePage } from "../actions/actions";

const db = firebase.firestore();

export default {
  name: "Home",
  data: function() {
    return {
      firstName: "",
      lastName: "",
      reminders: [],
      err: "",
      isLoading: true
    };
  },
  methods: {
    getData() {
      if (firebase.auth().currentUser) {
        this.firstName = store.getState().firstName;
        this.lastName = store.getState().lastName;
        db.collection("reminders")
          .where("uid", "==", firebase.auth().currentUser.uid)
          .get()
          .then(shapshot => {
            this.reminders = [];
            shapshot.forEach(todo => {
              this.reminders.push(todo.data());
            });
            this.reminders = this.reminders.concat(this.reminders);
            this.isLoading = false;
          })
          .catch(err => {
            this.err = err;
          });
      }
    }
  },
  mounted() {
    if (firebase.auth().currentUser) {
      this.getData();
    }
    store.subscribe(() => {
      this.getData();
    });
    db.collection("users")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            let data = doc.data();
            store.dispatch(loadHomePage(data.first, data.last, "TODOs"));
            this.isLoading = false;
          });
        }
      });
  }
};
</script>

<style lang="scss">
.md-card {
  user-select: none;
}
</style>