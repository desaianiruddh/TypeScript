export default class student {
    rollNo:number;
    fName:string;
    lName:string;
    std:number;
    constructor(rollNo:number,fName:string,lName:string,std:number){
        this.rollNo=rollNo
        this.fName=fName
        this.lName=lName
        this.std=std
    }
    studInfo():string{
        return `Roll No. ${this.rollNo} is ${this.fName} ${this.lName}. He/She study in ${this.std} std`
    }
}