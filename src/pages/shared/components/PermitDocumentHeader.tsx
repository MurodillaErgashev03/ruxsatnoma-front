import React from 'react';
import { QrCode } from 'lucide-react';

export interface PermitDocumentHeaderProps {
  permitNo?: string;
  issuedDate?: string;
  startDate?: string;
  endDate?: string;
  daysTotal?: number;
  daysRemaining?: number;
  qrPayload?: string;
}

export const PermitDocumentHeader: React.FC<PermitDocumentHeaderProps> = ({
  issuedDate = '25.07.2026',
  startDate = '01.08.2026',
  endDate = '31.10.2026',
  daysTotal = 92,
  daysRemaining = 82,
  qrPayload = 'ruxsatnoma · verify · A-004182 · 7d3f9c21',
}) => {
  const daysPassed = daysTotal - daysRemaining;
  const percentPassed = Math.round((daysPassed / daysTotal) * 100);

  return (
    <div className="bg-white border border-[#E4E7EA] border-t-4 border-t-[#2E7D4F] rounded-2xl p-6 shadow-xs font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Column: Title & Identity */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-[#5A646D] mb-1">
              Ruxsatnoma seriyasi va raqami
            </div>
            <div className="font-mono text-3xl font-extrabold text-[#1A1F24] tracking-tight">
              <span className="text-[#5A646D] font-normal">А № </span>004182
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-bold bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              <span>Deystvuet (Amalda)</span>
            </span>
            <span className="text-xs text-[#5A646D]">
              Berilgan: <strong className="text-[#1A1F24] font-semibold">{issuedDate}</strong> · Kuchga kirgan: <strong className="text-[#1A1F24] font-semibold">{startDate}</strong>
            </span>
          </div>

          {/* Validity progress bar */}
          <div className="space-y-1.5 pt-2 max-w-lg">
            <div className="flex items-center justify-between text-xs text-[#5A646D]">
              <span>Amal qilish muddati</span>
              <span className="font-mono font-bold text-[#1A1F24]">{startDate} — {endDate}</span>
              <span className="font-bold text-[#123522]">{daysTotal} kundan {daysRemaining} kuni qoldi</span>
            </div>

            <div className="h-2.5 rounded-full bg-[#E4E7EA] border border-[#767F87] overflow-hidden">
              <div className="h-full bg-[#2E7D4F] transition-all" style={{ width: `${percentPassed}%` }} />
            </div>

            <div className="flex justify-between text-[11px] font-mono text-[#5A646D]">
              <span>01.08</span>
              <span>Bugun 10.08.2026</span>
              <span>31.10</span>
            </div>
          </div>
        </div>

        {/* Right Column: QR Verification Box */}
        <div className="bg-[#F8F9FA] border border-dashed border-[#767F87] rounded-xl p-4 text-center space-y-2">
          {/* Render Vector SVG QR Code Representation */}
          <div className="w-32 h-32 mx-auto bg-white border border-[#767F87] p-2 rounded-lg flex items-center justify-center">
            <QrCode className="w-28 h-28 text-[#1A1F24]" />
          </div>

          <div>
            <strong className="block text-xs font-bold text-[#1A1F24]">Avtorizatsiyasiz tekshirish</strong>
            <p className="text-[11px] text-[#5A646D] leading-tight mt-0.5">
              Ushbu QR-kod orqali istalgan odam hujjatning rasmiy haqiqiyligini tekshirishi mumkin (S12 ssenariysi).
            </p>
          </div>

          <div className="font-mono text-[10px] text-[#5A646D] bg-white py-1 px-2 rounded border border-[#E4E7EA] truncate">
            {qrPayload}
          </div>
        </div>
      </div>
    </div>
  );
};
