export function GetCalculationResult(prevResult, operator, currentValue) {
  const a = parseFloat(prevResult);
  const b = parseFloat(currentValue);

  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "Error" : a / b;
    case "%": return a % b;
    case "√": return Math.sqrt(b);          // or a if it's unary
    case "Sqr": return b * b;
    case "Sqrt": return Math.sqrt(b);
    default: return b; // default to returning current value
  }
}
