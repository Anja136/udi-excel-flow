
import React from 'react';
import { Database } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-transparent text-primary-foreground py-4 px-6 flex items-center justify-between w-full h-16 absolute top-0 z-50">
      <div className="flex-1"></div> {/* Left spacer */}
      <div className="flex items-center space-x-2">
        <Database className="h-6 w-6" />
        <h1 className="text-xl font-bold text-center">UDI Small Edition</h1>
      </div>
      <div className="flex-1 text-right text-sm opacity-80">
        <span>Streamline your regulatory submissions</span>
      </div>
    </header>
  );
};

export default Header;
