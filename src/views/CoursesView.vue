<template>
  <div class="collapse bg-base-200 collapse-arrow w-auto m-5 shadow-md">
    <input type="checkbox" />
    <div class="collapse-title text-xl font-medium">
      1AHWII - SWP
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
                Albert Greinöcker
              </div>
            </td>
            <td>
              If-Verzweigungen
            </td>
            <td>
              25.11.2023
            </td>
            <th>
              <button class="btn btn-success btn-xs">Löse</button>
            </th>
          </tr>

          <!-- row 2 -->
          <tr>
            <td>
              <div class="font-bold">
                Albert Greinöcker
              </div>
            </td>
            <td>
              While-Schleifen
            </td>
            <td>
              1.12.2023
            </td>
            <th>
              <button class="btn btn-success btn-xs">Löse</button>
            </th>
          </tr>

        </tbody>
      </table>
    </div>
  </div>

  <div class="collapse bg-base-200 collapse-arrow w-auto m-5 shadow-md">
    <input type="checkbox" />
    <div class="collapse-title text-xl font-medium">
      5AHWII - SWP
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
                Albert Greinöcker
              </div>
            </td>
            <td>
              If-Verzweigungen
            </td>
            <td>
              25.11.2023
            </td>
            <th>
              <button class="btn btn-success btn-xs">Löse</button>
            </th>
          </tr>

          <!-- row 2 -->
          <tr>
            <td>
              <div class="font-bold">
                Albert Greinöcker
              </div>
            </td>
            <td>
              While-Schleifen
            </td>
            <td>
              1.12.2023
            </td>
            <th>
              <button class="btn btn-success btn-xs">Löse</button>
            </th>
          </tr>

        </tbody>
      </table>
    </div>
  </div>

  <button @click="clickevent" class="btn btn-secondary">Get Courses</button>
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
        this.get = JSON.stringify(response.data);
        console.log(get);
      } catch (error) {
        console.log(JSON.stringify(error.data));
      }
    }
  },
}
</script>
  