import React from 'react';
import { Download, PlusCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface WorklistHeaderSectionProps {
  totalAssigned?: number;
  overdueCount?: number;
  lastUpdated?: string;
  onExportXlsx?: () => void;
  onRegisterPaper?: () => void;
  onNavigate?: (page: string, params?: any) => void;
}

export const WorklistHeaderSection: React.FC<WorklistHeaderSectionProps> = ({
  totalAssigned = 24,
  overdueCount = 2,
  lastUpdated = '10.08.2026, 09:40',
  onExportXlsx,
  onRegisterPaper,
  onNavigate,
}) => {
  return (
    <div className="space-y-3 font-sans">
      {/* Breadcrumbs */}
      <nav className="text-xs text-[#5A646D] flex items-center gap-1.5 font-medium">
        <button
          type="button"
          onClick={() => onNavigate?.('leskhoz_inbox')}
          className="hover:underline hover:text-[#2E7D4F] cursor-pointer flex items-center gap-1"
        >
          Bosh sahifa
        </button>
        <span>/</span>
        <span>Jarayon (Процесс)</span>
        <span>/</span>
        <span className="text-[#1A1F24] font-bold">Mening arizalarim (Мои заявки)</span>
      </nav>

      {/* Main Title Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E4E7EA] pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1F24] tracking-tight">
            Mening arizalarim (Мои заявки)
          </h1>
          <div className="text-xs md:text-sm text-[#5A646D] mt-1 flex flex-wrap items-center gap-2">
            <span>Toshkent davlat oʻrmon xoʻjaligi</span>
            <span>·</span>
            <span>Sizga biriktirilgan arizalar: <strong className="text-[#1A1F24]">{totalAssigned} ta</strong></span>
            <span>·</span>
            <span className="text-[#B91C1C] font-bold bg-[#FEE2E2] px-2 py-0.5 rounded border border-[#FCA5A5]">
              ⚠️ {overdueCount} ta muddati oʻtgan
            </span>
            <span>·</span>
            <span className="text-[#767F87] font-mono">ma'lumot sanasi {lastUpdated}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={onExportXlsx || (() => alert('Arizalar roʻyxati XLSX fayliga yuklab olindi!'))}
            className="border-[#767F87] text-[#1A1F24] font-bold text-xs h-9 cursor-pointer"
          >
            Vigruzka XLSX
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            onClick={onRegisterPaper || (() => onNavigate?.('applicant_wizard'))}
            className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs h-9 cursor-pointer shadow-xs"
          >
            Qogʻoz arizani roʻyxatdan oʻtkazish
          </Button>
        </div>
      </div>
    </div>
  );
};
