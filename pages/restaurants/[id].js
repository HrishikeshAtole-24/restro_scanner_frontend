import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiCall } from '../../utils/api';

export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const token = typeof window !== 'undefined' && localStorage.getItem('token');
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch restaurant details (for example purposes, you might create an API endpoint for details)
  useEffect(() => {
    if (!id) return;
    // For now, we will assume restaurant details are fetched from a custom endpoint
    // Alternatively, maintain the restaurant data in your dashboard.
  }, [id]);

  const handleDelete = async () => {
    try {
      await apiCall(`/restaurants/${id}`, 'DELETE', null, token);
      setMessage('Restaurant deleted successfully');
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Restaurant Detail</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {message && <p style={{color: 'green'}}>{message}</p>}
      {/* Render restaurant details here */}
      <button onClick={handleDelete}>Delete Restaurant</button>
    </div>
  );
}
