
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
  Download,
  History,
  Upload,
  Send,
} from "lucide-react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const bulkMaintenanceItems = [
    {
      title: "Download Data",
      path: "/",
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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-sidebar-foreground/70 uppercase">Bulk Maintenance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bulkMaintenanceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                    onClick={() => navigate(item.path)}
                    className={`
                      hover:bg-sidebar-primary hover:text-sidebar-primary-foreground
                      transition-colors duration-200
                      ${isActive(item.path) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
                    `}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
