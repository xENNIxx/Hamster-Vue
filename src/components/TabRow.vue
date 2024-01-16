
<template>
    <div class="mr-4">
        <Tree @current-program-event="currentProgramMethod" :-tab-is-clicked-prop="tabIsClicked"/>
    </div>
    <div class="p-1" v-for="Tab in tabs" :key="Tab.title">
        <Tab v-if="Tab.id == externButtonId"
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
        <button class="borderstyle p-1 m-1 bg-orange-500" @click="updateTitleAndProgramName"> % </button>
    </nav>
    <!--<button class="btn btn-primary" @click="clickAction">addToTabs</button>-->
</template>
<script>

import Tab from "@/components/Tab.vue"
import Tree from "@/components/Tree.vue"

export default {
    name: "TabRow",
    data() {
        return {
            tabs: [], //sind die gerade offenen Tabs
            tabCounter: 0,
            externButtonId: 0, //TabId vom gerade aktiven Tab
            tabSequenz: [],
            tabIsClicked: false
        }
    },
    components: {
        Tab,
        Tree
    },
    emit: ['anyEvent']
    ,
    methods: {
        //emit-methods
        currentProgramMethod(msg='') {
            this.pushCurrentProgramIntoArray(msg);
        },
        handelEvent(buttonInformation = '') {
            let arrInfos = buttonInformation.split('</#/>')
            this.externButtonId = arrInfos[0];
            this.$emit('anyEvent', this.externButtonId);
            this.shiftArray(this.externButtonId, this.tabSequenz);
        },
        //normal-methods
        addTab() {
            if (this.checkIfToManyTabsAreOpen()) {
                this.closeOldestTabInArray();
            }
            const inputAllert = prompt('Gib hier den programName ein:', '');
            const inputPath = prompt('Gib hier den Speicherort ein:', '');
            if (this.checkIfDicExist(inputPath)) {
                let defaultTitel = this.getDefaultTitel(inputAllert);
                let defaultCode = this.getdefaultCode(defaultTitel);
                this.pushIntoArrays(defaultTitel, defaultCode, inputPath);
                this.tabCounter++;
            } else {
                alert('Dieser Ordner existiert nicht.');
            }
            console.log('addTab');
        },
        checkIfDicExist(inputPath) {
            for (let i = 0; i < this.$g_Dics.length; i++) {
                if (inputPath == this.$g_Dics[i]) {
                    return true;
                }
            }
            return false;
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
        pushIntoArrays(defaultTitel, defaultCode, path) {
            let program = {'programID': this.tabCounter, 'programName': defaultTitel, 
                            'sourceCode': defaultCode, 'programPath': path};
            this.$g_Programs.push(program);
            let currentTab = {'id': this.tabCounter, 'title': defaultTitel, 'code': defaultCode};
            this.tabs.push(currentTab);
            this.shiftArray(this.externButtonId, this.tabSequenz);
            // console.log('pushIntoArrays');
        },
        pushCurrentProgramIntoArray(program) {
            if (program == null || program == undefined) {
                console.log('program is null or undefined');
            } else if (!this.checkIfThisProgramIsInTabRow(program)) {
                // console.log(`programId: ${program.programId}, programName: ${program.programName}`);
                let currentTab = {'id': program.programId,
                                 'title': program.programName,
                                 'code': program.sourceCode};
                console.log(`currentTab: ${currentTab.id}`);
                this.tabs.push(currentTab);
            } else {
                console.log(`Tab ${program.programName} ist bereits offen`);
            }
        },
        checkIfThisProgramIsInTabRow(program) {
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].title == program.programName) {
                    return true;
                }
            }
            return false;
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
        updateTitleAndProgramName() {
            const input = prompt('Gib hier den neuen Titel ein:', '');
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].id == this.externButtonId) {
                    console.log(`currentTab: ${this.tabs[i].title}`);
                    this.tabs[i].title = this.getDefaultTitel(input);
                }
            }
            for (let i = 0; i < this.$g_Programs.length; i++) {
                if (this.$g_Programs[i].programID == this.externButtonId) {
                    console.log(`currentProgram: ${this.$g_Programs[i].programName}`);
                    this.$g_Programs[i].programName = this.getDefaultTitel(input);
                }
            }
            this.tabIsClicked = true;
            console.log(`tabIsClicked`);
            this.tabIsClicked = false;
            // console.log(`title: ${this.tabs[this.externButtonId].title}`);
            // console.log(`programName: ${this.$g_Programs[this.externButtonId].programName}`);
        },
        updateTabWithNewName(newName, inputTab) {
            let arr = inputTab.code.split(' ');
            let result = inputTab.code.replace(arr[1], newName);
            inputTab.code = result;
            console.log(`newCode: ${result}`);
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
