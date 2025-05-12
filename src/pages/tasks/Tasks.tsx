
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, PlusCircle, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TaskDialog from "@/pages/tasks/TaskDialog";
import TaskCard from "@/pages/tasks/TaskCard";

// Mock task data
const mockTasks = [
  {
    id: 1,
    title: "Update employee onboarding documentation",
    description: "Review and update the employee onboarding process documentation to reflect the new HR policies.",
    status: "To Do",
    priority: "Medium",
    dueDate: "2025-05-20",
    assignedTo: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com"
    },
    assignedBy: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com"
    },
    comments: [
      {
        id: 1,
        user: {
          id: 2,
          name: "Jane Smith"
        },
        text: "Please use the new company template for this update.",
        date: "2025-05-10T10:30:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "Prepare quarterly financial report",
    description: "Compile Q1 financial data and prepare report for management review.",
    status: "In Progress",
    priority: "High",
    dueDate: "2025-05-15",
    assignedTo: {
      id: 3,
      name: "Emily Brown",
      email: "emily.b@example.com"
    },
    assignedBy: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com"
    },
    comments: []
  },
  {
    id: 3,
    title: "Interview candidates for developer position",
    description: "Conduct technical interviews for the senior developer position.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2025-05-18",
    assignedTo: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com"
    },
    assignedBy: {
      id: 4,
      name: "Michael Johnson",
      email: "michael.j@example.com"
    },
    comments: []
  },
  {
    id: 4,
    title: "Deploy application updates",
    description: "Deploy the latest features to production environment after final testing.",
    status: "To Do",
    priority: "High",
    dueDate: "2025-05-25",
    assignedTo: {
      id: 5,
      name: "Robert Wilson",
      email: "robert.w@example.com"
    },
    assignedBy: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com"
    },
    comments: []
  },
  {
    id: 5,
    title: "Review marketing campaign results",
    description: "Analyze the results of the Q1 marketing campaign and prepare summary report.",
    status: "Completed",
    priority: "Medium",
    dueDate: "2025-05-08",
    assignedTo: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com"
    },
    assignedBy: {
      id: 4,
      name: "Michael Johnson",
      email: "michael.j@example.com"
    },
    comments: [
      {
        id: 2,
        user: {
          id: 2,
          name: "Jane Smith"
        },
        text: "Report completed and sent to management.",
        date: "2025-05-08T16:45:00Z"
      }
    ]
  },
  {
    id: 6,
    title: "Update company website content",
    description: "Refresh the company website with new team members and product information.",
    status: "Completed",
    priority: "Low",
    dueDate: "2025-05-05",
    assignedTo: {
      id: 6,
      name: "Sarah Davis",
      email: "sarah.d@example.com"
    },
    assignedBy: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com"
    },
    comments: []
  }
];

const Tasks = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  
  // Filter tasks based on user role and search term
  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // If user is admin or HR, show all tasks, otherwise only show tasks assigned to the user
    const matchesRole = user?.role === "admin" || user?.role === "hr" || 
      (user?.id && task.assignedTo.id === parseInt(user.id)); // Convert user.id to number for comparison
    
    return matchesSearch && matchesRole;
  });
  
  // Filter tasks based on active tab
  const getFilteredTasksByStatus = () => {
    if (activeTab === "all") return filteredTasks;
    if (activeTab === "todo") return filteredTasks.filter(task => task.status === "To Do");
    if (activeTab === "inprogress") return filteredTasks.filter(task => task.status === "In Progress");
    if (activeTab === "completed") return filteredTasks.filter(task => task.status === "Completed");
    return filteredTasks;
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddTask = () => {
    setSelectedTask(null);
    setIsDialogOpen(true);
  };
  
  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };
  
  const handleTaskSave = (task: any) => {
    // Here would be API call to save task
    setIsDialogOpen(false);
  };
  
  const tasksToDisplay = getFilteredTasksByStatus();
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your tasks
          </p>
        </div>
        
        <Button
          onClick={handleAddTask}
          className="btn-gradient"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full md:w-auto"
        >
          <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="todo">
              <Circle className="mr-1 h-4 w-4" />
              To Do
            </TabsTrigger>
            <TabsTrigger value="inprogress">
              <Clock className="mr-1 h-4 w-4" />
              In Progress
            </TabsTrigger>
            <TabsTrigger value="completed">
              <CheckCircle2 className="mr-1 h-4 w-4" />
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8 w-full md:w-[260px]"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasksToDisplay.length > 0 ? (
          tasksToDisplay.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={() => handleEditTask(task)} 
            />
          ))
        ) : (
          <Card className="col-span-full p-6 text-center text-muted-foreground">
            <p>No tasks found. {searchTerm ? "Try a different search term." : activeTab !== "all" ? "Try a different filter." : ""}</p>
          </Card>
        )}
      </div>
      
      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        task={selectedTask}
        onSave={handleTaskSave}
      />
    </div>
  );
};

export default Tasks;
