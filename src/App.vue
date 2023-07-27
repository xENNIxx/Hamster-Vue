<script setup>
import Darkmode from './components/DarkmodeItem.vue'

</script>

<template>
  <Darkmode/>
  <nav class="text-center text-xl p-3 dark:bg-slate-800 dark:text-white bg-white">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link>
  </nav>
  <router-view/>
</template>


