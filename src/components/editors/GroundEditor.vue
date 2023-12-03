<template>
  <div>
        <nav class="flex justify-self-start p-3 max-h-13">
          <tab-row @any-event="handelEvent" />
        </nav>
          <section>
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
              <button class="btn bg-red-500" @click="closeTab">Close</button>
              <button class="btn" @click="sendCodeToBackend">Save</button>
            </nav>
          </section>
  </div>
</template>

<script>
  import { Codemirror } from 'vue-codemirror'
  // import { java } from '@codemirror/lang-java'
  import {javascript} from '@codemirror/lang-javascript'
  // import { oneDark } from '@codemirror/theme-one-dark'
  import TabRow from '../TabRow.vue'
  // import Program from '../../models/Program'

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
          code: ''
       }
    },
    mounted() {
        this.value = this.code;
    },
    emits: ['anyEvent']
    ,
    methods: {
      sendCodeToBackend() {
        console.log(`g_Tabs: ${this.$g_Tabs[0].title}`);
      },
      handelEvent(buttonInformation = '') {
        let arrInfos = buttonInformation.split('</#/>')
        this.externButtonId = arrInfos[0];
        this.code = this.$g_Programs[this.externButtonId].sourceCode;
        this.tabs = arrInfos[1];
        console.log(`sourceCode: ${this.code}`);
      },
      closeTab() {
        this.$g_Programs[this.externButtonId].sourceCode = this.code;
      },
      updateValue(event) {
        this.value = event;
        this.$store.commit('setCodeFromEditor', event);
        this.$g_Programs[this.externButtonId].sourceCode = this.code; //save code from current tab
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