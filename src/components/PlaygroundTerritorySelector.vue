<template>
    <section class="playground-territory-selector-cotnainer" >
      <div v-if="territories_there">
          <select v-model="selectedTer">
              <option v-for="ter in terList" :key="ter">{{ ter }}</option>
          </select>
          <button class="btn load-ter" @click="loadTer">Load Terrain</button>
      </div>
      <div v-else>
          <p class="msg">No Territories found</p>
      </div>
    </section>
    
  </template>
  
  <script>
import { useThrottledRefHistory } from '@vueuse/core';
import axios from 'axios';

  export default {
      data(){
          return {    
              terList: [],
              fullTerrainData: [],
              selectedTer: 'Select Terrain',
              territories_there: false
          }
      },
      emits: ['seletedTerrain']
      ,
      methods: {
            //before-mount-methods
            async getTerrainDataFromDB() {
                let data = await axios.get(this.hostname + 'terrainObject/getBasicData');
                this.fullTerrainData = data.data;
                this.getTerrainNames();
            },
            getTerrainNames() {
                let nameArr = [];
                for (let i = 0; i < this.fullTerrainData.length; i++) {
                    nameArr.push(this.fullTerrainData[i].terrainName);
                }
                this.terList = nameArr;
                console.log(`terList: ${this.terList}`);
            },
            //normal-methods
            loadTer(){
                this.$emit('seletedTerrain', this.selectedTer);
                if(this.checkValue(this.selectedTer) || this.selectedTer == "Select Terrain")
                    return;

                let currentTerrainId = this.getTerrainIdFromName(this.selectedTer);
                this.getSelectedTerrainFromId(currentTerrainId);
                let json = {
                    "terrainId" : 26,
                    "terrainName" : "testTerrain",
                    "width" : 15,
                    "height" : 12,
                    "defaultHamster" : {
                        "hamster_id" : 3,
                        "cntCornInMouth" : 10,
                        "viewDirection" : "NORTH",
                        "xcord" : 1,
                        "ycord" : 1
                    },
                    "customFields" : [ {
                        "field_id" : 15,
                        "cntCorn" : 12,
                        "wall" : false,
                        "xcord" : 1,
                        "ycord" : 4
                    } ],
                    "terrainPath" : "root/testPackage/"
                }
                //variable json beim emit übergeben und in PlaygroundView "zerlegen"
                // this.$emit('loadTer', currentTerrain);
                //this.$emit('loadTer', this.terList.find((ter) => ter.terrainName == this.selectedTer))
                
            },
            getTerrainIdFromName(terrainName) {
                for (let i = 0; i < this.fullTerrainData.length; i++) {
                    if (this.fullTerrainData[i].terrainName == terrainName) {
                        console.log(`id: ${this.fullTerrainData[i].terrainId}`);
                        return this.fullTerrainData[i].terrainId;
                    }
                }
            },
            async getSelectedTerrainFromId(terrainId) {
                let data = await axios.get(this.hostname + `terrainObject/get/${terrainId}`);
                console.log(`terrainData: ${JSON.stringify(data.data)}`);
            }
      },
      beforeMount() {
        try{
            this.getTerrainDataFromDB();
            //this.terList = JSON.parse(localStorage.getItem('territories'))
            this.territories_there = true;
        }catch(error){
            if(error instanceof SyntaxError){
                localStorage.removeItem('territories')
                this.territories_there = false
            }
        }
      }
  }
  </script>
  
  <style>
  .load-ter{
      margin-bottom: 1rem;
  }
  </style>