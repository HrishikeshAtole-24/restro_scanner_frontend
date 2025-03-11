import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';

export default function CreateItem() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category_id: '',
    item_name: '',
    description: '',
    price: '',
    image_url: '',
    is_available: true,
    sort_order: 0,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.name === 'is_available' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/items', formData);
      alert('Item created with ID ' + res.data.itemId);
      router.push('/items');
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating item');
    }
  };

  return (
    <div>
      <h2>Create Item</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="category_id" placeholder="Category ID" onChange={handleChange} required /><br />
        <input type="text" name="item_name" placeholder="Item Name" onChange={handleChange} required /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange} /><br />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required /><br />
        <input type="text" name="image_url" placeholder="Image URL" onChange={handleChange} /><br />
        <label>
          Available: <input type="checkbox" name="is_available" onChange={handleChange} defaultChecked />
        </label><br />
        <input type="number" name="sort_order" placeholder="Sort Order" onChange={handleChange} /><br />
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
}
