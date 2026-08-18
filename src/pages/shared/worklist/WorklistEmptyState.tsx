import React from 'react';
import { Search, RotateCcw, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface WorklistEmptyStateProps {
  onShowAllOverdue?: () => void;
  onResetFilters?: () => void;
  onExpandPeriod?: () => void;
}

export const WorklistEmptyState: React.FC<WorklistEmptyStateProps> = ({
  onShowAllOverdue,
  onResetFilters,
  onExpandPeriod,
}) => {
  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-8 md:p-12 text-center shadow-xs font-sans space-y-4 max-w-3xl mx-auto my-6">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#F0F7F1] border border-[#86EFAC] text-[#2E7D4F] flex items-center justify-center mx-auto shadow-2xs">
        <Search className="w-8 h-8" />
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-[#1A1F24]">
        Ushbu filtr boʻyicha arizalar topilmadi (По этому фильтру заявок нет)
      </h3>

      {/* Explanation Description */}
      <p className="text-xs md:text-sm text-[#5A646D] leading-relaxed max-w-xl mx-auto">
        1–10 avgust 2026-yil oraligʻida «Ma'lumot soʻralgan» statusidagi ilmiy-tadqiqot ishlari boʻyicha birorta ham muddati oʻtgan ariza topilmadi. Sizda 2 ta muddati oʻtgan ariza bor — chorva mollarini boqish va pichan oʻrish boʻyicha. Faoliyat turi boʻyicha shartni olib tashlang yoki qabul davrini iyul oyigacha kengaytiring.
      </p>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="primary"
          size="sm"
          leftIcon={<AlertTriangle className="w-4 h-4" />}
          onClick={onShowAllOverdue || (() => alert('Barcha muddati oʻtgan arizalar koʻrsatildi!'))}
          className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs h-9 shadow-xs"
        >
          Barcha muddati oʻtganlarni koʻrsatish
        </Button>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<RotateCcw className="w-4 h-4" />}
          onClick={onResetFilters || (() => alert('Filtrlar tiklandi!'))}
          className="border-[#767F87] text-[#1A1F24] font-bold text-xs h-9"
        >
          Filtrlarni tiklash
        </Button>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Calendar className="w-4 h-4" />}
          onClick={onExpandPeriod || (() => alert('Davr iyul oyigacha kengaytirildi!'))}
          className="border-[#767F87] text-[#1A1F24] font-bold text-xs h-9"
        >
          Davrni iyul oyigacha kengaytirish
        </Button>
      </div>
    </div>
  );
};
