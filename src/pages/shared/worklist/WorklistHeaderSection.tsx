import React from 'react';
import { Download, PlusCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface WorklistHeaderSectionProps {
  totalAssigned?: number;
  overdueCount?: number;
  lastUpdated?: string;
  onExportXlsx?: () => void;
  onRegisterPaper?: () => void;
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

export const WorklistHeaderSection: React.FC<WorklistHeaderSectionProps> = ({
  totalAssigned = 24,
  overdueCount = 2,
  lastUpdated = '10.08.2026, 09:40',
  onExportXlsx,
  onRegisterPaper,
  onNavigate,
  userRole = '',
}) => {
  const isManagement =
    userRole.includes('management') ||
    userRole.includes('Rahbariyat') ||
    userRole.includes('Руководство');

  const isCentralAdmin =
    !isManagement &&
    (userRole.includes('central_admin') ||
    userRole.includes('Markaziy') ||
    userRole.includes('Центральный'));

  const isLeskhozHead =
    userRole.includes('executor_head') ||
    userRole.includes('Direktor') ||
    userRole.includes('Руководитель');

  const isNationwide = isManagement || isCentralAdmin;

  let pageTitle = "Mening arizalarim (Мои заявки)";
  let orgName = "Boʻstonliq davlat oʻrmon xoʻjaligi";
  let countLabel = "Sizga biriktirilgan arizalar:";

  if (isManagement) {
    pageTitle = "Respublika arizalari reyestri (Rahbariyat Analitikasi)";
    orgName = "Oʻzbekiston Respublikasi Oʻrmon xoʻjaligi agentligi (Rahbariyat)";
    countLabel = "Respublika boʻyicha arizalar:";
  } else if (isCentralAdmin) {
    pageTitle = "Respublika arizalari reyestri (Markaziy Apparat)";
    orgName = "Oʻrmon xoʻjaligi agentligi (Markaziy apparat boʻlimi)";
    countLabel = "Respublika boʻyicha arizalar:";
  } else if (isLeskhozHead) {
    pageTitle = "DЎX Arizalari reyestri (Direktor nazorati)";
    orgName = "Boʻstonliq davlat oʻrmon xoʻjaligi (Direktsiya)";
    countLabel = "Tashkilot boʻyicha arizalar:";
  }

  return (
    <div className="space-y-3 font-sans">
      {/* Breadcrumbs */}
      <nav className="text-xs text-[#5A646D] flex items-center gap-1.5 font-medium">
        <button
          type="button"
          onClick={() => onNavigate?.(isNationwide ? 'manager_decision' : 'leskhoz_inbox')}
          className="hover:underline hover:text-[#2E7D4F] cursor-pointer flex items-center gap-1"
        >
          Bosh sahifa
        </button>
        <span>/</span>
        <span>Jarayon (Процесс)</span>
        <span>/</span>
        <span className="text-[#1A1F24] font-bold">
          {pageTitle}
        </span>
      </nav>

      {/* Main Title Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E4E7EA] pb-4">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#1A1F24] tracking-tight">
            {pageTitle}
          </h1>
          <div className="text-xs md:text-sm text-[#5A646D] mt-1 flex flex-wrap items-center gap-2">
            <span>{orgName}</span>
            <span>·</span>
            <span>
              {countLabel}{' '}
              <strong className="text-[#1A1F24]">{totalAssigned} ta</strong>
            </span>
            <span>·</span>
            <span className="text-[#B91C1C] font-bold bg-[#FEE2E2] px-2 py-0.5 rounded border border-[#FCA5A5] flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-[#B91C1C]" />
              <span>{overdueCount} ta muddati oʻtgan</span>
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

          {!isNationwide && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<PlusCircle className="w-4 h-4" />}
              onClick={onRegisterPaper || (() => alert('Qogʻoz ariza kiritish oynasi ochilmoqda...'))}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs h-9 cursor-pointer shadow-xs"
            >
              Qogʻoz arizani roʻyxatdan oʻtkazish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
