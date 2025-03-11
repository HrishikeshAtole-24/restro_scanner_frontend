import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiCall } from '../utils/api';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiCall('/register', 'POST', form);
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={form.username}
                 onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email}
                 onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={form.password}
                 onChange={handleChange} required />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="admin">Restaurant Owner</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
