import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiCall } from '../utils/api';

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      router.push('/login');
    } else {
      setToken(t);
      fetchRestaurants(t);
    }
  }, [router]);

  async function fetchRestaurants(token) {
    try {
      // Ensure your API returns the restaurant's ID as well.
      const data = await apiCall('/restaurants/mine', 'GET', null, token);
      setRestaurants(data.restaurants);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome! Use the links below to manage your restaurant.</p>
      <ul>
        <li>
          <Link href="/restaurants/create">Create Restaurant</Link>
        </li>
        {restaurants.length > 0 && (
          <>
            <li>
              <h3>Your Restaurants:</h3>
              <ul>
                {restaurants.map((restaurant) => (
                  <li key={restaurant.id}>
                    {restaurant.name} -{' '}
                    <Link href={`/menu/${restaurant.id}`}>
                      View Menu
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </>
        )}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
