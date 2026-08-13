import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const KpiGridSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-sans">
      {/* KPI 1: Applications Submitted */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
          Topshirilgan arizalar
        </div>
        <div className="text-xl font-bold text-[#1A1F24] tracking-tight font-mono">
          22 318
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-bold">
          <ArrowUpRight className="w-4 h-4 text-[#15803D]" />
          <span>+14,2 % oʻsish</span>
        </div>
        <div className="text-[11px] text-[#5A646D]">
          2025 yil mos 8 oyiga nisbatan: 19 545 ta
        </div>

        {/* Sparkline SVG */}
        <svg className="w-full h-7 stroke-[#2E7D4F] fill-none stroke-2" viewBox="0 0 100 28">
          <polyline points="0,26 14,23.6 28,22.1 43,16 57,10.5 71,7.6 86,11.3 100,4" />
        </svg>

        <div className="pt-2 border-t border-[#E4E7EA] text-[11px] text-[#5A646D] leading-tight">
          AT va my.gov.uz orqali — 96.4% murojaatlar. Maqsad: ≥ 95%
        </div>
      </div>

      {/* KPI 2: Permits Issued */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
          Berilgan ruxsatnomalar
        </div>
        <div className="text-xl font-bold text-[#1A1F24] tracking-tight font-mono">
          17 972
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-bold">
          <ArrowUpRight className="w-4 h-4 text-[#15803D]" />
          <span>+11,6 % oʻsish</span>
        </div>
        <div className="text-[11px] text-[#5A646D]">
          2025 yil mos 8 oyiga nisbatan: 16 105 ta
        </div>

        {/* Sparkline SVG */}
        <svg className="w-full h-7 stroke-[#2E7D4F] fill-none stroke-2" viewBox="0 0 100 28">
          <polyline points="0,25 14,23 28,21 43,15.5 57,10 71,8 86,12 100,5" />
        </svg>

        <div className="pt-2 border-t border-[#E4E7EA] text-[11px] text-[#5A646D] leading-tight">
          Rad etilgan: 2 217 · Qaytarilgan: 1 486 · Jarayonda: 645
        </div>
      </div>

      {/* KPI 3: Revenue Collected */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
          Jamlangan toʻlovlar
        </div>
        <div className="text-xl font-bold text-[#123522] tracking-tight font-mono">
          6,28 <span className="text-xs font-sans font-semibold text-[#5A646D]">mlrd soʻm</span>
        </div>
        <div className="text-[11px] font-mono text-[#5A646D]">
          6 284 910 000 soʻm
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-bold">
          <ArrowUpRight className="w-4 h-4 text-[#15803D]" />
          <span>+18,4 % oʻsish</span>
        </div>

        {/* Sparkline SVG */}
        <svg className="w-full h-7 stroke-[#2E7D4F] fill-none stroke-2" viewBox="0 0 100 28">
          <polyline points="0,24 14,22 28,18 43,17 57,12 71,9 86,10 100,4" />
        </svg>

        <div className="pt-2 border-t border-[#E4E7EA] text-[11px] text-[#5A646D] leading-tight">
          Taqsimot 50/50: Agentlik 3.14 mlrd · Mahalliy byudjet 3.14 mlrd. Qolgan: 0
        </div>
      </div>

      {/* KPI 4: Average Processing Time */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
          Oʻrtacha koʻrib chiqish
        </div>
        <div className="text-xl font-bold text-[#1A1F24] tracking-tight font-mono">
          8,4 <span className="text-xs font-sans font-semibold text-[#5A646D]">kun</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-bold">
          <ArrowDownRight className="w-4 h-4 text-[#15803D]" />
          <span>−3,4 kun qisqardi</span>
        </div>
        <div className="text-[11px] text-[#5A646D]">
          2025 yildagidan tezroq (u vaqtda 11.8 kun)
        </div>

        {/* Sparkline SVG */}
        <svg className="w-full h-7 stroke-[#2E7D4F] fill-none stroke-2" viewBox="0 0 100 28">
          <polyline points="0,5 14,7 28,9 43,12 57,15 71,17 86,20 100,23" />
        </svg>

        <div className="pt-2 border-t border-[#E4E7EA] text-[11px] text-[#5A646D] leading-tight">
          SLA normativ vakti: 15 ish kuni. Zaxira: 6.6 kun
        </div>
      </div>

      {/* KPI 5: Overdue Applications */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
          Muddati oʻtganlar ulushi
        </div>
        <div className="text-xl font-bold text-[#B91C1C] tracking-tight font-mono">
          3,1 <span className="text-xs font-sans font-semibold text-[#5A646D]">%</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#B91C1C] font-bold">
          <ArrowUpRight className="w-4 h-4 text-[#B91C1C]" />
          <span>+0,7 p.p. (maqsad: 0%)</span>
        </div>
        <div className="text-[11px] text-[#5A646D]">
          692 ta ariza 15 kundan oshib ketgan
        </div>

        {/* Sparkline SVG */}
        <svg className="w-full h-7 stroke-[#B91C1C] fill-none stroke-2" viewBox="0 0 100 28">
          <polyline points="0,26 14,24 28,21 43,18 57,14 71,11 86,9 100,6" />
        </svg>

        <div className="pt-2 border-t border-[#E4E7EA] text-[11px] text-[#B91C1C] font-semibold leading-tight">
          Intizomiy chora talab etiladigan hududlar: Surxondaryo (142 ta)
        </div>
      </div>
    </div>
  );
};
