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
    async clickevent(event) {
      this.loading = true
      if (this.checkValue(this.username) || this.checkValue(this.password)){
        this.hasError = true
        this.errorText = "Bitte Username/Password eingeben!"
        return
      }
      this.hasError = false
      this.errorText = ""
      const link = this.hostname + "login";

      axios.defaults.withCredentials = true;
      var data = JSON.stringify({
        username: this.username,
        password: this.password,
      });

      console.log(data);

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

      axios(config)
        .then((response) =>{
          this.hasError = false
          this.errorText = "Eingeloggt!";
          console.log("eingeloggt")
          this.loading = false
          return JSON.stringify(response.data);
        })
        .then((json) => this.checkLogin(json))
        // if successful, clear the input fields
        .then(() => {
          this.username = null; 
          this.password = null;
        })
        .catch((error) => {
            this.hasError = true
            this.errorText = "Fehler beim Login!";
            this.loading = false
            console.log(error.message);
          });
      
    },
    checkLogin(json) {
      this.get = json;
      if (json == '""') this.$store.dispatch("auth/login");
    },
  },
};
</script>
