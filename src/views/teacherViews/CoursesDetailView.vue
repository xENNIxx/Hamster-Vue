<!-- WORK IN PROGRESS -->

<template>
    <!-- course may haven't been loaded from api yet -->
    <div v-if="course != undefined && course != null">
        <h1>{{ course.name }}</h1>
        
        <!-- list of students -->
        <h2>Students</h2>
        <button @click="" class="btn-ghost">add</button>
        <!-- <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 20 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3" />
                </svg> -->
        <table>
            <thead>
                <tr>
                    <th>Nr</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in students">
                    <td>{{ index }}</td>
                    <td>{{ student }}</td>
                </tr>
            </tbody>
        </table>
        

        <!-- list of activities -->
        <h2>Exercises</h2>
        <button @click="" class="btn btn-ghost">new</button>
        <!-- TODO: filter with 3 options: excercieses, contests, both -->
        <table>
            <thead>
                <tr>
                    <th>Nr</th>
                    <th>Deadline</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(activity, index) in activites">
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>

    </div>
    
</template>
  
<script>
import axios from "axios";
  
export default {
  name: "CoursesDetailView",
  data() {
    return {
      courseId: undefined,
      course: undefined,
      students: ["test1", "test2"]
    }
  },
  props: {
    name: {
      type: String,
      default: "Kurs Details",
    },
    link: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getCourse() {
      // set variables to default
      this.hasError = false;
      this.errorText = "";
    
      // setup request
      const link = this.hostname + "courses/" + this.courseId;
      axios.defaults.withCredentials = true;
      var config = {
        method: "get",
        url: link,
        headers: {
          "Access-Control-Allow-Origin": true,
        },
        withCredentials: true,  // QUESTION: duplicate config?
      };

      // call request
      try {
        const response = await axios(config);
        this.course = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    },
    async getCourseStudents() {
        // TODO: get Students of that course
        
        // setup request
        const link = this.hostname + "";
    },
  },
  async beforeMount() {
    this.courseId = this.$route.params.id;  // get id from url-param
    await this.getCourse();  // get the full course with that id
  },
}
</script>