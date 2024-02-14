
<template>
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
        <button class="btn borderstyle p-1 m-1 w-7 h-1  bg-green-300" @click="addTab"> + </button>
        <button class="btn borderstyle p-1 m-1 w-7 h-1  bg-red-300" @click="closeTab(this.externButtonId)"> - </button>
        <button class="btn borderstyle p-1 m-1 w-7 h-1  bg-orange-300" @click="updateTitleAndProgramName"> % </button>
    </nav>
    <!--<button class="btn btn-primary" @click="clickAction">test</button>-->
</template>
<script>

import Tab from "@/components/Tab.vue"
import axios from "axios";

export default {
    name: "TabRow",
    data() {
        return {
            tabs: [], //sind die gerade offenen Tabs
            tabCounter: 0,
            externButtonId: 0, //TabId vom gerade aktiven Tab
            tabSequenz: [],
            tabIsClicked: false,
        }
    },
    components: {
        Tab
    },
    props: 
        ['CurrentProgramProp'] //program, das über den GroundEditor hereinkommt
    ,
    emit:
        ['anyEvent', 'changeEvent', 'addTabEvent']
    ,
    watch: {
        CurrentProgramProp(n, o) {
            // console.log(`hier ----> ${this.CurrentProgramProp.programName}`);
            this.pushCurrentProgramIntoArray(this.CurrentProgramProp);
        }
    },
    methods: {
        /*
        async clickAction() {
            let x = await axios.get(this.hostname + 'program/get/1');
            console.log(`newData: ${JSON.stringify(x.data)}`);
        },
        */
        //emit-methods
        handelEvent(buttonInformation = '') {
            let arrInfos = buttonInformation.split('</#/>');
            this.externButtonId = arrInfos[0];
            console.log(`trueId: ${this.getTrueProgramId(this.externButtonId)}`);
            this.$emit('anyEvent', this.getTrueProgramId(this.externButtonId));
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
                this.$emit('addTabEvent', defaultTitel);
                this.tabCounter++;
            } else {
                alert('Dieser Ordner existiert nicht.');
            }
            console.log('addTab');
        },
        getTrueProgramId(exId) {
            for (let i = 0; i < this.$g_Programs.length; i++) {
                if (exId == this.$g_Programs[i].programId) {
                    return this.$g_Programs[i].arrId;
                }
            }
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
        async pushIntoArrays(defaultTitel, defaultCode, path) {
            let program = {'programId': this.tabCounter,
                            'programName': defaultTitel,
                            'sourceCode': defaultCode,
                            'programPath': path
            };
            let post = await axios.post(this.hostname + 'program/save', program);
            // console.log(`postData: ${JSON.stringify(post.data)}`);
            let trueProgram = {
                'programId': post.data.programId,
                'programName': post.data.programName,
                'sourceCode': post.data.sourceCode,
                'programPath': post.data.programPath, 
                'arrId': this.$g_Programs.length
            };
            console.log(`trueProgram: ${JSON.stringify(trueProgram)}`);
            this.$g_Programs.push(trueProgram);
            let tab = {
                'id': trueProgram.programId,
                'title': trueProgram.programName,
                'code': trueProgram.sourceCode
            };
            this.tabs.push(tab);
            console.log(`bigArr: ${JSON.stringify(this.$g_Programs)}`);
            this.shiftArray(this.externButtonId, this.tabSequenz);
        },
        pushCurrentProgramIntoArray(program) {
            if (program == null || program == undefined) {
                console.log('program is null or undefined');
            } else if (!this.checkIfThisProgramIsInTabRow(program)) {
                let currentTab = {'id': program.programId,
                                 'title': program.programName,
                                 'code': program.sourceCode};
                // console.log(`currentTab: ${JSON.stringify(currentTab)}`);
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
                    this.tabs[i].title = this.getDefaultTitel(input);
                    console.log(`currentTab: ${this.tabs[i].title}`);
                }
            }
            for (let i = 0; i < this.$g_Programs.length; i++) {
                if (this.$g_Programs[i].programId == this.externButtonId) {
                    this.$g_Programs[i].programName = this.getDefaultTitel(input);
                    console.log(`currentProgram: ${this.$g_Programs[i].programName}`);
                }
            }
            this.tabIsClicked = !this.tabIsClicked;
            this.$emit('changeEvent', this.tabIsClicked);
            // console.log(`title: ${this.tabs[this.externButtonId].title}`);
            // console.log(`programName: ${this.$g_Programs[this.externButtonId].programName}`);
        },
        /* Methode muss noch verbessert werden
        updateTabWithNewName(newName, inputTab) {
            let arr = inputTab.code.split(' ');
            let result = inputTab.code.replace(arr[1], newName);
            inputTab.code = result;
            console.log(`newCode: ${result}`);
        },
        */
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
