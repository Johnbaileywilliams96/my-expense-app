import { useState, useEffect } from 'react';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // GET request - fetch expenses when page loads
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // POST request - submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const newExpense = await response.json();
        setExpenses([newExpense, ...expenses]); // Add to beginning (newest first)
        setTitle(''); // Clear form
        setDescription('');
        alert('Expense added successfully!');
      } else {
        const error = await response.json();
        alert('Error: ' + error.error);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error adding expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>SQLite Expense Tracker</h1>
      
      {/* Form for POST request */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>Add New Expense</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="e.g., Lunch at cafe"
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="Add more details about this expense..."
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>

      {/* Display expenses from GET request */}
      <div>
        <h2>Your Expenses ({expenses.length})</h2>
        {expenses.length === 0 ? (
          <p>No expenses yet. Add one above!</p>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} style={{ 
              border: '1px solid #eee', 
              padding: '15px', 
              marginBottom: '10px',
              borderRadius: '5px'
            }}>
              <h3>{expense.title}</h3>
              <p>{expense.description}</p>
              <small>Added: {new Date(expense.created_at).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}