<template>
    <button @click="getTreeSourceMatrix">click</button>
    <div v-for="title in this.currentDepth" :key="title">
      <div v-if="this.isDictionary(title)">
        <Dictionary :dicTitleProp="title" />
      </div>
      <div v-else>
        <File :fileTitleProp="title" />
      </div>
    </div>
</template>

<script>

import Dictionary from './Dictionary.vue'
import File from './File.vue'

export default {
    name: "Tree",
    components: {
        Dictionary,
        File
    },
    data() {
        return {
            treeSource: ['Hamster/File1$', 'Tiger/Ordner1', 'Tiger/Ordner2'],
            treeSourceMatrix: [],
            currentDepth: [],
            depth: 0
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
      getTreeSourceMatrix() {
        for (let i = 0; i < this.treeSource.length; i++) {
          this.treeSourceMatrix[i] = this.treeSource[i].split('/');
        }
        this.compareFirstDepth();
      },
      isDictionary(inputString) {
        let array = inputString.split('');
        if (array[array.length - 1] == '$') {
          return false;
        }
        return true;
      },
      containsDictionary(inputString, array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i] == inputString) {
            return true;
          }
        }
        return false;
      },
      compareFirstDepth() {
        this.currentDepth = [];
        for (let i = 0; i < this.treeSourceMatrix.length; i++) {
          if (!this.containsDictionary(this.treeSourceMatrix[i][this.depth], this.currentDepth)) {
            this.currentDepth.push(this.treeSourceMatrix[i][this.depth]);
          }
        }
        this.depth++;
        console.log(`compareDepth: ${this.currentDepth}`);
      },

    }
}
</script>

<style>
</style>
