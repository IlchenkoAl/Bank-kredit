import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    axios.get('/admin/calculations')
        .then(response => {
          setCalculations(response.data);
        })
        .catch(error => {
          console.error('Error fetching calculations:', error);
        });
  }, []);

  const exportData = () => {
    window.location.href = '/admin/calculations/export';
  };

  return (
      <div>
        <h1>Admin Panel</h1>
        <button onClick={exportData}>Export Data to CSV</button>
        <table>
          <thead>
          <tr>
            <th>Email</th>
            <th>Loan Amount</th>
            <th>Interest Rate</th>
            <th>Term (Years)</th>
            <th>Monthly Payment</th>
            <th>Total Payment</th>
            <th>Required Income</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {calculations.map(calc => (
              <tr key={calc._id}>
                <td>{calc.email}</td>
                <td>{calc.loanAmount}</td>
                <td>{calc.interestRate}</td>
                <td>{calc.term}</td>
                <td>{calc.monthlyPayment}</td>
                <td>{calc.totalPayment}</td>
                <td>{calc.requiredIncome}</td>
                <td>{new Date(calc.date).toLocaleDateString()}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default AdminPanel;
