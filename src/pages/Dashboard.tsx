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
  CircleCheck, CircleDashed, Mail, MessageSquare
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

// Type definitions for analytics data
type ApplicationStatus = 'Pending' | 'Shortlisted' | 'Rejected' | 'Hired';

type CommonAnalyticsData = {
  attendancePercentage: number;
  pendingLeaveRequests: number;
};

type AdminAnalyticsData = CommonAnalyticsData & {
  employeeCount: number;
  employeeChangeRate: number;
  newHires: number;
  hrCount: number;
  currentAttendance: number;
  completedTasks: number;
  openPositions: number;
  internalApplicants: number;
  revenueGrowth: number;
  costReduction: number;
  monthlyRevenueData: Array<{ name: string; revenue: number }>;
  salaryDistribution: Array<{ name: string; value: number }>;
  performanceStats: Array<{ name: string; performance: number }>;
  applicationsToReview: number;
  interviewsScheduled: number;
  attendanceData: Array<{ name: string; value: number }>;
  employeeDistribution: Array<{ name: string; value: number }>;
  tasksInProgress: number;
  tasksCompleted: number;
};

type HRAnalyticsData = CommonAnalyticsData & {
  employeesManagedCount: number;
  openJobPosts: number;
  tasksAssigned: number;
  applicationsToReview: number;
  interviewsScheduled: number;
  leaveRequestsApproved: number;
  upcomingPayrolls: number;
  teamAttendance: number;
  resumes: number;
  internalJobApplicants: number;
  tasksInProgress: number;
  tasksCompleted: number;
  employeeDistribution: Array<{ name: string; value: number }>;
  attendanceData: Array<{ name: string; value: number }>;
};

type EmployeeAnalyticsData = CommonAnalyticsData & {
  tasksCompleted: number;
  tasksInProgress: number;
  upcomingDeadlines: number;
  leaveDaysRemaining: number;
  leavesApproved: number;
  teamAttendance: number;
  internalJobsOpen: number;
  tasksDue: number;
  taskProgress: number;
  attendanceStreak: number;
  payrollStatus: string;
  upcomingReview: string | null;
};

type AnalyticsData = AdminAnalyticsData | HRAnalyticsData | EmployeeAnalyticsData;

// Mock data for different user roles
const adminAnalyticsData: AdminAnalyticsData = {
  employeeCount: 156,
  employeeChangeRate: 4.2,
  newHires: 8,
  hrCount: 6,
  currentAttendance: 132,
  attendancePercentage: 87,
  pendingLeaveRequests: 12,
  completedTasks: 85,
  openPositions: 7,
  internalApplicants: 9,
  revenueGrowth: 12.5,
  costReduction: 8.7,
  monthlyRevenueData: [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 4200 },
    { name: 'Mar', revenue: 5100 },
    { name: 'Apr', revenue: 4800 },
    { name: 'May', revenue: 5400 },
    { name: 'Jun', revenue: 6200 },
  ],
  salaryDistribution: [
    { name: 'Executive', value: 28 },
    { name: 'Management', value: 15 },
    { name: 'Engineering', value: 35 },
    { name: 'Marketing', value: 12 },
    { name: 'Support', value: 10 },
  ],
  performanceStats: [
    { name: 'Engineering', performance: 92 },
    { name: 'Marketing', performance: 85 },
    { name: 'Sales', performance: 78 },
    { name: 'Support', performance: 88 },
    { name: 'HR', performance: 90 },
  ],
  applicationsToReview: 23,
  interviewsScheduled: 7,
  attendanceData: [
    { name: 'Present', value: 132 },
    { name: 'Absent', value: 12 },
    { name: 'Leave', value: 12 },
  ],
  employeeDistribution: [
    { name: 'Engineering', value: 42 },
    { name: 'Marketing', value: 28 },
    { name: 'Sales', value: 30 },
    { name: 'Support', value: 25 },
    { name: 'HR', value: 15 },
    { name: 'Finance', value: 16 },
  ],
  tasksInProgress: 46,
  tasksCompleted: 85,
};

