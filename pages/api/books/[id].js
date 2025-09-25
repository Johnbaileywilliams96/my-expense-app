const db = require('../../../lib/database');

export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'DELETE') {
    db.prepare('DELETE FROM books WHERE id = ?').run(id);
    res.status(200).json({ message: 'Book deleted' });
  }
}