<template>
    <div>
        <select>
            <div v-for="opt in nameArr" :key="opt">
                <option>{{ opt }}</option>
            </div>
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
    methods: {
        getProgramNames() {
            this.nameArr.push('hier');
            console.log('push');
        }
    }
};
</script>