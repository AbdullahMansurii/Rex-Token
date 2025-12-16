import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

// Dashboard Pages
import DashboardHome from "./pages/dashboard/Dashboard";
import Packages from "./pages/dashboard/Packages";
import KYC from "./pages/dashboard/KYC";
import Withdrawal from "./pages/dashboard/Withdrawal";
import Downline from "./pages/dashboard/Downline";
import ReferralIncome from "./pages/dashboard/ReferralIncome";
import LevelIncome from "./pages/dashboard/LevelIncome";
import Transactions from "./pages/dashboard/Transactions";
import Profile from "./pages/dashboard/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";
import KycApprovals from "./pages/admin/KycApprovals";
import WithdrawalRequests from "./pages/admin/WithdrawalRequests";
import PackageManagement from "./pages/admin/PackageManagement";
import TransactionMonitor from "./pages/admin/TransactionMonitor";
import ReportsAnalytics from "./pages/admin/ReportsAnalytics";

const ProtectRoute = ({ children, roleRequired }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return children ? children : <Outlet />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* User Dashboard Routes */}
      {/* User Dashboard Routes */}
      <Route element={<ProtectRoute roleRequired="user" />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="packages" element={<Packages />} />
          <Route path="kyc" element={<KYC />} />
          <Route path="withdrawal" element={<Withdrawal />} />
          <Route path="downline" element={<Downline />} />
          <Route path="referral-income" element={<ReferralIncome />} />
          <Route path="level-income" element={<LevelIncome />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectRoute roleRequired="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="kyc-approvals" element={<KycApprovals />} />
          <Route path="withdrawals" element={<WithdrawalRequests />} />
          <Route path="packages" element={<PackageManagement />} />
          <Route path="transactions" element={<TransactionMonitor />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Fallback */}
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
