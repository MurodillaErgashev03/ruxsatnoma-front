import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Save } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface WizardFooterProps {
  currentStep?: number;
  hasConflict?: boolean;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  onSaveDraft?: () => void;
  lastSavedTime?: string;
}

export const WizardFooter: React.FC<WizardFooterProps> = ({
  currentStep = 2,
  hasConflict = true,
  onPrevStep,
  onNextStep,
  onSaveDraft,
  lastSavedTime = '14:32',
}) => {
  return (
    <div className="bg-white border-t border-[#E4E7EA] p-4 md:px-6 sticky bottom-0 z-30 font-sans shadow-lg rounded-b-2xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left Actions: Back & Save Draft */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={onPrevStep}
            disabled={currentStep <= 1}
            className="border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] font-bold cursor-pointer text-xs"
          >
            Orqaga
          </Button>

          <Button
            variant="ghost"
            size="md"
            leftIcon={<Save className="w-4 h-4 text-[#2E7D4F]" />}
            onClick={onSaveDraft}
            className="text-[#2E7D4F] font-bold hover:bg-[#F0F7F1] cursor-pointer text-xs"
          >
            Qoralamani saqlash
          </Button>

          <div className="hidden sm:flex items-center gap-1 text-xs text-[#15803D] font-semibold bg-[#DCFCE7] px-2.5 py-1 rounded-full border border-[#86EFAC]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Saqlandi {lastSavedTime}</span>
          </div>
        </div>

        {/* Right Actions: Next Step with Disabled Reason Hint */}
        <div className="flex items-center gap-3 ml-auto">
          {hasConflict && (
            <span className="text-xs text-[#B91C1C] font-semibold hidden md:inline max-w-[280px] leading-tight text-right">
              Kesishuvni (3.2 ha) bartaraf eting — shundan soʻng keyingi bosqichga oʻtish mumkin
            </span>
          )}

          <Button
            variant="primary"
            size="md"
            disabled={hasConflict}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onNextStep}
            className={`font-bold h-11 px-6 rounded-xl text-xs cursor-pointer shadow-md ${
              hasConflict
                ? 'bg-[#E4E7EA] text-[#9AA3AB] border border-[#E4E7EA] cursor-not-allowed shadow-none'
                : 'bg-[#2E7D4F] hover:bg-[#23653F] text-white'
            }`}
          >
            Keyingiga (Далее {currentStep + 1})
          </Button>
        </div>
      </div>
    </div>
  );
};
