<script setup>
import Darkmode from './components/DarkmodeItem.vue'

</script>

<template>
  
  <Darkmode/>
  <!-- this.hostname = http://localhost:8080/api/ -->
  <RestButton class="left-0 fixed p-1 dark:bg-slate-800 dark:text-white" v-if="isLoggedIn" name="Logout" :link="this.hostname + 'login'" method="get" @click="logOutResponse"/>
  <!-- soll backend infos schicken - gibt aber noch fehler -->
  <!-- <RestButton class="left-20 fixed p-1 dark:bg-slate-800 dark:text-white" v-if="isLoggedIn" name="Save" :method="post" data="backEndData"/> -->
  <button class="left-20 fixed p-1 dark:bg-slate-800 dark:text-white" @click="onClick">click me</button>
  <nav class="text-center text-xl p-3 dark:bg-slate-800 dark:text-white bg-white">
    <!-- immer verfügbare Reiter -->
    <router-link  to="/" class="mx-5">Home </router-link>

    <!-- Reiter für uneingeloggten User -->
    <router-link v-if="!isLoggedIn" class="mx-5" to="/login"> Login </router-link>
    <router-link v-if="!isLoggedIn" class="mx-5" to="/register"> Register</router-link>
        
    <!-- Reiter für eingeloggten User -->
    <router-link v-if="isLoggedIn" class="mx-5" to="/playground"> Playground </router-link>
  </nav>

  <router-view/>
</template>


<script>
//import { mapGetters } from 'vuex'
import { mapActions } from 'vuex';
//import { mapGetters } from 'vuex'
import RestButton from "./components/RestButton.vue"

export default {

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

<style lang="scss">
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
}
html {
  width: 100vw;
  height: 100vh;
  font-size: 1rem;
  overflow-x: hidden;
}

body {
  height: 100%;
  margin: 0;
}

nav {
  a {
    &.router-link-exact-active {
      color: #027df9;
    }
  }
}
.btn {
        width: 100px;
        height: 35px;
        background: #ee4266;
        color: white;
        border: none;
        outline: none;
        border-radius: 8px;
    }
.playground {
    display: grid;
    gap: 5px;
    aspect-ratio: 1/1;
    user-select: none;
    height: 100%;
}
.play-field {
    position: relative;
    border: 1px solid black;
    min-width: 25px;
    aspect-ratio: 1/1;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(.75em, 1.25vw, 2em);

    &.corn{
        background: brown;
    }
    &.wall {
        background: black;
    }
    &.player {
        background-color: blue;
        background-image: url('@/assets/images/arrow.svg');
        background-position: center;
        background-size: contain;
        object-fit: contain;

        &[direction="up"]{
            transform: rotate(0deg);
        }
        &[direction="down"]{
            transform: rotate(180deg);
        }
        &[direction="left"]{
            transform: rotate(-90deg);
        }
        &[direction="right"]{
            transform: rotate(90deg);
        }
    }
}
</style>