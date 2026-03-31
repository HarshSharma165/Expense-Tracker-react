import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Add Transaction
  const addTransaction = () => {
    if (!text.trim() || !amount) {
      alert("Please enter text and amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      text,
      amount: +amount,
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };

  // Delete Transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  // Calculations
  const amounts = transactions.map((tx) => tx.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0);
  const income = amounts
    .filter((a) => a > 0)
    .reduce((acc, a) => acc + a, 0);
  const expense = amounts
    .filter((a) => a < 0)
    .reduce((acc, a) => acc + a, 0);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      {/* Balance */}
      <div className="balance">
        <h2>Your Balance</h2>
        <h3>Rs.{total}</h3>
      </div>

      {/* Income / Expense */}
      <div className="income-expense">
        <div>
          <h4>Income</h4>
          <p id="income">Rs.{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="expense">Rs.{Math.abs(expense)}</p>
        </div>
      </div>

      {/* Form */}
      <div className="transaction-form">
        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addTransaction}>Add</button>
      </div>

      {/* List */}
      <ul id="transactionList">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className={tx.amount >= 0 ? "income" : "expense"}
          >
            {tx.text}
            <span>
              {tx.amount >= 0 ? "+" : "-"}Rs.{Math.abs(tx.amount)}
            </span>
            <button
              className="delete-btn"
              onClick={() => deleteTransaction(tx.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;