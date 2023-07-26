<template>
  <section class= "dark:text-white">
    <div class="flex flex-col items-center justify-center">
      <div
        class="w-1/3 mt-44 bg-white rounded-lg shadow dark:border p-5 dark:bg-gray-800 dark:border-gray-700"
      >
        <h1 class="text-center text-xl">Login</h1>
        <div class="m-5 flex flex-col items-center justify-center gap-5">
          <input v-model="username" type="text" placeholder="Username/E-Mail" class="dark:bg-gray-900 dark:border-gray-700 border-gray-300 rounded-lg border p-2"/>
          <input v-model="password" type="password" placeholder="Password" class="dark:bg-gray-900 dark:border-gray-700 border-gray-300 rounded-lg border p-2"/>
          <button @click="clickevent" class="text-center rounded-lg border p-2 dark:bg-gray-900 dark:border-gray-700 border-gray-300 dark:active:bg-slate-600 active:bg-gray-300" v-text="name"></button>
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
      const link = this.hostname + "login";

      axios.defaults.withCredentials = true;
      var data = JSON.stringify({
        username: this.username,
        password: this.password,
      });

      console.log(data);
      console.log(link);
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
        .then(function (response) {
          return JSON.stringify(response.data);
        })
        .then((json) => this.checkLogin(json))
        .catch(function (error) {
          console.log(JSON.stringify(error.data));
        });
    },
    checkLogin(json) {
      this.get = json;
      if (json == '""') this.$store.dispatch("auth/login");
    },
  },
};
</script>
