
import React from 'react';
import { SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="h-16 w-full absolute top-0 z-40 bg-primary"></div> {/* Background for header */}
      <Header />
      <div className="flex w-full pt-16"> {/* Content area with padding top for header */}
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </div>
  );
};

export default AppLayout;
