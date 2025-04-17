
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Hub from "./pages/Hub";
import Report from "./pages/Report";
import DownloadHistory from "./pages/DownloadHistory";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <div className="flex flex-1 w-full">
              <AppSidebar />
              <SidebarInset>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/hub" element={<Hub />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/download-history" element={<DownloadHistory />} />
                  <Route path="/upload-data" element={<Placeholder />} />
                  <Route path="/submit" element={<Placeholder />} />
                  <Route path="/handbook" element={<Placeholder />} />
                  <Route path="/getting-started" element={<Placeholder />} />
                  <Route path="/trust-center" element={<Placeholder />} />
                  <Route path="/help" element={<Placeholder />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SidebarInset>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
