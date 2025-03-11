import { useState } from 'react';
import api from '../services/api';

export default function QRCodeGenerator() {
  const [formData, setFormData] = useState({ restaurant_id: '', menu_id: '', qr_code_data: '' });
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/qrcodes', formData);
      setQrCodeImage(res.data.qrCodeImage);
    } catch (err) {
      setError(err.response?.data?.error || 'Error generating QR Code');
    }
  };

  return (
    <div>
      <h2>Generate QR Code</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="restaurant_id" placeholder="Restaurant ID" onChange={handleChange} required /><br />
        <input type="text" name="menu_id" placeholder="Menu ID" onChange={handleChange} required /><br />
        <input type="text" name="qr_code_data" placeholder="QR Code Data" onChange={handleChange} required /><br />
        <button type="submit">Generate QR Code</button>
      </form>
      {qrCodeImage && (
        <div>
          <h3>Your QR Code:</h3>
          <img src={qrCodeImage} alt="QR Code" style={{ maxWidth: '200px' }} />
        </div>
      )}
    </div>
  );
}
