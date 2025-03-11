import Link from 'next/link';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{restaurant.name}</h3>
      <p>{restaurant.description}</p>
      <Link legacyBehavior href={`/restaurants/${restaurant.id}`}>
      View / Edit
      </Link>
    </div>
  );
};

export default RestaurantCard;
