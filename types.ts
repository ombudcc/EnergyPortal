import React from 'react';
import { LucideIcon } from 'lucide-react';

export type Language = 'TR' | 'EN';

export interface TextContent {
  portalTitle: string;
  portalSubtitle: string;
  navDashboard: string;
  navIndustry: string;
  navServices: string;
  navTransport: string;
  navHousehold: string;
  navEnergyAccounts: string;
  navMethodology: string;
  footerText: string;
  footerSource: string;
  unitTJ: string;
  unitPay: string;
  filterLabel: string;
  filterAll: string;
  detailClick: string;
  titleOverview: (fuel: string) => string;
  titleSector: (name: string) => string;
  titleEnergyAccounts: string;
  titleMethodology: string;
  subtitleDashboard: string;
  subtitleSector: string;
  subtitleEnergyAccounts: string;
  cardIndustry: string;
  cardHousehold: string;
  cardTransport: string;
  cardServices: string;
  chartSectorConsumption: string;
  chartSectorShares: string;
  chartTooltipConsumption: string;
  tableSummary: (fuel: string) => string;
  tableColSector: string;
  tableColConsumption: string;
  tableColShare: string;
  tableColNace: string;
  tableColSubsector: string;
  tableColActivity: string;
  tableColFuelSource: string;
  tableColFuelConsumption: string;
  tableColFuelShare: string;
  tableColVehicleType: string;
  tableColPurpose: string;
  tableColFuelType: string;
  tableCount: (count: number) => string;
  sourceCardTitle: string;
  sourceCardDate: string;
  exportButton: string;
  methTitle: string;
  // Kept for backward compatibility if needed, but UI now uses methodologyDetails
  methSourceTitle: string;
  methSourceP: string;
  methSourceSanayi: string;
  methSourceHizmet: string;
  methSourceUlastirma: string;
  methSourceHanehalki: string;
  methSourcePefa: string;
  methNoteTitle: string;
  methNote1Title: string;
  methNote1: string;
  methNote2Title: string;
  methNote2: string;
  methNote3Title: string;
  methNote3: string;
  dataYear: string;
  totalLabel: string;
  roadDetails: string;
  usagePurposes: string;
  fuelPreferences: string;
  aviation: string;
  road: string;
  rail: string;
  allTransportFuels: string;
  pefaTotalUse: string;
  pefaTopFuel: string;
  pefaTopSector: string;
  pefaTitle1: string;
  pefaTable1: string;
  pefaTable2: string;
  pefaUsageTooltip: string;
  dataCentersTitle: string;
  dataCentersSub: string;
  heatingFuelMixTitle: string;
  aviationSplitTitle: string;
  railSplitTitle: string;
  industryFocusTitle: string;
  industryFocusSub: string;
  domestic: string;
  international: string;
  diesel: string;
  // Methodology UI Headers
  methTabGeneral: string;
  methTabDefinitions: string;
  methTabScope: string;
  methTabCollection: string;
  methDefFuels: string;
  methDefVehicles: string;
  methDefOther: string;
}

export interface DefinitionItem {
  term: string;
  definition: string;
}

export interface ScopeItem {
  sector: string;
  codes: string[];
  description?: string;
}

export interface MethodologyData {
  introduction: string;
  fuelDefinitions: DefinitionItem[];
  vehicleDefinitions: DefinitionItem[];
  otherDefinitions: DefinitionItem[];
  sectoralScope: {
    industry: ScopeItem[];
    services: ScopeItem[];
    transport: string;
  };
  dataCollection: {
    methods: string;
    frequency: string;
    calculationRules: string;
  };
}

export interface MethodologyContent {
  TR: MethodologyData;
  EN: MethodologyData;
}

export interface SubSector {
  name: string;
  value: number;
  code?: string;
  nameEN: string;
}

export interface FuelMixItem {
  name: string;
  value: number;
  nameEN: string;
  code?: string;
}

export interface SectorData {
  total: number;
  year: number;
  subSectors?: SubSector[];
  fuelMix: FuelMixItem[];
  roadTotal?: number;
  aviationTotal?: number;
  railTotal?: number;
  roadFuels?: FuelMixItem[];
  roadVehicles?: SubSector[];
  uses?: SubSector[];
  fuels?: FuelMixItem[];
  dataCenters?: { value: number; unit: string };
  aviationSplit?: SubSector[];
  railSplit?: SubSector[];
  heatingFuels?: FuelMixItem[];
  focusSector?: {
    name: string;
    nameEN: string;
    fuelMix: FuelMixItem[];
  };
}

export interface PEFAData {
  year: number;
  finalUseBySector: {
    name: string;
    value: number;
    nameEN: string;
    fill: string;
  }[];
  finalUseByFuel: {
    name: string;
    value: number;
    nameEN: string;
    share: number;
    fill: string;
  }[];
}

export interface MasterData {
  industry: SectorData;
  services: SectorData;
  transport: SectorData;
  household: SectorData;
  pefa: PEFAData;
}

export interface FuelOption {
  tr: string;
  en: string;
}

export interface ColumnDef {
  key: string;
  label: string;
  className?: string;
  render?: (val: any, item?: any) => React.ReactNode;
}