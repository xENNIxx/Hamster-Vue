<script setup>
import Darkmode from './components/DarkmodeItem.vue'

</script>

<template>
  <Darkmode/>
  <nav class="text-center text-xl p-3 dark:bg-slate-800 dark:text-white bg-white">
    <router-link to="/">Home </router-link> 
    <router-link v-if="!isLoggedIn" to="/login">| Login |</router-link> 
    <router-link v-if="!isLoggedIn" to="/register"> Register</router-link>
  </nav>
  <router-view/>
</template>


<script>


export default {
  components: {
    
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters['auth/isLoggedIn']
    }
  },
  data(){
    return {
      gameBuilder_Switches: [],
    }
  },
  methods: {
    updateInteraction() {
      this.$store.commit('updateInteraction')
    },
    logOutResponse(e){
      if(e == '""'){
        this.$store.dispatch('auth/logout')
        this.$router.push("/")
      }
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