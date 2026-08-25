import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

export const DesignDecisionsFootnote: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 shadow-2xs font-sans mt-8 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left cursor-pointer"
      >
        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#B45309]">
          <Lightbulb className="w-4 h-4 text-[#B45309] shrink-0" />
          <span>Qabul qilingan tizim va arxitektura qarorlari (Решения, принятые на этом экране)</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#B45309] font-medium shrink-0">
          <span>{isOpen ? 'Yashirish' : 'Ko‘rish'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <ul className="space-y-2 text-xs text-[#1A1F24] leading-relaxed list-disc pl-5 pt-3 border-t border-[#FDE68A] mt-3 animate-fadeIn">
          <li>
            <strong>Xarita asosiy maydonni egallaydi, panel oʻngda 360px:</strong> Uchastka koʻz bilan tanlanadi. Ierarxiya (Viloyat → Tuman → Oʻrmon xoʻjaligi → Boʻlim → Obxod → Kvartal → Kontur) mavjud.
          </li>
          <li>
            <strong>Kesishuv avtomatik hisoblangan:</strong> Amaldagi ruxsatnoma poligoni kontur boʻyicha <code className="bg-white px-1 py-0.5 rounded border border-[#FDE68A] font-mono">clipPath</code> yordamida qirqib koʻrsatilgan — serverdagi <code className="bg-white px-1 py-0.5 rounded border border-[#FDE68A] font-mono">ST_Intersection</code> kabi.
          </li>
          <li>
            <strong>Bandlik rangsiz ham tushunarli:</strong> Shtrixovka, chegara, xaritadagi yozuv, «− Band 3,2 ha» satri va xatolik matni — barchasi bir ma'noni anglatuvchi 5 ta belgi (WCAG 1.4.1).
          </li>
          <li>
            <strong>Hisob-kitob zanjir shaklida koʻrsatilgan:</strong> Foydalanuvchi hosildorlik, maydon, mavsum ulushi, sugʻurta fondi va ozuqa normasining har bir manbasini koʻradi (VMQ 689-son, 4.2.15-band).
          </li>
          <li>
            <strong>«Keyingiga» tugmasi nofaol, lekin sababi tushuntirilgan:</strong> Tugma <code className="bg-white px-1 py-0.5 rounded border border-[#FDE68A] font-mono">aria-disabled</code> va sabab matni bilan bogʻlangan.
          </li>
          <li>
            <strong>Barcha boshqaruv elementlari chegarasi — neutral-500:</strong> WCAG 1.4.11 talabiga koʻra 3.0:1 kontrast nisbati saqlangan.
          </li>
        </ul>
      )}
    </div>
  );
};
