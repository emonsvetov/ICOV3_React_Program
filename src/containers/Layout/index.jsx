import React from 'react';
import ParticipantTopbar from './topbar/Participant';
import ManagerTopbar from './topbar/Manager';
import HomeTopbar from './topbar/Home';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

export const ParticipantLayout = () => (
  <main>
      <ParticipantTopbar />
      <Outlet />
      <Footer />    
  </main>
);

export const ManagerLayout = () => (
  <main className='manager'>
      <ManagerTopbar />
      <Outlet />
      <Footer />    
  </main>
);

export const HomeLayout = () => (
  <main className='home'>
      <HomeTopbar />
      <Outlet />
      <Footer />    
  </main>
);
