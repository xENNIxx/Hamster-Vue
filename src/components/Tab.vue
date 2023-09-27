<template>
    <div>
        <Button class="p-2">{{ title }}</Button>
    </div>
</template>

<script>
export default {
    name: "Tap",
    data() {
        return {
            id: this.tapId,
            title: this.tapTitle,
            code: this.programCode
        }
    },
    props: {
        tapId: {
            typeof: Int32Array,
            default: 99
        },
        tapTitle:{
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
