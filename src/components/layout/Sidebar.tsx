
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  ListChecks,
  Calendar,
  FileText,
  DollarSign,
  BriefcaseBusiness,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  Briefcase,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  path: string;
  roles: Array<string>;
  children?: Array<{
    title: string;
    path: string;
    roles: Array<string>;
  }>;
};

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
    path: "/dashboard",
    roles: ["admin", "hr", "employee"],
  },
  {
    title: "Employees",
    icon: <Users className="h-5 w-5" />,
    path: "/employees",
    roles: ["admin", "hr"],
  },
  {
    title: "Tasks",
    icon: <ListChecks className="h-5 w-5" />,
    path: "/tasks",
    roles: ["admin", "hr", "employee"],
  },
  {
    title: "Attendance",
    icon: <Calendar className="h-5 w-5" />,
    path: "/attendance",
    roles: ["admin", "hr", "employee"],
  },
  {
    title: "Leave Management",
    icon: <FileText className="h-5 w-5" />,
    path: "/leave",
    roles: ["admin", "hr", "employee"],
    children: [
      {
        title: "Apply Leave",
        path: "/leave/apply",
        roles: ["employee"],
      },
      {
        title: "Leave Requests",
        path: "/leave/requests",
        roles: ["admin", "hr"],
      },
      {
        title: "Leave History",
        path: "/leave/history",
        roles: ["admin", "hr", "employee"],
      },
    ],
  },
  {
    title: "Payroll",
    icon: <DollarSign className="h-5 w-5" />,
    path: "/payroll",
    roles: ["admin", "hr"],
  },
  {
    title: "Recruitment",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    path: "/recruitment",
    roles: ["admin", "hr"],
    children: [
      {
        title: "Job Postings",
        path: "/recruitment/jobs",
        roles: ["admin", "hr"],
      },
      {
        title: "Applications",
        path: "/recruitment/applications",
        roles: ["admin", "hr"],
      },
      {
        title: "Internal Jobs",
        path: "/recruitment/internal",
        roles: ["admin", "hr", "employee"],
      },
    ],
  },
  {
    title: "Internal Job Posting",
    icon: <Briefcase className="h-5 w-5" />,
    path: "/recruitment/internal",
    roles: ["employee"],
  },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Check if menu item should be visible based on user role
  const isMenuItemVisible = (roles: string[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  // Check if a path is active
  const isPathActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/dashboard";
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center w-full justify-between">
          {!collapsed && (
            <span className="text-xl font-bold text-brand-500">WorkNet360</span>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems
            .filter((item) => isMenuItemVisible(item.roles))
            .map((item) => {
              const isActive = isPathActive(item.path);
              const hasChildren = item.children && item.children.length > 0;
              const visibleChildren = hasChildren
                ? item.children?.filter((child) => isMenuItemVisible(child.roles))
                : [];
              const hasVisibleChildren = visibleChildren && visibleChildren.length > 0;

              return (
                <div key={item.title} className="space-y-1">
                  {hasVisibleChildren ? (
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                        collapsed && "px-2"
                      )}
                      onClick={() => toggleMenu(item.title)}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        {!collapsed && (
                          <>
                            <span className="ml-3">{item.title}</span>
                            <div className="ml-auto">
                              {expandedMenus[item.title] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </Button>
                  ) : (
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => cn(
                        "flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
                        collapsed && "px-2 justify-center"
                      )}
                    >
                      {item.icon}
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  )}

                  {/* Dropdown menu */}
                  {hasVisibleChildren && expandedMenus[item.title] && !collapsed && (
                    <div className="pl-10 space-y-1">
                      {visibleChildren?.map((child) => (
                        <NavLink
                          key={child.title}
                          to={child.path}
                          className={({ isActive }) => cn(
                            "flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground"
                          )}
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
