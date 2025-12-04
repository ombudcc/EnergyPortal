import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: LucideIcon;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ active, onClick, label, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors group
      ${active 
        ? 'bg-blue-50 text-blue-700 font-semibold' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'}`}
  >
    <Icon size={18} className={`${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
    {label}
    {active && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-auto hidden md:block" />}
  </button>
);

export default SidebarButton;