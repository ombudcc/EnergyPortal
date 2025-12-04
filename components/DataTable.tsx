import React, { useState, useMemo } from 'react';
import { Database, Download, ArrowUpDown } from 'lucide-react';
import { TextContent, Language, ColumnDef } from '../types';
import { texts } from '../data/constants';

interface DataTableProps {
  title: string;
  data: any[];
  columns: ColumnDef[];
  activeLang: Language;
  filename?: string;
}

const arrayToCSV = (data: any[], columns: ColumnDef[], T: TextContent, activeLang: Language) => {
  const columnLabels = columns.map(col => col.label).join(',');
  const nameKey = activeLang === 'TR' ? 'name' : 'nameEN';

  const rows = data.map(item => {
    return columns.map(col => {
      let value = item[col.key];

      // Logic for language dependent name fields
      if (col.key === 'name' || col.key === 'nameEN') {
        value = item[nameKey] || item.name;
      } else if (col.render) {
         // Note: render usually returns JSX, so we rely on raw value or simple strings for CSV if possible
         // For complexity, we just take the raw value for CSV if render exists but relies on JSX
         // A more robust solution involves a 'csvRender' property, but we use raw item[key] primarily
         value = item[col.key]; 
      }

      const strValue = String(value).replace(/"/g, '""');
      return `"${strValue}"`;
    }).join(',');
  }).join('\n');

  return columnLabels + '\n' + rows;
};

const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) { 
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const DataTable: React.FC<DataTableProps> = ({ title, data, columns, activeLang, filename }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({ key: 'value', direction: 'desc' });
  const T = texts[activeLang];
  const nameKey = activeLang === 'TR' ? 'name' : 'nameEN';

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null && sortableItems.length > 0) {
      sortableItems.sort((a, b) => {
        const key = sortConfig.key;

        let aVal = a[key];
        let bVal = b[key];

        if (key === 'name' || key === 'nameEN') {
            aVal = a[nameKey] || a.name;
            bVal = b[nameKey] || b.name;
        }

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortConfig.direction === 'asc' 
            ? aVal.localeCompare(bVal, activeLang === 'TR' ? 'tr' : 'en') 
            : bVal.localeCompare(aVal, activeLang === 'TR' ? 'tr' : 'en');
        }

        if (aVal < bVal) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig, activeLang, nameKey]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const handleExport = () => {
    const csvContent = arrayToCSV(data, columns, T, activeLang);
    downloadCSV(csvContent, filename || 'veri_aktarimi.csv');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <h4 className="font-semibold text-slate-700 flex items-center gap-2"><Database size={16} className="text-blue-500" /> {title}</h4>
        <div className='flex items-center gap-4'>
           <button 
              onClick={handleExport}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-200 transition-colors flex items-center gap-1"
            >
                <Download size={14} /> {T.exportButton}
           </button>
           <span className="text-xs text-slate-400 font-medium bg-white px-2 py-1 rounded border">{T.tableCount(data.length)}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-3 cursor-pointer hover:bg-slate-100 transition-colors group select-none" onClick={() => requestSort(col.key)}>
                  <div className="flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown size={12} className={`text-slate-400 ${sortConfig?.key === col.key ? 'text-blue-600 opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, i) => (
              <tr key={i} className="bg-white border-b border-slate-50 hover:bg-blue-50/30 transition-colors">
                {columns.map((col, colIndex) => {
                  
                  let cellContent;
                  if (col.key === 'name' || col.key === 'nameEN') {
                     cellContent = item[nameKey] || item.name;
                  } else if (col.render) {
                    cellContent = col.render(item[col.key], item);
                  } else {
                    cellContent = item[col.key];
                  }

                  return (
                    <td key={colIndex} className={`px-6 py-3 ${col.className || ''}`}>
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;