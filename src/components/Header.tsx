import React from 'react';
import { Database } from 'lucide-react';
const Header = () => {
  return <header className="bg-[#091A36] text-white py-4 px-6 flex items-center justify-between w-full h-16">
      <div className="flex items-center space-x-2">
        <Database className="h-6 w-6" />
        <h1 className="text-xl font-bold text-left">Bulk Processing Space</h1>
      </div>
      <div className="flex-1 text-right text-sm opacity-80">
        <span>Manage UDI Data in Bulk</span>
      </div>
    </header>;
};
export default Header;