<template>
  <div class="dark:text-white">
    <div class="text-center m-10 text-xl">Hamster</div>
    <RestButton name="Get all users" :link="this.hostname + 'user/users'" method="get"/>
  </div>
</template>

<script>
import RestButton from "../components/RestButton.vue";
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    RestButton,
  },
  methods: {
    
  }
}
</script>
