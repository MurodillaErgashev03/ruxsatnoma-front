import React from 'react';
import { Smartphone } from 'lucide-react';

export const PwaGuidelinesFootnote: React.FC = () => {
  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs font-sans space-y-4 text-xs text-[#1A1F24]">
      <div className="flex items-center gap-2 border-b border-[#E4E7EA] pb-3">
        <Smartphone className="w-5 h-5 text-[#2E7D4F]" />
        <h3 className="text-base font-bold text-[#1A1F24]">
          PWA Dala Inspektor Ekran Qoidalari va Standartlari
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#5A646D]">
        <div className="space-y-1.5">
          <strong className="text-[#1A1F24] block">📱 Ekran kengligi va moslashuvchanligi:</strong>
          <p>
            390 px — eng kichik maqsadli oʻlcham. Dala sharoitida telefon bitta qoʻlda ushlanadi, quyosh nuri tushadi hamda qoʻlqop taqilgan boʻlishi mumkin.
          </p>
        </div>

        <div className="space-y-1.5">
          <strong className="text-[#1A1F24] block">👆 Tugma oʻlchamlari va bosish maydoni:</strong>
          <p>
            Tugmalar balandligi kamida 48 px. Bosish maydoni (Touch target) kamida 44 × 44 px qilib belgilangan (WCAG 2.5.8 standarti).
          </p>
        </div>

        <div className="space-y-1.5">
          <strong className="text-[#1A1F24] block">📡 Doimiy Tarmoq (Network) Bar:</strong>
          <p>
            Ekran tepasida qotirilgan. U darhol 2 savolga javob beradi: aloqa bormi va navbatda nechta akt yuborilishni kutmoqda.
          </p>
        </div>

        <div className="space-y-1.5">
          <strong className="text-[#1A1F24] block">🔒 Avtonom (Offline) Kesh printsipi:</strong>
          <p>
            Internetsiz ham barcha ma'lumotlar olinadi va E-IMZO muhrlanadi. Tarmoq paydo boʻlishi bilan 5 daqiqa ichida avtomatik sinxronlanadi.
          </p>
        </div>
      </div>
    </div>
  );
};
