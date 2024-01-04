import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className='container flex items-center p-4 mx-auto min-h-screen justify-center'>
        <main>
          <h1 className='font-mono text-xl code'>
            Welcome to <span className='text-purple-700'>Nextjs</span>,{' '}
            <span className='text-indigo-700'>TailwindCSS</span> and <span className='text-gray-700'>TypeScript</span>
          </h1>
          <p className='text-2xl font-bold underline'>Hello world!</p>
        </main>
      </div>
    </>
  );
}
