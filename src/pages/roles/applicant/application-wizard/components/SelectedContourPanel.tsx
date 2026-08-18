import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Input, FormField } from '../../../../../components/ui/FormControls';

export interface SelectedContourPanelProps {
  contourId?: string;
  leskhozName?: string;
  lesnichestvoName?: string;
  obxod?: string;
  kvartal?: number;
  subcontour?: string;
  totalArea?: number;
  overlapArea?: number;
  requestedArea?: string;
  onRequestedAreaChange?: (val: string) => void;
  hasConflict?: boolean;
}

export const SelectedContourPanel: React.FC<SelectedContourPanelProps> = ({
  contourId = '04-12-007',
  leskhozName = 'Zangiota oʻrmon xoʻjaligi',
  lesnichestvoName = 'Chinoz oʻrmon boʻlimi',
  obxod = '3-aylanma',
  kvartal = 12,
  subcontour = '007-b',
  totalArea = 21.7,
  overlapArea = 3.2,
  requestedArea = '21,7',
  onRequestedAreaChange,
  hasConflict = true,
}) => {
  const freeArea = (totalArea - (hasConflict ? overlapArea : 0)).toFixed(1);

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs font-sans space-y-5">
      {/* Header & Contour Status */}
      <div className="border-b border-[#E4E7EA] pb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
          Tanlangan kontur (Выбранный контур)
        </h3>
        <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full border border-[#86EFAC] flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Published
        </span>
      </div>

      <div className="space-y-1">
        <div className="font-mono text-2xl font-extrabold text-[#1A1F24] tracking-tight">{contourId}</div>
      </div>

      {/* Contour Facts Key-Value Grid */}
      <dl className="grid grid-cols-2 gap-y-2 text-xs border-b border-[#E4E7EA] pb-4">
        <dt className="text-[#5A646D]">Oʻrmon xoʻjaligi:</dt>
        <dd className="font-semibold text-[#1A1F24] text-right">{leskhozName}</dd>

        <dt className="text-[#5A646D]">Oʻrmon boʻlimi:</dt>
        <dd className="font-semibold text-[#1A1F24] text-right">{lesnichestvoName}</dd>

        <dt className="text-[#5A646D]">Aylanma / Obxod:</dt>
        <dd className="font-semibold text-[#1A1F24] text-right">{obxod}</dd>

        <dt className="text-[#5A646D]">Kvartal:</dt>
        <dd className="font-semibold text-[#1A1F24] text-right">{kvartal}</dd>

        <dt className="text-[#5A646D]">Subkontur:</dt>
        <dd className="font-semibold text-[#1A1F24] text-right">{subcontour}</dd>

        <dt className="text-[#5A646D]">Umumiy maydon:</dt>
        <dd className="font-mono font-bold text-[#1A1F24] text-right">{totalArea} ha</dd>

        <dt className="text-[#5A646D]">Me'yor kodi:</dt>
        <dd className="font-mono text-[#2E7D4F] text-right font-bold">№ 2026-NRM-114</dd>
      </dl>

      {/* Free Area Table Calculation */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-[#1A1F24] uppercase tracking-wider">
          Boʻsh maydon hisobi (Свободная площадь)
        </h4>

        <table className="w-full text-xs border-collapse">
          <tbody>
            <tr className="border-b border-[#E4E7EA]">
              <td className="py-1.5 text-[#5A646D]">Konturning umumiy maydoni</td>
              <td className="py-1.5 text-right font-mono font-semibold">{totalArea} ha</td>
            </tr>
            {hasConflict && (
              <tr className="border-b border-[#E4E7EA] text-[#B91C1C]">
                <td className="py-1.5 font-medium">− Amaldagi № RX-2026-004112 kesishuv</td>
                <td className="py-1.5 text-right font-mono font-bold">3.2 ha</td>
              </tr>
            )}
            <tr className="text-[#123522] font-bold text-sm">
              <td className="pt-2">Ariza uchun boʻsh maydon</td>
              <td className="pt-2 text-right font-mono">{freeArea} ha</td>
            </tr>
          </tbody>
        </table>

        <p className="text-[11px] text-[#5A646D] leading-tight pt-1">
          <code className="bg-[#F8F9FA] px-1 py-0.5 rounded border border-[#E4E7EA] font-mono">
            S_available = S_total − S_active_overlap
          </code>
          . Faqat davri arizangiz bilan kesishadigan ruxsatnomalar hisobga olinadi.
        </p>
      </div>

      {/* Requested Area Input Field */}
      <div className="pt-3 border-t border-[#E4E7EA] space-y-2">
        <FormField label="Soʻralayotgan ariza maydoni (Площадь заявки)" required>
          <div className="relative">
            <Input
              type="text"
              value={requestedArea}
              onChange={(e) => onRequestedAreaChange?.(e.target.value)}
              className={`font-mono text-right pr-12 font-bold ${
                hasConflict ? 'border-[#B91C1C] focus:ring-[#B91C1C]' : ''
              }`}
            />
            <span className="absolute right-3 top-2.5 text-xs text-[#5A646D] font-bold">ha</span>
          </div>
        </FormField>

        {hasConflict && (
          <div className="bg-[#FEF2F2] border border-[#B91C1C]/40 rounded-xl p-3 text-xs text-[#B91C1C] font-semibold flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="leading-tight">
              Boʻsh maydondan 3.2 ha koʻp. Maydonni {freeArea} ha gacha kamaytiring yoki tepadagi tugma bilan kesishuvni chiqarib tashlang.
            </div>
          </div>
        )}

        <div className="text-[11px] text-[#5A646D]">
          Oʻndan bir qismigacha kiritiladi (masalan {freeArea}). Ruxsat berilgan diapazon: 0,1 ha dan {freeArea} ha gacha.
        </div>
      </div>
    </div>
  );
};
