const db = require('../../lib/database');

export default function handler(req, res) {
    if (req.method === 'GET') {
        const books = db.prepare(`
            SELECT books.*, categories.name as category_name 
            FROM books 
            LEFT JOIN categories ON books.category_id = categories.id
            ORDER BY books.created_at DESC
          `).all();
            res.status(200).json(books);
    }
    else if (req.method === 'POST') {
        // FIX 1: Extract category_id from request body
        const { title, description, category_id } = req.body;

        // FIX 2: Update validation to include category_id
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        // FIX 3: Include category_id in the INSERT statement
        const result = db.prepare('INSERT INTO books (title, description, category_id) VALUES (?, ?, ?)')
            .run(title, description, category_id);

        // FIX 4: Get the newly created BOOK (not expense)
        const newBook = db.prepare('SELECT * FROM books WHERE id = ?')
            .get(result.lastInsertRowid);

        res.status(201).json(newBook);
    }
}