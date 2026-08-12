import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface WizardHeaderProps {
  currentStep?: number;
  totalSteps?: number;
  draftNo?: string;
  activityName?: string;
  leskhozName?: string;
  lastSavedTime?: string;
  onExitWizard?: () => void;
}

export const WizardHeader: React.FC<WizardHeaderProps> = ({
  currentStep = 2,
  totalSteps = 6,
  draftNo = 'RX-2026-004903',
  activityName = 'Chorva molini boqish (Выпас скота)',
  leskhozName = 'Zangiota oʻrmon xoʻjaligi, Toshkent DЎX',
  lastSavedTime = '14:32',
  onExitWizard,
}) => {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-4 font-sans border-b border-[#E4E7EA] pb-5">
      {/* Top Title Bar & Exit Button */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1F24] tracking-tight">
            Yangi ariza topshirish
          </h1>
          <p className="text-xs md:text-sm text-[#5A646D] mt-1 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#1A1F24]">{activityName}</span>
            <span>•</span>
            <span>Qoralama № {draftNo}</span>
            <span>•</span>
            <span>{leskhozName}</span>
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4 text-[#5A646D]" />}
          onClick={onExitWizard}
          className="border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] font-bold cursor-pointer text-xs shrink-0"
        >
          Vizarddan chiqish
        </Button>
      </div>

      {/* Progress & Autosave Strip */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <span className="text-xs font-bold text-[#1A1F24] shrink-0">
            Bosqich {currentStep} / {totalSteps}
          </span>

          <div className="flex-1 h-2 bg-[#E4E7EA] rounded-full overflow-hidden">
            <div
              className="bg-[#2E7D4F] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-1.5 text-[#15803D] font-medium bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#86EFAC]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Saqlandi {lastSavedTime}</span>
          </div>

          <span className="font-mono text-[11px] font-bold text-[#5A646D] bg-[#F8F9FA] px-2.5 py-1 rounded-lg border border-[#E4E7EA]">
            Qoralama № {draftNo}
          </span>
        </div>
      </div>
    </div>
  );
};
