<template>
<div>
  <div class="flex flex-col items-center justify-center">
    <div v-if="solution != null && activity != null" class="w-1/3 mt-10 bg-base-200 card-body card shadow p-5">
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
            <td class="border border-content bg-base-100 p-2">{{ solution.student_name }}</td>
          </tr>
          <tr>
            <td class="border border-content bg-base-100 p-2 font-bold">Abgabedatum</td>
            <td class="border border-content bg-base-100 p-2" 
              :class="{'text-error' : IsOverdue()}">
              {{ new Date(solution.submission_date).toLocaleDateString("de-DE") }}
            </td>
          </tr>
          <tr>
            <td class="border border-content bg-base-100 p-2 font-bold">Deadline</td>
            <td class="border border-content bg-base-100 p-2">{{ new Date(activity.deadline).toLocaleDateString("de-DE") }}</td>
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
      <div class="flex flex-row gap-2 justify-end mt-1">
        <button @click="$router.push(`/teachers/courses/${this.courseId}`)" class="btn btn-outline btn-primary">Zurück</button>
        
        <button v-if="awaitFeedback" class="btn btn-primary"><span class="loading loading-spinner"></span></button>
        <button v-else @click="feedbackSolution" class="btn btn-primary" :disabled="feedback == null || feedback == ''">Senden</button>
      </div>

      <!-- messages -->
      <p class="self-center mt-4" :class="{'text-error text-sm': hasError, 'text-success text-sm': !hasError}">{{ message }}</p>

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
      // inputs
      feedback: undefined,
      // view
      awaitfeedback: false,
      hasError: false,
      message: undefined,
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
      axios(config)
        .then((response) => {
          this.solution = response.data;      
          // log
          console.log("solution data:");
          console.log(response.data);
          return response.data.activity_id;
        })
        // get additional data of activity
        .then((id) => {
          this.getActivity(id);
        })
        // if the solution has a feedback, save it in feedback-value for input-binding
        .then(() => {
          this.feedback = this.solution.feedback;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    async getActivity(id) {
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
    async feedbackSolution() {
      // patch solution to add or change feedback
      
      this.awaitFeedback = true;
      
      // set to default
      this.message = "";
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
          console.log(response.data);

          // return success-message
          this.hasError = false;
          this.message = "Feedback wurde hinzugefügt!";
        })
        .catch((err) => {
          console.log(err);

          this.hasError = true;
          this.message = "Feedback hinzufügen Fehlgeschlagen!";
        })

        this.awaitFeedback = false;
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
    },
    // other functionality
    IsOverdue() {
      let date = new Date(this.solution.submission_date);
      let deadline = new Date(this.activity.deadline);

      // when date is greater than the deadline, the activity is overdue
      return date >= deadline;
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
  }
}
</script>