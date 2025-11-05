import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './src/components/layout/Footer';
import Toast from './Toast';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="app-layout">
      <Header />
      {!isHomePage && <Navigation />}
      <main className={`app-main ${isHomePage ? 'app-main-homepage' : ''}`}>
        {isHomePage ? (
          children
        ) : (
          <div className="container">
            {children}
          </div>
        )}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default Layout;
