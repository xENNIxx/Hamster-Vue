<template>
  <div>
      <nav class="flex justify-self-start p-3 max-h-13">
        <tab-row @any-event="handelEvent" />
      </nav>
      <div class="grid grid-cols-2 gap-4">
        <nav class="flex justify-self-start">
          <section class="p-3">
            <codemirror
              v-model="code"
              :autofocus="true"
              :indent-with-tab="true"
              :tab-size="2"
              :extensions="extensions"
              @change="updateValue($event)"
              style="height:100%"
            />
            <br>
            <nav>
              <button class="btn" @click="submitCode">Run</button>
              <button class="btn" @click="sendDataToBackend">SaveAll</button>
            </nav>
          </section>
          <!--<div class="p-4">
            <Tree :treeSourceProp="this.treeSource" />
          </div>-->
        </nav>
      </div>
  </div>
</template>

<script>
  import { Codemirror } from 'vue-codemirror'
  // import { java } from '@codemirror/lang-java'
  import {javascript} from '@codemirror/lang-javascript'
  // import { oneDark } from '@codemirror/theme-one-dark'
  import TabRow from '../TabRow.vue'
  // import Tree from '../Tree.vue'
  import axios from 'axios'
  // import TerrainObject from '@/models/TerrainObject'

  // Codemirror.

  export default {
    components: {
      Codemirror,
      TabRow
    },
    data(){
        return {
          tabs: [],
          tabCounter: 0,
          extensions: [javascript()],
          value: "",
          externButtonId: 0,
          code: '',
          treeSource: ['Hamster/Ordner1/File1']
       }
    },
    mounted() {
        this.value = this.code;
    },
    emits: ['anyEvent']
    ,
    methods: {
      //emit-methods
      handelEvent(buttonInformation = '') {
        let arrInfos = buttonInformation.split('</#/>');
        this.externButtonId = arrInfos[0];
        this.code = this.$g_Programs[this.externButtonId].sourceCode;
        this.tabs = arrInfos[1];
      },
      //normal-methods
      async sendDataToBackend() {
        for (let i = 0; i < this.$g_Programs.length; i++) {
          let postStatus = await axios.post(this.hostname + '/program/save', this.$g_Programs[i]);
          console.log(`programPOST: ${postStatus}`);
        }
      },
      updateValue(event) {
        this.value = event;
        this.$store.commit('setCodeFromEditor', event);
        this.$g_Programs[this.externButtonId].sourceCode = this.code; //save code from current tab
        console.log('hier');
      },
      async submitCode(){

        let reqObj = {
          hamster: {
            programName: "test",
            program: this.value
          }
        }
        console.log(this.value)
        // this.$parent.handleServerResponse(await request_(this.hostname + "hamster/defaultTerrain", reqObj, "post"))
        this.$emit('submitted', reqObj)
      },
      /*
      closeTab(x) {
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i] === x) {
            this.tabs.splice(i, 1)
          }
        }
      },
      newTab() {
        this.tabs.push(this.tabCounter++)
      }*/
    }
  }
</script>
<style>
    
    .ͼ15, .cm-editor {
        height: clamp(250px, 35vh, 500px);
        width: clamp(450px, 45vw, 750px);
        text-align: left;
    } 

    .ͼ1.cm-editor {
      border: 1px solid black;
    }

</style>