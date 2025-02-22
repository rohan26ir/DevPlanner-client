import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <header className='bg-white text-black '>
        <Navbar></Navbar>
      </header>

      <main className='md:min-h-screen bg-gray-100'>
        <Outlet></Outlet>
      </main>

      <footer>
        <Footer></Footer>
        
      </footer>
    </div>
  );
};

export default MainLayout;