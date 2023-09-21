<template>
    <section class= "dark:text-white">
      <div class="flex flex-col items-center justify-center">
      <div
        class="w-1/3 mt-44 bg-base-200 rounded-lg shadow p-5 "
      >
          <h1 class="text-center text-xl">Register</h1>
          <div class="m-5 flex flex-col items-center justify-center gap-5">          
            <input v-model="username" type="text" placeholder="Username/E-Mail" class="border-base-300 rounded-lg border p-2"/>
          <input v-model="password" type="password" placeholder="Password" class="border-base-300 rounded-lg border p-2"/>
          <button @click="clickevent" class="text-center text-accent-content rounded-lg border p-2 border-base-300 bg-accent active:bg-accent-focus" v-text="name"></button>
            <p :class="{'text-error': hasError, 'text-success': !hasError}">{{ errorText }}</p>
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
    name: "RegisterView",
  
    data() {
      return {
        get: "",
        username: "",
        password: "",
        errorText:"",
        hasError: false,
      };
    },
    props: {
      name: {
        type: String,
        default: "Register",
      },
      link: {
        type: String,
        default: "",
      },
    },
    methods: {
      // TestURL: https://gorest.co.in/public/v2/users
      async clickevent(event) {
        if (this.checkValue(this.username) || this.checkValue(this.password)){
          this.hasError = true
          this.errorText = "Bitte Username/Password eingeben!"
          return
        }
        this.hasError = false
        this.errorText = ""
        const link = this.hostname + "registration";
  
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
            this.errorText = "Registriert!";
            console.log("eingeloggt")
            
            return JSON.stringify(response.data);
          })
          .then((json) => this.checkRegistration(json))
          .catch((error) => {
              this.hasError = true
              this.errorText = error.response.data;
              console.log(JSON.stringify(error.data));
            });
      },
      checkRegistration(json) {
        this.get = json;
        if (json == '""') this.$store.dispatch("auth/register");
      },
    },
  };
  </script>
  