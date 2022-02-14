"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classModule_1 = require("./classModule");
//------------------Namespaces reference-----------------//
/// <reference path="./nameSpaces.ts" />
//------------------Variables-----------------//
//variable declaration and types
let num = 12;
let str = '10';
let boolean = true;
console.log(num + " " + str + " " + boolean);
//assertion in TS
let num2 = str; // let num2= str as number
console.log(typeof (num2) + num2);
//------------------Array------------------//
let numberArray = [1, 2, 3, 4, 5, 6]; //array which has number element;
console.log(numberArray);
let strArray = ['ani', 'mahesh', 'urvish']; //array which has string element
console.log(numberArray + ' ' + strArray);
//Tuple 
let tuple = [12, 'ani', true];
console.log('Tuple ', tuple);
//Tuple Array
let tupleArray = [
    ['Name', 'Ani'],
    ['surName', 'Desai'],
    ['age', '21']
];
console.log('tuple Array', tupleArray);
//array object
let objArray = new Array('ele1', 'ele2', 'ele3', 'ele4');
console.log('Obj Array', objArray);
//------------------Function------------------//
function showInfo(num, msg, mail) {
    //third arguement is optional (use ?)
    console.log('Number>> ' + num);
    console.log('Msg>> ' + msg);
    mail ? console.log('Mail>> ' + mail) : '';
}
showInfo(20, 'Hello', 'anii@gmail.com');
//anonymous function
let multi = function (x, y) {
    return x * y;
};
console.log('Anonymous function>> ' + multi(5, 6));
//------------------lambda function------------------//
//fat arrow function
let varType = (x) => {
    console.log('The type of ' + x + ' is ' + typeof x);
};
varType(1000); //number
varType('Car'); //string
varType(true); //boolean
const user1 = {
    id: 1,
    name: 'Kishan',
    email: 'kksimform@gmail.com'
};
console.log(user1);
const user2 = {
    id: '22',
    name: 'Mahesh',
    email: 'mahehsh@gmail.com'
};
console.log(user2);
let sum = (x, y) => x + y;
let sub = (x, y) => x - y;
console.log('sum>> ', sum(10, 20));
console.log('sub>> ', sub(500, 20));
class person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    showInfo() {
        return `Name : ${this.name}`;
    }
}
const person1 = new person(1, 'Bhautik');
console.log(person1);
console.log(person1.showInfo());
//child class
class employee extends person {
    constructor(id, name, designation) {
        super(id, name);
        this.designation = designation;
    }
}
const employee1 = new employee(2, 'hardik', 'QA');
console.log(employee1);
//------------------module------------------//
//interface module
const room1 = {
    height: 100,
    width: 200,
    wallColor: 'Sky-Blue',
    roomInfo: function () {
        return `Rooom has height ${this.height}ft. and width ${this.width}ft. with wall color ${this.wallColor}`;
    }
};
console.log(room1.roomInfo());
//class module
const student1 = new classModule_1.default(15, 'Jasmine', 'Christian', 10);
console.log(student1.studInfo());
//child class
class player extends classModule_1.default {
    constructor(rollNo, fName, lName, std, game) {
        super(rollNo, fName, lName, std);
        this.game = game;
    }
    playerInfo() {
        return `${this.fName} ${this.lName} is ${this.game} player`;
    }
}
const player2 = new player(16, 'Cloe', 'Doge', 12, 'Chess');
console.log(player2.studInfo()); //parent class method
console.log(player2.playerInfo());
//------------------generics------------------//
function getArray(item) {
    return item;
}
let numArr = getArray([1, 2, 3, 4, 5]);
console.log(numArr);
let strArr = getArray(['hii', 'I', 'am', 'ani']);
console.log(strArr);
//------------------Namespaces------------------//
// let val = multiply.figure(5, 7);
// console.log(val);
//------------------Any vs Unknown------------------//
let exampleAny;
let exampleUnknown;
exampleAny = '1';
exampleAny = true;
exampleUnknown = 'Hii I am ani';
exampleUnknown = 4546;
//acces member or method
//  exampleAny.trim();
//  exampleAny.wssdf.er.ert.ert.ert.ert;
//  exampleUnknown.trim() //error
//  exampleUnknown.sdf.sd.sdf.sdf; //error
if (typeof exampleUnknown === 'string') {
    exampleUnknown.trim(); //check type before use
}
;
// shape Obj   
const obj = {
    kind: 'triangle',
    y: 5,
    x: 8
};
function area(s) {
    if (s.kind === "circle") {
        return Math.PI * s.radius * s.radius;
    }
    else if (s.kind === "square") {
        return s.x * s.x;
    }
    else {
        return (s.x * s.y) / 2;
    }
}
console.log('area of', obj.kind, 'is', area(obj));
const student2 = { name: 'ani', fname: 'aniruddh', rollNo: 18, lname: 'desai', enrollment: 26 };
console.log(student2);
const employee3 = {
    fname: 'Mahesh',
    deptID: 123,
    empID: 646
};
console.log(employee3);
//# sourceMappingURL=app.js.map