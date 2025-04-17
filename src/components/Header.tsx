
import React from 'react';
import { Database } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Database className="h-6 w-6" />
        <h1 className="text-xl font-bold">UDI Device Data Manager</h1>
      </div>
      <div className="text-sm">
        <span className="opacity-80">Streamline your regulatory submissions</span>
      </div>
    </header>
  );
};

export default Header;
