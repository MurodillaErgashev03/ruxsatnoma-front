import React from 'react';

export interface ApplicationSecNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  checksCount?: number;
  docsCount?: number;
  historyCount?: number;
}

export const ApplicationSecNav: React.FC<ApplicationSecNavProps> = ({
  activeTab,
  onTabChange,
  checksCount = 1,
  docsCount = 6,
  historyCount = 9,
}) => {
  const tabs = [
    { id: 's-general', label: 'Umumiy maʼlumotlar' },
    { id: 's-plot', label: 'Uchastka va xarita' },
    { id: 's-calc', label: 'Hisob-kitob' },
    { id: 's-checks', label: 'Tekshiruvlar', badge: checksCount, isWarn: true },
    { id: 's-docs', label: 'Hujjatlar', badge: docsCount },
    { id: 's-history', label: 'Tarix va audit log', badge: historyCount },
  ];

  return (
    <nav className="sticky top-16 z-20 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-[#E4E7EA] py-2 px-1 -mx-6 sm:mx-0 flex items-center gap-2 overflow-x-auto font-sans">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              isActive
                ? 'bg-[#2E7D4F] text-white shadow-xs'
                : 'text-[#5A646D] hover:text-[#1A1F24] hover:bg-white border border-transparent hover:border-[#E4E7EA]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  tab.isWarn
                    ? 'bg-[#B45309] text-white'
                    : isActive
                    ? 'bg-[#23653F] text-white'
                    : 'bg-[#E4E7EA] text-[#5A646D]'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
