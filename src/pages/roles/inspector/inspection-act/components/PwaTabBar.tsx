import React from 'react';
import { ClipboardList, QrCode, FileCheck, RefreshCw } from 'lucide-react';

export interface PwaTabBarProps {
  activeTab?: 'tasks' | 'scan' | 'acts' | 'sync';
  queueCount?: number;
  onTabChange?: (tab: 'tasks' | 'scan' | 'acts' | 'sync') => void;
}

export const PwaTabBar: React.FC<PwaTabBarProps> = ({
  activeTab = 'acts',
  queueCount = 3,
  onTabChange,
}) => {
  return (
    <div className="w-full bg-white border-t border-[#E4E7EA] rounded-b-3xl font-sans">
      <nav className="flex items-center justify-around h-14">
        {/* Tasks */}
        <button
          type="button"
          onClick={() => onTabChange?.('tasks')}
          className={`flex-1 h-full flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold relative cursor-pointer ${
            activeTab === 'tasks' ? 'text-[#2E7D4F] bg-[#F0F7F1]' : 'text-[#5A646D] hover:bg-[#F8F9FA]'
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          <span>Topshiriqlar</span>
          <span className="absolute top-1.5 right-[calc(50%-18px)] bg-[#B45309] text-white text-[9px] font-bold px-1.5 rounded-full">
            3
          </span>
        </button>

        {/* Scan */}
        <button
          type="button"
          onClick={() => onTabChange?.('scan')}
          className={`flex-1 h-full flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold cursor-pointer ${
            activeTab === 'scan' ? 'text-[#2E7D4F] bg-[#F0F7F1]' : 'text-[#5A646D] hover:bg-[#F8F9FA]'
          }`}
        >
          <QrCode className="w-5 h-5" />
          <span>Skaner</span>
        </button>

        {/* Acts */}
        <button
          type="button"
          onClick={() => onTabChange?.('acts')}
          className={`flex-1 h-full flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold cursor-pointer border-t-2 ${
            activeTab === 'acts'
              ? 'text-[#2E7D4F] border-[#2E7D4F] bg-[#F0F7F1]'
              : 'text-[#5A646D] border-transparent hover:bg-[#F8F9FA]'
          }`}
        >
          <FileCheck className="w-5 h-5" />
          <span>Aktlar</span>
        </button>

        {/* Sync */}
        <button
          type="button"
          onClick={() => onTabChange?.('sync')}
          className={`flex-1 h-full flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold relative cursor-pointer ${
            activeTab === 'sync' ? 'text-[#2E7D4F] bg-[#F0F7F1]' : 'text-[#5A646D] hover:bg-[#F8F9FA]'
          }`}
        >
          <RefreshCw className="w-5 h-5" />
          <span>Sinxron</span>
          {queueCount > 0 && (
            <span className="absolute top-1.5 right-[calc(50%-18px)] bg-[#B91C1C] text-white text-[9px] font-bold px-1.5 rounded-full">
              {queueCount}
            </span>
          )}
        </button>
      </nav>

      {/* Mobile Home indicator bar */}
      <div className="h-4 flex items-center justify-center bg-white">
        <div className="w-28 h-1 bg-[#9AA3AB] rounded-full" />
      </div>
    </div>
  );
};
