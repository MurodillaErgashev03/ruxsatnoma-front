import React from 'react';
import { Check } from 'lucide-react';

export interface WizardStepperProps {
  currentStep?: number;
  onStepClick?: (stepNumber: number) => void;
  maxReachedStep?: number;
}

interface StepItem {
  id: number;
  titleUz: string;
  subUz: string;
}

const WIZARD_STEPS: StepItem[] = [
  { id: 1, titleUz: 'Faoliyat turi', subUz: 'Chorva boqish va hudud' },
  { id: 2, titleUz: 'Uchastka', subUz: 'GIS xarita va me’yor' },
  { id: 3, titleUz: 'Parametrlar', subUz: 'Mavsum va chorva soni' },
  { id: 4, titleUz: 'Hujjatlar', subUz: 'Ilova fayllarini yuklash' },
  { id: 5, titleUz: 'Tekshiruvlar', subUz: 'Avto-check va Soliq/Kadastr' },
  { id: 6, titleUz: 'Imzolash', subUz: 'E-IMZO bilan muhrlash' },
];

export const WizardStepper: React.FC<WizardStepperProps> = ({
  currentStep = 2,
  onStepClick,
  maxReachedStep = 2,
}) => {
  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-2xs overflow-x-auto font-sans">
      <div className="flex items-center min-w-[760px] gap-2">
        {WIZARD_STEPS.map((step) => {
          const isDone = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isAccessible = step.id <= Math.max(currentStep, maxReachedStep);

          return (
            <button
              key={step.id}
              disabled={!isAccessible}
              onClick={() => isAccessible && onStepClick?.(step.id)}
              className={`flex-1 flex flex-col gap-2 p-2 rounded-xl text-left transition-all relative ${
                isCurrent
                  ? 'bg-[#F0F7F1]/60 cursor-default'
                  : isAccessible
                  ? 'cursor-pointer hover:bg-[#F0F7F1]'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              {/* Step Bar Line */}
              <div
                className={`h-1 rounded-full transition-all ${
                  isDone || isCurrent ? 'bg-[#2E7D4F]' : 'bg-[#E4E7EA]'
                }`}
              />

              {/* Step Node Content */}
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    isDone
                      ? 'bg-[#2E7D4F] text-white'
                      : isCurrent
                      ? 'border-2 border-[#2E7D4F] bg-white text-[#2E7D4F]'
                      : 'border border-[#767F87] bg-[#F8F9FA] text-[#767F87]'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : step.id}
                </div>

                <div className="min-w-0">
                  <div
                    className={`text-xs font-bold truncate ${
                      isDone || isCurrent ? 'text-[#1A1F24]' : 'text-[#767F87]'
                    }`}
                  >
                    {step.titleUz}
                  </div>
                  <div
                    className={`text-[11px] truncate ${
                      isCurrent
                        ? 'text-[#2E7D4F] font-bold'
                        : isDone
                        ? 'text-[#15803D]'
                        : 'text-[#9AA3AB]'
                    }`}
                  >
                    {isCurrent ? 'Joriy bosqich' : step.subUz}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
