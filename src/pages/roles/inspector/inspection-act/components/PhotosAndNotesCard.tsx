import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';

export const PhotosAndNotesCard: React.FC = () => {
  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs font-sans space-y-4">
      <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-2">
        <h3 className="text-sm font-bold text-[#1A1F24]">Foto va video dalillar</h3>
        <span className="text-xs text-[#5A646D] font-mono">3 fayl · 7,1 MB</span>
      </div>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="relative aspect-[4/3] bg-[#CFE4EE] rounded-xl overflow-hidden border border-[#767F87] flex flex-col justify-end p-1.5">
          <span className="absolute top-1 right-1 bg-black/75 text-white font-mono text-[9px] px-1 py-0.5 rounded">GPS</span>
          <span className="bg-black/75 text-white text-[10px] font-bold px-1 py-0.5 rounded self-start">11:19</span>
        </div>

        <div className="relative aspect-[4/3] bg-[#DCE9EF] rounded-xl overflow-hidden border border-[#767F87] flex flex-col justify-end p-1.5">
          <span className="absolute top-1 right-1 bg-black/75 text-white font-mono text-[9px] px-1 py-0.5 rounded">GPS</span>
          <span className="bg-black/75 text-white text-[10px] font-bold px-1 py-0.5 rounded self-start">11:21</span>
        </div>

        <div className="relative aspect-[4/3] bg-[#D8E7EC] rounded-xl overflow-hidden border border-[#767F87] flex flex-col justify-end p-1.5">
          <span className="absolute top-1 right-1 bg-black/75 text-white font-mono text-[9px] px-1 py-0.5 rounded">GPS</span>
          <span className="bg-black/75 text-white text-[10px] font-bold px-1 py-0.5 rounded self-start">11:23</span>
        </div>
      </div>

      {/* Photo Metadata Details */}
      <div className="bg-[#F8F9FA] rounded-xl p-3 border border-[#E4E7EA] text-[11px] font-mono space-y-1 text-[#5A646D]">
        <div className="flex justify-between"><span>Rasm 3:</span><span className="text-[#1A1F24]">10.08.2026, 11:23:41</span></div>
        <div className="flex justify-between"><span>Koordinata:</span><span className="text-[#1A1F24]">41.5512, 70.0428 ±6 m</span></div>
        <div className="flex justify-between"><span>Qurilma:</span><span className="text-[#1A1F24]">Redmi Note 12 · IMEI ****7431</span></div>
        <div className="flex justify-between"><span>SHA-256:</span><span className="text-[#1A1F24]">3f9a41c7…c21b</span></div>
      </div>

      <p className="text-[11px] text-[#5A646D] leading-tight">
        Metama'lumotlar fayl ichiga tikiladi va akt bilan birga imzo joylanadi. Galereyadan tayyor rasm biriktirib boʻlmaydi — faqat ilova ichidagi kameradan rasmga olinadi.
      </p>

      <Button
        variant="outline"
        size="md"
        leftIcon={<Camera className="w-4 h-4 text-[#2E7D4F]" />}
        onClick={() => alert('Kamera ishga tushmoqda...')}
        className="w-full border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] font-bold text-xs cursor-pointer h-11"
      >
        Rasmga olish (Сделать снимок)
      </Button>

      {/* Inspector Notes Textarea */}
      <div className="pt-3 border-t border-[#E4E7EA] space-y-1.5">
        <label className="text-xs font-bold text-[#1A1F24] block">Inspektor izohi (Примечание)</label>
        <textarea
          rows={3}
          defaultValue="Chorva mollari konturning sharqiy chegarasidan tashqarida, 2024 yilda ekilgan koʻchatlar maydonida boqilmoqda. Choʻpon hozir boʻldi, hujjatlar taqdim etildi."
          className="w-full text-xs border border-[#767F87] rounded-xl p-3 text-[#1A1F24] focus:outline-none focus:ring-2 focus:ring-[#2E7D4F]"
        />
      </div>
    </div>
  );
};
