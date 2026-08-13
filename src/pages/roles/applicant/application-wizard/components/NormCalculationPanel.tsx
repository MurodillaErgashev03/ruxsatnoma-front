import React from 'react';
import { Calculator, Info, FileText } from 'lucide-react';

export interface NormCalculationPanelProps {
  freeArea?: number;
  hasConflict?: boolean;
}

export const NormCalculationPanel: React.FC<NormCalculationPanelProps> = ({
  freeArea = 18.5,
  hasConflict = true,
}) => {
  return (
    <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-6 shadow-xs font-sans space-y-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[#0369A1]">
            Uchastkaning boʻsh qismi boʻyicha me'yoriy hisob-kitob (Расчёт нормы)
          </h2>
          <p className="text-xs text-[#5A646D] mt-1 leading-relaxed max-w-4xl">
            VMQ 689-son qarorining 4.2.15-bandiga muvofiq qayta tiklanuvchanlik va shaffoflik ta'minlanadi: har bir kiritilgan ma'lumot uchun manba koʻrsatilgan hamda formulalar ochiq tushuntirilgan.
          </p>
        </div>
      </div>

      {/* Formula & Provenance Source Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
        {/* Formula Code View */}
        <div className="bg-white border border-[#BAE6FD] rounded-xl p-4 font-mono text-xs leading-relaxed space-y-2 text-[#1A1F24] overflow-x-auto">
          <div className="text-[#5A646D] font-sans text-[11px] font-bold border-b border-[#E4E7EA] pb-1">
            HMQ 689-sonli me'yoriy formula:
          </div>

          <div>
            Maydon: <strong className="text-[#0369A1]">{freeArea} ha</strong> = 21,7 ha − {hasConflict ? '3,2 ha' : '0 ha'}{' '}
            <span className="text-[#5A646D] text-[11px]">(kesishuv chiqarildi)</span>
          </div>

          <div>
            Hosildorlik 4,2 ts/ha × Maydon {freeArea} ha × Mavsum 0,58 = Oz{' '}
            <strong className="bg-[#D9EBDC] text-[#123522] px-1.5 py-0.5 rounded font-bold">
              {(4.2 * freeArea * 0.58).toFixed(1)} ts
            </strong>
          </div>

          <div>
            Oz_eff = {(4.2 * freeArea * 0.58).toFixed(1)} × 0,85 ={' '}
            <strong className="bg-[#D9EBDC] text-[#123522] px-1.5 py-0.5 rounded font-bold">
              {(4.2 * freeArea * 0.58 * 0.85).toFixed(1)} ts
            </strong>{' '}
            <span className="text-[#5A646D] text-[11px]">(minus 15% sugʻurta fondi)</span>
          </div>

          <div className="pt-2 border-t border-[#E4E7EA] text-sm text-[#0369A1] font-bold">
            MaxSB = floor({(4.2 * freeArea * 0.58 * 0.85).toFixed(1)} / 3,74) ={' '}
            <strong className="text-base text-[#123522] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#86EFAC]">
              {Math.floor((4.2 * freeArea * 0.58 * 0.85) / 3.74)} shartli bosh
            </strong>
          </div>
        </div>

        {/* Provenance Data Table */}
        <div className="bg-white border border-[#BAE6FD] rounded-xl overflow-hidden text-xs">
          <div className="bg-[#F8F9FA] px-3 py-2 border-b border-[#E4E7EA] font-bold text-[#5A646D] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#0369A1]" /> Har bir sonning kelib chiqish manbasi
          </div>
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-b border-[#E4E7EA]">
                <th className="p-2.5 text-[#5A646D] font-medium bg-gray-50/50 w-2/5">Hosildorlik</th>
                <td className="p-2.5">
                  <strong>4.2 ts/ha</strong>
                  <span className="block text-[10px] text-[#5A646D]">Dalolatnoma № 114/GB (14.04.2026)</span>
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
                  <span className="block text-[10px] text-[#5A646D]">VMQ 689-sonli taqvim</span>
                </td>
              </tr>
              <tr>
                <th className="p-2.5 text-[#5A646D] font-medium bg-gray-50/50">Oruza me'yori</th>
                <td className="p-2.5">
                  <strong>3.74 ts / bosh</strong>
                  <span className="block text-[10px] text-[#5A646D]">4-ilova normasi</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Output Summary Banner */}
      <div className="bg-white border border-[#BAE6FD] rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="font-mono text-3xl font-extrabold text-[#123522] bg-[#DCFCE7] px-3 py-1 rounded-xl border border-[#86EFAC]">
            {Math.floor((4.2 * freeArea * 0.58 * 0.85) / 3.74)}
          </div>
          <div className="text-xs text-[#1A1F24] leading-tight">
            <strong>shartli bosh chorva</strong> — ushbu kontur boʻyicha ruxsat berilgan maksimallik chegarasi.{' '}
            <span>Chorva tarkibi va bosh soni 3-bosqichda (Parametrlar) kiritiladi.</span>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-[#5A646D] flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-[#0369A1] shrink-0" />
        <span>
          Hisob-kitob <code className="bg-white px-1 py-0.5 rounded border border-[#BAE6FD]">rule_version = 2026.04.3</code> bilan muhrlanadi. Me'yor keyinroq oʻzgargan taqdirda ham joriy hisobingiz oʻzgarmaydi.
        </span>
      </div>
    </div>
  );
};
