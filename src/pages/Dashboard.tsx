
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  Users, 
  Clock, 
  BarChart3, 
  FileText, 
  BriefcaseBusiness, 
  Calendar, 
  DollarSign, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  X as XCircle,
  Building,
  MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Define common types for different analytics properties
interface CommonAnalyticsData {
  employeeCount: number;
  employeeChangeRate: number;
  newHires: number;
  currentAttendance: number;
  attendancePercentage: number;
  pendingLeaveRequests: number;
  openPositions: number;
  revenueGrowth: number;
  costReduction: number;
  monthlyRevenueData: Array<{ month: string; revenue: number }>;
  salaryDistribution: Array<{ name: string; value: number }>;
  performanceStats: Array<{ name: string; value: number }>;
  tasksCompleted: number;
  tasksInProgress: number;
  upcomingDeadlines: number;
  leaveDaysRemaining: number;
  leavesApproved: number;
  teamAttendance: number;
  teamPerformance: number;
  taskDistribution: Array<{ name: string; value: number }>;
  recentActivities: Array<{ title: string; description: string; date: string }>;
  applicationsToReview: number;
  interviewsScheduled: number;
  candidatesShortlisted: number;
  attendanceData: Array<{ day: string; present: number; absent: number }>;
  employeeDistribution: Array<{ name: string; value: number }>;
  completedTasks: number;
}

// Define role-specific analytics data interfaces
interface AdminAnalyticsData extends CommonAnalyticsData {}
interface HRAnalyticsData extends CommonAnalyticsData {}
interface EmployeeAnalyticsData extends CommonAnalyticsData {}

type AnalyticsDataByRole = {
  admin: AdminAnalyticsData;
  hr: HRAnalyticsData;
  employee: EmployeeAnalyticsData;
}

