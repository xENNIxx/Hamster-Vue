<template>
    <a @click="openDictionary" class="bg-blue-500">{{ this.dicTitle }}</a>
    <div v-if="this.isOpen" class="ml-5">
        <p>Dic ist offen</p>
        <p>Dic ist länger</p>
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