<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl font-medium text-center mr-3 mt-9 mb-9">Neue Activity erstellen</h1>
        <div class="w-1/3 bg-base-200 card-body card shadow p-5 mb-9">
            <div class="m-5 flex flex-col items-center justify-center gap-5">
                
                <!-- Activity Type -->
                <table class="border-collapse w-full">
                    <tr class="w-full">
                        <td class="w-1/2">
                            <input v-model="actType" type="radio" id="exercise" name="act_type" value="1" class="hidden peer">
                            <label for="exercise" class="btn btn-ghost rounded-r-none w-full border border-spacing-0 border-primary-content peer-checked:bg-primary peer-checked:text-primary-content">Exercise</label>
                        </td>
                        <td class="w-1/2">
                            <input v-model="actType" type="radio" id="contest" name="act_type" value="2" class="hidden peer">
                            <label for="contest" class="btn btn-ghost rounded-l-none w-full border border-spacing-0 border-primary-content peer-checked:bg-primary peer-checked:text-primary-content">Contest</label>
                        </td>
                    </tr>
                </table>


                <div class="flex flex-col justify-center w-full">
                    <label for="activityName" class="">Name</label>
                    <input v-model="actName" type="text" placeholder="Name" class="input"/>
                </div>
                <div class="flex flex-col justify-center">
                    <label for="activityDeadline">Abgabe bis</label>
                    <input v-model="deadline" type="date" class="input" />
                </div>
                
                <!-- details -->
                <div class="w-full">
                    Details
                    <!-- TODO: Details als so Text-editor umsetzen-->
                    <textarea v-model="details" class="input w-full h-[150px] p-2"></textarea>
                </div>
                
                <!-- Territory for Exercise -->
                <table v-if="actType == 1" class="w-full space-y-4">
                    <tr>
                        <td>
                            <h3 class="mr-4">Territorium:</h3>
                        </td>
                        <td>
                            <!-- select territory from local storage -->
                            <select v-model="excsTerritory" :class="(excsTerritory == null) ? 'select border-error': 'select border-success'">
                                <option disabled selected>-- Territorium laden --</option>
                                <!-- DEBUG -->
                                <option key="testhamster">test</option>
                                <option v-for="ter in terList" :key="ter">{{ ter }}</option>
                            </select>
                        </td>
                        <td>
                            <p v-if="excsTerritory == null" class="text-error text-xs flex right-0 items-center"><i class="fas fa-exclamation-circle mr-1"></i> Nicht angelegt!</p>
                            <p v-else class="text-success text-xs flex right-0 items-center"><i class="fas fa-check-circle mr-1"></i> Angelegt</p>
                            <!-- <div class="tooltip tooltip-bottom" data-tip="change selected Territory">
                                <button class="btn btn-circle btn-sm py-0"><i class="fas fa-edit text-secondary"></i></button>
                            </div> -->
                        </td>
                    </tr>
                    <tr>
                        <div class="tooltip tooltip-bottom" data-tip="create new Territory">
                            <button class="btn btn-circle btn-sm py-0"><i class="fas fa-plus text-secondary"></i></button>
                        </div>
                    </tr>
                </table>
                
                <!-- Territories for Contest -->
                <table v-else-if="actType == 2" class="w-full space-y-4">
                    <!-- start territory -->
                    <tr class="pb-3">
                        <td>
                            <h3 class="mr-4">Start-Territorium:</h3>
                        </td>
                        <td>
                            <select v-model="conTerritories[0]" :class="(conTerritories[0] == null) ? 'select border-error max-w-[200px]': 'select border-success max-w-[200px]'">
                                <option disabled selected>-- Territorium laden --</option>
                                <option key="immernoch test">test</option>
                                <option v-for="ter in terList" :key="ter">{{ ter }}</option>
                            </select>
                        </td>
                        <td>
                            <p v-if="conTerritories[0] == null" class="text-error text-xs flex right-0 items-center"><i class="fas fa-exclamation-circle mr-1"></i> Nicht angelegt!</p>
                            <p v-else class="text-success text-xs flex right-0 items-center"><i class="fas fa-check-circle mr-1"></i> Angelegt</p>
                            <!-- <div class="tooltip tooltip-bottom" data-tip="change selected Territory">
                                <button class="btn btn-circle btn-sm py-0"><i class="fas fa-edit text-secondary"></i></button>
                            </div> -->
                        </td>
                    </tr>
                    <!-- end territory -->
                    <tr class="pb-3">
                        <td>
                            <h3>End-Territorium:</h3>
                        </td>
                        <td>
                            <!-- select territory from local storage -->
                            <select v-model="conTerritories[1]" :class="(conTerritories[1] == null) ? 'select border-error max-w-[200px]': 'select border-success max-w-[200px]'">
                                <option disabled selected>-- Territorium laden --</option>
                                <option key="immernoch test">test</option>
                                <option v-for="ter in terList" :key="ter">{{ ter }}</option>
                            </select>    
                        </td>
                        <td>
                            <p v-if="conTerritories[1] == null" class="text-error text-xs flex right-0 items-center"><i class="fas fa-exclamation-circle mr-1"></i> Nicht angelegt!</p>
                            <p v-else class="text-success text-xs flex right-0 items-center"><i class="fas fa-check-circle mr-1"></i> Angelegt</p>
                            <!-- <div class="tooltip tooltip-bottom" data-tip="change selected Territory">
                                <button class="btn btn-circle btn-sm py-0"><i class="fas fa-edit text-secondary"></i></button>
                            </div> -->
                        </td>
                    </tr>
                    <!-- new territory btn -->
                    <tr>
                        <div class="tooltip tooltip-bottom" data-tip="change selected Territory">
                            <button class="btn btn-circle btn-sm py-0"><i class="fas fa-plus text-secondary"></i></button>
                        </div>
                    </tr>
                </table>



                <div v-else-if="actType == 2" class="flex flex-col justify-evenly">
                    <!-- <div>
                        <div v-if="conTerritories[0] == null" class="flex flex-col justify-center items-center gap-2">
                            <h3>Start Territorium</h3>
                            <p class="text-error text-xs"><i class="fas fa-exclamation-circle"></i> Nicht angelegt!</p>
                            <button @click="createTerritory(2)" class="btn btn-outline btn-error">Anlegen</button>
                        </div>
                        <div v-else class="flex flex-col justify-center items-center gap-2">
                            <h3>Start Territorium</h3>
                            <p class="text-success text-xs"><i class="fas fa-check-circle"></i> Angelegt</p>
                            <button class="btn btn-outline btn-success">Ändern</button>
                        </div>                  
                    </div> -->
                    <div class="flex flex-row gap-3 justify-left items-center mb-8"> 
                        <h3 class="mr-4">Start-Territorium:</h3>
                        
                        <!-- select territory from local storage -->
                        <select v-model="conTerritories[0]" class="select border-error max-w-[200px]">
                            <option disabled selected>-- Territorium laden --</option>
                            <option v-for="ter in terList" :key="ter">{{ ter }}</option>
                        </select>

                        <p v-if="conTerritories[0] == null" class="text-error text-xs"><i class="fas fa-exclamation-circle"></i> Nicht angelegt!</p>
                        <p v-else class="text-success text-xs"><i class="fas fa-check-circle"></i> Angelegt</p>

                        <div class="tooltip tooltip-bottom" data-tip="change selected Territory">
                            <button class="btn btn-circle btn-sm py-0"><i class="fas fa-edit text-secondary"></i></button>
                        </div>
                    </div>

                    <div class="flex flex-row gap-3 justify-left items-center mb-3">
                        <h3 class="mr-4">End-Territorium:</h3>
                        
                        <!-- select territory from local storage -->
                        <select v-model="conTerritories[1]" class="select border-error">
                            <option disabled selected>-- Territorium laden --</option>
                            <option v-for="ter in terList" :key="ter">{{ ter }}</option>
                        </select>
                        
                        <p v-if="conTerritories[1] == null" class="text-error text-xs"><i class="fas fa-exclamation-circle"></i> Nicht angelegt!</p>
                        <p v-else class="text-success text-xs"><i class="fas fa-check-circle"></i> Angelegt</p>

                        <!-- <div class="tooltip tooltip-bottom" data-tip="change selected Territory">
                            <button class="btn btn-circle btn-sm py-0"><i class="fas fa-edit text-secondary"></i></button>
                        </div> -->
                    </div>

                    <button class="btn btn-circle btn-ghost btn-sm py-0"><i class="fas fa-plus text-secondary"></i></button>   

                    <!-- <div>
                        <div v-if="conTerritories[1] == null" class="flex flex-col justify-center items-center gap-2">
                            <h3>End Territorium</h3>
                            <p class="text-error text-xs"><i class="fas fa-exclamation-circle"></i> Nicht angelegt!</p>
                            <button @click="createTerritory(3)" class="btn btn-outline btn-error">Anlegen</button>
                        </div>
                        <div v-else class="flex flex-col justify-center items-center gap-2">
                            <h3 class="italic text-neutral-content mb-2">End Territorium</h3>
                            <p class="text-success text-xs"><i class="fas-check-circle"></i> Angelegt</p>
                            <button class="btn btn-outline btn-success">Ändern</button>
                        </div>
                    </div> -->

                </div>


                <div v-else>
                    <p class="italic text-slate-400 text-xs text-center my-3">Keinen Typ ausgewählt</p>
                </div>
                
                <!-- visibility -->
                <div class="flex flex-row items-center">
                    <label for="isVisible" class="mr-2 text-xs">Aufgabe den Schülern anzeigen</label>
                    <input v-model="isVisible" id="isVisible" type="checkbox" class="checkbox checkbox-sm"/>
                </div>

                <!-- submit button -->
                <button v-if="created_id == null" @click="$router.push(`/teachers/courses/${this.courseId}`)" class="btn btn-outline btn-primary">Zurück zur Übersicht</button>
                <button @click="createActivity" class="btn btn-primary" v-text="name" :disabled="!inputsFilled()"></button>
                
                <p :class="{'text-error': hasError, 'text-success': !hasError}">{{ message }}</p>
            </div>
        </div>
        <p>change gibt es im frontend nicht, damn</p>
    </div>

