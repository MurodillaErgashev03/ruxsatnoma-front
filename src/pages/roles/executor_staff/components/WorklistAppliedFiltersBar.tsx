import React from 'react';
import { X } from 'lucide-react';

export interface AppliedFilterChip {
  id: string;
  label: string;
}

export interface WorklistAppliedFiltersBarProps {
  foundCount?: number;
  chips?: AppliedFilterChip[];
  onRemoveChip?: (chipId: string) => void;
}

export const WorklistAppliedFiltersBar: React.FC<WorklistAppliedFiltersBarProps> = ({
  foundCount = 24,
  chips = [
    { id: 'status', label: 'Status: Koʻrib chiqilmoqda (На рассмотрении)' },
    { id: 'period', label: '01.07.2026 — 10.08.2026' },
  ],
  onRemoveChip,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
      <span className="text-[#5A646D]">
        Topildi: <strong className="text-[#1A1F24] font-bold">{foundCount} ta ariza</strong>
      </span>

      {chips.map((c) => (
        <span
          key={c.id}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#767F87] text-[#1A1F24] rounded-full shadow-2xs font-medium"
        >
          <span>{c.label}</span>
          <button
            type="button"
            onClick={() => onRemoveChip?.(c.id)}
            className="text-[#5A646D] hover:text-[#B91C1C] cursor-pointer p-0.5 rounded-full hover:bg-[#FEE2E2]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}
    </div>
  );
};
