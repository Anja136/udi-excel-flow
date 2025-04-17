
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  Download,
  Book,
  Rocket,
  Shield,
  HelpCircle,
} from "lucide-react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const mainMenuItems = [
    {
      title: "Hub",
      path: "/hub",
      icon: LayoutDashboard,
    },
    {
      title: "Report",
      path: "/report",
      icon: FileText,
    },
    {
      title: "Download Data",
      path: "/",
      icon: Download,
    },
  ];

  const helpMenuItems = [
    {
      title: "Handbook",
      path: "/handbook",
      icon: Book,
    },
    {
      title: "Getting Started",
      path: "/getting-started",
      icon: Rocket,
    },
    {
      title: "Trust Center",
      path: "/trust-center",
      icon: Shield,
    },
    {
      title: "Help & Support",
      path: "/help",
      icon: HelpCircle,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {helpMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
