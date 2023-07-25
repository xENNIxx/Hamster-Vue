<template>
  <div class="text-green-700 text-xl m-14">
    <HelloWorld msg="Willkommen beim Hamsterer!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
