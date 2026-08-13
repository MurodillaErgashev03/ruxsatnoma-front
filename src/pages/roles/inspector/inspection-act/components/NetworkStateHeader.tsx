import React from 'react';
import { ArrowLeft, MoreVertical, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

export interface NetworkStateHeaderProps {
  netState?: 'online' | 'offline_cache' | 'offline_nocache';
  queueCount?: number;
  actNo?: string;
  onBack?: () => void;
}

export const NetworkStateHeader: React.FC<NetworkStateHeaderProps> = ({
  netState = 'online',
  queueCount = 0,
  actNo = 'ACT-2026-004431',
  onBack,
}) => {
  return (
    <div className="w-full font-sans overflow-hidden rounded-t-3xl border-b border-[#E4E7EA]">
      {/* Phone Dev Status Bar */}
      <div className="bg-[#14181C] text-white px-5 py-2 flex items-center justify-between text-xs font-semibold">
        <span>11:24</span>
        <div className="flex items-center gap-2">
          <span>{netState === 'online' ? '4G' : 'net yoʻq'}</span>
          <span>•</span>
          <span>🔋 68 %</span>
        </div>
      </div>

      {/* Persistent Network Status Indicator */}
      {netState === 'online' && (
        <div className="bg-[#DCFCE7] border-b border-[#86EFAC] text-[#15803D] px-4 py-2 flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-[#15803D]" />
            <div>
              <div>Onlayn (Онлайн)</div>
              <div className="text-[10px] text-[#2563EB] font-normal">Sinxronlashtirildi 11:22 · Navbat: 0</div>
            </div>
          </div>
          <span className="bg-white border border-[#86EFAC] px-2 py-0.5 rounded-full font-mono text-[11px]">
            {queueCount} navbatda
          </span>
        </div>
      )}

      {netState === 'offline_cache' && (
        <div className="bg-[#FFFBEB] border-b border-[#FDE68A] text-[#B45309] px-4 py-2 flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#B45309]" />
            <div>
              <div>Oflayn · Keshdan ishlanmoqda</div>
              <div className="text-[10px] text-[#5A646D] font-normal">Aloqa uzildi 10:47 · Sinxronlashtirish 09.08, 20:14</div>
            </div>
          </div>
          <span className="bg-white border border-[#FDE68A] px-2 py-0.5 rounded-full font-mono text-[11px]">
            3 navbatda
          </span>
        </div>
      )}

      {netState === 'offline_nocache' && (
        <div className="bg-[#FEF2F2] border-b border-[#FECDD3] text-[#B91C1C] px-4 py-2 flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-[#B91C1C]" />
            <div>
              <div>Oflayn · Kesh yuklanmagan</div>
              <div className="text-[10px] text-[#5A646D] font-normal">Ruxsatnomalar va konturlar mavjud emas · Oxirgi aloqa 08:01</div>
            </div>
          </div>
          <span className="bg-white border border-[#FECDD3] px-2 py-0.5 rounded-full font-mono text-[11px]">
            3 navbatda
          </span>
        </div>
      )}

      {/* PWA App Bar */}
      <div className="bg-white px-3 py-2.5 flex items-center justify-between gap-3 border-b border-[#E4E7EA]">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-xl hover:bg-[#F8F9FA] flex items-center justify-center text-[#1A1F24] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 min-w-0 text-center">
          <h2 className="text-sm font-bold text-[#1A1F24] truncate">Inspeksiya Dalolatnomasi</h2>
          <div className="text-[11px] font-mono text-[#5A646D] truncate">{actNo} · qoralama</div>
        </div>

        <button
          type="button"
          className="w-10 h-10 rounded-xl hover:bg-[#F8F9FA] flex items-center justify-center text-[#5A646D] cursor-pointer"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
