export function GetDualCalculationResult(prevResult, operator, currentValue) {
  const num1 = parseFloat(prevResult);
  const num2 = parseFloat(currentValue);

  switch (operator) {
    case "+": return num1 + num2;
    case "-": return num1 - num2;
    case "*": return num1 * num2;
    case "/": return num2 === 0 ? "Error" : num1 / num2;
    case "%": return num1 % num2;
    default: return num2; // default to returning current value
  }
}

export function GetSingleCalculationResult(value, operator)
{
  const num = parseFloat(value);

  switch (operator) {
    case "√": return 1/num;          // or a if it's unary
    case "Sqr": return num * num;
    case "Sqrt": return Math.sqrt(num);
    default: return num; // default to returning current value
  }
}
