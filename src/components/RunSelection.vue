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
            programId: 0,
            terrainId: 0
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
            this.getTerrainId(this.SelectedTerrainProp);
        }
    },
    methods: {
        getTitle() {
            this.nameArr.push(this.CurrentTabProp);
        },
        async send() {
            this.getProgramId();
            if (this.idChecker()) {
                let x = await axios.post(this.hostname + `run/runProgram/${this.programId}/${this.terrainId}`);
                console.log(`sendStatus: ${x.status}`);
            } else {
                console.log('Es müssen ein Terrain und ein Programm ausgewählt sein.');
            }
            
        },
        async getTerrainId(terrainName) {
            let x = await axios.get(this.hostname + 'terrainObject/getBasicData');
            let basic = x.data;
            for (let i = 0; i < basic.length; i++) {
                if (basic[i].terrainName == terrainName) {
                    this.terrainId = basic[i].terrainId;
                    console.log(`tId: ${this.terrainId}`);
                }
            }
        },
        getProgramId() {
            for (let i = 0; i < this.$g_Programs.length; i++) {
                if (this.$g_Programs[i].programName == this.selectedOpt) {
                    this.programId = this.$g_Programs[i].programId;
                    console.log(`pId: ${this.programId}`);
                }
            }
        },
        idChecker() {
            if (this.programId == 0 || this.programId == undefined || this.programId == null ||
                this.terrainId == 0 || this.terrainId == undefined || this.terrainId == null) {
                    return false;
            }
            return true;
        }
    }
};
</script>