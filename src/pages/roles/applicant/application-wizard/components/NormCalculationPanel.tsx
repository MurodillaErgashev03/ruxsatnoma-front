import React, { useState } from 'react';
import { 
  Calculator, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Info, 
  Scale 
} from 'lucide-react';

export interface NormCalculationPanelProps {
  freeArea?: number;
  hasConflict?: boolean;
}

export const NormCalculationPanel: React.FC<NormCalculationPanelProps> = ({
  freeArea = 18.5,
  hasConflict = true,
}) => {
  const [showFormulas, setShowFormulas] = useState<boolean>(false);

  // Exact math according to VMQ 689-son
  const yieldVal = 4.2; // ts/ha
  const seasonShare = 0.58; // 212 days
  const feedStock = Number((yieldVal * freeArea * seasonShare).toFixed(1)); // Oz
  const effectiveFeedStock = Number((feedStock * 0.85).toFixed(1)); // Oz_eff (15% reserve)
  const maxSB = Math.floor(effectiveFeedStock / 3.74); // MaxSB (10 heads)

  return (
    <div className="bg-gradient-to-r from-[#F0FDF4] via-white to-[#F0FDF4] border border-[#86EFAC] rounded-3xl p-6 shadow-sm font-sans space-y-4">
      {/* 1. Main Human-Friendly Summary Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#2E7D4F] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
                VMQ 689-sonli davlat me’yori
              </span>
              <span className="text-xs text-[#5A646D]">
                Maydon: <strong>{freeArea} gektar</strong>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#14532D] mt-1">
              Yaylov imkoniyati: Ko‘pi bilan <span className="text-[#2E7D4F] underline decoration-2">{maxSB} shartli bosh</span> chorva boqish mumkin
            </h2>
            <p className="text-xs text-[#4B5563] mt-1">
              Bu maydonga taxminan <strong>{maxSB} ta qoramol</strong> yoki <strong>{maxSB * 10} ta qo‘y/echki</strong> sig‘ishi hisoblab chiqildi.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white px-4 py-2.5 rounded-2xl border border-[#86EFAC] shadow-2xs text-center">
            <span className="text-[11px] text-[#5A646D] block">Maksimal limit</span>
            <span className="text-2xl font-black text-[#15803D]">{maxSB} <span className="text-xs font-semibold">SB</span></span>
          </div>

          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white border border-[#CAD0D6] text-xs font-bold text-[#1A1F24] hover:bg-[#F8F9FA] hover:border-[#2E7D4F] transition-all cursor-pointer shadow-2xs"
          >
            <Calculator className="w-4 h-4 text-[#2E7D4F]" />
            <span>{showFormulas ? 'Formulani yopish' : 'Hisob-kitob formulasi'}</span>
            {showFormulas ? <ChevronUp className="w-4 h-4 text-[#767F87]" /> : <ChevronDown className="w-4 h-4 text-[#767F87]" />}
          </button>
        </div>
      </div>

      {/* 2. Collapsible Detailed Legal & Math Breakdown (Progressive Disclosure) */}
      {showFormulas && (
        <div className="pt-4 mt-2 border-t border-[#86EFAC]/40 space-y-4 animate-fadeIn">
          <div className="p-3 bg-white/80 rounded-xl border border-[#BAE6FD] text-xs text-[#0369A1] flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <span>
              VMQ 689-son qarorining 4.2.15-bandiga muvofiq ozuqa hisobi va qonuniy me’yoriy formulalar to‘liq shaffof ko‘rsatilgan:
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4 items-start">
            {/* Formula Code Block */}
            <div className="bg-white border border-[#CAD0D6] rounded-2xl p-4 font-mono text-xs leading-relaxed space-y-2 text-[#1A1F24] overflow-x-auto shadow-2xs">
              <div className="text-[#5A646D] font-sans text-[11px] font-bold border-b border-[#E4E7EA] pb-1 flex items-center justify-between">
                <span>HMQ 689-sonli me’yoriy hisob zanjiri:</span>
                <span className="text-[10px] text-[#2E7D4F] font-mono">rule_version = 2026.04.3</span>
              </div>

              <div>
                Maydon (S_available): <strong className="text-[#0369A1]">{freeArea} ha</strong> = 21,7 ha − {hasConflict ? '3,2 ha' : '0 ha'}{' '}
                <span className="text-[#5A646D] text-[11px]">(kesishuv ayirildi)</span>
              </div>

              <div>
                Ozuqa zaxirasi ($Oz$): {yieldVal} ts/ha × {freeArea} ha × {seasonShare} ={' '}
                <strong className="bg-[#D9EBDC] text-[#123522] px-1.5 py-0.5 rounded font-bold">
                  {feedStock} ts
                </strong>
              </div>

              <div>
                Effektiv zaxira ($Oz\_eff$): {feedStock} × 0,85 ={' '}
                <strong className="bg-[#D9EBDC] text-[#123522] px-1.5 py-0.5 rounded font-bold">
                  {effectiveFeedStock} ts
                </strong>{' '}
                <span className="text-[#5A646D] text-[11px]">(15% sug‘urta fondi)</span>
              </div>

              <div className="pt-2 border-t border-[#E4E7EA] text-sm text-[#0369A1] font-bold flex items-center justify-between">
                <span>MaxSB = floor({effectiveFeedStock} / 3,74) =</span>
                <strong className="text-base text-[#123522] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#86EFAC]">
                  {maxSB} shartli bosh
                </strong>
              </div>
            </div>

            {/* Provenance Table */}
            <div className="bg-white border border-[#CAD0D6] rounded-2xl overflow-hidden text-xs shadow-2xs">
              <div className="bg-[#F8F9FA] px-3 py-2 border-b border-[#E4E7EA] font-bold text-[#5A646D] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#0369A1]" /> Har bir sonning kelib chiqish manbasi
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <tbody>
                  <tr className="border-b border-[#E4E7EA]">
                    <th className="p-2.5 text-[#5A646D] font-medium bg-gray-50/50 w-2/5">Hosildorlik</th>
                    <td className="p-2.5">
                      <strong>4.2 ts/ha</strong>
                      <span className="block text-[10px] text-[#5A646D]">Dalolatnoma № 114/GB</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E4E7EA]">
                    <th className="p-2.5 text-[#5A646D] font-medium bg-gray-50/50">Maydon</th>
                    <td className="p-2.5">
                      <strong>{freeArea} ha</strong>
                      <span className="block text-[10px] text-[#5A646D]">GIS-kontur 04-12-007</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E4E7EA]">
                    <th className="p-2.5 text-[#5A646D] font-medium bg-gray-50/50">Mavsum ulushi</th>
                    <td className="p-2.5">
                      <strong>0.58</strong> (212 kun)
                      <span className="block text-[10px] text-[#5A646D]">VMQ 689 taqvim</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="p-2.5 text-[#5A646D] font-medium bg-gray-50/50">Ozuqa me’yori</th>
                    <td className="p-2.5">
                      <strong>3.74 ts / bosh</strong>
                      <span className="block text-[10px] text-[#5A646D]">4-ilova normasi</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
