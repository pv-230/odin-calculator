let displayValue = '0';
const opList = [];

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      throw new Error('Invalid operator');
  }
}

function updateDisplay() {
  const display = document.querySelector('.display');

  if (displayValue.length === 7) {
    display.setAttribute('style', 'font-size: 4rem;');
  } else if (displayValue.length === 10) {
    display.setAttribute('style', 'font-size: 3rem;');
  } else if (displayValue.length === 13) {
    display.setAttribute('style', 'font-size: 2.5rem;');
  }

  display.textContent = displayValue;
}

function enterDigit() {
  if (displayValue.length === 15) {
    return;
  }

  if (displayValue === '0') {
    displayValue = '';
  }

  displayValue += this.textContent;
  updateDisplay();
}

function performOperation() {
  if (displayValue !== '0') {
    opList.push(Number.parseInt(displayValue, 10));
  }

  if (opList.length >= 3) {
    const op = opList.splice(0, 3);
    opList.push(operate(op[1], op[0], op[2]));
    displayValue = opList[0].toString();
    updateDisplay();
    displayValue = '0';
  }

  if (this.textContent !== '=') {
    opList.push(this.textContent);
    displayValue = '0';
  }

  console.log(opList);
}

// Setup digit buttons with event listeners
const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => digit.addEventListener('click', enterDigit));

// Setup operator buttons with event listeners
const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
  operator.addEventListener('click', performOperation);
});

// Setup clear button with event listener
const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
  opList.splice(0, opList.length);
  displayValue = '0';
  updateDisplay();
});
