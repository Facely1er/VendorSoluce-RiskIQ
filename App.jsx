import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Vendors from './Vendors';
import Assessments from './Assessments';
import Settings from './Settings';
import UpgradeModal from './UpgradeModal';
import Toast from './Toast';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <UpgradeModal />
        <Toast />
      </Router>
    </AppProvider>
  );
}

export default App;
