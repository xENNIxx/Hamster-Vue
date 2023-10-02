<template>
    <div>
        <Button class="borderstyle p-2">{{ title }}</Button>
    </div>
</template>

<script>
export default {
    name: "Tab",
    data() {
        return {
            id: this.tabId,
            title: this.tabTitle,
            code: this.programCode
        }
    },
    props: {
        tabId: {
            typeof: Int32Array,
            default: 99
        },
        tabTitle:{
            typeof: String,
            default: 'title'
        },
        programCode: {
            typeof: String,
            default: 'no code'
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
