<!-- WORK IN PROGRESS -->

<template>
  <!-- course may haven't been loaded from api yet -->
  <div v-if="course != undefined && course != null && students != undefined">
    <div class="flex flex-row items-center justify-center">
      <h1 class="text-3xl font-medium text-center mr-3 mt-9 mb-9">{{ course.name }}</h1>
      <button @click="" class="btn btn-circle btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
        <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
        <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
      </button>
    </div>
    
    

    <button @click="" class="btn btn-circle btn-ghost absolute top-28 right-16">
      export
    </button>

    <div class="flex flex-row justify-around items-start">
      <!-- Students -->
      <div class="collapse bg-base-200 collapse-arrow w-1/4 m-5 shadow-md">
        <input type="checkbox" class=""/>
        <div class="collapse-title text-xl font-medium">
          Students ({{ students.length }})
        </div>
        <!-- collape-content -->
        <div class="collapse-content">
          <!-- manage students -->
          <div class="flex flex-row justify-between">
            <!-- delete -->
            Todo: delete

            <!-- add student-button -->
            <input type="checkbox" id="newStudents" class="modal-toggle" />
            <!-- add popup-student -->
            <div class="modal">
              <div class="modal-box flex flex-col items-center">
                <!-- popup-student head -->
                <div class="flex flex-row justify-between w-full mb-3">
                  <h3 class="font-bold text-lg">Schüler Hinzufügen</h3>
                  <!-- close btn -->
                  <div class="modal-action mt-0">
                    <label for="newStudents" class="btn btn-ghost btn-circle btn-sm">✕</label>
                  </div>
                </div>
                <!-- search students -->
                <div class="dropdown">
                  <!-- popup-student content -->
                  <div role="button">
                    <input v-model="addStudentSearch" type="text" placeholder="Schülername" class="input bg-base-200 border-solid border-2 mb-3"/>
                  </div>
                  <ul tabindex="0" class="dropdown-content z-[1] menu py-1  px-0 shadow bg-base-100 rounded-lg">
                    <li v-for="student in filteredStudents"><button @click="() => {addStudents.push(student)}" class="btn-ghost rounded-none w-full text-sm mb-1">{{ student.username }}</button></li>
                  </ul>
                </div>


                <!-- students to add -->
                <table class="table">
                  <thead>
                    <tr>
                      <th>Nr.</th>
                      <th class="w-1/2">Name</th>
                      <th></th>
                    </tr>
                    <tr>
                      <th colspan="3" class="p-0">
                        <hr class="w-full"/>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(student, index) in addStudents">
                      <td>{{ index + 1 }}</td>
                      <td>{{ student.username }}</td>
                      <td class="text-right">
                        <button @click="() => {addStudents = addStudents.filter((curStudent) => curStudent != student)}" class="btn btn-error">entf.</button>
                      </td>
                    </tr>
                  </tbody>
                </table> 

                <p v-if="addStudents.length == 0" class="italic text-slate-400 text-xs text-center mt-7 mb-0">keine Schüler ausgewählt</p>          
              </div>
            </div>
            <label class="btn btn-xs btn-success py-0" for="newStudents">add +</label>
          </div>

          <!-- students table -->
          <table class="table">
            <thead>
              <tr>
                <th>Nr</th>
                <th>Name</th>
              </tr>
              <tr>
                <th colspan="2" class="p-0">
                  <hr class="w-full"/>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in students">
                <td>{{ index +1 }}</td>
                <td>{{ student.username }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Activities -->
      <div class="collapse bg-base-200 collapse-arrow w-3/5 m-5 shadow-md">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          Activities
        </div>
        <div class="collapse-content">
          <!-- table settings -->
          <div class="flex flex-row justify-between">
            <!-- filter-button -->
            <!-- TODO: farbe abhängig vom theme machen (aktuell nur bei light gut) -->
            <div class="dropdown">
              <div tabindex="0" role="button" class="btn btn-xs bg-base-300">{{ activityFilter }}</div>
              <ul tabindex="0" class="dropdown-content z-[1] menu py-1  px-0 shadow bg-base-100 rounded-lg">
                <li><button @click="activityFilter = 'all'" class="btn-ghost rounded-none w-full text-sm mb-1">all</button></li>
                <li><button @click="activityFilter = 'exercises'" class="btn-ghost rounded-none w-full text-sm mt-1">exercises</button></li>
                <li><button @click="activityFilter = 'contests'" class="btn-ghost rounded-none w-full text-sm">contests</button></li>
              </ul>
            </div>

            <!-- add activity-button -->
            <router-link :to="`/teachers/courses/${courseId}/exercises`" class="btn btn-xs btn-success py-0">add +</router-link>
          </div>
          <!-- activity-table -->
          <table class="w-full table">
            <thead>
              <tr>
                <th>Aufgabe</th>
                <th>Abgabe bis</th>
                <th>Abgegeben von</th>
                <th>Korrektur</th>
                <th>Erledigt</th>
              </tr>
              <tr>
                <th colspan="6" class="p-0">
                  <hr class="w-full"/>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="activity in filteredActivities">
                <td class="font-bold">{{ activity.name }}</td>
                <td>{{ new Date(activity.deadline).toLocaleDateString('de-DE') }}</td>
                <td>
                  {{ students.length }} ({{ students.length }})
                  <!-- ignore checkbox -->
                  <input type="checkbox" :id="`${activity.name}_info`" class="modal-toggle" />
                  <!-- handed in popup -->
                  <div class="modal">
                    <div class="modal-box">
                      <!-- popup head -->
                      <div class="flex flex-row justify-between mb-5">
                        <h3 class="font-bold text-lg">Abgegeben von</h3>
                        <!-- close btn -->
                        <div class="modal-action mt-0">
                          <label :for="`${activity.name}_info`" class="btn btn-ghost btn-circle btn-sm">✕</label>
                        </div>
                      </div>
                      
                      <div class="flex flex-row justify-evenly mb-5">
                        <p class="text-red-500"><i>icon</i> offen</p>
                        <p class="text-orange-500"><i>icon</i> abgegeben</p>
                        <p class="text-lime-500"><i>icon</i> kontrolliert</p>
                      </div>

                      <!-- popup content -->
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Nr</th>
                            <th>Name</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(student, index) in students">
                            <td>{{ index }}</td>
                            <td>{{ student.username }}</td>
                            <td :class="setColor(activty, student)">nicht abgegeben</td>
                          </tr>
                        </tbody>
                      </table>

                      
                    </div>
                  </div>
                  <label class="btn btn-xs mx-5" :for="`${activity.name}_info`">info</label>
                </td>
                <td>
                  <button class="btn btn-success btn-xs mr-3">Korrigieren ({{ students.length }}/{{ students.length }})</button>
                  <!-- ignore checkbox -->
                  <input type="checkbox" :id="activity.name" class="modal-toggle" />
                  <!-- details popup -->
                  <div class="modal">
                    <div class="modal-box">
                      <!-- popup head -->
                      <div class="flex flex-row justify-between mb-5">
                        <h3 class="font-bold text-lg">Details</h3>
                        <!-- close btn -->
                        <div class="modal-action mt-0">
                          <label :for="activity.name" class="btn btn-ghost btn-circle btn-sm">✕</label>
                        </div>
                      </div>
                      <p v-if="activity.details == null || activity.details == null || activity.details == ''" class="italic text-slate-400 text-xs">keine Details eingetragen</p>
                      <p v-else>{{ activity.details }}</p>
                      
                    </div>
                  </div>
                  <label class="btn btn-secondary btn-xs mx-5" :for="activity.name">Details</label>
                </td>
                <td>
                  <button class="mr-3">Edit</button>
                  <input type="checkbox"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
      students: undefined,
      addStudentSearch: "",
      addStudents: [{"username":"jesus"}, {"username":"christ"}],
      allActivities: [],
      activitySolutions: [],
      activityFilter: "all",
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
  computed: {
    filteredActivities() {
      if (this.activityFilter == "all") {
        return this.allActivities;
      }
      else {
        let filtered = this.allActivities.filter((act) => act.name == this.activityFilter);   // TODO: thomas, wie greift man auf typ zu
        return filtered
      }
    },
    async filteredStudents() {
      let unfinished = this.addStudentSearch;
      // setup request
      const link = this.hostname + "users" // TODO: add link for "get users by username"
      axios.defaults.withCredentials = true;
      var config = {
        method: "get",
        url: link,
        headers: {
          "Access-Control-Allow-Origin": true,
        },
        withCredentials: true,
      }

      // call request
      let filteredStudents;
      try {
        const response = await axios(config);
        filteredStudents = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }

      return filteredStudents;
    }
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
      // setup request
      const link = this.hostname + "users/students?course_id=" + this.courseId;
      axios.defaults.withCredentials = true;
      var config = {
        method: "get",
        url: link,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,  // QUESTION: is this a duplicate entry?
      };

      // call request
      try {
        const response = await axios(config);
        this.students = response.data;
        console.log(response.data);
      } catch(error) {
        console.log(error);
      }
    },
    async getActivities() {
      // setup request
      const link = this.hostname + "activities?course_id=" + this.courseId;
      console.log(link);
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
        this.allActivities = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    },
    async getSolutionsOfActivity(activityId) {
      // setup request
      const link = this.hostname + "solutions?activity_id=" + activityId;
      axios.default.withCredentials = true;
      var config = {
        method: "get",
        url: link,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };

      // call request
      try {
        const response = await axios(config);
        this.activitySolutions.push(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async searchStudents() {
      // TODO
    },
    setColor(activty, student) {
      // TODO: get color by "is activtiy done by this student"
      return 'text-red-500';
    }
  },
  async beforeMount() {
    try {
      this.courseId = parseInt(this.$route.params.id); // get id from url-param
    } catch (error) {
      console.log(error);
      // TODO: error-seite/notfound-seite aufrufen
    }
    // TODO: async yes or no? currently yes
    await this.getCourse();  // get the full course with that id
    await this.getCourseStudents(); // get all students of that course
    this.getActivities();
  },
}
</script>