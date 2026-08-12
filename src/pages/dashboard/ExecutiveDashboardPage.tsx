import React from 'react';
import { Download, FileText, BookmarkPlus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DashboardFiltersBar } from './components/DashboardFiltersBar';
import { KpiGridSection } from './components/KpiGridSection';
import { ChartsSection } from './components/ChartsSection';
import { RiskIndicatorsGrid } from './components/RiskIndicatorsGrid';
import { DrillDownTable } from './components/DrillDownTable';
import { RegionsBreakdownSection } from './components/RegionsBreakdownSection';
import { ActivityMatrixSection } from './components/ActivityMatrixSection';
import { OverdueLeskhozSection } from './components/OverdueLeskhozSection';

export interface ExecutiveDashboardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const ExecutiveDashboardPage: React.FC<ExecutiveDashboardPageProps> = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans pb-16">
      {/* 1. Page Breadcrumbs & Actions */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E4E7EA] pb-4">
        <div>
          <nav className="text-xs text-[#5A646D] flex items-center gap-1.5 mb-1 font-medium">
            <span>Bosh sahifa</span>
            <span>/</span>
            <span>Analitika</span>
            <span>/</span>
            <span className="text-[#1A1F24] font-bold">Dashboard (S21 ssenariysi)</span>
          </nav>

          <h1 className="text-lg md:text-xl font-bold text-[#1A1F24] tracking-tight">
            Dashboard (Markaziy apparat va Rahbariyat)
          </h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Respublika Oʻzbekiston · 2026 yil boshidan · Ma'lumotlar holati: 10.08.2026, 09:15 · Har 15 daqiqada yangilanadi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FileText className="w-4 h-4 text-[#15803D]" />}
            onClick={() => alert('Excel hisoboti yuklab olindi!')}
            className="border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] font-bold cursor-pointer text-xs"
          >
            Excel
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4 text-[#B91C1C]" />}
            onClick={() => alert('PDF analitika yuklab olindi!')}
            className="border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] font-bold cursor-pointer text-xs"
          >
            PDF
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<BookmarkPlus className="w-4 h-4" />}
            onClick={() => alert('Joriy kesim saqlandi!')}
            className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold cursor-pointer text-xs shadow-xs"
          >
            Kesimni saqlash
          </Button>
        </div>
      </div>

      {/* 2. Analytical Filters Bar */}
      <DashboardFiltersBar
        onPeriodChange={(p) => console.log('Period:', p)}
        onRegionChange={(r) => console.log('Region:', r)}
        onActivityChange={(a) => console.log('Activity:', a)}
      />

      {/* 3. 5 Executive KPI Metric Tiles */}
      <KpiGridSection />

      {/* 4. Charts: Monthly Dynamics Line/Bar + Activity Donut */}
      <ChartsSection />

      {/* 5. Risk Indicator Metric Cards */}
      <RiskIndicatorsGrid onRiskClick={(code) => alert(`${code} boʻyicha batafsil roʻyxat ochilmoqda...`)} />

      {/* 6. Multi-level Territory Drill-Down Table */}
      <DrillDownTable onDrillSelect={(region) => alert(`${region} tumanlari kesimi ochilmoqda...`)} />

      {/* 7. Detailed Regional Breakdown Table (Разрез: области) */}
      <RegionsBreakdownSection />

      {/* 8. Activity Matrix Table (Разрез: виды деятельности по областям) */}
      <ActivityMatrixSection />

      {/* 9. Problem Leskhoz Overdue Table (Проблемные места) */}
      <OverdueLeskhozSection />
    </div>
  );
};

export default ExecutiveDashboardPage;
