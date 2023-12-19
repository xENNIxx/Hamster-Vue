<template>
    <a @click="clickAction">{{ this.title }}</a>
</template>

<script>

export default {
  name: "File",
  data() {
    return {
      title: this.fileTitleProp
    }
  },
  props: [
    'fileTitleProp'
  ],
  methods: {
    clickAction() {
      console.log('fileAction');
    }
  }
}

</script>

<style>
</style>
