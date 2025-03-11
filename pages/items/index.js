import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../services/api';

export default function Items() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('/items/category/1');
        setItems(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching items');
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Items</h2>
      <Link legacyBehavior href="/items/create">
        Create New Item
      </Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.item_name} - ${item.price}{' '}
            <Link legacyBehavior href={`/items/${item.id}`}>
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
