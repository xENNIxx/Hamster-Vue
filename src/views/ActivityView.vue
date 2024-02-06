<template>
    <div class="flex flex-col items-center justify-center m-5">
        <div class="card-body card shadow bg-base-300 items-center w-2/5 mt-8">
            <h1 class="text-3xl text-center" v-text="activity.name"></h1>
            <div v-text="activity.details" class="text-xl text-center"></div>

            <div class="flex justify-center">

                <div v-if="activity.solution.feedback == null">
                    <button class="btn btn-primary w-1/10 m-3" @click="saveTask()">Speichern</button>
                    <button v-if="!activity.solution.submitted" class="btn btn-primary w-1/10 m-3"
                        @click="submitTask()">Abgeben</button>
                    <button v-else class="btn btn-secondary w-1/10 m-3" @click="submitTask()">Abgabe rückgängig
                        machen</button>
                </div>
                <div v-else class="text-center m-5">
                    <p class="font-bold text-2xl">Feedback</p>
                    {{ activity.solution.feedback }}
                </div>
            </div>
            <!--{{ this.$store.state.code }}-->
        </div>

    </div>
    <div class="playground-wrapper">
        <div class="flex w-full h-full flex-row items-start">
            <div class="m-5">
                <div class="playground grid" data-playground-></div>
                <button class="start-btn btn" @click="start">Start</button>
                <button class="btn" @click="print">Print</button>
                <button class="btn" @click="cleanField">Cleanup</button>
                <button class="btn" @click="reset">Reset Field</button>
            </div>
            <!-- class="inline-flex" -->
            <div class="m-5">
                <GroundEditorVue @submitted="submitCode($event)" />
            </div>

        </div>
    </div>
</template>

<script>
import GroundEditorVue from '@/components/editors/GroundEditor.vue'
import PlaygroundTerritorySelectorVue from '@/components/PlaygroundTerritorySelector.vue'
import Game from '../assets/js/Game.js'
import { request_ } from '../assets/js/Request.js'
import Tab from '../components/Tab.vue'
import TabRow from '../components/TabRow.vue'
import axios from "axios";


const https = require("https");

export default {
    components: {
        GroundEditorVue,
        PlaygroundTerritorySelectorVue,
        Tab,
        TabRow
    },
    props: {

    },
    data() {
        return {
            activity: this.$store.state.activity,
            terrain: {
                dimension: {
                    width: 10,
                    height: 10,
                    size: null
                },
                // playGround : "10\n10\n###   ####\n  >       \n  *       \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0\n",
                playGround: "10\n10\n##        \n>         \n  *       \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0",
                content: "<h1>Some initial content</h1>",
                game: "",
                reponse: "",
                direction: 1
            },
            field_attribute: 'data-playground-field-',
            loaded_terrain_obj: {
                type: Object
            }
        }
    },
    beforeMount() {
        this.terrain.dimension.size = this.terrain.dimension.width * this.terrain.dimension.height;

        if (this.activity.solution == null) {
            this.activity.solution = {
                "solution": {
                    "activity_id": this.activity_id,
                    "code": this.$store.state.code,
                    "submitted": false
                }
            }
        }

    },
    mounted() {
        this.game = this.newGame()
        this.game.on('cornChange', (event) => this.cornChanged(event))
        this.loadTer(this.$store.state.activity.hamster)
        console.info("loaded game object")
        console.log(this.activity);
    },
    methods: {
        putCodeIntoEditor() {



        },
        start() {
            this.game.handleResponse({ 0: '12', 1: '1', 2: '2', 3: '2', 4: '1', 5: '2', 6: '2', finished: 'working' })
        },
        print() {
            this.game.printCorns()
            this.game.printPlayer()
        },
        cleanField() {
            this.game.cleanupField()
        },
        setResponse(response) {
            this.response = response
        },
        handleServerResponse(response) {
            //eslint-disable-next-line
            if (!response.hasOwnProperty("0") && !response[0] == 12) {
                console.error("Wrong Response!")
                return
            }

            if (response == undefined)
                return
            console.log(response)
            this.game.handleResponse(response)
        },
        newGame() {
            let playGround_HTML = document.querySelector(".playground[data-playground-]")
            // playGround_HTML.innerHTML = ""
            // return new Game(this.terrain, playGround_HTML)

            let game = new Game(playGround_HTML, this.field_attribute)
            this.loaded_terrain_obj = game.createEntityString(this.terrain)
            return game
        },
        reset() {
            this.game = this.newGame()
        },
        loadTer(e) {
            console.log(`loadTerEvent: ${JSON.stringify(e)}`);
            this.game.createEntityObj(e); //playground darstellen
            this.loaded_terrain_obj = e;
        },
        async submitCode(e) {
            for (let prop in this.loaded_terrain_obj) {
                if (prop != 'program') {
                    e.hamster[prop] = this.loaded_terrain_obj[prop];
                }
            }
            console.log(this.hostname + "hamster/newTerrain");
            console.log(JSON.stringify(e));
            let result = await request_(this.hostname + "hamster/newTerrain", e, 'POST');
            console.log(result);
            this.game.handleResponse(result);
        },
        //eslint-disable-next-line
        cornChanged(event) {
            alert("CornChanged" + event)
        },

        async submitTask() {
            this.activity.submitted = !this.activity.solution.submitted;

            var solution = {
                solution: {
                    solution_id: this.activity.solution.solution_id,
                    activity_id: this.activity.activity_id,
                    code: "replace this its only for testing",//this.$store.state.code,
                    submitted: this.activity.submitted
                }
            };

            await this.putTaskAxios(solution);
        },

        async saveTask() {
            var solution = {
                solution: {
                    solution_id: this.activity.solution.solution_id,
                    activity_id: this.activity.activity_id,
                    code: this.$store.state.code,
                    submitted: this.activity.submitted
                }
            };

            await this.putTaskAxios(solution);
        },

        async putTaskAxios(data) {

            var config = {
                method: "put",
                url: this.hostname + "solutions",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Accept: "*/*",
                },
                withCredentials: true,
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                data: data,
            };

            await axios(config)
                .then((response) => {
                    this.activity.solution = response.data
                    return JSON.stringify(response.data);
                })
                .catch((error) => {
                    console.log("fehler");
                    console.log(error.message);
                });


        }

    }
}
</script>
