import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Layout from './Layout';
import HomePage from './src/pages/HomePage';
import Dashboard from './Dashboard';
import Vendors from './Vendors';
import Assessments from './Assessments';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/assessments" element={<Assessments />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
