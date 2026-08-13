import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ApplicationHeader } from './components/ApplicationHeader';
import { ApplicationSecNav } from './components/ApplicationSecNav';
import { GeneralInfoPanel } from './components/GeneralInfoPanel';
import { PlotAndMapPanel } from './components/PlotAndMapPanel';
import { CalculationPanel } from './components/CalculationPanel';
import { ChecksAndIntegrationsPanel } from './components/ChecksAndIntegrationsPanel';
import { DocumentsPanel } from './components/DocumentsPanel';
import { HistoryTimelinePanel } from './components/HistoryTimelinePanel';
import { ActionRail } from './components/ActionRail';
import { UnclaimedStatePanel } from './components/UnclaimedStatePanel';

export interface ApplicationCardPageProps {
  applicationId?: string | number;
  onNavigate?: (page: string, params?: any) => void;
}

export const ApplicationCardPage: React.FC<ApplicationCardPageProps> = ({
  applicationId = '╨Р-00042',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<string>('s-general');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 font-sans pb-16">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5A646D] border-b border-[#E4E7EA] pb-3">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => onNavigate?.('leskhoz_inbox')}
          className="text-[#2E7D4F] font-bold hover:bg-[#F0F7F1] cursor-pointer"
        >
          Arizalar roʻyxatiga qaytish
        </Button>
        <span>/</span>
        <span className="font-semibold text-[#1A1F24]">Ariza kartochkasi ({applicationId})</span>
      </div>

      {/* тФАтФА 1-HOLAT (MAIN VIEW): IN REVIEW CARD WITH ALL 6 PANELS & ACTION RAIL тФАтФА */}
      <div className="space-y-6">
        {/* Main Header Strip */}
        <ApplicationHeader id={String(applicationId)} />

        {/* Sticky Section Nav */}
        <ApplicationSecNav activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Two Column Layout: Main Content + Right Action Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Main Content Column */}
          <div className="space-y-8 min-w-0">
            <GeneralInfoPanel />
            <PlotAndMapPanel />
            <CalculationPanel />
            <ChecksAndIntegrationsPanel />
            <DocumentsPanel />
            <HistoryTimelinePanel />
          </div>

          {/* Right Action Rail (5 Blocks) */}
          <ActionRail
            onApprove={() => alert('Ariza tasdiqlandi va toʻlov xabarnomasi yuborildi.')}
            onReturn={() => alert('Ariza arizachiga tuzatish uchun qaytarildi.')}
            onReject={() => alert('Ariza rad etildi va rasmiy bildirishnoma yuborildi.')}
          />
        </div>
      </div>

      {/* тФАтФА 2-HOLAT (ENG PASTDA): UNCLAIMED / UNASSIGNED STATE MATCHING application-card.html тФАтФА */}
      <section className="pt-12 border-t-2 border-dashed border-[#767F87]/30 space-y-6">
        <div className="flex items-center gap-2 text-xs text-[#5A646D]">
          <span className="px-3 py-1 rounded-full bg-white border border-[#E4E7EA] font-bold text-[#1A1F24] uppercase text-[10px] shadow-2xs">
            тЧ╗ EKRAN HOLATI (╨Ч╨Р╨п╨Т╨Ъ╨Р ╨Х╨й╨Б ╨Э╨Х ╨Я╨а╨Ш╨Э╨п╨в╨Р ╨Т ╨а╨Р╨С╨Ю╨в╨г)
          </span>
          <span>Shtatdagi xodim arizani hali koʻrib chiqishga olmagan holat namoyishi.</span>
        </div>

        {/* Unclaimed Header Strip */}
        <ApplicationHeader
          id="╨Р-00044"
          activityName="Asalari uyalarini joylashtirish (╨а╨░╨╖╨╝╨╡╤Й╨╡╨╜╨╕╨╡ ╨┐╤З╨╡╨╗╨╕╨╜╤Л╤Е ╤Г╨╗╤М╨╡╨▓)"
          applicantName="Dilshod Raximov"
          applicantType="Jismoniy shaxs"
          pinfl="32309981740326"
          submittedAt="06.08.2026, 16:31"
          channel="my.gov.uz ┬╖ E-IMZO imzolangan"
          executorName="Dilnoza Abdullayeva"
          executorAssignedAt="Avtomatik tayinlangan, ishga olingan emas"
          totalAmount="480 000,00 UZS"
          ruleVersion="Arizachining dastlabki hisob-kitobi"
          slaDeadline="21.08.2026, 18:00"
          slaRemaining="11 kun qoldi"
        />

        {/* Unclaimed State Panel Grid */}
        <UnclaimedStatePanel
          onTakeIntoWork={() => {
            alert('Ariza koʻrib chiqishga olindi va masʼul xodimga biriktirildi!');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onReturnToApplicant={() => {
            alert('Ariza arizachiga qaytarilmoqda...');
          }}
        />
      </section>
    </div>
  );
};
