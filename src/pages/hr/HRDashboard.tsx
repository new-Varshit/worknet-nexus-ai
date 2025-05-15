
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { User, Users, FileText, Calendar, DollarSign, UserPlus, CheckCircle } from "lucide-react";
import EmployeeDialog from "@/pages/employees/EmployeeDialog";

// Mock Data for Dashboard
const mockLeaveRequests = [
  { id: 1, employee: "John Doe", type: "Sick Leave", days: 2, from: "2025-05-20", status: "pending" },
  { id: 2, employee: "Emily Brown", type: "Vacation", days: 5, from: "2025-06-10", status: "pending" },
  { id: 3, employee: "Sarah Chen", type: "Personal Leave", days: 1, from: "2025-05-18", status: "pending" }
];

const mockTasks = [
  { id: 1, title: "Review new applicants", priority: "high", deadline: "2025-05-17", status: "in progress" },
  { id: 2, title: "Prepare monthly report", priority: "medium", deadline: "2025-05-20", status: "not started" }
];

const mockJobApplications = [
  { id: 1, employee: "Michael Roberts", position: "Senior Developer", department: "Engineering", status: "pending" },
  { id: 2, employee: "Lisa Wang", position: "Marketing Specialist", department: "Marketing", status: "pending" }
];

const mockPayrollUpdates = [
  { id: 1, employee: "James Wilson", amount: 4500, status: "unpaid", dueDate: "2025-05-30" },
  { id: 2, employee: "Emma Rodriguez", amount: 5200, status: "unpaid", dueDate: "2025-05-30" }
];

const HRDashboard = () => {
  const navigate = useNavigate();
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);

  const handleApproveLeave = (id: number) => {
    toast.success(`Leave request #${id} has been approved`);
  };
  
  const handleRejectLeave = (id: number) => {
    toast.success(`Leave request #${id} has been rejected`);
  };
  
  const handleApproveApplication = (id: number) => {
    toast.success(`Job application #${id} has been approved`);
  };
  
  const handleRejectApplication = (id: number) => {
    toast.success(`Job application #${id} has been rejected`);
  };
  
  const handleAddEmployee = (employeeData: any) => {
    console.log("New employee data:", employeeData);
    toast.success(`Employee ${employeeData.name} has been created successfully`);
    setIsAddEmployeeDialogOpen(false);
  };

  const handleMarkPayrollPaid = (id: number) => {
    toast.success(`Payroll #${id} has been marked as paid`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your HR dashboard</p>
        </div>
        <Button className="btn-gradient" onClick={() => setIsAddEmployeeDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
      </div>

      {/* Row 1 - Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">48</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">5</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Task Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">12</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payroll Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">8</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 - Task & Leave Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* My Assigned Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">My Tasks</CardTitle>
            <CardDescription>Tasks assigned to you as an HR manager</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Priority</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={task.priority === "high" ? "destructive" : "outline"}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge>{task.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-right">
              <Button variant="link" size="sm" onClick={() => navigate("/tasks")}>
                View All Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Leave Requests</CardTitle>
            <CardDescription>Recent employee leave requests requiring your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Days</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLeaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.employee}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell className="hidden sm:table-cell">{request.days}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8" 
                            onClick={() => handleApproveLeave(request.id)}>
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="h-8"
                            onClick={() => handleRejectLeave(request.id)}>
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-right">
              <Button variant="link" size="sm" onClick={() => navigate("/leave/requests")}>
                View All Leave Requests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 - Employee Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Job Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Internal Job Applications</CardTitle>
            <CardDescription>Recent internal job applications requiring your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead className="hidden sm:table-cell">Position</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockJobApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>{application.employee}</TableCell>
                      <TableCell className="hidden sm:table-cell">{application.position}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8"
                            onClick={() => handleApproveApplication(application.id)}>
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="h-8"
                            onClick={() => handleRejectApplication(application.id)}>
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-right">
              <Button variant="link" size="sm" onClick={() => navigate("/recruitment/applications")}>
                View All Applications
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Payroll Snapshot */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Payroll Snapshot</CardTitle>
            <CardDescription>Upcoming payroll status for employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead className="hidden sm:table-cell">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPayrollUpdates.map((payroll) => (
                    <TableRow key={payroll.id}>
                      <TableCell>{payroll.employee}</TableCell>
                      <TableCell className="hidden sm:table-cell">${payroll.amount}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8"
                          onClick={() => handleMarkPayrollPaid(payroll.id)}>
                          Mark as Paid
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-right">
              <Button variant="link" size="sm" onClick={() => navigate("/payroll")}>
                View Full Payroll
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Creation Dialog */}
      <EmployeeDialog
        open={isAddEmployeeDialogOpen}
        onOpenChange={setIsAddEmployeeDialogOpen}
        onSave={handleAddEmployee}
      />
    </div>
  );
};

export default HRDashboard;
