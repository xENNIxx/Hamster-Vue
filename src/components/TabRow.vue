
<template>
    <div class="p-1" v-for="Tab in this.tabs" :key="Tab.id">
        <Tab v-if="Tab.id == this.externButtonId"   
            @any-event="handelEvent"
            :tabIdProp="Tab.id"
            :tabTitleProp="Tab.title"
            :tabCodeProb="Tab.code"
            :tabIsActiveProp="true" />
        <Tab v-else
            @any-event="handelEvent"
            :tabIdProp="Tab.id"
            :tabTitleProp="Tab.title"
            :tabCodeProb="Tab.code"
            :tabIsActiveProp="false" />
    </div>
    <nav>
        <button class="borderstyle p-1 m-1" @click="addTab"> + </button>
        <button class="borderstyle p-1 m-1 bg-red-500" @click="closeTab"> - </button>
    </nav>
    <!--<button class="btn" @click="testMethod">testbutton</button>-->
</template>
<script>

import Tab from "@/components/Tab.vue"
// import Program from '../models/Program.js'

export default {
    name: "TabRow",
    data() {
        return {
            tabs: [], //sind die gerade offenen Tabs
            tabCounter: 0,
            externButtonId: 0
        }
    },
    components: {
        Tab
    },
    props:
        ["tabsProperties"]
    ,
    emit: ['anyEvent']
    ,
    methods: {
        addTab() {
            if (this.checkIfToManyTabsAreOpen()) {
                this.closeFirstTabInArray();
            }
            const inputAllert = prompt('Gib hier etwas ein:', '');
            let defaultTitel = this.getDefaultTitel(inputAllert);
            let defaultCode = this.getdefaultCode(defaultTitel);
            this.pushIntoArrays(defaultTitel, defaultCode);
            this.tabCounter++;
            console.log('addTab');
        },
        handelEvent(buttonInformation = '') {
            let arrInfos = buttonInformation.split('</#/>')
            this.externButtonId = arrInfos[0];
            this.$emit('anyEvent', this.externButtonId);
            console.log(`externButtonId: ${this.externButtonId}`);
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
            return output;
        },
        getDefaultTitel(inputAllert) {
            let defaultTitel = '';
            if (inputAllert != null || inputAllert != undefined || inputAllert.trim() != '') {
                defaultTitel = this.makeTrueClassString(inputAllert);
            } 
            if (defaultTitel.trim() == '') {
                defaultTitel = 'Titel' + this.tabCounter;
            }
            return defaultTitel;
        },
        getdefaultCode(defaultTitel) {
            return 'class ' + defaultTitel + ' {\n\n}';
        },
        pushIntoArrays(defaultTitel, defaultCode) {
            let program = {'programID': this.tabCounter, 'programName': defaultTitel, 'sourceCode': defaultCode};
            this.$g_Programs.push(program);
            let currentTab = {'id': this.tabCounter, 'title': defaultTitel, 'code': defaultCode};
            this.tabs.push(currentTab);
            console.log('pushIntoArrays');
        },
        checkIfToManyTabsAreOpen() {
            if (this.tabs.length >= 5) {
                return true;
            }
            return false;
        },
        closeFirstTabInArray() {
            this.tabs.splice(0, 1);
            console.log('close first tab');
        },
        closeTab() {
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].id == this.externButtonId) {
                    this.tabs.splice(i, 1);
                }
            }
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
