import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, Users, UserPlus, Briefcase, Calendar, CheckCircle2, Clock, 
  FileText, BarChart, PieChart, DollarSign, TrendingUp, TrendingDown, 
  FileCheck, AlertCircle, User, Building, ChevronRight, UserCheck, FileSpreadsheet,
  CircleCheck, CircleDashed, Mail, MessageSquare, Bell, ListChecks
} from "lucide-react";

// Define admin analytics data type
interface AdminAnalyticsData {
  totalEmployees: number;
  newEmployees: number;
  totalHR: number;
  activeJobs: number;
  pendingLeaveRequests: number;
  employeeGrowthRate: number;
  departmentDistribution: { name: string; value: number; }[];
  employeesByMonth: { month: string; count: number; }[];
  taskCompletionRate: number;
  payrollTotal: number;
}

// Define HR analytics data type
interface HRAnalyticsData {
  teamSize: number;
  jobPosts: number;
  pendingLeaveRequests: number;
  assignedTasks: number;
  taskCompletionRate: number;
  employeesByDepartment: { name: string; value: number; }[];
  recentHires: number;
  upcomingReviews: number;
  recruitmentFunnel: {
    applications: number;
    interviews: number;
    offers: number;
    acceptances: number;
  };
}

// Define employee analytics data type
interface EmployeeAnalyticsData {
  tasksCompleted: number;
  tasksInProgress: number;
  tasksDue: number;
  taskProgress: number;
  attendancePercentage: number;
  attendanceStreak: number;
  teamAttendance: number;
  leaveDaysRemaining: number;
  pendingLeaveRequests: number;
  leavesApproved: number;
  internalJobsOpen: number;
  internalJobsApplied: number;
  upcomingDeadlines: number;
  payrollStatus: string;
  upcomingReview: string;
}

// Define a union type for all analytics data
type AnalyticsData = AdminAnalyticsData | HRAnalyticsData | EmployeeAnalyticsData;

// Mock data for admin dashboard
const adminAnalyticsData: AdminAnalyticsData = {
  totalEmployees: 124,
  newEmployees: 8,
  totalHR: 5,
  activeJobs: 12,
  pendingLeaveRequests: 7,
  employeeGrowthRate: 12.5,
  departmentDistribution: [
    { name: "Engineering", value: 45 },
    { name: "Marketing", value: 20 },
    { name: "Sales", value: 25 },
    { name: "HR", value: 5 },
    { name: "Finance", value: 15 },
    { name: "Operations", value: 14 },
  ],
  employeesByMonth: [
    { month: "Jan", count: 100 },
    { month: "Feb", count: 105 },
    { month: "Mar", count: 110 },
    { month: "Apr", count: 115 },
    { month: "May", count: 120 },
    { month: "Jun", count: 124 },
  ],
  taskCompletionRate: 87,
  payrollTotal: 450000,
};

// Mock data for HR dashboard
const hrAnalyticsData: HRAnalyticsData = {
  teamSize: 45,
  jobPosts: 8,
  pendingLeaveRequests: 5,
  assignedTasks: 12,
  taskCompletionRate: 78,
  employeesByDepartment: [
    { name: "Engineering", value: 20 },
    { name: "Marketing", value: 10 },
    { name: "Sales", value: 15 },
  ],
  recentHires: 3,
  upcomingReviews: 7,
  recruitmentFunnel: {
    applications: 85,
    interviews: 24,
    offers: 12,
    acceptances: 8,
  },
};

