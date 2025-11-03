import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import ManagementTeam from './pages/ManagementTeam';
import Projects from './pages/Projects';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';

// Admin imports
import AdminLayout from './admin/layouts/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import FooterSettings from './admin/pages/FooterSettings';
import ProjectsManagement from './admin/pages/ProjectsManagement';
import FAQSettings from './admin/pages/FAQSettings';
import HomeSettings from './admin/pages/HomeSettings';
import TeamSettings from './admin/pages/TeamSettings';
import PageSettings from './admin/pages/PageSettings';

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
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/home"
          element={
            <AdminLayout>
              <HomeSettings />
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
              <FAQSettings />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <AdminLayout>
              <ProjectsManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/team"
          element={
            <AdminLayout>
              <TeamSettings />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/page-settings"
          element={
            <AdminLayout>
              <PageSettings />
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
          <Route path="/" element={<ProtectedRoute pageKey="home"><Home /></ProtectedRoute>} />
          <Route path="/management-team" element={<ProtectedRoute pageKey="team"><ManagementTeam /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute pageKey="projects"><Projects /></ProtectedRoute>} />
          <Route path="/faq" element={<ProtectedRoute pageKey="faq"><FAQ /></ProtectedRoute>} />
          <Route path="/error/500" element={<ErrorPage code={500} title="Server Error" message="Something went wrong on our end. Please try again later." />} />
          <Route path="/error/503" element={<ErrorPage code={503} title="Service Unavailable" message="The server is temporarily unable to handle your request. Please try again in a few moments." />} />
          <Route path="/error/403" element={<ErrorPage code={403} title="Access Denied" message="You don't have permission to access this resource." />} />
          <Route path="*" element={<NotFound />} />
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
