
<template>
    <nav>
        <input type="text"/>
        <button class="borderstyle p-1 m-2" @click="addTab">+</button>
    </nav>
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
    <!--<button class="btn" @click="testMethod">testbutton</button>-->
</template>
<script>

import Tab from "@/components/Tab.vue"
import Program from '../models/Program'

export default {
    name: "TabRow",
    data() {
        return {
            tabs: this.tabsProperties,
            tabCounter: 0,
            externButtonId: 0,
            defaultTabs: [] //array, das an den GroundEditor übergeben wird -> wird also nicht angezeigt
        }
    },
    components: {
        Tab
    },
    props: 
        ["tabsProperties"]
    ,
    emit: ['anyEvent', 'defaultTabs']
    ,
    methods: {
        addTab() {
            let defaultTitel = "titel" + this.tabCounter;
            let defaultCode = "void main() {\n\n}";
            let program = new Program(this.tabCounter, defaultTitel, defaultCode);
            this.$g_Programs.push(program);
            this.defaultTabs.push({tabId: this.tabCounter, tabTitle: "titel " + this.tabCounter, tabCode: defaultCode});
            this.$emit('defaultTabs', this.defaultTabs);
            this.tabCounter++;
            console.log('addTab');
        },
        handelEvent(buttonInformation = '') {
            let arrInfos = buttonInformation.split('</#/>')
            this.externButtonId = arrInfos[0];
            this.$emit('anyEvent', this.externButtonId);
            console.log(`defaultTabs: ${this.defaultTabs}`);
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
