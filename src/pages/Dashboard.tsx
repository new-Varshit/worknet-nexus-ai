
import { useAuth } from "@/contexts/AuthContext";
import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ListChecks, Calendar, BriefcaseBusiness, Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";

// Import recharts components for our charts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for the dashboard
const attendanceData = [
  { month: "Jan", present: 21, absent: 2 },
  { month: "Feb", present: 19, absent: 1 },
  { month: "Mar", present: 22, absent: 0 },
  { month: "Apr", present: 20, absent: 2 },
  { month: "May", present: 18, absent: 4 },
  { month: "Jun", present: 21, absent: 1 },
];

const recruitmentData = [
  { name: "Applications", value: 35 },
  { name: "Interviews", value: 15 },
  { name: "Offers", value: 8 },
  { name: "Hired", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const { user } = useAuth();

  // Tailored content based on user role
  const renderRoleSpecificContent = () => {
    switch (user?.role) {
      case "admin":
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Employees"
                value="126"
                icon={<Users className="h-4 w-4" />}
                description="Active employees"
                changeValue="+4%"
                changeType="increase"
              />
              <StatCard
                title="Open Positions"
                value="12"
                icon={<BriefcaseBusiness className="h-4 w-4" />}
                description="Across 5 departments"
              />
              <StatCard
                title="Tasks Assigned"
                value="347"
                icon={<ListChecks className="h-4 w-4" />}
                description="85% completion rate"
                changeValue="+2.5%"
                changeType="increase"
              />
              <StatCard
                title="Leave Requests"
                value="8"
                icon={<Calendar className="h-4 w-4" />}
                description="Pending approval"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>Six-month attendance report</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="present" fill="#0F62FE" />
                      <Bar dataKey="absent" fill="#FF3B30" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Recruitment Pipeline</CardTitle>
                  <CardDescription>Current recruitment stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={recruitmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {recruitmentData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "New employee onboarded",
                        description: "Sarah Johnson joined Engineering",
                        icon: <Users className="h-4 w-4 text-primary" />,
                        time: "2 hours ago",
                      },
                      {
                        title: "Job posting published",
                        description: "Senior UX Designer role",
                        icon: <BriefcaseBusiness className="h-4 w-4 text-primary" />,
                        time: "5 hours ago",
                      },
                      {
                        title: "Payroll processed",
                        description: "April 2025 payroll completed",
                        icon: <ArrowUpRight className="h-4 w-4 text-primary" />,
                        time: "Yesterday",
                      },
                    ].map((activity, i) => (
                      <div key={i} className="flex space-x-4">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {activity.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Team Meeting",
                        date: "May 14, 2025",
                        time: "10:00 AM - 11:30 AM",
                      },
                      {
                        title: "Quarterly Review",
                        date: "May 20, 2025",
                        time: "2:00 PM - 4:00 PM",
                      },
                      {
                        title: "New Hire Orientation",
                        date: "May 25, 2025",
                        time: "9:00 AM - 12:00 PM",
                      },
                    ].map((event, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                          <p className="text-xs text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        sender: "Maria Garcia",
                        subject: "Monthly HR Report",
                        preview: "The monthly reports are ready for your review...",
                        time: "10:23 AM",
                      },
                      {
                        sender: "Robert Chen",
                        subject: "New Hire Documents",
                        preview: "Please find attached the onboarding documents...",
                        time: "Yesterday",
                      },
                      {
                        sender: "System Notification",
                        subject: "Backup Complete",
                        preview: "Weekly data backup has completed successfully...",
                        time: "May 10",
                      },
                    ].map((message, i) => (
                      <div key={i} className="flex space-x-4">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{message.sender}</p>
                          <p className="text-xs font-medium">{message.subject}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {message.preview}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case "hr":
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Employees"
                value="126"
                icon={<Users className="h-4 w-4" />}
                description="Active employees"
              />
              <StatCard
                title="Leave Requests"
                value="8"
                icon={<Calendar className="h-4 w-4" />}
                description="Pending approval"
              />
              <StatCard
                title="Open Positions"
                value="12"
                icon={<BriefcaseBusiness className="h-4 w-4" />}
                description="Across 5 departments"
              />
              <StatCard
                title="New Applications"
                value="24"
                icon={<Mail className="h-4 w-4" />}
                description="In the last 7 days"
                changeValue="+10"
                changeType="increase"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Recruitment Pipeline</CardTitle>
                  <CardDescription>Current recruitment stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={recruitmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {recruitmentData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Michael Johnson",
                        position: "Frontend Developer",
                        date: "May 12, 2025",
                        status: "New",
                      },
                      {
                        name: "Emily Chen",
                        position: "UX Designer",
                        date: "May 11, 2025",
                        status: "New",
                      },
                      {
                        name: "Robert Smith",
                        position: "Project Manager",
                        date: "May 10, 2025",
                        status: "Interview Scheduled",
                      },
                      {
                        name: "Sarah Davis",
                        position: "Data Analyst",
                        date: "May 9, 2025",
                        status: "Interview Scheduled",
                      },
                    ].map((app, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{app.name}</p>
                          <p className="text-xs text-muted-foreground">{app.position}</p>
                          <p className="text-xs text-muted-foreground">{app.date}</p>
                        </div>
                        <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {app.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case "employee":
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatCard
                title="My Tasks"
                value="5"
                icon={<ListChecks className="h-4 w-4" />}
                description="2 due today"
              />
              <StatCard
                title="Attendance"
                value="95%"
                icon={<CheckCircle2 className="h-4 w-4" />}
                description="Last 30 days"
                changeValue="+2%"
                changeType="increase"
              />
              <StatCard
                title="Leave Balance"
                value="12"
                icon={<Calendar className="h-4 w-4" />}
                description="Days remaining"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>My Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Complete Q2 Performance Review",
                        dueDate: "Today",
                        priority: "High",
                        status: "In Progress",
                      },
                      {
                        title: "Submit Expense Reports",
                        dueDate: "Today",
                        priority: "Medium",
                        status: "To Do",
                      },
                      {
                        title: "Training Course: Leadership Skills",
                        dueDate: "May 15",
                        priority: "Medium",
                        status: "To Do",
                      },
                      {
                        title: "Update Personal Information",
                        dueDate: "May 20",
                        priority: "Low",
                        status: "To Do",
                      },
                    ].map((task, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{task.title}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">
                              Due: {task.dueDate}
                            </span>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          task.status === "In Progress" 
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500" 
                            : "bg-primary/10 text-primary"
                        }`}>
                          {task.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Company Picnic",
                        date: "June 15, 2025",
                        description: "Annual company picnic at Central Park. All employees and families are invited!",
                      },
                      {
                        title: "Performance Review Deadline",
                        date: "May 31, 2025",
                        description: "Please complete all performance reviews by the end of the month.",
                      },
                      {
                        title: "New Benefits Package",
                        date: "July 1, 2025",
                        description: "Our updated benefits package will go into effect next month.",
                      },
                    ].map((announcement, i) => (
                      <div key={i} className="space-y-1">
                        <h4 className="text-sm font-medium">{announcement.title}</h4>
                        <p className="text-xs text-muted-foreground">{announcement.date}</p>
                        <p className="text-xs">{announcement.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="card-shadow mt-4">
              <CardHeader>
                <CardTitle>Internal Job Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Senior Developer",
                      department: "Engineering",
                      location: "New York, NY",
                      type: "Full-time",
                    },
                    {
                      title: "Product Manager",
                      department: "Product",
                      location: "Remote",
                      type: "Full-time",
                    },
                    {
                      title: "UI/UX Designer",
                      department: "Design",
                      location: "San Francisco, CA",
                      type: "Full-time",
                    },
                  ].map((job, i) => (
                    <Card key={i} className="hover-scale">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <Button className="w-full mt-2 bg-brand-500 hover:bg-brand-600">View Details</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        );

      default:
        return <div>Loading dashboard...</div>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your {user?.role === "employee" ? "personal" : "company"} dashboard.
        </p>
      </div>
      {renderRoleSpecificContent()}
    </div>
  );
};

export default Dashboard;
