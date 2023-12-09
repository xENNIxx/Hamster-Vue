<template>
    <Dictionary />
</template>

<script>

import Dictionary from './Dictionary.vue'

export default {
    name: "Tree",
    components: {
        Dictionary
    },
    data() {
        return {
            treeSource: this.treeSourceProp
        }
    },
    props: 
        ['treeSourceProp'] //hier kommen das Array mit den gesamten Paths hinein
        //Path mit Dictionary am Ende:
        //          "Hamster/Bewegung/Ordner1"
        //Path mit File am Ende:
        //          "Hamster/Bewegung/File1$" -> das Dollerzeichen markiert ein File
        ,   
    methods: {
        
    }
}
</script>

<style>
</style>