const hrAnalyticsData: HRAnalyticsData = {
  employeesManagedCount: 34,
  openJobPosts: 4,
  tasksAssigned: 28,
  pendingLeaveRequests: 7,
  applicationsToReview: 16,
  interviewsScheduled: 3,
  leaveRequestsApproved: 5,
  upcomingPayrolls: 1,
  teamAttendance: 92,
  resumes: 27,
  internalJobApplicants: 4,
  attendancePercentage: 92,
  tasksInProgress: 18,
  tasksCompleted: 32,
  employeeDistribution: [
    { name: 'Engineering', value: 12 },
    { name: 'Marketing', value: 8 },
    { name: 'Sales', value: 10 },
    { name: 'Support', value: 4 },
  ],
  attendanceData: [
    { name: 'Present', value: 31 },
    { name: 'Absent', value: 2 },
    { name: 'Leave', value: 1 },
  ],
};

const employeeAnalyticsData: EmployeeAnalyticsData = {
  tasksCompleted: 18,
  tasksInProgress: 3,
  upcomingDeadlines: 2,
  attendancePercentage: 96,
  leaveDaysRemaining: 12,
  leavesApproved: 2,
  teamAttendance: 90,
  internalJobsOpen: 3,
  pendingLeaveRequests: 1,
  tasksDue: 2,
  taskProgress: 82,
  attendanceStreak: 14,
  payrollStatus: "Processed on May 10",
  upcomingReview: "June 15, 2025",
};

