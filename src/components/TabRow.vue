
<template>
    <button class="borderstyle p-2" @click="addTab">+</button>
    <div class="p-1" v-for="Tab in tabs" :key="Tab.id">
        <Tab :tabTitle=Tab.title :programCode="Tab.code"/>
    </div>
</template>

<script>

import Tab from "@/components/Tab.vue"

export default {
    name: "TabRow",
    data() {
        return {
            tabs: [],
            tabcounter: 0
        }
    },
    components: {
        Tab
    },
    methods: {
        addTab() {
            console.log("addTab-Method");
            this.tabs[this.tabcounter] = "";
            this.tabcounter++;
        }
    }
};
</script>

<style>

.borderstyle {
    border: 1px solid green;
    border-radius: 10px;
}
</style>
