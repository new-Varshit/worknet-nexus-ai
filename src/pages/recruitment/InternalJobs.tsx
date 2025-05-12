
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock internal job postings data
const mockInternalJobs = [
  {
    id: 1,
    title: "Engineering Team Lead",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    description: "We're looking for an experienced team lead to manage our growing engineering team. The ideal candidate will have 5+ years of software development experience and 2+ years in a leadership role.",
    requiredSkills: ["Team Management", "React", "Node.js", "Agile", "CI/CD"],
    postedDate: "2025-04-20",
    closingDate: "2025-05-25",
    isApplied: false
  },
  {
    id: 2,
    title: "Senior Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    description: "Join our product team to help define and execute our product roadmap. You'll work closely with engineering, design, and marketing teams to build features that delight our customers.",
    requiredSkills: ["Product Strategy", "User Research", "Roadmapping", "Agile", "Data Analysis"],
    postedDate: "2025-04-15",
    closingDate: "2025-05-20",
    isApplied: true
  },
  {
    id: 3,
    title: "HR Business Partner",
    department: "Human Resources",
    location: "Chicago, IL",
    type: "Full-time",
    description: "As an HR Business Partner, you'll provide strategic HR support to various teams within the organization. You'll help develop and implement HR initiatives that support our overall business objectives.",
    requiredSkills: ["Employee Relations", "Performance Management", "Talent Development", "Conflict Resolution"],
    postedDate: "2025-04-25",
    closingDate: "2025-05-30",
    isApplied: false
  },
  {
    id: 4,
    title: "Marketing Coordinator",
    department: "Marketing",
    location: "Remote",
    type: "Part-time",
    description: "Support our marketing team in executing campaigns across various channels. You'll help with content creation, social media management, and analytics reporting.",
    requiredSkills: ["Social Media", "Content Creation", "Analytics", "Project Management"],
    postedDate: "2025-04-18",
    closingDate: "2025-05-18",
    isApplied: false
  }
];

const InternalJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter jobs based on search term
  const filteredJobs = mockInternalJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleApply = (id: number, isApplied: boolean) => {
    if (isApplied) {
      toast.info("You've already applied for this position");
    } else {
      toast.success("Application submitted successfully");
    }
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Internal Job Postings</h1>
        <p className="text-muted-foreground mt-1">
          Explore and apply for internal job opportunities
        </p>
      </div>
      
      <div className="relative w-full md:w-[300px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search jobs..."
          className="pl-8 w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="hover-scale">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{job.department}</Badge>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
                <CardTitle className="mt-2">{job.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                
                <div className="space-y-1">
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
                </div>
                
                <p className="text-sm text-muted-foreground">{job.description}</p>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Required Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.requiredSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  className={job.isApplied ? "w-full bg-green-600 hover:bg-green-700" : "w-full"}
                  onClick={() => handleApply(job.id, job.isApplied)}
                  disabled={job.isApplied}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  {job.isApplied ? "Applied" : "Apply Now"}
                </Button>
              </CardFooter>
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

export default InternalJobs;
