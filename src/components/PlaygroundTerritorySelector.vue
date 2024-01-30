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
            loadTer(){
                this.$emit('seletedTerrain', this.selectedTer);
                if(this.checkValue(this.selectedTer) || this.selectedTer == "Select Terrain")
                    return;
                let currentTerrain = this.getFullSelectedTerrain();
                this.$emit('loadTer', currentTerrain);
                //this.$emit('loadTer', this.terList.find((ter) => ter.terrainName == this.selectedTer))
                
            },
            async getTerrainsFromDB() {
                let data = await axios.get(this.hostname + 'terrainObject/getBasicData');
                this.fullTerrainData = data.data;
                let nameArr = [];
                for (let i = 0; i < data.data.length; i++) {
                    nameArr.push(data.data[i].terrainName);
                }
                this.terList = nameArr;
                console.log(`terList: ${this.terList}`);
            },
            getFullSelectedTerrain() {
                for (let i = 0; i < this.fullTerrainData.length; i++) {
                    if (this.fullTerrainData[i].terrainName == this.selectedTer) {
                        return this.fullTerrainData[i];
                    }
                }
            }
      },
      beforeMount() {
        try{
            this.getTerrainsFromDB();
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