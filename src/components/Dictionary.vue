<template>
    <a @click="openDictionary">{{ this.dicTitle }}</a>
    <div v-if="isOpen" class="marginRight">
        <div v-for="file in this.fileNames" :key="file">
            <File :fileTitleProp="file" />
        </div>
    </div>
</template>

<script>
import File from './File.vue'

export default {
    name: "Dictionary",
    components: {
        File
    },
    data() {
        return {
            dicTitle: this.dicTitleProb,
            fileNames: [],
            isOpen: false
        }
    },
    props: [
        'dicTitleProb'
    ],
    methods: {
        openDictionary() {
            console.log('open');
            this.isOpen = !this.isOpen;
        },
        getFileNames() {
            
        }
    }
}


</script>

<style>
.marginRight {
    margin-left: 15px;
}
</style>