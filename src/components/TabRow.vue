
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
        <button class="borderstyle p-1 m-1 bg-green-500" @click="addTab"> + </button>
        <button class="borderstyle p-1 m-1 bg-red-500" @click="closeTab(this.externButtonId)"> - </button>
    </nav>
</template>
<script>

import Tab from "@/components/Tab.vue"

export default {
    name: "TabRow",
    data() {
        return {
            tabs: [], //sind die gerade offenen Tabs
            tabCounter: 0,
            externButtonId: 0,
            tabSequenz: []
        }
    },
    components: {
        Tab
    },
    emit: ['anyEvent']
    ,
    methods: {
        addTab() {
            if (this.checkIfToManyTabsAreOpen()) {
                this.closeOldestTabInArray();
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
            this.shiftArray(this.externButtonId, this.tabSequenz);
            // console.log(`tabSequenz: ${this.tabSequenz}`);
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
            this.shiftArray(this.externButtonId, this.tabSequenz);
            // console.log('pushIntoArrays');
        },
        checkIfToManyTabsAreOpen() {
            if (this.tabs.length >= 5) {
                return true;
            }
            return false;
        },
        closeOldestTabInArray() {
            // console.log(`tabSequenz: ${this.tabSequenz}`);
            let length = this.tabSequenz.length;
            this.closeTab(this.tabSequenz[length - 1]);
        },
        closeTab(externId) {
            // console.log(`externId: ${externId}`);
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].id == externId) {
                    this.tabs.splice(i, 1);
                }
            }
            for (let i = 0; i < this.tabSequenz.length; i++) {
                if (this.tabSequenz[i] == externId) {
                    this.tabSequenz.splice(i, 1);
                }
            }
        },
        arrayContainsDigit(digit, array) {
            for (let i = 0; i < array.length; i++) {
                if (digit == array[i]) {
                    return true;
                }
            }
            return false;
        },
        shiftArray(buttonIndex, array) {
            if (!this.arrayContainsDigit(buttonIndex, array)) {
                let newArray = [];
                for (let i = 0; i < array.length; i++) {
                    newArray[i + 1] = array[i];
                }
                newArray[0] = buttonIndex;
                this.tabSequenz = newArray;
            } else {
                let indexPos = 0;
                let newArray = [];
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == buttonIndex) {
                        indexPos = i;
                    }
                }
                for (let i = 0; i < indexPos; i++) {
                    newArray[i + 1] = array[i];
                }
                for (let i = indexPos + 1; i < array.length; i++) {
                    newArray[i] = array[i];
                }
                newArray[0] = buttonIndex;
                this.tabSequenz = newArray;
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
