<template>
  <div id="home">
    <h1 class="md-display-1" id="pageTitle">{{ firstName }}'s Reminders:</h1>
    <div class="md-layout md-gutter">
      <div
        md-with-hover
        v-for="r in reminders"
        :key="r.id"
        class="md-layout-item md-xsmall-size-100 md-small-size card-wrapper"
      >
        <md-card>
          <md-card-header class="menu-header">
            <md-card-header-text></md-card-header-text>
            <md-menu md-size="big" md-direction="bottom-end">
              <md-button class="option-button md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @click="deleteCurrentNote(r.docId, r.id)">
                  <span>Delete</span>
                  <md-icon>delete</md-icon>
                </md-menu-item>

                <md-menu-item>
                  <span>Add to a collection</span>
                  <md-icon>add</md-icon>
                </md-menu-item>

                <md-menu-item @click="openModal(r)">
                  <span>Edit</span>
                  <md-icon>edit</md-icon>
                </md-menu-item>

                <md-menu-item>
                  <span>Archive</span>
                  <md-icon>archive</md-icon>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-card-header>
          <div v-on:click="openModal(r)">
            <md-ripple>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">{{ r.title }}</div>
                  <div class="md-subhead">Monday at 8:00 A.M.</div>
                </md-card-header-text>
              </md-card-header>
              <md-card-content>
                {{
                r.text.substring(0, 50) + "..."
                }}
              </md-card-content>
            </md-ripple>
          </div>
        </md-card>
      </div>
    </div>
    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target v-on:click="openNewNoteModal">
        <md-icon>add</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
    <div>
      <md-dialog :md-active.sync="showEditDialog">
        <md-dialog-title>{{ currentNote.title }}</md-dialog-title>
        <md-dialog-content>
          <md-field class="md-counter md-clearable md-inline">
            <label>Your Note</label>
            <md-textarea v-model="currentNote.text" cols="20" rows="2"></md-textarea>
          </md-field>
          <div v-for="cb in currentNote.checkboxes" v-bind:key="cb.id" style="display: flex">
            <md-checkbox v-model="cb.isDone" />
            <md-field>
              <md-input type="text" v-model="cb.title" />
            </md-field>
            <md-button class="md-accent" @click="deleteCurrentCheckbox(cb)">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
          <md-button class="md-accent" @click="addCheckBox">
            <md-icon>add</md-icon>
          </md-button>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-accent" @click="deleteCurrentNote(cb.docId, cb.id)">
            <md-icon>delete</md-icon>
          </md-button>
          <md-button class="md-primary" @click="saveCurrentNote">Save</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
    <div>
      <md-dialog :md-active.sync="showAddDialog">
        <md-dialog-title>{{ currentNote.title }}</md-dialog-title>
        <md-dialog-content>
          <md-field class="md-counter md-clearable md-inline">
            <label>Your Note</label>
            <md-textarea v-model="currentNote.text" cols="20" rows="2"></md-textarea>
          </md-field>
          <div v-for="cb in currentNote.checkboxes" v-bind:key="cb.id" style="display: flex">
            <md-checkbox v-model="cb.isDone" />
            <md-field>
              <md-input type="text" v-model="cb.title" />
            </md-field>
            <md-button class="md-accent" @click="deleteCurrentCheckbox(cb)">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
          <md-button class="md-accent" @click="addCheckBox">
            <md-icon>add</md-icon>
          </md-button>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="closeNewModal">Cancel</md-button>
          <md-button class="md-primary" @click="addNewNote">Add</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
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
      isLoading: true,
      showEditDialog: false,
      showAddDialog: false,
      currentNote: {
        title: "",
        text: "",
        remindAt: null,
        checkboxes: [],
        id: 0,
        docId: ""
      },
      newNote: {
        title: "",
        text: "",
        remindAt: null,
        checkboxes: [],
        id: null,
        docId: ""
      }
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
            let i = 0;
            shapshot.forEach(todo => {
              this.reminders.push({ ...todo.data(), docId: todo.id, id: i++ });
            });
            this.isLoading = false;
          })
          .catch(err => {
            this.err = err;
          });
      }
    },
    openModal(note) {
      this.currentNote = note;
      this.showEditDialog = true;
    },
    addCheckBox() {
      this.currentNote.checkboxes.push({ isDone: false, title: "" });
    },
    deleteCurrentNote(docId, id) {
      db.collection("reminders")
        .doc(docId)
        .delete();
      this.reminders.splice(id, 1);
    },
    closeModal() {
      this.currentNote = {
        title: "",
        text: "",
        remindAt: "",
        checkboxes: [],
        id: 0,
        docId: ""
      };
      this.showEditDialog = false;
    },
    deleteCurrentCheckbox(cb) {
      this.currentNote.checkboxes.splice(
        this.currentNote.checkboxes.indexOf(cb),
        1
      );
    },
    saveCurrentNote() {
      this.reminders[this.currentNote.id] = { ...this.currentNote };
      db.collection("reminders")
        .doc(this.currentNote.docId)
        .update({
          checkboxes: this.currentNote.checkboxes,
          title: this.currentNote.title,
          text: this.currentNote.text,
          remindAt: this.currentNote.remindAt
        });
      this.closeModal();
    },
    openNewNoteModal() {
      this.currentNote = {
        title: "",
        text: "",
        checkboxes: [],
        remindAt: new Date(),
        id: this.reminders.length
      };
      this.showAddDialog = true;
    },
    closeNewModal() {
      this.currentNote = {
        title: "",
        text: "",
        remindAt: "",
        checkboxes: [],
        id: 0,
        docId: ""
      };
      this.showAddDialog = false;
    },
    addNewNote() {
      this.reminders.push(this.currentNote);
      db.collection("reminders")
        .add({
          title: this.currentNote.title,
          text: this.currentNote.text,
          remindAt: this.currentNote.remindAt,
          checkboxes: this.currentNote.checkboxes,
          uid: firebase.auth().currentUser.uid
        })
        .then(doc => {
          this.reminders[this.reminders.length - 1].docId = doc.id;
          this.closeNewModal();
        });
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
.md-dialog > .md-dialog-container {
  max-width: 768px;
  transform: translate(0%, 0%) !important;
}

.md-has-textarea {
  border: 0 !important;
  outline: 0 !important;
  &::before {
    content: none;
  }
  &::after {
    content: none;
  }
}

.menu-header {
  height: 0px !important;
  padding: 0 !important;
  z-index: 10 !important;
}

.option-button {
  z-index: 10 !important;
  margin-right: 10px !important;
  margin-top: 10px !important;
}

#pageTitle {
  padding-bottom: 10px !important;
  text-align: center;
}

@media screen and (min-width: 768px) {
  .md-dialog-container {
    min-width: 768px;
  }
}

@media screen and (max-width: 768px) {
  #home {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
</style>
