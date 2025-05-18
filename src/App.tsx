import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import AppRoutes from './AppRoutes';
import { TicketProvider } from './context/TicketContext';

import './components/global.scss';
import './components/utils.scss';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminOrAccountPage =
    location.pathname.startsWith('/admin') || location.pathname === '/user-account';

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div style={{ backgroundColor: '#EBE6E2', minHeight: '100vh' }}>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1 container-fluid px-0">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <TicketProvider>
    <Router basename="/open-campus">
      <AppContent />
    </Router>
  </TicketProvider>
);

export default App;
