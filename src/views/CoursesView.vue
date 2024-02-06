<template>
  <div class="flex flex-col items-center justify-center">
    <button @click="refreshData" class="btn btn-ghost m-5">
      <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 20 18">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3" />
      </svg></button>

      
    <label class="swap swap-flip text-3xl">
      <!-- this hidden checkbox controls the state -->
      <input type="checkbox" @click="changeMode" />
      <div class="swap-off"><i class="fas fa-tasks"></i></div>
      <div class="swap-on"><i class="fas fa-crown"></i></div>
    </label>

    <div v-for="course in get" class="collapse bg-base-200 collapse-arrow w-1/2 m-5 shadow-md">
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">
        {{ course.course_name }}
      </div>
      <div class="collapse-content">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Aufgabe</th>
              <th>Abgabe</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="activity in activities[course.course_id]" class="bg-opacity-30" :class="setColor(activity)">
              <td>
                <div class="font-bold">
                  {{ activity.name }}
                </div>
              </td>
              <td>
                {{ new Date(activity.deadline).toLocaleDateString('de-DE') }}
              </td>
              <th>
                <!-- ignore checkbox -->
                <input type="checkbox" :id="activity.name" class="modal-toggle" />
                <div class="modal">
                  <div class="modal-box">
                    <h3 class="font-bold text-lg">Details</h3>
                    <p class="py-4">{{ activity.details }}</p>
                    <div class="modal-action">
                      <label :for="activity.name" class="btn">Close</label>
                    </div>
                  </div>
                </div>
                <label class="btn btn-secondary btn-xs mx-5" :for="activity.name">Details</label>
                <button class="btn btn-success btn-xs" @click="goToActivity(activity)">Löse</button>
              </th>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CoursesView",
  data() {
    return {
      get: null,
      expDeadline: false,
      competition: false,
      activities: {},
    };
  },
  methods: {

    async refreshData() {
      axios.defaults.withCredentials = true;
      var config = {
        method: "get",
        url: this.hostname + "students/my-view",
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };
      try {
        const response = await axios(config);
        this.get = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    },
    goToActivity(activity) {
      this.$store.commit('setActivity', activity)
      this.$router.push('activity')
    },
    checkDeadline(date) {
      var now = new Date();
      now.setHours(0, 0, 0, 0);
      return new Date(date) < now;
    },
    setColor(activity) {
      if (activity.solution != null) {
        if (activity.solution.feedback != null) {
          return 'bg-green-500'
        } else if (activity.solution.submitted) {
          return 'bg-yellow-300'
        }
      }
      if (this.checkDeadline(activity.deadline)) {
        return 'bg-red-500'
      }
    },
    async changeMode() {
      this.competition = !this.competition;

      for (var course of this.get) {
        var mode = { true: "exercise", false: "contest" }
        this.activities[course.course_id] = course.activities.filter(activity => activity.type == mode[this.competition])
        
      }
    }
  },
  async beforeMount() {
    await this.refreshData();
    await this.changeMode();
  },
}
</script>
  