<template>
    <a @click="clickAction">{{ this.title }}</a>
    <div v-if="isOpen">
      <div>
        <p>offen</p>
      </div>
    </div>
</template>

<script>

export default {
    name: "Dictionary",
    data() {
        return {
            dicTitle: 'Title',
            dicFiles: [],
            isOpen: false
        }
    },
    props: {

    },
    methods: {
        openDictionary() {
            this.isOpen = !this.isOpen;
        }
    }
}


</script>

<style>
</style>