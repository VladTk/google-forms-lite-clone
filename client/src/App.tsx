import React from 'react';
import { Header } from './components';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
