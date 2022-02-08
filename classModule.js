"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class student {
    constructor(rollNo, fName, lName, std) {
        this.rollNo = rollNo;
        this.fName = fName;
        this.lName = lName;
        this.std = std;
    }
    studInfo() {
        return `Roll No. ${this.rollNo} is ${this.fName} ${this.lName}. He/She study in ${this.std} std`;
    }
}
exports.default = student;
//# sourceMappingURL=classModule.js.map