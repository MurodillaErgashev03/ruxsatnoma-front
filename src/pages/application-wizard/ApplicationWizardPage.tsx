import React, { useState } from 'react';
import { WizardHeader } from './components/WizardHeader';
import { WizardStepper } from './components/WizardStepper';
import { OccupancyAlert } from './components/OccupancyAlert';
import { GisMapCanvas } from './components/GisMapCanvas';
import { MapToolsPanel } from './components/MapToolsPanel';
import { SelectedContourPanel } from './components/SelectedContourPanel';
import { MapLayersPanel } from './components/MapLayersPanel';
import { NormCalculationPanel } from './components/NormCalculationPanel';
import { WizardFooter } from './components/WizardFooter';
import { DesignDecisionsFootnote } from './components/DesignDecisionsFootnote';

export interface ApplicationWizardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const ApplicationWizardPage: React.FC<ApplicationWizardPageProps> = ({
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [hasConflict, setHasConflict] = useState<boolean>(true);
  const [requestedArea, setRequestedArea] = useState<string>('21,7');
  const [lastSavedTime, setLastSavedTime] = useState<string>('14:32');

  const handleExcludeOverlap = () => {
    setHasConflict(false);
    setRequestedArea('18,5');
    const now = new Date();
    setLastSavedTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    alert('Amaldagi ruxsatnoma bilan kesishgan 3.2 ha maydon chiqarib tashlandi! Boʻsh 18.5 ha qoldirildi.');
  };

  const handleResetPolygon = () => {
    setHasConflict(true);
    setRequestedArea('21,7');
    alert('Shtrixlangan kesishuv joyi qayta tiklandi.');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-16">
      {/* 1. Header with Progress & Draft Status */}
      <WizardHeader
        currentStep={currentStep}
        totalSteps={6}
        draftNo="RX-2026-004903"
        lastSavedTime={lastSavedTime}
        onExitWizard={() => onNavigate?.('applicant_dashboard')}
      />

      {/* 2. 6-Step Interactive Stepper Node Bar */}
      <WizardStepper
        currentStep={currentStep}
        onStepClick={(stepNo) => setCurrentStep(stepNo)}
      />

      {/* 3. Occupancy Conflict Alert Banner (If conflict active) */}
      {hasConflict && (
        <OccupancyAlert
          contourId="04-12-007"
          totalArea={21.7}
          overlapArea={3.2}
          onExcludeOverlap={handleExcludeOverlap}
          onShowOnMap={() => {
            const mapEl = document.getElementById('wizard-map-section');
            if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onChangeContour={() => alert('Boshqa konturlar roʻyxati ochilmoqda...')}
        />
      )}

      {/* 4. Two-Column Working Area: GIS Map + Contour & Layer Panels */}
      <div id="wizard-map-section" className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Left Column: GIS Vector Canvas & Map Tools */}
        <div className="space-y-6 min-w-0">
          <GisMapCanvas
            selectedContourId="04-12-007"
            totalArea={21.7}
            overlapArea={3.2}
            hasConflict={hasConflict}
          />

          <MapToolsPanel onResetPolygon={handleResetPolygon} />
        </div>

        {/* Right Column: Selected Contour Details & Layer Switches */}
        <div className="space-y-6">
          <SelectedContourPanel
            contourId="04-12-007"
            totalArea={21.7}
            overlapArea={3.2}
            requestedArea={requestedArea}
            onRequestedAreaChange={(val) => setRequestedArea(val)}
            hasConflict={hasConflict}
          />

          <MapLayersPanel />
        </div>
      </div>

      {/* 5. VMQ 689 Norm Calculation Transparency Panel */}
      <NormCalculationPanel
        freeArea={hasConflict ? 18.5 : 18.5}
        hasConflict={hasConflict}
      />

      {/* 6. Sticky Wizard Navigation Footer */}
      <WizardFooter
        currentStep={currentStep}
        hasConflict={hasConflict}
        lastSavedTime={lastSavedTime}
        onPrevStep={() => setCurrentStep((s) => Math.max(s - 1, 1))}
        onNextStep={() => {
          if (!hasConflict) {
            setCurrentStep((s) => Math.min(s + 1, 6));
            alert('3-bosqichga (Parametrlar va chorva bosh soni) oʻtildi!');
          }
        }}
        onSaveDraft={() => {
          const now = new Date();
          setLastSavedTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
          alert('Qoralama muvaffaqiyatli saqlandi!');
        }}
      />

      {/* 7. Architecture & Design Decisions Footnote Card */}
      <DesignDecisionsFootnote />
    </div>
  );
};
