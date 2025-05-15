
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Clock, CheckSquare, DollarSign, CalendarRange, ListTodo, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatCard from "@/components/dashboard/StatCard";

// Mock data for HR dashboard
const mockEmployeeCount = 42;
const mockPendingLeaves = 8;
const mockAssignedTasks = 23;
const mockPaidPayrolls = 35;

const mockRecentLeaves = [
  {
    id: 1,
    employee: "Alice Johnson",
    type: "Sick",
    startDate: "2025-05-20",
    endDate: "2025-05-22",
    status: "Pending"
  },
  {
    id: 2,
    employee: "Bob Smith",
    type: "Vacation",
    startDate: "2025-05-25",
    endDate: "2025-05-30",
    status: "Pending"
  },
  {
    id: 3,
    employee: "Charlie Davis",
    type: "Personal",
    startDate: "2025-05-18",
    endDate: "2025-05-19",
    status: "Pending"
  },
  {
    id: 4,
    employee: "Diana Parker",
    type: "Bereavement",
    startDate: "2025-05-15",
    endDate: "2025-05-18",
    status: "Pending"
  },
  {
    id: 5,
    employee: "Evan Thompson",
    type: "Sick",
    startDate: "2025-05-16",
    endDate: "2025-05-17",
    status: "Pending"
  }
];

const mockPersonalTasks = [
  {
    id: 1,
    title: "Review new hire documentation",
    priority: "High",
    dueDate: "2025-05-20",
    status: "In Progress"
  },
  {
    id: 2,
    title: "Update employee handbook",
    priority: "Medium",
    dueDate: "2025-05-25",
    status: "To Do"
  },
  {
    id: 3,
    title: "Prepare training schedule",
    priority: "Low",
    dueDate: "2025-05-30",
    status: "To Do"
  }
];

const mockPendingApprovals = [
  {
    id: 1,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    appliedDate: "2025-05-10",
    employmentInfoComplete: false
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "michael.b@example.com",
    appliedDate: "2025-05-11",
    employmentInfoComplete: false
  },
  {
    id: 3,
    name: "Jessica Lee",
    email: "jessica.l@example.com",
    appliedDate: "2025-05-12",
    employmentInfoComplete: true
  }
];

const mockJobApplications = [
  {
    id: 1,
    employee: "Ryan Moore",
    position: "Senior Developer",
    appliedDate: "2025-05-08",
    status: "Pending"
  },
  {
    id: 2,
    employee: "Olivia Garcia",
    position: "Project Manager",
    appliedDate: "2025-05-09",
    status: "Pending"
  }
];

const HRDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">HR Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || "HR Manager"}
        </p>
      </div>

      {/* Row 1: Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={mockEmployeeCount.toString()}
          description="Employees under management"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Pending Leaves"
          value={mockPendingLeaves.toString()}
          description="Leave requests awaiting review"
          icon={<CalendarRange className="h-4 w-4" />}
        />
        <StatCard
          title="Active Tasks"
          value={mockAssignedTasks.toString()}
          description="Tasks assigned to employees"
          icon={<ListTodo className="h-4 w-4" />}
        />
        <StatCard
          title="Payrolls Paid"
          value={mockPaidPayrolls.toString()}
          description="Payrolls processed this month"
          icon={<DollarSign className="h-4 w-4" />}
        />
      </div>

      {/* Row 2: Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Leave Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Recent Leave Requests</CardTitle>
              <CardDescription>
                Latest requests awaiting approval
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/leave/requests")}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentLeaves.map((leave) => (
                <div key={leave.id} className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{leave.employee}</p>
                    <p className="text-sm text-muted-foreground">
                      {leave.type} leave: {format(new Date(leave.startDate), "MMM d")} - {format(new Date(leave.endDate), "MMM d")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Personal Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>
                Tasks assigned to you
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/tasks")}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPersonalTasks.map((task) => (
                <div key={task.id} className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <Badge
                      variant={
                        task.priority === "High"
                          ? "destructive"
                          : task.priority === "Medium"
                          ? "default"
                          : "outline"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Due: {format(new Date(task.dueDate), "MMM d")}</span>
                    <Badge
                      variant={
                        task.status === "Completed"
                          ? "outline"
                          : task.status === "In Progress"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Control & Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Users waiting for employment info and approval
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/hr/pending-approvals")}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPendingApprovals.map((user) => (
                <div key={user.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    {!user.employmentInfoComplete ? (
                      <Button size="sm" onClick={() => navigate(`/hr/pending-approvals/${user.id}`)}>
                        Complete Info
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Internal Job Applications</CardTitle>
              <CardDescription>
                Applications pending your review
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/recruitment/applications")}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockJobApplications.map((application) => (
                <div key={application.id} className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{application.employee}</p>
                    <p className="text-sm text-muted-foreground">
                      Position: {application.position}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Applied: {format(new Date(application.appliedDate), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate("/tasks/assign")}
                >
                  <ListTodo className="mr-2 h-4 w-4" />
                  Assign New Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HRDashboard;
