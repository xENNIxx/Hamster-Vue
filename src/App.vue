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
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
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