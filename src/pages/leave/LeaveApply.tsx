
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, CalendarCheck } from "lucide-react";

interface LeaveFormData {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

const LeaveApply = () => {
  const [formData, setFormData] = useState<LeaveFormData>({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, leaveType: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    
    if (start < today) {
      toast.error("Start date cannot be in the past");
      return;
    }
    
    if (end < start) {
      toast.error("End date cannot be before start date");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Leave request submitted successfully!");
      
      // Reset form
      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Calculate number of days
  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    
    // Add 1 to include both start and end days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return diffDays;
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Apply for Leave</h1>
        <p className="text-muted-foreground mt-1">
          Request time off and track your leave balance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-gradient">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12</div>
            <p className="text-muted-foreground text-sm">Days remaining</p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">5</div>
            <p className="text-muted-foreground text-sm">Days used this year</p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">2</div>
            <p className="text-muted-foreground text-sm">Days awaiting approval</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Leave Request Form</CardTitle>
          <CardDescription>
            Fill out the form to submit your leave request
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="leaveType">Leave Type</Label>
              <Select
                value={formData.leaveType}
                onValueChange={handleSelectChange}
                required
              >
                <SelectTrigger id="leaveType">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sick">Sick Leave</SelectItem>
                  <SelectItem value="Vacation">Vacation</SelectItem>
                  <SelectItem value="Personal">Personal Leave</SelectItem>
                  <SelectItem value="Bereavement">Bereavement</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            {formData.startDate && formData.endDate && (
              <div className="p-3 bg-muted rounded flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                <span>
                  <span className="font-medium">{calculateDays()}</span> day{calculateDays() !== 1 ? 's' : ''} requested
                </span>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea
                id="reason"
                name="reason"
                placeholder="Please provide a brief reason for your leave request"
                value={formData.reason}
                onChange={handleInputChange}
                required
                rows={4}
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button
              type="submit"
              className="btn-gradient"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Leave Request"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LeaveApply;
