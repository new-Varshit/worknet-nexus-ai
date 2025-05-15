
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/contexts/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Employees from "@/pages/employees/Employees";
import Tasks from "@/pages/tasks/Tasks";
import Attendance from "@/pages/attendance/Attendance";
import LeaveApply from "@/pages/leave/LeaveApply";
import LeaveRequests from "@/pages/leave/LeaveRequests";
import LeaveHistory from "@/pages/leave/LeaveHistory";
import Payroll from "@/pages/payroll/Payroll";
import JobPostings from "@/pages/recruitment/JobPostings";
import Applications from "@/pages/recruitment/Applications";
import InternalJobs from "@/pages/recruitment/InternalJobs";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import PendingApprovals from "@/pages/admin/PendingApprovals";

// Import HR specific pages
import HRDashboard from "@/pages/hr/HRDashboard";
import HRPendingApprovals from "@/pages/hr/HRPendingApprovals";
import CompleteEmploymentInfo from "@/pages/hr/CompleteEmploymentInfo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected routes - all user types */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              
              {/* Dashboard routes - role specific */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              
              {/* Admin and HR specific routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "hr"]} />}>
                <Route path="/employees" element={<Employees />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/recruitment/jobs" element={<JobPostings />} />
                <Route path="/recruitment/applications" element={<Applications />} />
                <Route path="/leave/requests" element={<LeaveRequests />} />
              </Route>

              {/* Admin only routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin/pending-approvals" element={<PendingApprovals />} />
              </Route>
              
              {/* HR only routes - removed pending approvals routes */}
              <Route element={<ProtectedRoute allowedRoles={["hr"]} />}>
                <Route path="/hr/dashboard" element={<HRDashboard />} />
              </Route>
              
              {/* Employee only routes */}
              <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
                <Route path="/leave/apply" element={<LeaveApply />} />
              </Route>

              {/* All user routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "hr", "employee"]} />}>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/leave/history" element={<LeaveHistory />} />
                <Route path="/recruitment/internal" element={<InternalJobs />} />
              </Route>
              
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
