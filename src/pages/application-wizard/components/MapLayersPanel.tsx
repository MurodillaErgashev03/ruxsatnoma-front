import React, { useState } from 'react';
import { Layers } from 'lucide-react';

export const MapLayersPanel: React.FC = () => {
  const [layers, setLayers] = useState({
    forestFund: true,
    boundaries: true,
    contours: true,
    restrictions: false,
    protectionZones: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs font-sans space-y-4">
      <div className="border-b border-[#E4E7EA] pb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D] flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#2E7D4F]" /> Xarita qatlamlari (Слои карты)
        </h3>
        <span className="text-xs font-mono text-[#5A646D]">
          {Object.values(layers).filter(Boolean).length} / 5 koʻrsatilgan
        </span>
      </div>

      <div className="space-y-3">
        {/* Layer 1 */}
        <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
          <div>
            <div className="text-xs font-bold text-[#1A1F24]">Oʻrmon fondi</div>
            <div className="text-[11px] text-[#5A646D]">
              {layers.forestFund ? 'Koʻrsatilgan' : 'Yashiringan'}
            </div>
          </div>
          <input
            type="checkbox"
            checked={layers.forestFund}
            onChange={() => toggleLayer('forestFund')}
            className="w-10 h-5 accent-[#2E7D4F] rounded-full cursor-pointer"
          />
        </label>

        {/* Layer 2 */}
        <label className="flex items-center justify-between gap-3 cursor-pointer select-none border-t border-[#E4E7EA] pt-2.5">
          <div>
            <div className="text-xs font-bold text-[#1A1F24]">Tashkilot va boʻlim chegaralari</div>
            <div className="text-[11px] text-[#5A646D]">
              {layers.boundaries ? 'Koʻrsatilgan' : 'Yashiringan'}
            </div>
          </div>
          <input
            type="checkbox"
            checked={layers.boundaries}
            onChange={() => toggleLayer('boundaries')}
            className="w-10 h-5 accent-[#2E7D4F] rounded-full cursor-pointer"
          />
        </label>

        {/* Layer 3 */}
        <label className="flex items-center justify-between gap-3 cursor-pointer select-none border-t border-[#E4E7EA] pt-2.5">
          <div>
            <div className="text-xs font-bold text-[#1A1F24]">Konturlar va subkonturlar</div>
            <div className="text-[11px] text-[#5A646D]">
              {layers.contours ? 'Koʻrsatilgan' : 'Yashiringan'}
            </div>
          </div>
          <input
            type="checkbox"
            checked={layers.contours}
            onChange={() => toggleLayer('contours')}
            className="w-10 h-5 accent-[#2E7D4F] rounded-full cursor-pointer"
          />
        </label>

        {/* Layer 4 */}
        <label className="flex items-center justify-between gap-3 cursor-pointer select-none border-t border-[#E4E7EA] pt-2.5">
          <div>
            <div className="text-xs font-bold text-[#1A1F24]">Cheklovlar va taqiqlar</div>
            <div className="text-[11px] text-[#5A646D]">
              {layers.restrictions ? 'Koʻrsatilgan' : 'Yashiringan · Yongʻin xavfi (VMQ 506)'}
            </div>
          </div>
          <input
            type="checkbox"
            checked={layers.restrictions}
            onChange={() => toggleLayer('restrictions')}
            className="w-10 h-5 accent-[#2E7D4F] rounded-full cursor-pointer"
          />
        </label>

        {/* Layer 5 */}
        <label className="flex items-center justify-between gap-3 cursor-pointer select-none border-t border-[#E4E7EA] pt-2.5">
          <div>
            <div className="text-xs font-bold text-[#1A1F24]">Muhofaza va suv zonalari</div>
            <div className="text-[11px] text-[#5A646D]">
              {layers.protectionZones ? 'Koʻrsatilgan' : 'Yashiringan'}
            </div>
          </div>
          <input
            type="checkbox"
            checked={layers.protectionZones}
            onChange={() => toggleLayer('protectionZones')}
            className="w-10 h-5 accent-[#2E7D4F] rounded-full cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};
