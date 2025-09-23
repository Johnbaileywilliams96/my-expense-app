const db = require('../../lib/database');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get all expenses from database, newest first
      const expenses = db.prepare('SELECT * FROM expenses ORDER BY created_at DESC').all();
      res.status(200).json(expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  } 
  else if (req.method === 'POST') {
    try {
      const { title, description } = req.body;
      
      // Validate input
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }
      
      // Insert new expense
      const result = db.prepare('INSERT INTO expenses (title, description) VALUES (?, ?)')
                       .run(title, description);
      
      // Get the newly created expense
      const newExpense = db.prepare('SELECT * FROM expenses WHERE id = ?')
                           .get(result.lastInsertRowid);
      
      res.status(201).json(newExpense);
    } catch (error) {
      console.error('Error adding expense:', error);
      res.status(500).json({ error: 'Failed to add expense' });
    }
  } 
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}