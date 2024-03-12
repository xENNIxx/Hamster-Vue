<!-- WORK IN PROGRESS -->

<template>
  <!-- course may haven't been loaded from api yet -->
  <div v-if="coursename != null">
    <!-- change coursename -->
    <div v-if="changeCourseNameActive" class="flex flex-row items-center justify-center">
      <input type="text" v-model="coursename" placeholder="Neuer Kursname" class="input !border-solid !border-1 !border-gray-600 text-3xl font-medium text-center  mr-3 mt-[1.875rem] mb-[1.875rem] w-[500px]" />  
      <button v-if="changeCoursenameAwait" class="btn btn-primary btn-sm mr-2"><span class="loading loading-spinner"></span></button>
      <button v-else @click="changeCourseName" class="btn btn-primary btn-sm mr-2" :disabled="coursename.trim() == ''">Apply</button>
      <button @click="changeCourseNameActive = false; coursename = coursename_default" class="btn btn-outline btn-primary btn-sm">Abbrechen</button>
    </div>
    <!-- display coursename -->
    <div v-else class="flex flex-row items-center justify-center">
      <h1 class="text-3xl font-medium text-center mr-3 mt-9 mb-9">{{ coursename }}</h1>  
      <button @click="changeCourseNameActive = true" class="btn btn-square btn-sm btn-ghost">
        <i class="fas fa-edit"></i>
      </button>
    </div>

    <p :class="`${(hasErr_changeCoursename) ? 'text-error' : 'text-success'} text-center mb-2`">{{ msg_changeCoursename }}</p>

    <button @click="" class="btn btn-circle btn-ghost absolute top-28 right-16">
      <i class="fas fa-file-export"></i>
    </button>

    <div class="flex flex-row justify-around items-start">
      <!-- TODO: Students Skeleton -->
      <div v-if="students == null" class="skeleton h-14 py-1 w-1/4 m-5 shadow-md">
      </div>
      <!-- Students -->
      <div v-else class="collapse bg-base-200 collapse-arrow w-1/4 m-5 shadow-md">
        <input type="checkbox" class=""/>
        <div class="collapse-title text-xl font-medium">
          Students ({{ students.length }})
        </div>
        <!-- collape-content -->
        <div class="collapse-content">
          <!-- manage students -->
          <div class="flex flex-row justify-between">
            <!-- delete -->
            <button v-if="deleteActive" @click="deleteActive = false; delStudents = []" class="btn btn-error btn-outline btn-xs py-0">Abbrechen</button>
            <button v-else @click="deleteActive = true" class="btn btn-error btn-xs py-0">Entf<i class="fas fa-trash"></i></button>
            

            <!-- delete students button -->
            <div v-if="deleteActive">
              <input type="checkbox" id="delStudentsModal" class="modal-toggle" />
              <div class="modal">
                <div class="modal-box flex flex-col items-center">
                  <!-- modal head -->
                  <div class="flex flex-row justify-between w-full mb-3">
                    <h3 class="font-bold text-lg">Bist du wirklich sicher?</h3>
                    <!-- close btn -->
                    <div class="modal-action mt-0">
                      <label for="delStudentsModal" class="btn btn-ghost btn-circle btn-sm"><i class="fas fa-times"></i></label>
                    </div>
                  </div>
                  <!-- modal body  -->
                  <p class="italic text-slate-400 text-xs text-center mt-2 mb-4">Folgende Schüler und damit alle ihre Abgaben werden unwiderruflich aus der Datenbank entfernt!</p>          
                  <!-- list of students to del -->
                  <p><span v-for="(student, index) in delStudents">{{ student.username }}<span v-if="index + 1 != delStudents.length">, </span></span></p>
                  
                  <p v-if="delStudents.length == 0" class="italic text-slate-400 text-xs text-center mt-7 mb-0">keine Schüler ausgewählt</p>          
                  <div v-else class="flex flex-col items-center">
                    <!-- button loading -->
                    <button v-if="addStudentsAwait" class="btn btn-error mt-5">
                      <span class="loading loading-spinner"></span>
                    </button>
                    <!-- button del & message -->
                    <button v-else @click="delStudentsFromCourse" class="btn btn-error mt-5">Students Entfernen</button>
                    <p :class="(hasErr_delStudents) ? 'text-error my-3' : 'text-success my-3'">{{ msg_delStudents }}</p>
                  </div>
                </div>
              </div>
              <label class="btn btn-xs btn-error py-0" for="delStudentsModal">Fortfahren<i class="fas fa-trash"></i></label>
            </div>
            <!-- add student modal -->
            <div v-else>
              <input type="checkbox" id="newStudents" class="modal-toggle" @change="() => {if (allStudents == null) {getAllStudents()}}"/>
              <div class="modal">
                <div class="modal-box min-h-[320px] flex flex-col items-center">
                  <!-- modal-student head -->
                  <div class="flex flex-row justify-between w-full mb-3">
                    <h3 class="font-bold text-lg">Schüler Hinzufügen</h3>
                    <!-- close btn -->
                    <div class="modal-action mt-0">
                      <label for="newStudents" class="btn btn-ghost btn-circle btn-sm"><i class="fas fa-times"></i></label>
                    </div>
                  </div>

                  <!-- search students -->
                  <div v-if="allStudents == null" class="skeleton w-[220px] h-[48px]"></div>
                  <div v-else class="dropdown mb-3">
                    <!-- modal-student content -->
                    <div role="button">
                      <!-- search students skeleton -->
                      <input v-model="addStudentsSearchFilter" type="text" placeholder="Schülername" class="input bg-base-200 border-solid border-2"/>
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] max-h-44 overflow-auto py-1 px-1 shadow bg-base-100 rounded-lg w-full mt-0">
                      <li v-for="student in filteredStudents"><button @click="() => {if (!addStudents.includes(student)) addStudents.push(student)}" class="btn-ghost rounded-none w-full text-sm  text-left p-2 pl-4  mb-1">{{ student.username }}</button></li>
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
                          <button @click="() => {addStudents = addStudents.filter((curStudent) => curStudent != student)}" class="btn btn-ghost btn-circle text-red-500 btn-sm"><i class="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    </tbody>
                  </table> 

                  <p v-if="addStudents.length == 0" class="italic text-slate-400 text-xs text-center mt-7 mb-0">keine Schüler ausgewählt</p>          
                  <div v-else class="flex flex-col items-center">
                    <!-- button loading -->
                    <button v-if="addStudentsAwait" class="btn btn-primary mt-5">
                      <span class="loading loading-spinner"></span>
                    </button>
                    <!-- button add & message -->
                    <button v-else @click="addStudentsToCourse" class="btn btn-primary mt-5">Hinzufügen</button>
                    <p :class="(hasErr_addStudents) ? 'text-error my-3' : 'text-success my-3'">{{ msg_addStudents }}</p>
                  </div>
                </div>
              </div>
              <label class="btn btn-xs btn-success py-0" for="newStudents">Neu<i class="fas fa-plus"></i></label>
            </div>
          </div>

          <!-- students table -->
          <table class="table">
            <thead>
              <tr>
                <th v-if="deleteActive"></th>
                <th>Nr</th>
                <th>Name</th>
              </tr>
              <tr>
                <th :colspan="deleteActive ? 3 : 2" class="p-0">
                  <hr class="w-full"/>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in students">
                <td v-if="deleteActive">
                  <input type="checkbox" :id="`checkStu_${index}`" @change="delStudentChange(student, index)" class="checkbox checkbox-error checkbox-xs"/>
                </td>
                <td>{{ index +1 }}</td>
                <td>{{ student.username }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Activities -->
      <div class="collapse overflow-visible bg-base-200 collapse-arrow w-3/5 m-5 shadow-md">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          Activities
        </div>
        <div class="collapse-content">
          <!-- table settings -->
          <div class="flex flex-row justify-between">
            <!-- filter-button -->
            <div class="dropdown">
              <div tabindex="0" role="button" class="btn btn-xs bg-base-300">
                <i class="fas fa-filter mr-1"></i>
                {{ activityFilter }}
              </div>
              <ul tabindex="0" class="dropdown-content z-[1] menu py-1 px-0 shadow bg-base-100 rounded-lg">
                <li><button @click="activityFilter = 'all'" class="btn-ghost rounded-none w-full text-sm mb-1">all</button></li>
                <li><button @click="activityFilter = 'exercise'" class="btn-ghost rounded-none w-full text-sm mt-1">exercises</button></li>
                <li><button @click="activityFilter = 'contest'" class="btn-ghost rounded-none w-full text-sm">contests</button></li>
              </ul>
            </div>

            <!-- add activity-button -->
            <router-link :to="`/teachers/courses/${courseId}/activities`" class="btn btn-xs btn-success py-0">neu <i class="fas fa-plus"></i></router-link>
          </div>
          <!-- activity-table -->
          <table class="w-full table">
            <thead>
              <tr>
                <th>Aufgabe</th>
                <th>Abgabe bis</th>
                <th>Abgabestatus</th>
                <th>Korrektur</th>
                <th>Sichtbar</th>
                <th></th>
              </tr>
              <tr>
                <th colspan="7" class="p-0">
                  <hr class="w-full"/>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="activity in filteredActivities">
                <td class="font-bold">{{ activity.name }}</td>
                <td>{{ new Date(activity.date).toLocaleDateString('de-DE') }}</td>
                <td>
                  {{ students.length - activity.submitted}} / {{ activity.submitted - activity.feedbacked }} / {{ activity.feedbacked }}
                  <!-- ignore checkbox -->
                  <input type="checkbox" :id="`${activity.name}_info`" class="modal-toggle" @change="getSolutionsOfActivity(activity.activity_id)" />
                  <!-- status modal -->
                  <div class="modal">
                    <div class="modal-box">
                      <!-- modal head -->
                      <div class="flex flex-row justify-between mb-5">
                        <h3 class="font-bold text-lg">Abgabestatus</h3>
                        <!-- close btn -->
                        <div class="modal-action mt-0">
                          <label :for="`${activity.name}_info`" class="btn btn-ghost btn-circle btn-sm"><i class="fas fa-times"></i></label>
                        </div>
                      </div>
                      
                      <div class="flex flex-row justify-evenly mb-5">
                        <p class="text-red-500"><i class="fas fa-hourglass-end"></i> offen</p>
                        <p class="text-orange-500"><i class="fas fa-envelope"></i> abgegeben</p>
                        <p class="text-lime-500"><i class="far fa-check-circle"></i> kontrolliert</p>
                      </div>

                      <!-- modal content -->
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
                            <td class="">
                              <p v-if="checkSolutionStatus(student) == 2" class="text-lime-500"><i class="far fa-check-circle"></i></p>
                              <p v-else-if="checkSolutionStatus(student) == 1" class="text-orange-500"><i class="fas fa-envelope"></i></p>
                              <p v-else class="text-red-500"><i class="fas fa-hourglass-end"></i></p>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      
                    </div>
                  </div>
                  <label class="btn btn-ghost btn-circle btn-xs mx-5" :for="`${activity.name}_info`"><i class="fas fa-info"></i></label>
                </td>
                <td>
                  <!-- CORRECT -->
                  <!-- ignore checkbox -->
                  <input type="checkbox" :id="`${activity.name}_correct`" class="modal-toggle" @change="getSolutionsOfActivity(activity.activity_id)" />
                  <!-- correcting modal -->
                  <div class="modal">
                    <div class="modal-box min-w-[600px]">
                      <!-- modal head -->
                      <div class="flex flex-row justify-between mb-5">
                        <h3 class="font-bold text-lg">Aufgabe Korrigieren</h3>
                        <!-- close btn -->
                        <div class="modal-action mt-0">
                          <label :for="`${activity.name}_correct`" class="btn btn-ghost btn-circle btn-sm"><i class="fas fa-times"></i></label>
                        </div>
                      </div>
                      
                      <!-- modal content -->
                      <!-- filter-button -->
                      <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-xs bg-base-300">
                          <i class="fas fa-filter mr-1"></i>
                          {{ correct_filter }}
                        </div>
                        <ul tabindex="0" class="dropdown-content z-[1] menu w-40 py-1 px-0 shadow bg-base-100 rounded-lg">
                          <li><button @click="correct_filter = 'Alle'" class="btn-ghost rounded-none w-full text-sm mb-1">Alle Abgaben</button></li>
                          <li><button @click="correct_filter = 'Nicht Kontrolliert'" class="btn-ghost rounded-none w-full text-sm mt-1">Nicht Kontrolliert</button></li>
                        </ul>
                      </div>
                      
                      <!-- student-table -->
                      <table class="w-full overflow-y-scroll">
                        <thead>
                          <tr>
                            <th>Schüler</th>
                            <th>Abgabedatum</th>
                            <th>Aktion</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="sol in filteredActivitySolutions">
                            <td>{{ sol.student_name }}</td>
                            <td>{{ new Date(sol.submission_date).toLocaleDateString('de-DE') }}</td>
                            <td v-if="sol.feedback == null" class="min-w-24">
                              <btn @click="$router.push(`/teachers/courses/${courseId}/correct/${sol.solution_id}`)" class="btn btn-error btn-sm mb-1 mr-2">Korrigieren</btn>
                              <btn class="btn btn-success btn-sm" disabled>Ändern</btn>
                            </td>
                            <td v-else class="min-w-24">
                              <btn class="btn btn-error btn-sm mb-1 mr-2" disabled>Korrigieren</btn>
                              <btn @click="$router.push(`/teachers/courses/${courseId}/correct/${sol.solution_id}`)" class="btn btn-success btn-sm">Ändern</btn>
                            </td>
                          </tr>
                        </tbody>
                      </table>
      
                      <!--                                           
                      <div class="flex flex-row justify-evenly mb-5">
                        <p class="text-red-500"><i class="fas fa-hourglass-end"></i> offen</p>
                        <p class="text-orange-500"><i class="fas fa-envelope"></i> abgegeben</p>
                        <p class="text-lime-500"><i class="far fa-check-circle"></i> kontrolliert</p>
                      </div> -->
                
                    </div>
                  </div>
                  <label class="btn btn-success btn-xs mr-8" :for="`${activity.name}_correct`">Korrigieren ({{ activity.feedbacked }}/{{ activity.submitted }})</label>
                  

                  <!-- DETAILS -->
                  <!-- ignore checkbox -->
                  <input type="checkbox" :id="activity.name" class="modal-toggle" />
                  <!-- details modal -->
                  <div class="modal">
                    <div class="modal-box">
                      <!-- modal head -->
                      <div class="flex flex-row justify-between mb-5">
                        <h3 class="font-bold text-lg">Details</h3>
                        <!-- close btn -->
                        <div class="modal-action mt-0">
                          <label :for="activity.name" class="btn btn-ghost btn-circle btn-sm"><i class="fas fa-times"></i></label>
                        </div>
                      </div>
                      <p v-if="activity.details == null" class="italic text-slate-400 text-xs">keine Details eingetragen</p>
                      <p v-else>{{ activity.details }}</p>
                      
                    </div>
                  </div>
                  <label class="btn btn-secondary btn-xs mr-5" :for="activity.name">Details</label>
                </td>
                <td>
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-xs" :checked="!activity.hidden" onclick="return false"/>
                </td>
                <td>
                  <router-link :to="`/teachers/courses/${courseId}/activities?actId=${activity.activity_id}`" class="btn btn-ghost btn-circle btn-xs mr-6"><i class="fas fa-pen"></i></router-link>
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
  
const https = require("https");
export default {
  name: "CoursesDetailView",
  data() {
    return {
      // basic data
      courseId: undefined,
      coursename: undefined,
      students: undefined,
      activities: undefined,
      // change course name
      coursename_default: "",
      changeCourseNameActive: false,
      changeCoursenameAwait: false,
      // add Students to Course
      allStudents: undefined,
      addStudentsSearchFilter: "",
      addStudents: [],
      addStudentsAwait: false,
      // delete Students from Course
      delStudents: [],
      deleteActive: false,
      delStudentsAwait: false,
      activitySolutions: [],
      activityFilter: "all",
      // activty-correction
      correct_filter: "Alle Abgaben",
      // respone-messages
      msg_changeCoursename: undefined,
      hasErr_changeCoursename: undefined,
      msg_delStudents: undefined,
      hasErr_delStudents: undefined,
      msg_addStudents: undefined,
      hasErr_addStudents: undefined,
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
        return this.activities;
      }
      else {
        let filtered = this.activities.filter((act) => act.type == this.activityFilter);   // TODO: thomas, wie greift man auf typ zu
        return filtered;
      }
    },
    filteredStudents() {
      let filteredStudents = this.allStudents.filter((curStudent) => curStudent.username.includes(this.addStudentsSearchFilter))
      return filteredStudents;
    },
    filteredActivitySolutions() {
      if (this.correct_filter == 'Nicht Kontrolliert') {
        let filteredSolutions = this.activitySolutions.filter((curSolution) => curSolution.feedback == null);
        return filteredSolutions;
      }
      return this.activitySolutions;
      
    }
  },
  methods: {
    // Get Data Methods
    async getCourseData() {
      // setup request
      const link = `${this.hostname}teachers/my-view?course_id=${this.courseId}`;
      var config = {
        method: "get",
        url: link,
        headers: {
          "Access-Control-Allow-Origin": true,
        },
        withCredentials: true,
      };

      // call request
      try {
        const response = await axios(config);
        // assign data
        this.coursename = response.data.course_name;
        this.activities = response.data.activities;
        this.students = response.data.students;
        // log
        console.log("course data:");
        console.log(response.data);
      } catch(error) {
        console.log(error);
      }
    },
    async getAllStudents() {
      // setup request
      const link = `${this.hostname}students`;
      var config = {
        method: "get",
        url: link,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true
      };

      // call request
      try {
        const response = await axios(config);
        this.allStudents = response.data;
        console.log("All Students");
        console.log(response.data);
      } catch(error) {
        console.log(error);
      }
    },
    async getSolutionsOfActivity(activityId) {
      // setup request
      const link = `${this.hostname}solutions?activity_id=${activityId}`;
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
      axios(config)
        .then((response) => {
          this.activitySolutions = Object.freeze(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    // "Action Methods" (post, patch, del)
    async changeCourseName() {
      // prepare Variables
      this.changeCoursenameAwait = true;

      // setup request
      const link = `${this.hostname}courses/${this.courseId}`;
      var data = {
        name: this.coursename
      };
      var config = {
        method: "patch",
        url: link,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: true }),
        data: data,
      };

      // call request
      axios(config)
        .then((response) => {
          // react in view
          this.coursename_default = this.coursename;
          this.hasErr_changeCoursename = false;
          this.msg_changeCoursename = "Kursnamen erfolgreich geändert";
          this.changeCourseNameActive = false;
        })
        .catch((err) => {
          console.log(err);
          this.hasErr_changeCoursename = true;
          this.msg_changeCoursename = "Kursname konnte nicht geändert werden";
        })

      this.changeCoursenameAwait = false;
    },
    async addStudentsToCourse() {
      // prepare variables/set defaults
      this.addStudentsAwait = true;
      this.msg_addStudents = "";
      this.hasErr_addStudents = false;
      
      // setup request
      const link = `${this.hostname}students?course_id=${this.courseId}`;
      var data = JSON.stringify({
        users: this.addStudents.map((curStudent) => {return curStudent.id}),
      });
      var config = {
        method: "post",
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

      console.log(config);
      // call request
      try {
        const response = await axios(config);
        // has no response when successful
        console.log("add Students to course:");
        console.log("success");

        // change view 
        this.hasErr_addStudents = false;
        this.msg_addStudents = "Schüler erfolgreich hinzugefügt";
        this.addStudents = [];
      } catch (error) {
        console.log(error);
        this.msg_addStudents = "Fehler! Nicht alle Schüler konnten hinzugefügt werden!";
        this.hasErr_addStudents = true;
      }

      this.addStudentsAwait = false;
      this.getCourseData();
    },
    async delStudentsFromCourse() {
      // prepare variables/set defaults
      this.delStudentsAwait = true;
      this.msg_delStudents = "";
      this.hasErr_delStudents = false;


      let failed_delete = false; // true, if exceptions occured while removing one or more students 

      // AXIOS-Request has to be done for every student individually
      this.delStudents.forEach(student => {
        // prepare request
        const link = `${this.hostname}students/${student.id}?course_id=${this.courseId}`;
        var config = {
          method: "delete",
          url: link,
          headers: {
            "Access-Control-Allow-Origin": true,
          },
          withCredentials: true,
        };

        // call request
        axios(config)
          .then((response) => {
            // deleteing user has been successful
          })
          .catch((err) => {
            failed_delete = true;
            console.log(err);
          }) 
      });

      // Message 
      if (failed_delete) {
        this.hasErr_delStudents = true;
        this.msg_delStudents = "Fehler! Nicht alle Schüler konnten entfernt werden!";
      }
      else {
        this.hasErr_delStudents = false;
        this.msg_delStudents = "Schüler erfolgreich vom Kurs entfernt";
      }
      this.delStudentsAwait = false;

      // update studentslist -> new request for course-data
      this.getCourseData();
    },
    // other methods
    delStudentChange(student, index) {

      console.log(this.delStudents);
      // when the student is now checked, add them to delStudents 
      if (document.getElementById(`checkStu_${index}`).checked) {
        this.delStudents.push(student);
      }
      // otherwise the student is now unchecked --> remove them from delStudents
      else {
        this.delStudents = this.delStudents.filter((curStudent) => curStudent != student);
      }
    },
    checkSolutionStatus(student) { 
      let sol = this.activitySolutions.filter((sol) => sol.student_name == student.username); // username is unique => returns only one object
      if (sol.length != 0) {
        // solution is corrected
        if (sol[0].feedback != null) {
          return 2;
        }
        // student handed in a solution
        else if (sol[0].submitted) {
          return 1
        }
      }
      // student hasn't handed in yet
      return 0
    }
  },
  async beforeMount() {
    // get course_id from url-param
    try {
      this.courseId = parseInt(this.$route.params.id);
    } catch (error) {
      console.log(error);
      // TODO: error-seite/notfound-seite aufrufen
    }

    await this.getCourseData();
    this.coursename_default = this.coursename;
  },
}
</script>