<!-- PROBLEM: no authorization -> everyone can open with the right id-->

<template>
  <div class="flex flex-col items-center justify-center">
    <button @click="refreshData" class="btn btn-ghost m-5">
      <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 20 18">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3" />
      </svg></button>
    <div v-for="course in get" class="bg-base-200 w-1/2 m-5 shadow-md rounded-2xl">
      <div class="flex justify-between min-h-15 p-4">
        <p class="text-xl font-medium">{{ course.course_name }}</p>
        <router-link :to="`/teachers/courses/${course.course_id}`" class="text-l">open</router-link>
      </div>
    </div>
    <p v-if="get == null || get == ''" class="italic text-base-400 text-xs text-center mb-28">Noch keine Kurse erstellt</p>
    <!-- new course -->
    <p class="italic text-base-400 text-md text-center mt-4 mb-4">Neuer Kurs:</p>
    <div class="flex flex-row items-center">
      <router-link to="/teachers/courses/new" class="btn btn-sm btn-accent text-center px-2">Erstellen</router-link>
      <button class="btn btn-circle ml-3">import</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TeacherCoursesView",
  data() {
    return {
      get: null,
      expDeadline: false,
      errorText: '',
      hasError: false,
    };
  },
  methods: {
    async refreshData() {
      // set variables to default
      this.errorText = '';
      this.hasError = false;
      
      // setup request
      const link = this.hostname + "users/teachers/my-view";
      axios.defaults.withCredentials = true;
      var config = {
        method: "get",
        url: link,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,  // QUESTION: is this a duplicate entry? (s. line 37)
      };

      // call request
      try {
        const response = await axios(config);
        this.get = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  async beforeMount() {
    await this.refreshData()
  },
}
</script>