</template>

<script>
import axios from "axios";

const https = require("https");
export default {
    name: "CourseActivityView",
    data() {
        return {
            // basic data
            courseId: undefined,
            formType: undefined,    // new activity or edit an existing one
            hasError: false,
            message: '',
            created_id: false,  // id of the activity, if created successfully
            // form inputs
            actType: 0,     //0=default/not set, 1=exercise, 2=contest
            actName: undefined,
            deadline: undefined,
            details: undefined, // optional
            isVisible: false,
            //territories
            terList: [],
            excsTerritory: undefined,
            conTerritories: [],
        }
    },
    props: {
        name: {
            type: String,
            default: "Activity erstellen",
        },
        link: {
            type: String,
            default: "",
        },
    },
    methods: {
        // api
        async createActivity() {
            this.hasError = false;
            this.message = '';
        
            const link = `${this.hostname}activities/`;
            if (this.actType == 1) {
                // Exercise
                await this.postExercise(link);
            }
            else if (this.actType == 2) {
                // Contest
                await this.postContest(link);
            }
            else {
                // invalid type
                this.hasError = true;
                this.message = 'Kein zulässiger Activity Typ';
                console.log('invalid activtiy-type');
            }
        },
        async postExercise(link) {
            // setup request
            var data = {
                exercise : {
                    course_id: this.courseId,
                    name: this.actName,
                    details: this.details,
                    deadline: this.deadline,
                    hidden: !this.isVisible,
                    hamster: this.excsTerritory
                }
            }
            var config = {
                method: "post",
                url: link,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Accept: "*/*",
                },
                withCredentials: true,  // QUESTION: duplicate config?
                httpsAgent: new https.Agent({ rejectUnauthorized: true }),
                data: data,
            };

            // call request
            axios(config)
                .then((response) => {
                    this.created_id = response.data;
                    this.hasError = false;
                    this.message = 'Anlegen erfolgreich';
                })
                .catch((err) => {
                    console.log(err);
                    this.hasError = true;
                    this.message = "Etwas ist schiefgelaufen!";
                })
        },
        async postContest(link) {
           // setup request
            var data = {
                contest : {
                    course_id: this.courseId,
                    name: this.actName,
                    details: this.details,
                    start: this.deadline,   // TODO: improve deadline/start naming
                    hidden: !this.isVisible,
                    visible_start_hamster: this.conTerritories[0],
                    visible_end_hamster: this.conTerritories[1],
                }
            }
            var config = {
                method: "post",
                url: link,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Accept: "*/*",
                },
                withCredentials: true,  // QUESTION: duplicate config?
                httpsAgent: new https.Agent({ rejectUnauthorized: true }),
                data: data,
            };

            // call request
            axios(config)
                .then((response) => {
                    this.created_id = response.data;
                    this.hasError = false;
                    this.message = 'Anlegen erfolgreich';
                })
                .catch((err) => {
                    console.log(err);
                    this.hasError = true;
                    this.message = "Etwas ist schiefgelaufen!";
                })
        },
        // other
        inputsFilled() {
            // check always required fields
            if (this.actName != null && this.deadline != null) {
                // exercise -> needs one territory
                if (this.actType == 1 && this.excsTerritory != null) {
                    return true;
                }
                // contest -> two territories
                else if (this.actType == 2 && this.conTerritories[0] != null && this.conTerritories[1] != null) {
                    return true;
                }
            }
            return false;
        },
        createTerritory() {
            // alle bisheigen Eingaben sollen gespeichert bleiben
            this.$store.commit('forCourse', this.courseId);
            this.$store.commit('territory', type)   //1 = exercise-terr, 2=contest-start-terr, 3=contest-end-terr
            this.$router.push('/build');
        },
        getTerrainNames() {
            let nameArr = [];
            for (let i = 0; i < this.fullTerrainData.length; i++) {
                nameArr.push(this.fullTerrainData[i].terrainName);
            }
            this.terList = nameArr;
            // console.log(`terList: ${this.terList}`);
        },
    },
    beforeMount() {
        try {
            this.courseId = parseInt(this.$route.params.id); // get id from url-param
        } catch (error) {
            console.log(error);
            // TODO: error-seite/notfound-seite aufrufen
        }

        // get inputs if stored in local storage
    }
}
</script>