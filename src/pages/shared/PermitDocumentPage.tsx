import React, { useState } from 'react';
import { Download, Printer, ArrowLeft, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { PermitDocumentHeader } from './components/PermitDocumentHeader';
import { PermitRequisitesPanel } from './components/PermitRequisitesPanel';
import { PermitCalculationPanel } from './components/PermitCalculationPanel';
import { PermitDigitalSignaturesPanel } from './components/PermitDigitalSignaturesPanel';
import { PermitA4PrintView } from './components/PermitA4PrintView';

export interface PermitDocumentPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

export const PermitDocumentPage: React.FC<PermitDocumentPageProps> = ({
  onNavigate,
  userRole = 'applicant',
}) => {
  const [viewMode, setViewMode] = useState<'screen' | 'print'>('screen');

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-16">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E4E7EA] pb-4">
        <div>
          <nav className="text-xs text-[#5A646D] flex items-center gap-1.5 mb-1 font-medium">
            <button
              type="button"
              onClick={() => onNavigate?.('applicant_permits')}
              className="hover:underline hover:text-[#2E7D4F] cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Mening ruxsatnomalarim
            </button>
            <span>/</span>
            <span className="text-[#1A1F24] font-bold">╨Р тДЦ 004182</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1F24] tracking-tight">
            Ruxsatnoma: Chorva mollarini boqish
          </h1>
          <p className="text-xs md:text-sm text-[#5A646D] mt-0.5">
            ╨Р-00021 sonli ariza boʻyicha ┬╖ Toshkent viloyati davlat oʻrmon xoʻjaligi ┬╖ Shablon <span className="font-mono text-[#1A1F24]">PERMIT-GRAZ-2026.1</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Switcher */}
          <div className="bg-[#F8F9FA] p-1 border border-[#767F87] rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('screen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'screen'
                  ? 'bg-[#2E7D4F] text-white shadow-xs'
                  : 'text-[#5A646D] hover:bg-[#E4E7EA]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Ekran koʻrinishi
            </button>
            <button
              type="button"
              onClick={() => setViewMode('print')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'print'
                  ? 'bg-[#2E7D4F] text-white shadow-xs'
                  : 'text-[#5A646D] hover:bg-[#E4E7EA]'
              }`}
            >
              <Printer className="w-3.5 h-3.5" /> A4 Bosma shakli
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('PDF/A-2b rasmiy shakli yuklab olindi!')}
            className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold cursor-pointer text-xs h-9 shadow-xs"
          >
            PDF/A yuklash
          </Button>
        </div>
      </div>

      {/* Main View Mode Body */}
      {viewMode === 'screen' ? (
        <div className="space-y-6">
          {/* Document Header & QR Card */}
          <PermitDocumentHeader />

          {/* Requisites Panel */}
          <PermitRequisitesPanel />

          {/* Calculation & Fees Panel */}
          <PermitCalculationPanel />

          {/* Digital Signatures Panel (Interactive E-IMZO sign for applicant) */}
          <PermitDigitalSignaturesPanel userRole={userRole} />
        </div>
      ) : (
        /* A4 Paper Print View */
        <PermitA4PrintView />
      )}
    </div>
  );
};

export default PermitDocumentPage;
