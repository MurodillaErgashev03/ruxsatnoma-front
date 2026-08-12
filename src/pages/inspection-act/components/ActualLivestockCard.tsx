import React, { useState } from 'react';
import { Plus, Minus, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ActualLivestockCard: React.FC = () => {
  const [cattleCount, setCattleCount] = useState<number>(24); // Qoramol (coeff 1.0)
  const [sheepCount, setSheepCount] = useState<number>(210); // Qo'y-echki (coeff 0.2 -> 42 SB)
  const [horseCount, setHorseCount] = useState<number>(8); // Otlar (coeff 1.5 -> 12 SB)

  const allowedSb = 64;
  const actualSb = Math.round(cattleCount * 1.0 + sheepCount * 0.2 + horseCount * 1.5);
  const isOverNorm = actualSb > allowedSb;
  const overageSb = actualSb - allowedSb;
  const overagePercent = Math.round((overageSb / allowedSb) * 100);

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs font-sans space-y-4">
      <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-2">
        <h3 className="text-sm font-bold text-[#1A1F24]">Haqiqiy chorva bosh soni</h3>
        <span className="text-xs text-[#5A646D]">Avto-hisob</span>
      </div>

      {/* Livestock Counter Rows */}
      <div className="space-y-3">
        {/* Cattle */}
        <div className="flex items-center justify-between gap-2 border-b border-[#E4E7EA] pb-2.5">
          <div>
            <div className="text-xs font-bold text-[#1A1F24]">Qoramol (КРС)</div>
            <div className="text-[11px] text-[#5A646D]">koeffitsient 1,0 → {cattleCount * 1.0} SB</div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCattleCount((c) => Math.max(c - 1, 0))}
              className="w-10 h-10 border border-[#767F87] rounded-xl flex items-center justify-center font-bold text-lg text-[#1A1F24] hover:bg-[#F8F9FA] cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-14 h-10 border border-[#767F87] rounded-xl flex items-center justify-center font-mono font-bold text-base bg-white">
              {cattleCount}
            </span>
            <button
              type="button"
              onClick={() => setCattleCount((c) => c + 1)}
              className="w-10 h-10 border border-[#767F87] rounded-xl flex items-center justify-center font-bold text-lg text-[#1A1F24] hover:bg-[#F8F9FA] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sheep & Goats */}
        <div className="flex items-center justify-between gap-2 border-b border-[#E4E7EA] pb-2.5">
          <div>
            <div className="text-xs font-bold text-[#1A1F24]">Qoʻy va echkilar</div>
            <div className="text-[11px] text-[#5A646D]">koeffitsient 0,2 → {(sheepCount * 0.2).toFixed(0)} SB</div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSheepCount((c) => Math.max(c - 5, 0))}
              className="w-10 h-10 border border-[#767F87] rounded-xl flex items-center justify-center font-bold text-lg text-[#1A1F24] hover:bg-[#F8F9FA] cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-14 h-10 border border-[#767F87] rounded-xl flex items-center justify-center font-mono font-bold text-base bg-white">
              {sheepCount}
            </span>
            <button
              type="button"
              onClick={() => setSheepCount((c) => c + 5)}
              className="w-10 h-10 border border-[#767F87] rounded-xl flex items-center justify-center font-bold text-lg text-[#1A1F24] hover:bg-[#F8F9FA] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horses */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-[#1A1F24]">Otlar (Лошади)</div>
            <div className="text-[11px] text-[#5A646D]">koeffitsient 1,5 → {horseCount * 1.5} SB</div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setHorseCount((c) => Math.max(c - 1, 0))}
              className="w-10 h-10 border border-[#767F87] rounded-xl flex items-center justify-center font-bold text-lg text-[#1A1F24] hover:bg-[#F8F9FA] cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-14 h-10 border border-[#767F87] rounded-xl flex items-center justify-center font-mono font-bold text-base bg-white">
              {horseCount}
            </span>
            <button
              type="button"
              onClick={() => setHorseCount((c) => c + 1)}
              className="w-10 h-10 border border-[#767F87] rounded-xl flex items-center justify-center font-bold text-lg text-[#1A1F24] hover:bg-[#F8F9FA] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Norm Progress Bar & Summary */}
      <div className="pt-3 border-t border-[#E4E7EA] space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-[#5A646D]">Haqiqiy shartli bosh:</span>
          <strong className="font-mono font-bold text-sm text-[#1A1F24]">{actualSb} SB</strong>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[#5A646D]">Ruxsat etilgan me'yor:</span>
          <strong className="font-mono font-bold text-sm text-[#2E7D4F]">{allowedSb} SB</strong>
        </div>

        {/* Meter Progress Bar */}
        <div className="h-3 rounded-full bg-[#E4E7EA] overflow-hidden flex">
          <div
            className="h-full bg-[#2E7D4F] transition-all"
            style={{ width: `${Math.min((actualSb / allowedSb) * 100, 100)}%` }}
          />
          {isOverNorm && (
            <div
              className="h-full bg-repeating-linear-gradient-45 from-[#B91C1C] to-[#EF4444] transition-all"
              style={{ width: `${Math.min(((actualSb - allowedSb) / allowedSb) * 100, 40)}%` }}
            />
          )}
        </div>

        {/* Verdict Banner */}
        {isOverNorm ? (
          <div className="bg-[#FEF2F2] border border-[#B91C1C]/40 rounded-xl p-3 text-xs text-[#B91C1C] font-semibold space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-[#B91C1C]" />
              <span>Me'yordan oshib ketgan: +{overageSb} SB ({overagePercent} %)</span>
            </div>
            <p className="text-[11px] leading-tight">
              Dalolatnoma statusi «Qoida buzilishi» deb belgilanadi. Imzolangach, S16 ssenariysi boʻyicha ish ochiladi hamda <code className="font-mono bg-white px-1 rounded border border-[#B91C1C]/30">RI-02</code> xavf-xatari yaratiladi.
            </p>
          </div>
        ) : (
          <div className="bg-[#DCFCE7] border border-[#86EFAC] rounded-xl p-3 text-xs text-[#15803D] font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
            <span>Me'yor doirasida: {allowedSb - actualSb} SB zaxira bor.</span>
          </div>
        )}
      </div>
    </div>
  );
};
