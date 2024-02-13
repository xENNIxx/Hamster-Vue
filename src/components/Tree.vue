<template>
    <button class="btn" @click="addDic">AddDic</button>
    <div v-for="dic in dics" :key="dic">
      <a v-if="this.isOpen[dic]" @click="openDic(dic)" class="m-1 linkHoverDic">v <b>{{ dic }}</b></a>
      <a v-else @click="openDic(dic)" class="m-1 linkHoverDic">> <b>{{ dic }}</b></a>
      <div v-if="this.isOpen[dic]" class="ml-4">
        <div v-for="File in getFileNames(dic)" :key="File">
          <a @click="getAndFillInCurrentProgramName(File)" class="m-1 linkHoverFile">o <i>{{ File }}</i></a>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    name: "Tree",
    data() {
        return {
            dics: [],
            isOpen: {},
            dicCounter: 0
        }
    },
    props: 
        ['TabIsClickedProp']
        ,
    emits: 
        ['currentProgramEvent']
        ,
    watch: {
      TabIsClickedProp(n,o) {
        this.updateFileTreeNames();
      }
    },
    methods: {
      addDic() {
        	const inputPath = prompt('Gib hier den Namen des Ordners ein:', '');
          if (this.checkInput(inputPath)) {
            this.dics.push(inputPath);
            this.$g_Dics.push(inputPath); //damit die Abfrage in TabRow funktioniert
            this.isOpen[inputPath] = false;
          } else {
            alert('Kein valider dic-name');
          }
      },
      checkInput(inputPath) {
        if (inputPath == null || inputPath == undefined || inputPath.trim() == '') {
          return false;
        }
        return true;
      },
      openDic(dicName) {
        this.isOpen[dicName] = !this.isOpen[dicName];
      },
      getAndFillInCurrentProgramName(programName) {
        for (let i = 0; i < this.$g_Programs.length; i++) {
          if (this.$g_Programs[i].programName == programName) {
            console.log(`id: ${this.$g_Programs[i].programID}`);
            this.changeToProgramObjAndPushIntoArray(this.$g_Programs[i]); 
          }
        }
      },
      getFileNames(dicName) {
        let fileNames = [];
        for (let i = 0; i < this.$g_Programs.length; i++) {
          if (this.$g_Programs[i].programPath == dicName) {
            fileNames.push(this.$g_Programs[i].programName);
          }
        }
        return fileNames;
      },
      changeToProgramObjAndPushIntoArray(program) {
        let currentProgram = {'programId': program.programId,
                              'programName': program.programName,
                              'sourcecode': program.sourceCode,
                              'programPath': program.programPath,
                              'arrId': program.arrId};
        //console.log(`currentProgram: ${JSON.stringify(currentProgram)}`);
        this.$emit('currentProgramEvent', currentProgram);
      },
      updateFileTreeNames() {
        for (let i = 0; i < this.$g_Dics.length; i++) {
          console.log(this.$g_Dics[i]);
        }
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
