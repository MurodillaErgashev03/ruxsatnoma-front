import React from 'react';
import { CheckCircle2, CreditCard } from 'lucide-react';

export const PermitCalculationPanel: React.FC = () => {
  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs font-sans space-y-6">
      <div className="flex flex-wrap items-center justify-between border-b border-[#E4E7EA] pb-3 gap-2">
        <div>
          <h2 className="text-base font-bold text-[#1A1F24]">Me'yor va toʻlov hisob-kitobi (Расчёт нормы и платежа)</h2>
          <p className="text-xs text-[#5A646D]">
            Qoidalar versiyasi <span className="font-mono text-[#1A1F24]">NORM-2026.2</span> · Tarif <span className="font-mono text-[#1A1F24]">TARIFF-278-2026.1</span>
          </p>
        </div>
      </div>

      {/* Table 1: Land Yield & Norm Calculation */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-[#5A646D] uppercase tracking-wider">Uchastka maydon me'yori (Норма участка)</h3>
        <div className="overflow-x-auto border border-[#E4E7EA] rounded-xl">
          <table className="w-full text-xs text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#767F87] text-[#5A646D] uppercase font-bold">
                <th className="py-2.5 px-3">Koʻrsatkich (Показатель)</th>
                <th className="py-2.5 px-3 text-right">Qiymati</th>
                <th className="py-2.5 px-3">Manba / Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA]">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Yaylov hosildorligi</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1A1F24]">13,8 s/ha</td>
                <td className="py-2.5 px-3 text-[#5A646D]">Geobotanik tekshiruv № 47-GB (12.03.2026)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Kontur maydoni</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1A1F24]">42,6 ha</td>
                <td className="py-2.5 px-3 text-[#5A646D]">GIS geometriyasi KT-14-03-217, versiya 4</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Mavsum ulushi</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1A1F24]">0,72</td>
                <td className="py-2.5 px-3 text-[#5A646D]">Mavsumiy kalendar, VMQ 689-son</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Ozuqa zaxirasi (Oz)</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1A1F24]">423,27 s</td>
                <td className="py-2.5 px-3 font-mono text-[#5A646D]">Oz = 13,8 × 42,6 × 0,72</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Samarali ozuqa zaxirasi (Oz_eff)</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1A1F24]">359,78 s</td>
                <td className="py-2.5 px-3 font-mono text-[#5A646D]">Oz_eff = Oz × 0,85 (-15% zaxira)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Maksimal shartli bosh (MaxSB)</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#123522]">96,0 SB</td>
                <td className="py-2.5 px-3 font-mono text-[#5A646D]">MaxSB = floor(359,78 / 3,74)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Boshqa ruxsatnomalar bilan bandlik</td>
                <td className="py-2.5 px-[#B45309] text-right font-mono font-bold">40,6 SB</td>
                <td className="py-2.5 px-3 text-[#5A646D]">7 ta parallel ruxsatnoma</td>
              </tr>
              <tr className="bg-[#F0F7F1]">
                <td className="py-2.5 px-3 font-extrabold text-[#123522]">Boʻsh limit zaxirasi (RemainingSB)</td>
                <td className="py-2.5 px-3 text-right font-mono font-extrabold text-[#15803D] text-sm">55,4 SB</td>
                <td className="py-2.5 px-3 font-mono text-[#123522] font-semibold">RemainingSB = 96,0 - 40,6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Livestock Breakdown & Fees */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-[#5A646D] uppercase tracking-wider">Chorva guruhlari va toʻlov hisobi</h3>
        <div className="overflow-x-auto border border-[#E4E7EA] rounded-xl">
          <table className="w-full text-xs text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#767F87] text-[#5A646D] uppercase font-bold">
                <th className="py-2.5 px-3">Chorva guruhi</th>
                <th className="py-2.5 px-3 text-right">Bosh</th>
                <th className="py-2.5 px-3 text-right">Koef. SB</th>
                <th className="py-2.5 px-3 text-right">Yuklama, SB</th>
                <th className="py-2.5 px-3 text-right">Koef. tarif</th>
                <th className="py-2.5 px-3 text-right">Summa, soʻm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA]">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Katta yoshli qoramol, otlar, tuoyalar</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold">22</td>
                <td className="py-2.5 px-3 text-right font-mono">1,00</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1A1F24]">22,0</td>
                <td className="py-2.5 px-3 text-right font-mono">0,45</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#123522]">4 078 800</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Yosh mollar (2 yoshgacha)</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold">11</td>
                <td className="py-2.5 px-3 text-right font-mono">0,50</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1A1F24]">5,5</td>
                <td className="py-2.5 px-3 text-right font-mono">0,25</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#123522]">1 133 000</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Qoʻy va echkilar (6 oydan katta)</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold">120</td>
                <td className="py-2.5 px-3 text-right font-mono">0,15</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1A1F24]">18,0</td>
                <td className="py-2.5 px-3 text-right font-mono">0,06</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#123522]">2 966 400</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Qoʻzi va uloqlar (6 oygacha)</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold">45</td>
                <td className="py-2.5 px-3 text-right font-mono">0,08</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1A1F24]">3,6</td>
                <td className="py-2.5 px-3 text-right font-mono">0,03</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#123522]">556 200</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Ariza koʻrib chiqish yigʻimi (Yuridik shaxs)</td>
                <td className="py-2.5 px-3 text-right font-mono">—</td>
                <td className="py-2.5 px-3 text-right font-mono">—</td>
                <td className="py-2.5 px-3 text-right font-mono">—</td>
                <td className="py-2.5 px-3 text-right font-mono">0,50</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-[#123522]">206 000</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-[#F0F7F1] font-bold text-[#123522]">
                <td className="py-3 px-3">JAMI · BHM 412 000 soʻm (01.01.2026)</td>
                <td className="py-3 px-3 text-right font-mono">198</td>
                <td className="py-3 px-3 text-right font-mono">—</td>
                <td className="py-3 px-3 text-right font-mono text-sm">49,1</td>
                <td className="py-3 px-3 text-right font-mono">—</td>
                <td className="py-3 px-3 text-right font-mono text-base text-[#15803D]">8 940 400 сум</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Limit Check Banner */}
      <div className="bg-[#DCFCE7] border border-[#86EFAC] rounded-xl p-3.5 text-xs text-[#15803D] flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 shrink-0" />
        <div>
          <strong className="block font-bold">Me'yor sharti bajarildi:</strong>
          <span>Yuklama <strong>49,1 SB</strong> qolgan limit <strong>55,4 SB</strong> dan oshmadi.</span>
        </div>
      </div>

      {/* Payment details receipt */}
      <div className="pt-3 border-t border-[#E4E7EA] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono text-lg font-bold text-[#123522]">
          <CreditCard className="w-5 h-5 text-[#15803D]" /> 8 940 400 soʻm
        </div>
        <div className="text-[#5A646D] text-right">
          26.07.2026 kuni Payme orqali toʻlandi · kvitansiya <span className="font-mono text-[#1A1F24]">PY-2026-0728841</span> · taqsimot 50/50
        </div>
      </div>
    </div>
  );
};
