<template>
    <!-- defaultClick to simulate "window.onclick()"-->
    <section @click="defaultClick">
        <div class="flex flex-col items-center justify-center">
            <div class="w-1/3 mt-44 bg-base-200 card-body card shadow p-5">
                <h1 class="text-center text-xl">Neuen Kurs erstellen</h1>
                <div class="m-5 flex flex-col items-center justify-center gap-5">
                    <input v-model="coursename" type="text" placeholder="Name" class="input"/>
                    
                    <p :class="{'text-error': hasError, 'text-success': !hasError}">{{ errorText }}</p>

                    <button @click="createCourse" class="btn btn-primary" v-text="name"></button>

                    <p class="text-xs text-center mt-2 mb-0">Der Kurs wird direkt angelegt (wenn möglich)<br/> Schüler können anschließend über das Kurs-Menü hinzugefügt werden</p>
                </div>

                
                <!-- UNUSED -->
                <!-- <table>
                    <thead>
                        <tr>
                            <th colspan="2">Ausgewählte Schüler</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in selectedStudents">
                            <td>{{student["username"]}}</td>
                            <td><button class="" @click="excludeStudentFromSelected(student)">entfernen</button></td>
                        </tr>
                    </tbody>
                </table> -->

            </div>
        </div>
    </section>
</template>
  
<script>
import axios from "axios";

const https = require("https");
export default {
    name: "CoursesCreateView",

    data() {
      return {
        get: null,
        coursename: '',
        errorText: '',
        hasError: false,
      };
    },
    props: {
      name: {
        type: String,
        default: "Kurs Anlegen",
      },
      link: {
        type: String,
        default: "",
      },
    },
    methods: {
        async createCourse(event) {
            // validate inputfield
            if (this.checkValue(this.coursename)){
                this.hasError = true;
                this.errorText = "Bitte gültigen Kursnamen eingeben!";
                return;
            }
            // create course
            let courseId = await this.initializeCourse();
        },
        async initializeCourse() {
            // set variables to default
            this.hasError = false;
            this.errorText = "";
            
            // setup request
            const link = this.hostname + "courses";
            axios.defaults.withCredentials = true;
            
            var data = JSON.stringify({
                course: {
                    name: this.coursename,
                }
            });
            // console.log(data); 
            var config = {
                method: "post",
                url: link,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Accept: "*/*",
                },
                withCredentials: true,  // QUESTION: duplicate config?
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),  // QUESTION: is rejectUnauthorized false? (only authorized teachers are allowed to call this method)
                data: data,
            };
    
            // call request and react
            let responseCourseId = axios(config)
                .then((response) =>{
                    this.hasError = false
                    this.errorText = "Kurs angelegt!";
                    console.log("Kurs angelegt")
                    
                    return JSON.stringify(response.data);
                })
                .catch((error) => {
                    this.hasError = true
                    this.errorText = error.response.data;
                    // TODO: Fehlermeldung, kurs mit name schon vorhanden
                    console.log("error")
                    console.log(JSON.stringify(error.data));
                });
            
            return responseCourseId;
        }
    },
    computed: {
        filteredStudents() {
            return this.allStudents.filter(student => {
                return student.username.toLowerCase().includes(this.searchedName.toLowerCase())
            })
        }
    },
    beforeMount() {
    },
}
</script>
    



<style>

.dropdown {
  position: relative;
  display: inline-block;
}

.filtered-list {
  position: absolute;
  background-color: #000000;
  min-width: 160px;
  width: 100%;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.filtered-list button {
  color: black;
  padding: 12px 16px;
  width: 100%;
  text-decoration: none;
  display: block;
}

.filtered-list button:hover {background-color: #303030;}

.show {display: block;}
</style>