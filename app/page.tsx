import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link 
        href={'/game-room'}
        className='p-2 rounded border bg-orange-400'
      >
        redirect to escape room
      </Link>
    </main>
  );
}
