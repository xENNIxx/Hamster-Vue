<template>
    <select v-model="selectedOpt">
        <option v-for="opt in nameArr" :key="opt">
            {{ opt }}
        </option>
    </select>
    <button @click="send" class="btn bg-amber-600 m-2">Run</button>
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
    emits:
        ['sendEvent']
    ,
    watch: {
        CurrentTabProp(n, o) {
            this.getTitle();
        },
        SelectedTerrainProp(n, o) {
            this.getTerrainId(this.SelectedTerrainProp);
        }
    },
    mounted() {
        //this.getAllProgramsFromDb();
    },
    methods: {
        async getAllProgramsFromDb() {
            let allPrograms = await axios.get(this.hostname + 'program/getBasicData');
            for (let i = 0; i < allPrograms.data.length; i++) {
                let x = await axios.get(this.hostname + `program/get/${allPrograms[i].programID}`);
                //this.$g_Programs.push(x.data);
                console.log(`id: ${allPrograms[i].programID}`);
            }
            console.log(`allPrograms: ${JSON.stringify(allPrograms.data)}`);
        },
        getTitle() {
            this.nameArr.push(this.CurrentTabProp);
        },
        async send() {
            this.getProgramId();
            console.log(`ids: ${this.programId}/${this.terrainId}`);
            if (this.idChecker()) {
                //let x = await axios.post(this.hostname + `run/runProgram/${this.programId}/${this.terrainId}`);
                //console.log(`sendStatus: ${x.status}`);
                //mock-string schicken
                let hamsterCommands = {0: '1', 1: '1', finished: 'working'};
                this.$emit('sendEvent', hamsterCommands);
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
                }
            }
        },
        getProgramId() {
            for (let i = 0; i < this.$g_Programs.length; i++) {
                if (this.$g_Programs[i].programName == this.selectedOpt) {
                    this.programId = this.$g_Programs[i].programId;
                }
            }
        },
        idChecker() {
            if (this.programId <= 0 || this.programId == undefined || this.programId == null ||
                this.terrainId <= 0 || this.terrainId == undefined || this.terrainId == null) {
                    return false;
            }
            return true;
        }
    }
};
</script>