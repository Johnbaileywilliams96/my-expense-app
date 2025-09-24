const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(process.cwd(), 'expenses.db'));

// Create categories table
db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Create books table
db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Add category_id column if it doesn't exist
try {
    db.exec(`ALTER TABLE books ADD COLUMN category_id INTEGER`);
    console.log('Added category_id column to books table');
} catch (error) {
    // Column already exists, ignore error
    if (!error.message.includes('duplicate column name')) {
        console.error('Error adding column:', error);
    }
}

// Insert default categories
const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)');
const defaultCategories = ['Sci-Fi', 'Drama', 'Mystery', 'Romance', 'Fantasy', 'Non-Fiction', 'Biography'];

defaultCategories.forEach(category => {
    insertCategory.run(category);
});

// Expenses table (unchanged)
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('Database connected and tables created');

module.exports = db;