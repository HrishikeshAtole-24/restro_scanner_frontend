import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiCall } from '../../utils/api';

export default function CreateCategory() {
  const [category, setCategory] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { restaurantId } = router.query;
  const token = typeof window !== 'undefined' && localStorage.getItem('token');

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantId) {
      setError('Restaurant ID is missing in query parameters.');
      return;
    }
    try {
      const data = await apiCall(`/restaurants/${restaurantId}/categories`, 'POST', category, token);
      setMessage(data.message + '. Category ID: ' + data.categoryId);
      // Optionally, redirect after successful creation:
      // router.push(`/categories/${data.categoryId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create Category</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={category.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={category.description} onChange={handleChange} />
        </div>
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
}
