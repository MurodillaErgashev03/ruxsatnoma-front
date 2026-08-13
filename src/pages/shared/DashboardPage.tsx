import React from 'react';
import { Download, FileText, BookmarkPlus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DashboardFiltersBar } from './dashboard/DashboardFiltersBar';
import { KpiGridSection } from './dashboard/KpiGridSection';
import { ChartsSection } from './dashboard/ChartsSection';
import { RiskIndicatorsGrid } from './dashboard/RiskIndicatorsGrid';
import { DrillDownTable } from './dashboard/DrillDownTable';
import { RegionsBreakdownSection } from './dashboard/RegionsBreakdownSection';
import { ActivityMatrixSection } from './dashboard/ActivityMatrixSection';
import { OverdueLeskhozSection } from './dashboard/OverdueLeskhozSection';

export interface DashboardPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, userRole = '' }) => {
  const isManagement =
    userRole.includes('management') ||
    userRole.includes('Rahbariyat') ||
    userRole.includes('Руководство') ||
    userRole.includes('Direktor');

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
            {isManagement ? 'Dashboard (Agentlik Rahbariyati va Analitika)' : 'Dashboard (Markaziy apparat va Monitoring)'}
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
        onPeriodChange={(p: string) => console.log('Period:', p)}
        onRegionChange={(r: string) => console.log('Region:', r)}
        onActivityChange={(a: string) => console.log('Activity:', a)}
      />

      {/* 3. 5 Executive KPI Metric Tiles */}
      <KpiGridSection />

      {/* 4. Charts: Monthly Dynamics Line/Bar + Activity Donut */}
      <ChartsSection />

      {/* 5. Risk Indicator Metric Cards */}
      {/* Drill-down opens the applications registry pre-filtered by the chosen cut. */}
      <RiskIndicatorsGrid onRiskClick={(code: string) => onNavigate?.('leskhoz_inbox', { riskIndicator: code })} />

      {/* 6. Multi-level Territory Drill-Down Table */}
      <DrillDownTable onDrillSelect={(region: string) => onNavigate?.('leskhoz_inbox', { region })} />

      {/* 7. Detailed Regional Breakdown Table (Разрез: области) */}
      <RegionsBreakdownSection />

      {/* 8. Activity Matrix Table (Разрез: виды деятельности по областям) */}
      <ActivityMatrixSection />

      {/* 9. Problem Leskhoz Overdue Table (Проблемные места) */}
      <OverdueLeskhozSection />
    </div>
  );
};

export default DashboardPage;
