import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

function Layout() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <main className='w-full max-w-[1400px] mx-auto pt-2 pb-10 flex flex-col px-4 sm:px-6 lg:px-8 flex-1'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
