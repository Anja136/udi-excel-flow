
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Hub from "@/pages/Hub";
import Report from "@/pages/Report";
import DeviceStatusCockpit from "@/pages/DeviceStatusCockpit";
import DownloadHistory from "@/pages/DownloadHistory";
import Placeholder from "@/pages/Placeholder";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/download-data" element={<Index />} />
      <Route path="/dashboard" element={<Hub />} />
      <Route path="/devices" element={<DeviceStatusCockpit />} />
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
  );
};

export default AppRoutes;
