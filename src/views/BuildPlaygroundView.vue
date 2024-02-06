//TODO: make diagonal placing
<template>
    <section class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            <label class="label" for="height">Height:</label>
            <input class="input input-bordered" type="number" id="height" v-model="size.height">
            <label class="label" for="width">Width:</label>
            <input class="input input-bordered" type="number" id="width" v-model="size.width">
            <label class="label" for="corn_anz">Corn:</label>
            <input class="input input-bordered" type="number" id="corn_anz" v-model="cornAnz">
        </div>

        

        <div class="flex flex-col">

            <div class="form-control">
                <label class="label cursor-pointer gap-4">
                    <span class="label-text">Corn</span>
                    <input type="radio" name="mode" class="radio" value="corn" v-model="mode" />
                </label>
            </div>
            <div class="form-control">
                <label class="label cursor-pointer gap-4">
                    <span class="label-text">Player</span>
                    <input type="radio" name="mode" class="radio" value="player" v-model="mode" />
                </label>
            </div>
            <div class="form-control">
                <label class="label cursor-pointer gap-4">
                    <span class="label-text">Wall</span>
                    <input type="radio" name="mode" class="radio" value="wall" v-model="mode" />
                </label>
            </div>
            <div class="form-control">
                <label class="label cursor-pointer gap-4">
                    <span class="label-text">Remove</span>
                    <input type="radio" name="mode" class="radio" value="remove" v-model="mode" />
                </label>
            </div>
        </div>

        <div ref="playground" id="playground"></div>

        <div class="m-5">
            <button @click="createPlayground" class="btn btn-primary m-2" id="applyField">Draw</button>
            <button id="submit" class="btn btn-success m-2 " @click="submit">Submit</button>
        </div>

    </section>
</template>

<script>
/* eslint-disable */

import { getPlayerDirection, PLAYER_DIRECTION } from '@/assets/js/utils.js'
import axios from 'axios';

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
            direction: "",
            player_direction: PLAYER_DIRECTION.UP,
            hamster: {
                programName: "test",
                program: "void main() {vor();}",
                terrainName: "testTerrain",
                terrainPath: 'testPath',
                width: 0,
                height: 0,
                x: 0,
                y: 1,
                blickrichtung: 1,
                cntCornInMouth: 0,
                cornAnzahl: [],
                corn: [],
                wall: [],
            },
            fields: [],
            cornCounter: 0
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
                rowDiv.classList = "play-row flex flex-row";
                for (let col = 0; col < this.size.width; col++) {
                    const index = row * this.size.width + col;
                    const div = document.createElement("div");
                    div.classList = "play-field p-4 btn btn-outline btn-square rounded-none flex items-center justify-center text-center select-none cursor-pointer text-xs";
                    div.setAttribute("index", index);
                    div.addEventListener("mousedown", (event) => {
                    this.changeField(event.currentTarget, true)
                    })
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
        changeField(element) { //method for changing single playfield. example: empty field to player


            element.classList.add("play-field")
            element.classList.add(this.mode)
            //element.innerText = ""

            if (this.mode == "remove") {
                element.classList = "play-field";
                element.innerText = ""
                element.removeAttribute("direction")
                return
            }


            if (this.mode == "corn") {
                element.innerText = this.cornAnz

            }

            if (this.mode == "player") {
                if (element.getAttribute("direction") != null) {
                    this.changeDirection()
                    element.setAttribute("direction", getPlayerDirection(this.player_direction))
                    element.classList = "play-field player";
                }else{
                    element.setAttribute('direction', getPlayerDirection(this.player_direction));
                    element.classList = "play-field player";
                }
                return;
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
                        let fieldJSON = {'xcord': x, 'ycord': y,
                        'cntCorn': this.hamster.cornAnzahl[this.cornCounter], 'wall': false};
                        this.fields.push(fieldJSON);
                        this.cornCounter++;
                    } else if (classlist.contains("wall")) {
                        field_type = this.entity_symbols.WALL
                        this.hamster.wall.push([x, y])
                        let fieldJSON = {'xcord': x, 'ycord': y,
                        'cntCorn': 0, 'wall': true};
                        this.fields.push(fieldJSON);
                    }
                    else
                        field_type = ' ';

                    row.push(field_type);
                }
                playground_created.push(row);
            }

            this.stringifyField(playground_created);
            this.createTerJson();
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
            /*
            let terObj = {'terrainName': '', 'width': 0, 'height': 0, 'defaultHamster':
                {'xCord': 0, 'yCord': 0, 'cntCornInMouth': 0, 'viewDirection': 0},
                'terrainPath': '', 'customFields': [{'field': {'xCord': 0, 'yCord':0,
                'cntCorn': 0, 'wall': false}}, {}, ...]};
            */
            let terName = prompt("Enter Name of Territory:")
            if (terName == "" || terName == undefined || terName == null) {
                console.warn("submit cancelled!")
                return
            }

            let lhamster = this.hamster

            lhamster.blickrichtung = this.player_direction
            lhamster.height = this.size.height
            lhamster.width = this.size.width
            lhamster.terrainName = terName

            this.hamster = lhamster

            let currSavedTerrs = localStorage.getItem('territories')

            if (currSavedTerrs == null || currSavedTerrs == undefined)
                currSavedTerrs = []
            else
                currSavedTerrs = JSON.parse(currSavedTerrs)

            currSavedTerrs.push(this.hamster);
            // localStorage.setItem('territories', JSON.stringify(currSavedTerrs)) //currently getting save locally
            console.log(`currTerrain: ${JSON.stringify(currSavedTerrs[currSavedTerrs.length - 1])}`);
            this.saveLastTerrain(currSavedTerrs[currSavedTerrs.length - 1]);
        },
        async saveLastTerrain(terrain) {
            console.log(`terrain: ${JSON.stringify(terrain)}`);
            console.log(`fields: ${JSON.stringify(this.fields)}`);
            let terObj = {terrainName: terrain.terrainName,
                width: terrain.width,
                height: terrain.height,
                defaultHamster:
                    {xcord: terrain.x, ycord: terrain.y, cntCornInMouth: terrain.cntCornInMouth, viewDirection: terrain.blickrichtung},
                terrainPath: terrain.terrainPath,
                customFields: this.fields};
            console.log(`x: ${terrain.x}; y: ${terrain.y}`);
            console.log(`terObj: ${JSON.stringify(terObj)}`);
            let status = await axios.post(this.hostname + `terrainObject/save`, terObj);
            console.log(`status: ${status.status}`);
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

