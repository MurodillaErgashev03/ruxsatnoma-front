import React from 'react';
import { Check } from 'lucide-react';

export interface WizardStepperProps {
  currentStep?: number;
  onStepClick?: (stepNumber: number) => void;
}

interface StepItem {
  id: number;
  titleUz: string;
  subUz: string;
}

const WIZARD_STEPS: StepItem[] = [
  { id: 1, titleUz: 'Faoliyat turi', subUz: 'Chorva molini boqish · Oʻzgartirish' },
  { id: 2, titleUz: 'Uchastka', subUz: 'Joriy bosqich (Xarita)' },
  { id: 3, titleUz: 'Parametrlar', subUz: 'Mavsum va chorva bosh soni' },
  { id: 4, titleUz: 'Hujjatlar', subUz: 'Ilova fayllarini yuklash' },
  { id: 5, titleUz: 'Tekshiruvlar', subUz: 'Avto-check va Soliq/Kadastr' },
  { id: 6, titleUz: 'Imzolash', subUz: 'E-IMZO bilan muhrlash' },
];

export const WizardStepper: React.FC<WizardStepperProps> = ({
  currentStep = 2,
  onStepClick,
}) => {
  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-2xs overflow-x-auto font-sans">
      <div className="flex items-center min-w-[760px] gap-2">
        {WIZARD_STEPS.map((step) => {
          const isDone = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isTodo = step.id > currentStep;

          return (
            <button
              key={step.id}
              disabled={isTodo}
              onClick={() => isDone && onStepClick?.(step.id)}
              className={`flex-1 flex flex-col gap-2 p-2 rounded-xl text-left transition-all relative ${
                isDone
                  ? 'cursor-pointer hover:bg-[#F0F7F1]'
                  : isCurrent
                  ? 'cursor-default'
                  : 'cursor-not-allowed opacity-60'
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
                        ? 'text-[#2563EB]'
                        : 'text-[#9AA3AB]'
                    }`}
                  >
                    {step.subUz}
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
