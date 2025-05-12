
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock applications data
const mockApplications = [
  {
    id: 1,
    applicant: {
      name: "Thomas Miller",
      email: "thomas.m@example.com"
    },
    position: "Senior Frontend Developer",
    department: "Engineering",
    appliedDate: "2025-05-01",
    status: "New",
    resumeUrl: "#"
  },
  {
    id: 2,
    applicant: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com"
    },
    position: "HR Manager",
    department: "Human Resources",
    appliedDate: "2025-04-25",
    status: "Reviewing",
    resumeUrl: "#"
  },
  {
    id: 3,
    applicant: {
      name: "Robert Davis",
      email: "robert.d@example.com"
    },
    position: "Data Analyst",
    department: "Analytics",
    appliedDate: "2025-05-05",
    status: "Interview",
    resumeUrl: "#"
  },
  {
    id: 4,
    applicant: {
      name: "Jennifer Wilson",
      email: "jennifer.w@example.com"
    },
    position: "Marketing Specialist",
    department: "Marketing",
    appliedDate: "2025-04-30",
    status: "New",
    resumeUrl: "#"
  },
  {
    id: 5,
    applicant: {
      name: "Michael Brown",
      email: "michael.b@example.com"
    },
    position: "Senior Frontend Developer",
    department: "Engineering",
    appliedDate: "2025-04-29",
    status: "Rejected",
    resumeUrl: "#"
  }
];

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 5;
  
  // Filter applications based on search term
  const filteredApplications = mockApplications.filter(application => 
    application.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Paginate applications
  const indexOfLastApplication = currentPage * itemsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - itemsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const handleViewDetails = (id: number) => {
    toast.info(`View application details for ID: ${id}`);
  };
  
  const handleReviewApplication = (id: number) => {
    toast.info(`Review application with ID: ${id}`);
  };
  
  const handleUpdateStatus = (id: number, newStatus: string) => {
    toast.success(`Application status updated to ${newStatus}`);
  };
  
  // Helper function to get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "New":
        return "outline";
      case "Reviewing":
        return "secondary";
      case "Interview":
        return "default";
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };
  
  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage incoming job applications
        </p>
      </div>
      
      <Card className="card-gradient">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Applications</CardTitle>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search applications..."
                className="pl-8 w-full sm:w-[260px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead className="hidden md:table-cell">Position</TableHead>
                  <TableHead className="hidden md:table-cell">Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {currentApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(application.applicant.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{application.applicant.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {application.applicant.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        <div className="font-medium">{application.position}</div>
                        <div className="text-sm text-muted-foreground">
                          {application.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(new Date(application.appliedDate), "MMM d, yyyy")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(application.status)}>
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(application.id)}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReviewApplication(application.id)}>
                            Review
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(application.id, "Interview")}>
                            Schedule Interview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(application.id, "Rejected")}>
                            Reject Application
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {currentApplications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No applications found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end mt-4 gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center text-sm">
                Page {currentPage} of {totalPages}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Applications;
