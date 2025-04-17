
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Hub = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Hub Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent UDI device submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You haven't submitted any UDI data recently.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Common UDI management tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <a href="/" className="text-primary hover:underline">Download Data</a>
            <a href="/report" className="text-primary hover:underline">Generate Reports</a>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>All systems operational</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Hub;
