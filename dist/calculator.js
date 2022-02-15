//query selector
const display = document.getElementById('display');
const allBtn = document.querySelectorAll('.btn');
const number = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operation');
const clearDisplay = document.querySelectorAll('.clear');
const trigonometry = document.querySelectorAll('.trigonometry');
const degreeBtn = document.querySelector('.degree-btn');
const clickFE = document.querySelector('.click-fe');
const mathFunction = document.querySelectorAll('.math-function');
const secondBtn = document.querySelector('.second-btn');
const firstList = document.querySelectorAll('.first-list');
const memoryFunction = document.querySelectorAll('.memory-function');
const disabledBtn = document.querySelectorAll('.disabled-btn');
const equalBtn = document.querySelector('.equal');
display.innerText = '0';
//all the state and variables
let result;
let currentText = '';
let lastElements = '';
let tempNum = '';
let deg = true;
let isDot = false;
let isFE = false;
let operationState = true, lastOpearationState = true;
let isMultiplication = false, lastMultiplication = false;
let isDivision = false, lastDivision = false;
let isMod = false;
let isExp = false;
let plusMinus = [];
let memory = [];
let isTrigometry = false;
let isInverseTrigonometry = false;
let mathOperation = false;
let isSecondList = false;
let isCombination = false;
let isPower = false;
let counter = 0;
let isBracket = false;
let bracketStartIndex, bracketEndIndex;
changeList();
//onload message
window.onload = () => {
    console.log("Calculator Loaded Successfully");
    //disable button of memory function
    disabledBtn.forEach((btn) => {
        let buttonElement = btn;
        buttonElement.disabled = true;
    });
};
//alert function
function alertMsg(msg) {
    alert(msg);
}
//clear all state and variables
function clearVar() {
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
const twoArgueFromUser = (x, y, functionName) => {
    let answer;
    switch (functionName) {
        case 'nCr':
            answer = fact(x) / fact(x - y) / fact(y);
            return answer;
            break;
        case 'power':
            return Math.pow(x, y);
            break;
        default:
            alertMsg('Invalid Input');
            return 0;
    }
};
//degree status
const setDegree = () => {
    let e = degreeBtn.innerText;
    if (deg) {
        degreeBtn.innerText = 'RAD';
        deg = false;
    }
    else {
        degreeBtn.innerText = 'DEG';
        deg = true;
    }
};
//set FE state and button
const setFE = () => {
    if (isFE) {
        clickFE.classList.remove('btn-dark');
        isFE = false;
    }
    else {
        clickFE.classList.add('btn-dark');
        isFE = true;
    }
};
//memory function
memoryFunction.forEach((memoryFunction) => {
    memoryFunction.addEventListener('click', (event) => {
        let eventTarget = event.target;
        let e = eventTarget.innerText;
        //set enable to disabled button
        if (e === 'M+' || e === 'M-' || e === 'MS') {
            disabledBtn.forEach((btn) => {
                let buttonElement = btn;
                buttonElement.disabled = false;
            });
        }
        else {
            disabledBtn.forEach((btn) => {
                let buttonElement = btn;
                buttonElement.disabled = true;
            });
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
                for (let i = 0; i < memory.length; i++) {
                    memory.pop();
                }
                memory[0] = 0;
                console.log('MR >> ' + memory); //print added element
                break;
        }
    });
});
//click trigonometry
trigonometry.forEach((trigonometry) => {
    trigonometry.addEventListener('click', (event) => {
        let eventTarget = event.target;
        let e = eventTarget.innerText;
        clearVar();
        isTrigometry = e;
        display.innerText = e + '()';
    });
});
//trigonometry function
const evalTrigonometry = (functionName, num) => {
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
};
//mathFunction add text
mathFunction.forEach((mathFunction) => {
    mathFunction.addEventListener('click', (event) => {
        let eventTarget = event.target;
        let e = eventTarget.innerText;
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
    });
});
//maths function calculation
const evalMathOperation = (functionName, num) => {
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
};
//change first list to second list
//and second list to first list
function changeList() {
    if (isSecondList) {
        firstList.forEach((fListElement) => {
            let fList = fListElement;
            let elementVal = fList.value;
            switch (elementVal) {
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
        });
        secondBtn.innerHTML = '1<sup>st</sup>';
        isSecondList = false;
    }
    else {
        firstList.forEach((fListElement) => {
            let fList = fListElement;
            let elementVal = fList.value;
            switch (elementVal) {
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
        });
        secondBtn.innerHTML = '2<sup>nd</sup>';
        isSecondList = true;
    }
}
//get list elements and value
firstList.forEach((list) => {
    list.addEventListener('click', (event) => {
        let eventTarget = event.target;
        let { innerText, value } = eventTarget;
        if (!isSecondList) {
            secondListClick(innerText, value);
        }
        else {
            firstListClick(innerText, value);
        }
    });
});
//eval first list element
const firstListClick = (functionName, elementVal) => {
    switch (elementVal) {
        case 'element1':
            if (!currentText) {
                alertMsg('Add Value For Square');
            }
            else {
                currentText = (Math.pow(parseFloat(currentText), 2)).toString();
                display.innerText = currentText;
            }
            break;
        case 'element2':
            if (!currentText) {
                alertMsg('Add Value For Square Root');
            }
            else {
                currentText = ((Math.pow(parseFloat(currentText), (1 / 2))).toFixed(2)).toString();
                display.innerText = currentText;
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
                currentText = (Math.pow(10, parseFloat(currentText))).toString();
                display.innerText = currentText;
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
};
//eval secondList element
const secondListClick = (functionName, elementVal) => {
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
};
//mathPI
function mathPI() {
    currentText = (Math.PI).toFixed(4);
    currentText.toString();
    display.innerText = lastElements + 'π';
}
//mathE
function mathE() {
    currentText = (Math.E).toFixed(4);
    currentText.toString();
    display.innerText = lastElements + 'e';
}
//clear button click
clearDisplay.forEach((clr) => {
    clr.addEventListener('click', (event) => {
        let eventTarget = event.target;
        let e = eventTarget.innerText;
        if (e === 'C') {
            clearVar();
            display.innerText = '0';
            disabledBtn.forEach((btn) => {
                let buttonElement = btn;
                buttonElement.disabled = true;
            });
            clickFE.classList.remove('btn-dark');
            console.log('Clear All'); //print clear All
        }
        else {
            if (lastElements) {
                if (currentText) {
                    if (currentText[currentText.length - 1] === '.')
                        isDot = false;
                    currentText = currentText.substring(0, currentText.length - 1);
                    display.innerText = lastElements + currentText;
                }
                else {
                    let i = lastElements.length - 1;
                    if (lastElements[i] === '+' || lastElements[i] === '-' || lastElements[i] === 'x' || lastElements === '÷') {
                        switch (lastElements[i]) {
                            case '-':
                                operationState = true;
                                break;
                            case '+':
                                operationState = true;
                                break;
                            case '÷':
                                isDivision = false;
                                break;
                            case '*':
                                isMultiplication = false;
                                break;
                        }
                        //removed elements will be currentText
                        let tempCurrentText = plusMinus[plusMinus.length - 1];
                        currentText = tempCurrentText.toString();
                        plusMinus.pop();
                    }
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
                if (currentText[currentText.length - 1] === '.')
                    isDot = false;
                currentText = currentText.substring(0, currentText.length - 1);
                display.innerText = isTrigometry + '(' + currentText + ')';
            }
            else if (mathOperation) {
                if (currentText[currentText.length - 1] === '.')
                    isDot = false;
                currentText = currentText.substring(0, currentText.length - 1);
                display.innerText = mathOperation + '(' + currentText + ')';
            }
            else {
                if (currentText[currentText.length - 1] === '.')
                    isDot = false;
                currentText = currentText.substring(0, currentText.length - 1);
                if (!currentText)
                    display.innerText = '0';
                else
                    display.innerText = currentText;
            }
        }
    });
});
// 1/x function
function inverseNum() {
    currentText = ((Math.pow(parseFloat(currentText), (-1))).toFixed(2)).toString();
    display.innerText = lastElements + currentText;
}
//operation
operator.forEach((operation) => {
    operation.addEventListener('click', (event) => {
        let eventTarget = event.target;
        let e = eventTarget.innerText;
        if (e === '+' || e === '-') {
            checkPriority();
            isMultiplication = isDivision = isMod = isExp = false;
        }
        else if (e === 'x' || e === '÷') {
            checkPriority();
            e === 'x' ? isMultiplication = true : isDivision = true;
            isMod = isExp = false;
        }
        else if (e === 'mod') {
            if (!currentText) {
                alert('Enter first Element for mod');
                return;
            }
            else {
                checkPriority();
                e === 'mod' ? isMod = true : isMod = false;
            }
        }
        else if (e === 'exp') {
            if (!currentText) {
                currentText = '1';
            }
            checkPriority();
            e === 'exp' ? isExp = true : isExp = false;
        }
        else if (e === '|x|') {
            e = '|';
            let answer;
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
            let answer;
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
                isBracket = true;
            }
        }
        //print operator and add in string
        e === '-' ? operationState = false : operationState = true;
        lastElements += currentText.toString();
        lastElements += e;
        display.innerText = lastElements;
        currentText = '';
        isDot = false;
    });
});
//check priority
function checkPriority() {
    if (isBracket) {
        isBracket = false;
    }
    else {
        operationState ? plusMinus.push(parseFloat(currentText)) : plusMinus.push((-1) * parseFloat(currentText));
    }
    if (isMod)
        mod();
    else if (isExp)
        exp();
    else if (isDivision)
        division();
    else if (isMultiplication)
        multiplication();
}
//multiplication and division function
function multiplication() {
    let len = plusMinus.length - 1;
    plusMinus[len - 1] = plusMinus[len - 1] * plusMinus[len];
    plusMinus = plusMinus.slice(0, len);
    console.log("multiply>> " + plusMinus); // multiply>> answer
    isMultiplication = false;
}
function division() {
    let len = plusMinus.length - 1;
    plusMinus[len - 1] = plusMinus[len - 1] / plusMinus[len];
    plusMinus = plusMinus.slice(0, len);
    console.log("div>> " + plusMinus); // div>> answer 
    isDivision = false;
}
//factorial
function fact(num) {
    let n;
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
function mod() {
    let len = plusMinus.length - 1;
    plusMinus[len - 1] = plusMinus[len - 1] % plusMinus[len];
    plusMinus = plusMinus.slice(0, len);
    console.log("mod>> " + plusMinus); // mod>> answer
    isMod = false;
}
//exponential of e
function exp() {
    let len = plusMinus.length - 1;
    plusMinus[len - 1] = plusMinus[len - 1] * (Math.exp(plusMinus[len]));
    plusMinus = plusMinus.slice(0, len);
    console.log("exp>> " + plusMinus); // epx>> answer
    isExp = false;
}
//eval in bracket elements
function evalBracketElements() {
    let total = 0;
    checkPriority();
    bracketEndIndex = plusMinus.length - 1;
    let diff = bracketEndIndex - bracketStartIndex;
    for (let k = 0; k <= diff; k++) {
        total += plusMinus[bracketEndIndex];
        plusMinus.pop();
        bracketEndIndex--;
    }
    return total;
}
//click number
number.forEach((number) => {
    number.addEventListener('click', (event) => {
        let eventTarget = event.target;
        let e = eventTarget.innerText;
        //check for multiple dot
        if (e === '.' && !isDot) {
            isDot = true;
        }
        else if (e === '.' && isDot)
            return;
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
    });
});
//plus or minus
function plusOrMinus() {
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
function equal() {
    if (isPower) {
        result = twoArgueFromUser(parseFloat(tempNum), parseFloat(currentText), 'power');
    }
    else if (isCombination) {
        let r = parseFloat(currentText);
        let n = parseFloat(tempNum);
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
        let ans = evalTrigonometry(isTrigometry, parseFloat(currentText));
        !isInverseTrigonometry ? result = ans : result = ans * (180 / Math.PI);
    }
    else if (mathOperation) {
        let ans = evalMathOperation(mathOperation, parseFloat(currentText));
        result = ans;
    }
    else if (plusMinus[0]) {
        currentText ? currentText : currentText = '0';
        checkPriority();
        operationState = true;
        let sum = 0;
        for (let el of plusMinus) {
            sum += el;
        }
        console.log('Finale ans>> ' + sum);
        result = sum;
        console.log('Array elements>> ' + plusMinus);
        //if F-E is true
        if (isFE) {
            result = Math.pow(10, result);
        }
    }
    else {
        !currentText ? result = 0 : result = parseFloat(currentText);
    }
    //if the result is in decimal
    result % 1 === 0 ? result = result : result = parseFloat(result.toFixed(4));
    //print result
    display.innerText = result.toString();
    let tempAns = result;
    clearVar();
    currentText = tempAns.toString();
}
//input from keyboard
window.addEventListener('keydown', (event) => {
    let e = event.key;
    //for number
    if (e === '0' ||
        e === '1' ||
        e === '2' ||
        e === '3' ||
        e === '4' ||
        e === '5' ||
        e === '6' ||
        e === '7' ||
        e === '8' ||
        e === '9' ||
        e === '.') {
        clickNumButton(e);
    }
    //for operator
    else if (e === '+' ||
        e === '-' ||
        e === '*' ||
        e === '/' ||
        e === '(' ||
        e === ')' ||
        e === '%') {
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
});
//number click function
const clickNumButton = (key) => {
    number.forEach((btnElement) => {
        let btn = btnElement;
        if (btn.innerText === key) {
            btn.click();
        }
    });
};
//operator click function
const clickOperatorButton = (key) => {
    operator.forEach((btnElement) => {
        let btn = btnElement;
        if (btn.innerText === key) {
            btn.click();
        }
    });
};
//click clear
const clickClearAll = (key) => {
    clearDisplay.forEach((btnElement) => {
        let btn = btnElement;
        if (btn.value === key) {
            btn.click();
        }
    });
};
//click enter or equal
function clickEqual() {
    equalBtn.click();
}
//# sourceMappingURL=calculator.js.map