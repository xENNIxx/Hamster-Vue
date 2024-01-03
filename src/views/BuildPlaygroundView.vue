//TODO: make diagonal placing
<template>
    <section class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            <label for="height">Height:</label>
            <input type="number" id="height" v-model="size.height">
            <label for="width">Width:</label>
            <input type="number" id="width" v-model="size.width">
            <label for="corn_anz">Corn:</label>
            <input type="number" id="corn_anz" v-model="cornAnz">
        </div>
        <button @click="createPlayground" class="btn m-5" id="applyField">Draw</button>

        <div class="flex flex-col">
        
        <div class="form-control">
            <label class="label cursor-pointer gap-4">
                <span class="label-text">Corn</span>
                <input type="radio" name="mode" class="radio" value="corn" v-model="mode"/>
            </label>
        </div>
        <div class="form-control">
            <label class="label cursor-pointer gap-4">
                <span class="label-text">Player</span>
                <input type="radio" name="mode" class="radio" value="player" v-model="mode"/>
            </label>
        </div>
        <div class="form-control">
            <label class="label cursor-pointer gap-4">
                <span class="label-text">Wall</span>
                <input type="radio" name="mode" class="radio" value="wall" v-model="mode"/>
            </label>
        </div>
        <div class="form-control">
            <label class="label cursor-pointer gap-4">
                <span class="label-text">Remove</span>
                <input type="radio" name="mode" class="radio" value="remove" v-model="mode"/>
            </label>
        </div>
    </div>

        <div ref="playground" id="playground"></div>

        <div class="m-5">
            <button id="submit" class="btn m-1" @click="submit">Submit</button>
            <button id="clear-playground" class="btn m-1" @click="resetPlayGround">Clear</button>
        </div>

    </section>
</template>

<script>
/* eslint-disable */

import { getPlayerDirection, PLAYER_DIRECTION } from '@/assets/js/utils.js'

