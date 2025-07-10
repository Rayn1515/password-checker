import React, { useState } from 'react';
import './App.css';

const commonPasswords = [
  "123456", "password", "12345678", "qwerty", "123456789",
  "12345", "1234", "111111", "1234567", "dragon", "letmein"
];

function checkStrength(password) {
  let score = 0;
  const feedback = [];

  if (password.length >= 8) score++; else feedback.push("At least 8 characters");
  if (/[a-z]/.test(password)) score++; else feedback.push("No Lowercase letters");
  if (/[A-Z]/.test(password)) score++; else feedback.push("No Uppercase letter");
  if (/\d/.test(password)) score++; else feedback.push("No Numbers");
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++; else feedback.push("No Special characters");
  if (!commonPasswords.includes(password.toLowerCase())) score++; else feedback.push("Avoid common passwords");

  let status = "Weak";
  if (score === 6) status = "Strong";
  else if (score >= 4) status = "Moderate";

  return { score, feedback, status };
}

function App() {
  const [password, setPassword] = useState('');
  const { score, feedback, status } = checkStrength(password);

  const getColor = () => {
    if (score === 6) return 'green';
    if (score >= 4) return 'orange';
    return 'red';
  };

  return (
    <div className="App">
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      {password && (
        <div>
          <p><strong>Status:</strong> <span style={{ color: getColor() }}>{status}</span></p>
          <div className="bar-container">
            <div className="bar" style={{ width: `${(score / 6) * 100}%`, backgroundColor: getColor() }}></div>
          </div>
          <ul>
            {feedback.map((item, i) => (
              <li key={i}>⚠️ {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
