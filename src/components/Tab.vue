<template>
    <div>
        <button v-if="isActive" class="borderstyle p-2 bg-gray-200" @click="getCode">{{ this.title }}</button>
        <button v-else class="borderstyle p-2" @click="getCode">{{ this.title }}</button>
    </div>
</template>

<script>

export default {
    name: "Tab",
    data() {
        return {
            id: this.tabIdProp,
            title: this.tabTitleProp,
            code: this.tabCodeProb,
            isActive: this.tabIsActiveProp
        }
    },
    props:
        ["tabIdProp", "tabTitleProp", "tabCodeProb", "tabIsActiveProp"]
    ,
    emits:
        ['anyEvent']
    ,
    methods: {
        getCode() {
            this.code = '';
            this.$emit('anyEvent', this.id + "</#/>" + this.code);
            console.log(`tab: ${this.id}`);
        }
    }
};
</script>

<style scoped>
.borderstyle {
    border: 1px solid black;
    border-radius: 10px;
}


</style>
