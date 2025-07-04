import {GetDualCalculationResult} from "./Math.js";
import {GetSingleCalculationResult} from "./Math.js";

let previousResult = 0, currentValue = "0", currentOperator = "";
let calculationHistory = 
{
  Calculation : [],
  Result : []
}
const operationLabelPart = ".operationLabelPart";
const inputPart = ".inputPart";
const operatorLabel = document.querySelector(operationLabelPart);
const inputText = document.querySelector(inputPart);
const dualOperands = ["+", "-", "*", "/", "%"];
const singleOperands = ["√", "Sqr", "Sqrt"];
const historyContainer = document.getElementById('historyContainer');
const historyBtn = document.getElementById('historyBtn');
const deleteBtn = document.getElementById('deleteBtn');
const navPanel = document.getElementById('navPanel');

historyBtn.addEventListener('click', () => 
{
  navPanel.classList.toggle('active');
  historyContainer.innerHTML = "";
  console.log(calculationHistory.Calculation.length);
  for(let ctr = 0; ctr < calculationHistory.Calculation.length; ctr++)
  {
    const newDt = document.createElement('dt');
    const newDd = document.createElement('dd');
    newDt.textContent = calculationHistory.Calculation[ctr];
    newDd.textContent = calculationHistory.Result[ctr];
    historyContainer.appendChild(newDt);
    historyContainer.appendChild(newDd);
  }
});

deleteBtn.addEventListener('click', () =>
{
  historyContainer.innerHTML = "";
  calculationHistory.Calculation = [];
  calculationHistory.Result = [];
})


document.querySelectorAll('button').forEach(button => 
{
  button.addEventListener('click', RippleEffect);
  button.addEventListener('click', Calculate);
});

function Calculate(buttonEvent) 
{
  const button = buttonEvent.currentTarget;
  const value = button.dataset.value;

  if (isDigit(value) || value === '.') 
  {
    currentValue += value;
    currentValue = currentValue.replace(/^0+(?!\.)/, ''); // remove leading zeros
  } 
  else if (dualOperands.includes(value)) 
  {
    if (currentOperator && currentValue !== "") 
    {
      calculationHistory.Calculation.push(`${previousResult}${currentOperator}${currentValue}`);
      previousResult = GetDualCalculationResult(previousResult, currentOperator, currentValue);
      calculationHistory.Result.push(previousResult);
      console.log(calculationHistory);
    }
    else if (currentValue !== "") 
      previousResult = parseFloat(currentValue);
    currentValue = "";
    currentOperator = value;
  } 
  else if(singleOperands.includes(value))
  {
    if(currentValue === "" && previousResult === "") return;
    currentValue = GetSingleCalculationResult(currentValue === "" ? previousResult : currentValue, value);
    previousResult = GetDualCalculationResult(previousResult, currentOperator, currentValue);
    currentValue = currentOperator = "";
  }
  else if (value === "=") 
  {
    if (currentOperator && currentValue !== "") 
    {
      previousResult = GetDualCalculationResult(previousResult, currentOperator, currentValue);
      currentValue = previousResult.toString();
      currentOperator = "";
    }
  } 
  else if (value === "C" || value === "CE") 
  {
    currentValue = "";
    previousResult = 0;
    currentOperator = "";
  } 
  else if (value === "←") 
    currentValue = currentValue.slice(0, -1);
  else if (value === "Neg") 
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