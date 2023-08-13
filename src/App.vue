<script setup>
import Darkmode from './components/DarkmodeItem.vue'

</script>

<template>
  
  <Darkmode/>
  <!-- this.hostname = http://localhost:8080/api/ -->
  <RestButton class="left-0 fixed p-1 dark:bg-slate-800 dark:text-white" v-if="isLoggedIn" name="Logout" :link="this.hostname + 'login'" method="get" @click="logOutResponse"/>

  <nav class="text-center text-xl p-3 dark:bg-slate-800 dark:text-white bg-white">
    <!-- immer verfügbare Reiter -->
    <router-link to="/">Home </router-link>

    <!-- Reiter für uneingeloggten User -->
    <router-link v-if="!isLoggedIn" to="/login">| Login |</router-link>
    <router-link v-if="!isLoggedIn" to="/register"> Register</router-link>
        
    <!-- Reiter für eingeloggten User -->
    <router-link v-if="isLoggedIn" to="/playground">| Playground |</router-link>
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
      this.$store.dispatch('auth/logout') //ruft logout methode in auth.js auf
      this.$router.push('/login'); //Anwendung wird zu bestimmter route navigiert
      console.log(e)
      console.log(`logged in: ${this.isLoggedIn}`)
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