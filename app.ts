//------------------Import Module-----------------//
import { room } from './interfaceModule';
import Students from './classModule';
//------------------Namespaces reference-----------------//
/// <reference path="./nameSpaces.ts" />
//------------------Variables-----------------//
//variable declaration and types
let num: number = 12;
let str: string = '10';
let boolean: boolean = true;
console.log(num + " " + str + " " + boolean);
//assertion in TS
let num2 = <number><any>str;           						 // let num2= str as number
console.log(typeof (num2) + num2);
//------------------Array------------------//
let numberArray: number[] = [1, 2, 3, 4, 5, 6];                 //array which has number element;
console.log(numberArray);
let strArray: string[] = ['ani', 'mahesh', 'urvish'];        //array which has string element
console.log(numberArray + ' ' + strArray);
//Tuple 
let tuple: [number, string, boolean] = [12, 'ani', true];
console.log('Tuple ', tuple);
//Tuple Array
let tupleArray: [string, string][] = [
	['Name', 'Ani'],
	['surName', 'Desai'],
	['age', '21']
]
console.log('tuple Array', tupleArray);
//array object
let objArray: string[] = new Array('ele1', 'ele2', 'ele3', 'ele4');
console.log('Obj Array', objArray);
//------------------Function------------------//
function showInfo(num: number, msg: string, mail?: string) {
	//third arguement is optional (use ?)
	console.log('Number>> ' + num);
	console.log('Msg>> ' + msg);
	mail ? console.log('Mail>> ' + mail) : '';
}
showInfo(20, 'Hello', 'anii@gmail.com');
//anonymous function
let multi = function (x: number, y: number) {
	return x * y;
}
console.log('Anonymous function>> ' + multi(5, 6));
//------------------lambda function------------------//
//fat arrow function
let varType = (x: any) => {
	console.log('The type of ' + x + ' is ' + typeof x);
}
varType(1000); //number
varType('Car'); //string
varType(true); //boolean
//------------------Type Aliases------------------//
type User = {
	id: number | string
	name: string
	email: string
}
const user1: User = {
	id: 1,
	name: 'Kishan',
	email: 'kksimform@gmail.com'
}
console.log(user1);
//------------------Interfaces------------------//
//object with interface
interface userInterface {
	readonly id: number | string   //can't be change only can see
	name: string
	email: string
}
const user2: userInterface = {
	id: '22',
	name: 'Mahesh',
	email: 'mahehsh@gmail.com'
}
console.log(user2);
//interface for function
interface mathFunction {
	(x: number, y: number): number
}
let sum: mathFunction = (x, y) => x + y;
let sub: mathFunction = (x, y) => x - y;
console.log('sum>> ', sum(10, 20));
console.log('sub>> ', sub(500, 20));
//------------------Classes------------------//
// interface for classes
interface personProperty {
	id: number
	name: string
	showInfo(): string
}
class person implements personProperty {
	id: number
	name: string
	constructor(id: number, name: string) {
		this.id = id
		this.name = name
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
	designation: string
	constructor(id: number, name: string, designation: string) {
		super(id, name)
		this.designation = designation
	}
}
const employee1 = new employee(2, 'hardik', 'QA');
console.log(employee1);
//------------------module------------------//
//interface module
const room1: room = {
	height: 100,
	width: 200,
	wallColor: 'Sky-Blue',
	roomInfo: function () {
		return `Rooom has height ${this.height}ft. and width ${this.width}ft. with wall color ${this.wallColor}`;
	}
}
console.log(room1.roomInfo());
//class module
const student1 = new Students(15, 'Jasmine', 'Christian', 10)
console.log(student1.studInfo());
//child class
class player extends Students {
	game: string
	constructor(rollNo: number, fName: string, lName: string, std: number, game: string) {
		super(rollNo, fName, lName, std);
		this.game = game;
	}
	playerInfo(): string {
		return `${this.fName} ${this.lName} is ${this.game} player`
	}
}
const player2 = new player(16, 'Cloe', 'Doge', 12, 'Chess');
console.log(player2.studInfo()); //parent class method
console.log(player2.playerInfo());
//------------------generics------------------//
function getArray<T>(item: T[]): T[] {
	return item;
}
let numArr = getArray<number>([1, 2, 3, 4, 5]);
console.log(numArr);
let strArr = getArray<string>(['hii','I','am','ani']);
console.log(strArr);
//------------------Namespaces------------------//
let val = multiply.figure(5, 7);
console.log(val);