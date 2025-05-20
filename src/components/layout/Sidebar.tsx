import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ListTodo,
  Clock,
  CalendarRange,
  DollarSign,
  Briefcase,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  UserCircle,
  Bell,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuItemProps {
  path: string;
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
  end?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  path,
  label,
  icon,
  collapsed,
  end = false,
  onClick,
}) => {
  const activeClasses =
    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground";
  const inactiveClasses =
    "text-muted-foreground hover:bg-muted hover:text-foreground";

  return (
    <NavLink
      to={path}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
          isActive ? activeClasses : inactiveClasses
        )
      }
      onClick={onClick}
    >
      <div className="shrink-0">{icon}</div>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

interface MenuGroupProps {
  title: string;
  children: React.ReactNode;
  collapsed: boolean;
}

const MenuGroup: React.FC<MenuGroupProps> = ({ title, children, collapsed }) => (
  <div className="px-3 py-2">
    {!collapsed && (
      <h3 className="mb-2 text-xs font-semibold text-muted-foreground">
        {title}
      </h3>
    )}
    <nav className="space-y-1">{children}</nav>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const sidebarContent = (
    <div
      className={`h-full flex flex-col ${
        collapsed ? "w-[70px]" : "w-[250px]"
      } transition-width duration-300 bg-background border-r`}
    >
      <div
        className={`h-14 flex items-center pl-4 pr-2 border-b ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <div className="font-semibold text-lg text-primary">WorkNet360</div>
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCollapse}
            className="h-8 w-8"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto pt-3">
        <MenuGroup title="Main" collapsed={collapsed}>
          {/* Regular dashboard for regular employees */}
          {user?.role === "employee" && (
            <MenuItem
              path="/dashboard"
              label="Dashboard"
              icon={<LayoutDashboard size={20} />}
              collapsed={collapsed}
              onClick={() => setOpen(false)}
            />
          )}

          {/* Admin Dashboard link specifically for admin users */}
          {user?.role === "admin" && (
            <MenuItem
              path="/admin/dashboard"
              label="Admin Dashboard"
              icon={<LayoutDashboard size={20} />}
              collapsed={collapsed}
              onClick={() => setOpen(false)}
            />
          )}

          {/* HR Dashboard link specifically for HR users */}
          {user?.role === "hr" && (
            <MenuItem
              path="/hr/dashboard"
              label="HR Dashboard"
              icon={<LayoutDashboard size={20} />}
              collapsed={collapsed}
              onClick={() => setOpen(false)}
            />
          )}

          {(user?.role === "admin" || user?.role === "hr") && (
            <MenuItem
              path="/employees"
              label="Employees"
              icon={<Users size={20} />}
              collapsed={collapsed}
              onClick={() => setOpen(false)}
            />
          )}
        </MenuGroup>

        <MenuGroup title="Work Management" collapsed={collapsed}>
          <MenuItem
            path="/tasks"
            label="Tasks"
            icon={<ListTodo size={20} />}
            collapsed={collapsed}
            onClick={() => setOpen(false)}
          />
          <MenuItem
            path="/attendance"
            label="Attendance"
            icon={<Clock size={20} />}
            collapsed={collapsed}
            onClick={() => setOpen(false)}
          />
        </MenuGroup>

        <MenuGroup title="Leave Management" collapsed={collapsed}>
          {user?.role === "employee" && (
            <MenuItem
              path="/leave/apply"
              label="Apply Leave"
              icon={<CalendarRange size={20} />}
              collapsed={collapsed}
              onClick={() => setOpen(false)}
            />
          )}
          {(user?.role === "admin" || user?.role === "hr") && (
            <MenuItem
              path="/leave/requests"
              label="Leave Requests"
              icon={<CalendarRange size={20} />}
              collapsed={collapsed}
              onClick={() => setOpen(false)}
            />
          )}
          <MenuItem
            path="/leave/history"
            label="Leave History"
            icon={<CalendarRange size={20} />}
            collapsed={collapsed}
            onClick={() => setOpen(false)}
          />
        </MenuGroup>

        <MenuGroup title="Finance & Recruitment" collapsed={collapsed}>
          {(user?.role === "admin" || user?.role === "hr") && (
            <MenuItem
              path="/payroll"
              label="Payroll"
              icon={<DollarSign size={20} />}
              collapsed={collapsed}
              onClick={() => setOpen(false)}
            />
          )}
          {(user?.role === "admin" || user?.role === "hr") && (
            <MenuItem
              path="/recruitment/jobs"
              label="Job Postings"
              icon={<Briefcase size={20} />}
              collapsed={collapsed}
              onClick={() => setOpen(false)}
            />
          )}
          {(user?.role === "admin" || user?.role === "hr") && (
            <MenuItem
              path="/recruitment/applications"
              label="Applications"
              icon={<Briefcase size={20} />}
              collapsed={collapsed}
              onClick={() => setOpen(false)}
            />
          )}
          <MenuItem
            path="/recruitment/internal"
            label="Internal Jobs"
            icon={<Briefcase size={20} />}
            collapsed={collapsed}
            onClick={() => setOpen(false)}
          />
        </MenuGroup>
      </div>

      <div className="border-t p-3">
        <div className={`flex ${collapsed ? "justify-center" : "gap-3"} mb-3`}>
          <MenuItem
            path="/profile"
            label="Profile"
            icon={<UserCircle size={20} />}
            collapsed={collapsed}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className={`flex ${collapsed ? "justify-center" : "gap-3"}`}>
          <MenuItem
            path="/settings"
            label="Settings"
            icon={<Settings size={20} />}
            collapsed={collapsed}
            onClick={() => setOpen(false)}
          />
        </div>
        <Button
          variant="ghost"
          className={`w-full mt-3 gap-3 justify-${
            collapsed ? "center" : "start"
          } text-muted-foreground hover:text-foreground hover:bg-muted`}
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden fixed top-3 left-3 z-20"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 max-w-[250px]">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return sidebarContent;
};

export default Sidebar;
