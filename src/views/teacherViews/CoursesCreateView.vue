<template>
    <div class="flex flex-col items-center justify-center">
        <div class="w-1/3 mt-44 bg-base-200 card-body card shadow p-5">
            <h1 class="text-center text-xl">Neuen Kurs erstellen</h1>
            <div class="m-5 flex flex-col items-center justify-center gap-5">
                <input v-model="coursename" type="text" placeholder="Name" class="input"/>
                
                <p :class="{'text-error text-sm': hasError, 'text-success text-sm': !hasError}">{{ errorText }}</p>

                <button v-if="!created" @click="createValidation" class="btn btn-primary" v-text="name"></button>
                <div v-else class="flex flex-row gap-2">
                    <button @click="$router.push(`/teachers/courses`)" class="btn btn-outline btn-primary">Zur Übersicht</button>
                    <button @click="$router.push(`/teachers/courses/${courseId}`)" class="btn btn-primary">Kurs anzeigen</button>
                </div>

                <p class="italic text-slate-400 text-xs text-center mt-2 mb-0">Der Kurs wird direkt angelegt (wenn möglich)<br/> Schüler können anschließend über das Kurs-Menü hinzugefügt werden</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

const https = require("https");
export default {
    name: "CoursesCreateView",

    data() {
      return {
        coursename: '',
        errorText: '',
        hasError: false,
        created: false,
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
        async createValidation() {
            // validate inputfield
            if (this.checkValue(this.coursename)){
                this.hasError = true;
                this.errorText = "Bitte gültigen Kursnamen eingeben!";
                return;
            }
            // create course
            await this.createCourse();
        },
        async createCourse() {
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
            var config = {
                method: "post",
                url: link,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Accept: "*/*",
                },
                withCredentials: true,  // QUESTION: duplicate config?
                httpsAgent: new https.Agent({ rejectUnauthorized: true }),
                data: data,
            };
    
            // call request and react
            await axios(config)
                .then((response) =>{
                    this.hasError = false;
                    this.errorText = "Kurs angelegt!";
                    console.log("Kurs angelegt");
                    this.created = true;
                    return response.data;
                })
                // save id of the new course
                .then((data) => {
                    this.courseId = data;
                })
                .catch((error) => {
                    this.hasError = true
                    this.errorText = error.response.data;
                    // TODO: Fehlermeldung, kurs mit name schon vorhanden
                    console.log("error");
                    console.log(JSON.stringify(error.data));
                });
        }
    },
    beforeMount() {
    },
}
</script>