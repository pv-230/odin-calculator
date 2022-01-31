let displayValue = ''; // The value shown in the calculator's display
let currentOperator = ''; // The currently selected operator
const operation = []; // An array of pending operands and operators

/**
 * Adds two numbers and returns the sum.
 * @param {Number} a
 * @param {Number} b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtracts two numbers and returns the difference.
 * @param {Number} a
 * @param {Number} b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplies two numbers and returns the product.
 * @param {Number} a
 * @param {Number} b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divides two numbers and returns the quotient.
 * @param {Number} a
 * @param {Number} b
 */
function divide(a, b) {
  if (b === 0) {
    console.log('test');
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

/**
 * Performs the specified operation on two numbers.
 * @param {String} operator
 * @param {Number} a
 * @param {Number} b
 */
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

/**
 * Sets the display of the calculator to the current display value. This
 * function will reduce the font size of the display if needed so that the
 * display can support up to 18 characters without overflow.
 */
function updateDisplay() {
  const display = document.querySelector('.display');

  // Breakpoints for display font size to avoid overflow
  if (displayValue.length <= 6) {
    display.setAttribute('style', 'font-size: 6rem;');
  } else if (displayValue.length === 7) {
    display.setAttribute('style', 'font-size: 4rem;');
  } else if (displayValue.length === 10) {
    display.setAttribute('style', 'font-size: 3rem;');
  } else if (displayValue.length === 13) {
    display.setAttribute('style', 'font-size: 2.5rem;');
  } else if (displayValue.length === 16) {
    display.setAttribute('style', 'font-size: 2.2rem;');
  } else if (displayValue.length >= 19) {
    display.setAttribute('style', 'font-size: 1.8rem;');
  }

  display.textContent = displayValue;
}

/**
 * Adds the selected digit to the display.
 */
function enterDigit() {
  if (displayValue.length === 16) {
    return; // 16 digits is the max that can be entered
  }

  // If an operator was selected and new digits were clicked on, this part
  // saves the operator that was selected for future operation.
  if (currentOperator) {
    operation.push(currentOperator);
    currentOperator = '';
  }

  displayValue += this.textContent;
  updateDisplay();
}

/**
 * Performs an operation on the last two operands that were entered. If not
 * enough operands exist, this function will only add the an operand to the
 * operation array. This function also saves the operator that was clicked on
 * to trigger this function.
 */
function performOperation() {
  if (this.textContent !== '=') {
    currentOperator = this.textContent;
  }

  if (displayValue) {
    operation.push(Number.parseInt(displayValue, 10));
    displayValue = '';
  }

  // Prevents division by zero
  if (operation.length === 3 && operation[1] === '/' && operation[2] === 0) {
    operation.splice(0, 3);
    displayValue = 'Cannot divide by zero';
    updateDisplay();
    displayValue = '';
    currentOperator = '';
  }

  // Performs an operation
  if (operation.length === 3) {
    const operands = operation.splice(0, 3);
    operation.push(operate(operands[1], operands[0], operands[2]));
    displayValue = operation[0].toString();
    updateDisplay();
    displayValue = '';
  }
}

// Sets up digit buttons with event listeners
const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => digit.addEventListener('click', enterDigit));

// Sets up operator buttons with event listeners
const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
  operator.addEventListener('click', performOperation);
});

// Sets up clear button with event listener
const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
  operation.splice(0, operation.length);
  displayValue = '0';
  updateDisplay();
  displayValue = '';
  currentOperator = '';
});