// Analytics data based on user role
const analyticsData: AnalyticsDataByRole = {
  admin: {
    employeeCount: 87,
    employeeChangeRate: 5.2,
    newHires: 7,
    currentAttendance: 81,
    attendancePercentage: 93,
    pendingLeaveRequests: 8,
    completedTasks: 142,
    openPositions: 12,
    revenueGrowth: 18.4,
    costReduction: 12.7,
    performanceStats: [
      { name: 'Excellent', value: 30 },
      { name: 'Good', value: 45 },
      { name: 'Average', value: 20 },
      { name: 'Below Avg', value: 5 },
    ],
    monthlyRevenueData: [
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 52000 },
      { month: 'Mar', revenue: 49000 },
      { month: 'Apr', revenue: 63000 },
      { month: 'May', revenue: 58000 },
      { month: 'Jun', revenue: 72000 },
    ],
    salaryDistribution: [
      { name: 'Engineering', value: 45 },
      { name: 'Marketing', value: 15 },
      { name: 'HR', value: 10 },
      { name: 'Finance', value: 15 },
      { name: 'Operations', value: 15 },
    ],
    // Employee role properties
    tasksCompleted: 142,
    tasksInProgress: 10,
    upcomingDeadlines: 5,
    leaveDaysRemaining: 15,
    leavesApproved: 5,
    teamAttendance: 95,
    teamPerformance: 92,
    taskDistribution: [
      { name: 'Completed', value: 142 },
      { name: 'In Progress', value: 10 },
      { name: 'Todo', value: 12 },
      { name: 'Blocked', value: 3 },
    ],
    recentActivities: [
      { title: 'System Update', description: 'Updated system to version 2.1', date: '1 hour ago' },
      { title: 'New Employee', description: 'Onboarded 2 new developers', date: '3 hours ago' },
      { title: 'Financial Report', description: 'Q2 report review completed', date: '1 day ago' },
      { title: 'Security Audit', description: 'Completed annual security audit', date: '2 days ago' },
    ],
    // HR role properties
    applicationsToReview: 24,
    interviewsScheduled: 5,
    candidatesShortlisted: 13,
    attendanceData: [
      { day: 'Mon', present: 85, absent: 2 },
      { day: 'Tue', present: 82, absent: 5 },
      { day: 'Wed', present: 83, absent: 4 },
      { day: 'Thu', present: 87, absent: 0 },
      { day: 'Fri', present: 80, absent: 7 },
    ],
    employeeDistribution: [
      { name: 'Engineering', value: 42 },
      { name: 'Marketing', value: 15 },
      { name: 'HR', value: 9 },
      { name: 'Finance', value: 12 },
      { name: 'Operations', value: 9 },
    ]
  },
  hr: {
    employeeCount: 87,
    employeeChangeRate: 5.2,
    newHires: 7,
    pendingLeaveRequests: 8,
    currentAttendance: 81,
    attendancePercentage: 93,
    applicationsToReview: 24,
    interviewsScheduled: 5,
    candidatesShortlisted: 13,
    attendanceData: [
      { day: 'Mon', present: 85, absent: 2 },
      { day: 'Tue', present: 82, absent: 5 },
      { day: 'Wed', present: 83, absent: 4 },
      { day: 'Thu', present: 87, absent: 0 },
      { day: 'Fri', present: 80, absent: 7 },
    ],
    employeeDistribution: [
      { name: 'Engineering', value: 42 },
      { name: 'Marketing', value: 15 },
      { name: 'HR', value: 9 },
      { name: 'Finance', value: 12 },
      { name: 'Operations', value: 9 },
    ],
    // Admin role properties
    openPositions: 12,
    revenueGrowth: 10.5,
    costReduction: 8.3,
    monthlyRevenueData: [
      { month: 'Jan', revenue: 40000 },
      { month: 'Feb', revenue: 45000 },
      { month: 'Mar', revenue: 42000 },
      { month: 'Apr', revenue: 50000 },
      { month: 'May', revenue: 48000 },
      { month: 'Jun', revenue: 55000 },
    ],
    salaryDistribution: [
      { name: 'Engineering', value: 40 },
      { name: 'Marketing', value: 18 },
      { name: 'HR', value: 12 },
      { name: 'Finance', value: 15 },
      { name: 'Operations', value: 15 },
    ],
    performanceStats: [
      { name: 'Excellent', value: 25 },
      { name: 'Good', value: 42 },
      { name: 'Average', value: 24 },
      { name: 'Below Avg', value: 9 },
    ],
    // Employee properties
    completedTasks: 142,
    tasksCompleted: 30,
    tasksInProgress: 5,
    upcomingDeadlines: 3,
    leaveDaysRemaining: 18,
    leavesApproved: 12,
    teamAttendance: 93,
    teamPerformance: 90,
    taskDistribution: [
      { name: 'Completed', value: 30 },
      { name: 'In Progress', value: 5 },
      { name: 'Todo', value: 8 },
      { name: 'Blocked', value: 2 },
    ],
    recentActivities: [
      { title: 'Interview Scheduled', description: 'Senior Developer interview set for tomorrow', date: '2 hours ago' },
      { title: 'Leave Approved', description: 'Approved leave request for John Smith', date: '4 hours ago' },
      { title: 'New Application', description: 'Received 5 new job applications', date: '1 day ago' },
      { title: 'Performance Review', description: 'Completed Q2 performance reviews', date: '3 days ago' },
    ]
  },
  employee: {
    tasksCompleted: 16,
    tasksInProgress: 4,
    upcomingDeadlines: 2,
    attendancePercentage: 96,
    leaveDaysRemaining: 12,
    leavesApproved: 3,
    teamAttendance: 92,
    teamPerformance: 88,
    taskDistribution: [
      { name: 'Completed', value: 16 },
      { name: 'In Progress', value: 4 },
      { name: 'Todo', value: 3 },
      { name: 'Blocked', value: 1 },
    ],
    recentActivities: [
      { title: 'Task Completed', description: 'Updated user documentation', date: '2 hours ago' },
      { title: 'Leave Approved', description: 'Your leave for June 15-16 was approved', date: '1 day ago' },
      { title: 'New Task', description: 'Create wireframes for mobile app', date: '2 days ago' },
      { title: 'Performance Review', description: 'Scheduled for next week', date: '3 days ago' },
    ],
    // Add all missing properties needed by other roles
    employeeCount: 87,
    employeeChangeRate: 0,
    newHires: 0,
    currentAttendance: 1,
    pendingLeaveRequests: 0,
    completedTasks: 16,
    openPositions: 0,
    revenueGrowth: 0,
    costReduction: 0,
    monthlyRevenueData: [
      { month: 'Jan', revenue: 0 },
      { month: 'Feb', revenue: 0 },
      { month: 'Mar', revenue: 0 },
      { month: 'Apr', revenue: 0 },
      { month: 'May', revenue: 0 },
      { month: 'Jun', revenue: 0 },
    ],
    salaryDistribution: [
      { name: 'Engineering', value: 0 },
      { name: 'Marketing', value: 0 },
      { name: 'HR', value: 0 },
      { name: 'Finance', value: 0 },
      { name: 'Operations', value: 0 },
    ],
    performanceStats: [
      { name: 'Excellent', value: 0 },
      { name: 'Good', value: 0 },
      { name: 'Average', value: 0 },
      { name: 'Below Avg', value: 0 },
    ],
    applicationsToReview: 0,
    interviewsScheduled: 0,
    candidatesShortlisted: 0,
    attendanceData: [
      { day: 'Mon', present: 0, absent: 0 },
      { day: 'Tue', present: 0, absent: 0 },
      { day: 'Wed', present: 0, absent: 0 },
      { day: 'Thu', present: 0, absent: 0 },
      { day: 'Fri', present: 0, absent: 0 },
    ],
    employeeDistribution: [
      { name: 'Engineering', value: 0 },
      { name: 'Marketing', value: 0 },
      { name: 'HR', value: 0 },
      { name: 'Finance', value: 0 },
      { name: 'Operations', value: 0 },
    ]
  }
};

