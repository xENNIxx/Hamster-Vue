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
        ["tabIdProp", "tabTitleProp", "tabCodeProb", "tabIsActiveProp", "updatedCode"]
    ,
    emits:
        ['anyEvent']
    ,
    methods: {
        getCode() {
            //this.code = this.updatedCode;
            this.$emit('anyEvent', this.id + "#" + this.code);
            //console.log("getCode-method ->" + this.id + "\n" + this.code);
            console.log(`code: ${this.code}`);
            console.log(`updatedCode: ${this.updatedCode}`);
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
