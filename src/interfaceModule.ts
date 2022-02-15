interface arguedFunctionIF {
	(x: number, y: number, functionName: string): number;
}
interface mathOrTrigonometryIF {
	(functionName: boolean | string, num: number): number;
}
interface changingListIF {
	(functionName: string, elementVal: string): void;
}
interface keyboardClickButtonIF {
	(key: string): void;
}
//export all the module
export { arguedFunctionIF, mathOrTrigonometryIF, changingListIF, keyboardClickButtonIF }