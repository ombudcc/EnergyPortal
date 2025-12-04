import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { TextContent } from '../types';

interface StatCardProps {
  T: TextContent;
  title: string;
  value: number;
  unit: string;
  subtext?: string;
  icon?: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'gray';
  onClick?: () => void;
  isActive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ T, title, value, unit, subtext, icon: Icon, color, onClick, isActive }) => {
  const formatNumber = (val: number) => new Intl.NumberFormat(T.unitTJ === 'TJ' ? 'tr-TR' : 'en-US').format(val);

  const colorClasses = {
    blue: 'bg-blue-500 text-blue-600 ring-blue-500 border-blue-500',
    green: 'bg-emerald-500 text-emerald-600 ring-emerald-500 border-emerald-500',
    orange: 'bg-amber-500 text-amber-600 ring-amber-500 border-amber-500',
    purple: 'bg-purple-500 text-purple-600 ring-purple-500 border-purple-500',
    gray: 'bg-slate-500 text-slate-600 ring-slate-500 border-slate-500'
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm p-6 border transition-all 
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-200 group' : ''}
        ${isActive ? `ring-2 shadow-md transform scale-[1.02] ${colorClasses[color].split(' ').filter(c => c.startsWith('ring') || c.startsWith('border')).join(' ')}` : 'border-slate-100'}
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">
            {formatNumber(value)} <span className="text-sm font-normal text-slate-400">{unit}</span>
          </h3>
          {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg bg-opacity-10 ${color === 'blue' ? 'bg-blue-500 text-blue-600' : color === 'green' ? 'bg-emerald-500 text-emerald-600' : color === 'orange' ? 'bg-amber-500 text-amber-600' : color === 'purple' ? 'bg-purple-500 text-purple-600' : 'bg-slate-500 text-slate-600'}`}>
          {Icon && <Icon size={24} />}
        </div>
      </div>
      {onClick && (
        <div className="mt-3 text-right">
           <span className="text-[10px] text-blue-400 flex items-center justify-end gap-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
             {T.detailClick} <ChevronRight size={10} />
           </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;