// Colors for charts
const COLORS = ['#0F62FE', '#4589FF', '#78A9FF', '#A6C8FF', '#D0E2FF'];

const Dashboard = () => {
  const { user } = useAuth();
  const roleBasedData = user?.role ? analyticsData[user.role as keyof typeof analyticsData] : analyticsData.employee;
  const [timeOfDay, setTimeOfDay] = useState<string>("");
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 17) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);
  
  // Conditional rendering based on user role
  if (user?.role === 'admin') {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Good {timeOfDay}, {user?.name}</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening across your organization today
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button className="shadow-sm">
              <FileText className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
          </div>
        </div>

        {/* Admin Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Employees</CardTitle>
              </div>
              <Badge className="font-normal">+{roleBasedData.employeeChangeRate}%</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.employeeCount}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {roleBasedData.newHires} new this month
              </p>
              <div className="mt-3 flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>Growing steadily</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Attendance</CardTitle>
              </div>
              <Badge className="font-normal">{roleBasedData.attendancePercentage}%</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.currentAttendance}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Present today
              </p>
              <Progress 
                value={roleBasedData.attendancePercentage} 
                className="h-2 mt-3" 
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BriefcaseBusiness className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Recruitment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.openPositions}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Open positions
              </p>
              <div className="mt-3 flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>24 applications to review</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Finance</CardTitle>
              </div>
              <Badge variant="outline" className="font-normal bg-green-500/10 text-green-500 border-green-300">
                +{roleBasedData.revenueGrowth}%
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$178.3K</div>
              <p className="text-sm text-muted-foreground mt-1">
                Monthly revenue
              </p>
              <div className="mt-3 flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>{roleBasedData.costReduction}% cost reduction</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="col-span-1 lg:col-span-2 shadow-sm border-0">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={roleBasedData.monthlyRevenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#0F62FE" strokeWidth={2} dot={{ stroke: '#0F62FE', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Salary Distribution</CardTitle>
              <CardDescription>Breakdown by department</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[300px] w-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleBasedData.salaryDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {roleBasedData.salaryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Pending Approvals</CardTitle>
                <Badge>{roleBasedData.pendingLeaveRequests}</Badge>
              </div>
              <CardDescription>Requests that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/40 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Leave request: June 15-20 (Medical)</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <XCircle className="h-4 w-4 mr-1" />
                      Deny
                    </Button>
                    <Button size="sm" className="h-8">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/40 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Anna Smith</p>
                      <p className="text-sm text-muted-foreground">Leave request: June 12 (Personal)</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <XCircle className="h-4 w-4 mr-1" />
                      Deny
                    </Button>
                    <Button size="sm" className="h-8">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/40 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Robert Johnson</p>
                      <p className="text-sm text-muted-foreground">Equipment request: New laptop ($1,200)</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <XCircle className="h-4 w-4 mr-1" />
                      Deny
                    </Button>
                    <Button size="sm" className="h-8">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Overall performance ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={roleBasedData.performanceStats}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} employees`, 'Count']} />
                    <Bar dataKey="value" fill="#0F62FE" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } else if (user?.role === 'hr') {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Good {timeOfDay}, {user?.name}</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening in human resources today
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button className="shadow-sm">
              <FileText className="mr-2 h-4 w-4" />
              HR Reports
            </Button>
          </div>
        </div>

        {/* HR Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Employees</CardTitle>
              </div>
              <Badge className="font-normal">+{roleBasedData.employeeChangeRate}%</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.employeeCount}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {roleBasedData.newHires} new this month
              </p>
              <div className="mt-3 flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>Growing steadily</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Attendance</CardTitle>
              </div>
              <Badge className="font-normal">{roleBasedData.attendancePercentage}%</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.currentAttendance}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Present today
              </p>
              <Progress 
                value={roleBasedData.attendancePercentage} 
                className="h-2 mt-3" 
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Leave Requests</CardTitle>
              </div>
              <Badge>{roleBasedData.pendingLeaveRequests}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.pendingLeaveRequests}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Pending approvals
              </p>
              <div className="mt-3 flex items-center text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>Needs attention</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BriefcaseBusiness className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Recruitment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.applicationsToReview}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Applications to review
              </p>
              <div className="mt-3 flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>{roleBasedData.interviewsScheduled} interviews scheduled</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* HR Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="col-span-1 lg:col-span-2 shadow-sm border-0">
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
              <CardDescription>Daily attendance for the current week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={roleBasedData.attendanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar name="Present" dataKey="present" stackId="a" fill="#0F62FE" />
                    <Bar name="Absent" dataKey="absent" stackId="a" fill="#FA4D56" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Employee Distribution</CardTitle>
              <CardDescription>By department</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[300px] w-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleBasedData.employeeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {roleBasedData.employeeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} employees`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recruitment Stats & Leave Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Recruitment Pipeline</CardTitle>
                <Badge variant="outline">{roleBasedData.applicationsToReview} new</Badge>
              </div>
              <CardDescription>Current recruitment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Building className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Senior Developer</p>
                        <p className="text-sm text-muted-foreground">Engineering • Full-time</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
                      8 applicants
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground">4 candidates shortlisted, 2 interviews scheduled</p>
                  </div>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 rounded-lg">
                        <Building className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium">UI/UX Designer</p>
                        <p className="text-sm text-muted-foreground">Design • Full-time</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
                      12 applicants
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground">6 candidates shortlisted, 3 interviews scheduled</p>
                  </div>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <Building className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">HR Coordinator</p>
                        <p className="text-sm text-muted-foreground">Human Resources • Part-time</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
                      4 applicants
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground">3 candidates shortlisted, 1 interview scheduled</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Leave Requests</CardTitle>
                <Badge>{roleBasedData.pendingLeaveRequests}</Badge>
              </div>
              <CardDescription>Pending leave approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/40 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">June 15-20 (5 days) • Medical</p>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Engineering</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <XCircle className="h-4 w-4 mr-1" />
                      Deny
                    </Button>
                    <Button size="sm" className="h-8">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/40 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Anna Smith</p>
                      <p className="text-sm text-muted-foreground">June 12 (1 day) • Personal</p>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Marketing</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <XCircle className="h-4 w-4 mr-1" />
                      Deny
                    </Button>
                    <Button size="sm" className="h-8">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/40 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Robert Johnson</p>
                      <p className="text-sm text-muted-foreground">June 22-23 (2 days) • Vacation</p>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Finance</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <XCircle className="h-4 w-4 mr-1" />
                      Deny
                    </Button>
                    <Button size="sm" className="h-8">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } else {
    // Default Employee Dashboard
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Good {timeOfDay}, {user?.name}</h1>
            <p className="text-muted-foreground mt-1">
              Here's your work summary for today
            </p>
          </div>
        </div>
        
        {/* Employee Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Tasks</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.tasksInProgress}</div>
              <p className="text-sm text-muted-foreground mt-1">
                In progress
              </p>
              <div className="mt-3 flex items-center text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                <span>{roleBasedData.tasksCompleted} completed this week</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Time Off</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.leaveDaysRemaining}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Days available
              </p>
              <div className="mt-3 flex items-center text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                <span>{roleBasedData.leavesApproved} days approved</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Deadlines</CardTitle>
              </div>
              {roleBasedData.upcomingDeadlines > 0 && (
                <Badge variant="outline" className="font-normal bg-amber-500/10 text-amber-500 border-amber-200">
                  {roleBasedData.upcomingDeadlines}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.upcomingDeadlines}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Due this week
              </p>
              <div className="mt-3 flex items-center text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3 mr-1 text-amber-500" />
                <span>Highest priority: UI design</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Team</CardTitle>
              </div>
              <Badge className="font-normal">{roleBasedData.teamAttendance}%</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.teamPerformance}%</div>
              <p className="text-sm text-muted-foreground mt-1">
                Performance
              </p>
              <Progress 
                value={roleBasedData.teamPerformance} 
                className="h-2 mt-3" 
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Employee Tasks & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="shadow-sm border-0 col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>Your assigned and upcoming tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Update user documentation</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Due in 2 days</span>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500 border-green-200">
                      In progress
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">75% completed</p>
                  </div>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Create wireframes for mobile app</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Due tomorrow</span>
                      </div>
                    </div>
                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-200">
                      In progress
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <Progress value={30} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">30% completed</p>
                  </div>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Review code for project X</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Due in 3 days</span>
                      </div>
                    </div>
                    <Badge className="bg-slate-500/10 text-slate-500 border-slate-200">
                      Not started
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <Progress value={0} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Not started yet</p>
                  </div>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Update company profile page</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Due in 5 days</span>
                      </div>
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-500 border-blue-200">
                      Planning
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <Progress value={10} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">10% completed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>Your current workload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roleBasedData.taskDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {roleBasedData.taskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roleBasedData.recentActivities.map((activity, index) => (
                    <div className="flex items-start space-x-3" key={index}>
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
