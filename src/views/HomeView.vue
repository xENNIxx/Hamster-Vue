<template>
  <div class="dark:text-white">
    <div class="flex flex-col items-center justify-center m-10">
      <div class="text-center text-5xl">Hamster</div>
      <img src="https://cdn.discordapp.com/attachments/633687743775506482/1177637120500846603/Alola-Raichu_Home.webp?ex=65733b08&is=6560c608&hm=895f9b8e90abb588e776b14988b49eee286c52c8229ea9480962ab4a5654ae9a&">
    </div>
      <!--  <RestButton name="Get all users" :link="this.hostname + 'user/users'" method="get"/>-->
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
