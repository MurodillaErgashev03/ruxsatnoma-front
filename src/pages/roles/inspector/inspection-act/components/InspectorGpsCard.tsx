import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export interface InspectorGpsCardProps {
  netState?: 'online' | 'offline_cache' | 'offline_nocache';
  isInsideContour?: boolean;
}

export const InspectorGpsCard: React.FC<InspectorGpsCardProps> = ({
  netState = 'online',
  isInsideContour = false,
}) => {
  if (netState === 'offline_nocache') {
    return (
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs font-sans space-y-2 text-xs">
        <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-2 font-bold text-[#1A1F24]">
          <span>Joylashuv va GPS</span>
          <span className="text-[#5A646D]">GPS ±10 m</span>
        </div>
        <p className="text-[#5A646D]">
          Kontur chegaralari yuklanmagan. Koordinatalar aktga yoziladi, lekin konturgacha masofa keyinroq hisoblanadi.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs font-sans space-y-3">
      <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-2">
        <h3 className="text-sm font-bold text-[#1A1F24]">Sizning joylashuvingiz</h3>
        <span className="text-xs font-mono text-[#5A646D]">GPS ±6 m · 11 sun'iy yoʻldosh</span>
      </div>

      {/* Map Canvas Graphic */}
      <div className="relative bg-[#D5E5D8] rounded-xl overflow-hidden aspect-[21/9] border border-[#E4E7EA]">
        <svg className="w-full h-full block" viewBox="0 0 358 160">
          <rect width="358" height="160" fill="#F0F7F1" />
          <path d="M0 24 C60 34 90 12 140 22 C200 34 250 8 358 20" fill="none" stroke="#7FB98A" strokeWidth="1" opacity="0.7" />
          <path d="M0 142 C70 132 120 152 190 140 C260 128 300 148 358 138" fill="none" stroke="#7FB98A" strokeWidth="1" opacity="0.7" />

          {/* Contour Polygon */}
          <polygon points="60,30 180,20 250,60 240,110 150,140 70,110" fill="rgba(127,185,138,0.3)" stroke="#2E7D4F" strokeWidth="2.5" />
          <text x="150" y="78" className="text-[12px] font-bold fill-[#123522]" textAnchor="middle">
            Ruxsat etilgan kontur
          </text>
          <text x="150" y="94" className="text-[11px] fill-[#23653F]" textAnchor="middle">
            OFC-14-238-07 · 38,5 ha
          </text>

          {/* Inspector Current Location */}
          <circle cx="300" cy="92" r="15" fill="none" stroke={isInsideContour ? '#15803D' : '#B45309'} strokeWidth="1.2" strokeDasharray="4 3" />
          <circle cx="300" cy="92" r="6" fill={isInsideContour ? '#15803D' : '#B45309'} stroke="#FFFFFF" strokeWidth="2" />
          <text x="300" y="124" className="text-[11px] font-bold fill-[#B45309]" textAnchor="middle">
            Siz bu yerdasiz
          </text>

          {/* Distance Indicator */}
          {!isInsideContour && (
            <g>
              <line x1="244" y1="92" x2="294" y2="92" stroke="#B45309" strokeWidth="2" strokeDasharray="5 4" />
              <rect x="248" y="62" width="44" height="19" rx="4" fill="#FFFFFF" stroke="#B45309" />
              <text x="270" y="76" className="text-[12px] font-bold fill-[#B45309]" textAnchor="middle">
                120 m
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Distance Status Banner */}
      {!isInsideContour ? (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3 text-xs text-[#B45309] flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm font-bold text-[#B45309]">Siz kontur chegarasidan 120 m tashqaridasiz</strong>
            <span>Ruxsat etilgan uchastkadan tashqarida. Masofa va GPS koordinatalari avtomatik ravishda aktga yoziladi va ularni oʻzgartirib boʻlmaydi.</span>
          </div>
        </div>
      ) : (
        <div className="bg-[#DCFCE7] border border-[#86EFAC] rounded-xl p-3 text-xs text-[#15803D] flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm font-bold text-[#15803D]">Siz kontur ichidasiz (340 m chegaradan)</strong>
            <span>Joylashuvingiz kontur ichida ekanligi tasdiqlandi.</span>
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-[#E4E7EA] space-y-1 text-xs font-mono text-[#5A646D]">
        <div className="flex justify-between"><span>Koordinatalar:</span><strong className="text-[#1A1F24]">41.5512, 70.0428</strong></div>
        <div className="flex justify-between"><span>Aniqlik:</span><span>±6 m · 11 sun'iy yoʻldosh</span></div>
        <div className="flex justify-between"><span>Vaqt:</span><span>10.08.2026, 11:24</span></div>
      </div>
    </div>
  );
};
