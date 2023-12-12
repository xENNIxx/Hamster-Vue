<template>
    <a @click="clickAction">{{ this.getRightFileTitle() }}</a>
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
    getRightFileTitle() {
      let realArray = []
      let array = this.title.split('');
      for (let i = 0; i < array.length - 1; i++) {
        realArray.push(array[i]);
      }
      console.log(`realArray: ${realArray.toString()}`);
      return realArray.toString();
    },
    clickAction() {

    }
  }
}

</script>

<style>
</style>
