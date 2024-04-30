const equals = document.querySelector('.equals');
const reset = document.querySelector('.ac');
const backspace = document.querySelector('.back');
const number = document.querySelectorAll('.number');
let calculationString = "";
let screenText = document.querySelector('.calculate');

const operatorOnScreen = document.querySelector('.operator');

number.forEach(num => {
    num.addEventListener('click', () => {
        calculationString += num.textContent;
        screenText.value = calculationString;
    });
});

const operators = document.querySelectorAll('.operators');
operators.forEach(sign => {
    sign.addEventListener('click', () => {
        const op = sign.textContent;
        calculationString += op;
        operatorOnScreen.textContent = op;

    });
});

function calculateResult() {
    if (calculationString === "") {
        return"";
    }
    let parts = calculationString.split(/([+\-*/%])/);
    let result =parseFloat(parts[0]);
    for(let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const operand = parseFloat(parts[i+1]);
        switch(operator) {
            case '+':
                result += operand;
                break;
            case '-':
                result -= operand;
                break;
            case '*':
                result *= operand;
                break;
            case '/':
                result = operand/result;
                break;
            case '%':
                result = (result)
                break;
        }
    }
    return result;
}

function updateScreen() {
    screenText.value = calculateResult(calculationString);
}

equals.addEventListener('click', () => {
    const result = calculateResult();
    screenText.value = result;
    calculationString = result.toString();
});

reset.addEventListener('click', () => {
    calculationString = "";
    updateScreen();
});

backspace.addEventListener('click', () => {
    calculationString = calculationString.slice(0, -1);
    updateScreen();
});