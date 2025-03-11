import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    price: '',
    image_url: '',
    is_available: true,
    sort_order: 0,
  });

  useEffect(() => {
    if (!id) return;
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        setItem(res.data);
        setFormData({
          item_name: res.data.item_name,
          description: res.data.description,
          price: res.data.price,
          image_url: res.data.image_url,
          is_available: res.data.is_available,
          sort_order: res.data.sort_order,
        });
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching item');
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.name === 'is_available' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/items/${id}`, formData);
      alert('Item updated');
      router.push('/items');
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating item');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="item_name"
          placeholder="Item Name"
          value={formData.item_name}
          onChange={handleChange}
          required
        /><br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        /><br />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        /><br />
        <label>
          Available: <input type="checkbox" name="is_available" checked={formData.is_available} onChange={handleChange} />
        </label><br />
        <input
          type="number"
          name="sort_order"
          placeholder="Sort Order"
          value={formData.sort_order}
          onChange={handleChange}
        /><br />
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
}
