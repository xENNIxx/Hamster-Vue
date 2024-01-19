<template>
    <div>
        <select>
            <option v-for="opt in nameArr" :key="opt.programName">
                {{ opt.programName }}
            </option>
        </select>
    </div>
    <button @click="getProgramNames">click</button>
</template>

<script>

export default {
    name: 'RunSelection',
    data() {
        return {
            nameArr: []
        }
    },
    props: 
        []
    ,
    watch: {
        
    },
    methods: {
        getProgramNames() {
            this.nameArr = this.$g_Programs;
        }
    }
};
</script>