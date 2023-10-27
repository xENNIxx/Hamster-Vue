<template>
    <div>
        <Button v-if="isActive" class="borderstyle p-2 bg-red-400" @click="getCode">{{ this.title }}</Button>
        <Button v-else class="borderstyle p-2" @click="getCode">{{ this.title }}</Button>
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
            this.$emit('anyEvent', this.id);
            console.log("getCode-method ->" + this.id + "\n" + this.code);
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
