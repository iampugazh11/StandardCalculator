import {GetCalculationResult} from "./Math.js";

let previousResult = 0, currentValue = "", currentOperator = "";
let calculationHistory;
const operationLabelPart = ".operationLabelPart";
const inputPart = ".inputPart";
const operatorLabel = document.querySelector(operationLabelPart);
const inputText = document.querySelector(inputPart);
const operands = ["+", "-", "*", "/", "%", "√", "Sqr", "Sqrt"];

document.querySelectorAll('button').forEach(button => 
{
  button.addEventListener('click', RippleEffect);
  button.addEventListener('click', Calculate);
});

function Calculate(buttonEvent) {
  const button = buttonEvent.currentTarget;
  const text = button.textContent;

  if (isDigit(text) || text === '.') 
  {
    currentValue += text;
    currentValue = currentValue.replace(/^0+(?!\.)/, ''); // remove leading zeros
  } 
  else if (operands.includes(text)) 
  {
    if (currentOperator && currentValue !== "") 
      previousResult = GetCalculationResult(previousResult, currentOperator, currentValue);
    else if (currentValue !== "") 
      previousResult = parseFloat(currentValue);
    else if(currentValue === "")
    {
      previousResult = GetCalculationResult(previousResult, currentOperator, previousResult);
    }

    
    currentValue = "";
    currentOperator = text;
  } 
  else if (text === "=") 
  {
    if (currentOperator && currentValue !== "") 
    {
      previousResult = GetCalculationResult(previousResult, currentOperator, currentValue);
      currentValue = previousResult.toString();
      currentOperator = "";
    }
  } 
  else if (text === "C" || text === "CE") 
  {
    currentValue = "";
    previousResult = 0;
    currentOperator = "";
  } 
  else if (text === "←") 
    currentValue = currentValue.slice(0, -1);
  else if (text === "Neg") 
  {
    if (currentValue) 
    {
      if (currentValue.startsWith('-')) 
      {
        console.log(currentValue[0]);
        currentValue = currentValue.slice(1);
      } 
      else 
      {
        currentValue = '-' + currentValue;
      }
    }
  }

  operatorLabel.textContent = previousResult + " " + currentOperator;
  inputText.value = currentValue;
}

function isDigit(char) {
  return char >= '0' && char <= '9';
}


function RippleEffect(buttonEvent) 
{
  const button = buttonEvent.currentTarget;
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  const rect = button.getBoundingClientRect();
  ripple.style.left = `${buttonEvent.clientX - rect.left}px`;
  ripple.style.top = `${buttonEvent.clientY - rect.top}px`;
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 2000);
}