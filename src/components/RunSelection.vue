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
            console.log(`terrainProp: ${this.SelectedTerrainProp}`);
        }
    },
    methods: {
        getTitle() {
            this.nameArr.push(this.CurrentTabProp);
            console.log(`prop: ${this.CurrentTabProp}`);
        },
        async send() {
            
        },
        getTerrainId() {
            
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