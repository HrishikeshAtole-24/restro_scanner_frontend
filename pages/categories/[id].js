import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { apiCall } from '../../utils/api';

export default function CategoryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const token = typeof window !== 'undefined' && localStorage.getItem('token');
  const [category, setCategory] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Optionally, fetch category details if an endpoint exists.
  // useEffect(() => {
  //   if (id) {
  //     // fetch category details and set state.
  //   }
  // }, [id]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await apiCall(`/categories/${id}`, 'PUT', category, token);
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await apiCall(`/categories/${id}`, 'DELETE', null, token);
      setMessage(data.message);
      // Redirect back to dashboard or a list page
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Category Detail</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={category.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={category.description} onChange={handleChange} />
        </div>
        <button type="submit">Update Category</button>
      </form>
      <button onClick={handleDelete} style={{ marginTop: '10px', background: 'red', color: 'white' }}>
        Delete Category
      </button>
    </div>
  );
}
