<template>
    <button class="btn" @click="addDic">AddDic</button>
    <table>
      <div v-for="dic in this.dics" :key="dic">
        <a @click="openDic(dic)" class="m-1  font-bold">{{ dic }}</a>
        <div v-if="this.isOpen[dic]" class="ml-2">
          <div v-for="file in this.getFileNames(dic)" :key="file">
            <a @click="getProgramName(file)" class="m-1">{{ file }}</a>
          </div>
        </div>
      </div>
    </table>
</template>

<script>

export default {
    name: "Tree",
    data() {
        return {
            dics: [],
            filesForDic: [],
            isOpen: {}
        }
    },
    props: 
        ['treeSourceProp']
        ,   
    methods: {
      addDic() {
        	const inputPath = prompt('Gib hier den Namen des Ordners ein:', '');
          this.dics.push(inputPath);
          this.$g_Dics.push(inputPath); //damit die Abfrage in TabRow funktioniert
          this.isOpen[inputPath] = false;
      },
      openDic(dicName) {
        this.isOpen[dicName] = !this.isOpen[dicName];
      },
      getFileNames(dicName) {
        let fileNames = [];
        console.log('hier');
        for (let i = 0; i < this.$g_Programs.length; i++) {
          if (this.$g_Programs[i].programPath == dicName) {
            fileNames.push(this.$g_Programs[i].programName);
            console.log('getFileNames');
          }
        }
        return fileNames;
      },
      getProgramName(programName) {
        console.log(`programName: ${programName}`);
      }
    }
}
</script>

<style>
</style>
