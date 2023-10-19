<template>
    <div class="flex flex-col items-center justify-center m-5">
        <div class="card-body card shadow bg-base-300 w-2/5 items-center">
            <h1 class="text-3xl text-center" v-text="exercise.name"></h1>
            <div v-text="exercise.details" class="text-xl text-center"></div>
            <button class="btn btn-primary w-1/10 m-3">Abgeben</button>
            {{ this.$store.state.code }}
        </div>
    </div>
    <div class="playground-wrapper my-10">
        <div class="flex-container">
            <div>
                <PlaygroundTerritorySelectorVue @loadTer="loadTer($event)" />
                <div class="playground" data-playground-></div>
                <button class="btn m-1" @click="start">Start</button>
                <button class="btn m-1" @click="print">Print</button>
                <button class="btn m-1" @click="cleanField">Cleanup</button>
                <button class="btn m-1" @click="reset">Reset Field</button>
            </div>
            <nav class="flex justify-center p-3 max-h-13">
                <TabRow></TabRow>
            </nav>
            <!-- class="inline-flex" -->
            <div>
                <GroundEditorVue @submitted="submitCode($event)" />
                hier
            </div>
        </div>
    </div>
</template>

<script>
import GroundEditorVue from '@/components/editors/GroundEditor.vue'
import PlaygroundTerritorySelectorVue from '@/components/PlaygroundTerritorySelector.vue'
import Game from '../assets/js/Game.js'
import { request_ } from '../assets/js/Request.js'
import Tab from '../components/Tab.vue'
import TabRow from '../components/TabRow.vue'

export default {
    components: {
        GroundEditorVue,
        PlaygroundTerritorySelectorVue,
        Tab,
        TabRow
    },
    props: {

    },
    data() {
        return {
            exercise: this.$store.state.exercise,
            terrain: {
                dimension: {
                    width: 10,
                    height: 10,
                    size: null
                },
                // playGround : "10\n10\n###   ####\n  >       \n  *       \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0\n",
                playGround: "10\n10\n##        \n>         \n  *       \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0",
                content: "<h1>Some initial content</h1>",
                game: "",
                reponse: "",
                direction: 1
            },
            field_attribute: 'data-playground-field-',
            loaded_terrain_obj: {
                type: Object
            }
        }
    },
    beforeMount() {
        this.terrain.dimension.size = this.terrain.dimension.width * this.terrain.dimension.height
    },
    mounted() {
        this.game = this.newGame()
        this.game.on('cornChange', (event) => this.cornChanged(event))
        console.info("loaded game object")
    },
    methods: {
        putCodeIntoEditor() {



        },
        start() {
            this.game.handleResponse({ 0: '12', 1: '1', 2: '2', 3: '2', 4: '1', 5: '2', 6: '2', finished: 'working' })
        },
        print() {
            this.game.printCorns()
            this.game.printPlayer()
        },
        cleanField() {
            this.game.cleanupField()
        },
        setResponse(response) {
            this.response = response
        },
        handleServerResponse(response) {
            //eslint-disable-next-line
            if (!response.hasOwnProperty("0") && !response[0] == 12) {
                console.error("Wrong Response!")
                return
            }

            if (response == undefined)
                return
            console.log(response)
            this.game.handleResponse(response)
        },
        newGame() {
            let playGround_HTML = document.querySelector(".playground[data-playground-]")
            // playGround_HTML.innerHTML = ""
            // return new Game(this.terrain, playGround_HTML)

            let game = new Game(playGround_HTML, this.field_attribute)
            this.loaded_terrain_obj = game.createEntityString(this.terrain)
            return game
        },
        reset() {
            this.game = this.newGame()
        },
        loadTer(e) {
            console.log(e)
            this.game.createEntityObj(e)
            this.loaded_terrain_obj = e
        },
        async submitCode(e) {
            for (let prop in this.loaded_terrain_obj) {
                if (prop != 'program') {
                    e.hamster[prop] = this.loaded_terrain_obj[prop]
                }
            }

            console.log(this.hostname + "hamster/newTerrain");
            console.log(JSON.stringify(e));
            let result = await request_(this.hostname + "hamster/newTerrain", e, 'POST')
            console.log(result)
            this.game.handleResponse(result)
        },
        //eslint-disable-next-line
        cornChanged(event) {
            alert("CornChanged" + event)
        }

    }
}
</script>

<style lang="scss">
.playground {
    display: grid;
    gap: 5px;
    aspect-ratio: 1/1;
    user-select: none;
    height: 100%;
}

.play-field {
    position: relative;
    border: 1px solid black;
    min-width: 25px;
    aspect-ratio: 1/1;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: auto;

    &.corn {
        background: brown;
    }

    &.wall {
        background: black;
    }

    &.player {
        background-color: blue;
        background-image: url('@/assets/images/arrow.svg');
        background-position: center;
        background-size: contain;
        object-fit: contain;

        &[direction="up"] {
            transform: rotate(0deg);
        }

        &[direction="down"] {
            transform: rotate(180deg);
        }

        &[direction="left"] {
            transform: rotate(-90deg);
        }

        &[direction="right"] {
            transform: rotate(90deg);
        }
    }
}

//diese styles nicht löschen
.playground-wrapper {
    position: relative;
    height: 100%;

}


.flex-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly
}
</style>