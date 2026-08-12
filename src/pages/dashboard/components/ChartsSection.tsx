import React from 'react';
import { BarChart3, PieChart } from 'lucide-react';

export const ChartsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 font-sans">
      {/* 1. Monthly Dynamics Chart */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E4E7EA] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#2E7D4F]" /> Oylik dinamika (Динамика по месяцам)
            </h3>
            <p className="text-xs text-[#5A646D] mt-0.5">
              2026 yil oylar kesimida tushgan arizalar va berilgan ruxsatnomalar statistikasi
            </p>
          </div>
          <span className="text-xs font-semibold text-[#0369A1] bg-[#F0F9FF] px-2.5 py-1 rounded-full border border-[#BAE6FD]">
            Ochiq ma'lumotlar
          </span>
        </div>

        {/* Inline SVG Chart */}
        <div className="w-full aspect-[21/9] min-h-[240px]">
          <svg className="w-full h-full block" viewBox="0 0 700 240">
            {/* Grid Lines */}
            <line x1="40" y1="40" x2="680" y2="40" stroke="#E4E7EA" strokeDasharray="4 4" />
            <line x1="40" y1="90" x2="680" y2="90" stroke="#E4E7EA" strokeDasharray="4 4" />
            <line x1="40" y1="140" x2="680" y2="140" stroke="#E4E7EA" strokeDasharray="4 4" />
            <line x1="40" y1="190" x2="680" y2="190" stroke="#E4E7EA" strokeWidth="1.5" />

            {/* Y Axis Labels */}
            <text x="30" y="44" className="text-[11px] font-mono fill-[#5A646D]" textAnchor="end">4k</text>
            <text x="30" y="94" className="text-[11px] font-mono fill-[#5A646D]" textAnchor="end">3k</text>
            <text x="30" y="144" className="text-[11px] font-mono fill-[#5A646D]" textAnchor="end">2k</text>
            <text x="30" y="194" className="text-[11px] font-mono fill-[#5A646D]" textAnchor="end">0</text>

            {/* X Axis Month Labels */}
            {['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg'].map((m, i) => (
              <text key={m} x={80 + i * 78} y="215" className="text-[11px] font-semibold fill-[#1A1F24]" textAnchor="middle">
                {m}
              </text>
            ))}

            {/* Applications Bars */}
            <path
              d="M70,140 L70,190 M148,125 L148,190 M226,110 L226,190 M304,80 L304,190 M382,60 L382,190 M460,50 L460,190 M538,70 L538,190 M616,45 L616,190"
              stroke="#7FB98A" strokeWidth="18" strokeLinecap="round" opacity="0.6"
            />

            {/* Permits Polyline */}
            <polyline
              points="70,150 148,135 226,120 304,92 382,72 460,60 538,82 616,55"
              fill="none" stroke="#2E7D4F" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"
            />

            {/* Polyline Data Points */}
            {[
              { x: 70, y: 150 }, { x: 148, y: 135 }, { x: 226, y: 120 }, { x: 304, y: 92 },
              { x: 382, y: 72 }, { x: 460, y: 60 }, { x: 538, y: 82 }, { x: 616, y: 55 },
            ].map((p, idx) => (
              <circle key={idx} cx={p.x} cy={p.y} r="4.5" fill="#FFFFFF" stroke="#2E7D4F" strokeWidth="2.5" />
            ))}
          </svg>
        </div>

        {/* Legend Footnote */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E4E7EA] text-xs font-semibold">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded bg-[#7FB98A]/60" />
              <span>Tushgan arizalar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-[#2E7D4F]" />
              <span>Berilgan ruxsatnomalar</span>
            </div>
          </div>
          <span className="text-[#5A646D] font-mono text-[11px]">Jami: 22 318 ariza / 17 972 ruxsatnoma</span>
        </div>
      </div>

      {/* 2. Activity Type Breakdown Donut Chart */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="border-b border-[#E4E7EA] pb-3">
          <h3 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#2E7D4F]" /> Faoliyat turlari boʻyicha
          </h3>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Barcha 6 ta faoliyat turining umumiy arizalardagi ulushi
          </p>
        </div>

        {/* SVG Donut Chart */}
        <div className="flex items-center justify-center py-2">
          <svg className="w-44 h-44" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#2E7D4F" strokeWidth="18" strokeDasharray="140 100" strokeDashoffset="0" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#7FB98A" strokeWidth="18" strokeDasharray="50 190" strokeDashoffset="-140" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#0369A1" strokeWidth="18" strokeDasharray="30 210" strokeDashoffset="-190" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#B45309" strokeWidth="18" strokeDasharray="15 225" strokeDashoffset="-220" />
            <text x="50" y="47" className="text-[13px] font-extrabold fill-[#1A1F24] font-mono" textAnchor="middle">17 972</text>
            <text x="50" y="61" className="text-[9px] font-semibold fill-[#5A646D]" textAnchor="middle">ruxsatnoma</text>
          </svg>
        </div>

        {/* Donut Legend List */}
        <div className="space-y-2 text-xs border-t border-[#E4E7EA] pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#2E7D4F]" />
              <span className="font-medium">Chorva molini boqish</span>
            </div>
            <span className="font-mono font-bold text-[#1A1F24]">58,4% (10 495)</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#7FB98A]" />
              <span className="font-medium">Pichan oʻrish</span>
            </div>
            <span className="font-mono font-bold text-[#1A1F24]">21,2% (3 810)</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#0369A1]" />
              <span className="font-medium">Asalari uya joylashtirish</span>
            </div>
            <span className="font-mono font-bold text-[#1A1F24]">12,8% (2 300)</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#B45309]" />
              <span className="font-medium">Dorivor oʻsimliklar va boshqa</span>
            </div>
            <span className="font-mono font-bold text-[#1A1F24]">7,6% (1 367)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
