<template>
    <div class="playground-wrapper">
        <div class="flex w-full h-full flex-row items-start">
            <div class="m-5">
                <PlaygroundTerritorySelectorVue 
                    @loadTer="loadTer($event)"
                    @seleted-terrain="selectedTerrainEvent"/>
                <div class="playground grid" data-playground-></div>
                <button class="start-btn btn" @click="start">Start</button>
                <button class="btn" @click="print">Print</button>
                <button class="btn" @click="cleanField">Cleanup</button>
                <button class="btn" @click="reset">Reset Field</button>
            </div>
            <!-- class="inline-flex" -->
            <div class="m-5">
                <GroundEditorVue @submitted="submitCode($event)"
                                :-selected-terrain-prop="selectedTerrain"/>
            </div>
        </div>
    </div>
</template>

<script>
// import CodeEditor from '../components/RichEditor.vue'
// import CodeEditor from '../components/Editor/MonacoEditor.vue'

import GroundEditorVue from '@/components/editors/GroundEditor.vue'
import PlaygroundTerritorySelectorVue from '@/components/PlaygroundTerritorySelector.vue'
import Game from '../assets/js/Game.js'
import {request_} from '../assets/js/Request.js'
import RestButton from '../components/RestButton.vue'
import axios from 'axios'

const https = require("https");
export default {
components: {
    GroundEditorVue,
    PlaygroundTerritorySelectorVue,
    RestButton
},
props : {
    
},
data() {
    return {
        terrain : {
            dimension : { 
                width: 10,
                height: 10,
                size : null
            },
            // playGround : "10\n10\n###   ####\n  >       \n  *       \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0\n",
            playGround: "10\n10\n##        \n>         \n  ******  \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0",
            content: "<h1>Some initial content</h1>",
            game: "",
            reponse: "",
            direction: 1
        },
        field_attribute: 'data-playground-field-',
        loaded_terrain_obj: {
            type: Object
        },
        selectedTerrain: ''
    }
},
beforeMount() {
    this.terrain.dimension.size = this.terrain.dimension.width * this.terrain.dimension.height;
},
mounted() {
    this.game = this.newGame();
    this.game.on('cornChange', (event) => this.cornChanged(event));
    console.info("loaded game object");
},
methods : {
    //emit-methods
    selectedTerrainEvent(terrain='') {
        this.selectedTerrain = terrain;
    },
    //normal-methods
    axiosMethod() {
        console.log('testMethod');

        axios.defaults.withCredentials = true;
        let data = JSON.stringify({
          first: this.username,
          second: this.password,
        });

        let link = this.hostname + 'users';

        var config = {
          method: "post",
          url: link,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          withCredentials: true,
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          data: data,
        };
  
        axios(config)
          .then((response) =>{
            this.hasError = false
            this.errorText = "brutal!";
            console.log("brutal")
            
            return JSON.stringify(response.data);
          })
          .then((json) => this.checkRegistration(json))
          .catch((error) => {
              this.hasError = true
              this.errorText = error.response.data;
              console.log(JSON.stringify(error.data));
            });
    },
    putCodeIntoEditor() {



    },
    start(){
        // this.game.handleResponse({0: '12', 1: '1', 2: '2', 3: '2', 4: '1', 5: '2', 6: '2', finished: 'working'})
        this.game.handleResponse({0: '1', finished: 'working'});
    },
    print(){
        this.game.printCorns()
        this.game.printPlayer()
    },
    cleanField(){
        this.game.cleanupField()
    },
    setResponse(response){
        this.response = response
    },
    handleServerResponse(response) {
        //eslint-disable-next-line
        if(!response.hasOwnProperty("0") && !response[0] == 12){
            console.error("Wrong Response!")
            return
        }
            
        if(response == undefined)
            return
        console.log(response)
        this.game.handleResponse(response)
    },
    newGame(){
        let playGround_HTML = document.querySelector(".playground[data-playground-]")
        // playGround_HTML.innerHTML = ""
        // return new Game(this.terrain, playGround_HTML)

        let game = new Game(playGround_HTML, this.field_attribute)
        this.loaded_terrain_obj = game.createEntityString(this.terrain)
        return game
    },
    reset(){
        this.game = this.newGame()
    },
    loadTer(e){
        console.log(`loadTerEvent: ${JSON.stringify(e)}`);
        this.game.createEntityObj(e); //playground darstellen
        this.loaded_terrain_obj = e;
    },
    async submitCode(e) {
        for(let prop in this.loaded_terrain_obj){
            if(prop != 'program'){
                e.hamster[prop] = this.loaded_terrain_obj[prop];
            }
        }
        console.log(this.hostname +  "hamster/newTerrain");
        console.log(JSON.stringify(e));
        let result = await request_ (this.hostname + "hamster/newTerrain", e, 'POST');
        console.log(result);
        this.game.handleResponse(result);
    },
    //eslint-disable-next-line
    cornChanged(event){
        alert("CornChanged" + event)
    }

}
}
</script>
