export default class Program {
    constructor(programID, programName, sourceCode) {
        this.programID = programID;
        this.programName = programName;
        this.sourceCode = sourceCode;
        // filedepth einbauen
    }

    showFields() {
        console.log(`id: ${this.programID}; name: ${this.programName}; code: ${this.sourceCode}`);
    }
}