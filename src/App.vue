<script setup>
import Darkmode from './components/DarkmodeItem.vue'

</script>

<template>
  <Darkmode/>
  <nav class="text-center text-xl p-3 dark:bg-slate-800 dark:text-white bg-white">
    <router-link to="/">Home </router-link>
    <router-link v-if="!isLoggedIn" to="/login">| Login |</router-link> 
    <router-link v-if="!isLoggedIn" to="/register"> Register</router-link>
    <!-- this.hostname = http://localhost:8080/api/ -->
    <RestButton  v-if="isLoggedIn" name="Logout" :link="this.hostname + 'login'" method="get" @onResponse="logOutResponse($event)"/>
    
  
  </nav>

  <router-view/>
</template>


<script>
import RestButton from "./components/RestButton.vue"

export default {
  
  components: {
    RestButton
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters['auth/isLoggedIn']
    }
  },
  data(){
    return {
      //gameBuilder_Switches: [],
    }
  },
  methods: {
    updateInteraction() {
      this.$store.commit('updateInteraction')
    },
    logOutResponse(e){
      if(e == '""'){
        console.log('response_log')
        this.$store.dispatch('auth/logout') //ruft logout methode in auth.js auf
        this.$router.push('/login'); //Anwendung wird zu bestimmter route navigiert
      }
      console.log('response_out')
    }
  },
  mounted(){
    window.addEventListener('mousemove', this.updateInteraction);
    window.addEventListener('keydown', this.updateInteraction);
    this.$store.dispatch('checkInactivity')
  },
  beforeUnmount(){
    window.removeEventListener('mousemove', this.updateInteraction);
    window.removeEventListener('keydown', this.updateInteraction);
  }
}
</script>