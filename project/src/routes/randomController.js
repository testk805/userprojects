const getRandomNumberBetween = (num1, num2) => {
  return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
};
const fibonacciSeries = (num, count) => {
  let fib = [num];
  for (let i = 1; i < count; i++) {
    let next = fib[i - 1] + (fib[i - 2] || 0);
    fib.push(next);
  }
  return fib;
};
exports.getRandomNumberAndFibonacci = async (req, res) => {
  const { number1, number2 } = req.query;
  if (!number1 || !number2) {
    console.error("Invalid parameters");
    return res.status(400).json({ error: "Invalid parameters" });
  }
  const num1 = parseInt(number1);
  const num2 = parseInt(number2);
  if (isNaN(num1) || isNaN(num2)) {
    console.error("Parameters must be numbers");
    return res.status(400).json({ error: "Parameters must be numbers" });
  }
  try {
    const randomNumber = getRandomNumberBetween(num1, num2);
    const fibonacciNumbers = fibonacciSeries(num1, 5);
    return res.json({
      randomNumber,
      FibonacciSeriesNumbers: fibonacciNumbers.join(',')
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};