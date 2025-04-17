
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Placeholder = () => {
  const location = useLocation();
  const pageName = location.pathname.substring(1).split('-').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">{pageName}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{pageName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is under construction. Check back later for updates.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Placeholder;
