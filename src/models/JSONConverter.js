import Program from './Program.js'

export default class JSONConverter {

    getProgramObj(inputObj) {
        let program = new Program();
        program.programName = inputObj.value;
        return program;
    }



}