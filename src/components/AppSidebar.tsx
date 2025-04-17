import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LayoutDashboard, HardDrive, History, Upload, Send, Download, BarChart3, Settings, HelpCircle, BookOpen, Star, Bell, User } from "lucide-react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [{
    title: "Agency Status Hub",
    path: "/dashboard",
    icon: LayoutDashboard
  }, {
    title: "Device Data Browser",
    path: "/devices",
    icon: HardDrive
  }, {
    title: "Reports",
    path: "/reports",
    icon: BarChart3
  }];

  const bulkMaintenanceItems = [{
    title: "Download Data",
    path: "/download-data",
    icon: Download
  }, {
    title: "Download History",
    path: "/download-history",
    icon: History
  }, {
    title: "Upload Data",
    path: "/upload-data",
    icon: Upload
  }, {
    title: "Submit",
    path: "/submit",
    icon: Send
  }];

  const guidanceItems = [{
    title: "Getting Started",
    path: "/getting-started",
    icon: HelpCircle
  }, {
    title: "What's New",
    path: "/whats-new",
    icon: Bell
  }, {
    title: "User Guide",
    path: "/user-guide",
    icon: BookOpen
  }];

  const userSettingsItems = [{
    title: "User Profile",
    path: "/profile",
    icon: User
  }, {
    title: "Settings",
    path: "/settings",
    icon: Settings
  }, {
    title: "Trust Center",
    path: "/trust-center",
    icon: Star
  }];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderMenuItems = (items: typeof mainMenuItems) => <SidebarMenu>
      {items.map(item => <SidebarMenuItem key={item.title}>
          <SidebarMenuButton isActive={isActive(item.path)} onClick={() => navigate(item.path)} style={isActive(item.path) ? {
        backgroundColor: '#091A36',
        color: 'white'
      } : undefined} className={isActive(item.path) ? "" // Using inline style for active state to ensure it works
      : "hover:bg-[#F1F5F9] hover:text-[#0F172A] text-[#475569]"}>
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>)}
    </SidebarMenu>;

  return <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold flex items-center justify-between">UDI Compact</h1>
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

        <SidebarGroup>
          <SidebarGroupLabel>User Guidance</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(guidanceItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>User Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(userSettingsItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
};

export default AppSidebar;
