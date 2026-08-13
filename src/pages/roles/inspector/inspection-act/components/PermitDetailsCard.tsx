import React from 'react';
import { CheckCircle2, QrCode, Lock } from 'lucide-react';

export interface PermitDetailsCardProps {
  netState?: 'online' | 'offline_cache' | 'offline_nocache';
}

export const PermitDetailsCard: React.FC<PermitDetailsCardProps> = ({ netState = 'online' }) => {
  if (netState === 'offline_nocache') {
    return (
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs font-sans space-y-3">
        <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-2">
          <h3 className="text-sm font-bold text-[#1A1F24]">Nega ma'lumot yoʻq</h3>
        </div>
        <p className="text-xs text-[#5A646D] leading-relaxed">
          Ilova ushbu qurilmada birinchi marotaba ishga tushirilgan, ruxsatnomalar ma'lumotnomasi hali yuklanmagan. Internetsiz ruxsatnoma va kontur chegaralarini olib boʻlmaydi.
        </p>
        <div className="text-[11px] text-[#5A646D] pt-1">
          Yoʻnalishdagi aloqa bor oxirgi nuqta — 08:01, Humson burilishida (2,4 km orqada).
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs font-sans space-y-3">
      <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-2">
        <h3 className="text-sm font-bold text-[#1A1F24]">Ruxsatnoma (Разрешение)</h3>
        {netState === 'online' ? (
          <span className="text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#86EFAC] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Amal qilmoqda
          </span>
        ) : (
          <span className="text-[11px] font-bold text-[#0369A1] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD] flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Keshdan (09.08, 20:14)
          </span>
        )}
      </div>

      <div className="flex items-start gap-3">
        {/* QR Code Graphic Box */}
        <div className="w-14 h-14 bg-[#F8F9FA] border border-[#767F87] rounded-xl flex items-center justify-center shrink-0">
          <QrCode className="w-9 h-9 text-[#1A1F24]" />
        </div>

        <div className="space-y-1 text-xs flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[#5A646D]">Raqami:</span>
            <span className="font-mono font-bold text-[#1A1F24]">RX-2026-0014872</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#5A646D]">Arizachi:</span>
            <span className="font-semibold text-[#1A1F24]">Karimov A. Sh.</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#5A646D]">Faoliyat turi:</span>
            <span className="font-semibold text-[#2E7D4F]">Chorva molini boqish</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E4E7EA] space-y-1 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[#5A646D]">Kontur:</span>
          <span className="font-mono font-bold text-[#1A1F24]">OFC-14-238-07</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#5A646D]">Oʻrmon boʻlimi:</span>
          <span className="font-semibold text-[#1A1F24]">Humson, 3-obxod, 14-kvartal</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#5A646D]">Amal qilish davri:</span>
          <span className="font-medium text-[#1A1F24]">12.05.2026 — 31.10.2026</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#5A646D]">Ruxsat berilgan:</span>
          <span className="font-bold text-[#123522]">38.5 ha · 64 shartli bosh</span>
        </div>
      </div>
    </div>
  );
};
