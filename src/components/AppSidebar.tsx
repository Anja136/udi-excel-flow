
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  HardDrive,
  FileDown,
  History,
  Upload,
  Send,
  Download,
  FileText,
  BarChart3,
  Clock,
  Settings,
  HelpCircle,
  BookOpen,
  Star,
  Bell
} from "lucide-react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const mainMenuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Devices",
      path: "/devices",
      icon: HardDrive,
    },
    {
      title: "Templates",
      path: "/templates",
      icon: FileText,
    },
    {
      title: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
    {
      title: "Audit Log",
      path: "/audit",
      icon: Clock,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const bulkMaintenanceItems = [
    {
      title: "Download Data",
      path: "/download-data",
      icon: Download,
    },
    {
      title: "Download History",
      path: "/download-history",
      icon: History,
    },
    {
      title: "Upload Data",
      path: "/upload-data",
      icon: Upload,
    },
    {
      title: "Submit",
      path: "/submit",
      icon: Send,
    },
  ];

  const guidanceItems = [
    {
      title: "Getting Started",
      path: "/getting-started",
      icon: HelpCircle,
    },
    {
      title: "What's New",
      path: "/whats-new",
      icon: Bell,
    },
    {
      title: "User Guide",
      path: "/user-guide",
      icon: BookOpen,
    },
    {
      title: "Trust Center",
      path: "/trust-center",
      icon: Star,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderMenuItems = (items: typeof mainMenuItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton 
            isActive={isActive(item.path)}
            onClick={() => navigate(item.path)}
            style={isActive(item.path) ? { backgroundColor: '#1A1F2C', color: 'white' } : undefined}
            className={isActive(item.path) 
              ? "" // Using inline style for active state to ensure it works
              : "hover:bg-[#F1F5F9] hover:text-[#0F172A] text-[#475569]"}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold flex items-center justify-between">
            UDI Nexus Hub
          </h1>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(mainMenuItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Bulk Maintenance</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(bulkMaintenanceItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="flex-grow"></div>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>User Guidance</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(guidanceItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
