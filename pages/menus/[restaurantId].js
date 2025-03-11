import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiCall } from '../../utils/api';

export default function RestaurantMenu() {
  const router = useRouter();
  const { restaurantId } = router.query;
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!restaurantId) return;
    const fetchMenu = async () => {
      try {
        const data = await apiCall(`/menu/${restaurantId}`);
        setMenu(data.menu);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMenu();
  }, [restaurantId]);

  return (
    <div>
      <h2>Menu</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {menu.map((category, index) => (
        <div key={index}>
          <h3>{category.category}</h3>
          <p>{category.description}</p>
          <ul>
            {category.dishes.map((dish) => (
              <li key={dish.id}>
                {dish.name} - ${dish.price}<br/>
                <small>{dish.description}</small>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
