import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    router.push('/login');
  };

  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      <Link href="/">Home</Link>
      {token ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/restaurants/mine">My Restaurants</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
