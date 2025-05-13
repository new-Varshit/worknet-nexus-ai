
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
  ArrowUpRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Analytics data based on user role
const analyticsData = {
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
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Software Developer</h4>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
                      10 applicants
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Engineering</span>
                    </div>
                    <span className="hidden sm:inline text-muted-foreground mx-2">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Remote</span>
                    </div>
                    <span className="hidden sm:inline text-muted-foreground mx-2">•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Closes June 30</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Interview stage</span>
                      <span className="font-medium">60%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Product Manager</h4>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
                      7 applicants
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Product</span>
                    </div>
                    <span className="hidden sm:inline text-muted-foreground mx-2">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">New York</span>
                    </div>
                    <span className="hidden sm:inline text-muted-foreground mx-2">•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Closes July 15</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Screening stage</span>
                      <span className="font-medium">30%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Marketing Specialist</h4>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
                      5 applicants
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Marketing</span>
                    </div>
                    <span className="hidden sm:inline text-muted-foreground mx-2">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Chicago</span>
                    </div>
                    <span className="hidden sm:inline text-muted-foreground mx-2">•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Closes June 15</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Final stage</span>
                      <span className="font-medium">80%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  View All Openings
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Pending Leave Approvals</CardTitle>
                <Badge>{roleBasedData.pendingLeaveRequests}</Badge>
              </div>
              <CardDescription>Leave requests needing your approval</CardDescription>
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
                      <p className="text-sm text-muted-foreground">Medical Leave: June 15-20</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-200">
                          5 days
                        </Badge>
                        <span className="text-xs text-muted-foreground">Requested on June 1</span>
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
                      <p className="text-sm text-muted-foreground">Personal Leave: June 12</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-200">
                          1 day
                        </Badge>
                        <span className="text-xs text-muted-foreground">Requested on June 5</span>
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
                      <p className="text-sm text-muted-foreground">Vacation: July 1-7</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-200">
                          7 days
                        </Badge>
                        <span className="text-xs text-muted-foreground">Requested on June 3</span>
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
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  View All Requests
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } else {
    // Employee Dashboard
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Good {timeOfDay}, {user?.name}</h1>
            <p className="text-muted-foreground mt-1">
              Here's your personal dashboard
            </p>
          </div>
        </div>

        {/* Employee Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Tasks</CardTitle>
              </div>
              <Badge className="font-normal">{roleBasedData.tasksInProgress} in progress</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.tasksCompleted}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Completed this month
              </p>
              <Progress 
                value={(roleBasedData.tasksCompleted / (roleBasedData.tasksCompleted + roleBasedData.tasksInProgress + 3)) * 100} 
                className="h-2 mt-3" 
              />
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
              <div className="flex items-center justify-center h-12">
                <div className="text-center">
                  <svg className="inline-block h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-sm mt-1">Present today</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Last check-in: 9:05 AM
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Leave</CardTitle>
              </div>
              <Badge variant="outline" className="font-normal">{roleBasedData.leavesApproved} approved</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roleBasedData.leaveDaysRemaining}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Days remaining
              </p>
              <div className="mt-3 flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Next holiday: Independence Day (July 4)</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BriefcaseBusiness className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">Job Board</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-sm text-muted-foreground mt-1">
                Internal opportunities
              </p>
              <div className="mt-3 flex items-center text-xs text-primary">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>1 matches your profile</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee's Task Distribution & Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
              <CardDescription>Your current work items</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[250px] w-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleBasedData.taskDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
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
              <CardDescription>Your latest updates and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {roleBasedData.recentActivities.map((activity, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/10 bg-primary/10">
                        {idx === 0 && <FileText className="h-4 w-4 text-primary" />}
                        {idx === 1 && <CheckCircle2 className="h-4 w-4 text-primary" />}
                        {idx === 2 && <BriefcaseBusiness className="h-4 w-4 text-primary" />}
                        {idx === 3 && <BarChart3 className="h-4 w-4 text-primary" />}
                      </div>
                      {idx < roleBasedData.recentActivities.length - 1 && (
                        <div className="absolute left-1/2 top-8 h-full w-px -translate-x-1/2 bg-border" />
                      )}
                    </div>
                    <div className="flex flex-col pb-6">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deadlines & Team Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Upcoming Deadlines</CardTitle>
                <Badge>{roleBasedData.upcomingDeadlines}</Badge>
              </div>
              <CardDescription>Tasks due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Complete Project Documentation</h4>
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">1 day left</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Finalize all documentation for the product launch
                  </p>
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">70%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Prepare Sales Presentation</h4>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">3 days left</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create slides for the quarterly review meeting
                  </p>
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">40%</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View All Tasks
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Team Stats</CardTitle>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">Your team: </span>
                  <Badge variant="outline">Product Design</Badge>
                </div>
              </div>
              <CardDescription>Team performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team Attendance</span>
                    <div className="flex items-center">
                      <span className="font-medium">{roleBasedData.teamAttendance}%</span>
                      <ChevronUp className="text-green-500 ml-1 h-4 w-4" />
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${roleBasedData.teamAttendance}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team Performance</span>
                    <div className="flex items-center">
                      <span className="font-medium">{roleBasedData.teamPerformance}%</span>
                      <ChevronUp className="text-green-500 ml-1 h-4 w-4" />
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${roleBasedData.teamPerformance}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Project Milestones</span>
                    <div className="flex items-center">
                      <span className="font-medium">76%</span>
                      <ChevronDown className="text-red-500 ml-1 h-4 w-4" />
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "76%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Deadline Adherence</span>
                    <div className="flex items-center">
                      <span className="font-medium">92%</span>
                      <ChevronUp className="text-green-500 ml-1 h-4 w-4" />
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-4 border-t">
                <h4 className="font-medium mb-2">Team Members</h4>
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-background h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background h-8 w-8">
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background h-8 w-8">
                    <AvatarFallback>RJ</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background h-8 w-8">
                    <AvatarFallback>TK</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background h-8 w-8">
                    <AvatarFallback>+3</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
};

export default Dashboard;