// Mock data for employee dashboard
const employeeAnalyticsData: EmployeeAnalyticsData = {
  tasksCompleted: 18,
  tasksInProgress: 5,
  tasksDue: 3,
  taskProgress: 72,
  attendancePercentage: 95,
  attendanceStreak: 14,
  teamAttendance: 92,
  leaveDaysRemaining: 12,
  pendingLeaveRequests: 1,
  leavesApproved: 2,
  internalJobsOpen: 5,
  internalJobsApplied: 2,
  upcomingDeadlines: 2,
  payrollStatus: "Processed on May 28",
  upcomingReview: "June 15",
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<AnalyticsData>(adminAnalyticsData);

  useEffect(() => {
    // Set appropriate data based on user role
    if (user) {
      if (user.role === 'admin') {
        setData(adminAnalyticsData);
      } else if (user.role === 'hr') {
        setData(hrAnalyticsData);
      } else {
        setData(employeeAnalyticsData);
      }
    }
  }, [user]);

  const formatPercent = (value: number) => `${value}%`;

  // Reusable stat card component
  const StatCard = ({ title, value, description, icon, onClick }: { 
    title: string; 
    value: string | number; 
    description: string; 
    icon: React.ReactNode;
    onClick?: () => void;
  }) => (
    <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <h2 className="text-3xl font-bold">{value}</h2>
              {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Admin dashboard components
  const AdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={adminAnalyticsData.totalEmployees}
          description={`+${adminAnalyticsData.newEmployees} this month`}
          icon={<Users className="h-5 w-5" />}
          onClick={() => navigate("/employees")}
        />
        <StatCard
          title="HR Team"
          value={adminAnalyticsData.totalHR}
          description="HR managers"
          icon={<UserCheck className="h-5 w-5" />}
          onClick={() => navigate("/employees")}
        />
        <StatCard
          title="Active Job Posts"
          value={adminAnalyticsData.activeJobs}
          description="Open positions"
          icon={<Briefcase className="h-5 w-5" />}
          onClick={() => navigate("/recruitment/jobs")}
        />
        <StatCard
          title="Pending Leave Requests"
          value={adminAnalyticsData.pendingLeaveRequests}
          description="Awaiting approval"
          icon={<FileText className="h-5 w-5" />}
          onClick={() => navigate("/leave/requests")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Employee Growth</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2">
                <span>+{adminAnalyticsData.employeeGrowthRate}% from last year</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex items-center justify-center">
              <p>Employee growth chart will be here.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee count by department</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex items-center justify-center">
              <p>Department distribution chart will be here.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Overall completion rate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="text-4xl font-bold">{adminAnalyticsData.taskCompletionRate}%</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => navigate("/tasks")}>
              View Tasks
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Payroll Overview</CardTitle>
            <CardDescription>Monthly payroll data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Payroll</p>
                <p className="text-2xl font-bold">${adminAnalyticsData.payrollTotal.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => navigate("/payroll")}>
              View Payroll
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>System activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">New employee onboarded</p>
                  <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">Payroll processed</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 2:15 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-amber-500"></div>
                <div>
                  <p className="text-sm font-medium">New job posting created</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 11:45 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-purple-500"></div>
                <div>
                  <p className="text-sm font-medium">System update completed</p>
                  <p className="text-xs text-muted-foreground">Jun 2, 2025, 9:00 AM</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // HR dashboard components
  const HRDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Team Size"
          value={(data as HRAnalyticsData).teamSize}
          description="Total employees"
          icon={<Users className="h-5 w-5" />}
          onClick={() => navigate("/employees")}
        />
        <StatCard
          title="Job Postings"
          value={(data as HRAnalyticsData).jobPosts}
          description="Active positions"
          icon={<Briefcase className="h-5 w-5" />}
          onClick={() => navigate("/recruitment/jobs")}
        />
        <StatCard
          title="Leave Requests"
          value={(data as HRAnalyticsData).pendingLeaveRequests}
          description="Pending approval"
          icon={<FileText className="h-5 w-5" />}
          onClick={() => navigate("/leave/requests")}
        />
        <StatCard
          title="Tasks"
          value={(data as HRAnalyticsData).assignedTasks}
          description="Assigned tasks"
          icon={<ListChecks className="h-5 w-5" />}
          onClick={() => navigate("/tasks")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Team Composition</CardTitle>
            <CardDescription>Employees by department</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex items-center justify-center">
              <p>Team composition chart will be here.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recruitment Funnel</CardTitle>
            <CardDescription>Current recruitment pipeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold">{(data as HRAnalyticsData).recruitmentFunnel.applications}</div>
                <div className="text-xs text-muted-foreground">Applications</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{(data as HRAnalyticsData).recruitmentFunnel.interviews}</div>
                <div className="text-xs text-muted-foreground">Interviews</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{(data as HRAnalyticsData).recruitmentFunnel.offers}</div>
                <div className="text-xs text-muted-foreground">Offers</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{(data as HRAnalyticsData).recruitmentFunnel.acceptances}</div>
                <div className="text-xs text-muted-foreground">Hires</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Team performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="text-4xl font-bold">{(data as HRAnalyticsData).taskCompletionRate}%</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => navigate("/tasks")}>
              Manage Tasks
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Team activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">New hire onboarded</p>
                  <p className="text-xs text-muted-foreground">Today, 9:30 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">Leave request approved</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 3:45 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-amber-500"></div>
                <div>
                  <p className="text-sm font-medium">Performance review scheduled</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 11:20 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-purple-500"></div>
                <div>
                  <p className="text-sm font-medium">New job application received</p>
                  <p className="text-xs text-muted-foreground">Jun 2, 2025, 2:15 PM</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Employee dashboard components
  const EmployeeDashboard = () => (
    <div className="space-y-6">
      <Card className="shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-10 w-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name || "Employee"}</h2>
              <p className="text-muted-foreground">{user?.position || "Position"} • {user?.department || "Department"}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10">Employee ID: EMP-{user?.id || "001"}</Badge>
                <Badge variant="outline" className="bg-primary/10">Joined: {new Date().toLocaleDateString()}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tasks Completed"
          value={(data as EmployeeAnalyticsData).tasksCompleted}
          description="This month"
          icon={<CheckCircle2 className="h-5 w-5" />}
          onClick={() => navigate("/tasks")}
        />
        <StatCard
          title="Tasks In Progress"
          value={(data as EmployeeAnalyticsData).tasksInProgress}
          description="Active tasks"
          icon={<Clock className="h-5 w-5" />}
          onClick={() => navigate("/tasks")}
        />
        <StatCard
          title="Attendance"
          value={`${(data as EmployeeAnalyticsData).attendancePercentage}%`}
          description="This month"
          icon={<Calendar className="h-5 w-5" />}
          onClick={() => navigate("/attendance")}
        />
        <StatCard
          title="Leave Days Remaining"
          value={(data as EmployeeAnalyticsData).leaveDaysRemaining}
          description="Annual balance"
          icon={<FileText className="h-5 w-5" />}
          onClick={() => navigate("/leave/history")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Task Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Task Progress</div>
                <div className="font-medium">{(data as EmployeeAnalyticsData).taskProgress}%</div>
              </div>
              <Progress value={(data as EmployeeAnalyticsData).taskProgress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="space-y-1 text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-xs text-muted-foreground">To Do</div>
                <div className="text-2xl font-bold">{(data as EmployeeAnalyticsData).tasksDue}</div>
              </div>
              <div className="space-y-1 text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-xs text-muted-foreground">In Progress</div>
                <div className="text-2xl font-bold">{(data as EmployeeAnalyticsData).tasksInProgress}</div>
              </div>
              <div className="space-y-1 text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-xs text-muted-foreground">Completed</div>
                <div className="text-2xl font-bold">{(data as EmployeeAnalyticsData).tasksCompleted}</div>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between text-sm">
                <div>Upcoming Deadlines</div>
                <div className="font-medium text-amber-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {(data as EmployeeAnalyticsData).upcomingDeadlines} tasks
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/tasks")}>
              View All Tasks
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Attendance & Leave</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Current Streak</div>
                <div className="text-2xl font-bold">{(data as EmployeeAnalyticsData).attendanceStreak} days</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm">Team Attendance</div>
              <div className="flex items-center justify-between">
                <Progress value={(data as EmployeeAnalyticsData).teamAttendance} className="h-2 w-3/4" />
                <span className="text-sm font-medium">{(data as EmployeeAnalyticsData).teamAttendance}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Leave Applied</div>
                <div className="text-lg font-medium">{(data as EmployeeAnalyticsData).pendingLeaveRequests} pending</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Leave Approved</div>
                <div className="text-lg font-medium">{(data as EmployeeAnalyticsData).leavesApproved} this month</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/leave/apply")}>
              Apply for Leave
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Internal Job Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm">Open Positions</div>
              <div className="font-medium">{(data as EmployeeAnalyticsData).internalJobsOpen}</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <Briefcase className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Senior Developer</div>
                  <div className="text-xs text-muted-foreground">Engineering Department</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <Briefcase className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Project Manager</div>
                  <div className="text-xs text-muted-foreground">Product Department</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <Briefcase className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="text-sm font-medium">UX Designer</div>
                  <div className="text-xs text-muted-foreground">Design Department</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/recruitment/internal")}>
              View All Openings
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Payroll Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Last Processed</span>
              </div>
              <div className="text-sm font-medium">{(data as EmployeeAnalyticsData).payrollStatus}</div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Next Payment Date</span>
              </div>
              <div className="text-sm font-medium">June 10, 2025</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render the appropriate dashboard based on user role
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your account today.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-0">
            {user?.role === 'admin' ? (
              <AdminDashboard />
            ) : user?.role === 'hr' ? (
              <HRDashboard />
            ) : (
              <EmployeeDashboard />
            )}
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Your recent notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="mt-0.5 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">New comment on your task</p>
                      <p className="text-sm text-muted-foreground">Sarah responded to your query on the "Update Documentation" task</p>
                      <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="mt-0.5 bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">Task assigned</p>
                      <p className="text-sm text-muted-foreground">You have been assigned a new task: "Prepare Quarterly Report"</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="mt-0.5 bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                      <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">Internal job application update</p>
                      <p className="text-sm text-muted-foreground">Your application for Senior Developer has been received</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="mt-0.5 bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                      <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium">Task edited</p>
                      <p className="text-sm text-muted-foreground">The task "Client Meeting Preparation" has been updated by HR</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
