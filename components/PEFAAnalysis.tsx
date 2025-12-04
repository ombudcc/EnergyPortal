
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Home, TrendingUp, Handshake, XCircle, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { Language } from '../types';
import { texts, masterData, COLORS } from '../data/constants';
import StatCard from './StatCard';
import DataTable from './DataTable';

interface PEFAAnalysisProps {
  activeLang: Language;
}

const PEFAAnalysis: React.FC<PEFAAnalysisProps> = ({ activeLang }) => {
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  
  const T = texts[activeLang];
  const data = masterData.pefa;
  const nameKey = activeLang === 'TR' ? 'name' : 'nameEN';
  const totalUse = data.finalUseBySector.reduce((acc, curr) => acc + curr.value, 0);
  const formatNumber = (value: number) => new Intl.NumberFormat(activeLang === 'TR' ? 'tr-TR' : 'en-US').format(value);
  const formatPercent = (val: number | string) => activeLang === 'TR' ? `%${val}` : `${val}%`;

  const tooltipStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    color: '#1e293b',
    fontSize: '12px',
    padding: '8px 12px',
  };

  const handlePieClick = (entry: any) => {
    const key = entry[nameKey] || entry.payload[nameKey];
    setSelectedFuel(prev => prev === key ? null : key);
  };

  const handleKeyDown = (e: React.KeyboardEvent, entry: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePieClick(entry);
    }
  };

  // Filter table data based on selection
  const filteredFuelData = selectedFuel 
    ? data.finalUseByFuel.filter(item => item[nameKey] === selectedFuel)
    : data.finalUseByFuel;

  // PEFA Sütun Başlıkları
  const sectorColumns = [
    { key: nameKey, label: T.tableColSector, className: 'font-medium' },
    { key: 'value', label: `${T.tableColConsumption} (PJ)`, render: (val: number) => formatNumber(val), className: 'font-mono' },
    { key: 'value', label: T.tableColShare, render: (val: number) => {
      const share = (val / totalUse) * 100;
      return <span className="px-2 py-1 bg-slate-100 rounded-full text-xs font-bold">{formatPercent(share.toFixed(1))}</span>
    }}
  ];
  
  // Yakıt Sütun Başlıkları
  const fuelColumns = [
    { key: nameKey, label: T.tableColFuelType, className: 'font-medium' },
    { key: 'share', label: T.unitPay, render: (val: number) => <span className="text-purple-600 font-bold">{formatPercent(val)}</span> }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard T={T} title={`${T.pefaTotalUse} (${data.year})`} value={totalUse} unit="PJ" subtext={`1 PJ = 10^3 TJ`} icon={TrendingUp} color="blue" />
        <StatCard T={T} title={data.finalUseByFuel[0][nameKey]} value={data.finalUseByFuel[0].share} unit="%" subtext={T.pefaTopFuel} icon={Handshake} color="orange" />
        <StatCard T={T} title={data.finalUseBySector[0][nameKey]} value={data.finalUseBySector[0].value} unit="PJ" subtext={T.pefaTopSector} icon={Home} color="green" />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
           <h3 className="text-lg font-bold text-slate-800">{T.pefaTitle1} ({data.year})</h3>
           {selectedFuel && (
             <button 
               onClick={() => setSelectedFuel(null)}
               className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors"
               aria-label={activeLang === 'TR' ? 'Filtreyi temizle' : 'Clear filter'}
             >
               <XCircle size={14} />
               {activeLang === 'TR' ? 'Filtreyi Temizle' : 'Clear Filter'}: {selectedFuel}
             </button>
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sektör Dağılım Grafiği (Horizontal Bar Chart) - Left Column */}
          <div className="flex flex-col h-full" role="region" aria-label={`${T.pefaTable1} Chart`}>
             <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-full flex flex-col relative overflow-hidden min-h-[400px]">
                {/* Header */}
                <h4 className="font-semibold text-slate-800 mb-6 flex items-center justify-center gap-2 relative z-10">
                     <BarChart3 size={18} className="text-blue-500" />
                     {T.pefaTable1}
                </h4>
                
                {/* Chart */}
                <div className="flex-1 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={[...data.finalUseBySector].sort((a,b) => b.value - a.value)} 
                      layout="vertical" 
                      margin={{top: 0, right: 30, left: 30, bottom: 0}}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" tickFormatter={(val) => `${val}`} tick={{fontSize: 11, fill: '#64748b'}} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey={nameKey} width={110} tick={{fontSize: 11, fill: '#475569', fontWeight: 500}} axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={tooltipStyle}
                        formatter={(value: number) => {
                          const share = ((value / totalUse) * 100).toFixed(1);
                          return [`${formatNumber(value)} PJ (${formatPercent(share)})`, T.pefaUsageTooltip];
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} name={`${T.tableColConsumption} (PJ)`}>
                        {data.finalUseBySector.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>

          {/* Yakıt Dağılım Grafiği (PEFA Pie Chart) - Right Column */}
          <div className="flex flex-col h-full" role="region" aria-label={`${T.pefaTable2} Chart`}>
             <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-full flex flex-col relative overflow-hidden min-h-[400px]">
                {/* Chart Title */}
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center justify-center gap-2 relative z-10">
                     <PieIcon size={18} className="text-emerald-500" />
                     {T.pefaTable2}
                </h4>

                {/* Chart Area */}
                <div className="flex-1 w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart margin={{ top: 20 }}>
                      <Pie 
                          data={data.finalUseByFuel} 
                          cx="50%" 
                          cy="50%" 
                          innerRadius={70} 
                          outerRadius={95} 
                          paddingAngle={3}
                          cornerRadius={4}
                          stroke="none"
                          dataKey="share" 
                          nameKey={nameKey}
                          onClick={handlePieClick}
                          cursor="pointer"
                          labelLine={false}
                          label={(props: any) => {
                              const { percent } = props;
                              return formatPercent((percent * 100).toFixed(1)); 
                          }}
                      >
                        {data.finalUseByFuel.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.fill} 
                            className="transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            stroke={selectedFuel === entry[nameKey] ? '#1e293b' : 'none'}
                            strokeWidth={2}
                            opacity={selectedFuel && selectedFuel !== entry[nameKey] ? 0.3 : 1}
                            role="button"
                            tabIndex={0}
                            aria-label={`${entry[nameKey]}: ${formatPercent(entry.share)}`}
                            aria-pressed={selectedFuel === entry[nameKey]}
                            onKeyDown={(e) => handleKeyDown(e, entry)}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={tooltipStyle}
                        formatter={(value: number, name: string, props: any) => [
                          formatPercent(value.toFixed(1)), 
                          props.payload[nameKey]
                        ]} 
                        cursor={{ fill: 'transparent' }}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: '10px' }}
                        cursor="pointer"
                        verticalAlign="bottom"
                        iconType="circle"
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Centered Total Label in Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">{T.totalLabel}</span>
                        <span className="text-xl font-bold text-slate-700">{formatNumber(totalUse)}</span>
                        <span className="text-[10px] text-slate-500 font-medium">PJ</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTable 
          title={`${T.pefaTable1} (PJ)`} 
          data={data.finalUseBySector}
          columns={sectorColumns}
          activeLang={activeLang}
          filename="pefa_sektor_tuketim.csv"
        />
        <DataTable 
          title={`${T.pefaTable2} (%)`} 
          data={filteredFuelData}
          columns={fuelColumns}
          activeLang={activeLang}
          filename="pefa_yakit_paylari.csv"
        />
      </div>
    </div>
  );
};

export default PEFAAnalysis;
