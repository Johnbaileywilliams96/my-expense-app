const db = require('../../lib/database');

export default function handler(req, res) {
    if (req.method === 'GET') {
            const books = db.prepare('SELECT * FROM books ORDER BY created_at DESC').all();
            res.status(200).json(books);
    }
    else if (req.method === 'POST') {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
          }
          const result = db.prepare('INSERT INTO books (title, description) VALUES (?, ?)')
          .run(title, description);

// Get the newly created expense
const newBook = db.prepare('SELECT * FROM books WHERE id = ?')
              .get(result.lastInsertRowid);

res.status(201).json(newBook);
    }
}