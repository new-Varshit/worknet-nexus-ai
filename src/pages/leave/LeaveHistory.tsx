
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import LeaveRequestDialog from "@/pages/leave/LeaveRequestDialog";

// Mock leave history data
const mockLeaveHistory = [
  {
    id: 1,
    employee: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering"
    },
    leaveType: "Vacation",
    startDate: new Date("2025-03-15"),
    endDate: new Date("2025-03-20"),
    days: 6,
    reason: "Annual family vacation",
    status: "Approved",
    appliedDate: new Date("2025-02-20"),
    approvedBy: "Admin User",
    approvedDate: new Date("2025-02-22")
  },
  {
    id: 2,
    employee: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering"
    },
    leaveType: "Sick",
    startDate: new Date("2025-02-10"),
    endDate: new Date("2025-02-11"),
    days: 2,
    reason: "Flu and fever",
    status: "Approved",
    appliedDate: new Date("2025-02-09"),
    approvedBy: "Admin User",
    approvedDate: new Date("2025-02-09")
  },
  {
    id: 3,
    employee: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering"
    },
    leaveType: "Personal",
    startDate: new Date("2025-01-05"),
    endDate: new Date("2025-01-05"),
    days: 1,
    reason: "Personal matters",
    status: "Approved",
    appliedDate: new Date("2025-01-02"),
    approvedBy: "Admin User",
    approvedDate: new Date("2025-01-03")
  },
  {
    id: 4,
    employee: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering"
    },
    leaveType: "Vacation",
    startDate: new Date("2024-12-24"),
    endDate: new Date("2024-12-26"),
    days: 3,
    reason: "Christmas holiday",
    status: "Approved",
    appliedDate: new Date("2024-12-01"),
    approvedBy: "Admin User",
    approvedDate: new Date("2024-12-02")
  },
  {
    id: 5,
    employee: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering"
    },
    leaveType: "Vacation",
    startDate: new Date("2025-05-20"),
    endDate: new Date("2025-05-24"),
    days: 5,
    reason: "Summer vacation",
    status: "Pending",
    appliedDate: new Date("2025-05-10")
  },
  {
    id: 6,
    employee: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering"
    },
    leaveType: "Personal",
    startDate: new Date("2024-11-15"),
    endDate: new Date("2024-11-15"),
    days: 1,
    reason: "Personal matters",
    status: "Rejected",
    appliedDate: new Date("2024-11-10"),
    approvedBy: "Admin User",
    approvedDate: new Date("2024-11-11"),
    rejectionReason: "High workload and deadline"
  }
];

const LeaveHistory = () => {
  const [year, setYear] = useState("2025");
  const [sortColumn, setSortColumn] = useState("startDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  
  // Filter leave history based on year
  const filteredHistory = mockLeaveHistory.filter(request => {
    const requestYear = request.startDate.getFullYear().toString();
    return year === "all" || requestYear === year;
  });
  
  // Sort leave history
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortColumn) {
      case "startDate":
        valueA = a.startDate.getTime();
        valueB = b.startDate.getTime();
        break;
      case "leaveType":
        valueA = a.leaveType;
        valueB = b.leaveType;
        break;
      case "days":
        valueA = a.days;
        valueB = b.days;
        break;
      case "status":
        valueA = a.status;
        valueB = b.status;
        break;
      default:
        valueA = a.startDate.getTime();
        valueB = b.startDate.getTime();
    }
    
    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  
  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };
  
  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="outline">Pending</Badge>;
      case "Approved":
        return <Badge variant="default">Approved</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  // Helper function to render sort icon
  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1 inline-block" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1 inline-block" />
    );
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leave History</h1>
        <p className="text-muted-foreground mt-1">
          View your leave request history
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <Card className="card-gradient inline-block">
          <CardHeader className="py-4 px-5">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg">Leave Balance</CardTitle>
                <p className="text-2xl font-bold mt-1">12 days</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <div>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card className="card-gradient">
        <CardHeader className="pb-2">
          <CardTitle>Leave History</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("leaveType")}
                  >
                    <span className="flex items-center">
                      Leave Type
                      {renderSortIcon("leaveType")}
                    </span>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("startDate")}
                  >
                    <span className="flex items-center">
                      Period
                      {renderSortIcon("startDate")}
                    </span>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hidden sm:table-cell"
                    onClick={() => handleSort("days")}
                  >
                    <span className="flex items-center">
                      Days
                      {renderSortIcon("days")}
                    </span>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Applied On</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <span className="flex items-center">
                      Status
                      {renderSortIcon("status")}
                    </span>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {sortedHistory.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.leaveType}</TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">
                          {format(request.startDate, "MMM d, yyyy")} 
                          {request.startDate.getTime() !== request.endDate.getTime() && (
                            <> - {format(request.endDate, "MMM d, yyyy")}</>
                          )}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="hidden sm:table-cell">
                      {request.days} day{request.days !== 1 ? 's' : ''}
                    </TableCell>
                    
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {format(request.appliedDate, "MMM d, yyyy")}
                    </TableCell>
                    
                    <TableCell>
                      {getStatusBadge(request.status)}
                    </TableCell>
                    
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewRequest(request)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {sortedHistory.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No leave history found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <LeaveRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        request={selectedRequest}
      />
    </div>
  );
};

export default LeaveHistory;
