import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, Activity, Truck, Home, Briefcase, Factory, Menu, X, PieChart as PieIcon, MousePointerClick, Filter, Globe, BarChart3, TrendingUp, ExternalLink, Database, Server, Flame, Plane, Train, FileText, List, Layers, Network } from 'lucide-react'; 
import { texts, masterData, uniqueFuels, SECTOR_MAP, COLORS, methodologyDetails } from './data/constants';
import { Language, SectorData } from './types';
import SidebarButton from './components/SidebarButton';
import StatCard from './components/StatCard';
import DataTable from './components/DataTable';
import PEFAAnalysis from './components/PEFAAnalysis';
import ChatBot from './components/ChatBot';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeFuel, setActiveFuel] = useState<string>('Tümü');
  const [activeLang, setActiveLang] = useState<Language>('TR');
  // State for interactive legend filtering
  const [hiddenKeys, setHiddenKeys] = useState<Record<string, string[]>>({});
  // State for Methodology sub-tabs
  const [methTab, setMethTab] = useState<'general' | 'definitions' | 'scope' | 'collection'>('general');

  const T = texts[activeLang]; 
  const nameKey = activeLang === 'TR' ? 'name' : 'nameEN';
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

  const toggleLegend = (chartId: string, val: any) => {
    // val corresponds to the payload item from the legend
    const key = val.value; 
    setHiddenKeys(prev => {
      const current = prev[chartId] || [];
      const isHidden = current.includes(key);
      // Toggle visibility: if hidden, remove from list; if visible, add to list
      const newHidden = isHidden ? current.filter(k => k !== key) : [...current, key];
      return { ...prev, [chartId]: newHidden };
    });
  };

  const handleChartClick = (data: any) => {
    if (!data) return;
    const sectorNamePart = data.name ? data.name.split(' ')[0] : data.activeLabel;
    const targetTab = SECTOR_MAP[sectorNamePart];
    if (targetTab) {
      setActiveTab(targetTab);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goHome = () => {
    setActiveTab('dashboard');
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFilteredTotal = (sectorData: SectorData, fuelFilter: string): number => {
    if (fuelFilter === 'Tümü') {
      return sectorData.total;
    }
    const filteredFuel = sectorData.fuelMix.find(f => f.name === fuelFilter);
    return filteredFuel ? filteredFuel.value : 0;
  };

  const getDashboardColumns = (totalConsumption: number) => [
    { key: 'name', label: T.tableColSector },
    { key: 'value', label: T.tableColConsumption, render: (val: number) => formatNumber(val), className: 'font-mono font-medium' },
    { key: 'value', label: T.tableColShare, render: (val: number) => {
      const total = totalConsumption > 0 ? totalConsumption : 1;
      return <span className="px-2 py-1 bg-slate-100 rounded-full text-xs font-bold">{formatPercent((val / total * 100).toFixed(1))}</span>
    }}
  ];
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': {
        const filteredIndustryTotal = getFilteredTotal(masterData.industry, activeFuel);
        const filteredServicesTotal = getFilteredTotal(masterData.services, activeFuel);
        const filteredTransportTotal = getFilteredTotal(masterData.transport, activeFuel);
        const filteredHouseholdTotal = getFilteredTotal(masterData.household, activeFuel);

        const overviewBarData = [
          { name: `${T.navIndustry} (${masterData.industry.year})`, value: filteredIndustryTotal, fill: COLORS.primary, sectorId: 'industry' },
          { name: `${T.navHousehold} (${masterData.household.year})`, value: filteredHouseholdTotal, fill: COLORS.success, sectorId: 'household' },
          { name: `${T.navTransport} (${masterData.transport.year})`, value: filteredTransportTotal, fill: COLORS.accent, sectorId: 'transport' },
          { name: `${T.navServices} (${masterData.services.year})`, value: filteredServicesTotal, fill: COLORS.purple, sectorId: 'services' },
        ];

        const overviewPieData = overviewBarData.map(item => ({
          name: item.name.split(' ')[0], 
          value: item.value, 
          fill: item.fill, 
          sectorId: item.sectorId
        }));
        
        const totalFilteredConsumption = overviewPieData.reduce((acc, curr) => acc + curr.value, 0);

        return (
          <div className="space-y-6 animate-fade-in">
            {/* Filter UI */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-4">
              <Filter size={20} className="text-blue-600" />
              <label htmlFor="fuelFilter" className="text-sm font-medium text-slate-700 whitespace-nowrap">
                {T.filterLabel}
              </label>
              <select 
                id="fuelFilter" 
                value={activeFuel} 
                onChange={(e) => setActiveFuel(e.target.value)}
                className="w-full sm:w-auto p-2 rounded-md border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {uniqueFuels.map(f => (
                  <option 
                    key={f.tr} 
                    value={f.tr} 
                  >
                    {activeLang === 'TR' ? f.tr : f.en}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard T={T} title={T.cardIndustry} value={filteredIndustryTotal} unit={T.unitTJ} subtext={`${T.dataYear}: ${masterData.industry.year}`} icon={Factory} color="blue" onClick={() => setActiveTab('industry')} />
              <StatCard T={T} title={T.cardHousehold} value={filteredHouseholdTotal} unit={T.unitTJ} subtext={`${T.dataYear}: ${masterData.household.year}`} icon={Home} color="green" onClick={() => setActiveTab('household')} />
              <StatCard T={T} title={T.cardTransport} value={filteredTransportTotal} unit={T.unitTJ} subtext={`${T.dataYear}: ${masterData.transport.year}`} icon={Truck} color="orange" onClick={() => setActiveTab('transport')} />
              <StatCard T={T} title={T.cardServices} value={filteredServicesTotal} unit={T.unitTJ} subtext={`${T.dataYear}: ${masterData.services.year}`} icon={Briefcase} color="purple" onClick={() => setActiveTab('services')} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative group">
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2"><Activity size={20} className="text-blue-500"/> {T.chartSectorConsumption}</h3>
                   <div className="flex items-center gap-1 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"><MousePointerClick size={12} /> {T.detailClick}</div>
                 </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={overviewBarData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tickFormatter={(val) => val > 999999 ? `${(val / 1000000).toFixed(1)}M` : `${(val / 1000).toFixed(0)}K`} />
                      <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
                      <Tooltip 
                        cursor={{fill: '#f1f5f9'}}
                        contentStyle={tooltipStyle}
                        formatter={(value: number) => {
                          const percent = totalFilteredConsumption > 0 ? (value / totalFilteredConsumption * 100).toFixed(1) : 0;
                          return [`${formatNumber(value)} ${T.unitTJ} (${formatPercent(percent)})`, T.chartTooltipConsumption];
                        }}
                      />
                      <Bar dataKey="value" name={T.chartTooltipConsumption} radius={[0, 4, 4, 0]} barSize={40} onClick={handleChartClick} cursor="pointer" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2"><PieIcon size={20} className="text-purple-500"/> {T.chartSectorShares}</h3>
                  <div className="flex items-center gap-1 text-xs text-purple-500 bg-purple-50 px-2 py-1 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"><MousePointerClick size={12} /> {T.detailClick}</div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={overviewPieData} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60} 
                        outerRadius={100} 
                        paddingAngle={5} 
                        dataKey="value" 
                        label={(props: any) => {
                            const { percent } = props;
                            return formatPercent((percent * 100).toFixed(1));
                        }}
                        onClick={handleChartClick} 
                        cursor="pointer"
                      >
                        {overviewPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity"/>)}
                      </Pie>
                      <Tooltip 
                        contentStyle={tooltipStyle}
                        formatter={(value: number, name: string, props: any) => [
                          `${formatNumber(value)} ${T.unitTJ}`, 
                          `${name} (${formatPercent((props.payload.percent * 100).toFixed(1))})`
                        ]} 
                      />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <DataTable 
                title={T.tableSummary(activeLang === 'TR' ? activeFuel : (uniqueFuels.find(f => f.tr === activeFuel)?.en || activeFuel))}
                data={overviewBarData} 
                columns={getDashboardColumns(totalFilteredConsumption)} 
                activeLang={activeLang}
                filename={`genel_bakis_ozet_${activeLang}.csv`}
              />
            </div>
          </div>
        );
      }
      
      case 'energyAccounts':
        return <PEFAAnalysis activeLang={activeLang} />;
        
      case 'industry': {
        const data = masterData.industry;
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">{T.titleSector(T.navIndustry)} ({data.year})</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{`${T.totalLabel}: ${formatNumber(data.total)} ${T.unitTJ}`}</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.subSectors || []} layout="vertical" margin={{left: 20}}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 35]} />
                      <YAxis type="category" dataKey={nameKey} width={180} tick={{fontSize: 11}} />
                      <Tooltip 
                        cursor={{fill: '#f1f5f9'}}
                        contentStyle={tooltipStyle}
                        formatter={(val: number) => [formatPercent(val), T.unitPay]}
                      />
                      <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} name={T.unitPay} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                          data={data.fuelMix} 
                          cx="50%" 
                          cy="50%" 
                          innerRadius={60} 
                          outerRadius={100} 
                          fill="#8884d8" 
                          paddingAngle={5} 
                          dataKey="value" 
                          label={(props: any) => {
                              const { payload, percent } = props;
                              const nameToDisplay = payload[nameKey] || payload.name;
                              const percentage = (percent * 100).toFixed(0);
                              return `${nameToDisplay.split(' ')[0]} ${formatPercent(percentage)}`; 
                          }}
                        >
                        {data.fuelMix.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />)}
                      </Pie>
                      <Tooltip 
                        contentStyle={tooltipStyle}
                        formatter={(value: number, name: string, props: any) => [
                          `${formatNumber(value)} ${T.unitTJ}`, 
                          `${props.payload[nameKey]} (${formatPercent((props.payload.value / data.total * 100).toFixed(1))})`
                        ]} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Industry Specific Insight Card from PDF */}
            {data.focusSector && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-md p-6 text-white">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                   <div className="flex-1">
                      <h4 className="text-blue-400 font-medium mb-1">{T.industryFocusTitle}</h4>
                      <h3 className="text-xl font-bold mb-2">{data.focusSector[nameKey as 'name' | 'nameEN']}</h3>
                      <p className="text-slate-400 text-sm">{T.industryFocusSub}</p>
                   </div>
                   <div className="h-40 w-full md:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.focusSector.fuelMix} layout="vertical" margin={{left: 10, right: 20}}>
                          <XAxis type="number" hide />
                          <YAxis type="category" dataKey={nameKey} width={120} tick={{fill: '#94a3b8', fontSize: 11}} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px', padding: '8px 12px'}}
                            itemStyle={{color: '#f8fafc'}}
                            formatter={(val: number) => [formatPercent(val), T.unitPay]}
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                          />
                          <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={12} name={T.unitPay} />
                        </BarChart>
                    </ResponsiveContainer>
                   </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataTable 
                title={`${T.navIndustry} ${T.tableColSubsector} (${T.unitPay})`} 
                data={data.subSectors || []}
                columns={[
                  { key: 'code', label: T.tableColNace, className: 'text-slate-400 text-xs' },
                  { key: nameKey, label: T.tableColSubsector, className: 'font-medium' },
                  { key: 'value', label: T.unitPay, render: (val) => <span className="text-blue-600 font-bold">{formatPercent(val)}</span> }
                ]}
                activeLang={activeLang}
                filename={`sanayi_alt_sektorler_${activeLang}.csv`}
              />
              <DataTable 
                title={`${T.navIndustry} ${T.tableColFuelSource} (${T.unitTJ})`}
                data={data.fuelMix}
                columns={[
                  { key: nameKey, label: T.tableColFuelSource, className: 'font-medium' },
                  { key: 'value', label: T.tableColConsumption, render: (val) => formatNumber(val), className: 'font-mono' }
                ]}
                activeLang={activeLang}
                filename={`sanayi_yakit_paylari_${activeLang}.csv`}
              />
            </div>
          </div>
        );
      }
      
      case 'services': {
        const data = masterData.services;
        return (
          <div className="space-y-6 animate-fade-in">
             {/* Data Center Highlight Card - Specific PDF Data */}
             {data.dataCenters && (
               <div className="grid grid-cols-1">
                 <StatCard 
                   T={T} 
                   title={T.dataCentersTitle} 
                   value={data.dataCenters.value} 
                   unit={data.dataCenters.unit} 
                   subtext={T.dataCentersSub} 
                   icon={Server} 
                   color="gray" 
                   isActive={true}
                 />
               </div>
             )}

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">{T.titleSector(T.navServices)} ({data.year})</h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">{`${T.totalLabel}: ${formatNumber(data.total)} ${T.unitTJ}`}</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-72">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.subSectors || []} layout="vertical" margin={{left: 10, right: 30}}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" domain={[0, 'auto']} />
                        <YAxis type="category" dataKey={nameKey} width={180} tick={{fontSize: 11}} />
                        <Tooltip 
                          cursor={{fill: '#f1f5f9'}}
                          contentStyle={tooltipStyle}
                          formatter={(val: number) => [formatPercent(val), T.unitPay]}
                        />
                        <Bar dataKey="value" fill={COLORS.purple} radius={[0, 4, 4, 0]} barSize={20} name={T.unitPay} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
                <div className="h-72">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                            data={data.fuelMix} 
                            cx="50%" 
                            cy="50%" 
                            innerRadius={50} 
                            outerRadius={80} 
                            fill="#8884d8" 
                            paddingAngle={5} 
                            dataKey="value" 
                            label={(props: any) => {
                                const { payload, percent } = props;
                                const nameToDisplay = payload[nameKey] || payload.name;
                                const percentage = (percent * 100).toFixed(0);
                                return `${nameToDisplay.split(' ')[0]} ${formatPercent(percentage)}`; 
                            }}
                          >
                          {data.fuelMix.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />)}
                        </Pie>
                        <Tooltip 
                          contentStyle={tooltipStyle}
                          formatter={(value: number, name: string, props: any) => [
                            `${formatNumber(value)} ${T.unitTJ}`, 
                            `${props.payload[nameKey]} (${formatPercent((props.payload.value / data.total * 100).toFixed(1))})`
                          ]} 
                        />
                      </PieChart>
                   </ResponsiveContainer>
                </div>
              </div>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataTable 
                title={`${T.navServices} ${T.tableColActivity} (${T.unitPay})`} 
                data={data.subSectors || []}
                columns={[
                  { key: 'code', label: T.tableColNace, className: 'text-slate-400 text-xs' },
                  { key: nameKey, label: T.tableColActivity, className: 'font-medium' },
                  { key: 'value', label: T.unitPay, render: (val) => <span className="text-purple-600 font-bold">{formatPercent(val)}</span> }
                ]}
                activeLang={activeLang}
                filename={`hizmet_alt_sektorler_${activeLang}.csv`}
              />
              <DataTable 
                title={`${T.navServices} ${T.tableColFuelSource} (${T.unitTJ})`} 
                data={data.fuelMix}
                columns={[
                  { key: nameKey, label: T.tableColFuelSource, className: 'font-medium' },
                  { key: 'value', label: T.tableColConsumption, render: (val) => formatNumber(val), className: 'font-mono' }
                ]}
                activeLang={activeLang}
                filename={`hizmet_yakit_paylari_${activeLang}.csv`}
              />
            </div>
          </div>
        );
      }

      case 'transport': {
        const data = masterData.transport;
        
        // --- PREPARE DATA FOR ROAD VEHICLES WITH INTERACTIVE LEGEND ---
        // 1. Assign stable colors to original data
        const roadVehiclesWithColors = (data.roadVehicles || []).map((item, index) => ({
          ...item,
          fill: COLORS.chart[index % COLORS.chart.length]
        }));
        
        // 2. Filter data based on hidden items state
        const visibleRoadVehicles = roadVehiclesWithColors.filter(item => 
          !hiddenKeys['transport-vehicles']?.includes(item[nameKey as keyof typeof item] as string)
        );

        // 3. Create payload for Legend to show all items (including hidden ones in gray)
        const roadVehiclesLegendPayload = roadVehiclesWithColors.map(item => ({
          value: item[nameKey as keyof typeof item],
          type: 'circle',
          id: item[nameKey as keyof typeof item],
          color: hiddenKeys['transport-vehicles']?.includes(item[nameKey as keyof typeof item] as string) ? '#94a3b8' : item.fill,
        }));

        return (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <StatCard T={T} title={`${T.road} (${data.year})`} value={data.roadTotal || 0} unit={T.unitTJ} icon={Truck} color="orange" />
               <StatCard T={T} title={`${T.aviation} (${data.year})`} value={data.aviationTotal || 0} unit={T.unitTJ} icon={Plane} color="blue" />
               <StatCard T={T} title={`${T.rail} (${data.year})`} value={data.railTotal || 0} unit={T.unitTJ} icon={Train} color="purple" />
            </div>

            {/* Modal Split Analysis (Aviation & Rail) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {data.aviationSplit && (
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                       <Plane size={16} className="text-blue-500" /> {T.aviationSplitTitle}
                    </h4>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie data={data.aviationSplit} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" nameKey={nameKey}>
                               <Cell fill="#3b82f6" />
                               <Cell fill="#93c5fd" />
                            </Pie>
                            <Tooltip 
                              contentStyle={tooltipStyle}
                              formatter={(val: number, name) => [formatPercent(val), name]} 
                            />
                            <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{fontSize: '11px'}} />
                         </PieChart>
                      </ResponsiveContainer>
                    </div>
                 </div>
               )}
               {data.railSplit && (
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                       <Train size={16} className="text-purple-500" /> {T.railSplitTitle}
                    </h4>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie data={data.railSplit} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" nameKey={nameKey}>
                               <Cell fill="#8b5cf6" />
                               <Cell fill="#c4b5fd" />
                            </Pie>
                            <Tooltip 
                              contentStyle={tooltipStyle}
                              formatter={(val: number, name) => [formatPercent(val), name]} 
                            />
                            <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{fontSize: '11px'}} />
                         </PieChart>
                      </ResponsiveContainer>
                    </div>
                 </div>
               )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">{T.titleSector(T.navTransport)} ({data.year}) - {T.roadDetails}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Road Vehicles Pie Chart with Interactive Legend */}
                 <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={visibleRoadVehicles} 
                          cx="50%" 
                          cy="50%" 
                          innerRadius={60} 
                          outerRadius={80} 
                          paddingAngle={2} 
                          dataKey="value" 
                          label={({payload}) => payload[nameKey]} 
                          labelLine={false} 
                          nameKey={nameKey}
                        >
                           {visibleRoadVehicles.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip 
                          contentStyle={tooltipStyle}
                          formatter={(val: number, name, props) => [formatPercent(val), props.payload[nameKey]]} 
                        />
                        <Legend 
                          payload={roadVehiclesLegendPayload as any}
                          onClick={(e) => toggleLegend('transport-vehicles', e)}
                          wrapperStyle={{ paddingTop: '10px' }}
                          cursor="pointer"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={data.roadFuels} layout="vertical" margin={{left: 20}}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis type="category" dataKey={nameKey} width={100} tick={{fontSize: 12}} />
                          <Tooltip 
                            contentStyle={tooltipStyle}
                            formatter={(val: number) => [formatPercent(val), T.unitPay]} 
                          />
                          <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={30} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataTable 
                title={`${T.navTransport} ${T.tableColVehicleType} (${T.unitPay})`} 
                data={data.roadVehicles || []}
                columns={[
                  { key: nameKey, label: T.tableColVehicleType, className: 'font-medium' },
                  { key: 'value', label: T.unitPay, render: (val) => <span className="text-amber-600 font-bold">{formatPercent(val)}</span> }
                ]}
                activeLang={activeLang}
                filename={`ulasim_arac_tipleri_${activeLang}.csv`}
              />
              <DataTable 
                title={`${T.allTransportFuels} (${T.unitTJ})`} 
                data={data.fuelMix}
                columns={[
                  { key: nameKey, label: T.tableColFuelType, className: 'font-medium' },
                  { key: 'value', label: T.tableColConsumption, render: (val) => formatNumber(val), className: 'font-mono' }
                ]}
                activeLang={activeLang}
                filename={`ulasim_yakit_paylari_${activeLang}.csv`}
              />
            </div>
          </div>
        );
      }

      case 'household': {
        const data = masterData.household;

        // --- PREPARE DATA FOR HOUSEHOLD FUEL PREFERENCES WITH INTERACTIVE LEGEND ---
        // 1. Assign stable colors to original data
        const fuelMixWithColors = data.fuelMix.map((item, index) => ({
          ...item,
          fill: COLORS.chart[index % COLORS.chart.length]
        }));
        
        // 2. Filter data based on hidden items state
        const visibleFuelMix = fuelMixWithColors.filter(item => 
          !hiddenKeys['household-fuels']?.includes(item[nameKey as keyof typeof item] as string)
        );

        // 3. Create payload for Legend
        const fuelMixLegendPayload = fuelMixWithColors.map(item => ({
          value: item[nameKey as keyof typeof item],
          type: 'circle',
          id: item[nameKey as keyof typeof item],
          color: hiddenKeys['household-fuels']?.includes(item[nameKey as keyof typeof item] as string) ? '#94a3b8' : item.fill,
        }));

        return (
          <div className="space-y-6 animate-fade-in">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Home size={24} className="text-emerald-500"/>
                      {T.titleSector(T.navHousehold)}
                    </h3>
                    <span className="text-sm text-slate-500 ml-8">{T.dataYear}: {data.year}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">{T.totalLabel}</span>
                    <span className="text-lg font-bold text-emerald-700">{formatNumber(data.total)} <span className="text-xs font-medium">{T.unitTJ}</span></span>
                </div>
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                 {/* Left Column: Usage Purposes - Vertically Centered */}
                 <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
                        <Activity size={18} className="text-emerald-500" />
                        {T.usagePurposes}
                    </h4>
                    <div className="space-y-5 pr-2">
                        {data.uses?.map((use, idx) => (
                        <div key={idx} className="group">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{use[nameKey as keyof typeof use]}</span>
                                <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors border border-slate-200 group-hover:border-emerald-200">{formatPercent(use.value)}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-100">
                                <div className="bg-emerald-500 h-2.5 rounded-full shadow-sm transition-all duration-700 ease-out group-hover:bg-emerald-400 relative overflow-hidden" style={{width: `${use.value}%`}}>
                                   <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                 </div>
                 
                 {/* Right Column: Fuel Preferences (Redesigned with Interactive Legend) */}
                 <div className="lg:col-span-5 flex flex-col h-full">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-full flex flex-col relative overflow-hidden min-h-[400px]">
                        {/* Title */}
                        <h4 className="font-semibold text-slate-800 mb-2 flex items-center justify-center gap-2 relative z-10">
                             <PieIcon size={18} className="text-emerald-500" />
                             {T.fuelPreferences}
                        </h4>
                        
                        {/* Chart Area */}
                        <div className="flex-1 w-full relative flex items-center justify-center">
                          <ResponsiveContainer width="100%" height={320}>
                            <PieChart>
                              <Pie 
                                data={visibleFuelMix} 
                                cx="50%" 
                                cy="45%" 
                                innerRadius={70} 
                                outerRadius={100} 
                                paddingAngle={3}
                                dataKey="value" 
                                nameKey={nameKey}
                                cornerRadius={4}
                                stroke="none"
                              >
                                {visibleFuelMix.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value: number, name, props) => {
                                   const percent = data.total > 0 ? (value / data.total * 100).toFixed(1) : "0.0";
                                   return [`${formatNumber(value)} ${T.unitTJ} (${formatPercent(percent)})`, T.tableColConsumption];
                                }} 
                                contentStyle={tooltipStyle}
                                cursor={{ fill: 'transparent' }}
                              />
                              <Legend 
                                payload={fuelMixLegendPayload as any}
                                onClick={(e) => toggleLegend('household-fuels', e)}
                                wrapperStyle={{ paddingTop: '10px' }}
                                cursor="pointer"
                                verticalAlign="bottom"
                              />
                            </PieChart>
                          </ResponsiveContainer>
                          
                          {/* Centered Total Label in Donut (Visible only if some data is present) */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8" style={{ top: '-40px' }}>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">{T.totalLabel}</span>
                                <span className="text-xl font-bold text-slate-700">{formatNumber(data.total)}</span>
                                <span className="text-[10px] text-slate-500 font-medium">{T.unitTJ}</span>
                          </div>
                        </div>
                    </div>
                 </div>
               </div>
             </div>

             {/* Heating Fuel Mix Specific Chart */}
             {data.heatingFuels && (
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h4 className="font-semibold text-slate-700 mb-6 flex items-center gap-2">
                    <Flame size={18} className="text-orange-500" /> {T.heatingFuelMixTitle}
                  </h4>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.heatingFuels} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey={nameKey} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} dy={10} />
                        <YAxis tickFormatter={(val) => formatPercent(val)} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            formatter={(val: number) => [formatPercent(val), T.unitPay]} 
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={tooltipStyle}
                        />
                        <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} barSize={50} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
               </div>
             )}

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataTable 
                title={`${T.navHousehold} ${T.tableColPurpose} (${T.unitPay})`} 
                data={data.uses || []}
                columns={[
                  { key: nameKey, label: T.tableColPurpose, className: 'font-medium' },
                  { key: 'value', label: T.unitPay, render: (val) => <span className="text-emerald-600 font-bold">{formatPercent(val)}</span> }
                ]}
                activeLang={activeLang}
                filename={`hanehalki_amaclar_${activeLang}.csv`}
              />
              <DataTable 
                title={`${T.navHousehold} ${T.tableColFuelType} (${T.unitTJ})`} 
                data={data.fuelMix}
                columns={[
                  { key: nameKey, label: T.tableColFuelType, className: 'font-medium' },
                  { key: 'value', label: T.tableColConsumption, render: (val) => formatNumber(val), className: 'font-mono' }
                ]}
                activeLang={activeLang}
                filename={`hanehalki_yakitlar_${activeLang}.csv`}
              />
            </div>
          </div>
        );
      }

      case 'methodology': {
        const methData = methodologyDetails[activeLang];
        
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BookOpen className="text-blue-600" /> {T.methTitle}
            </h2>

            {/* Methodology Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-1">
               <button 
                 onClick={() => setMethTab('general')}
                 className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${methTab === 'general' ? 'bg-white text-blue-600 border border-slate-200 border-b-white -mb-px' : 'bg-slate-50 text-slate-500 hover:text-slate-700'}`}
               >
                 <FileText size={16} /> {T.methTabGeneral}
               </button>
               <button 
                 onClick={() => setMethTab('definitions')}
                 className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${methTab === 'definitions' ? 'bg-white text-blue-600 border border-slate-200 border-b-white -mb-px' : 'bg-slate-50 text-slate-500 hover:text-slate-700'}`}
               >
                 <List size={16} /> {T.methTabDefinitions}
               </button>
               <button 
                 onClick={() => setMethTab('scope')}
                 className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${methTab === 'scope' ? 'bg-white text-blue-600 border border-slate-200 border-b-white -mb-px' : 'bg-slate-50 text-slate-500 hover:text-slate-700'}`}
               >
                 <Layers size={16} /> {T.methTabScope}
               </button>
               <button 
                 onClick={() => setMethTab('collection')}
                 className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${methTab === 'collection' ? 'bg-white text-blue-600 border border-slate-200 border-b-white -mb-px' : 'bg-slate-50 text-slate-500 hover:text-slate-700'}`}
               >
                 <Network size={16} /> {T.methTabCollection}
               </button>
            </div>

            <div className="bg-white p-8 rounded-b-xl rounded-tr-xl shadow-sm border border-slate-200 min-h-[400px]">
              
              {/* General Info Tab */}
              {methTab === 'general' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="prose prose-slate max-w-none">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">{T.methTabGeneral}</h3>
                    <p className="text-slate-600 leading-relaxed text-justify">
                      {methData.introduction}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                     <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-semibold text-blue-800 mb-2">{T.sourceCardTitle}</h4>
                        <p className="text-sm text-blue-700">{T.methSourceP}</p>
                        <ul className="mt-4 space-y-2 text-sm text-blue-600">
                          <li>• {T.methSourceSanayi}</li>
                          <li>• {T.methSourceHizmet}</li>
                          <li>• {T.methSourceUlastirma}</li>
                          <li>• {T.methSourceHanehalki}</li>
                        </ul>
                     </div>
                     <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                        <h4 className="font-semibold text-amber-800 mb-2">{T.methNoteTitle}</h4>
                        <ul className="space-y-2 text-sm text-amber-700">
                          <li><strong>{T.methNote1Title}</strong> {T.methNote1}</li>
                          <li><strong>{T.methNote2Title}</strong> {T.methNote2}</li>
                          <li><strong>{T.methNote3Title}</strong> {T.methNote3}</li>
                        </ul>
                     </div>
                  </div>
                </div>
              )}

              {/* Definitions Tab */}
              {methTab === 'definitions' && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                       <Flame size={20} className="text-orange-500" /> {T.methDefFuels}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {methData.fuelDefinitions.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                          <h4 className="font-semibold text-slate-700 mb-1">{item.term}</h4>
                          <p className="text-sm text-slate-600">{item.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                       <Truck size={20} className="text-blue-500" /> {T.methDefVehicles}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {methData.vehicleDefinitions.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                          <h4 className="font-semibold text-slate-700 mb-1">{item.term}</h4>
                          <p className="text-sm text-slate-600">{item.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                     <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                       <BookOpen size={20} className="text-purple-500" /> {T.methDefOther}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {methData.otherDefinitions.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-purple-200 transition-colors">
                          <h4 className="font-semibold text-slate-700 mb-1">{item.term}</h4>
                          <p className="text-sm text-slate-600">{item.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Scope Tab */}
              {methTab === 'scope' && (
                 <div className="space-y-8 animate-fade-in">
                    <div>
                       <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                         <Factory size={20} className="text-blue-500" /> {T.navIndustry}
                       </h3>
                       <div className="overflow-hidden border border-slate-200 rounded-lg">
                          <table className="min-w-full divide-y divide-slate-200">
                             <thead className="bg-slate-50">
                               <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{T.tableColSector}</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{T.tableColNace}</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Açıklama</th>
                               </tr>
                             </thead>
                             <tbody className="bg-white divide-y divide-slate-200 text-sm">
                                {methData.sectoralScope.industry.map((item, idx) => (
                                   <tr key={idx} className="hover:bg-slate-50">
                                      <td className="px-6 py-4 font-medium text-slate-900">{item.sector}</td>
                                      <td className="px-6 py-4 text-slate-600 font-mono text-xs">{item.codes.join(', ')}</td>
                                      <td className="px-6 py-4 text-slate-500">{item.description || '-'}</td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>

                    <div>
                       <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                         <Briefcase size={20} className="text-purple-500" /> {T.navServices}
                       </h3>
                       <div className="overflow-hidden border border-slate-200 rounded-lg">
                          <table className="min-w-full divide-y divide-slate-200">
                             <thead className="bg-slate-50">
                               <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{T.tableColSector}</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{T.tableColNace}</th>
                               </tr>
                             </thead>
                             <tbody className="bg-white divide-y divide-slate-200 text-sm">
                                {methData.sectoralScope.services.map((item, idx) => (
                                   <tr key={idx} className="hover:bg-slate-50">
                                      <td className="px-6 py-4 font-medium text-slate-900">{item.sector}</td>
                                      <td className="px-6 py-4 text-slate-600 font-mono text-xs">{item.codes.join(', ')}</td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                       <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                         <Truck size={20} className="text-orange-500" /> {T.navTransport}
                       </h3>
                       <p className="text-slate-600 text-sm">{methData.sectoralScope.transport}</p>
                    </div>
                 </div>
              )}

              {/* Data Collection Tab */}
              {methTab === 'collection' && (
                <div className="space-y-6 animate-fade-in">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                         <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <Database size={18} className="text-blue-500" /> Veri Toplama Yöntemi
                         </h4>
                         <p className="text-slate-600 text-sm">{methData.dataCollection.methods}</p>
                      </div>
                      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                         <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <Activity size={18} className="text-emerald-500" /> Frekans
                         </h4>
                         <p className="text-slate-600 text-sm">{methData.dataCollection.frequency}</p>
                      </div>
                   </div>
                   
                   <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-3">Hesaplama Kuralları</h4>
                      <p className="text-slate-600 text-sm">{methData.dataCollection.calculationRules}</p>
                   </div>
                </div>
              )}

            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* HEADER: Mobile Nav & Logo */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={goHome}
            >
              <div className="bg-blue-600 p-2 rounded-lg text-white"><Activity size={24} /></div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">{T.portalTitle}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Mobile Language Selection */}
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-slate-50">
                <Globe size={18} className="text-slate-500" />
                <button onClick={() => setActiveLang('TR')} className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${activeLang === 'TR' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>TR</button>
                <button onClick={() => setActiveLang('EN')} className={`text-xs font-semibold flex-1 px-2 py-1 rounded transition-colors ${activeLang === 'EN' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>EN</button>
              </div>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout: Desktop (Sidebar + Content) & Mobile (Content Only) */}
      <div className="md:grid md:grid-cols-[280px_1fr] min-h-screen">
        
        {/* SIDEBAR */}
        <aside 
          className={`fixed inset-y-0 left-0 z-40 w-full md:w-[280px] bg-white border-r border-slate-200 p-4 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:sticky md:top-0 md:h-screen flex flex-col`}
          style={{ height: '100vh', top: '0' }}
        >
          {/* Logo */}
          <div 
            className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6 cursor-pointer"
            onClick={goHome}
          >
             <div className="p-2 rounded-lg text-white" style={{ backgroundColor: '#0ea5e9' }}><Activity size={24} /></div>
             <h1 className="text-xl font-bold text-slate-800 tracking-tight">{T.portalTitle}</h1>
          </div>
          
          {/* Desktop Language Selection */}
          <div className="hidden md:flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-slate-50 mb-6">
            <Globe size={18} className="text-slate-500 ml-1" />
            <button onClick={() => setActiveLang('TR')} className={`text-xs font-semibold flex-1 px-2 py-1 rounded transition-colors ${activeLang === 'TR' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>TR</button>
            <button onClick={() => setActiveLang('EN')} className={`text-xs font-semibold flex-1 px-2 py-1 rounded transition-colors ${activeLang === 'EN' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>EN</button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow space-y-1">
            <SidebarButton active={activeTab === 'dashboard'} onClick={() => {setActiveTab('dashboard'); setIsMobileMenuOpen(false);}} label={T.navDashboard} icon={Home} />
            <SidebarButton active={activeTab === 'industry'} onClick={() => {setActiveTab('industry'); setIsMobileMenuOpen(false);}} label={T.navIndustry} icon={Factory} />
            <SidebarButton active={activeTab === 'transport'} onClick={() => {setActiveTab('transport'); setIsMobileMenuOpen(false);}} label={T.navTransport} icon={Truck} />
            <SidebarButton active={activeTab === 'services'} onClick={() => {setActiveTab('services'); setIsMobileMenuOpen(false);}} label={T.navServices} icon={Briefcase} />
            <SidebarButton active={activeTab === 'household'} onClick={() => {setActiveTab('household'); setIsMobileMenuOpen(false);}} label={T.navHousehold} icon={BarChart3} />
            <div className="border-t border-slate-100 my-2 pt-2"></div>
            <SidebarButton active={activeTab === 'energyAccounts'} onClick={() => {setActiveTab('energyAccounts'); setIsMobileMenuOpen(false);}} label={T.navEnergyAccounts} icon={TrendingUp} />
            <SidebarButton active={activeTab === 'methodology'} onClick={() => {setActiveTab('methodology'); setIsMobileMenuOpen(false);}} label={T.navMethodology} icon={BookOpen} />
          </nav>

          {/* Source Badge */}
          <div className="p-4 bg-slate-900 rounded-xl mt-auto">
            <h4 className="text-xs text-slate-400 font-medium mb-2">{T.sourceCardTitle}</h4>
            <div className="flex items-center gap-2">
              <Database size={16} className="text-white" />
              <span className="text-sm font-bold text-white">TÜİK</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{T.sourceCardDate}</p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
                {activeTab === 'dashboard' && T.titleOverview(activeLang === 'TR' ? activeFuel : (uniqueFuels.find(f => f.tr === activeFuel)?.en || activeFuel))}
                {activeTab === 'industry' && T.titleSector(T.navIndustry)}
                {activeTab === 'services' && T.titleSector(T.navServices)}
                {activeTab === 'transport' && T.titleSector(T.navTransport)}
                {activeTab === 'household' && T.titleSector(T.navHousehold)}
                {activeTab === 'energyAccounts' && T.titleEnergyAccounts}
                {/* Methodology title is now rendered inside the component for better tab structure, or we can keep it consistent */}
                {activeTab !== 'methodology' && activeTab !== 'energyAccounts' && T.titleSector('Sector')}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {activeTab === 'dashboard' && T.subtitleDashboard}
                {activeTab === 'energyAccounts' && T.subtitleEnergyAccounts}
                {activeTab !== 'dashboard' && activeTab !== 'methodology' && activeTab !== 'energyAccounts' && T.subtitleSector}
              </p>
            </div>
            {renderContent()}
          </div>

          <footer className="bg-slate-50 border-t border-slate-200 mt-12 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-slate-500 text-sm mb-2">{T.footerText}</p>
              <p className="text-slate-400 text-xs flex items-center justify-center gap-1"><Database size={12} /> {T.footerSource}</p>
            </div>
          </footer>
        </main>
      </div>
      
      {/* AI ChatBot */}
      <ChatBot />

    </div>
  );
}