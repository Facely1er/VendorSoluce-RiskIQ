import React from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from './AppContext';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './src/components/layout/Footer';
import Toast from './Toast';
import LoadingSpinner from './components/LoadingSpinner';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const { isLoading } = useApp();
  const isHomePage = location.pathname === '/';
  
  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading application..." />;
  }
  
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
