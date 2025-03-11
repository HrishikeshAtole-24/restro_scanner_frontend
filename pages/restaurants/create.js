import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiCall } from '../../utils/api';

export default function CreateRestaurant() {
  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: ''
  });
  const [message, setMessage] = useState('');
  const [qrCodeURL, setQrCodeURL] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const token = typeof window !== 'undefined' && localStorage.getItem('token');

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiCall('/restaurants', 'POST', restaurant, token);
      setMessage(data.message);
      setQrCodeURL(data.qrCode);
      // Optionally redirect or reset the form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create Restaurant</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={restaurant.name}
                 onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={restaurant.description}
                    onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={restaurant.address}
                 onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={restaurant.phone}
                 onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={restaurant.email}
                 onChange={handleChange} required />
        </div>
        <div>
          <label>Website:</label>
          <input type="text" name="website" value={restaurant.website}
                 onChange={handleChange} />
        </div>
        <button type="submit">Create</button>
      </form>
      {qrCodeURL && (
        <div>
          <h3>QR Code URL:</h3>
          <p>{qrCodeURL}</p>
          {/* You might display the QR code image using an <img> tag if you convert Base64 data */}
        </div>
      )}
    </div>
  );
}
