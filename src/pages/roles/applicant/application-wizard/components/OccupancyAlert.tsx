import React from 'react';
import { AlertTriangle, CheckCircle2, Eye, RefreshCw, PhoneCall } from 'lucide-react';
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
    <div className="bg-[#FEF2F2] border-2 border-[#B91C1C] rounded-2xl p-5 sm:p-6 shadow-xs font-sans space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#B91C1C] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#B91C1C] px-2.5 py-0.5 rounded-full">
              Diqqat: Bandlik nizosi aniqlandi
            </span>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-[#991B1B]">
            Tanlangan uchastka amaldagi ruxsatnoma bilan kesishmoqda!
          </h2>

          <p className="text-xs md:text-sm text-[#1A1F24] leading-relaxed">
            Tanlangan <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#B91C1C]/30 text-[#B91C1C]">{contourId}</strong> kontur ({leskhozName}, {lesnichestvoName}, {kvartal}-kvartal) umumiy maydoni <strong>{totalArea} ha</strong> boʻlib, amaldagi <strong>№ {activePermitNo}</strong> ruxsatnomasiga (Chorva boqish, amal qilish muddati: <strong>{activePermitUntil}</strong>) <strong>{overlapArea} ha</strong> qismida kesishmoqda. Kesishuv xaritada qizil shtrix bilan koʻrsatilgan.
          </p>

          <p className="text-xs md:text-sm text-[#1A1F24] leading-relaxed">
            Kesishuvni chiqarib tashlasangiz — arizangizda boʻsh qolgan <strong>{freeArea} ha</strong> maydon rasmiylashtiriladi. Yoki chizish instrumenti yordamida chegara chizigʻini surishingiz yoki boshqa kontur tanlashingiz mumkin.
          </p>

          {/* Technical Support Footnote */}
          <div className="pt-3 border-t border-[#B91C1C]/20 text-xs text-[#5A646D] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-[#B91C1C]" />
              <span>Uchastka boʻsh deb hisoblasangiz, texnik qoʻllab-quvvatlash xizmati:</span>
              <strong className="font-mono text-[#1A1F24] bg-white px-2 py-0.5 rounded border border-[#E4E7EA]">
                71-207-07-70
              </strong>
              <span>(ish kunlari 9:00–18:00)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              onClick={onExcludeOverlap}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold cursor-pointer text-xs"
            >
              Kesishuvni chiqarib tashlash — {freeArea} ha qoldirish
            </Button>

            <Button
              variant="outline"
              size="md"
              leftIcon={<Eye className="w-4 h-4 text-[#5A646D]" />}
              onClick={onShowOnMap}
              className="border-[#767F87] text-[#1A1F24] hover:bg-white font-bold cursor-pointer text-xs"
            >
              Xaritada koʻrsatish
            </Button>

            <Button
              variant="ghost"
              size="md"
              leftIcon={<RefreshCw className="w-4 h-4 text-[#2E7D4F]" />}
              onClick={onChangeContour}
              className="text-[#2E7D4F] font-bold hover:bg-[#F0F7F1] cursor-pointer text-xs"
            >
              Boshqa kontur tanlash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
