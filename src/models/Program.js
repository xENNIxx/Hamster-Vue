export default class Program {
    /*constructor(programID, programName, sourceCode) {
        this.programID = programID;
        this.programName = programName;
        this.sourceCode = sourceCode;
        // filedepth einbauen
    }*/
    constructor(programName, sourceCode, programPath) {
        this.programName = programName;
        this.sourceCode = sourceCode;
        this.programPath = programPath;
    }

    showFields() {
        console.log(`id: ${this.programID}; name: ${this.programName}; code: ${this.sourceCode}`);
    }
}