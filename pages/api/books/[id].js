const db = require('../../../lib/database');

export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'DELETE') {
    db.prepare('DELETE FROM books WHERE id = ?').run(id);
    res.status(200).json({ message: 'Book deleted' });
  }
  else if  (req.method === 'PUT') {
    const {title, description, category_id} = req.body;

    db.prepare('UPDATE books SET title = ?, description = ?, category_id = ? WHERE id = ?')
      .run(title, description, category_id, id);
    
    res.status(200).json({ message: 'Book updated' });
  }
}