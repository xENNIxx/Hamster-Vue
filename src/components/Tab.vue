<template>
    <div>
        <Button class="borderstyle p-2" @click="getCode">{{ this.title }}</Button>
    </div>
</template>

<script>
export default {
    name: "Tab",
    data() {
        return {
            id: this.tabIdProp,
            title: this.tabTitleProp,
            code: this.tabCodeProb
        }
    },
    props:
        ["tabIdProp", "tabTitleProp", "tabCodeProb"]
    ,
    methods: {
        getCode() {
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
