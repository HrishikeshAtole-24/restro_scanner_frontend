import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to QR Menu Generator</h1>
      <p>
        <Link href="/login">Login</Link> |{' '}
        <Link href="/register">Register</Link>
      </p>
    </div>
  );
}
