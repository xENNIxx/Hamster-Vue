
<template>
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
    <nav>
        <button class="borderstyle p-1 m-2" @click="addTab">+</button>
    </nav>
    <!--<button class="btn" @click="testMethod">testbutton</button>-->
</template>
<script>

import Tab from "@/components/Tab.vue"
import Program from '../models/Program'

export default {
    name: "TabRow",
    data() {
        return {
            tabs: [],
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
            const inputAllert = prompt('Gib hier etwas ein:', '');
            let defaultTitel = '';
            if (inputAllert != null || inputAllert != undefined || inputAllert.trim() != '') {
                defaultTitel = this.makeTrueClassString(inputAllert);
            } 
            if (defaultTitel.trim() == '') {
                defaultTitel = 'Titel' + this.tabCounter;
            }
            console.log(`defaultTitel: ${defaultTitel}`);
            let defaultCode = 'class ' + defaultTitel + ' {\n\n}' 
            let program = new Program(this.tabCounter, defaultTitel, defaultCode);
            this.$g_Programs.push(program);
            this.tabs.push({tabId: this.tabCounter, tabTitle: defaultTitel, tabCode: defaultCode});
            // this.$emit('defaultTabs', this.defaultTabs);
            this.tabCounter++;
            console.log('addTab');
        },
        handelEvent(buttonInformation = '') {
            let arrInfos = buttonInformation.split('</#/>')
            this.externButtonId = arrInfos[0];
            this.$emit('anyEvent', this.externButtonId);
            console.log(`defaultTabs: ${this.defaultTabs}`);
        },
        makeTrueClassString(input) {
            let trimmedInput = input.trim();
            let trimmedInputArray = trimmedInput.split('');
            let output = '';
            for (let i = 0; i < trimmedInputArray.length; i++) {
                if (i == 0) {
                    output += trimmedInputArray[i].toUpperCase();
                } else {
                    output += trimmedInputArray[i];
                }
            }
            console.log(output);
            return output;
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
