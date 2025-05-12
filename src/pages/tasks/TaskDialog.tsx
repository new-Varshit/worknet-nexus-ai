
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Circle, Clock, CheckCircle2, Send } from "lucide-react";

// Mock user data for assignee selection
const mockUsers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3, name: "Emily Brown", email: "emily.b@example.com" },
  { id: 4, name: "Michael Johnson", email: "michael.j@example.com" },
  { id: 5, name: "Robert Wilson", email: "robert.w@example.com" },
  { id: 6, name: "Sarah Davis", email: "sarah.d@example.com" },
];

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: any;
  onSave?: (task: any) => void;
}

const TaskDialog = ({
  open,
  onOpenChange,
  task,
  onSave,
}: TaskDialogProps) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
    assignedTo: "",
    comments: [] as any[],
  });
  
  const [newComment, setNewComment] = useState("");
  
  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id || "",
        title: task.title || "",
        description: task.description || "",
        status: task.status || "To Do",
        priority: task.priority || "Medium",
        dueDate: task.dueDate || "",
        assignedTo: task.assignedTo?.id?.toString() || "",
        comments: task.comments || [],
      });
    } else {
      // Reset form for new task
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      setFormData({
        id: "",
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        dueDate: format(tomorrow, "yyyy-MM-dd"),
        assignedTo: "",
        comments: [],
      });
    }
    
    setNewComment("");
  }, [task, open]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      // Format the data to match API expectations
      const formattedTask = {
        ...formData,
        assignedTo: mockUsers.find(u => u.id.toString() === formData.assignedTo),
      };
      onSave(formattedTask);
    }
  };
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: {
        id: 1, // Current user ID
        name: "John Doe", // Current user name
      },
      text: newComment,
      date: new Date().toISOString(),
    };
    
    setFormData(prev => ({
      ...prev,
      comments: [...prev.comments, comment],
    }));
    
    setNewComment("");
  };
  
  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "To Do":
        return <Circle className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Completed":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  // Format comment date
  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {task ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Do">
                    <div className="flex items-center">
                      <Circle className="mr-2 h-4 w-4" />
                      <span>To Do</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="In Progress">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>In Progress</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Completed">
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      <span>Completed</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To *</Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value) => handleSelectChange("assignedTo", value)}
              >
                <SelectTrigger id="assignedTo">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {formData.id && (
            <>
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <Label>Comments</Label>
                
                <div className="space-y-4 max-h-[200px] overflow-y-auto">
                  {formData.comments.length > 0 ? (
                    formData.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {getInitials(comment.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{comment.user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatCommentDate(comment.date)}
                            </p>
                          </div>
                          <p className="text-sm mt-1">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No comments yet</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="default"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
          
          <DialogFooter className="mt-6">
            <Button type="submit" className="btn-gradient">
              {task ? "Update Task" : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
