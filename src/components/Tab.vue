<template>
    <div>
        <button v-if="isActive" class="borderstyle p-2 bg-gray-200" @click="getCode">{{ this.title }}</button>
        <button v-else class="borderstyle p-2" @click="getCode">{{ this.title }}</button>
    </div>
</template>

<script>
import Program from '../models/Program'

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
            // this.$emit('anyEvent', this.id + "/#/" + this.code);
            // let p = new Program(this.id, this.title, this.code);
            // this.$g_Programs.push(p);
            // this.$g_Programs = this.id;
            console.log(`global_Tab: ${this.$g_Programs}`);
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
