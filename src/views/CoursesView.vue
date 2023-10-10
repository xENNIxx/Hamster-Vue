<template>
  <div class="flex flex-col items-center justify-center">
    <button @click="clickevent" @onload="clickevent" class="btn btn-ghost m-5">
      <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 20 18">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3" />
      </svg></button>
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
            <tr v-for="exercise in course.exercises">
              <td>
                <div class="font-bold">
                  {{ exercise.exercise_name }}
                </div>
              </td>
              <td>
                01.01.0001
              </td>
              <th>
              <!-- ignore checkbox -->
              <input type="checkbox" :id="exercise.exercise_name" class="modal-toggle" />
                <div class="modal">
                  <div class="modal-box">
                    <h3 class="font-bold text-lg">Details</h3>
                    <p class="py-4">{{exercise.exercise_name}}</p>
                    <div class="modal-action">
                      <label :for="exercise.exercise_name" class="btn">Close</label>
                    </div>
                  </div>
                </div>
                <label class="btn btn-secondary btn-xs m-5" :for="exercise.exercise_name" >Details</label>
                <button class="btn btn-success btn-xs">Löse</button>
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
      get: null
    };
  },
  methods: {

    async clickevent() {
      axios.defaults.withCredentials = true;
      var config = {
        method: "get",
        url: this.hostname + "courses/students/my-view",
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
        console.log(error.data);
      }
    }
  },
  beforeMount() {
    this.clickevent()
  },
}
</script>
  