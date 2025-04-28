
import React from 'react';
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'register', label: 'Register Asset' },
    { id: 'transfer', label: 'Transfer Ownership' },
    { id: 'trace', label: 'Trace Asset' },
    { id: 'zkp', label: 'ZKP Proof' },
    { id: 'verify', label: 'CA Verify' },
  ];

  return (
    <nav className="bg-luxury-navy w-full py-2 px-4 rounded-lg shadow-lg mb-8">
      <div className="container mx-auto flex flex-wrap justify-center">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 mx-1 text-sm font-medium rounded-md transition-all duration-200",
              activeTab === tab.id 
                ? "bg-luxury-gold text-luxury-navy" 
                : "text-white hover:bg-opacity-20 hover:bg-luxury-gold"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
