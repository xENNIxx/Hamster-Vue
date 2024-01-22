
<template>
  <!-- this.hostname = http://localhost:8080/api/ -->
  <!-- soll backend infos schicken - gibt aber noch fehler -->
  <!-- <button class="right-20 fixed p-1 bg-secondary" @click="onClick">click me</button>-->

  <div class="navbar bg-base-300 shadow-md">
    <div class="navbar-start">
      <router-link to="/" class="btn btn-ghost text-xl"><i class="fas fa-frog"></i></router-link>
    </div>
    <div class="navbar-center flex">
      <ul class="menu menu-horizontal px-1">
        <li v-if="isLoggedIn"><router-link class="btn btn-ghost btn-sm m-2" to="/playground"><i class="fas fa-play"></i>
            Playground </router-link></li>
        <li v-if="isLoggedIn"><router-link class="btn btn-ghost btn-sm m-2" to="/build"><i class="fas fa-hammer"></i>
            Build </router-link></li>
        <li v-if="isLoggedIn"><router-link class="btn btn-ghost btn-sm m-2" to="/courses"><i class="fas fa-book"></i>
            Courses </router-link></li>
        <li v-if="isLoggedIn"><router-link class="btn btn-ghost btn-sm m-2" to="/profile"><i class="fas fa-user"></i>
            Profile </router-link></li>
        <li v-if="!isLoggedIn"><router-link class="btn btn-ghost btn-sm m-2" to="/login"><i
              class="fas fa-sign-in-alt"></i> Login </router-link></li>
        <li v-if="!isLoggedIn"><router-link class="btn btn-ghost btn-sm m-2" to="/register"><i
              class="fas fa-user-plus"></i> Register</router-link></li>
      </ul>
    </div>
    <div class="navbar-end">
      <RestButton class="btn btn-sm" v-if="isLoggedIn" name="Logout" :link="this.hostname + 'login'" method="get"
        @click="logOutResponse" />
      <select data-choose-theme class="btn btn-sm m-2">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="cupcake">Cupcake</option>
        <option value="bumblebee">Bumblebee</option>
        <option value="emerald">Emerald</option>
        <option value="corporate">Corporate</option>
        <option value="synthwave">Synthwave</option>
        <option value="retro">Retro</option>
        <option value="cyberpunk">Cyberpunk</option>
        <option value="valentine">Valentine</option>
        <option value="halloween">Halloween</option>
        <option value="garden">Garden</option>
        <option value="forest">Forest</option>
        <option value="aqua">Aqua</option>
        <option value="lofi">Lofi</option>
        <option value="pastel">Pastel</option>
        <option value="fantasy">Fantasy</option>
        <option value="wireframe">Wireframe</option>
        <option value="black">Black</option>
        <option value="luxury">Luxury</option>
        <option value="dracula">Dracula</option>
        <option value="cmyk">CMYK</option>
        <option value="autumn">Autumn</option>
        <option value="business">Business</option>
        <option value="acid">Acid</option>
        <option value="lemonade">Lemonade</option>
        <option value="night">Night</option>
        <option value="coffee">Coffee</option>
        <option value="winter">Winter</option>
      </select>
    </div>
  </div>

<router-view />
</template>


<script>

import { onMounted } from 'vue'
import { themeChange } from 'theme-change'
import RestButton from "./components/RestButton.vue"

export default {
  setup() {
    onMounted(() => {
      themeChange(false)
    })
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
    getUsername() {
      return this.$store.getters['inputData/username']
    }
  },
  data() {
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
    logOutResponse(e) {
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
  mounted() {
    window.addEventListener('mousemove', this.updateInteraction);
    window.addEventListener('keydown', this.updateInteraction);
    this.$store.dispatch('checkInactivity');
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.updateInteraction);
    window.removeEventListener('keydown', this.updateInteraction);

  }
}
</script>

<style lang="scss">
.play-field {
  @apply p-4 btn btn-outline bg-transparent btn-square rounded-none flex items-center justify-center text-center select-none cursor-pointer text-xs m-0;

  &.corn {
    @apply bg-base-300;
  }

  &.wall {
    @apply bg-secondary;
  }

  &.player {
    @apply p-4 btn btn-outline bg-primary btn-square rounded-none flex items-center justify-center text-center select-none cursor-pointer text-transparent;

    background-image: url("../src/assets/images/hamster.png");
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover;
    &[direction="up"] {
      transform: rotate(0deg);
    }

    &[direction="down"] {
      transform: rotate(180deg);
    }

    &[direction="left"] {
      transform: rotate(-90deg);
    }

    &[direction="right"] {
      transform: rotate(90deg);
    }
  }
}</style>