import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { apiCall } from '../../utils/api';

export default function DishDetail() {
  const router = useRouter();
  const { id } = router.query;
  const token = typeof window !== 'undefined' && localStorage.getItem('token');
  const [dish, setDish] = useState({ name: '', description: '', price: '', image_url: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Optionally, fetch dish details if an endpoint exists
  // useEffect(() => {
  //   if (id) {
  //     // fetch dish details and update state accordingly.
  //   }
  // }, [id]);

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await apiCall(`/dishes/${id}`, 'PUT', dish, token);
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await apiCall(`/dishes/${id}`, 'DELETE', null, token);
      setMessage(data.message);
      // Redirect to dashboard or list of dishes after deletion
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Dish Detail</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Dish</button>
      </form>
      <button onClick={handleDelete} style={{ marginTop: '10px', background: 'red', color: 'white' }}>
        Delete Dish
      </button>
    </div>
  );
}
