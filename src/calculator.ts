//module for interfaces
import { arguedFunctionIF, mathOrTrigonometryIF, changingListIF, keyboardClickButtonIF } from './interfaceModule';
//query selector
const display = document.getElementById('display') as HTMLElement;
const allBtn: NodeList = document.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>;
const number: NodeList = document.querySelectorAll('.number') as NodeListOf<HTMLButtonElement>;
const operator: NodeList = document.querySelectorAll('.operation') as NodeListOf<HTMLButtonElement>;
const clearDisplay: NodeList = document.querySelectorAll('.clear') as NodeListOf<HTMLButtonElement>;
const trigonometry: NodeList = document.querySelectorAll('.trigonometry') as NodeListOf<HTMLButtonElement>;
const degreeBtn = document.querySelector('.degree-btn') as HTMLButtonElement;
const clickFE = document.querySelector('.click-fe') as HTMLButtonElement;
const mathFunction: NodeList = document.querySelectorAll('.math-function') as NodeListOf<HTMLButtonElement>;
const secondBtn = document.querySelector('.second-btn') as HTMLButtonElement;
const firstList: NodeList = document.querySelectorAll('.first-list') as NodeListOf<HTMLButtonElement>;
const memoryFunction: NodeList = document.querySelectorAll('.memory-function') as NodeListOf<HTMLButtonElement>;
const disabledBtn: NodeList = document.querySelectorAll('.disabled-btn') as NodeListOf<HTMLButtonElement>;
const equalBtn = document.querySelector('.equal') as HTMLButtonElement;
display.innerText = '0';
//type aliases
type boolOrStr = string | boolean;
//all the state and variables
let result: number;
let currentText: any = '';
let lastElements: string = '';
let tempNum: string = '';
let deg: boolean = true;
let isDot: boolean = false;
let isFE: boolean = false;
let operationState: boolean = true, lastOpearationState: boolean = true;
let isMultiplication: boolean = false, lastMultiplication: boolean = false;
let isDivision: boolean = false, lastDivision: boolean = false;
let isMod: boolean = false;
let isExp: boolean = false;
let plusMinus: Array<number> = [];
let memory: Array<number> = [];
let isTrigometry: boolOrStr = false;
let isInverseTrigonometry: boolOrStr = false;
let mathOperation: boolOrStr = false;
let isSecondList: boolean = false;
let isCombination = false;
let isPower: boolean = false;
let counter: number = 0;
let isBracket: boolean = false;
let bracketStartIndex: number, bracketEndIndex: number;
changeList();
//onload message
window.onload = () => {
  console.log("Calculator Loaded Successfully");
}
//alert function
function alertMsg(msg: string): void {
  alert(msg);
}
//clear all state and variables
function clearVar(): void {
  currentText = lastElements = tempNum = '';
  isDot = isMultiplication = isDivision = isTrigometry = mathOperation = isFE = false;
  isPower = isMod = isExp = isCombination = isInverseTrigonometry = isBracket = false;
  lastMultiplication = lastDivision = false;
  counter = 0;
  result = 0;
  operationState = lastOpearationState = true;
  plusMinus = plusMinus.slice(0, 0);
}
//if there's need of two argument from user
const twoArgueFromUser: arguedFunctionIF = (x, y, functionName) => {
  let answer: number;
  switch (functionName) {
    case 'nCr':
      answer = fact(x) / fact(x - y) / fact(y);
      return answer;
      break;
    case 'power':
      return x ** y;
      break;
    default:
      alertMsg('Invalid Input');
      return 0;
  }
}
//degree status
const setDegree = (): void => {
  let e: string = degreeBtn.innerText;
  if (deg) {
    degreeBtn.innerText = 'RAD'
    deg = false;
  }
  else {
    degreeBtn.innerText = 'DEG';
    deg = true;
  }
}
//set FE state and button
const setFE = (): void => {
  if (isFE) {
    clickFE.classList.remove('btn-dark');
    isFE = false;
  }
  else {
    clickFE.classList.add('btn-dark');
    isFE = true;
  }
}
//memory function
memoryFunction.forEach((memoryFunction: Node) => {
  memoryFunction.addEventListener('click', (event: Event) => {
    let eventTarget = event.target as HTMLElement;
    let e: string = eventTarget.innerText;
    //set enable to disabled button
    if (e === 'M+' || e === 'M-' || e === 'MS') {
      disabledBtn.forEach((btn: any) => {
        btn.classList.remove('disabled');
      })
    }
    else {
      disabledBtn.forEach((btn: any) => {
        btn.classList.add('disabled');
      })
    }
    switch (e) {
      case 'M+':
        memory.push(parseFloat(currentText));
        console.log('M+ >> ' + memory); //print added element
        break;
      case 'M-':
        memory.push((-1) * parseFloat(currentText));
        console.log('M- >> ' + memory); //print added element
        break;
      case 'MS':
        memory.push(parseFloat(currentText));
        console.log('MS >> ' + memory); //print added element
        break;
      case 'MC':
        for (let i = 0; i < memory.length; i++) {
          memory.pop();
        }
        memory[0] = 0;
        console.log('MC >> ' + memory);
        break;
      case 'MR':
        let total = memory.reduce((sum, cur) => {
          sum += cur;
          return sum;
        }, 0);
        display.innerText = total.toString();
        console.log('MR >> ' + memory); //print added element
        break;
    }
  })
})
//click trigonometry
trigonometry.forEach((trigonometry: Node) => {
  trigonometry.addEventListener('click', (event: Event) => {
    let eventTarget = event.target as HTMLElement;
    let e: string = eventTarget.innerText;
    clearVar();
    isTrigometry = e;
    display.innerText = e + '()';
  })
})
//trigonometry function
const evalTrigonometry: mathOrTrigonometryIF = (functionName, num) => {
  let degree = num;
  //for inverse trigonometry and hyp function
  if (isInverseTrigonometry && (functionName === 'sinh' || functionName === 'cosh')) {
    isInverseTrigonometry = false;
    switch (functionName) {
      case 'sinh':
        return Math.sinh(degree);
        break;
      case 'cosh':
        return Math.cosh(degree);
        break;
      default:
        alertMsg('Invalid input');
        return 0;
        break;
    }
  }
  else if (isInverseTrigonometry) {
    switch (functionName) {
      case 'sin-1':
        return Math.asin(degree);
        break;
      case 'cos-1':
        return Math.acos(degree);
        break;
      case 'tan-1':
        return Math.atan(degree);
        break;
      default:
        alertMsg('Invalid input');
        return 0;
        break;
    }
  }
  else {
    deg ? degree = degree * Math.PI / 180 : degree = degree;
    switch (functionName) {
      case 'sin':
        return Math.sin(degree);
        break;
      case 'cos':
        return Math.cos(degree);
        break;
      case 'tan':
        return Math.tan(degree);
        break;
      case 'cosec':
        return 1 / Math.sin(degree);
        break;
      case 'sec':
        return 1 / Math.cos(degree);
        break;
      case 'cot':
        return 1 / Math.tan(degree);
        break;
      default:
        alertMsg('Invalid input');
        return 0;
        break;
    }
  }
}
//mathFunction add text
mathFunction.forEach((mathFunction: Node) => {
  mathFunction.addEventListener('click', (event: Event) => {
    let eventTarget = event.target as HTMLElement;
    let e: string = eventTarget.innerText;
    clearVar();
    if (e === 'rand') {
      currentText = Math.random().toFixed(5);
      display.innerText = currentText;
      currentText = '';
    }
    else {
      mathOperation = e;
      display.innerText = e + '()';
    }
  })
})
//maths function calculation
const evalMathOperation: mathOrTrigonometryIF = (functionName, num) => {
  switch (functionName) {
    case 'abs':
      return Math.abs(num);
      break;
    case 'ceil':
      return Math.ceil(num);
      break;
    case 'round':
      return Math.round(num);
      break;
    case 'cbrt':
      return Math.cbrt(num);
      break;
    case 'floor':
      return Math.floor(num);
      break;
    case 'log':
      return Math.log10(num);
      break;
    case 'ln':
      return Math.log(num);
      break;
    default:
      alertMsg('Invalid input');
      return 0;
      break;
  }
}
//change first list to second list
//and second list to first list
function changeList(): void {
  if (isSecondList) {
    firstList.forEach((fList: any) => {
      let element: string = fList.value;
      switch (element) {
        case 'element1':
          fList.innerHTML = 'sin<sup>-1</sup>';
          break;
        case 'element2':
          fList.innerHTML = 'cos<sup>-1</sup>';
          break;
        case 'element3':
          fList.innerHTML = 'tan<sup>-1</sup>';
          break;
        case 'element4':
          fList.innerHTML = 'sinh';
          break;
        case 'element5':
          fList.innerHTML = 'cosh';
          break;
        case 'element6':
          fList.innerHTML = 'nCr';
          break;
      }
    })
    secondBtn.innerHTML = '1<sup>st</sup>';
    isSecondList = false;
  }
  else {
    firstList.forEach((fList: any) => {
      let element: string = fList.value;
      switch (element) {
        case 'element1':
          fList.innerHTML = 'x<sup>2</sup>';
          break;
        case 'element2':
          fList.innerHTML = '<img src="./buttonIcon/sqrt.png" alt="sqrt">';
          break;
        case 'element3':
          fList.innerHTML = 'x<sup>y</sup>';
          break;
        case 'element4':
          fList.innerHTML = '10<sup>x</sup>';
          break;
        case 'element5':
          fList.innerHTML = 'log';
          break;
        case 'element6':
          fList.innerHTML = 'ln';
          break;
      }
    })
    secondBtn.innerHTML = '2<sup>nd</sup>';
    isSecondList = true;
  }
}
//get list elements and value
firstList.forEach((list: Node) => {
  list.addEventListener('click', (event: Event) => {
    let eventTarget = event.target as HTMLButtonElement;
    let { innerText, value } = eventTarget;
    if (!isSecondList) {
      secondListClick(innerText, value);
    }
    else {
      firstListClick(innerText, value);
    }
  })
})
//eval first list element
const firstListClick: changingListIF = (functionName, elementVal) => {
  switch (elementVal) {
    case 'element1':
      if (!currentText) {
        alertMsg('Add Value For Square');
      }
      else {
        currentText = parseFloat(currentText) ** 2;
        display.innerText = currentText.toString();
      }
      break;
    case 'element2':
      if (!currentText) {
        alertMsg('Add Value For Square Root');
      }
      else {
        currentText = parseFloat(currentText) ** (1 / 2);
        currentText = currentText.toFixed(4);
        display.innerText = currentText.toString();
      }
      break;
    case 'element3':
      if (!currentText) {
        alertMsg('Add Value X for X^y');
      }
      else {
        isPower = true;
        tempNum = currentText;
        display.innerText = tempNum + '^';
        currentText = '';
      }
      break;
    case 'element4':
      if (!currentText) {
        alertMsg('Add Value of 10s exponent');
      }
      else {
        currentText = 10 ** parseFloat(currentText);
        display.innerText = currentText.toString();
      }
      break;
    case 'element5':
      display.innerText = functionName + '()';
      mathOperation = functionName;
      break;
    case 'element6':
      display.innerText = functionName + '()';
      mathOperation = functionName;
      break;
  }
}
//eval secondList element
const secondListClick: changingListIF = (functionName, elementVal) => {
  if (elementVal === 'element6') {
    if (!currentText) {
      alertMsg('Add Value of n for nCr');
    }
    else {
      isCombination = true;
      tempNum = currentText;
      display.innerText = currentText + 'C';
      currentText = '';
    }
  }
  //all other are trigonometry function
  else {
    clearVar();
    isInverseTrigonometry = true;
    isTrigometry = functionName;
    display.innerText = functionName + '()';
  }
}
//mathPI
function mathPI(): void {
  currentText = (Math.PI).toFixed(4);
  currentText.toString();
  display.innerText = lastElements + 'π';
}
//mathE
function mathE(): void {
  currentText = (Math.E).toFixed(4);
  currentText.toString();
  display.innerText = lastElements + 'e';
}
//clear button click
clearDisplay.forEach((clr: Node) => {
  clr.addEventListener('click', (event: Event) => {
    let eventTarget = event.target as HTMLElement;
    let e: string = eventTarget.innerText;
    if (e === 'C') {
      clearVar();
      display.innerText = '0';
      disabledBtn.forEach((btn: any) => {
        btn.classList.add('disabled');
      })
      clickFE.classList.remove('btn-dark');
      console.log('Clear All'); //print clear All
    }
    else {
      if (lastElements) {
        if (currentText) {
          if (currentText[currentText.length - 1] === '.') isDot = false;
          currentText = currentText.substring(0, currentText.length - 1);
          display.innerText = lastElements + currentText;
        }
        else {
          let i = lastElements.length - 1;
          if (lastElements[i] === '+' || lastElements[i] === '-' || lastElements[i] === 'x' || lastElements === '÷')
            //removed elements will be currentText
            currentText = plusMinus.pop();
          currentText = currentText.toString();
          let j = currentText.length;
          //remove last element from lastElements string
          i = i - j;
          lastElements = lastElements.substring(0, i);
          i = lastElements.length - 1;
          console.log(lastElements[i]);
          display.innerText = lastElements + currentText;
          console.log('after backspace lastElements >>' + lastElements);
          console.log('after backspace currentText >>' + currentText);
        }
      }
      //if there's trigonometry function
      else if (isTrigometry) {
        if (currentText[currentText.length - 1] === '.') isDot = false;
        currentText = currentText.substring(0, currentText.length - 1);
        display.innerText = isTrigometry + '(' + currentText + ')';
      }
      else if (mathOperation) {
        if (currentText[currentText.length - 1] === '.') isDot = false;
        currentText = currentText.substring(0, currentText.length - 1);
        display.innerText = mathOperation + '(' + currentText + ')';
      }
      else {
        if (currentText[currentText.length - 1] === '.') isDot = false;
        currentText = currentText.substring(0, currentText.length - 1);
        if (!currentText) display.innerText = '0';
        else display.innerText = currentText;
      }
    }
  })
})
// 1/x function
function inverseNum(): void {
  currentText = parseFloat(currentText) ** (-1);
  currentText = currentText.toFixed(2);
  display.innerText = lastElements + currentText.toString();
}
//operation
operator.forEach((operation: Node) => {
  operation.addEventListener('click', (event: Event) => {
    let eventTarget = event.target as HTMLElement;
    let e: string = eventTarget.innerText;
    if (e === '+' || e === '-') {
      checkPriority();
      isMultiplication = isDivision = isMod = isExp = false;
    }
    else if (e === 'x' || e === '÷') {
      checkPriority();
      e === 'x' ? isMultiplication = true : isDivision = true;
      isMod = isExp = false;
    }
    else if (e === 'n!') {
      currentText = parseFloat(currentText);
    }
    else if (e === 'mod') {
      if (!currentText) {
        alert('Enter first Element for mod')
        return;
      }
      else {
        checkPriority();
        e === 'mod' ? isMod = true : isMod = false;
      }
    }
    else if (e === 'exp') {
      if (!currentText) {
        currentText = 1;
      }
      checkPriority();
      e === 'exp' ? isExp = true : isExp = false;
    }
    else if (e === '|x|') {
      e = '|';
      let answer: number;
      if (counter === 0) {
        //save outer calculation state ans set default inner state
        lastOpearationState = operationState;
        lastMultiplication = isMultiplication;
        lastDivision = isDivision;
        operationState = true;
        isDivision = isMultiplication = false;
        //index of first ele in bracket mod
        bracketStartIndex = plusMinus.length;
        counter++;
      }
      else {
        answer = evalBracketElements();
        //apply back outer calculation state
        isMultiplication = lastMultiplication;
        isDivision = lastDivision;
        operationState = lastOpearationState;
        console.log('element ans of mod>> ' + answer);
        operationState ? plusMinus.push(Math.abs(answer)) : plusMinus.push((-1) * Math.abs(answer));
        counter = 0;
        isBracket = true;
      }
    }
    else if (e === '(' || e === ')') {
      let answer: number;
      if (e === '(') {
        //save outer calculation state ans set default inner state
        lastOpearationState = operationState;
        lastMultiplication = isMultiplication;
        lastDivision = isDivision;
        operationState = true;
        isDivision = isMultiplication = false;
        //index of first ele in bracket
        bracketStartIndex = plusMinus.length;
      }
      else {
        answer = evalBracketElements();
        //apply back outer calculation state
        isMultiplication = lastMultiplication;
        isDivision = lastDivision;
        operationState = lastOpearationState;
        console.log('element ans of bracket>> ' + answer);
        operationState ? plusMinus.push(answer) : plusMinus.push((-1) * (answer));
        isBracket = true
      }
    }
    //print operator and add in string
    e === '-' ? operationState = false : operationState = true;
    lastElements += currentText.toString();
    lastElements += e;
    display.innerText = lastElements;
    currentText = '';
    isDot = false;
  })
})
//check priority
function checkPriority(): void {
  if (isBracket) {
    isBracket = false;
  }
  else {
    operationState ? plusMinus.push(parseFloat(currentText)) : plusMinus.push((-1) * parseFloat(currentText));
  }
  if (isMod) mod();
  else if (isExp) exp();
  else if (isDivision) division();
  else if (isMultiplication) multiplication();
}
//multiplication and division function
function multiplication(): void {
  let len: number = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] * plusMinus[len];
  plusMinus = plusMinus.slice(0, len);
  console.log("multiply>> " + plusMinus); // multiply>> answer
  isMultiplication = false;
}
function division(): void {
  let len: number = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] / plusMinus[len];
  plusMinus = plusMinus.slice(0, len);
  console.log("div>> " + plusMinus); // div>> answer 
  isDivision = false;
}
//factorial
function fact(num: number): number {
  let n: number;
  num ? n = num : n = parseFloat(currentText);
  let answer = 1;
  if (n == 0 || n == 1) {
    return 1;
  }
  else {
    for (var i = n; i >= 1; i--) {
      answer = answer * i;
    }
    if (num) {
      return answer;
    }
    currentText = answer.toString();
    display.innerText = lastElements + currentText;
    return 0;
  }
}
//mod function
function mod(): void {
  let len: number = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] % plusMinus[len];
  plusMinus = plusMinus.slice(0, len);
  console.log("mod>> " + plusMinus); // mod>> answer
  isMod = false;
}
//exponential of e
function exp(): void {
  let len: number = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] * (Math.exp(plusMinus[len]));
  plusMinus = plusMinus.slice(0, len);
  console.log("exp>> " + plusMinus); // epx>> answer
  isExp = false;
}
//eval in bracket elements
function evalBracketElements(): number {
  let total: number = 0;
  checkPriority();
  bracketEndIndex = plusMinus.length - 1;
  let diff: number = bracketEndIndex - bracketStartIndex;
  for (let k = 0; k <= diff; k++) {
    total += plusMinus[bracketEndIndex];
    plusMinus.pop();
    bracketEndIndex--;
  }
  return total;
}
//click number
number.forEach((number: Node) => {
  number.addEventListener('click', (event: Event) => {
    let eventTarget = event.target as HTMLElement;
    let e: string = eventTarget.innerText;
    //check for multiple dot
    if (e === '.' && !isDot) {
      isDot = true;
    }
    else if (e === '.' && isDot) return;

    currentText += e;
    if (lastElements) {
      let temp = lastElements + currentText;
      display.innerText = temp;
      // display.innerText=lastElements;
    }
    else if (isTrigometry) {
      display.innerText = isTrigometry + '(' + currentText + ')';
    }
    else if (mathOperation) {
      display.innerText = mathOperation + '(' + currentText + ')';
    }
    else if (isCombination) {
      display.innerText = tempNum + 'C' + currentText;
    }
    else if (isPower) {
      display.innerText = tempNum + '^' + currentText;
    }
    else {
      display.innerText = currentText;
    }
  })
})
//plus or minus
function plusOrMinus(): void {
  if (mathOperation) {
    display.innerText = mathOperation + '(-' + currentText + ')';
    currentText = ((-1) * parseFloat(currentText)).toString();
  }
  else if (currentText) {
    operationState ? operationState = false : operationState = true;
    lastElements = lastElements + ' -';
    display.innerText = lastElements + currentText;
  }
}
//eval final answer
function equal(): void {
  if (isPower) {
    result = twoArgueFromUser(parseFloat(tempNum), parseFloat(currentText), 'power');
  }
  else if (isCombination) {
    let r: number = parseFloat(currentText);
    let n: number = parseFloat(tempNum);
    if (r > n) {
      alertMsg('r should smaller than n');
      result = 0;
    }
    else if (r === 1 || r === n - 1) {
      result = n;
    }
    else if (r === 0 || r === n) {
      result = 1;
    }
    else {
      result = twoArgueFromUser(n, r, 'nCr');
    }
  }
  else if (isTrigometry) {
    let ans: number = evalTrigonometry(isTrigometry, parseFloat(currentText));
    !isInverseTrigonometry ? result = ans : result = ans * (180 / Math.PI);
  }
  else if (mathOperation) {
    let ans: number = evalMathOperation(mathOperation, parseFloat(currentText));
    result = ans;
  }
  else if (plusMinus[0]) {
    currentText ? currentText : currentText = 0;
    checkPriority();
    operationState = true;
    let sum = 0;
    for (let el of plusMinus) {
      sum += el
    }
    console.log('Finale ans>> ' + sum);
    result = sum;
    console.log('Array elements>> ' + plusMinus);
    //if F-E is true
    if (isFE) {
      result = 10 ** result;
    }
  }
  else {
    !currentText ? result = 0 : result = currentText;
  }
  //if the result is in decimal
  result % 1 === 0 ? result = result : result = parseFloat(result.toFixed(4));
  //print result
  display.innerText = result.toString();
  let tempAns = result;
  clearVar();
  currentText = tempAns;
}
//input from keyboard
window.addEventListener('keydown', (event: KeyboardEvent) => {
  let e: string = event.key;
  //for number
  if (
    e === '0' ||
    e === '1' ||
    e === '2' ||
    e === '3' ||
    e === '4' ||
    e === '5' ||
    e === '6' ||
    e === '7' ||
    e === '8' ||
    e === '9' ||
    e === '.'
  ) {
    clickNumButton(e);
  }
  //for operator
  else if (
    e === '+' ||
    e === '-' ||
    e === '*' ||
    e === '/' ||
    e === '(' ||
    e === ')' ||
    e === '%'
  ) {
    if (e === '*') {
      clickOperatorButton('x');
    }
    else if (e === '/') {
      clickOperatorButton('÷');
    }
    else if (e === '%') {
      clickOperatorButton('mod');
    }
    else {
      clickOperatorButton(e);
    }
  }
  //clearAll and backspace
  else if (e === 'Delete' || e === 'Backspace') {
    e === 'Delete' ? clickClearAll('clearAll') : clickClearAll(e);
  }
  //enter or equal
  else if (e === 'Enter' || e === '=') {
    clickEqual();
  }
  else {
    return;
  }
})
//number click function
const clickNumButton: keyboardClickButtonIF = (key: string) => {
  number.forEach((btn: any) => {
    if (btn.innerText === key) {
      btn.click()
    }
  })
}
//operator click function
const clickOperatorButton: keyboardClickButtonIF = (key: string) => {
  operator.forEach((btn: any) => {
    if (btn.innerText === key) {
      btn.click();
    }
  })
}
//click clear
const clickClearAll: keyboardClickButtonIF = (key: string) => {
  clearDisplay.forEach((btn: any) => {
    if (btn.value === key) {
      btn.click();
    }
  })
}
//click enter or equal
function clickEqual(): void {
  equalBtn.click();
}