import React from 'react';
import { Download, Layers } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export const PlotAndMapPanel: React.FC = () => {
  const activePermitsOnContour = [
    {
      id: 1,
      no: 'A № 003114',
      holder: 'Ergashev Botir Raximovich',
      period: '01.05.2026 — 31.10.2026',
      area: '8.40 ga',
      sb: '12.0 bosh',
      status: 'Amalda',
    },
    {
      id: 2,
      no: 'A № 002980',
      holder: '«Boʻstonliq Agro» MCHJ',
      period: '01.06.2026 — 30.11.2026',
      area: '9.20 ga',
      sb: '10.5 bosh',
      status: 'Amalda',
    },
    {
      id: 3,
      no: 'A № 002715',
      holder: 'Yusupov Akmal Shavkatovich',
      period: '15.08.2026 — 15.10.2026',
      area: '4.70 ga',
      sb: '6.1 bosh',
      status: 'Amalda',
    },
  ];

  return (
    <section id="s-plot" className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs font-sans overflow-hidden">
      {/* Panel Header */}
      <div className="p-6 border-b border-[#E4E7EA] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1A1F24]">2. Uchastka va GIS kontur xaritasi</h2>
            <span className="text-xs font-semibold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded-full border border-[#D9EBDC]">
              Kontur Boʻstonliq 14-2 (v4)
            </span>
          </div>
          <p className="text-xs text-[#5A646D] mt-0.5">Topologik kesishuv 0%. Yaylov qatlami boʻyicha GIS qatlamlari koʻrinishi</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Layers className="w-4 h-4" />} className="cursor-pointer font-semibold">
            Toʻliq xaritada ochish
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />} className="cursor-pointer font-semibold">
            GeoJSON yuklash
          </Button>
        </div>
      </div>

      {/* Panel Body */}
      <div className="p-6 space-y-6">
        {/* Vector SVG GIS Map Representation */}
        <div className="border border-[#767F87] rounded-xl overflow-hidden bg-[#F8F9FA] relative">
          <svg className="w-full h-auto min-h-[300px] max-h-[380px]" viewBox="0 0 640 340">
            <defs>
              <pattern id="p-busy" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line stroke="#B45309" strokeWidth="2" x1="0" y1="0" x2="0" y2="8" />
              </pattern>
              <pattern id="p-plot" width="9" height="9" patternUnits="userSpaceOnUse">
                <circle fill="#2E7D4F" cx="2.5" cy="2.5" r="1.6" />
              </pattern>
            </defs>

            {/* Forest Fund Boundary */}
            <rect fill="#FFFFFF" stroke="#9AA3AB" strokeWidth="1" strokeDasharray="6 4" x="12" y="12" width="616" height="316" rx="6" />
            <text fill="#5A646D" fontSize="12" fontWeight="600" x="24" y="30">Davlat oʻrmon fondi · 14-kvartal</text>

            {/* Main Contour 14-2 Polygon */}
            <polygon fill="#F0F7F1" stroke="#2E7D4F" strokeWidth="2.5" points="60,52 300,38 424,82 502,162 470,262 300,300 142,282 46,192" />
            <text fill="#1A1F24" fontSize="13" fontWeight="700" x="62" y="76">Kontur 14-2 · 41.00 ha</text>

            {/* Busy overlapping active permits (Hatched Areas) */}
            <polygon fill="url(#p-busy)" stroke="#B45309" strokeWidth="1.5" points="82,88 204,72 238,152 122,172" />
            <polygon fill="url(#p-busy)" stroke="#B45309" strokeWidth="1.5" points="256,74 404,102 422,182 302,188" />
            <polygon fill="url(#p-busy)" stroke="#B45309" strokeWidth="1.5" points="152,202 302,208 322,276 172,272" />

            {/* Current Application Plot (Dotted Green Pattern) */}
            <polygon fill="url(#p-plot)" stroke="#123522" strokeWidth="3" points="334,198 462,188 466,266 342,280" />
            <text fill="#123522" fontSize="12" fontWeight="700" x="346" y="228">Soʻralayotgan uchastka</text>
            <text fill="#5A646D" fontSize="11" x="346" y="246">12.50 ha · 01.09 — 30.11</text>

            {/* Obxod Boundary line */}
            <path fill="none" stroke="#5A646D" strokeWidth="1.5" strokeDasharray="2 5" d="M46,192 L142,178 L256,196 L334,198" />
            <text fill="#5A646D" fontSize="11" x="52" y="212">3-obxod chegarasi</text>

            {/* Permit Pins */}
            <g transform="translate(150, 120)">
              <circle fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" r="12" />
              <text textAnchor="middle" dy="4" fill="#1A1F24" fontSize="11" fontWeight="700">1</text>
            </g>
            <g transform="translate(336, 136)">
              <circle fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" r="12" />
              <text textAnchor="middle" dy="4" fill="#1A1F24" fontSize="11" fontWeight="700">2</text>
            </g>
            <g transform="translate(232, 240)">
              <circle fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" r="12" />
              <text textAnchor="middle" dy="4" fill="#1A1F24" fontSize="11" fontWeight="700">3</text>
            </g>

            {/* Map Scale */}
            <path stroke="#1A1F24" strokeWidth="1.5" d="M496,300 L596,300 M496,294 L496,306 M546,296 L546,304 M596,294 L596,306" />
            <text fill="#5A646D" fontSize="11" x="496" y="322">0</text>
            <text fill="#5A646D" fontSize="11" x="566" y="322">1 km</text>
          </svg>
        </div>

        {/* Map Legend */}
        <div className="flex flex-wrap gap-6 text-xs text-[#5A646D] bg-[#F8F9FA] p-3 rounded-xl border border-[#E4E7EA]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-[#F0F7F1] border-2 border-[#2E7D4F]" />
            <span><strong className="text-[#1A1F24]">Kontur 14-2:</strong> 41.00 ha, "Yaylov" qatlami, Status: Published</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-[#FEF3C7] border-2 border-[#B45309]" />
            <span><strong className="text-[#1A1F24]">Band qilingan:</strong> 3 ta amaldagi ruxsatnoma (22.30 ha)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-[#D9EBDC] border-2 border-[#123522]" />
            <span><strong className="text-[#1A1F24]">Ushbu ariza uchastkasi:</strong> 12.50 ha</span>
          </div>
        </div>

        {/* Table of Active Permits Overlapping on Contour */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
            Ushbu konturda kesishuvchi davrga ega amaldagi ruxsatnomalar
          </h3>
          <div className="overflow-x-auto border border-[#E4E7EA] rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[#5A646D] font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">№</th>
                  <th className="py-2.5 px-3">Ruxsatnoma №</th>
                  <th className="py-2.5 px-3">Egalari / Subyekt</th>
                  <th className="py-2.5 px-3">Amal qilish muddati</th>
                  <th className="py-2.5 px-3 text-right">Maydon</th>
                  <th className="py-2.5 px-3 text-right">Yuklama (SB)</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EA]">
                {activePermitsOnContour.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80">
                    <td className="py-2.5 px-3 font-mono text-[#5A646D]">{item.id}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#2E7D4F]">{item.no}</td>
                    <td className="py-2.5 px-3 font-medium text-[#1A1F24]">{item.holder}</td>
                    <td className="py-2.5 px-3 font-mono text-[#5A646D]">{item.period}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#1A1F24] text-right">{item.area}</td>
                    <td className="py-2.5 px-3 font-mono text-[#1A1F24] text-right">{item.sb}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold border border-[#86EFAC]">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
