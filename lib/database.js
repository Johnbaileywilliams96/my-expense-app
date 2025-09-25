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

// Create books table WITH category_id from the beginning
db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    )
`);

// Insert default categories
const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)');
const defaultCategories = ['Sci-Fi', 'Drama', 'Mystery', 'Romance', 'Fantasy', 'Non-Fiction', 'Biography'];

defaultCategories.forEach(category => {
    insertCategory.run(category);
});

// Expenses table
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);


db.exec(`
  Create TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

console.log('Database connected and tables created');

module.exports = db;