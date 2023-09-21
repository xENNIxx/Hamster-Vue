
<template>
  <!-- this.hostname = http://localhost:8080/api/ -->
  <RestButton class="right-0 fixed p-1 bg-secondary" v-if="isLoggedIn" name="Logout" :link="this.hostname + 'login'" method="get" @click="logOutResponse"/>
  <!-- soll backend infos schicken - gibt aber noch fehler -->
  <button class="left-20 fixed p-1 bg-secondary" @click="onClick">click me</button>
  <nav class="text-center text-xl p-3 bg-secondary">
    <!-- immer verfügbare Reiter -->
    <router-link  to="/" class="mx-5">Home </router-link>

    <!-- Reiter für uneingeloggten User -->
    <router-link v-if="!isLoggedIn" class="mx-5" to="/login"> Login </router-link>
    <router-link v-if="!isLoggedIn" class="mx-5" to="/register"> Register</router-link>
        
    <!-- Reiter für eingeloggten User -->
    <router-link v-if="isLoggedIn" class="mx-5" to="/playground"> Playground </router-link>
    <router-link v-if="isLoggedIn" class="mx-5" to="/courses"> Courses </router-link>

    <select data-choose-theme>
      <option value="light">light</option>
      <option value="dark">dark</option>
      <option value="cyberpunk">cyberpunk</option>
      <option value="valentine">valentine</option>
      <option value="aqua">aqua</option>
      <option value="halloween">halloween</option>
    </select>
  </nav>
  
  <router-view/>
</template>


<script>

import { onMounted } from 'vue'
import { themeChange } from 'theme-change'
//import { mapGetters } from 'vuex'
import { mapActions } from 'vuex';
//import { mapGetters } from 'vuex'
import RestButton from "./components/RestButton.vue"

export default {
  setup() {
    onMounted(() => {
      themeChange(false)
    })
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters['auth/isLoggedIn']
    },
    getUsername() {
      return this.$store.getters['inputData/username']
    }
  },
  data(){
    return {
      //gameBuilder_Switches: [],
      username: '',
    }
  },
  components: {
    RestButton
  },
  methods: {

    updateInteraction() {
      this.$store.commit('updateInteraction')
    },
    logOutResponse(e){
      this.$store.dispatch('auth/logout') //ruft logout methode in auth.js auf
      this.$router.push('/login'); //Anwendung wird zu bestimmter route navigiert
      console.log(e)
      console.log(`logged in: ${this.isLoggedIn}`)
    },
    onClick() {
      //console.log(`before: ${this.getUsername}`);
      const testv = 'it works';
      this.$store.dispatch('inputData/setUsername', testv);
      //console.log(`after: ${this.getUsername}`);
    }
  },
  mounted(){
    window.addEventListener('mousemove', this.updateInteraction);
    window.addEventListener('keydown', this.updateInteraction);
    this.$store.dispatch('checkInactivity');
  },
  beforeUnmount(){
    window.removeEventListener('mousemove', this.updateInteraction);
    window.removeEventListener('keydown', this.updateInteraction);

  }
}
</script>
