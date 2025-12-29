import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from './redux/store';

import DashboardLayout from './layout/dashboard';
import LoginPage from './pages/Login';
import Menu1 from './pages/Menu';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
       
        <Route path="menu1" element={<Menu1 />} />
        <Route path="menu2" element={<div style={{ padding: '20px' }}>Menu 2 Content</div>} />
        <Route path="menu3" element={<div style={{ padding: '20px' }}>Menu 3 Content</div>} />
        
        <Route index element={<Navigate to="menu1" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;