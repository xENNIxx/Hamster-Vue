
<template>
    <button class="borderstyle p-1 m-2" @click="addTab">+</button>
    <div class="p-1" v-for="Tab in tabs" :key="Tab.id">
        <Tab v-if="Tab.tabId == this.externButtonId"
            @any-event="handelEvent"
            :tabIdProp="tabs[Tab.tabId].tabId"
            :tabTitleProp="tabs[Tab.tabId].tabTitle"
            :tabCodeProb="tabs[Tab.tabId].tabCode"
            :tabIsActiveProp="true" />
        <Tab v-else
            @any-event="handelEvent"
            :tabIdProp="tabs[Tab.tabId].tabId"
            :tabTitleProp="tabs[Tab.tabId].tabTitle"
            :tabCodeProb="tabs[Tab.tabId].tabCode"
            :tabIsActiveProp="false" />
    </div>
</template>

<script>

import Tab from "@/components/Tab.vue"

export default {
    name: "TabRow",
    data() {
        return {
            tabs: [],
            tabCounter: 0,
            externButtonId: 0,
        }
    },
    components: {
        Tab
    },
    emit: ['anyEvent']
    ,
    methods: {
        addTab() {
            this.tabs.push({tabId: this.tabCounter, tabTitle: "titel " + this.tabCounter, tabCode: "empty->" + this.tabCounter});
            this.tabCounter++;

            //console.log("addTab-Method");
        },
        handelEvent(buttonInformation = '') {
            let arrInfos = buttonInformation.split('/#/')
            this.externButtonId = arrInfos[0]
            this.$emit('anyEvent', arrInfos[1]);
            //console.log('handelEvent from button ' + this.externButtonId);
        },
    }
};
</script>

<style>

.borderstyle {
    border: 1px solid green;
    border-radius: 10px;
}
</style>
