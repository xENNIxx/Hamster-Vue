<template>
    <a @click="clickAction">{{ this.dicTitle }}</a>
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
            dicTitle: this.dicTitleProb,
            isOpen: false
        }
    },
    props: [
        'dicTitleProb'
    ],
    methods: {
        openDictionary() {
            this.isOpen = !this.isOpen;
        }
    }
}


</script>

<style>
</style>