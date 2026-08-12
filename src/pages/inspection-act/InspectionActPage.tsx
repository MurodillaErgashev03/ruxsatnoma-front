import React, { useState } from 'react';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { NetworkStateHeader } from './components/NetworkStateHeader';
import { PermitDetailsCard } from './components/PermitDetailsCard';
import { InspectorGpsCard } from './components/InspectorGpsCard';
import { InspectionChecklistCard } from './components/InspectionChecklistCard';
import { ActualLivestockCard } from './components/ActualLivestockCard';
import { PhotosAndNotesCard } from './components/PhotosAndNotesCard';
import { DigitalSignatureCard } from './components/DigitalSignatureCard';
import { PwaTabBar } from './components/PwaTabBar';
import { PwaGuidelinesFootnote } from './components/PwaGuidelinesFootnote';

export interface InspectionActPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const InspectionActPage: React.FC<InspectionActPageProps> = ({ onNavigate }) => {
  const [netState, setNetState] = useState<'online' | 'offline_cache' | 'offline_nocache'>('online');
  const [activeTab, setActiveTab] = useState<'tasks' | 'scan' | 'acts' | 'sync'>('acts');

  const handleSign = () => {
    if (netState === 'online') {
      alert('E-IMZO muhrlandi va dalolatnoma serverga muvaffaqiyatli yuborildi!');
    } else {
      alert('E-IMZO muhrlandi va dalolatnoma oflayn yuborish navbatiga qoʻshildi!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans pb-16">
      {/* Top Banner & State Switcher */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
          <div>
            <div className="text-xs text-[#5A646D] font-medium">S15 ssenariysi · (field) marshrutlar guruhi</div>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#1A1F24]">
              Акт инспекции · PWA инспектора
            </h1>
            <p className="text-xs text-[#5A646D] mt-0.5">
              Inspektor: Shuhrat Mirzayev, Boʻstonliq DЎX · Obyekt: OFC-14-238-07 kontur, Xumson oʻrmonchiligi
            </p>
          </div>
        </div>

        {/* State Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8F9FA] p-2.5 rounded-xl border border-[#E4E7EA]">
          <span className="text-xs font-bold text-[#1A1F24] shrink-0">Ekran Holati (Состояние):</span>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setNetState('online')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                netState === 'online'
                  ? 'bg-[#2E7D4F] text-white shadow-xs'
                  : 'bg-white text-[#5A646D] border border-[#767F87] hover:bg-[#F8F9FA]'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" /> 1. Onlayn (Online)
            </button>

            <button
              type="button"
              onClick={() => setNetState('offline_cache')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                netState === 'offline_cache'
                  ? 'bg-[#B45309] text-white shadow-xs'
                  : 'bg-white text-[#5A646D] border border-[#767F87] hover:bg-[#F8F9FA]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" /> 2. Oflayn + Kesh
            </button>

            <button
              type="button"
              onClick={() => setNetState('offline_nocache')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                netState === 'offline_nocache'
                  ? 'bg-[#B91C1C] text-white shadow-xs'
                  : 'bg-white text-[#5A646D] border border-[#767F87] hover:bg-[#F8F9FA]'
              }`}
            >
              <WifiOff className="w-3.5 h-3.5" /> 3. Oflayn keshsiz
            </button>
          </div>
        </div>
      </div>

      {/* Phone Stage Wrapper (390px phone container simulation) */}
      <div className="w-full max-w-[410px] mx-auto p-2.5 bg-[#14181C] rounded-[42px] shadow-2xl">
        <div className="bg-[#F8F9FA] rounded-[32px] overflow-hidden flex flex-col min-h-[720px] border border-[#767F87]">
          {/* Header Bar */}
          <NetworkStateHeader
            netState={netState}
            queueCount={netState === 'online' ? 0 : 3}
            actNo={netState === 'offline_nocache' ? 'Yangi Akt' : 'ACT-2026-004431'}
            onBack={() => onNavigate?.('field_tasks')}
          />

          {/* Scrollable Mobile Body */}
          <div className="p-3.5 space-y-3.5 flex-1 overflow-y-auto">
            <PermitDetailsCard netState={netState} />

            <InspectorGpsCard
              netState={netState}
              isInsideContour={netState === 'offline_cache'}
            />

            {netState !== 'offline_nocache' && <InspectionChecklistCard />}

            {netState !== 'offline_nocache' && <ActualLivestockCard />}

            <PhotosAndNotesCard />

            <DigitalSignatureCard
              netState={netState}
              onSign={handleSign}
              onSaveDraft={() => alert('Qoralama qurilmaga saqlandi!')}
            />
          </div>

          {/* Sticky PWA Mobile Bottom Navigation */}
          <PwaTabBar
            activeTab={activeTab}
            queueCount={netState === 'online' ? 0 : 3}
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (tab === 'tasks') onNavigate?.('field_tasks');
              if (tab === 'scan') onNavigate?.('field_scan');
            }}
          />
        </div>
      </div>

      {/* PWA Design Guidelines Footnote */}
      <PwaGuidelinesFootnote />
    </div>
  );
};

export default InspectionActPage;
