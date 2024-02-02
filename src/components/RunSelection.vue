<template>
    <button @click="send" class="btn m-2">SendIdsToBackend</button>
    <select v-model="selectedOpt">
        <option v-for="opt in nameArr" :key="opt">
            {{ opt }}
        </option>
    </select>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RunSelection',
    data() {
        return {
            nameArr: [],
            selectedOpt: '',
            axiosJson: {'programId': 0, 'terrainId': 0}
        }
    },
    props: 
        ['CurrentTabProp', 'SelectedTerrainProp']
    ,
    watch: {
        CurrentTabProp(n, o) {
            this.getTitle();
        },
        SelectedTerrainProp(n, o) {
            console.log(`terrainProp: ${this.SelectedTerrainProp}`);
        }
    },
    methods: {
        getTitle() {
            this.nameArr.push(this.CurrentTabProp);
            console.log(`prop: ${this.CurrentTabProp}`);
        },
        async send() {
            // let bd_program = await axios.get(this.hostname + `program/getBasicData`);
            let bd_terrains = await axios.get(this.hostname + `terrainObject/getBasicData`);
            // console.log(`basicData: ${JSON.stringify(bd_terrains.data)}`);
            let currentTerrainId = this.getTerrainId(bd_terrains.data);
            if (currentTerrainId >= 0) {
                this.axiosJson['terrainId'] = currentTerrainId;
            } else {
                alert('TerrainId nicht gefunden.');
            }
            // let currentProgramId
        },
        getTerrainId(terrains) {
            console.log(`prop: ${this.SelectedTerrainProp}`);
            console.log(`terrains: ${JSON.stringify(terrains[0])}`);
            for (let i = 0; i < terrains.length; i++) {
                if (terrains[i].terrainName == this.SelectedTerrainProp) {
                    console.log(`terrainId: ${terrains[i].terrainName}`);
                    return terrains[i].terrainId;
                }
            }
            return -1;
        }
        /*
        getProgramId() {
            for (let i = 0; i < this.$g_Programs.length; i++) {
                if () {

                }
            }
        }
        */
    }
};
</script>