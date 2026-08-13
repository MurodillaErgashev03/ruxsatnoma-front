import React from 'react';
import { Calculator, RefreshCw, CheckCircle2, Copy } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export const CalculationPanel: React.FC = () => {
  return (
    <section id="s-calc" className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs font-sans overflow-hidden">
      {/* Panel Header */}
      <div className="p-6 border-b border-[#E4E7EA] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1A1F24]">3. Hisob-kitob va me'yorlar zanjiri</h2>
            <span className="text-xs font-semibold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded-full border border-[#D9EBDC]">
              Qayta tiklanuvchi algoritm (R3)
            </span>
          </div>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Barcha hisob-kitoblar VMQ 278 va me'yoriy koeffitsientlar boʻyicha avtomatik oʻtkaziladi (4.2.15-band)
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={() => alert('Hisob-kitob qayta tekshirildi (Hash: 9F8A22C0)')}
          className="cursor-pointer font-semibold text-xs"
        >
          Algoritmik auditni solishtirish
        </Button>
      </div>

      {/* Panel Body */}
      <div className="p-6 space-y-6">
        {/* Lead description */}
        <p className="text-xs text-[#5A646D] leading-relaxed max-w-3xl">
          Hisob-kitob yakuniy toʻlov summasini shakllantiradi: baza qiymatlari (Oz), samaradorlik koeffitsientlari (Oz_eff), hamda kontur sigʻimi limitlari (MaxSB, UsedSB va RemainingSB) oʻzaro bogʻlangan holda hisoblanadi.
        </p>

        {/* Limit progress bar */}
        <div className="space-y-2 bg-[#F8F9FA] p-4 rounded-xl border border-[#E4E7EA]">
          <div className="flex justify-between text-xs font-bold text-[#1A1F24]">
            <span>Kontur yaylov sigʻimi yuklamasi (MaxSB):</span>
            <span className="font-mono">28.60 / 29.00 SB (98.6% band)</span>
          </div>

          <div className="flex h-7 rounded-lg overflow-hidden border border-[#767F87] font-mono text-[11px] font-bold text-white">
            <div className="bg-[#5A646D] flex items-center justify-center" style={{ width: '77.9%' }}>
              Band: 22.30 SB (77.9%)
            </div>
            <div className="bg-[#2E7D4F] flex items-center justify-center" style={{ width: '20.7%' }}>
              Ushbu ariza: 6.30 SB (20.7%)
            </div>
            <div className="bg-[#B45309] flex items-center justify-center" style={{ width: '1.4%' }}>
              0.40
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-[#5A646D] pt-1">
            <span><strong className="text-[#1A1F24]">Amaldagi ruxsatnomalar:</strong> 22.30 bosh (77.9%)</span>
            <span><strong className="text-[#2E7D4F]">Ushbu ariza talabi:</strong> 6.30 bosh (20.7%)</span>
            <span><strong className="text-[#B45309]">Qolgan zaxira:</strong> 0.40 bosh (1.4%)</span>
          </div>
        </div>

        {/* Formula breakdown box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#1A1F24]">
            <span className="flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#2E7D4F]" /> Toʻlov formulasi yoyilmasi:
            </span>
            <button
              onClick={() => alert('Formula nusxalandi')}
              className="text-[#2E7D4F] hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" /> Nusxalash
            </button>
          </div>

          <div className="font-mono text-xs text-[#1A1F24] bg-[#F8F9FA] border border-[#E4E7EA] border-l-4 border-l-[#2E7D4F] p-4 rounded-lg overflow-x-auto whitespace-pre leading-relaxed">
{`Oz       = BaseRate (0.05 BHM) * Area (12.50 ha) * SeasonFactor (1.20)
         = 375,000 UZS * 12.50 * 1.20 = 5,625,000 UZS

Oz_eff   = Oz * AnimalCoeff (0.35) * DurationFactor (91 / 365)
         = 5,625,000 * 0.35 * 0.2493 = 490,904.25 UZS

Total    = Oz_eff + InfrastructureFee (716,420.55 UZS)
         = 1,207,324.80 UZS`}
          </div>
        </div>

        {/* Calculation parameters table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
            Hisob-kitob parametrlari va koeffitsientlar roʻyxati
          </h3>
          <div className="overflow-x-auto border border-[#E4E7EA] rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[#5A646D] font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Koʻrsatkich nomi</th>
                  <th className="py-2.5 px-3">Belgisi</th>
                  <th className="py-2.5 px-3 font-mono text-right">Birligi / Qiymati</th>
                  <th className="py-2.5 px-[#5A646D]">Izoh va manba</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EA]">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Baza hisoblash miqdori (BHM)</td>
                  <td className="py-2.5 px-3 font-mono text-[#2E7D4F]">BHM</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#1A1F24] text-right">375 000 UZS</td>
                  <td className="py-2.5 px-3 text-[#5A646D]">Amaldagi davlat standarti boʻyicha</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Mavsumiy koeffitsient</td>
                  <td className="py-2.5 px-3 font-mono text-[#2E7D4F]">SeasonFactor</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#1A1F24] text-right">1.20</td>
                  <td className="py-2.5 px-3 text-[#5A646D]">Kuzgi yaylov mavsumi uchun oshiruvchi indeks</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Chorva turi koeffitsienti</td>
                  <td className="py-2.5 px-3 font-mono text-[#2E7D4F]">AnimalCoeff</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#1A1F24] text-right">0.35</td>
                  <td className="py-2.5 px-3 text-[#5A646D]">Qoramol va kichik tuyoqli mollar nisbati</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#1A1F24]">Infratuzilma va monitoring toʻlovi</td>
                  <td className="py-2.5 px-3 font-mono text-[#2E7D4F]">InfraFee</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#1A1F24] text-right">716 420,55 UZS</td>
                  <td className="py-2.5 px-3 text-[#5A646D]">Oʻrmon loyiha va GIS nazorati xizmati</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Reproducibility Traceability Footer (4.2.15 item) */}
        <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-[#1A1F24] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> Qayta tiklanuvchanlik va audit kafolati (Natija hash-kodlangan)
            </div>
            <div className="text-[#5A646D]">
              Qoida versiyasi: <strong className="font-mono text-[#1A1F24]">Rule_V3_2026.04</strong> · Input snapshot Hash:{' '}
              <strong className="font-mono text-[#1A1F24]">SHA256: 9F8A22C0E8...</strong>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => alert('Snapshat koʻrsatildi')} className="cursor-pointer">
            Snapshot koʻrish
          </Button>
        </div>
      </div>
    </section>
  );
};
