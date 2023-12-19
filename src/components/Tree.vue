<template>
    <button class="btn" @click="addDic">AddDic</button>
    <table>
      <div v-for="dic in this.dics" :key="dic">
        <tr>
          <Dictionary :dicTitleProb="dic" />
        </tr>
      </div>
    </table>
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
            dics: []
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
      },
    }
}
</script>

<style>
.depth_0 {
  margin-left: 5px;
}
.depth_1 {
  margin-left: 15px;
}
.depth_2 {
  margin-left: 25px;
}
</style>
