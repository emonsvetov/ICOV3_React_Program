import React from 'react';
import Topbar from './topbar/Topbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

const PageLayout = () => (
  <main>
      <Topbar />
      <Outlet />
      <Footer />    
  </main>
);

export default PageLayout;