import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

/* Public Pages */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* Dashboard Pages */
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Upload from "./pages/members/Upload";
import MemberProfile from "./pages/members/MemberProfile";
import MemberForm from "./pages/members/MemberForm";
import EditMember from "./pages/members/EditMember";
import Media from "./pages/Media";
import Podcast from "./pages/Podcast";
import SocialHub from "./pages/SocialHub";
import Settings from "./pages/Settings";
import SMS from "./pages/SMS";

/* Protected Route */
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* PROTECTED DASHBOARD ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* MAIN DASHBOARD LANDING PAGE */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* MEMBERS MODULE */}
          <Route path="/dashboard/members" element={<Members />} />
          <Route path="/dashboard/members/upload" element={<Upload />} />
          <Route path="/dashboard/members/new" element={<MemberForm />} />
          <Route path="/dashboard/members/:id" element={<MemberProfile />} />
          <Route path="/dashboard/members/:id/edit" element={<EditMember />} />

          {/* OTHER MODULES */}
          <Route path="/dashboard/media" element={<Media />} />
          <Route path="/dashboard/podcast" element={<Podcast />} />
          <Route path="/dashboard/social" element={<SocialHub />} />
          <Route path="/dashboard/sms" element={<SMS />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
