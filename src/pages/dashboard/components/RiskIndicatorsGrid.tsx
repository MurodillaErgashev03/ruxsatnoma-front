import React from 'react';
import { AlertOctagon, ShieldAlert, AlertTriangle, UserX } from 'lucide-react';

export interface RiskIndicatorsGridProps {
  onRiskClick?: (code: string) => void;
}

export const RiskIndicatorsGrid: React.FC<RiskIndicatorsGridProps> = ({ onRiskClick }) => {
  const risks = [
    {
      code: 'RI-01',
      title: 'SLA muddati oʻtgan arizalar',
      count: 692,
      sub: '15 ish kunidan oshgan arizalar soni',
      status: 'danger',
      icon: <AlertOctagon className="w-5 h-5 text-[#B91C1C]" />,
    },
    {
      code: 'RI-02',
      title: "Gektariga me'yor oshgan holatlar",
      count: 45,
      sub: "VMQ 689-sonli chorva me'yori chegarasidan yuqori",
      status: 'warning',
      icon: <AlertTriangle className="w-5 h-5 text-[#B45309]" />,
    },
    {
      code: 'RI-03',
      title: "Sub'yektning yillik limiti oshgani",
      count: 18,
      sub: 'Bir arizachining umumiy gektar chegarasi',
      status: 'warning',
      icon: <ShieldAlert className="w-5 h-5 text-[#B45309]" />,
    },
    {
      code: 'RI-04',
      title: 'Arizachi va ijrochi JSHSHIR mosligi',
      count: 12,
      sub: 'Manfaatlar toʻqnashuvi xavfi tekshiruvi',
      status: 'danger',
      icon: <UserX className="w-5 h-5 text-[#B91C1C]" />,
    },
  ];

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1A1F24] flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#B45309]" />
          <span>Xavf-xatar indikatorlari (Риск-индикаторы)</span>
        </h2>
        <span className="text-xs font-mono font-bold text-[#B45309] bg-[#FFFBEB] px-2.5 py-1 rounded-full border border-[#FDE68A]">
          Jami: 767 ta faol indikator
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {risks.map((r) => (
          <button
            key={r.code}
            type="button"
            onClick={() => onRiskClick?.(r.code)}
            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer shadow-2xs ${
              r.status === 'danger'
                ? 'bg-[#FEF2F2] border-[#B91C1C]/40 hover:border-[#B91C1C]'
                : 'bg-[#FFFBEB] border-[#B45309]/40 hover:border-[#B45309]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-[#E4E7EA] text-[#1A1F24]">
                {r.code}
              </span>
              <span className="font-mono text-2xl font-extrabold text-[#1A1F24]">
                {r.count}
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-[#1A1F24] flex items-center gap-1.5">
                {r.icon}
                <span>{r.title}</span>
              </div>
              <p className="text-[11px] text-[#5A646D] mt-1 leading-tight">
                {r.sub}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
