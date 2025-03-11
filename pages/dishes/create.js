import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiCall } from '../../utils/api';

export default function CreateDish() {
  const [dish, setDish] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { categoryId } = router.query;
  const token = typeof window !== 'undefined' && localStorage.getItem('token');

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId) {
      setError('Category ID is missing in query parameters.');
      return;
    }
    try {
      const data = await apiCall(`/categories/${categoryId}/dishes`, 'POST', dish, token);
      setMessage(data.message + '. Dish ID: ' + data.dishId);
      // Optionally, redirect to the dish detail page:
      // router.push(`/dishes/${data.dishId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create Dish</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={dish.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={dish.description} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" step="0.01" name="price" value={dish.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="image_url" value={dish.image_url} onChange={handleChange} />
        </div>
        <button type="submit">Create Dish</button>
      </form>
    </div>
  );
}
