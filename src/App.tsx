import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import ManagementTeam from './pages/ManagementTeam';
import Projects from './pages/Projects';
import FAQ from './pages/FAQ';

// Admin imports
import AdminLayout from './admin/layouts/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import FooterSettings from './admin/pages/FooterSettings';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin routes - no navbar/footer
  if (isAdminRoute) {
    return (
      <Routes location={location}>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/footer"
          element={
            <AdminLayout>
              <FooterSettings />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/faq"
          element={
            <AdminLayout>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="font-serif text-3xl font-bold text-text-primary mb-4">
                  FAQ Settings
                </h1>
                <p className="font-sans text-text-secondary">
                  FAQ configuration page coming soon...
                </p>
              </div>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <AdminLayout>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="font-serif text-3xl font-bold text-text-primary mb-4">
                  Projects Management
                </h1>
                <p className="font-sans text-text-secondary">
                  Projects management page coming soon...
                </p>
              </div>
            </AdminLayout>
          }
        />
      </Routes>
    );
  }

  // Public routes - with navbar/footer
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main key={location.pathname} className="flex-grow page-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/management-team" element={<ManagementTeam />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