export default {
    data() {
        return {
            mode: "corn",
            size: {
                width: 5,
                height: 5
            },
            switches: [],
            cornAnz: 1,
            clicking: false,
            max_size: 15,
            min_size: 1,
            entity_symbols: Object.freeze({
                PLAYER: ">",
                WALL: "#",
                CORN: "*"
            }),
            max_player: 1,
            player_count: 0,
            direction: "",
            player_direction: PLAYER_DIRECTION.RIGHT,
            hamster: {
                programName: "test",
                program: "void main() {vor();}",
                terrainName: "testTerrain",
                laenge: 0,
                breite: 0,
                x: 0,
                y: 1,
                blickrichtung: 1,
                cornAnzahl: [],
                corn: [],
                wall: []
            },
            changed: false
        }
    },
    methods: {
        createPlayground() {
            if (this.size.width === 1 && this.size.height === 1) {
                console.log("Dimension of Playground is too small!");
                return;
            }

            const playground = this.$refs.playground;
            console.log(playground.id);

            if (this.changed && !this.resetPlayGround()) {
                return;
            }

            playground.innerHTML = "";

            document.addEventListener('mousedown', () => {
                this.clicking = true
            })

            document.addEventListener("mouseup", () => {
                this.clicking = false
            })

            document.addEventListener("mouseleave", () => {
                this.clicking = false
            })

            playground.classList.add("grid", `grid-cols-${this.size.width}`, `grid-rows-${this.size.height}`);

            for (let row = 0; row < this.size.height; row++) {
                const rowDiv = document.createElement("div");
                rowDiv.classList.add("play-row", "flex", "flex-row");
                for (let col = 0; col < this.size.width; col++) {
                    const index = row * this.size.width + col;
                    const div = document.createElement("div");
                    div.classList.add("play-field", "p-4", "btn", "btn-outline", "btn-square", "rounded-none", "flex", "items-center", "justify-center", "text-center", "select-none", "cursor-pointer", "text-xs");
                    div.setAttribute("index", index);
                    div.addEventListener("mousedown", (event) => {
                        this.changeField(event.currentTarget, true);
                    });
                    div.addEventListener("mouseover", (event) => {
                        if (this.clicking) {
                            this.changeField(event.currentTarget);
                        }
                    });
                    rowDiv.appendChild(div);
                }
                playground.appendChild(rowDiv);
            }
        },
        resetPlayGround() {
            if (this.checkValue(this.$refs.playground.innerHTML) == false) {
                if (confirm("Playground would be reset!") == false)
                    return false;
            }


            this.$refs.playground.innerHTML = ''
        },
        changeField(element, override = false) { //method for changing single playfield. example: empty field to player
            let last_classList = element.classList

            if (!this.clicking && !override) //check if method is getting overriden (for testing) or action handler is fireing
                return;

            this.changed = true

            if (this.mode == "player" && this.player_count >= this.max_player) {
                if (element.classList.contains("player")) {
                    this.changeDirection()
                    element.setAttribute("direction", getPlayerDirection(this.player_direction))
                } else {
                    let playerField = document.querySelector(".player")
                    playerField.classList = "play-field"
                    playerField.removeAttribute("direction")
                    element.classList = "play-field player"
                    element.setAttribute("direction", getPlayerDirection(this.player_direction))
                }
                return;
            }

            if (element.classList.contains("player"))
                this.player_count--

            if (this.mode == "remove") {
                if (last_classList.contains("player")) {
                    this.player_count = 0
                }
                element.classList = "play-field p-4 btn btn-outline btn-square rounded-none flex items-center justify-center text-center select-none cursor-pointer text-xs";
                element.innerText = ""
                return
            }

            element.classList.add("play-field")

            if (this.mode == "player") {
                this.player_count++
                element.setAttribute('direction', getPlayerDirection(this.player_direction))
            }
            element.classList.add(this.mode)
            element.innerText = ""

            if (this.mode == "corn") {
                element.innerText = this.cornAnz
            }
        },
        submit() { //reading html playground and creating stringifiable array
            let playground = this.$refs.playground
            let player = playground.querySelectorAll(".play-field.player")

            if (playground.innerHTML == "") {
                console.log("No Playground generated!")
                return;
            }

            if (player.length <= 0) {
                console.log("Select a player")
                return;
            }

            if (player.length > 1) {
                console.log("Only 1 Player allowed")
                return;
            }

            let play_field = playground.querySelectorAll(".play-field")
            let playground_created = []
            let field_type = ""
            let row = []

            for (let y = 0; y < this.size.height; y++) {
                row = []
                for (let x = 0; x < this.size.width; x++) {
                    let field = play_field[x + this.size.width * y]
                    let classlist = field.classList

                    if (classlist.contains("player")) {
                        field_type = this.entity_symbols.PLAYER
                        this.hamster.x = x
                        this.hamster.y = y
                    } else if (classlist.contains("corn")) {
                        field_type = this.entity_symbols.CORN
                        this.hamster.cornAnzahl.push(Number(field.innerText))
                        this.hamster.corn.push([x, y])
                    } else if (classlist.contains("wall")) {
                        field_type = this.entity_symbols.WALL
                        this.hamster.wall.push([x, y])
                    }
                    else
                        field_type = ' '

                    row.push(field_type)
                }
                playground_created.push(row)
            }

            this.stringifyField(playground_created)
            this.createTerJson()
        },
        stringifyField(field) { //creat string from current playground --> string needed for game start 
            let output = ""
            output += `${this.size.height}\n${this.size.width}\n`
            field.forEach(field_row => {
                field_row.forEach(field => {
                    output += field
                })
                output += "\n"
            })
        },
        changeDirection() { //Method for changing viewing direction from the hamster
            this.player_direction--
            if (this.player_direction < 0)
                this.player_direction = Object.keys(PLAYER_DIRECTION).length - 1
        },
        createTerJson() { //Method for creating Terrain-Json-Object for Backendserver
            let terName = prompt("Enter Name of Territory:")
            if (terName == "" || terName == undefined || terName == null) {
                console.warn("submit cancelled!")
                return
            }

            let lhamster = this.hamster

            lhamster.blickrichtung = this.player_direction
            lhamster.breite = this.size.height
            lhamster.laenge = this.size.width
            lhamster.terrainName = terName

            this.hamster = lhamster

            let currSavedTerrs = localStorage.getItem('territories')

            if (currSavedTerrs == null || currSavedTerrs == undefined)
                currSavedTerrs = []
            else
                currSavedTerrs = JSON.parse(currSavedTerrs)

            currSavedTerrs.push(this.hamster)

            localStorage.setItem('territories', JSON.stringify(currSavedTerrs)) //currently getting save locally
        },
        handleRangeChange(target, value) { //method for handeling Rangeslider-Child value change
            switch (target) {
                case "height": //'height' would be the target of the Component
                    this.size.height = value
                    break;
                case "width":
                    this.size.width = value
                    break;
                case "corn_anz":
                    this.cornAnz = value
            }
        }
    }
}
</script>

