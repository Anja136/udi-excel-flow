
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Report = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">UDI Reports</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Generate and export reports for UDI device data.</p>
          <p className="text-muted-foreground">No reports have been generated yet. Configure your report parameters to get started.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
