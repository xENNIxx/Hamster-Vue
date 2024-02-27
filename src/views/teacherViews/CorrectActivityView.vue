<template>
<div>
  <div class="flex flex-col items-center justify-center">
    <div v-if="solution == null" class="w-1/3 mt-10 bg-base-200 card-body card shadow p-5">
      <!-- <h1>{{ activity.name }}</h1> -->
      <h1 class="text-3xl font-medium text-center">{{ activity.name }}</h1>

      <!-- solution data -->
      <table class=" border-spacing-y-0.5 border-spacing-x-0.5 border-separate">
        <thead>
          <tr>
            <th class="w-1/3"></th>
            <th class="w-2/3"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-content bg-base-100 p-2 font-bold">Schüler*in</td>
            <td class="border border-content bg-base-100 p-2">{{  }}</td>
          </tr>
          <tr>
            <td class="border border-content bg-base-100 p-2 font-bold">Abgabedatum</td>
            <td class="border border-content bg-base-100 p-2">{{ solution.submission_date }}</td>
          </tr>
          <tr>
            <td class="border border-content bg-base-100 p-2 font-bold">Deadline</td>
            <td class="border border-content bg-base-100 p-2">{{ activity.deadline }}</td>
          </tr>
          <tr>
            <td class="border border-content bg-base-100 p-2 font-bold">Details</td>
            <td class="pl-2">
               <!-- DETAILS -->
                  <!-- ignore checkbox -->
                  <input type="checkbox" id="details" class="modal-toggle" />
                  <!-- details modal -->
                  <div class="modal">
                    <div class="modal-box">
                      <!-- modal head -->
                      <div class="flex flex-row justify-between mb-5">
                        <h3 class="font-bold text-lg">Details</h3>
                        <!-- close btn -->
                        <div class="modal-action mt-0">
                          <label for="details" class="btn btn-ghost btn-circle btn-sm"><i class="fas fa-times"></i></label>
                        </div>
                      </div>
                      <p v-if="activity.details == null || activity.details == null || activity.details == ''" class="italic text-slate-400 text-xs">keine Details eingetragen</p>
                      <p v-else>{{ activity.details }}</p>
                      
                    </div>
                  </div>
                  <label class="btn btn-secondary btn-sm mr-5" for="details">Show</label>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Feedback area-->
      <div>
        <label for="feedback mb-0 italic">Feedback</label>
        <!-- TODO: als Text-editor umsetzen-->
        <textarea v-model="feedback" id="feedback" class="input w-full h-[150px] p-2"></textarea>
      </div>

      <!-- action-buttons -->
      <div class="flex flex-row gap-2 justify-end">
        <button @click="$router.push(`/teachers/courses/${this.courseId}`)" class="btn btn-outline btn-primary">Zurück</button>
        <button class="btn btn-primary" :disabled="feedback == null || feedback == ''">Senden</button>
      </div>
    </div>

    <!-- PLAYGROUND -->
    <!-- <div class="playground-wrapper">
        <div class="flex w-full h-full flex-row items-start">
            <div class="m-5">
                <div class="playground grid" data-playground-></div>
                <button class="start-btn btn" @click="start()">Start</button>
                <button class="btn" @click="reset()">Reset Field</button>
            </div>
            class="inline-flex" 
            <div class="m-5">
                <GroundEditorVue @submitted="submitCode($event)" />
            </div>

        </div> 
    </div>-->

  </div>
</div>
</template>


<script>
import GroundEditorVue from '@/components/editors/GroundEditor.vue'
import PlaygroundTerritorySelectorVue from '@/components/PlaygroundTerritorySelector.vue'
import Game from '../../assets/js/Game.js'
import { request_ } from '../../assets/js/Request.js'
import Tab from '../../components/Tab.vue'
import TabRow from '../../components/TabRow.vue'
import axios from "axios";

const https = require("https");
export default {
  name: "CoursesDetailView",
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
      // base data
      courseId: undefined,
      activity: undefined,
      solutionId: undefined,
      solution: undefined,
      stuName: undefined,
      // inputs
      feedback: undefined,
      // view
      loadedAllData: false,
    }
  },
  methods: {
    // Api calls
    async getSolution() {
      // setup request
      const link = `${this.hostname}solutions/${this.solutionId}`;
      var config = {
        method: "get",
        url: link,
        headers: {
          "Access-Control-Allow-Origin": true,
        },
        withCredentials: true,
      };

      // call request & react
      try {
        const response = await axios(config);
        // assign data
        this.solution = response.data.solution;
        // log
        console.log("solution data:");
        console.log(response.data);
      } catch(err) {
        console.log(err);
      }
    },
    async getActivty(id) {
      // prepare request
      const link = `${this.hostname}activities/${id}`;
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
          console.log(response.data);
          this.activity = response.data;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    async getStudentName(id) {
      // prepare request
      const link = `${this.hostname}/users`;

      this.stuName =  "Hans";
    },
    async feedbackSolution() {
      // patch solution to add feedback
      // prepare request
      const link = `${this.hostname}solutions/${this.solutionId}/feedback`;
      var data = {
        feedback: this.feedback,
      };
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

      // call request & react
      axios(config)
        .then((response) => {
          console.log(response);
          return response.data;
        })
        .then((data) => {
          // TODO
        })
        .catch((err) => {
          console.log(err);
        })
    },
    // Playground-functionality
    start() {
      this.game.handleResponse({ 0: '12', 1: '1', 2: '2', 3: '2', 4: '1', 5: '2', 6: '2', finished: 'working' });
    },
    reset() {
      this.game = this.newGame();
    },
    newGame() {
      let playGround_HTML = document.querySelector(".playground[data-playground-]");
      // playGround_HTML.innerHTML = ""
      // return new Game(this.terrain, playGround_HTML)

      let game = new Game(playGround_HTML, this.field_attribute);
      this.loaded_terrain_obj = game.createEntityString(this.terrain);
      return game;
    },
    // DEBUG
    submitCode(event) {
      console.log("debug");
    }

  },
  async beforeMount() {
    // get solution_id from url-param
    try {
      this.courseId = parseInt(this.$route.params.id);
      this.solutionId = parseInt(this.$route.params.solId);
    } catch(err) {
      console.log(err);
    }

    // get solution data from api
    await this.getSolution();
    // get other data via solution
    //await this.getStudentName(this.solution.student_id);
    //await this.getActivty(this.solution.activity_id);
    await this.getStudentName(1);
    await this.getActivty(2);
  }
}


</script>