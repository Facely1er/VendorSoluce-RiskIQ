import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './Layout';
import HomePage from './src/pages/HomePage';
import Dashboard from './Dashboard';
import Vendors from './Vendors';
import Assessments from './Assessments';
import Settings from './Settings';
import Analytics from './Analytics';
import Reports from './Reports';
import Data from './Data';
import UpgradeModal from './UpgradeModal';
import Toast from './Toast';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/data" element={<Data />} />
            </Routes>
          </Layout>
          <UpgradeModal />
          <Toast />
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
