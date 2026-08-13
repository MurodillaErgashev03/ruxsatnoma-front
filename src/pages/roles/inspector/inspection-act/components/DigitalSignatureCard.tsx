import React from 'react';
import { PenTool, Save } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';

export interface DigitalSignatureCardProps {
  netState?: 'online' | 'offline_cache' | 'offline_nocache';
  onSign?: () => void;
  onSaveDraft?: () => void;
}

export const DigitalSignatureCard: React.FC<DigitalSignatureCardProps> = ({
  netState = 'online',
  onSign,
  onSaveDraft,
}) => {
  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs font-sans space-y-4">
      <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-2">
        <h3 className="text-sm font-bold text-[#1A1F24]">E-IMZO bilan imzolash (Подписание)</h3>
        <span className="text-xs font-bold text-[#B91C1C] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECDD3] flex items-center gap-1">
          ✕ Qoida buzilishi
        </span>
      </div>

      <div className="space-y-1 text-xs font-mono text-[#5A646D]">
        <div className="flex justify-between"><span>Sertifikat:</span><strong className="text-[#1A1F24]">Mirzayev Sh. T., 14.03.2027 gacha</strong></div>
        <div className="flex justify-between"><span>Tekshiruv:</span><span>{netState === 'online' ? 'Onlayn tasdiqlangan (11:24)' : 'Aloqa boʻlganda tekshiriladi'}</span></div>
        <div className="flex justify-between"><span>Vaqt muhr:</span><span>{netState === 'online' ? 'TSA serverdan olinadi' : 'TSA aloqa chiqqanda qoʻshiladi'}</span></div>
      </div>

      <div className="space-y-2 pt-2 border-t border-[#E4E7EA]">
        {netState === 'online' ? (
          <Button
            variant="primary"
            size="md"
            leftIcon={<PenTool className="w-4 h-4" />}
            onClick={onSign}
            className="w-full bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold h-12 text-sm cursor-pointer shadow-md rounded-xl"
          >
            E-IMZO bilan imzolash va yuborish
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            leftIcon={<PenTool className="w-4 h-4" />}
            onClick={onSign}
            className="w-full bg-[#B45309] hover:bg-[#92400E] text-white font-bold h-12 text-sm cursor-pointer shadow-md rounded-xl"
          >
            Imzolash va yuborish navbatiga qoʻyish
          </Button>
        )}

        <Button
          variant="outline"
          size="md"
          leftIcon={<Save className="w-4 h-4 text-[#5A646D]" />}
          onClick={onSaveDraft}
          className="w-full border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] font-bold h-11 text-xs cursor-pointer rounded-xl"
        >
          Qoralamani saqlash (Сохранить черновик)
        </Button>
      </div>

      <p className="text-[11px] text-[#5A646D] leading-tight">
        Imzolangan aktni oʻzgartirib boʻlmaydi. Tahrirlash zarur boʻlsa, alohida tuzatish akti tuziladi va asl aktga havola beriladi.
      </p>
    </div>
  );
};
