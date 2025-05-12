
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/contexts/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";

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
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected routes - all user types */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
              </Route>
              
              {/* Admin and HR specific routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "hr"]} />}>
                {/* These routes will be implemented later */}
                <Route path="/employees" element={<Dashboard />} />
                <Route path="/payroll" element={<Dashboard />} />
                <Route path="/recruitment/jobs" element={<Dashboard />} />
                <Route path="/recruitment/applications" element={<Dashboard />} />
                <Route path="/leave/requests" element={<Dashboard />} />
              </Route>
              
              {/* Admin only routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                {/* Admin exclusive routes */}
              </Route>
              
              {/* HR only routes */}
              <Route element={<ProtectedRoute allowedRoles={["hr"]} />}>
                {/* HR exclusive routes */}
              </Route>
              
              {/* Employee only routes */}
              <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
                <Route path="/leave/apply" element={<Dashboard />} />
              </Route>

              {/* All user routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "hr", "employee"]} />}>
                <Route path="/tasks" element={<Dashboard />} />
                <Route path="/attendance" element={<Dashboard />} />
                <Route path="/leave/history" element={<Dashboard />} />
                <Route path="/recruitment/internal" element={<Dashboard />} />
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
