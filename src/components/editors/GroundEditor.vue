<template>
  <div>
      <nav class="flex justify-self-start p-3 max-h-13">
        <tab-row  @any-event="handelEvent"
                  @change-event="changeEvent" 
                  @add-tab-event="addTabEvent"
                  :-current-program-prop="currentProgram" />
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
              <RunSelection :-current-tab-prop="currentAddTab"
                      :-selected-terrain-prop="SelectedTerrainProp"
                      @send-event="sendEvent" />
              <!--<button class="btn m-2" @click="submitCode">Run</button>-->
              <button class="btn m-2" @click="sendDataToBackend">Save</button>
            </nav>
          </section>
          <div class="p-4">
            <Tree @current-program-event="getCurrentTab"
                  :-tab-is-clicked-prop="tabIsClicked" />
          </div>
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
  import Tree from '../Tree.vue'
  import RunSelection from '../RunSelection.vue'
  import axios from 'axios'
  // import TerrainObject from '@/models/TerrainObject'

  // Codemirror.

  export default {
    components: {
      Codemirror,
      TabRow,
      Tree,
      RunSelection
    },
    data(){
        return {
          tabs: [],
          tabCounter: 0,
          extensions: [javascript()],
          value: "",
          externButtonId: 0,
          code: '',
          currentProgram: {},
          tabIsClicked: '',
          currentAddTab: '',
          trueArrId: 0
       }
    },
    mounted() {
        this.value = this.code;
        this.getDataFromBackend();
    },
    props: ['SelectedTerrainProp']
    ,
    emits: ['anyEvent', 'sendEvent']
    ,
    methods: {
      //emit-methods
      handelEvent(buttonInformation = '') {
        console.log(`handelEvent: ${buttonInformation}`);
        this.trueArrId = buttonInformation;
        this.code = this.$g_Programs[buttonInformation].sourceCode;
        console.log(`code: ${JSON.stringify(this.$g_Programs[buttonInformation])}`);
      },
      changeEvent(msg='') {
        console.log(`changeEvent ${msg}`)
        this.tabIsClicked = msg;
      },
      getCurrentTab(program='') { 
        console.log(`getCurrentTab: ${JSON.stringify(program)}`);
        this.currentProgram = program;
      },
      addTabEvent(title='') {
        console.log(`addTabEvent: ${title}`);
        this.currentAddTab = title;
      },
      sendEvent(json='') {
        console.log(`sendEvent: ${JSON.stringify(json)}`);
        this.$emit('sendEvent', json);
      },
      //normal-methods
      async getDataFromBackend() {
        console.log('getFromBackend');
        let get = await axios.get(this.hostname + 'program/getBasicData');
        let programArr = [];
        for (let i = 0; i < get.data.length; i++) {
          let p = await axios.get(this.hostname + `program/get/${get.data[i].programId}`);
          programArr.push(p.data);
        }
        console.log(`pArr: ${JSON.stringify(programArr)}`);
      },
      async sendDataToBackend() {
        console.log(`sendDataToBackend`);
        let currentProgramName = this.$g_Programs[this.externButtonId].programName;
        let currentProgram = {};
        for (let i = 0; i < this.$g_Programs.length; i++) {
          if (currentProgramName == this.$g_Programs[i].programName) {
            currentProgram = this.$g_Programs[i];
          }
        }
        currentProgram.sourceCode = this.code;
        let update = await axios.post(this.hostname + 'program/update', currentProgram);
        console.log(`update status: ${update.status}`);
      },
      updateValue(event) {
        this.value = event;
        this.$store.commit('setCodeFromEditor', event);
        this.$g_Programs[this.trueArrId].sourceCode = this.code; //save code from current tab
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
      }
      */
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