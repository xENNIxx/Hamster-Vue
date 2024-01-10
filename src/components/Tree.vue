<template>
    <button class="btn" @click="addDic">AddDic</button>
    <table>
      <div v-for="dic in this.dics" :key="dic">
        <a @click="openDic(dic)" class="m-1 bg bg-red-300 rounded-sm linkHoverDic">{{ dic }}</a>
        <div v-if="this.isOpen[dic]" class="ml-4">
          <div v-for="file in this.getFileNames(dic)" :key="file">
            <a @click="getAndFillInCurrentProgramName(file)" class="m-1 linkHoverFile">{{ file }}</a>
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
          }
        }
        return fileNames;
      },
      getAndFillInCurrentProgramName(programName) {
        for (let i = 0; i < this.$g_Programs.length; i++) {
          if (this.$g_Programs[i].programName == programName) {
            console.log(`id: ${this.$g_Programs[i].programID}`);
            this.changeToProgramObjAndPushIntoArray(this.$g_Programs[i]);
          }
        }
      },
      changeToProgramObjAndPushIntoArray(program) {
        // console.log(`id: ${program.programID}`);
        this.$g_CurrentProgram.programId = program.programID;
        this.$g_CurrentProgram.programName = program.programName;
        this.$g_CurrentProgram.sourcecode = program.sourcecode;
        this.$g_CurrentProgram.programPath = program.programPath;
      }
    }
}
</script>

<style>
.linkHoverDic:hover {
  cursor: pointer;
  font-weight: bold;
}
.linkHoverFile:hover {
  cursor: pointer;
}
</style>
