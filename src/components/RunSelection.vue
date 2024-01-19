<template>
    <div>
        <select>
            <option v-for="opt in nameArr" :key="opt">
                {{ opt }}
            </option>
        </select>
    </div>
    <button @click="send">SendIdsToBackend</button>
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
        ['CurrentTabProp']
    ,
    watch: {
        CurrentTabProp(n, o) {
            this.getTitle();
        }
    },
    methods: {
        getTitle() {
            this.nameArr.push(this.CurrentTabProp);
            console.log(`prop: ${this.CurrentTabProp}`);
        },
        send() {

        }
    }
};
</script>