import React from 'react';
import { AlertTriangle, CheckCircle2, Eye, RefreshCw, PhoneCall, ArrowRight, ShieldAlert } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';

export interface OccupancyAlertProps {
  contourId?: string;
  leskhozName?: string;
  lesnichestvoName?: string;
  kvartal?: number;
  totalArea?: number;
  overlapArea?: number;
  activePermitNo?: string;
  activePermitUntil?: string;
  onExcludeOverlap?: () => void;
  onShowOnMap?: () => void;
  onChangeContour?: () => void;
}

export const OccupancyAlert: React.FC<OccupancyAlertProps> = ({
  contourId = '04-12-007',
  leskhozName = 'Zangiota oʻrmon xoʻjaligi',
  lesnichestvoName = 'Chinoz oʻrmon boʻlimi',
  kvartal = 12,
  totalArea = 21.7,
  overlapArea = 3.2,
  activePermitNo = 'RX-2026-004112',
  activePermitUntil = '31.10.2026',
  onExcludeOverlap,
  onShowOnMap,
  onChangeContour,
}) => {
  const freeArea = (totalArea - overlapArea).toFixed(1);

  return (
    <div className="bg-[#FFF5F5] border-2 border-[#E53E3E] rounded-3xl p-5 sm:p-6 shadow-sm font-sans space-y-4">
      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E53E3E]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E53E3E] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#9B2C2C]">
                Tanlangan yerning bir qismida amaldagi ruxsatnoma mavjud
              </h2>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E53E3E] text-white">
                Bandlik holati
              </span>
            </div>
            <p className="text-xs text-[#742A2A] mt-0.5">
              Kontur: <strong className="font-mono bg-white px-1.5 py-0.2 rounded border border-[#E53E3E]/30 text-[#9B2C2C]">{contourId}</strong> ({leskhozName}, {lesnichestvoName}, {kvartal}-kvartal)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#9B2C2C] bg-white px-3 py-1.5 rounded-xl border border-[#E53E3E]/30 shrink-0">
          <span>Umumiy: {totalArea} ha</span>
          <span>•</span>
          <span className="text-[#C53030]">Band qism: {overlapArea} ha</span>
          <span>•</span>
          <span className="text-[#2E7D4F]">Bo‘sh: {freeArea} ha</span>
        </div>
      </div>

      {/* Plain Language Explanation Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E53E3E]/20 text-xs sm:text-sm text-[#2D3748] leading-relaxed space-y-2">
        <p>
          Siz tanlagan <strong>{totalArea} gektar</strong> maydonning <strong>{overlapArea} gektarida</strong> boshqa fuqaro nomiga rasmiylashtirilgan amaldagi (№ {activePermitNo}, {activePermitUntil} gacha) ruxsatnoma mavjud.
        </p>
        <p className="text-[#2E7D4F] font-semibold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2E7D4F]" />
          Siz hech qanday qiyinchiliksiz qolgan <strong>bo‘sh {freeArea} gektar</strong> yer uchun arizangizni davom ettirishingiz mumkin!
        </p>
      </div>

      {/* Clear 1-Click Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        {/* Recommended Primary Button */}
        <Button
          variant="primary"
          size="md"
          leftIcon={<CheckCircle2 className="w-4 h-4" />}
          rightIcon={<ArrowRight className="w-4 h-4 opacity-80" />}
          onClick={onExcludeOverlap}
          className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold h-12 px-6 rounded-xl cursor-pointer text-xs sm:text-sm shadow-md transition-transform hover:scale-[1.01]"
        >
          Bo‘sh {freeArea} gektarga ariza berish (Tavsiya etiladi)
        </Button>

        {/* Secondary: Show on map */}
        <Button
          variant="outline"
          size="md"
          leftIcon={<Eye className="w-4 h-4 text-[#5A646D]" />}
          onClick={onShowOnMap}
          className="border-[#CAD0D6] bg-white text-[#1A1F24] hover:bg-[#F8F9FA] font-bold h-12 px-4 rounded-xl cursor-pointer text-xs"
        >
          Xaritada ko‘rish
        </Button>

        {/* Secondary: Pick another contour */}
        <Button
          variant="ghost"
          size="md"
          leftIcon={<RefreshCw className="w-4 h-4 text-[#2E7D4F]" />}
          onClick={onChangeContour}
          className="text-[#2E7D4F] font-bold hover:bg-[#F0F7F1] h-12 px-4 rounded-xl cursor-pointer text-xs"
        >
          Boshqa bo‘sh kontur tanlash
        </Button>
      </div>

      {/* Technical Support Footnote */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#718096]">
        <div className="flex items-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-[#E53E3E]" />
          <span>Yer bo‘yicha savollar bo‘lsa, qo‘llab-quvvatlash xizmati:</span>
          <strong className="font-mono text-[#1A1F24] bg-white px-2 py-0.5 rounded border border-[#CAD0D6]">
            71-207-07-70
          </strong>
        </div>
        <div className="flex items-center gap-1 text-[#718096]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>PostGIS ST_Overlaps tekshiruvi asosida</span>
        </div>
      </div>
    </div>
  );
};
