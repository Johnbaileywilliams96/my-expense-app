import { useEffect, useState } from "react"

export default function BookStore() {
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('')


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

    
      const handleSubmit = async (e) => {
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, category_id: parseInt(categoryId) }),
          });
      
      }

    return (
        <div>
            <h1>books</h1>


           <form onSubmit={handleSubmit}>
            <label>Book Submition</label>
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

            <button
                type="submit"
            >
                    Submit
            </button>
          
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
            </div>
          ))
        )}
      </div>

        </div>
    )
}