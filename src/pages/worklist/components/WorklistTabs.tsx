import React from 'react';

export interface WorklistTabCounts {
  all: number;
  new: number;
  inProgress: number;
  waitingInfo: number;
  overdue: number;
}

export interface WorklistTabsProps {
  activeTab: string;
  counts?: WorklistTabCounts;
  onTabChange: (tab: string) => void;
}

export const WorklistTabs: React.FC<WorklistTabsProps> = ({
  activeTab,
  counts = { all: 24, new: 5, inProgress: 11, waitingInfo: 3, overdue: 2 },
  onTabChange,
}) => {
  const tabs = [
    { id: 'all', label: 'Barchasi (Все)', count: counts.all, isLate: false },
    { id: 'new', label: 'Yangi (Новые)', count: counts.new, isLate: false },
    { id: 'in_progress', label: 'Koʻrib chiqilmoqda (В работе)', count: counts.inProgress, isLate: false },
    { id: 'waiting_info', label: "Ma'lumot kutilmoqda (Ожидают)", count: counts.waitingInfo, isLate: false },
    { id: 'overdue', label: '▲ Muddati oʻtgan (Просрочены)', count: counts.overdue, isLate: true },
  ];

  return (
    <div className="border-b border-[#E4E7EA] overflow-x-auto font-sans">
      <div className="flex gap-2 min-w-max pb-px">
        {tabs.map((t) => {
          const isSelected = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`px-4 py-2.5 text-xs md:text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'border-[#2E7D4F] text-[#123522] font-bold bg-white rounded-t-lg shadow-2xs'
                  : 'border-transparent text-[#5A646D] hover:text-[#1A1F24] hover:bg-[#F8F9FA]'
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${
                  t.isLate
                    ? 'bg-[#B91C1C] text-white'
                    : isSelected
                    ? 'bg-[#D9EBDC] text-[#123522]'
                    : 'bg-[#E4E7EA] text-[#5A646D]'
                }`}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
