
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Search,
  Calendar,
  Users,
  Briefcase,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";

// Mock job posting data
const mockJobPostings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120,000 - $150,000",
    postedDate: "2025-04-15",
    closingDate: "2025-05-30",
    status: "Active",
    applicants: 12
  },
  {
    id: 2,
    title: "HR Manager",
    department: "Human Resources",
    location: "New York, NY",
    type: "Full-time",
    experience: "3+ years",
    salary: "$90,000 - $110,000",
    postedDate: "2025-04-20",
    closingDate: "2025-05-20",
    status: "Active",
    applicants: 8
  },
  {
    id: 3,
    title: "Data Analyst",
    department: "Analytics",
    location: "Hybrid",
    type: "Full-time",
    experience: "2+ years",
    salary: "$70,000 - $90,000",
    postedDate: "2025-04-10",
    closingDate: "2025-05-25",
    status: "Active",
    applicants: 15
  },
  {
    id: 4,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Chicago, IL",
    type: "Full-time",
    experience: "3+ years",
    salary: "$75,000 - $95,000",
    postedDate: "2025-04-05",
    closingDate: "2025-05-15",
    status: "Draft",
    applicants: 0
  }
];

const JobPostings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter job postings based on search term
  const filteredJobPostings = mockJobPostings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddJob = () => {
    toast.info("Job posting form would open here");
  };
  
  const handleEditJob = (id: number) => {
    toast.info(`Editing job with ID: ${id}`);
  };
  
  const handleDeleteJob = (id: number) => {
    toast.success(`Job with ID ${id} deleted successfully`);
  };
  
  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Draft" : "Active";
    toast.success(`Job status updated to ${newStatus}`);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Postings</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track company job postings
          </p>
        </div>
        
        <Button
          onClick={handleAddJob}
          className="btn-gradient"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Job Posting
        </Button>
      </div>
      
      <div className="relative w-full md:w-[300px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search job postings..."
          className="pl-8 w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredJobPostings.length > 0 ? (
          filteredJobPostings.map((job) => (
            <Card key={job.id} className="hover-scale">
              <CardHeader className="pb-2 flex flex-row items-start justify-between">
                <div>
                  <Badge variant={job.status === "Active" ? "default" : "outline"} className="mb-2">
                    {job.status}
                  </Badge>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{job.department}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditJob(job.id)}>
                      Edit Job
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(job.id, job.status)}>
                      {job.status === "Active" ? "Mark as Draft" : "Publish Job"}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      Delete Job
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{job.type}, {job.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Posted: {format(new Date(job.postedDate), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Closing: {format(new Date(job.closingDate), "MMM d, yyyy")}
                    </span>
                  </div>
                  {job.applicants > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{job.applicants} applicants</span>
                    </div>
                  )}
                  <div className="pt-2">
                    <p className="text-sm font-medium">Salary Range:</p>
                    <p className="text-sm">{job.salary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full p-6 text-center text-muted-foreground">
            <p>No job postings found. {searchTerm && "Try a different search term."}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobPostings;
