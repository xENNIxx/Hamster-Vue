
<template>
    <button class="borderstyle p-2" @click="addTab">+</button>
    <div class="p-1" v-for="Tab in tabs" :key="Tab.id">
        <Tab
            :tabIdProp="tabs[Tab.tabId].tabId" 
            :tabTitleProp="tabs[Tab.tabId].tabTitle" 
            :tabCodeProb="tabs[Tab.tabId].tabCode"
        />
    </div>
</template>

<script>

import Tab from "@/components/Tab.vue"

export default {
    name: "TabRow",
    data() {
        return {
            tabs: [],
            tabCounter: 0
        }
    },
    components: {
        Tab
    },
    methods: {
        addTab() {
            console.log("addTab-Method");
            this.tabs.push({tabId: this.tabCounter, tabTitle: "titel " + this.tabCounter, tabCode: "-empty-"})
            this.tabCounter++;
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
