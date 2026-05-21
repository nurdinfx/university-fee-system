import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import SuperAdminDashboard from './pages/dashboard/SuperAdminDashboard';
import Students from './pages/dashboard/Students';
import Teachers from './pages/dashboard/Teachers';
import Courses from './pages/dashboard/Courses';
import Finance from './pages/dashboard/Finance';
import Library from './pages/dashboard/Library';
import Hostel from './pages/dashboard/Hostel';
import Transport from './pages/dashboard/Transport';
import Settings from './pages/dashboard/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <DashboardLayout>
            <SuperAdminDashboard />
          </DashboardLayout>
        } />
        <Route path="/dashboard/students" element={
          <DashboardLayout>
            <Students />
          </DashboardLayout>
        } />
        <Route path="/dashboard/teachers" element={
          <DashboardLayout>
            <Teachers />
          </DashboardLayout>
        } />
        <Route path="/dashboard/courses" element={
          <DashboardLayout>
            <Courses />
          </DashboardLayout>
        } />
        <Route path="/dashboard/finance" element={
          <DashboardLayout>
            <Finance />
          </DashboardLayout>
        } />
        <Route path="/dashboard/library" element={
          <DashboardLayout>
            <Library />
          </DashboardLayout>
        } />
        <Route path="/dashboard/hostel" element={
          <DashboardLayout>
            <Hostel />
          </DashboardLayout>
        } />
        <Route path="/dashboard/transport" element={
          <DashboardLayout>
            <Transport />
          </DashboardLayout>
        } />
        <Route path="/dashboard/settings" element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
