<template>
  <section>
    <div class="flex flex-col items-center justify-center">
      <div class="w-1/3 mt-44 bg-base-200 card-body card shadow p-5 ">
        <h1 class="text-center text-xl">Login</h1>
        <div class="m-5 flex flex-col items-center justify-center gap-5">
          <input v-model="username" type="text" placeholder="Username/E-Mail" class="input"/>
          <input v-model="password" type="password" placeholder="Password" class="input"/>
          <button @click="clickevent" class="btn btn-primary" v-text="name"></button>
          <p :class="{'text-error': hasError, 'text-success': !hasError}">{{ errorText }}</p>
          <span v-if="loading" class="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import axios from "axios";

const https = require("https");
export default {
  name: "LoginView",

  data() {
    return {
      get: "",
      username: "",
      password: "",
      errorText:"",
      hasError: false,
      loading: false
    };
  },
  props: {
    name: {
      type: String,
      default: "Login",
    },
    link: {
      type: String,
      default: "",
    },
  },
  methods: {
    // TestURL: https://gorest.co.in/public/v2/users
    clickevent(event) {
      this.loading = true;  // for btn-animation
      if (this.checkValue(this.username) || this.checkValue(this.password)){
        this.hasError = true;
        this.errorText = "Bitte Username/Password eingeben!";
        this.loading = false;
        // return;
      }
      else {
        this.hasError = false;
        this.errorText = "";
        this.login_api();
      }
    },
    async login_api() {
      // setup request
      const link = this.hostname + "login";
      var data = JSON.stringify({
        username: this.username,
        password: this.password,
      });

      axios.defaults.withCredentials = true;
      var config = {
        method: "post",
        url: link,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        withCredentials: true,
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        data: data,
      };

      // call request & react
      axios(config)
        .then((response) => {
          this.hasError = false;
          this.errorText = "Eingeloggt!";
          console.log("eingeloggt");
          console.log(response.data[0]);
          return response.data;
        })
        // call auth/login and store role
        .then((data) => {
          this.$store.dispatch("auth/login");
          const role_id = data[0].id
          console.log(role_id);
          if (role_id != null) {
            this.$store.dispatch("auth/role", role_id);
          }
        })
        // if successful, clear the input fields
        .then(() => {
          this.username = null; 
          this.password = null;
        })
        .catch((error) => {
          this.hasError = true;
          this.errorText = "Fehler beim Login!";
          console.log(error.message);
        })
        // everything done -> set LoadingState to false  
        .finally(() => {
          this.loading = false;
        });
    },
    localLogin(data) {
      // set loginStatus to true in $store
      this.$store.dispatch("auth/login");
      // if exists: save userrole in $store
      if (data.id != null) {
        this.$store.dispatch("auth/role", data.id);
      }
    },
  },
};
</script>
