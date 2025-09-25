import { useEffect, useState } from "react"

export default function BookStore() {

  
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        fetchBooks()
        fetchCategories()
    }, []);

    const fetchBooks = async () => {
        try {
          const response = await fetch('/api/books');
          const data = await response.json();
          setBooks(data);
        } catch (error) {
          console.error('Error fetching expenses:', error);
        }
      };

      const fetchCategories = async () => {
        try {
          const response = await fetch('/api/categories');
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
    };

    const handleDelete = async (bookId) => {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchBooks()
      }
    }


    const handleEdit = (book) => {
      setEditingId(book.id);
      setTitle(book.title);
      setDescription(book.description);
      setCategoryId(book.category_id);
    }


    const handleUpdate = async (e) => {
      e.preventDefault();
      const response = await fetch(`/api/books/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ title, description, category_id: parseInt(categoryId)})
      });
      if (response.ok) {
        setTitle('');
    setDescription('');
    setCategoryId('');
    setEditingId(null);
    fetchBooks();
      }
    }

    const cancelEdit = () => {
      setTitle('');
      setDescription('');
      setCategoryId('');
      setEditingId(null);
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Add this console.log to debug what you're sending
      console.log('Submitting:', { title, description, category_id: parseInt(categoryId) });
      
      const response = await fetch('/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
              title, 
              description, 
              category_id: parseInt(categoryId)  // Make sure this is here
          }),
      });
  
      if (response.ok) {
          setTitle('');
          setDescription('');
          setCategoryId('');  // Reset category selection
          fetchBooks();
      }
  }
    return (
        <div>
            <h1>books</h1>


           <form onSubmit={editingId ? handleUpdate : handleSubmit}>
            <label>{editingId ? 'Edit Book' : 'Book Submission'}</label>
            <div>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

            </div>

            <div>
                <label>Description</label>
                <div>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />


                </div>

            </div>

            <div>
                    <label>Category</label>
                    <select 
                        value={categoryId} 
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">
    {editingId ? 'Update' : 'Submit'}
  </button>
  
  {editingId && (
    <button type="button" onClick={cancelEdit}>
      Cancel
    </button>
  )}
          
            </form> 

            <div>
        <h2>Your Books ({books.length})</h2>
        {books.length === 0 ? (
          <p>No books yet</p>
        ) : (
          books.map((book) => (
            <div key={book.id} style={{ 
              border: '1px solid #eee', 
              padding: '15px', 
              marginBottom: '10px',
              borderRadius: '5px'
            }}>
              <h3>{book.title}</h3>
              <p><strong>Category:</strong> {book.category_name || 'No category'}</p>
              <p>{book.description}</p>
              <small>Added: {new Date(book.created_at).toLocaleString()}</small>
              <button
                onClick={() => handleDelete(book.id)}
              >Delete</button>

            <button onClick={() => handleEdit(book)}>Edit</button>
            </div>
          ))
        )}
      </div>

        </div>
    )
}