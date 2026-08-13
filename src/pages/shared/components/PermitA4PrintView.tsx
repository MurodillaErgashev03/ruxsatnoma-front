import React from 'react';
import { QrCode, Printer } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export const PermitA4PrintView: React.FC = () => {
  return (
    <div className="space-y-4 font-sans max-w-[700px] mx-auto">
      <div className="flex items-center justify-between bg-white border border-[#E4E7EA] rounded-xl p-3 shadow-xs">
        <span className="text-xs font-bold text-[#5A646D] flex items-center gap-1.5">
          <Printer className="w-4 h-4 text-[#15803D]" /> Bosma shakli (A4 format)
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="border-[#767F87] text-[#1A1F24] text-xs font-bold"
          >
            Печать
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => alert('PDF/A-2b fayli yuklab olindi!')}
            className="bg-[#2E7D4F] hover:bg-[#23653F] text-white text-xs font-bold"
          >
            PDF/A yuklash
          </Button>
        </div>
      </div>

      {/* A4 Paper Frame (660px wide, black text on white background) */}
      <div className="w-[660px] mx-auto bg-white border border-black shadow-2xl p-12 text-black text-[11px] leading-[15px] space-y-4 font-sans">
        {/* Header Org */}
        <div className="text-center text-[10px] leading-[14px] uppercase tracking-wider">
          <strong className="block font-bold text-xs">Oʻzbekiston Respublikasi Oʻrmon xoʻjaligi agentligi</strong>
          Toshkent viloyati davlat oʻrmon xoʻjaligi · Zangiota oʻrmonchiligi
        </div>

        <div className="h-[1px] bg-black my-2" />

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-base font-bold tracking-widest">RUXSATNOMA</h1>
          <p className="text-[11px] font-normal">Oʻrmon fondi yaylov hududlarida chorva mollarini boqish uchun</p>
          <p className="text-[10px] text-gray-700 italic">Разрешение на выпас скота на пастбищных территориях лесного фонда</p>
        </div>

        {/* ID line */}
        <div className="flex justify-between items-end font-mono font-bold text-sm pt-2">
          <span>Seriya А № 004182</span>
          <span className="font-normal text-xs">Berilgan sanasi / Дата выдачи: 25.07.2026</span>
        </div>

        {/* Official Table */}
        <table className="w-full border-collapse border border-black text-[10px]">
          <tbody>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left w-1/3">1. Vakolatli organ</th>
              <td className="border border-black p-1.5" colSpan={2}>Toshkent viloyati davlat oʻrmon xoʻjaligi</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">2. Oʻrmonchilik, aylanma, kvartal</th>
              <td className="border border-black p-1.5" colSpan={2}>Zangiota oʻrmonchiligi · obxod № 3 · kvartal 14</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">3. Kontur / subkontur</th>
              <td className="border border-black p-1.5 font-mono" colSpan={2}>KT-14-03-217 / 217-2</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">4. Ajratilgan maydon</th>
              <td className="border border-black p-1.5 font-mono text-right font-bold w-1/4">42,6 ha</td>
              <td className="border border-black p-1.5 text-gray-600">GIS geometriyasi boʻyicha</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">5. Foydalanuvchi</th>
              <td className="border border-black p-1.5" colSpan={2}>
                «Chorvador-Sardor» fermer xoʻjaligi, STIR 305718842<br />
                rahbar Yuldoshev Rustam Normatovich, JSHSHIR 31708860250017
              </td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">6. Foydalanuvchi manzili</th>
              <td className="border border-black p-1.5" colSpan={2}>Toshkent viloyati, Zangiota tumani, Nazarbek MFY, Bogʻishamol koʻchasi, 14</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">7. Qoramol, otlar, tuyalar (kattalar)</th>
              <td className="border border-black p-1.5 font-mono text-right font-bold">22</td>
              <td className="border border-black p-1.5">bosh</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">8. Yosh mollar (2 yoshgacha)</th>
              <td className="border border-black p-1.5 font-mono text-right font-bold">11</td>
              <td className="border border-black p-1.5">bosh</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">9. Qoʻy va echkilar (6 oydan katta)</th>
              <td className="border border-black p-1.5 font-mono text-right font-bold">120</td>
              <td className="border border-black p-1.5">bosh</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">10. Qoʻzi va uloqlar (6 oygacha)</th>
              <td className="border border-black p-1.5 font-mono text-right font-bold">45</td>
              <td className="border border-black p-1.5">bosh</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">11. Shartli bosh yuklama (SB)</th>
              <td className="border border-black p-1.5 font-mono text-right font-bold">49,1 SB</td>
              <td className="border border-black p-1.5 text-gray-600">limit 55,4 SB boʻlganda</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">12. Foydalanish muddati</th>
              <td className="border border-black p-1.5 font-mono" colSpan={2}>01.08.2026 dan 31.10.2026 gacha</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">13. Umumiy toʻlov summasi</th>
              <td className="border border-black p-1.5 font-mono text-right font-bold">8 940 400</td>
              <td className="border border-black p-1.5">soʻm</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">14. Toʻlov holati va sanasi</th>
              <td className="border border-black p-1.5" colSpan={2}>Toʻliq toʻlangan, 26.07.2026</td>
            </tr>
            <tr>
              <th className="border border-black bg-gray-100 p-1.5 text-left">15. Hujjat holati</th>
              <td className="border border-black p-1.5 font-bold text-green-800" colSpan={2}>Deystvuet / Amalda</td>
            </tr>
          </tbody>
        </table>

        {/* Paper Signatures */}
        <div className="uppercase font-bold text-[9px] tracking-wider pt-2">Elektron raqamli imzolar / Электронные подписи</div>
        <div className="grid grid-cols-2 gap-2 text-[9px]">
          <div className="border border-black p-2">
            <div className="uppercase text-[8px] text-gray-700">Xoʻjalik rahbari</div>
            <div className="font-bold text-[10px]">Toshmatov Sh. A.</div>
            <div className="font-mono text-[8px] text-gray-600">24.07.2026 14:32 · 9F:2C:41:AB</div>
          </div>
          <div className="border border-black p-2">
            <div className="uppercase text-[8px] text-gray-700">Bosh oʻrmonchi</div>
            <div className="font-bold text-[10px]">Ergashev B. R.</div>
            <div className="font-mono text-[8px] text-gray-600">24.07.2026 15:08 · 4A:11:C7:90</div>
          </div>
          <div className="border border-black p-2">
            <div className="uppercase text-[8px] text-gray-700">Bosh buxgalter</div>
            <div className="font-bold text-[10px]">Sobirova N. A.</div>
            <div className="font-mono text-[8px] text-gray-600">25.07.2026 09:47 · E3:57:0D:9A</div>
          </div>
          <div className="border border-black p-2">
            <div className="uppercase text-[8px] text-gray-700">Foydalanuvchi</div>
            <div className="font-bold text-[10px]">Yuldoshev R. N.</div>
            <div className="font-mono text-[8px] text-gray-600">11.08.2026 14:30 · E-IMZO tasdiqlangan</div>
          </div>
        </div>

        {/* Paper Footer QR */}
        <div className="border-t border-black pt-2 flex items-center gap-3 text-[9px] leading-tight text-gray-800">
          <QrCode className="w-16 h-16 shrink-0 text-black" />
          <div>
            Hujjatning haqiqiyligi QR-kod hamda seriya va raqam orqali avtorizatsiyasiz tekshiriladi.<br />
            <span className="font-mono font-bold">ruxsatnoma · verify · A-004182 · 7d3f9c21</span><br />
            Hujjat avtomatik shakllantirilgan, muhr va qoʻlda qoʻyiladigan imzosiz haqiqiydir. Shablon PERMIT-GRAZ-2026.1.
          </div>
        </div>
      </div>
    </div>
  );
};