// BSON colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

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

  const StatCard = ({ 
    title, 
    value, 
    description, 
    icon, 
    trend, 
    onClick 
  }: { 
    title: string; 
    value: string | number; 
    description?: string; 
    icon: React.ReactNode; 
    trend?: { value: number; label: string } 
    onClick?: () => void
  }) => (
    <Card 
      className={`shadow-sm hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 p-1.5 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className="flex items-center gap-1 mt-2 text-xs">
            {trend.value > 0 ? (
              <div className="text-green-500 flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" />
                <span>{trend.value}%</span>
              </div>
            ) : (
              <div className="text-red-500 flex items-center gap-0.5">
                <TrendingDown className="h-3 w-3" />
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Shared components

  // Admin dashboard components
  const AdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={(data as AdminAnalyticsData).employeeCount}
          description="Company-wide"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: (data as AdminAnalyticsData).employeeChangeRate, label: "vs last month" }}
          onClick={() => navigate("/employees")}
        />
        <StatCard
          title="Total HRs"
          value={(data as AdminAnalyticsData).hrCount}
          description="Across departments"
          icon={<UserCheck className="h-5 w-5" />}
          onClick={() => navigate("/employees")}
        />
        <StatCard
          title="Current Openings"
          value={(data as AdminAnalyticsData).openPositions}
          description="Active job postings"
          icon={<Briefcase className="h-5 w-5" />}
          onClick={() => navigate("/recruitment/jobs")}
        />
        <StatCard
          title="Internal Applicants"
          value={(data as AdminAnalyticsData).internalApplicants}
          description="From current employees"
          icon={<UserPlus className="h-5 w-5" />}
          onClick={() => navigate("/recruitment/applications")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Financial Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Revenue Growth</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{(data as AdminAnalyticsData).revenueGrowth}%</div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Cost Reduction</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{(data as AdminAnalyticsData).costReduction}%</div>
                  <TrendingDown className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>
            
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={(data as AdminAnalyticsData).monthlyRevenueData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#0088FE" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Salary Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={(data as AdminAnalyticsData).salaryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(data as AdminAnalyticsData).salaryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Today's Attendance</div>
              <div className="font-medium">{(data as AdminAnalyticsData).currentAttendance} / {(data as AdminAnalyticsData).employeeCount}</div>
            </div>
            <Progress value={(data as AdminAnalyticsData).attendancePercentage} className="h-2" />
            <div className="text-xs text-muted-foreground text-right">
              {(data as AdminAnalyticsData).attendancePercentage}% present
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/attendance")}>
              View Details
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Department Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(data as AdminAnalyticsData).performanceStats.slice(0, 3).map((dept, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div>{dept.name}</div>
                  <div className="font-medium">{dept.performance}%</div>
                </div>
                <Progress value={dept.performance} className="h-2" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Departments
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Leave Requests</span>
              </div>
              <Badge>{data.pendingLeaveRequests}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <FileCheck className="h-4 w-4 text-muted-foreground" />
                <span>Applications to Review</span>
              </div>
              <Badge>{(data as AdminAnalyticsData).applicationsToReview}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Interviews Scheduled</span>
              </div>
              <Badge>{(data as AdminAnalyticsData).interviewsScheduled}</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Review All
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={(data as AdminAnalyticsData).attendanceData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#0088FE" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={(data as AdminAnalyticsData).employeeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(data as AdminAnalyticsData).employeeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">New employee onboarded</div>
                  <div className="text-sm text-muted-foreground">Sarah Johnson joined as Senior Developer</div>
                </div>
                <div className="text-sm text-muted-foreground">2h ago</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Leave request approved</div>
                  <div className="text-sm text-muted-foreground">Mike's vacation request for next week</div>
                </div>
                <div className="text-sm text-muted-foreground">4h ago</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">New job posted</div>
                  <div className="text-sm text-muted-foreground">Marketing Manager position opened by HR</div>
                </div>
                <div className="text-sm text-muted-foreground">6h ago</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Applications reviewed</div>
                  <div className="text-sm text-muted-foreground">{(data as AdminAnalyticsData).applicationsToReview} new applications for Developer role</div>
                </div>
                <div className="text-sm text-muted-foreground">Yesterday</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Activities
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );

  // HR dashboard components
  const HRDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Employees Managed"
          value={(data as HRAnalyticsData).employeesManagedCount}
          description="Under your department"
          icon={<Users className="h-5 w-5" />}
          onClick={() => navigate("/employees")}
        />
        <StatCard
          title="Job Posts Open"
          value={(data as HRAnalyticsData).openJobPosts}
          description="Active positions"
          icon={<Briefcase className="h-5 w-5" />}
          onClick={() => navigate("/recruitment/jobs")}
        />
        <StatCard
          title="Tasks Assigned"
          value={(data as HRAnalyticsData).tasksAssigned}
          description="Across all employees"
          icon={<CheckCircle2 className="h-5 w-5" />}
          onClick={() => navigate("/tasks")}
        />
        <StatCard
          title="Pending Leave Requests"
          value={data.pendingLeaveRequests}
          description="Awaiting your approval"
          icon={<Calendar className="h-5 w-5" />}
          onClick={() => navigate("/leave/requests")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recruitment Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Resumes Received</div>
                <div className="text-2xl font-bold">{(data as HRAnalyticsData).resumes}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Applications Pending</div>
                <div className="text-2xl font-bold">{(data as HRAnalyticsData).applicationsToReview}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Interviews Scheduled</div>
                <div className="text-2xl font-bold">{(data as HRAnalyticsData).interviewsScheduled}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Internal Applications</div>
                <div className="text-2xl font-bold">{(data as HRAnalyticsData).internalJobApplicants}</div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/recruitment/applications")}>
                Review Applications
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Team Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Today's Attendance Rate</div>
                  <div className="font-medium">{(data as HRAnalyticsData).teamAttendance}%</div>
                </div>
                <Progress value={(data as HRAnalyticsData).teamAttendance} className="h-2" />
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={(data as HRAnalyticsData).attendanceData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0088FE" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/attendance")}>
              View Details
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Task Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <CircleDashed className="h-4 w-4 text-orange-500" />
                  <span>In Progress</span>
                </div>
                <div className="font-medium">{(data as HRAnalyticsData).tasksInProgress}</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <CircleCheck className="h-4 w-4 text-green-500" />
                  <span>Completed</span>
                </div>
                <div className="font-medium">{(data as HRAnalyticsData).tasksCompleted}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/tasks")}>
              Manage Tasks
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Leave Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm">Pending Requests</div>
              <div className="font-medium">{data.pendingLeaveRequests}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Approved This Week</div>
              <div className="font-medium">{(data as HRAnalyticsData).leaveRequestsApproved}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/leave/requests")}>
              Review Requests
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Payroll Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm">Next Payroll Run</div>
              <div className="font-medium">May 25, 2025</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Payrolls Pending</div>
              <div className="font-medium">{(data as HRAnalyticsData).upcomingPayrolls}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/payroll")}>
              Process Payroll
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={(data as HRAnalyticsData).employeeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(data as HRAnalyticsData).employeeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid
