<template>
    <button>click</button>
    <table>
      <div v-for="element in this.treeSource" :key="element">
        <tr>
          <Dictionary :dicTitleProb="element.programName"/>
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
            treeSource: this.getTreeSource(),
            depth: 0
        }
    },
    props: 
        ['treeSourceProp']
        ,   
    methods: {
      getTreeSource() {
        return [{'programId': 1, 'programName': 'hamster', 'programPath': 'dic1/dic10'},
                {'programId': 2, 'programName': 'maus', 'programPath': 'dic2'}
              ];
      },
      getSplitPath(path) {
        return path.split('/');
      }
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
