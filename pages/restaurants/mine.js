import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { apiCall } from '../../utils/api';

export default function MyRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchRestaurants() {
      try {
        const data = await apiCall('/restaurants/mine', 'GET', null, token);
        setRestaurants(data.restaurants);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchRestaurants();
  }, [router]);

  return (
    <div>
      <h2>My Restaurants</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Website</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, idx) => (
              <tr key={idx}>
                <td>{restaurant.name}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.phone}</td>
                <td>{restaurant.email}</td>
                <td>{restaurant.website}</td>
                <td>
                  {restaurant.qrCode ? (
                    <img 
                      src={restaurant.qrCode} 
                      alt="QR Code" 
                      style={{ width: '100px', height: '100px' }}
                    />
                  ) : (
                    'No QR Code'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
