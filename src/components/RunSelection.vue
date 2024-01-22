<template>
    <div>
        <select v-model="selectedOpt">
            <option v-for="opt in nameArr" :key="opt">
                {{ opt }}
            </option>
        </select>
    </div>
    <button @click="send">SendIdsToBackend</button>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RunSelection',
    data() {
        return {
            nameArr: [],
            selectedOpt: '',
            axiosJson: {'programId': 0, 'terrainName': ''}
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
        send() {
            if (this.checkIfProgramExists()) {
                let c_programId = this.getProgramIdFromName();
                if (c_programId == '...') {
                    alert('Error -> programId wurde nicht gefunden.');
                } else {
                    console.log(`c_programId: ${c_programId}`);
                }
                this.axiosJson.programId = c_programId;
                this.axiosJson.terrainName = this.SelectedTerrainProp;
                //axios.post(); -> axios call um this.axiosJson zu posten
            } else {
                alert('Error -> programId wurde nicht gefunden.');
            }
        },
        checkIfProgramExists() {
            for (let i = 0; i < this.$g_Programs.length; i++) {
                if (this.$g_Programs[i].programName == this.selectedOpt) {
                    return true;
                }
            }
            return false;
        },
        getProgramIdFromName() {
            console.log(`selectedOpt: ${this.selectedOpt}`);
            for (let i = 0; i < this.$g_Programs.length; i++) {
                if (this.$g_Programs[i].programName == this.selectedOpt) {
                    return this.$g_Programs[i].programID;
                }
            }
            return '...';
        }
    }
};
</script>