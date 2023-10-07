<template>
  <div class="flex flex-col items-center justify-center">
    <button @click="clickevent" class="btn btn-secondary m-5">Get Courses</button>
    <div v-for="course in get" class="collapse bg-base-200 collapse-arrow w-1/2 m-5 shadow-md">
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">
        {{ course.name }}
      </div>
      <div class="collapse-content">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Lehrperson</th>
              <th>Aufgabe</th>
              <th>Abgabe</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr>
              <td>
                <div class="font-bold">
                  must be added...
                </div>
              </td>
              <td>
                must be added...
              </td>
              <td>
                must be added...
              </td>
              <th>
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
        url: this.hostname + "courses/students/my-courses",
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
}
</script>
  