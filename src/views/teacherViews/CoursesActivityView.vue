<template>
    <div class="flex flex-col items-center justify-center">
        <h1 v-if="viewMode != 1" class="text-3xl font-medium text-center mr-3 mt-9 mb-9">Neue Activity erstellen</h1>
        <h1 v-else class="text-3xl font-medium text-center mr-3 mt-9 mb-9">Ändern einer Activity</h1>
        <div class="w-1/3 bg-base-200 card-body card shadow p-5 mb-9">
            <div class="m-5 flex flex-col items-center justify-center gap-5">
                
                <!-- Activity Type -->
                <table class="border-collapse w-full">
                    <tr class="w-full">
                        <td class="w-1/2">
                            <input v-model="actType" type="radio" id="exercise" name="act_type" value="1" class="hidden peer" :disabled="viewMode == 1">
                            <label for="exercise" class="btn btn-ghost rounded-r-none w-full border border-spacing-0 border-primary-content peer-checked:bg-primary peer-checked:text-primary-content">Exercise</label>
                        </td>
                        <td class="w-1/2">
                            <input v-model="actType" type="radio" id="contest" name="act_type" value="2" class="hidden peer" :disabled="viewMode == 1">
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
                    <input v-model="deadline" type="datetime-local" class="input" />
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
                                <option v-for="ter in terList" :value="ter.terrainId">{{ ter.terrainName }}</option>
                            </select>
                        </td>
                        <td>
                            <p v-if="excsTerritory == null" class="text-error text-xs flex right-0 items-center"><i class="fas fa-exclamation-circle mr-1"></i> Nicht angelegt!</p>
                            <p v-else class="text-success text-xs flex right-0 items-center"><i class="fas fa-check-circle mr-1"></i> Angelegt</p>
                        </td>
                    </tr>
                    <!-- new territory btn -->
                    <tr>
                        <div class="tooltip tooltip-bottom" data-tip="create new Territory">
                            <router-link to="/build" class="btn btn-circle btn-sm py-0"><i class="fas fa-plus text-secondary"></i></router-link>
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
                                <option v-for="ter in terList"  :value="ter.terrainId">{{ ter.terrainName }}</option>
                            </select>
                        </td>
                        <td>
                            <p v-if="conTerritories[0] == null" class="text-error text-xs flex right-0 items-center"><i class="fas fa-exclamation-circle mr-1"></i> Nicht angelegt!</p>
                            <p v-else class="text-success text-xs flex right-0 items-center"><i class="fas fa-check-circle mr-1"></i> Angelegt</p>
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
                                <option v-for="ter in terList"  :value="ter.terrainId">{{ ter.terrainName }}</option>
                            </select>    
                        </td>
                        <td>
                            <p v-if="conTerritories[1] == null" class="text-error text-xs flex right-0 items-center"><i class="fas fa-exclamation-circle mr-1"></i> Nicht angelegt!</p>
                            <p v-else class="text-success text-xs flex right-0 items-center"><i class="fas fa-check-circle mr-1"></i> Angelegt</p>
                        </td>
                    </tr>
                    
                    <!-- hidden territories -->
                    <tr>
                        <td colspan="3" class="italic text-slate-400 text-sm pt-4 pb-2">Versteckte Territorien (optional):</td>
                    </tr>
                    
                    <!-- hidden start territory -->
                    <tr class="pb-3">
                        <td>
                            <h3 class="mr-4">Start-Territorium:</h3>
                        </td>
                        <td>
                            <select v-model="conTerritories[2]" :class="(conTerritories[2] == null) ? 'select border-base-300 max-w-[200px]': 'select border-success max-w-[200px]'">
                                <option disabled selected>-- Territorium laden --</option>
                                <option v-for="ter in terList"  :value="ter.terrainId">{{ ter.terrainName }}</option>
                            </select>
                        </td>
                        <td>
                            <p v-if="conTerritories[2] == null" class="text-slate-400 text-xs flex right-0 items-center"><i class="fas fa-exclamation-circle mr-1"></i> Nicht angelegt!</p>
                            <p v-else class="text-success text-xs flex right-0 items-center"><i class="fas fa-check-circle mr-1"></i> Angelegt</p>
                        </td>
                    </tr>
                    <!-- hidden end territory -->
                    <tr class="pb-3">
                        <td>
                            <h3>End-Territorium:</h3>
                        </td>
                        <td>
                            <!-- select territory from local storage -->
                            <select v-model="conTerritories[3]" :class="(conTerritories[3] == null) ? 'select border-base-300 max-w-[200px]': 'select border-success max-w-[200px]'">
                                <option disabled selected>-- Territorium laden --</option>
                                <option v-for="ter in terList"  :value="ter.terrainId">{{ ter.terrainName }}</option>
                            </select>    
                        </td>
                        <td>
                            <p v-if="conTerritories[3] == null" class="text-slate-400 text-xs flex right-0 items-center"><i class="fas fa-exclamation-circle mr-1"></i> Nicht angelegt!</p>
                            <p v-else class="text-success text-xs flex right-0 items-center"><i class="fas fa-check-circle mr-1"></i> Angelegt</p>
                        </td>
                    </tr>


                    <!-- new territory btn -->
                    <tr>
                        <div class="tooltip tooltip-bottom" data-tip="create new Territory">
                            <router-link to="/build" class="btn btn-circle btn-sm py-0"><i class="fas fa-plus text-secondary"></i></router-link>
                        </div>
                    </tr>
                </table>

                <div v-else>
                    <p class="italic text-slate-400 text-xs text-center my-3">Keinen Typ ausgewählt</p>
                </div>
                
                <!-- visibility -->
                <div class="flex flex-row items-center">
                    <label for="isVisible" class="mr-2 text-xs">Aufgabe den Schülern anzeigen</label>
                    <input v-model="isVisible" id="isVisible" type="checkbox" class="checkbox checkbox-sm"/>
                </div>

                <!-- submit button -->
                <button v-if="executed == true" @click="$router.push(`/teachers/courses/${this.courseId}`)" class="btn btn-outline btn-primary">Zurück zur Übersicht</button>
                
                <button v-else-if="viewMode == 1" @click="changeActivity" class="btn btn-primary" v-text="'Änderungen speichern'" :disabled="!inputsFilled()"></button>
                <button v-else @click="createActivity" class="btn btn-primary" v-text="'Activity erstellen'" :disabled="!inputsFilled()"></button>

                <p :class="{'text-error': hasError, 'text-success': !hasError}">{{ message }}</p>
            </div>
        </div>
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
            hasError: false,
            message: '',
            executed: false,  // for displaying a return-button, when statement was executed successfully
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
            // new or change Activity
            viewMode: undefined, //  0 => new Act; 1 => change Act
            actId: undefined,
            activity: undefined
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
                    terrain_id: this.excsTerritory
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
                    this.executed = true;
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
           console.log(this.conTerritories[0]);
            var data = {
                contest : {
                    course_id: this.courseId,
                    name: this.actName,
                    details: this.details,
                    start: this.deadline,
                    hidden: !this.isVisible,
                    start_terrain_id: this.conTerritories[0],
                    end_terrain_id: this.conTerritories[1],
                }
            }

            // if both optional territories are selected, add them to data
            if (this.conTerritories[2] != null && this.conTerritories[3] != null) {
                data.contest.hidden_start_terrain_id = this.conTerritories[2];
                data.contest.hidden_end_terrain_id = this.conTerritories[3];
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
                    this.executed = true;
                    this.hasError = false;
                    this.message = 'Anlegen erfolgreich';
                })
                .catch((err) => {
                    console.log(err);
                    this.hasError = true;
                    this.message = "Etwas ist schiefgelaufen!";
                })
        },
        async changeActivity() { 
            // to avoid errors, only allow valid act_types
            if (this.actType != 1 && this.actType != 2) {
                // invalid type
                this.hasError = true;
                this.message = 'Kein zulässiger Aktivitäts-Typ';
                console.log('invalid activtiy-type');
                return;
            }
            
            // set to default
            this.message = "";

            // setup request
            const link = `${this.hostname}activities/${this.actId}`;
            // general data
            var data = {
                name: this.actName,
                details: this.details,
                hidden: !this.isVisible,
                start_terrain_id: this.conTerritories[0],
                end_terrain_id: this.conTerritories[1],
            }
            // type specific data
            if (this.actType == 1) {
                // Exercise
                //data.deadline = this.deadline;
                data.terrain_id = this.excsTerritory;
            }
            else if (this.actType == 2) {
                // Contest
                //data.start = this.deadline;
                data.start_terrain_id = this.conTerritories[0];
                data.end_terrain_id = this.conTerritories[1];
                // if both optional territories are selected, add them to data
                if (this.conTerritories[2] != null && this.conTerritories[3] != null) {
                    data.hidden_start_terrain_id = this.conTerritories[2];
                    data.hidden_end_terrain_id = this.conTerritories[3];
                }
            }
            var config = {
                method: "patch",
                url: link,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Accept: "*/*",
                },
                withCredentials: true,
                httpsAgent: new https.Agent({ rejectUnauthorized: true }),
                data: data,
            };

            // call request
            axios(config)
                .then((response) => {
                    this.executed = true;
                    this.hasError = false;
                    this.message = 'Änderung erfolgreich';
                })
                .catch((err) => {
                    console.log(err);
                    this.hasError = true;
                    this.message = "Etwas ist schiefgelaufen!";
                })
        },
        async getTerritories() {
            // prepare request
            const link = `${this.hostname}terrainObject/getBasicData`;
            var config = {
                url: link,
                method: "get",
                headers: {
                    "Access-Control-Allow-Origin": true,
                },
                withCredentials: true,
            };

            // call request
            axios(config)
                .then((response) => {
                    console.log(response.data);
                    this.terList = response.data;
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        async getActivityById() {
            // prepare request
            const link = `${this.hostname}activities/${this.actId}`;
            var config = {
                url: link,
                method: "get",
                headers: {
                    "Access-Control-Allow-Origin": true,
                },
                withCredentials: true,
            } 

            // call request
            axios(config)
                .then((response) => {
                    // successful
                    console.log(response);
                    this.loadActvityToFormData(response.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        // other
        loadActvityToFormData(activity) {
            // type-specific data
            if (activity.type == "exercise") {
                this.actType = 1;

                this.deadline = new Date(activity.deadline).toISOString().slice(0, 16);
                this.excsTerritory = activity.terrain_id;
            }
            else if (activity.type == "contest") {
                this.actType = 2;

                this.deadline =  new Date(activity.start).toISOString().slice(0, 16);
                this.conTerritories[0] = activity.start_terrain_id;
                this.conTerritories[1] = activity.end_terrain_id;
                this.conTerritories[2] = activity.hidden_start_terrain_id;
                this.conTerritories[3] = activity.hidden_end_terrain_id;
            }
        
            // general data
            this.actName = activity.name;
            this.details = activity.details;
            this.isVisible = !activity.hidden;
        },
        inputsFilled() {
            // check always required fields
            if (this.actName == null || this.actName == "") {
                return false;
            }
            if (this.deadline == null || this.deadline == "") {
                return false
            }
            // exercise -> needs one territory
            if (this.actType == 1 && this.excsTerritory == null) {
                return false;
            }
            // contest -> two territories required
            else if (this.actType == 2 && (this.conTerritories[0] == null || this.conTerritories[1] == null)) {
                return false;
            }
            return true;
        },
        createTerritory() {
            // createTerritory currently unused
            // idea: store all inputs so that the user doesn't need to type everything in again 
            //      in case they must create a new territory and leave that view 
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
    async beforeMount() {

        try {
            this.courseId = parseInt(this.$route.params.id); // get id from url-param^
        } catch (error) {
            console.log(error);
            // TODO: error-seite/notfound-seite aufrufen
        }

        try {
            this.actId = parseInt(this.$route.query.actId); // get actId from url if it exists
            if (!isNaN(this.actId)) {
                // Successful => mode is "update existing activity"
                this.viewMode = 1;
                await this.getActivityById(); // get data of Activity
            }
        } catch (err) {
            console.log(err); 
        }

        // get all Terrains of the User
        await this.getTerritories();
    }
}
</script>