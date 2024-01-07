<template>
    <div class="flex flex-col items-center justify-center">
        <div class="w-1/3 mt-44 bg-base-200 card-body card shadow p-5">
            <h1 class="text-center text-xl">Neuen Kurs erstellen</h1>
            <div class="m-5 flex flex-col items-center justify-center gap-5">
                <div>
                    <input type="radio" id="exercise" name="act_type" value="exercise">
                    <label for="exercise">exercise</label><br>
                    <input type="radio" id="contest" name="act_type" value="contest">
                    <label for="contest">contest</label><br/>
                </div>
                
                <label for="activityName">Name</label>
                <input v-model="activityName" type="text" placeholder="Name" class="input"/>
                
                <label for="activityDeadline">Abgabe bis</label>
                <input v-model="activityDeadline" type="date" class="input" />

                <!-- TODO: Details -->
                Details
                <textarea>

                </textarea>

                <p :class="{'text-error': hasError, 'text-success': !hasError}">{{ errorText }}</p>

                <button @click="createActivity" class="btn btn-primary" v-text="name"></button>

            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";

export default {
    name: "CourseExerciseView",
    data() {
        return {
            courseId: undefined,
        }
    },
    props: {
        name: {
            type: String,
            default: "Activity erstellen",
        },
        link: {
            type: String,
            default: "",
        },
    },
    methods: {

    },
    beforeMount() {
        try {
            this.courseId = parseInt(this.$route.params.id); // get id from url-param
        } catch (error) {
            console.log(error);
            // TODO: error-seite/notfound-seite aufrufen
        }
    }
}
</script>