const equals = document.querySelector('.equals');
const reset = document.querySelector('.ac');
const backspace = document.querySelector('.back');
const number = document.querySelectorAll('.number');
let calculationString = ""; // Declare empty string for calculation
let screenText = document.querySelector('.calculate');

const operatorOnScreen = document.querySelector('.operator');

number.forEach(num => { // Iterate over every number class
    num.addEventListener('click', () => {
        calculationString += num.textContent; 
        screenText.value = calculationString; // Appends the value pressed by the buttons to the screen and stores it in the calculation string
    });
});

const operators = document.querySelectorAll('.operators'); //Iterators over all operators button
operators.forEach(sign => {
    sign.addEventListener('click', () => {
        const op = sign.textContent;  // Appends the sign of the operator on the right of the screen
        calculationString += op;
        operatorOnScreen.textContent = op;

    });
});

function calculateResult() {
    if (calculationString === "") {
        return "";  // Reset the screen content when calculate string is empty i.e when the user hits enter
    }

    let parts = calculationString.split(/([+\-*/%])/);  // Splits the string by all the operator signs
    let result = parseFloat(parts[0]);   // stores the first value of the part in result variable

    for (let i = 1; i < parts.length; i += 2) {  // jumps 2 at a time as we are interested in operators only
        const operator = parts[i];
        const operand = parseFloat(parts[i + 1]);

        switch (operator) {  // Switch case statements to evaluate the calculation. eval() function could have been used but it is suggested to not use it due to security concerns.
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
                if (operand !== 0) {
                    result /= operand;
                } else {
                    result = 'Error: Division by zero'; // Error when division by zero
                }
                break;
            case '%':
                if (operand !== 0) {
                    result %= operand;
                } else {
                    result = 'Error: Modulo by zero'; // Error when modulo is zero
                }
                break;
        }
    }

    return result;
}

function updateScreen() {
    const result = calculateResult();
    screenText.value = result;
    calculationString = result.toString();
    operatorOnScreen.textContent = ''; // removes the operator sign once the result has been displayed
}

equals.addEventListener('click', updateScreen);

reset.addEventListener('click', () => {
    calculationString = "";
    screenText.value = "";
    operatorOnScreen.textContent = ''; // Clear operator on screen after reset
});

backspace.addEventListener('click', () => {
    calculationString = calculationString.slice(0, -1);
    screenText.value = calculationString;
    if (calculationString === '') {
        operatorOnScreen.textContent = ''; // Clear operator on screen if no calculation string
    }
});