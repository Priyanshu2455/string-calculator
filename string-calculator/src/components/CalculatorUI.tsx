import React, { useState } from "react";

function add(numbers: string): number {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  let numsStr = numbers;

  // Check for custom delimiter
  if (numbers.startsWith("//")) {
    const match = numbers.match(/^\/\/(.+)\n(.*)$/s);
    if (match) {
      delimiter = new RegExp(match[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      numsStr = match[2];
    }
  }

  const numList = numsStr
    .split(delimiter)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number);

  const negatives = numList.filter((n) => n < 0);
  if (negatives.length > 0) {
    throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
  }

  return numList.reduce((sum, n) => sum + n, 0);
}

const CalculatorUI: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    try {
      const sum = add(input);
      setResult(sum);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>String Calculator</h1>
      <input
        type="text"
        placeholder="Enter numbers (e.g. 1,2,3 or //;\n1;2)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ margin: "10px", padding: "10px", width: "320px" }}
      />
      <button style={{ padding: "10px 20px" }} onClick={handleCalculate}>
        Calculate Sum
      </button>
      {result !== null && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          Result: <strong>{result}</strong>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px", color: "red", fontSize: "16px" }}>
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default CalculatorUI;
